/* 第22章のデータ。事実確認表：facts/22-fed-history.md（担当 RF、確認 2026-11-15）。
   第22章は FRB の枠組みの年表の持ち主。評価をしない（spec §0.1-2）。金額は原文の単位（$ billion など）のまま、決定の主体（理事会・FOMC・NY 連銀）を書き分ける。
   現在の値は第23章。この章の過去の値（設置時の initial の値など）は、現在の値ではない。
   演習の照合は facts/22-fed-history.md の「演習の照合（第22章）」に置く。この章に式はない。 */

CN.add('route', 'c22-history', {
  title: 'FRB の保有資産の動きの年表（確かめた決定だけを置いた図。決定の日で区切る）',
  points: [
    { id: 'p2008', label: '2008-11-25', sub: '買入れの発表（理事会）' },
    { id: 'p2019a', label: '2019-01-30', sub: '十分な準備の声明（FOMC）' },
    { id: 'p2019b', label: '2019-10-11', sub: '短期国債の買入れ（NY 連銀）' },
    { id: 'p2020', label: '2020-03-15', sub: '買入れの声明（FOMC）' },
    { id: 'p2021', label: '2021-07-28', sub: '常設のレポの設置（理事会）' },
    { id: 'p2022', label: '2022-05-04', sub: '縮小の計画（FOMC）' },
    { id: 'p2025', label: '2025-12', sub: '縮小の終わりと短期国債の買入れ' },
    { id: 'p2026', label: '2026-10-28', sub: '直近の実施の指示（第23章）' }
  ],
  segs: [
    { id: 's1', from: 'p2008', to: 'p2019a', label: '2008〜2019 年', mode: 'store', d: '2008 年 11 月 25 日に、理事会が GSE の direct obligations と MBS を買い入れるプログラムを発表した。この間の個別の決定（買入れの追加・縮小の方針の文書）は、この図では区分しない。履歴のページは、2014 年 9 月の方針の文書を載せる。FOMC は 2017 年 6 月 14 日に、償還の上限（cap）を定めた付属文書を公表した。', docs: ['FRB 2008-11-25 の発表', 'FRB『History of the FOMC\'s Policy Normalization Discussions and Communications』'], ch: [17] },
    { id: 's2', from: 'p2019a', to: 'p2019b', label: '2019 年 1〜10 月', mode: 'store', d: '2019 年 1 月 30 日の声明は、準備が十分な体制を書いた。FOMC は 2019 年 7 月 31 日の声明で、保有証券の縮小を 8 月に終える（予定より 2 か月早く）と書いた。2019 年 9 月中旬の資金市場の緊張は、本文の第 3 節。この図では区分しない。', docs: ['FOMC 2019-01-30 の声明', 'FEDS Note 2020-02-27', 'NY 連銀 Staff Report No. 918'] },
    { id: 's3', from: 'p2019b', to: 'p2020', label: '2019 年 10 月〜2020 年 3 月', mode: 'store', d: 'NY 連銀は 2019 年 10 月 11 日の声明で、短期国債の買入れを 10 月中旬から始め、初期のペースは月 approximately $60 billion とした。目的は、準備を ample に保つこと。', docs: ['NY 連銀 2019-10-11 の声明'] },
    { id: 's4', from: 'p2020', to: 'p2021', label: '2020 年 3 月〜2021 年 7 月', mode: 'store', d: 'FOMC は 2020 年 3 月 15 日の声明で、国債を at least $500 billion、エージェンシー MBS を at least $200 billion 増やすと書いた。', docs: ['FOMC 2020-03-15 の声明'] },
    { id: 's5', from: 'p2021', to: 'p2022', label: '2021 年 7 月〜2022 年 5 月', mode: 'store', d: '2021 年 7 月 28 日に、理事会が常設のレポと FIMA レポを設けた（値は設置時の initial）。この間の買入れの扱い（2021 年 11 月・2022 年 1 月の文書）は、この図では区分しない。', docs: ['理事会 2021-07-28 の声明'] },
    { id: 's6', from: 'p2022', to: 'p2025', label: '2022 年 5 月〜2025 年 12 月', mode: 'store', d: 'FOMC は 2022 年 5 月 4 日の計画で、6 月 1 日から、月ごとの cap を決めて縮小を始めると書いた。2024 年 5 月 1 日の声明で 6 月から国債の cap を引き下げ、2025 年 3 月 19 日の声明で 4 月からさらに引き下げた。2025 年 10 月 29 日の実施の指示は、12 月 1 日から国債の元本をすべて再投資すると書いた。', docs: ['FOMC 2022-05-04 の計画', 'FOMC 2025-10-29 の実施の指示'], ch: [17] },
    { id: 's7', from: 'p2025', to: 'p2026', label: '2025 年 12 月〜2026 年 10 月', mode: 'store', d: 'FOMC は 2025 年 12 月 10 日の実施の指示で、短期国債の買入れで SOMA の保有を増やすと指示した（準備を ample な水準に保つため）。NY 連銀は、この買入れを reserve management purchases と呼び、2025 年 12 月 12 日に始めると発表した。', docs: ['FOMC 2025-12-10 の実施の指示', 'NY 連銀 2025-12-10 の声明'], ch: [23] }
  ],
  parties: [
    { k: 'a', label: '買入れ' },
    { k: 'b', label: '縮小（月ごとの cap）' },
    { k: 'd', label: 'この図では区分しない' }
  ],
  layers: [
    { key: 'hold', label: '保有資産の動き', note: '色は、各区間の始まりの決定の内容。確かめた決定だけで区切り、確かめていない区間は「区分しない」とした。', rows: [
      { label: 'SOMA の保有', by: { s1: 'd', s2: 'd', s3: 'a', s4: 'a', s5: 'd', s6: 'b', s7: 'a' } }
    ] }
  ]
});

