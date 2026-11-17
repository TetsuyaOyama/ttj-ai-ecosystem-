/* 第29章（付録）の事実確認表（担当 DA、確認 2026-11-15）
この章は、新しい数字や版を足さない。c29-map は、各章の「参照資料」の表（種類が「当局・公的機関」「団体の資料」「取引所・清算機関の資料」の行。「教科書・一般知識・他講座」「架空」は除く）を集めた一覧（138 行。同じ資料名・発行者は 1 行にまとめ、発行者の表記のゆれは同じ名前にそろえた。再生成の手順：/tmp/ird-DA/gen_map.py を各章の refs に当てる）。用語集は全章の CN.glossary の集計で、この章が登録するのは機関の名前だけ。
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | 大阪取引所（Osaka Exchange, OSE）は、日本取引所グループ（JPX）のデリバティブの取引所。この講座では、国債先物・金利先物などの制度と、取引システム J-GATE の公表元（第08〜11章・第18〜22章）。呼び方は共通 GLOSSARY §4 | — | — | 金融 3 講座の共通 GLOSSARY-RULES §4、第10章・第11章・第18章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 2 | 定義 | 東京金融取引所（Tokyo Financial Exchange, TFX）は、短期金利先物（ユーロ円 3 か月金利先物、TONA 3 か月金利先物など）の取引所。この講座では、第03章・第06章の公表元 | — | — | 共通 GLOSSARY-RULES §4、第03章・第06章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 3 | 定義 | 日本証券クリアリング機構（JSCC）は、日本の金融商品取引清算機関。この講座では、上場デリバティブや金利スワップの清算（債務引受）と証拠金の公表元（第07章・第23〜26章） | — | — | 共通 GLOSSARY-RULES §4、第23章・第24章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 4 | 定義 | CME グループ（CME Group）は米国のデリバティブの取引所グループで、CME Clearing はその清算部門（共通 GLOSSARY §4）。CME Clearing は、CFTC にデリバティブ清算機関（DCO）として登録され、CFTC が主な規制当局（第01章の CME グループの説明による） | — | — | 共通 GLOSSARY-RULES §4、第01章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 5 | 定義 | 金融庁は、この講座では、店頭デリバティブ取引の規制（清算集中義務の対象の指定）の公表元（第01章・第07章）。証券取引等監視委員会（監視委員会）は、相場操縦の説明の出典と、日本取引所自主規制法人の報告先（第13章） | — | — | 共通 GLOSSARY-RULES §4、第01章・第07章・第13章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 6 | 定義 | 米商品先物取引委員会（CFTC）は、この講座では、CME Clearing の主な規制当局（第01章）と、自動取引の規則（Regulation AT）の提案の撤回の公表元（第14章）。証券監督者国際機構（IOSCO）は、PFMI を CPSS（現 CPMI）と公表した組織（第27章） | — | — | 共通 GLOSSARY-RULES §4、第01章・第14章・第27章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 7 | 一般知識 | 総合テストの横断問題 2 問は、第18章・第23章・第24章・第28章で説明した「約定から差し入れまでの順序」と、第10章・第24章で説明した「規則の値は版と確認日つき」から作った。数字を含まない | — | — | この講座の第10章・第18章・第23章・第24章・第28章 | — | — | 2026-11-15 | 総合テスト |
| 8 | 一般知識 | 講座 A へのリンクの一覧は、各章の参照資料にあるリンクと、spec §4.2 の対応（序1→A 01・02、02→A 06、03→A 06、04→A 06、05→A 02・05、07→A 03・06、23→A 12）を集めた。付録は、公開済みの講座 A のどの章へも張れる。講座 C へのリンクは張らない | — | — | 本講座の spec §4.2、公開済みの講座 A | — | — | 2026-11-15 | 本文⑥ |

演習の照合（第29章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| 総合テスト 横断 1 | 約定が成立した時点で債務引受 → その日の清算値段で値洗いして変動証拠金を受払い → 当初証拠金の所要額を計算し直して、不足の請求 → 差し入れ | 第18章 c18-order、第23章、第24章 c24-day、第28章 c28-day | 約定の成立の時点で債務引受。清算値段の決定 → 値洗いと変動証拠金 → 当初証拠金の再計算 → 不足の請求 → 差し入れ | ○ |
| 総合テスト 横断 2 | 値は規則の版と確認日つきで書き、使うときは発行者の現行のページで確かめる | 第10章「つまずきやすい点」、第24章「つまずきやすい点」 | 値幅と中断の時間は規則の版で変わる。清算値段の決め方や日中の証拠金の発動条件を、この章の記述から決めない | ○ |
*/

