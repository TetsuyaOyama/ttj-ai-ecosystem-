// 全章の確認問題・総合テストの「問・正答の文・ほかの選択肢・解説」を一覧に出す（正答の文が解説と矛盾しないかを目で読むため）。
//   node tools/answers.js [講座ディレクトリ] > 一覧.txt     正答の添字が式どおりかも検査し、最終行に件数を出す
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2] || '/home/claude/courses/power';
const files = fs.readdirSync(path.join(dir, 'data')).filter(f => /^(\d\d|I\d)-.*\.js$/.test(f)).sort();
let n = 0, bad = 0;
for (const f of files) {
  const id = f.split('-')[0], N = /^I/.test(id) ? parseInt(id.slice(1), 10) : parseInt(id, 10), PRO = /^I/.test(id);
  const quiz = [], exam = [];
  vm.runInNewContext(fs.readFileSync(path.join(dir, 'data', f), 'utf8'), { CN: { add: (k, i, d) => { if (k === 'quiz') quiz.push(d); }, glossary() {}, mapping() {}, exam: a => exam.push(...a), t: () => '' } });
  const lab = PRO ? '序章' + N : '第' + id + '章';
  const out = (tag, q, i, w) => { n++; const ok = q.a === w; if (!ok) bad++; console.log(`【${tag} 問${i}】${ok ? '' : '  ※位置が式（' + w + '）と違う'}\n  問：${q.q}\n  正答[${q.a}]：${q.c[q.a]}\n  他：${q.c.filter((_, k) => k !== q.a).join(' ／ ')}\n  解説：${q.why || ''}\n`); };
  quiz.forEach(d => d.items.forEach((q, i) => out(lab + ' 確認', q, i + 1, ((PRO ? N - 1 : N) + i) % 4)));
  exam.forEach((q, i) => out(lab + ' 総合', q, i + 1, id === '32' ? i % 4 : (N + 2 + i) % 4));
}
console.log(`合計 ${n} 問、位置の不一致 ${bad} 件`);
