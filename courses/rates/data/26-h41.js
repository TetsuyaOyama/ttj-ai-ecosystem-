/* 第26章のデータ。事実確認表：facts/26-h41.md（担当 RF、確認 2026-11-15）。
   第5部の決まり：統計の値の例は、公表の画面の形を模した「架空」の表で示す。実在の値は書かない（確かめ方＝出典の場所だけ）。
   検算 架空の行の前週差: 5000 = 100000 - 95000
   検算 架空の準備の行の前週差: 20000 = 3000000 - 2980000
   演習の照合は facts/26-h41.md の「演習の照合（第26章）」に置く。 */

CN.add('ident', 'c26-h41', {
  title: 'H.4.1 の第 1 表の 1 行を分解する（公表の画面の形を模した架空の行。値は架空）',
  items: [
    { name: '第 1 表の行（架空の値）',
      full: '項目名　｜　Averages of daily figures：Week ended（今週の週平均）・Change from week ended（前週の週平均との差）・Change from week ended（前年の同じ週の週平均との差）　｜　Wednesday（水曜の値）　　単位：Millions of dollars（百万ドル）',
      summary: '1 本の行は、**項目名・週平均・週平均の差（前週・前年）・水曜の値**でできています。**差の列は週平均どうしの差**で、水曜の値の差ではありません。**どの列の値か**を書かずに数字だけを記録すると、後で比べられません。値は架空です。',
      where: 'FRB『H.4.1』の現行の版（https://www.federalreserve.gov/releases/h41/current/）の第 1 表。2026-11-12 公表の版では、「Averages of daily figures」の下に「Week ended Nov 11, 2026」「Change from week ended Nov 4, 2026」「Change from week ended Nov 12, 2025」が並び、その右に「Wednesday Nov 11, 2026」がある（Reserve Bank credit の行の値の並びで確かめた）。水曜の値どうしの前週差は、第 5 表（Change since Wednesday）にある。（出典：FRB『H.4.1』2026-11-12 公表の版。値は架空）', ch: [26, 24],
      parts: [
        { label: '項目名', val: 'U.S. Treasury, General Account', bits: '原文の項目名（英語のまま）', d: '米財務省の一般口座（TGA）の行。原文の名前で記録する。講座の言葉（TGA）に直した名前だけを残さない。', grp: 0 },
        { label: '週平均', val: '100,000', bits: 'Averages of daily figures：Week ended の値（架空）', d: '水曜で終わる 1 週間の日々の値の平均の列（見出しは「Week ended Nov 11, 2026」の形）。単位は Millions of dollars（百万ドル）。架空の値。', grp: 1 },
        { label: '前週差', val: '+5,000', bits: 'Change from week ended（前週）＝今週の週平均 − 前週の週平均（架空）', d: '100,000 − 95,000 ＝ +5,000（前週の週平均を 95,000 とした架空の足し引き）。週平均どうしの差で、水曜の値の差ではない。', grp: 2 },
        { label: '前年差', val: '（架空・省略）', bits: 'Change from week ended（前年の同じ週）', d: '前年の同じ週の週平均との差の列。これも週平均どうしの差。', grp: 2 },
        { label: '水曜の値', val: '110,000', bits: 'Wednesday の値（架空）', d: '水曜の日付の値の列（見出しは「Wednesday Nov 11, 2026」の形）。週平均とは別の値で、同じ週でも違うことがある。水曜の値と週平均を引き算しても、前週差にはならない。架空の値。', grp: 1 },
        { label: '単位', val: '百万ドル', bits: 'Millions of dollars', d: '表の単位は原文のまま Millions of dollars。為替の換算も、兆ドルへの書き換えも、記録のときにしない。', grp: 3 }
      ] },
    { name: '準備の残高の行（架空の値）',
      full: 'Reserve balances with Federal Reserve Banks　｜　週平均　｜　週平均の前週差　｜　週平均の前年差　｜　水曜の値　　単位：Millions of dollars',
      summary: '第 1 表の最後の行は、準備の残高です。その上に、**準備を供給する要因**と、**準備以外の吸収する要因**の合計の行があります。値は架空です。',
      where: 'FRB『H.4.1』現行の版の第 1 表の最後の行。準備を動かす要因は、図 c26-factors と表 c26-items で確かめる。（出典：FRB『H.4.1』2026-11-12 公表の版。値は架空）', ch: [26, 14],
      parts: [
        { label: '項目名', val: 'Reserve balances with Federal Reserve Banks', bits: '原文の項目名', d: '預金取扱機関が連邦準備銀行に持つ準備の残高の行。第 1 表の最後に載る。', grp: 0 },
        { label: '週平均', val: '3,000,000', bits: '架空', d: '架空の値。実在の準備の残高ではない。', grp: 1 },
        { label: '前週差', val: '+20,000', bits: '架空', d: '3,000,000 − 2,980,000 ＝ +20,000（前週の週平均を 2,980,000 とした架空の足し引き。この行の差は、上の要因の行の週平均の差と、読むときに照らす）。', grp: 2 },
        { label: '水曜の値', val: '3,020,000', bits: '架空', d: '架空の値。水曜の値と週平均が違うことがあるので、列を分けて記録する。', grp: 1 }
      ] }
  ]
});

