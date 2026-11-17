# 第02章 事実確認表・演習の照合（担当 DB、確認 2026-11-15）

読者向けの本文には出さない。データ：`data/02-stir-mechanics.js`。確認の方法は、一次資料の個別ページを WebFetch で読み、規則・仕様の語を原文のまま写した（要約する道具で読んだので、重要な数字・語は「原文の文字どおり」を求める聞き方で確かめた）。実験台・演習の価格・金利・枚数はすべて架空。実在の金利・価格の現在の水準は書かない。

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 市場の規則 | 【CME】3 か月 SOFR 先物の規則（Rulebook Chapter 460）：取引の単位は「compounded daily Secured Overnight Financing Rate (SOFR) interest during the contract Reference Quarter」で、「each basis point per annum of such interest rate shall be worth $25 per futures contract」（Rule 46002.B）。最終決済の価格は「100 minus compounded daily SOFR during the contract Reference Quarter」、「Final Settlement Price = 100 minus R」、R ＝ [Πi=1…n {1+(di /360)*(ri /100)} − 1] x (360/D) x 100（Rule 46003.A.2）。R は「nearest 1/10,000th of one percent per annum」に丸め、0.00005 で終わる値は切り上げ（Rule 46003.A.3）。受渡しは「cash settlement」（Rule 46003）。条件：規則の本文に改正日・施行日の記載はなく、2026-11-15 に開いた版 | 25 ドル／bp、R は小数 4 桁（％） | 2026-11-15 に開いた版（改正日の記載なし） | CME『Rulebook Chapter 460 Three-Month SOFR Futures』 | https://www.cmegroup.com/rulebook/CME/V/450/460/460.pdf | ○ | 2026-11-15 | 本文「参照期間と最終決済の金利」「1 bp の価値」、c02-specs、c02-ref |
| 2 | 市場の規則 | 【CME】3 か月 SOFR 先物の参照四半期（Reference Quarter）：「begins on (and includes) the third Wednesday of the third calendar month preceding the contract delivery month」から、「the interval that ends on (and does not include) the third Wednesday of the contract delivery month」まで（Rule 46003.A.1）。例は、2022 年 3 月の受渡しなら 2021-12-15 から 2022-03-16（含まない）まで。最終取引日：「the Business Day immediately preceding the third Wednesday of the delivery month」（Rule 46002.G）。最小変動幅：標準 0.005 指数ポイント（12.50 ドル）、終了まで 4 か月以内は 0.0025 指数ポイント（6.25 ドル）（Rule 46002.C） | 参照四半期の始まりと終わりの日（第 3 水曜日） | 2026-11-15 に開いた版 | 同上 | 同上 | ○ | 2026-11-15 | 本文、c02-specs、c02-ref |
| 3 | 商品 | 【CME】1 か月 SOFR 先物（SR1）と 3 か月 SOFR 先物（SR3）の違い（CME の教育の記事『Understanding SOFR Futures』の語）：SR3 の参照は「Compounded daily SOFR interest during contract reference quarter」で 1 bp あたり 25 ドル（指数 1 ポイントあたり 2,500 ドル）。SR1 は「R = arithmetic average of SOFR during contract delivery month」で 1 bp あたり 41.67 ドル（指数 1 ポイントあたり 4,167 ドル）。SR3 は第 3 水曜日の直前の取引日に取引を終え、SR1 は受渡月の最後の取引日に取引を終える。SR1 の最小変動幅は 0.5 bp（20.835 ドル）で、受渡月が始まった後は 0.25 bp（10.4175 ドル）。条件：記事のメタデータの日付（ページ更新日の代わり）が 2026-06-25。仕様の細部（上場の数・時刻）は CME の仕様のページで確かめる | SR3 25 ドル／bp、SR1 41.67 ドル／bp | ページ更新日（メタデータ）2026-06-25 | CME『Understanding SOFR Futures』 | https://www.cmegroup.com/education/articles-and-reports/understanding-sofr-futures.html | ○ | 2026-11-15 | 本文、c02-specs |
| 4 | 商品 | 【CME】SR1 の最終決済の価格：「Contract-grade IMM Index evaluated at R = arithmetic average of daily SOFR during Delivery Month」、最終取引日は「Last Exchange Business Day of contract Delivery Month」。SR3：「Last Day of Trading: Exchange Business Day first preceding 3rd Wed of Delivery Month」。条件：文書に日付の記載はなく「Copyright © 2018 CME Group Inc.」と「PM264/0418」の表記のみ。SR1 の規則の本文（Chapter 461）は取得できず、SR1 の仕様は #3（2026-06-25）と合わせて書いた。現行の値は仕様のページで確かめる旨を本文に書く | SR1 41.67 ドル／bp | 版：文書の日付の記載なし（2018 年の著作権表示）。ページ更新日なし | CME『SOFR futures contract specifications』（教育の資料） | https://www.cmegroup.com/content/dam/cmegroup/education/files/sofr-futures-contract-specifications.pdf | ○ | 2026-11-15 | 本文、c02-specs |
| 5 | 商品 | 【大阪取引所】TONA 3 か月金利先物（商品概要）：「2023年5月29日にTONA3か月金利先物を上場いたしました。」価格：「「100-金利」といった価格表示方法はIMM指数方式と呼ばれて」いる。「差金決済型の先物」。取引時間は「翌朝6時まで」。参照期間は「金利参照期間一覧」（Excel）に掲載（本文は未取得）。ページの更新：2026/09/11 | 上場 2023-05-29 | ページ更新 2026/09/11 | 大阪取引所『TONA3か月金利先物（商品概要）』 | https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/index.html | ○ | 2026-11-15 | 本文「価格は「100 − 金利」」、c02-price |
| 6 | 商品 | 【大阪取引所】TONA 3 か月金利先物（制度概要）：取引単位「（100-TONA3か月金利）×25万円」、呼値の単位「0.0025 ポイント（1取引単位当たり625円=1億円×0.25年×0.0025%（1/4bps））」、限月「3月、6月、9月、12月の20限月取引」、取引最終日「各限月（3月、6月、9月、12月）の3か月後（6月、9月、12月、3月）の第3水曜日の前日（休業日に当たる場合は、順次繰り上げる。）」、決済方法「転売または買戻し」「最終決済（差金決済）」。ページの更新：2024/05/17 更新 | 25 万円／ポイント（1 bp は 2,500 円） | ページ更新 2024/05/17 | 大阪取引所『TONA3か月金利先物（制度概要）』 | https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/01.html | ○ | 2026-11-15 | 本文、c02-specs、c02-stir |
| 7 | 市場の規則 | 【大阪取引所】TONA 3 か月金利先物の紹介資料（Introduction to OSE TONA 3M Futures、2023 年 3 月）：取引単位（100－TONA3か月金利）×25万円、1 bp あたりの価値（DV01）は 2,500 円、金利参照期間は「各限月の第三水曜日から３か月後の第三水曜日の前日である火曜日まで」、取引最終日は各限月の 3 か月後の第三水曜日の前日（火曜日）、最終清算数値は「365／当該金利参照期間の実日数」を乗じて年利換算し、小数点以下第 5 位で四捨五入した数値を 100 から差し引く。最終決済は最終清算数値に基づく差金決済、最終決済日は最終清算数値を定める日（取引最終日の翌営業日）の翌営業日。条件：文書に発行日の記載はなく、ファイル名が 202303。上場予定日 2023-05-29 の記載あり（予定の時点の文書） | 参照期間の長さは約 3 か月（例の 2021 年 9 月限は 91 日） | 版：2023 年 3 月（ファイル名）。ページ更新日なし | 大阪取引所『Introduction to OSE TONA 3M Futures』 | https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/co3pgt0000003rxy-att/Introduction_to_OSE_TONA_3M_Futures_202303.pdf | ○ | 2026-11-15 | 本文、c02-specs、c02-ref |
| 8 | 市場の規則 | 【大阪取引所】TONA 3 か月金利先物のコンベンション・ルール（利息計算方式）：最終決済の金利は、参照期間の各営業日の TONA の確報値を日次累積複利で求める。式は ∏(1 + TONA_i × D_i / 365) − 1 に 365 / a（a は参照期間の実日数）を掛ける。丸めは「パーセンテージ・ベースで小数 5 桁目を四捨五入して小数 4 桁」。休業日は前営業日の確報値を複利計算せずに適用する。例：2021 年 9 月限を 100.0475 で 1 枚売り建て、参照期間 2021/9/15（水）から 2021/12/14（火）までの 91 日、最終清算数値 100.0305、損益 4,250 円（（100.0475 − 100.0305）× 250,000 × 1）。条件：文書に版の日付の記載はなく「© 2024 Osaka Exchange, Inc.」 | 実日数/365、小数 4 桁 | 版：2024 年の著作権表示（版の記載なし） | 大阪取引所『コンベンション・ルール（利息計算方式）（TONA 3 か月金利先物）』 | https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/TONA%20Conventions%20(Calculation%20Methodology)%20and%20Example%20of%20Schedule_JP.pdf | ○ | 2026-11-15 | 本文、c02-specs、c02-ref |
| 9 | 統計 | 【日本・米国】TONA の確報は翌営業日の午前 10 時頃、SOFR は値日の翌営業日の午前 8 時頃（米東部時間）に公表される。持ち主は講座 A 第06章（金利の定義・公表の時刻・後決め複利の式 13）。本章は、参照期間の最後の日の金利が翌営業日に分かる、という事実だけを使う。条件：日本時間／米東部時間、日次、TONA は速報と確報の 2 段階 | 午前 10 時頃（確報）／午前 8 時頃（SOFR） | 講座 A 第06章の事実確認表 #2・#4（2026-11-15） | 日本銀行『コール市場関連統計（毎営業日）』、NY 連銀『Secured Overnight Financing Rate Data』（講座 A 第06章が確認） | https://www.boj.or.jp/statistics/market/short/mutan/index.htm | ○ | 2026-11-15 | 本文、c02-ref |
| 10 | 定義 | 短期金利先物の価格 ＝ 100 − R（式 2。R は参照期間の金利、％）。1 bp の価値 ＝ N × 0.0001 × d ÷ D（式 3。N は想定元本、d は日数、D は日数計算の分母）。取引所の商品は 1 bp の価値を契約で決めており（#1・#6）、式 3 は考え方 | — | 本講座の定義（spec §9.4 の式 2・式 3） | 本講座の定義（#1・#6・#7 の仕様の一般形） | —（個別ページなし） | × | 2026-11-15 | 本文、c02-stir、検算 |
| 11 | 定義 | 後決め複利：参照期間が終わってから、その間の翌日物の金利を日ごとに複利でつなぎ、期間の金利を決める方法（講座 A 第06章の式 13）。算術平均：期間の各日の金利を単純に平均する（SR1 の R）。差金決済：現物のやり取りをせず、約束した価格と最終決済の価格の差の金額だけを受け払いする | — | 講座 A 第06章／共通 GLOSSARY | 講座 A 第06章、CME・大阪取引所の規則（#1・#4・#6） | ../rates/ #ch06（相互参照） | × | 2026-11-15 | 本文、用語集 |
| 12 | 一般知識 | 先物の価格は、売買の結果として決まる。「100 − 価格」で逆算した金利は、その価格で売買が成立した、参照期間の金利の水準を表す。将来の金利を決めるものでも、保証するものでもない（この講座は水準も予測も書かない） | — | — | 金融の教科書（一般知識）。この講座の方針（SPEC-COMMON §1-1・§2.2-30） | —（個別ページなし） | × | 2026-11-15 | 本文「価格から金利の水準を読む」 |
| 13 | 商品 | 【CME】3 か月 SOFR 先物の限月の名前（検証 W1 で追加）：「Contract names are based on the month in which the reference period begins, rather than when the contract expires some three months later.」「the September 2026 SR3 futures contract (SR3U6) references the compounded overnight SOFR rates beginning on the third Wednesday of September 2026, and ends on, but not including, the third Wednesday of December 2026.」「For the September 2026 SR3 contract, the scheduled last day of trading is Tuesday, December 15, 2026」。規則（#2）の「delivery month」は参照四半期が終わる月で、限月の名前の 3 か月後。修正前の本文は、CME の「9 月限」を 6〜9 月の金利と書き、大阪取引所と 3 か月ずれるとしていた（誤り） | — | 2026-11-18 に開いた版（更新日の記載なし。記事は 2026-06-15 の変更に触れる） | CME グループ『Understanding SOFR Futures』 | https://www.cmegroup.com/education/articles-and-reports/understanding-sofr-futures | ○ | 2026-11-18 | 本文「参照期間と最終決済の金利」「つまずきやすい点」、c02-calc、c02-ref、c04-sr3-sr1 |

