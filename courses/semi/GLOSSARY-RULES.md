# 半導体講義 — 用語の表記ルールと用語の割り当て

全章担当の必読文書です。仕様は `spec.md`。迷った語は §9 の手順で決め、この文書に追記してから使います（担当ごとの判断で表記を作らない）。

## 1. 基本

1. 読者向けの文章は日本語。専門用語は**章ごとの初出**で英語を併記し、2 回目以降は日本語か略語だけにする。
2. 英語は、業界団体（SEMI、JEDEC、IRDS など）や規格で使われる綴りにする（米国式。例：`wafer`、`metrology`、`ion implantation`）。
3. 数字は半角。半角の数字・英字と和文の間には半角スペースを入れる（コアネットワーク講義と同じ慣行：「300 mm ウェーハ」「32 ビット」「CVD 装置」）。ただし章番号は「第04章」と詰めて書く。
4. 範囲は「〜」（例：5〜8 語）。並列は「・」、選択肢の区切りは「／」。
5. 公的資料・規格の正式な用語は、その表記を優先する（例：経済産業省の「パラメータシート」、税関の「事前教示制度」）。

## 2. 表記の統一表

### 2.1 カタカナ語

原則：**語末の長音は付ける**（「フォワーダー」「スキャナー」「テスター」「ハンドラー」「プローバー」「ストッカー」「チラー」「ドライバー」）。例外（業界・公的資料で定着している表記）：

| 使う表記 | 使わない表記 |
|---|---|
| ウェーハ | ウエハ、ウェハ、ウエハー、ウェハー |
| リソグラフィ | リソグラフィー |
| メモリ | メモリー |
| ファウンドリ | ファウンドリー |
| コータ・デベロッパ | コーター・デベロッパー（装置の総称として。単体はコータ、デベロッパ） |
| パラメータシート | パラメーターシート（輸出管理の用語として） |
| インタフェース | インターフェース（ショーケース全体の慣行に合わせる） |
| エネルギー | エネルギ |

その他の統一：

| 使う表記 | 使わない表記・注意 |
|---|---|
| フォトレジスト（2 回目以降はレジスト） | ホトレジスト |
| エッチング、エッチング装置 | エッチ（本文では略さない。見出し・表では「エッチ」可） |
| プラズマ | — |
| スパッタリング（装置はスパッタ装置） | スパッタ（動作の意味では使わない） |
| ダマシン、デュアルダマシン | ダマシーン |
| チップレット | — |
| ハイブリッドボンディング | ハイブリッド接合（初出の括弧内の説明としては可） |
| クリーンルーム | — |
| フックアップ | — |
| データロガー | ロガー（2 回目以降は可） |
| インコタームズ（初出は「Incoterms® 2020（インコタームズ 2020）」のように版を付ける） | — |
| サプライチェーン → **供給網**（初出のみ「供給網（サプライチェーン）」） | — |

### 2.2 漢字・送り仮名

| 使う表記 | 使わない表記 |
|---|---|
| 立上げ | 立ち上げ、立上 |
| 据付（動詞は「据え付ける」） | 据え付け、据付け |
| 受入検査、受入基準 | 受け入れ検査 |
| 搬入、搬出、開梱、梱包 | — |
| 検収 | — |
| 歩留まり | 歩留り、歩止まり |
| 取扱い（名詞） | 取り扱い |
| 引合い | 引き合い |
| 前工程・後工程 | 前行程（「行程」は輸送の道のり〔第4部〕にだけ使う） |
| 工程（製造の段階）／行程（輸送の道のり） | 混用しない |

### 2.3 意味の使い分け

