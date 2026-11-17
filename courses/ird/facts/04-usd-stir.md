# 第04章 事実確認表・演習の照合（担当 DB、確認 2026-11-15）

読者向けの本文には出さない。データ：`data/04-usd-stir.js`。確認の方法：CME の個別の通知・規則・仕様の資料と、ニューヨーク連銀の ARRC の発表（PDF）を、検索で見つけたリンクから WebFetch で読み、日付・規則の語を原文の語で写した。取引量・建玉の大きさは書かない。LIBOR の公表停止の日付は、英国 FCA の発表の個別ページを取得しなかったので、本文では CME の通知の語（「scheduled final publication of a 'representative' 3M USD LIBOR reference rate on June 30, 2023」）として書き、LIBOR の背景は講座 A 第06章へのリンクにとどめた。

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 発表 | 【米国】ARRC（代替参照金利委員会）は 2017-06-22 の発表で、「broad Treasuries repo financing rate」を、望ましい代替の参照金利として選んだ。ニューヨーク連銀が金融調査局（OFR）と協力してこの金利を公表することを提案した（発表の語）。この金利が SOFR である（講座 A 第06章） | 2017-06-22 | 発表の日 2017-06-22 | ARRC『ARRC press release Jun 22 2017』（ニューヨーク連銀のサイト） | https://www.newyorkfed.org/medialibrary/microsites/arrc/files/2017/ARRC-press-release-Jun-22-2017.pdf | ○ | 2026-11-15 | 本文、c04-transition |
| 2 | 発表 | 【米国】CME グループは 2018-03-01 の発表で、月次と四半期の SOFR 先物を「on May 7, 2018, pending regulatory review」に上場すると予定を公表した。SOFR は、ニューヨーク連銀が 2018-04-03 から毎日公表する予定（発表の語）。実際の上場日は、予定の公表だけを確かめ、上場の事実の発表は確かめていない | 予定 2018-05-07 | 発表の日 2018-03-01（予定。規制当局の審査が条件） | CME グループ『CME Group Announces New SOFR Futures Launch Date and Contract Specifications』 | https://www.cmegroup.com/media-room/press-releases/2018/3/01/cme_group_announcesnewsofrfutureslaunchdateandcontractspecificat.html | ○ | 2026-11-15 | 本文、c04-transition |
| 3 | 制度 | 【CME】通知 SER-9115（2022-12-22）：3 か月ユーロドル先物の建玉の SOFR 先物への転換の規則。規則 45236 の語：Eurodollar Fallback Effective Date は 2023-04-14、その日の営業終了の後に転換する（運用や市場の混乱の場合の例外あり）。対象は 2023-06-30 より後に期限が来る限月の建玉。転換後の建玉（Replacement Position）は、同じ限月で、取引単位の数量と方向が同じ。割当ての価格（Assignment Price）は、Eurodollar Fallback Effective Date の最新の日次の清算値段に、固定のスプレッドの調整（0.26161%）を足し、小数点以下 4 桁に丸める。スプレッドの調整は、Bloomberg Index Services Limited が公表する固定の値。オプションは、プレミアムの差額（Premium Differential）を取引所が決めて反映する。通知ページの発効日は 2023-02-06 | 0.26161%（26.161 bp）、1 対 1 | 通知 2022-12-22（ページの発効日 2023-02-06）。更新日の記載なし | CME グループ『SER-9115』（規則の改正の通知） | https://www.cmegroup.com/notices/ser/2022/12/SER-9115.pdf（ページ：https://www.cmegroup.com/notices/ser/2022/12/SER-9115.html） | ○ | 2026-11-15 | 本文、c04-transition、c04-convert |
| 4 | 発表 | 【米国】CME グループの通知 23-082（2023-03-15、清算会員向け）：「CME will convert specific Eurodollar Futures and Options open interest to corresponding SOFR positions, at a ratio of 1:1」。2023-04-14（金）の営業終了の後に転換し、取引日（Trade Date）は 2023-04-17（月）。「scheduled final publication of a 'representative' 3M USD LIBOR reference rate on June 30, 2023」の前に行う（通知の語）。対象の限月は、通知のページには書かれておらず、PDF（Chadv23-082R）は取得していない | 1:1、2023-04-14 営業終了後、取引日 2023-04-17 | 通知 2023-03-15 | CME グループ『Notice 23-082 LIBOR Fallback; ED-to-SOFR Fallbacks Conversion Production Weekend』 | https://www.cmegroup.com/notices/clearing/2023/03/Chadv23-082.html | ○ | 2026-11-15 | 本文、c04-transition、c04-convert、問・総合 |
| 5 | 商品 | 【CME】3 か月ユーロドル先物の建玉を 3 か月 SOFR 先物（SR3）に転換するときの価格：転換後の SR3 の建玉の価格 ＝ ユーロドル先物の清算値段 ＋ ISDA のスプレッドの調整「.26161」（SR3 の最小の呼値 .0001 に丸める）。資料の例：清算値段 99.45 の建玉は、SR3 の 99.7116 になる。転換後の SR3 の建玉は、ユーロドル先物の建玉と数量と方向が同じ。資料の日付は「as of 2/1/23」で、ページの更新日の記載はなく、更新日は確かめられない | .26161（26.161 bp）。例 99.45 → 99.7116 | 資料の日付 2023-02-01（更新日の記載なし） | CME グループ『LIBOR fallback ED to SOFR specs』（転換の仕様の資料） | https://www.cmegroup.com/clearing/files/libor-fallback-ed-to-sofr-specs-20230201.pdf | ○ | 2026-11-15 | 本文、c04-convert |
| 6 | 商品 | 【CME】3 か月 SOFR 先物（SR3）：「Compounded daily SOFR interest during contract reference quarter」、1 bp あたり 25 ドル、最終取引日は「Exchange Business Day first preceding 3rd Wed of Delivery Month」。1 か月 SOFR 先物（SR1）：「R = arithmetic average of SOFR during contract delivery month」、1 bp あたり 41.67 ドル、最終取引日は「Last Exchange Business Day of contract Delivery Month」。SR1 の最小変動幅は 0.5 bp（20.835 ドル）、受渡月が始まった後は 0.25 bp（10.4175 ドル）（第02章の事実確認表 #3・#4 と同じ出典。第02章の持ち主は仕組み、本章は 2 つの違い）。条件：教育の記事のメタデータの日付 2026-06-25、仕様の資料は日付の記載なし。現行の値は CME の仕様のページで確かめる旨を本文に書く。更新日は確かめていない | 25 ドル／bp、41.67 ドル／bp | 記事 2026-06-25（更新日の記載なし）／仕様の資料（2018 年の著作権表示） | CME グループ『Understanding SOFR Futures』、『SOFR futures contract specifications』 | https://www.cmegroup.com/education/articles-and-reports/understanding-sofr-futures.html ／ https://www.cmegroup.com/content/dam/cmegroup/education/files/sofr-futures-contract-specifications.pdf | ○ | 2026-11-15 | 本文、c04-sr3-sr1 |
| 7 | 一般知識 | LIBOR は銀行が借り入れる金利に基づく期間つきの指標、SOFR は米国債を担保にした翌日物の取引に基づく指標で、金利の性質が違う。そのため、参照する金利を置き換えるときは、価格や行使価格を調整する値が必要になる（この講座の説明。調整値の実際の値は #3・#5 の CME の資料の語。調整値の算出の方法は書かない） | — | — | この講座の説明（#1・#3・#5 を踏まえた一般知識）。LIBOR と SOFR の定義は講座 A 第06章 | —（個別ページなし） | × | 2026-11-15 | 本文「なぜスプレッドの調整が必要だったか」、問 3 |
| 8 | 定義 | 建玉：まだ決済されていない（反対売買も最終決済もしていない）先物・オプションの契約の数（序章1、講座 B）。転換は、建玉の中身（参照する金利）を、同じ数量・同じ方向のまま入れ替える手続き（本講座の説明。#3・#4 の語） | — | 序章1 | この講座（序章1）、#3・#4 | —（個別ページなし） | × | 2026-11-15 | 本文、用語集 |
| 9 | 発表 | 【米国】CME グループは 2023-04-24 の発表で、ユーロドル先物・オプションの建玉を「in April」に SOFR の建玉へ転換したと公表した（「successfully converted ... Eurodollar futures and options open interest」）。「Only the May 2023 and June 2023 contracts, excluded from this transition, remain for Eurodollar futures and options」。条件：転換の時期は「April」とだけ書かれ、日付は通知 #4 の語。転換した枚数は本文に書かない（取引量・建玉は書かない決まり） | — | 2023-04-24（発表の日） | CME グループ『CME Group Completes Key Milestones in Conversion of Eurodollar Futures and Options』 | https://www.cmegroup.com/media-room/press-releases/2023/4/24/cme_group_completeskeymilestonesinconversionofeurodollarfutureso.html | ○ | 2026-11-18 | 本文「なぜ転換したか」「つまずきやすい点」、c04-transition s5 |

