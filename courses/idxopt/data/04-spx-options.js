/* 第04章のデータ。事実確認表・演習の照合：facts/04-spx-options.md（担当 OB、確認 2026-11-18）
Cboe の SPX・SPXW・XSP・SPXO の仕様のページと契約仕様（英語の原文の語を「」で引く）。Cboe のこれらのページには更新日の表記がない（© は著作権の表示）。SPX のページの「as of March 19, 2024」は Product Snapshot の時点。
例の数値（指数の水準・オプション価格・枚数）はすべて架空。実在の指数の水準・オプション価格・取引量は書かない。 */

CN.add('table', 'c04-specs', {
  title: 'SPX・SPXW・XSP の早見表（Cboe の仕様のページ。確認日 2026 年 11 月 18 日。ページに更新日の表記なし）',
  caption: 'Cboe の仕様のページ（SPX の仕様は Product Snapshot が as of March 19, 2024、Weeklys と XSP のページは更新日の表記なし）の語です。「」は原文の英語です。仕様は改定されるので、取引の前に仕様のページで確かめてください。取引量・オプション価格は書きません',
  cols: ['項目', 'SPX（標準の限月）', 'SPXW（ウィークリーと月末）', 'XSP（ミニ）', '読み方'],
  rows: [
    ['満期の曜日', '「3rd Friday」', '「Mon., Tue., Wed., Th., Fri., 3rd Fri. and Last Trading Day of Month」', '同じ（SPXW と同じ曜日）', 'SPXW と XSP は、満期の曜日が複数ある。'],
    ['決済の時（AM・PM）', '「AM」', '「PM」', '「PM」', '決済の時の違いは、次の節と c04-am-pm。'],
    ['行使の型', '「European」', '「European」', '「European」', '3 つとも、満期の日だけ権利を行使できる型。第05章。'],
    ['決済の種類', '「Cash」', '「Cash」', '「Cash」', '現金の受払い（差金決済）。'],
    ['乗数', '「100」（Product Snapshot の行）', '同じページ（SPX/SPXW）の「100」', '「Multiplier $100.」', '受払額は、オプション価格に乗数を掛けた額（ドル）。'],
    ['対象の大きさ', 'S&P 500', 'S&P 500', '「The Mini-SPX Index, based on 1/10th the value of the Standard & Poor\'s 500 Index (SPX).」', 'XSP は、SPX の 10 分の 1 の値を対象にした指数。'],
    ['取引の終わり', '「Trading in SPX options will ordinarily cease on the business day (usually a Thursday)」〔満期の日の前の営業日。午後 5 時（米東部時間）〕', '「Trading in SPXW options will ordinarily cease on the day of expiration, 4:00 pm ET」', '「The last trading day for Standard, Weekly and End-of-Month (EOM) XSP options is their expiration date.」', '満期の日に対して、いつ取引が終わるかが、商品で違う。'],
    ['通常の取引時間', '「9:30 a.m. to 4:15 p.m. (ET)」', '同じページの「9:30 a.m. to 4:15 p.m. (ET)」', '「Regular Hours: 8:30 a.m. to 3:15 p.m. (Chicago).」', 'XSP のページは Chicago の時刻で書く。時間帯の換算は、この章では行わない。'],
    ['Global Trading Hours', '「8:15 p.m. to 9:25 a.m. (ET)」', '同じ', '「Global Trading Hours: 7:15 p.m. to 8:25 a.m. (Chicago)」', '通常の取引時間の外の、夜から翌朝の時間帯。'],
    ['休日の扱い', '脚注：「In the case of a holiday on the settlement date, the settlement date is moved back one business day」', '同じ脚注（月曜日のウィークリーを除く）', '同じ脚注', '満期の日が休日のとき、満期の日が動く。月曜日は 1 営業日後ろ、ほかは 1 営業日前。'],
    ['ルート記号', '「SPX」', '「SPXW」', '「XSP」', '同じ「SPX」の一覧に、SPX と SPXW が並ぶ。'],
    ['清算', 'OCC（第22章）', 'OCC（第22章）', 'OCC（第22章。XSP の商品の一覧は確かめていない）', '取引所と清算機関は別。']
  ],
  detail: [
    'Cboe の比較表の「Settlement Date」の行です。SPX は「3rd Friday」、SPXW と XSP は「Mon., Tue., Wed., Th., Fri., 3rd Fri. and Last Trading Day of Month」です。脚注に、「no SPX EOW, Monday Weeklys, Tuesday Weeklys, Wednesday Weeklys or Thursday Weeklys will be listed that would have an expiration date that coincides with the expiration date of a traditional SPX option or SPX EOM option.」とあります。標準の SPX と満期の日が重なるウィークリーは、上場されません。',
    '比較表の「AM or PM Settlement」の行です。SPX が「AM」、SPXW と XSP が「PM」です。AM と PM の違いは、取引の終わりの時と、決済の値の決まる時です（c04-am-pm）。',
    '比較表の「Exercise Style」の行は、3 つとも「European」です。XSP のページは、「European - Mini-SPX Index options generally may be exercised only on the expiration date.」と書きます。',
    '比較表の「Settlement Type」の行は、3 つとも「Cash」です。XSP のページは、「Exercise will result in delivery of cash on the business day following expiration.」と書きます。',
    'SPX の仕様のページ（SPX/SPXW）は、乗数を「100」と書きます（取得した文字列では値がラベルの上に出るため、対応づけは、ページの並びからの読み取りです）。XSP のページは「Multiplier $100.」です。SPXO の契約仕様は「$100」です。比較表には乗数の行がありません。',
    'XSP の仕様のページの「Underlying」の行です。対象の指数は、SPX の 10 分の 1 の値です。乗数が同じなら、同じ割合のオプションの受払額は 10 分の 1 になります（c04-size）。',
    'SPX は、取引が満期の日の前の営業日（通常は木曜日）に終わり、決済の値は満期の日に計算されます（SPX の仕様のページ。午後 5 時は米東部時間）。SPXW は、満期の日の午後 4 時（米東部時間）に取引が終わります。XSP は、取引最終日が満期の日です。',
    'SPX・SPXW の仕様のページの「Regular Hours」の行です。ほかに「Curb」（4:15 p.m. to 5:00 p.m. (ET)）の行がありますが、この章では扱いません。',
    '比較表の脚注は、SPX・SPXO・SPXW・XSP の Global Trading Hours が、米東部時間の午後 8 時 15 分に始まり、午前 9 時 25 分に終わると書きます。XSP のページは、同じ時間帯を Chicago の時刻で書いています。',
    '比較表の脚注です。「In the case of a holiday on the settlement date, the settlement date is moved back one business day (e.g. from Friday to Thursday), with the exception of Monday Weeklys, where the settlement date will move forward one business day (i.e. Monday to Tuesday).」',
    '比較表の「Root Ticker Symbol」の行です。同じ「SPX」の一覧（Options Chain）に、ルート記号が SPX の商品と SPXW の商品があります。',
    'Cboe の『OCC and Investor Protection』は、「The Options Clearing Corporation® (OCC) issues substantially all Cboe options contracts.」と書きます。OCC の『Index Options』のページは SPX を挙げています。XSP が OCC の商品の一覧に名前で載っているかは、この章では確かめていません。'
  ],
  note: '【米国】Cboe の仕様のページの語です（確認日 2026 年 11 月 18 日）。ページに更新日の表記がないので、確認日の後の変更は、この表に入っていません。'
});

