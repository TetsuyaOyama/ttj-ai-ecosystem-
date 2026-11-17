# 第22章 事実確認表・演習の照合（担当 OB、確認 2026-11-18）

読者向けの本文には出さない。データ：`data/22-clearing-margin.js`。確認の方法：OCC・Cboe・JSCC の個別ページと PDF を WebFetch で読み、「」の語を写した（取得結果は要約器を通る。引用は取得結果の語）。OCC のページには更新日の表記がない。証拠金の方式の中身（SPAN・VaR・期待ショートフォール）は講座 B 第25章が持ち主で、この章は名前だけを原文で並べる。証拠金の額・指数の水準は書かない。この章に例の数値はない。

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 制度 | 【米国】OCC『Clearing』：「Through a novation process,」「OCC becomes the buyer for every seller and the seller for every buyer」。「As a registered clearing agency under SEC jurisdiction, OCC clears transactions for exchange-listed options,」（続きは security futures と OTC options）。「As a registered derivatives clearing organization under CFTC jurisdiction,」。「OCC has been designated as a 'systemically important' financial market utility under Title VIII of the Dodd-Frank Act.」「OCC clears the following products.」の一覧に「Index Options」「Weekly Options」。条件：ページに更新日の表記なし | — | 更新日の表記なし（確認 2026-11-18） | OCC『Clearing』 | https://www.theocc.com/Clearance-and-Settlement/Clearing | ○ | 2026-11-18 | 本文、c22-ccp、c22-jscc-occ、c22-quiz |
| 2 | 制度 | 【米国】Cboe『OCC and Investor Protection』：「The Options Clearing Corporation® (OCC) issues substantially all Cboe options contracts.」「OCC in effect becomes the buyer to every clearing member representing a seller.」「OCC's role is supported by a three-tiered safeguard system.」会員の証拠金（member margin）、「The third line of defense is the clearing members' contributions to the clearing fund.」。ページは SPX 等の指数オプションを名指ししない。条件：「©2026 Cboe Exchange, Inc.」の表示のみ | — | ©2026 の表示のみ（確認 2026-11-18） | Cboe『OCC and Investor Protection』 | https://www.cboe.com/investor-protection/ | ○ | 2026-11-18 | 本文、c22-ccp、c22-jscc-occ |
| 3 | 市場の規則 | 【米国】OCC『Margin Methodology』：「OCC's System for Theoretical Analysis and Numerical Simulations」（STANS®）、「The STANS methodology is used to measure the exposure of portfolios of options, futures and cash instruments」、基本の部分に「the risk measure known as 99% Expected Shortfall.」、「Under the STANS methodology, which went into effect in August 2006」、付録に「ES is computed at a 99.5% confidence levels …」（本文では 99.5％は書かない）、「will not be appreciably negative at a two-day horizon.」。条件：ページに更新日の表記なし | 99％（基本の部分）・2006 年 8 月 | 更新日の表記なし（確認 2026-11-18） | OCC『Margin Methodology』 | https://www.theocc.com/Risk-Management/Margin-Methodology | ○ | 2026-11-18 | 本文、c22-jscc-occ、用語集 |
| 4 | 発表 | 【日本】JSCC 2025-01-27『【投資者の皆様へ】VaR証拠金計算におけるオプション取引のシナリオ損益額に下限値を設定します』：「先物・オプション取引に係る取引証拠金計算方式（VaR方式）に関して、本年2月10日（月）の取引証拠金の計算分から、オプション取引のシナリオ損益額※の下限値として呼値の最小単位に取引単位を乗じた数値を設定することとします。」「当該数値が0円となる場合にのみ下限値が適用されます。」表：「日経225オプション／1／1,000／1,000円」「日経225ミニオプション／1／100／100円」（表の列の区切りを／に直した）。条件：発表日 2025-01-27、適用は 2025-02-10 の計算分から | 1,000 円・100 円 | 2025-01-27 | JSCC『VaR証拠金計算におけるオプション取引のシナリオ損益額に下限値を設定します』 | https://www.jpx.co.jp/jscc/information/news/20250127.html | ○ | 2026-11-18 | 本文、c22-jscc-occ |
| 5 | 市場の規則 | 【日本】JSCC・大阪取引所『上場デリバティブ2026年4月稼働案件に係る対応概要』：「現在、相殺制限は、ネットオプション価値（以下「NOV」）控除後の「VaR証拠金額」に適用する計算方法になっているところ、見直し後は、NOV控除前の「VaRリスク額」に適用します。」「これに伴い、「VaR証拠金額」は、制限付リスク相殺後の「VaRリスク額」からNOVを控除して算出します。」「VaRリスク額：ポテンシャル・フューチャー・エクスポージャーに相当、NOV:ネットオプション価値」。「「VaR方式により計算した証拠金額」は、NOV控除後の金額です。」条件：版の履歴の最新「3 2025/11/28」。表紙の日付は読み取れず、稼働後の現在の内容かは確かめていない | — | 版の履歴の最新 2025/11/28 | JSCC・大阪取引所『上場デリバティブ2026年4月稼働案件に係る対応概要』 | https://www.jpx.co.jp/jscc/seisan/sakimono/shokokin_seido/u89at3000000i04f-att/outline.pdf | ○ | 2026-11-18 | 本文、c22-jscc-occ、c22-quiz 問 2、用語集 |
| 6 | 市場の規則 | 【日本】JSCC『指数オプション取引の決済方法』：満期の差金は権利行使価格と SQ 値の差額の授受、取引代金は取引成立日の翌日に授受し値洗差金の授受はない（第05章の事実確認表 #3） | — | 更新日の表記なし | JSCC『指数オプション取引の決済方法』 | https://www.jpx.co.jp/jscc/seisan/sakimono/acceptance_debt/shisuu_op.html | ○ | 2026-11-18 | 本文、c22-ccp |
| 7 | 定義 | 清算機関・証拠金・方式の定義：講座 B 第23〜27章が持ち主（この章は定義し直さず、リンクだけ）。PFE：JSCC の資料の語「ポテンシャル・フューチャー・エクスポージャーに相当」を、本文で「VaRリスク額」に付けた語として使う（#5） | — | — | 講座 B（ird）の第23〜27章 | ../ird/#ch23〜#ch27 | × | 2026-11-18 | 本文 |