CN.add('table', 'c26-items', {
  title: 'H.4.1 の主な項目の早見表（原文の項目名・見出し・意味・バランスシートの位置）',
  caption: '出典：FRB『H.4.1』2026-11-12 公表の版の第 1 表（項目名と見出しは原文）。「意味」は講座の説明（一般知識。第13章・第19章）。値は載せない',
  cols: ['項目名（原文）', '見出し（原文）', '意味', '第13章の勘定'],
  rows: [
    ['Securities held outright', 'Factors supplying reserve funds（Reserve Bank credit の内訳）', 'FRB が持つ証券（米国債・エージェンシー債・MBS）。増えると準備が増える方向', '資産'],
    ['Repurchase agreements', 'Factors supplying reserve funds（Reserve Bank credit の内訳）', 'FRB が証券を買い、後で売り戻す取引（常設のレポなど）。増えると準備が増える方向', '資産'],
    ['Loans（Primary credit など）', 'Factors supplying reserve funds（Reserve Bank credit の内訳）', '預金取扱機関などへの貸出。増えると準備が増える方向', '資産'],
    ['Currency in circulation', 'Factors absorbing reserve funds', '流通している通貨。増えると準備が減る方向', '負債'],
    ['Reverse repurchase agreements', 'Factors absorbing reserve funds', 'FRB が証券を売り、後で買い戻す取引の現金の額。内訳は Foreign official and international accounts と Others の 2 行。ON RRP（第23章）の取引もこの行に入る。増えると準備が減る方向', '負債'],
    ['U.S. Treasury, General Account', 'Factors absorbing reserve funds（Deposits with F.R. Banks, other than reserve balances の内訳）', '米財務省の一般口座（TGA）。増えると準備が減る方向', '負債'],
    ['Reserve balances with Federal Reserve Banks', '第 1 表の最後の行', '預金取扱機関が連邦準備銀行に持つ準備の残高', '負債']
  ],
  detail: [
    '第 1 表で「Reserve Bank credit」の下に、Securities held outright（U.S. Treasury securities の Bills・Notes and bonds・Inflation compensation、Federal agency debt securities、Mortgage-backed securities）が載る。値は書かない。保有証券の運営の指示は第23章、年表は第22章。',
    '「Repurchase agreements」の内訳は Foreign official と Others。常設のレポは FRB が証券を買う取引（第23章）。FIMA レポ（第18章）は、海外の公的機関向けの取引。',
    '「Loans」の内訳に Primary credit・Secondary credit・Seasonal credit などがある（第18章）。',
    '「Currency in circulation」は、準備を吸収する要因の側の行。銀行券は日銀でも負債の部の発行銀行券で、第19章の銀行券要因と同じ考え方。',
    '脚注（12）は「Cash value of agreements, which are collateralized by U.S. Treasury securities, federal agency debt securities, and mortgage-backed securities」。内訳は Foreign official and international accounts と Others。ON RRP の取引相手はプライマリー・ディーラーと RRP counterparties（NY 連銀の説明。第23章）で、海外の公的機関の口座とは別。表は、どの内訳が ON RRP かを書いていないので、記録には内訳の行名を原文のまま残す。',
    '「Deposits with F.R. Banks, other than reserve balances」の下に、Term deposits held by depository institutions、U.S. Treasury, General Account、Foreign official、Other が並ぶ。TGA の説明は第24章。',
    '第 1 表の最後の行。その上に「Total factors supplying reserve funds」と「Total factors, other than reserve balances, absorbing reserve funds」の行がある。準備の残高の意味は第14章。'
  ],
  note: '項目名は原文（英語）のまま記録します。値は書いていません。確かめるときは、現行の版の第 1 表を開いてください。'
});

