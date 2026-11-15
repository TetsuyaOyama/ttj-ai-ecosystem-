/* 第24章のデータ。事実確認表：facts/24-treasury-account.md（担当 RF、確認 2026-11-15）。
   演習 c24-tax の金額（100 百万ドル）はすべて架空。実在の TGA の残高・納税・国債の発行の額は書かない。
   この章に式はない（残高の変化は架空の足し引きだけ）。演習の照合は facts/24-treasury-account.md の「演習の照合（第24章）」に置く。 */

CN.add('seq', 'c24-tax', {
  title: '納税の 1 回：企業 A の納税で、銀行 B の準備が減り、政府の口座が増える（金額はすべて架空）',
  actors: [
    { id: 'firm', name: '企業 A', sub: '架空の納税者', kind: 'ext' },
    { id: 'bank', name: '銀行 B', sub: '架空の銀行', kind: 'core' },
    { id: 'cb', name: '中央銀行', sub: '準備と政府の口座を持つ', kind: 'ue' },
    { id: 'gov', name: '政府', sub: '財務省の口座（米国は TGA）', kind: 'ran' }
  ],
  steps: [
    { phase: '① 納税の指示', from: 'firm', to: 'bank', msg: '税 100 百万ドル（架空）を政府へ払う指示', lbl: '納税の指示', if: '振込の指示', ie: ['納税額（架空）'], what: '企業 A は、銀行 B の預金から、税を払う。金額 100 百万ドルは架空。', trap: 'この金額は架空。実在の納税の額ではない。' },
    { phase: '② 銀行の決済', from: 'bank', to: 'cb', msg: '銀行 B の準備から、政府の口座への支払を指示', lbl: '支払の指示', if: '決済の指示', ie: ['銀行 B の準備', '政府の口座'], what: '銀行 B は、中央銀行にある自分の口座（準備）から、政府の口座へ払う指示を出す。', ch: [13, 14] },
    { span: ['bank', 'cb'], note: '銀行 B の準備が 100 減る', msg: '準備が減る', what: '銀行 B の準備（中央銀行の預金）が 100（架空）減る。企業 A の預金も、銀行 B の帳簿で同じだけ減る。', trap: '準備が減るのは、銀行 B の中央銀行の口座。企業 A の預金とは別の勘定。' },
    { phase: '③ 政府の口座', from: 'cb', to: 'gov', msg: '政府の口座の残高が 100 増える', lbl: '政府の口座へ入金', if: '口座の記帳', ie: ['政府の口座（米国は TGA）の残高'], what: '中央銀行は、政府の口座に 100（架空）を入金する。準備と政府の口座は、どちらも中央銀行の負債。資金が、準備から政府の口座へ移った。', ch: [13] },
    { at: 'gov', note: '政府の口座が増え、準備が減った', msg: '結果', what: '他の要因が同じなら、中央銀行の負債の合計は変わらず、中身が「準備」から「政府の口座」へ移る。民間の側の準備は、この分だけ減る。', trap: '政府が支払うとき（国債の償還や給付など）は、逆向きに政府の口座が減り、準備が増える。' },
    { phase: '④ 統計に出る', from: 'cb', to: 'gov', msg: '日次の DTS と、週次の H.4.1 に出る', lbl: '統計の公表', dash: true, if: '公表', ie: ['DTS（米財務省）', 'H.4.1（FRB）'], what: '米国では、米財務省の Daily Treasury Statement が営業日ごとに TGA の残高を載せ、FRB の H.4.1 が毎週、「U.S. Treasury, General Account」と準備の残高を載せる（本文 §3）。日本では、営業毎旬報告の負債の部に政府預金が載る。', ch: [26, 27] }
  ]
});

