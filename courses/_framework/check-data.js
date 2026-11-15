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
/* ---- scale・lab（js/opt）：式は同じ評価器（js/opt/expr.js）で検査する ---- */
const EX = require(path.join(__dirname, 'js', 'opt', 'expr.js'));
const SC_UNITS = ['W', 'kW', 'MW', 'GW', 'TW', '万kW', '千kW', 'VA', 'kVA', 'MVA', 'GVA'], SC_EUNITS = ['Wh', 'kWh', 'MWh', 'GWh', 'TWh'];
const FIG_TYPES = ['bar', 'wave', 'circuit'];
V.scale = function (d, id) {
  const W = 'scale ' + id;
  if (!d.items || d.items.length < 2) { prob(W + ' は項目が 2 つ以上必要です'); return; }
  const gk = (d.groups || []).map(g => g.key), sn = {};
  (d.sources || []).forEach(x => { if (sn[x.n]) prob(W + ' の出典の番号 ' + x.n + ' が重複しています'); sn[x.n] = 1; if (!x.title) prob(W + ' の出典 ' + x.n + ' に title がありません'); });
  const im = ids(d.items, W + ' の項目');
  d.items.forEach(it => {
    const w = W + ' の「' + (it.name || it.id) + '」';
    if (!it.name) prob(w + ' に name がありません');
    if (!it.counter) prob(w + ' に counter（「軒」「基」など、倍率の数え方）がありません');
    if (it.group != null && !gk.includes(it.group)) prob(w + ' の group "' + it.group + '" が groups にありません');
    if (it.from) {
      const f = it.from;
      if (!(f.energy > 0) || !(f.hours > 0) || !SC_EUNITS.includes(f.unit || 'kWh')) prob(w + ' の from は {energy>0, unit(' + SC_EUNITS.join('/') + '), hours>0}');
    } else if (it.range) {
      if (!Array.isArray(it.range) || it.range.length !== 2 || !(it.range[0] > 0) || !(it.range[1] > it.range[0]) || !SC_UNITS.includes(it.unit)) prob(w + ' の range は [下限, 上限] と単位（' + SC_UNITS.join('/') + '）');
    } else if (!(it.value > 0) || !SC_UNITS.includes(it.unit)) prob(w + ' の value（正の数）と unit（' + SC_UNITS.join('/') + '）が必要です');
    if (!it.src || !it.src.length) prob(w + ' に出典の番号（src）がありません。値は出典つきでだけ載せます');
    (it.src || []).forEach(n => { if (!sn[n]) prob(w + ' の src ' + n + ' が sources にありません'); });
    if (!it.cond) prob(w + ' に cond（条件：定格か平均か、単体か複合か、どの国の話か）がありません');
  });
  if (d.base != null && !im[d.base]) prob(W + ' の base "' + d.base + '" が項目にありません');
  if (d.initial != null && !im[d.initial]) prob(W + ' の initial "' + d.initial + '" が項目にありません');
  (d.stages || []).forEach(s => { if (!(s.lo >= 0 && s.hi <= 13 && s.hi - s.lo >= 2)) prob(W + ' の stages ' + s.key + ' は 0 ≦ lo、hi ≦ 13、幅 2 桁以上（10 のべき乗の W の指数）'); });
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
    const f = x.fig;
    if (!f || !FIG_TYPES.includes(f.type)) prob(w + ' の fig.type は ' + FIG_TYPES.join('/') + ' のどれか');
    else {
      const num = (v, what) => { if (v == null) return; if (typeof v === 'string') all.push(comp(v, what, scope)); };
      if (f.type === 'bar') { if (!(f.bars || []).length) prob(w + ' の bar に bars がありません'); (f.bars || []).forEach(b => { if (!b.label) prob(w + ' の bars に label がありません'); all.push(comp(b.expr, 'bar ' + b.label, scope)); }); num(f.max, 'bar max'); }
      if (f.type === 'wave') {
        if (!(f.waves || []).length || f.waves.length > 4) prob(w + ' の wave の waves は 1〜4 本');
        (f.waves || []).forEach(b => { if (!b.label) prob(w + ' の waves に label がありません'); ['amp', 'freq', 'phase'].forEach(k => num(b[k] != null ? String(b[k]) : '0', 'wave ' + k)); });
        num(f.span == null ? undefined : String(f.span), 'wave span'); num(f.ymax == null ? undefined : String(f.ymax), 'wave ymax'); if (f.ymax == null) prob(w + ' の wave に ymax（縦軸の最大。数か式）が必要です'); if (f.rms) num(String(f.rms), 'wave rms');
      }
      if (f.type === 'circuit') {
        const els = f.elements || [];
        if (els.filter(e => e.type === 'source').length > 1 || els.filter(e => e.type !== 'source').length < 1) prob(w + ' の circuit は電源 0〜1 個と抵抗 1 個以上');
        els.forEach(e => num(String(e.val), 'circuit ' + e.label)); num(String(f.current), 'circuit current'); num(String(f.imax), 'circuit imax');
      }
    }
    /* 初期値・各入力の両端で、計算結果が有限の数か */
    const cases = [{}]; x.inputs.forEach(i => { cases.push({ [i.id]: i.min }); cases.push({ [i.id]: i.max }); });
    cases.forEach(ov => {
      const e = {}; x.inputs.forEach(i => { e[i.id] = ov[i.id] != null ? ov[i.id] : i.value; }); (x.consts || []).forEach(c => { e[c.id] = c.value; });
      try { calc.forEach(([k, c]) => { if (c) e[k] = c.run(e); }); all.forEach(c => { if (c) { const v = c.run(e); if (!Number.isFinite(v)) prob(w + ' の式 "' + c.src + '" が入力 ' + JSON.stringify(ov) + ' で有限の数にならない（' + v + '）'); } }); }
      catch (er) { prob(w + ' の評価エラー: ' + er.message); }
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