CN.add('compare', 'c04-am-pm', {
  title: 'AM の決済と PM の決済：取引の終わり・決済の値・満期の曜日（Cboe の仕様のページと契約仕様の語）',
  caption: 'AM の決済は SPX の標準の限月と、新しい SPXO。PM の決済は SPXW と XSP です（比較表の行「AM or PM Settlement」）。SPXO は、Cboe が 2026 年 11 月 9 日の記事で紹介した新しい商品で、最初の満期は 2026 年 11 月 18 日です。確認日 2026 年 11 月 18 日',
  colA: 'AM の決済（SPX の標準の限月・SPXO）', colB: 'PM の決済（SPXW・XSP）', colNote: '違いの意味',
  rows: [
    { a: '比較表：SPX は「AM」。SPXO は「AM, at the SPX opening settlement price」', b: '比較表：SPXW と XSP は「PM」', note: '決済の時の表示が違う。', ch: [4] },
    { a: '満期の曜日：SPX は「3rd Friday」。SPXO は「Wednesdays aligned to monthly VIX settlement」（最初の満期は 2026 年 11 月 18 日と 12 月 16 日）', b: '満期の曜日：「Mon., Tue., Wed., Th., Fri., 3rd Fri. and Last Trading Day of Month」', note: 'PM の決済の商品は、満期の曜日が多い。', ch: [4] },
    { a: '取引の終わり：満期の日の前の営業日の午後 5 時（米東部時間）。SPX は「(usually a Thursday)」、SPXO は「5:00 PM ET on the business day preceding the day」', b: '取引の終わり：SPXW は満期の日の午後 4 時（米東部時間）、XSP は取引最終日が満期の日', note: '取引が終わる日が、AM の決済では満期の日の前。', ch: [4] },
    { a: '決済の値（SPXO の契約仕様）：「The exercise-settlement value, SET, is calculated using the opening sales price in the primary market of each component security on the expiration date.」', b: '決済の値の決め方：仕様のページに説明がなく、この章では確かめていない', note: 'AM の決済（SPXO）は、満期の日の構成銘柄の始値から決済の値を計算する。SPX の標準の限月に同じ文があるかは、確かめていない。', ch: [4] },
    { a: '受払い：「SPXO exercise will result in delivery of cash on the business day following expiration.」（SPX は比較表の「Cash」）', b: '受払い：XSP は「Exercise will result in delivery of cash on the business day following expiration.」（比較表は「Cash」）', note: 'どちらも現金の受払い。', ch: [4] },
    { a: 'Cboe の 2026 年 11 月 9 日の記事：SPXO は「expire at the open of trading on their expiration date and settle to the SPX opening settlement price」', b: '（同様の記事の文は確かめていない）', note: 'AM の決済は、満期の日の取引の始まりに決済の値が決まる、という組み立て。', ch: [4] }
  ],
  note: '【米国】取引の終わりと決済の値の決まる時を、商品ごとに仕様のページで確かめます。'
});

