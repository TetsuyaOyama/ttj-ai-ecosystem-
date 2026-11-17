# 講座 C「指数オプション取引」— 用語の表記ルール（差分）

共通の決まりは `/home/claude/courses/_finance/GLOSSARY-RULES.md`（共通版）。この文書は、この講座だけの用語の割り当てと、共通版の例外だけを書きます。

## 1. 共通版の例外

1. **取引所・算出者の商品名は原文どおり**：「日経225オプション」「日経225ミニオプション」（「日経 225」と空白を入れない。大阪取引所の表記）、「日経平均株価」「日経平均ボラティリティー・インデックス」（略称「日経平均VI」。日本経済新聞社の表記）、「SPX」「SPXW」「XSP」「VIX」（Cboe の表記）。共通版 §1-3 の「半角の英字と和文の間に空白」は、これらの商品名の中には適用しない。
2. **マネーの状態**：「イン・ザ・マネー（ITM）」「アット・ザ・マネー（ATM）」「アウト・オブ・ザ・マネー（OTM）」。初出は日本語と略語、以後は略語でよい（この 3 つは略語を本文で使う例外。共通版 §3-1 では日本語を主にするが、オプションの説明で頻出のため）。
3. **組み合わせの名前**：「垂直スプレッド」「カレンダー・スプレッド」「ストラドル」「ストラングル」「バタフライ」。**「戦略」の語を使わない**（「組み合わせ」と書く。推奨に読めるのを避けるため）。英語の併記で strategy と書かない（`alias` に「オプション戦略」を入れて検索だけできるようにする）。
4. **ブラック–ショールズ**：「ブラック–ショールズ・モデル（Black–Scholes model）」。区切りは en ダッシュ「–」（章の題と同じ）。

## 2. 用語の割り当て

**太字**は共通版 §6 の共通の用語（共通版から一字一句写す）。`→` は `alias`。

| 章 | 登録する語 |
|---|---|
| 序1 | **オプション**→オプション取引／買い手（buyer）→売り手・ロング・ショート／権利と義務（right and obligation） |
| 序2 | **損益図**→ペイオフ図／損益分岐点（break-even point）／満期の損益（payoff at expiration）→途中の評価 |
| 01 | **コール・オプション**／**プット・オプション**／**権利行使価格**／**オプション価格**→プレミアム／イン・ザ・マネー（in the money, ITM）→ATM・OTM／割当て（assignment） |
| 02 | 株価指数（stock index）→日経平均株価・S&P 500／指数の算出者（index provider）／時価総額加重（market-capitalization weighted）→価格平均型 |
| 03 | 日経225オプション（Nikkei 225 options）→日経225ミニオプション／週次設定限月（weekly contract month）→ウィークリー／オンデマンド権利行使価格（on-demand strike price） |
| 04 | SPX（S&P 500 Index options）→SPXW・XSP・Mini-SPX／AM の決済（AM settlement）→PM の決済・Special Opening Quotation／Global Trading Hours（GTH） |
| 05 | ヨーロピアン（European style）→アメリカン／**特別清算数値**→SQ・SQ 値／差金決済（cash settlement）／自動の権利行使（automatic exercise） |
| 06 | オプションの一覧（option chain）→権利行使価格の一覧 |
| 07 | **本質価値**／**時間価値** |
| 08 | プット・コール・パリティ（put-call parity）→裁定 |
| 09 | **ボラティリティ**→ヒストリカル・ボラティリティ・変動率／配当（dividend）→配当落ち |
| 10 | ブラック–ショールズ・モデル（Black–Scholes model）→BS モデル／対数正規分布（lognormal distribution）→正規分布・N(d) |
| 11 | **インプライド・ボラティリティ**→IV |
| 12 | スキュー（volatility skew）→スマイル／期間構造（term structure of volatility）／ボラティリティ・サーフェス（volatility surface） |
| 13 | VIX（Cboe Volatility Index）→ボラティリティ指数／日経平均ボラティリティー・インデックス（Nikkei Stock Average Volatility Index）→日経平均VI・日経VI／分散（variance）→補間 |
| 14 | グリークス（Greeks）／デルタ（delta）／ガンマ（gamma） |
| 15 | セータ（theta）→時間の経過による減価／ベガ（vega） |
| 16 | ロー（rho）／グリークスの合成（portfolio Greeks） |
| 17 | デルタ・ヘッジ（delta hedging）→デルタ・ニュートラル／リバランス（rebalancing）→ヘッジの調整 |
| 18 | ネイキッドの売り（naked short option）→カバーなしの売り |
| 19 | 垂直スプレッド（vertical spread）→ブル・スプレッド・ベア・スプレッド・オプション戦略／カレンダー・スプレッド（calendar spread）→ホリゾンタル |
| 20 | ストラドル（straddle）／ストラングル（strangle）／バタフライ（butterfly）→コンドル |
| 21 | 追加の証拠金（margin call）→追証・不足金／建玉の処分（liquidation） |
| 22 | オプションズ・クリアリング・コーポレーション（Options Clearing Corporation, OCC）／正味のオプション価値（Net Option Value, NOV）→PFE |
| 23 | オプションのマーケットメイカー（options market maker）→Cboe のマーケットメイカーの種類 |
| 24 | 0DTE（zero days to expiration）→当日満期・ゼロ・デイ |
| 25 | ディーラーのガンマ（dealer gamma）→ヘッジの売買（**公表の研究の語として**。研究の主体の定義を `d` に書く） |
| 26 | 説明義務（duty to explain）→契約締結前交付書面／適合性の原則（suitability rule）→取引開始基準 |
| 27 | 登録しない（演習の章） |
| 28 | 機関の名前：大阪取引所、Cboe Global Markets、日本経済新聞社、S&P ダウ・ジョーンズ・インデックス、日本証券クリアリング機構（JSCC）、OCC、日本証券業協会、SEC |

### 2.1 注意

- 講座 B の語（**先物**・**限月**・**建玉**・**清算機関**・**当初証拠金**・**変動証拠金**・**板**・**見せ玉**）を使うときは、講座 B の章へリンクし、この講座の用語集には入れない（講座 B が持ち主）。
- 「グリークス」の各語の英語は小文字の一般名（delta など）。
- 「0DTE」は Cboe の文書の語。見出し語は略語にする（日本語の定まった訳がないため）。
- この表は各章が**必ず登録する語**です。3 語に満たない章（06・07・08・09・10・11・15・16・17・18・19・21・22・23・24・25・26 など）は、共通版 §7 の手順で語を足します（候補の例：08「裁定」、18「最大の損失」、24「ウィークリー・オプション」）。27 は演習の章で登録しません。
