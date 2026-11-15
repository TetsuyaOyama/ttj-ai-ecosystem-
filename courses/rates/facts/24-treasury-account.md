# 第24章 事実確認表（担当 RF、確認 2026-11-15）

第24章は、政府の口座と準備の関係、DTS の説明の持ち主（spec §9.1）。演習の金額はすべて**架空**（実在の値を書かない）。個別の年の TGA の残高は書かない。
日本の側（政府預金）は、営業毎旬報告と日銀の統計の一覧のページで確かめた範囲だけを書く。日本の国庫制度（財務省の説明のページ）は個別ページを開けなかったため、書かない。

| # | 区分 | 事実 | 数値・単位 | 時点・版 | 出典 | URL | 一次 | 確認日 | 使った箇所 |
|---|------|------|-----------|---------|------|-----|------|--------|-----------|
| 1 | 統計 | H.4.1 の第 1 表（Factors Affecting Reserve Balances of Depository Institutions）で、「U.S. Treasury, General Account」は「Deposits with F.R. Banks, other than reserve balances」の下にあり、「Factors absorbing reserve funds」（準備を吸収する要因）の側に載る。列は「Averages of daily figures」と「Wednesday」（2026-11-11 の版は「Wednesday Nov 11, 2026」「Week ended Nov 11, 2026」「Change from week ended」）。条件：単位は百万ドル（原文は Millions of dollars）、2026-11-12 公表の版の表の構成、速報・確報の区別は表に書かれていない | — | H.4.1 2026-11-12 公表 | FRB『Federal Reserve Balance Sheet: Factors Affecting Reserve Balances - H.4.1』 | https://www.federalreserve.gov/releases/h41/current/ | ○ | 2026-11-15 | 本文 §1・§3、c24-jp-us、c24-quiz、総合テスト |
| 2 | 統計 | DTS（Daily Treasury Statement）の表：「TABLE I - Operating Cash Balance」（列は Today・This month・This fiscal year）に「Treasury General Account (TGA) Opening Balance」「Treasury General Account (TGA) Closing Balance」、「TABLE II - Deposits and Withdrawals of Operating Cash」に「Treasury General Account Total Deposits」「Treasury General Account Total Withdrawals」、「TABLE IIIC - Debt Subject to Limit」。注記：「The Daily Treasury Statement (DTS) is available by 4:00 p.m. the following business day on the Fiscal Service website」。条件：2026-10-22（Thursday）の版、金額は rounded in millions、確報か速報かの記載なし | — | DTS の 2026-10-22 の版 | 米財務省 Fiscal Service『Daily Treasury Statement（2026-10-22）』 | https://fiscaldata.treasury.gov/static-data/published-reports/dts/DailyTreasuryStatement_20261022.pdf | ○ | 2026-11-15 | 本文 §2・§3、c24-jp-us |
| 3 | 定義 | Fiscal Service のページは、DTS を「The Daily Treasury Statement summarizes the US Treasury's cash and debt operations」と説明し、「Deposits are reported as received and withdrawals are reported as processed」と書く（ページ更新 2026-04-16）。Fiscal Data のデータセットの注記は「all references to Federal Reserve Account throughout the DTS are changed to Treasury General Account (TGA)」と書く（日付は確認したページの記載になし） | — | ページ更新 2026-04-16 | 米財務省 Fiscal Service『Daily Treasury Statement』／Fiscal Data『Daily Treasury Statement (DTS)』 | https://fiscal.treasury.gov/reports-statements/dts/ ／ https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/ | ○ | 2026-11-15 | 本文 §2、用語集 |
| 4 | 定義 | TreasuryDirect の説明：債務上限は「the maximum amount of money the Government is allowed to borrow without receiving additional authority from Congress」（Public Debt Subject to Limit）。対象は Public Debt Outstanding を調整した量で、DTS の表 IIIC「Debt Subject to Limit」に載る | — | ページ日付なし（確認日 2026-11-15） | TreasuryDirect『Public Debt FAQs』 | https://www.treasurydirect.gov/help-center/faqs/public-debt-faqs/ | ○ | 2026-11-15 | 本文 §4（定義は第09章が持ち主。この章はリンク） |
| 5 | 発表 | FRB の職員（理事会のスタッフ）の FEDS Note（2020-02-27）は、2019 年 9 月 16 日の法人税の納付が「were withdrawn from bank and money market fund accounts」され、財務省の口座（Treasury's account at the Fed）に入ったと書く。準備は 2 営業日で約 $120 billion 減った | about $120 billion | 2020-02-27 | FRB（理事会スタッフ）『What Happened in Money Markets in September 2019?』 | https://www.federalreserve.gov/econres/notes/feds-notes/what-Happened-in-Money-Markets-in-September-2019-20200227.htm | ○ | 2026-11-15 | 本文 §2、c24-tax の説明 |
| 6 | 統計 | 日銀の営業毎旬報告（令和8年10月10日現在、2026-10-14 掲載）の負債の部に「政府預金」の項目がある（負債の部の項目：発行銀行券・当座預金・その他預金・政府預金・売現先勘定・雑勘定・引当金勘定・資本金・準備金）。条件：単位は千円（原文は「単位：千円」）、現在日は令和8年10月10日、速報・確報の記載なし | — | 2026-10-14 掲載（2026-10-10 現在） | 日本銀行『営業毎旬報告（令和8年10月10日現在）』 | https://www.boj.or.jp/statistics/boj/other/acmai/release/2026/ac261010.htm | ○ | 2026-11-15 | 本文 §1・§3、c24-jp-us |
| 7 | 統計 | 日銀の「日本銀行関連統計」の一覧のページに、「日本銀行の対政府取引」（その他の項目）、「営業毎旬報告」、「日銀当座預金増減要因と金融調節」（見込み・実績・毎営業日更新）の項目がある。各統計の頻度・公表の時刻は一覧のページに書かれていない。条件：項目名の確認のみ（値・頻度は確認していない）、一覧のページに更新日の記載なし | — | 確認日 2026-11-15 | 日本銀行『日本銀行関連統計』 | https://www.boj.or.jp/statistics/boj/index.htm | ○ | 2026-11-15 | 本文 §3、c24-jp-us |
| 8 | 一般知識 | 政府の預金は、民間の預金と別の中央銀行の負債で、政府と民間の間の受払い（納税・国債の発行代金・政府の支払）で増減する。そのとき、民間の銀行の中央銀行の預金（準備・当座預金）が反対向きに動く（ほかの要因が同じ場合）。日本は第19章（財政等要因）、米国は H.4.1 の準備に影響する要因の表が示す。この説明は教科書的な一般知識で、金額は架空 | — | — | 第13章・第19章（本講座） | — | — | 2026-11-15 | 本文 §2、c24-tax、c24-quiz |
| 9 | 一般知識 | c24-tax の企業 A・銀行 B・政府の金額（100 百万ドル）はすべて架空。実在の納税や国債の発行の額ではない | 架空 | 架空 | 本講座の演習 | — | — | 2026-11-15 | c24-tax |