| 語 | この講座での意味 | 注意 |
|---|---|---|
| 装置 | 製造装置（tool、equipment） | 工場の用役設備と区別する |
| 設備 | 工場の用役設備（facility）。電力・超純水・ガス・排気など | 「設備投資」は一般語として可（第19・30章） |
| 用役 | 装置を動かすための電力・水・ガス・空気・排気（utility） | 初出で「用役（ユーティリティ）」 |
| ダイ／チップ | 工程の文脈ではダイ（ウェーハ上の個片）、製品の文脈ではチップ | 第03章で定義 |
| 半導体 | 材料・素子・集積回路・産業のどれを指すかを文脈で明らかにする | 曖昧なら「半導体材料」「半導体デバイス」「半導体産業」 |
| マスク | 単独で使わない。**フォトマスク（レチクル）**、**ハードマスク**、**注入マスク**のいずれか | 「マスク層数」は可（第06章で定義） |
| 世代 | 微細化の世代（§4） | 3GPP の「リリース」のような意味では使わない |
| 顧客 | 装置を買う半導体メーカー（ファブ） | 「ユーザー」は使わない |
| 売主・買主 | 貿易取引の当事者（第26章） | 「輸出者・輸入者」は通関の文脈で使う |
| 荷主・荷受人 | 運送の当事者 | — |
| FAT／SAT | 出荷前検査／受入検査（現地） | 第21章・第25章で定義 |

## 3. 英語併記と略語の初出

1. **章ごとの初出**の形：`日本語（English full name, 略語）`。例：「化学気相成長（Chemical Vapor Deposition, CVD）」「原子層堆積（Atomic Layer Deposition, ALD）」。
2. 略語のほうが一般名になっている語は、略語を主にする：「CMOS（Complementary MOS、相補型 MOS）」「DRAM（Dynamic Random Access Memory）」「EUV（Extreme Ultraviolet、極端紫外線）露光」。
3. 2 回目以降はその章の中で略語だけでよい。**他の章で定義済みでも、章ごとの初出では必ず併記する**（章単位で読まれるため）。
4. 見出し（`<h3>` `<h4>`）に、まだ説明していない略語だけを置かない（「CMP」ではなく「平坦化（CMP）」）。
5. データ（`CN.add` の文字列）の中も同じ規則。シーケンスの `msg`・`lbl` は短くするため略語可（その章の本文で初出済みであること）。
6. **衝突する略語**は次のとおり扱う。

| 略語 | 衝突 | 扱い |
|---|---|---|
| ICC | 国際商業会議所（International Chamber of Commerce）と協会貨物約款（Institute Cargo Clauses） | 「ICC」単独で使わない。国際商業会議所は「ICC（国際商業会議所）」、約款は「協会貨物約款」と書き、略さない（「協会貨物約款（A）」） |
| CP | 後工程のウェーハテスト（Chip Probing）と輸出管理内部規程（Compliance Program） | 後工程では「ウェーハテスト」と書き CP と略さない。CP は第27章の輸出管理内部規程にだけ使う |
| PCN | 製品変更通知（Product Change Notice） | 第20章で定義。他の意味で使わない |
| SAT | 受入検査（Site Acceptance Test） | 他の意味で使わない |
| ESC | 静電チャック（Electrostatic Chuck） | — |
| MP | メタルピッチ | 本文では略さず「メタルピッチ」 |
| BB 比 | 受注額と出荷額の比 | 第30章で、公表の有無と定義を確認してから使う |

## 4. 世代の呼び方

世代の呼び方の持ち主は**第04章**。他の章はここに従い、詳しい説明は第04章へリンクする。

1. ロジックの世代は「**◯ nm 世代**」と書く（「◯ nm プロセス」「◯ nm ノード」「◯ nm 技術」は使わない）。章ごとの初出で「（世代の呼称で、物理寸法ではない。第04章）」を添える。
2. 企業固有の呼称は、その企業の表記のまま、**社名と組で**書く：「TSMC の N2」「Intel の 18A」「Samsung の SF2」など（表記は各社の公開資料で確認してから使う）。**企業間で世代を等号で比べない**（「◯◯社の N2 は△△社の 18A に相当」と書かない）。比較が出典に書かれている場合だけ、その出典を示して書く。
3. DRAM の世代は「1α（ワンアルファ）世代」のように各社の公開資料の呼称で書き、初出で「10 nm 台の世代を区別する呼び方」と説明する（説明の文言は第04章で確定）。
4. 3D NAND は「◯◯層」と書き、必ず出典（企業と発表時期）を付ける。
5. IRDS の独自の表記（ピッチの組み合わせなど）は第04章で説明し、他の章では使わない。
6. ウェーハの直径は「300 mm ウェーハ」。インチの呼称は章ごとの初出の括弧内だけ（「300 mm（12 インチ）ウェーハ」）。
7. 露光の光源は「ArF 液浸」「EUV」「High-NA EUV」と書く。初出で「High-NA EUV（開口数を高めた EUV 露光）」。波長・NA の数値は第08章だけが書く。
8. トランジスタ構造は「プレーナ型」「FinFET」「GAA（Gate-All-Around）」。GAA のナノシート構造は「GAA（ナノシート）」。企業ごとの呼称（例：Samsung の MBCFET、Intel の RibbonFET）は「◯◯社の呼称」と明記して括弧で添える。
9. 世代・層数・構造の「量産開始」は、企業の公表どおりの言葉（「量産開始」「出荷開始」「リスク生産」）を使い、言い換えない。