CN.add('compare', 'c24-jp-us', {
  title: '政府預金（日本）と TGA（米国）：置き場所・公表の統計・時点',
  caption: '出典：日銀『営業毎旬報告（令和8年10月10日現在）』『日本銀行関連統計』、FRB『H.4.1』（2026-11-12 公表）、米財務省 Fiscal Service『Daily Treasury Statement』ほか。確認日 2026-11-15。値は書かない',
  colA: '日本（政府預金）', colB: '米国（TGA）', colNote: '出典・注意',
  rows: [
    { a: '日銀の負債の部の「政府預金」（営業毎旬報告の項目名）', b: '連邦準備銀行に置かれる米財務省の一般口座（Treasury General Account, TGA）。H.4.1 の項目名は「U.S. Treasury, General Account」', note: '営業毎旬報告（令和8年10月10日現在）、H.4.1（2026-11-12）。米国の TGA は H.4.1 で準備を吸収する要因（Factors absorbing reserve funds）の側に載る。', ch: [13, 26] },
    { a: '営業毎旬報告（単位は千円）。日銀の統計の一覧に「日本銀行の対政府取引」の項目もある（内容・頻度は確認していない）', b: 'Daily Treasury Statement（DTS）の「Operating Cash Balance」の表（TGA の Opening・Closing Balance）。H.4.1', note: '日銀『日本銀行関連統計』、Fiscal Service の DTS（2026-10-22 の版）。日本の統計の頻度と時刻は第25章で確かめる。', ch: [25, 27] },
    { a: '営業毎旬報告は「令和8年10月10日現在」のように、特定の日の現在の値（掲載は 2026-10-14）', b: 'DTS は日付つきの statement（例：Thursday, October 22, 2026）。H.4.1 は毎週木曜に公表し、「Averages of daily figures」と「Wednesday」の列を持つ', note: '時点が違う。DTS の注記は「available by 4:00 p.m. the following business day」。H.4.1 の公表は毎週木曜、通常午後 4 時 30 分（第26章）。', ch: [26] },
    { a: '政府預金の増減が、日銀当座預金を動かす（財政等要因。仕組みは第19章）', b: 'TGA の増減が、準備を動かす（H.4.1 の準備に影響する要因の表）', note: '他の要因が同じなら、政府の口座が増えると準備（当座預金）が減る。', ch: [19, 26] },
    { a: '—（この章では、債務上限に当たる制度を確かめていない）', b: '債務上限（debt limit）：「the maximum amount of money the Government is allowed to borrow without receiving additional authority from Congress」。DTS の表 IIIC「Debt Subject to Limit」', note: 'TreasuryDirect『Public Debt FAQs』。債務上限の定義は第09章。', ch: [9] },
    { a: '—（この章では、名前の変遷を確かめていない）', b: 'Fiscal Data の注記：DTS の「Federal Reserve Account」の語は「Treasury General Account (TGA)」に変えられた', note: 'Fiscal Data『Daily Treasury Statement (DTS)』。変更の日付は、確認したページに記載がない。', ch: [27] }
  ],
  note: '日本側の「—」は、この章で個別の公表ページを確かめていない項目です。値は書いていません。'
});

