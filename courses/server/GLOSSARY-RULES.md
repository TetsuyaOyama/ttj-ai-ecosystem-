# 計算サーバー講義 — 用語の表記ルールと用語の割り当て

全章担当の必読文書です。仕様は `spec.md`。この文書にない語・表記は、§9 の手順で決めてから使います（担当ごとの判断で表記を作らない）。第1弾『半導体講義』の `GLOSSARY-RULES.md` と同じ形で、違う所だけこの講座の決まりにしています。

## 1. 基本

1. 読者向けの文章は日本語。専門用語は**章ごとの初出**で英語を併記し、2 回目以降は日本語か略語だけにする。
2. 英語は、規格・団体（OCP、DMTF、PCI-SIG、JEDEC、IEEE、ASHRAE、ISO/IEC など）の文書の綴りにする（米国式。例：`data center`、`liquid cooling`、`out-of-band`）。
3. 数字は半角。半角の数字・英字と和文の間には半角スペースを入れる（「48 V 給電」「2 ソケット」「CPU サーバー」）。例外：章番号は「第04章」、ラックの高さは「1U」「42U」と詰める（§5.1）。
4. 範囲は「〜」、並列は「・」、選択肢の区切りは「／」。
5. 法令・規格・公的資料の正式な用語は、その表記を優先する（例：省令の「特別高圧」、消防法令の用語）。
6. **依頼の表記を優先する**：講座名と部の構成（`spec.md` §2）に使われた表記（「サーバー」「データセンター」「アクセラレータ」「光トランシーバ」「基板管理コントローラ」「管理インターフェース」「ジョブスケジューラ」「℃」）は、この講座の正の表記にする。そのため、第1弾と表記が違う語がある（§2.1 の「インターフェース」、§5.1 の「℃」）。

## 2. 表記の統一表

### 2.1 カタカナ語

語ごとに決める（一律の長音の規則は置かない）。表にない語は §9 の手順で追加してから使う。

| 使う表記 | 使わない表記・注意 |
|---|---|
| サーバー | サーバ |
| データセンター | データセンタ |
| センサー | センサ |
| ルーター | ルータ |
| メーカー | メーカ |
| フォワーダー | フォワーダ（第1弾と同じ） |
| ユーザー | 本文では使わず「利用者」（§2.3） |
| コントローラ | コントローラー（「基板管理コントローラ」「ストレージコントローラ」） |
| プロセッサ | プロセッサー |
| アクセラレータ | アクセラレーター |
| トランシーバ | トランシーバー |
| インバータ、コンバータ、レギュレータ | 語末に長音を付けない |
| ハイパーバイザ | ハイパーバイザー |
| スケジューラ | スケジューラー |
| ブートローダ | ブートローダー |
| リタイマ | リタイマー |
| コネクタ | コネクター（「クイックコネクタ」） |
| インテグレータ | インテグレーター |
| パラメータ | パラメーター |
| メモリ | メモリー |
| インターフェース | インタフェース（第1弾の表記。この講座は依頼の表記に合わせる） |
| ファームウェア、ハードウェア、ソフトウェア | ファームウエア |
| イーサネット | イーサーネット |
| ストレージ | — |
| シャーシ | シャシー |
| マザーボード | — |
| ライザーカード | — |
| エアシュラウド | — |
| ブランキングパネル | — |
| コールドプレート | コールドプレイト |
| マニホールド | マニフォールド |
| チラー | チラ |
| アイルコンテインメント（初出のみ。以降「封じ込め」） | コンテイメント、コンテナメント |
| コンテナ | コンテナー（「アイルコンテインメント」と混同しない） |
| オーケストレーション | — |
| バスバー、バスウェイ | — |
| コロケーション | — |
| ハイパースケーラ | ハイパースケーラー |
| コミッショニング（初出のみ。以降「試運転」） | — |
| ケーブリング | 配線（電力の配線と区別したいときは「ケーブリング」） |

### 2.2 漢字・送り仮名

| 使う表記 | 使わない表記 |
|---|---|
| 立上げ（IT 機器の） | 立ち上げ、立上 |
| 据付（動詞は「据え付ける」） | 据え付け、据付け |
| 受入、受入試験、受入条件 | 受け入れ |
| 搬入、搬出、開梱、梱包 | — |
| 引合い | 引き合い |
| 取扱い（名詞） | 取り扱い |
| 取り合い（工事・責任の範囲の境目） | 取合い |
| 冗長化（する行為）／冗長（性質・構成） | — |
| 消費電力 | 電力消費（文としては可） |
| 冷却液 | 冷媒（冷凍サイクルの媒体だけを「冷媒」と書く） |
| 漏れ検知 | 漏洩検知、リーク検知（初出の括弧で「リーク検知」と添えるのは可） |
| 床荷重 | 床耐荷重 |
| 上げ床 | 二重床（初出の括弧で「フリーアクセスフロア」） |

