// 自己点検: node /tmp/pc-selfcheck.js <講座ディレクトリ> <章番号> [--apx 付録の章番号] [--need id,id,…]
const fs = require('fs'), path = require('path'), vm = require('vm');
const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i < 0 ? '' : argv[i + 1]; };
const dir = argv[0], NN = parseInt(argv[1], 10), APX = opt('--apx') ? parseInt(opt('--apx'), 10) : -1, need = opt('--need') ? opt('--need').split(',') : [];
const pad = String(NN).padStart(2, '0'), find = d => fs.readdirSync(path.join(dir, d)).find(f => f.startsWith(pad + '-'));
const html = fs.readFileSync(path.join(dir, 'chapters', find('chapters')), 'utf8');
const course = JSON.parse(fs.readFileSync(path.join(dir, 'course.json'), 'utf8'));
const reg = [], quiz = [], exam = [];
const CN = { add: (k, id, d) => { reg.push([k, id, d]); if (k === 'quiz') quiz.push([id, d]); }, glossary() {}, mapping() {}, exam: a => exam.push(...a), t: () => '' };
vm.runInNewContext(fs.readFileSync(path.join(dir, 'data', find('data')), 'utf8'), { CN });
let ng = 0; const say = (ok, m) => { if (!ok) ng++; console.log((ok ? 'OK  ' : 'NG  ') + m); };
// 1 題・部・トラックが course.json と一致
const meta = k => ((html.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')) || [])[1] || '').trim();
const plan = (course.chapters || []).find(c => parseInt(c.num, 10) === NN) || {};
for (const k of ['title', 'part', 'track']) say(String(plan[k] || '') === meta(k), `メタ ${k}: 章「${meta(k)}」／course.json「${plan[k] || ''}」`);
// 2 登録したデータがすべて本文に置かれている（付録の関数で使うものを除く）
for (const [k, id] of reg) say(html.includes(`data-src="${id}"`), `部品 ${k} ${id} が本文にある`);
for (const id of need) say(reg.some(r => r[1] === id), `spec の部品 ${id} がデータにある`);
// 3 確認問題: 3 問・各 4 択・正答の添字が式どおり。正答の文を目で読む
quiz.forEach(([id, d]) => { say(d.items.length === 3 || NN === APX, `${id} は ${d.items.length} 問`);
  d.items.forEach((it, i) => { const w = (NN + i) % 4;
    say(it.a === w && it.c.length === 4 && !!it.why, `${id} 問${i + 1} a=${it.a}（式 ${w}）選択肢 ${it.c.length}\n      問: ${it.q}\n      正答: ${it.c[it.a]}`); }); });
exam.forEach((it, i) => { const w = NN === APX ? i % 4 : (NN + 2 + i) % 4;
  say(it.a === w, `総合 ${i + 1} a=${it.a}（式 ${w}）\n      問: ${it.q}\n      正答: ${it.c[it.a]}`); });
// 4 線の種別: 構成図の線を種別ごとに並べる（意味の表と目で突き合わせる）
for (const [k, id, d] of reg) if (k === 'arch') for (const l of d.links || []) console.log(`線  ${id} ${l.plane || '(既定)'} ${l.a}→${l.b} 「${l.label || ''}」 ${l.carries || ''}`);
// 5 参照資料のリンクがトップページでない
for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) { const u = new URL(m[1]); say(u.pathname.replace(/\/(index\.html?)?$/, '') !== '' , `リンク ${m[1]}`); }
// 6 略語の初出（本文の先頭から。囲みと見出しを含む）。前後に括弧が無いものを候補として出す
const text = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<section class="refs">[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' '), seen = new Set(['PC', 'OS', 'AI', 'ID']);   // 併記を省いてよい語（GLOSSARY-RULES §3.4）
for (const m of text.matchAll(/[A-Z][A-Za-z0-9+.\-]*[A-Z0-9][A-Za-z0-9+.\-]*/g)) { const w = m[0]; if (seen.has(w)) continue; seen.add(w);
  const ctx = text.slice(Math.max(0, m.index - 40), m.index + w.length + 60).replace(/\s+/g, ' ');
  if (!/（|\(/.test(ctx)) console.log(`略語 ${w} の初出に括弧なし（確かめる）: …${ctx}…`); }
// 7 要確認の印
say(!/要確認/.test(html + fs.readFileSync(path.join(dir, 'data', find('data')), 'utf8')), '「要確認」の印が残っていない');
console.log(ng ? `NG ${ng} 件` : 'NG 0 件'); process.exit(ng ? 1 : 0);
