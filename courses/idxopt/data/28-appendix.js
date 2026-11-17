/* 第28章（付録）の事実確認表（担当 OA、確認 2026-11-18）
この章は、新しい数字や版を足さない。c28-map は、各章の「参照資料」の表（種類が「当局・公的機関」「団体の資料」「取引所・清算機関の資料」「規格・基準」の行）を、python3 -I /tmp/idxopt-OA/gen_map.py で集めたもの。同じ（資料名・発行者）は 1 行にまとめ、版・時点は各章の記載を「／」でつないだ。用語集と対応表と総合テストは、各章のデータ（CN.glossary・CN.mapping・CN.exam）が集まる。
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | 大阪取引所（Osaka Exchange, OSE）は、日本取引所グループ（JPX）のデリバティブの取引所。この講座では、日経225オプション・ミニオプションの仕様の公表元（第02・03・05章） | — | 仕様のページ 2026-02-16 更新 | 大阪取引所『日経225オプション 仕様』 | https://www.jpx.co.jp/derivatives/products/domestic/225options/01.html | ○ | 2026-11-18 | 用語集 |
| 2 | 定義 | 日本経済新聞社は、日経平均株価の算出者。S&P ダウ・ジョーンズ・インデックスは、S&P 500 の算出者（第02章） | — | 各章の記載 | 日本経済新聞社『日経平均株価 算出要領』、S&P ダウ・ジョーンズ・インデックス『S&P U.S. Indices Methodology』 | 第02章の参照資料 | ○ | 2026-11-18 | 用語集、横断問題 1 |
| 3 | 定義 | Cboe Global Markets（Cboe）は、S&P 500 を原資産とする指数オプション（SPX・SPXW・XSP）を上場する取引所グループ（第04章） | — | 各章の記載 | Cboe『SPX・SPXW・XSP の商品ページ』 | 第04章の参照資料 | ○ | 2026-11-18 | 用語集 |
| 4 | 定義 | 日本証券クリアリング機構（JSCC）は、大阪取引所の指数オプションの清算機関。米国は OCC（第05・22章） | — | 各章の記載 | JSCC・OCC の各ページ | 第22章の参照資料 | ○ | 2026-11-18 | 用語集、横断問題 1 |
| 5 | 定義 | 日本証券業協会は、協会員（証券会社など）の自主規制の団体。米国証券取引委員会（SEC）は、米国の証券規制の当局で、OCC を所管する（第26章・第22章・第24章） | — | 日本証券業協会の規則は 2020-06-16 改正の版 | 日本証券業協会『協会員の投資勧誘、顧客管理等に関する規則』、SEC の資料 | https://www.jsda.or.jp/about/kisoku/200616_toushikanyu.pdf | ○ | 2026-11-18 | 用語集 |
| 6 | 一般知識 | 横断問題 2 は、第21・22・26・27章で説明した「規則と値は版と時点つきで書き、使うときは発行者の現行のページで確かめる」と、「証券会社の額は清算機関の額と違うことがある」から作った | — | — | この講座の各章 | — | — | 2026-11-18 | 横断問題 2 |
| 7 | 一般知識 | 講座 A・B へのリンクの一覧は、spec §4.2 の対応（08→A 02、09→A 01、06→B 08〜11、17→B 15、20→B 16、21→B 24、22→B 23・24・25・26・27、23→B 12・15、26→B 13、序1・01→B 序1）だけ | — | — | spec §4.2 | — | — | 2026-11-18 | ⑤の表 |

演習の照合（第28章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| 総合テスト 横断 1 | 日本経済新聞社が日経平均株価を算出、大阪取引所が約定を成立、JSCC が清算 | 第02章（算出者と取引所）、第22章（清算） | 指数の算出者・取引所・清算機関は別の機関で、日経225オプションでは日本経済新聞社・大阪取引所・JSCC | ○ |
| 総合テスト 横断 2 | 値は版と時点つきで書き、発行者の現行のページで確かめる | 各章「つまずきやすい点」、第22章 | 規則の値は改定されるので、本文の時点の値として読み、現行のページで確かめる | ○ |
*/