### 2.3 意味の使い分け

| 語 | この講座での意味 | 注意 |
|---|---|---|
| 機器（IT 機器） | サーバー・ストレージ装置・ネットワーク機器 | 施設の「設備」と区別する |
| 設備 | 施設の電力・冷却・防災の設備（受変電設備、空調設備、消火設備） | 「設備投資」は一般語として可（第26・29章） |
| 装置 | 原則使わない（半導体講義の「製造装置」と混ぜない） | 正式名称は可（無停電電源装置、ストレージ装置） |
| サーバー／ノード | 単体はサーバー。クラスタの中の 1 台を指すときはノード | 第11・22章で定義 |
| 電源ユニット（PSU）／電源設備／給電系統 | 機器の中の電源／施設の電源／冗長の系統（A 系・B 系） | 「電源」だけで書かない |
| 電力系統（系統） | 送電網 | 施設内の「A 系・B 系」「給電系統」、冷却の「冷却の系統」と区別 |
| 冷却／空調 | 冷却は熱を取り除くこと全般。空調は空気の温湿度を整える設備 | — |
| 液冷 | 液体で熱を運ぶ方式の総称（コールドプレート・液浸・リアドア） | 「水冷」は出典の表記がそうなっているときだけ |
| 熱負荷 | 取り除くべき熱の量（W） | 「発熱量」は初出の説明で同義と示す |
| 消費電力／定格／TDP | 実際の電力／機器に表示された上限の値／熱設計の目安 | 出典の言葉どおりに書く（言い換えない）。第06章で定義 |
| 顧客 | 機器・施設を買う・借りる側（企業、研究機関、クラウド事業者） | — |
| 利用者（テナント） | コロケーションで場所を借りる側、または計算資源を使う人 | 文脈で「施設の利用者」「計算機の利用者」と書き分ける |
| DC 事業者 | データセンターを運営する事業者 | 単独の「DC」は使わない（§3.3） |
| 運用者 | サーバー・クラスタを運用する人・部門 | 施設の運用は「施設管理者」 |
| 電力会社 | 概要でだけ使う | 系統接続・託送は「一般送配電事業者」、電気の契約・料金は「小売電気事業者」 |
| 学習／推論 | AI モデルを作る計算／使う計算 | 第08章で定義 |
| 帯域幅 | 単位時間に運べるデータ量 | 「帯域」と略さない |
| 立上げ／試運転 | IT 機器を使える状態にすること／施設の設備を検査しながら動かすこと | 第28章で定義 |

## 3. 英語併記と略語の初出

### 3.1 初出の形

1. **章ごとの初出**の形：`日本語（English full name, 略語）`。例：「基板管理コントローラ（Baseboard Management Controller, BMC）」「無停電電源装置（Uninterruptible Power Supply, UPS）」。
2. 略語のほうが一般名になっている語は、略語を主にする：「CPU（Central Processing Unit）」「PCIe（PCI Express）」「PUE（Power Usage Effectiveness、電力使用効率）」。
3. **他の章で定義済みでも、章ごとの初出では必ず併記する**（章単位で読まれるため）。
4. 見出し（`<h3>` `<h4>`）に、まだ説明していない略語だけを置かない（「CDU」ではなく「冷却液の分配装置（CDU）」）。
5. データ（`CN.add` の文字列）の中も同じ規則。`seq` の `msg`・`lbl`、`flow` の工程名は短くするため略語可（その章の本文で初出済みであること）。

### 3.2 企業固有の名前

- 製品名・技術名・機能名で企業固有のもの（例：NVIDIA の NVLink、GPU の分割機能の各社の名前）は、**「◯◯社の呼称」と分かる形**で書き、一般名を主にする（「GPU 間接続（NVIDIA の呼称では NVLink）」）。
- 製品の型番・系列名は、表（`table`）の行と出典の範囲でだけ書く。本文で製品を並べて比べない。

### 3.3 衝突する略語

