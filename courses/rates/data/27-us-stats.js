/* 第27章のデータ。事実確認表：facts/27-us-stats.md（担当 RF、確認 2026-11-15）。
   第5部の決まり：統計の値は書かない。名前・公表者・頻度・時刻・時点・単位・ページだけを書く。
   FRB の現在の政策の値は第23章が持ち主。この章に書かない。
   この章に式はない。演習の照合は facts/27-us-stats.md の「演習の照合（第27章）」に置く。 */

CN.add('table', 'c27-stats', {
  title: '米国の統計の早見表（H.4.1 を除く）：名前・公表者・頻度と時刻・時点・単位・ページ（確認日 2026-11-15）',
  caption: '出典：FRB『H.8』、NY 連銀『SOFR』『EFFR』『Additional Information about Reference Rates』『Reverse Repo』、米財務省 Fiscal Service『Daily Treasury Statement』（各行の詳細に URL）。時刻は各ページの記載の語。値は載せない',
  cols: ['統計の名前', '公表者', '頻度と時刻（ページの記載）', '時点', '単位', '何を載せるか'],
  rows: [
    ['H.8（Assets and Liabilities of Commercial Banks in the United States）', 'FRB', '毎週金曜、4:15 p.m.まで（金曜が連邦の祝日なら木曜）', '週（表の列は Week ending）', 'billions of dollars（2026-09-04 の版の表。季節調整済みと季節調整なしの表がある）', '米国の商業銀行の資産と負債の、週次の推計'],
    ['SOFR（Secured Overnight Financing Rate）', 'NY 連銀', '毎営業日、約 8:00 a.m. ET', '価値日の翌営業日に公表', 'ページに記載なし', '金利。1・25・75・99 のパーセンタイルと取引量も公表'],
    ['EFFR（Effective Federal Funds Rate）', 'NY 連銀', '毎営業日、約 9:00 a.m. ET（前営業日の金利）', '前営業日', 'ページに記載なし', '金利。1・25・75・99 のパーセンタイルと取引量も公表'],
    ['ON RRP の結果（Overnight Reverse Repo）', 'NY 連銀', 'オペの時間は毎営業日 12:45〜1:15 p.m. ET。結果の公表の時刻は、確認したページに記載なし', '各営業日のオペ', '確認したページに記載なし', 'オペの結果（Historical Transaction Data へのリンクがある）'],
    ['Daily Treasury Statement（DTS）', '米財務省 Fiscal Service', '翌営業日の 4:00 p.m.まで（原文は by 4:00 p.m. the following business day）', '日付つきの statement', 'ページに記載なし', '現金と債務の動き。表 I「Operating Cash Balance」に TGA の期首・期末の残高'],
    ['H.4.1（第26章）', 'FRB', '毎週木曜、通常 4:30 p.m.', '水曜の値と週平均の列', 'Millions of dollars', 'FRB のバランスシートと、準備に影響する要因']
  ],
  detail: [
    'About のページ（最終更新 2024-03-08）は、H.8 を「an estimated weekly aggregated balance sheet for all commercial banks in the United States」と説明する。表の週の列の値が水曜の値か週平均かは、確認した範囲に記載がない。',
    'SOFR のページは「at approximately 8:00 a.m. ET」と書く。Additional Information のページは「published one business day following its value date」と書き、同日の改定は午後 2:30 ごろ、変化が 1 bp を超えるときだけ。両ページの関係は、どちらにも説明がない。',
    'EFFR は前営業日の金利を約 9:00 a.m.に公表する。改定は同じ日の午後 2:30 ごろ、公表した金利が 1 bp を超えて変わる場合だけで、脚注が付く。',
    'ON RRP の仕組みと現在の offering rate は第23章。この行は「結果を載せるページ」の案内だけで、結果の公表の時刻は確認できなかった。',
    '注記の原文は「The Daily Treasury Statement (DTS) is available by 4:00 p.m. the following business day on the Fiscal Service website」。TGA は第24章。',
    'H.4.1 の詳しい読み方は第26章。この表では、他の統計と並べるために行を置く。'
  ],
  note: 'SOFR と EFFR の定義は第06章、DTS と TGA は第24章、H.4.1 は第26章が持ち主です。値は書いていません。確かめるときは、各ページを開いてください。'
});