CN.add('table', 'c28-map', {
 "title": "規則と資料の地図：発行者ごとの資料の一覧（各章の「参照資料」を 1 つにまとめたもの）",
 "caption": "発行者で絞って探せます。「関連章」は、その資料を使った章です。版・時点・リンクは各章の「参照資料」と発行者の公式ページで確かめます（一覧は 2026 年 11 月 18 日時点）。URL が「各章の参照資料で確かめる」の行は、その章の参照資料の表に資料名があります。",
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
   "Volatility concepts and the risk premium（BIS Quarterly Review）",
   "Bank for International Settlements",
   "2014 年 9 月",
   "https://www.bis.org/publ/qtrpdf/r_qt1409v.htm",
   "第11章"
  ],
  [
   "当局・公的機関",
   "Zero-day options and financial market vulnerability",
   "Bank of England のスタッフ（Bank Underground）",
   "2024-12-04",
   "https://bankunderground.co.uk/2024/12/04/zero-day-options-and-financial-market-vulnerability/",
   "第25章"
  ],
  [
   "当局・公的機関",
   "Findings Regarding the Market Events of May 6, 2010",
   "CFTC と SEC の職員",
   "2010-09-30",
   "https://SEC.GOV/files/marketevents-report.pdf",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "Cboe Introduces AM-Settled Weekly Options on the S&P 500 Index",
   "Cboe",
   "2026 年 11 月 9 日",
   "https://www.cboe.com/insights/posts/cboe-introduces-am-settled-weekly-options-on-the-s-p-500-index/",
   "第04章"
  ],
  [
   "規格・基準",
   "Cboe Volatility Index Mathematics Methodology",
   "Cboe",
   "第 5.0 版、最終改訂 2026-02-26",
   "https://cdn.cboe.com/resources/indices/Cboe_Volatility_Index_Mathematics_Methodology.pdf",
   "第13章"
  ],
  [
   "取引所・清算機関の資料",
   "Cboe の発表（2016-02-01、2016-07-11、2022-04-13、2022-09-19）、調査記事（2023-09-08、2025-05-02）",
   "Cboe",
   "各発表の日付",
   "各章の参照資料で確かめる",
   "第24章"
  ],
  [
   "取引所・清算機関の資料",
   "Market Metrics That Matter: Derivatives October 2026 Volume Highlights",
   "Cboe",
   "2026-11-11",
   "https://www.cboe.com/insights/posts/market-metrics-that-matter-derivatives-october-2026-volume-highlights",
   "第06章、第24章"
  ],
  [
   "取引所・清算機関の資料",
   "OCC and Investor Protection",
   "Cboe",
   "更新日の表記なし（確認 2026 年 11 月 18 日）／©2026 の表示のみ（確認 2026 年 11 月 18 日）／©2026 の表示のみ",
   "https://www.cboe.com/investor-protection/",
   "第04章、第22章、第26章"
  ],
  [
   "取引所・清算機関の資料",
   "S&P 500 Weeklys Options（仕様）／Mini-SPX (XSP) Weeklys Options（仕様）",
   "Cboe",
   "ページに更新日の記載なし（確認日 2026-11-18）",
   "https://www.cboe.com/tradable_products/sp_500/spx_weekly_options/specifications/",
   "第24章"
  ],
  [
   "取引所・清算機関の資料",
   "S&P 500 Weeklys Options（比較表）",
   "Cboe",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://cboe.com/tradable_products/sp_500/spx_weekly_options/specifications/",
   "第04章、第05章"
  ],
  [
   "取引所・清算機関の資料",
   "S&P 500® Index Options Product Specifications",
   "Cboe",
   "Product Snapshot as of March 19, 2024（ページの更新日の表記なし）",
   "https://www.cboe.com/tradable_products/sp_500/spx_options/specifications/",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "SPX Options",
   "Cboe",
   "ページの表示「as of November 13, 2026」",
   "https://www.cboe.com/tradable-products/sp-500/spx-options/",
   "第06章"
  ],
  [
   "取引所・清算機関の資料",
   "SPX Weeklys の仕様",
   "Cboe",
   "執筆時点（更新日は確かめていない）",
   "https://cboe.com/tradable_products/sp_500/spx_weekly_options/specifications/",
   "第02章"
  ],
  [
   "取引所・清算機関の資料",
   "SPXO Options Contract Specifications",
   "Cboe",
   "版・更新日の記載なし（確認 2026 年 11 月 18 日）",
   "https://cdn.cboe.com/resources/membership/SPXO-Options-Contract-Specifications.pdf",
   "第04章"
  ],
  [
   "取引所・清算機関の資料",
   "SPX・SPXW・XSP の仕様のページ",
   "Cboe",
   "第04章の参照資料に同じ",
   "各章の参照資料で確かめる",
   "第06章"
  ],
  [
   "取引所・清算機関の資料",
   "State of the Options Industry Q3 2026",
   "Cboe",
   "2026-10-19",
   "https://www.cboe.com/insights/posts/state-of-the-options-industry-q-3-2026-volume-growth-concentrated-in-index-and-etf-options",
   "第24章"
  ],
  [
   "規格・基準",
   "Volatility Index Methodology: Cboe Volatility Index",
   "Cboe",
   "第 6.0 版、最終改訂 2026-02-26",
   "https://cdn.cboe.com/resources/indices/Volatility_Index_Methodology_Cboe_Volatility_Index.pdf",
   "第13章"
  ],
  [
   "取引所・清算機関の資料",
   "Volatility Insights: Much Ado About 0DTEs - Evaluating the Market Impact of SPX 0DTE Options",
   "Cboe",
   "2023-09-08",
   "https://www.cboe.com/insights/posts/volatility-insights-evaluating-the-market-impact-of-spx-0-dte-options",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "XSP Options Product Specification",
   "Cboe",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.cboe.com/tradable_products/sp_500/mini_spx_options/specifications",
   "第04章"
  ],
  [
   "団体の資料",
   "Regulatory Notice 21-15",
   "FINRA",
   "2021 年 4 月 9 日",
   "https://www.finra.org/rules-guidance/notices/21-15",
   "第26章"
  ],
  [
   "取引所・清算機関の資料",
   "April Webinar Key Takeaways: Understanding Volatility and Options Skew",
   "Options Clearing Corporation（OCC）",
   "2026 年 4 月（月・年のみの表示）",
   "https://www.optionseducation.org/news/april-webinar-key-takeaways-understanding-volatility-and-options-skew",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "Clearing",
   "Options Clearing Corporation（OCC）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.theocc.com/clearance-and-settlement/clearing",
   "第04章、第22章"
  ],
  [
   "取引所・清算機関の資料",
   "Index Options",
   "Options Clearing Corporation（OCC）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.theocc.com/clearance-and-settlement/clearing/index-options",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "Margin Methodology",
   "Options Clearing Corporation（OCC）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.theocc.com/Risk-Management/Margin-Methodology",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "Options Disclosure Document",
   "Options Clearing Corporation（OCC）",
   "「Effective June 3, 2024」の版",
   "https://www.theocc.com/Company-Information/Documents-and-Archives/Options-Disclosure-Document",
   "第26章"
  ],
  [
   "取引所・清算機関の資料",
   "Options Pricing",
   "Options Clearing Corporation（OCC）",
   "更新日の記載なし（確認 2026 年 11 月 18 日）",
   "https://www.optionseducation.org/optionsoverview/options-pricing",
   "第07章、第09章"
  ],
  [
   "取引所・清算機関の資料",
   "Volatility Skew and Options: An Overview",
   "Options Clearing Corporation（OCC）",
   "2023 年 10 月（月・年のみの表示）",
   "https://www.optionseducation.org/news/volatility-skew-and-options-an-overview-1",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "S&P U.S. Indices Methodology",
   "S&P ダウ・ジョーンズ・インデックス",
   "表紙の版「July 2026」（確認 2026 年 11 月 18 日）",
   "https://www.spglobal.com/spdji/en/documents/methodologies/methodology-sp-us-indices.pdf",
   "第02章"
  ],
  [
   "当局・公的機関",
   "BIS Quarterly Review, March 2024（Box B）",
   "国際決済銀行（BIS）",
   "2024-03-04",
   "https://www.bis.org/publ/qtrpdf/r_qt2403x.htm",
   "第24章"
  ],
  [
   "当局・公的機関",
   "What could explain the recent drop in VIX?（BIS Quarterly Review、2024 年 3 月号 Box B）",
   "国際決済銀行（BIS）",
   "2024-03-04",
   "https://www.bis.org/publ/qtrpdf/r_qt2403x.htm",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "かぶオプのマーケットメイク対象銘柄を50銘柄へ拡大（2026年8月3日より）",
   "大阪取引所（日本取引所グループ）",
   "2026/06/05 発表",
   "https://www.jpx.co.jp/news/2041/20260605-02.html",
   "第23章"
  ],
  [
   "取引所・清算機関の資料",
   "かぶオプ取引のコツ 20 か条",
   "大阪取引所（日本取引所グループ）",
   "末尾に「2026.9」の記載（版番号なし。確認 2026-11-18）",
   "https://www.jpx.co.jp/corporate/learning/resources/kabuop20.pdf",
   "第14章、第15章"
  ],
  [
   "取引所・清算機関の資料",
   "その他制度",
   "大阪取引所（日本取引所グループ）",
   "2026/08/24 更新",
   "https://www.jpx.co.jp/derivatives/rules/others/index.html",
   "第06章"
  ],
  [
   "取引所・清算機関の資料",
   "その他制度（オンデマンド権利行使価格）",
   "大阪取引所（日本取引所グループ）",
   "2026/08/24 更新",
   "https://www.jpx.co.jp/derivatives/rules/others/index.html",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "マーケットメイカー制度",
   "大阪取引所（日本取引所グループ）",
   "ページ更新 2026/11/09",
   "https://www.jpx.co.jp/derivatives/rules/market-maker/",
   "第23章"
  ],
  [
   "取引所・清算機関の資料",
   "マーケットメイカー制度の取扱い",
   "大阪取引所（日本取引所グループ）",
   "2026 年 10 月 1 日改正、2026 年 11 月 2 日適用（講座 B 第12章の確認による版）",
   "https://www.jpx.co.jp/derivatives/rules/market-maker/tvdivq0000003l9t-att/t13vrt0000026eu7.pdf",
   "第23章"
  ],
  [
   "取引所・清算機関の資料",
   "先物取引のリスク（北浜投資塾）",
   "大阪取引所（日本取引所グループ）",
   "ページに更新日の記載なし（確認日 2026-11-18）",
   "https://www.jpx.co.jp/ose-toshijuku/column/futures_op_attraction/01.html",
   "第18章、第21章"
  ],
  [
   "取引所・清算機関の資料",
   "投資塾：契約（取引成立）から満期まで",
   "大阪取引所（日本取引所グループ）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/ose-toshijuku/column/futures_option/option/05.html",
   "第05章"
  ],
  [
   "取引所・清算機関の資料",
   "指数オプション取引制度要綱",
   "大阪取引所（日本取引所グループ）",
   "2026 年 6 月 1 日現在（2026 年 6 月改定）",
   "https://www.jpx.co.jp/derivatives/rules/outline/tvdivq0000003mke-att/nlsgeu000000v92b.pdf",
   "第05章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225オプション 仕様",
   "大阪取引所（日本取引所グループ）",
   "仕様のページ 2026-02-16 更新",
   "https://www.jpx.co.jp/derivatives/products/domestic/225options/01.html",
   "第02章、第27章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225オプション 制度概要",
   "大阪取引所（日本取引所グループ）",
   "2026/02/16 更新",
   "https://www.jpx.co.jp/derivatives/products/domestic/225options/01.html",
   "第03章、第05章、第06章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225オプション 銘柄",
   "大阪取引所（日本取引所グループ）",
   "更新日の記載なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/derivatives/products/domestic/225options/02.html",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225オプション取引に係る権利行使価格の設定方法の変更について",
   "大阪取引所（日本取引所グループ）",
   "2026/01/16 発表（2026 年 2 月 16 日のデイ・セッションに設定される銘柄から適用）",
   "https://www.jpx.co.jp/news/2040/20260116-01.html",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225マイクロ先物・ミニオプションの上場について",
   "大阪取引所（日本取引所グループ）",
   "2022/06/17 発表",
   "https://www.jpx.co.jp/news/2040/20220617-01.html",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225ミニオプション 制度概要",
   "大阪取引所（日本取引所グループ）",
   "2026/06/01 更新／ページ 2026/06/01 更新",
   "https://www.jpx.co.jp/derivatives/products/domestic/225mini-options/01.html",
   "第03章、第05章、第24章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225ミニオプション 商品概要",
   "大阪取引所（日本取引所グループ）",
   "2025/05/26 更新",
   "https://www.jpx.co.jp/derivatives/products/domestic/225mini-options/index.html",
   "第03章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225ミニオプション取引における限月設定方法の変更について",
   "大阪取引所（日本取引所グループ）",
   "2026/03/26 発表（2027 年 4 月を目途）／2026-03-26 発表",
   "https://www.jpx.co.jp/news/2040/20260326-01.html",
   "第03章、第24章"
  ],
  [
   "取引所・清算機関の資料",
   "日経225先物 制度概要",
   "大阪取引所（日本取引所グループ）",
   "2024/11/04 更新",
   "https://www.jpx.co.jp/derivatives/products/domestic/225futures/01.html",
   "第05章"
  ],
  [
   "取引所・清算機関の資料",
   "日経平均VI先物",
   "大阪取引所（日本取引所グループ）",
   "ページの更新日 2016/12/29",
   "https://www.jpx.co.jp/derivatives/products/vi/225-vi-futures/",
   "第25章"
  ],
  [
   "取引所・清算機関の資料",
   "理論（北浜投資塾）",
   "大阪取引所（日本取引所グループ）",
   "更新日の記載なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/ose-toshijuku/column/futures_option/option/03.html",
   "第09章、第10章、第11章"
  ],
  [
   "取引所・清算機関の資料",
   "用語集：権利行使日",
   "大阪取引所（日本取引所グループ）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/glossary/ka/137.html",
   "第05章"
  ],
  [
   "取引所・清算機関の資料",
   "用語集：特別清算数値（SQ値）",
   "大阪取引所（日本取引所グループ）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）／更新日の記載なし（確認 2026-11-18）",
   "https://www.jpx.co.jp/glossary/ta/326.html",
   "第05章、第25章"
  ],
  [
   "取引所・清算機関の資料",
   "先物・オプションレポート 2024 年 4 月号「日経225 オプションの Volatility surface を見る」",
   "日本取引所グループ（JPX）",
   "2024 年 4 月号",
   "https://www.jpx.co.jp/derivatives/market-report/futures-options-report/archives/bkk2ed0000006m8o-att/rerk2404.pdf",
   "第12章"
  ],
  [
   "規格・基準",
   "「日経平均ボラティリティー・インデックス」リアルタイム算出要領",
   "日本経済新聞社（指数の算出者）",
   "2025-01-20 版（2025-01-27 適用予定の記載、変更履歴の最終行に「（仮）」。2026-11-18 に再確認したが、後の版・正式版の公表は見つからなかった）",
   "https://indexes.nikkei.co.jp/nkave/archives/news/20250120J_2.pdf",
   "第13章"
  ],
  [
   "規格・基準",
   "よくあるご質問（日経平均ボラティリティー・インデックスおよび同先物指数について）",
   "日本経済新聞社（指数の算出者）",
   "2023-01-23 版",
   "https://indexes.Nikkei.co.jp/nkave/archives/faq/faq_nikkei_225_vi_jp.pdf",
   "第13章"
  ],
  [
   "取引所・清算機関の資料",
   "日経平均株価 算出要領",
   "日本経済新聞社（指数の算出者）",
   "2026 年 10 月 1 日版",
   "https://indexes.nikkei.co.jp/nkave/archives/file/nikkei_stock_average_guidebook_jp.pdf",
   "第02章"
  ],
  [
   "取引所・清算機関の資料",
   "VaR証拠金計算におけるオプション取引のシナリオ損益額に下限値を設定します",
   "日本証券クリアリング機構（JSCC）",
   "2025 年 1 月 27 日",
   "https://www.jpx.co.jp/jscc/information/news/20250127.html",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "上場デリバティブ2026年4月稼働案件に係る対応概要",
   "日本証券クリアリング機構（JSCC）",
   "版の履歴の最新 2025/11/28",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/shokokin_seido/u89at3000000i04f-att/outline.pdf",
   "第22章"
  ],
  [
   "取引所・清算機関の資料",
   "指数オプション取引の決済方法",
   "日本証券クリアリング機構（JSCC）",
   "更新日の表記なし（確認 2026 年 11 月 18 日）",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/acceptance_debt/shisuu_op.html",
   "第05章、第22章"
  ],
  [
   "取引所・清算機関の資料",
   "証拠金計算方式の変更（SPAN方式→VaR方式）に伴う証拠金水準の変化と特徴について",
   "日本証券クリアリング機構（JSCC）",
   "2023 年 10 月（資料の時点）",
   "https://www.jpx.co.jp/jscc/seisan/sakimono/shokokin_seido/u89at3000000i04f-att/varfeature_j.pdf",
   "第19章、第21章"
  ],
  [
   "団体の資料",
   "協会員の投資勧誘、顧客管理等に関する規則",
   "日本証券業協会",
   "2020 年 6 月 16 日改正（同年 7 月 1 日施行）の版",
   "https://www.jsda.or.jp/about/kisoku/200616_toushikanyu.pdf",
   "第26章"
  ],
  [
   "団体の資料",
   "自主規制規則・協会員における顧客管理、内部管理等",
   "日本証券業協会",
   "直近改正日の表示「2026 年 6 月 16 日」",
   "https://www.jsda.or.jp/shijyo/seido/jishukisei/web-handbook/101_kanri/index.html",
   "第26章"
  ],
  [
   "当局・公的機関",
   "The risks from hidden leverage in short-term equity options",
   "欧州中央銀行（ECB）",
   "Financial Stability Review、2023-11-22",
   "https://www.ecb.europa.eu/press/financial-stability-publications/fsr/focus/2023/html/ecb.fsrbox202311_02~0cf2c71d00.en.html",
   "第24章"
  ],
  [
   "当局・公的機関",
   "金融商品取引法（Financial Instruments and Exchange Act）第37条の3・第40条",
   "法務省（日本法令外国語訳データベース）",
   "最終更新の表示「令和四年法律第六十八号」（令和 5 年の改正の前の版）",
   "https://www.japaneselawtranslation.go.jp/en/laws/view/4633/ja",
   "第26章"
  ],
  [
   "当局・公的機関",
   "Release No. 34-105479（SR-CBOE-2026-016）",
   "米国 証券取引委員会（SEC）",
   "2026-05-13（承認か否かを決める手続きを始める命令）",
   "https://www.sec.gov/files/rules/sro/cboe/2026/34-105479.pdf",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Release No. 34-105763（SR-CBOE-2026-016）",
   "米国 証券取引委員会（SEC）",
   "2026-06-24（Order Granting Accelerated Approval）",
   "https://www.sec.gov/files/rules/sro/cboe/2026/34-105763.pdf",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Roundtable on Options Market Structure: Supporting Data",
   "米国 証券取引委員会（SEC）取引・市場部のスタッフ",
   "表紙の日付 2026-04-09",
   "https://www.sec.gov/files/roundtable-options-market-structure.pdf",
   "第24章"
  ],
  [
   "当局・公的機関",
   "令和５年金融商品取引法等改正に係る政令・内閣府令案等に関するパブリックコメントの結果等について",
   "金融庁",
   "2025 年 2 月 7 日公表（2025 年 4 月 1 日施行）",
   "https://www.fsa.go.jp/news/r6/shouken/20250207/20250207.html",
   "第26章"
  ]
 ]
});