| 略語 | 衝突 | 扱い |
|---|---|---|
| DC | データセンターと直流（Direct Current） | 単独の「DC」は使わない。データセンターは「DC 事業者」のような複合語でだけ略す。直流は「直流」と書く（「DC 48 V」でなく「直流 48 V」。HVDC は略語のまま可） |
| AC | 交流と空調（Air Conditioning） | 「交流」「空調」と書き、AC と略さない |
| PDU | 配電の Power Distribution Unit と通信の Protocol Data Unit | 配電の意味だけで使う。ラックに付けるものは「ラック PDU」、床置きの大型のものは「床置き型 PDU」 |
| BMS | 建物の Building Management System と電池の Battery Management System | 建物の意味だけで使う。電池側は「電池管理システム」と書き、略さない |
| KVM | リモートコンソール（Keyboard, Video, Mouse）と Linux のハイパーバイザ（Kernel-based Virtual Machine） | 第19章は「リモートコンソール（仮想 KVM）」、第04章は「KVM（Linux のハイパーバイザ）」と必ず説明を付ける |
| OCP | Open Compute Project と過電流保護（overcurrent protection） | Open Compute Project だけ。過電流保護は略さない |
| RCA | 根本原因分析（Root Cause Analysis） | 略さず「根本原因分析」 |
| SLA／SLO | サービスの合意水準と目標 | SLA は第05章で定義。SLO は使うなら第23章で定義 |
| TDP | Thermal Design Power | 第06章で定義。消費電力と同じ意味で使わない |
| U／OU／RU | ラックの高さの単位 | 「U」と「OU」（Open Rack）だけ。RU は使わない |
| ToR | Top of Rack | 「ToR スイッチ」。「TOR」と書かない |
| FRU | Field Replaceable Unit（IPMI の在庫情報の名前にもなっている） | 第06章で定義。IPMI の文脈では「FRU 情報」 |
| IST | 統合試験（Integrated Systems Test） | 第28章で定義。使う前に出典で用語を確認 |
| MIG | GPU の分割機能の企業固有の名前 | 「NVIDIA の呼称」と明記し、一般名「GPU の分割」を主にする |
| CP、FAT、SAT | 第1弾の用語 | この講座では使わない。試験は「工場での試験」「受入試験」と書く |

## 4. 世代・規格・形状の呼び方

1. 規格の世代は、**発行団体の表記**で書く：「PCIe 5.0」「CXL 3.1」「DDR5」「Redfish」（版は `2025.x` のような DMTF の表記）。章ごとの初出で発行団体を添える（「PCIe 5.0（PCI-SIG の規格）」）。数値（転送速度など）は持ち主の章（`spec.md` §9.1）だけが書く。
2. イーサネットの速度は「400 ギガビットイーサネット（400GbE）」の形。規格番号（IEEE 802.3xx）は持ち主の第10章だけが書く。
3. トランシーバ・ケーブルの形状は MSA の表記（「QSFP-DD」「OSFP」）。距離の区分（「DR」「FR」など）は規格・MSA の名前として扱い、メートルの値は第10章だけが出典つきで書く。
4. SSD の形状は SNIA の表記（「E1.S」「E3.S」「U.2」）。「ルーラー型」などの俗称は初出の括弧内だけ。
5. ラックは「19 インチラック」「Open Rack」。ラックの高さは「42U」「48U」。Open Rack の高さは「OU」で書き、U と混ぜない。
6. 冗長は「N+1」「2N」「2N+1」（記号は半角）。読み方は第05章。
7. 施設の格付けは、体系の名前と組で書く：「Uptime Institute の Tier III」「TIA-942 の Rated 3」（表記は各体系の一次資料で確認してから使う）。体系の間で段階を等号で比べない。
8. ASHRAE のクラスは「ASHRAE の A1 クラス」「W32 クラス」のように、出典の版と組で書く（「ASHRAE（第◯版）の A1」）。
9. 製品の世代（GPU・CPU の世代名）は、企業の表記のまま社名と組で書く。企業の間で世代を比べない。
10. 「量産」「出荷開始」「提供開始」「発表」は、企業の公表どおりの言葉を使い、言い換えない。

## 5. 数字・単位・出典

### 5.1 単位