CN.add('arch', 'c26-factors', {
  title: '準備に影響する要因の図：準備を増やす側と、減らす側（H.4.1 の第 1 表の見出しの語）',
  viewBox: [900, 340],
  initial: 'res',
  groups: [
    { label: '準備を供給する要因（Factors supplying reserve funds）', x: 5, y: 8, w: 270, h: 320 },
    { label: '準備を吸収する要因（Factors absorbing reserve funds）', x: 625, y: 8, w: 270, h: 320 }
  ],
  kinds: { ue: 'FRB の資産', core: '銀行の準備', ext: '通貨', db: 'リバース・レポ', ran: '米財務省の口座' },
  nodes: [
    { id: 'sec', label: 'Securities held outright', sub: '保有証券', kind: 'ue', x: 20, y: 50, w: 240, h: 60, desc: 'FRB が持つ証券（米国債・エージェンシー債・MBS）。増えると準備が増える方向（他の要因が同じ場合）。', role: '**準備を増やす**。', ch: [22, 23] },
    { id: 'rp', label: 'Repurchase agreements', sub: 'レポ取引（FRB が買う側）', kind: 'ue', x: 20, y: 135, w: 240, h: 60, desc: 'FRB が証券を買い、後で売り戻す取引。常設のレポなど。', role: '**準備を増やす**。', ch: [23] },
    { id: 'loan', label: 'Loans', sub: '貸出（Primary credit など）', kind: 'ue', x: 20, y: 220, w: 240, h: 60, desc: '預金取扱機関などへの貸出。', role: '**準備を増やす**。', ch: [18] },
    { id: 'res', label: 'Reserve balances', sub: '準備の残高', kind: 'core', x: 330, y: 130, w: 240, h: 80, desc: '預金取扱機関が連邦準備銀行に持つ準備の残高。第 1 表の最後の行。供給の要因が増えると増え、吸収の要因が増えると減る（他の要因が同じ場合）。', role: '**要因の結果として載る**。', ch: [14, 26] },
    { id: 'cur', label: 'Currency in circulation', sub: '流通している通貨', kind: 'ext', x: 640, y: 50, w: 240, h: 60, desc: '増えると準備が減る方向。', role: '**準備を減らす**。', ch: [19] },
    { id: 'rrp', label: 'Reverse repurchase agreements', sub: 'リバース・レポ（FRB が売る側）', kind: 'db', x: 640, y: 135, w: 240, h: 60, desc: 'FRB が証券を売り、後で買い戻す取引。内訳は Foreign official and international accounts と Others。ON RRP（第23章）の取引もこの行に入る。増えると準備が減る方向。', role: '**準備を減らす**。', ch: [23] },
    { id: 'tga', label: 'U.S. Treasury, General Account', sub: '米財務省の一般口座（TGA）', kind: 'ran', x: 640, y: 220, w: 240, h: 60, desc: '米財務省の口座。納税などで増えると準備が減る方向。', role: '**準備を減らす**。', ch: [24] }
  ],
  links: [
    { id: 'f1', a: 'sec', b: 'res', label: '増やす', plane: 'up', proto: '保有証券の買入れ', carries: '準備', desc: '証券を買い入れると、その代金が準備に入る。' },
    { id: 'f2', a: 'rp', b: 'res', label: '増やす', plane: 'up', proto: 'レポ取引', carries: '準備', desc: 'FRB が証券を買うと、代金が準備に入る。' },
    { id: 'f3', a: 'loan', b: 'res', label: '増やす', plane: 'up', proto: '貸出', carries: '準備', desc: '貸出を実行すると、貸出の額が準備に入る。' },
    { id: 'f4', a: 'res', b: 'cur', label: '減らす', plane: 'up', proto: '通貨の引き出し', carries: '準備', desc: '通貨が流通に出ると、その分の準備が減る。' },
    { id: 'f5', a: 'res', b: 'rrp', label: '減らす', plane: 'up', proto: 'リバース・レポ', carries: '準備', desc: 'FRB に資金を預けると、その分の準備が減る。' },
    { id: 'f6', a: 'res', b: 'tga', label: '減らす', plane: 'up', proto: '納税・国債の発行代金', carries: '準備', desc: '政府の口座へ資金が移ると、その分の準備が減る（第24章）。' }
  ]
});

