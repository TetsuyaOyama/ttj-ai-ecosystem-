// 自己点検（claude-api 講座用）。使い方: node tools/selfcheck.js <講座ディレクトリ> <章番号 1,2…|I1> [--answers]
// 検査: メタ、部品の配置、確認問題（3 問・4 択・正答の添字 (NN+i)%4）、総合テスト（(NN+2)%4）、リンク、
//   秘密・個人情報、料金・上限の数字の置き場所（第 05 章のみ）、公式でないお断り、コードの構文、事実確認表、参照資料、用語 3〜6 語。
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const argv = process.argv.slice(2), has = k => argv.includes(k);
const dir = argv[0], PRO = /^I\d+$/.test(argv[1] || ''), IDS = PRO ? argv[1] : '', NN = PRO ? parseInt(IDS.slice(1), 10) : parseInt(argv[1], 10);
const pad = PRO ? IDS : String(NN).padStart(2, '0');
const find = d => { try { return fs.readdirSync(path.join(dir, d)).find(f => f.startsWith(pad + '-')); } catch (e) { return undefined; } };
const rd = p => fs.readFileSync(p, 'utf8');
const html = rd(path.join(dir, 'chapters', find('chapters'))), src = rd(path.join(dir, 'data', find('data')));
const facts = find('facts') ? rd(path.join(dir, 'facts', find('facts'))) : '', course = JSON.parse(rd(path.join(dir, 'course.json')));
const reg = [], quiz = [], exam = [], gl = [];
const CN = { add: (k, id, d) => { reg.push([k, id, d]); if (k === 'quiz') quiz.push([id, d]); }, glossary: a => gl.push(...a), mapping() {}, exam: a => exam.push(...a), t: () => '' };
vm.runInNewContext(src, { CN });
let ng = 0; const say = (ok, m) => { if (!ok) ng++; console.log((ok ? 'OK  ' : 'NG  ') + m); }, cand = m => console.log('候補 ' + m);
const isApx = !PRO && NN === 15;
const clean = html.replace(/<!--[\s\S]*?-->/g, '');
const textNoRefs = clean.replace(/<section class="refs">[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' ');
const body = html + '\n' + src;
const meta = k => ((html.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')) || [])[1] || '').trim();
const plan = (course.chapters || []).find(c => PRO ? c.num === IDS : parseInt(c.num, 10) === NN) || {};
for (const k of ['title', 'part', 'track']) say(String(plan[k] || '') === meta(k), `メタ ${k}: 章「${meta(k)}」／course.json「${plan[k] || ''}」`);
for (const [k, id] of reg) say(html.includes(`data-src="${id}"`), `部品 ${k} ${id} が本文にある`);
say(/data-widget="/.test(html), '図か動かす部品が 1 つ以上ある');
// 確認問題
if (!isApx) say(quiz.length === 1, `確認問題が 1 組（${quiz.length}）`);
quiz.forEach(([id, d]) => { say(d.items.length >= 2 && d.items.length <= 3, `${id} は ${d.items.length} 問（2〜3）`);
  d.items.forEach((it, i) => { const w = ((PRO ? NN - 1 : NN) + i) % 4;
    say(it.a === w && it.c.length === 4 && !!it.why, `${id} 問${i + 1} a=${it.a}（式 ${w}）\n      問: ${it.q}\n      正答: ${it.c[it.a]}\n      解説: ${String(it.why).slice(0, 90)}`);
    say(new Set(it.c).size === 4, `${id} 問${i + 1} 選択肢に重複がない`);
    say(!/上のすべて|すべて正しい|A と B/.test(it.c.join('|')), `${id} 問${i + 1} 位置に依存する選択肢がない`); }); });
if (!PRO && !isApx) say(exam.length === 1, `総合テストの問が 1 つ（${exam.length}）`);
if (PRO || isApx) say(exam.length === 0, `総合テストの問を置かない章（${exam.length}）`);
exam.forEach((it, i) => { const w = (NN + 2 + i) % 4; say(it.a === w && it.c.length === 4 && String(it.part) === String(plan.part), `総合 ${i + 1} a=${it.a}（式 ${w}）part=${it.part}\n      問: ${it.q}\n      正答: ${it.c[it.a]}\n      解説: ${String(it.why).slice(0, 90)}`); });
if (has('--answers')) { const out = (n, q, i) => console.log(`答 ${n} 問${i}\n  問：${q.q}\n  正答[${q.a}]：${q.c[q.a]}\n  他：${q.c.filter((_, k) => k !== q.a).join(' ／ ')}\n  解説：${q.why || ''}`);
  quiz.forEach(([id, d]) => d.items.forEach((it, i) => out(id, it, i + 1))); exam.forEach((it, i) => out('総合テスト', it, i + 1)); }
// リンク
const SHORT = /(^|\.)(bit\.ly|t\.co|goo\.gl|tinyurl\.com|ow\.ly|is\.gd|buff\.ly|lnkd\.in)$/;
for (const m of clean.matchAll(/<a\s[^>]*>/g)) { const tag = m[0], h = (tag.match(/href="([^"]*)"/) || [])[1] || '';
  if (/^https?:/.test(h)) { const u = new URL(h); say(/target="_blank"/.test(tag) && /rel="[^"]*noopener[^"]*"/.test(tag), `外部リンクが新しいタブ＋rel=noopener: ${h}`); say(!SHORT.test(u.hostname), `短縮 URL でない: ${u.hostname}`); say(/(^|\.)(anthropic\.com|claude\.com|claude\.ai|modelcontextprotocol\.io)$/.test(u.hostname), `公式のドメイン: ${u.hostname}`); } }
// 秘密・個人情報・禁止の語
say(!/sk-ant-|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{12,}/.test(body), '本物らしい API キーの文字列がない');
say(!/[A-Za-z0-9._+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/.test(body.replace(/@anthropic-ai\/sdk/g, '')), 'メールアドレスがない');
for (const m of body.matchAll(/(x-api-key|ANTHROPIC_API_KEY|api_key|authorization_token)\s*[:=]\s*["']([^"'$][^"']*)["']/g)) say(/^YOUR_(API_KEY|TOKEN)$/.test(m[2]), `キーの値はプレースホルダだけ: ${m[0].slice(0, 60)}`);
say(!/ビッグマウンテン|テツヤ|てっち/.test(body), '作者名・筆名がない');
say(!/要確認/.test(body + facts), '「要確認」の印が残っていない');
say(!/実行して確認(した|済)|動作確認(済|しました)|試しに動かしたところ/.test(body), 'コードを動かしたという主張がない');
say(!/これで.{0,24}できるようになる|必ず.{0,12}(できる|身につ|上達|成功)|保証します/.test(body), '効果の保証の言い方がない');
say(!/(Anthropic|Claude)の公式(講座|教材|資料です)|公式の教材です/.test(body), '公式を名乗る言い方がない');
for (const m of (html.replace(/<[^>]+>/g, ' ')).matchAll(/(?:[A-Za-z][A-Za-z'\-]*[ ,]+){14,}[A-Za-z]+/g)) say(false, `15 語以上の英文の連なり: ${m[0].slice(0, 80)}`);
// 料金・上限の数字は第 05 章だけ
if (NN !== 5 || PRO) { const t = textNoRefs + src.replace(/\/\*[\s\S]*?\*\//g, ''); say(!/\$\s?\d|\d\s?ドル|USD|\d[\d,.]*\s?円|MTok|\d\s?(RPM|ITPM|OTPM)/.test(t), '料金・上限の数字がない（第 05 章だけに置く）'); }
// お断り
if (PRO || isApx) say(/公式の資料ではな/.test(html) && /最新で正確な情報(は|を)/.test(html), 'お断り（公式の資料ではない・最新は公式で）がある');
// コードの構文（python は py_compile、bash は bash -n、json は parse）
const un = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const tmp = '/tmp/claude-api/selfcheck'; fs.mkdirSync(tmp, { recursive: true });
let nb = 0; for (const m of clean.matchAll(/<pre><code class="lang-([a-z]+)">([\s\S]*?)<\/code><\/pre>/g)) { nb++; const lang = m[1], code = un(m[2]), f = path.join(tmp, `${pad}-${nb}.${lang}`);
  fs.writeFileSync(f, code);
  if (lang === 'python') { const r = cp.spawnSync('python3', ['-m', 'py_compile', f]); say(r.status === 0, `python ブロック ${nb} の構文: ${(r.stderr || '').toString().slice(0, 120)}`); }
  else if (lang === 'bash') { const r = cp.spawnSync('bash', ['-n', f]); say(r.status === 0, `bash ブロック ${nb} の構文`); }
  else if (lang === 'json') { let ok = true; try { JSON.parse(code); } catch (e) { ok = false; } say(ok, `json ブロック ${nb} の構文`); }
  else if (lang === 'typescript') { const f2 = f.replace(/\.typescript$/, '.mjs'); fs.writeFileSync(f2, code); const r = cp.spawnSync('node', ['--check', f2]); say(r.status === 0, `typescript ブロック ${nb} の構文（型注釈なしの範囲で node --check）`); }
  else if (lang !== 'text') say(false, `未知の言語クラス ${lang}`); }
for (const m of clean.matchAll(/<pre><code(?![^>]*lang-)[^>]*>/g)) say(false, 'lang- なしのコードブロック');
// 参照資料・用語・事実確認表
if (!isApx) { say(/<section class="refs">/.test(html), '参照資料がある'); }
say(/確認日：2026 年 11 月 18 日/.test(html) || PRO, '参照資料の caption に確認日');
if (!isApx) say(gl.length >= 3 && gl.length <= 6, `用語集の語が ${gl.length} 語（3〜6）`);
let nf = 0; for (const line of facts.split('\n')) { const c = line.split('|').slice(1, -1).map(x => x.trim()); if (c.length < 6 || !/^\d+$/.test(c[0])) continue; nf++;
  say(['公式', '一般知識', 'この講座の整理', '除外'].includes(c[1]), `事実 #${c[0]} の区分「${c[1]}」`);
  if (c[1] === '公式') say(/https?:/.test(c[3]), `事実 #${c[0]} に URL`);
  say(/^\d{4}-\d{2}-\d{2}$/.test(c[5]), `事実 #${c[0]} の確認日`); }
say(nf > 0, `事実確認表の行が ${nf} 行`);
let nl = 0; for (const s of textNoRefs.split(/[。\n]/).map(s => s.replace(/\s+/g, ' ').trim())) if (s.length > 90 && nl++ < 8) cand(`長い文（${s.length} 字）: 「${s.slice(0, 60)}…」`);
console.log(ng ? `NG ${ng} 件` : 'NG 0 件'); process.exit(ng ? 1 : 0);