| 量 | 書き方 | 注意 |
|---|---|---|
| 電力 | W、kW、MW、GW | 「ラックあたり ◯ kW」。「kW/ラック」は表の見出しだけ |
| 電力量 | kWh、MWh、GWh、TWh | 電力（W）と電力量（Wh）を混ぜない（第01章で定義） |
| 皮相電力 | VA、kVA | UPS・変圧器の容量は出典の単位のまま。kW へ換算しない |
| 電圧 | V、kV | 「交流 200 V」「三相 400 V」「直流 48 V」。「±」は出典どおり（「±400 V の直流」） |
| 電流 | A | 「32 A」 |
| 周波数 | Hz | 「50 Hz／60 Hz」 |
| 温度 | ℃ | 「25 ℃」（U+2103。数字との間に半角スペース）。「°C」は使わない |
| 温度差 | ℃ | 「温度差 10 ℃」。K は使わない。出典が K のときは「10 K（温度差 10 ℃）」と出典の値を添える |
| 湿度 | %RH | 露点は ℃ |
| 割合 | % | 数字に詰めて書く（「30%」） |
| 圧力 | Pa、kPa | 液冷の配管の圧力。bar・psi は出典が使うときだけ括弧で（換算しない） |
| 流量 | L/min（液体）、m³/h・m³/s（空気） | CFM・GPM は出典が使うときだけ括弧で（換算しない） |
| 質量・荷重 | kg、t、kN/m²、kg/m² | 床荷重は出典の単位のまま書き、換算しない |
| 長さ | mm、m | ラックの高さは U・OU（「1U」「42U」と詰める）。インチは「19 インチラック」の名前としてだけ |
| データ速度 | b/s（Gb/s、Tb/s）、B/s（GB/s） | bit と byte を必ず区別。「Gbps」とは書かない。PCIe の転送速度は「GT/s」 |
| 容量 | GB、TB（10 進） | 2 進の GiB・TiB は出典がそうなっているときだけ |
| 演算性能 | FLOPS（TFLOPS、PFLOPS） | 必ず出典どおりの精度（FP8 など）と条件（疎行列の扱いなど）を添える。製品の間で比べない |
| 時間 | 本文は「秒」「分」「時間」「日」「年」 | 表の見出しでは s、min、h 可 |
| 金額 | 「◯億円」「◯億米ドル」「◯億ユーロ」 | 為替換算はしない（出典の通貨のまま） |
| 大きな数 | 「万」「億」「兆」 | 3 桁区切りのカンマは表だけ |
| 年 | 西暦。「2025 年」「2025 年度」「2025 年 1〜3 月期」を区別 | 暦年か年度かは出典どおり |

**換算・合計・比率を自分で計算した値は書かない**（`spec.md` §8.2-9）。演習の計算は架空値でだけ行い、「架空」と明記する。

### 5.2 出典と時点の書式

- 本文：**（出典：発行者『資料名』、公表 YYYY 年 M 月、数値は YYYY 年〔暦年／年度／四半期／調査年〕）**
- 製品の仕様値：**（出典：企業名『製品ページ／データシート名』、版または確認 YYYY 年 M 月）**
- 規格：**（出典：発行団体『規格名』、版）**。規格本文を読んでいないときは、参照資料の表にそう書く。
- データ（`CN.add` の文字列）：同じ書式を括弧で末尾に付ける。表（`table`）では「出典」「時点」の列を設ける。
- 参照資料の表（章末の `refs`）：種類／資料名（個別ページへのリンク）／発行者／時点／この章での使い方。本文で使った資料は必ず載せる。
- 「約」「およそ」は、出典の値を丸めたときだけ。予測・見通しは「予測」「見通し」と明記し、予測した主体とシナリオ名を書く。
- **書かないもの**：出典のない数字、時点が不明な数字、複数の出典から計算した独自の数字、有料レポートの非公開部分、報道だけが根拠の発表・企業・制度の事実。
- 確認日は本文ではなく、事実確認表（`spec.md` §8.1）に残す。

## 6. 主体の呼び方

### 6.1 シーケンス（`seq`）の登場者・本文での呼び方

