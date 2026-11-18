/* 部品：bucket（電力と電力量の実験台）／ unitconv（単位の階段と換算）／ appmix（家庭の電気の使いみち）／ areacircle（円の面積で比べる）／ bundle（家庭を束ねて発電所と比べる）。
   使う章があるときだけ build.py が埋め込む（js/opt/home-lab.js・css/opt/home-lab.css）。データ形式は FRAMEWORK.md §4.12。
   いずれも「規模の感覚をつかむための学習用の模型」。部品の中に事実の数値は持たない（値はすべてデータ側）。持つのは単位の定義（千倍ごと）と、描き方だけ。
   自己完結（scale-lab.js・expr.js に依存しない）。 */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;

  /* ================= 数の書き方 ================= */
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function groupDigits(str) { return str.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function sig(x, n) { if (!isFinite(x) || x === 0) return x; var e = Math.floor(Math.log(Math.abs(x)) / Math.LN10 + 1e-12), f = Math.pow(10, n - 1 - e); return Math.round(x * f) / f; }
  function fmtSig(x, n) {
    if (!isFinite(x)) return '—';
    if (x === 0) return '0';
    var v = sig(x, n), dec = Math.max(0, n - 1 - Math.floor(Math.log(Math.abs(v)) / Math.LN10 + 1e-12));
    var str = Math.abs(v).toFixed(Math.min(dec, 14));
    if (str.indexOf('.') >= 0) str = str.replace(/0+$/, '').replace(/\.$/, '');
    var parts = str.split('.'); parts[0] = groupDigits(parts[0]);
    return (v < 0 ? '−' : '') + parts.join('.');
  }
  function fmtFix(x, d) {
    if (!isFinite(x)) return '—';
    var str = Math.abs(x).toFixed(d), parts = str.split('.'); parts[0] = groupDigits(parts[0]);
    return (x < 0 && /[1-9]/.test(str) ? '−' : '') + parts.join('.');
  }
  /* 日本語の大きな数：1 万以上は「万」、1 億以上は「億」（n は有効数字） */
  function ja(x, n) {
    if (!isFinite(x)) return '—';
    n = n || 2;
    if (x >= 1e8) return fmtSig(x / 1e8, n) + ' 億';
    if (x >= 1e4) return fmtSig(x / 1e4, n) + ' 万';
    return fmtSig(x, n);
  }
  var PU = [['TW', 1e12], ['GW', 1e9], ['MW', 1e6], ['kW', 1e3], ['W', 1]];
  var EU = [['TWh', 1e12], ['GWh', 1e9], ['MWh', 1e6], ['kWh', 1e3], ['Wh', 1]];
  function auto(v, units, n) {   // v（W か Wh）を、読みやすい単位で
    var k = 0; n = n || 3;
    for (k = 0; k < units.length - 1; k++) if (Math.abs(v) >= units[k][1]) break;
    if (sig(v / units[k][1], n) >= 1000 && k > 0) k--;
    return fmtSig(v / units[k][1], n) + ' ' + units[k][0];
  }
  function powTxt(w, n) { return auto(w, PU, n); }
  function eneTxt(wh, n) { return auto(wh, EU, n); }
  /* 単位を付けずに、そのままの数（指数表記にしない）で書く：9 桁の有効数字、末尾の 0 は消す、3 桁区切り */
  function plain(x) {
    if (!isFinite(x)) return '—';
    if (x === 0) return '0';
    var a = Math.abs(x);
    if (a < 1e-9 || a >= 1e18) return x.toExponential(3);
    var dec = clamp(9 - 1 - Math.floor(Math.log(a) / Math.LN10 + 1e-12), 0, 20), str = Math.abs(Number(x.toPrecision(9))).toFixed(dec);
    if (str.indexOf('.') >= 0) str = str.replace(/0+$/, '').replace(/\.$/, '');
    var parts = str.split('.'); parts[0] = groupDigits(parts[0]);
    return (x < 0 ? '−' : '') + parts.join('.');
  }

  /* ================= 共通の部品（幅の測定・つまみ・結果の箱） ================= */
  function measure(el, fallback) { var w = el.clientWidth; return w > 40 ? w : (fallback || 320); }
  function watchWidth(el, fn) {
    var last = 0, t = null;
    function chk() { var w = el.clientWidth; if (w > 40 && Math.abs(w - last) > 2) { last = w; fn(); } }
    if (window.ResizeObserver) { var ro = new ResizeObserver(function () { clearTimeout(t); t = setTimeout(chk, 60); }); ro.observe(el); }
    else window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(chk, 100); });
  }
  var DISC = '学習用の模型です。実際の設計や運用の判断には使えません。';
  /* つまみ：{id,label,unit,min,max,step,value,fmt,log,onInput}。log のときは、値は 10 の指数（表示は fmt で）。 */
  function slider(ctx, o) {
    var id = ctx.id + '-' + o.id, wrap = h('div', { 'class': 'hm-in' }), out = h('output', { 'for': id, 'class': 'hm-val' });
    wrap.appendChild(h('div', { 'class': 'hm-in-h' }, h('label', { 'for': id }, o.label), out));
    var r = h('input', { type: 'range', id: id, min: o.min, max: o.max, step: o.step, value: o.value });
    function show() { var t = o.fmt ? o.fmt(parseFloat(r.value)) : r.value; out.textContent = t; r.setAttribute('aria-valuetext', t); }
    r.addEventListener('input', function () { if (o.onInput) o.onInput(parseFloat(r.value)); show(); });
    wrap.appendChild(r);
    if (o.minmax) wrap.appendChild(h('div', { 'class': 'hm-minmax' }, h('span', null, o.minmax[0]), h('span', null, o.minmax[1])));
    show();
    return { el: wrap, r: r, set: function (v) { r.value = v; show(); }, get: function () { return parseFloat(r.value); }, show: show };
  }
  function resBox(label, value, unit, note, big) {
    var b = h('div', { 'class': 'hm-res' + (big ? ' big' : '') });
    b.appendChild(h('div', { 'class': 'hm-res-l' }, label));
    b.appendChild(h('div', { 'class': 'hm-res-v' }, h('b', null, value), unit ? ' ' + unit : ''));
    if (note) b.appendChild(h('div', { 'class': 'hm-res-n' }, note));
    return b;
  }
  function begin(el, d, label, ctx) {
    var tabsHolder = null;
    CN.frame(el, label, d.title, tabsHolder);
    el.classList.add('hm');
    var body = h('div', { 'class': 'wg-body hm-body' }); el.appendChild(body);
    return body;
  }
  function endNote(el, d) { el.appendChild(h('p', { 'class': 'hm-disc' }, d.disclaimer || DISC)); }
  function svgRoot(w, hh, label) { return s('svg', { 'class': 'hm-svg', viewBox: '0 0 ' + w + ' ' + hh, width: w, height: hh, role: 'img', 'aria-label': label }); }
  function txt(x, y, str, cls, anchor, extra) { var p = { x: x, y: y, 'class': cls || 'hm-t' }; if (anchor) p['text-anchor'] = anchor; if (extra) for (var k in extra) p[k] = extra[k]; return s('text', p, str); }
  function line(x1, y1, x2, y2, cls) { return s('line', { x1: x1, y1: y1, x2: x2, y2: y2, 'class': cls }); }
  function rect(x, y, w, hh, cls, extra) { var p = { x: x, y: y, width: Math.max(0, w), height: Math.max(0, hh), 'class': cls }; if (extra) for (var k in extra) p[k] = extra[k]; return s('rect', p); }
  function pathEl(d, cls, extra) { var p = { d: d, 'class': cls }; if (extra) for (var k in extra) p[k] = extra[k]; return s('path', p); }
  function circle(cx, cy, r, cls, extra) { var p = { cx: cx, cy: cy, r: r, 'class': cls }; if (extra) for (var k in extra) p[k] = extra[k]; return s('circle', p); }
  function details(summary, table) { return h('details', { 'class': 'seq-list hm-table' }, h('summary', null, summary), h('div', { 'class': 'tbl-wrap' }, table)); }
  function tableOf(cols, rows, cap) {
    var tb = h('tbody');
    rows.forEach(function (r) { var tr = h('tr'); r.forEach(function (c, i) { tr.appendChild(i === 0 ? h('th', { scope: 'row' }, c) : h('td', null, c)); }); tb.appendChild(tr); });
    var t = h('table', { 'class': 'tbl' }, cap ? h('caption', null, cap) : null, h('thead', null, h('tr', null, cols.map(function (c) { return h('th', { scope: 'col' }, c); }))), tb);
    return t;
  }
  var NICE = [1, 2, 5, 10];
  function niceStep(range, n) { var raw = range / n, e = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), f = raw / e, k = 0; while (k < NICE.length - 1 && NICE[k] < f - 1e-9) k++; return NICE[k] * e; }

  /* ================= bucket：電力（蛇口の太さ）と電力量（バケツにたまる水） ================= */
  CN.widgets.bucket = function (el, d, ctx) {
    var P = d.power, T = d.hours, cap = d.capacityKwh;
    var st = { w: P.value, hrs: T.value, t: T.value, playing: false, raf: 0 };
    var body = begin(el, d, '電力と電力量の実験台', ctx);
    if (d.intro) body.appendChild(CN.richEl('p', 'hm-intro', d.intro));
    var top = h('div', { 'class': 'hm-top' }), left = h('div', { 'class': 'hm-ctl' }), right = h('div', { 'class': 'hm-right' });
    top.appendChild(left); top.appendChild(right); body.appendChild(top);
    var sw = slider(ctx, { id: 'w', label: P.label || '機器の電力', min: P.min, max: P.max, step: P.step, value: P.value, fmt: function (v) { return fmtFix(v, 0) + ' W'; }, minmax: [fmtFix(P.min, 0) + ' W', fmtFix(P.max, 0) + ' W'], onInput: function (v) { stop(); st.w = v; st.t = st.hrs; draw(); } });
    var sh = slider(ctx, { id: 'hrs', label: T.label || '使う時間', min: T.min, max: T.max, step: T.step, value: T.value, fmt: function (v) { return fmtFix(v, 2).replace(/0$/, '') + ' 時間'; }, minmax: [T.min + ' 時間', T.max + ' 時間'], onInput: function (v) { stop(); st.hrs = v; st.t = v; draw(); } });
    left.appendChild(sw.el); left.appendChild(sh.el);
    var pbtns = [];
    if (P.presets && P.presets.length) {
      var pg = h('div', { 'class': 'hm-presets', role: 'group', 'aria-label': (P.label || '機器の電力') + 'の目安' });
      pg.appendChild(h('div', { 'class': 'hm-preset-h' }, P.presetLabel || '目安の機器（押すと電力が動きます）'));
      P.presets.forEach(function (p) { var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-pressed': 'false' }, p.label); b.addEventListener('click', function () { stop(); st.w = p.w; sw.set(p.w); st.t = st.hrs; draw(); }); pbtns.push([b, p]); pg.appendChild(b); });
      left.appendChild(pg);
    }
    var play = h('button', { type: 'button', 'class': 'btn sm hm-play' }, '▶ 時間を進める');
    play.addEventListener('click', function () { if (st.playing) { stop(); st.t = st.hrs; draw(); } else start(); });
    left.appendChild(play);
    var results = h('div', { 'class': 'hm-results', 'aria-live': 'polite' }), figs = h('div', { 'class': 'hm-figs' });
    right.appendChild(results); right.appendChild(figs);
    var tapBox = h('div', { 'class': 'hm-fig' }), areaBox = h('div', { 'class': 'hm-fig' });
    figs.appendChild(tapBox); figs.appendChild(areaBox);
    var tblBox = h('div'); body.appendChild(tblBox);
    if (d.formula) body.appendChild(CN.richEl('p', 'hm-formula', '式：' + d.formula));
    if (d.reads && d.reads.length) { var rd = h('div', { 'class': 'hm-read' }, h('h5', null, '読み取れること')); var ul = h('ul'); d.reads.forEach(function (t) { ul.appendChild(CN.richEl('li', '', t)); }); rd.appendChild(ul); body.appendChild(rd); }
    endNote(el, d);

    function stop() { if (st.raf) cancelAnimationFrame(st.raf); st.raf = 0; st.playing = false; play.textContent = '▶ 時間を進める'; }
    function start() {
      if (CN.reduced()) { st.t = st.hrs; draw(); return; }
      st.playing = true; st.t = 0; play.textContent = '■ 止める';
      var t0 = null, dur = 3200;
      function tick(ts) {
        if (!st.playing) return;
        if (t0 == null) t0 = ts;
        var f = clamp((ts - t0) / dur, 0, 1); st.t = st.hrs * f; draw();
        if (f < 1) st.raf = requestAnimationFrame(tick); else { stop(); st.t = st.hrs; draw(); }
      }
      st.raf = requestAnimationFrame(tick);
    }
    function drawTap() {
      var W = Math.min(measure(tapBox, 240), 300), H = 236, kw = st.w / 1000, e = kw * st.t, eFull = kw * st.hrs;
      var level = clamp(e / cap, 0, 1), over = e > cap + 1e-9;
      var svg = svgRoot(W, H, '蛇口とバケツの図。蛇口の太さが電力（いま ' + fmtFix(kw, 2) + ' kW）、バケツにたまった水が電力量（いま ' + fmtFix(e, 2) + ' kWh、家庭 1 日分 ' + cap + ' kWh の ' + fmtFix(e / cap * 100, 0) + ' %）。');
      var th = 5 + 30 * clamp(st.w / P.max, 0, 1), bx0 = W / 2 - 52, bx1 = W / 2 + 52, by0 = 118, by1 = H - 24, pipeY = 18, nozX = W / 2;
      var defs = s('defs', null, s('clipPath', { id: ctx.id + '-clip' }, pathEl('M' + (bx0 + 4) + ',' + by0 + ' L' + (bx0 + 12) + ',' + by1 + ' L' + (bx1 - 12) + ',' + by1 + ' L' + (bx1 - 4) + ',' + by0 + ' Z')));
      svg.appendChild(defs);
      // 蛇口（管の太さ ＝ 電力）
      svg.appendChild(rect(8, pipeY, nozX - 8, th, 'hm-pipe'));
      svg.appendChild(rect(nozX - 10, pipeY - 4, 20, th + 8, 'hm-pipe'));
      svg.appendChild(txt(10, pipeY - 6, '蛇口の太さ ＝ 電力 ' + fmtFix(kw, 2) + ' kW', 'hm-t b'));
      // 水の筋
      var sw0 = Math.max(2, th * 0.55), y0 = pipeY + th + 4, y1 = by0 + (by1 - by0) * (1 - level);
      if (kw > 0 && st.t > 0) svg.appendChild(rect(nozX - sw0 / 2, y0, sw0, Math.max(0, y1 - y0), 'hm-stream' + (st.playing ? ' flow' : '')));
      // バケツ
      svg.appendChild(s('g', { 'clip-path': 'url(#' + ctx.id + '-clip)' }, rect(bx0, by1 - (by1 - by0) * level, bx1 - bx0, (by1 - by0) * level, 'hm-water')));
      svg.appendChild(pathEl('M' + bx0 + ',' + by0 + ' L' + (bx0 + 8) + ',' + by1 + ' L' + (bx1 - 8) + ',' + by1 + ' L' + bx1 + ',' + by0, 'hm-bucket'));
      svg.appendChild(line(bx0 - 6, by0, bx1 + 6, by0, 'hm-capline'));
      svg.appendChild(txt(bx1 + 8, by0 + 4, '満杯 ＝', 'hm-t sm', 'start', { 'dominant-baseline': 'middle' }));
      svg.appendChild(txt(bx1 + 8, by0 + 18, '家庭 1 日分', 'hm-t sm', 'start'));
      svg.appendChild(txt(bx1 + 8, by0 + 32, '約 ' + fmtSig(cap, 3) + ' kWh', 'hm-t sm', 'start'));
      svg.appendChild(txt(W / 2, H - 6, 'バケツの水 ＝ 電力量 ' + fmtFix(e, 2) + ' kWh' + (over ? '（あふれた）' : ''), 'hm-t b', 'middle'));
      CN.clear(tapBox).appendChild(svg);
    }
    function drawArea() {
      var W = Math.min(measure(areaBox, 300), 420), H = 236, kw = st.w / 1000, kwMax = P.max / 1000, hMax = T.max;
      var m = { l: 46, r: 12, t: 22, b: 40 }, pw = W - m.l - m.r, ph = H - m.t - m.b;
      var X = function (v) { return m.l + pw * v / hMax; }, Y = function (v) { return m.t + ph * (1 - v / kwMax); };
      var svg = svgRoot(W, H, '電力と時間のグラフ。縦が電力（kW）、横が時間（時間）。長方形の面積が電力量。いま ' + fmtFix(kw, 2) + ' kW を ' + fmtFix(st.hrs, 2) + ' 時間使うと ' + fmtFix(kw * st.hrs, 2) + ' kWh。');
      svg.appendChild(rect(m.l, m.t, pw, ph, 'hm-plot'));
      var yt = [0, 1, 2, 3].filter(function (v) { return v <= kwMax + 1e-9; });
      yt.forEach(function (v) { svg.appendChild(line(m.l, Y(v), m.l + pw, Y(v), 'hm-g')); svg.appendChild(txt(m.l - 6, Y(v) + 4, fmtFix(v, 0), 'hm-ax', 'end')); });
      [0, 6, 12, 18, 24].filter(function (v) { return v <= hMax; }).forEach(function (v) { svg.appendChild(line(X(v), m.t, X(v), m.t + ph, 'hm-g v')); svg.appendChild(txt(X(v), m.t + ph + 14, fmtFix(v, 0), 'hm-ax', 'middle')); });
      svg.appendChild(txt(4, m.t - 8, '電力（kW）', 'hm-ax', 'start'));
      svg.appendChild(txt(m.l + pw, m.t + ph + 30, '時間（時間）', 'hm-ax', 'end'));
      var tx = Math.min(st.t, st.hrs);
      svg.appendChild(rect(X(0), Y(kw), X(st.hrs) - X(0), Y(0) - Y(kw), 'hm-rect-rest'));
      svg.appendChild(rect(X(0), Y(kw), X(tx) - X(0), Y(0) - Y(kw), 'hm-rect'));
      svg.appendChild(line(X(0), Y(kw), X(st.hrs), Y(kw), 'hm-dash'));
      var cx = (X(0) + X(st.hrs)) / 2, cy = (Y(kw) + Y(0)) / 2;
      var lab = '面積 ＝ ' + fmtFix(kw * st.hrs, 2) + ' kWh';
      if (X(st.hrs) - X(0) > 120 && Y(0) - Y(kw) > 26) svg.appendChild(txt(cx, cy + 4, lab, 'hm-t b hm-on', 'middle'));
      else svg.appendChild(txt(Math.min(X(st.hrs) + 6, m.l + pw), Math.max(m.t + 12, Y(kw) - 6), lab, 'hm-t b', X(st.hrs) + 6 > m.l + pw - 90 ? 'end' : 'start'));
      CN.clear(areaBox).appendChild(svg);
    }
    function draw() {
      var kw = st.w / 1000, e = kw * st.hrs, e1 = kw * st.t;
      CN.clear(results);
      results.appendChild(resBox('電力（いまの大きさ）', fmtFix(kw, 2), 'kW', fmtFix(st.w, 0) + ' W'));
      results.appendChild(resBox('時間', fmtFix(st.t, 2).replace(/0$/, ''), '時間', st.playing ? '進行中（全体は ' + fmtFix(st.hrs, 2).replace(/0$/, '') + ' 時間）' : null));
      results.appendChild(resBox('電力量（たまった量）', fmtFix(e1, 2), 'kWh', st.playing ? '全体では ' + fmtFix(e, 2) + ' kWh' : '＝ ' + fmtFix(kw, 2) + ' kW × ' + fmtFix(st.hrs, 2).replace(/0$/, '') + ' 時間', true));
      results.appendChild(resBox('家庭 1 日分（約 ' + fmtSig(cap, 3) + ' kWh）に対して', fmtFix(e / cap * 100, 0), '%', e > cap ? '1 日分を超える量' : null));
      pbtns.forEach(function (q) { q[0].setAttribute('aria-pressed', String(Math.abs(q[1].w - st.w) < 1e-9)); });
      drawTap(); drawArea();
      CN.clear(tblBox).appendChild(details('図の数値（同じ内容の表。読み上げ・印刷用）', tableOf(['項目', '値'], [
        ['電力', fmtFix(kw, 3) + ' kW（' + fmtFix(st.w, 0) + ' W）'], ['時間', fmtFix(st.hrs, 2) + ' 時間'], ['電力量', fmtFix(e, 3) + ' kWh'], ['家庭 1 日分（約 ' + fmtSig(cap, 3) + ' kWh）に対する割合', fmtFix(e / cap * 100, 1) + ' %']])));
    }
    watchWidth(tapBox, function () { drawTap(); }); watchWidth(areaBox, function () { drawArea(); });
    draw();
  };
  CN.searchText.bucket = function (d) { return [d.title, d.intro || '', d.formula || '', (d.reads || []).join(' ')].join(' '); };

  /* ================= unitconv：単位の階段と、全部の単位への換算 ================= */
  var PWR = [['W', 1], ['kW', 1e3], ['MW', 1e6], ['GW', 1e9], ['TW', 1e12], ['万kW', 1e7]];
  var ENG = [['Wh', 1], ['kWh', 1e3], ['MWh', 1e6], ['GWh', 1e9], ['TWh', 1e12], ['万kWh', 1e7], ['億kWh', 1e11]];
  CN.widgets.unitconv = function (el, d, ctx) {
    var st = { kind: d.initial.kind, value: d.initial.value, unit: d.initial.unit };
    var tabs = CN.tabs([{ key: 'power', label: '電力（W の仲間）' }, { key: 'energy', label: '電力量（Wh の仲間）' }], st.kind, function (k) { var df = (d.defaults && d.defaults[k]) || { value: 1, unit: k === 'power' ? 'kW' : 'kWh' }; st.kind = k; st.unit = df.unit; st.value = df.value; build(); }, '電力と電力量の切替');
    CN.frame(el, '単位の階段と換算', d.title, tabs); el.classList.add('hm');
    var body = h('div', { 'class': 'wg-body hm-body' }); el.appendChild(body);
    endNote(el, d);
    var inBox, stairBox, outBox, exBox, numIn, selU, tblBox, say;
    function units() { return st.kind === 'power' ? PWR : ENG; }
    function factor(u) { var us = units(), i; for (i = 0; i < us.length; i++) if (us[i][0] === u) return us[i][1]; return 1; }
    function build() {
      CN.clear(body);
      if (d.intro) body.appendChild(CN.richEl('p', 'hm-intro', d.intro));
      var top = h('div', { 'class': 'hm-top' }), left = h('div', { 'class': 'hm-ctl' }), right = h('div', { 'class': 'hm-right' }); top.appendChild(left); top.appendChild(right); body.appendChild(top);
      var id = ctx.id + '-' + st.kind;
      numIn = h('input', { type: 'number', id: id + '-v', 'class': 'hm-num', step: 'any', value: st.value, inputmode: 'decimal', min: 0 });
      selU = h('select', { id: id + '-u', 'class': 'hm-sel', 'aria-label': '単位' });
      units().forEach(function (u) { var o = h('option', { value: u[0] }, u[0]); if (u[0] === st.unit) o.selected = true; selU.appendChild(o); });
      left.appendChild(h('div', { 'class': 'hm-in' }, h('div', { 'class': 'hm-in-h' }, h('label', { 'for': id + '-v' }, '換算したい値と単位')), h('div', { 'class': 'hm-numrow' }, numIn, selU)));
      numIn.addEventListener('input', function () { var v = parseFloat(numIn.value); if (isFinite(v) && v >= 0) { st.value = v; draw(); } });
      selU.addEventListener('change', function () { st.unit = selU.value; draw(); });
      exBox = h('div', { 'class': 'hm-presets', role: 'group', 'aria-label': '例の値' });
      exBox.appendChild(h('div', { 'class': 'hm-preset-h' }, '例の値（押すと入ります）'));
      (d.examples || []).filter(function (x) { return x.kind === st.kind; }).forEach(function (x) {
        var b = h('button', { type: 'button', 'class': 'btn sm' }, x.label); b.addEventListener('click', function () { st.value = x.value; st.unit = x.unit; numIn.value = x.value; selU.value = x.unit; draw(); }); exBox.appendChild(b);
      });
      left.appendChild(exBox);
      say = h('p', { 'class': 'hm-say', 'aria-live': 'polite' }); left.appendChild(say);
      stairBox = h('div', { 'class': 'hm-fig' }); right.appendChild(stairBox);
      tblBox = h('div', { 'class': 'hm-conv' }); right.appendChild(tblBox);
      if (d.notes && d.notes[st.kind]) { var ul = h('ul', { 'class': 'hm-notes' }); d.notes[st.kind].forEach(function (t) { ul.appendChild(CN.richEl('li', '', t)); }); body.appendChild(ul); }
      draw();
    }
    function natural(base) {   // 1 以上 1000 未満になる SI の単位
      var us = st.kind === 'power' ? PWR.slice(0, 5) : ENG.slice(0, 5), k = 0, i;
      if (base <= 0) return 0;
      for (i = us.length - 1; i >= 0; i--) if (base / us[i][1] >= 1) { k = i; break; }
      return k;
    }
    function drawStairs(base) {
      var W = Math.min(measure(stairBox, 340), 560), us = (st.kind === 'power' ? PWR : ENG).slice(0, 5), H = 188, n = us.length, gap = 4;
      var bw = (W - 12 - gap * (n - 1)) / n, nat = natural(base);
      var svg = svgRoot(W, H, '単位の階段。' + us.map(function (u) { return u[0]; }).join('、') + ' が、千倍ずつ大きくなる。' + (base > 0 ? 'いまの値は ' + (st.kind === 'power' ? powTxt(base, 3) : eneTxt(base, 3)) + '。' : ''));
      var baseY = H - 40, x0 = 6;
      us.forEach(function (u, i) {
        var hh = 34 + i * 20, x = x0 + i * (bw + gap), on = i === nat && base > 0;
        svg.appendChild(rect(x, baseY - hh, bw, hh, 'hm-step' + (on ? ' on' : '')));
        svg.appendChild(txt(x + bw / 2, baseY - hh + 20, u[0], 'hm-t b' + (on ? ' hm-on' : ''), 'middle'));
        svg.appendChild(txt(x + bw / 2, baseY + 14, '10' + sup(Math.round(Math.log(u[1]) / Math.LN10)), 'hm-ax', 'middle'));
        if (i > 0) svg.appendChild(txt(x - gap / 2, baseY - hh - 4, '×1,000', 'hm-t sm hm-acc', 'middle'));
      });
      svg.appendChild(txt(x0, baseY + 14 + 16, st.kind === 'power' ? '各段の下は、1 の単位が何 W か（10 の何乗 W）' : '各段の下は、1 の単位が何 Wh か（10 の何乗 Wh）', 'hm-ax', 'start'));
      // 日本の書き方の印（万・億）を、同じ指数の上に
      var marks = st.kind === 'power' ? [[7, '1 万 kW ＝ 10 MW']] : [[7, '1 万 kWh ＝ 10 MWh'], [11, '1 億 kWh ＝ 100 GWh']];
      var span = (bw + gap) / 3;      // 指数 1 つぶんの横の幅
      marks.forEach(function (mk, j) {
        var x = x0 + bw / 2 + mk[0] * span;
        svg.appendChild(pathEl('M' + (x - 5) + ',' + (baseY + 2) + ' L' + x + ',' + (baseY - 7) + ' L' + (x + 5) + ',' + (baseY + 2) + ' Z', 'hm-flag'));
        var anchor = x > W - 120 ? 'end' : 'start', tx = anchor === 'end' ? x + 4 : x - 4;
        svg.appendChild(txt(tx, baseY - 12 - j * 16, mk[1], 'hm-t sm hm-acc hm-halo', anchor === 'end' ? 'end' : 'start'));
      });
      CN.clear(stairBox).appendChild(svg);
    }
    function sup(n) { var m = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }; return String(n).split('').map(function (c) { return m[c] || c; }).join(''); }
    function draw() {
      var base = st.value * factor(st.unit), us = units(), nat = natural(base), rows = [];
      us.forEach(function (u, i) {
        var isNat = base > 0 && ((st.kind === 'power' ? i : i) === nat && i < 5);
        var tr = h('tr', isNat ? { 'class': 'on', 'aria-current': 'true' } : null);
        tr.appendChild(h('th', { scope: 'row' }, u[0] + (isNat ? '  ●' : ''))); tr.appendChild(h('td', { 'class': 'num' }, plain(base / u[1]) + ' ' + u[0])); rows.push(tr);
      });
      var tb = h('tbody'); rows.forEach(function (r) { tb.appendChild(r); });
      var t = h('table', { 'class': 'tbl hm-convt' }, h('caption', null, '同じ大きさを、全部の単位で（● は 1 以上 1,000 未満で読める単位）'), h('thead', null, h('tr', null, h('th', { scope: 'col' }, '単位'), h('th', { scope: 'col' }, '値'))), tb);
      CN.clear(tblBox).appendChild(h('div', { 'class': 'tbl-wrap' }, t));
      drawStairs(base);
      say.textContent = base > 0 ? plain(st.value) + ' ' + st.unit + ' ＝ ' + (st.kind === 'power' ? powTxt(base, 4) : eneTxt(base, 4)) : '0 より大きい値を入れてください。';
    }
    build();
    watchWidth(stairBox || body, function () { if (stairBox) draw(); });
  };
  CN.searchText.unitconv = function (d) { return [d.title, d.intro || ''].join(' '); };

  /* ================= appmix：家庭の電気の使いみち（機器ごとの平均の電力と、使う時間帯） ================= */
  CN.widgets.appmix = function (el, d, ctx) {
    var days = d.days || 365, devs = d.devices, state = {};
    devs.forEach(function (v) { state[v.id] = { on: true, hrs: v.hours }; });
    var body = begin(el, d, '家庭の電気の使いみち', ctx);
    if (d.intro) body.appendChild(CN.richEl('p', 'hm-intro', d.intro));
    var pbox = h('div', { 'class': 'hm-presets', role: 'group', 'aria-label': 'まとめて動かす' }), pbtns = [];
    pbox.appendChild(h('div', { 'class': 'hm-preset-h' }, 'まとめて動かす（押すと、下のつまみが動きます）'));
    (d.presets || []).forEach(function (p) {
      var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-pressed': 'false' }, p.label);
      b.addEventListener('click', function () { devs.forEach(function (v) { var o = p.set && p.set[v.id]; state[v.id].on = !(o && o.on === false); state[v.id].hrs = o && o.hrs != null ? o.hrs : v.hours; }); syncCtl(); update(p); }); pbox.appendChild(b); pbtns.push([b, p]);
    });
    body.appendChild(pbox);
    var presetNote = h('p', { 'class': 'hm-say', 'aria-live': 'polite' }); body.appendChild(presetNote);
    var resBoxEl = h('div', { 'class': 'hm-results', 'aria-live': 'polite' }); body.appendChild(resBoxEl);
    var list = h('ul', { 'class': 'hm-devs' }), rows = {};
    var maxAvg = Math.max.apply(null, devs.map(function (v) { return v.runW * v.hours / 24; })) * 1.15;
    devs.forEach(function (v) {
      var id = ctx.id + '-' + v.id, li = h('li', { 'class': 'hm-dev' });
      var cb = h('input', { type: 'checkbox', id: id + '-on', checked: true });
      var out = h('output', { 'for': id + '-h', 'class': 'hm-val sm' });
      var r = h('input', { type: 'range', id: id + '-h', min: 0, max: 24, step: 0.1, value: v.hours, 'aria-label': v.name + 'を使う時間（1 日あたり）' });
      var bar = h('span', { 'class': 'hm-bar' }, h('i')), bv = h('span', { 'class': 'hm-bv' });
      li.appendChild(h('div', { 'class': 'hm-dev-n' }, cb, h('label', { 'for': id + '-on' }, v.name)));
      li.appendChild(h('div', { 'class': 'hm-dev-s' }, r, out));
      li.appendChild(h('div', { 'class': 'hm-dev-b' }, bar, bv));
      cb.addEventListener('change', function () { state[v.id].on = cb.checked; update(); });
      r.addEventListener('input', function () { state[v.id].hrs = parseFloat(r.value); update(); });
      rows[v.id] = { cb: cb, r: r, out: out, bar: bar, bv: bv, li: li }; list.appendChild(li);
    });
    body.appendChild(list);
    body.appendChild(CN.richEl('p', 'hm-cap', d.listNote || ''));
    var trackBox = h('div', { 'class': 'hm-tracks' }); body.appendChild(trackBox);
    var chartBox = h('div', { 'class': 'hm-fig' }); body.appendChild(chartBox);
    var tblBox = h('div'); body.appendChild(tblBox);
    if (d.reads && d.reads.length) { var rd = h('div', { 'class': 'hm-read' }, h('h5', null, '読み取れること')); var ul = h('ul'); d.reads.forEach(function (t) { ul.appendChild(CN.richEl('li', '', t)); }); rd.appendChild(ul); body.appendChild(rd); }
    endNote(el, d);
    var model = null;

    function syncCtl() { devs.forEach(function (v) { rows[v.id].cb.checked = state[v.id].on; rows[v.id].r.value = state[v.id].hrs; }); }
    /* 機器の使う時間帯：parts の中心の時刻の前後に、hrs × 割合 の長さの帯（0〜24 時を一周するものとして折り返す） */
    function intervals(v, hrs) {
      var out = [];
      if (v.flat || hrs >= 23.95) return out;
      v.parts.forEach(function (p) {
        var len = hrs * p.f, a = p.c - len / 2, b = p.c + len / 2;
        if (len <= 0) return;
        if (a < 0) { out.push([a + 24, 24]); out.push([0, b]); }
        else if (b > 24) { out.push([a, 24]); out.push([0, b - 24]); }
        else out.push([a, b]);
      });
      return out;
    }
    function compute() {
      var m = { avg: 0, bins: [], per: {} }, N = 96, i;
      for (i = 0; i < N; i++) m.bins.push(0);
      devs.forEach(function (v) {
        var q = state[v.id], hrs = q.on ? q.hrs : 0, wh = v.runW * hrs, iv = intervals(v, hrs);
        m.per[v.id] = { wh: wh, avg: wh / 24, iv: iv, hrs: hrs };
        m.avg += wh / 24;
        if (v.flat || hrs >= 23.95) { for (i = 0; i < N; i++) m.bins[i] += v.runW * hrs / 24; }
        else for (i = 0; i < N; i++) {   // 区間（15 分）と使う時間帯の重なりの割合（図の面積が 1 日の電力量と一致する）
          var b0 = i * 24 / N, b1 = (i + 1) * 24 / N, ov = 0;
          iv.forEach(function (z) { ov += Math.max(0, Math.min(z[1], b1) - Math.max(z[0], b0)); });
          m.bins[i] += v.runW * Math.min(1, ov / (b1 - b0));
        }
      });
      m.kwh = m.avg * 24 / 1000; m.year = m.kwh * days; m.peak = Math.max.apply(null, m.bins);
      m.peakAt = m.bins.indexOf(m.peak) * 24 / N;
      return m;
    }
    function update(preset) {
      model = compute();
      devs.forEach(function (v) {
        var r = rows[v.id], q = state[v.id], pm = model.per[v.id];
        r.out.textContent = fmtFix(q.hrs, 1) + ' 時間'; r.r.setAttribute('aria-valuetext', r.out.textContent); r.r.disabled = !q.on;
        r.bar.firstChild.style.width = clamp(pm.avg / maxAvg * 100, 0, 100) + '%';
        r.bv.textContent = '平均 ' + fmtFix(pm.avg, 0) + ' W（使うとき ' + fmtFix(v.runW, 0) + ' W）';
        r.li.classList.toggle('off', !q.on);
      });
      CN.clear(resBoxEl);
      resBoxEl.appendChild(resBox('合計の平均の電力', fmtFix(model.avg, 0), 'W', '1 日の電力量 ÷ 24 時間', true));
      resBoxEl.appendChild(resBox('1 日の電力量', fmtFix(model.kwh, 1), 'kWh', '＝ 平均 ' + fmtFix(model.avg, 0) + ' W × 24 時間'));
      resBoxEl.appendChild(resBox('1 年の電力量', fmtFix(model.year, 0), 'kWh', '＝ 1 日 × ' + days + ' 日'));
      resBoxEl.appendChild(resBox('同時に動いたときの最大', fmtFix(model.peak, 0), 'W', '模型の一例（約 ' + hourText(model.peakAt) + ' ごろ）。平均の ' + (model.avg > 0 ? fmtFix(model.peak / model.avg, 1) : '—') + ' 倍'));
      pbtns.forEach(function (q) {
        var same = devs.every(function (v) { var o = q[1].set && q[1].set[v.id], on = !(o && o.on === false), hrs = o && o.hrs != null ? o.hrs : v.hours; return state[v.id].on === on && Math.abs(state[v.id].hrs - hrs) < 1e-9; });
        q[0].setAttribute('aria-pressed', String(same)); if (same) presetNote.textContent = q[1].text || '';
      });
      if (!pbtns.some(function (q) { return q[0].getAttribute('aria-pressed') === 'true'; })) presetNote.textContent = d.presetHint || '';
      drawTracks(); drawChart(); drawTable();
    }
    function hourText(t) { var hh = Math.floor(t), mm = Math.round((t - hh) * 60); return hh + ' 時' + (mm ? ' ' + mm + ' 分' : ''); }
    function drawTracks() {
      CN.clear(trackBox);
      trackBox.appendChild(h('h5', { 'class': 'hm-h5' }, '1 日の中で、いつ使うか（帯の長さ ＝ 使う時間）'));
      var axis = h('div', { 'class': 'hm-trk hm-trk-ax' }, h('span', { 'class': 'hm-trk-n' }, '時刻'), h('span', { 'class': 'hm-trk-b' }, [0, 6, 12, 18, 24].map(function (t) { return h('i', { style: 'left:' + (t / 24 * 100) + '%' }, String(t)); })));
      trackBox.appendChild(axis);
      devs.forEach(function (v) {
        var pm = model.per[v.id], q = state[v.id], row = h('div', { 'class': 'hm-trk' + (q.on ? '' : ' off') });
        var b = h('span', { 'class': 'hm-trk-b', role: 'img', 'aria-label': v.name + '：' + (!q.on || pm.hrs <= 0 ? '使わない' : (v.flat || pm.hrs >= 23.95 ? '終日（平均の ' + fmtFix(v.runW * pm.hrs / 24, 0) + ' W で動き続ける）' : pm.iv.map(function (z) { return hourText(z[0]) + 'から' + hourText(z[1]); }).join('、'))) });
        if (q.on && pm.hrs > 0) {
          if (v.flat || pm.hrs >= 23.95) b.appendChild(h('i', { 'class': 'seg flat', style: 'left:0;width:100%;opacity:' + (0.25 + 0.5 * clamp(pm.hrs / 24, 0, 1)) }));
          else pm.iv.forEach(function (z) { b.appendChild(h('i', { 'class': 'seg', style: 'left:' + (z[0] / 24 * 100) + '%;width:' + (Math.max(0.6, (z[1] - z[0]) / 24 * 100)) + '%' })); });
        }
        row.appendChild(h('span', { 'class': 'hm-trk-n' }, v.short || v.name)); row.appendChild(b);
        trackBox.appendChild(row);
      });
      trackBox.appendChild(h('p', { 'class': 'hm-cap' }, '冷蔵庫・待機電力・通信機器・便座は、終日つながっている機器で、平均の電力で一定に動くものとして扱います（薄い帯）。他の機器は、使う時間帯を模型として決めた例です。'));
    }
    function drawChart() {
      var W = Math.min(measure(chartBox, 340), 640), H = 190, m = { l: 48, r: 10, t: 22, b: 30 }, pw = W - m.l - m.r, ph = H - m.t - m.b, N = 96;
      var ymax = Math.max(500, Math.ceil(model.peak * 1.1 / 500) * 500), X = function (t) { return m.l + pw * t / 24; }, Y = function (v) { return m.t + ph * (1 - v / ymax); };
      var svg = svgRoot(W, H, '1 日の合計の電力の図（模型）。縦が電力（W）、横が時刻。平均は ' + fmtFix(model.avg, 0) + ' W、同時に動いたときの最大は ' + fmtFix(model.peak, 0) + ' W（約 ' + hourText(model.peakAt) + ' ごろ）。');
      svg.appendChild(rect(m.l, m.t, pw, ph, 'hm-plot'));
      var step = niceStep(ymax, 4), v;
      for (v = 0; v <= ymax + 1e-6; v += step) { svg.appendChild(line(m.l, Y(v), m.l + pw, Y(v), 'hm-g')); svg.appendChild(txt(m.l - 6, Y(v) + 4, fmtFix(v, 0), 'hm-ax', 'end')); }
      [0, 6, 12, 18, 24].forEach(function (t) { svg.appendChild(line(X(t), m.t, X(t), m.t + ph, 'hm-g v')); svg.appendChild(txt(X(t), m.t + ph + 14, String(t), 'hm-ax', 'middle')); });
      svg.appendChild(txt(4, m.t - 8, '合計の電力（W）', 'hm-ax', 'start')); svg.appendChild(txt(m.l + pw, H - 4, '時刻（時）', 'hm-ax', 'end'));
      var dd = 'M' + X(0) + ',' + Y(0), i;
      for (i = 0; i < N; i++) dd += ' L' + X(i * 24 / N) + ',' + Y(model.bins[i]) + ' L' + X((i + 1) * 24 / N) + ',' + Y(model.bins[i]);
      dd += ' L' + X(24) + ',' + Y(0) + ' Z';
      svg.appendChild(pathEl(dd, 'hm-area'));
      svg.appendChild(line(m.l, Y(model.avg), m.l + pw, Y(model.avg), 'hm-avgline'));
      svg.appendChild(txt(m.l + pw - 4, Y(model.avg) - 5, '平均 ' + fmtFix(model.avg, 0) + ' W', 'hm-t b hm-acc hm-halo', 'end'));
      svg.appendChild(circle(X(model.peakAt + 0.125), Y(model.peak), 4, 'hm-pk'));
      svg.appendChild(txt(clamp(X(model.peakAt), m.l + 60, m.l + pw - 4), Math.max(m.t + 10, Y(model.peak) - 7), '最大 ' + fmtFix(model.peak, 0) + ' W', 'hm-t b', X(model.peakAt) > m.l + pw - 70 ? 'end' : 'start'));
      CN.clear(chartBox).appendChild(svg);
    }
    function drawTable() {
      var rowsT = devs.map(function (v) { var pm = model.per[v.id]; return [v.name, state[v.id].on ? fmtFix(v.runW, 0) + ' W' : '（切）', fmtFix(pm.hrs, 1) + ' 時間', fmtFix(pm.avg, 1) + ' W', fmtFix(pm.wh / 1000, 2) + ' kWh']; });
      rowsT.push(['合計', '', '', fmtFix(model.avg, 1) + ' W', fmtFix(model.kwh, 2) + ' kWh']);
      CN.clear(tblBox).appendChild(details('図の数値（同じ内容の表。読み上げ・印刷用）', tableOf(['機器', '使うときの電力（目安）', '1 日の使う時間', '平均の電力', '1 日の電力量'], rowsT)));
    }
    watchWidth(chartBox, function () { if (model) drawChart(); });
    update();
  };
  CN.searchText.appmix = function (d) { return [d.title, d.intro || '', (d.devices || []).map(function (v) { return v.name; }).join(' ')].join(' '); };

  /* ================= areacircle：円の面積で比べる ================= */
  CN.widgets.areacircle = function (el, d, ctx) {
    var st = { u: d.util.value };
    var body = begin(el, d, '円の面積で比べる', ctx);
    if (d.intro) body.appendChild(CN.richEl('p', 'hm-intro', d.intro));
    var su = slider(ctx, { id: 'u', label: d.util.label, min: d.util.min, max: d.util.max, step: d.util.step, value: d.util.value, fmt: function (v) { return fmtFix(v * 100, 0) + ' %'; }, minmax: [fmtFix(d.util.min * 100, 0) + ' %', fmtFix(d.util.max * 100, 0) + ' %'], onInput: function (v) { st.u = v; draw(); } });
    body.appendChild(su.el);
    body.appendChild(CN.richEl('p', 'hm-assume', d.util.note || ''));
    var grid = h('div', { 'class': 'hm-circles' }), box1 = h('div', { 'class': 'hm-fig' }), box2 = h('div', { 'class': 'hm-fig' });
    grid.appendChild(box1); grid.appendChild(box2); body.appendChild(grid);
    var sayBox = h('ul', { 'class': 'hm-notes', 'aria-live': 'polite' }); body.appendChild(sayBox);
    var tblBox = h('div'); body.appendChild(tblBox);
    endNote(el, d);
    var C = d.circles;      // [{id, name, kw, cls, callout?}]  kw：瞬間の大きさ（kW）
    var house = C.filter(function (c) { return c.callout; })[0], big = C.reduce(function (a, c) { return c.kw > a.kw ? c : a; }, C[0]);

    function panel(box, title, vals, unitText, ghost) {
      var W = Math.min(measure(box, 340), 620), narrow = W < 460, R = narrow ? Math.min(W * 0.3, 120) : Math.min(W * 0.26, 130), H = narrow ? Math.round(R * 2 + 120) : Math.round(R * 2 + 70);
      var svg = svgRoot(W, H, title + '。円の面積が量に比例する。' + vals.map(function (v) { return v.c.name + ' ' + v.text; }).join('、') + '。');
      svg.appendChild(txt(6, 16, title, 'hm-t b', 'start'));
      var rad = function (v) { return R * Math.sqrt(v / big.kw); }, items = vals.filter(function (v) { return !v.c.callout; }).sort(function (a, b) { return b.c.kw - a.c.kw; });
      var cx0 = narrow ? R + 8 : R + 14, cy0 = 30 + R, k = 0, pos = [];
      // 大きい円を左、小さい円を右に並べる
      items.forEach(function (v, i) {
        var r = rad(v.v), cx = i === 0 ? cx0 : (narrow ? W - 8 - Math.max(40, rad(items[1] ? items[1].v : v.v)) - 8 : cx0 + R + 30 + 40 + (i - 1) * 90), cy = i === 0 ? cy0 : (narrow ? 30 + 24 + r : cy0);
        pos.push([v, cx, cy, r]);
      });
      pos.forEach(function (p, i) {
        var v = p[0], cx = p[1], cy = p[2], r = p[3];
        if (ghost) { var gr = ghost(v.c); svg.appendChild(circle(cx, cy, gr, 'hm-ghost')); }
        svg.appendChild(circle(cx, cy, Math.max(r, 1.5), 'hm-circ ' + v.c.cls));
        var lx = cx, ly = i === 0 ? cy : cy + Math.max(r, 6) + 16;
        if (i === 0) { svg.appendChild(txt(lx, ly - 6, v.c.name, 'hm-t b hm-on', 'middle')); svg.appendChild(txt(lx, ly + 11, v.text, 'hm-t hm-on', 'middle')); if (v.mult) svg.appendChild(txt(lx, ly + 28, v.mult, 'hm-t sm hm-on', 'middle')); }
        else {
          var anchor = narrow ? 'end' : 'middle', tx = narrow ? W - 8 : lx;
          svg.appendChild(txt(tx, ly, v.c.name, 'hm-t b', anchor)); svg.appendChild(txt(tx, ly + 16, v.text, 'hm-t', anchor)); if (v.mult) svg.appendChild(txt(tx, ly + 32, v.mult, 'hm-t sm', anchor));
        }
      });
      // 家庭 1 軒：点にしかならないので、拡大の吹き出し
      if (house) {
        var hv = vals.filter(function (v) { return v.c.callout; })[0], hr = rad(hv.v), a = pos[1] || pos[0], bx = narrow ? 50 : (a[1] + 70), by = narrow ? H - 44 : cy0 + R - 26, brr = 17;
        var px = narrow ? 18 : bx - 70, py = by - (narrow ? 0 : 0);
        svg.appendChild(circle(px, py, 1.4, 'hm-circ ' + house.cls));
        svg.appendChild(line(px + 2, py, bx - brr, by, 'hm-lead'));
        svg.appendChild(circle(bx, by, brr + 4, 'hm-lens'));
        svg.appendChild(circle(bx, by, brr, 'hm-circ ' + house.cls));
        svg.appendChild(txt(bx + brr + 6, by - 3, house.name, 'hm-t b', 'start')); svg.appendChild(txt(bx + brr + 6, by + 13, hv.text, 'hm-t', 'start'));
        svg.appendChild(txt(bx + brr + 6, by + 28, '（左の点の拡大図。同じ縮尺では点より小さい）', 'hm-t sm', 'start'));
        void hr;
      }
      CN.clear(box).appendChild(svg);
    }
    function draw() {
      var hh = house.kw;
      var v1 = C.map(function (c) { return { c: c, v: c.kw, text: powTxt(c.kw * 1000, 3), mult: c.callout ? null : '家庭 1 軒の約 ' + ja(c.kw / hh, 2) + ' 倍' }; });
      var v2 = C.map(function (c) { var n = c.kw * st.u / hh; return { c: c, v: c.kw * st.u, text: c.callout ? '1 軒' : '約 ' + ja(n, 2) + ' 世帯分', mult: null }; });
      panel(box1, '① 瞬間の大きさ（出力）', v1, 'kW', null);
      panel(box2, '② 1 日の量（家庭の何軒ぶんか。利用率 ' + fmtFix(st.u * 100, 0) + ' %）', v2, '世帯', function (c) { return Math.max(1.5, panelR(c)); });
      CN.clear(sayBox);
      d.says.forEach(function (t) { sayBox.appendChild(CN.richEl('li', '', fillSay(t))); });
      var rowsT = C.filter(function (c) { return !c.callout; }).map(function (c) { var inst = c.kw / hh, q = inst * st.u; return [c.name, powTxt(c.kw * 1000, 3), '約 ' + ja(inst, 2) + ' 世帯分（家庭の約 ' + ja(inst, 2) + ' 倍）', fmtFix(c.kw * 24 * st.u / 1000, 1) + ' MWh（利用率 ' + fmtFix(st.u * 100, 0) + ' %）', '約 ' + ja(q, 2) + ' 世帯分']; });
      rowsT.unshift([house.name, powTxt(house.kw * 1000, 3), '1 世帯', fmtFix(house.kw * 24, 2) + ' kWh', '1 世帯']);
      CN.clear(tblBox).appendChild(details('図の数値（同じ内容の表。読み上げ・印刷用）', tableOf(['', '出力', '瞬間（出力 ÷ 家庭の平均の電力）', '1 日の量', '量（1 日の量 ÷ 家庭の 1 日）'], rowsT)));
    }
    function panelR(c) { var R = Math.min(measure(box1, 340), 620) < 460 ? Math.min(Math.min(measure(box1, 340), 620) * 0.3, 120) : Math.min(Math.min(measure(box1, 340), 620) * 0.26, 130); return R * Math.sqrt(c.kw / big.kw); }
    function fillSay(t) {
      var hh = house.kw, a = C.filter(function (c) { return c.id === d.axisId; })[0], w = C.filter(function (c) { return c.id === d.wholeId; })[0];
      return t.replace(/\{axisInst\}/g, ja(a.kw / hh, 2)).replace(/\{wholeInst\}/g, ja(w.kw / hh, 2)).replace(/\{axisQty\}/g, ja(a.kw * st.u / hh, 2)).replace(/\{wholeQty\}/g, ja(w.kw * st.u / hh, 2)).replace(/\{u\}/g, fmtFix(st.u * 100, 0));
    }
    watchWidth(box1, draw);
    draw();
  };
  CN.searchText.areacircle = function (d) { return [d.title, d.intro || '', (d.says || []).join(' ')].join(' '); };

  /* ================= bundle：家庭を束ねて、発電所と比べる ================= */
  CN.widgets.bundle = function (el, d, ctx) {
    var hh = d.house.kw, dayKwh = hh * 24, rawShape = d.house.shape, mean = rawShape.reduce(function (a, b) { return a + b; }, 0) / rawShape.length;
    var shape = rawShape.map(function (x) { return x / mean; }), peakF = Math.max.apply(null, shape);
    var plants = d.plants, minLoad = d.minLoad;
    var st = { tab: 'a', N: d.n.value, u: d.util.value, plant: d.plants[0].id, t: d.time.value, mode: 'const' };
    var tabs = CN.tabs([{ key: 'a', label: '① 何軒で届くか' }, { key: 'b', label: '② 1 日の流れ' }, { key: 'c', label: '③ 絵で見る' }], 'a', function (k) { st.tab = k; buildTab(); }, '見方の切替');
    CN.frame(el, '家庭を束ねて、発電所と比べる', d.title, tabs); el.classList.add('hm');
    var body = h('div', { 'class': 'wg-body hm-body' }); el.appendChild(body);
    if (d.intro) body.appendChild(CN.richEl('p', 'hm-intro', d.intro));
    var common = h('div', { 'class': 'hm-common' }), tabBody = h('div', { 'class': 'hm-tabbody' });
    body.appendChild(common); body.appendChild(tabBody);
    if (d.caution) body.appendChild(CN.richEl('p', 'hm-caution', d.caution));
    endNote(el, d);
    function getPlant(id) { return plants.filter(function (p) { return p.id === id; })[0]; }
    var axis = getPlant(d.axisId), whole = getPlant(d.wholeId);

    /* 共通のつまみ：世帯数（対数）と、設備利用率の仮定 */
    var sN = slider(ctx, { id: 'n', label: d.n.label, min: d.n.min, max: d.n.max, step: d.n.step, value: Math.log(st.N) / Math.LN10, fmt: function (e) { return nTxt(Math.abs(e - Math.log(st.N) / Math.LN10) < 0.006 ? st.N : Math.max(1, Math.round(Math.pow(10, e)))); }, minmax: [nTxt(Math.round(Math.pow(10, d.n.min))), nTxt(Math.round(Math.pow(10, d.n.max)))], onInput: function (e) { st.N = Math.max(1, Math.round(Math.pow(10, e))); update(); } });
    var sU = slider(ctx, { id: 'u', label: d.util.label, min: d.util.min, max: d.util.max, step: d.util.step, value: st.u, fmt: function (v) { return fmtFix(v * 100, 0) + ' %'; }, minmax: [fmtFix(d.util.min * 100, 0) + ' %', fmtFix(d.util.max * 100, 0) + ' %'], onInput: function (v) { st.u = v; update(); } });
    common.appendChild(sN.el); common.appendChild(sU.el);
    var nb = h('div', { 'class': 'hm-presets', role: 'group', 'aria-label': '世帯数の目安' }), nbtns = [];
    nb.appendChild(h('div', { 'class': 'hm-preset-h' }, '世帯数をまとめて動かす'));
    d.n.presets.forEach(function (p) { var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-pressed': 'false' }, p.label); b.addEventListener('click', function () { setN(p.n); }); nb.appendChild(b); nbtns.push([b, p]); });
    common.appendChild(nb);
    var uNote = CN.richEl('p', 'hm-assume', d.util.note); common.appendChild(uNote);
    function nTxt(n) { return n >= 1e4 ? '約 ' + ja(n, 3) + ' 軒' : fmtFix(n, 0) + ' 軒'; }
    function setN(n) { st.N = n; sN.set(Math.log(n) / Math.LN10); update(); }
    var dyn = h('div', { 'class': 'hm-dyn', 'aria-live': 'polite' });

    /* ---- 計算（値はすべてデータから） ---- */
    function demandKW() { return st.N * hh; }
    function demandKWhDay() { return st.N * dayKwh; }
    function plantKW(p) { return p.mw * 1000; }
    function plantKWhDay(p) { return plantKW(p) * 24 * st.u; }
    function shapeAt(t) {      // 時刻 t（0〜24）の形。各時間の値を、その時間の中央の値として、輪になるように線でつなぐ
      var x = ((t - 0.5) % 24 + 24) % 24, i = Math.floor(x), f = x - i;
      return shape[i] * (1 - f) + shape[(i + 1) % 24] * f;
    }
    function nTxtFull(n) { return n >= 1e4 ? '約 ' + ja(n, 2) + ' 軒' : fmtFix(n, 0) + ' 軒'; }
    function kwTxt(kw) { return powTxt(kw * 1000, 3); }
    function kwhTxt(kwh) { return eneTxt(kwh * 1000, 3); }

    /* ---- ① 何軒で届くか ---- */
    var aState = {};
    function buildA() {
      CN.clear(tabBody);
      tabBody.appendChild(CN.richEl('p', 'hm-say', d.texts.a));
      aState.svg = h('div', { 'class': 'hm-fig' }); tabBody.appendChild(aState.svg);
      aState.cards = h('div', { 'class': 'hm-results' }); tabBody.appendChild(aState.cards);
      aState.sent = h('ul', { 'class': 'hm-sent' }); tabBody.appendChild(aState.sent);
      aState.tbl = h('div'); tabBody.appendChild(aState.tbl);
      watchWidth(aState.svg, function () { if (st.tab === 'a') drawA(); });
      drawA();
    }
    function drawA() {
      var W = Math.min(measure(aState.svg, 340), 640), rowH = 118, H = rowH * 2 + 10, narrow = W < 480, x0 = 12, x1 = W - 14, pw = x1 - x0;
      var dK = demandKW(), dE = demandKWhDay();
      var svg = svgRoot(W, H, '束ねた家庭の需要の棒（対数の目盛り）。' + nTxt(st.N) + ' で、瞬間の大きさは ' + kwTxt(dK) + '（1 軸の出力の ' + fmtSig(dK / plantKW(axis) * 100, 2) + ' %）、1 日の量は ' + kwhTxt(dE) + '（1 軸の 1 日の発電量の ' + fmtSig(dE / plantKWhDay(axis) * 100, 2) + ' %、利用率 ' + fmtFix(st.u * 100, 0) + ' % の仮定）。');
      function one(y, ttl, lo, hi, val, refs, ticks, unitFn) {
        var X = function (v) { return x0 + pw * clamp((Math.log(v) / Math.LN10 - lo) / (hi - lo), 0, 1); };
        svg.appendChild(txt(x0, y + 14, ttl, 'hm-t b', 'start'));
        var by = y + 58, bh = 16;
        svg.appendChild(rect(x0, by, pw, bh, 'hm-track'));
        svg.appendChild(rect(x0, by, X(val) - x0, bh, 'hm-bar-home'));
        ticks.forEach(function (tk) { var xx = X(tk[0]); svg.appendChild(line(xx, by + bh, xx, by + bh + 5, 'hm-tick')); svg.appendChild(txt(xx, by + bh + 17, tk[1], 'hm-ax', xx < x0 + 14 ? 'start' : (xx > x1 - 14 ? 'end' : 'middle'))); });
        refs.forEach(function (r, i) {
          var xx = X(r.v), hit = val >= r.v;
          svg.appendChild(line(xx, by - 8 - (1 - i) * 0, xx, by + bh + 2, 'hm-ref ' + r.cls));
          var anchor = xx > x1 - 70 ? 'end' : (xx < x0 + 70 ? 'start' : 'middle');
          svg.appendChild(txt(xx, by - 12 - (i === 0 ? 14 : 0) + (i === 0 ? 0 : 0), r.label + (hit ? ' ✓届いた' : ''), 'hm-t sm b ' + r.cls, anchor));
          if (hit) svg.appendChild(circle(xx, by + bh / 2, 5, 'hm-hit ' + r.cls));
        });
        var vx = X(val);
        svg.appendChild(txt(clamp(vx, x0 + 4, x1 - 4), by + bh + 36, unitFn(val), 'hm-t b hm-home', vx > x1 - 90 ? 'end' : (vx < x0 + 60 ? 'start' : 'middle')));
      }
      var refsP = [{ v: plantKW(axis), label: axis.short, cls: 'c-axis' }, { v: plantKW(whole), label: whole.short, cls: 'c-all' }];
      var refsE = [{ v: plantKWhDay(axis), label: axis.short, cls: 'c-axis' }, { v: plantKWhDay(whole), label: whole.short, cls: 'c-all' }];
      one(2, narrow ? '瞬間：束ねた需要と設備の出力' : '瞬間の大きさ：束ねた需要（世帯数 × 平均の電力）と、設備の出力', -1, 7, dK, refsP, (narrow ? [] : [[0.1, '100 W']]).concat([[1, '1 kW'], [1e3, '1 MW'], [1e6, '1 GW']]).concat(narrow ? [] : [[1e7, '10 GW']]), function (v) { return '束ねた需要 ' + kwTxt(v); });
      one(rowH + 6, narrow ? '1 日の量：束ねた使用量と設備の発電量' : '1 日の量：束ねた使用量（世帯数 × 1 日の量）と、設備の 1 日の発電量', 0, 9, dE, refsE, [[1, '1 kWh'], [1e3, '1 MWh'], [1e6, '1 GWh'], [1e9, '1 TWh']], function (v) { return '束ねた使用量 ' + kwhTxt(v); });
      CN.clear(aState.svg).appendChild(svg);
    }
    function updateA() {
      if (!aState.svg) return;
      var dK = demandKW(), dE = demandKWhDay(), ai = plantKW(axis) / hh, wi = plantKW(whole) / hh, aq = ai * st.u, wq = wi * st.u;
      drawA();
      CN.clear(aState.cards);
      aState.cards.appendChild(resBox('世帯数', nTxtFull(st.N).replace('約 ', '約 '), '', '平均の電力 ' + fmtFix(hh, 2) + ' kW／1 日 ' + fmtFix(dayKwh, 2) + ' kWh（1 軒）'));
      aState.cards.appendChild(resBox('瞬間：束ねた需要', fmtSig(dK / 1000, 3), 'MW', axis.short + ' の出力の ' + fmtSig(dK / plantKW(axis) * 100, 3) + ' %／' + whole.short + ' の ' + fmtSig(dK / plantKW(whole) * 100, 3) + ' %', true));
      aState.cards.appendChild(resBox('量：束ねた使用量（1 日）', fmtSig(dE / 1000, 3), 'MWh', axis.short + ' の 1 日の発電量の ' + fmtSig(dE / plantKWhDay(axis) * 100, 3) + ' %／' + whole.short + ' の ' + fmtSig(dE / plantKWhDay(whole) * 100, 3) + ' %', true));
      CN.clear(aState.sent);
      [
        '**瞬間で見ると**：' + axis.name + ' の出力（' + fmtSig(axis.mw, 3) + ' MW）は、家庭の平均の電力の **約 ' + ja(ai, 2) + ' 世帯分**。' + whole.name + '（' + fmtSig(whole.mw, 3) + ' MW）は **約 ' + ja(wi, 2) + ' 世帯分**です（出力 ÷ 平均の電力）。',
        '**量で見ると**（利用率 ' + fmtFix(st.u * 100, 0) + ' % の仮定のもと）：' + axis.short + ' の 1 日の発電量は **約 ' + ja(aq, 2) + ' 世帯分**、' + whole.short + ' は **約 ' + ja(wq, 2) + ' 世帯分**です（1 日の発電量 ÷ 家庭の 1 日の使用量）。',
        '2 つの違い：瞬間は「出力と平均の電力の比」、量は「1 日の発電量と 1 日の使用量の比」です。量のほうは、利用率の仮定を掛けた分だけ小さくなります（' + fmtFix(st.u * 100, 0) + ' % ならば ' + fmtFix(st.u, 2) + ' 倍）。'
      ].forEach(function (t) { aState.sent.appendChild(CN.richEl('li', '', t)); });
      CN.clear(aState.tbl).appendChild(details('図の数値（同じ内容の表。読み上げ・印刷用）', tableOf(['', '瞬間（kW）', '1 日の量（kWh）'], [
        ['束ねた家庭（' + nTxtFull(st.N) + '）', kwTxt(dK), kwhTxt(dE)],
        [axis.name, kwTxt(plantKW(axis)), kwhTxt(plantKWhDay(axis)) + '（利用率 ' + fmtFix(st.u * 100, 0) + ' %）'],
        [whole.name, kwTxt(plantKW(whole)), kwhTxt(plantKWhDay(whole)) + '（利用率 ' + fmtFix(st.u * 100, 0) + ' %）'],
        ['1 軸ぶんの世帯数（瞬間／量）', '約 ' + ja(ai, 2) + ' 軒', '約 ' + ja(aq, 2) + ' 軒'],
        ['全体ぶんの世帯数（瞬間／量）', '約 ' + ja(wi, 2) + ' 軒', '約 ' + ja(wq, 2) + ' 軒']])));
    }

    /* ---- ② 1 日の流れ ---- */
    var bState = {};
    function buildB() {
      CN.clear(tabBody);
      tabBody.appendChild(CN.richEl('p', 'hm-say', d.texts.b));
      var ctl = h('div', { 'class': 'hm-bctl' });
      var pr = h('div', { 'class': 'hm-radio', role: 'radiogroup', 'aria-label': '比べる発電設備' }); pr.appendChild(h('span', { 'class': 'hm-radio-l' }, '比べる設備'));
      bState.pbtn = [];
      [axis, whole].forEach(function (p) {
        var b = h('button', { type: 'button', role: 'radio', 'class': 'btn sm', 'aria-checked': String(st.plant === p.id), 'aria-pressed': String(st.plant === p.id) }, p.name);
        b.addEventListener('click', function () { st.plant = p.id; update(); }); pr.appendChild(b); bState.pbtn.push([b, p]);
      });
      ctl.appendChild(pr);
      var mr = h('div', { 'class': 'hm-radio', role: 'radiogroup', 'aria-label': '発電設備の動かし方' }); mr.appendChild(h('span', { 'class': 'hm-radio-l' }, '色で示す動かし方'));
      bState.mbtn = [];
      [['const', '一定の出力で動かす'], ['follow', '需要に合わせて増減させる']].forEach(function (m) {
        var b = h('button', { type: 'button', role: 'radio', 'class': 'btn sm', 'aria-checked': String(st.mode === m[0]), 'aria-pressed': String(st.mode === m[0]) }, m[1]);
        b.addEventListener('click', function () { st.mode = m[0]; update(); }); mr.appendChild(b); bState.mbtn.push([b, m[0]]);
      });
      ctl.appendChild(mr);
      bState.t = slider(ctx, { id: 't', label: '時刻', min: d.time.min, max: d.time.max, step: d.time.step, value: st.t, fmt: function (v) { return timeTxt(v); }, minmax: ['0 時', '23.5 時'], onInput: function (v) { st.t = v; updateB(); } });
      ctl.appendChild(bState.t.el);
      var jb = h('div', { 'class': 'hm-presets', role: 'group', 'aria-label': '世帯数を合わせる' });
      var b1 = h('button', { type: 'button', 'class': 'btn sm' }, '1 日の量が釣り合う軒数にする'), b2 = h('button', { type: 'button', 'class': 'btn sm' }, '夕方のピークでも足りる軒数にする');
      b1.addEventListener('click', function () { var p = getPlant(st.plant); setN(Math.max(1, Math.round(plantKW(p) * st.u / hh))); });
      b2.addEventListener('click', function () { var p = getPlant(st.plant); setN(Math.max(1, Math.floor(plantKW(p) / (hh * peakF)))); });
      jb.appendChild(b1); jb.appendChild(b2); ctl.appendChild(jb);
      tabBody.appendChild(ctl);
      bState.fig = h('div', { 'class': 'hm-fig' }); tabBody.appendChild(bState.fig);
      bState.legend = h('div', { 'class': 'hm-legend' }); tabBody.appendChild(bState.legend);
      bState.cards = h('div', { 'class': 'hm-results' }); tabBody.appendChild(bState.cards);
      bState.sum = h('ul', { 'class': 'hm-sent' }); tabBody.appendChild(bState.sum);
      bState.tbl = h('div'); tabBody.appendChild(bState.tbl);
      watchWidth(bState.fig, function () { if (st.tab === 'b') drawB(); });
      updateB(); updateButtonsB();
    }
    function updateButtonsB() {
      bState.pbtn.forEach(function (q) { q[0].setAttribute('aria-checked', String(st.plant === q[1].id)); q[0].setAttribute('aria-pressed', String(st.plant === q[1].id)); });
      bState.mbtn.forEach(function (q) { q[0].setAttribute('aria-checked', String(st.mode === q[1])); q[0].setAttribute('aria-pressed', String(st.mode === q[1])); });
    }
    function timeTxt(t) { var hh2 = Math.floor(t), mm = Math.round((t - hh2) * 60); return hh2 + ' 時' + (mm ? ' ' + mm + ' 分' : ''); }
    function curves() {
      var p = getPlant(st.plant), rating = plantKW(p), cst = rating * st.u, lo = rating * minLoad;
      return {
        p: p, rating: rating, cst: cst, lo: lo,
        D: function (t) { return demandKW() * shapeAt(t); },
        S: function (t, mode) { return mode === 'const' ? cst : clamp(demandKW() * shapeAt(t), lo, rating); }
      };
    }
    function drawB() {
      var c = curves(), W = Math.min(measure(bState.fig, 340), 700), H = 250, m = { l: 52, r: 10, t: 26, b: 34 }, pw = W - m.l - m.r, ph = H - m.t - m.b;
      var dmax = 0, t, i; for (i = 0; i <= 96; i++) dmax = Math.max(dmax, c.D(i / 4));
      var ymaxKW = Math.max(c.rating, dmax, c.cst) * 1.12, uk = ymaxKW >= 1e6 ? ['GW', 1e6] : ymaxKW >= 1e3 ? ['MW', 1e3] : ['kW', 1];
      var X = function (tt) { return m.l + pw * tt / 24; }, Y = function (kw) { return m.t + ph * (1 - kw / ymaxKW); };
      var svg = svgRoot(W, H, '1 日の需要と出力の図（模型）。' + nTxt(st.N) + ' の家庭の需要（曲線）と、' + c.p.name + 'の出力（' + (st.mode === 'const' ? '一定の出力 ' + kwTxt(c.cst) : '需要に合わせた出力') + '）。' + timeTxt(st.t) + ' の需要は ' + kwTxt(c.D(st.t)) + '、出力は ' + kwTxt(c.S(st.t, st.mode)) + '。');
      var defs = s('defs', null,
        s('pattern', { id: ctx.id + '-short', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, rect(0, 0, 6, 6, 'hm-pat-bg-short'), line(0, 0, 0, 6, 'hm-pat-ln-short')),
        s('pattern', { id: ctx.id + '-sur', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-45)' }, rect(0, 0, 6, 6, 'hm-pat-bg-sur'), line(0, 0, 6, 0, 'hm-pat-ln-sur')));
      svg.appendChild(defs);
      svg.appendChild(rect(m.l, m.t, pw, ph, 'hm-plot'));
      var step = niceStep(ymaxKW / uk[1], 4), v;
      for (v = 0; v * uk[1] <= ymaxKW + 1e-9; v += step) { svg.appendChild(line(m.l, Y(v * uk[1]), m.l + pw, Y(v * uk[1]), 'hm-g')); svg.appendChild(txt(m.l - 6, Y(v * uk[1]) + 4, fmtSig(v, 4), 'hm-ax', 'end')); }
      [0, 6, 12, 18, 24].forEach(function (tt) { svg.appendChild(line(X(tt), m.t, X(tt), m.t + ph, 'hm-g v')); svg.appendChild(txt(X(tt), m.t + ph + 14, String(tt), 'hm-ax', 'middle')); });
      svg.appendChild(txt(4, m.t - 10, '電力（' + uk[0] + '）', 'hm-ax', 'start')); svg.appendChild(txt(m.l + pw, H - 6, '時刻（時）', 'hm-ax', 'end'));
      // 足りない分・余る分（選んだ動かし方で）
      var runs = [], cur = null, n = 480, prev = null;
      for (i = 0; i <= n; i++) {
        t = 24 * i / n; var dv = c.D(t), sv = c.S(t, st.mode), sg = dv > sv + 1e-9 ? 1 : (sv > dv + 1e-9 ? -1 : 0);
        if (sg !== 0 && (!cur || cur.sg !== sg)) { cur = { sg: sg, pts: [] }; runs.push(cur); }
        if (sg === 0) { cur = null; }
        if (cur) cur.pts.push([t, dv, sv]);
      }
      runs.forEach(function (r) {
        if (r.pts.length < 2) return;
        var up = r.pts.map(function (q) { return X(q[0]) + ',' + Y(q[1]); }), dn = r.pts.slice().reverse().map(function (q) { return X(q[0]) + ',' + Y(q[2]); });
        svg.appendChild(pathEl('M' + up.join(' L') + ' L' + dn.join(' L') + ' Z', r.sg > 0 ? 'hm-short' : 'hm-sur', { fill: 'url(#' + ctx.id + (r.sg > 0 ? '-short' : '-sur') + ')' }));
      });
      // 定格の線
      svg.appendChild(line(m.l, Y(c.rating), m.l + pw, Y(c.rating), 'hm-rating'));
      svg.appendChild(txt(m.l + 4, Y(c.rating) - 4, '定格 ' + kwTxt(c.rating), 'hm-t sm', 'start'));
      // 出力の線（一定／需要に合わせる）
      var pc = 'c-' + (c.p.id === d.wholeId ? 'all' : 'axis');
      svg.appendChild(line(m.l, Y(c.cst), m.l + pw, Y(c.cst), 'hm-sup ' + pc + (st.mode === 'const' ? ' sel' : '')));
      var fd = ''; for (i = 0; i <= 96; i++) fd += (i ? ' L' : 'M') + X(i / 4) + ',' + Y(c.S(i / 4, 'follow'));
      svg.appendChild(pathEl(fd, 'hm-sup follow ' + pc + (st.mode === 'follow' ? ' sel' : '')));
      // 需要の曲線
      var dd = ''; for (i = 0; i <= 96; i++) dd += (i ? ' L' : 'M') + X(i / 4) + ',' + Y(c.D(i / 4));
      svg.appendChild(pathEl(dd, 'hm-dem'));
      // 時刻の印
      var tx = X(st.t); svg.appendChild(line(tx, m.t, tx, m.t + ph, 'hm-cursor'));
      svg.appendChild(circle(tx, Y(c.D(st.t)), 5, 'hm-dot-home')); svg.appendChild(circle(tx, Y(c.S(st.t, st.mode)), 5, 'hm-dot-sup ' + pc));
      svg.appendChild(txt(clamp(tx, m.l + 24, m.l + pw - 24), m.t - 10, timeTxt(st.t), 'hm-t b', 'middle'));
      CN.clear(bState.fig).appendChild(svg);
      // 凡例（線の種類と帯の模様で区別。色だけに頼らない）
      CN.clear(bState.legend);
      function sw(kind, label) { var q = svgRoot(34, 14, ''); q.setAttribute('aria-hidden', 'true'); q.removeAttribute('role'); q.removeAttribute('aria-label'); kind(q); return h('span', { 'class': 'hm-lg' }, q, label); }
      bState.legend.appendChild(sw(function (q) { q.appendChild(line(2, 7, 32, 7, 'hm-dem')); }, '家庭の束の需要'));
      bState.legend.appendChild(sw(function (q) { q.appendChild(line(2, 7, 32, 7, 'hm-sup ' + pc + ' sel')); }, '一定の出力（利用率 ' + fmtFix(st.u * 100, 0) + ' %）'));
      bState.legend.appendChild(sw(function (q) { q.appendChild(pathEl('M2,10 L12,4 L22,10 L32,4', 'hm-sup follow ' + pc + ' sel')); }, '需要に合わせた出力（最低 ' + fmtFix(minLoad * 100, 0) + ' %〜定格）'));
      bState.legend.appendChild(sw(function (q) { q.appendChild(rect(2, 1, 30, 12, 'hm-short', { fill: 'currentColor', 'fill-opacity': '.35' })); q.appendChild(line(2, 13, 32, 1, 'hm-pat-ln-short')); }, '足りない分（需要が出力より大きい）'));
      bState.legend.appendChild(sw(function (q) { q.appendChild(rect(2, 1, 30, 12, 'hm-sur', { fill: 'currentColor', 'fill-opacity': '.2' })); q.appendChild(line(2, 1, 32, 13, 'hm-pat-ln-sur')); }, '余る分（出力が需要より大きい）'));
    }
    function updateB() {
      if (!bState.fig) return;
      var c = curves(), t = st.t, dv = c.D(t), sv = c.S(t, st.mode), cover = dv > 0 ? Math.min(1, sv / dv) : 1;
      drawB(); updateButtonsB();
      // 1 日の収支
      var eD = 0, eS = 0, eShort = 0, eSur = 0, i, n = 96, dt = 24 / n;
      for (i = 0; i < n; i++) { var tt = (i + 0.5) * dt, a = c.D(tt), b = c.S(tt, st.mode); eD += a * dt; eS += b * dt; eShort += Math.max(0, a - b) * dt; eSur += Math.max(0, b - a) * dt; }
      CN.clear(bState.cards);
      bState.cards.appendChild(resBox(timeTxt(t) + ' の需要', fmtSig(dv / (dv >= 1e3 ? 1e3 : 1), 3), dv >= 1e3 ? 'MW' : 'kW', '形の倍率 ' + fmtFix(shapeAt(t), 2) + '（1 日の平均を 1 とする）'));
      bState.cards.appendChild(resBox('そのときの出力', fmtSig(sv / (sv >= 1e3 ? 1e3 : 1), 3), sv >= 1e3 ? 'MW' : 'kW', st.mode === 'const' ? '一定の出力' : '需要に合わせた出力'));
      bState.cards.appendChild(resBox('まかなえる割合', fmtFix(cover * 100, 0), '%', dv > sv + 1e-9 ? '足りない分 ' + kwTxt(dv - sv) : (sv > dv + 1e-9 ? '余る分 ' + kwTxt(sv - dv) : '釣り合っている'), true));
      CN.clear(bState.sum);
      [
        '1 日で見ると：需要は **' + kwhTxt(eD) + '**、出力は **' + kwhTxt(eS) + '**。足りない時間帯の不足は合計 **' + kwhTxt(eShort) + '**、余る時間帯の余りは合計 **' + kwhTxt(eSur) + '** です（' + (st.mode === 'const' ? '一定の出力' : '需要に合わせた出力') + '）。',
        (eShort > 1e-6 && eSur > 1e-6 ? '需要の山の時間帯では**出力が足りなくなり**、谷の時間帯では**出力が余ります**。' : eShort > 1e-6 ? '需要の山の時間帯では**出力が足りなくなります**（この設定では、余る時間帯はありません）。' : eSur > 1e-6 ? '**出力が余る**時間帯があります（この設定では、足りない時間帯はありません）。' : '1 日を通して、出力と需要が釣り合っています。') + '電気は大量にはためておきにくいので、実際の系統は、他の発電所・揚水・蓄電池・需要側の調整で、瞬間ごとに発電と消費を一致させています。',
        'この形の模型では、**ピークの時刻でも定格で足りる軒数**は約 ' + ja(c.rating / (hh * peakF), 2) + ' 軒（定格 ÷（平均の電力 × 山の倍率 ' + fmtFix(peakF, 2) + '））。**1 日の量が釣り合う軒数**は約 ' + ja(c.cst / hh, 2) + ' 軒です。'
      ].forEach(function (x) { bState.sum.appendChild(CN.richEl('li', '', x)); });
      var rowsT = [], hr;
      for (hr = 0; hr < 24; hr++) { var tt2 = hr + 0.5; rowsT.push([hr + ' 時台', kwTxt(c.D(tt2)), kwTxt(c.S(tt2, 'const')), kwTxt(c.S(tt2, 'follow'))]); }
      CN.clear(bState.tbl).appendChild(details('図の数値（同じ内容の表。読み上げ・印刷用）', tableOf(['時刻', '束ねた家庭の需要', '一定の出力', '需要に合わせた出力'], rowsT, nTxt(st.N) + '・' + c.p.name + '・利用率 ' + fmtFix(st.u * 100, 0) + ' %')));
    }

    /* ---- ③ 絵で見る ---- */
    var cState = {};
    function buildC() {
      CN.clear(tabBody);
      tabBody.appendChild(CN.richEl('p', 'hm-say', d.texts.c));
      cState.fig = h('div', { 'class': 'hm-fig' }); tabBody.appendChild(cState.fig);
      cState.legend = h('div', { 'class': 'hm-legend' }); tabBody.appendChild(cState.legend);
      cState.sent = h('ul', { 'class': 'hm-sent' }); tabBody.appendChild(cState.sent);
      watchWidth(cState.fig, function () { if (st.tab === 'c') updateC(); });
      updateC();
    }
    function updateC() {
      if (!cState.fig) return;
      var W = Math.min(measure(cState.fig, 340), 700), unit = 1, units = [1, 10, 100, 1000, 1e4, 1e5, 1e6], i;
      for (i = 0; i < units.length; i++) { unit = units[i]; if (st.N / unit <= 72) break; }
      var M = Math.max(1, Math.ceil(st.N / unit - 1e-9)), isz = 18, pitch = 23, cols = Math.max(6, Math.floor((W - 16) / pitch)), rowsH = Math.ceil(M / cols);
      var nAx = Math.ceil(whole.mw / axis.mw - 1e-9), need = demandKW() / plantKW(axis), nUse = Math.ceil(need - 1e-9), acols = Math.max(6, Math.floor((W - 16) / 21)), rowsA = Math.ceil(nAx / acols);
      var y0 = 34, hy = y0 + rowsH * pitch + 8, busY = hy + 16, ay = busY + 44, H = ay + rowsA * 34 + 56;
      var svg = svgRoot(W, H, '家と発電設備の絵。家の絵 ' + M + ' 個（1 個 ＝ ' + ja(unit, 2) + ' 世帯）で ' + nTxt(st.N) + '。これに必要な ' + axis.name + 'の本数は、約 ' + fmtSig(need, 3) + ' 本分。');
      svg.appendChild(txt(6, 18, '家（1 個 ＝ ' + (unit === 1 ? '1' : fmtFix(unit, 0)) + ' 世帯' + (unit >= 1e4 ? '＝ ' + ja(unit, 2) + ' 世帯' : '') + '）', 'hm-t b', 'start'));
      for (i = 0; i < M; i++) {
        var r = Math.floor(i / cols), cc = i % cols, x = 8 + cc * pitch, y = y0 + r * pitch, frac = (i === M - 1) ? clamp(st.N / unit - (M - 1), 0.12, 1) : 1;
        svg.appendChild(pathEl('M' + (x + isz / 2) + ',' + y + ' L' + (x + isz) + ',' + (y + 8) + ' L' + (x + isz - 3) + ',' + (y + 8) + ' L' + (x + isz - 3) + ',' + (y + isz) + ' L' + (x + 3) + ',' + (y + isz) + ' L' + (x + 3) + ',' + (y + 8) + ' L' + x + ',' + (y + 8) + ' Z', 'hm-house', { 'fill-opacity': String(0.25 + 0.75 * frac) }));
      }
      // 送電網（家から発電設備へ、直接ではなく系統を通る）
      svg.appendChild(line(8, busY, W - 8, busY, 'hm-bus'));
      for (i = 0; i < 3; i++) { var bx = 30 + i * ((W - 60) / 2); svg.appendChild(line(bx, hy - 4, bx, busY, 'hm-bus thin')); svg.appendChild(line(bx, busY, bx, ay - 14, 'hm-bus thin')); }
      svg.appendChild(txt(W / 2, busY - 5, W < 520 ? '電力系統（送電網）：他の発電所や需要もつながる' : '電力系統（送電網）— 実際は、多くの発電所と、家庭以外の需要もここにつながる', 'hm-t sm hm-halo', 'middle'));
      svg.appendChild(txt(6, ay - 20, d.axisIconLabel || '発電設備の軸（1 個 ＝ 1 軸）', 'hm-t b', 'start'));
      for (i = 0; i < nAx; i++) {
        var r2 = Math.floor(i / acols), c2 = i % acols, x2 = 8 + c2 * 21, y2 = ay + r2 * 34, full = i < nUse - 1 || (i === nUse - 1 && need >= nUse - 1e-9), f2 = i < nUse - 1 ? 1 : (i === nUse - 1 ? clamp(need - (nUse - 1), 0, 1) : 0);
        svg.appendChild(rect(x2, y2, 16, 26, 'hm-axis-box'));
        if (f2 > 0) svg.appendChild(rect(x2, y2 + 26 * (1 - f2), 16, 26 * f2, 'hm-axis-fill'));
        svg.appendChild(pathEl('M' + (x2 + 9) + ',' + (y2 + 4) + ' L' + (x2 + 4) + ',' + (y2 + 15) + ' L' + (x2 + 8) + ',' + (y2 + 15) + ' L' + (x2 + 7) + ',' + (y2 + 23) + ' L' + (x2 + 12) + ',' + (y2 + 11) + ' L' + (x2 + 8) + ',' + (y2 + 11) + ' Z', 'hm-bolt' + (f2 > 0.5 ? ' on' : '')));
        void full;
      }
      svg.appendChild(txt(6, ay + rowsA * 34 + 14, '全 ' + nAx + ' 個 ＝ ' + whole.short + 'を ' + fmtFix(axis.mw, 0) + ' MW 級の軸に換算', 'hm-t sm', 'start'));
      svg.appendChild(txt(6, ay + rowsA * 34 + 30, '（' + fmtFix(whole.mw, 0) + ' ÷ ' + fmtFix(axis.mw, 0) + ' ＝ ' + fmtFix(whole.mw / axis.mw, 1) + '）', 'hm-t sm', 'start'));
      svg.appendChild(txt(6, ay + rowsA * 34 + 46, '塗りの高さ ＝ 必要な出力の割合（最後の 1 個は一部だけ）', 'hm-t sm', 'start'));
      CN.clear(cState.fig).appendChild(svg);
      CN.clear(cState.legend);
      function lg(kind, label) { var q = svgRoot(22, 22, ''); q.setAttribute('aria-hidden', 'true'); q.removeAttribute('role'); q.removeAttribute('aria-label'); kind(q); return h('span', { 'class': 'hm-lg' }, q, label); }
      cState.legend.appendChild(lg(function (q) { q.appendChild(pathEl('M11,2 L20,11 L17,11 L17,20 L5,20 L5,11 L2,11 Z', 'hm-house')); }, '家 ＝ ' + (unit === 1 ? '1 世帯' : fmtFix(unit, 0) + ' 世帯（' + ja(unit, 2) + '）')));
      cState.legend.appendChild(lg(function (q) { q.appendChild(rect(3, 2, 16, 18, 'hm-axis-box')); q.appendChild(rect(3, 11, 16, 9, 'hm-axis-fill')); }, '軸 ＝ ' + fmtFix(axis.mw, 0) + ' MW（家庭の約 ' + ja(plantKW(axis) / hh, 2) + ' 世帯分）'));
      CN.clear(cState.sent);
      [
        nTxtFull(st.N) + ' の平均の需要は **' + kwTxt(demandKW()) + '**。' + axis.name + '（' + fmtFix(axis.mw, 0) + ' MW）の **' + (need < 10 ? fmtFix(need, 3) : fmtFix(need, 1)) + ' 本分**で、軸が **' + nUse + ' 本**必要です（瞬間の比べ方。1 本分をわずかでも超えると、もう 1 本が要ります）。',
        whole.name + 'は、実際には **' + whole.axes + ' 軸**です。軸ごとに出力が違い（' + d.axisRange + '）、この図のように同じ大きさの軸が ' + nAx + ' 本あるわけではありません。換算した本数です。'
      ].forEach(function (x) { cState.sent.appendChild(CN.richEl('li', '', x)); });
    }

    function update() {
      nbtns.forEach(function (q) { q[0].setAttribute('aria-pressed', String(q[1].n === st.N)); });
      if (st.tab === 'a') updateA(); else if (st.tab === 'b') updateB(); else updateC();
    }
    function buildTab() { aState = {}; bState = {}; cState = {}; if (st.tab === 'a') buildA(); else if (st.tab === 'b') buildB(); else buildC(); update(); }
    buildTab();
  };
  CN.searchText.bundle = function (d) { return [d.title, d.intro || '', d.caution || '', d.texts ? [d.texts.a, d.texts.b, d.texts.c].join(' ') : ''].join(' '); };
})();