## 5. 数字・単位・出典

### 5.1 単位

| 量 | 書き方 | 注意 |
|---|---|---|
| 長さ | nm、μm、mm、m | μ は U+03BC。数字と単位の間に半角スペース（「13.5 nm」）。「ミクロン」は使わない |
| 面積 | mm²、m²、平方インチ（ウェーハ出荷面積の統計がこの単位の場合だけ。出典どおり） | — |
| 質量 | kg、t | 本文では一般語の「重量」を使ってよい（荷姿図・床荷重の文脈）。「トン」と書く場合は t を併記 |
| 圧力 | Pa（kPa、mPa） | 業界で多い Torr は括弧で併記可（「1 Pa（約 7.5 mTorr）」の換算は計算で正しいことを確認） |
| 温度 | °C | 「25 °C」。K は物性の説明（第01章）だけ |
| 湿度 | %RH | 「% RH」ではなく「%RH」 |
| 割合 | % | 数字に詰めて書く（「30%」）。日本語の慣行に合わせる |
| 衝撃 | G | 初出で「G は重力加速度の何倍かを表す」と説明。インジケータの作動値は製品ごとに違うので数値を一般化しない |
| 傾斜 | 度（°） | 「15°」。数字に詰める |
| 電力 | W、kW、MW | — |
| 周波数 | Hz、kHz、MHz | RF 電源の周波数は出典があるものだけ |
| 時間 | 本文は「秒」「分」「時間」「日」 | 表の見出しでは s、min、h 可 |
| 金額 | 「◯億円」「◯億米ドル」 | 「ドル」は章ごとの初出で「米ドル」。為替換算はしない（出典の通貨のまま） |
| 大きな数 | 「万」「億」「兆」を使う。3 桁区切りのカンマは表だけ | — |
| 年 | 西暦。「2025 年」「2025 年度」「2025 年 1〜3 月期」を区別する | 暦年か年度かは出典どおり |

### 5.2 出典と時点の書式

- 本文：**（出典：発行者『資料名』、公表 YYYY 年 M 月、数値は YYYY 年〔暦年／年度／四半期〕）**
  - 例の形：「…は約 ◯◯ 億米ドルでした（出典：SEMI『（資料名）』、公表 YYYY 年 M 月、数値は YYYY 年暦年）。」
- データ（`CN.add` の文字列）：同じ書式を括弧で末尾に付ける。表（`qos`）では「出典」「時点」の列を設ける。
- 参照資料の表（章末の `refs`）：種類／資料名／発行者／時点（公表日）／この章での使い方。本文で使った資料は必ず載せる。
- 「約」「およそ」は、出典の値を丸めたときだけ使う（丸め方は出典の桁に合わせる）。推計・予測は「予測」と明記し、予測した主体を書く。
- **書かないもの**：出典のない数字、出典の時点が不明な数字、複数の出典から計算した独自の数字（シェアの再計算など）、有料レポートの非公開部分。
- 確認日は、読者向けの本文ではなく、データファイル先頭のコメントに残す（`spec.md` §7.3）。

## 6. 主体の呼び方

### 6.1 シーケンス（`seq`）の登場者・本文での呼び方