CN.add('lab', 'c04-size', {
  title: 'SPX 型と XSP 型の大きさの実験台（指数の水準・オプション価格・枚数は架空）',
  disclaimer: '学習用の模型です。指数の水準・オプション価格・枚数はすべて架空で、実在の S&P 500・SPX・XSP の値ではありません。乗数は Cboe の仕様のページ（確認日 2026 年 11 月 18 日）の 100 ドルです。手数料・証拠金・税は含みません。実際の取引の判断には使えません。',
  experiments: [
    { id: 'size', label: '想定元本と受払額',
      intro: '架空の指数の水準とオプション価格を動かして、SPX 型と XSP 型の大きさを比べます。XSP 型は、対象が SPX 型の 10 分の 1 の水準で、乗数が同じ 100 ドルです。同じ割合のオプションでは、XSP 型のオプション価格は SPX 型の 10 分の 1 とします。',
      formula: '想定元本 ＝ 指数の水準 × 乗数。受払額 ＝ オプション価格 × 乗数 × 枚数。XSP 型は、指数の水準もオプション価格も SPX 型の 10 分の 1（乗数は同じ 100 ドル）',
      inputs: [
        { id: 'L', label: '指数の水準（SPX 型。架空）', unit: '', min: 500, max: 2000, step: 10, value: 1000, presets: [{ label: '1,000（演習）', value: 1000 }] },
        { id: 'p', label: 'オプション価格（SPX 型。架空）', unit: '', min: 1, max: 100, step: 1, value: 20, presets: [{ label: '20（演習）', value: 20 }] },
        { id: 'n', label: '枚数', unit: '枚', min: 1, max: 50, step: 1, value: 3, presets: [{ label: '3 枚（演習）', value: 3 }] }
      ],
      calc: [
        { id: 'M', expr: '100' },
        { id: 'nt1', expr: 'L * M' },
        { id: 'nt2', expr: '(L / 10) * M' },
        { id: 'c1', expr: 'p * M * n' },
        { id: 'c2', expr: '(p / 10) * M * n' }
      ],
      results: [
        { label: '想定元本（SPX 型）', expr: 'nt1', unit: 'ドル', digits: 0, big: true },
        { label: '想定元本（XSP 型）', expr: 'nt2', unit: 'ドル', digits: 0, big: true },
        { label: '受払額（SPX 型）', expr: 'c1', unit: 'ドル', digits: 0 },
        { label: '受払額（XSP 型。同じ割合のオプション）', expr: 'c2', unit: 'ドル', digits: 0 },
        { label: '大きさの比（SPX 型 ÷ XSP 型）', expr: 'nt1 / nt2', unit: '倍', digits: 1 }
      ],
      reads: [
        { text: 'XSP 型の想定元本と受払額は、SPX 型の 10 分の 1 です。乗数が同じでも、対象の指数が 10 分の 1 の水準だからです。' },
        { text: '受払額が小さいことは、損失が限定されることを意味しません。オプションの売りは、損失が限定されない場合があります。' }
      ],
      fig: { type: 'bar', alt: 'SPX 型と XSP 型の受払額（ドル。指数の水準・オプション価格・枚数は架空）の棒グラフ。XSP 型の棒は SPX 型の 10 分の 1 の長さになる', max: 'max(c1, 1) * 1.1', bars: [
        { label: 'SPX 型', expr: 'c1', unit: 'ドル', digits: 0, auto: 'ドル' },
        { label: 'XSP 型', expr: 'c2', unit: 'ドル', digits: 0, auto: 'ドル' }
      ] } }
  ]
});

