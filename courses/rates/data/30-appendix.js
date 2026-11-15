/* 第30章（付録）の事実確認表（担当 RA、確認 2026-11-15）
この章は、新しい数字や版を足さない。c30-map は、各章の「参照資料」の表（種類が「当局・公的機関」「団体の資料」「取引所・清算機関の資料」の行。「教科書・一般知識・他講座」「架空」は除く）を集めた一覧（190 行。同じ資料名・発行者は 1 行にまとめた）。用語集は全章の CN.glossary の集計で、この章が登録するのは機関の名前だけ。
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | 日本銀行は日本の中央銀行。この講座では、金融政策の決定と公表、バランスシートと当座預金の統計の公表元として出てくる。共通 GLOSSARY §4 の主体の呼び方（初出は日本銀行〔Bank of Japan〕、以後は日銀） | — | — | 金融 3 講座の共通 GLOSSARY-RULES §4 | — | — | 2026-11-15 | 用語集 |
| 2 | 定義 | 財務省は日本の国の財政を担当する省で、国債の発行の主体。この講座では、国債発行計画と入札の公表元（第08章） | — | — | 共通 GLOSSARY-RULES §4、第08章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 3 | 定義 | FRB（Federal Reserve System）は米国の中央銀行制度。理事会と複数の連邦準備銀行などで成り立つ。この講座では FRB と書き、理事会の説明は第23章。連邦準備銀行は 12 行（第23章 #16：FOMC の構成の説明）、理事は 7 人（同） | 12 行／7 人 | 2026-11-15 | FRB『Federal Open Market Committee』（第23章 #16 から写した） | — | — | 2026-11-15 | 用語集 |
| 4 | 定義 | ニューヨーク連邦準備銀行（NY 連銀）は、連邦準備銀行の 1 つ。FOMC の指示で公開市場操作を実施し、SOFR・EFFR を公表する（第06章・第15章・第23章） | — | — | 共通 GLOSSARY-RULES §4、第23章 #10 | — | — | 2026-11-15 | 用語集 |
| 5 | 定義 | 米財務省は米国債の発行の主体で、TGA の持ち主（第24章） | — | — | 共通 GLOSSARY-RULES §4、第24章の事実確認表 | — | — | 2026-11-15 | 用語集 |
| 6 | 一般知識 | 総合テストの横断問題 2 問は、第I2章・第25〜28章・第24章で説明した「公表値の読み方」「国債の発行代金の払込みでの資金の動き」から作った。数字を含まない | — | — | この講座の第I2章・第24章・第28章 | — | — | 2026-11-15 | 総合テスト |

演習の照合（第30章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| 総合テスト 横断 1 | 何日現在か・計画か実績か・単位・版を確かめる | 第I2章 本文「何日現在か、計画か実績か」、第28章 | 同じ名前の値でも時点・版が違えば別の値。発行計画の値は計画で、入札の結果ではない | ○ |
| 総合テスト 横断 2 | 当座預金が減り、政府の口座が増える（他の要因が同じ場合） | 第24章 c24-tax、第19章 c19-factors | 納税・国債の発行代金の払込みは、準備から政府の口座へ資金が移る。財政等要因がマイナス | ○ |
*/