CN.add('table', 'c22-events', {
  title: 'FRB の枠組みの決定の早見表（主体・名前・内容。確認日 2026-11-15）',
  caption: '出典：各行の文書（詳細に URL の題）。金額は原文の単位。「主体」は文書の発信者。一覧のページの記載のみの行は、その旨を詳細に書いた。評価はしない',
  cols: ['日付', '主体', '名前（原文）', '内容（原文の語）'],
  rows: [
    ['2008-11-25', '理事会（Board of Governors）', 'Federal Reserve announces it will initiate a program to purchase the direct obligations of housing-related GSEs and MBS', 'GSE の direct obligations を up to $100 billion、MBS を up to $500 billion 買い入れる'],
    ['2017-06-14', 'FOMC', 'FOMC issues addendum to the Policy Normalization Principles and Plans', '償還の上限（cap）を超える分だけ再投資する。国債の cap は月 $6 billion から始め、3 か月ごとに $6 billion ずつ上げて月 $30 billion まで。エージェンシー債・MBS は月 $4 billion から $20 billion まで'],
    ['2019-01-30', 'FOMC', 'Statement Regarding Monetary Policy Implementation and Balance Sheet Normalization', 'an ample supply of reserves の体制で、administered rates の設定で金利を制御し、active management of the supply of reserves is not required'],
    ['2019-07-31', 'FOMC', 'Federal Reserve issues FOMC statement', '「conclude the reduction of its aggregate securities holdings in the System Open Market Account in August, two months earlier than previously indicated」'],
    ['2019-10-11', 'NY 連銀', 'Statement Regarding Treasury Bill Purchases and Repurchase Operations', '短期国債の買入れを mid-October から、approximately $60 billion per month で始める。翌日物のレポ取引を daily、at least $75 billion per operation'],
    ['2020-03-15', 'FOMC', 'Federal Reserve issues FOMC statement', '国債を at least $500 billion、エージェンシー MBS を at least $200 billion 増やす'],
    ['2021-07-28', '理事会（Board of Governors）', 'Statement Regarding Repurchase Agreement Arrangements', '常設のレポ（Standing Repo Facility）と FIMA レポ（FIMA Repo Facility）の設置。値は initial（25 basis points、$500 billion、$60 billion）'],
    ['2022-05-04', 'FOMC', 'Plans for Reducing the Size of the Federal Reserve\'s Balance Sheet', 'Beginning on June 1。国債の cap は $30 billion→3 か月後に $60 billion per month、エージェンシー債・MBS は $17.5 billion→$35 billion per month'],
    ['2024-05-01', 'FOMC', 'Federal Reserve issues FOMC statement', 'Beginning in June、国債の monthly redemption cap を $60 billion から $25 billion へ下げる'],
    ['2025-03-19', 'FOMC', 'Federal Reserve issues FOMC statement', 'Beginning in April、国債の monthly redemption cap を $25 billion から $5 billion へ下げる'],
    ['2025-10-29', 'FOMC', 'Implementation Note issued October 29, 2025', '国債の cap $5 billion per month、エージェンシー証券 $35 billion per month。Beginning on December 1 に、国債の元本をすべて入札で再投資、エージェンシー証券の元本は短期国債へ再投資'],
    ['2025-12-10', 'FOMC', 'Implementation Note issued December 10, 2025', 'Treasury bills の買入れで SOMA の保有を増やす（to maintain an ample level of reserves）。効力 2025-12-11'],
    ['2025-12-10', 'NY 連銀', 'Statement Regarding Reserve Management Purchases Operations', 'reserve management purchases（RMPs）を 2025-12-12 に開始。最初の月の予定 approximately $40 billion in Treasury bills'],
    ['2026-10-28', 'FOMC', 'Federal Reserve issues FOMC statement / Implementation Note', '現在の運営の値は第23章（声明は maintaining ample reserves）']
  ],
  detail: [
    '出典：FRB『Federal Reserve announces it will initiate a program …』（2008-11-25）。発信者は Board of Governors。目的の文は「to reduce the cost and increase the availability of credit for the purchase of houses」。',
    '出典：FRB『FOMC issues addendum to the Policy Normalization Principles and Plans』（2017-06-14、2:00 p.m. EDT）。cap が上限に達した後は、その水準を保つ。',
    '出典：FRB『Statement Regarding Monetary Policy Implementation and Balance Sheet Normalization』（2019-01-30）。原文の語：in a regime in which an ample supply of reserves ensures that control over the level of the federal funds rate is exercised primarily through the setting of the Federal Reserve\'s administered rates, and in which active management of the supply of reserves is not required。',
    '出典：FRB『Federal Reserve issues FOMC statement』（2019-07-31）。履歴のページ（更新 2025-11-26）は、これを「intended to cease the runoff of its securities portfolio」と書く。',
    '出典：NY 連銀『Statement Regarding Treasury Bill Purchases and Repurchase Operations』（2019-10-11）。目的は「to maintain over time ample reserve balances at or above the level that prevailed in early September 2019」。',
    '出典：FRB『Federal Reserve issues FOMC statement』（2020-03-15、5 p.m. EDT）。',
    '出典：FRB『Statement Regarding Repurchase Agreement Arrangements』（2021-07-28）。常設のレポの minimum bid rate は initially 25 basis points、maximum operation size $500 billion、取引相手に primary dealers を含む。FIMA レポは initially 25 basis points、per counterparty limit $60 billion、取引相手は foreign official institutions。現在の値は第23章（第18章が仕組み）。',
    '出典：FRB『Plans for Reducing the Size of the Federal Reserve\'s Balance Sheet』（2022-05-04）。引用は「Beginning on June 1, principal payments from securities held in the SOMA will be reinvested」まで確認した。',
    '出典：FRB『Federal Reserve issues FOMC statement』（2024-05-01）。原文：Beginning in June, the Committee will slow the pace of decline of its securities holdings by reducing the monthly redemption cap on Treasury securities from $60 billion to $25 billion。エージェンシーの cap は $35 billion のまま（履歴のページの記載）。',
    '出典：FRB『Federal Reserve issues FOMC statement』（2025-03-19）。原文：Beginning in April, the Committee will slow the pace of decline of its securities holdings by reducing the monthly redemption cap on Treasury securities from $25 billion to $5 billion。履歴のページは「Beginning on April 1, 2025」と書く。',
    '出典：FRB『Implementation Note issued October 29, 2025』。directive の効力は 2025-10-30。12 月 1 日からの再投資の指示は、縮小の終わりにあたる（文書は「縮小を終える」とは書かず、再投資の指示として書く）。',
    '出典：FRB『Implementation Note issued December 10, 2025』。実施の指示の文に reserve management purchases の語はない。',
    '出典：NY 連銀『Statement Regarding Reserve Management Purchases Operations』（2025-12-10）。実施はデスク。原文：to maintain an ample level of reserves through purchases in the secondary market of Treasury bills。',
    '出典：FRB『Federal Reserve issues FOMC statement』（2026-10-28）。値は第23章。'
  ],
  note: '日付は文書の公表日（決定の日）です。cap の変更は、決定の日と効力の月（Beginning in June など）が違います。'
});

