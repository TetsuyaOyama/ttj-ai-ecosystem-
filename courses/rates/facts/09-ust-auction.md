# 第09章 事実確認表・演習の照合（担当 RC、確認 2026-11-15）

読者向けの本文には出さない。データ：`data/09-ust-auction.js`。確認の方法は、一次資料の個別ページを WebFetch で読み、語と数字を原文のまま写した（ページの内容を要約する道具で読んだので、重要な語は別の聞き方で確かめた）。入札の結果の値（利回り・落札額）は市場の水準なので、本文に書かない。

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 制度 | 【米国】米財務省の証券の募集の規則（31 CFR Part 356）は、入札の方式として、単一価格方式（single-price auction）と複数価格方式（multiple-price auction）を定義し、どちらの方式で行うかは、その入札の発表（announcement）で示される | — | 31 CFR Part 356 §356.20（eCFR、2026-10-23 時点の表示） | 米財務省 Bureau of the Fiscal Service『31 CFR Part 356 §356.20』 | https://www.ecfr.gov/current/title-31/subtitle-B/chapter-II/subchapter-A/part-356 | ○ | 2026-11-15 | 本文「入札の方式」、c09-jp-us、c09-quiz 問 1 |
| 2 | 制度 | 【米国】単一価格方式では、落札した応札者は全員、high yield に等しい価格を払う（「all successful bidders pay the price equal to the high yield」の趣旨） | — | 同上 §356.20 | 同上 | 同上 | ○ | 2026-11-15 | 本文「入札の方式」、c09-quiz 問 1・演習の照合 |
| 3 | 制度 | 【米国】1 つの利回り（割引率・ディスカウント・マージン）での競争入札の応札が募集額の 35％を超えると、35％に減らされる（§356.12(c)(2)。競争入札の総額には上限がない）。同じ入札で競争入札をしている者は非競争入札をできず（§356.12(b)(2)「You may not bid noncompetitively in an auction in which you are bidding competitively.」）、非競争入札をしている者は競争入札をできない（§356.12(c)(3)）。V1 が 2026-11-15 に e-CFR で再確認 | 35％ | 同上 §356.12(b)(2)・(c)(2)・(c)(3) | 米財務省 Bureau of the Fiscal Service『31 CFR Part 356 §356.12』 | 同上 | ○ | 2026-11-15 | 本文「競争入札と非競争入札」、c09-jp-us |
| 4 | 制度 | 【米国】非競争入札の応札額の上限は 1,000 万ドル（§356.12(b)(1)「You may not bid noncompetitively for more than $10 million.」）、落札額の上限も 1,000 万ドル（§356.22(a)「The maximum award to any noncompetitive bidder is $10 million.」）。どちらも、米財務省に直接保有する満期の証券の償還金の再投資の申込みだけで応札する場合は対象外。V1 が 2026-11-15 に e-CFR で再確認 | $10 million | 同上 §356.12(b)(1)・§356.22(a) | 米財務省 Bureau of the Fiscal Service『31 CFR Part 356 §356.22』 | 同上 | ○ | 2026-11-15 | 本文「競争入札と非競争入札」、c09-exam |
| 5 | 制度 | 【米国】プライマリー・ディーラー：NY 連銀のページは、プライマリー・ディーラーを、金融政策を実施する際の NY 連銀の取引相手（counterparties）と書き、公式口座の保有者（official account holders）の必要に応じてマーケットメイクを行い、米国債の入札に pro rata basis で応札する、と書く。一覧のページに社数と社名があるが、更新の日付がページに書かれていないので、社数は本文に書かない | — | NY 連銀のページ（2026-11-15 に閲覧。更新日の記載なし） | NY 連銀『Primary Dealers』 | https://www.newyorkfed.org/markets/primarydealers | ○ | 2026-11-15 | 本文「プライマリー・ディーラー」、c09-jp-us、c09-quiz 問 2 |
| 6 | 発表 | 【米国】米財務省は 2026-08-03 に『Treasury Announces Marketable Borrowing Estimates』を公表した。2026 年の 7〜9 月期と 10〜12 月期の借入れの見込みを示す発表で、四半期の借入れの発表（Quarterly Refunding）の詳細は 8 月 5 日に公表すると書く。見込み額は市場の量の値なので本文に写さない | 公表日 2026-08-03 | 2026-08-03 | 米財務省『Treasury Announces Marketable Borrowing Estimates』 | https://home.treasury.gov/news/press-releases/sb0584 | ○ | 2026-11-15 | 本文「入札の予定」、c09-auction |
| 7 | 発表 | 【米国】四半期の借入れの発表の例（2025-07-30 の Quarterly Refunding Statement）：満期になる民間保有の notes と bonds の借換え、入札の額の方針、次の発表の日付などの項目を含む。内容の中身（額・方針の値）は本文に写さない | 2025-07-30 | 2025-07-30 | 米財務省『Quarterly Refunding Statement』 | https://home.treasury.gov/news/press-releases/sb0212 | ○ | 2026-11-15 | 本文「入札の予定」、c09-auction、用語集 |
| 8 | 定義 | 【米国】入札の結果の表（Fiscal Data の Auction Results。例：2 年債、2025-10-27 のもの）の項目：Competitive／Noncompetitive、High Yield、Allotted at High、Median Yield、Low Yield、Tendered、Accepted、Primary Dealer・Direct Bidder・Indirect Bidder、Bid-to-Cover Ratio、SOMA、FIMA (Noncompetitive)。注：「All tenders at lower yields were accepted in full.」。Median は、落札した競争入札の額の 50％がその利回り以下となる利回り、Low は 5％がその利回り以下となる利回り。応札者の区分の定義は、原資料が Auction FAQs を参照と書くだけで、読めていない | — | 2025-10-27 の入札の結果の PDF（項目の語の確認のためだけ。値は書かない） | 米財務省 Fiscal Data『Auction Results（R_20251027_1）』 | https://fiscaldata.treasury.gov/static-data/published-reports/auctions-query/results/R_20251027_1.pdf | ○ | 2026-11-15 | 本文「入札の結果の項目」、c09-terms |
| 9 | 制度 | 【米国】債務上限（debt limit、debt ceiling）：議会が課す、連邦政府の債務残高の上限（「a restriction imposed by Congress on the amount of outstanding national debt that the federal government can have」の趣旨）。上限に達すると、連邦政府は債務残高を増やせない。議会が認めた extraordinary measures で、政府内の債務の一部を一時的に停止し、限られた期間、借入れを続けられる。条文（31 U.S.C. 3101）は読んでいない | — | Fiscal Data のページ（日付の記載なし。毎日更新のデータにリンク） | 米財務省 Fiscal Data『America's Finance Guide: National Debt』 | https://fiscaldata.treasury.gov/americas-finance-guide/national-debt/ | ○ | 2026-11-15 | 本文「債務上限」、c09-quiz 問 3、用語集 |
| 10 | 制度 | 【日本】国債市場特別参加者は、財務大臣が定める入札参加者で、欧米のプライマリー・ディーラー制度を参考に導入された（第 08 章の事実確認表 #9・#10 のとおり）。この章は比較のために名前だけ使う | — | 第 08 章の表に同じ | 財務省『国債市場特別参加者制度運営基本要領』 | https://www.mof.go.jp/about_mof/councils/meeting_of_jgbsp/20240425.pdf | ○ | 2026-11-15 | c09-jp-us |
| 11 | 一般知識 | bid-to-cover は、市場の説明では、応札額を落札額で割った比とされる。結果の表の注には定義が書かれていない | — | — | 債券市場の一般的な説明（数値なし） | — | — | 2026-11-15 | c09-terms（行の注に「一般知識」と明記） |
| 12 | 一般知識 | 債務上限の局面で TGA の残高がどう動くかは、この章は書かない（第 24 章が持ち主）。この章は、債務上限の名前と定義だけを置く | — | — | — | — | — | 2026-11-15 | 本文「債務上限」 |

