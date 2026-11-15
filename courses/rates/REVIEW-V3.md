# 第4部・第5部（第20〜28章）検証 V3 の記録

- 検証日：2026-11-15（すべての根拠の確認日）
- 対象：`chapters/20〜28-*.html`、`data/20〜28-*.js`、`facts/20〜28-*.md`。course.json・tools/・他の担当の章は触っていない
- 修正前の控え：`/tmp/rates-V3/orig/`（chapters・data・facts）
- 修正後の検査：
  - `node tools/selfcheck.js /home/claude/courses/rates NN`（NN＝20〜28）：9 章とも `NG 0 件`（候補は目で確認。「レポ」の単独は制度名「常設のレポ」で、可）
  - `python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/rates --check`：`OK (check only) 章 30/30 公開 … 0 warnings`
  - `node tools/answers.js`：`合計 128 問、位置の不一致 0 件`。第20〜28章の確認問題 27 問・総合テスト 11 問は、正答の文を全部読んだ（下の「正答の確認」）
  - `grep -rn '要確認' chapters data facts`：0 件
- 変更したファイル：chapters の 20・21・22・23・26・28、data の 20・21・22・23・26、facts の 20・21・22・23・26・27・28

## 件数

| 区分 | 件数 | 直した | 未対応 |
|---|---|---|---|
| 重大 | 1 | 1 | 0 |
| 中 | 4 | 4 | 0 |
| 軽 | 5 | 5 | 0 |
| 残した点（公開の条件・未確認） | 3 | — | 3 |

## 申し送りの項目の再確認（結果）

| 項目 | 結果 | 根拠（確認日 2026-11-15） |
|---|---|---|
| 第21章の★の値と決定日・適用日 | 1.25％程度（2026-10-30 の方針、水準は 2026-09-18 決定・09-24 適用）、適用利率 1.25％・基準貸付利率 1.5％・基準割引率 1.5％（09-18 決定・09-24 適用、手形割引は停止中）、長期国債の買入れ（2026-06-16、2027 年 1〜3 月まで毎四半期 2,000 億円程度ずつ減額、4 月以降月間 2 兆円程度）、採決（10-30：8 対 1、09-18：7 対 2）、次の会合 2026-12-17・18、すべて原文と一致 | https://www.boj.or.jp/mopo/mpmdeci/mpr_2026/k261030a.pdf ／ k260918a.pdf ／ k260616b.pdf ／ https://www.boj.or.jp/mopo/mpmsche_minu/index.htm |
| 日銀の 1.0％の水準の決定日（06-16 と 07-31） | **06-16 が正**。k260616a.pdf「金融市場調節方針の変更について」（2026-06-16）が 1.0％程度に決め、脚注で翌営業日（6 月 17 日）から適用。07-31 の「当面の金融政策運営について」は同じ水準を書くだけ（「据え置き」の語なし、適用日の脚注なし）。第20章の表（06-16）が正しく、第21章が 07-31 を水準の出典としていた → M1 | https://www.boj.or.jp/mopo/mpmdeci/mpr_2026/k260616a.pdf ／ k260731a.pdf |
| 第23章の★の値と決定日・適用日 | 3-3/4〜4 percent（09-16 引き上げ・10-28 維持）、IORB 3.90（effective October 29, 2026）、ON RRP 3.75・$160 billion per day、常設のレポ 4.0、SOMA の 3 つの指示、いずれも 2026-10-29 から。原文と一致。次の FOMC 2026-12-08〜09 | https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a1.htm ／ monetary20261028a.htm ／ monetary20260916a.htm ／ https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm |
| 第23章の primary credit rate の適用日 | **2026-09-17**。09-16 の実施の指示が「a 1/4 percentage point increase in the primary credit rate to 4.0 percent, effective September 17, 2026」と書く。10-28 の実施の指示は existing level の承認で日を書かない → M2 | https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm |
| 第20章の多角的レビューの引用 4 句 | 4 句とも原文にそのままある（2 回の取得と、句の Web 検索で確認）。引用の形を残し、事実確認表 #9 に原文の文脈を記録。参照資料の題を原文の「（参考）金融政策の多角的レビュー：主なポイント」に | https://www.boj.or.jp/mopo/mpmdeci/mpr_2024/k241219c.pdf ／ https://www.boj.or.jp/mopo/outline/bpreview/ |
| 第22章の「月のみ」の行 | 個別の公表文で確認し、日付を入れた（2017-06-14、2019-07-31、2024-05-01、2025-03-19）→ M3 | 下の M3 |
| 第26章の H.4.1 の行と ON RRP の対応、水曜の値と週平均 | 差の列の取り違えあり → C1。ON RRP の対応の書き方と脚注の切り取り → M4 | https://www.federalreserve.gov/releases/h41/current/ ／ h41.pdf |
| 第27章・第28章の DDP 廃止の日付 | 第28章（と第26章）の「Build Your Package は廃止済み（2026-11-09 の週の予定と 07-16 に告知）、整形済みのデータの束は 2027-03-31、DDP のページの削除は 2027-07-01」は原文と一致。第27章には DDP の記述はない | https://www.federalreserve.gov/data/data-download-fred-information.htm ／ https://www.federalreserve.gov/releases/h41/ |
| 第28章の FOMC と日銀の会合日程 | FOMC 2026 年（12 月 8-9 日まで、SEP は 3・6・9・12 月）・2027 年（1/26-27 … 11/16-17、2028/1/25-26）、日銀 2026 年・2027 年の日程は原文と一致。2027 年 10 月の FOMC の扱いを補った → S4 | https://www.federalreserve.gov/newsevents/pressreleases/monetary20261112a.htm ／ https://www.boj.or.jp/mopo/mpmsche_minu/m_ref/mref260731a.pdf |