CN.glossary([
  { t: '大阪取引所', en: 'Osaka Exchange', alias: 'OSE', d: '日本取引所グループのデリバティブ（先物・オプション）の取引所です。この講座では、日経225オプションと日経225ミニオプションの仕様と、最終決済の値（SQ 値）の公表元として出てきます。', ch: [28] },
  { t: '日本取引所グループ', en: 'Japan Exchange Group', alias: 'JPX', d: '大阪取引所などを傘下に持つ、日本の取引所グループです。この講座では、日経225オプションの商品ページの発行者として出てきます。', ch: [28] },
  { t: 'Cboe Global Markets', en: 'Cboe Global Markets, Inc.', alias: 'Cboe', d: '米国の取引所グループです。この講座では、S&P 500 を原資産とする指数オプション（SPX・SPXW・XSP）の上場元として出てきます。', ch: [28] },
  { t: '日本経済新聞社', en: 'Nikkei Inc.', alias: '日経', d: '日経平均株価の算出者です。この講座では、日経225オプションの原資産の指数の算出元として出てきます。', ch: [28] },
  { t: 'S&P ダウ・ジョーンズ・インデックス', en: 'S&P Dow Jones Indices', alias: 'S&P DJI', d: 'S&P 500 の算出者です。この講座では、S&P 500 の構成と算出の方法の公表元として出てきます。', ch: [28] },
  { t: '日本証券クリアリング機構', en: 'Japan Securities Clearing Corporation', alias: 'JSCC', d: '日本の金融商品取引清算機関です。この講座では、日経225オプションの清算と、証拠金・差金の授受の公表元として出てきます。', ch: [28] },
  { t: '日本証券業協会', en: 'Japan Securities Dealers Association', alias: 'JSDA', d: '証券会社などが会員の、自主規制の団体です。この講座では、取引開始基準などの協会員向けの規則の発行者として出てきます。', ch: [28] },
  { t: 'OCC', en: 'Options Clearing Corporation', alias: 'オプションズ・クリアリング・コーポレーション', d: '米国の上場オプションの清算機関です。この講座では、SPX などの米国の指数オプションの清算と、オプションの開示文書の公表元として出てきます（詳しい説明は第22章）。', ch: [28] },
  { t: 'SEC', en: 'U.S. Securities and Exchange Commission', alias: '米国証券取引委員会', d: '米国の証券市場を規制する当局です。この講座では、OCC の所管と、オプション市場の資料の公表元として出てきます。', ch: [28] }
]);

