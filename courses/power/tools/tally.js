// 集計: node tools/tally.js /home/claude/courses/power  → 章ごとの部品・クイズ・総合テスト・用語・事実確認表の行数と、総合テストの部ごとの数
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2] || '/home/claude/courses/power';
const course = JSON.parse(fs.readFileSync(path.join(dir, 'course.json'), 'utf8'));
const files = fs.readdirSync(path.join(dir, 'data')).filter(f => /^(\d\d|I\d)-.*\.js$/.test(f)).sort();   // 序章（I1・I2）も数える
const out = { chapters: {}, exam: {}, total: { quiz: 0, exam: 0, glossary: 0, mapping: 0, facts: 0, components: 0 }, missing: [] };
const have = new Set(files.map(f => f.slice(0, 2)));
for (const c of course.chapters) if (!have.has(c.num)) out.missing.push(c.num + ' ' + c.title);
const terms = new Map();
for (const f of files) {
  const n = f.slice(0, 2); let reg = 0, q = 0, ex = [], gl = [], mp = 0;
  const CN = { add: (k, id, d) => { reg++; if (k === 'quiz') q += d.items.length; }, glossary: a => gl.push(...a), mapping: (k, a) => { mp += a.length; }, exam: a => ex.push(...a), t: () => '' };
  vm.runInNewContext(fs.readFileSync(path.join(dir, 'data', f), 'utf8'), { CN });
  const fp = fs.readdirSync(path.join(dir, 'facts')).find(x => x.startsWith(n + '-'));
  const src = fs.readFileSync(path.join(dir, 'data', f), 'utf8') + (fp ? fs.readFileSync(path.join(dir, 'facts', fp), 'utf8') : '');
  const facts = src.split('\n').filter(l => /^\|\s*\d+\s*\|/.test(l) && l.split('|').length >= 11 && !/^\|\s*\d+\s*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|\s*[^|]*\|/.test(l)).length;
  out.chapters[n] = { components: reg, quiz: q, exam: ex.length, glossary: gl.length, mapping: mp, facts };
  for (const e of ex) { const p = String(e.part); out.exam[p] = (out.exam[p] || 0) + 1; }
  for (const g of gl) terms.set(g.t, n);
  Object.keys(out.total).forEach(k => { if (k !== 'components' && k in out.chapters[n]) out.total[k] += out.chapters[n][k]; });
  out.total.components += reg;
}
out.total.glossaryUnique = terms.size;
console.log(JSON.stringify(out, null, 1));