CN.add('table', 'c29-map', {
 "title": "規則と資料の地図：発行者ごとの資料の一覧（各章の「参照資料」を 1 つにまとめたもの）",
 "caption": "発行者で絞って探せます。「関連章」は、その資料を使った章です。版・時点・リンクは各章の「参照資料」と発行者の公式ページで確かめます（一覧は 2026 年 11 月 15 日時点）。URL が「各章の参照資料で確かめる」の行は、その章の参照資料の表で確かめます。実在の規則・値は改定されるので、使うときは発行者の現行のページで確かめます",
 "cols": [
  "種類",
  "資料名",
  "発行者",
  "版・時点",
  "URL",
  "関連章"
 ],
 "filter": 2,
 "rows": [
  [
   "当局・公的機関",
   "Principles for financial market infrastructures",
   "BIS（CPSS と IOSCO の公表）",
   "2012 年 4 月 16 日公表",
   "https://www.bis.org/cpmi/publ/d101.htm",
   "第27章"
  ],
  [
   "取引所・清算機関の資料",
   "101 Overview: Governance",
   "CME グループ",
   "メタデータの日付 2020-07-16",
   "https://www.cmegroup.com/articles/brochures-and-handbooks/101-overview-governance.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Clearing Financial Safeguards Waterfalls",
   "CME グループ",
   "2020 年 7 月 16 日",
   "https://cmegroup.com/education/articles-and-reports/cme-clearing-financial-safeguards-waterfalls.html",
   "第26章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Clearing: Default Management",
   "CME グループ",
   "2023 年 8 月 3 日",
   "各章の参照資料で確かめる",
   "第26章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Clearing: Financial Safeguards",
   "CME グループ",
   "日付の記載なし（© 2026）",
   "各章の参照資料で確かめる",
   "第26章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Clearing: Principles for Financial Market Infrastructures Disclosure（発行者の表記：CME Clearing（回答者は Chicago Mercantile Exchange Inc.））",
   "CME グループ",
   "2025 年 12 月 12 日時点（初版は 2023 年 11 月 1 日）／2025 年 12 月 12 日時点",
   "https://www.cmegroup.com/clearing/risk-management/files/cme-clearing-principles-for-financial-market-infrastructures-disclosure.pdf",
   "第23章、第24章、第25章、第27章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Co-Location Services Overview",
   "CME グループ",
   "Copyright 2012",
   "https://www.cmegroup.com/globex/files/CME-Co-Location-Services-Overview.pdf",
   "第21章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Globex Matching Algorithm Steps（発行者の表記：CME グループ（CME Group Client Systems Wiki））",
   "CME グループ",
   "「Updated Jun 02」（年の表示なし）",
   "https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457218521/CME+Globex+Matching+Algorithm+Steps",
   "第19章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Globex Matching Algorithms（発行者の表記：CME Group（Client Systems Wiki））",
   "CME グループ",
   "更新 Feb 11, 2025",
   "https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms",
   "第09章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Group Announces New SOFR Futures Launch Date and Contract Specifications",
   "CME グループ",
   "2018-03-01",
   "https://www.cmegroup.com/media-room/press-releases/2018/3/01/cme_group_announcesnewsofrfutureslaunchdateandcontractspecificat.html",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "CME Group Completes Key Milestones in Conversion of Eurodollar Futures and Options",
   "CME グループ",
   "2023-04-24",
   "https://www.cmegroup.com/media-room/press-releases/2023/4/24/cme_group_completeskeymilestonesinconversionofeurodollarfutureso.html",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "CME SPAN Methodology Overview",
   "CME グループ",
   "日付の記載なし（© 2026）",
   "https://cmegroup.com/solutions/risk-management/performance-bonds-margins/span-methodology-overview.html",
   "第24章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "Cleared OTC Interest Rate Swaps",
   "CME グループ",
   "2026 年 11 月 15 日に確認（更新日の記載なし）",
   "https://www.cmegroup.com/trading/interest-rates/cleared-otc.html",
   "第07章"
  ],
  [
   "取引所・清算機関の資料",
   "Data Directly from the Market Data Platform",
   "CME グループ",
   "日付の記載なし（2026 年 11 月 15 日に確認）／日付の記載なし（2026 年 11 月 18 日に確認）",
   "https://www.cmegroup.com/market-data/distributor/market-data-platform.html",
   "第18章、第20章"
  ],
  [
   "取引所・清算機関の資料",
   "Disruptive Practices Prohibited（RA2006-5）（発行者の表記：CME Group Market Regulation）",
   "CME グループ",
   "2020 年 7 月 27 日発行・2020 年 8 月 10 日施行（2026 年 11 月 18 日に確認）",
   "https://cmegroup.com/notices/market-regulation/2020/08/CME-Group-RA2006-5.html",
   "第13章、第15章"
  ],
  [
   "取引所・清算機関の資料",
   "Disruptive Practices Prohibited（Rule 575。RA1904-5）（発行者の表記：CME Group Market Regulation）",
   "CME グループ",
   "2019 年 4 月 11 日発行・4 月 25 日施行。2020 年 7 月 27 日の RA2006-5 で置き換え（現行の規則は CME の規則集で確認）",
   "https://www.cmegroup.com/notices/market-regulation/2019/04/RA1904-5.pdf",
   "第13章、第15章"
  ],
  [
   "取引所・清算機関の資料",
   "Futures Order Types（発行者の表記：CME Group（教育ページ））",
   "CME グループ",
   "2018-10-24",
   "https://www.cmegroup.com/education/courses/things-to-know-before-trading-cme-futures/futures-order-types",
   "第08章"
  ],
  [
   "取引所・清算機関の資料",
   "Kill Switch",
   "CME グループ",
   "日付の記載なし（2026 年 11 月 18 日に確認）",
   "https://www.cmegroup.com/tools-information/webhelp/globex-credit-controls/Content/Kill-Switch.html",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "LIBOR fallback ED to SOFR specs",
   "CME グループ",
   "資料の日付 2023-02-01（更新日の記載なし）",
   "https://www.cmegroup.com/clearing/files/libor-fallback-ed-to-sofr-specs-20230201.pdf",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "Launching SPAN 2",
   "CME グループ",
   "日付の記載なし（© 2026）",
   "https://www.cmegroup.com/solutions/risk-management/performance-bonds-margins/span-methodology-overview/launching-span-2.html",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "MDP 3.0 - Recovery Services（発行者の表記：CME グループ（CME Group Client Systems Wiki））",
   "CME グループ",
   "「Updated Dec 26, 2024」",
   "https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457325847/MDP+3.0+-+Recovery+Services",
   "第20章"
  ],
  [
   "取引所・清算機関の資料",
   "Notice 23-082 LIBOR Fallback; ED-to-SOFR Fallbacks Conversion Production Weekend",
   "CME グループ",
   "2023-03-15",
   "https://www.cmegroup.com/notices/clearing/2023/03/Chadv23-082.html",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "Pre-Trade Risk Management",
   "CME グループ",
   "© 2026",
   "https://www.cmegroup.com/solutions/market-access/globex/trade-on-globex/pre-trade-risk-management.html",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "Price Limits",
   "CME グループ",
   "取引日ごとに更新（確認時に表示された取引日：2026 年 11 月 16 日）",
   "https://www.cmegroup.com/trading/price-limits.html",
   "第10章"
  ],
  [
   "取引所・清算機関の資料",
   "Rulebook Chapter 460 Three-Month SOFR Futures",
   "CME グループ",
   "確認 2026 年 11 月 15 日（改正日の記載なし）",
   "https://www.cmegroup.com/rulebook/CME/V/450/460/460.pdf",
   "第02章"
  ],
  [
   "取引所・清算機関の資料",
   "SER-9115",
   "CME グループ",
   "2022-12-22（通知）",
   "https://www.cmegroup.com/notices/ser/2022/12/SER-9115.pdf",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "SOFR Futures and Options Globex Strategy Guide",
   "CME グループ",
   "ページの日付 2024 年 12 月 3 日（確認日 2026-11-18）",
   "https://cmegroup.com/articles/2024/sofr-futures-and-options-globex-strategy-guide.html",
   "第16章"
  ],
  [
   "取引所・清算機関の資料",
   "SOFR futures contract specifications",
   "CME グループ",
   "日付の記載なし（2018 年の著作権表示）",
   "https://www.cmegroup.com/content/dam/cmegroup/education/files/sofr-futures-contract-specifications.pdf",
   "第02章、第04章"
  ],
  [
   "取引所・清算機関の資料",
   "Supported Matching Algorithms（発行者の表記：CME Group（Client Systems Wiki））",
   "CME グループ",
   "更新 Feb 11, 2025",
   "https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457218479/Supported+Matching+Algorithms",
   "第09章"
  ],
  [
   "取引所・清算機関の資料",
   "Supported Matching Algorithms（発行者の表記：CME Group（顧客向けの技術文書））",
   "CME グループ",
   "更新 Feb 11, 2025",
   "各章の参照資料で確かめる",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "Three-Month SOFR futures・One-Month SOFR futures の契約仕様（教育の資料）",
   "CME グループ",
   "2018（PM264/0418。標題の記載なし）",
   "https://www.cmegroup.com/education/files/sofr-futures-contract-specifications.pdf",
   "第09章"
  ],
  [
   "取引所・清算機関の資料",
   "Understanding Price Limits and Circuit Breakers（発行者の表記：CME Group（教育ページ））",
   "CME グループ",
   "2020-03-23",
   "https://www.cmegroup.com/education/articles-and-reports/understanding-price-limits-and-circuit-breakers",
   "第10章"
  ],
  [
   "取引所・清算機関の資料",
   "Understanding SOFR Futures",
   "CME グループ",
   "ページに日付の記載なし（記事のメタデータの日付 2026-06-25。確認日 2026-11-18）",
   "https://www.cmegroup.com/education/articles-and-reports/understanding-sofr-futures.html",
   "第02章、第04章"
  ],
  [
   "取引所・清算機関の資料",
   "Understanding SOFR Futures（発行者の表記：CME Group（教育ページ））",
   "CME グループ",
   "ページに日付の記載なし（記事が挙げる最新の日付 2026-06-15。確認日 2026-11-18）",
   "https://www.cmegroup.com/education/articles-and-reports/understanding-sofr-futures",
   "第11章"
  ],
  [
   "取引所・清算機関の資料",
   "Understanding SOFR packs and bundles",
   "CME グループ",
   "2023 年 7 月 26 日（確認日 2026-11-18）",
   "https://www.cmegroup.com/education/courses/introduction-to-sofr/understanding-sofr-packs-and-bundles.html",
   "第16章"
  ],
  [
   "取引所・清算機関の資料",
   "What do the Time In Force (TIF) options mean in FirmSoft?",
   "CME グループ",
   "日付の記載なし（© 2024）",
   "https://www.cmegroup.com/tools-information/webhelp/cmeone-firmsoft/Content/TimeInForceDefinitions.html",
   "第08章"
  ],
  [
   "取引所・清算機関の資料",
   "What is Clearing?",
   "CME グループ",
   "2018-05-29",
   "https://www.cmegroup.com/education/courses/clearing/what-is-clearing.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "iLink Architecture（発行者の表記：CME グループ（CME Group Client Systems Wiki））",
   "CME グループ",
   "「Updated Sep 28」（年の表示なし。Copyright 2024）／「Updated Sep 28」（年の表示なし）",
   "https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457220437/iLink+Architecture",
   "第18章、第19章"
  ],
  [
   "当局・公的機関",
   "Leaders' Statement: The Pittsburgh Summit（G20 首脳声明）",
   "G20（米国の公的機関 FinCEN のサイトの掲載）",
   "2009 年 9 月 24〜25 日、第 13 項",
   "https://www.fincen.gov/sites/default/files/shared/pittsburgh_summit.pdf",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "SwapClear",
   "LCH（LSEG のページ）",
   "2026 年 11 月 15 日に確認（ページのメタデータは 2026 年 10 月）",
   "https://www.lseg.com/en/post-trade/clearing/lch-services/swapclear",
   "第07章"
  ],
  [
   "取引所・清算機関の資料",
   "Clearing",
   "Options Clearing Corporation（OCC）",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://www.theocc.com/Clearance-and-Settlement/Clearing",
   "第23章"
  ],
  [
   "取引所・清算機関の資料",
   "OCC: Clearing",
   "Options Clearing Corporation（OCC）",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://www.theocc.com/Clearance-and-Settlement/Clearing",
   "第27章"
  ],
  [
   "団体の資料",
   "ARRC press release Jun 22 2017",
   "代替参照金利委員会（ニューヨーク連銀のサイト）",
   "2017-06-22",
   "https://www.newyorkfed.org/medialibrary/microsites/arrc/files/2017/ARRC-press-release-Jun-22-2017.pdf",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "Introduction to OSE TONA 3M Futures",
   "大阪取引所（日本取引所グループ）",
   "2023 年 3 月（ファイル名。発行日の記載なし）",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/co3pgt0000003rxy-att/Introduction_to_OSE_TONA_3M_Futures_202303.pdf",
   "第02章"
  ],
  [
   "取引所・清算機関の資料",
   "J-NET 取引",
   "大阪取引所（日本取引所グループ）",
   "2026/04/13 更新",
   "https://www.jpx.co.jp/derivatives/rules/j-net/index.html",
   "第11章"
  ],
  [
   "取引所・清算機関の資料",
   "J-NET取引制度要綱",
   "大阪取引所（日本取引所グループ）",
   "2026 年 4 月 13 日現在",
   "https://www.jpx.co.jp/derivatives/rules/outline/tvdivq0000003mke-att/nlsgeu000000v92l.pdf",
   "第11章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3か月金利先物（制度概要）",
   "大阪取引所（日本取引所グループ）",
   "2024/05/17 更新／2024/05/17 更新（確認日 2026-11-18）",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/01.html",
   "第02章、第16章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3か月金利先物（商品概要）",
   "大阪取引所（日本取引所グループ）",
   "2026/09/11 更新",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/index.html",
   "第02章、第03章"
  ],
  [
   "取引所・清算機関の資料",
   "コンベンション・ルール（利息計算方式）（TONA 3 か月金利先物）",
   "大阪取引所（日本取引所グループ）",
   "2024 年の著作権表示（版の記載なし）",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/TONA%20Conventions%20(Calculation%20Methodology)%20and%20Example%20of%20Schedule_JP.pdf",
   "第02章"
  ],
  [
   "取引所・清算機関の資料",
   "ストラテジー取引制度要綱",
   "大阪取引所（日本取引所グループ）",
   "2026 年 4 月 13 日現在",
   "https://www.jpx.co.jp/derivatives/rules/outline/tvdivq0000003mke-att/nlsgeu000000v92g.pdf",
   "第11章、第16章"
  ],
  [
   "取引所・清算機関の資料",
   "デリバティブ市場における取引に関するコンティンジェンシー・プラン（発行者の表記：大阪取引所・東京商品取引所）",
   "大阪取引所（日本取引所グループ）",
   "2013 年 10 月 18 日制定・2023 年 5 月 29 日改正（JPX のページに載る版。2026 年 11 月 18 日に確認）",
   "https://www.jpx.co.jp/corporate/governance/risk/contingency/tvdivq0000007aep-att/nlsgeu000004tx5n.pdf",
   "第19章、第20章"
  ],
  [
   "取引所・清算機関の資料",
   "マーケットメイカー一覧",
   "大阪取引所（日本取引所グループ）",
   "2026/9/1",
   "https://www.jpx.co.jp/derivatives/rules/market-maker/tvdivq0000003l9t-att/nlsgeu000001qqqb.pdf",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "マーケットメイカー制度",
   "大阪取引所（日本取引所グループ）",
   "2026/11/09 更新",
   "https://www.jpx.co.jp/derivatives/rules/market-maker/",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "マーケットメイカー制度の取扱い",
   "大阪取引所（日本取引所グループ）",
   "2026 年 10 月 1 日改正、2026 年 11 月 2 日適用",
   "https://www.jpx.co.jp/derivatives/rules/market-maker/tvdivq0000003l9t-att/t13vrt0000026eu7.pdf",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "制限値幅、サーキット・ブレーカー制度",
   "大阪取引所（日本取引所グループ）",
   "2026/04/13 更新",
   "https://www.jpx.co.jp/derivatives/rules/price-limit-cb/index.html",
   "第10章"
  ],
  [
   "取引所・清算機関の資料",
   "即時約定可能値幅制度",
   "大阪取引所（日本取引所グループ）",
   "2026/04/13 更新",
   "https://www.jpx.co.jp/derivatives/rules/price-range/index.html",
   "第10章"
  ],
  [
   "取引所・清算機関の資料",
   "取引方法",
   "大阪取引所（日本取引所グループ）",
   "2016/09/02 更新",
   "https://www.jpx.co.jp/derivatives/rules/trading-methods/index.html",
   "第08章、第09章、第11章"
  ],
  [
   "取引所・清算機関の資料",
   "国債証券先物取引制度要綱",
   "大阪取引所（日本取引所グループ）",
   "2026 年 4 月 13 日現在（更新日の記載は「現在」の日）／2026 年 4 月 13 日現在",
   "https://www.jpx.co.jp/derivatives/rules/outline/tvdivq0000003mke-att/nlsgeu000000v926.pdf",
   "第05章、第08章、第10章"
  ],
  [
   "取引所・清算機関の資料",
   "国債（JGB）先物オプション 制度概要",
   "大阪取引所（日本取引所グループ）",
   "更新日の記載なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/derivatives/products/jgb/jgbf-options/01.html",
   "第06章"
  ],
  [
   "取引所・清算機関の資料",
   "注文の種類等",
   "大阪取引所（日本取引所グループ）",
   "2026/04/13 更新",
   "https://www.jpx.co.jp/derivatives/rules/order-types/index.html",
   "第08章"
  ],
  [
   "取引所・清算機関の資料",
   "祝日取引",
   "大阪取引所（日本取引所グループ）",
   "2026/06/26 更新",
   "https://www.jpx.co.jp/derivatives/rules/holidaytrading/index.html",
   "第11章"
  ],
  [
   "取引所・清算機関の資料",
   "立会時間",
   "大阪取引所（日本取引所グループ）",
   "2026/04/13 更新",
   "https://www.jpx.co.jp/derivatives/rules/trading-hours/index.html",
   "第11章"
  ],
  [
   "取引所・清算機関の資料",
   "証拠金（取引制度）",
   "大阪取引所（日本取引所グループ）",
   "2023/11/02 更新",
   "https://www.jpx.co.jp/derivatives/rules/margin/index.html",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "板寄せ直前における大口注文取消等の一部禁止について",
   "大阪証券取引所（当時。2014 年 3 月 24 日から大阪取引所）",
   "2011 年（適用開始 2011-12-12）",
   "https://www.jpx.co.jp/news/detail/nlsgeu0000003mtc-att/news24880.pdf",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "Order to Trade Ratio（OTR）",
   "日本取引所グループ（JPX）",
   "2023/05/26 更新",
   "https://www.jpx.co.jp/derivatives/rules/others/02.html",
   "第19章、第22章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3か月金利先物",
   "日本取引所グループ（JPX）",
   "2026/09/11 更新",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/index.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "TradeGuard に関する FAQ",
   "日本取引所グループ（JPX）",
   "ページごとに更新日が違う",
   "https://faqsd.jpx.co.jp/faq/show/16196",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "arrownet-Global",
   "日本取引所グループ（JPX）",
   "2022/06/01 更新",
   "https://www.jpx.co.jp/systems/connectivity/02.html",
   "第21章"
  ],
  [
   "取引所・清算機関の資料",
   "よくあるご質問（先物・オプション）",
   "日本取引所グループ（JPX）",
   "2026/03/10 更新",
   "https://www.jpx.co.jp/faq/futures_option.html",
   "第08章、第09章、第10章"
  ],
  [
   "取引所・清算機関の資料",
   "デリバティブ取引 ご利用までの流れ",
   "日本取引所グループ（JPX）",
   "2021/09/20 更新",
   "https://www.jpx.co.jp/systems/derivatives-trading/02.html",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "デリバティブ取引 サービス概要",
   "日本取引所グループ（JPX）",
   "2021/09/20 更新",
   "https://www.jpx.co.jp/systems/derivatives-trading/index.html",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "デリバティブ取引 システム概要",
   "日本取引所グループ（JPX）",
   "2021/09/20 更新",
   "https://www.jpx.co.jp/systems/derivatives-trading/01.html",
   "第18章、第20章、第21章、第22章"
  ],
  [
   "取引所・清算機関の資料",
   "デリバティブ商品の一覧",
   "日本取引所グループ（JPX）",
   "2026 年 11 月 15 日に確認（更新日の記載なし）",
   "https://www.jpx.co.jp/derivatives/products/index.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "デリバティブ売買システム（J-GATE）",
   "日本取引所グループ（JPX）",
   "最終更新 2021 年 9 月 20 日",
   "https://www.jpx.co.jp/systems/derivatives-trading/01.html",
   "第14章"
  ],
  [
   "取引所・清算機関の資料",
   "ネットワーク・コロケーション（接続サービス）",
   "日本取引所グループ（JPX）",
   "2024/11/04 更新",
   "https://www.jpx.co.jp/systems/connectivity/index.html",
   "第21章"
  ],
  [
   "取引所・清算機関の資料",
   "ノンキャンセル・ピリオド",
   "日本取引所グループ（JPX）",
   "2026/10/26 更新の表示",
   "https://www.jpx.co.jp/derivatives/rules/others/01.html",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "ハードブロック機能",
   "日本取引所グループ（JPX）",
   "2026/04/13 更新",
   "https://www.jpx.co.jp/derivatives/rules/others/03.html",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "リアルタイム相場情報（デリバティブ）",
   "日本取引所グループ（JPX）",
   "2026/01/09 更新",
   "https://www.jpx.co.jp/markets/paid-info-derivatives/realtime/index.html",
   "第20章"
  ],
  [
   "取引所・清算機関の資料",
   "別紙1：リスク管理機能",
   "日本取引所グループ（JPX）",
   "日付の記載なし",
   "https://www.jpx.co.jp/corporate/news-releases/0060/nlsgeu0000016z4h-att/01.pdf",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "商品の歴史（先物・オプションの年表）",
   "日本取引所グループ（JPX）",
   "2026/04/13 更新（2026 年 11 月 18 日に確認）",
   "https://www.jpx.co.jp/derivatives/related/history/index.html",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "売買システム再立ち上げによる売買再開（発行者の表記：JPX（東京証券取引所））",
   "日本取引所グループ（JPX）",
   "2021/05/24 更新",
   "https://www.jpx.co.jp/equities/trading/relaunch/index.html",
   "第19章"
  ],
  [
   "取引所・清算機関の資料",
   "接続サービスの詳細",
   "日本取引所グループ（JPX）",
   "2025/12/18 更新",
   "https://www.jpx.co.jp/systems/connectivity/01.html",
   "第21章"
  ],
  [
   "取引所・清算機関の資料",
   "新デリバティブ売買システム（J-GATE3.0）の稼働について",
   "日本取引所グループ（JPX）",
   "2021 年 9 月 21 日",
   "https://www.jpx.co.jp/corporate/news/news-releases/0060/20210921-01.html",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "日本取引所グループ報道発表（2023 年 5 月 29 日、取引開始）",
   "日本取引所グループ（JPX）",
   "2023-05-29",
   "各章の参照資料で確かめる",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "次期デリバティブ売買システムの開発ベンダの選定について",
   "日本取引所グループ（JPX）",
   "2026 年 2 月 4 日",
   "https://www.jpx.co.jp/corporate/news/news-releases/0060/20260204-01.html",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "沿革",
   "日本取引所グループ（JPX）",
   "2026 年 11 月 15 日に確認",
   "https://www.jpx.co.jp/corporate/about-jpx/history/index.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "注文管理に関するガイドライン（発行者の表記：東京証券取引所・大阪取引所・日本取引所自主規制法人）",
   "日本取引所グループ（JPX）",
   "制定 2018-03-02、改訂 2021-01-04",
   "https://www.jpx.co.jp/rules-participants/public-comment/detail/d8/nlsgeu000004is7s-att/nlsgeu000004iuum.pdf",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "相場情報利用に関するポリシー",
   "日本取引所グループ（JPX）",
   "2026 年 4 月 13 日",
   "https://www.jpx.co.jp/markets/paid-info-derivatives/realtime/tvdivq0000002nuz-att/Policies_J.pdf",
   "第20章"
  ],
  [
   "取引所・清算機関の資料",
   "相場操縦等の防止（相場操縦取引とは・監視）（発行者の表記：日本取引所グループ（日本取引所自主規制法人））",
   "日本取引所グループ（JPX）",
   "2025 年 12 月 3 日更新",
   "https://www.jpx.co.jp/regulation/preventing/manipulation/index.html",
   "第13章"
  ],
  [
   "取引所・清算機関の資料",
   "調査報告書（システム障害に係る独立社外取締役による調査委員会）",
   "日本取引所グループ（JPX）",
   "2020 年 11 月 30 日",
   "https://www.jpx.co.jp/corporate/news/news-releases/0020/nlsgeu00000553vh-att/nlsgeu00000553yv.pdf",
   "第19章"
  ],
  [
   "取引所・清算機関の資料",
   "障害に伴う売買の停止について【第5報】（発行者の表記：JPX（東京証券取引所））",
   "日本取引所グループ（JPX）",
   "2020 年 10 月 1 日",
   "https://www.jpx.co.jp/news/1030/20201001-06.html",
   "第19章"
  ],
  [
   "取引所・清算機関の資料",
   "首都直下地震等に備えた関西データセンター等の整備について",
   "日本取引所グループ（JPX）",
   "2023 年 1 月 20 日（同年 2 月 6 日に追記）",
   "https://www.jpx.co.jp/corporate/news/news-releases/0060/20230120-01.html",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "Clearing Products（金利スワップの清算の対象）",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 11 月 15 日に確認（更新日の記載なし）",
   "https://www.jpx.co.jp/jscc/en/cash/irs/product.html",
   "第07章"
  ],
  [
   "取引所・清算機関の資料",
   "FMI 原則に基づく情報開示 2026 年 3 月 31 日",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 3 月 31 日",
   "https://www.jpx.co.jp/jscc/kaisya/cimhll0000000osu-att/JSCC_PFMI_Disclosure_20260331_JP.pdf",
   "第18章"
  ],
  [
   "取引所・清算機関の資料",
   "FMI原則に基づく情報開示",
   "日本証券クリアリング機構（JSCC）",
   "2024 年 3 月 31 日時点（公表は 2024 年 4 月 1 日）／2026 年 3 月末時点（公表は 2026 年 4 月 1 日。2026 年 11 月 18 日に確認）",
   "https://www.jpx.co.jp/jscc/kaisya/cimhll0000000osu-att/JSCC_PFMI_Disclosure_20240331_JP.pdf",
   "第25章、第27章"
  ],
  [
   "取引所・清算機関の資料",
   "FMI原則に基づく情報開示（新しい版）",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 3 月末時点（公表は 2026 年 4 月 1 日。2026 年 11 月 18 日に確認）",
   "https://www.jpx.co.jp/jscc/kaisya/cimhll0000000osu-att/JSCC_PFMI_Disclosure_20260331_JP.pdf",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "FMI原則への対応",
   "日本証券クリアリング機構（JSCC）",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://www.jpx.co.jp/jscc/kaisya/fmi.html",
   "第27章"
  ],
  [
   "取引所・清算機関の資料",
   "Outlines of Margin Calculation Method (VaR Method) for Futures/Option Contracts（発行者の表記：日本証券クリアリング機構（JSCC。日本語の資料の参考訳））",
   "日本証券クリアリング機構（JSCC）",
   "2023 年 11 月",
   "https://www.jpx.co.jp/jscc/en/cash/futures/marginsystem/gjnthi000000049n-att/p8nu7200000006oj.pdf",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "お知らせ（2025 年）",
   "日本証券クリアリング機構（JSCC）",
   "2025 年 8 月 12 日の掲載項目／2025 年の掲載項目の題名",
   "https://www.jpx.co.jp/jscc/information/news/2025.html",
   "第24章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "お知らせ（2026 年）",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 5 月 18 日の掲載項目（2026 年 11 月 18 日に確認）／2026 年の掲載項目の題名（2026 年 11 月 18 日に確認）",
   "https://www.jpx.co.jp/jscc/information/news/2026.html",
   "第24章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "上場デリバティブ2026年4月稼働案件に係る対応概要",
   "日本証券クリアリング機構（JSCC）",
   "2025 年 11 月 28 日",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/shokokin_seido/u89at3000000i04f-att/outline.pdf",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "会社案内",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 7 月／2026 年 7 月（金額は 2026 年 6 月 30 日時点の脚注）",
   "https://www.jpx.co.jp/jscc/kaisya/rkra7f00000001jl-att/corporateinfo_202607_j.pdf",
   "第23章、第26章、第27章"
  ],
  [
   "取引所・清算機関の資料",
   "債務引受 先物・オプション取引の清算・決済制度",
   "日本証券クリアリング機構（JSCC）",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/acceptance_debt/seisan_kessai.html",
   "第23章、第24章"
  ],
  [
   "取引所・清算機関の資料",
   "国債先物オプション取引の決済方法",
   "日本証券クリアリング機構（JSCC）",
   "更新日の記載なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/acceptance_debt/koku_op.html",
   "第06章"
  ],
  [
   "取引所・清算機関の資料",
   "損失補償",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 10 月 1 日現在（ページの表示）",
   "https://www.jpx.co.jp/jscc/risk/default-waterfall.html",
   "第26章"
  ],
  [
   "取引所・清算機関の資料",
   "日本証券クリアリング機構（JSCC）",
   "日本証券クリアリング機構（JSCC）",
   "2026 年 11 月 15 日に確認（ページの更新日の記載なし）",
   "https://www.jpx.co.jp/jscc/index.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "証拠金",
   "日本証券クリアリング機構（JSCC）",
   "表の表示「2024 年 12 月 18 日現在」／2024 年 12 月 18 日現在（ページの表示）",
   "https://www.jpx.co.jp/jscc/risk/margin.html",
   "第07章、第24章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "証拠金及び決済制度の概要（OSE）",
   "日本証券クリアリング機構（JSCC）",
   "2023 年 11 月 6 日現在",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/shokokin_seido/cimhll0000000g03-att/cimhll0000001846.pdf",
   "第23章、第24章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "証拠金計算方式の変更（SPAN方式→VaR方式）に伴う証拠金水準の変化と特徴について",
   "日本証券クリアリング機構（JSCC）",
   "2023 年 10 月",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/shokokin_seido/u89at3000000i04f-att/varfeature_j.pdf",
   "第16章、第24章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "Outline for Three-month TONA futures",
   "東京金融取引所",
   "2023 年 3 月 20 日、2024 年 1 月 4 日改訂（確認日 2026-11-18）",
   "https://www.tfx.co.jp/en/rules/pdf/w-01.pdf",
   "第16章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA1ヵ月金利先物",
   "東京金融取引所",
   "2026 年 11 月 15 日に確認（更新日の記載なし）",
   "https://www.tfx.co.jp/wholesale/products/tonao1.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3ヵ月金利先物",
   "東京金融取引所",
   "2026 年 11 月 15 日に確認（更新日の記載なし）",
   "https://www.tfx.co.jp/wholesale/products/tona.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3ヵ月金利先物オプション",
   "東京金融取引所",
   "2026 年 11 月 15 日に確認（更新日の記載なし）",
   "https://www.tfx.co.jp/wholesale/products/tonaoption.html",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3ヵ月金利先物オプション取引の上場日のお知らせ",
   "東京金融取引所",
   "2023-01-31",
   "各章の参照資料で確かめる",
   "第06章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA3ヵ月金利先物（法人のお客様へのご案内）",
   "東京金融取引所",
   "ページに日付の記載なし（確認日 2026-11-18）",
   "https://www.tfx.co.jp/wholesale/products/tona.html",
   "第16章"
  ],
  [
   "取引所・清算機関の資料",
   "ユーロ円 3 か月金利先物の取引停止に関する要綱（案）とお知らせ",
   "東京金融取引所",
   "2024-04-23（案）・2024-06-14",
   "各章の参照資料で確かめる",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "東京金融取引所のお知らせ（日本円金利指標改革への対応、TONA 3 か月金利先物の上場日、付合せの停止）",
   "東京金融取引所",
   "2022-06-03・2022-07-26・2023-01-31・2023-03-03",
   "各章の参照資料で確かめる",
   "第03章"
  ],
  [
   "当局・公的機関",
   "Commission Delegated Regulation (EU) 2017/589",
   "欧州委員会（本文は英国の法令データベースに掲載）",
   "2016 年 7 月 19 日採択",
   "https://www.legislation.gov.uk/eur/2017/589/introduction",
   "第14章"
  ],
  [
   "当局・公的機関",
   "Article 17 Algorithmic trading（MiFID II）",
   "欧州証券市場機構（ESMA）",
   "確認 2026 年 11 月 15 日の版",
   "https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mifid-ii/article-17-algorithmic-trading",
   "第14章、第15章"
  ],
  [
   "当局・公的機関",
   "Antidisruptive Practices Authority（78 FR 31890）",
   "米商品先物取引委員会（CFTC）",
   "2013 年 5 月 28 日公表・同日施行",
   "https://www.cftc.gov/LawRegulation/FederalRegister/FinalRules/2013-12365.html",
   "第13章"
  ],
  [
   "当局・公的機関",
   "CFTC Approves Two Final Rules and Two Proposed Rules at June 25 Open Meeting（8188-20）",
   "米商品先物取引委員会（CFTC）",
   "2020 年 6 月 25 日",
   "https://cftc.gov/PressRoom/PressReleases/8188-20",
   "第14章"
  ],
  [
   "当局・公的機関",
   "CFTC Approves Two Final Rules at December 8 Open Meeting（8331-20）",
   "米商品先物取引委員会（CFTC）",
   "2020 年 12 月 8 日（2026 年 11 月 18 日に確認）",
   "https://www.cftc.gov/PressRoom/PressReleases/8331-20",
   "第14章"
  ],
  [
   "当局・公的機関",
   "Federal Court Orders Precious Metals Traders to Pay Penalties and Imposes Trading Bans for Spoofing…（8511-22）",
   "米商品先物取引委員会（CFTC）",
   "2022 年 4 月 7 日",
   "https://www.cftc.gov/PressRoom/PressReleases/8511-22",
   "第13章"
  ],
  [
   "当局・公的機関",
   "Small Entity Compliance Guide: Rule 15c3-5",
   "米証券取引委員会（SEC）",
   "2010 年 11 月 3 日採択（手引きの更新 2011 年 1 月 6 日）",
   "https://www.sec.gov/files/rules/final/2010/34-63241-secg.htm",
   "第14章"
  ],
  [
   "当局・公的機関",
   "不公正取引について",
   "証券取引等監視委員会",
   "日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.fsa.go.jp/sesc/support/hukousei/hukousei.html",
   "第13章"
  ],
  [
   "当局・公的機関",
   "長期国債先物に係る相場操縦に対する課徴金納付命令の勧告について（証券会社に対するもの）",
   "証券取引等監視委員会",
   "令和 6 年 9 月 25 日",
   "https://www.fsa.go.jp/sesc/news/c_2024/2024/20240925-1.html",
   "第13章"
  ],
  [
   "当局・公的機関",
   "Regulatory Issues Raised by the Impact of Technological Changes on Market Integrity and Efficiency（Final Report）",
   "証券監督者国際機構（IOSCO）専門委員会",
   "2011 年 10 月（FR09/11）",
   "https://www.iosco.org/library/pubdocs/pdf/ioscopd361.pdf",
   "第14章、第15章、第16章、第17章"
  ],
  [
   "当局・公的機関",
   "Derivatives Markets and Central Counterparties",
   "金融安定理事会（FSB）",
   "2025 年 9 月 5 日更新",
   "https://www.fsb.org/work-of-the-fsb/market-and-institutional-resilience/derivatives-markets-and-central-counterparties/",
   "第01章"
  ],
  [
   "当局・公的機関",
   "ユーロ円 TIBOR の公表停止に関する金融庁のページ（令和 5 年 12 月 22 日、令和 6 年 3 月 6 日、令和 6 年 11 月 18 日、令和 7 年 2 月 10 日）",
   "金融庁",
   "2023-12-22・2024-03-06・2024-11-18・2025-02-10",
   "各章の参照資料で確かめる",
   "第03章"
  ],
  [
   "当局・公的機関",
   "ユーロ円 TIBOR の恒久的な公表停止に伴う告示の一部改正（案）に対するパブリックコメントの結果等について",
   "金融庁",
   "令和 7 年 2 月 10 日",
   "https://www.fsa.go.jp/news/r6/shouken/20250210/20250210.html",
   "第07章"
  ],
  [
   "当局・公的機関",
   "ユーロ円 TIBOR の恒久的な公表停止に伴う告示の一部改正（案）の公表について",
   "金融庁",
   "令和 6 年 11 月 18 日（意見募集の期限は令和 6 年 12 月 18 日。終了）",
   "https://www.fsa.go.jp/news/r6/shouken/20241118/241118.html",
   "第07章"
  ],
  [
   "当局・公的機関",
   "店頭デリバティブ取引規制関連",
   "金融庁",
   "2026 年 11 月 15 日に確認（ページ全体の更新日の記載なし）",
   "https://www.fsa.go.jp/policy/derivative/index.html",
   "第01章、第07章"
  ],
  [
   "当局・公的機関",
   "課徴金制度について",
   "金融庁",
   "日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.fsa.go.jp/policy/kachoukin/02.html",
   "第13章"
  ],
  [
   "当局・公的機関",
   "金融商品取引業者等向けの総合的な監督指針（別冊）高速取引行為者向けの監督指針",
   "金融庁",
   "令和 7 年 6 月",
   "https://www.fsa.go.jp/common/law/guide/hft/hft.pdf",
   "第14章"
  ],
  [
   "当局・公的機関",
   "金融商品取引清算機関の一覧",
   "金融庁",
   "令和 3 年 10 月 11 日時点（古い一覧）",
   "https://www.fsa.go.jp:443/menkyo/menkyoj/kinyuusyouhintorihikiseisan.pdf",
   "第27章"
  ],
  [
   "当局・公的機関",
   "金融市場インフラのための原則（仮訳）",
   "金融庁",
   "2012 年 4 月 16 日公表の原則の仮訳",
   "https://www.fsa.go.jp/inter/ios/20120416-1/07-2.pdf",
   "第26章、第27章"
  ],
  [
   "当局・公的機関",
   "高速取引行為の動向について",
   "金融庁",
   "確認 2026 年 11 月 15 日の版（登録制は平成 30 年 4 月施行と記載）",
   "https://www.fsa.go.jp/status/kousokutorihiki_doukou/index.html",
   "第14章"
  ],
  [
   "当局・公的機関",
   "高速取引（HFT）のスピード競争の現状とその影響（発行者の表記：金融庁（金融研究センター。著者個人の見解））",
   "金融庁",
   "2022 年 10 月 25 日",
   "https://www.fsa.go.jp/frtc/report/honbun/2022/20221025_SR_Article_HFT.pdf",
   "第21章"
  ]
 ]
});

