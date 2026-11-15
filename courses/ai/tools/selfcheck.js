// 自己点検（発電講義の tools/selfcheck.js を写して、この講座向けに直したもの）
// 使い方: node tools/selfcheck.js <講座ディレクトリ> <章番号 1,2…|I1> [--apx 8] [--answers]
// 外した検査（発電講義にだけ要る）：リンクが「トップページでない」（この講座は提供元の学習サイト自体が教材で、トップに張る）、相互参照 XREF（server 講義への参照）、
//   効率の % と発熱量、数字の出典の候補、定型の注意書き（spec §9.3）、検算、演習の照合（drill がない）、線図の点（arch がない）、線の種別、℃ の表記。
// 足した検査：外部リンクの target=_blank と rel=noopener、短縮 URL、作者名、「全部無料」、効果の保証・優劣の語、英文の長い引用、札の値、確認日、用語 3〜6 語、終えるとできること／次へ進む目安。
const fs = require('fs'), path = require('path'), vm = require('vm');
const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i < 0 ? '' : argv[i + 1]; }, has = k => argv.includes(k);
const PRO = /^I\d+$/.test(argv[1] || ''), dir = argv[0], NN = PRO ? parseInt(argv[1].slice(1), 10) : parseInt(argv[1], 10), IDS = PRO ? argv[1] : '', APX = opt('--apx') ? parseInt(opt('--apx'), 10) : -1;
const pad = PRO ? IDS : String(NN).padStart(2, '0'), find = d => { try { return fs.readdirSync(path.join(dir, d)).find(f => f.startsWith(pad + '-')); } catch (e) { return undefined; } };
const rd = p => fs.readFileSync(p, 'utf8'), html = rd(path.join(dir, 'chapters', find('chapters'))), src = rd(path.join(dir, 'data', find('data')));
const facts = find('facts') ? rd(path.join(dir, 'facts', find('facts'))) : '', course = JSON.parse(rd(path.join(dir, 'course.json')));
const reg = [], quiz = [], exam = [], gl = [];
const CN = { add: (k, id, d) => { reg.push([k, id, d]); if (k === 'quiz') quiz.push([id, d]); }, glossary: a => gl.push(...a), mapping() {}, exam: a => exam.push(...a), t: () => '' };
vm.runInNewContext(src, { CN });
let ng = 0; const say = (ok, m) => { if (!ok) ng++; console.log((ok ? 'OK  ' : 'NG  ') + m); }, cand = m => console.log('候補 ' + m);
const isApx = !PRO && NN === APX;
const text = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');
const textNoRefs = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<section class="refs">[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' ');
const strs = [...src.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m => m[1].replace(/\\'/g, "'"));
const all = text + '\n' + strs.join('\n') + '\n' + html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');
const sentences = (textNoRefs + '\n' + strs.join('\n')).split(/[。\n]/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
// 1 題・部・トラックが course.json と一致
const meta = k => ((html.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')) || [])[1] || '').trim();
const plan = (course.chapters || []).find(c => PRO ? c.num === IDS : parseInt(c.num, 10) === NN) || {};
for (const k of ['title', 'part', 'track']) say(String(plan[k] || '') === meta(k), `メタ ${k}: 章「${meta(k)}」／course.json「${plan[k] || ''}」`);
// 2 登録したデータがすべて本文に置かれている（付録は用語集・総合テスト・一覧表の器だけ）
for (const [k, id] of reg) say(html.includes(`data-src="${id}"`), `部品 ${k} ${id} が本文にある`);
// 3 確認問題: 3 問・各 4 択・why・正答の添字が式どおり。付録以外は 1 つ
if (!isApx) say(quiz.length === 1, `確認問題が 1 組ある（${quiz.length}）`);
quiz.forEach(([id, d]) => { say(d.items.length === 3, `${id} は ${d.items.length} 問`);
  d.items.forEach((it, i) => { const w = ((PRO ? NN - 1 : NN) + i) % 4;
    say(it.a === w && it.c.length === 4 && !!it.why, `${id} 問${i + 1} a=${it.a}（式 ${w}）選択肢 ${it.c.length}\n      問: ${it.q}\n      正答: ${it.c[it.a]}\n      解説: ${String(it.why).slice(0, 80)}`);
    say(new Set(it.c).size === 4, `${id} 問${i + 1} 選択肢に重複がない`);
    say(!/上のすべて|すべて正しい|A と B/.test(it.c.join('|')), `${id} 問${i + 1} 位置に依存する選択肢がない`); }); });
if (!PRO && !isApx) say(exam.length === 1, `総合テストの問が 1 つ（${exam.length}）`);
if (PRO) say(exam.length === 0, `序章の総合テストの問は置かない（${exam.length}）`);
exam.forEach((it, i) => { const w = (NN + 2 + i) % 4; say(it.a === w && it.c.length === 4 && it.part === '1', `総合 ${i + 1} a=${it.a}（式 ${w}）part=${it.part}\n      問: ${it.q}\n      正答: ${it.c[it.a]}`); });
// 3b 正答の文の一覧（--answers）。目で読んで、問・正答・解説に矛盾がないかを確かめる
if (has('--answers')) { const out = (n, q, i) => { console.log(`答 ${n} 問${i}\n  問：${q.q}\n  正答[${q.a}]：${q.c[q.a]}\n  他：${q.c.filter((_, k) => k !== q.a).join(' ／ ')}\n  解説：${q.why || ''}`); };
  quiz.forEach(([id, d]) => d.items.forEach((it, i) => out(id, it, i + 1))); exam.forEach((it, i) => out('総合テスト', it, i + 1)); }
// 4 リンク: 外部リンクは新しいタブ・rel=noopener。短縮 URL なし。教材のリンクは提供元の場所
const SHORT = /(^|\.)(bit\.ly|t\.co|goo\.gl|tinyurl\.com|ow\.ly|is\.gd|buff\.ly|lnkd\.in)$/;
for (const m of html.matchAll(/<a\s[^>]*>/g)) { const tag = m[0], h = (tag.match(/href="([^"]*)"/) || [])[1] || '';
  if (/^https?:/.test(h)) { const u = new URL(h); say(/target="_blank"/.test(tag) && /rel="[^"]*noopener[^"]*"/.test(tag), `外部リンクが新しいタブ＋rel=noopener: ${h}`); say(!SHORT.test(u.hostname), `短縮 URL でない: ${u.hostname}`); }
  else if (/^\.\.\//.test(h)) say(h === '../ai-ecosystem/', `相対リンクは ../ai-ecosystem/ だけ: ${h}`); }
// 5 略語の初出の候補
const seen = new Set(['AI', 'ID', 'IT', 'API', 'LLM', 'RAG', 'MCP', 'SDK', 'OK', 'URL', 'README', 'GitHub', 'Python', 'Claude']);
for (const m of textNoRefs.matchAll(/[A-Z][A-Za-z0-9+.\-]*[A-Z0-9][A-Za-z0-9+.\-]*/g)) { const w = m[0]; if (seen.has(w)) continue; seen.add(w);
  const ctx = textNoRefs.slice(Math.max(0, m.index - 40), m.index + w.length + 60).replace(/\s+/g, ' ');
  if (!/（|\(/.test(ctx)) cand(`略語 ${w} の初出に括弧なし（確かめる）: …${ctx}…`); }
// 6 要確認の印・作者名・禁止の語
say(!/要確認/.test(html + src + facts), '「要確認」の印が残っていない');
const body = html + src;
say(!/\u30d3\u30c3\u30b0\u30de\u30a6\u30f3\u30c6\u30f3|\u30c6\u30c4\u30e4|\u3066\u3063\u3061/.test(body), '作者名（筆名の3語）がない');   // 検査語は、ファイルに書かないようエスケープで書く
say(!/全部無料|すべて無料|全て無料|完全無料/.test(body), '「全部無料」の言い方がない');
say(!/これで.{0,24}できるようになる|必ず.{0,12}(できる|身につ|上達|成功)|保証します|間違いなく.{0,8}(できる|身につ)/.test(body), '効果の保証の言い方がない');
say(!/優れた|最も優|一番優|最高の|ナンバーワン|No\.\s?1|ランキング|おすすめ順|ベスト[0-9一二三]/.test(body), '優劣・順位づけの言い方がない');
say(!/Dario|ダリオ|アモデイ/.test(body), '確認できなかった人物の名前・発言を使っていない');
// 7 英文の長い引用（15 語以上の英語の連なり）がない
for (const m of (all).matchAll(/(?:[A-Za-z][A-Za-z'\-]*[ ,]+){14,}[A-Za-z]+/g)) say(false, `15 語以上の英文の連なり: ${m[0].slice(0, 80)}`);
// 8 札の値（table の料金の札・状態の札の列）
const PRICE = ['無料', '無料（登録が必要）', '一部有料', '登録が必要（有料の契約か API）', '記載なし', '未確認'], STATE = ['現行', '改名・移転', '保守終了', '未確認'];
for (const [k, id, d] of reg) if (k === 'table' && /-res$/.test(id)) { const ip = d.cols.indexOf('料金の札'), is = d.cols.indexOf('状態の札'), ic = d.cols.indexOf('確認日');
  for (const r of d.rows) { say(PRICE.includes(r[ip]), `${id} 料金の札「${r[ip]}」（${r[0]}）`); say(STATE.includes(r[is]), `${id} 状態の札「${r[is]}」（${r[0]}）`); say(r[ic] === '2026-11-15', `${id} 確認日 ${r[ic]}`); }
  say(d.detail && d.detail.length === d.rows.length, `${id} の詳細が全行にある`); }
// 9 参照資料と確認日
if (!isApx) { say(/<section class="refs">/.test(html), '参照資料がある'); say(/確認日：2026 年 11 月 15 日/.test(html), '参照資料の caption に確認日がある'); }
// 10 用語は 3〜6 語（付録を除く）。「終えるとできること」「次へ進む目安」（段階の章）
if (!isApx) say(gl.length >= 3 && gl.length <= 6, `用語集の語が ${gl.length} 語（3〜6）`);
if (NN >= 2 && NN <= 6 && !PRO) { say(/終えるとできること/.test(html), '「終えるとできること」がある'); say(/次へ進む目安/.test(html), '「次へ進む目安」がある'); say(/つまずきやすい点/.test(html), '「つまずきやすい点」がある'); }
if (NN === 7 && !PRO) { say(/終えるとできること/.test(html), '「終えるとできること」がある'); say(/次の一歩の目安/.test(html), '「次の一歩の目安」がある'); say(/つまずきやすい点/.test(html), '「つまずきやすい点」がある'); }
// 11 事実確認表（facts/*.md）：区分・一次・確認日
let nf = 0; for (const line of facts.split('\n')) { const c = line.split('|').slice(1, -1).map(x => x.trim()); if (c.length < 7 || !/^\d+$/.test(c[0])) continue; nf++;
  const tag = `事実確認表 #${c[0]}（${c[1]}）`;
  say(['状態', '料金', '前提', '方針', 'リポジトリ', '一般知識'].includes(c[1]), `${tag} の区分が一覧にある`);
  if (['状態', '料金', '前提'].includes(c[1])) say(['○', '△', '×'].includes(c[5]), `${tag} の一次が ○△× のどれか（今は「${c[5]}」）`);
  if (c[5] === '×') say(/未確認/.test(c[2]), `${tag} は二次情報だけなので「未確認」と書いてある`);
  say(/^\d{4}-\d{2}-\d{2}$/.test(c[6]), `${tag} の確認日が YYYY-MM-DD`); }
say(nf > 0 || isApx, `事実確認表の行が ${nf} 行`);
// 12 文が長い候補（目安 60 字以内）
let nl = 0; for (const s of sentences) if (s.length > 80 && nl++ < 12) cand(`長い文（${s.length} 字。短くできるか）: 「${s.slice(0, 70)}…」`);
// 13 用語集の d に数字（候補）
for (const g of gl) if (/\d/.test(g.d || '')) cand(`用語 ${g.t} の d に数字（確かめる）: ${g.d}`);
console.log(ng ? `NG ${ng} 件` : 'NG 0 件'); process.exit(ng ? 1 : 0);