CN.add('table', 'c30-map', {
 "title": "統計と資料の地図：公表者ごとの資料の一覧（各章の「参照資料」を 1 つにまとめたもの）",
 "caption": "発行者で絞って探せます。「関連章」は、その資料を使った章です。版・時点・リンクは各章の「参照資料」と発行者の公式ページで確かめます（一覧は 2026 年 11 月 15 日時点）。URL が「各章の参照資料で確かめる」の行は、その章の参照資料の表で確かめます",
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
   "取引所・清算機関の資料",
   "Government Securities Division (GSD)",
   "DTCC",
   "Data as of Q2 2026",
   "https://www.dtcc.com/products-and-services/clearing-settlement-services/fixed-income-clearing-corporation-ficc/government-securities-division-gsd",
   "第11章、第12章"
  ],
  [
   "当局・公的機関",
   "TRACE Reporting Timeframes",
   "FINRA",
   "2024 年 3 月 29 日の版",
   "https://www.finra.org/filing-reporting/trade-reporting-and-compliance-engine-trace/trace-reporting-timeframes",
   "第10章"
  ],
  [
   "当局・公的機関",
   "Calendar: October 2026",
   "FRB",
   "確認 2026 年 11 月 15 日",
   "https://www.federalreserve.gov/newsevents/2026-october.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Data Download Program and Federal Reserve Economic Data Partnership",
   "FRB",
   "ページの更新日 2026 年 11 月 12 日",
   "https://www.federalreserve.gov/data/data-download-fred-information.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Discount Window",
   "FRB",
   "ページ表示の更新日 2024 年 5 月 20 日",
   "https://www.federalreserve.gov/monetarypolicy/discountrate.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "FIMA Repo Facility",
   "FRB",
   "ページの更新日 2022 年 3 月 24 日",
   "https://www.federalreserve.gov/monetarypolicy/fima-repo-facility.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "FOMC Meeting Calendars and Information",
   "FRB",
   "2026-11-12 更新",
   "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
   "第23章"
  ],
  [
   "当局・公的機関",
   "FOMC Meeting calendars and information",
   "FRB",
   "ページの更新日 2026 年 11 月 12 日",
   "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "FOMC 声明（2021 年 7 月 28 日）",
   "FRB",
   "2021 年 7 月 28 日",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20210728b.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "Federal Open Market Committee",
   "FRB",
   "2026-10-28 更新",
   "https://www.federalreserve.gov/monetarypolicy/fomc.htm",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve Balance Sheet Developments（2026 年 5 月）",
   "FRB",
   "2026-05-28 更新",
   "https://www.federalreserve.gov/monetarypolicy/May-2026-Federal-Reserve-Balance-Sheet-Developments.htm",
   "第26章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve Balance Sheet: Factors Affecting Reserve Balances - H.4.1",
   "FRB",
   "2026-11-12 公表",
   "https://www.federalreserve.gov/releases/h41/current/",
   "第24章、第26章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve Board issues final rule amending Regulation D with regard to interest on reserve balances",
   "FRB",
   "2021 年 6 月 2 日発表、同年 7 月 29 日施行",
   "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20210602a.htm",
   "第14章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve announces revised tentative schedule of Federal Open Market Committee meetings in 2027",
   "FRB",
   "2026 年 11 月 12 日",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261112a.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve issues FOMC statement（2026-09-16）",
   "FRB",
   "2026-09-16",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve issues FOMC statement（2026-10-28）",
   "FRB",
   "2026-10-28",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm",
   "第23章"
  ],
  [
   "当局・公的機関",
   "H.4.1 About the Release",
   "FRB",
   "2015-06-04 更新 ／ 確認 2026 年 11 月 15 日",
   "https://www.federalreserve.gov/RELEASES/h41/about.htm",
   "第26章、第28章"
  ],
  [
   "当局・公的機関",
   "H.4.1 Release Dates",
   "FRB",
   "2026-11-12 更新",
   "https://www.federalreserve.gov/releases/h41/",
   "第26章、第27章"
  ],
  [
   "当局・公的機関",
   "H.4.1（Factors Affecting Reserve Balances）",
   "FRB",
   "2026-11-12 公表（水曜 2026-11-11 の値）",
   "各章の参照資料で確かめる",
   "序章2"
  ],
  [
   "当局・公的機関",
   "H.4.1（現行の版の PDF）",
   "FRB",
   "2026-11-12 公表",
   "https://www.federalreserve.gov/releases/h41/current/h41.pdf",
   "第26章"
  ],
  [
   "当局・公的機関",
   "H.8 About",
   "FRB",
   "確認 2026 年 11 月 15 日",
   "https://www.federalreserve.gov/releases/H8/about.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "H.8 About the Release",
   "FRB",
   "2024-03-08 更新",
   "https://www.federalreserve.gov/releases/H8/about.htm",
   "第27章"
  ],
  [
   "当局・公的機関",
   "H.8（2026 年 9 月 4 日公表の版）",
   "FRB",
   "2026-09-04 公表",
   "https://federalreserve.gov/releases/h8/20260904",
   "第27章"
  ],
  [
   "当局・公的機関",
   "History of the FOMC's Policy Normalization Discussions and Communications",
   "FRB",
   "2025-11-26 更新",
   "https://www.federalreserve.gov/monetarypolicy/policy-normalization-discussions-communications-history.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Implementation Note issued October 28, 2026",
   "FRB",
   "2026 年 10 月 28 日（10 月 29 日から有効） ／ 2026-10-28 発行、効力 2026-10-29 ／ 2026-10-28（有効 2026-10-29）",
   "https://federalreserve.gov/newsevents/pressreleases/monetary20261028a1.htm",
   "序章2、第17章、第23章"
  ],
  [
   "当局・公的機関",
   "Implementation Note issued October 29, 2025",
   "FRB",
   "2025 年 10 月 29 日（10 月 30 日から有効）",
   "https://federalreserve.gov/newsevents/pressreleases/monetary20251029a1.htm",
   "第17章"
  ],
  [
   "当局・公的機関",
   "Implementation Note issued September 16, 2026",
   "FRB",
   "2026-09-16 発行、効力 2026-09-17",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Implementation Note（2026 年 10 月 28 日）",
   "FRB",
   "2026 年 10 月 28 日",
   "https://federalreserve.gov/newsevents/pressreleases/monetary20261028a1.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "Interest on Reserve Balances (IORB) Frequently Asked Questions",
   "FRB",
   "2025-12-12 更新 ／ ページの更新 2025 年 12 月 12 日",
   "https://www.federalreserve.gov/monetarypolicy/iorb-faqs.htm",
   "第14章、第23章"
  ],
  [
   "当局・公的機関",
   "Minutes of the Board's discount rate meetings（2026-07-20・07-29）",
   "FRB",
   "2026-08-25 公表",
   "https://www.federalreserve.gov/newsevents/pressreleases/files/monetary20260825a1.pdf",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Open market operations",
   "FRB",
   "2021-05-10 更新",
   "https://www.federalreserve.gov/monetarypolicy/bst_openmarketops.htm",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Overnight Reverse Repurchase Agreement Operations",
   "FRB",
   "2026-05-12 更新 ／ 確認日 2026-11-15",
   "https://www.federalreserve.gov/monetarypolicy/overnight-reverse-repurchase-agreements.htm",
   "第23章、第27章"
  ],
  [
   "当局・公的機関",
   "Plans for Reducing the Size of the Federal Reserve's Balance Sheet",
   "FRB",
   "2022 年 5 月 4 日",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20220504b.htm",
   "第17章"
  ],
  [
   "当局・公的機関",
   "Reserve Requirements",
   "FRB",
   "ページの更新 2025 年 11 月 26 日",
   "https://www.federalreserve.gov/monetarypolicy/reservereq.htm",
   "第14章"
  ],
  [
   "当局・公的機関",
   "Responding to Financial System Emergencies",
   "FRB",
   "ページの更新日 2023 年 4 月 21 日",
   "https://federalreserve.gov/financial-stability/responding-to-financial-system-emergencies.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "Stigma and the Discount Window（FEDS Notes）",
   "FRB",
   "2017 年 12 月 19 日",
   "https://www.federalreserve.gov/econres/notes/feds-notes/stigma-and-the-discount-window-20171219.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "実施の指示（Implementation Note）",
   "FRB",
   "2026 年 10 月 28 日発表（IORB と実施の指示は 10 月 29 日から）",
   "https://federalreserve.gov/newsevents/pressreleases/monetary20261028a1.htm",
   "第16章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve issues FOMC statement",
   "FRB（FOMC の声明）",
   "2025 年 10 月 29 日",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20251029a.htm",
   "第17章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve issues FOMC statement（2020-03-15）",
   "FRB（FOMC）",
   "2020-03-15",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20200315a.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve issues FOMC statement（2026-10-28）",
   "FRB（FOMC）",
   "2026-10-28",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Implementation Note issued December 10, 2025",
   "FRB（FOMC）",
   "2025-12-10",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20251210a1.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Implementation Note issued October 29, 2025",
   "FRB（FOMC）",
   "2025-10-29",
   "https://federalreserve.gov/newsevents/pressreleases/monetary20251029a1.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Plans for Reducing the Size of the Federal Reserve's Balance Sheet",
   "FRB（FOMC）",
   "2022-05-04",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20220504b.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Statement Regarding Monetary Policy Implementation and Balance Sheet Normalization",
   "FRB（FOMC）",
   "2019-01-30",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20190130c.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "What Happened in Money Markets in September 2019?",
   "FRB（理事会のスタッフ、FEDS Notes）",
   "2020-02-27",
   "https://www.federalreserve.gov/econres/notes/feds-notes/what-Happened-in-Money-Markets-in-September-2019-20200227.htm",
   "第22章、第24章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve announces it will initiate a program to purchase the direct obligations of housing-related GSEs and MBS",
   "FRB（理事会）",
   "2008-11-25",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20081125b.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Statement Regarding Repurchase Agreement Arrangements",
   "FRB（理事会）",
   "2021-07-28",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20210728b.htm",
   "第22章"
  ],
  [
   "当局・公的機関",
   "2025 Fedwire Funds PFMI Disclosure",
   "Federal Reserve Financial Services（連邦準備銀行）",
   "2025 年 12 月 5 日",
   "https://www.frbservices.org/wp-content/uploads/funds-service-disclosure.pdf",
   "第12章"
  ],
  [
   "当局・公的機関",
   "Fedwire Securities Service",
   "Federal Reserve Financial Services（連邦準備銀行）",
   "日付の記載なし（© 2026）",
   "https://www.frbservices.org/financial-services/securities",
   "第12章"
  ],
  [
   "取引所・清算機関の資料",
   "国債店頭取引清算業務：債務引受",
   "JPX（日本証券クリアリング機構）",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://www.jpx.co.jp/jscc/seisan/tentou/acceptance_debt.html",
   "第12章"
  ],
  [
   "当局・公的機関",
   "Additional Information about Reference Rates",
   "NY 連銀",
   "2026-10-05 更新",
   "https://www.newyorkfed.org/markets/reference-rates/additional-information-about-reference-rates",
   "第27章"
  ],
  [
   "当局・公的機関",
   "Additional Information about Reference Rates Administered by the New York Fed",
   "NY 連銀",
   "ページの最終更新 2026 年 10 月 5 日 ／ 最終更新 2026 年 10 月 5 日",
   "https://www.newyorkfed.org/markets/reference-rates/additional-information-about-reference-rates",
   "第01章、第11章"
  ],
  [
   "当局・公的機関",
   "Additional Information about the Treasury Repo Reference Rates",
   "NY 連銀",
   "Last Updated 2026 年 10 月 5 日",
   "https://www.newyorkfed.org/markets/treasury-repo-reference-rates-information",
   "第06章"
  ],
  [
   "当局・公的機関",
   "Effective Federal Funds Rate",
   "NY 連銀",
   "ページ日付なし（確認日 2026-11-15） ／ 日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.newyorkfed.org/markets/reference-rates/effr",
   "第06章、第27章"
  ],
  [
   "当局・公的機関",
   "FAQs: Reserve Management Purchases and Reinvestment Purchases",
   "NY 連銀",
   "2026-06-17 付",
   "https://www.newyorkfed.org/markets/reserve-management-reinvestment-purchases-faq",
   "第23章"
  ],
  [
   "当局・公的機関",
   "FAQs: Reverse Repurchase Agreement Operations",
   "NY 連銀",
   "2026 年 9 月 16 日 ／ 2026-09-16 付",
   "https://www.newyorkfed.org/markets/rrp_faq",
   "第15章、第16章、第23章"
  ],
  [
   "当局・公的機関",
   "FAQs: Standing Repurchase Agreement Operations",
   "NY 連銀",
   "2026 年 9 月 16 日 ／ 2026-09-16 付",
   "https://www.newyorkfed.org/markets/repo-agreement-ops-faq",
   "第15章、第16章、第23章"
  ],
  [
   "当局・公的機関",
   "Primary Dealers",
   "NY 連銀",
   "2026 年 11 月 15 日に閲覧（更新日の記載なし）",
   "https://www.newyorkfed.org/markets/primarydealers",
   "第09章"
  ],
  [
   "当局・公的機関",
   "Reverse Repo",
   "NY 連銀",
   "ページ日付なし（確認日 2026-11-15）",
   "https://www.newyorkfed.org/markets/desk-operations/reverse-repo",
   "第27章"
  ],
  [
   "当局・公的機関",
   "SOFR Averages and Index Data",
   "NY 連銀",
   "日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.newyorkfed.org/markets/reference-rates/sofr-averages-and-index",
   "第06章"
  ],
  [
   "当局・公的機関",
   "Secured Overnight Financing Rate Data",
   "NY 連銀",
   "ページ日付なし（確認日 2026-11-15） ／ 日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.newyorkfed.org/markets/reference-rates/sofr",
   "第06章、第27章"
  ],
  [
   "当局・公的機関",
   "Statement Regarding Reserve Management Purchases Operations",
   "NY 連銀",
   "2025-12-10",
   "https://www.newyorkfed.org/markets/opolicy/operating_policy_251210a",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Statement Regarding Treasury Bill Purchases and Repurchase Operations",
   "NY 連銀",
   "2019-10-11",
   "https://www.newyorkfed.org/markets/opolicy/operating_policy_191011",
   "第22章"
  ],
  [
   "当局・公的機関",
   "System Open Market Account Holdings of Domestic Securities",
   "NY 連銀",
   "確認日 2026-11-15",
   "https://www.newyorkfed.org/markets/soma-holdings",
   "第23章"
  ],
  [
   "当局・公的機関",
   "Treasury Securities Operational Details",
   "NY 連銀",
   "日付の表示なし（最新の項目は 2026 年 10 月 30 日の発表） ／ 確認日 2026-11-15",
   "https://www.newyorkfed.org/markets/domestic-market-operations/monetary-policy-implementation/treasury-securities/treasury-securities-operational-details",
   "第15章、第23章"
  ],
  [
   "当局・公的機関",
   "The Implementation of Reserve Management Purchases to Maintain Ample Reserves",
   "NY 連銀（Markets Group の職員）",
   "2026-03-31",
   "https://tellerwindow.newyorkfed.org/2026/03/31/the-implementation-of-reserve-management-purchases-to-maintain-ample-reserves/",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Haircuts in Treasury Repo: A Look at the Non-Centrally Cleared Bilateral Repo Market",
   "NY 連銀（The Teller Window）",
   "2025 年 4 月 8 日（著者の見解で、公式見解とは限らないと注記）",
   "https://tellerwindow.newyorkfed.org/2025/04/08/haircuts-in-treasury-repo-a-look-at-the-non-centrally-cleared-bilateral-repo-market/",
   "第11章"
  ],
  [
   "当局・公的機関",
   "The Market Events of Mid-September 2019（Staff Report No. 918）",
   "NY 連銀（スタッフ）",
   "2020 年 3 月",
   "https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr918.pdf",
   "第22章"
  ],
  [
   "当局・公的機関",
   "Statement Regarding Treasury Bill Purchases and Repurchase Operations／Federal Reserve issues FOMC statement",
   "ニューヨーク連邦準備銀行／FRB",
   "2019-10-11／2020-03-15",
   "各章の参照資料で確かめる",
   "序章2"
  ],
  [
   "当局・公的機関",
   "令和６年度決算検査報告（抜粋）：日本銀行の財務の状況",
   "会計検査院（日本銀行のサイトの掲載）",
   "令和 6 年度",
   "https://www.boj.or.jp/about/services/kokai/data/j07kensa05.pdf",
   "第14章"
  ],
  [
   "取引所・清算機関の資料",
   "TONA Conventions (Calculation Methodology) and Example of Schedule（日本語版。題は「コンベンション・ルール（利息計算方式）」）",
   "大阪取引所",
   "版・改正日の記載なし（© 2024）",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/TONA%20Conventions%20(Calculation%20Methodology)%20and%20Example%20of%20Schedule_JP.pdf",
   "第01章"
  ],
  [
   "取引所・清算機関の資料",
   "コンベンション・ルール（利息計算方式）（TONA 3 か月金利先物）",
   "大阪取引所",
   "2024 年の著作権表示（版の記載なし）",
   "https://www.jpx.co.jp/derivatives/products/interest-rate/3m-tona-futures/TONA Conventions (Calculation Methodology) and Example of Schedule_JP.pdf",
   "第06章"
  ],
  [
   "当局・公的機関",
   "公社債店頭売買参考統計値",
   "日本証券業協会",
   "2026 年 11 月 15 日に閲覧",
   "https://market.jsda.or.jp/shijyo/saiken/baibai/baisanchi/index.html",
   "第10章"
  ],
  [
   "団体の資料",
   "公社債店頭売買参考統計値発表制度について（詳細版）",
   "日本証券業協会",
   "2023 年 5 月 18 日",
   "https://market.jsda.or.jp/shijyo/saiken/baibai/kehai2/files/happyouseido(syousai).pdf",
   "第03章"
  ],
  [
   "団体の資料",
   "（債券の）経過利子",
   "日本証券業協会",
   "更新日の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.jsda.or.jp/shijyo/seido/jishukisei/words/0083.html",
   "第02章"
  ],
  [
   "団体の資料",
   "金融所得課税の一体化（公社債等の課税方式の見直し）に伴う国内債券の店頭売買における経過利子の取扱いについて",
   "日本証券業協会（自主規制ルール）",
   "2016 年 1 月 1 日施行（制定・改正の日の記載なし）",
   "https://www.jsda.or.jp/shijyo/seido/jishukisei/web-handbook/106_saiken/files/106_saiken_kisoku-01.pdf",
   "第02章"
  ],
  [
   "当局・公的機関",
   "2026 年の金融政策決定会合の開催予定日に関する件（7 月 30・31 日）",
   "日本銀行",
   "2025 年 7 月 30・31 日の決定",
   "https://www.boj.or.jp/about/organization/policyboard/pb_geppo/data/pbgp2507e.pdf",
   "第21章"
  ],
  [
   "当局・公的機関",
   "2027 年の金融政策決定会合等の日程",
   "日本銀行",
   "2026 年 7 月 31 日",
   "https://www.boj.or.jp/mopo/mpmsche_minu/m_ref/mref260731a.pdf",
   "第21章、第28章"
  ],
  [
   "当局・公的機関",
   "API 機能利用時の留意点について",
   "日本銀行",
   "日付の表示なし",
   "https://www.stat-search.boj.or.jp/info/api_notice.pdf",
   "第28章"
  ],
  [
   "当局・公的機関",
   "「コール市場関連統計」の解説",
   "日本銀行",
   "日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.boj.or.jp/statistics/outline/exp/exmenu_m.pdf",
   "第06章"
  ],
  [
   "当局・公的機関",
   "「マイナス金利付き量的・質的金融緩和」の導入",
   "日本銀行",
   "2016 年 1 月 29 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2016/k160129a.pdf",
   "第20章"
  ],
  [
   "当局・公的機関",
   "「営業毎旬報告」および「日本銀行勘定」の変更について",
   "日本銀行",
   "2026 年 2 月 3 日",
   "https://www.boj.or.jp/statistics/outline/notice_2026/not260203a.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "オペレーション",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/fm/ope/index.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "オペレーション等の一覧",
   "日本銀行",
   "日付の表示なし",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/index.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "オペレーション（公開市場操作）にはどのような種類がありますか？",
   "日本銀行",
   "日付の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/seisaku/b34.htm",
   "第13章、第15章"
  ],
  [
   "当局・公的機関",
   "オペレーション（統計）",
   "日本銀行",
   "日次は 2026 年 11 月 13 日分まで、月次は 2026 年 11 月 9 日掲載（10 月分）",
   "https://www.boj.or.jp/statistics/boj/fm/ope/index.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "コール市場関連統計（毎営業日）",
   "日本銀行",
   "確認 2026 年 11 月 15 日（掲載データの最新日は 2026 年 11 月 13 日）",
   "https://www.boj.or.jp/statistics/market/short/mutan/index.htm",
   "第06章"
  ],
  [
   "当局・公的機関",
   "コール市場（教えて！にちぎん）",
   "日本銀行",
   "日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.boj.or.jp/about/education/oshiete/glossary/market/m08.htm",
   "第06章"
  ],
  [
   "当局・公的機関",
   "マネタリーベース",
   "日本銀行",
   "確認 2026 年 11 月（2026 年 10 月分、掲載 2026 年 11 月 4 日）",
   "https://www.boj.or.jp/statistics/boj/other/mb/mb.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "以前の「公定歩合」は、現在、どのように位置づけられていますか？",
   "日本銀行",
   "日付の表示なし ／ 更新日の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/seisaku/b38.htm",
   "第16章、第18章、第21章"
  ],
  [
   "当局・公的機関",
   "共通担保資金供給オペレーション基本要領",
   "日本銀行",
   "決定 2006 年 4 月 11 日、最終改正 2026 年 9 月 18 日",
   "https://www.boj.or.jp/mopo/measures/term_cond/yoryo33.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "営業毎旬報告",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/other/acmai/index.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "営業毎旬報告（令和 8 年 10 月 20 日現在）",
   "日本銀行",
   "2026 年 10 月 20 日現在",
   "https://www.boj.or.jp/statistics/boj/other/acmai/release/2026/ac261020.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "営業毎旬報告（令和8年10月10日現在）",
   "日本銀行",
   "2026 年 10 月 14 日掲載。単位は千円 ／ 2026-10-14 掲載",
   "https://www.boj.or.jp/statistics/boj/other/acmai/release/2026/ac261010.htm",
   "第13章、第24章"
  ],
  [
   "当局・公的機関",
   "営業毎旬報告（令和8年10月31日現在）",
   "日本銀行",
   "2026-10-31 現在（2026-11-04 公表）",
   "各章の参照資料で確かめる",
   "序章2"
  ],
  [
   "当局・公的機関",
   "当面の金融政策運営について",
   "日本銀行",
   "2024 年 12 月 19 日 ／ 2024 年 6 月 14 日 ／ 2025 年 6 月 17 日 ／ 2026 年 10 月 30 日 ／ 2026 年 7 月 31 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2026/k261030a.pdf",
   "第16章、第17章、第20章、第21章"
  ],
  [
   "当局・公的機関",
   "手形売出オペ",
   "日本銀行",
   "日付の表示なし",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/ope_d/index.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "日本銀行が運営する国債振替決済制度に関する情報開示",
   "日本銀行",
   "2025 年 7 月 31 日",
   "https://www.boj.or.jp/paym/outline/pay_boj/pboj250731b.pdf",
   "第12章"
  ],
  [
   "当局・公的機関",
   "日本銀行のバランスシートについて― 日本銀行の政策・業務との関係 ―",
   "日本銀行",
   "2016 年 12 月現在",
   "https://www.boj.or.jp/about/outline/expboj_bs.htm",
   "第19章"
  ],
  [
   "当局・公的機関",
   "日本銀行関連統計",
   "日本銀行",
   "確認日 2026-11-15",
   "https://www.boj.or.jp/statistics/boj/index.htm",
   "第24章"
  ],
  [
   "当局・公的機関",
   "日本銀行関連統計：その他",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/other/index.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "日銀ネットとは何ですか？",
   "日本銀行",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://www.boj.or.jp/announcements/education/oshiete/kess/i10.htm/",
   "第12章"
  ],
  [
   "当局・公的機関",
   "日銀当座預金増減要因と金融調節（実績）",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/fm/juqf/index.htm",
   "第19章、第25章"
  ],
  [
   "当局・公的機関",
   "日銀当座預金増減要因と金融調節（実績）の注釈",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/outline/note/notest1.htm",
   "第19章"
  ],
  [
   "当局・公的機関",
   "日銀当座預金増減要因と金融調節（毎営業日更新）",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/fm/juq/index.htm",
   "第19章、第25章"
  ],
  [
   "当局・公的機関",
   "日銀当座預金増減要因（見込み）",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/fm/juqp/index.htm",
   "第19章、第25章"
  ],
  [
   "当局・公的機関",
   "時系列統計データ検索サイトにおけるAPI機能の提供開始",
   "日本銀行",
   "2026 年 2 月 18 日",
   "https://www.boj.or.jp/statistics/outline/notice_2026/not260218a.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "業態別の日銀当座預金残高",
   "日本銀行",
   "確認 2026 年 11 月（2026 年 9 月分、掲載 2026 年 10 月 16 日）",
   "https://www.boj.or.jp/statistics/boj/other/cabs/index.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "準備預金制度とは何ですか？ 超過準備とは何ですか？",
   "日本銀行",
   "日付の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/seisaku/b33.htm",
   "第14章、第16章"
  ],
  [
   "当局・公的機関",
   "準備預金制度における準備率 公表データ",
   "日本銀行",
   "日付の表示なし（1991 年 10 月 16 日実施の列）",
   "https://www.boj.or.jp/statistics/boj/other/reservereq/junbi.htm",
   "第14章"
  ],
  [
   "当局・公的機関",
   "無担保コールレート（オーバーナイト物）とは何ですか？ 資金過不足とは何ですか？",
   "日本銀行",
   "日付の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/seisaku/b32.htm",
   "第19章"
  ],
  [
   "当局・公的機関",
   "特融（日銀特融）とは何ですか？",
   "日本銀行",
   "更新日の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/pfsys/e17.htm",
   "第18章"
  ],
  [
   "当局・公的機関",
   "短期金融市場（教えて！にちぎん）",
   "日本銀行",
   "日付の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.boj.or.jp/about/education/oshiete/glossary/market/m07.htm",
   "第06章"
  ],
  [
   "当局・公的機関",
   "補完当座預金制度基本要領",
   "日本銀行",
   "決定 2016 年 1 月 29 日、最終改正 2026 年 9 月 18 日",
   "https://www.boj.or.jp/mopo/measures/term_cond/yoryo37.htm",
   "第14章"
  ],
  [
   "当局・公的機関",
   "補完当座預金制度（金融政策手段）",
   "日本銀行",
   "制度変更一覧の最新の掲載日 2026 年 9 月 18 日",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/oth_a/index.htm",
   "第14章"
  ],
  [
   "当局・公的機関",
   "補完貸付の概要",
   "日本銀行",
   "2024 年 4 月 1 日現在の表示",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/len_a/opetori15.htm",
   "第18章、第21章"
  ],
  [
   "当局・公的機関",
   "補完貸付制度基本要領",
   "日本銀行",
   "最終改正 2017 年 1 月 31 日 ／ 決定 2001 年 2 月 28 日、最終改正 2017 年 1 月 31 日（要領の表示）",
   "https://www.boj.or.jp/mopo/measures/term_cond/yoryo20.htm",
   "第16章、第18章"
  ],
  [
   "当局・公的機関",
   "通貨及び金融の調節に関する報告書",
   "日本銀行",
   "令和 8 年 6 月",
   "https://www.boj.or.jp/mopo/diet/d_report_2026/semi2606a.pdf",
   "第17章"
  ],
  [
   "当局・公的機関",
   "適格担保取扱基本要領",
   "日本銀行",
   "決定 2000 年 10 月 13 日（ページに載る最終改正 2017 年 1 月 31 日）",
   "https://www.boj.or.jp/mopo/measures/term_cond/yoryo18.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "量的・質的金融緩和の導入について",
   "日本銀行",
   "2013 年 4 月 4 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2013/k130404a.pdf",
   "第20章"
  ],
  [
   "当局・公的機関",
   "金融市場調節方式の変更と一段の金融緩和措置について",
   "日本銀行",
   "2001 年 3 月 19 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2001/k010319a.htm",
   "第20章"
  ],
  [
   "当局・公的機関",
   "金融市場調節方針の変更および長期国債買入れの減額計画の決定について",
   "日本銀行",
   "2024 年 7 月 31 日",
   "https://www.boj.or.jp/mopo/mpmdeci/state_2024/k240731a.htm",
   "第17章、第20章"
  ],
  [
   "当局・公的機関",
   "金融市場調節方針の変更について",
   "日本銀行",
   "2006 年 3 月 9 日 ／ 2025 年 1 月 24 日 ／ 2025 年 12 月 19 日 ／ 2026 年 6 月 16 日 ／ 2026 年 9 月 18 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2026/k260918a.pdf",
   "第18章、第20章、第21章"
  ],
  [
   "当局・公的機関",
   "金融市場調節関連の統計の一覧",
   "日本銀行",
   "確認 2026 年 11 月",
   "https://www.boj.or.jp/statistics/boj/fm/index.htm",
   "第19章、第25章"
  ],
  [
   "当局・公的機関",
   "金融政策の多角的レビュー",
   "日本銀行",
   "更新日の表示なし",
   "https://www.boj.or.jp/mopo/outline/bpreview/",
   "第20章"
  ],
  [
   "当局・公的機関",
   "金融政策の多角的レビュー 2024 年 12 月 主なポイント",
   "日本銀行",
   "2024 年 12 月",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2024/k241219c.pdf",
   "第20章"
  ],
  [
   "当局・公的機関",
   "金融政策の枠組みの見直しについて",
   "日本銀行",
   "2024 年 3 月 19 日",
   "https://www.boj.or.jp/mopo/mpmdeci/state_2024/k240319a.htm",
   "第20章"
  ],
  [
   "当局・公的機関",
   "金融政策決定会合とは何ですか？ いつ開催されるのですか？",
   "日本銀行",
   "更新日の表示なし",
   "https://www.boj.or.jp/announcements/education/oshiete/seisaku/b20.htm/",
   "第21章"
  ],
  [
   "当局・公的機関",
   "金融政策決定会合における主な意見 2026 年",
   "日本銀行",
   "確認 2026 年 11 月 15 日",
   "https://www.boj.or.jp/mopo/mpmsche_minu/opinion_2026/index.htm",
   "第21章"
  ],
  [
   "当局・公的機関",
   "金融政策決定会合の議事要旨や議事録は、いつ公表されるのですか？",
   "日本銀行",
   "更新日の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/seisaku/b21.htm",
   "第21章"
  ],
  [
   "当局・公的機関",
   "金融政策決定会合議事要旨（2026 年 9 月 17、18 日開催分）",
   "日本銀行",
   "2026 年 11 月 5 日",
   "https://www.boj.or.jp/mopo/mpmsche_minu/minu_2026/g260918.pdf",
   "第21章"
  ],
  [
   "当局・公的機関",
   "金融緩和強化のための新しい枠組み：「長短金利操作付き量的・質的金融緩和」",
   "日本銀行",
   "2016 年 9 月 21 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2016/k160921a.pdf",
   "第20章"
  ],
  [
   "当局・公的機関",
   "銀行券が日本銀行のバランスシートにおいて負債に計上されているのはなぜですか？",
   "日本銀行",
   "日付の表示なし",
   "https://www.boj.or.jp/about/education/oshiete/outline/a23.htm",
   "第13章"
  ],
  [
   "当局・公的機関",
   "長期国債の買入れ計画について",
   "日本銀行",
   "2026 年 6 月 16 日",
   "https://www.boj.or.jp/mopo/mpmdeci/mpr_2026/k260616b.pdf",
   "第17章、第21章"
  ],
  [
   "当局・公的機関",
   "日本銀行のバランスシートについて ─ 日本銀行の政策・業務との関係 ─",
   "日本銀行企画局",
   "本文の時点は 2016 年 12 月",
   "https://www.boj.or.jp/about/outline/expboj_bs.htm",
   "第13章"
  ],
  [
   "当局・公的機関",
   "2026 年第２四半期の資金循環（速報）参考図表",
   "日本銀行調査統計局",
   "2026 年 9 月 17 日公表。2026 年 6 月末、速報",
   "https://www.boj.or.jp/statistics/sj/sjexp.pdf",
   "第07章"
  ],
  [
   "当局・公的機関",
   "マネタリーベースの解説ページ",
   "日本銀行調査統計局",
   "2015 年 9 月",
   "https://www.boj.or.jp/statistics/outline/exp/exbase.htm",
   "第25章"
  ],
  [
   "当局・公的機関",
   "「FSBレポ統計の日本分集計結果」の解説",
   "日本銀行金融市場局",
   "2020 年 10 月作成",
   "https://www.boj.or.jp/statistics/outline/exp/exrepo.htm",
   "第11章"
  ],
  [
   "当局・公的機関",
   "国債市場の流動性指標",
   "日本銀行金融市場局",
   "2026 年 9 月 30 日公表",
   "https://www.boj.or.jp/paym/bond/ryudo.pdf",
   "第10章"
  ],
  [
   "当局・公的機関",
   "国債決済期間短縮（T+1）化後の市場取引動向 ―レポ市場を中心に―",
   "日本銀行金融市場局",
   "2019 年 5 月",
   "https://www.boj.or.jp/research/brp/ron_2019/data/ron190530a.pdf",
   "第11章、第12章"
  ],
  [
   "当局・公的機関",
   "国債現先オペの取引概要",
   "日本銀行金融市場局",
   "2024 年 8 月 30 日現在",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/ope_c/opetori7.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "国債補完供給の取引概要",
   "日本銀行金融市場局",
   "2026 年 7 月 16 日現在",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/ope_b/opetori11.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "国債買入オペの取引概要",
   "日本銀行金融市場局",
   "2026 年 6 月 16 日現在",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/ope_f/opetori4.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "国庫短期証券売買オペの取引概要",
   "日本銀行金融市場局",
   "2018 年 10 月 12 日現在",
   "https://www.boj.or.jp/mopo/measures/mkt_ope/ope_e/opetori8.htm",
   "第15章"
  ],
  [
   "当局・公的機関",
   "日銀当座預金増減要因と金融調節（10月2日＜木＞分）",
   "日本銀行金融市場局",
   "2025 年 10 月 2 日分 ／ 2025 年 10 月 2 日分（毎営業日更新）",
   "https://www3.boj.or.jp/market/jp/stat/jd251002.htm",
   "第14章、第19章"
  ],
  [
   "当局・公的機関",
   "31 CFR Part 356、付録 B（Formulas and Tables）",
   "米国の連邦規則（e-CFR）",
   "2026 年 11 月 15 日に確認。最新の改正は 91 FR 65459（2026 年 10 月 15 日）",
   "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-II/subchapter-A/part-356",
   "第01章"
  ],
  [
   "当局・公的機関",
   "Daily Treasury Par Yield Curve Rates（2026 年分）",
   "米財務省",
   "2026 年分の表（確認 2026 年 11 月 15 日）",
   "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&amp;field_tdr_date_value=2026",
   "第04章"
  ],
  [
   "当局・公的機関",
   "Interest Rates - Frequently Asked Questions",
   "米財務省",
   "更新日の記載なし（2026 年 11 月 15 日に確認）",
   "https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics/interest-rates-frequently-asked-questions",
   "第01章"
  ],
  [
   "当局・公的機関",
   "Quarterly Refunding Statement",
   "米財務省",
   "2025 年 7 月 30 日",
   "https://home.treasury.gov/news/press-releases/sb0212",
   "第09章"
  ],
  [
   "当局・公的機関",
   "Treasury Announces Marketable Borrowing Estimates",
   "米財務省",
   "2026 年 8 月 3 日",
   "https://home.treasury.gov/news/press-releases/sb0584",
   "第09章"
  ],
  [
   "当局・公的機関",
   "Treasury Yield Curve Methodology",
   "米財務省",
   "2025 年 2 月 18 日更新",
   "https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics/treasury-yield-curve-methodology",
   "第04章"
  ],
  [
   "当局・公的機関",
   "31 CFR Part 356",
   "米財務省 Bureau of the Fiscal Service",
   "eCFR、2026 年 10 月 23 日時点の表示",
   "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-II/subchapter-A/part-356",
   "第09章"
  ],
  [
   "当局・公的機関",
   "America's Finance Guide: National Debt",
   "米財務省 Fiscal Data",
   "日付の記載なし（2026 年 11 月 15 日に閲覧）",
   "https://fiscaldata.treasury.gov/americas-finance-guide/national-debt/",
   "第09章"
  ],
  [
   "当局・公的機関",
   "Auction Results（2 年債、2025 年 10 月 27 日の入札）",
   "米財務省 Fiscal Data",
   "2025 年 10 月 27 日の入札",
   "https://fiscaldata.treasury.gov/static-data/published-reports/auctions-query/results/R_20251027_1.pdf",
   "第09章"
  ],
  [
   "当局・公的機関",
   "Daily Treasury Statement",
   "米財務省 Fiscal Service",
   "2026-04-16 更新 ／ 注記（確認日 2026-11-15）",
   "https://fiscal.treasury.gov/reports-statements/dts/",
   "第24章、第27章"
  ],
  [
   "当局・公的機関",
   "Daily Treasury Statement（2026-10-22）",
   "米財務省 Fiscal Service",
   "2026-10-22 の版",
   "https://fiscaldata.treasury.gov/static-data/published-reports/dts/DailyTreasuryStatement_20261022.pdf",
   "第24章"
  ],
  [
   "当局・公的機関",
   "Daily Treasury Statement (DTS)",
   "米財務省 Fiscal Service（Fiscal Data）",
   "確認日 2026-11-15",
   "https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/",
   "第24章"
  ],
  [
   "当局・公的機関",
   "Public Debt FAQs",
   "米財務省 TreasuryDirect",
   "確認日 2026-11-15",
   "https://www.treasurydirect.gov/help-center/faqs/public-debt-faqs/",
   "第24章"
  ],
  [
   "当局・公的機関",
   "31 CFR Part 356 Sale and Issue of Marketable Book-Entry Treasury Bills, Notes, and Bonds",
   "米財務省（Bureau of the Fiscal Service）",
   "eCFR の表示 2026 年 10 月 23 日時点",
   "https://www.ecfr.gov/current/title-31/subtitle-B/chapter-II/subchapter-A/part-356",
   "第07章"
  ],
  [
   "当局・公的機関",
   "Announcements on the end of LIBOR",
   "英国 金融行為規制機構（FCA）",
   "確認 2026 年 11 月 15 日",
   "https://www.fca.org.uk/news/press-releases/announcements-end-libor",
   "第06章"
  ],
  [
   "当局・公的機関",
   "Future cessation and loss of representativeness of the LIBOR benchmarks",
   "英国 金融行為規制機構（FCA）",
   "2021 年 3 月 5 日",
   "https://www.fca.org.uk/publication/documents/future-cessation-loss-representativeness-libor-benchmarks.pdf",
   "第06章"
  ],
  [
   "当局・公的機関",
   "10 年利付国債（第 384 回）の入札発行（令和 8 年 10 月 6 日入札）",
   "財務省",
   "令和 8 年 10 月 6 日入札",
   "https://www.mof.go.jp/jgbs/auction/calendar/nyusatsu/offer20261006.htm",
   "第07章、第08章"
  ],
  [
   "当局・公的機関",
   "10 年利付国債（第 384 回）の入札結果（令和 8 年 10 月 6 日入札）",
   "財務省",
   "2026 年 10 月 6 日公表",
   "https://www.mof.go.jp/jgbs/auction/calendar/nyusatsu/resul20261006.htm",
   "第08章"
  ],
  [
   "当局・公的機関",
   "2 年利付国債（第 490 回）の入札発行（令和 8 年 10 月 29 日入札）",
   "財務省",
   "令和 8 年 10 月 29 日入札",
   "https://www.mof.go.jp/jgbs/auction/calendar/nyusatsu/offer20261029.htm",
   "第08章"
  ],
  [
   "当局・公的機関",
   "JGBs Interest Rate（CSV、英語版）",
   "財務省",
   "2026 年 11 月分（確認 2026 年 11 月 15 日）",
   "https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv",
   "第04章"
  ],
  [
   "当局・公的機関",
   "令和８年度国債発行予定額（補正後）",
   "財務省",
   "2026 年 6 月 3 日（補正後。当初との対比の表）",
   "https://www.mof.go.jp/jgbs/issuance_plan/fy2026/issuanceplan260603.pdf",
   "第08章"
  ],
  [
   "当局・公的機関",
   "令和８年度国債発行計画を変更しました",
   "財務省",
   "2026 年 6 月 3 日",
   "https://www.mof.go.jp/jgbs/issuance_plan/fy2026/20260603.html",
   "第08章"
  ],
  [
   "当局・公的機関",
   "令和８年度国債発行計画概要",
   "財務省",
   "2025 年 12 月 26 日公表（当初）",
   "https://www.mof.go.jp/jgbs/issuance_plan/fy2026/highlight251226.pdf",
   "第07章、第08章"
  ],
  [
   "当局・公的機関",
   "令和８年度国債発行計画概要／令和８年度国債発行予定額（補正後）",
   "財務省",
   "当初 2025-12-26／補正後 2026-06-03",
   "各章の参照資料で確かめる",
   "序章2"
  ],
  [
   "当局・公的機関",
   "令和８年度国債発行計画等を策定しました",
   "財務省",
   "2025 年 12 月 26 日",
   "https://www.mof.go.jp/jgbs/issuance_plan/fy2026/20251226.html",
   "第08章"
  ],
  [
   "当局・公的機関",
   "令和８年度国債発行計画（一覧）",
   "財務省",
   "2026 年 11 月 15 日に確認",
   "https://www.mof.go.jp/jgbs/issuance_plan/fy2026/index.html",
   "第08章"
  ],
  [
   "当局・公的機関",
   "債務管理リポート 2026",
   "財務省",
   "令和 8 年度（発行年月の記載なし）",
   "https://www.mof.go.jp/jgbs/publication/debt_management_report/2026/saimu2026.pdf",
   "第08章"
  ],
  [
   "当局・公的機関",
   "債務管理リポート 2026 第Ⅰ編第 1 章 1 国債発行市場",
   "財務省",
   "令和 8 年度の発行予定。一部は令和 8 年 3 月末時点（発行年月の記載なし）",
   "https://www.mof.go.jp/jgbs/publication/debt_management_report/2026/saimu2026-1-1.pdf",
   "第07章"
  ],
  [
   "当局・公的機関",
   "債務管理リポート 2026（国債流通市場）",
   "財務省",
   "令和 8 年度（発行年月の記載なし）",
   "https://www.mof.go.jp/jgbs/publication/debt_management_report/2026/saimu2026-1-2.pdf",
   "第10章、第12章"
  ],
  [
   "当局・公的機関",
   "入札カレンダー：令和 8 年 11 月",
   "財務省",
   "確認 2026 年 11 月 15 日",
   "https://www.mof.go.jp/jgbs/auction/calendar/2611.htm",
   "第28章"
  ],
  [
   "当局・公的機関",
   "公表している金利はどのようなものですか",
   "財務省",
   "ページの日付 2023 年 3 月 29 日",
   "https://www.mof.go.jp/faq/jgbs/04ha.htm",
   "第03章、第04章"
  ],
  [
   "当局・公的機関",
   "公表時刻はいつですか",
   "財務省",
   "ページの日付 2023 年 3 月 29 日",
   "https://www.mof.go.jp/faq/jgbs/04hf.htm",
   "第04章"
  ],
  [
   "当局・公的機関",
   "国債にはどんな種類がありますか",
   "財務省",
   "ページの更新日 2025 年 12 月 24 日",
   "https://www.mof.go.jp/faq/jgbs/04ab.htm",
   "第07章"
  ],
  [
   "当局・公的機関",
   "国債市場特別参加者会合（第 120 回）理財局説明資料",
   "財務省",
   "令和 8 年 9 月 28 日",
   "https://www.mof.go.jp/about_mof/councils/meeting_of_jgbsp/proceedings/260928pd120.pdf",
   "第08章"
  ],
  [
   "当局・公的機関",
   "国債市場特別参加者制度運営基本要領",
   "財務省",
   "令和 6 年 4 月 25 日改訂版",
   "https://www.mof.go.jp/about_mof/councils/meeting_of_jgbsp/20240425.pdf",
   "第08章、第09章"
  ],
  [
   "当局・公的機関",
   "国債金利情報の提供開始について",
   "財務省",
   "2010 年 2 月 26 日発表",
   "https://www.mof.go.jp/jgbs/reference/interest_rate/p220226.htm",
   "第04章"
  ],
  [
   "当局・公的機関",
   "新窓販国債 Q&A（経過利子・利払いの記述）",
   "財務省",
   "更新日の記載なし（確認 2026 年 11 月 15 日）",
   "https://www.mof.go.jp/jgbs/individual/kojinmuke/shinmadohan/qa/index.html",
   "第02章"
  ],
  [
   "当局・公的機関",
   "日本証券業協会「公社債店頭売買高」入門",
   "財務省（『ファイナンス』）",
   "2025 年 6 月号",
   "https://www.mof.go.jp/public_relations/finance/202506/202506h.html",
   "第10章"
  ],
  [
   "当局・公的機関",
   "財政運営に必要な財源の確保を図るための公債の発行の特例に関する法律の一部を改正する法律案",
   "財務省（第 218 回国会）",
   "文書内に提出日の記載なし。成立・公布の日は未確認",
   "https://www.mof.go.jp/about_mof/bills/218diet/tk20260220h.pdf",
   "第07章"
  ],
  [
   "当局・公的機関",
   "Statement Regarding Monetary Policy Implementation and Balance Sheet Normalization",
   "連邦公開市場委員会（連邦準備制度理事会のページ）",
   "2019 年 1 月 30 日",
   "https://www.federalreserve.gov/newsevents/pressreleases/monetary20190130c.htm",
   "第16章"
  ],
  [
   "当局・公的機関",
   "Fed's balance sheet",
   "連邦準備制度理事会（FRB）",
   "ページの表示 2024 年 3 月 7 日",
   "https://www.federalreserve.gov/monetarypolicy/bst_fedsbalancesheet.htm",
   "第13章"
  ],
  [
   "当局・公的機関",
   "Federal Reserve Balance Sheet: Factors Affecting Reserve Balances - H.4.1",
   "連邦準備制度理事会（FRB）",
   "2026 年 11 月 12 日公表の版（週の終わり 11 月 11 日）",
   "https://www.federalreserve.gov/releases/h41/current/",
   "第13章"
  ],
  [
   "当局・公的機関",
   "Implementing Monetary Policy in an \"Ample-Reserves\" Regime: The Basics (Note 1 of 3)（FEDS Notes）",
   "連邦準備制度理事会（スタッフ。FEDS Notes は著者の見解）",
   "2020 年 7 月 1 日",
   "https://www.federalreserve.gov/econres/notes/feds-notes/implementing-monetary-policy-in-an-ample-reserves-regime-the-basics-note-1-of-3-20200701.html",
   "第16章"
  ],
  [
   "当局・公的機関",
   "ユーロ円TIBORの恒久的な公表停止に伴う告示の一部改正案の公表",
   "金融庁",
   "令和 6 年 11 月 18 日",
   "https://www.fsa.go.jp/news/r6/shouken/20241118/241118.html",
   "第06章"
  ],
  [
   "当局・公的機関",
   "全銀協TIBOR運営機関によるユーロ円TIBORの公表停止（金融庁のページに掲載）",
   "金融庁（公表は一般社団法人全銀協 TIBOR 運営機関）",
   "令和 6 年 3 月 6 日",
   "https://www.fsa.go.jp/news/r5/sonota/20240306/20240306.html",
   "第06章"
  ]
 ],
 "note": "この一覧は、各章の参照資料の表を機械的に集めたものです。同じ資料でも、章によって版・時点が違う場合は、「／」で並べています。"
});