CN.add('compare', 'c27-h41-h8', {
  title: 'H.4.1 と H.8：対象・時点・推計か集計か',
  caption: '出典：FRB『H.4.1』（2026-11-12 公表）と『H.4.1 About the Release』（更新 2015-06-04）、『H.8 About the Release』（更新 2024-03-08）、H.8 の 2026-09-04 の版。確認日 2026-11-15。値は書かない',
  colA: 'H.4.1（第26章）', colB: 'H.8', colNote: '出典・注意',
  rows: [
    { a: 'FRB 自身の勘定。各連邦準備銀行と 12 行を合わせたバランスシート、準備残高に影響する要因の表', b: '米国の商業銀行（国内で設立された銀行と外国関連の機関）の資産と負債', note: '対象の持ち主が違う。H.4.1 は中央銀行の側、H.8 は銀行の側。', ch: [26] },
    { a: '毎週木曜、通常 4:30 p.m.', b: '毎週金曜、4:15 p.m.まで（金曜が連邦の祝日なら木曜）', note: '曜日と時刻が違う。1 週間の中の順序は c27-day。', ch: [28] },
    { a: '第 1 表に「Averages of daily figures」と「Wednesday」の列。見出しに水曜の日付', b: '2026-09-04 の版の表の週の列は「Week ending」（水曜の日付）。値の基準（水曜の値か週平均か）は確認した範囲に記載なし', note: '「週」の値の基準を、記録に書く。H.8 は現行の版で確かめる。', ch: [26] },
    { a: 'FRB が持つ勘定のバランスシートで、表の値は Millions of dollars', b: '「an estimated weekly aggregated balance sheet」。約 850 行の任意の標本の報告を中心に推計し、標本の銀行は商業銀行の資産の約 90 percent。標本にない銀行は四半期の Call Report で補う', note: 'H.8 の週次の値は推計。標本の数は週ごとに変わる（About のページの記載）。', ch: [27] },
    { a: '季節調整の語は確認した範囲にない', b: '季節調整済みと季節調整なしの両方の表。表の単位は billions of dollars。季節要因は年 1 回更新', note: '同じ「週」の統計でも、単位（Millions と billions）と季節調整の扱いが違う。', ch: [27] }
  ],
  note: '2 つの統計を並べて読むときは、対象・時点・単位・季節調整の有無を、統計ごとに記録に残します。値は書いていません。'
});

CN.add('flow', 'c27-day', {
  title: '米国の統計の公表の流れ（1 営業日の朝から、週末へ）。時刻は、確認したページの記載があるものだけ',
  direction: 'auto',
  steps: [
    { id: 'sofr', name: 'SOFR', sub: 'NY 連銀', kind: 'ue', desc: '毎営業日、約 8:00 a.m. ET に公表（SOFR のページの記載）。金利に加えて、パーセンタイルと取引量が公表される（Additional Information のページ）。', outputs: ['SOFR、パーセンタイル、取引量'], ch: [6] },
    { id: 'effr', name: 'EFFR', sub: 'NY 連銀', kind: 'ue', desc: '毎営業日、約 9:00 a.m. ET に、前営業日の金利を公表。パーセンタイルと取引量も公表される。', outputs: ['EFFR（前営業日）、パーセンタイル、取引量'], caution: '同じ日の午後 2:30 ごろに、変化が 1 bp を超えるときだけ改定がある。' },
    { id: 'rrp', name: 'ON RRP のオペ', sub: 'NY 連銀', kind: 'ue', desc: 'オペの時間は毎営業日 12:45〜1:15 p.m. ET（NY 連銀の説明）。結果の公表の時刻は、確認したページに記載がない。', inputs: ['実施の指示（第23章）'], outputs: ['オペの結果'], caution: '結果の公表の時刻を、この章では書かない。' },
    { id: 'dts', name: 'DTS', sub: '米財務省 Fiscal Service', kind: 'ran', desc: '前営業日分を、翌営業日の 4:00 p.m.までに公表（注記の原文は by 4:00 p.m. the following business day）。TGA の残高が載る（第24章）。', outputs: ['TGA の期首・期末の残高'], ch: [24] },
    { id: 'h41', name: 'H.4.1', sub: 'FRB（毎週木曜）', kind: 'pol', desc: '毎週木曜、通常 4:30 p.m.。水曜の値と週平均を載せる（第26章）。', outputs: ['準備に影響する要因、各行のバランスシート'], ch: [26] },
    { id: 'h8', name: 'H.8', sub: 'FRB（毎週金曜）', kind: 'pol', desc: '毎週金曜、4:15 p.m.まで。金曜が連邦の祝日のときは木曜。商業銀行の資産と負債の、週次の推計。', outputs: ['商業銀行の週次の推計'], end: true }
  ]
});

