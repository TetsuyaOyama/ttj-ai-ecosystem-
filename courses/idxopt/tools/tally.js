// 集計: node /home/claude/courses/idxopt/tools/tally.js [講座ディレクトリ]
//   章ごとの部品・確認問題・総合テスト・用語・対応表・事実確認表の行数と、総合テストの部ごとの数、未執筆の章を出す。
//   spec §8-6 の公開前の条件（確認問題 3 問×章、総合テスト 33 問、用語集 100 語以上・重複なし）との差も出す。序章は course.json の parts[].front から読む。
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2] || '/home/claude/courses/idxopt';
const course = JSON.parse(fs.readFileSync(path.join(dir, 'course.json'), 'utf8'));
const dd = path.join(dir, 'data'), fd = path.join(dir, 'facts');
const files = (fs.existsSync(dd) ? fs.readdirSync(dd) : []).filter(f => /^(\d\d|I\d)-.*\.js$/.test(f)).sort();
const idOf = f => f.split('-')[0];
const out = { chapters: {}, exam: {}, total: { quiz: 0, exam: 0, glossary: 0, mapping: 0, facts: 0, components: 0 }, missing: [], errors: [] };
const have = new Set(files.map(idOf));
for (const c of course.chapters) if (!have.has(c.num)) out.missing.push(c.num + ' ' + c.title);
const terms = new Map(), dup = [];
for (const f of files) {
  const n = idOf(f); let reg = 0, q = 0, ex = [], gl = [], mp = 0;
  const CN = { add: (k, id, d) => { reg++; if (k === 'quiz') q += d.items.length; }, glossary: a => gl.push(...a), mapping: (k, a) => { mp += a.length; }, exam: a => ex.push(...a), t: () => '' };
  let src = fs.readFileSync(path.join(dd, f), 'utf8');
  try { vm.runInNewContext(src, { CN }); } catch (e) { out.errors.push(n + ': ' + e.message); continue; }
  const fp = fs.existsSync(fd) ? fs.readdirSync(fd).find(x => x.startsWith(n + '-')) : null;
  if (fp) src += fs.readFileSync(path.join(fd, fp), 'utf8');
  const facts = src.split('\n').filter(l => { const c = l.split('|').slice(1, -1); return c.length >= 10 && /^\s*\d+\s*$/.test(c[0]) && !/^\s*#?\s*$/.test(c[1]); }).length;
  out.chapters[n] = { components: reg, quiz: q, exam: ex.length, glossary: gl.length, mapping: mp, facts };
  for (const e of ex) { const p = String(e.part); out.exam[p] = (out.exam[p] || 0) + 1; }
  for (const g of gl) { if (terms.has(g.t)) dup.push(g.t + '（' + terms.get(g.t) + ' と ' + n + '）'); terms.set(g.t, n); }
  Object.keys(out.total).forEach(k => { if (k !== 'components' && k in out.chapters[n]) out.total[k] += out.chapters[n][k]; });
  out.total.components += reg;
}
out.total.glossaryUnique = terms.size;
out.duplicateTerms = dup;
out.gaps = { quizExpected: 3 * course.chapters.filter(c => c.num !== '28').length, examExpected: (course.exam || {}).target, glossaryMin: 90 };
console.log(JSON.stringify(out, null, 1));