CN.glossary([
 {
  "t": "日本銀行",
  "en": "Bank of Japan",
  "alias": "日銀",
  "d": "日本の中央銀行です。この講座では、金融政策の決定と公表、バランスシートや当座預金の統計の公表元として出てきます。決定の主体は、政策委員会・金融政策決定会合です。",
  "ch": [
   13,
   14,
   21,
   25
  ]
 },
 {
  "t": "財務省",
  "en": "Ministry of Finance",
  "alias": "日本の財務省",
  "d": "日本の国の財政を担当する省で、国債の発行の主体です。この講座では、国債発行計画と入札の予定・結果の公表元として出てきます。",
  "ch": [
   7,
   8,
   28
  ]
 },
 {
  "t": "FRB",
  "en": "Federal Reserve System",
  "alias": "連邦準備制度理事会・連邦準備制度",
  "d": "米国の中央銀行制度です。理事会と、各地の連邦準備銀行などで成り立ちます。この講座では、金融政策の実施の指示、バランスシートの統計（H.4.1）の公表元として出てきます。",
  "ch": [
   23,
   26,
   27
  ]
 },
 {
  "t": "ニューヨーク連邦準備銀行",
  "en": "Federal Reserve Bank of New York",
  "alias": "NY 連銀",
  "d": "連邦準備銀行の 1 つです。連邦公開市場委員会の指示で公開市場操作を実施し、SOFR や実効フェデラル・ファンド金利などを公表します。",
  "ch": [
   6,
   15,
   23
  ]
 },
 {
  "t": "米財務省",
  "en": "U.S. Department of the Treasury",
  "alias": "アメリカ財務省",
  "d": "米国債の発行の主体で、TGA の持ち主です。この講座では、入札の規則や、国庫の日次の報告の公表元として出てきます。",
  "ch": [
   9,
   24
  ]
 }
]);

