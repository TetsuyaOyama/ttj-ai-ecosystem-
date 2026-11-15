/* 第23章のデータ。事実確認表：facts/23-fed-now.md（担当 RF、確認 2026-11-15）。
   第23章は、FRB の現在の目標の範囲・IORB・ON RRP・常設のレポ・primary credit rate の値の持ち主（spec §9.1）。
   値は FRB の実施の指示（2026-10-28 の実施の指示、効力 2026-10-29）の原文の語のまま。次の FOMC（日程表で 2026-12-08〜09）の後に、必ず取り直す。
   演習の照合は facts/23-fed-now.md の「演習の照合（第23章）」に置く。この章に式はない。 */

CN.add('table', 'c23-now', {
  title: 'FRB の現在の枠組みの早見表（確認日 2026-11-15。実施の指示 2026-10-28、効力 2026-10-29）',
  caption: '出典：FRB『Implementation Note issued October 28, 2026』ほか（各行の詳細に URL の題）。値の語は原文のまま。決定日と適用日は別。★次の会合の後に取り直す',
  cols: ['項目（原文の語）', '値', '決めた主体', '決定日', '適用日', '種類'],
  rows: [
    ['目標の範囲（target range for the federal funds rate）', '3-3/4 から 4 percent', '連邦公開市場委員会（FOMC）', '2026-10-28 に維持（引き上げの決定は 2026-09-16）', '2026-10-29（引き上げ時は 2026-09-17）', '誘導の目標'],
    ['IORB（interest rate paid on reserve balances）', '3.90 percent', '理事会（Board of Governors、全員一致）', '2026-10-28 に維持（引き上げは 2026-09-16）', '2026-10-29（原文は effective October 29, 2026）', '付利'],
    ['ON RRP（standing overnight reverse repurchase agreement operations）の offering rate', '3.75 percent、取引相手ごとに 1 日 $160 billion（原文）', 'FOMC（デスクへの指示）', '2026-10-28', '2026-10-29', '資金の吸収'],
    ['常設のレポ（standing overnight repurchase agreement operations）の rate', '4.0 percent', 'FOMC（デスクへの指示）', '2026-10-28', '2026-10-29', '資金の供給'],
    ['primary credit rate', '4.0 percent（原文は existing level）', '理事会（Board of Governors、全員一致）', '2026-10-28 に existing level で承認（4.0 percent への引き上げは 2026-09-16）', '2026-09-17（2026-09-16 の実施の指示の effective September 17, 2026。10-28 の実施の指示は日を書かない）', '貸出の金利'],
    ['国債の元本', 'Roll over at auction all principal payments（入札ですべて再投資）', 'FOMC（デスクへの指示）', '2026-10-28', '2026-10-29', 'SOMA の運営'],
    ['エージェンシー証券の元本', 'Reinvest all principal payments … into Treasury bills（短期国債へすべて再投資）', 'FOMC（デスクへの指示）', '2026-10-28', '2026-10-29', 'SOMA の運営'],
    ['短期国債の買入れ', 'When appropriate, … purchases of Treasury bills and, if needed, other Treasury securities with remaining maturities of 3 years or less（原文）', 'FOMC（デスクへの指示）', '2026-10-28', '2026-10-29', 'SOMA の運営']
  ],
  detail: [
    '声明（2026-10-28）は「The Committee decided to maintain the target range for the federal funds rate at 3-3/4 to 4 percent.」と書く。2026-09-16 の声明は「decided to raise the target range … by 1/4 percentage point to 3-3/4 to 4 percent」。小数で書くと 3.75％から 4.00％。出典：FRB『Federal Reserve issues FOMC statement』（2026-10-28・2026-09-16）。',
    '実施の指示は「The Board of Governors of the Federal Reserve System voted unanimously to maintain the interest rate paid on reserve balances at 3.90 percent, effective October 29, 2026.」と書く。2026-09-16 の実施の指示は「raise the interest rate paid on reserve balances to 3.90 percent」。出典：FRB『Implementation Note issued October 28, 2026』・『…September 16, 2026』。',
    '原文は「Conduct standing overnight reverse repurchase agreement operations at an offering rate of 3.75 percent and with a per-counterparty limit of $160 billion per day.」。ドルの額は原文のまま（1 日あたり、取引相手ごと）。NY 連銀の説明では、各取引相手が出せる提案の大きさの上限。出典：FRB の実施の指示、NY 連銀『FAQs: Reverse Repurchase Agreement Operations』（ページ日付 2026-09-16）。',
    '原文は「Conduct standing overnight repurchase agreement operations at a rate of 4.0 percent.」。講座では「常設のレポ」と呼ぶ（共通の用語。FOMC の実施の指示の語は standing overnight repurchase agreement operations）。出典：FRB の実施の指示、NY 連銀『FAQs: Standing Repurchase Agreement Operations』（ページ日付 2026-09-16）。',
    '実施の指示の「related action」として、理事会が全員一致で、primary credit rate を existing level の 4.0 percent に定めることを承認した。2026-09-16 の実施の指示は「a 1/4 percentage point increase in the primary credit rate to 4.0 percent」。2026-09-16 の実施の指示は、この引き上げを「effective September 17, 2026」と書く。2026-10-28 の実施の指示は、existing level の承認で、日を書かない。出典：FRB の実施の指示（2026-10-28・2026-09-16）。',
    '原文は「Roll over at auction all principal payments from the Federal Reserve\'s holdings of Treasury securities.」。SOMA の国債の元本が償還されるとき、同額を入札で買う（第17章の再投資）。出典：FRB の実施の指示（効力 2026-10-29）。',
    '原文は「Reinvest all principal payments from the Federal Reserve\'s holdings of agency securities into Treasury bills.」。エージェンシー証券の元本は、短期国債へ再投資する。出典：FRB の実施の指示（効力 2026-10-29）。',
    '原文は「When appropriate, increase the System Open Market Account holdings of securities through purchases of Treasury bills and, if needed, other Treasury securities with remaining maturities of 3 years or less to maintain an ample level of reserves.」。**実施の指示の文に reserve management purchases の語はない。** NY 連銀の文書が、この買入れを reserve management purchases（RMPs）と呼ぶ。出典：FRB の実施の指示、NY 連銀『FAQs: Reserve Management Purchases and Reinvestment Purchases』（ページ日付 2026-06-17）。'
  ],
  note: '値は確認日（2026-11-15）に FRB の個別ページで確かめた原文の語です。「適用日」は、実施の指示が書く効力の日です。次の FOMC の会合は、FRB の日程表で 2026-12-08〜09 です。'
});

