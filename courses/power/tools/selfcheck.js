// 自己点検: node /tmp/power-selfcheck.js <講座ディレクトリ> <章番号> [--apx 32] [--need id,…] [--warn 名,…] [--calc]
const fs = require('fs'), path = require('path'), vm = require('vm');
const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i < 0 ? '' : argv[i + 1]; }, has = k => argv.includes(k);
// 序章の章 id（I1・I2 など）にも使える：node selfcheck.js <講座> I1 --warn …（ファイル名は I1-…、データ id は cI1-…、確認問題の正答の添字は (番号−1+問の番号−1)%4）
const PRO = /^I\d+$/.test(argv[1] || ''), dir = argv[0], NN = PRO ? parseInt(argv[1].slice(1), 10) : parseInt(argv[1], 10), IDS = PRO ? argv[1] : '', APX = opt('--apx') ? parseInt(opt('--apx'), 10) : -1;
const need = opt('--need') ? opt('--need').split(',') : [], warn = opt('--warn') ? opt('--warn').split(',') : [];
const pad = PRO ? IDS : String(NN).padStart(2, '0'), find = d => { try { return fs.readdirSync(path.join(dir, d)).find(f => f.startsWith(pad + '-')); } catch (e) { return undefined; } };
const rd = p => fs.readFileSync(p, 'utf8'), html = rd(path.join(dir, 'chapters', find('chapters'))), src = rd(path.join(dir, 'data', find('data')));
const facts = find('facts') ? rd(path.join(dir, 'facts', find('facts'))) : '', course = JSON.parse(rd(path.join(dir, 'course.json')));
const spec = fs.existsSync(path.join(dir, 'spec.md')) ? rd(path.join(dir, 'spec.md')) : '';
const reg = [], quiz = [], exam = [], gl = [];
const CN = { add: (k, id, d) => { reg.push([k, id, d]); if (k === 'quiz') quiz.push([id, d]); }, glossary: a => gl.push(...a), mapping() {}, exam: a => exam.push(...a), t: () => '' };
vm.runInNewContext(src, { CN });
let ng = 0; const say = (ok, m) => { if (!ok) ng++; console.log((ok ? 'OK  ' : 'NG  ') + m); }, cand = m => console.log('候補 ' + m);
const text = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<section class="refs">[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' ');
const strs = [...src.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);   // データの文字列
const sentences = (text + '\n' + strs.join('\n')).split(/[。\n]/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
// 1 題・部・トラックが course.json と一致
const meta = k => ((html.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')) || [])[1] || '').trim();
const plan = (course.chapters || []).find(c => PRO ? c.num === IDS : parseInt(c.num, 10) === NN) || {};
for (const k of ['title', 'part', 'track']) say(String(plan[k] || '') === meta(k), `メタ ${k}: 章「${meta(k)}」／course.json「${plan[k] || ''}」`);
// 2 登録したデータがすべて本文に置かれている。spec §3 の id がある
for (const [k, id] of reg) say(html.includes(`data-src="${id}"`), `部品 ${k} ${id} が本文にある`);
for (const id of need) say(reg.some(r => r[1] === id), `spec の部品 ${id} がデータにある`);
// 3 確認問題: 3 問・各 4 択・why・正答の添字が式どおり（問と正答の文を目で読む）
quiz.forEach(([id, d]) => { say(d.items.length === 3, `${id} は ${d.items.length} 問`);
  d.items.forEach((it, i) => { const w = ((PRO ? NN - 1 : NN) + i) % 4;
    say(it.a === w && it.c.length === 4 && !!it.why, `${id} 問${i + 1} a=${it.a}（式 ${w}）選択肢 ${it.c.length}\n      問: ${it.q}\n      正答: ${it.c[it.a]}\n      解説: ${String(it.why).slice(0, 80)}`); }); });
exam.forEach((it, i) => { const w = !PRO && NN === APX ? i % 4 : (NN + 2 + i) % 4;
  say(it.a === w && it.c.length === 4, `総合 ${i + 1} a=${it.a}（式 ${w}）\n      問: ${it.q}\n      正答: ${it.c[it.a]}`); });
// 3b 正答の文の一覧（--answers）。位置の番号が合っていても、選択肢の並びがずれて誤った文が正答になることがある。全問の「問・正答の文・解説」を出し、目で読んで矛盾がないかを確かめる
if (has('--answers')) { const all = (n, q, i) => { console.log(`答 ${n} 問${i}\n  問：${q.q}\n  正答[${q.a}]：${q.c[q.a]}\n  他：${q.c.filter((_, k) => k !== q.a).join(' ／ ')}\n  解説：${q.why || ''}`); };
  quiz.forEach(([id, d]) => d.items.forEach((it, i) => all(id, it, i + 1))); exam.forEach((it, i) => all('総合テスト', it, i + 1)); }
// 4 線の種別を全部出力。線図（-ts・-tq）は up と lg だけ
const nodesOf = d => { const m = new Map(); for (const n of d.nodes || []) m.set(n.id, n); for (const v of d.views || []) for (const n of v.nodes || []) if (n && n.id) m.set(n.id, n); return [...m.values()]; };
const linksOf = d => { const m = new Map(); for (const l of d.links || []) m.set(l.id || l.a + '>' + l.b, l); for (const v of d.views || []) for (const l of v.links || []) if (l && l.a) m.set(l.id || l.a + '>' + l.b, l); return [...m.values()]; };
for (const [k, id, d] of reg) if (k === 'arch') for (const l of linksOf(d)) { console.log(`線  ${id} ${l.plane || '(省略)'} ${l.a}→${l.b} 「${l.label || ''}」 ${l.carries || ''}`);
  say(!!l.plane, `${id} の線 ${l.a}→${l.b} に plane がある`); if (/^c\d\d-(ts|tq)/.test(id)) say(['up', 'lg'].includes(l.plane), `線図 ${id} の線 ${l.a}→${l.b} は up か lg`); }
// 5 リンク: トップページでない。相互参照は spec §9.2-5 の 3 か所だけ
for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) { const u = new URL(m[1]); say(u.pathname.replace(/\/(index\.html?)?$/, '') !== '', `リンク ${m[1]}`); }
const XREF = PRO ? {} : { 1: '12', 3: '24', 30: '27' };
for (const m of html.matchAll(/href="\.\.\/([a-z-]+)\/#ch(\d\d)"/g)) say(m[1] === 'server' && XREF[NN] === m[2], `相互参照 ../${m[1]}/#ch${m[2]}（この章で許されるのは ${XREF[NN] ? 'server 第' + XREF[NN] + '章' : 'なし'}）`);
if (XREF[NN]) say(new RegExp(`href="\\.\\./server/#ch${XREF[NN]}"[^>]*>[^<]*第${XREF[NN]}章</a>`).test(html), `相互参照 計算サーバー講義 第${XREF[NN]}章 がある（文字は「…第${XREF[NN]}章」で終える）`);
// 6 略語・化学式の初出の候補（括弧が近くにないもの）
const seen = new Set(['AI', 'ID', 'IT', 'MW', 'GW', 'MWh', 'GWh', 'TWh', 'MPa', 'MJ', 'GJ', 'PJ', 'EJ', 'MVA', 'Hz']);   // GLOSSARY §3.4 の 3 語と単位
for (const m of text.matchAll(/[A-Z][A-Za-z0-9+.\-]*[A-Z0-9][A-Za-z0-9+.\-]*/g)) { const w = m[0]; if (seen.has(w)) continue; seen.add(w);
  const ctx = text.slice(Math.max(0, m.index - 40), m.index + w.length + 60).replace(/\s+/g, ' ');
  if (!/（|\(/.test(ctx)) cand(`略語 ${w} の初出に括弧なし（確かめる）: …${ctx}…`); }
// 7 要確認の印
say(!/要確認/.test(html + src + facts), '「要確認」の印が残っていない');
// 8 温度の表記（℃ の前に半角スペース、°C を使わない）
say(!/°C/.test(html + src), '「°C」を使っていない');
for (const m of (text + strs.join('\n')).matchAll(/.{0,15}[\d〜]℃.{0,5}/g)) say(false, `℃ の前に半角スペースがない: …${m[0]}…`);
// 9 効率の % には発熱量の基準（燃料を使わない効率は名前で区別する。GLOSSARY §5.3）
const BASIS = /低位発熱量|高位発熱量|LHV|HHV|真発熱量|総発熱量/, NOFUEL = /理想|カルノー|サイクルの効率|断熱効率|発電機の効率|変圧器の効率|ボトミング|ポンプの効率|電動機の効率|蓄電池|揚水/;
for (const s of sentences) if (/効率/.test(s) && /\d(?:[\d.,]*)\s?%/.test(s) && !NOFUEL.test(s)) say(BASIS.test(s), `効率の % に発熱量の基準: 「${s.slice(0, 90)}」`);
// 10 数字に出典・架空の印がない文の候補（表のセルは列で確かめる）
let n10 = 0; for (const s of sentences) if (/\d[\d,.]*\s?(MW|kW|GW|MPa|kPa|℃|K|kg\/s|ppm|%|億|兆|万 kW)/.test(s) && !/出典|架空|同資料|同上|同じ資料|式|例|第\d\d章/.test(s) && n10++ < 30) cand(`数字の出典（確かめる）: 「${s.slice(0, 90)}」`);
// 11 定型の注意書き（spec §9.3 の文言と一字一句同じ。指定外を置かない）
const FIXED = {}; for (const m of spec.matchAll(/`(<div class="callout warn"><span class="ttl">この(?:章|節)の扱い（([^）]+)）<\/span>[\s\S]*?<\/div>)`/g)) FIXED[m[2]] = m[1];
for (const w of warn) say(!!FIXED[w] && html.includes(FIXED[w]), `定型の注意書き「${w}」が spec §9.3 の文言のまま${FIXED[w] ? '' : '（spec に無い名前）'}`);
// 序章（spec §3 に章の指定が無い）で --warn を省いたときは、spec §9.3 の定型の注意書きの文言のままなら可とする
const WARN_ANY = PRO && !opt('--warn');
for (const m of html.matchAll(/<span class="ttl">この(?:章|節)の扱い（([^）]+)）<\/span>/g)) {
  if (WARN_ANY) say(!!FIXED[m[1]] && html.includes(FIXED[m[1]]), `注意書き「${m[1]}」は spec §9.3 の定型の文言のまま（序章は --warn を省いてよい）`);
  else say(warn.includes(m[1]), `注意書き「${m[1]}」は --warn の指定にある（spec §3 の指定どおり）`);
}
// 12 事実確認表: 高リスクは一次 ○・△、制度は【国】、企業は社名変更の確認、仕様値は条件、確認日
const rows = (src.match(/\/\*[\s\S]*?\*\//g) || []).join('\n') + '\n' + facts;
let nf = 0; for (const line of rows.split('\n')) { const c = line.split('|').slice(1, -1).map(x => x.trim()); if (c.length < 10 || !/^\d+$/.test(c[0])) continue; nf++;
  const tag = `事実確認表 #${c[0]}（${c[1]}）`;
  say(['発表', '企業', '制度', '規格', '仕様値', '安全', '保証', '定義', '一般知識', '市場'].includes(c[1]), `${tag} の区分が §8.1 の一覧にある`);
  if (['発表', '企業', '制度', '規格', '安全', '保証', '市場'].includes(c[1])) say(c[7] === '○' || c[7] === '△', `${tag} は一次 ○ か △（今は「${c[7]}」）`);
  if (c[1] === '制度') say(/^【[^】]+】/.test(c[2]), `${tag} の事実が【国・地域】で始まる`);
  if (c[1] === '企業') say(/社名変更[：:]/.test(c[2]), `${tag} に「社名変更：なし／あり（…）」がある`);
  if (c[1] === '仕様値' || c[1] === '市場') say(/条件[：:]/.test(c[2]), `${tag} に「条件：…」がある（§8.13）`);
  say(/^\d{4}-\d{2}-\d{2}$/.test(c[8]), `${tag} の確認日が YYYY-MM-DD`); }
say(nf > 0 || (!PRO && NN === APX), `事実確認表の行が ${nf} 行`);
// 13 検算（「検算 名前: 答え = 式」を計算し直す。許容は 0.5%）
let nc = 0; for (const m of (src + '\n' + facts).matchAll(/検算\s+(\S+)\s*[:：]\s*(-?[\d.,]+)\s*=\s*(.+?)\s*$/gm)) { nc++;
  const ex = m[3].replace(/,/g, ''), ans = parseFloat(m[2].replace(/,/g, ''));
  if (!/^[\d\s.+\-*/()]+$/.test(ex)) { say(false, `検算 ${m[1]} の式に数字と演算子以外がある: ${m[3]}`); continue; }
  const v = Function('return (' + ex + ');')(); say(Math.abs(ans - v) <= Math.max(Math.abs(v) * 0.005, 0.01), `検算 ${m[1]}: ${ans} ＝ ${ex} → ${+v.toFixed(4)}`); }
if (has('--calc')) { say(nc > 0, `検算の行が ${nc} 行`); say(/定義と式の照合/.test(src + facts), '「定義と式の照合」の表がある（§8.6）'); }
// 14 演習の照合（drill の正答を他の図と照らした表）。ケースを出力して目で読む
for (const [k, id, d] of reg) if (k === 'drill') (d.cases || []).forEach((c, i) => console.log(`演習 ${id} ${i + 1}: ${String(c.symptom).slice(0, 40)} → 段階 ${(d.procedure || [])[c.step]} → 対象 ${(d.nodes || [])[c.node]}`));
if (PRO || NN !== APX) say(/演習の照合/.test(src + facts), '「演習の照合」の表がある（§8.5。確認問題・総合テスト・演習の正答と本文・図の照合）');
// 15 線図: 状態点の表（-pts）と模式図（-ts・-tq）の位置の順が一致（§6.5）
for (const [k, id, d] of reg) if (k === 'arch' && /^c\d\d-(ts|tq)/.test(id)) {
  const tid = id.replace(/-(ts|tq)/, '-pts'), t = (reg.find(r => r[0] === 'table' && r[1] === tid) || [])[2];
  if (!t) { say(false, `線図 ${id} に対の表 ${tid} がない`); continue; }
  const iP = t.cols.indexOf('点'), iT = t.cols.indexOf('温度（K）'), iX = t.cols.findIndex(c => /^(s|Q) の順$/.test(c)), iF = t.cols.indexOf('流体');
  if (iP < 0 || iT < 0 || iX < 0) { say(false, `表 ${tid} に列「点」「温度（K）」「s の順」か「Q の順」がない`); continue; }
  const ns = nodesOf(d), byId = Object.fromEntries(ns.map(n => [n.id, n])), pts = t.rows.map(r => ({ id: 'p' + r[iP], T: +r[iT], X: +r[iX], F: iF < 0 ? '' : r[iF] }));
  say(new Set(ns.map(n => n.w + 'x' + n.h)).size === 1, `線図 ${id} の点の箱の大きさが同じ`);
  for (const p of pts) say(!!byId[p.id], `線図 ${id} に点 ${p.id} がある`);
  for (const a of pts) for (const b of pts) { const A = byId[a.id], B = byId[b.id]; if (!A || !B || a.id >= b.id || a.F !== b.F) continue;   // 「流体」の列があれば同じ流体の点どうしだけ比べる
    const okT = Math.abs(a.T - b.T) <= 0.5 ? Math.abs(A.y - B.y) <= 4 : (a.T > b.T) === (A.y < B.y);
    const okX = a.X === b.X ? Math.abs(A.x - B.x) <= 4 : (a.X > b.X) === (A.x > B.x);
    if (!okT || !okX) say(false, `線図 ${id} の ${a.id}・${b.id} の位置が表の順と違う（温度 ${a.T}/${b.T}、順 ${a.X}/${b.X}）`); }
  console.log(`線図 ${id}：点 ${pts.length} 個の位置の順を ${tid} と照合した`); }
// 16 用語集の d に数字（候補）
for (const g of gl) if (/\d/.test(g.d || '')) cand(`用語 ${g.t} の d に数字（§7。式・数値でないか確かめる）: ${g.d}`);
console.log(ng ? `NG ${ng} 件` : 'NG 0 件'); process.exit(ng ? 1 : 0);
