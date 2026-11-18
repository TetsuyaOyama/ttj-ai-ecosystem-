/* 部品：scale（大きさの比較）／ lab（式を動かす実験台）。使う章があるときだけ build.py が埋め込む（js/opt/）。
   データ形式は FRAMEWORK.md の「scale」「lab」。どちらも学習用の模型で、実際の設計・工事・投資の判断には使えない。
   scale の物差しは 3 種：電力（W 系。既定）・円（円〜兆円）・ドル（ドル〜兆ドル）。1 つの scale では 1 種だけ（為替の換算はしない）。 */
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
  /* 金額：円は 1 万ごと（円・万円・億円・兆円）、ドルは 1000 ごと（ドル・百万ドル・十億ドル・兆ドル）に単位を付け替える */
  var YEN_LADDER = [['兆円', 1e12], ['億円', 1e8], ['万円', 1e4], ['円', 1]];
  var USD_LADDER = [['兆ドル', 1e12], ['十億ドル', 1e9], ['百万ドル', 1e6], ['ドル', 1]];
  function ladderText(v, n, units) {
    var k = 0;
    n = n || 3;
    for (k = 0; k < units.length - 1; k++) if (v >= units[k][1]) break;
    if (k > 0 && sig(v / units[k][1], n) >= units[k - 1][1] / units[k][1]) k--;
    return fmtSig(v / units[k][1], n) + ' ' + units[k][0];
  }
  CN.numfmt = { sig: sig, fmtSig: fmtSig, fmtFixed: fmtFixed, powText: powText, ratioText: ratioText, ladderText: ladderText };

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
  var JUNIT = { '円': 1, '万円': 1e4, '億円': 1e8, '兆円': 1e12 };
  var DUNIT = { 'ドル': 1, '百万ドル': 1e6, '十億ドル': 1e9, '兆ドル': 1e12 };
  CN.SCALE_UNITS = UNIT; CN.SCALE_EUNITS = EUNIT; CN.SCALE_JUNITS = JUNIT; CN.SCALE_DUNITS = DUNIT;
  /* 物差しの種類。base は基準の単位、max は物差しの最大の桁（10 のべき乗の指数）。 */
  var FAMS = {
    power: { id: 'power', units: UNIT, base: 'W', max: 13, counter: '個', stages: STAGES, text: function (w, n) { return powText(w, n); },
      conv: 'W に直した値', cap: 'W 換算は有効数字 3 桁',
      caution: '倍率は、値の大きさだけを比べた目安です。条件（定格・平均・総出力・見通しなど）が項目ごとに違うので、実際の「何軒分」とは限りません。',
      disc: '学習用の模型です。実際の設計や工事の判断には使えません。' },
    jpy: { id: 'jpy', units: JUNIT, base: '円', max: 16, counter: '倍', major: 4, ladder: YEN_LADDER, text: function (w, n) { return ladderText(w, n, YEN_LADDER); },
      stages: [{ key: 'all', label: '全体（1 円 〜 1 京円）', lo: 0, hi: 16 }, { key: 'home', label: '個人・企業の桁', lo: 3, hi: 10 }, { key: 'nation', label: '国・市場の桁', lo: 8, hi: 16 }],
      conv: '円に直した値', cap: '円換算は有効数字 3 桁',
      caution: '倍率は、金額の大きさだけを比べた目安です。時点・範囲・名目か実質か・残高か年間の流れかが項目ごとに違うので、実際の関係とは限りません。円とドルの換算はしていません。',
      disc: '学習用の模型です。実際の投資・取引・契約の判断には使えません。' },
    usd: { id: 'usd', units: DUNIT, base: 'ドル', max: 15, counter: '倍', major: 3, ladder: USD_LADDER, text: function (w, n) { return ladderText(w, n, USD_LADDER); },
      stages: [{ key: 'all', label: '全体（1 ドル 〜 1,000 兆ドル）', lo: 0, hi: 15 }, { key: 'home', label: '個人・企業の桁', lo: 0, hi: 9 }, { key: 'nation', label: '国・市場の桁', lo: 6, hi: 15 }],
      conv: 'ドルに直した値', cap: 'ドル換算は有効数字 3 桁',
      caution: '倍率は、金額の大きさだけを比べた目安です。時点・範囲・名目か実質か・残高か年間の流れかが項目ごとに違うので、実際の関係とは限りません。円とドルの換算はしていません。',
      disc: '学習用の模型です。実際の投資・取引・契約の判断には使えません。' }
  };
  /* 項目の単位から物差しの種類を決める（from＝電力量÷時間は電力）。混ぜた場合はビルド検査が止める */
  function famOf(d) {
    var f = 'power';
    (d.items || []).forEach(function (it) { if (!it.from && it.unit && JUNIT.hasOwnProperty(it.unit)) f = 'jpy'; else if (!it.from && it.unit && DUNIT.hasOwnProperty(it.unit)) f = 'usd'; });
    return FAMS[f];
  }
  var GCLS = ['ue', 'ran', 'core', 'db', 'pol', 'ext', 'ims'];

  /* 項目を W に正規化する。値は必ずデータから（value＋unit、from＝電力量÷時間、range）。 */
  function normItem(it, fam) {
    var UNIT = fam.units;
    var o = { it: it, id: it.id, name: it.name, short: it.short || it.name, counter: (it.counter || fam.counter).replace(/分$/, '') || fam.counter };
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
    var fam = famOf(d), items = d.items.map(function (it) { return normItem(it, fam); }), byId = {}, groups = d.groups || [], gIdx = {}, sources = d.sources || [];
    items.forEach(function (o) { byId[o.id] = o; });
    groups.forEach(function (g, i) { gIdx[g.key] = i; });
    var stages = d.stages || fam.stages, st = stages[0], win = { lo: st.lo, hi: st.hi };
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
    var rng = h('input', { type: 'range', id: ctx.id + '-p', min: 0, max: fam.max, step: 0.01, value: probe });
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
      var W = measure(rulerBox, 340), Hh = Hpx(), top = 18, bot = 18, axisX = fam.id === 'power' ? 66 : 98, lo = win.lo, hi = win.hi, span = hi - lo;
      var yOf = function (w) { return top + (hi - Math.log(w) / Math.LN10) / span * (Hh - top - bot); };
      var out = [];
      var svg2 = s('svg', { 'class': 'sc-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'group', 'aria-label': d.title + '（対数の物差し。' + items.length + ' 項目。同じ内容の表が下にあります）' });
      svg2.appendChild(s('line', { 'class': 'sc-axis', x1: axisX, y1: top, x2: axisX, y2: Hh - bot }));
      for (var e = Math.ceil(lo - 1e-9); e <= Math.floor(hi + 1e-9); e++) {
        var y = yOf(Math.pow(10, e)), major = e % (fam.major || 3) === 0, u = e >= 12 ? 'TW' : e >= 9 ? 'GW' : e >= 6 ? 'MW' : e >= 3 ? 'kW' : 'W', m = Math.pow(10, e - (e >= 12 ? 12 : e >= 9 ? 9 : e >= 6 ? 6 : e >= 3 ? 3 : 0));
        svg2.appendChild(s('line', { 'class': 'sc-tick' + (major ? ' maj' : ''), x1: axisX - (major ? 14 : 8), y1: y, x2: axisX, y2: y }));
        if (major) svg2.appendChild(s('line', { 'class': 'sc-gl', x1: axisX, y1: y, x2: W - 4, y2: y }));
        svg2.appendChild(s('text', { 'class': 'sc-tl' + (major ? ' maj' : ''), x: axisX - 18, y: y + 4, 'text-anchor': 'end' }, fam.id === 'power' ? m + ' ' + u : fam.text(Math.pow(10, e), 1)));
      }
      /* 探る値の線 */
      if (probe >= lo && probe <= hi) {
        var py = yOf(Math.pow(10, probe));
        svg2.appendChild(s('line', { 'class': 'sc-probe-ln', x1: axisX - 4, y1: py, x2: W - 4, y2: py }));
        svg2.appendChild(s('text', { 'class': 'sc-probe-tx halo', x: W - 6, y: py - 5, 'text-anchor': 'end' }, '探る値 ' + fam.text(Math.pow(10, probe), 3)));
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
      rangeNote.textContent = '表示中：' + fam.text(Math.pow(10, lo), 1) + ' 〜 ' + fam.text(Math.pow(10, hi), 1);
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
      sp = Math.max(2, Math.min(fam.max, sp)); win = { lo: c - sp / 2, hi: c + sp / 2 };
      if (win.lo < 0) { win.hi -= win.lo; win.lo = 0; } if (win.hi > fam.max) { win.lo -= win.hi - fam.max; win.hi = fam.max; }
      win.lo = Math.max(0, Math.round(win.lo)); win.hi = Math.min(fam.max, Math.round(win.hi)); if (win.hi - win.lo < 2) win.hi = win.lo + 2;
      syncTabs(null); drawRuler();
    }
    function shift(n) {
      var sp = win.hi - win.lo, lo = Math.max(0, Math.min(fam.max - sp, win.lo + n)); win = { lo: lo, hi: lo + sp }; syncTabs(null); drawRuler();
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
      function wtxt(o) {
        if (fam.id !== 'power') return o.isRange ? fam.text(o.lo, 3) + '〜' + fam.text(o.hi, 3) : fam.text(o.w, 3);
        return o.isRange ? fmtSig(o.lo, 3) + '〜' + fmtSig(o.hi, 3) + ' W' : fmtSig(o.w, 3) + ' W';
      }
      if (one && a.w < b.w) return '計算：' + wtxt(b) + ' ÷ ' + wtxt(a) + ' ＝ ' + fmtSig(b.w / a.w, 3) + '（B が A の何倍かを出し、有効数字 2 桁に丸めて「何分の 1」にしています）';
      if (one) return '計算：' + wtxt(a) + ' ÷ ' + wtxt(b) + ' ＝ ' + fmtSig(a.w / b.w, 3) + '（有効数字 2 桁に丸めて上の文にしています）';
      return '計算：（' + wtxt(a) + '）÷（' + wtxt(b) + '）。幅のある項目は、最小と最大の組み合わせで範囲を出しています。';
    }
    function refreshProbe() {
      var w = Math.pow(10, probe), r = w / B.w, near = items.slice().sort(function (p, q) { return Math.abs(Math.log(p.w / w)) - Math.abs(Math.log(q.w / w)); })[0];
      var tx = '探る値：' + fam.text(w, 3) + '。' + B.name + 'の ' + (Math.abs(r - 1) < 0.05 ? 'ほぼ同じ大きさ（約 1 倍）' : r < 1 ? '約 ' + bunno(1 / r) : times(r, B.counter)) + '。いちばん近い項目は「' + near.short + '」（' + near.disp + '）。';
      probeOut.textContent = tx; rng.setAttribute('aria-valuetext', fam.text(w, 3));
    }
    function refresh() {
      selA.value = A.id; selB.value = B.id;
      CN.clear(result);
      result.appendChild(h('p', { 'class': 'sc-sent' }, ratioSentence(A, B)));
      result.appendChild(h('p', { 'class': 'sc-calc' }, calcLine(A, B)));
      result.appendChild(h('p', { 'class': 'sc-caution' }, d.caution || fam.caution));
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
    det.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, d.title + '：小さい順（' + fam.cap + '）'), h('thead', null, h('tr', null, ['項目', '区分', '公表値（出典の表記）', fam.conv, '条件', '出典'].map(function (c) { return h('th', { scope: 'col' }, c); }))), tb)));
    el.appendChild(det);
    if (d.disclaimer !== false) el.appendChild(h('p', { 'class': 'lab-disc' }, d.disclaimer || fam.disc));

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
    var figBox = null, resBox = null, readBox = null, sayBoxes = {}, tableBox = null, outEls = {}, constBox = null, lastEnv = null, sliders = {}, presetBtns = [], presetNote = null, quadCells = [];

    function compileExp(x) {
      var c = { calc: (x.calc || []).map(function (k) { return { id: k.id, f: X.compile(k.expr) }; }), results: (x.results || []).map(function (r) { return { r: r, f: X.compile(r.expr), sh: r.show ? X.compile(r.show) : null, bf: r.base ? X.compile(r.base.expr) : null }; }),
        reads: (x.reads || []).map(function (r) { return { r: r, f: r.when ? X.compile(r.when) : null }; }), says: {}, quad: [] };
      if (x.quad) (x.quad.cells || []).forEach(function (row, ri) { row.forEach(function (cell, ci) { c.quad.push({ ri: ri, ci: ci, f: cell.when ? X.compile(cell.when) : null }); }); });
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
      if (auto) { var t = auto === '円' ? ladderText(v, digits != null ? Math.max(2, digits) : 3, YEN_LADDER) : auto === 'ドル' ? ladderText(v, digits != null ? Math.max(2, digits) : 3, USD_LADDER) : powText(v, digits != null ? Math.max(2, digits) : 3, auto === 'Wh' ? 'Wh' : 'W'); var sp = t.lastIndexOf(' '); return { num: t.slice(0, sp), unit: t.slice(sp + 1) }; }
      var dg = digits != null ? digits : 2;
      /* 0 でないのに丸めると 0 になる値は「0.001 未満」と出す */
      if (v > 1e-9 && !/[1-9]/.test(Math.abs(v).toFixed(dg))) return { num: fmtFixed(Math.pow(10, -dg), dg), unit: '', lt: true };
      return { num: fmtFixed(v, dg), unit: '' };
    }

    /* プリセット：set は { 入力の id: 値 }。つまみの刻みに丸められた値が state に入る */
    function setAll(set) {
      var k; for (k in set) { var sl = sliders[k]; if (sl) { sl.r.value = set[k]; sl.sync(); } }
      refresh();
    }
    /* 2×2 などの分類表（実際の表。いまの入力に当てはまるマスに印が付く）。x.quad = {title?, corner?, cols:[…], rows:[…], cells:[[{title, sub?, when?}, …], …], caption?} */
    function buildQuad(q) {
      var tb = h('tbody');
      (q.rows || []).forEach(function (rh, ri) {
        var tr = h('tr', null, h('th', { scope: 'row' }, rh));
        (q.cells[ri] || []).forEach(function (cell) {
          var td = h('td', { 'class': 'lab-quad-c' }, h('b', null, cell.title)); if (cell.sub) td.appendChild(h('span', null, cell.sub));
          quadCells.push(td); tr.appendChild(td);
        });
        tb.appendChild(tr);
      });
      var tbl = h('table', { 'class': 'lab-quad-t' }, h('thead', null, h('tr', null, [h('th', { scope: 'col' }, q.corner || '')].concat((q.cols || []).map(function (c) { return h('th', { scope: 'col' }, c); })))), tb);
      var box = h('div', { 'class': 'lab-quad' });
      if (q.title) box.appendChild(h('h5', null, q.title));
      box.appendChild(h('div', { 'class': 'tbl-wrap' }, tbl));
      if (q.caption) box.appendChild(CN.richEl('p', 'lab-cap', q.caption));
      return box;
    }

    function build() {
      var x = exps[cur]; CN.clear(body);
      if (x.intro) body.appendChild(CN.richEl('p', 'lab-intro', x.intro));
      sayBoxes = {}; outEls = {}; sliders = {}; presetBtns = []; presetNote = null; quadCells = [];
      /* 実験の「プリセット」：複数の入力をまとめて決める（任意）。押すと下のつまみが動く */
      if (x.presets && x.presets.length) {
        var pbar = h('div', { 'class': 'lab-preset-bar' }), plabel = x.presetLabel || 'まとめて動かす（押すと、下のつまみが動きます）';
        pbar.appendChild(h('div', { 'class': 'lab-preset-h' }, plabel));
        var pgrp = h('div', { 'class': 'lab-presets', role: 'group', 'aria-label': plabel });
        x.presets.forEach(function (p) { var b = h('button', { type: 'button', 'class': 'btn sm', 'aria-pressed': 'false' }, p.label); b.addEventListener('click', function () { setAll(p.set); }); presetBtns.push(b); pgrp.appendChild(b); });
        pbar.appendChild(pgrp);
        presetNote = h('p', { 'class': 'lab-say lab-preset-note', 'aria-live': 'polite' }); pbar.appendChild(presetNote);
        body.appendChild(pbar);
      }
      var top = h('div', { 'class': 'lab-top' }), inputs = h('div', { 'class': 'lab-inputs' }), right = h('div', { 'class': 'lab-right' });
      top.appendChild(inputs); top.appendChild(right); body.appendChild(top);
      x.inputs.forEach(function (i) {
        var id = ctx.id + '-' + cur + '-' + i.id, dec = numSteps(i.step);
        var wrap = h('div', { 'class': 'lab-in' });
        var out = h('output', { 'for': id, 'class': 'lab-val' });
        wrap.appendChild(h('div', { 'class': 'lab-in-h' }, h('label', { 'for': id }, i.label + (i.unit ? '（' + i.unit + '）' : '')), out));
        var r = h('input', { type: 'range', id: id, min: i.min, max: i.max, step: i.step, value: state[cur][i.id] });
        function sync() {
          state[cur][i.id] = parseFloat(r.value); out.textContent = fmtFixed(state[cur][i.id], dec) + (i.unit ? ' ' + i.unit : '');
          r.setAttribute('aria-valuetext', out.textContent);
        }
        function upd() { sync(); refresh(); }
        sliders[i.id] = { r: r, sync: sync };
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
      if (x.quad) right.appendChild(buildQuad(x.quad));
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
        if (o.sh && !ev(o.sh, e)) return;      // show：式が偽のとき、この結果は出さない（任意）
        var v = ev(o.f, e), t = o.r.words ? { num: (isFinite(v) && o.r.words[Math.round(v)] != null) ? o.r.words[Math.round(v)] : '—', unit: '' } : show(v, o.r.digits, o.r.auto), box = h('div', { 'class': 'lab-res' + (o.r.big ? ' big' : '') + (o.r.words ? ' word' : '') });
        box.appendChild(h('div', { 'class': 'lab-res-l' }, o.r.label));
        box.appendChild(h('div', { 'class': 'lab-res-v' }, h('b', null, t.num), ' ' + (t.unit || o.r.unit || '') + (t.lt ? ' 未満' : '')));
        if (o.bf) {      // base：変化前などの比較の値（任意）。words があれば言葉で、なければ数で
          var bv = ev(o.bf, e), bw = o.r.base.words, bt = bw ? ((isFinite(bv) && bw[Math.round(bv)] != null) ? bw[Math.round(bv)] : '—') : (function () { var q = show(bv, o.r.base.digits != null ? o.r.base.digits : o.r.digits, o.r.auto); return q.num + ((q.unit || o.r.unit) ? ' ' + (q.unit || o.r.unit) : ''); })();
          box.appendChild(h('div', { 'class': 'lab-res-n' }, (o.r.base.label || '元') + '：' + bt));
        }
        if (o.r.note) box.appendChild(h('div', { 'class': 'lab-res-n' }, o.r.note));
        resBox.appendChild(box);
      });
      x.inputs.forEach(function (i) {
        var hit = null; c.says[i.id].forEach(function (z) { if (!hit && (!z.f || ev(z.f, e))) hit = z.r; });
        sayBoxes[i.id].textContent = hit ? hit.text : (i.hint || '');
      });
      if (x.presets && presetBtns.length) {
        var act = -1; x.presets.forEach(function (p, pi) {
          var on = true, k; for (k in p.set) { if (Math.abs((state[cur][k] != null ? state[cur][k] : NaN) - p.set[k]) > 1e-9) on = false; }
          presetBtns[pi].setAttribute('aria-pressed', String(on)); if (on && act < 0) act = pi;
        });
        presetNote.textContent = act >= 0 ? (x.presets[act].text || '') : (x.presetHint || '');
      }
      if (c.quad.length) c.quad.forEach(function (q) { var on = !!(q.f && ev(q.f, e)), td = quadCells[q.ri * (x.quad.cols || []).length + q.ci]; if (td) { td.className = 'lab-quad-c' + (on ? ' on' : ''); if (on) td.setAttribute('aria-current', 'true'); else td.removeAttribute('aria-current'); } });
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
      var x = exps[cur], list = x.figs || (x.fig ? [x.fig] : []), e = lastEnv; if (!list.length || !figBox || !e) return;
      CN.clear(figBox); CN.clear(tableBox); tableBox.appendChild(h('summary', null, '図の数値（同じ内容の表。読み上げ・印刷用）'));
      var W = measure(figBox, 320);
      list.forEach(function (f, fi) {
        var rows = [], svg, many = list.length > 1, nm = many ? x.label + '・' + (f.title || '図 ' + (fi + 1)) : x.label;
        if (f.type === 'bar') svg = f.signed ? figBarS(f, e, W, rows) : figBar(f, e, W, rows);
        else if (f.type === 'wave') svg = figWave(f, e, W, rows);
        else if (f.type === 'curve') svg = figCurve(f, e, W, rows);
        else svg = figCircuit(f, e, W, rows);
        if (many && f.title) figBox.appendChild(h('h5', { 'class': 'lab-fig-t' }, f.title));
        figBox.appendChild(svg);
        if (f.caption) figBox.appendChild(CN.richEl('p', 'lab-cap', f.caption));
        var tb = h('tbody');
        if (rows.tbl) {
          rows.tbl.body.forEach(function (r) { tb.appendChild(h('tr', null, r.map(function (c, ci) { return ci === 0 ? h('th', { scope: 'row' }, c) : h('td', null, c); }))); });
          tableBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, nm + '：線グラフの数値'), h('thead', null, h('tr', null, rows.tbl.head.map(function (c) { return h('th', { scope: 'col' }, c); }))), tb)));
        } else {
          rows.forEach(function (r) { tb.appendChild(h('tr', null, h('th', { scope: 'row' }, r[0]), h('td', null, r[1]))); });
          tableBox.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, nm + '：図の数値'), h('thead', null, h('tr', null, h('th', { scope: 'col' }, '項目'), h('th', { scope: 'col' }, '値'))), tb)));
        }
        svg.setAttribute('aria-label', (f.alt || x.label) + '。' + rows.map(function (r) { return r[0] + ' ' + r[1]; }).join('、'));
      });
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

    /* ---- 正負の棒（fig.type 'bar'、signed:true）：0 の線から左右に伸びる。max は絶対値の上限（数か式。省略するとデータから） ---- */
    function figBarS(f, e, W, rows) {
      var bars = f.bars, vals = bars.map(function (b) { return num(b.expr, e, NaN); }), n = bars.length, rowH = 50, padL = 10, padR = 10, Hh = 24 + n * rowH + 8;
      var mx = f.max != null ? num(f.max, e, NaN) : NaN; if (!isFinite(mx)) mx = Math.max.apply(null, vals.filter(isFinite).map(Math.abs)) * 1.1 || 1;
      var svg = s('svg', { 'class': 'lab-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'img' });
      var x0 = padL, x1 = W - padR, zx = (x0 + x1) / 2, half = (x1 - x0) / 2, k = half / mx;
      svg.appendChild(s('rect', { 'class': 'lab-plot', x: x0, y: 16, width: x1 - x0, height: n * rowH + 4 }));
      [-1, 1].forEach(function (sg) { svg.appendChild(s('line', { 'class': 'lab-g v', x1: zx + sg * half / 2, y1: 16, x2: zx + sg * half / 2, y2: 16 + n * rowH + 4 })); });
      svg.appendChild(s('line', { 'class': 'lab-g zero', x1: zx, y1: 12, x2: zx, y2: 16 + n * rowH + 4 }));
      svg.appendChild(s('text', { 'class': 'lab-ax', x: zx, y: 10, 'text-anchor': 'middle' }, '0'));
      var ud = f.unit ? '（' + f.unit + '）' : '';
      svg.appendChild(s('text', { 'class': 'lab-ax', x: x0 + 2, y: 10 }, '← ' + (f.negLabel || '下がる') + ' ' + fmtFixed(mx, f.axisDigits != null ? f.axisDigits : 0)));
      svg.appendChild(s('text', { 'class': 'lab-ax', x: x1 - 2, y: 10, 'text-anchor': 'end' }, (f.posLabel || '上がる') + ' ' + fmtFixed(mx, f.axisDigits != null ? f.axisDigits : 0) + ' →'));
      bars.forEach(function (b, i) {
        var y = 20 + i * rowH, v = vals[i], w = isFinite(v) ? Math.min(half, Math.abs(v) * k) : 0, neg = v < 0, lab = vt(v, b);
        svg.appendChild(s('text', { 'class': 'lab-bl', x: x0 + 6, y: y + 12 }, b.label));
        svg.appendChild(s('rect', { 'class': 'lab-bar c-' + (b.color || COLORS[i % COLORS.length]) + (neg ? ' neg' : ''), x: neg ? zx - w : zx, y: y + 18, width: Math.max(0, w), height: 18, rx: 3 }));
        /* 値は、棒のない側（0 の線の反対側）に出す。棒と重ならない */
        svg.appendChild(s('text', { 'class': 'lab-bv', x: neg ? zx + 6 : zx - 6, y: y + 31, 'text-anchor': neg ? 'start' : 'end' }, lab));
        rows.push([b.label, lab]);
      });
      return svg;
    }

    /* ---- 線グラフ（fig.type 'curve'）：x の範囲で式を評価して折れ線を描く。負の値・0 の線・縦の目印つき ---- */
    function niceStep(range, n) {
      var raw = range / n, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10 + 1e-12)), r = raw / mag;
      return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * mag;
    }
    function decOf(step) { var m = /e-(\d+)/.exec(String(step)), d = numSteps(step); return m ? parseInt(m[1], 10) : d; }
    function figCurve(f, e, W, rows) {
      var xd = f.x, x0 = xd.min, x1 = xd.max, logx = xd.scale === 'log', ser = f.series, dg = f.digits != null ? f.digits : 2;
      var N = logx ? Math.max(2, Math.min(800, Math.round(xd.n || 160))) : Math.max(2, Math.min(800, Math.round((x1 - x0) / (xd.step || (x1 - x0) / 120))));
      var xdec = xd.digits != null ? xd.digits : Math.min(4, decOf(xd.step || 1));
      var fs = ser.map(function (z) { return z.expr != null ? X.compile(z.expr) : null; });
      var vis = ser.map(function (z) { return !z.when || !!ev(X.compile(z.when), e); });
      var ev0 = function (k, xv) { var env2 = {}, key; for (key in e) env2[key] = e[key]; env2[xd.id] = xv; return ev(fs[k], env2); };
      /* data：公表値などの点（{x, y, l?}）を直線でつなぐ系列。expr の代わりに使う（任意） */
      var pts = ser.map(function (z) { return z.data ? z.data.filter(function (q) { return isFinite(q.x) && isFinite(q.y); }) : null; });
      var tPos = function (v) { return logx ? Math.log(v / x0) / Math.log(x1 / x0) : (v - x0) / (x1 - x0); };
      var valAt = function (k, xv) {
        if (!pts[k]) return ev0(k, xv);
        var a = pts[k], i2;
        for (i2 = 0; i2 < a.length; i2++) if (Math.abs(tPos(a[i2].x) - tPos(xv)) < 1e-9) return a[i2].y;
        for (i2 = 0; i2 + 1 < a.length; i2++) if (xv > a[i2].x && xv < a[i2 + 1].x) return a[i2].y + (a[i2 + 1].y - a[i2].y) * (tPos(xv) - tPos(a[i2].x)) / (tPos(a[i2 + 1].x) - tPos(a[i2].x));
        return NaN;
      };
      var data = ser.map(function () { return []; }), xs = [], i, k;
      for (i = 0; i <= N; i++) { var xv = logx ? x0 * Math.pow(x1 / x0, i / N) : x0 + (x1 - x0) * i / N; xs.push(xv); for (k = 0; k < ser.length; k++) data[k].push(fs[k] ? ev0(k, xv) : NaN); }
      /* 縦軸の範囲：ymin・ymax（数か式）。無ければデータから決める */
      var fin = []; data.forEach(function (a, kk) { if (vis[kk]) a.forEach(function (v) { if (isFinite(v)) fin.push(v); }); }); pts.forEach(function (a, kk) { if (a && vis[kk]) a.forEach(function (q) { fin.push(q.y); }); });
      var dmin = fin.length ? Math.min.apply(null, fin) : 0, dmax = fin.length ? Math.max.apply(null, fin) : 1;
      var ymin = f.ymin != null ? num(f.ymin, e, NaN) : NaN, ymax = f.ymax != null ? num(f.ymax, e, NaN) : NaN;
      if (!isFinite(ymin) || !isFinite(ymax)) {
        var pad = (dmax - dmin) * 0.08 || Math.abs(dmax) * 0.1 || 1;
        if (!isFinite(ymin)) ymin = dmin - pad; if (!isFinite(ymax)) ymax = dmax + pad;
      }
      if (!(ymax > ymin)) ymax = ymin + 1;
      var ystep = niceStep(ymax - ymin, 4), ydec = Math.max(0, Math.min(6, decOf(ystep)));
      /* 凡例（折り返す）：見えている系列と、帯（fills）。上の余白は凡例の行数で決める */
      var fills = (f.fills || []).filter(function (z) { return !z.when || !!ev(X.compile(z.when), e); });
      var lgItems = []; ser.forEach(function (z, j) { if (vis[j]) lgItems.push({ k: 'l', j: j, label: z.label }); }); fills.forEach(function (z, j) { if (z.label) lgItems.push({ k: 'f', j: j, label: z.label }); });
      var lgRows = [[]], lx = 0, LW = W - 12, widths = lgItems.map(function (z) { return 34 + z.label.length * 12; });
      widths.forEach(function (w, j) { if (lx + w > LW && lgRows[lgRows.length - 1].length) { lgRows.push([]); lx = 0; } lgRows[lgRows.length - 1].push(j); lx += w; });
      var mL = Math.min(56, 36 + 7 * Math.max(String(Math.round(Math.abs(ymax))).length, String(Math.round(Math.abs(ymin))).length) + (ydec ? 6 * ydec : 0)), mR = 14, mT = 22 + lgRows.length * 18 + (f.yLabel ? 22 : 0), pw = W - mL - mR;
      var X0 = function (v) { return mL + tPos(v) * pw; };
      /* 横軸の目盛り：ticks（{v, label}）があればそれを使う。ラベルが重なるときは 2 段にずらす */
      var ticks = (xd.ticks || []).filter(function (t) { return t.v >= x0 - 1e-9 && t.v <= x1 + 1e-9; }), tickRow = [], needRow2 = false;
      if (ticks.length) {
        var lastR = [-1e9, -1e9]; ticks.forEach(function (t, ti) {
          var wd = 6.7 * String(t.label).length + 4, cx = X0(t.v), lo = cx - wd / 2, hi = cx + wd / 2, r0 = 0;
          if (lo < lastR[0] + 2) { r0 = 1; if (lo < lastR[1] + 2) r0 = 0; }
          lastR[r0] = hi; tickRow.push(r0); if (r0) needRow2 = true;
        });
      }
      var mB = 40 + (xd.label ? 14 : 0) + (needRow2 ? 13 : 0);
      var Hh = Math.max(250, Math.min(320, W * 0.62 + 60)) + lgRows.length * 18, ph = Hh - mT - mB;
      var svg = s('svg', { 'class': 'lab-svg', viewBox: '0 0 ' + W + ' ' + Hh, width: W, height: Hh, role: 'img' });
      var Y0 = function (v) { return mT + (ymax - v) / (ymax - ymin) * ph; };
      var clipId = ctx.id + '-clip-' + cur;
      svg.appendChild(s('rect', { 'class': 'lab-plot', x: mL, y: mT, width: pw, height: ph }));
      /* 帯（spans）：横軸の範囲を色で示す（例：逆転している区間）。条件 when が真のときだけ */
      (f.spans || []).forEach(function (sp) {
        if (sp.when && !ev(X.compile(sp.when), e)) return;
        var a1 = num(sp.from, e, NaN), a2 = num(sp.to, e, NaN); if (!isFinite(a1) || !isFinite(a2)) return;
        var xa = X0(Math.max(x0, Math.min(a1, a2))), xb = X0(Math.min(x1, Math.max(a1, a2)));
        svg.appendChild(s('rect', { 'class': 'lab-span', x: xa, y: mT, width: Math.max(0, xb - xa), height: ph }));
        if (sp.label) svg.appendChild(s('text', { 'class': 'lab-span-t', x: (xa + xb) / 2, y: mT + ph - 7, 'text-anchor': 'middle' }, sp.label));
      });
      /* 目盛り */
      var ty;
      for (ty = Math.ceil(ymin / ystep - 1e-9) * ystep; ty <= ymax + ystep * 1e-9; ty += ystep) {
        var isZ = Math.abs(ty) < ystep * 1e-6;
        svg.appendChild(s('line', { 'class': 'lab-g' + (isZ ? ' zero' : ''), x1: mL, y1: Y0(ty), x2: mL + pw, y2: Y0(ty) }));
        svg.appendChild(s('text', { 'class': 'lab-ax', x: mL - 6, y: Y0(ty) + 4, 'text-anchor': 'end' }, fmtFixed(isZ ? 0 : ty, ydec)));
      }
      if (ticks.length) {
        ticks.forEach(function (t, ti) {
          svg.appendChild(s('line', { 'class': 'lab-g v', x1: X0(t.v), y1: mT, x2: X0(t.v), y2: mT + ph }));
          svg.appendChild(s('text', { 'class': 'lab-ax', x: X0(t.v), y: mT + ph + 15 + tickRow[ti] * 13, 'text-anchor': 'middle' }, t.label));
        });
      } else {
        var xstep = niceStep(x1 - x0, W < 420 ? 4 : 6), xd2 = Math.max(0, Math.min(6, decOf(xstep))), tx;
        for (tx = Math.ceil(x0 / xstep - 1e-9) * xstep; tx <= x1 + xstep * 1e-9; tx += xstep) {
          svg.appendChild(s('line', { 'class': 'lab-g v', x1: X0(tx), y1: mT, x2: X0(tx), y2: mT + ph }));
          svg.appendChild(s('text', { 'class': 'lab-ax', x: X0(tx), y: mT + ph + 15, 'text-anchor': tx - x0 < xstep * 0.01 ? 'start' : x1 - tx < xstep * 0.01 ? 'end' : 'middle' }, fmtFixed(tx, xd2)));
        }
      }
      if (xd.label) svg.appendChild(s('text', { 'class': 'lab-ax', x: mL + pw / 2, y: Hh - 8, 'text-anchor': 'middle' }, xd.label + (xd.unit ? '（' + xd.unit + '）' : '')));
      if (f.yLabel) svg.appendChild(s('text', { 'class': 'lab-ax', x: 4, y: mT - 14 }, '縦軸：' + f.yLabel + (f.unit ? '（' + f.unit + '）' : '')));
      /* 凡例 */
      lgRows.forEach(function (r, ri) {
        var ox = mL;
        r.forEach(function (li) {
          var it = lgItems[li];
          if (it.k === 'l') {
            var dsh = dashOf(ser[it.j], it.j);
            svg.appendChild(s('line', { 'class': 'lab-wave c-' + (ser[it.j].color || COLORS[it.j % COLORS.length]) + (ser[it.j].faint ? ' faint' : ''), x1: ox, y1: 14 + ri * 18, x2: ox + 22, y2: 14 + ri * 18, 'stroke-dasharray': dsh }));
          } else svg.appendChild(s('rect', { 'class': 'lab-fill c-' + (fills[it.j].color || 'core'), x: ox, y: 8 + ri * 18, width: 22, height: 12 }));
          svg.appendChild(s('text', { 'class': 'lab-lg', x: ox + 26, y: 18 + ri * 18 }, it.label)); ox += widths[li];
        });
      });
      var defs = s('defs', null, s('clipPath', { id: clipId }, s('rect', { x: mL, y: mT, width: pw, height: ph })));
      svg.insertBefore(defs, svg.firstChild);
      /* 2 本の系列の間の帯（fills：変化の大きさを色で見せる）。expr の系列どうしだけ */
      fills.forEach(function (z) {
        var top = [], bot = [], ia = z.a, ib = z.b;
        if (!data[ia] || !data[ib] || pts[ia] || pts[ib]) return;
        for (i = 0; i <= N; i++) { var va = data[ia][i], vb = data[ib][i]; if (isFinite(va) && isFinite(vb)) { top.push(X0(xs[i]).toFixed(1) + ',' + Y0(va).toFixed(1)); bot.unshift(X0(xs[i]).toFixed(1) + ',' + Y0(vb).toFixed(1)); } }
        if (top.length > 1) svg.appendChild(s('polygon', { 'class': 'lab-fill c-' + (z.color || 'core'), points: top.concat(bot).join(' '), 'clip-path': 'url(#' + clipId + ')' }));
      });
      /* 折れ線（値が数でない所では線を切る）。data の系列は点を直線でつなぎ、点に丸を付ける */
      ser.forEach(function (z, j) {
        if (!vis[j]) return;
        var cls = 'lab-wave lab-curve c-' + (z.color || COLORS[j % COLORS.length]) + (z.faint ? ' faint' : '');
        if (pts[j]) {
          if (pts[j].length > 1) svg.appendChild(s('polyline', { 'class': cls, points: pts[j].map(function (q) { return X0(q.x).toFixed(1) + ',' + Y0(q.y).toFixed(1); }).join(' '), 'stroke-dasharray': dashOf(z, j), 'clip-path': 'url(#' + clipId + ')' }));
          pts[j].forEach(function (q) { svg.appendChild(s('circle', { 'class': 'lab-dot c-' + (z.color || COLORS[j % COLORS.length]), cx: X0(q.x), cy: Y0(q.y), r: 3.6 })); });
          return;
        }
        var seg = [], segs = [seg];
        data[j].forEach(function (v, ii) {
          if (!isFinite(v)) { if (seg.length) { seg = []; segs.push(seg); } return; }
          seg.push(X0(xs[ii]).toFixed(1) + ',' + Math.max(mT - 40, Math.min(mT + ph + 40, Y0(v))).toFixed(1));
        });
        segs.forEach(function (sg) { if (sg.length > 1) svg.appendChild(s('polyline', { 'class': cls, points: sg.join(' '), 'stroke-dasharray': dashOf(z, j), 'clip-path': 'url(#' + clipId + ')' })); });
      });
      /* 縦の目印 */
      var marks = (f.marks || []).map(function (m) { return { m: m, v: num(m.x, e, NaN) }; }), shown = 0;
      marks.forEach(function (o) {
        if (!isFinite(o.v) || o.v < x0 - 1e-9 || o.v > x1 + 1e-9) return;
        var mx = X0(o.v), lab = o.m.label || '';
        svg.appendChild(s('line', { 'class': 'lab-mark', x1: mx, y1: mT, x2: mx, y2: mT + ph }));
        ser.forEach(function (z, j) { if (!vis[j] || z.nodot) return; var yv = valAt(j, o.v); if (isFinite(yv) && yv >= ymin && yv <= ymax) svg.appendChild(s('circle', { 'class': 'lab-dot c-' + (z.color || COLORS[j % COLORS.length]), cx: mx, cy: Y0(yv), r: 4.5 })); });
        if (lab) svg.appendChild(s('text', { 'class': 'lab-mark-t halo', x: mx + (mx > mL + pw * 0.62 ? -5 : 5), y: mT + 13 + (shown % 2) * 14, 'text-anchor': mx > mL + pw * 0.62 ? 'end' : 'start' }, lab));
        shown++;
      });
      /* 同じ内容の表と、図の名前に入れる要約 */
      var vser = ser.map(function (z, j) { return j; }).filter(function (j) { return vis[j]; });
      var cols = [(xd.label || xd.id) + (xd.unit ? '（' + xd.unit + '）' : '')].concat(vser.map(function (j) { return ser[j].label + (f.unit ? '（' + f.unit + '）' : ''); }));
      var xlab = function (v) {
        var j2, i3; for (i3 = 0; i3 < ticks.length; i3++) if (Math.abs(tPos(ticks[i3].v) - tPos(v)) < 1e-9) return ticks[i3].label;
        for (j2 = 0; j2 < vser.length; j2++) if (pts[vser[j2]]) { var q = pts[vser[j2]].filter(function (r) { return Math.abs(tPos(r.x) - tPos(v)) < 1e-9; })[0]; if (q && q.l) return q.l; }
        return fmtFixed(v, xdec);
      };
      var body = [], picked = {}, allData = vser.length && vser.every(function (j) { return pts[j]; });
      if (allData) {
        var ux = []; vser.forEach(function (j) { pts[j].forEach(function (q) { if (ux.indexOf(q.x) < 0) ux.push(q.x); }); }); ux.sort(function (p1, p2) { return p1 - p2; });
        ux.forEach(function (v) { body.push([xlab(v)].concat(vser.map(function (j) { var y = valAt(j, v), ex = pts[j].some(function (q) { return q.x === v; }); return ex && isFinite(y) ? fmtFixed(y, dg) : '—'; }))); });
      } else if (ticks.length) {
        ticks.forEach(function (t) { body.push([t.label].concat(vser.map(function (j) { var y = valAt(j, t.v); return isFinite(y) ? fmtFixed(y, dg) : '—'; }))); });
      } else {
        var nt = Math.min(N, 12);
        for (i = 0; i <= nt; i++) { var ix = Math.round(N * i / nt); if (picked[ix]) continue; picked[ix] = 1; body.push([fmtFixed(xs[ix], xdec)].concat(vser.map(function (j) { return fmtFixed(data[j][ix], dg); }))); }
      }
      marks.forEach(function (o) {
        if (!isFinite(o.v)) return;
        body.push([(o.m.label || '目印') + '（' + xlab(o.v) + '）'].concat(vser.map(function (j) { return fmtFixed(valAt(j, o.v), dg); })));
        rows.push([(o.m.label || '目印') + '（' + (xd.label || xd.id) + ' ' + xlab(o.v) + '）', vser.map(function (j) { return ser[j].label + ' ' + fmtFixed(valAt(j, o.v), dg); }).join('、')]);
      });
      vser.forEach(function (j) {
        var z = ser[j], a = data[j].filter(isFinite);
        if (pts[j]) { rows.push([z.label + '（点の値）', pts[j].map(function (q) { return (q.l || fmtFixed(q.x, xdec)) + ' ' + fmtFixed(q.y, dg); }).join('、') + (f.unit ? ' ' + f.unit : '')]); return; }
        rows.push([z.label + '（範囲の端・最小・最大）', a.length ? fmtFixed(data[j][0], dg) + '・' + fmtFixed(data[j][N], dg) + '・' + fmtFixed(Math.min.apply(null, a), dg) + '・' + fmtFixed(Math.max.apply(null, a), dg) + (f.unit ? ' ' + f.unit : '') : '値なし']);
      });
      (f.spans || []).forEach(function (sp) { if (sp.label && !(sp.when && !ev(X.compile(sp.when), e))) rows.push(['帯：' + sp.label, '表示中']); });
      rows.tbl = { head: cols, body: body };
      return svg;
    }
    function dashOf(z, j) {
      if (z.dash === false) return null;
      if (z.dash === true || z.dash === 'dash') return '7 4';
      if (z.dash === 'dot') return '2 4';
      if (typeof z.dash === 'string') return z.dash;
      return [null, '7 4', '2 4'][j % 3];
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
      (x.results || []).forEach(function (r) { out.push(r.label); });
      (x.figs || (x.fig ? [x.fig] : [])).forEach(function (f) { if (f.type === 'curve') { (f.series || []).forEach(function (z) { out.push(z.label); }); (f.marks || []).forEach(function (z) { out.push(z.label); }); } });
      (x.presets || []).forEach(function (z) { out.push(z.label, z.text); });
      if (x.quad) (x.quad.cells || []).forEach(function (r) { r.forEach(function (c) { out.push(c.title, c.sub); }); });
      (x.reads || []).forEach(function (z) { out.push(z.text); });
    });
    return out.filter(Boolean).join(' ');
  };
})();
