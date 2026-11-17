# 講座 B「取引所の金利デリバティブ」— 用語の表記ルール（差分）

共通の決まりは `/home/claude/courses/_finance/GLOSSARY-RULES.md`（共通版）。この文書は、この講座だけの用語の割り当てと、共通版の例外だけを書きます。

## 1. 共通版の例外

1. **大阪取引所の規則の語を優先**：「取引単位」「限月取引」「呼値の単位」「取引最終日」「最終決済」「清算値段」「即時約定可能値幅」「制限値幅」「サーキット・ブレーカー制度」（制度名として引くとき）、「立会」「日中立会」「夜間立会」「J-NET 取引」「ストラテジー取引」。CME の規則の語は英語の原文を初出の括弧に（例：「保証基金（guaranty fund）」）。
2. **「清算会員」と「清算参加者」**：日本の制度（JSCC）は「清算参加者」、米国の制度（CME Clearing・OCC）は「清算会員（clearing member）」。同じ図に両方が出るときは両方の語を書く。
3. **講座 A の語を使うときは講座 A の章へリンク**し、用語集に入れるなら共通版 §6 の定義を一字一句写す（この講座の割り当ての表で「（A）」と書いた語）。

## 2. 用語の割り当て

**太字**は共通版 §6 の共通の用語（共通版から一字一句写す）。「（A）」は講座 A が持ち主で、この講座でも用語集に入れる語（`ch` はこの講座の章、本文で講座 A の章へリンク）。`→` は `alias`。