CN.glossary([
  { t: '大阪取引所', en: 'Osaka Exchange', alias: 'OSE', d: '日本取引所グループのデリバティブ（先物・オプション）の取引所です。この講座では、国債先物や金利先物の制度と、取引システムの公表元として出てきます。', ch: [29] },
  { t: '東京金融取引所', en: 'Tokyo Financial Exchange', alias: 'TFX', d: '短期金利先物などを扱う取引所です。この講座では、ユーロ円の金利先物と、TONA を参照する金利先物の公表元として出てきます。', ch: [29] },
  { t: '日本証券クリアリング機構', en: 'Japan Securities Clearing Corporation', alias: 'JSCC', d: '日本の金融商品取引清算機関です。この講座では、上場デリバティブや金利スワップの清算（債務引受）と、証拠金の公表元として出てきます。', ch: [29] },
  { t: 'CME グループ', en: 'CME Group', alias: 'CME', d: '米国のデリバティブの取引所グループです。この講座では、米国の金利先物の取引と、取引システムの公表元として出てきます。', ch: [29] },
  { t: 'CME Clearing', en: 'CME Clearing', alias: '', d: 'CME グループの清算部門です。この講座では、米国の先物の清算と、証拠金・破綻処理の開示の公表元として出てきます。', ch: [29] },
  { t: '金融庁', en: 'Financial Services Agency', alias: 'FSA', d: '日本の金融行政を担う官庁です。この講座では、店頭デリバティブ取引の規制（清算集中義務の対象の指定）の公表元として出てきます。', ch: [29] },
  { t: '証券取引等監視委員会', en: 'Securities and Exchange Surveillance Commission', alias: '監視委員会', d: '市場の取引の公正を確保するための監視を担う日本の機関です。この講座では、相場操縦の説明の出典として出てきます。', ch: [29] },
  { t: 'CFTC', en: 'U.S. Commodity Futures Trading Commission', alias: '米商品先物取引委員会', d: '米国の先物などのデリバティブを規制する当局です。この講座では、CME Clearing の主な規制当局として出てきます。', ch: [29] },
  { t: 'IOSCO', en: 'International Organization of Securities Commissions', alias: '証券監督者国際機構', d: '各国の証券市場の監督当局の国際的な組織です。この講座では、金融市場インフラのための原則（PFMI）を公表した組織の 1 つとして出てきます。', ch: [29] }
]);