CN.exam([
 {
  "part": 5,
  "q": "国債の発行計画の金額や、中央銀行の当座預金の残高を資料から読むとき、最初に確かめることとして適切なものはどれですか。",
  "c": [
   "何日現在の値か、計画か実績か、単位と版は何か",
   "値が大きいか小さいか",
   "値を円とドルのどちらに換算するか",
   "値が過去の最高値かどうか"
  ],
  "a": 0,
  "why": "正答は、何日現在の値か、計画か実績か、単位と版は何か、です。同じ名前の値でも、時点や版が違えば別の値になり、発行計画の値は計画で、入札の結果ではありません。円とドルは換算せず、それぞれの通貨のまま読みます（序章 2 と第25〜28章）。",
  "ch": [
   2,
   25,
   28
  ]
 },
 {
  "part": 5,
  "q": "他の要因が同じとき、国債の発行代金の払込みが行われると、金融機関の当座預金と政府の口座は、どう動きますか。",
  "c": [
   "どちらも増える",
   "当座預金が減り、政府の口座が増える",
   "当座預金が増え、政府の口座が減る",
   "どちらも変わらない"
  ],
  "a": 1,
  "why": "正答は、当座預金が減り、政府の口座が増える、です。払込みでは、金融機関の準備（当座預金）から政府の口座へ資金が移ります。この動きは、当座預金の増減要因では財政等要因のマイナスとして現れます（第19章・第24章）。",
  "ch": [
   19,
   24
  ]
 }
]);