| 章 | 登録する語 |
|---|---|
| 序1 | **先物**→先物取引／**限月**／**建玉**→未決済建玉／反対売買（offsetting transaction）→手仕舞い／取引単位（contract size）→乗数 |
| 01 | デリバティブ（derivative）→派生商品／店頭デリバティブ（over-the-counter derivative）→OTC・相対／先渡取引（forward）／清算集中（mandatory clearing）→G20 の合意 |
| 02 | 短期金利先物（short-term interest rate futures）→STIR／IMM 方式（IMM index）→100 − 金利／参照期間（reference period）→参照四半期／差金決済（cash settlement）→最終決済 |
| 03 | ユーロ円 3 か月金利先物（Euroyen 3-month futures）→TIBOR／TONA 3 か月金利先物（3-month TONA futures）→TONA 先物／金利指標の改革（interest rate benchmark reform）→指標の移行 |
| 04 | ユーロドル先物（Eurodollar futures）→LIBOR／SOFR 先物（SOFR futures）→3 か月 SOFR・1 か月 SOFR／建玉の転換（conversion of open interest）→fallback |
| 05 | 国債先物（government bond futures）→長期国債先物・Treasury futures／標準物（notional bond）／受渡適格銘柄（deliverable bond）→受渡銘柄／交換比率（conversion factor）→コンバージョン・ファクター／最割安銘柄（cheapest-to-deliver）→CTD |
| 06 | 先物オプション（option on futures）→国債先物オプション・SOFR 先物オプション／権利行使（exercise）→割当て |
| 07 | **金利スワップ**→IRS・OIS／固定の側（fixed leg）→変動の側／想定元本（notional amount）／ストリップ（strip） |
| 08 | **板**→気配・板情報／指値の注文（limit order）→成行の注文／執行の条件（time in force）→FAK・FOK／最良の気配（best bid and offer）→気配の幅・スプレッド |
| 09 | 板寄せ（call auction）→寄付き・引け／ザラバ（continuous trading）／**価格優先・時間優先**→FIFO／**プロラタ**→比例配分・Allocation |
| 10 | 制限値幅（daily price limit）→値幅制限／**サーキットブレーカー**→取引の一時中断／即時約定可能値幅（immediately executable price range）→DCB・Velocity Logic／基準値段（reference price） |
| 11 | 日中立会（day session）→夜間立会・ナイト・セッション／J-NET 取引（J-NET trading）→立会外の取引／ストラテジー取引（strategy trading）→コンビネーション／祝日取引（holiday trading） |
| 12 | マーケットメイカー（market maker）→マーケットメイカー制度・LMM／流動性（liquidity）→気配の幅・板の厚み |
| 13 | 相場操縦（market manipulation）→変動操作取引・仮装売買・馴合売買・安定操作取引／**見せ玉**→スプーフィング・レイヤリング／課徴金（administrative monetary penalty）／売買審査（trade surveillance）→日本取引所自主規制法人 |
| 14 | アルゴリズム取引（algorithmic trading）／高速取引行為者（high-speed trader）→HFT・高頻度取引 |
| 15 | 在庫のリスク（inventory risk）→ポジションのリスク／気配の提示（quoting）→両建ての気配 |
| 16 | スプレッド取引（spread trading）→カレンダー・スプレッド・限月間・商品間／限月間バタフライ（futures butterfly）→バタフライ（先物）（2026-11-18 追加）／限月間コンドル（futures condor）→コンドル（先物）（2026-11-18 追加。講座 C のオプションの「バタフライ」「コンドル」とは別の語。見出し語に「限月間」を付けて区別する） |
| 17 | 執行アルゴリズム（execution algorithm）→TWAP・VWAP・参加率／市場への影響（market impact）→実行のコスト |
| 18 | 取引システム（trading system）→売買システム・デリバティブ売買システム・J-GATE・Genium INET（2026-11-18 変更：J-GATE は取引システム全体の名前、Genium INET Trading はその製品。マッチングエンジンだけの別名ではない）／注文の入口（order gateway）→ゲートウェイ・OUCH／マッチングエンジン（matching engine）／相場配信（market data feed）→ITCH |
| 19 | 決定性（determinism）→再現性／待ち行列（queue）→優先の順位 |
| 20 | マルチキャスト（multicast）→再送・番号の飛び |
| 21 | コロケーション（co-location）→arrownet（JPX のネットワークの名前。使うときは JPX の資料で確かめる）／遅延（latency）→レイテンシ・パーセンタイル |
| 22 | 事前のリスクの確認（pre-trade risk check）→TradeGuard・キルスイッチ／注文と約定の比率（Order to Trade Ratio）→OTR／ノンキャンセル・ピリオド（non-cancel period）／ハードブロック機能（hard block） |
| 23 | **清算機関**→CCP・中央清算機関／債務引受（novation）→更改／ネッティング（netting）→相殺／清算参加者（clearing participant）→清算会員・指定清算参加者 |
| 24 | **当初証拠金**→IM／**変動証拠金**→VM／**値洗い**→時価評価／清算値段（settlement price）→清算価格 |
| 25 | SPAN（Standard Portfolio Analysis of Risk）→SPAN 2／バリュー・アット・リスク（Value at Risk, VaR）→ヒストリカル・シミュレーション／期待ショートフォール（Expected Shortfall, ES）→ストレス期間／保有期間（margin period of risk）→信頼水準 |
| 26 | **清算基金**→保証基金・default fund・guaranty fund／ウォーターフォール（default waterfall）→損失補償・損失の負担の順序／破綻処理（default management）→移管・入札 |
| 27 | 金融市場インフラのための原則（Principles for Financial Market Infrastructures, PFMI）→CPMI・IOSCO／金融商品取引清算機関（financial instruments clearing organization） |
| 28 | 登録しない（演習の章） |
| 29 | 機関の名前：大阪取引所、東京金融取引所、日本証券クリアリング機構（JSCC）、CME グループ、CME Clearing、金融庁、証券取引等監視委員会、CFTC、IOSCO |

### 2.1 注意

- 「即時約定可能値幅」の英語は大阪取引所の英語の資料の語で確かめる（設計の時点では未確認。上の英語は仮）。「DCB（Dynamic Circuit Breaker）」は大阪取引所の資料で使われているかを確かめてから `alias` に入れる（F-B6 の要綱の本文には DCB の語はなかった）。
- 「期待ショートフォール」は JSCC の証拠金のページの語。「期待ショートフォール方式」と書くかは JSCC の語で確かめる。
- この表は各章が**必ず登録する語**です。3 語に満たない章（14・15・16・19・20 など）は、共通版 §7 の手順で語を足します。28 は演習の章で登録しません。