| 呼び方 | 説明 | `kind` |
|---|---|---|
| 顧客 | 機器・施設を買う・借りる側。部門を分けるときは「顧客の IT 部門」「顧客の施設部門」「顧客の購買」 | `ext` |
| 利用者 | 計算資源を使う人（ジョブを投入する人）、またはコロケーションのテナント | `ext` |
| 運用者 | サーバー・クラスタの運用担当 | `pol` |
| 施設管理者 | データセンターの設備の運用担当 | `pol` |
| DC 事業者 | データセンターを運営する事業者 | `ext` |
| ODM／OEM | 設計・製造を受託するメーカー／自社ブランドで売るメーカー（第26章で定義） | `ext` |
| インテグレータ | 機器を組み合わせ、構築・試験して納める事業者 | `ext` |
| 保守業者 | 機器の保守・部品交換を行う事業者。メーカー自身のときは「メーカー（保守）」 | `ext` |
| 設備業者 | 電気・空調・液冷の設備を設計・施工する事業者 | `ext` |
| 一般送配電事業者 | 系統接続・託送の主体（§2.3） | `ext` |
| フォワーダー | 輸送の手配を一括で引き受ける事業者 | `ext` |
| 所管当局 | 国名・機関名を付ける（「経済産業省」「米国商務省 BIS」「欧州委員会」） | `ext` |
| 機器・ソフトウェアの登場者 | BMC、UEFI、スケジューラ、監視システム、BMS、DCIM、CDU など（本文と同じ名前） | 機器は §6.2 の種別（`spec.md` §6.2） |

### 6.2 企業名

1. **日本に本社がある企業は、その企業の日本語の表記**（法人格は省く）。**それ以外は英語の表記**（日本法人のカタカナ表記は使わない）。一覧は `spec.md` §8.7。表記は各社の公式サイトで確かめてから使う。
2. 章ごとの初出で本社の国・地域を括弧で 1 回だけ添える（「Vertiv（米国）」の形）。国は公式サイトの会社概要か IR で確かめ、事実確認表の `企業` 区分に残す。発表の発信地・工場・日本法人の所在地と混同しない。
3. 持株会社と事業会社が違う場合は、出典に出てくる主体の名前を使う。社名変更があった企業は、出典の時点の社名で書き、必要なら「（現◯◯）」と添える。
4. 株式の銘柄コード・ティッカーは書かない。
5. 英語の資料名・リンクの文字は原題のまま（社名の表記の規則は本文にだけ掛かる）。
6. 演習・ケースの会社は「ODM の A 社」「DC 事業者 B 社」「顧客 C 社」のように、アルファベットで架空にする（A〜H。同じ章の中で役割を変えない）。

## 7. 用語集（`CN.glossary`）の書き方

```js
CN.glossary([
  { t: '基板管理コントローラ', en: 'Baseboard Management Controller', alias: 'BMC', d: '説明（1〜2 文）', ch: [19] }
]);
```

- `t`：見出し語。略語を主にする語（§3.1-2）は略語（`t: 'PUE'`、`en: 'Power Usage Effectiveness'`、`alias: '電力使用効率'`）。
- `en`：英語の正式名。`alias`：略語・別表記・企業ごとの呼称（検索用）。
- `d`：1〜2 文。**数字を入れない**（数字は本文の持ち主の章で出典つきで書く）。
- `ch`：持ち主の章を先頭に。他の章で詳しく扱う場合は後ろに足してよい（持ち主の章の担当が足す）。
- **登録するのは §8 の持ち主の章だけ**。割り当てにない語を足したいときは §9 の手順で。
- 用語集の合計は 150 語以上。各章は §8 の候補のうち本文で実際に説明した語を登録し、最低 4 語（付録の第32章は団体名を登録する）。

## 8. 用語の割り当て（章をまたいで重複させない）

各語を登録できるのは、ここに書いた章だけです。表の語は「見出し語（英語／略語）」。`→` は `alias` に入れる語（別に見出し語として登録しない）。

