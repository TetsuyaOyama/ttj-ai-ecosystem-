// 講座 A（金利と国債、中央銀行の資金供給）の自己点検。発電講義の selfcheck.js を写し、SPEC-COMMON §5-7 の点検 16〜20 などを足した。
// 使い方: node /home/claude/courses/rates/tools/selfcheck.js /home/claude/courses/rates <章番号 I1|I2|01..30> [--need id,…] [--warn 名,…] [--calc] [--answers]
//   --need・--warn を省くと、spec.md §3 のその章の「部品」「注意書き」の行から自動で読む。検算の行は常に計算し直す。検算の行と「定義と式の照合」を必須にするのは spec §8.2 の章だけ。
//   終了コード: NG があれば 1。「候補」は目で確かめる（NG に数えない）。
const fs = require('fs'), path = require('path'), vm = require('vm');
const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i < 0 ? '' : argv[i + 1]; }, has = k => argv.includes(k);
const dir = argv[0], ID = argv[1] || '';
const PRO = /^I\d+$/.test(ID), NN = PRO ? parseInt(ID.slice(1), 10) : parseInt(ID, 10), APX = 30;
const pad = PRO ? ID : String(NN).padStart(2, '0'), IS_APX = !PRO && NN === APX;
const find = d => { try { return fs.readdirSync(path.join(dir, d)).find(f => f.startsWith(pad + '-')); } catch (e) { return undefined; } };
const rd = p => fs.readFileSync(p, 'utf8');
const html = rd(path.join(dir, 'chapters', find('chapters'))), src = rd(path.join(dir, 'data', find('data')));
const facts = find('facts') ? rd(path.join(dir, 'facts', find('facts'))) : '', course = JSON.parse(rd(path.join(dir, 'course.json')));
const spec = fs.existsSync(path.join(dir, 'spec.md')) ? rd(path.join(dir, 'spec.md')) : '';
const COMMON = '/home/claude/courses/_finance/';
const specCommon = fs.existsSync(COMMON + 'SPEC-COMMON.md') ? rd(COMMON + 'SPEC-COMMON.md') : '';
const glCommon = fs.existsSync(COMMON + 'GLOSSARY-RULES.md') ? rd(COMMON + 'GLOSSARY-RULES.md') : '';
const glRates = fs.existsSync(path.join(dir, 'GLOSSARY-RULES.md')) ? rd(path.join(dir, 'GLOSSARY-RULES.md')) : '';
const reg = [], quiz = [], exam = [], gl = [], maps = [];
const CN = { add: (k, id, d) => { reg.push([k, id, d]); if (k === 'quiz') quiz.push([id, d]); }, glossary: a => gl.push(...a), mapping: (k, a) => maps.push(...a.map(r => [k, r])), exam: a => exam.push(...a), t: () => '' };
vm.runInNewContext(src, { CN });
let ng = 0; const say = (ok, m) => { if (!ok) ng++; console.log((ok ? 'OK  ' : 'NG  ') + m); }, cand = m => console.log('候補 ' + m);
const text = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<section class="refs">[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' ');
const strs = [...src.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);   // データの文字列
const sentences = (text + '\n' + strs.join('\n')).split(/[。\n]/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
const allText = text + '\n' + strs.join('\n'), whole = html + '\n' + src + '\n' + facts;

// ---- spec.md §3 の自分の章の節（部品の id・注意書き）
const secRe = new RegExp('^#### ' + ID + ' .*$', 'm'), sm = spec.match(secRe);
let sec = ''; if (sm) { const st = spec.indexOf(sm[0]); const rest = spec.slice(st + sm[0].length); const e = rest.search(/^#{3,4} /m); sec = e < 0 ? rest : rest.slice(0, e); }
const specNeed = [...(sec.split('\n').filter(l => /^- 部品：/.test(l)).join('\n')).matchAll(/\*\*(c[I\d]+\d*-[a-z0-9-]+)\*\*/g)].map(m => m[1]);
const specWarn = ((sec.match(/^- 注意書き：(.+)$/m) || [])[1] || '').split(/[、，]/).map(s => s.trim()).filter(s => s && !/^なし$/.test(s));
const need = opt('--need') ? opt('--need').split(',') : specNeed, warn = opt('--warn') ? opt('--warn').split(',') : specWarn;
const CALC_CH = ['I1', '01', '02', '03', '05', '06', '08', '11', '17', '19', '29'];   // spec §8.2
const calcOn = CALC_CH.includes(ID);   // 検算の行を必須にするのは spec §8.2 の章だけ。--calc は付けても付けなくても検算の行は計算し直す

// 1 題・部・トラック・時間が course.json と一致
const meta = k => ((html.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')) || [])[1] || '').trim();
const plan = (course.chapters || []).find(c => PRO ? c.num === ID : parseInt(c.num, 10) === NN) || {};
for (const k of ['title', 'part', 'track']) say(String(plan[k] || '') === meta(k), `メタ ${k}: 章「${meta(k)}」／course.json「${plan[k] || ''}」`);
say(String(plan.time || '') === meta('time'), `メタ time: 章「${meta('time')}」／course.json「${plan.time || ''}」`);
// 2 登録したデータがすべて本文に置かれている。spec §3 の id がある
for (const [k, id] of reg) if (!['glossary', 'mapping', 'exam'].includes(k)) say(html.includes(`data-src="${id}"`), `部品 ${k} ${id} が本文にある`);
for (const id of need) say(reg.some(r => r[1] === id), `spec の部品 ${id} がデータにある`);
for (const [k, id] of reg) if (!['glossary', 'mapping', 'exam'].includes(k) && !new RegExp('^c' + (PRO ? ID : pad) + '-').test(id)) say(false, `データ id「${id}」が c${PRO ? ID : pad}- で始まらない（spec §9.2）`);
// 3 確認問題: 3 問・各 4 択・why・正答の添字（SPEC-COMMON §5-1）。序章 In の k 問目は (n+k) mod 4、章 NN の k 問目は (NN+k-1) mod 4
const normBig = s => String(s).replace(/[\s、。，．,.「」『』（）()・：:；;／/]/g, '');
const bg = s => { const t = normBig(s), r = new Set(); for (let i = 0; i < t.length - 1; i++) r.add(t.slice(i, i + 2)); return r; };
const overlap = (a, b) => { const A = bg(a), B = bg(b); if (!A.size) return 0; let n = 0; for (const x of A) if (B.has(x)) n++; return n / A.size; };
if (!IS_APX) say(quiz.length === 1, `確認問題のデータ（quiz）が 1 つ（今は ${quiz.length}）`);
quiz.forEach(([id, d]) => { say(d.items.length === 3, `${id} は ${d.items.length} 問`);
  d.items.forEach((it, i) => { const w = PRO ? (NN + i + 1) % 4 : (NN + i) % 4;
    say(it.a === w && it.c.length === 4 && !!it.why, `${id} 問${i + 1} a=${it.a}（式 ${w}）選択肢 ${it.c.length}\n      問: ${it.q}\n      正答: ${it.c[it.a]}\n      解説: ${String(it.why).slice(0, 80)}`);
    // 正答の文と解説の最初の文の照合（正答の添字の誤りを見つける。SPEC-COMMON §4）
    const first = String(it.why || '').split('。')[0], sc = it.c.map(c => overlap(c, first)), best = Math.max(...sc);
    if (sc[it.a] < best) say(false, `${id} 問${i + 1}: 解説の最初の文が、正答 c[${it.a}] より選択肢 c[${sc.indexOf(best)}] に近い（正答の位置の誤りの疑い）\n      c[${it.a}]=${it.c[it.a]}\n      c[${sc.indexOf(best)}]=${it.c[sc.indexOf(best)]}\n      解説の最初の文=${first}`);
    else if (sc[it.a] < 0.5) cand(`${id} 問${i + 1}: 解説の最初の文と正答の文の重なりが小さい（${sc[it.a].toFixed(2)}）。解説が正答の文を言っているか読む`);
    if (new Set(it.c).size !== it.c.length) say(false, `${id} 問${i + 1}: 同じ選択肢がある`);
    for (const c of it.c) if (/上のすべて|すべて正しい|どれも正しくない|A と B|AとB/.test(c)) say(false, `${id} 問${i + 1}: 位置に依存する選択肢「${c}」`); }); });
// 総合テスト：1 問（06・16・21・23 は 2 問、序章は 0 問、付録は横断 2 問）。part は章の部。a は (NN+2+i)%4（付録は i%4）
const EXAM_N = PRO ? 0 : IS_APX ? 2 : ['06', '16', '21', '23'].includes(pad) ? 2 : 1;
if (!IS_APX || exam.length) say(exam.length === EXAM_N, `総合テストは ${EXAM_N} 問（今は ${exam.length}）`);
exam.forEach((it, i) => { const w = IS_APX ? i % 4 : (NN + 2 + i) % 4;
  say(it.a === w && it.c.length === 4, `総合 ${i + 1} a=${it.a}（式 ${w}）\n      問: ${it.q}\n      正答: ${it.c[it.a]}`);
  const first = String(it.why || '').split('。')[0], sc = it.c.map(c => overlap(c, first)), best = Math.max(...sc);
  if (sc[it.a] < best) say(false, `総合 ${i + 1}: 解説の最初の文が、正答 c[${it.a}] より c[${sc.indexOf(best)}] に近い（正答の位置の誤りの疑い）`);
  say(!!it.why, `総合 ${i + 1} に解説がある`);
  if (!IS_APX) say(String(it.part) === String(plan.part), `総合 ${i + 1} の part（${it.part}）が章の部（${plan.part}）と同じ`); });
// 3b 正答の文の一覧（--answers）。位置の番号が合っていても、選択肢の並びがずれて誤った文が正答になることがある。目で読む
if (has('--answers')) { const all = (n, q, i) => { console.log(`答 ${n} 問${i}\n  問：${q.q}\n  正答[${q.a}]：${q.c[q.a]}\n  他：${q.c.filter((_, k) => k !== q.a).join(' ／ ')}\n  解説：${q.why || ''}`); };
  quiz.forEach(([id, d]) => d.items.forEach((it, i) => all(id, it, i + 1))); exam.forEach((it, i) => all('総合テスト', it, i + 1)); }
// 4 線の種別を全部出力。arch の線は plane を持つ
const linksOf = d => { const m = new Map(); for (const l of d.links || []) m.set(l.id || l.a + '>' + l.b, l); for (const v of d.views || []) for (const l of v.links || []) if (l && l.a) m.set(l.id || l.a + '>' + l.b, l); return [...m.values()]; };
for (const [k, id, d] of reg) if (k === 'arch') for (const l of linksOf(d)) { console.log(`線  ${id} ${l.plane || '(省略)'} ${l.a}→${l.b} 「${l.label || ''}」 ${l.carries || ''}`); say(!!l.plane, `${id} の線 ${l.a}→${l.b} に plane がある`); }
// 5 リンク: トップページでない。他講座への相互参照は書かない（A から B・C へは張らない。SPEC-COMMON §6）。章への内部リンク #chNN は可
for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) { const u = new URL(m[1]); say(u.pathname.replace(/\/(index\.html?)?$/, '') !== '', `リンク ${m[1]}`); }
for (const m of html.matchAll(/href="\.\.\/([a-z-]+)\/#ch(\d\d)"/g)) say(false, `他講座への相互参照 ../${m[1]}/#ch${m[2]}（講座 A から B・C へは張らない。「講座 B 第◯章」と文字だけで書く）`);
for (const m of html.matchAll(/href="#ch(\w+)"/g)) { const n = m[1]; say((course.chapters || []).some(c => c.num === n || c.num === n.padStart(2, '0')), `章リンク #ch${n} が course.json の章にある`); }
// 6 略語の初出の候補（括弧が近くにないもの）
const seen = new Set(['AI', 'ID', 'IT', 'bp']);
for (const m of text.matchAll(/[A-Z][A-Za-z0-9+.\-]*[A-Z0-9][A-Za-z0-9+.\-]*/g)) { const w = m[0]; if (seen.has(w)) continue; seen.add(w);
  const ctx = text.slice(Math.max(0, m.index - 40), m.index + w.length + 60).replace(/\s+/g, ' ');
  if (!/（|\(/.test(ctx)) cand(`略語 ${w} の初出に括弧なし（確かめる。共通 GLOSSARY §3）: …${ctx}…`); }
// 「この章で分かること」の囲みに略語を出さない（共通 GLOSSARY §3-2。出すときは正式名を併記）
{ const learn = (html.match(/<section class="learn">[\s\S]*?<\/section>/) || [''])[0].replace(/<[^>]+>/g, ' '); for (const m of learn.matchAll(/[A-Z]{2,}[A-Za-z0-9.\-]*/g)) say(/（[^）]*[A-Za-z]/.test(learn.slice(m.index, m.index + 60)), `「この章で分かること」の囲みに略語 ${m[0]}（正式名を併記するか、日本語に）`); }
// 7 要確認の印
say(!/要確認/.test(html + src + facts), '「要確認」の印が残っていない');
// 8 章の形（CHAPTER-BRIEF §1・spec §2.1）
if (!IS_APX) { say(/<section class="learn">/.test(html) && /この章で分かること/.test(html) && /前提/.test(html), '「この章で分かること」と「前提」がある');
  say(/class="callout warn"><span class="ttl">つまずきやすい点/.test(html), '「つまずきやすい点」（callout warn）がある');
  say(/class="callout tip"><span class="ttl">実務でのつながり/.test(html), '「実務でのつながり」（callout tip）がある');
  say(/<section class="refs">/.test(html), '参照資料（section.refs）がある'); }
// 9 参照資料の表：種類は 6 区分だけ（SPEC-COMMON §5-5）。列は 種類／資料名／発行者／版・時点／この章での使い方
const KINDS = ['規格・基準', '団体の資料', '取引所・清算機関の資料', '当局・公的機関', '教科書・一般知識・他講座', '架空（見本のため）'];
{ const refs = (html.match(/<section class="refs">[\s\S]*?<\/section>/) || [''])[0]; let nr = 0;
  for (const tr of refs.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) { const cells = [...tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map(x => x[1].replace(/<[^>]+>/g, '').trim()); if (/^種類$/.test(cells[0] || '')) continue; nr++;
    say(KINDS.includes(cells[0]) && cells.length === 5, `参照資料の行「${(cells[1] || '').slice(0, 30)}」：種類「${cells[0]}」${KINDS.includes(cells[0]) ? '' : '（6 区分にない）'}、列数 ${cells.length}`); }
  if (!IS_APX && refs) say(nr > 0, `参照資料の行が ${nr} 行`); }
// 10 数字に出典・架空の印がない文の候補（表のセルは列で確かめる）
let n10 = 0; for (const s of sentences) if (/日銀|日本銀行|財務省|FRB|NY 連銀|米財務省|連邦|統計|残高|発行額|公表|決定|計画|実績/.test(s) && /\d[\d,.]*\s?(兆円|億円|万円|兆ドル|十億ドル|百万ドル|ドル|％|bp|%)/.test(s) && !/出典|架空|同資料|同上|同じ資料|式|例|仮に|第\d\d章|検算|執筆時点/.test(s) && n10++ < 30) cand(`数字の出典・条件（確かめる。SPEC-COMMON §2.3）: 「${s.slice(0, 90)}」`);
// 11 定型の注意書き（SPEC-COMMON §3 の文言と一字一句同じ。指定外を置かない）
const FIXED = {}; for (const m of specCommon.matchAll(/`(<div class="callout warn"><span class="ttl">この(?:章|節)の扱い（([^）]+)）<\/span>[\s\S]*?<\/div>)`/g)) FIXED[m[2]] = m[1];
for (const w of warn) say(!!FIXED[w] && html.includes(FIXED[w]), `定型の注意書き「${w}」が SPEC-COMMON §3 の文言のまま${FIXED[w] ? '' : '（SPEC-COMMON に無い名前）'}`);
for (const m of html.matchAll(/<span class="ttl">この(?:章|節)の扱い（([^）]+)）<\/span>/g)) say(warn.includes(m[1]), `注意書き「${m[1]}」は spec §3 の指定にある（${warn.join('・') || 'なし'}）`);
// 本文の最初の h3 の前に注意書きを置く（spec §2.1）
if (warn.length) { const h = html.indexOf('<h3>', html.indexOf('</section>')), first = FIXED[warn[0]] ? html.indexOf(FIXED[warn[0]]) : -1; say(first >= 0 && (h < 0 || first < h), '定型の注意書きが、本文の最初の <h3> の前にある'); }
// 12 事実確認表（SPEC-COMMON §2.1）
const HIGH = ['発表', '制度', '市場の規則', '商品', '統計'], KUBUN = ['発表', '制度', '市場の規則', '商品', '統計', '市場', '企業', '定義', '一般知識'];
const rows = (src.match(/\/\*[\s\S]*?\*\//g) || []).join('\n') + '\n' + facts;
let nf = 0; for (const line of rows.split('\n')) { const c = line.split('|').slice(1, -1).map(x => x.trim()); if (c.length < 10 || !/^\d+$/.test(c[0])) continue; nf++;
  const tag = `事実確認表 #${c[0]}（${c[1]}）`;
  say(KUBUN.includes(c[1]), `${tag} の区分が SPEC-COMMON §2.1 の一覧にある`);
  if (HIGH.includes(c[1])) { say(c[7] === '○' || c[7] === '△', `${tag} は一次 ○（高リスクは ○ だけ。△ は本文に注記）（今は「${c[7]}」）`); if (c[7] === '△') cand(`${tag} は一次 △。本文に「（◯◯〔掲載者〕の告知による。取引所の一次資料は確認できず）」の注記があるか、書かないか確かめる`); }
  if (['制度', '市場の規則', '商品'].includes(c[1])) say(/^【[^】]+】/.test(c[2]), `${tag} の事実が【国・地域／取引所名】で始まる`);
  if (c[1] === '企業') say(/社名変更[：:]/.test(c[2]), `${tag} に「社名変更：なし／あり（…）」がある`);
  if (c[1] === '統計' || c[1] === '市場') say(/条件[：:]/.test(c[2]), `${tag} に「条件：…」がある（単位・時点・季節調整・速報か確報か／定義・期間・主体）`);
  if (c[1] === '商品') say(/更新/.test(c[2] + c[4]), `${tag} に仕様のページの更新日がある`);
  say(/^\d{4}-\d{2}-\d{2}$/.test(c[8]), `${tag} の確認日が YYYY-MM-DD`); }
say(nf > 0 || IS_APX, `事実確認表の行が ${nf} 行`);
// 13 検算（「検算 名前: 答え = 式」を計算し直す。関数 floor pow ln exp sqrt abs min max round を使える。丸めの桁は答えの小数の桁）
let nc = 0; const FN = ['floor', 'ceil', 'pow', 'ln', 'exp', 'sqrt', 'abs', 'min', 'max', 'round', 'log10'];
const FNIMPL = { floor: Math.floor, ceil: Math.ceil, pow: Math.pow, ln: Math.log, exp: Math.exp, sqrt: Math.sqrt, abs: Math.abs, min: Math.min, max: Math.max, round: Math.round, log10: Math.log10 };
for (const m of (src + '\n' + facts).matchAll(/検算\s+(\S+)\s*[:：]\s*(-?[\d.,]+)\s*=\s*(.+?)\s*$/gm)) { nc++;
  const ex = m[3].replace(/(?<![\d.])\d{1,3}(?:,\d{3})+(?!\d)/g, x => x.replace(/,/g, '')), ansS = m[2].replace(/(?<![\d.])(\d{1,3}(?:,\d{3})+)(?!\d)/g, x => x.replace(/,/g, '')), ans = parseFloat(ansS);
  const ids = [...ex.matchAll(/[a-z][a-z0-9]*/gi)].map(x => x[0]);
  if (!/^[\d\s.+\-*/(),a-z0-9]+$/i.test(ex) || ids.some(x => !FN.includes(x))) { say(false, `検算 ${m[1]} の式に数字・演算子・許可した関数（${FN.join(' ')}）以外がある: ${m[3]}`); continue; }
  let v; try { v = Function(...FN, 'return (' + ex + ');')(...FN.map(f => FNIMPL[f])); } catch (e) { say(false, `検算 ${m[1]} の式が計算できない: ${m[3]}`); continue; }
  const dec = (ansS.split('.')[1] || '').length, rounded = Math.round(v * 10 ** dec) / 10 ** dec, floored = /floor/.test(ex);
  say(floored ? v === ans : Math.abs(rounded - ans) < 1e-9 * Math.max(1, Math.abs(ans)) || Math.abs(ans - v) <= Math.abs(v) * 1e-9, `検算 ${m[1]}: ${ans} ＝ ${ex} → ${+v.toFixed(6)}（小数 ${dec} 桁に丸めて ${rounded}）`); }
if (calcOn) { say(nc > 0, `検算の行が ${nc} 行`); say(/定義と式の照合/.test(src + facts), '「定義と式の照合」の表がある'); }
// 14 演習の照合（確認問題・総合テスト・演習の正答を本文・図と照らした表）。drill のケースを出力して目で読む
for (const [k, id, d] of reg) if (k === 'drill') (d.cases || []).forEach((c, i) => console.log(`演習 ${id} ${i + 1}: ${String(c.symptom).slice(0, 40)} → 段階 ${(d.procedure || [])[c.step]} → 対象 ${(d.nodes || [])[c.node]}`));
if (!IS_APX) say(/演習の照合/.test(src + facts), '「演習の照合」の表がある（SPEC-COMMON §5-3）');
// 15 用語集：3〜6 語（29・付録を除く）、共通 GLOSSARY §6 と一字一句、割り当ての語の登録、d に式・数字がない
const chId = PRO ? ID : String(NN), chOk = ch => (ch || []).map(String).some(x => x === chId || x === pad);
let assignedN = 0;   // rates/GLOSSARY-RULES §2 の割り当て語数（上限 6 を超える章は、割り当て語数まで許す）
for (const g of gl) { say(!!g.t && !!g.en && !!g.d, `用語 ${g.t}: 見出し語・英語・説明がある`); say(chOk(g.ch) || IS_APX, `用語 ${g.t}: ch に ${chId} がある（${JSON.stringify(g.ch)}）`); if (/[＝=]/.test(g.d || '')) say(false, `用語 ${g.t} の d に式（＝）がある（GLOSSARY §7）`); else if (/\d/.test((g.d || '').replace(/\d+\s?(年|か月|日|桁|つ|回|本)/g, ''))) cand(`用語 ${g.t} の d に数字（§7。式・数値でないか確かめる）: ${g.d}`); }
const common = {}; for (const l of glCommon.split('\n')) { const c = l.split('|').slice(1, -1).map(x => x.trim()); if (c.length === 5 && /^[ABC] /.test(c[4])) common[c[0]] = { en: c[1], alias: c[2], d: c[3], owner: c[4] }; }
const ownerId = o => { const m = o.match(/^A (序|)(\w+)$/); return m ? (m[1] ? 'I' + m[2] : m[2]) : null; };
for (const g of gl) if (common[g.t]) { const cm = common[g.t]; say(g.en === cm.en, `共通用語 ${g.t}: 英語が共通版と同じ（${g.en}／${cm.en}）`); say(g.d === cm.d, `共通用語 ${g.t}: d が共通版と一字一句同じ`); }
for (const [t, cm] of Object.entries(common)) if (ownerId(cm.owner) === chId) say(gl.some(g => g.t === t), `共通用語（持ち主はこの章）「${t}」が登録されている`);
// 講座の割り当て（rates/GLOSSARY-RULES §2）：この章が必ず登録する語
{ const row = glRates.split('\n').map(l => l.split('|').slice(1, -1).map(x => x.trim())).find(c => c.length === 2 && c[0] === (PRO ? '序' + NN : pad));
  if (row && !/^登録しない/.test(row[1])) { let cell = row[1].replace(/^機関の名前：/, ''); if (/登録：/.test(cell)) cell = cell.split('登録：')[1];
    const items = []; { let depth = 0, cur = ''; for (const ch of cell) { if (ch === '（') depth++; if (ch === '）') depth--; if ((ch === '／' || (IS_APX && ch === '、')) && depth === 0) { items.push(cur); cur = ''; } else cur += ch; } items.push(cur); }
    for (let it of items) { it = it.trim(); if (!it || /は登録しない/.test(it)) continue; const b = it.match(/^\*\*(.+?)\*\*/); let t = b ? b[1] : it.split(/（|→/)[0]; t = t.replace(/\*\*/g, '').trim(); if (!t) continue; assignedN++; say(gl.some(g => g.t === t), `割り当ての語「${t}」が登録されている（rates/GLOSSARY-RULES §2）`); } } }
if (!IS_APX && NN !== 29) say(gl.length >= 3 && gl.length <= Math.max(6, assignedN), `用語集は 3〜${Math.max(6, assignedN)} 語（今は ${gl.length} 語。上限は 6、または割り当て語数）`);
// 16 禁止する書き方（SPEC-COMMON §1-2）。「理論価格より高い・低い」は可
const BAN = /儲かる|儲け|もうけ|おすすめ|お勧め|オススメ|勝率|必勝|利益が出やすい|狙い目|買い時|売り時|割安|割高|有利(?!子)/g;
for (const m of allText.matchAll(BAN)) say(false, `禁止語「${m[0]}」（SPEC-COMMON §1-2）: …${allText.slice(Math.max(0, m.index - 25), m.index + 25).replace(/\s+/g, ' ')}…`);
// 17 損益図・利益の語があれば「損失」の語がある（§1-2。損失が限定されない場合はそのことも）
if (/損益図|利益|儲/.test(allText)) say(/損失/.test(allText), '「損益図」「利益」の語があるので「損失」の側も書いてある');
// 18 ％・％ポイント・bp（共通 GLOSSARY §5-1）。金利の変化を「％上げ」と書かない
for (const s of sentences) { const m = s.match(/(金利|利回り|利率|レート|付利|IORB)[^。]{0,14}?[\d.]+\s?[％%](?!\s?ポイント)\s?(?:だけ)?\s?(上が|上げ|下が|下げ|引き上|引き下|上昇|低下|高く|低く|変化)/); if (m) say(false, `金利の変化は「◯％ポイント」か「◯ bp」と書く（GLOSSARY §5-1）: 「${s.slice(0, 90)}」`); }
for (const m of allText.matchAll(/利上げ|利下げ/g)) cand(`「${m[0]}」は本文で使わない（引き上げ・引き下げ。見出しの引用は原文どおり。GLOSSARY §2.2）: …${allText.slice(Math.max(0, m.index - 20), m.index + 20).replace(/\s+/g, ' ')}…`);
for (const m of allText.matchAll(/逆レポ|シータ|あなた/g)) say(false, `使わない語「${m[0]}」（GLOSSARY §1・§2・§3）`);
for (const m of allText.matchAll(/(?<![A-Za-z])Fed(?![A-Za-z])/g)) cand(`「Fed」は使わない（原文の引用だけ。GLOSSARY §3-3）: …${allText.slice(Math.max(0, m.index - 20), m.index + 20).replace(/\s+/g, ' ')}…`);
for (const m of allText.matchAll(/レポ(?!取引|市場|ート|ー)/g)) cand(`「レポ」の単独（GLOSSARY §2.1：レポ取引・レポ市場と書く。制度名・原文の引用は可）: …${allText.slice(Math.max(0, m.index - 12), m.index + 14).replace(/\s+/g, ' ')}…`);
// 19 現在の金利の値は第21章（日銀）と第23章（FRB）だけ（spec §8.1）。それ以外の章で政策金利・付利などに数字（％）が付く文を候補に出す
if (!['21', '23'].includes(pad)) for (const s of sentences) if (/(政策金利|付利|誘導目標|IORB|ON RRP|基準貸付利率|適用利率|目標の範囲|常設のレポ|primary credit)/.test(s) && /\d[\d.]*\s?[％%]/.test(s) && !/架空|例えば|仮に|式|検算/.test(s)) cand(`現在の政策金利などの値は第21・23章だけ。実在の値なら書かない（架空なら「架空」と）: 「${s.slice(0, 90)}」`);
// 20 作者の名前・個人名・ハンドル名・メールアドレスを書かない（SPEC-COMMON §1-9）。検査語は符号化して持つ（平文で書かない）
{ const B = ['44Gm44Gj44Gh', 'VGV0Y2hp', '44OT44OD44Kw44Oe44Km44Oz44OG44Oz44OG44OE44Ok', '44OG44OE44Ok', 'VGV0c3V5YQ==', 'T3lhbWE='];
  for (const b of B) { const w = Buffer.from(b, 'base64').toString('utf8'); say(!whole.toLowerCase().includes(w.toLowerCase()), `作者名・ハンドル名・個人名に当たる語（符号化 ${b}）が含まれていない`); }
  say(!/[\w.+-]+@[\w-]+\.[\w.-]+/.test(whole.replace(/https?:\/\/\S+/g, '')), 'メールアドレスがない');
  say(!/<script|<style|<img|#[0-9a-fA-F]{6}\b/.test(html.replace(/<!--[\s\S]*?-->/g, '')), '章に <script>・<style>・画像・16 進の色がない'); }
// 21 mapping の行：自分が持ち主の統計・制度の行（spec §2.1）
if (!IS_APX && !PRO && NN !== 29) { if (maps.length) say(maps.every(([k, r]) => (course.mapping.cats || []).some(c => c.key === k) && r.a && r.b), `対応表の行 ${maps.length} 行：種別が course.json の mapping.cats にあり、a・b がある`); else cand('対応表（CN.mapping）の行がない。持ち主の統計・制度があれば足す（spec §2.1）'); }
console.log(ng ? `NG ${ng} 件` : 'NG 0 件'); process.exit(ng ? 1 : 0);
