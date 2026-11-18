/* build.py --check から呼ばれる：data/*.js を、描画なしの偽の CN で実行し、登録内容を JSON で返す（用語集・対応表・対比表の重複、参照の整合）。
   使い方: CN_PARTS='[{"key":"1","appendix":false}]' node check-data.js data/01-a.js data/02-b.js */
'use strict';
const fs = require('fs'), path = require('path');
const files = process.argv.slice(2);
const PARTS = JSON.parse(process.env.CN_PARTS || '[]');
const out = { added: [], glossary: [], mapping: [], compare: [], exam: [], quiz: [], chRefs: [], problems: [], error: null };
const ALIAS = { qos: 'table', keys: 'tree' };
const MATS = ['si', 'si-n', 'si-p', 'sio2', 'sin', 'poly', 'hk', 'metal', 'cu', 'w', 'al', 'barrier', 'lowk', 'resist', 'resist-exp', 'mold', 'bump', 'substrate', 'void'];
const FXS = ['deposit', 'coat', 'expose', 'develop', 'etch', 'strip', 'implant', 'anneal', 'polish', 'plate', 'clean', 'bond', 'dice', 'measure'];
const MODES = ['land', 'sea', 'air', 'site', 'customs', 'pack', 'store'];
const ROLES = ['app', 'payload', 'transport', 'net', 'link', 'sec'];
let F = '';
function prob(m) { out.problems.push({ f: F, msg: m }); }
function ids(arr, what, getId) {
  const seen = {};
  (arr || []).forEach((x, i) => { const id = getId ? getId(x) : x.id; if (id == null) { prob(what + ' の ' + (i + 1) + ' 番目に id がありません'); return; } if (seen[id]) prob(what + ' の id "' + id + '" が重複しています'); seen[id] = 1; });
  return seen;
}
function walkCh(v, where) {   // ch: 章番号（数値か配列）を集める
  if (Array.isArray(v)) { v.forEach(x => walkCh(x, where)); return; }
  if (v && typeof v === 'object') {
    for (const k of Object.keys(v)) {
      if (k === 'ch') { [].concat(v[k]).forEach(n => { if (n != null) out.chRefs.push({ f: F, where, n: String(n) }); }); }
      else walkCh(v[k], where);
    }
  }
}
const V = {
  arch(d, id) {
    const views = d.views && d.views.length ? d.views : [{}];
    views.forEach(v => {
      const nodes = v.nodes || d.nodes || [], links = v.links || d.links || [], bus = v.bus || d.bus;
      const nm = ids(nodes, 'arch ' + id + ' のノード');
      links.forEach(l => { [l.a, l.b].forEach(x => { if (!nm[x] && !(x === 'bus' && bus)) prob('arch ' + id + ' のリンク ' + l.id + ' が未定義のノード "' + x + '" を参照しています'); }); });
      ids(links, 'arch ' + id + ' のリンク');
    });
    if (d.initial) { const all = [].concat(d.nodes || [], d.links || []); (d.views || []).forEach(v => all.push(...(v.nodes || []), ...(v.links || []))); if (!all.some(x => x.id === d.initial)) prob('arch ' + id + ' の initial "' + d.initial + '" がありません'); }
  },
  seq(d, id) {
    const am = ids(d.actors, 'seq ' + id + ' の登場人物');
    (d.steps || []).forEach((st, i) => {
      [st.from, st.to, st.at].concat(st.span || []).forEach(x => { if (x != null && !am[x]) prob('seq ' + id + ' の手順 ' + (i + 1) + ' が未定義の登場人物 "' + x + '" を参照しています'); });
      if (!st.msg && st.note == null) prob('seq ' + id + ' の手順 ' + (i + 1) + ' に msg がありません');
    });
  },
  stack(d, id) { (d.ifs || d.stacks || []).forEach(f => (f.layers || []).forEach(l => { if (l.role && !ROLES.includes(l.role)) prob('stack ' + id + ' の層 ' + l.n + ' の role "' + l.role + '" は ' + ROLES.join('/') + ' のどれか'); })); },
  ident(d, id) { (d.items || []).forEach(it => { if (!it.parts || !it.parts.length) prob('ident ' + id + ' の ' + it.name + ' に parts がありません'); }); },
  table(d, id) {
    (d.rows || []).forEach((r, i) => { if (r.length !== d.cols.length) prob('table ' + id + ' の ' + (i + 1) + ' 行目は列数が ' + r.length + '（見出しは ' + d.cols.length + '）'); });
    if (d.detail && d.detail.length > d.rows.length) prob('table ' + id + ' の detail が rows より多いです');
    if (d.filter != null && (d.filter < 0 || d.filter >= d.cols.length)) prob('table ' + id + ' の filter が範囲外です');
  },
  tree(d, id) {
    (d.trees || []).forEach(t => {
      const nm = ids(t.nodes, 'tree ' + id + '/' + t.key + ' のノード');
      (t.edges || []).forEach(e => { [e.a, e.b].forEach(x => { if (!nm[x]) prob('tree ' + id + '/' + t.key + ' の辺が未定義のノード "' + x + '" を参照しています'); }); });
    });
  },
  state(d, id) {
    (d.machines || []).forEach(m => {
      const sm = ids(m.states, 'state ' + id + '/' + m.key + ' の状態');
      (m.trans || []).forEach(t => { [t.from, t.to].forEach(x => { if (!sm[x]) prob('state ' + id + '/' + m.key + ' の遷移が未定義の状態 "' + x + '" を参照しています'); }); });
    });
  },
  drill(d, id) {
    (d.cases || []).forEach((c, i) => {
      const p = c.procedure || d.procedure || [], n = c.nodes || d.nodes || [];
      if (!(c.step >= 0 && c.step < p.length)) prob('drill ' + id + ' のケース ' + (i + 1) + ' の step が選択肢の範囲外です');
      if (!(c.node >= 0 && c.node < n.length)) prob('drill ' + id + ' のケース ' + (i + 1) + ' の node が選択肢の範囲外です');
    });
  },
  quiz(d, id) {
    (d.items || []).forEach((it, i) => {
      if (!it.c || it.c.length < 2) prob('quiz ' + id + ' の問 ' + (i + 1) + ' は選択肢が 2 つ未満です');
      else if (!(it.a >= 0 && it.a < it.c.length)) prob('quiz ' + id + ' の問 ' + (i + 1) + ' の a が範囲外です');
      else if (new Set(it.c).size !== it.c.length) prob('quiz ' + id + ' の問 ' + (i + 1) + ' に同じ選択肢があります');
      out.quiz.push({ f: F, id, q: it.q });
    });
  },
  compare(d, id) {
    const keys = (d.cats || []).map(c => c.key);
    (d.rows || []).forEach((r, i) => {
      if (r.cat && !keys.includes(r.cat)) prob('compare ' + id + ' の行 ' + (i + 1) + ' の cat "' + r.cat + '" が cats にありません');
      if ((r.a == null && r.a4 == null) || (r.b == null && r.a5 == null)) prob('compare ' + id + ' の行 ' + (i + 1) + ' は a と b の両方が必要です');
      out.compare.push({ f: F, id, cat: r.cat || '', a: r.a != null ? r.a : r.a4, b: r.b != null ? r.b : r.a5 });
    });
  },
  flow(d, id) {
    const m = ids(d.steps, 'flow ' + id + ' の工程');
    (d.steps || []).forEach(st => { [].concat(st.next == null ? [] : st.next).forEach(x => { const t = typeof x === 'string' ? x : x.to; if (!m[t]) prob('flow ' + id + ' の工程 ' + st.id + ' の next が未定義の工程 "' + t + '" を参照しています'); }); });
  },
  xsec(d, id) {
    const vb = d.viewBox || [600, 260], cur = {};
    const inside = (sh, where) => {
      const xs = sh.pts ? sh.pts.map(p => p[0]) : [sh.x, sh.x + sh.w], ys = sh.pts ? sh.pts.map(p => p[1]) : [sh.y, sh.y + sh.h];
      if (Math.min(...xs) < -0.5 || Math.max(...xs) > vb[0] + 0.5 || Math.min(...ys) < -0.5 || Math.max(...ys) > vb[1] + 0.5) prob('xsec ' + id + ' ' + where + ' の図形 ' + sh.id + ' が viewBox からはみ出しています');
    };
    (d.base || []).forEach(sh => { cur[sh.id] = Object.assign({}, sh); if (!MATS.includes(sh.m)) prob('xsec ' + id + ' の base ' + sh.id + ' の材料 "' + sh.m + '" が一覧にありません'); inside(cur[sh.id], 'base'); });
    if (!d.steps || !d.steps.length) prob('xsec ' + id + ' に steps がありません');
    (d.steps || []).forEach((st, i) => {
      const w = '手 ' + (i + 1);
      if (!st.name) prob('xsec ' + id + ' の ' + w + ' に name がありません');
      if (st.fx && !FXS.includes(st.fx)) prob('xsec ' + id + ' の ' + w + ' の fx "' + st.fx + '" が一覧にありません');
      (st.del || []).forEach(x => { if (!cur[x]) prob('xsec ' + id + ' の ' + w + ' の del "' + x + '" がまだありません'); delete cur[x]; });
      (st.mod || []).forEach(m => { if (!cur[m.id]) prob('xsec ' + id + ' の ' + w + ' の mod "' + m.id + '" がまだありません'); else { Object.assign(cur[m.id], m); inside(cur[m.id], w); } });
      (st.add || []).forEach(a => { if (!MATS.includes(a.m)) prob('xsec ' + id + ' の ' + w + ' の材料 "' + a.m + '" が一覧にありません'); if (cur[a.id]) prob('xsec ' + id + ' の ' + w + ' の add "' + a.id + '" が既にあります'); cur[a.id] = Object.assign({}, a); inside(a, w); });
      if (st.add && st.add.length > 8) prob('xsec ' + id + ' の ' + w + ' は図形が ' + st.add.length + ' 個（6 個程度まで）');
    });
    if ((d.steps || []).length > 12) prob('xsec ' + id + ' は ' + d.steps.length + ' 手（4〜12 手）');
  },
  route(d, id) {
    const pm = ids(d.points, 'route ' + id + ' の拠点'), sm = ids(d.segs, 'route ' + id + ' の区間'), gm = ids(d.gates || [], 'route ' + id + ' の手続き'), keys = (d.parties || []).map(p => p.k);
    let prev = null;
    (d.segs || []).forEach(sg => {
      if (!pm[sg.from] || !pm[sg.to]) prob('route ' + id + ' の区間 ' + sg.id + ' が未定義の拠点を参照しています');
      const a = d.points.findIndex(p => p.id === sg.from), b = d.points.findIndex(p => p.id === sg.to);
      if (b !== a + 1) prob('route ' + id + ' の区間 ' + sg.id + ' は隣り合う拠点（points の順）をつなぐ必要があります');
      if (prev != null && a !== prev) prob('route ' + id + ' の segs が points の順に連続していません（' + sg.id + '）');
      prev = b;
      if (sg.mode && !MODES.includes(sg.mode)) prob('route ' + id + ' の区間 ' + sg.id + ' の mode "' + sg.mode + '" は ' + MODES.join('/') + ' のどれか');
    });
    if ((d.segs || []).length !== (d.points || []).length - 1) prob('route ' + id + ' の区間の数が拠点の数 - 1 ではありません');
    (d.gates || []).forEach(g => { if (!pm[g.at]) prob('route ' + id + ' の手続き ' + g.id + ' の at が未定義の拠点です'); });
    if (keys.length < 2) prob('route ' + id + ' の parties は 2 つ以上必要です');
    (d.layers || []).forEach(L => {
      if (!L.rows || L.rows.length < 1 || L.rows.length > 3) prob('route ' + id + ' の層 ' + L.key + ' の rows は 1〜3 段');
      (L.rows || []).forEach(r => Object.keys(r.by || {}).forEach(k => { if (!sm[k] && !gm[k]) prob('route ' + id + ' の層 ' + L.key + ' の by に未定義の区間・手続き "' + k + '"'); if (!keys.includes(r.by[k])) prob('route ' + id + ' の層 ' + L.key + ' が parties にない負担者 "' + r.by[k] + '" を使っています'); }));
      (L.marks || []).forEach(m => { if (!pm[m.at] && !sm[m.at]) prob('route ' + id + ' の層 ' + L.key + ' の印の at "' + m.at + '" が未定義'); if ((m.row || 0) >= (L.rows || []).length) prob('route ' + id + ' の層 ' + L.key + ' の印の row が段の数を超えています'); });
    });
  },
  layers(d, id) {
    const seen = {};
    (d.layers || []).forEach((l, li) => { const ps = l.parts && l.parts.length ? l.parts : [l]; ps.forEach((p, pi) => { if (p.gap) return; const k = p.id || ((l.id || 'l' + li) + (l.parts ? '-' + pi : '')); if (seen[k]) prob('layers ' + id + ' の部位 id "' + k + '" が重複しています'); seen[k] = 1; }); });
  }
};
/* ---- strip（js/opt/strip-lab.js）：限月の階段の実験台 ---- */
V.strip = function (d, id) {
  const W = 'strip ' + id, n = (d.base || []).length;
  if (!['stairs', 'combo', 'pnl'].includes(d.mode)) prob(W + ' の mode は stairs / combo / pnl のどれか');
  if (!Array.isArray(d.base) || n < 4 || n > 8 || d.base.some(v => !(typeof v === 'number' && v > 0 && v < 20))) prob(W + ' の base は 4〜8 個の金利（％。0 より大きく 20 未満の数）');
  const sp = d.spec || {};
  if (!sp.name || !(sp.tick > 0) || !(sp.tickYen > 0) || !sp.cur) prob(W + ' の spec は name（商品名）・tick（呼値の単位。価格の単位）・tickYen（1 ティックの価値）・cur（通貨の語）が必要です');
  if (d.names && d.names.length !== n) prob(W + ' の names は base と同じ個数');
  const rg = d.ranges;
  if (rg) ['L', 'S', 'K', 'e'].forEach(k => { const r = rg[k]; if (!r || r.length !== 3 || !(r[0] < 0 && r[1] > 0 && r[2] > 0)) prob(W + ' の ranges.' + k + ' は [最小（負）, 最大（正）, 刻み（正）]'); });
  const ini = d.initial || {};
  if (ini.kind && !['spread', 'fly', 'condor'].includes(ini.kind)) prob(W + ' の initial.kind は spread / fly / condor');
  if (ini.dir != null && ![1, -1].includes(ini.dir)) prob(W + ' の initial.dir は 1（買い）か −1（売り）');
  if (ini.p != null && !(ini.p >= 1 && ini.p <= n)) prob(W + ' の initial.p は 1〜' + n);
  if (ini.fx && !['L', 'S', 'K'].includes(ini.fx)) prob(W + ' の initial.fx は L / S / K');
  (d.presets || []).forEach(p => {
    if (!p.label || !p.set || typeof p.set !== 'object') { prob(W + ' の presets は label と set が必要です'); return; }
    Object.keys(p.set).forEach(k => {
      if (!/^(L|S|K|e[1-9])$/.test(k) || (k[0] === 'e' && parseInt(k.slice(1), 10) > n)) prob(W + ' の presets「' + p.label + '」の set のキー ' + k + ' は L / S / K / e1〜e' + n);
      else { const r = (rg || { L: [-30, 30], S: [-6, 6], K: [-10, 10], e: [-5, 5] })[k[0] === 'e' ? 'e' : k]; if (!(p.set[k] >= r[0] && p.set[k] <= r[1])) prob(W + ' の presets「' + p.label + '」の ' + k + ' が範囲外です'); }
    });
  });
  if (!d.alt) prob(W + ' に alt（図の説明）がありません');
};
/* ---- bucket・unitconv・appmix・areacircle・bundle（js/opt/home-lab.js）：家庭の電気と発電所の規模 ---- */
const HM_PU = ['W', 'kW', 'MW', 'GW', 'TW', '万kW'], HM_EU = ['Wh', 'kWh', 'MWh', 'GWh', 'TWh', '万kWh', '億kWh'];
function hmRange(W, o, name) { if (!o || !(o.min < o.max) || !(o.step > 0) || !(o.value >= o.min && o.value <= o.max)) { prob(W + ' の ' + name + ' は min < max・step > 0・min ≤ value ≤ max（数）'); return false; } return true; }
V.bucket = function (d, id) {
  const W = 'bucket ' + id;
  if (!d.title) prob(W + ' に title がありません');
  if (!(d.capacityKwh > 0)) prob(W + ' の capacityKwh（バケツの容量 kWh）は正の数');
  if (hmRange(W, d.power, 'power') && (d.power.presets || []).forEach(p => { if (!p.label || !(p.w >= d.power.min && p.w <= d.power.max)) prob(W + ' の power.presets は {label, w（範囲内）}'); }));
  hmRange(W, d.hours, 'hours');
};
V.unitconv = function (d, id) {
  const W = 'unitconv ' + id, i = d.initial || {};
  if (!d.title) prob(W + ' に title がありません');
  const known = k => (k === 'power' ? HM_PU : k === 'energy' ? HM_EU : null);
  if (!known(i.kind)) prob(W + ' の initial.kind は power か energy');
  else { if (!known(i.kind).includes(i.unit)) prob(W + ' の initial.unit "' + i.unit + '" は ' + known(i.kind).join('/') + ' のどれか'); if (!(i.value > 0)) prob(W + ' の initial.value は正の数'); }
  (d.examples || []).forEach(x => { const k = known(x.kind); if (!k || !k.includes(x.unit) || !(x.value > 0) || !x.label) prob(W + ' の examples は {label, kind, value（正）, unit（既知）}: ' + JSON.stringify(x).slice(0, 60)); });
};
V.appmix = function (d, id) {
  const W = 'appmix ' + id, devs = d.devices || [], seen = {};
  if (devs.length < 3) prob(W + ' の devices は 3 つ以上');
  devs.forEach(v => {
    if (!v.id || seen[v.id]) prob(W + ' の機器 id が無いか重複: ' + v.id); seen[v.id] = 1;
    if (!v.name || !(v.runW > 0) || !(v.hours >= 0 && v.hours <= 24)) prob(W + ' の機器 ' + v.id + ' は name・runW（正）・hours（0〜24）が必要');
    if (!v.flat) {
      if (!Array.isArray(v.parts) || !v.parts.length) prob(W + ' の機器 ' + v.id + ' は parts（使う時間帯の中心 c と割合 f）か flat: true が必要');
      else { let t = 0; v.parts.forEach(p => { if (!(p.c >= 0 && p.c <= 24) || !(p.f > 0)) prob(W + ' の機器 ' + v.id + ' の parts は c（0〜24）と f（正）'); t += p.f; }); if (Math.abs(t - 1) > 0.011) prob(W + ' の機器 ' + v.id + ' の parts の f の合計が 1 ではありません（' + t + '）'); }
    }
  });
  (d.presets || []).forEach(p => { if (!p.label || !p.set) prob(W + ' の presets は {label, set}'); else Object.keys(p.set).forEach(k => { if (!seen[k]) prob(W + ' の presets「' + p.label + '」の set の ' + k + ' が機器にありません'); else if (p.set[k].hrs != null && !(p.set[k].hrs >= 0 && p.set[k].hrs <= 24)) prob(W + ' の presets「' + p.label + '」の ' + k + ' の hrs が 0〜24 の外'); }); });
};
V.areacircle = function (d, id) {
  const W = 'areacircle ' + id, C = d.circles || [], ids2 = {};
  if (C.length < 3) prob(W + ' の circles は 3 つ以上');
  C.forEach(c => { if (!c.id || ids2[c.id]) prob(W + ' の円の id が無いか重複'); ids2[c.id] = 1; if (!c.name || !(c.kw > 0) || !['home', 'axis', 'all'].includes(c.cls)) prob(W + ' の円 ' + c.id + ' は name・kw（正）・cls（home/axis/all）が必要'); });
  if (C.filter(c => c.callout).length !== 1) prob(W + ' の callout（拡大の吹き出しにする円）はちょうど 1 つ');
  if (!ids2[d.axisId] || !ids2[d.wholeId]) prob(W + ' の axisId・wholeId が円にありません');
  hmRange(W, d.util, 'util');
  if (!Array.isArray(d.says) || !d.says.length) prob(W + ' の says（説明文。{axisInst} {wholeInst} {axisQty} {wholeQty} {u} が使える）がありません');
};
V.bundle = function (d, id) {
  const W = 'bundle ' + id, pl = d.plants || [], ids2 = {};
  if (!d.house || !(d.house.kw > 0) || !Array.isArray(d.house.shape) || d.house.shape.length !== 24 || d.house.shape.some(x => !(x > 0))) prob(W + ' の house は kw（正）と shape（24 個の正の数）が必要');
  pl.forEach(p => { if (!p.id || ids2[p.id] || !p.name || !p.short || !(p.mw > 0)) prob(W + ' の plants は id（重複なし）・name・short・mw（正）'); ids2[p.id] = 1; });
  if (!ids2[d.axisId] || !ids2[d.wholeId]) prob(W + ' の axisId・wholeId が plants にありません');
  if (!(d.minLoad > 0 && d.minLoad < 1)) prob(W + ' の minLoad は 0〜1 の間');
  const n = d.n || {};
  if (!(n.min < n.max) || !(n.step > 0) || !(n.value >= Math.pow(10, n.min) && n.value <= Math.pow(10, n.max))) prob(W + ' の n は min < max（10 の指数）・step > 0・value（世帯数）が 10^min〜10^max');
  (n.presets || []).forEach(p => { if (!p.label || !(p.n >= Math.pow(10, n.min) && p.n <= Math.pow(10, n.max))) prob(W + ' の n.presets は {label, n（範囲内の世帯数）}'); });
  hmRange(W, d.util, 'util'); hmRange(W, d.time, 'time');
  if (!d.texts || !d.texts.a || !d.texts.b || !d.texts.c) prob(W + ' の texts は a・b・c の説明文が必要');
  if (!d.axisRange || !d.caution) prob(W + ' に axisRange（軸ごとの出力の幅の説明）と caution（模型の断り）が必要');
  if (d.n && d.axisId && d.house && !(d.house.kw > 0)) prob(W + ' house.kw');
};
/* ---- scale・lab（js/opt）：式は同じ評価器（js/opt/expr.js）で検査する ---- */
const EX = require(path.join(__dirname, 'js', 'opt', 'expr.js'));
const SC_UNITS = ['W', 'kW', 'MW', 'GW', 'TW', '万kW', '千kW', 'VA', 'kVA', 'MVA', 'GVA'], SC_EUNITS = ['Wh', 'kWh', 'MWh', 'GWh', 'TWh'];
const SC_JPY = ['円', '万円', '億円', '兆円'], SC_USD = ['ドル', '百万ドル', '十億ドル', '兆ドル'];
const FIG_TYPES = ['bar', 'wave', 'circuit', 'curve'], CURVE_COLORS = ['ran', 'core', 'pol', 'ims'];
V.scale = function (d, id) {
  const W = 'scale ' + id;
  if (!d.items || d.items.length < 2) { prob(W + ' は項目が 2 つ以上必要です'); return; }
  const gk = (d.groups || []).map(g => g.key), sn = {};
  (d.sources || []).forEach(x => { if (sn[x.n]) prob(W + ' の出典の番号 ' + x.n + ' が重複しています'); sn[x.n] = 1; if (!x.title) prob(W + ' の出典 ' + x.n + ' に title がありません'); });
  const im = ids(d.items, W + ' の項目');
  /* 物差しの種類：電力（W 系）・円・ドル。1 つの scale には 1 種だけ（円とドルは別の物差し。為替の換算はしない） */
  const kindOf = it => it.from ? 'power' : SC_JPY.includes(it.unit) ? 'jpy' : SC_USD.includes(it.unit) ? 'usd' : 'power';
  const kinds = [...new Set(d.items.map(kindOf))], fam = kinds[0], MAXD = fam === 'power' ? 13 : fam === 'jpy' ? 16 : 15;
  if (kinds.length > 1) prob(W + ' に違う種類の単位が混ざっています（' + kinds.join('・') + '）。電力・円・ドルは別の物差しです。1 つの scale には 1 種類だけ置いてください');
  const UN = kinds.length > 1 ? SC_UNITS.concat(SC_JPY, SC_USD) : fam === 'jpy' ? SC_JPY : fam === 'usd' ? SC_USD : SC_UNITS;
  d.items.forEach(it => {
    const w = W + ' の「' + (it.name || it.id) + '」';
    if (!it.name) prob(w + ' に name がありません');
    if (!it.counter && fam === 'power') prob(w + ' に counter（「軒」「基」など、倍率の数え方）がありません');
    if (it.group != null && !gk.includes(it.group)) prob(w + ' の group "' + it.group + '" が groups にありません');
    if (it.from && fam !== 'power') prob(w + ' の from（電力量÷時間）は電力の scale だけで使えます');
    else if (it.from) {
      const f = it.from;
      if (!(f.energy > 0) || !(f.hours > 0) || !SC_EUNITS.includes(f.unit || 'kWh')) prob(w + ' の from は {energy>0, unit(' + SC_EUNITS.join('/') + '), hours>0}');
    } else if (it.range) {
      if (!Array.isArray(it.range) || it.range.length !== 2 || !(it.range[0] > 0) || !(it.range[1] > it.range[0]) || !UN.includes(it.unit)) prob(w + ' の range は [下限, 上限] と単位（' + UN.join('/') + '）');
    } else if (!(it.value > 0) || !UN.includes(it.unit)) prob(w + ' の value（正の数）と unit（' + UN.join('/') + '）が必要です');
    if (!it.src || !it.src.length) prob(w + ' に出典の番号（src）がありません。値は出典つきでだけ載せます');
    (it.src || []).forEach(n => { if (!sn[n]) prob(w + ' の src ' + n + ' が sources にありません'); });
    if (!it.cond) prob(w + ' に cond（条件：定格か平均か、単体か複合か、どの国の話か）がありません');
  });
  if (d.base != null && !im[d.base]) prob(W + ' の base "' + d.base + '" が項目にありません');
  if (d.initial != null && !im[d.initial]) prob(W + ' の initial "' + d.initial + '" が項目にありません');
  (d.stages || []).forEach(s => { if (!(s.lo >= 0 && s.hi <= MAXD && s.hi - s.lo >= 2)) prob(W + ' の stages ' + s.key + ' は 0 ≦ lo、hi ≦ ' + MAXD + '、幅 2 桁以上（10 のべき乗の指数。基準の単位は ' + (fam === 'jpy' ? '円' : fam === 'usd' ? 'ドル' : 'W') + '）'); });
};
V.lab = function (d, id) {
  const W = 'lab ' + id;
  if (!d.experiments || !d.experiments.length) { prob(W + ' に experiments がありません'); return; }
  const em = ids(d.experiments, W + ' の実験');
  d.experiments.forEach(x => {
    const w = W + '/' + x.id;
    if (!x.label) prob(w + ' に label がありません');
    if (!x.inputs || !x.inputs.length) { prob(w + ' に inputs がありません'); return; }
    const known = {};
    ids(x.inputs, w + ' の入力');
    x.inputs.forEach(i => {
      if (!(i.max > i.min) || !(i.step > 0) || !(i.value >= i.min && i.value <= i.max)) prob(w + ' の入力 ' + i.id + ' は min < max、step > 0、min ≦ value ≦ max');
      if (!i.label) prob(w + ' の入力 ' + i.id + ' に label がありません');
      known[i.id] = 1;
    });
    (x.consts || []).forEach(c => { if (!(typeof c.value === 'number') || !c.label) prob(w + ' の consts ' + c.id + ' は value（数）と label が必要です'); if (known[c.id]) prob(w + ' の名前 ' + c.id + ' が重複しています'); known[c.id] = 1; });
    const comp = (src, what, scope) => {
      try { const c = EX.compile(src); c.names.forEach(n => { if (!scope[n]) prob(w + ' の ' + what + ' の式が未定義の名前 "' + n + '" を使っています: ' + src); }); return c; }
      catch (e) { prob(w + ' の ' + what + ' の式: ' + e.message); return null; }
    };
    const calc = [], scope = Object.assign({}, known);
    (x.calc || []).forEach(k => { const c = comp(k.expr, 'calc ' + k.id, scope); calc.push([k.id, c]); if (scope[k.id]) prob(w + ' の calc の名前 ' + k.id + ' が重複しています'); scope[k.id] = 1; });
    const all = [];   // 結果・図の式（初期値と両端で有限か確かめる）
    (x.results || []).forEach(r => { if (!r.label) prob(w + ' の results に label がありません'); all.push(comp(r.expr, 'results ' + r.label, scope)); });
    if (!(x.results || []).length) prob(w + ' に results がありません');
    (x.reads || []).forEach(r => { if (r.when) comp(r.when, 'reads の when', scope); if (!r.text) prob(w + ' の reads に text がありません'); });
    x.inputs.forEach(i => (i.say || []).forEach(r => { if (r.when) comp(r.when, i.id + ' の say の when', scope); if (!r.text) prob(w + ' の say に text がありません'); }));
    const figList = x.figs || (x.fig ? [x.fig] : []), curveSeries = [], curveFigs = [];
    if (!figList.length) prob(w + ' に fig（または figs）がありません');
    if (x.figs && x.fig) prob(w + ' は fig と figs の両方を持てません');
    /* 追加の機能（任意）：presets（複数の入力をまとめて決める）・quad（分類表）・results の show と words */
    (x.presets || []).forEach(p => {
      if (!p.label || !p.set || typeof p.set !== 'object') prob(w + ' の presets は label と set（{入力の id: 値}）が必要です');
      else Object.keys(p.set).forEach(k => { const i = x.inputs.find(z => z.id === k); if (!i) prob(w + ' の presets「' + p.label + '」の set の ' + k + ' が入力にありません'); else if (!(p.set[k] >= i.min && p.set[k] <= i.max)) prob(w + ' の presets「' + p.label + '」の ' + k + ' の値 ' + p.set[k] + ' が入力の範囲外です'); });
    });
    (x.results || []).forEach(r => { if (r.show) all.push(comp(r.show, 'results show ' + r.label, scope)); if (r.base) all.push(comp(r.base.expr, 'results base ' + r.label, scope)); if (r.words && !(Array.isArray(r.words) && r.words.length >= 2)) prob(w + ' の results「' + r.label + '」の words は 2 つ以上の文字列の配列'); });
    if (x.quad) {
      const q = x.quad;
      if (!(q.cols || []).length || !(q.rows || []).length || !Array.isArray(q.cells) || q.cells.length !== q.rows.length || q.cells.some(r => r.length !== q.cols.length)) prob(w + ' の quad は cols・rows・cells（行数×列数）がそろっていません');
      (q.cells || []).forEach(r => r.forEach(c => { if (!c.title) prob(w + ' の quad のマスに title がありません'); if (c.when) all.push(comp(c.when, 'quad when', scope)); }));
    }
    figList.forEach(f => {
    if (!FIG_TYPES.includes(f.type)) prob(w + ' の fig.type は ' + FIG_TYPES.join('/') + ' のどれか');
    else {
      const num = (v, what) => { if (v == null) return; if (typeof v === 'string') all.push(comp(v, what, scope)); };
      if (f.type === 'bar') { if (!(f.bars || []).length) prob(w + ' の bar に bars がありません'); (f.bars || []).forEach(b => { if (!b.label) prob(w + ' の bars に label がありません'); all.push(comp(b.expr, 'bar ' + b.label, scope)); }); num(f.max, 'bar max'); if (f.signed && f.log) prob(w + ' の bar は signed と log を同時に使えません'); }
      if (f.type === 'wave') {
        if (!(f.waves || []).length || f.waves.length > 4) prob(w + ' の wave の waves は 1〜4 本');
        (f.waves || []).forEach(b => { if (!b.label) prob(w + ' の waves に label がありません'); ['amp', 'freq', 'phase'].forEach(k => num(b[k] != null ? String(b[k]) : '0', 'wave ' + k)); });
        num(f.span == null ? undefined : String(f.span), 'wave span'); num(f.ymax == null ? undefined : String(f.ymax), 'wave ymax'); if (f.ymax == null) prob(w + ' の wave に ymax（縦軸の最大。数か式）が必要です'); if (f.rms) num(String(f.rms), 'wave rms');
      }
      if (f.type === 'curve') {
        const xd = f.x || {}, ser = f.series || [];
        if (!xd.id || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(xd.id)) prob(w + ' の curve の x.id は英数字の名前（式の中で使う変数）');
        else if (scope[xd.id]) prob(w + ' の curve の x.id "' + xd.id + '" が入力・定数・calc の名前と重複しています');
        if (!(typeof xd.min === 'number' && typeof xd.max === 'number' && xd.max > xd.min)) prob(w + ' の curve の x は min < max（数）');
        if (xd.scale != null && xd.scale !== 'log' && xd.scale !== 'linear') prob(w + ' の curve の x.scale は "log" か "linear"');
        if (xd.scale === 'log' && !(xd.min > 0)) prob(w + ' の curve の x.scale が log のとき、x.min は 0 より大きい数');
        if (xd.step != null && !(xd.step > 0 && (xd.max - xd.min) / xd.step <= 800 && (xd.max - xd.min) / xd.step >= 2)) prob(w + ' の curve の x.step は 0 より大きく、範囲を 2〜800 に分ける値');
        (xd.ticks || []).forEach(t => { if (!(typeof t.v === 'number') || !t.label) prob(w + ' の curve の x.ticks は {v（数）, label} の配列'); });
        if (!xd.label) prob(w + ' の curve の x に label（横軸の名前）がありません');
        if (!ser.length || ser.length > 6) prob(w + ' の curve の series は 1〜6 本');
        const sc2 = Object.assign({}, scope); if (xd.id) sc2[xd.id] = 1;
        ser.forEach(z => {
          if (!z.label) prob(w + ' の curve の series に label がありません');
          if (z.color && !CURVE_COLORS.includes(z.color)) prob(w + ' の curve の series "' + z.label + '" の color は ' + CURVE_COLORS.join('/') + ' のどれか');
          if (z.dash != null && !(typeof z.dash === 'boolean' || typeof z.dash === 'string')) prob(w + ' の curve の series "' + z.label + '" の dash は true/false か "dash"/"dot"');
          if (z.when) all.push(comp(z.when, 'curve series when ' + z.label, scope));
          if (z.data) {
            if (z.expr != null) prob(w + ' の curve の series "' + z.label + '" は expr と data の両方を持てません');
            if (!Array.isArray(z.data) || z.data.length < 2 || z.data.some(q => !(Number.isFinite(q.x) && Number.isFinite(q.y)))) prob(w + ' の curve の series "' + z.label + '" の data は {x, y} の数の配列（2 点以上）');
            else if (z.data.some(q => q.x < xd.min - 1e-9 || q.x > xd.max + 1e-9)) prob(w + ' の curve の series "' + z.label + '" の data に x の範囲外の点があります');
          } else { const c = comp(z.expr, 'curve series ' + z.label, sc2); curveSeries.push([c, xd, z.label]); }
        });
        (f.fills || []).forEach(z => { if (!(ser[z.a] && ser[z.b]) || ser[z.a].data || ser[z.b].data) prob(w + ' の curve の fills は expr の系列の番号 a・b が必要です'); if (z.when) all.push(comp(z.when, 'curve fills when', scope)); });
        (f.spans || []).forEach(z => { num(String(z.from), 'curve spans from'); num(String(z.to), 'curve spans to'); if (z.when) all.push(comp(z.when, 'curve spans when', scope)); });
        num(f.ymin == null ? undefined : String(f.ymin), 'curve ymin'); num(f.ymax == null ? undefined : String(f.ymax), 'curve ymax');
        (f.marks || []).forEach(m => { if (m.x == null) prob(w + ' の curve の marks に x（数か式）がありません'); else num(String(m.x), 'curve marks x'); if (!m.label) prob(w + ' の curve の marks に label がありません'); });
        if (!f.alt) prob(w + ' の curve に alt（図の説明）がありません');
        curveFigs.push(f);
      }
      if (f.type === 'circuit') {
        const els = f.elements || [];
        if (els.filter(e => e.type === 'source').length > 1 || els.filter(e => e.type !== 'source').length < 1) prob(w + ' の circuit は電源 0〜1 個と抵抗 1 個以上');
        els.forEach(e => num(String(e.val), 'circuit ' + e.label)); num(String(f.current), 'circuit current'); num(String(f.imax), 'circuit imax');
      }
    }
    });
    /* 初期値・各入力の両端で、計算結果が有限の数か */
    const cases = [{}]; x.inputs.forEach(i => { cases.push({ [i.id]: i.min }); cases.push({ [i.id]: i.max }); }); (x.presets || []).forEach(p => cases.push(Object.assign({}, p.set)));
    cases.forEach(ov => {
      const e = {}; x.inputs.forEach(i => { e[i.id] = ov[i.id] != null ? ov[i.id] : i.value; }); (x.consts || []).forEach(c => { e[c.id] = c.value; });
      try { calc.forEach(([k, c]) => { if (c) e[k] = c.run(e); }); all.forEach(c => { if (c) { const v = c.run(e); if (!Number.isFinite(v)) prob(w + ' の式 "' + c.src + '" が入力 ' + JSON.stringify(ov) + ' で有限の数にならない（' + v + '）'); } }); }
      catch (er) { prob(w + ' の評価エラー: ' + er.message); }
      /* 線グラフ：初期値では横軸の全点、入力の両端では両端と中央で、有限の数になるか。縦軸の範囲が逆でないか */
      const first = Object.keys(ov).length === 0;
      curveSeries.forEach(([c, xd, lab]) => {
        if (!c || !(xd.max > xd.min)) return;
        const lg = xd.scale === 'log', n = lg ? Math.max(2, Math.min(800, Math.round(xd.n || 160))) : Math.max(2, Math.min(800, Math.round((xd.max - xd.min) / (xd.step || (xd.max - xd.min) / 120)))), pts = first ? n : 2;
        for (let i = 0; i <= pts; i++) {
          const fr = first ? i / pts : i / 2, xv = lg ? xd.min * Math.pow(xd.max / xd.min, fr) : xd.min + (xd.max - xd.min) * fr, e2 = Object.assign({}, e, { [xd.id]: xv });
          let v; try { v = c.run(e2); } catch (er) { prob(w + ' の curve「' + lab + '」の評価エラー: ' + er.message); return; }
          if (!Number.isFinite(v)) { prob(w + ' の curve「' + lab + '」が ' + xd.id + '=' + xv + '・入力 ' + JSON.stringify(ov) + ' で有限の数にならない（' + v + '）'); return; }
        }
      });
      curveFigs.forEach(f => { if (f.ymin != null && f.ymax != null) {
        try { const a1 = typeof f.ymin === 'number' ? f.ymin : EX.compile(f.ymin).run(e), a2 = typeof f.ymax === 'number' ? f.ymax : EX.compile(f.ymax).run(e); if (!(a2 > a1)) prob(w + ' の curve の ymax が ymin 以下になる入力があります（' + JSON.stringify(ov) + '）'); } catch (er) { /* 式の誤りは上で報告済み */ }
      } });
    });
  });
};
const CN = new Proxy({
  add(kind, id, data) { kind = ALIAS[kind] || kind; out.added.push({ f: F, kind, id }); try { if (V[kind]) V[kind](data, id); walkCh(data, kind + '/' + id); } catch (e) { prob(kind + ' ' + id + ' の検査中にエラー: ' + e.message); } },
  glossary(a) { a.forEach(g => { out.glossary.push({ f: F, t: g.t, en: g.en || '' }); if (!g.t || !g.d) prob('用語集の行に t か d がありません: ' + JSON.stringify(g).slice(0, 60)); }); walkCh(a, 'glossary'); },
  mapping(cat, a) { a.forEach(r => out.mapping.push({ f: F, cat, a: r.a != null ? r.a : r.a4, b: r.b != null ? r.b : r.a5 })); walkCh(a, 'mapping/' + cat); },
  exam(a) {
    a.forEach((q, i) => {
      out.exam.push({ f: F, q: q.q, part: String(q.part) });
      if (!q.c || !(q.a >= 0 && q.a < q.c.length)) prob('総合テストの問 ' + (i + 1) + ' の a が範囲外です');
      if (PARTS.length && !PARTS.includes(String(q.part))) prob('総合テストの問 ' + (i + 1) + ' の part "' + q.part + '" は部（付録以外）のどれかにする: ' + PARTS.join(','));
    });
    walkCh(a, 'exam');
  },
  chLink: x => x, chLinks: x => x
}, { get: (t, k) => (k in t ? t[k] : () => undefined) });
for (const f of files) {
  F = path.basename(f);
  try { new Function('CN', 'window', 'document', fs.readFileSync(f, 'utf8'))(CN, {}, {}); }
  catch (e) { out.error = F + ': ' + e.message; break; }
}
process.stdout.write(JSON.stringify(out));