CN.add('quiz', 'c04-quiz', { items: [
  { q: 'Cboe の仕様のページ（2026 年 11 月 18 日に確認）の語で、取引の終わりの違いとして正しいものはどれですか。', c: ['SPX の標準の限月は満期の日の前の営業日（通常は木曜日）の午後 5 時（米東部時間）に取引が終わり、SPXW は満期の日の午後 4 時（米東部時間）、XSP は満期の日に取引が終わる', 'SPX・SPXW・XSP のすべてが、満期の日の前の営業日に取引が終わる', 'SPX・SPXW・XSP のすべてが、満期の日の取引の終わりまで取引できる', 'SPX の標準の限月は満期の日の午後 4 時に、SPXW は前の営業日の午後 5 時に取引が終わる'], a: 0, why: '正答は「SPX の標準の限月は満期の日の前の営業日（通常は木曜日）の午後 5 時（米東部時間）に取引が終わり、SPXW は満期の日の午後 4 時（米東部時間）、XSP は満期の日に取引が終わる」です。AM の決済の SPXO の契約仕様は、決済の値を満期の日の構成銘柄の始値から計算すると書くので、取引は前の営業日に終わります。PM の決済の SPXW と XSP は、満期の日に取引が終わります。', ch: [4] },
  { q: 'S&P 500 と同じ作りの架空の指数の水準を 1,000 とします。SPX 型の乗数を 100 ドルとし、XSP 型は対象が SPX 型の 10 分の 1 の水準で乗数が同じ 100 ドルとすると、想定元本（水準 × 乗数）の組み合わせとして正しいものはどれですか。', c: ['SPX 型は 10,000 ドル、XSP 型は 100,000 ドル', 'SPX 型は 100,000 ドル、XSP 型は 10,000 ドル', 'SPX 型は 100,000 ドル、XSP 型も 100,000 ドル', 'SPX 型は 1,000 ドル、XSP 型は 100 ドル'], a: 1, why: '正答は「SPX 型は 100,000 ドル、XSP 型は 10,000 ドル」です。SPX 型は 1,000 × 100 ＝ 100,000 ドル、XSP 型は水準が 10 分の 1 の 100 なので 100 × 100 ＝ 10,000 ドルです。XSP の乗数は SPX と同じ 100 ドルで、小さいのは対象の指数の水準です。', ch: [4] },
  { q: '満期が月曜日から金曜日まで毎営業日にある SPXW や XSP で、満期を確かめるときの扱いとして適切なものはどれですか。', c: ['標準の SPX と同じ、第3金曜日だけと決めてよい', '休日は、どの曜日の満期でも 1 営業日後ろにずれるので、銘柄ごとに確かめる必要はない', '満期の曜日が複数あり、休日で満期の日が動く（月曜日は 1 営業日後ろ、ほかは 1 営業日前）ので、銘柄ごとに満期の日を確かめる', '満期は限月の名前の月の末日で、曜日は関係しない'], a: 2, why: '正答は「満期の曜日が複数あり、休日で満期の日が動く（月曜日は 1 営業日後ろ、ほかは 1 営業日前）ので、銘柄ごとに満期の日を確かめる」です。Cboe の比較表は、満期の曜日を月曜日から金曜日、第3金曜日、月末の取引日と書き、脚注で、休日は 1 営業日前に動く（月曜日のウィークリーは 1 営業日後ろ）と書きます。', ch: [4] }
]});