## 指摘の一覧

### 重大

| # | 章 | 場所 | 何が誤りか | 根拠 | 対応 |
|---|---|---|---|---|---|
| C1 | 26 | `c26-h41`（2 本とも）、本文「第 1 表の列」、data の検算の行、facts #4・「定義と式の照合」 | 第 1 表の差の列を「今週の値 − 前週の値」としながら、架空の例で**水曜の値から同じ週の週平均を引いた値**（110,000 − 100,000）を「差」としていた（準備の行も同じ）。実際は「Averages of daily figures」の下に Week ended・Change from week ended（前週）・Change from week ended（前年）が並び、最後の列が Wednesday で、**差の 2 列は週平均どうしの差**（Reserve Bank credit の行の値の並び 6,707,462／+5,947／+178,939／6,712,130 で確認）。水曜の値の前週差は第 5 表（Change since Wednesday）。統計の読み方の持ち主の章で、誤った読み方を教えていた | https://www.federalreserve.gov/releases/h41/current/ ／ https://www.federalreserve.gov/releases/h41/current/h41.pdf（2026-11-12 公表の版） | 直した。列の並びと「差は週平均どうし」「水曜の値の前週差は第 5 表」を本文と図に書き、架空の例を「100,000 − 95,000 ＝ +5,000」「3,000,000 − 2,980,000 ＝ +20,000」に。検算の行も差し替え（selfcheck で計算し直して OK） |

### 中

| # | 章 | 場所 | 何が誤りか | 根拠 | 対応 |
|---|---|---|---|---|---|
| M1 | 21 | 本文「金融市場調節方針の読み方」、`c21-now` の詳細、facts #3、参照資料 | 1.0％程度の水準の出典を 2026-07-31 の公表文だけにしており、水準を決めた日（2026-06-16、06-17 適用）が書かれていなかった（第20章の表とも食い違って見えた） | k260616a.pdf、k260731a.pdf | 直した（「6 月 16 日の決定、6 月 17 日から適用。7 月 31 日の公表文も同じ水準」に。facts #3 を書き直し、参照資料に 06-16 の公表文を追加） |
| M2 | 23 | `c23-now` の primary credit rate の行・詳細、`c23-stack`、本文「誰が何を決めるか」、facts #7・値の対応表 | primary credit rate の適用日を「実施の指示に記載なし」としていた。09-16 の実施の指示に effective September 17, 2026 がある | monetary20260916a1.htm | 直した（適用日 2026-09-17。10-28 は existing level の承認で日を書かない、と区別） |
| M3 | 22 | `c22-events` の「月のみ」の 3 行、本文 §2・§6、つまずきやすい点、`c22-history`、参照資料、facts #2・#10 | 履歴のページの月だけで書いた行が 3 つあり、「2024-06」は決定の日ではなく効力の月だった | https://www.federalreserve.gov/newsevents/pressreleases/monetary20170614c.htm（2017-06-14、cap $6→$30 billion・$4→$20 billion）、monetary20190731a.htm（2019-07-31、「conclude the reduction … in August, two months earlier than previously indicated」）、https://federalreserve.gov/newsevents/pressreleases/monetary20240501a.htm（2024-05-01、Beginning in June、$60→$25 billion）、monetary20250319a.htm（2025-03-19、Beginning in April、$25→$5 billion） | 直した（4 行を声明の日付と原文の語で書き、決定の日と効力の月を区別。つまずきの囲みを差し替え、参照資料を 4 本追加） |
| M4 | 26 | 本文「準備を増やす要因と、減らす要因」、`c26-items`、`c26-factors`、facts #5・#10 | ① Reverse repurchase agreements の行を「ON RRP の取引と名前が同じ取引の行」とし、行全体が ON RRP のように読めた（内訳は Foreign official and international accounts と Others）。② 脚注 12 を「… collateralized by U.S. Treasury securities」で切って引き、担保が国債だけと読めた（原文は「…, federal agency debt securities, and mortgage-backed securities」まで） | h41.pdf の脚注 12、FRB『Balance Sheet Developments』May 2026（内訳の対応の明記なし） | 直した（内訳 2 行を書き、ON RRP はこの行に入るが、どの内訳かは表に書かれないので内訳の行名を記録する、と書いた。脚注は全文に） |