CN.exam([
  { part: 5, q: '取引所で成立した先物の約定について、約定から証拠金の差し入れまでの順序として、この講座の説明に合うものはどれですか。',
    c: ['約定が成立した時点で債務引受が行われ、その日の清算値段で値洗いして変動証拠金を受け払いし、当初証拠金の不足があれば請求され、期限までに差し入れる', '約定の前に値洗いを行い、約定が成立したあとで、債務引受を行う', '当初証拠金の不足の請求を受けてから、はじめて債務引受が行われる', '値洗いは、その日の最後の約定値段で行い、清算値段は使わない'], a: 0,
    why: '正答は、約定が成立した時点で債務引受が行われ、その日の清算値段で値洗いして変動証拠金を受け払いし、当初証拠金の不足があれば請求され、期限までに差し入れる、です。値洗いは、約定のあとの建玉を、その日の清算値段で評価し直すことです（第18章・第23章・第24章・第28章）。', ch: [18, 23, 24, 28] },
  { part: 5, q: '取引所や清算機関の規則の値（値幅・中断の時間・証拠金の算出方法など）を、資料や設計に書くときの扱いとして、この講座の説明に合うものはどれですか。',
    c: ['一度確かめた値は変わらないので、そのまま長く使う', '規則の版と確認日をつけて書き、使うときは、発行者の現行のページで確かめ直す', 'この講座の演習の架空の値を、実在の水準として使う', '証券会社が顧客に求める額は、清算機関が求める額と、いつも同じなので、確かめなくてよい'], a: 1,
    why: '正答は、規則の版と確認日をつけて書き、使うときは、発行者の現行のページで確かめ直す、です。値幅や中断の時間、証拠金の方式や期限は、規則の改定で変わります。演習の値は架空で、清算機関が求める額と、請求元が顧客に求める額は、同じとは限りません（第10章・第24章・第28章）。', ch: [10, 24, 28] }
]);