CN.add('quiz', 'c26-quiz', { items: [
  { q: 'TGA と ON RRP が増えると、他の要因が同じなら、準備が減るのはなぜですか。',
    c: ['どちらも FRB の保有証券で、増えると準備の残高が自動的に削られるから', 'どちらも、H.4.1 の第 1 表で、準備を供給する要因の側に載る行だから', 'どちらも、H.4.1 の第 1 表で、準備を吸収する要因の側に載り、増えるとその分の資金が準備から移るから', 'どちらも、水曜の値ではなく、週平均の列にだけ載る行だから'],
    a: 2, why: '正答は「準備を吸収する要因の側に載り、増えるとその分の資金が準備から移る」です。H.4.1 の第 1 表は、「U.S. Treasury, General Account」と「Reverse repurchase agreements」を「Factors absorbing reserve funds」の側に載せます。他の要因が同じなら、これらが増えた分だけ準備が減る方向に働きます。', ch: 26 },
  { q: 'H.4.1 の「水曜の値」と「週平均」の使い分けとして、合うものはどれですか。',
    c: ['水曜の値も週平均も同じ値なので、どちらの列でもよい', '週平均は、公表の翌週にだけ出る確報で、水曜の値は速報である', '水曜の値は金額、週平均は割合を表す', '水曜の値は水曜の日付の 1 点の値、週平均は日々の値の平均で、記録には列の名前を残す'],
    a: 3, why: '正答は「水曜の値は水曜の日付の 1 点の値、週平均は日々の値の平均で、記録には列の名前を残す」です。H.4.1 の第 1 表には「Averages of daily figures」と「Wednesday」の列があり、別の値です。水曜の値と週平均を取り違えると、差の読み方が変わります。', ch: 26 },
  { q: 'H.4.1 の公表の曜日と時刻として、FRB のページの記載に合うものはどれですか。',
    c: ['毎週木曜、通常午後 4 時 30 分（公表の日が祝日のときは、翌営業日になることがある）', '毎週金曜、通常午後 4 時 15 分', '毎営業日、午前 8 時ごろ', '毎月の第 2 営業日'],
    a: 0, why: '正答は「毎週木曜、通常午後 4 時 30 分（公表の日が祝日のときは、翌営業日になることがある）」です。FRB のページは「released each Thursday, generally at 4:30 p.m.」と書きます。毎週金曜の午後 4 時 15 分は H.8（第27章）、毎営業日の午前 8 時ごろは SOFR（第06章・第27章）の公表です。', ch: 26 }
]});

CN.glossary([
  { t: 'H.4.1', en: 'Factors Affecting Reserve Balances', alias: '準備に影響する要因・Balance Sheet Developments', d: 'FRB が毎週公表する統計で、各連邦準備銀行と全体のバランスシートと、準備の残高に影響する要因を載せます。', ch: [26] },
  { t: '水曜の値', en: 'Wednesday level', alias: '週平均', d: 'H.4.1 の第 1 表で、水曜の日付の 1 点の値を載せる列です。日々の値の平均を載せる列とは別の値です。', ch: [26] },
  { t: 'Reserve Bank credit', en: 'Reserve Bank credit', alias: '連邦準備銀行信用', d: 'H.4.1 の第 1 表で、保有証券・レポ取引・貸出などをまとめた項目の名前です。準備を供給する要因の側に載ります。', ch: [26] },
  { t: '準備を供給する要因と吸収する要因', en: 'factors supplying and absorbing reserve funds', alias: 'Factors supplying reserve funds・Factors absorbing reserve funds', d: 'H.4.1 の第 1 表の見出しで、準備を増やす方向の項目と、減らす方向の項目を分けて載せる区分です。', ch: [26] }
]);

CN.mapping('fed', [
  { a: 'H.4.1（準備に影響する要因と連邦準備銀行の状態表）', b: 'FRB『H.4.1』（毎週木曜、通常午後 4 時 30 分）、『Federal Reserve Balance Sheet Developments』', note: '第 1 表の列は Averages of daily figures と Wednesday。単位は Millions of dollars。値は書かず、現行の版で確かめる。', ch: [26] }
]);

CN.exam([
  { part: '5', q: 'H.4.1 の値を記録するとき、あとで比べられるように残す項目として、最も適切な組はどれですか。',
    c: ['統計名・公表日・列の名前（Wednesday か Averages of daily figures か）・単位（Millions of dollars）', '値と、前年の同じ週の値だけ', '値と、ニュースの見出しの題だけ', '値と、講座の言葉に直した項目名だけ'],
    a: 0, why: '正答は「統計名・公表日・列の名前・単位」です。H.4.1 は列ごとに別の値（水曜の値と週平均）を載せ、単位は Millions of dollars で、項目名は原文（英語）です。これらを残さないと、後の版や別の統計と比べられません。', ch: 26 }
]);
