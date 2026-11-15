/* 部品：scale（大きさの比較）／ lab（式を動かす実験台）。使う章があるときだけ build.py が埋め込む（js/opt/）。
   データ形式は FRAMEWORK.md の「scale」「lab」。どちらも学習用の模型で、実際の設計・工事の判断には使えない。 */
(function () {
  'use strict';
  var h = CN.h, s = CN.s, X = window.CNExpr;

  /* ================= 数の書き方（丸め方はここで決める） ================= */
  function groupDigits(str) { return str.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function sig(x, n) { if (!isFinite(x) || x === 0) return x; var e = Math.floor(Math.log(Math.abs(x)) / Math.LN10 + 1e-12), f = Math.pow(10, n - 1 - e); return Math.round(x * f) / f; }
  /* 有効数字 n 桁。末尾の 0 は消し、3 桁ごとにカンマ */
  function fmtSig(x, n) {
    if (!isFinite(x)) return '—';
    if (x === 0) return '0';
    var v = sig(x, n), dec = Math.max(0, n - 1 - Math.floor(Math.log(Math.abs(v)) / Math.LN10 + 1e-12));
    var str = Math.abs(v).toFixed(Math.min(dec, 12));
    if (str.indexOf('.') >= 0) str = str.replace(/0+$/, '').replace(/\.$/, '');
    var parts = str.split('.'); parts[0] = groupDigits(parts[0]);
    return (v < 0 ? '−' : '') + parts.join('.');
  }
  /* 小数 d 桁に固定（lab の結果用） */
  function fmtFixed(x, d) {
    if (!isFinite(x)) return '—';
    var str = Math.abs(x).toFixed(d), parts = str.split('.'); parts[0] = groupDigits(parts[0]);
    var out = parts.join('.');
    return (x < 0 && /[1-9]/.test(str) ? '−' : '') + out;
  }
  var PUNITS = [['TW', 1e12], ['GW', 1e9], ['MW', 1e6], ['kW', 1e3], ['W', 1]];
  /* 電力 W を、W・kW・MW・GW・TW のうち読みやすいものに */
  function powText(w, n, base) {
    var units = base === 'Wh' ? PUNITS.map(function (u) { return [u[0].replace('W', 'Wh'), u[1]]; }) : PUNITS, k = 0;
    n = n || 3;
    for (k = 0; k < units.length - 1; k++) if (w >= units[k][1]) break;
    if (sig(w / units[k][1], n) >= 1000 && k > 0) k--;
    return fmtSig(w / units[k][1], n) + ' ' + units[k][0];
  }
  /* 倍率（何軒分など）：有効数字 2 桁。1 億以上は「億」、1 万以上は「万」 */
  function ratioText(r) {
    if (!isFinite(r) || r <= 0) return '—';
    if (r >= 1e8) return fmtSig(r / 1e8, 2) + ' 億';
    if (r >= 1e4) return fmtSig(r / 1e4, 2) + ' 万';
    return fmtSig(r, 2);
  }
  CN.numfmt = { sig: sig, fmtSig: fmtSig, fmtFixed: fmtFixed, powText: powText, ratioText: ratioText };

  function measure(el, fallback) { var w = el.clientWidth; return w > 40 ? w : (fallback || 320); }
  function watchWidth(el, fn) {
    var last = 0, t = null;
    function chk() { var w = el.clientWidth; if (w > 40 && Math.abs(w - last) > 2) { last = w; fn(); } }
    if (window.ResizeObserver) { var ro = new ResizeObserver(function () { clearTimeout(t); t = setTimeout(chk, 60); }); ro.observe(el); }
    else window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(chk, 120); });
    setTimeout(chk, 0);
  }
  function enter(e) { return e.key === 'Enter' || e.key === ' '; }

  /* ================= scale ================= */
  var UNIT = { W: 1, kW: 1e3, MW: 1e6, GW: 1e9, TW: 1e12, '万kW': 1e7, '千kW': 1e6, VA: 1, kVA: 1e3, MVA: 1e6, GVA: 1e9 };
  var EUNIT = { Wh: 1, kWh: 1e3, MWh: 1e6, GWh: 1e9, TWh: 1e12 };
  var STAGES = [
    { key: 'all', label: '全体（1 W 〜 10 TW）', lo: 0, hi: 13 },
    { key: 'home', label: '家庭の桁', lo: 0, hi: 4 },
    { key: 'plant', label: '設備・発電所の桁', lo: 3, hi: 10 },
    { key: 'nation', label: '国の桁', lo: 6, hi: 13 }
  ];
  CN.SCALE_UNITS = UNIT; CN.SCALE_EUNITS = EUNIT;
  var GCLS = ['ue', 'ran', 'core', 'db', 'pol', 'ext', 'ims'];

  /* 項目を W に正規化する。値は必ずデータから（value＋unit、from＝電力量÷時間、range）。 */
  function normItem(it) {
    var o = { it: it, id: it.id, name: it.name, short: it.short || it.name, counter: it.counter || '個' };
    if (it.from) {
      var e = it.from.energy * (EUNIT[it.from.unit || 'kWh'] || 1);
      o.w = e / it.from.hours; o.derived = true;
      o.disp = it.shown || (powText(o.w, 3));
    } else if (it.range) {
      var u = UNIT[it.unit] || 1;
      o.lo = it.range[0] * u; o.hi = it.range[1] * u; o.w = Math.sqrt(o.lo * o.hi); o.isRange = true;
      o.disp = it.shown || (groupDigits(String(it.range[0])) + '〜' + groupDigits(String(it.range[1])) + ' ' + it.unit);
    } else {
      o.w = it.value * (UNIT[it.unit] || 1);
      o.disp = it.shown || (groupDigits(String(it.value)) + ' ' + it.unit);
    }
    if (!o.isRange) { o.lo = o.hi = o.w; }
    return o;
  }

  CN.widgets.scale = function (el, d, ctx) {
    var items = d.items.map(normItem), byId = {}, groups = d.groups || [], gIdx = {}, sources = d.sources || [];
    items.forEach(function (o) { byId[o.id] = o; });
    groups.forEach(function (g, i) { gIdx[g.key] = i; });
    var stages = d.stages || STAGES, st = stages[0], win = { lo: st.lo, hi: st.hi };
    var A = byId[d.initial || (d.items[0] || {}).id], B = byId[d.base] || items[0], probe = (d.probe != null ? d.probe : Math.log(B.w) / Math.LN10);
    var tabs = CN.tabs(stages.map(function (x) { return { key: x.key, label: x.label }; }), st.key, function (k) { setStage(k); }, '表示する桁の範囲');
    CN.frame(el, '大きさの比較', d.title, tabs);
    var body = h('div', { 'class': 'wg-body sc-body' });
    var ctl = h('div', { 'class': 'sc-ctl' });
    function cbtn(label, aria, fn) { var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-label': aria }, label); b.addEventListener('click', fn); return b; }
    ctl.appendChild(cbtn('＋ 拡大', '物差しを拡大（表示する桁を狭くする）', function () { zoom(0.5); }));
    ctl.appendChild(cbtn('− 縮小', '物差しを縮小（表示する桁を広くする）', function () { zoom(2); }));
    ctl.appendChild(cbtn('▲ 大きい方へ', '表示する範囲を大きい方へ 1 桁ずらす', function () { shift(1); }));
    ctl.appendChild(cbtn('▼ 小さい方へ', '表示する範囲を小さい方へ 1 桁ずらす', function () { shift(-1); }));
    var rangeNote = h('span', { 'class': 'sc-range', role: 'status' });
    ctl.appendChild(rangeNote);
    body.appendChild(ctl);
    var grid = h('div', { 'class': 'sc-grid' }), rulerBox = h('div', { 'class': 'sc-ruler' }), panel = h('div', { 'class': 'sc-panel' });
    grid.appendChild(panel); grid.appendChild(rulerBox); body.appendChild(grid);
    el.appendChild(body);

    /* ---- 右（スマホでは上）：選択と計算 ---- */
    var selA = h('select', { id: ctx.id + '-a' }), selB = h('select', { id: ctx.id + '-b' });
    items.forEach(function (o) { selA.appendChild(h('option', { value: o.id }, o.name)); selB.appendChild(h('option', { value: o.id }, o.name)); });
    var swap = h('button', { type: 'button', 'class': 'btn sm' }, '⇄ 入れ替える');
    panel.appendChild(h('div', { 'class': 'sc-sel' },
      h('label', { 'for': ctx.id + '-a' }, '比べる項目（A）'), selA,
      h('label', { 'for': ctx.id + '-b' }, '基準にする項目（B。「何軒分」「何基分」の単位）'), selB, swap));
    var result = h('div', { 'class': 'sc-result', 'aria-live': 'polite' });
    panel.appendChild(result);
    var pr = h('div', { 'class': 'sc-probe' });
    var rng = h('input', { type: 'range', id: ctx.id + '-p', min: 0, max: 13, step: 0.01, value: probe });
    pr.appendChild(h('label', { 'for': ctx.id + '-p' }, '好きな大きさを探る（つまみ。矢印キーで動かせます）'));
    pr.appendChild(rng);
    var probeOut = h('div', { 'class': 'sc-probe-out', 'aria-live': 'polite' });
    pr.appendChild(probeOut); panel.appendChild(pr);
    var detail = h('div', { 'class': 'sc-detail' }); panel.appendChild(detail);

    selA.addEventListener('change', function () { setA(selA.value); });
    selB.addEventListener('change', function () { setB(selB.value); });
    swap.addEventListener('click', function () { var t = A; A = B; B = t; refresh(); });
    rng.addEventListener('input', function () { probe = parseFloat(rng.value); refreshProbe(); drawRuler(); });

    /* ---- 左：対数の物差し（縦。上ほど大きい） ---- */
    var svg = null;
    function Hpx() { return measure(rulerBox, 340) < 420 ? 520 : 600; }
    function drawRuler() {
      var W = measure(rulerBox, 340), Hh = Hpx(), top = 18, bot = 18, axisX = 66, lo = win.lo, hi = win.hi, span = hi - lo;
      var yOf = function (w) { return top + (hi - Math.log(w) / Math.LN10) / span * (Hh - top - bot); };
      var out = [];
      var svg2 = s('svg', { 'class': 'sc-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'group', 'aria-label': d.title + '（対数の物差し。' + items.length + ' 項目。同じ内容の表が下にあります）' });
      svg2.appendChild(s('line', { 'class': 'sc-axis', x1: axisX, y1: top, x2: axisX, y2: Hh - bot }));
      for (var e = Math.ceil(lo - 1e-9); e <= Math.floor(hi + 1e-9); e++) {
        var y = yOf(Math.pow(10, e)), major = e % 3 === 0, u = e >= 12 ? 'TW' : e >= 9 ? 'GW' : e >= 6 ? 'MW' : e >= 3 ? 'kW' : 'W', m = Math.pow(10, e - (e >= 12 ? 12 : e >= 9 ? 9 : e >= 6 ? 6 : e >= 3 ? 3 : 0));
        svg2.appendChild(s('line', { 'class': 'sc-tick' + (major ? ' maj' : ''), x1: axisX - (major ? 14 : 8), y1: y, x2: axisX, y2: y }));
        if (major) svg2.appendChild(s('line', { 'class': 'sc-gl', x1: axisX, y1: y, x2: W - 4, y2: y }));
        svg2.appendChild(s('text', { 'class': 'sc-tl' + (major ? ' maj' : ''), x: axisX - 18, y: y + 4, 'text-anchor': 'end' }, m + ' ' + u));
      }
      /* 探る値の線 */
      if (probe >= lo && probe <= hi) {
        var py = yOf(Math.pow(10, probe));
        svg2.appendChild(s('line', { 'class': 'sc-probe-ln', x1: axisX - 4, y1: py, x2: W - 4, y2: py }));
        svg2.appendChild(s('text', { 'class': 'sc-probe-tx halo', x: W - 6, y: py - 5, 'text-anchor': 'end' }, '探る値 ' + powText(Math.pow(10, probe), 3)));
      }
      /* 窓の中の項目。ラベルは重ならないよう縦にずらす */
      var vis = items.filter(function (o) { return o.hi >= Math.pow(10, lo) * 0.9999 && o.lo <= Math.pow(10, hi) * 1.0001; });
      var hid = items.filter(function (o) { return vis.indexOf(o) < 0; });
      vis.sort(function (a, b) { return b.w - a.w; });
      var LH = W < 420 ? 34 : 36, ly = vis.map(function (o) { return Math.min(Hh - bot, Math.max(top, yOf(o.w))); });
      for (var i = 1; i < ly.length; i++) ly[i] = Math.max(ly[i], ly[i - 1] + LH);
      for (i = ly.length - 2; i >= 0; i--) { if (ly[i + 1] > Hh - bot - 4) ly[i + 1] = Hh - bot - 4; ly[i] = Math.min(ly[i], ly[i + 1] - LH); }
      var labX = axisX + 34;
      vis.forEach(function (o, k) {
        var cy = yOf(o.w), gi = gIdx[o.it.group] != null ? gIdx[o.it.group] : 0, isA = o === A, isB = o === B;
        var g = s('g', { 'class': 'sc-it g' + (gi % GCLS.length) + (isA ? ' selA' : '') + (isB ? ' selB' : ''), tabindex: 0, role: 'button', 'aria-pressed': String(isA), 'aria-label': o.name + '、' + o.disp + (isA ? '（比べる項目に選択中）' : '') + (isB ? '（基準の項目）' : '') });
        g.setAttribute('data-id', o.id);
        g.appendChild(s('polyline', { 'class': 'sc-lead', points: (axisX + 10) + ',' + cy + ' ' + (labX - 10) + ',' + ly[k] + ' ' + (labX - 4) + ',' + ly[k] }));
        g.appendChild(s('rect', { 'class': 'sc-hit', x: labX - 6, y: ly[k] - LH / 2 + 2, width: W - labX - 2, height: LH - 2, rx: 6 }));
        if (o.isRange) {
          var y1 = yOf(o.hi), y2 = yOf(o.lo);
          g.appendChild(s('rect', { 'class': 'sc-mk range', x: axisX - 6, y: Math.max(top, y1), width: 12, height: Math.max(6, Math.min(Hh - bot, y2) - Math.max(top, y1)), rx: 5 }));
        } else g.appendChild(s('circle', { 'class': 'sc-mk', cx: axisX, cy: cy, r: isA || isB ? 9 : 7 }));
        var tag = isA && isB ? 'A・基準' : isA ? 'A' : isB ? '基準' : '';
        var tx = labX;
        if (tag) { var tw = tag.length * 11 + 10; g.appendChild(s('rect', { 'class': 'sc-tag', x: tx, y: ly[k] - 14, width: tw, height: 16, rx: 8 })); g.appendChild(s('text', { 'class': 'sc-tag-t', x: tx + tw / 2, y: ly[k] - 2, 'text-anchor': 'middle' }, tag)); tx += tw + 5; }
        g.appendChild(s('text', { 'class': 'sc-l1', x: tx, y: ly[k] - 2 }, o.short));
        g.appendChild(s('text', { 'class': 'sc-l2', x: labX, y: ly[k] + 14 }, o.disp));
        g.addEventListener('click', function () { setA(o.id); });
        g.addEventListener('keydown', function (ev) {
          if (enter(ev)) { ev.preventDefault(); setA(o.id); }
          else if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
            ev.preventDefault(); var all = svg2.querySelectorAll('.sc-it'), idx = Array.prototype.indexOf.call(all, g), nx = all[idx + (ev.key === 'ArrowDown' ? 1 : -1)]; if (nx) nx.focus();
          } else if (ev.key === 'b' || ev.key === 'B') { ev.preventDefault(); setB(o.id); }
        });
        svg2.appendChild(g);
      });
      var ae = document.activeElement, keepId = ae && rulerBox.contains(ae) && ae.getAttribute ? ae.getAttribute('data-id') : null;
      CN.clear(rulerBox);
      rulerBox.appendChild(svg2); svg = svg2;
      if (keepId) { var kf = svg2.querySelector('.sc-it[data-id="' + keepId + '"]'); if (kf) kf.focus(); }
      var note = h('p', { 'class': 'sc-out' }, hid.length ? 'この範囲の外にある項目：' + hid.map(function (o) { return o.short; }).join('、') + '（「全体」か「縮小」で表示）' : 'すべての項目がこの範囲に入っています。');
      rulerBox.appendChild(note);
      rulerBox.appendChild(h('p', { 'class': 'sc-keys' }, '項目は Tab で選び、Enter で「比べる項目（A）」に、b キーで「基準」にします。矢印の上下で隣の項目へ移れます。'));
      rangeNote.textContent = '表示中：' + powText(Math.pow(10, lo), 1) + ' 〜 ' + powText(Math.pow(10, hi), 1);
    }

    function setStage(k) {
      var x = stages.filter(function (z) { return z.key === k; })[0]; if (!x) return;
      win = { lo: x.lo, hi: x.hi }; syncTabs(k); drawRuler();
    }
    function syncTabs(k) {
      var bs = el.querySelectorAll('.wg-tabs button');
      Array.prototype.forEach.call(bs, function (b, i) { b.setAttribute('aria-pressed', String(k != null && stages[i] && stages[i].key === k)); });
    }
    function zoom(f) {
      var c = (win.lo + win.hi) / 2, sp = (win.hi - win.lo) * f;
      sp = Math.max(2, Math.min(13, sp)); win = { lo: c - sp / 2, hi: c + sp / 2 };
      if (win.lo < 0) { win.hi -= win.lo; win.lo = 0; } if (win.hi > 13) { win.lo -= win.hi - 13; win.hi = 13; }
      win.lo = Math.max(0, Math.round(win.lo)); win.hi = Math.min(13, Math.round(win.hi)); if (win.hi - win.lo < 2) win.hi = win.lo + 2;
      syncTabs(null); drawRuler();
    }
    function shift(n) {
      var sp = win.hi - win.lo, lo = Math.max(0, Math.min(13 - sp, win.lo + n)); win = { lo: lo, hi: lo + sp }; syncTabs(null); drawRuler();
    }
    function inWin(o) { return o.hi >= Math.pow(10, win.lo) * 0.9999 && o.lo <= Math.pow(10, win.hi) * 1.0001; }
    function setA(id) { A = byId[id]; if (!inWin(A)) setStage(stages[0].key); refresh(); }
    function setB(id) { B = byId[id]; refresh(); }

    /* 数え方が「倍」のとき（国・世界など、「何軒分」と言えない基準）は「約 X 倍」と言う */
    function times(r, c) { return c === '倍' ? '約 ' + ratioText(r) + ' 倍' : '約 ' + ratioText(r) + c + '分'; }
    function bunno(x) { var t = ratioText(x); return t + (/[万億]$/.test(t) ? '' : ' ') + '分の 1'; }
    function ratioSentence(a, b) {
      var rl = a.lo / b.hi, rh = a.hi / b.lo, one = !a.isRange && !b.isRange, r = a.w / b.w, c = b.counter;
      if (a === b) return '同じ項目です（1 倍）。';
      if (one) {
        if (Math.abs(r - 1) < 0.05) return a.name + 'は、' + b.name + 'とほぼ同じ大きさです（約 1 倍）。';
        if (r < 1) return a.name + 'は、' + b.name + 'の約 ' + bunno(1 / r) + ' です。';
        return a.name + 'は、' + b.name + 'の' + times(r, c) + 'です。';
      }
      if (rh < 1) return a.name + 'は、' + b.name + 'の約 ' + ratioText(1 / rh) + '〜' + bunno(1 / rl) + ' です。';
      return a.name + 'は、' + b.name + 'の約 ' + ratioText(rl) + '〜' + ratioText(rh) + (c === '倍' ? ' 倍' : c + '分') + 'です。';
    }
    function calcLine(a, b) {
      var one = !a.isRange && !b.isRange;
      function wtxt(o) { return o.isRange ? fmtSig(o.lo, 3) + '〜' + fmtSig(o.hi, 3) + ' W' : fmtSig(o.w, 3) + ' W'; }
      if (one && a.w < b.w) return '計算：' + wtxt(b) + ' ÷ ' + wtxt(a) + ' ＝ ' + fmtSig(b.w / a.w, 3) + '（B が A の何倍かを出し、有効数字 2 桁に丸めて「何分の 1」にしています）';
      if (one) return '計算：' + wtxt(a) + ' ÷ ' + wtxt(b) + ' ＝ ' + fmtSig(a.w / b.w, 3) + '（有効数字 2 桁に丸めて上の文にしています）';
      return '計算：（' + wtxt(a) + '）÷（' + wtxt(b) + '）。幅のある項目は、最小と最大の組み合わせで範囲を出しています。';
    }
    function refreshProbe() {
      var w = Math.pow(10, probe), r = w / B.w, near = items.slice().sort(function (p, q) { return Math.abs(Math.log(p.w / w)) - Math.abs(Math.log(q.w / w)); })[0];
      var tx = '探る値：' + powText(w, 3) + '。' + B.name + 'の ' + (Math.abs(r - 1) < 0.05 ? 'ほぼ同じ大きさ（約 1 倍）' : r < 1 ? '約 ' + bunno(1 / r) : times(r, B.counter)) + '。いちばん近い項目は「' + near.short + '」（' + near.disp + '）。';
      probeOut.textContent = tx; rng.setAttribute('aria-valuetext', powText(w, 3));
    }
    function refresh() {
      selA.value = A.id; selB.value = B.id;
      CN.clear(result);
      result.appendChild(h('p', { 'class': 'sc-sent' }, ratioSentence(A, B)));
      result.appendChild(h('p', { 'class': 'sc-calc' }, calcLine(A, B)));
      result.appendChild(h('p', { 'class': 'sc-caution' }, d.caution || '倍率は、値の大きさだけを比べた目安です。条件（定格・平均・総出力・見通しなど）が項目ごとに違うので、実際の「何軒分」とは限りません。'));
      CN.clear(detail);
      [A, B].forEach(function (o, k) {
        if (k === 1 && B === A) return;
        var it = o.it, gname = (groups[gIdx[it.group]] || {}).label || '';
        var box = h('div', { 'class': 'sc-card' });
        box.appendChild(h('p', { 'class': 'kick' }, (k === 0 ? '比べる項目（A）' : '基準の項目（B）') + (gname ? ' ・ ' + gname : '')));
        box.appendChild(h('h5', null, o.name));
        box.appendChild(h('p', { 'class': 'sc-val' }, o.disp + (o.derived ? '（' + (it.from.formula || '') + '）' : '')));
        if (it.desc) box.appendChild(CN.richEl('p', '', it.desc));
        if (it.cond) box.appendChild(CN.richEl('p', 'sc-cond', '条件：' + it.cond));
        box.appendChild(h('p', { 'class': 'sc-srcs' }, '出典：' + (it.src || []).map(function (n) { return '[' + n + ']'; }).join(' ') + '（下の出典の一覧）'));
        if (it.ch && it.ch.length) box.appendChild(CN.chLinks(it.ch));
        detail.appendChild(box);
      });
      refreshProbe();
      if (svg) drawRuler();
    }

    /* ---- 下：出典の一覧と、同じ内容の表 ---- */
    var srcBox = h('div', { 'class': 'sc-sources' });
    srcBox.appendChild(h('h5', null, '出典の一覧'));
    var ol = h('ol');
    sources.forEach(function (x) {
      var li = h('li', { value: x.n }, (x.issuer ? x.issuer + '『' : '『') + x.title + '』' + (x.date ? '、' + x.date : '') + (x.note ? '。' + x.note : '') + ' ');
      if (x.url) li.appendChild(h('a', { href: x.url, target: '_blank', rel: 'noopener noreferrer' }, '個別ページ'));
      ol.appendChild(li);
    });
    srcBox.appendChild(ol); el.appendChild(srcBox);
    var det = h('details', { 'class': 'seq-list sc-table' }, h('summary', null, '項目の一覧（同じ内容の表。読み上げ・印刷用）'));
    var tb = h('tbody');
    items.slice().sort(function (p, q) { return p.w - q.w; }).forEach(function (o) {
      var it = o.it, gname = (groups[gIdx[it.group]] || {}).label || '';
      tb.appendChild(h('tr', null, h('th', { scope: 'row' }, o.name), h('td', null, gname), h('td', null, o.disp), h('td', null, o.isRange ? fmtSig(o.lo, 3) + '〜' + fmtSig(o.hi, 3) : fmtSig(o.w, 3)), h('td', null, it.cond || ''), h('td', null, (it.src || []).map(function (n) { return '[' + n + ']'; }).join(' '))));
    });
    det.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, d.title + '：小さい順（W 換算は有効数字 3 桁）'), h('thead', null, h('tr', null, ['項目', '区分', '公表値（出典の表記）', 'W に直した値', '条件', '出典'].map(function (c) { return h('th', { scope: 'col' }, c); }))), tb)));
    el.appendChild(det);
    if (d.disclaimer !== false) el.appendChild(h('p', { 'class': 'lab-disc' }, d.disclaimer || '学習用の模型です。実際の設計や工事の判断には使えません。'));

    refresh();
    watchWidth(rulerBox, drawRuler);
  };
  CN.searchText.scale = function (d) {
    var out = [d.title]; d.items.forEach(function (x) { out.push(x.name, x.short, x.desc, x.cond); }); (d.sources || []).forEach(function (x) { out.push(x.issuer, x.title); });
    return out.filter(Boolean).join(' ');
  };

  /* ================= lab ================= */
  var COLORS = ['ran', 'core', 'pol', 'ims'];
  function numSteps(step) { var m = /\.(\d+)/.exec(String(step)); return m ? m[1].length : 0; }

  CN.widgets.lab = function (el, d, ctx) {
    var exps = d.experiments, cur = 0, state = exps.map(function (x) { var v = {}; x.inputs.forEach(function (i) { v[i.id] = i.value; }); return v; });
    var compiled = exps.map(function (x) { return compileExp(x); });
    var tabs = exps.length > 1 ? CN.tabs(exps.map(function (x, i) { return { key: i, label: x.label }; }), 0, function (k) { cur = k; build(); }, '実験の切替') : null;
    CN.frame(el, '式を動かす実験台', d.title, tabs);
    var body = h('div', { 'class': 'wg-body lab-body' }); el.appendChild(body);
    if (d.disclaimer !== false) el.appendChild(h('p', { 'class': 'lab-disc' }, d.disclaimer || '学習用の模型です。実際の設計や工事の判断には使えません。'));
    var figBox = null, resBox = null, readBox = null, sayBoxes = {}, tableBox = null, outEls = {}, constBox = null, lastEnv = null;

    function compileExp(x) {
      var c = { calc: (x.calc || []).map(function (k) { return { id: k.id, f: X.compile(k.expr) }; }), results: (x.results || []).map(function (r) { return { r: r, f: X.compile(r.expr) }; }),
        reads: (x.reads || []).map(function (r) { return { r: r, f: r.when ? X.compile(r.when) : null }; }), says: {} };
      x.inputs.forEach(function (i) { c.says[i.id] = (i.say || []).map(function (r) { return { r: r, f: r.when ? X.compile(r.when) : null }; }); });
      return c;
    }
    function env(k) {
      var x = exps[k], e = {}, key;
      (x.consts || []).forEach(function (c) { e[c.id] = c.value; });
      for (key in state[k]) e[key] = state[k][key];
      compiled[k].calc.forEach(function (c) { try { e[c.id] = c.f.run(e); } catch (er) { e[c.id] = NaN; } });
      return e;
    }
    function ev(f, e) { try { return f.run(e); } catch (er) { return NaN; } }
    function show(v, digits, auto) {
      if (!isFinite(v)) return { num: '—', unit: '' };
      if (auto) { var t = powText(v, digits != null ? Math.max(2, digits) : 3, auto === 'Wh' ? 'Wh' : 'W'); var sp = t.lastIndexOf(' '); return { num: t.slice(0, sp), unit: t.slice(sp + 1) }; }
      var dg = digits != null ? digits : 2;
      /* 0 でないのに丸めると 0 になる値は「0.001 未満」と出す */
      if (v > 1e-9 && !/[1-9]/.test(Math.abs(v).toFixed(dg))) return { num: fmtFixed(Math.pow(10, -dg), dg), unit: '', lt: true };
      return { num: fmtFixed(v, dg), unit: '' };
    }

    function build() {
      var x = exps[cur]; CN.clear(body);
      if (x.intro) body.appendChild(CN.richEl('p', 'lab-intro', x.intro));
      var top = h('div', { 'class': 'lab-top' }), inputs = h('div', { 'class': 'lab-inputs' }), right = h('div', { 'class': 'lab-right' });
      top.appendChild(inputs); top.appendChild(right); body.appendChild(top);
      sayBoxes = {}; outEls = {};
      x.inputs.forEach(function (i) {
        var id = ctx.id + '-' + cur + '-' + i.id, dec = numSteps(i.step);
        var wrap = h('div', { 'class': 'lab-in' });
        var out = h('output', { 'for': id, 'class': 'lab-val' });
        wrap.appendChild(h('div', { 'class': 'lab-in-h' }, h('label', { 'for': id }, i.label + (i.unit ? '（' + i.unit + '）' : '')), out));
        var r = h('input', { type: 'range', id: id, min: i.min, max: i.max, step: i.step, value: state[cur][i.id] });
        function upd() {
          state[cur][i.id] = parseFloat(r.value); out.textContent = fmtFixed(state[cur][i.id], dec) + (i.unit ? ' ' + i.unit : '');
          r.setAttribute('aria-valuetext', out.textContent); refresh();
        }
        r.addEventListener('input', upd); wrap.appendChild(r);
        wrap.appendChild(h('div', { 'class': 'lab-minmax' }, h('span', null, fmtFixed(i.min, dec)), h('span', null, fmtFixed(i.max, dec))));
        if (i.presets && i.presets.length) {
          var pw = h('div', { 'class': 'lab-presets', role: 'group', 'aria-label': i.label + 'の目安の値' });
          i.presets.forEach(function (p) { var b = h('button', { type: 'button', 'class': 'btn sm' }, p.label); b.addEventListener('click', function () { r.value = p.value; upd(); }); pw.appendChild(b); });
          wrap.appendChild(pw);
        }
        var say = h('p', { 'class': 'lab-say', 'aria-live': 'polite' }); wrap.appendChild(say); sayBoxes[i.id] = say;
        out.textContent = fmtFixed(state[cur][i.id], dec) + (i.unit ? ' ' + i.unit : ''); r.setAttribute('aria-valuetext', out.textContent);
        inputs.appendChild(wrap);
      });
      figBox = h('div', { 'class': 'lab-fig' }); right.appendChild(figBox);
      resBox = h('div', { 'class': 'lab-results', 'aria-live': 'polite' }); right.appendChild(resBox);
      if (x.formula) body.appendChild(CN.richEl('p', 'lab-formula', '式：' + x.formula));
      readBox = h('div', { 'class': 'lab-read' }); body.appendChild(readBox);
      if (x.consts && x.consts.length) {
        constBox = h('div', { 'class': 'lab-consts' }, h('h5', null, 'この実験で使っている決まった数字'));
        var ul = h('ul'); x.consts.forEach(function (c) { ul.appendChild(CN.richEl('li', '', c.label + '：' + fmtFixed(c.value, c.digits != null ? c.digits : 0) + (c.unit ? ' ' + c.unit : '') + (c.src ? '（' + c.src + '）' : ''))); });
        constBox.appendChild(ul); body.appendChild(constBox);
      }
      tableBox = h('details', { 'class': 'seq-list lab-table' }, h('summary', null, '図の数値（同じ内容の表。読み上げ・印刷用）')); body.appendChild(tableBox);
      if (x.ch && x.ch.length) body.appendChild(CN.chLinks(x.ch));
      refresh();
      watchWidth(figBox, drawFig);
    }

    function refresh() {
      var x = exps[cur], c = compiled[cur], e = env(cur); lastEnv = e;
      CN.clear(resBox);
      c.results.forEach(function (o) {
        var v = ev(o.f, e), t = show(v, o.r.digits, o.r.auto), box = h('div', { 'class': 'lab-res' + (o.r.big ? ' big' : '') });
        box.appendChild(h('div', { 'class': 'lab-res-l' }, o.r.label));
        box.appendChild(h('div', { 'class': 'lab-res-v' }, h('b', null, t.num), ' ' + (t.unit || o.r.unit || '') + (t.lt ? ' 未満' : '')));
        if (o.r.note) box.appendChild(h('div', { 'class': 'lab-res-n' }, o.r.note));
        resBox.appendChild(box);
      });
      x.inputs.forEach(function (i) {
        var hit = null; c.says[i.id].forEach(function (z) { if (!hit && (!z.f || ev(z.f, e))) hit = z.r; });
        sayBoxes[i.id].textContent = hit ? hit.text : (i.hint || '');
      });
      CN.clear(readBox);
      var rl = c.reads.filter(function (z) { return !z.f || ev(z.f, e); });
      if (rl.length) {
        readBox.appendChild(h('h5', null, '読み取れること'));
        var ul = h('ul'); rl.forEach(function (z) { ul.appendChild(CN.richEl('li', '', z.r.text)); }); readBox.appendChild(ul);
      }
      drawFig();
    }

    /* ---- 図 ---- */
    function num(v, e, dflt) { if (v == null) return dflt; if (typeof v === 'number') return v; try { return X.compile(v).run(e); } catch (er) { return dflt; } }
    function drawFig() {
      var x = exps[cur], f = x.fig, e = lastEnv; if (!f || !figBox || !e) return;
      CN.clear(figBox);
      var W = measure(figBox, 320), rows = [], svg;
      if (f.type === 'bar') svg = figBar(f, e, W, rows);
      else if (f.type === 'wave') svg = figWave(f, e, W, rows);
      else svg = figCircuit(f, e, W, rows);
      figBox.appendChild(svg);
      if (f.caption) figBox.appendChild(CN.richEl('p', 'lab-cap', f.caption));
      CN.clear(tableBox); tableBox.appendChild(h('summary', null, '図の数値（同じ内容の表。読み上げ・印刷用）'));
      var tb = h('tbody'); rows.forEach(function (r) { tb.appendChild(h('tr', null, h('th', { scope: 'row' }, r[0]), h('td', null, r[1]))); });
      tableBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, x.label + '：図の数値'), h('thead', null, h('tr', null, h('th', { scope: 'col' }, '項目'), h('th', { scope: 'col' }, '値'))), tb)));
      svg.setAttribute('aria-label', (f.alt || x.label) + '。' + rows.map(function (r) { return r[0] + ' ' + r[1]; }).join('、'));
    }
    function vt(v, b) { var t = show(v, b.digits, b.auto); return t.num + (t.unit || b.unit ? ' ' + (t.unit || b.unit) : '') + (t.lt ? ' 未満' : ''); }

    function figBar(f, e, W, rows) {
      var bars = f.bars, vals = bars.map(function (b) { return num(b.expr, e, NaN); }), n = bars.length, rowH = 44, padL = Math.min(150, W * 0.36), padR = 12, Hh = 20 + n * rowH + 10;
      var mx = f.max != null ? num(f.max, e, NaN) : NaN; if (!isFinite(mx)) mx = Math.max.apply(null, vals.filter(isFinite)) * 1.05 || 1;
      var svg = s('svg', { 'class': 'lab-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'img' });
      var pos = function (v) { if (!isFinite(v) || v <= 0) return 0; if (f.log) { var lo = f.logMin != null ? f.logMin : 0.1, k = (Math.log(v / lo) / Math.LN10) / (Math.log(mx / lo) / Math.LN10); return Math.max(0.01, Math.min(1, k)); } return Math.max(0, Math.min(1, v / mx)); };
      bars.forEach(function (b, i) {
        var y = 14 + i * rowH, w = (W - padL - padR) * pos(vals[i]);
        svg.appendChild(s('text', { 'class': 'lab-bl', x: padL - 8, y: y + 14, 'text-anchor': 'end' }, b.label));
        svg.appendChild(s('rect', { 'class': 'lab-track', x: padL, y: y, width: W - padL - padR, height: 20, rx: 4 }));
        svg.appendChild(s('rect', { 'class': 'lab-bar c-' + (b.color || COLORS[i % COLORS.length]), x: padL, y: y, width: Math.max(0, w), height: 20, rx: 4 }));
        svg.appendChild(s('text', { 'class': 'lab-bv', x: padL, y: y + 36 }, vt(vals[i], b)));
        rows.push([b.label, vt(vals[i], b)]);
      });
      if (f.log) svg.appendChild(s('text', { 'class': 'lab-note', x: W - padR, y: Hh - 1, 'text-anchor': 'end' }, '棒の長さは対数（桁の違いを見るため）'));
      return svg;
    }

    function figWave(f, e, W, rows) {
      var Hh = Math.max(236, Math.min(296, W * 0.55 + 16)), mL = 46, mR = 12, mT = 46, mB = 30, pw = W - mL - mR, ph = Hh - mT - mB;
      var span = num(f.span, e, 0.04), ymax = num(f.ymax, e, 1), svg = s('svg', { 'class': 'lab-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'img' });
      var X0 = function (t) { return mL + t / span * pw; }, Y0 = function (v) { return mT + ph / 2 - v / ymax * ph / 2; };
      svg.appendChild(s('rect', { 'class': 'lab-plot', x: mL, y: mT, width: pw, height: ph }));
      [-1, -0.5, 0, 0.5, 1].forEach(function (k) { svg.appendChild(s('line', { 'class': 'lab-g' + (k === 0 ? ' zero' : ''), x1: mL, y1: Y0(k * ymax), x2: mL + pw, y2: Y0(k * ymax) })); });
      for (var k = 0; k <= 4; k++) { var t = span * k / 4; svg.appendChild(s('line', { 'class': 'lab-g v', x1: X0(t), y1: mT, x2: X0(t), y2: mT + ph })); svg.appendChild(s('text', { 'class': 'lab-ax', x: X0(t), y: Hh - 10, 'text-anchor': k === 0 ? 'start' : k === 4 ? 'end' : 'middle' }, fmtSig(t * 1000, 3) + (k === 4 ? ' ms' : ''))); }
      svg.appendChild(s('text', { 'class': 'lab-ax', x: mL - 6, y: Y0(ymax) + 4, 'text-anchor': 'end' }, '+' + fmtSig(ymax, 3)));
      svg.appendChild(s('text', { 'class': 'lab-ax', x: mL - 6, y: Y0(0) + 4, 'text-anchor': 'end' }, '0'));
      svg.appendChild(s('text', { 'class': 'lab-ax', x: mL - 6, y: Y0(-ymax) + 4, 'text-anchor': 'end' }, '−' + fmtSig(ymax, 3)));
      if (f.unit) svg.appendChild(s('text', { 'class': 'lab-ax', x: 4, y: 13 }, '縦軸：' + (f.yLabel || '') + '（' + f.unit + '）'));
      var N = 240, ws = f.waves.map(function (w) { return { w: w, amp: num(w.amp, e, 0), fq: num(w.freq, e, 50), ph: num(w.phase, e, 0) * Math.PI / 180 }; });
      var dashes = ['', '7 4', '2 4'];
      if (f.rms) {
        var rv = num(f.rms, e, 0);
        [rv, -rv].forEach(function (v) { svg.appendChild(s('line', { 'class': 'lab-rms', x1: mL, y1: Y0(v), x2: mL + pw, y2: Y0(v) })); });
        svg.appendChild(s('text', { 'class': 'lab-rms-t halo', x: mL + pw - 4, y: Y0(rv) - 4, 'text-anchor': 'end' }, f.rmsLabel || '実効値'));
        rows.push([f.rmsLabel || '実効値', fmtSig(rv, 3) + ' ' + (f.unit || '')]);
      }
      var sumPts = [];
      ws.forEach(function (o, wi) {
        var pts = [];
        for (var i = 0; i <= N; i++) { var tt = span * i / N, v = o.amp * Math.sin(2 * Math.PI * o.fq * tt + o.ph); pts.push(X0(tt).toFixed(1) + ',' + Y0(v).toFixed(1)); sumPts[i] = (sumPts[i] || 0) + v; }
        var path = s('polyline', { 'class': 'lab-wave c-' + (o.w.color || COLORS[wi % COLORS.length]), points: pts.join(' '), 'stroke-dasharray': dashes[wi % 3] || null });
        svg.appendChild(path);
        rows.push([o.w.label + '（振幅・周波数・位相）', fmtSig(o.amp, 3) + ' ' + (f.unit || '') + '・' + fmtSig(o.fq, 3) + ' Hz・' + fmtSig(o.ph * 180 / Math.PI, 3) + ' 度']);
      });
      var maxSum = 0;
      if (f.sum) {
        var sp2 = sumPts.map(function (v, i) { maxSum = Math.max(maxSum, Math.abs(v)); return X0(span * i / N).toFixed(1) + ',' + Y0(v).toFixed(1); });
        svg.appendChild(s('polyline', { 'class': 'lab-wave sum', points: sp2.join(' ') }));
        rows.push([(f.sum.label || '合計') + '（大きさの最大）', fmtSig(maxSum < 1e-9 * (ymax || 1) ? 0 : maxSum, 3) + ' ' + (f.unit || '')]);
      }
      /* 凡例 */
      var lx = mL;
      ws.forEach(function (o, wi) {
        svg.appendChild(s('line', { 'class': 'lab-wave c-' + (o.w.color || COLORS[wi % COLORS.length]), x1: lx, y1: 31, x2: lx + 22, y2: 31, 'stroke-dasharray': dashes[wi % 3] || null }));
        svg.appendChild(s('text', { 'class': 'lab-lg', x: lx + 26, y: 35 }, o.w.label)); lx += 34 + o.w.label.length * 12;
      });
      if (f.sum) { svg.appendChild(s('line', { 'class': 'lab-wave sum', x1: lx, y1: 31, x2: lx + 22, y2: 31 })); svg.appendChild(s('text', { 'class': 'lab-lg', x: lx + 26, y: 35 }, f.sum.label || '合計')); }
      if (f.periodRow !== false && ws.length === 1) rows.push(['周期', fmtSig(1000 / ws[0].fq, 3) + ' ms']);
      return svg;
    }

    function figCircuit(f, e, W, rows) {
      var els = f.elements, n = els.length, Hh = 210, x0 = 34, x1 = W - 34, y0 = 70, y1 = 170, I = num(f.current, e, 0), imax = num(f.imax, e, 1), frac = Math.max(0, Math.min(1, I / (imax || 1)));
      var svg = s('svg', { 'class': 'lab-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'img' });
      var sw = 2 + 6 * frac, mid = (y0 + y1) / 2, srcEl = els.filter(function (z) { return z.type === 'source'; })[0], resEls = els.filter(function (z) { return z.type !== 'source'; });
      /* 配線（電源は左の辺、抵抗は上の辺） */
      var path = 'M' + x0 + ' ' + (mid - 14) + ' V' + y0 + ' H' + x1 + ' V' + y1 + ' H' + x0 + ' V' + (mid + 14);   // 電流の向き（＋極から出て、上の辺を右へ、右の辺を下へ、下の辺を左へ）
      svg.appendChild(s('path', { 'class': 'lab-wire', d: path, style: 'stroke-width:' + sw.toFixed(1) + 'px' }));
      var dur = frac > 0.005 ? Math.min(14, 1.6 / Math.max(0.1, frac)) : 0;
      svg.appendChild(s('path', { 'class': 'lab-flow' + (dur ? '' : ' off'), d: path, style: dur ? 'animation-duration:' + dur.toFixed(2) + 's' : '' }));
      /* 電源 */
      svg.appendChild(s('line', { 'class': 'lab-bat l', x1: x0 - 15, y1: mid - 14, x2: x0 + 15, y2: mid - 14 }));
      svg.appendChild(s('line', { 'class': 'lab-bat s', x1: x0 - 8, y1: mid + 14, x2: x0 + 8, y2: mid + 14 }));
      svg.appendChild(s('text', { 'class': 'lab-lg', x: x0 + 20, y: mid - 8 }, '＋'));
      if (srcEl) { var sv = num(srcEl.val, e, NaN); svg.appendChild(s('text', { 'class': 'lab-el', x: x0 + 20, y: mid + 14 }, srcEl.label + ' ' + vt(sv, srcEl))); rows.push([srcEl.label, vt(sv, srcEl)]); }
      /* 抵抗 */
      var seg = (x1 - x0) / (resEls.length + 0.0), cx;
      resEls.forEach(function (r, i) {
        cx = x0 + seg * (i + 0.5);
        var zz = 'M' + (cx - 36) + ' ' + y0 + ' h20 l4 -10 l8 20 l8 -20 l8 20 l4 -10 h20';
        svg.appendChild(s('rect', { 'class': 'lab-gap', x: cx - 36, y: y0 - 14, width: 72, height: 28 }));
        svg.appendChild(s('path', { 'class': 'lab-res-sym', d: zz }));
        var rv = num(r.val, e, NaN);
        svg.appendChild(s('text', { 'class': 'lab-el', x: cx, y: y0 - 22, 'text-anchor': 'middle' }, r.label + ' ' + vt(rv, r)));
        rows.push([r.label, vt(rv, r)]);
      });
      /* 電流の向き（静止した矢じり。動きを止めている人にも向きが分かる） */
      var ax = (x0 + x1) / 2;
      svg.appendChild(s('path', { 'class': 'lab-arrow', d: 'M' + (x1 - 10) + ' ' + y0 + ' l-9 -6 v12 z' }));      // 上の辺：右へ
      svg.appendChild(s('path', { 'class': 'lab-arrow', d: 'M' + x1 + ' ' + (mid + 9) + ' l-6 -9 h12 z' }));      // 右の辺：下へ
      svg.appendChild(s('path', { 'class': 'lab-arrow', d: 'M' + (ax - 9) + ' ' + y1 + ' l9 -6 v12 z' }));       // 下の辺：左へ
      svg.appendChild(s('text', { 'class': 'lab-cur', x: (x0 + x1) / 2, y: y1 + 24, 'text-anchor': 'middle' }, (f.currentLabel || '電流') + ' ' + vt(I, { digits: f.currentDigits != null ? f.currentDigits : 2, unit: f.currentUnit || 'A', auto: f.currentAuto })));
      rows.push([f.currentLabel || '電流', vt(I, { digits: f.currentDigits != null ? f.currentDigits : 2, unit: f.currentUnit || 'A', auto: f.currentAuto })]);
      rows.push(['線の太さ・流れる点の速さ', '電流の大きさに比例（目安：基準の ' + fmtSig(frac * 100, 2) + '%）']);
      return svg;
    }

    build();
  };
  CN.searchText.lab = function (d) {
    var out = [d.title]; d.experiments.forEach(function (x) {
      out.push(x.label, x.intro, x.formula); x.inputs.forEach(function (i) { out.push(i.label, i.hint); (i.say || []).forEach(function (z) { out.push(z.text); }); });
      (x.results || []).forEach(function (r) { out.push(r.label); }); (x.reads || []).forEach(function (z) { out.push(z.text); });
    });
    return out.filter(Boolean).join(' ');
  };
})();