確認できず書かなかった：
- SR1 の規則（Chapter 461）の本文：検索で見つからず（取得できない）。SR1 の R の定義と 1 bp の価値は、CME の教育の資料（#3・#4）の語で書いた。
- SR3 の最終決済の日（最終取引日の翌営業日にあたる日）の規則の語：規則の本文（#1）は「payment ... under normal variation performance bond procedures」とだけ書くので、本章は日付を書かない。
- 大阪取引所の TONA 3 か月金利先物の「金利参照期間一覧」（Excel）の本文：未取得。参照期間の定義は #7 の文書の語で書いた。
- 大阪取引所の制度概要（01.html）の取引時間「15:30～翌5:55」と商品概要の「翌朝6時まで」の違いの理由：本章は取引時間を書かない（第11章の持ち主）。
- 参照期間の最後の日が休業日のときの扱いの全体：大阪取引所の資料（#8）の「休業日は前営業日の確報値を適用」だけを書いた。
- CME の SR3 の最終決済の価格の確定の時刻：書かない。

演習の照合（第02章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id・手の番号） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| c02-quiz 問 1 | 価格が「100 − 金利」で表されるので、金利が上がると価格が下がる | 本文「価格は「100 − 金利」」、c02-price | 96.25（金利 3.75％）から 0.25％ポイント上がると 96.00 | ○ |
| c02-quiz 問 2 | 最終決済の金利が、参照期間の各営業日の翌日物の金利を後から複利でつないで求める値で、最後の日の金利が分かるまで決まらない | 本文「参照期間と最終決済の金利」、c02-ref、事実確認表 #1・#7・#9 | 同じ趣旨（最後の日の金利は翌営業日に公表） | ○ |
| c02-quiz 問 3 | 金利は年率なので、期間が短いほど、1 bp の差から生じる期間の利息は小さい（式 3 は日数に比例） | 本文「1 bp の価値」、c02-stir、検算 30日 | 90 日で 25 ドル、30 日で約 8.33 ドル | ○ |
| c02-exam 1 | 金利が 0.25％ポイント上がると、価格は 0.25 下がる | 本文「価格は「100 − 金利」」、c02-price | 同じ | ○ |
| c02-calc 行 ① | 1 bp の価値は 25 ドル（100 万ドル・90 日・実日数/360） | 本文「1 bp の価値」、c02-stir の既定値、検算 1bp | 同じ値 | ○ |
| c02-calc 行 ② | 買い 1 枚・96.00 → 96.25：＋625 ドル | c02-stir の既定値、検算 買いの利益 | 25 bp × 25 ドル | ○ |
| c02-calc 行 ③ | 買い 1 枚・96.00 → 95.75：−625 ドル（損失）。売りなら ＋625 ドル | c02-stir（F1 ＝ 95.75、方向を切り替える） | 同じ値 | ○ |
| c02-calc 行 ④ | 30 日（実日数/360）の 1 bp の価値は約 8.33 ドル（90 日の 3 分の 1） | c02-stir（days ＝ 30）、検算 30日 | 同じ値 | ○ |
| c02-specs の行 | 3 か月 SOFR 先物・1 か月 SOFR 先物・大阪取引所の TONA 3 か月金利先物の各列 | 事実確認表 #1〜#8 | 同じ語 | ○ |