CN.add('quiz', 'c24-quiz', { items: [
  { q: 'TGA の残高が増えると、他の要因が同じなら、準備が減るのはなぜですか。',
    c: ['TGA と準備は、どちらも中央銀行の負債で、納税などで資金が銀行の準備から TGA へ移るから', '中央銀行が、TGA の増えた分だけ準備を取り上げる決まりがあるから', 'TGA は、準備の一部として数えられ、増えると準備の合計が減るから', 'TGA が増えると、銀行券の発行が自動的に増えるから'],
    a: 0, why: '正答は「どちらも中央銀行の負債で、納税などで資金が銀行の準備から TGA へ移る」です。納税では、銀行 B の準備が減り、政府の口座が増えます（架空の演習 c24-tax）。H.4.1 は TGA を、準備を吸収する要因の側に載せます。TGA は準備の一部ではありません。', ch: 24 },
  { q: 'DTS と H.4.1 の TGA の見方の違いとして、合うものはどれですか。',
    c: ['どちらも同じ機関が毎週木曜に公表し、時点の種類も同じである', 'DTS は米財務省（Fiscal Service）が日付つきの statement として公表し、H.4.1 は FRB が毎週木曜に公表して、水曜の値と週平均の列を持つ', 'DTS は週平均だけ、H.4.1 は日次だけを載せる', 'DTS は日銀が、H.4.1 は財務省が公表する'],
    a: 1, why: '正答は「DTS は米財務省が日付つきの statement として公表し、H.4.1 は FRB が毎週木曜に公表して、水曜の値と週平均の列を持つ」です。公表の主体・頻度・時点が違うので、同じ TGA でも、どちらの統計の、どの時点の値かを書いて使います。', ch: 24 },
  { q: '日本で、財政等要因が日銀当座預金を動かすのはなぜですか。',
    c: ['政府預金は、日銀の資産で、増えると当座預金も同じ向きに増えるから', '政府預金の増減は、当座預金とは無関係で、統計の見方だけの問題だから', '政府預金は日銀の負債で、政府と民間の受払いで増減すると、当座預金が反対向きに動くから', '財政等要因は、日銀の貸出の金利で決まるから'],
    a: 2, why: '正答は「政府預金は日銀の負債で、政府と民間の受払いで増減すると、当座預金が反対向きに動く」です。営業毎旬報告は、政府預金を負債の部に載せます。納税などで政府預金が増えると、民間の当座預金が減ります。仕組みの式は第19章です。', ch: 24 }
]});

CN.glossary([
  { t: 'TGA', en: 'Treasury General Account', alias: '米財務省の一般口座', d: '米財務省が連邦準備銀行に持つ口座です。納税や国債の発行代金が入り、政府の支払が出ます。', ch: [24] },
  { t: 'Daily Treasury Statement', en: 'Daily Treasury Statement, DTS', alias: 'DTS・日次の国庫の報告', d: '米財務省の現金と債務の動きを、営業日ごとにまとめて載せる報告です。', ch: [24] },
  { t: 'Operating Cash Balance', en: 'Operating Cash Balance (DTS table I)', alias: '運営現金残高', d: 'Daily Treasury Statement の第 I 表の題で、政府の口座の期首と期末の残高などを載せます。', ch: [24] }
]);

CN.mapping('ust', [
  { a: 'TGA の残高（日次）', b: '米財務省 Fiscal Service『Daily Treasury Statement』（Table I「Operating Cash Balance」）', note: '日付つきの statement。公表の注記は available by 4:00 p.m. the following business day。', ch: [24] },
  { a: '債務上限の対象の債務（Debt Subject to Limit）', b: '米財務省 Fiscal Service『Daily Treasury Statement』（Table IIIC）、TreasuryDirect『Public Debt FAQs』', note: '定義は第09章、DTS の表の名前は第24章。', ch: [24] }
]);

CN.mapping('boj', [
  { a: '政府預金（日銀の負債の部）', b: '日本銀行『営業毎旬報告』、『日本銀行関連統計』の「日本銀行の対政府取引」の項目', note: '営業毎旬報告の単位は千円。項目名は第13章・第25章、動かす仕組みは第19章。', ch: [24] }
]);

CN.exam([
  { part: '4', q: 'H.4.1 の準備に影響する要因の表で、「U.S. Treasury, General Account」は、どの側の要因に載りますか。',
    c: ['準備を供給する要因（Factors supplying reserve funds）の側', '準備の残高そのものの行（Reserve balances with Federal Reserve Banks）の中', '準備を吸収する要因（Factors absorbing reserve funds）の側', '表の外の注記だけ'],
    a: 2, why: '正答は「準備を吸収する要因（Factors absorbing reserve funds）の側」です。2026-11-12 公表の H.4.1 の第 1 表は、「Deposits with F.R. Banks, other than reserve balances」の下に「U.S. Treasury, General Account」を載せ、準備を吸収する要因の側に置きます。', ch: 24 }
]);
