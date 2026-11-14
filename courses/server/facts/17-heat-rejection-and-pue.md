/* 第17章 事実確認表（担当 D、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | ISO/IEC 30134-2:2026『Information technology — Data centres key performance indicators — Part 2: Power usage effectiveness (PUE)』は第2版。第2版は、混在用途の建物の指針、測定要件の更新、計上されないエネルギーと敷地内発電の扱いの明確化を加える（ページの説明） | 第2版 | 2026-01 | ISO『ISO/IEC 30134-2:2026』 | https://www.iso.org/standard/85172.html | ○ | 2026-11-14 | 本文「PUE の定義」、c17-kpi、c17-mapping |
| 2 | 規格 | ISO/IEC 30134-2:2026 の測定の区分は、カテゴリー 1（PUE1、基本）、2（PUE2、中間）、3（PUE3、詳細）。目次の見出しに、総エネルギー（5.2 節）と混在用途（5.3 節） | 3 区分 | 2026 年版 | ANSI Webstore『Preview: ISO/IEC 30134-2:2026』（見本ページ） | https://webstore.ansi.org/preview-pages/ISO/preview_ISO+IEC+30134-2-2026.pdf | △ | 2026-11-14 | 本文、c17-pue |
| 3 | 規格 | ISO/IEC 30134-1:2016 は各部に共通の構造・定義・用語・境界条件・要件を定める。第1版、2016-03-21。VDE のページで有効。2018 年の追補あり | 第1版 | 2016-03 | ISO／IEC（VDE Verlag の販売ページ）『ISO/IEC 30134-1:2016』 | https://www.vde-verlag.de/iec-normen/222724/iso-iec-30134-1-2016.html | △ | 2026-11-14 | c17-kpi |
| 4 | 規格 | ISO/IEC 30134-6:2021（ERF）は第1版、2021-08（公開日 2021-08-11）。ISO のページは、段階 90.92（改訂予定）、日付 2026-05-22、ISO/IEC AWI 30134-6 に置き換えられる予定と表示。ERF は、再利用エネルギーを、データセンターで消費される全エネルギーの合計で割った比 | 第1版 | 2021-08 | ISO『ISO/IEC 30134-6:2021』 | https://www.iso.org/standard/71717.html | ○ | 2026-11-14 | c17-kpi、c17-glossary |
| 5 | 規格 | ISO/IEC 30134-8:2022（CUE）は第1版、2022-03。使用段階の CO2 排出を定量化する指標 | 第1版 | 2022-03 | ISO『ISO/IEC 30134-8:2022』 | https://www.iso.org/standard/77691.html | ○ | 2026-11-14 | c17-kpi |
| 6 | 規格 | ISO/IEC 30134-9:2022（WUE）は第1版、2022-03-24。ISO のページは、段階 90.92（改訂予定）、日付 2024-04-26、ISO/IEC CD 30134-9 に置き換えられる予定と表示。運用段階の水の使用を測る指標 | 第1版 | 2022-03 | ISO『ISO/IEC 30134-9:2022』（committee.iso.org の同ページで確認） | https://www.iso.org/standard/77692.html | ○ | 2026-11-14 | c17-kpi |
| 7 | 定義 | PUE ＝ データセンター全体のエネルギー ÷ IT 機器のエネルギー。IT 機器は計算・ストレージ・ネットワークと支援の機器。全体は IT ＋ 電力供給（UPS・受変電・発電機・PDU・蓄電池・配電損失）＋ 冷却 ＋ 照明など。1.0 が下限で上限なし | — | 2012-10-02（WP#49 の公開日） | The Green Grid『WP#49 PUE: A Comprehensive Examination of the Metric』 | https://www.thegreengrid.org/en/resources/library-and-tools/237-WP%2349---PUE%3A-A-Comprehensive-Examination-of-the-Metric（公開日の確認）。内容は LBNL 掲載の写し https://datacenters.lbl.gov/sites/default/files/WP49-PUE%20A%20Comprehensive%20Examination%20of%20the%20Metric_v6.pdf | △ | 2026-11-14 | 本文「PUE の定義と測り方」、c17-pue |
| 8 | 定義 | WP#49 の測定の 3 水準：水準 1 は IT 負荷を UPS の出力で測り月または週ごと、水準 2 は PDU の出力で日または時間ごと、水準 3 は機器ごとに 15 分以下ごと。全体のエネルギーは全水準で受電点。期間は 1 年・年平均が望ましく、難しければ代表的な負荷の 1 か月以上 | 3 水準 | 同上 | 同上 | 同上 | △ | 2026-11-14 | 本文、c17-pue、演習 |
| 9 | 定義 | WP#49 は、PUE は 1 つの施設を時間をかけて追うのに最も役立つとし、施設どうしの比較は、測定と報告の指針を守り、年齢・場所・負荷率・規模を考えるよう述べる | — | 同上 | 同上 | 同上 | △ | 2026-11-14 | 本文「指標の読み方の注意」 |
| 10 | 統計 | Uptime Institute の Global Data Center Survey 2026 は、業界全体の年平均 PUE を 1.52 と報告。大きな施設を容量に比例して重くみる別の計算では 1.36 | 1.52／1.36 | 調査 2026、UII Update 518（2026-08） | Uptime Institute『The growing PUE advantage of larger data centers』（UII Update 518） | https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers | ○ | 2026-11-14 | 本文、c17-kpi |
| 11 | 統計 | UII Update 420 は、年平均 PUE を問い（n=681）、世界の平均は 2018 年ごろから比較的安定していると述べる（数値はページ本文にない） | n=681 | 2025-10 | Uptime Institute『Mapping PUE trends by data center region, age and size』（UII Update 420） | https://intelligence.uptimeinstitute.com/resource/mapping-pue-trends-data-center-region-age-and-size | ○ | 2026-11-14 | 本文「指標の読み方の注意」 |
| 12 | 発表 | Stockholm Data Parks の 2018-03-12 付の記事：データセンター事業者と Stockholm Exergi が、稼働中のデータセンターの排熱をストックホルムの地域熱供給網へ流す協定。最大 10,000 戸の新しい集合住宅を暖められる量 | 最大 10,000 戸 | 2018-03-12 | Stockholm Data Parks『DigiPlex data center to heat 10,000 Stockholm households』 | https://stockholmdataparks.com/?p=1172 | △ | 2026-11-14 | 本文「排熱の利用」 |
| 13 | 企業 | Stockholm Exergi（スウェーデン）。公式ページは「ストックホルムのエネルギー会社」と自称し、ストックホルム地域の地域熱供給網を運営。住所（本社所在地）の明記はページになく、国は、同社がストックホルムの企業であることから記した | スウェーデン | 2026-11-14 に確認 | Stockholm Exergi『About Stockholm Exergi』 | https://www.stockholmexergi.se/en/about-stockholm-exergi/ | △ | 2026-11-14 | 本文の「Stockholm Exergi（スウェーデン）」 |
| 14 | 規格 | ASHRAE 液冷クラスの一次側・補助の設備の例（冷却塔、水側エコノマイザ、チラー、地域熱供給）は第16章の事実確認表の 1 を引く | — | 第5版 | ASHRAE TC 9.9『参照カード』 | https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf | ○ | 2026-11-14 | 本文「冷熱源」 |
| 15 | 一般知識 | チラー・冷却塔・乾式冷却器・外気冷房の仕組み、蒸発の潜熱、補給水・ブロー・水質管理、気候・負荷率が PUE に与える影響、排熱の温度を上げるヒートポンプ。数値を伴わない | — | — | 空調・冷凍の教科書（一般知識） | —（教科書） | × | 2026-11-14 | 本文、c17-route |
| 16 | 一般知識 | 演習の計算：IT 10,000 MWh、冷却 2,500、電力変換・配電の損失 800（うち 300 は UPS 出力から機器入口まで）、その他 200（すべて架空）。PUE 1.35、UPS 出力で測ると約 1.31（本講座の計算。演習用） | 1.35／約 1.31 | 架空の入力 | 本講座の演習（式は 7、測定水準は 8） | — | — | 2026-11-14 | 本文の演習、c17-exam |
確認できず書かなかった：
- WUE・CUE の式（分子・分母の定義）：ISO のページに式がなく、規格の本文は有料。The Green Grid の WUE・CUE の公開資料も、個別ページを確認できなかったため、式は書かず、「何を測るか」だけを書いた。
- ISO/IEC 30134-3（REF）・-4（ITEE）・-5（ITEU）・-7（CER）の番号・版：検索で個別ページを確認できず、書かなかった。
- ISO/IEC 30134-2 第2版の測定の区分と、The Green Grid の 3 水準の対応関係：規格本文が有料で読めず、対応は書かず、「規格の本文で確認」とした。
- 第2版の第1版との差の詳細（12 か月の記録の要件の変更の中身）：見本ページに詳細がなく書かなかった。
- 日本のデータセンターの排熱利用の事例（事業者・自治体の一次資料の個別ページ）：確認できず、書かなかった。
- 冷却塔の補給水量・ブロー量・蒸発の熱量など、数値：公開の一次資料の個別ページを確認できず、書かなかった。
*/