| 呼び方 | 説明 | `kind` |
|---|---|---|
| 顧客（ファブ） | 装置を買う半導体メーカー。部門を分けるときは「顧客の購買」「顧客の設備部門」「顧客のプロセス技術者」 | `ext` |
| 装置メーカー | 製造装置のメーカー | `core` |
| 装置メーカー技術者 | 現地で据付・立上げ・保守をする技術者。初出で「フィールドサービス技術者（Field Service Engineer）」と説明。FSE と略してよい | `core` |
| 商社 | 装置・部品・材料を仲介する商社 | `pol` |
| フォワーダー | 輸送の手配を一括で引き受ける事業者（貨物利用運送事業者） | `ran` |
| 通関業者 | 通関手続きを代行する事業者 | `pol` |
| 運送会社／航空会社／船会社 | 実際に運ぶ事業者 | `ran` |
| 梱包業者／リギング業者 | 梱包、重量物の搬入を行う事業者 | `ran` |
| 税関（輸出地）／税関（輸入地） | — | `ext` |
| 保険会社／検査人（サーベイヤー） | — | `ext` |
| 所管当局 | 輸出管理では「経済産業省（所管当局）」。他国の当局は国名を付ける（「米国商務省 BIS」） | `ext` |
| 荷主／荷受人、売主／買主 | 文脈に応じて（§2.3） | `ext` |

### 6.2 企業名

1. 社名は、その企業が日本語で名乗る表記があればそれを使い、なければ英語表記（例：「東京エレクトロン」「ASML」「Applied Materials」「Lam Research」「KLA」）。法人格（株式会社、Inc. など）は省く。表記は各社の公式サイトで確認する。
2. 章ごとの初出で本社の国・地域を括弧で 1 回だけ添える（「Applied Materials（米国）」）。
3. 持株会社と事業会社が違う場合は、出典に出てくる主体の名前を使う。
4. 株式の銘柄コード・ティッカーは書かない。
5. 製品名・技術ブランド名は「◯◯社の呼称」と分かる形で、説明に必要なときだけ（例：パッケージ技術のブランド名）。
6. 演習・ケースの会社は「装置メーカー A 社」「顧客 B 社」「フォワーダー C 社」のように、アルファベットで架空にする（A〜H を使い、同じ章の中で役割を変えない）。

## 7. 用語集（`CN.glossary`）の書き方

```js
CN.glossary([
  { t: '原子層堆積', en: 'Atomic Layer Deposition', alias: 'ALD', d: '説明（1〜2 文）', ch: [7] }
]);
```

- `t`：見出し語。§3.2 で略語を主にする語は略語（`t: 'CMOS'`、`en: 'Complementary Metal-Oxide-Semiconductor'`、`alias: '相補型 MOS'`）。
- `en`：英語の正式名。`alias`：略語・別表記・企業ごとの呼称（検索用）。
- `d`：1〜2 文。数字を入れない（数字は本文の持ち主章で出典つきで書く）。
- `ch`：持ち主の章を先頭に。他の章で詳しく扱う場合は後ろに足してよい（持ち主章の担当が足す）。
- **登録するのは §8 の持ち主の章だけ**。割り当てにない語を足したいときは、§9 の手順で割り当てに追記してから。
- 用語集の合計は 150 語以上（§8 の割り当ては上限の候補。各章は本文で実際に説明した語を登録し、最低 4 語）。

## 8. 用語の割り当て（章をまたいで重複させない）

各語を登録できるのは、ここに書いた章だけです。表の語は「見出し語（英語／略語）」。`→` は別名として `alias` に入れる語。

