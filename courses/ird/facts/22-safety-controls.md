# 第22章 事実確認表・演習の照合（担当 DE、確認 2026-11-18）

読者向けの本文には出さない。データ：`data/22-safety-controls.js`。JPX のページは WebFetch（要約を返す道具）で読み、括弧の引用にする文は複数の聞き方で確かめた。閾値・上限の値は書かない。確認の実際の順序、価格の乖離・建玉の上限の確認は、J-GATE で公表されていないので書かない。

| # | 区分 | 事実 | 数値・単位 | 時点・版 | 出典 | URL | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 制度 | 【大阪取引所・JPX】OTR：目的は「取引参加者の効率的な注文を促し、J-GATEのキャパシティ保全を図るため」。計測はサブ参加者コード単位かつパーティション単位。確認①②は日次、③は月次。閾値は画像のみで読めない。相場操縦への言及はない。FAQ（https://faqsd.jpx.co.jp/faq/show/10861、2023/01/16 更新）も同じ目的 | — | 2023/05/26 更新 | JPX『Order to Trade Ratio（OTR）』 | https://www.jpx.co.jp/derivatives/rules/others/02.html | ○ | 2026-11-18 | 本文、c22-quiz 問 2 |
| 2 | 制度 | 【大阪取引所・JPX】ノンキャンセル・ピリオド：「板寄せ直前の注⽂訂正・取消しによる過度の価格変動を防⽌する観点から、⼀部商品の寄付き及び引けに係る板寄せの直前に、訂正・取消し注文を原則受け付けない時間帯」。期間中は訂正・取消しを受け付けないが、新規注文は受け付ける。日中立会の引けには導入しないが、「板寄せ直前の注文取消し等の一部禁止措置」を実施。対象商品は指数先物・貴金属・農産物・エネルギー・電力・LNG で、国債先物・TONA 先物はない | — | 2026/10/26 更新の表示 | JPX『ノンキャンセル・ピリオド』 | https://www.jpx.co.jp/derivatives/rules/others/01.html | ○ | 2026-11-18 | 本文、c22-controls |
| 3 | 制度 | 【大阪取引所・JPX】ハードブロック機能：「取引所が定める１注文あたりの最大発注可能数量をJ-GATEに設定し、当該設定値を超えた注文を受け付けない機能」。目的は誤発注防止。全取引参加者に適用。FAQ 10258 は、Max Size（ハードリミット。利用者が TradeGuard で設定）と区別 | — | 2026/04/13 更新 | JPX『ハードブロック機能』 | https://www.jpx.co.jp/derivatives/rules/others/03.html | ○ | 2026-11-18 | 本文、c22-checks |
| 4 | 市場の規則 | 【大阪取引所・JPX】TradeGuard の FAQ：Order Rate Limit は 1/10 秒単位で計測し、TradeGuard の計測の数が、利用者や J-GATE の数と異なりうる（FAQ 10336）。手動 Block は PTLG（リスク管理グループ）配下のログイン ID の新規注文・訂正注文を抑止し、板の注文の削除はできる（FAQ 10445）。FAQ 16196（TradeGuard） | — | FAQ の更新日はページごと | JPX FAQ | https://faqsd.jpx.co.jp/faq/show/16196 | ○ | 2026-11-18 | 本文、c22-checks |
| 5 | 市場の規則 | 【大阪取引所・JPX】『別紙1：リスク管理機能』：キャンセル・オン・ディスコネクト、注文抑止・取消（キルスイッチ）、ユーザ設定型ハードリミット、テスト用銘柄（ダミーシンボル）を挙げる。日付なし。親の発表を特定できず、現在の Max Size との関係は未確認 | — | 日付なし | JPX『別紙1：リスク管理機能』 | https://www.jpx.co.jp/corporate/news-releases/0060/nlsgeu0000016z4h-att/01.pdf | ○ | 2026-11-18 | c22-controls |
| 6 | 制度 | 【東京証券取引所・大阪取引所・日本取引所自主規制法人】『注文管理に関するガイドライン』：制定 2018-03-02、改訂 2021-01-04。1 注文あたりの上限、発注抑止措置、「直接的かつ排他的な管理」。参加者が取引所のリスク管理機能で足りると判断すれば、代わりに使える。その利用は参加者の責任 | — | 改訂 2021-01-04 | 東証・大阪取引所・日本取引所自主規制法人『注文管理に関するガイドライン』 | https://www.jpx.co.jp/rules-participants/public-comment/detail/d8/nlsgeu000004is7s-att/nlsgeu000004iuum.pdf | ○ | 2026-11-18 | 本文、c22-quiz 問 3、c22-exam |
| 7 | 制度 | 【大阪証券取引所（当時）】『板寄せ直前における大口注文取消等の一部禁止について』：2011-12-12 から日経 225 先物（ラージ・ミニ）に適用。古い資料なので、時間・数量の閾値は写さない | — | 2011 年 | 大阪証券取引所（当時）『板寄せ直前における大口注文取消等の一部禁止について』 | https://www.jpx.co.jp/news/detail/nlsgeu0000003mtc-att/news24880.pdf | ○ | 2026-11-18 | 本文（存在のみ） |
| 8 | 市場の規則 | 【CME】Pre-Trade Risk Management：管理者が設定する限度、cancel on disconnect、self-match prevention（「Prevent the matching of orders with common ownership」） | — | © 2026 | CME グループ『Pre-Trade Risk Management』 | https://www.cmegroup.com/solutions/market-access/globex/trade-on-globex/pre-trade-risk-management.html | ○ | 2026-11-18 | c22-controls |
| 9 | 市場の規則 | 【CME】Kill Switch：Legal Clearing Entity Admin・Execution Firm Admin・CME Admin が有効にできる。日付つきの注文と期限なしの注文が取り消され、Mass Quote は取り消されず、新規の注文の入力が禁止される | — | 日付の記載なし | CME グループ『Kill Switch』（Globex Credit Controls ヘルプ） | https://www.cmegroup.com/tools-information/webhelp/globex-credit-controls/Content/Kill-Switch.html | ○ | 2026-11-18 | c22-controls |
| 10 | 市場の規則 | 【大阪取引所・JPX】TradeGuard：全ての取引参加者による利用が必須。受け付ける前にリスクチェック。閾値を越えれば発注を自動的に止める（第18章 #5 と同じ） | — | 2021/09/20 更新 | JPX『システム概要』 | https://www.jpx.co.jp/systems/derivatives-trading/01.html | ○ | 2026-11-18 | 本文 |