CN.add('layers', 'c23-stack', {
  title: '金利の並び：実施の指示の値を高い順に並べた図（値は表 c23-now と同じ。確認日 2026-11-15）',
  hint: '部位を押すと、決めた主体・適用日・原文の語が出ます。この図は値の位置を示すだけで、仕組みは第16章です。',
  ends: ['高い側（上）', '低い側（下）'],
  kinds: { ue: '中央銀行の金利・指示', pol: 'FOMC が示す目標の範囲' },
  layers: [
    { id: 'upper', name: '上の端', h: 64, parts: [
      { id: 'repo', name: '常設のレポ', sub: '4.0 percent', kind: 'ue', desc: '常設のレポ（standing overnight repurchase agreement operations）の rate。FOMC がデスクに指示した値。', role: 'FOMC の指示（効力 2026-10-29）', note: '値と適用日は表 c23-now の行 4。', ch: [18] },
      { id: 'pc', name: 'primary credit rate', sub: '4.0 percent', kind: 'ue', desc: 'primary credit の貸出の金利。理事会が承認した。', role: '理事会の決定（2026-10-28 に existing level で承認）', note: '4.0 percent は 2026-09-16 の実施の指示で、2026-09-17 から（effective September 17, 2026）。', ch: [18] },
      { id: 'top', name: '目標の範囲の上限', sub: '4 percent', kind: 'pol', desc: 'フェデラル・ファンド金利の目標の範囲（3-3/4 から 4 percent）の上の端。', role: 'FOMC の決定（2026-10-28 に維持）', note: '', ch: [16] }
    ] },
    { id: 'iorb', name: '真ん中', h: 64, kind: 'ue', desc: 'IORB（interest rate paid on reserve balances）。理事会が全員一致で、3.90 percent を維持した。', role: '理事会の決定（effective October 29, 2026）', note: '付利の仕組みは第14章。', ch: [14] },
    { id: 'lower', name: '下の端', h: 64, parts: [
      { id: 'rrp', name: 'ON RRP', sub: '3.75 percent', kind: 'ue', desc: 'ON RRP の offering rate。取引相手ごとに 1 日 $160 billion の上限（原文）。', role: 'FOMC の指示（効力 2026-10-29）', note: '', ch: [16] },
      { id: 'bottom', name: '目標の範囲の下限', sub: '3-3/4 percent', kind: 'pol', desc: 'フェデラル・ファンド金利の目標の範囲の下の端。', role: 'FOMC の決定（2026-10-28 に維持）', note: '', ch: [16] }
    ] }
  ]
});