| 章 | 登録する語 |
|---|---|
| 01 | 半導体（semiconductor）／バンドギャップ（band gap）／価電子帯・伝導帯（valence band / conduction band）／キャリア（carrier）→電子・正孔／ドーピング（doping）／ドナー・アクセプタ（donor / acceptor）／n 型半導体・p 型半導体（n-type / p-type）／pn 接合（pn junction）→ダイオード／空乏層（depletion layer）／化合物半導体（compound semiconductor）→SiC・GaN・GaAs |
| 02 | トランジスタ（transistor）／MOSFET（Metal-Oxide-Semiconductor Field-Effect Transistor）／ゲート絶縁膜（gate dielectric）／しきい値電圧（threshold voltage, Vth）／チャネル（channel）／短チャネル効果（short-channel effect）／FinFET／GAA（Gate-All-Around）→ナノシート／High-k メタルゲート（High-k Metal Gate, HKMG）／パワー半導体（power semiconductor）→IGBT |
| 03 | CMOS／集積回路（Integrated Circuit, IC）／ダイ（die）→チップ／スタンダードセル（standard cell）／EDA（Electronic Design Automation）／SoC（System on a Chip）／ロジック（logic）／DRAM／SRAM／NAND フラッシュメモリ（NAND flash memory）→3D NAND |
| 04 | ムーアの法則（Moore's law）／スケーリング（scaling）／世代（technology node）→プロセスノード／ゲートピッチ（contacted gate pitch, CPP）／メタルピッチ（metal pitch）／IRDS（International Roadmap for Devices and Systems）／PPA（Power, Performance, Area） |
| 05 | 多結晶シリコン（polycrystalline silicon）→ポリシリコン／CZ 法（Czochralski method）／FZ 法（Float Zone method）／インゴット（ingot）／エピタキシャルウェーハ（epitaxial wafer）／SOI（Silicon on Insulator）／ノッチ（notch）／FOUP（Front Opening Unified Pod）／FOSB（Front Opening Shipping Box） |
| 06 | 前工程（front-end process）／後工程（back-end process）／FEOL（Front End of Line）／BEOL（Back End of Line）／歩留まり（yield）／サイクルタイム（cycle time）／ロット（lot）／マスク層数（mask count） |
| 07 | 熱酸化（thermal oxidation）／化学気相成長（Chemical Vapor Deposition, CVD）→LPCVD・PECVD／原子層堆積（Atomic Layer Deposition, ALD）／物理気相成長（Physical Vapor Deposition, PVD）／スパッタリング（sputtering）／ターゲット（sputtering target）／エピタキシャル成長（epitaxial growth）／段差被覆性（step coverage）→コンフォーマル／前駆体（precursor） |
| 08 | リソグラフィ（lithography）／露光装置（exposure tool）→スキャナー・ステッパー／開口数（Numerical Aperture, NA）／k1 係数（k1 factor）→解像度の式／ArF 液浸（ArF immersion）／EUV 露光（Extreme Ultraviolet lithography）／High-NA EUV／重ね合わせ（overlay）→アライメント／マルチパターニング（multiple patterning） |
| 09 | フォトレジスト（photoresist）→ポジ型・ネガ型／化学増幅型レジスト（Chemically Amplified Resist, CAR）／コータ・デベロッパ（coater/developer）→トラック／露光後ベーク（Post Exposure Bake, PEB）／フォトマスク（photomask）→レチクル／マスクブランクス（mask blank）／ペリクル（pellicle）／OPC（Optical Proximity Correction） |
| 10 | ドライエッチング（dry etching）／ウェットエッチング（wet etching）／プラズマ（plasma）→イオン・ラジカル／反応性イオンエッチング（Reactive Ion Etching, RIE）／異方性（anisotropy）→等方性／選択比（selectivity）／アスペクト比（aspect ratio）／原子層エッチング（Atomic Layer Etching, ALE）／アッシング（ashing）／終点検出（endpoint detection） |
| 11 | イオン注入（ion implantation）→注入エネルギー／ドーズ量（dose）／活性化アニール（activation anneal）／RTP（Rapid Thermal Processing）／縦型炉（vertical furnace）→拡散炉／レーザーアニール（laser anneal）／サーマルバジェット（thermal budget） |
| 12 | 多層配線（multilevel interconnect）／コンタクト・ビア（contact / via）／ダマシン（damascene）→デュアルダマシン／バリアメタル（barrier metal）→シード層／電解めっき（electroplating）／Low-k 膜（low-k dielectric）／CMP（Chemical Mechanical Polishing）→平坦化／スラリー（slurry）／ディッシング・エロージョン（dishing / erosion） |
| 13 | パーティクル（particle）／RCA 洗浄（RCA clean）／自然酸化膜（native oxide）／CD-SEM（Critical Dimension SEM）→CD／欠陥検査（defect inspection）→明視野・暗視野・レビュー／SPC（Statistical Process Control）／APC（Advanced Process Control）／ホールド（hold）／リワーク（rework）→再処理 |
| 14 | ウェーハテスト（wafer test）→プローブテスト／プローブカード（probe card）→プローバー／バックグラインド（back grinding）／ダイシング（dicing）→ブレード・レーザー・ステルス／ダイボンディング（die bonding）／ワイヤボンディング（wire bonding）／フリップチップ（flip chip）／バンプ（bump）／封止（encapsulation）→モールド／リードフレーム（lead frame）→パッケージ基板／ファイナルテスト（final test）／バーンイン（burn-in）／テスター・ハンドラー（tester / handler）／MSL（Moisture Sensitivity Level） |
| 15 | 2.5D 実装（2.5D integration）／インターポーザ（interposer）／再配線層（Redistribution Layer, RDL）／TSV（Through-Silicon Via）／3D 積層（3D stacking）／ハイブリッドボンディング（hybrid bonding）／HBM（High Bandwidth Memory）／チップレット（chiplet）／UCIe（Universal Chiplet Interconnect Express）／FOWLP（Fan-Out Wafer Level Package）／パネルレベルパッケージ（Panel Level Package, PLP）／KGD（Known Good Die） |
| 16 | クラスタツール（cluster tool）／EFEM（Equipment Front End Module）／ロードポート（load port）／ロードロック（load lock）／搬送室（transfer chamber）／プロセスチャンバ（process chamber）／枚葉式・バッチ式（single-wafer / batch）／レシピ（recipe）／スループット（throughput）→WPH／稼働率（availability / utilization）→SEMI E10／フットプリント（footprint） |
| 17 | ドライポンプ（dry pump）／ターボ分子ポンプ（Turbo Molecular Pump, TMP）／真空計（vacuum gauge）／RF 電源（RF generator）／整合器（matching network）→マッチャー／ガスボックス（gas box）／MFC（Mass Flow Controller）／静電チャック（Electrostatic Chuck, ESC）／チラー（chiller）／搬送ロボット（wafer handling robot）→真空ロボット／消耗部品（consumable parts）→石英・セラミック部品 |
| 18 | ファブ（fab）／クリーンルーム（cleanroom）／ISO クラス（ISO class）→ISO 14644-1／サブファブ（subfab）／AMHS（Automated Material Handling System）／OHT（Overhead Hoist Transport）／ストッカー（stocker）／超純水（Ultrapure Water, UPW）／CDA（Clean Dry Air）／特殊材料ガス（specialty gas）／除害装置（abatement system）／ツールイン（tool-in）→装置搬入 |
| 19 | IDM（Integrated Device Manufacturer）／ファウンドリ（foundry）／ファブレス（fabless）／OSAT（Outsourced Semiconductor Assembly and Test）／WFE（Wafer Fab Equipment）／設備投資（capital expenditure, CapEx）／リファービッシュ（refurbishment）→中古装置／フィールドサービス（field service）／保守契約（service contract） |
| 20 | 供給網（supply chain）／ティア（tier）／シングルソース（single source）／変更管理（change control）→PCN（Product Change Notice）／事業継続計画（Business Continuity Plan, BCP）／高純度化学薬品（high-purity chemicals） |
| 21 | FAT（Factory Acceptance Test）／出荷判定（shipping release）／分割出荷（split shipment）→モジュール出荷／クレート（crate）→木箱／輸送用固定治具（shipping bracket）／荷姿図（packing drawing）／重心（center of gravity）／サイトサーベイ（site survey）→搬入経路調査 |
| 22 | クリーン梱包（clean packaging）／二重袋（double bagging）／バリア包装（moisture barrier packaging）／乾燥剤（desiccant）／窒素パージ（nitrogen purge）／緩衝材（cushioning material）→防振／衝撃インジケータ（shock indicator）／傾斜インジケータ（tilt indicator）／データロガー（data logger）／ISPM 15（International Standards for Phytosanitary Measures No. 15）／結露（condensation） |
| 23 | フォワーダー（freight forwarder）／ULD（Unit Load Device）／FCL・LCL（Full Container Load / Less than Container Load）→混載／フラットラックコンテナ（flat rack container）／オープントップコンテナ（open top container）／在来船（conventional vessel）／エアサスペンション車（air-suspension truck）／ドア・ツー・ドア（door-to-door） |
| 24 | リギング（rigging）／エアキャスター（air caster）／床荷重（floor load）／搬入口（delivery opening）／開梱エリア（unpacking area）／パスボックス（pass box）／レベリング（leveling）／耐震固定（seismic anchoring）→アンカー／フックアップ（hook-up）／作業許可（work permit） |
| 25 | 立上げ（start-up）／SAT（Site Acceptance Test）／受入基準（acceptance criteria）／連続稼働試験（marathon test）→マラソン／検収（final acceptance）／保証期間（warranty period）／未完了項目リスト（punch list）→パンチリスト |
| 26 | インコタームズ（Incoterms）→指定地・11 規則の略号／危険の移転（transfer of risk）／貨物保険（cargo insurance）／協会貨物約款（Institute Cargo Clauses）／インボイス（commercial invoice）／パッキングリスト（packing list）／船荷証券（Bill of Lading, B/L）／航空運送状（Air Waybill, AWB）／原産地証明書（certificate of origin）／輸出申告・輸入申告（export / import declaration）／NACCS（Nippon Automated Cargo and Port Consolidated System）／HS コード（Harmonized System code）→統計品目番号／事前教示制度（advance ruling）／AEO 制度（Authorized Economic Operator）／ATA カルネ（ATA Carnet） |
| 27 | 安全保障輸出管理（security export control）／外為法（Foreign Exchange and Foreign Trade Act）→外国為替及び外国貿易法／輸出貿易管理令（Export Trade Control Order）→輸出令・別表第 1／貨物等省令（Ministerial Ordinance）／リスト規制（list control）／キャッチオール規制（catch-all control）／該非判定（classification）／パラメータシート（parameter sheet）／役務取引（technology transfer）→技術の提供／ワッセナー・アレンジメント（Wassenaar Arrangement）／EAR（Export Administration Regulations）／ECCN（Export Control Classification Number）／再輸出規制（re-export control）／CP（Compliance Program）→輸出管理内部規程 |
| 28 | 貨物事故（cargo damage）／現状保全（preservation of evidence）／検査人（surveyor）→サーベイヤー／事故通知（notice of claim）／求償（subrogation / recovery）／責任分界（division of responsibility）／腐食（corrosion） |
| 29 | CFET（Complementary FET）／裏面電源供給（Backside Power Delivery Network, BSPDN）／3D DRAM／ガラス基板（glass substrate）／光電融合（Co-Packaged Optics, CPO） |
| 30 | CHIPS 法（CHIPS and Science Act）／欧州半導体法（European Chips Act）／投資サイクル（investment cycle）→シリコンサイクル／受注残（backlog）／先行指標・遅行指標（leading / lagging indicator） |
| 31 | 引合い（inquiry）／仕様書（specification）／発注書（Purchase Order, PO）／マイルストーン（milestone）／支払条件（payment terms）／変更要求（change request） |
| 32 | SEMI／SEMI 規格（SEMI Standards）／JEITA（電子情報技術産業協会）／SEAJ（日本半導体製造装置協会）／JEDEC／IPC／ISO（国際標準化機構）／WCO（世界税関機構）／IPPC（国際植物防疫条約）／CISTEC（安全保障貿易情報センター）／BIS（米国商務省 産業安全保障局） |