## 定義と式の照合

この章に式はない。残高の変化は架空の足し引きだけ（検算の行なし）。

| 量 | 本文の文 | 一致 |
|---|---|---|
| TGA の増減と準備 | 他の要因が同じなら、TGA が増えた分だけ準備が減る | ○（c24-tax：銀行 B の準備 −100、TGA +100） |

## 演習の照合（第24章）

| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| c24-quiz 問 1 | TGA は準備と別の負債で、納税などで準備から TGA へ資金が移るため（他の要因が同じなら） | 本文 §2、c24-tax の手 3 | 「銀行 B の準備が減り、TGA が増える」 | ○ |
| c24-quiz 問 2 | DTS は Fiscal Service が営業日ごとの statement、H.4.1 は FRB が毎週木曜、水曜の値と週平均 | 本文 §3、c24-jp-us の行 3、事実 #1・#2 | 「Wednesday」「Averages of daily figures」、DTS の日付つき statement | ○ |
| c24-quiz 問 3 | 政府預金は日銀の負債で、政府と民間の受払いで増減し、当座預金が反対に動く | 本文 §2・§5、事実 #6・#8 | 営業毎旬報告の負債の部に政府預金。財政等要因は第19章 | ○ |
| 総合テスト 1 | H.4.1 では「Factors absorbing reserve funds」の側に載る | 本文 §3、事実 #1 | 「U.S. Treasury, General Account」は absorbing の側 | ○ |
| c24-tax と c24-jp-us | 本文と同じ | 事実 #1・#2・#6 | 手の順と表の行が同じ | ○ |

## 確認できず書かなかった

- 日本の国庫制度（財務省の説明）と、政府預金の定義の日銀の説明のページ：個別ページを開けなかった。
- DTS の公表の時刻の意味（注記の「the following business day」の起点）：注記の原文だけを引き、起点を言い換えない。
- 債務上限の局面での TGA の個別の年の動き：書かない（DTS と H.4.1 の値は時点つきで読者が確かめる）。
- 債務上限の個別の金額と、特別な措置（extraordinary measures）の説明：個別ページを開けなかったため書かない。
- 日銀の「日本銀行の対政府取引」の統計の個別ページ（頻度・内容）：個別ページを開けなかった。