確認できず書かなかった：
- 債務上限の根拠条文（31 U.S.C. 3101）の語。Fiscal Data の説明の語で書いた。
- TreasuryDirect の入札の説明のページ（robots の制限で取得できず）。入札の方式は 31 CFR Part 356 の条文で確かめた。
- 入札結果の表の応札者の区分（Primary Dealer・Direct Bidder・Indirect Bidder）、SOMA、FIMA の定義（原資料が Auction FAQs を参照と書くだけ。そのページは取得できず）。
- プライマリー・ディーラーの社数と社名（NY 連銀のページに更新日の記載がない）。NY 連銀の過去の方針のページ（2016 年、置き換え済み）は現行として使わなかった。
- 2026-10-15 の最終規則（91 FR 65456）による 31 CFR Part 356 の改正は、この章の本文に使っていない（本文の条文の引用は、2026-10-23 時点の eCFR の表示）。

演習の照合（第09章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id・手の番号） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| c09-quiz 問 1 | 単一価格方式では、規則が、落札した応札者は全員 high yield に等しい価格を払うと定めるから、全員が同じ利回りになる | 本文「入札の方式」、事実確認表 #1・#2 | 落札者は全員、high yield の価格を払う | ○ |
| c09-quiz 問 2 | プライマリー・ディーラーは、NY 連銀が金融政策を実施するときの取引相手で、公式口座の保有者のためにマーケットメイクを行い、国債の入札に pro rata basis で応札する | 本文「プライマリー・ディーラー」、事実確認表 #5 | 同じ | ○ |
| c09-quiz 問 3 | 債務上限は、議会が課す連邦政府の債務残高の上限で、達すると債務残高を増やせない | 本文「債務上限」、事実確認表 #9 | 同じ | ○ |
| c09-exam 1 | 非競争入札の落札額に上限（1,000 万ドル）がある | 本文「競争入札と非競争入札」、事実確認表 #4 | 非競争入札の落札額の上限は 1,000 万ドル | ○ |
| c09-auction（手 1・2） | 借入れの見込み → 四半期の借入れの発表 | 本文「入札の予定」、事実確認表 #6・#7 | 2026-08-03 の見込み、詳細は 8 月 5 日に公表と書かれた | ○ |