CN.glossary([
  { t: 'SPX', en: 'S&P 500 Index options', alias: 'SPXW・XSP・Mini-SPX', d: 'Cboe が上場する、S&P 500 を原資産とする指数オプションの標準の商品です。ウィークリー（SPXW）とミニ（XSP）は、満期の曜日や大きさが違う別の商品です。', ch: [4] },
  { t: 'AM の決済', en: 'AM settlement', alias: 'PM の決済', d: '決済の値を、満期の日の取引の始まりの値から決める方式です（Cboe の SPXO の資料の語）。取引は満期の日の前の営業日に終わります。満期の日に取引が終わる商品は、PM の決済と表示されます。', ch: [4] },
  { t: 'Global Trading Hours', en: 'Global Trading Hours', alias: 'GTH', d: 'Cboe が、通常の取引時間の外に設けている、米東部時間の夜から翌朝にかけての取引時間です。SPX・SPXW・XSP が対象です。', ch: [4] }
]);

CN.mapping('cboe', [
  { a: 'SPX・SPXW・XSP の満期・AM と PM・行使の型（比較表）', b: 'Cboe『S&P 500 Weeklys Options』（更新日の表記なし）', note: 'Settlement Date・AM or PM Settlement・Exercise Style の行（第04章）', ch: [4] },
  { a: 'SPX・SPXW の乗数・取引時間・取引の終わり', b: 'Cboe『S&P 500® Index Options Product Specifications』（Product Snapshot as of March 19, 2024）', note: '乗数「100」、Regular Hours・Global Trading Hours（第04章）', ch: [4] },
  { a: 'XSP の対象・乗数・取引最終日', b: 'Cboe『XSP Options Product Specification』（更新日の表記なし）', note: 'SPX の 10 分の 1 の値・乗数 100 ドル（第04章）', ch: [4] }
]);

CN.exam([
  { part: 1, q: 'Cboe の比較表（2026 年 11 月 18 日に確認）で、SPX・SPXW・XSP の 3 つに共通する点として正しいものはどれですか。', c: ['3 つとも、満期は第3金曜日だけである', '3 つとも、AM の決済である', '3 つとも、現金で決済するヨーロピアンのオプションで、違いは満期の曜日・AM と PM・大きさにある', '3 つとも、ETF の現物の株を受け渡す'], a: 2, why: '正答は「3 つとも、現金で決済するヨーロピアンのオプションで、違いは満期の曜日・AM と PM・大きさにある」です。比較表は、3 つとも「Settlement Type」が「Cash」、「Exercise Style」が「European」と書きます。満期の曜日は SPX が第3金曜日、SPXW と XSP が月曜日から金曜日などで、決済の時は SPX が AM、SPXW と XSP が PM です。', ch: [4] }
]);