CN.add('quiz', 'c22-quiz', { items: [
  { q: '2019 年 9 月中旬の翌日物の金利の急上昇について、FRB の職員の FEDS Note（2020 年 2 月 27 日）は、背景をどう説明していますか。',
    c: ['FOMC が、同じ月に目標の範囲を大きく引き上げたから', '財務省の国債の発行が止まり、準備が増えすぎたから', '法人税の納付日と国債の発行の増加で、準備が大きく減ったことが背景にあるから', '銀行券の発行が急に増えたことが主な原因だから'],
    a: 2, why: '正答は「法人税の納付日と国債の発行の増加で、準備が大きく減ったことが背景にある」です。FEDS Note は「a large drop in reserves due to the corporate tax date and increases in net Treasury issuance」と書き、準備が 2 営業日で約 $120 billion 減ったと書きます。NY 連銀のスタッフ・レポートは、準備の不足など複数の要因を挙げます。この章は、この出来事を評価しません。', ch: 22 },
  { q: '2025 年 12 月 10 日の実施の指示が、短期国債の買入れを指示した目的として、FOMC の語に合うものはどれですか。',
    c: ['国債の価格を引き上げる目標を達成するため', '目標の範囲を引き上げるため', '財務省の国債の発行を直接支えるため', '準備を十分な水準に保つため（to maintain an ample level of reserves）'],
    a: 3, why: '正答は「準備を十分な水準に保つため」です。2025-12-10 の実施の指示は「to maintain an ample level of reserves」と書き、NY 連銀の声明も同じ語で目的を書きます。実施の指示の文は、この買入れを reserve management purchases とは呼びません（NY 連銀の文書の呼び方）。', ch: 22 },
  { q: 'この章の年表で、決定の主体（理事会・FOMC・NY 連銀）を書き分ける理由として、合うものはどれですか。',
    c: ['文書ごとに発信する主体が違い、どの主体の文書かで、決定か実施の説明かが分かれるから', '3 つの主体は同じ内容の文書を別々に出すから', '理事会だけが買入れを決め、FOMC と NY 連銀は発表の場所を提供するから', '主体を書くと、決定の評価ができるようになるから'],
    a: 0, why: '正答は「文書ごとに発信する主体が違い、どの主体の文書かで、決定か実施の説明かが分かれる」です。2008 年 11 月 25 日の買入れの発表は理事会、2019 年 10 月 11 日の短期国債の買入れの説明と 2025 年 12 月 10 日の reserve management purchases の声明は NY 連銀、2020 年 3 月 15 日の声明と各実施の指示は FOMC です。この章は主体を書き分けますが、決定の評価はしません。', ch: 22 }
]});