確認できず書かなかった：OTR の閾値（画像のみ）、TradeGuard の閾値の種類と値・確認の順序、価格の乖離・建玉の上限の確認（J-GATE で公表されていない）、NCP の対象商品の最新の全リスト、キルスイッチの J-GATE での現在の操作、別紙1 の親の発表と日付、誤発注の取消の扱い（取引所の規則の名前）。

演習の照合（第22章）
| 問・演習 | 正答（要点） | 照らした本文・図 | 本文・図の記述 | 一致 |
|---|---|---|---|---|
| c22-quiz 問 1 | 誤った・大きすぎる注文が板に載って約定する前に止める | 本文「受付の前の確認」、c22-checks | 同じ（TradeGuard は受付の前のチェック、ハードブロックは誤発注防止） | ○ |
| c22-quiz 問 2 | 効率的な注文を促し、J-GATE のキャパシティ保全 | 本文「OTR」、事実 #1 | 同じ | ○ |
| c22-quiz 問 3 | 取引所の機能で足りると判断すれば代用可。利用は参加者の責任 | 本文「参加者の側の管理」、事実 #6 | 同じ | ○ |
| c22-exam 1 | ハードブロック機能は取引所が定める 1 注文あたりの最大発注可能数量（全取引参加者に適用）、Max Size は参加者が TradeGuard で設定する上限（検証 W2 が 2026-11-18 に、確認問題 問3 と同じ問いだったものを差し替え） | 本文「受付の前の確認」、事実 #3 | 同じ | ○ |