CN.add('quiz', 'c27-quiz', { items: [
  { q: 'H.8 の週次の値が「推計」とされるのはなぜですか。',
    c: ['公表の時刻に間に合わせるため、H.4.1 の値を FRB が計算し直して求めているから', 'すべての銀行が、毎日の値を同じ形式で報告し、それをそのまま足し合わせているから', '値を丸めているだけで、集計の方法は H.4.1 と同じだから', '約 850 行の任意の標本の報告を中心に推計し、標本にない銀行は四半期の Call Report で補うから'],
    a: 3, why: '正答は「約 850 行の任意の標本の報告を中心に推計し、標本にない銀行は四半期の Call Report で補う」です。H.8 の About のページは「an estimated weekly aggregated balance sheet」と書き、標本は「voluntary authorized panel of 850」で、報告する銀行は商業銀行の資産の約 90 percent を占めると説明します。H.4.1 は FRB 自身の勘定で、H.8 は銀行の側の統計です。', ch: 27 },
  { q: 'NY 連銀が SOFR と EFFR で、金利と一緒に公表している項目はどれですか。',
    c: ['1・25・75・99 のパーセンタイルと、翌日物の取引量（10 億ドル単位に丸める）', '金利だけで、パーセンタイルも取引量も公表しない', '取引量だけで、パーセンタイルは公表しない', '各銀行の取引の相手の名前と、取引ごとの金利'],
    a: 0, why: '正答は「1・25・75・99 のパーセンタイルと、翌日物の取引量（10 億ドル単位に丸める）」です。NY 連銀の Additional Information のページは、どちらにも volume-weighted percentile（1・25・75・99）と取引量を載せると書きます。取引量は、その金利がどれだけの取引にもとづくかを知る手がかりになります。', ch: 27 },
  { q: '複数の統計をつなげて読むとき、最初に統計ごとに確かめることとして、合うものはどれですか。',
    c: ['公表の時刻が同じなら、時点も単位も同じとみなす', '時点（日付つきか、水曜の値か、週平均か）、単位、季節調整の有無', '単位は、どの統計も同じなので確かめない', '季節調整の有無は、H.8 を読むときだけ確かめる'],
    a: 1, why: '正答は「時点（日付つきか、水曜の値か、週平均か）、単位、季節調整の有無」です。DTS は日付つきの statement、H.4.1 は水曜の値と週平均、H.8 の表は週の列です。単位は Millions of dollars と billions of dollars で違い、H.8 は季節調整済みと季節調整なしの表を分けます。', ch: 27 }
]});

CN.glossary([
  { t: 'H.8', en: 'Assets and Liabilities of Commercial Banks in the United States', alias: '商業銀行の資産と負債', d: 'FRB が毎週公表する統計で、米国の商業銀行の資産と負債を推計して載せます。', ch: [27] },
  { t: 'Call Report', en: 'Call Report', alias: 'コール・レポート・銀行の四半期報告', d: '銀行が四半期ごとに当局へ出す報告です。商業銀行の週次の統計では、標本にない銀行の値を補うのに使われます。', ch: [27] },
  { t: '季節調整', en: 'seasonal adjustment', alias: '季節調整済み・季節調整なし', d: '毎年くり返す季節の動きを取り除いて、前の期間と比べやすくする統計の処理です。取り除く前の値と、取り除いた後の値は、別の値です。', ch: [27] },
  { t: 'パーセンタイル', en: 'volume-weighted percentile', alias: '取引量で重みづけたパーセンタイル', d: '取引を金利の低い順に並べ、取引量の重みをつけて、全体の何割目の取引の金利かを示す値です。', ch: [27] }
]);

CN.mapping('fed', [
  { a: '商業銀行の資産と負債の週次の統計（H.8）', b: 'FRB『H.8』（毎週金曜、4:15 p.m.まで）', note: '推計。標本は約 850 行。表の単位は billions of dollars。値は書かず、現行の版で確かめる。', ch: [27] },
  { a: '指標金利の公表（SOFR・EFFR）と ON RRP のオペ', b: 'NY 連銀『SOFR』『EFFR』『Reverse Repo』', note: 'SOFR は約 8:00 a.m. ET、EFFR は約 9:00 a.m. ET。ON RRP の結果の公表の時刻は確認できていない。', ch: [27] }
]);

CN.exam([
  { part: '5', q: 'H.8 と H.4.1 の違いとして、最も適切なものはどれですか。',
    c: ['どちらも FRB 自身のバランスシートの統計で、公表の曜日だけが違う', 'H.8 は米国の商業銀行の資産と負債の週次の推計、H.4.1 は連邦準備銀行のバランスシートと準備に影響する要因の統計', 'H.8 は日銀、H.4.1 は NY 連銀が公表する統計', 'H.8 は日次の確報、H.4.1 は月次の速報'],
    a: 1, why: '正答は「H.8 は米国の商業銀行の資産と負債の週次の推計、H.4.1 は連邦準備銀行のバランスシートと準備に影響する要因の統計」です。2 つの About のページが、それぞれの対象を説明します。公表の曜日は H.8 が金曜、H.4.1 が木曜で、単位も違います。', ch: 27 }
]);