確認できず書かなかった：
- 英国 FCA が LIBOR の公表停止（2023-06-30 の後）を発表した日の一次の資料：個別ページを取得していない。本文は、CME の通知（#4）の「scheduled final publication ... June 30, 2023」の語と、講座 A 第06章へのリンクだけ。
- CME の SR3・SR1 の実際の上場日：予定の発表（#2）だけ確かめた。本文は「予定」と書く。
- 転換の対象の限月の一覧：通知 23-082 のページに書かれておらず、PDF（Chadv23-082R）は取得していない。本文は #3 の規則の語（2023-06-30 より後に期限が来る限月）だけ。
- オプションの転換のプレミアムの差額の値：#3 は決め方だけ。値は書かない。
- ユーロドル先物の仕様（取引単位・1 bp の価値）：個別の資料を取得していない。本文は書かない。
- 転換が 2023-04-14 の営業終了の後に実行されたこと（日付まで）：#9 の発表（2023-04-24）は「4 月に」転換したと書くだけ。本文は、転換を終えたことを #9 で、日付を通知 #4 の語で書く（検証 W1、2026-11-18 に更新）。
- CME の SR1 の規則の本文（Chapter 461）：取得できず、SR1 の仕様は #6 の教育の資料だけ。
- ARRC が SOFR の使用を推奨した後の経緯（2021 年以降の推奨など）：書かない。