| 章 | 登録する語 |
|---|---|
| 01 | サーバー（server）／データセンター（data center）／プログラム内蔵方式（stored-program architecture）→ノイマン型／ワークロード（workload）／オンプレミス（on-premises）／HPC（High Performance Computing） |
| 02 | CPU（Central Processing Unit）→プロセッサ／コア（core）→スレッド／命令セット（Instruction Set Architecture, ISA）→x86・Arm／キャッシュ（cache）→メモリ階層／メインメモリ（main memory）→DRAM／SSD（Solid State Drive）→HDD／NIC（Network Interface Card）／帯域幅（bandwidth）／遅延（latency）／IOPS（Input/Output Operations Per Second） |
| 03 | ラックマウント型サーバー（rack-mount server）→タワー型／19 インチラック（19-inch rack）→EIA-310／U（rack unit）→ラックユニット／ブレードサーバー（blade server）→シャーシ／マルチノード型サーバー（multi-node server）／OCP（Open Compute Project）／Open Rack→OU／ラック正面図（rack elevation）→エレベーション |
| 04 | 仮想化（virtualization）／ハイパーバイザ（hypervisor）→KVM（Linux のハイパーバイザ）／仮想マシン（Virtual Machine, VM）／コンテナ（container）→コンテナイメージ・OCI／Kubernetes／ベアメタル（bare metal）／IaaS（Infrastructure as a Service）→PaaS・SaaS／マルチテナント（multi-tenancy） |
| 05 | RAS（Reliability, Availability, Serviceability）／可用性（availability）→ナイン／MTBF（Mean Time Between Failures）／MTTR（Mean Time To Repair）／冗長化（redundancy）→N+1・2N／単一障害点（Single Point of Failure, SPOF）／障害ドメイン（failure domain）／ECC（Error-Correcting Code）／ホットスワップ（hot swap）／SLA（Service Level Agreement） |
| 06 | マザーボード（motherboard）／ソケット（socket）→2 ソケット／電源ユニット（Power Supply Unit, PSU）／ライザーカード（riser card）／ドライブベイ（drive bay）／エアシュラウド（air shroud）／TDP（Thermal Design Power）／FRU（Field Replaceable Unit） |
| 07 | DIMM（Dual In-line Memory Module）→RDIMM・LRDIMM・MRDIMM／メモリチャネル（memory channel）／NUMA（Non-Uniform Memory Access）／PCIe（PCI Express）→レーン・ルートコンプレックス／リタイマ（retimer）／PCIe スイッチ（PCIe switch）／CXL（Compute Express Link）→Type 1・Type 2・Type 3／メモリプーリング（memory pooling） |
| 08 | アクセラレータ（accelerator）／GPU（Graphics Processing Unit）／HBM（High Bandwidth Memory）／学習・推論（training / inference）／OAM（OCP Accelerator Module）→UBB／GPU 間接続（GPU interconnect）→NVLink（NVIDIA の呼称）／UALink（Ultra Accelerator Link） |
| 09 | NVMe（Non-Volatile Memory Express）→SAS・SATA／EDSFF（Enterprise and Datacenter Standard Form Factor）→E1.S・E3.S・U.2／RAID（Redundant Array of Independent Disks）／イレイジャーコーディング（erasure coding）／オブジェクトストレージ（object storage）→ブロック・ファイル／NAS・SAN（Network Attached Storage / Storage Area Network）／NVMe-oF（NVMe over Fabrics）／並列ファイルシステム（parallel file system）→分散ストレージ |
| 10 | イーサネット（Ethernet）→IEEE 802.3・GbE／InfiniBand／RDMA（Remote Direct Memory Access）／RoCE（RDMA over Converged Ethernet）／ToR スイッチ（Top of Rack switch）／リーフ・スパイン（leaf-spine）→ファットツリー／光トランシーバ（optical transceiver）→QSFP・OSFP・MSA／DAC・AOC（Direct Attach Copper / Active Optical Cable）／DPU（Data Processing Unit）→SmartNIC／CPO（Co-Packaged Optics）→LPO |
| 11 | ラック電力密度（rack power density）／ラックスケールシステム（rack-scale system）／スケールアップ・スケールアウト（scale-up / scale-out）／ファブリック（fabric）／集団通信（collective communication）→all-reduce／ポッド（pod）→スケーラブルユニット |