**持ち主の章の注意**

- 第01章の「化合物半導体」が SiC・GaN を持つ。第02章（パワー半導体）・第29章は登録しない。
- 第05章の「多結晶シリコン」は原料とゲート材料の両方の意味を説明に含める（第02・07章は登録しない）。
- 「CMP」は第12章、「平坦化」は第12章の別名。第13章（洗浄）は登録しない。
- 「AMHS」は第18章。第06章は本文で触れるだけ。
- 「結露」は第22章。第28章は登録しない。
- 「High-NA EUV」は第08章。第29章は登録しない。
- 「稼働率」は第16章。第25章は登録しない。
- 「IRDS」は第04章（ロードマップとして）。第32章は団体の地図で触れるだけ。
- 「FAT」は第21章、「SAT」は第25章。

## 9. 迷ったとき

1. この文書に表記・割り当てがない語は、**使う前に**この文書の該当する表へ追記を依頼する（土台担当がまとめて追記。並行作業中に各担当が直接書き換えない）。
2. 判断の順：公的資料・規格の表記 → 業界団体（SEMI、JEITA、SEAJ）の日本語資料での表記 → この文書の原則（§2.1）。
3. 同じ語を別の章が持ち主にしたいときは、本文で最も詳しく説明する章を持ち主にする。
4. 表記を変えた場合は、既に書かれた章の該当箇所を、その章の担当が直す（他人の章を直さない）。