CN.add('flow', 'c23-fomc', {
  title: 'FOMC の会合 1 回の公表物（確認日の FRB のページの記載。時刻は 2026-09-16・10-28 の声明の例）',
  direction: 'auto',
  steps: [
    { id: 'cal', name: '日程の公表', sub: 'FRB', kind: 'pol', desc: 'FOMC の会合の日程は、FRB の日程表（FOMC Meeting Calendars and Information）に載る。各会合の日は、直前の会合で確認されるまで暫定（tentative）。', outputs: ['会合の日程'], ch: [28] },
    { id: 'meet', name: '会合', sub: 'FOMC', kind: 'ue', desc: '委員 12 人が、金融政策の姿勢（目標の範囲）を決める。定例の会合は年 8 回。', inputs: ['日程表の会合'], outputs: ['決定'] },
    { id: 'stmt', name: '声明', sub: 'FOMC', kind: 'ue', desc: '決定を伝える文書。2026-09-16 と 2026-10-28 の声明は午後 2 時（米東部夏時間、原文は 2:00 p.m. EDT）に公表された。', outputs: ['目標の範囲の決定'], next: ['impl', 'sep'] },
    { id: 'impl', name: '実施の指示', sub: 'FOMC・理事会', kind: 'ue', desc: 'Implementation Note。FOMC がデスクに出す指示（ON RRP・常設のレポ・SOMA の運営）と、理事会が決める IORB・primary credit rate を書く。声明と同じ日に公表され、効力は翌日（2026-10-28 の実施の指示は 2026-10-29）。', inputs: ['決定'], outputs: ['IORB・ON RRP・常設のレポ・primary credit rate・SOMA の運営'], caution: '決定日（声明）と適用日（実施の指示の効力）は別。', next: 'desk' },
    { id: 'desk', name: 'デスクの運営', sub: 'NY 連銀', kind: 'ue', desc: 'NY 連銀の公開市場デスクが、ON RRP・常設のレポ・SOMA の取引を実施する。短期国債の買入れの予定は毎月公表される。', inputs: ['実施の指示'], outputs: ['オペの結果と予定の公表'], ch: [15] },
    { id: 'min', name: '議事要旨', sub: 'FOMC', kind: 'pol', desc: '定例の会合の議事要旨は、政策決定の日から 3 週間後に公表される（FRB の日程表の記載）。', outputs: ['議事要旨'], end: true },
    { id: 'sep', name: '経済見通しの資料', sub: 'FOMC', kind: 'pol', desc: '日程表で * の付いた会合（2026 年は 3 月・6 月・9 月・12 月）に、Projection Materials（SEP と呼ばれる経済見通しの要約）が付く。', outputs: ['Projection Materials'], row: 1, col: 2, end: true }
  ]
});

CN.add('quiz', 'c23-quiz', { items: [
  { q: 'IORB が目標の範囲の中の値になっている理由として、FRB の説明に合うものはどれですか。',
    c: ['IORB は、法令で、目標の範囲の上限と同じ値に決められているから', 'IORB は、NY 連銀のオペの結果から自動で計算されるから', 'IORB は、銀行どうしの取引の平均として市場で決まるから', '理事会が、フェデラル・ファンド金利が FOMC の目標の範囲と整合する水準になるように、IORB を調整するから'],
    a: 3, why: '正答は「理事会が、フェデラル・ファンド金利が目標の範囲と整合する水準になるように IORB を調整する」です。FRB の IORB の説明は、IORB を理事会が決め、FOMC が目標の範囲を変えるときは通常 IORB も同じように変える、と書きます。IORB は法令や市場で決まる値ではありません。', ch: 23 },
  { q: 'FRB のページは、ON RRP をどのように説明していますか。',
    c: ['フェデラル・ファンド金利を制御するのを助ける、補助の政策の道具', '国債の発行を支える、財務省の資金調達の仕組み', '危機のときだけ使う、預金取扱機関への貸出の制度', '準備預金に付利する制度の別名'],
    a: 0, why: '正答は「フェデラル・ファンド金利を制御するのを助ける、補助の政策の道具」です。FRB のページは、ON RRP を「supplementary policy tool to help control the federal funds rate」と書き、FRB が証券を売って翌日に買い戻す取引と説明します。付利は IORB の仕組みで、別のものです（第14章）。', ch: 23 },
  { q: '実施の指示（Implementation Note）の文には、FOMC がデスクに出す指示のほかに、どの決定が書かれていますか。',
    c: ['NY 連銀の総裁だけが決める、SOMA の売却の日程', '理事会が決める、IORB と primary credit rate の決定', '財務省が決める、国債の入札の計画', '次の FOMC の会合の議題'],
    a: 1, why: '正答は「理事会が決める IORB と primary credit rate の決定」です。2026-10-28 の実施の指示は、FOMC が「directs the Desk to」と書く指示と、理事会が「voted unanimously」と書く決定の両方を載せます。声明は目標の範囲などの委員会の決定を述べる文書で、デスクへの指示の文は実施の指示に書かれます。', ch: 23 }
]});