CN.glossary([
  { t: '準備の管理のための買入れ', en: 'reserve management purchases', alias: 'RMP・短期国債の買入れ', d: 'NY 連銀の文書が、準備を十分な水準に保つために短期国債などを買い入れる運営につける呼び名です。FOMC の実施の指示の文は、この語を使わず、短期国債の買入れと書きます。', ch: [22] },
  { t: '償還の上限', en: 'monthly cap on redemptions', alias: 'cap・キャップ', d: '保有資産の縮小の期間に、月ごとに償還を再投資せずに減らす額の上限です。上限を超える分は再投資されます。', ch: [22] },
  { t: 'エージェンシー証券', en: 'agency securities', alias: 'エージェンシー債・MBS', d: 'FRB の文書が使う、政府関連の機関の債券や、住宅ローン担保証券など、機関が関わる証券を指す語です。', ch: [22] }
]);

CN.mapping('fed', [
  { a: 'FRB の枠組みの年表（買入れ・縮小・短期国債の買入れ）', b: 'FRB『History of the FOMC\'s Policy Normalization Discussions and Communications』、各実施の指示、NY 連銀『Statement Regarding Reserve Management Purchases Operations』', note: '決定の主体（理事会・FOMC・NY 連銀）を書き分けて年表にする。評価はしない。', ch: [22] }
]);

CN.exam([
  { part: '4', q: '2025 年の FRB の保有証券の運営の変化について、実施の指示の記載に合うものはどれですか。',
    c: ['2025 年 10 月 29 日の実施の指示は、12 月 1 日から国債の元本をすべて入札で再投資すると書き、2025 年 12 月 10 日の実施の指示は、短期国債の買入れで SOMA の保有を増やすと書いた', '2025 年 12 月 10 日の実施の指示が、国債の償還の上限を新しく設けた', '2025 年 10 月 29 日の実施の指示が、reserve management purchases の開始を指示した', '2025 年 12 月 10 日の実施の指示が、エージェンシー証券の元本の再投資を止めた'],
    a: 0, why: '正答は「10 月 29 日の実施の指示は 12 月 1 日から国債の元本をすべて再投資すると書き、12 月 10 日の実施の指示は短期国債の買入れで SOMA の保有を増やすと書いた」です。reserve management purchases は NY 連銀の呼び名で、実施の指示の語は purchases of Treasury bills です。', ch: 22 }
]);