CN.exam([
  { part: 5, q: '日経225オプションについて、指数の算出、約定の成立、清算の担い手の組み合わせとして、この講座の説明に合うものはどれですか。',
    c: ['日経平均株価は日本経済新聞社が算出し、約定は大阪取引所で成立し、清算は日本証券クリアリング機構（JSCC）が担う', '指数の算出も約定の成立も清算も、すべて大阪取引所が 1 つで担う', '日経平均株価は大阪取引所が算出し、約定は日本経済新聞社で成立し、清算は証券会社が担う', '指数の算出は JSCC が行い、約定の成立と清算は日本経済新聞社が担う'], a: 0,
    why: '正答は、日経平均株価は日本経済新聞社が算出し、約定は大阪取引所で成立し、清算は日本証券クリアリング機構（JSCC）が担う、です。指数の算出者、取引所、清算機関は別の機関で、役割が違います（第02章・第22章・第28章）。', ch: [2, 22, 28] },
  { part: 5, q: '取引所や清算機関の規則の値（証拠金の額・取引時間・仕様など）を、資料や設計に書くときの扱いとして、この講座の説明に合うものはどれですか。',
    c: ['一度確かめた値は変わらないので、そのまま長く使う', '規則の版と時点をつけて書き、使うときは、発行者の現行のページで確かめ直す', 'この講座の演習の架空の値を、実在の水準として使う', '証券会社が顧客に求める額は、清算機関が求める額と、いつも同じなので、確かめなくてよい'], a: 1,
    why: '正答は、規則の版と時点をつけて書き、使うときは、発行者の現行のページで確かめ直す、です。仕様や証拠金の方式は、規則の改定で変わります。演習の値は架空で、清算機関が求める額と、請求元の証券会社が顧客に求める額は、同じとは限りません（第21章・第22章・第28章）。', ch: [21, 22, 28] }
]);