### 軽

| # | 章 | 場所 | 内容 | 対応 |
|---|---|---|---|---|
| S1 | 20 | 本文、`c20-events` の詳細、facts #6 | 2024-03-19 の公表文の語を「『その役割を果たした』と判断する」としていた。原文は「その役割を果たしたと考えている」（https://www.boj.or.jp/mopo/mpmdeci/state_2024/k240319a.htm） | 原文の語に |
| S2 | 20 | 参照資料 | k241219c.pdf の題を「金融政策の多角的レビュー 2024 年 12 月 主なポイント」としていた。日銀のページの題は「（参考）金融政策の多角的レビュー：主なポイント」（2024-12-19 掲載） | 原文の題に |
| S3 | 21 | `c21-calendar` の 2026 年 12 月の行、注、`c21-mpm`、facts #8・#9、参照資料 | 2026 年 12 月の会合の主な意見の公表日を「記載なし」としていた。日銀『金融政策決定会合の運営』のページの日程表に 12 月 28 日とある。総裁定例記者会見記録の「翌営業日（時間未定）」も、2027 年の日程表の PDF ではなく、このページの注記にある | 12 月 28 日を入れ、出典をこのページに直し、参照資料に追加 |
| S4 | 23・28 | 第23章の 2027 年の日程表、第28章の FOMC の段落、facts | 2026-11-12 の FRB の発表は、2027 年 10 月 26-27 日の会合では 2 日目の通常の政策決定の公表をしない（戦略の議論）と書く。カレンダーを作る章で抜けていた | 両章に 1 文を足し、参照資料（第23章）と facts に記録 |
| S5 | 27 | facts #11 の URL | DTS の「available by 4:00 p.m. the following business day」と表 I の行名は DTS の PDF にあり、出典に挙げた Fiscal Service のページには無い | DTS の PDF の URL を足した |

## 正答の確認

第20〜28章の確認問題 27 問・総合テスト 11 問の正答の文と解説を読み、本文・事実確認表と照らした。正答の添字はすべて式どおり。正答の誤り・正答が 2 つになる問はなかった。第21・23章の総合テストは、各 2 問のうち値を正答にする問はない（仕組み・主体・確かめ方を問う）。第26章 問2（水曜の値と週平均）は、C1 の修正後の本文と矛盾しない。

## そのほか確かめたこと（誤りなし）

- 第20章：2024-03-19（0〜0.1％程度、付利 0.1％、03-21 適用、7 対 2、ETF・J-REIT の新規の買入れ終了）、2025-12-19（0.75％程度、全員一致、12-22 適用）、2026-06-16（1.0％程度、06-17 適用、7 対 1）を原文で確認。
- 第27章：SOFR「at approximately 8:00 a.m. ET」、EFFR「for the prior business day … at approximately 9:00 a.m.」と FR 2420、DTS の公表時刻と表 I の行名を原文で確認。
- 第25章：マネタリーベース（10 月分）は 2026-11-04 に公表（11-03 は祝日で、翌月第 2 営業日と整合）。
- 投資助言・予測に読める文、禁止語、作者名・メールアドレス：第20〜28章になし。定型の注意書きは spec §9.3 のとおり（selfcheck で一字一句一致）。現在の金利の値は第21・23章だけ（他の章の値は過去の値として日付つき）。

## 残した点（未対応）

| # | 章 | 内容 |
|---|---|---|
| R1 | 21・23 | ★の値は 2026-11-15 の時点。次の会合（FOMC 2026-12-08〜09、日銀 2026-12-17・18）の後に公開するなら、公開の直前に実施の指示・公表文で取り直す（spec §8.3） |
| R2 | 26 | Reverse repurchase agreements の内訳（Others）と ON RRP の対応は、H.4.1 にも Balance Sheet Developments にも明記がない。本文は対応を書かず、内訳の行名を記録するよう書いた |
| R3 | 24・25・27 | 申し送りの対象外の行は抜き取りで確認（上記）。日銀の各統計の公表時刻の個別のページ（第25章）は今回開いていない |

## 公開してよいか

| 章 | 判断 | 条件 |
|---|---|---|
| 20 | 可 | — |
| 21 | 条件つき | 日銀の 2026-12-17・18 の会合の後に公開するなら、その公表文で c21-now を取り直す（R1） |
| 22 | 可 | — |
| 23 | 条件つき | FOMC の 2026-12-08〜09 の会合の後に公開するなら、実施の指示で c23-now・c23-stack を取り直す（R1） |
| 24 | 可 | — |
| 25 | 可 | 公表時刻の行は抜き取りの確認（R3） |
| 26 | 可 | — |
| 27 | 可 | — |
| 28 | 可 | — |