（第11章の割り当ての整理、2026-11-14）：本文で説明している「ファブリック」を割り当てに加えた。「バックエンドネットワーク」「参照アーキテクチャ」は、本文で扱わない（参照アーキテクチャは個別ページを確認できず書いていない。ネットワークを分ける考え方は「計算・ストレージ・フロントエンド・管理」の 4 つで書いた）ので、登録しない。割り当ての表にない語は、本文で説明するものだけを、§9 の手順で表に加えてから登録する。
| 12 | 特別高圧（extra-high voltage）→高圧・低圧／受変電設備（power receiving and transforming equipment）→遮断器・配電盤／変圧器（transformer）／電気室（electrical room）／2 回線受電（dual-circuit power receiving）／責任分界点（point of demarcation）→財産分界点／力率（power factor）→kVA／電気主任技術者（chief electrical engineer） |
| 13 | UPS（Uninterruptible Power Supply）→無停電電源装置／常時インバータ給電方式（double conversion）→ラインインタラクティブ・常時商用給電／瞬時電圧低下（voltage sag）→瞬低／蓄電池（storage battery）→鉛蓄電池・リチウムイオン電池／非常用発電機（emergency generator）／ATS（Automatic Transfer Switch）→STS／BBU（Battery Backup Unit）／バイパス給電（bypass operation） |
| 14 | 三相交流（three-phase AC）→相のバランス／バスウェイ（busway）→RPP／ラック PDU（rack Power Distribution Unit）／80 PLUS→変換効率／48 V 給電（48 V power distribution）→バスバー／HVDC（High-Voltage Direct Current）→高電圧直流給電／アーク（electric arc） |
| 15 | 熱負荷（heat load）→発熱量／顕熱（sensible heat）→潜熱／ホットアイル・コールドアイル（hot aisle / cold aisle）／アイルコンテインメント（aisle containment）→封じ込め／CRAH・CRAC（Computer Room Air Handler / Computer Room Air Conditioner）→列間空調／ASHRAE の温湿度クラス（ASHRAE thermal guidelines）→推奨範囲・許容範囲／露点（dew point）／ブランキングパネル（blanking panel）→再循環・バイパス気流 |
| 16 | 液冷（liquid cooling）→直接液冷・DLC／コールドプレート（cold plate）／TIM（Thermal Interface Material）／CDU（Coolant Distribution Unit）→一次側・二次側／液浸冷却（immersion cooling）→単相・二相／リアドア熱交換器（Rear Door Heat Exchanger）／漏れ検知（leak detection）→リーク検知／マニホールド（manifold）→クイックコネクタ |
| 17 | チラー（chiller）／冷却塔（cooling tower）→補給水・ブロー／乾式冷却器（dry cooler）／外気冷房（free cooling）→エコノマイザ／PUE（Power Usage Effectiveness）→ISO/IEC 30134／WUE（Water Usage Effectiveness）／CUE（Carbon Usage Effectiveness）／ERF（Energy Reuse Factor）→排熱利用 |
| 18 | ホワイトスペース（white space）→グレースペース／上げ床（raised floor）→直床・フリーアクセスフロア／床荷重（floor load）→点荷重・分布荷重／免震（seismic isolation）→耐震・制震／ガス系消火設備（gaseous fire suppression system）／Tier（Uptime Institute Tier）／TIA-942／ファシリティスタンダード（JDCC Facility Standard） |
| 19 | 基板管理コントローラ（Baseboard Management Controller, BMC）／帯域外管理（out-of-band management）→管理ネットワーク／IPMI（Intelligent Platform Management Interface）／Redfish／DMTF／SEL（System Event Log）／リモートコンソール（remote console）→仮想 KVM／OpenBMC |
| 20 | ファームウェア（firmware）／UEFI（Unified Extensible Firmware Interface）→BIOS／POST（Power-On Self-Test）／PXE（Preboot Execution Environment）→HTTP ブート・ネットワークブート／ブートローダ（bootloader）／ロールバック（rollback）→二重化領域／ACPI（Advanced Configuration and Power Interface） |
| 21 | プロビジョニング（provisioning）／構成管理（configuration management）→宣言的・手続き的／冪等性（idempotency）／IaC（Infrastructure as Code）／CMDB（Configuration Management Database）→資産管理／ゴールデンイメージ（golden image）／構成のずれ（configuration drift）／変更管理（change management） |
| 22 | ジョブスケジューラ（job scheduler）→Slurm／パーティション（partition）→キュー／フェアシェア（fair share）／バックフィル（backfill）／オーケストレーション（orchestration）／GPU の分割（GPU partitioning）→MIG（NVIDIA の呼称）／トポロジを考えた配置（topology-aware scheduling）／チェックポイント（checkpoint） |
| 23 | メトリクス（metrics）→ログ・トレース／アラート（alert）→しきい値／インシデント（incident）／RMA（Return Merchandise Authorization）／切り分け（troubleshooting）／ポストモーテム（postmortem）→振り返り・根本原因分析／OpenTelemetry |
| 24 | BMS（Building Management System）→中央監視／EPMS（Electrical Power Monitoring System）／DCIM（Data Center Infrastructure Management）／BACnet／Modbus／SNMP（Simple Network Management Protocol）／パワーキャッピング（power capping）／DVFS（Dynamic Voltage and Frequency Scaling）／デマンドレスポンス（demand response） |
| 25 | RoT（Root of Trust）→信頼の起点／TPM（Trusted Platform Module）／セキュアブート（secure boot）／計測ブート（measured boot）／アテステーション（attestation）／SBOM（Software Bill of Materials）／ファームウェアの回復力（platform firmware resiliency）→NIST SP 800-193／TEE（Trusted Execution Environment）→機密計算 |
| 26 | OEM（Original Equipment Manufacturer）／ODM（Original Design Manufacturer）／ハイパースケーラ（hyperscaler）／クラウド事業者（cloud service provider）／コロケーション（colocation）→リテール・ホールセール／インテグレータ（system integrator）／ラック統合（rack integration）／リードタイム（lead time） |
| 27 | 系統接続（grid connection）→接続検討／一般送配電事業者（general transmission and distribution utility）／電力需要の見通し（electricity demand outlook）／PPA（Power Purchase Agreement）／非化石証書（non-fossil certificate）／水ストレス（water stress） |
| 28 | ラック単位の出荷（rack-level shipment）／搬入計画（delivery plan）／ケーブリング（cabling）／コミッショニング（commissioning）→試運転／統合試験（Integrated Systems Test, IST）／バーンイン（burn-in）／受入試験（acceptance test）／未完了項目リスト（punch list）→パンチリスト |
| 29 | TCO（Total Cost of Ownership）／CapEx・OpEx（capital expenditure / operating expenditure）／減価償却（depreciation）→法定耐用年数／リース（lease）／RFP（Request for Proposal）→RFI・RFQ／保守契約（maintenance contract）／感度分析（sensitivity analysis） |
| 30 | エネルギー効率指令（Energy Efficiency Directive, EED）／省エネ法（法律の正式名は執筆時に確認）→ベンチマーク制度／安全保障輸出管理（security export control）／EAR（Export Administration Regulations）→ECCN／外為法（Foreign Exchange and Foreign Trade Act）→外国為替及び外国貿易法／経済安全保障推進法（法律の正式名は執筆時に確認）→基幹インフラ／データ保護法制（data protection law）→越境移転 |
| 31 | 引合い（inquiry）／仕様書（specification）／取り合い（scope interface）→責任範囲／マイルストーン（milestone）／変更要求（change request）／議事録（minutes） |
| 32 | ASHRAE／The Green Grid／Uptime Institute／PCI-SIG／CXL Consortium／JEDEC／SNIA（Storage Networking Industry Association）／NVM Express（団体。en は団体の正式名）／IEEE／IBTA（InfiniBand Trade Association）／UEC（Ultra Ethernet Consortium）／UALink Consortium／TCG（Trusted Computing Group）／UEFI Forum／CNCF（Cloud Native Computing Foundation）／日本データセンター協会（Japan Data Center Council, JDCC）／IEA（International Energy Agency）／NIST（National Institute of Standards and Technology）／BIS（米国商務省 産業安全保障局） |

