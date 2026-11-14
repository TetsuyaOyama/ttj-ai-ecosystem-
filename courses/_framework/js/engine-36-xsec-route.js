/* 部品12：工程断面ステッパー xsec（断面が手ごとに変わる様子を再生）／ 部品13：行程帯図 route（区間ごとの負担者を、条件を切り替えて比べる） */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;
  function isEnter(e) { return e.key === 'Enter' || e.key === ' '; }
  var NS = 'http://www.w3.org/2000/svg';

  /* ================= 12 xsec =================
     データ形式は FRAMEWORK.md の「xsec」を参照。材料 m は下の固定の一覧（色は CSS 変数 --m-名前）から選ぶ。 */
  var MAT = {
    'si': ['シリコン', 'Silicon', '基板になる単結晶。'], 'si-n': ['n 型領域', 'n-type region', '電子が主役になるように不純物を入れた領域。'], 'si-p': ['p 型領域', 'p-type region', '正孔が主役になるように不純物を入れた領域。'],
    'sio2': ['酸化膜', 'Silicon dioxide', '絶縁や素子の分離に使う。'], 'sin': ['窒化膜', 'Silicon nitride', 'マスクや保護、絶縁に使う。'], 'poly': ['多結晶シリコン', 'Polysilicon', 'ゲート電極などに使う。'],
    'hk': ['高誘電率膜', 'High-k dielectric', 'ゲート絶縁膜に使う薄い膜。'], 'metal': ['金属（一般）', 'Metal', '電極・配線などの金属。'], 'cu': ['銅', 'Copper', '配線に使う。'], 'w': ['タングステン', 'Tungsten', 'プラグ（縦の接続）に使う。'],
    'al': ['アルミ', 'Aluminum', '配線・パッドに使う。'], 'barrier': ['バリアメタル', 'Barrier metal', '銅などの拡散を防ぐ薄い金属膜。'], 'lowk': ['低誘電率膜', 'Low-k dielectric', '配線間の容量を減らす絶縁膜。'],
    'resist': ['レジスト', 'Photoresist', '光で性質が変わる感光材。'], 'resist-exp': ['露光部', 'Exposed resist', '光が当たって性質が変わった部分。'], 'mold': ['封止樹脂', 'Mold compound', 'チップを包んで守る樹脂。'],
    'bump': ['はんだ・バンプ', 'Solder bump', '電気的な接続の突起。'], 'substrate': ['パッケージ基板', 'Package substrate', 'チップを載せる配線基板。'], 'void': ['空洞・溝', 'Void / trench', '材料がない部分。']
  };
  CN.MATERIALS = MAT;
  var FX = { deposit: ['↓', '堆積'], coat: ['↓', '塗布'], expose: ['⇊', '露光'], develop: ['≈', '現像'], etch: ['⇣', 'エッチング'], strip: ['≈', '除去'], implant: ['↓', 'イオン注入'], anneal: ['≋', '熱処理'], polish: ['↔', '研磨'], plate: ['↓', 'めっき'], clean: ['≈', '洗浄'], bond: ['⇅', '接合'], dice: ['┃', '切断'], measure: ['⌖', '計測'] };

  function shapeEl(sh, cls) {
    var e;
    if (sh.pts) e = s('polygon', { points: sh.pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') });
    else e = s('rect', { x: sh.x, y: sh.y, width: sh.w, height: sh.h });
    e.setAttribute('class', 'xs-sh m-' + sh.m + (cls || ''));
    return e;
  }
  CN.widgets.xsec = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var steps = d.steps, N = steps ? steps.length : 0, vb = d.viewBox || [600, 260];
    if (!N) throw new Error('xsec: steps が空です');
    /* 各手のあとの図形の一覧を先に作る */
    var states = [], cur0 = {}, order = [];
    function put(sh) { if (!cur0[sh.id]) order.push(sh.id); cur0[sh.id] = sh; }
    (d.base || []).forEach(function (sh) { put(JSON.parse(JSON.stringify(sh))); });
    steps.forEach(function (st, i) {
      var chg = {}, rem = [];
      (st.del || []).forEach(function (id) { if (!cur0[id]) throw new Error('xsec: 手 ' + (i + 1) + ' の del "' + id + '" がありません'); delete cur0[id]; order.splice(order.indexOf(id), 1); rem.push(id); });
      (st.mod || []).forEach(function (m) { var o = cur0[m.id]; if (!o) throw new Error('xsec: 手 ' + (i + 1) + ' の mod "' + m.id + '" がありません'); var n = JSON.parse(JSON.stringify(o)); Object.keys(m).forEach(function (k) { n[k] = m[k]; }); put(n); chg[m.id] = 1; });
      (st.add || []).forEach(function (a) { if (!MAT[a.m]) throw new Error('xsec: 材料 "' + a.m + '" は一覧にありません'); put(JSON.parse(JSON.stringify(a))); chg[a.id] = 1; });
      states.push({ shapes: order.map(function (id) { return cur0[id]; }), chg: chg, rem: rem });
    });
    var MN = function (k) { var o = d.materials && d.materials[k]; return o ? [o.name || MAT[k][0], o.en || MAT[k][1], o.role || MAT[k][2]] : MAT[k]; };   // 材料の名前は図ごとに言い換えられる（色は固定）
    var used = {}; (d.base || []).forEach(function (b) { used[b.m] = 1; }); steps.forEach(function (st) { (st.add || []).forEach(function (a) { used[a.m] = 1; }); });
    var mats = Object.keys(MAT).filter(function (k) { return used[k]; });

    CN.frame(el, T('xsec.kind'), d.title);
    var cur = Math.max(0, Math.min(N - 1, d.start || 0)), playing = false, timer = null, speed = 1, hiM = null;
    var multi = N > 1;
    var btnFirst = h('button', { 'class': 'btn', type: 'button', 'aria-label': '最初の手へ' }, '⏮'), btnPrev = h('button', { 'class': 'btn', type: 'button' }, '◀ 前へ'),
      btnPlay = h('button', { 'class': 'btn pri', type: 'button', 'aria-pressed': 'false' }, '▶ 再生'), btnNext = h('button', { 'class': 'btn', type: 'button' }, '次へ ▶'),
      range = h('input', { type: 'range', min: 1, max: N, value: 1, 'aria-label': '手の位置' }), cnt = h('span', { 'class': 'cnt', 'aria-hidden': 'true' }),
      sel = h('select', { 'aria-label': '再生速度' }, h('option', { value: '0.5' }, '0.5×'), h('option', { value: '1', selected: '' }, '1×'), h('option', { value: '2' }, '2×'));
    if (multi) el.appendChild(h('div', { 'class': 'seq-ctl' }, btnFirst, btnPrev, btnPlay, btnNext, range, cnt, sel));
    var stage = h('div', { 'class': 'scroll-x xs-stage', tabindex: 0, role: 'group', 'aria-label': '断面図。左右の矢印キーで手を進め、スペースで再生／一時停止します' });
    var svg = s('svg', { 'class': 'xs-svg', id: ctx.id, viewBox: '0 0 ' + vb[0] + ' ' + vb[1], role: 'img', style: 'max-width:' + Math.round(vb[0] * 1.4) + 'px;min-width:300px' });
    var layer = s('g'), fxl = s('g');
    svg.appendChild(layer); svg.appendChild(fxl); stage.appendChild(svg);
    var body = h('div', { 'class': 'wg-body' }); body.appendChild(stage);
    body.appendChild(h('p', { 'class': 'xs-note' }, T('xsec.note')));
    var lg = h('div', { 'class': 'legend xs-legend', role: 'group', 'aria-label': '材料の凡例（押すとその材料を強調）' });
    mats.forEach(function (k) { lg.appendChild(h('button', { type: 'button', 'class': 'xs-lg', 'data-m': k, 'aria-pressed': 'false', on: { click: function () { hiM = hiM === k ? null : k; render(); } } }, h('i', { 'class': 'sw m-' + k }), MN(k)[0])); });
    body.appendChild(lg);
    el.appendChild(body);
    var info = h('div', { 'class': 'wg-info xs-info', 'aria-live': 'polite' }); el.appendChild(info);
    var listBtns = [];
    if (multi) {
      var det = h('details', { 'class': 'seq-list' }, h('summary', null, T('xsec.list') + '（' + N + '）')), ol = h('ol'), lp = null;
      steps.forEach(function (st, i) {
        if (st.phase && st.phase !== lp) { ol.appendChild(h('li', { 'class': 'ph-h' }, st.phase)); lp = st.phase; }
        var b = h('button', { type: 'button', on: { click: function () { go(i, true); } } }, h('span', { 'class': 'no' }, String(i + 1)), st.name); listBtns.push(b); ol.appendChild(h('li', null, b));
      });
      det.appendChild(ol); el.appendChild(det);
    }
    function render() {
      var st = steps[cur], S = states[cur];
      CN.clear(layer); CN.clear(fxl);
      S.shapes.forEach(function (sh) {
        var cls = (S.chg[sh.id] ? ' chg' : '') + (hiM ? (sh.m === hiM ? ' hi' : ' dim') : '');
        layer.appendChild(shapeEl(sh, cls));
      });
      S.shapes.forEach(function (sh) { if (sh.label) { var bx = sh.pts ? sh.pts.reduce(function (a, p) { return [a[0] + p[0] / sh.pts.length, a[1] + p[1] / sh.pts.length]; }, [0, 0]) : [sh.x + sh.w / 2, sh.y + sh.h / 2]; layer.appendChild(s('text', { 'class': 'xs-lb', x: bx[0], y: bx[1] + 4 }, sh.label)); } });
      if (st.fx && FX[st.fx]) {
        var a = st.fxArea || [0, 0, vb[0], vb[1]], gl = FX[st.fx][0], n = Math.max(2, Math.min(9, Math.floor(a[2] / 56)));
        for (var i = 0; i < n; i++) fxl.appendChild(s('text', { 'class': 'xs-fx', x: a[0] + (i + 0.5) * a[2] / n, y: a[1] + Math.min(a[3], 40) / 2 + 8 }, gl));
        fxl.appendChild(s('text', { 'class': 'xs-fxl halo', x: a[0] + a[2] - 6, y: a[1] + 14, 'text-anchor': 'end' }, st.fxLabel || FX[st.fx][1]));
      }
      svg.setAttribute('aria-label', d.title + '：' + (multi ? (cur + 1) + '/' + N + ' ' : '') + st.name + '。' + (st.what || '').replace(/[`*]/g, ''));
      lg.querySelectorAll('.xs-lg').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-m') === hiM)); });
      listBtns.forEach(function (b, i) { if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      cnt.textContent = (cur + 1) + ' / ' + N; range.value = cur + 1;
      btnPrev.disabled = btnFirst.disabled = cur === 0; btnNext.disabled = cur === N - 1;
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'kick' }, (multi ? T('xsec.step') + ' ' + (cur + 1) + ' / ' + N : T('xsec.kind')) + (st.phase ? ' ・ ' + st.phase : '')));
      info.appendChild(h('h5', null, st.name));
      var meta = h('div', { 'class': 'meta' });
      if (st.proc) meta.appendChild(h('span', { 'class': 'chip' }, T('xsec.proc') + '：' + st.proc));
      if (st.equip) meta.appendChild(h('span', { 'class': 'chip' }, T('xsec.equip') + '：' + st.equip));
      if (meta.firstChild) info.appendChild(meta);
      var dl = h('dl');
      if (st.what) { dl.appendChild(h('dt', null, T('seq.what'))); dl.appendChild(h('dd', { html: CN.rich(st.what) })); }
      if (st.trap) { dl.appendChild(h('dt', null, T('seq.trap'))); dl.appendChild(h('dd', { html: CN.rich(st.trap) })); }
      if (hiM) { dl.appendChild(h('dt', null, '材料')); dl.appendChild(h('dd', null, MN(hiM)[0] + '（' + MN(hiM)[1] + '）：' + MN(hiM)[2])); }
      info.appendChild(dl);
      if (st.ch && st.ch.length) info.appendChild(CN.chLinks(st.ch));
    }
    function go(i, user) { cur = Math.max(0, Math.min(N - 1, i)); if (user) stop(); render(); }
    function stop() { playing = false; clearTimeout(timer); btnPlay.textContent = '▶ 再生'; btnPlay.setAttribute('aria-pressed', 'false'); }
    function tick() { if (!playing) return; if (!el.offsetParent || cur >= N - 1) { stop(); return; } go(cur + 1, false); if (cur >= N - 1) { stop(); return; } timer = setTimeout(tick, 2600 / speed); }
    function play() { if (playing) { stop(); return; } if (cur >= N - 1) go(0, false); playing = true; btnPlay.textContent = '⏸ 一時停止'; btnPlay.setAttribute('aria-pressed', 'true'); timer = setTimeout(tick, 1400 / speed); }
    btnFirst.addEventListener('click', function () { go(0, true); }); btnPrev.addEventListener('click', function () { go(cur - 1, true); }); btnNext.addEventListener('click', function () { go(cur + 1, true); });
    btnPlay.addEventListener('click', play); range.addEventListener('input', function () { go(parseInt(range.value, 10) - 1, true); }); sel.addEventListener('change', function () { speed = parseFloat(sel.value) || 1; });
    stage.addEventListener('keydown', function (e) {
      if (!multi) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(cur + 1, true); } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(cur - 1, true); }
      else if (e.key === 'Home') { e.preventDefault(); go(0, true); } else if (e.key === 'End') { e.preventDefault(); go(N - 1, true); } else if (e.key === ' ') { e.preventDefault(); play(); }
    });
    render();
  };
  CN.searchText.xsec = function (d) { return d.title + ' ' + d.steps.map(function (st) { return [st.name, st.proc, st.equip, st.what, st.trap].filter(Boolean).join(' '); }).join(' '); };

  /* ================= 13 route =================
     データ形式は FRAMEWORK.md の「route」を参照。 */
  var MODE = { land: '陸送', sea: '海上', air: '航空', site: '現地・構内', customs: '通関', pack: '梱包', store: '保管' };
  function icon(mode, x, y) {   // 24x24 の記号を中心 (x,y) に描く（画像は使わない）
    var g = s('g', { 'class': 'rt-ic', transform: 'translate(' + (x - 12) + ',' + (y - 12) + ')', 'aria-hidden': 'true' });
    var P = function (d) { return s('path', { d: d }); };
    if (mode === 'land') { g.appendChild(P('M2 6h12v9H2zM14 9h5l3 3v3h-8z')); g.appendChild(s('circle', { cx: 6, cy: 17, r: 2 })); g.appendChild(s('circle', { cx: 18, cy: 17, r: 2 })); }
    else if (mode === 'sea') g.appendChild(P('M2 14h20l-3 6H5zM11 3v9M11 3l6 7h-6'));
    else if (mode === 'air') g.appendChild(P('M12 2l2 8 8 4v2l-8-2-1 5 3 2v1l-4-1-4 1v-1l3-2-1-5-8 2v-2l8-4z'));
    else if (mode === 'customs') g.appendChild(P('M6 3v18M6 4h12l-3 4 3 4H6'));
    else if (mode === 'pack') g.appendChild(P('M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10'));
    else if (mode === 'store') g.appendChild(P('M2 10l10-7 10 7v10H2zM8 20v-6h8v6'));
    else g.appendChild(P('M4 21V6l8-3 8 3v15M9 21v-5h6v5M8 9h2M14 9h2M8 12h2M14 12h2'));
    return g;
  }
  CN.widgets.route = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var pts = d.points, segs = d.segs, gates = d.gates || [], parties = d.parties, layers = d.layers, pm = {}, sm = {}, gm = {}, partyM = {};
    pts.forEach(function (p, i) { p._i = i; pm[p.id] = p; }); segs.forEach(function (x) { sm[x.id] = x; }); gates.forEach(function (x) { gm[x.id] = x; }); parties.forEach(function (p) { partyM[p.k] = p; });
    var n = pts.length, colW = Math.max(120, Math.min(170, Math.floor(780 / Math.max(2, n - 1)))), gutter = 62, padX = 16, W = gutter + padX * 2 + (n - 1) * colW + 130;
    var X = function (id) { return gutter + padX + 30 + pm[id]._i * colW; };
    var maxRows = Math.max.apply(null, layers.map(function (l) { return l.rows.length; })), bandH = 34, top = 96, H = top + 18 + maxRows * (bandH + 12) + 40;
    var cur = 0, selId = null, selKind = null;
    var tabs = layers.length > 1 ? CN.tabs(layers.map(function (l, i) { return { key: i, label: l.label }; }), 0, function (k) { cur = k; paint(); show(); }, T('route.layerAria')) : null;
    CN.frame(el, T('route.kind'), d.title, tabs);
    var body = h('div', { 'class': 'wg-body' }), info = h('div', { 'class': 'wg-info rt-info', 'aria-live': 'polite' });
    var svg = s('svg', { 'class': 'rt-svg', id: ctx.id, viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': d.title + '（' + T('route.kind') + '。' + pts.map(function (p) { return p.label; }).join(' → ') + '）', style: 'min-width:' + Math.min(W, 640) + 'px' });
    var items = {};   // id -> {el, kind}
    function reg(g, id, kind, label) {
      g.setAttribute('tabindex', 0); g.setAttribute('role', 'button'); g.setAttribute('aria-label', label); g.setAttribute('aria-pressed', 'false');
      g.addEventListener('click', function () { pick(id, kind); }); g.addEventListener('keydown', function (e) { if (isEnter(e)) { e.preventDefault(); pick(id, kind); } });
      items[kind + ':' + id] = g;
    }
    /* 上段：拠点と区間 */
    var lineY = 54;
    segs.forEach(function (sg) {
      var a = X(sg.from), b = X(sg.to), g = s('g', { 'class': 'rt-seg' });
      g.appendChild(s('rect', { 'class': 'hit', x: a + 10, y: lineY - 26, width: b - a - 20, height: 52 }));
      g.appendChild(s('line', { 'class': 'ln', x1: a + 10, y1: lineY, x2: b - 10, y2: lineY }));
      g.appendChild(icon(sg.mode, (a + b) / 2, lineY - 14));
      g.appendChild(s('text', { 'class': 'rt-sl halo', x: (a + b) / 2, y: lineY + 20, 'text-anchor': 'middle' }, sg.label));
      reg(g, sg.id, 'seg', T('route.seg') + '：' + sg.label + '（' + (MODE[sg.mode] || '') + '）'); svg.appendChild(g);
    });
    pts.forEach(function (p) {
      var g = s('g', { 'class': 'rt-pt' }), x = X(p.id);
      g.appendChild(s('circle', { cx: x, cy: lineY, r: 9 })); g.appendChild(s('text', { 'class': 'rt-pl halo', x: x, y: 20, 'text-anchor': 'middle' }, p.label));
      if (p.sub) g.appendChild(s('text', { 'class': 'rt-ps', x: x, y: 33, 'text-anchor': 'middle' }, p.sub));
      reg(g, p.id, 'pt', T('route.pt') + '：' + p.label); svg.appendChild(g);
    });
    gates.forEach(function (gt) {
      var x = X(gt.at), g = s('g', { 'class': 'rt-gate' });
      g.appendChild(s('line', { x1: x, y1: lineY + 9, x2: x, y2: lineY + 30 })); g.appendChild(s('path', { d: 'M' + x + ' ' + (lineY + 30) + 'h22l-5 6 5 6h-22z' }));
      g.appendChild(s('text', { 'class': 'rt-gl halo', x: x + 26, y: lineY + 41 }, gt.label));
      reg(g, gt.id, 'gate', T('route.gate') + '：' + gt.label); svg.appendChild(g);
    });
    /* 下段：段ごとの色帯（層の切替で塗りだけが変わる） */
    var bandEls = [];
    for (var r = 0; r < maxRows; r++) {
      var y = top + 20 + r * (bandH + 12), rowG = s('g', { 'class': 'rt-row' });
      rowG.appendChild(s('text', { 'class': 'rt-rl', x: gutter, y: y + bandH / 2 + 4, 'text-anchor': 'end' }, ''));
      var cells = [];
      segs.forEach(function (sg) { var a = X(sg.from), b = X(sg.to), rc = s('rect', { x: a + 4, y: y, width: b - a - 8, height: bandH, rx: 5 }), tx = s('text', { 'class': 'rt-bt', x: (a + b) / 2, y: y + bandH / 2 + 5, 'text-anchor': 'middle' }); rowG.appendChild(rc); rowG.appendChild(tx); cells.push({ id: sg.id, rc: rc, tx: tx }); });
      gates.forEach(function (gt) { var x = X(gt.at), rc = s('rect', { x: x - 11, y: y + 4, width: 22, height: bandH - 8, rx: 4 }), tx = s('text', { 'class': 'rt-bt', x: x, y: y + bandH / 2 + 5, 'text-anchor': 'middle' }); rowG.appendChild(rc); rowG.appendChild(tx); cells.push({ id: gt.id, rc: rc, tx: tx }); });
      svg.appendChild(rowG); bandEls.push({ label: rowG.firstChild, cells: cells, y: y, g: rowG });
    }
    var markG = s('g'); svg.appendChild(markG);
    var wrap = h('div', { 'class': 'scroll-x' }, svg);
    body.appendChild(h('div', { 'class': 'scroll-hint' }, '図は左右にスクロールできます')); body.appendChild(wrap);
    var lg = h('div', { 'class': 'legend' }); parties.forEach(function (p) { lg.appendChild(h('span', null, h('i', { 'class': 'pt pt-' + p.k }), p.label)); }); lg.appendChild(h('span', null, T('route.legendTail'))); body.appendChild(lg);
    el.appendChild(body); el.appendChild(info);
    /* 同じ内容の表（読み上げ・印刷用） */
    var det = h('details', { 'class': 'seq-list rt-table' }, h('summary', null, T('route.table'))), cols = segs.map(function (x) { return x.label; }).concat(gates.map(function (x) { return x.label; }));
    var ids = segs.map(function (x) { return x.id; }).concat(gates.map(function (x) { return x.id; }));
    layers.forEach(function (L) {
      var tb = h('tbody'); L.rows.forEach(function (row) { var tr = h('tr', null, h('th', { scope: 'row' }, row.label)); ids.forEach(function (id) { var k = row.by[id]; tr.appendChild(h('td', null, k && partyM[k] ? partyM[k].label : '—')); }); tb.appendChild(tr); });
      var hr = h('tr', null, h('th', null, '')); cols.forEach(function (c) { hr.appendChild(h('th', { scope: 'col' }, c)); });
      det.appendChild(h('div', { 'class': 'tbl-wrap' }, h('table', { 'class': 'tbl' }, h('caption', null, L.label + (L.note ? '：' + L.note.replace(/[`*]/g, '') : '')), h('thead', null, hr), tb)));
    });
    el.appendChild(det);

    function paint() {
      var L = layers[cur];
      bandEls.forEach(function (b, r) {
        var row = L.rows[r]; b.g.setAttribute('visibility', row ? 'visible' : 'hidden'); b.label.textContent = row ? row.label : '';
        b.cells.forEach(function (c) { var k = row && row.by[c.id]; c.rc.setAttribute('class', 'rt-b' + (k && partyM[k] ? ' pt-' + k : ' pt-none')); c.tx.textContent = k && partyM[k] ? partyM[k].label.charAt(0) : '—'; });
      });
      CN.clear(markG);
      (L.marks || []).forEach(function (m, mi) {
        var isSeg = !!sm[m.at], x = isSeg ? (X(sm[m.at].from) + X(sm[m.at].to)) / 2 : X(m.at), b = bandEls[m.row || 0]; if (!b) return;
        var g = s('g', { 'class': 'rt-mark' }); g.appendChild(s('rect', { 'class': 'hit', x: x - 46, y: b.y - 10, width: 92, height: bandH + 24 })); g.appendChild(s('path', { d: 'M' + x + ' ' + (b.y - 8) + 'l7 8-7 8-7-8z' }));
        g.appendChild(s('text', { 'class': 'rt-ml halo', x: x, y: b.y + bandH + 11, 'text-anchor': 'middle' }, m.label));
        reg(g, String(mi), 'mark', T('route.mark') + '：' + m.label); markG.appendChild(g);
      });
      Object.keys(items).forEach(function (k) { var on = k === selKind + ':' + selId; items[k].setAttribute('aria-pressed', String(on)); var c = items[k].getAttribute('class') || ''; items[k].setAttribute('class', c.replace(/ ?sel/g, '') + (on ? ' sel' : '')); });
    }
    function pick(id, kind) { selId = id; selKind = kind; paint(); show(); }
    function by(id) { var L = layers[cur]; return L.rows.map(function (row) { var k = row.by[id]; return row.label + '：' + (k && partyM[k] ? partyM[k].label : '—'); }); }
    function show() {
      var L = layers[cur]; CN.clear(info);
      var o = selKind === 'seg' ? sm[selId] : selKind === 'gate' ? gm[selId] : selKind === 'pt' ? pm[selId] : selKind === 'mark' ? (L.marks || [])[+selId] : null;
      if (!o) {
        info.appendChild(h('p', { 'class': 'kick' }, T('route.layer') + '：' + L.label)); if (L.note) info.appendChild(CN.richEl('p', '', L.note));
        info.appendChild(h('p', { 'class': 'hint' }, d.hint || T('route.hint'))); if (L.ch && L.ch.length) info.appendChild(CN.chLinks(L.ch)); return;
      }
      info.appendChild(h('p', { 'class': 'kick' }, T('route.' + selKind) + (selKind === 'seg' || selKind === 'gate' ? ' ・ ' + (MODE[o.mode] || '') : '') + ' ・ ' + L.label));
      info.appendChild(h('h5', null, o.label));
      if (selKind === 'seg' || selKind === 'gate') info.appendChild(h('div', { 'class': 'chips' }, by(selId).map(function (t) { return h('span', { 'class': 'chip' }, t); })));
      if (o.d) info.appendChild(CN.richEl('p', '', o.d));
      var dl = h('dl');
      if (o.docs && o.docs.length) { dl.appendChild(h('dt', null, T('route.docs'))); dl.appendChild(h('dd', null, o.docs.join('、'))); }
      if (o.risks && o.risks.length) { dl.appendChild(h('dt', null, T('route.risks'))); dl.appendChild(h('dd', null, o.risks.join('、'))); }
      if (dl.firstChild) info.appendChild(dl);
      if (o.ch && o.ch.length) info.appendChild(CN.chLinks(o.ch));
    }
    paint(); show();
  };
  CN.searchText.route = function (d) {
    var out = [d.title]; d.points.forEach(function (p) { out.push(p.label, p.sub); }); d.segs.forEach(function (x) { out.push(x.label, x.d, (x.docs || []).join(' '), (x.risks || []).join(' ')); });
    (d.gates || []).forEach(function (x) { out.push(x.label, x.d); }); d.layers.forEach(function (l) { out.push(l.label, l.note); (l.marks || []).forEach(function (m) { out.push(m.label, m.d); }); });
    return out.filter(Boolean).join(' ');
  };
})();