演習の照合（第04章）
| 問・演習 | 正答（要点） | 照らした本文・図（節・データ id・手の番号） | 本文・図の記述（要点を写す） | 一致 |
|---|---|---|---|---|
| c04-quiz 問 1 | LIBOR の最終公表の予定（2023-06-30）より後に期限が来る限月の建玉は、参照する金利が公表されなくなるので、CME は 2023-04-14 の営業終了の後に SOFR の建玉へ転換した | 本文「なぜ転換したか」、c04-transition、事実確認表 #3・#4 | 同じ趣旨 | ○ |
| c04-quiz 問 2 | 3 か月 SOFR 先物は参照四半期の日次の SOFR の複利、1 か月 SOFR 先物は受渡月の日次の SOFR の算術平均 | 本文「3 か月と 1 か月の SOFR 先物」、c04-sr3-sr1、事実確認表 #6、第02章 | 同じ | ○ |
| c04-quiz 問 3 | LIBOR と SOFR は金利の性質が違い、置き換えの前後で価格がずれないよう、固定の調整値を足して転換の価格を決めた | 本文「なぜスプレッドの調整が必要だったか」、c04-convert、事実確認表 #3・#5・#7 | 同じ趣旨 | ○ |
| c04-exam 1 | 2023-04-14 の営業終了の後に、同じ限月・同じ数量・同じ方向の SOFR 先物の建玉へ 1 対 1 で転換した | c04-convert、事実確認表 #3・#4 | 同じ | ○ |
| c04-transition の点・区間 | 2017-06-22・2018-03-01・2022-12-22・2023-03-15・2023-04-14・2023-04-17・2023-06-30 | 事実確認表 #1〜#4 | 同じ日付 | ○ |
| c04-sr3-sr1 の行 | 参照・計算・1 bp の価値・最終取引日・最小変動幅 | 事実確認表 #6 | 同じ語 | ○ |

定義と式の照合（第04章）：式を使わない章（なし）。