CN.glossary([
  { t: '連邦公開市場委員会', en: 'Federal Open Market Committee, FOMC', alias: 'FOMC・声明・実施の指示・Implementation Note', d: '米国の金融政策の姿勢を決める委員会です。理事と連邦準備銀行の総裁で構成され、決定は声明と実施の指示で公表されます。', ch: [23] },
  { t: '目標の範囲', en: 'target range for the federal funds rate', alias: 'フェデラル・ファンド金利の誘導目標・target range', d: 'FOMC が定める、フェデラル・ファンド金利の幅です。1 つの値でなく、下限と上限の組で示されます。', ch: [23] },
  { t: 'SOMA', en: 'System Open Market Account', d: '連邦準備制度が公開市場操作で買い入れた資産を持つ口座です。NY 連銀が FOMC のために取引を実施します。', ch: [23] }
]);

CN.mapping('fed', [
  { a: 'FRB の現在の目標の範囲・IORB・ON RRP・常設のレポ・primary credit rate', b: 'FRB『Implementation Note』（2026-10-28、効力 2026-10-29）。NY 連銀『FAQs: Reverse Repurchase Agreement Operations』『FAQs: Standing Repurchase Agreement Operations』', note: '値は第23章だけが書く。決定日（声明）と適用日（実施の指示）を分けて読む。', ch: [23] },
  { a: 'FOMC の会合の日程と公表物（声明・実施の指示・議事要旨）', b: 'FRB『FOMC Meeting Calendars and Information』', note: '各会合の日は直前の会合まで暫定。議事要旨は政策決定の日の 3 週間後。', ch: [23] }
]);

CN.exam([
  { part: '4', q: 'FOMC の実施の指示の短期国債の買入れの指示と、NY 連銀の文書が使う名前の関係として、正しいものはどれですか。',
    c: ['実施の指示の文に reserve management purchases の語があり、同じ語でデスクに指示している', 'FOMC の実施の指示は短期国債の買入れを指示し、NY 連銀の文書は、これを reserve management purchases と呼ぶ', '短期国債の買入れは理事会だけが決め、FOMC は関わらない', 'reserve management purchases は、エージェンシー証券を売却する手続きの名前'],
    a: 1, why: '正答は「実施の指示は短期国債の買入れを指示し、NY 連銀の文書は reserve management purchases と呼ぶ」です。実施の指示の文は「purchases of Treasury bills」と書き、reserve management purchases の語は使いません。NY 連銀の FAQ が、この買入れを reserve management purchases と呼び、実施の主体はデスクです。', ch: 23 },
  { part: '4', q: '目標の範囲を決める主体と、IORB を決める主体の組として、正しいものはどれですか。',
    c: ['目標の範囲は理事会、IORB は FOMC', '目標の範囲も IORB も NY 連銀', '目標の範囲は FOMC、IORB は理事会', '目標の範囲は NY 連銀のデスク、IORB は FOMC'],
    a: 2, why: '正答は「目標の範囲は FOMC、IORB は理事会」です。FRB の説明は、FOMC が目標の範囲を決め、理事会が IORB を調整すると書きます。NY 連銀のデスクは、FOMC の指示を実施する主体で、目標の範囲も IORB も決めません。', ch: 23 }
]);