確認できず書かなかった：
- XSP を OCC が清算することを名指しした資料：Cboe の #2 のページは SPX・XSP を名指ししない。検証 X1（2026-11-18）が OCC『Index Options』（https://www.theocc.com/clearance-and-settlement/clearing/index-options）で「SPX options may be listed with up to 25-point intervals in the far-term months.」を確かめ、本文に「OCC のページは SPX を名前で挙げる。XSP の名前は確かめた範囲にない」と書いた（第04章の事実確認表 #7 と同じ）。
- JSCC の『証拠金』のページのモデルの名前（期待ショートフォール・VaR の注記）と、#4 の「VaR方式」の語の関係：講座 B 第25章の事実確認表 #1・#2 に任せ、この章で調整しない。
- 日経225オプションが JSCC の「指数オプション」のページの対象に入ること以外の、JSCC の法令上の所管：書かない。
- NOV の中身（どう計算されるか）：資料の語は「ネットオプション価値」だけで、定義の文はない。本文は定義せず、位置づけ（VaRリスク額から控除）だけを書く。
- OCC の証拠金の額・清算基金の額：書かない。Cboe のページの「billions」「hundreds of millions」の語も写さない。
- 2026 年 4 月稼働後の現在の計算方法：確かめていない。

演習の照合（第22章）
| 問・演習 | 正答（要点） | 照らした本文・図 | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| c22-quiz 問 1（a=2） | 清算機関は取引所・商品・国の制度ごとに決まり、日経225オプションは JSCC、Cboe 上場のオプションのほとんどは OCC が発行・清算する | 本文「日本と米国の清算の関係」、事実確認表 #2・#6 | 同じ | ○ |
| c22-quiz 問 2（a=3） | 制限付リスク相殺後の「VaRリスク額」から NOV を控除して「VaR証拠金額」を算出 | 本文「証拠金の計算」、事実確認表 #5 | 同じ（原文の文を写した） | ○ |
| c22-quiz 問 3（a=0） | SEC の所管の清算機関として上場オプションなど、CFTC の所管の清算機関として先物など | 本文「OCC の役割と所管」、事実確認表 #1 | 同じ | ○ |
| c22-exam 1（a=0） | OCC は SEC・CFTC の両方の所管の清算機関 | 事実確認表 #1 | 同じ | ○ |

定義と式の照合（第22章）
| 量 | 本文の定義の文 | 式 | 用語集の d | 演習・問の使い方 | 一致 |
|---|---|---|---|---|---|
| VaR証拠金額 | 制限付リスク相殺後の VaRリスク額から NOV を控除した額（JSCC の資料の語。計算はしない） | VaR証拠金額 ＝ 制限付リスク相殺後の VaRリスク額 − NOV | 正味のオプション価値の d：VaR証拠金額は、VaRリスク額からこの値を控除して算出 | 問 2 | ○ |