**持ち主の章の注意**

- 「OCP」は第03章（団体の説明を含む）。第32章の団体の地図では触れるだけで登録しない。「DMTF」は第19章。
- 「HBM」は第08章（サーバーから見た役割だけ。チップの中身は半導体講義へリンク）。
- 「UALink」（仕様）は第08章、「UALink Consortium」（団体）は第32章。「NVMe」は第09章、「NVM Express」（団体）は第32章。`t` と `en` が重ならないようにする。
- 「冗長化」「N+1」「2N」は第05章。第12〜14・18章は登録しない。
- 「ラック PDU」は第14章。第03・06・11章は本文で触れるだけ。
- 「リアドア熱交換器」は第16章。第15章は触れるだけ。
- 「上げ床」は第18章。第15章（気流）は触れるだけ。
- 「PUE」など効率の指標は第17章。第01・27・30章は登録しない。
- 「Tier」は第18章。第05章は登録しない。
- 「パワーキャッピング」は第24章。第22章（スケジューラ）は触れるだけ。
- 「バーンイン」は第28章。第23章は登録しない。
- 「変更管理」は第21章、「変更要求」は第31章。
- 「インテグレータ」は第26章。第28・31章は登録しない。
- 半導体講義の用語集とは別の講座なので、同じ語（例：HBM、CPO）を両講座に登録してよい。ただし説明は食い違わないように、半導体講義の該当章の説明を読んでから書く。

## 9. 迷ったとき

1. この文書に表記・割り当てがない語は、**使う前に**土台担当（A）へ追記を依頼する（A がまとめて追記。並行作業中に各担当がこの文書を直接書き換えない）。
2. 判断の順：法令・規格・公的資料の表記 → 依頼の表記（§1-6）→ 発行団体・業界団体の日本語資料での表記 → この文書の §2 の表。
3. 同じ語を複数の章が持ち主にしたいときは、本文で最も詳しく説明する章を持ち主にする。
4. 表記を変えた場合は、既に書かれた章の該当箇所を、その章の担当が直す（他人の章を直さない）。
