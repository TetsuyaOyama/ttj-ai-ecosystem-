# 第2部（第06〜15章）技術検証の記録

- 検証日：2026-11-14
- 対象：`chapters/06〜15-*.html`、`data/06〜15-*.js`（他の章と course.json は変更なし）
- 修正前の控え：`/tmp/review-p2/chapters`、`/tmp/review-p2/data`
- 修正後の検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/semi --check` → `OK … 0 warnings`

## 件数

| 区分 | 件数 | 直した | 残した |
|---|---|---|---|
| 重大 | 2 | 2 | 0 |
| 中 | 11 | 9 | 2 |
| 軽微 | 25 | 21 | 4 |
| 合計 | 38 | 32 | 6 |

酸化と成膜の違い、CVD・ALD・PVD の段差被覆、解像度の式と液浸・EUV・High-NA、ポジ・ネガと化学増幅・PEB、異方性・選択比・終点検出、注入のエネルギーとドーズ・活性化と拡散、デュアルダマシンの順序、ディッシングとエロージョン、RCA 洗浄、SPC と APC、後工程の流れ、MSL の等級、TSV とハイブリッドボンディングに、本質的な誤りはありませんでした。図の手順と材料の対応、クイズと総合テストの正答・解説は、下の M1 を除いて正しく、誤答も「もっともらしい誤解」になっています。ただし、第15章に、出典つきの事実の誤りが 2 件ありました（C1・C2）。

## 指摘の一覧

### 重大

| # | 章 | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|---|
| C1 | 15 | ハイブリッドボンディングの節、参照資料、データ先頭 | Kinex の発表を「Applied Materials と Besi が 2026 年 10 月に発表（両社の発表、2026 年 10 月 1 日）」と書いていた。Applied Materials の原文では **2025 年 10 月 7 日**の発表で、Besi と共同開発した装置。日付と発表の主体が違い、出典の記載も実在しない | 直した（年月・主体・出典を原文に合わせ、参照資料のリンクを IR の個別ページに差し替え） |
| C2 | 15 | ガラス基板の節、確認問題 5 の解説 | 「Lens（韓国）」と書いていた。Intel の発表の発信地は長沙（中国）で、相手は Lens Technology | 直した（「Lens Technology（中国）」。参照資料を Intel の個別ページに差し替え） |

### 中

| # | 章 | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|---|
| M1 | 09 | 確認問題 1（ポジ型で残る部分） | 誤答「フォトマスクの影になった部分だけ」は、光が当たらない部分なので、ポジ型では**これも正解**になる。正答が 2 つある | 直した（誤答を「フォトマスクの透明な部分の真下」にし、解説に理由を追加） |
| M2 | 09 | `c09-mask` の ArF 用 | 光の順が「露光光 → ペリクル → パターン膜 → 石英基板 → 投影光学系」になっていた。透過型では、光は基板の側から入り、パターン膜を通ってから、パターン面を覆うペリクルを通る | 直した（基板 → パターン膜 → ペリクルの順に並べ替え、説明を補った） |
| M3 | 08 | つまずきやすい点 | 「どの光源でも、ステッパーとスキャナーのどちらもあり得ます」は言い過ぎ。ArF 液浸と EUV の装置はスキャナーだけ | 直した（「i 線や KrF では両方の方式がある。ArF 液浸と EUV はスキャナー」） |
| M4 | 08 | 解像度の式の節 | 「ASML と imec は、k1 の物理的な限界を 0.25」としていたが、確認記録の出典は ASML だけ | 直した（「ASML は」に） |
| M5 | 08 | High-NA の節 | 「NA を高めた分、露光できる領域は半分」は因果が粗い。露光領域が半分になるのは、縦横で倍率の違う光学系を使うため（同じ段落の imec の説明） | 直した（「その代わり、…」にして、理由は imec の説明に任せた） |
| M6 | 08 | 本文・用語集の「開口数」 | 「光学系が集められる光の**量**」は誤解を招く。NA は光を取り込める**角度の広さ**の指標 | 直した |
| M7 | 15 | HBM の節 | HBM4 を「報じられています（New Electronics、All About Circuits）。JEDEC の原典は未確認」としていた。JEDEC のプレスリリース（Business Wire 配信、2025-04-16）で、JESD270-4 の公開の発表を確認できた | 直した（一次資料に差し替え。HBM3 の出典も JEDEC のリリース〔Business Wire 配信〕に） |
| M8 | 14・15 | 参照資料 | リンクの多くが公式サイトのトップ（formfactor.com、teradyne.com、hamamatsu.com、ipc.org、jedec.org、intel.com、appliedmaterials.com など） | 一部直した（9 件を個別ページに差し替え。残りは資料名に「リンクは上位ページ」と注記。R3） |
| M9 | 08・09・11〜14 | 社名の表記 | Nikon、Canon、Lasertec、Hitachi High-Tech、Advantest、Tokyo Electron、DISCO、ACCRETECH、EBARA、Kokusai Electric と英語で書いていた。GLOSSARY §6.2-1（日本語で名乗る表記を使う）と、第09・19章の「東京エレクトロン」「ディスコ」「アドバンテスト」と食い違う | 直した（ニコン、キヤノン、レーザーテック、日立ハイテク、アドバンテスト、東京エレクトロン、ディスコ、東京精密、荏原製作所、KOKUSAI ELECTRIC。英語の資料名・リンクの文字は原題のまま） |
| M10 | 12 | `c12-hier` のトランジスタの説明 | 「ここから上が BEOL」と書き、第06章の「コンタクトは FEOL と BEOL の間のつなぎ」と食い違っていた | 直した（第06章の説明に合わせた） |
| M11 | 11〜15 | 確認問題 | 各章 5〜6 問（CHAPTER-BRIEF は 3 問）。第11〜15章は確認問題の正答の添字がすべて 0（spec §7.2-6 は「同じ添字を 2 回まで」） | 残した（R1） |

### 軽微（直したもの）

| # | 章 | 箇所 | 内容 |
|---|---|---|---|
| S1 | 07 | 方式の早見表の前 | 「5 つの方式」と表の 6 行の食い違いに、CVD を 2 行に分けた旨を補った |
| S2 | 07 | 熱酸化の行 | 用途「素子分離」は、LOCOS の時代の説明で古い。STI の溝の埋め込みは CVD なので「素子分離の溝の下地（ライナー）」に |
| S3 | 07 | 最近の動向 | Applied Materials の発表は「2 nm 以降の GAA で採用されている」という主張。「対象としている」を原文どおりに |
| S4 | 07 | 最近の動向 | STI の章内初出に英語の正式名を追加 |
| S5 | 08 | High-NA の節・光源の表 | ASML の原文は「delivered」。「出荷」を「納入（delivered）」に（GLOSSARY §4-9） |
| S6 | 08 | 露光装置のメーカー | キヤノンの製品を「公開しています」→「製品として紹介しています」 |
| S7 | 08・15 | 用語集 | `d` に数値（0.25、193 nm、13.5 nm、0.33→0.55、HBM3 の年月）が入っていた。GLOSSARY §7 に従い数値を除いた（数値は本文に残る） |
| S8 | 09 | EUV マスクの図・本文 | 波長 13.5 nm を書いていた。波長の数値は第08章だけが書く（GLOSSARY §4-7）。「露光と同じ波長の EUV の光（第08章）」に |
| S9 | 09 | コータ・デベロッパの出典 | 東京エレクトロンの 2012 年の発表が転載（Patexia）であることを本文に明記 |
| S10 | 10 | ALE の見出し | 「1 サイクルに 1 層だけ削る」は言い過ぎ（本文・用語集は「少しだけ」）。「ごく薄く削る」に |
| S11 | 10 | 高アスペクト比の節 | Lam Cryo 3.0 の出典が Nasdaq 掲載の配信であることを本文に明記 |
| S12 | 11 | 注入装置の区分の表 | Axcelis の資料のエネルギーは SiC 向けの型の値。その旨を補った |
| S13 | 12 | Low-k の節・材料の表 | κ と k の混用を k に統一 |
| S14 | 12 | 材料の表 | MOL・M1 の説明がなかったので補った。「高容量量産」→「量産」 |
| S15 | 13 | 演習のケース 3 | 繰り返し欠陥は「全ダイ」ではなく「全ショット」の同じ位置。「前の世代のマスク」は GLOSSARY §2.3 の「世代」と衝突するので「前の版のフォトマスク」に |
| S16 | 06・12〜15 | 章内初出 | FOUP（06）、IRDS（12・13）、SEM（13）、MSL（14）、HBM・TSV・UCIe・RDL（15）に英語の正式名を追加（GLOSSARY §3） |
| S17 | 14 | MSL の節 | J-STD-020 の版の出典を、取得できた販売ページ（DIN Media、版 F、2022-12-01、現行版）に。J-STD-033D は IPC の販売ページ（2018-04-04、現行版）に差し替え |
| S18 | 15 | 早見表・本文 | Intel の公式ページは Foveros の一部の型（Foveros-S・R）を 2.5D、Foveros Direct を 3D に分類している。3D の行を Foveros Direct にし、注記を追加 |
| S19 | 15 | `c15-tsv` の 6 手目 | 薄化のあとも TSV の銅が裏面に届いていなかった（図形が 2 単位短い）。「TSV の先を出す」と合うように直した |
| S20 | 07・12〜15 | カタカナ語 | GLOSSARY §2.1（語末の長音）に合わせて、プローバー、ダイボンダー、ワイヤボンダー、フリップチップボンダー、ハイブリッドボンダー、グラインダー、ポリッシャー、ディスペンサー、コンディショナー、スペーサー、ランナーに。「インターフェース」→「インタフェース」。インターポーザとチャンバは §8 の見出し語なのでそのまま |
| S21 | 11〜15 | 本文の章番号 | リンクのない「第NN章」を章リンクにした（33 か所） |

### 残したもの

| # | 区分 | 章 | 内容 | 理由・推奨 |
|---|---|---|---|---|
| R1 | 中 | 06〜15 | 確認問題が各章 5〜6 問。第11〜15章は正答の添字がすべて 0 | 表示時にシャッフルされるので読者への影響はない。第1部の R1 と同じく、土台担当が方針を決める |
| R2 | 中 | 14・15 | 上位ページのまま注記したリンク：FormFactor、DISCO、ACCRETECH、TOWA、Besi、Monolithic Power Systems、Samsung、IEEE EPS、IRDS（Packaging）、TSMC 3DFabric、製品一覧（アドバンテスト・東京エレクトロン・KOKUSAI ELECTRIC） | 個別ページの URL を一次資料で確かめられなかった。担当が個別ページに差し替えるのが望ましい。FormFactor の「2025 年」の技術ブログは記事自体を確認できていない |
| R3 | 軽微 | 14 | MSL の早見表の「ドライパックの扱い」で、MSL 1 を「不要」、MSL 6 を「同上（必要）」としている | J-STD-033 の表 3-1 では、MSL 1 と 6 は「任意（optional）」の扱いだったはず（記憶による。規格本文は有料で未確認、TI の資料は取得できず）。規格本文か TI の資料で確かめてほしい |
| R4 | 軽微 | 09 | 三井化学の 2021 年の EUV ペリクルの商業生産開始は、MarketScreener の転載だけが根拠 | 本文に転載と明記済み。同社のニュースリリースの原文に差し替えを推奨 |
| R5 | 軽微 | 09 | コータ・デベロッパの例が 2012 年の製品発表（転載） | 古い。東京エレクトロンの現行の製品ページに差し替えを推奨 |
| R6 | 軽微 | 15 | Samsung の「FOPKG」は確認できた範囲の記載（同社ページの一部が取得できず）。パネルレベルを「検討されています」と書いているが、量産品もある | FOPKG は Samsung の現行ページで確かめる。パネルレベルの状況は出典を付けて書き直すか、「検討・導入が進んでいる」程度に |

## Web で再確認した項目（20 件）

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | SIA 2021-02-26：工程数は最大 1,400、サイクルタイムは平均約 12 週、先端は 14〜20 週 | 一致 | https://www.semiconductors.org/chipmakers-are-ramping-up-production-to-address-semiconductor-shortage-heres-why-that-takes-time/ |
| 2 | ASML：液浸は 2003 年、最高 NA 1.35、水なしで NA 1 超は不可能、EUV の鏡は 100 層以上 | 一致 | https://www.asml.com/technology/lithography-principles/lenses-and-mirrors |
| 3 | ASML：EUV 13.5 nm、NXE は NA 0.33・解像度 13 nm、EXE は NA 0.55・8 nm、最初の High-NA は 2023 年 12 月 | 一致（原文は「delivered」。S5） | https://www.asml.com/products/euv-lithography-systems |
| 4 | ASML：スズ液滴は約 25 μm、プリパルスで平らにして本パルス、毎秒 5 万回。KrF は 80 nm、ArF は 38 nm。i 線 365、KrF 248、ArF 193 nm | 一致 | https://www.asml.com/technology/lithography-principles/light-and-lasers |
| 5 | ASML の Q4・FY2025 の説明：Intel が最初の EXE:5200B の受入れを報告、量産に使う最初の装置 | 一致（文書に日付の記載はない） | https://ourbrand.asml.com/m/2c5d94d7b9619350/original/ASML-Results-Video-Transcript-Q4-and-FY-2025.pdf |
| 6 | imec 2026-02-26：0.33 NA では 3〜4 枚のマスク、0.55 NA なら 1 回の露光。金属酸化物レジスト | 一致（図の説明文では「4 枚」） | https://imec-int.com/en/articles/case-high-na-euv-unlocking-next-era-chip-manufacturing |
| 7 | Applied Materials 2026-04-08：STI 向けの選択的な窒化膜の PECVD、GAA のゲート金属の ALD、2 nm 以降 | 一致（「採用されている」の主張。S3） | https://www.appliedmaterials.com/us/en/newsroom/press-releases/040826-applied-materials-introduces-deposition-systems-angstrom-era.html |
| 8 | 三井化学 2024-05-28：CNT ペリクル、年産 5,000 枚、岩国大竹工場、2025 年 12 月の完成予定、透過率 92% 以上、1 kW 超 | 一致 | https://jp.mitsuichemicals.com/en/release/2024/2024_0528_1/index.htm |
| 9 | 三井化学 2026-04-23：NEDO 助成、透過率 95% 以上、1000 W で 10,000 枚以上 | 一致 | https://jp.mitsuichemicals.com/en/release/2026/2026_0423_2/index.htm |
| 10 | Lam Research 2024-07-31：Lam Cryo 3.0、深さ最大 10 μm | 一致（Nasdaq 掲載の配信で確認。Lam の Newsroom は取得できず） | https://www.nasdaq.com/press-release/lam-research-introduces-lam-cryotm-30-cryogenic-etch-technology-accelerate-scaling-3d |
| 11 | IBM：1997 年に銅の量産を発表、1998 年に出荷、抵抗は約 40% 低い、デュアルダマシン | 一致 | https://www.ibm.com/history/copper-interconnects |
| 12 | Intel 4：18 層の配線（Enhanced Cu 5 層＋Cu 13 層） | 一致 | https://cdrdv2-public.intel.com/788849/Intel%204.pdf |
| 13 | IRDS 2024 Yield Enhancement：致命的な粒子は最も厳しい寸法の半分、3.0 nm まで、計測で検出できない、縁と裏面が歩留まりに影響 | 一致 | https://irds.ieee.org/images/files/pdf/2024/2024IRDS_YE.pdf |
| 14 | J-STD-033 の現行版は改訂 D（2018-04-04） | 一致 | https://shop.electronics.org/ipcjedec-j-std-033/ipcjedec-j-std-033-standard-only |
| 15 | J-STD-020 の現行版は版 F（2022-12-01） | 一致（JEDEC のページは取得できず、販売ページで確認） | https://www.dinmedia.de/en/standard/ipc-jedec-j-std-020f/366816203 |
| 16 | JEDEC：HBM4（JESD270-4）の公開の発表（2025-04-16） | 一致（M7 で一次資料に差し替え） | https://businesswire.com/news/home/20250416843598/en/JEDEC-and-Industry-Leaders-Collaborate-to-Release-JESD270-4-HBM4-Standard-Advancing-Bandwidth-Efficiency-and-Capacity-for-AI-and-HPC |
| 17 | Kinex の発表 | **不一致**：2025-10-07、Applied Materials の発表で Besi と共同開発（C1） | https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-unveils-next-gen-chipmaking-products |
| 18 | Intel と Lens Technology の協業 | **不一致**：発信地は長沙（中国）。日付 2026-07-24 とガラス基板の内容、量産時期の記載なしは一致（C2） | https://www.intel.com/content/www/us/en/newsroom/news/corporate/intel-and-lens-technology-collaborate-to-enable-advanced-semiconductor-packaging-for-the-ai-era.html |
| 19 | 荏原製作所：CMP で粗さ 10〜20 nm、10 層を超える積層 | 一致 | https://ebara.com/global-en/technology/information/polishing-technology-ex/ |
| 20 | Axcelis：Purion の各エネルギー（SiC 向けの型）、XEmax 15 MeV、SiC は 1500 °C 超のアニール、500 °C 以下の注入とレーザーアニールの組み合わせ | 一致（SiC 向けの値であることを S12 で補足） | https://www.axcelis.com/wp-content/uploads/2024/05/Ion_Implantation_and_Applications_for_Power_Devices.pdf |

リンクの差し替えのために確認したもの：Intel Foundry の先端パッケージのページ（EMIB、Foveros-S・R は 2.5D、Foveros Direct は 3D。S18）、Teradyne の SLT ページ（ウェーハテストとパッケージのテストに続く第 3 のテスト）、浜松ホトニクスのステルスダイシングのページ（ウェーハ内部に集光）、JEDEC の HBM3 のリリース（Business Wire 配信、2022-01-27。検索結果で確認）、Samsung の I-Cube を 2.5D とする同社の発表（検索結果で確認）。

**再確認できず**：Texas Instruments SPRABY1（取得できず。R3）、Lam の Newsroom（取得できず）、JEDEC の自サイト。件数の上限のため開いていないもの：ASML の重ね合わせ（2021-12）、ニコン・キヤノンの沿革と製品、SHMJ の展示資料（g 線・i 線、RCA 洗浄）、Lam の講義資料と ALE の報告（Kanarik ほか）、Applied Materials 2024-07-08（Ru・Co）、Semiconductor Engineering（Ru、2024-06）、IRDS 2024 More Moore・Metrology、KLA の Form 10-K、日立ハイテク、SCREEN、KOKUSAI ELECTRIC、住友重機械工業、Applied Materials VIISta、日新電機、三井化学 2021（転載）、EE Times Japan、HOYA、AGC、レーザーテック、FormFactor、ディスコ、TOWA、Besi、UCIe、TSMC、IEEE EPS。

**報道・転載だけが根拠の項目**：三井化学 2021（MarketScreener の転載。本文に明記済み。R4）、東京エレクトロン 2012（Patexia の転載。S9 で本文に明記）、ペリクルの透過率と耐久性の関係（EE Times Japan の講演の記事。本文に媒体名と日付あり）。HBM4 は一次資料に差し替えたので、報道だけの項目ではなくなった。

## 表現と用語

- 文は短く、です・ます調でそろっている。第11・12章の表の説明と第15章の早見表に 60 字を超える文があるが、意味は通る。
- 優劣の評価や投資の推奨と読める記述はない。装置の表には「会社名は公開資料にある例で、優劣を示すものではありません」と各章で断っている。
- 原文をなぞった長い引用はない。
- 用語集は §8 の割り当てどおりで、章をまたいだ重複はない（ビルド検査も 0 件）。第15章は「ファンアウト」を見出しにして FOWLP を別名にしている。UCIe・RDL・KGD は見出しにしていない（§8 は候補なので規則違反ではない）。
- 章の間の食い違いは M9（社名の表記）、M10（BEOL の境目）、S8（波長の数値の持ち主）で、どれも直した。第1部（FOUP、ダイ、世代の呼び方、High-k メタルゲート、FinFET・GAA）との食い違いはない。

## 公開の判断

小さな修正を入れた現状で、第2部は公開してよい水準です。公開前の注意は 3 点です。(1) 上位ページのまま注記したリンク（R2）を、担当が個別ページに差し替えること。(2) MSL の早見表の MSL 1・6 のドライパックの扱いを、規格本文で確かめること（R3）。(3) 第15章の Kinex と Lens Technology の誤りは、執筆時の確認が年や国を取り違えた例です。第15章の他の企業の記述（Samsung の呼称など）も、公開前にもう一度一次資料で確かめることを勧めます。

## 公開前の追加確認（2026-11-14）

公開前の注意（R2・R3・R6 と第15章の企業の記述）に対応するため、第14・15章の企業・規格の記述を、WebFetch／WebSearch で個別ページに当たって確かめた。確認できた項目は出典を個別ページにし、確認できなかった項目は本文から外すか、断定を避けた。

### 第15章（先端パッケージ）：確認 17 項目、結果

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | HBM3（JESD238）の発表 2022-01-27 | 一致。JEDEC 自サイトに差し替え | https://www.jedec.org/news/pressreleases/jedec-publishes-hbm3-update-high-bandwidth-memory-hbm-standard |
| 2 | HBM4（JESD270-4）の公開 2025-04-16 | 前回確認の Business Wire のまま（JEDEC 自サイトのページは今回取得できず） | https://businesswire.com/news/home/20250416843598/en/JEDEC-and-Industry-Leaders-Collaborate-to-Release-JESD270-4-HBM4-Standard-Advancing-Bandwidth-Efficiency-and-Capacity-for-AI-and-HPC |
| 3 | UCIe の版 | 仕様ページの一覧は 1.0、1.1、2.0、3.0、4.0（日付の記載なし）。本文の「2.0 や 3.0 など」を一覧どおりに直した。仕様は申請制と追記 | https://www.uciexpress.org/specifications |
| 4 | TSMC：3DFabric が SoIC・CoWoS・InFO を含む | 一致 | https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/3DFabric.htm |
| 5 | TSMC：CoWoS は 2.5D | 一致（CoWoS-S・R・L） | https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm |
| 6 | TSMC：SoIC は縦に積む（3D） | 一致（「3D」の語は使わず、縦積み・3D 集積と説明） | https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/SoIC.htm |
| 7 | TSMC：InFO はファンアウト | 一致（Integrated Fan-Out。2.5D・3D の型もある） | https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/InFO.htm |
| 8 | Intel：EMIB・Foveros-S・R は 2.5D、Foveros Direct は 3D | 一致。EMIB と Foveros Direct の資料を参照資料に追加 | https://www.intel.com/content/www/us/en/foundry/packaging.html |
| 9 | Samsung：I-Cube は 2.5D | 一致（2021-05-06 の発表） | https://news.samsungsemiconductor.com/global/samsung-electronics-announces-availability-of-its-next-generation2-5d-integration-solution-i-cube4-for-high-performance-applications/ |
| 10 | Samsung：X-Cube は TSV の 3D IC | 一致（2020-08-12 の発表。日付は URL による） | https://www.businesswire.com/news/home/20200812005784/en/Samsung-Announces-Availability-of-its-Silicon-Proven-3D-IC-Technology-for-High-Performance-Applications |
| 11 | Samsung：「FOPKG」 | **確認できず**。Samsung の公開ページは FoWLP（Fan-out Wafer Level Package）と書く。本文・表の FOPKG を FoWLP に直した（R6 の前半） | https://semiconductor.samsung.com/technologies/processor/mobile-pkg |
| 12 | パネルレベル（FOPLP）の状況 | 「検討されています」を、「成熟した製品では使われ、先端向けは開発が続いている、と報じられている」に直し、出典を付けた（R6 の後半） | https://semiengineering.com/foplp-gains-traction-in-advanced-semiconductor-packaging/ |
| 13 | Applied Materials の Kinex：2025-10-07、Besi と共同、「industry's first integrated die-to-wafer hybrid bonder」 | 一致 | https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-unveils-next-gen-chipmaking-products |
| 14 | IEEE EPS の解説（2025 年 11 月） | 記事を特定（Kuan-Neng Chen 氏、PDF）。3D IC の重要な技術との位置づけは一致。「バンプよりも」の比較は記事に明記がないので外した。記事に日付の記載はなく、2025 年 11 月はファイルの URL による | https://eps.ieee.org/wp-content/uploads/2025/11/TC_Article_M_and_P_-_Hybrid_Bonding_Pioneering_Innovations_and_Pathways_to_Future_Semiconductor_Integration.pdf |
| 15 | IRDS 2024 の位置づけ | 「Packaging」の上位ページを、Executive Packaging Tutorial Part 1 の PDF に差し替え。パッケージの役割の変化、ダイを分ける利点の記述を確認し、冒頭の節に引用を追加 | https://irds.ieee.org/images/files/pdf/2024/2024IRDS_EPT-Part1.pdf |
| 16 | Intel と Lens Technology：2026-07-24、発信地は Santa Clara と長沙、量産時期の記載なし | 一致。ただし原文は「explore（探る）」の段階なので、「開発での協業」を「加速する方法を探る協業」に直した | https://www.intel.com/content/www/us/en/newsroom/news/corporate/intel-and-lens-technology-collaborate-to-enable-advanced-semiconductor-packaging-for-the-ai-era.html |
| 17 | Foveros Direct が銅どうしの直接接合の 3D | 一致（資料の日付は記載なし。2025-11 は URL による） | https://www.intel.com/content/dam/www/central-libraries/us/en/documents/2025-11/foveros-direct-3d-tech-brief.pdf |

### 第14章（後工程）：確認 14 項目、結果

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | FormFactor：ウェーハテストは、ダイシング・パッケージの前に不良のダイを見つける | 一致。記事は 2025-02-14。参照資料の「良品のダイの選別」は、KGD が先端パッケージの文脈でしか出てこないので外した（R2） | https://www.formfactor.com/blog/2025/wafer-test-challenges-and-solutions/ |
| 2 | ディスコ：グラインダーとポリッシャー | 一致（DGP8761 は研削とドライポリッシュの装置）。「薄くする・平らにする」を「削って薄くする」に直した | https://www.disco.co.jp/eg/products/polisher_etcher/dgp8761.html |
| 3 | ディスコ：ポリッシャーは研削のダメージ層を除く | 一致 | https://www.disco.co.jp/eg/solution/library/polisher/strelief.html |
| 4 | ディスコ：レーザーソーはアブレーションとステルスダイシング | 一致（日付は URL による 2025-12-15） | https://disco.co.jp/eg/news/corp/20251215_2.html |
| 5 | 東京精密：プローバー | 一致 | https://www.accretech.com/en/product/semicon/semi/probe_semi/altaprov.html |
| 6 | 東京精密：研削とダメージ除去を一体にした薄化装置 | 一致（研削とウェットポリッシュ） | https://www.accretech.com/en/product/semicon/semi/polish/pg3000rmx.html |
| 7 | アドバンテスト：ハンドラー、システムレベルテスト装置、SoC 向けテスター | 一致。「メモリ」のテスターは個別ページを取得できなかったので、本文から外した | https://www.advantest.com/en/products/component-test-system/ , https://www.advantest.com/en/products/semiconductor-test-system/soc/v93000/ |
| 8 | TOWA：トランスファー式・コンプレッション式、後者はゲート・ランナー不要で樹脂の流れがほとんどない | 一致 | https://www.towajapan.co.jp/en/technology/molding/ |
| 9 | Besi：ダイボンディング装置 | 一部修正。ページの区分は Die Bonding、Soft Solder Die Bonding、Flip Chip など。「エポキシ」の区分はないので、本文を区分の名前に合わせた | https://www.besi.com/products-technology/productgroup/die-attach/ |
| 10 | Besi：封止（モールド）装置 | 一致（Fico ブランド） | https://www.besi.com/products-technology/productgroup/molding/ |
| 11 | 東京エレクトロン：プローバー | 一致（Prexa） | https://www.tel.com/product/prexa.html |
| 12 | 浜松ホトニクス：ステルスダイシングは内部に集光 | 一致（前回確認済みのページを再確認） | https://www.hamamatsu.com/jp/ja/product/type/L9570/index.html |
| 13 | Monolithic Power Systems の技術ノート（2024-04）の MSL の表 | 取得できた（中国向けの配信先の PDF）。フロアライフは本文の表と一致。MSL 1 と 6 のドライパックは「任意」。参照する規格は J-STD-020E（現行の版 F ではない） | https://media.monolithicpower.cn/mps_cms_document/m/o/moisture_sensitivity_technical_note_apr._2024.pdf |
| 14 | TI SPRABY1 | 取得できた。MSL 1 は「ドライパック不要」、MSL 6 は個別の記載なし | https://ti.com/lit/spraby1 |

### MSL の表（R3）

MSL 1 と 6 のドライパックの扱いは、資料で書き方が違う（TI は MSL 1 を「不要」、MPS は MSL 1 と 6 を「任意」）。規格本文は有料で確認できないので、表の列を「ドライパックの扱い（資料による）」にし、MSL 1 と 6 は両方の書き方を併記した。注記に「詳細は規格（J-STD-033）の現行版で確認」を追加した。本文の「弱い部品は防湿袋で出荷」は「等級が大きい部品は」にし、MSL 1 と 6 の扱いが資料で違うことを断った。

### リンクの差し替え（R2）

上位ページのままだったリンク 12 件（第14章：FormFactor、ディスコ、東京精密、アドバンテスト、TOWA、Besi、東京エレクトロン、Monolithic Power Systems の 8 件。第15章：TSMC、Samsung、IEEE EPS、IRDS の 4 件）を、すべて個別ページに差し替えた。上位ページの注記が残るリンクは 0 件。KOKUSAI ELECTRIC は本文・表に出てこないので、リンクの対象ではなかった。

### 再確認できなかったもの

- HBM4 の JEDEC 自サイトのページ（取得失敗。Business Wire で確認済み）。
- Samsung の現行の先端パッケージのページの一部（半導体事業部の一部のページは取得が許可されなかった）。I-Cube・X-Cube の根拠は 2020・2021 年の発表で、現行の製品構成は同社のページで確認が必要と本文に追記した。
- アドバンテストのメモリ向けテスター（本文から外した）。
- 資料の日付が記載されておらず URL の日付を使った項目：ディスコのレーザーソー、Intel の EMIB・Foveros Direct の資料、Samsung X-Cube、IEEE EPS の解説。本文・参照資料に「URL の日付」と明記した。
- R4（三井化学 2021）、R5（東京エレクトロン 2012 の転載）は第9章で、今回の対象外。第11〜15章の R1（正答の添字）も対象外で、そのまま。

### 検査

`build.py --check`：章 28/32、0 warnings（第06〜15章に関するエラー・警告 0）。