定義と式の照合（第02章）
| 量 | 本文の定義の文 | 式（§9.4 の番号） | 用語集の d | 演習・問の使い方 | 一致 |
|---|---|---|---|---|---|
| 短期金利先物の価格 | 100 から参照期間の金利（％）を引いた値 | 式 2 | 数字・式を入れない（同じ趣旨） | c02-price、問 1、総合 1 | ○ |
| 1 bp の価値 | 想定元本 × 0.0001 × 日数 ÷ 日数計算の分母 | 式 3 | 用語集に入れない（本文の定義のみ） | c02-stir、c02-calc、問 3 | ○ |
| 差金決済 | 現物のやり取りをせず、約束した価格と最終決済の価格の差の金額だけを受け払いする | — | 同じ趣旨 | 本文「差金決済」 | ○ |

検算 1bp: 25 = 1000000 * 0.0001 * 90 / 360
検算 損益: 625 = (96.25 - 96.00) * 100 * 25
検算 買いの利益: 625 = 1 * (96.25 - 96.00) * 100 * 25
検算 買いの損失: -625 = 1 * (95.75 - 96.00) * 100 * 25
検算 売りの利益: 625 = -1 * (95.75 - 96.00) * 100 * 25
検算 30日: 8.33 = 1000000 * 0.0001 * 30 / 360
検算 365分母: 24.66 = 1000000 * 0.0001 * 90 / 365
検算 大阪の1bp: 2500 = 100000000 * 0.0001 * 0.25
検算 大阪の呼値: 625 = 100000000 * 0.25 * 0.000025
検算 価格と金利: 3.75 = 100 - 96.25
検算 金利の変化: 4.00 = 100 - 96.00
