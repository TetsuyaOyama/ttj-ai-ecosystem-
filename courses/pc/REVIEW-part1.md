# 第1部（第01〜09章）技術検証の記録

- 検証日：2026-11-14
- 対象：`chapters/01〜09-*.html`、`data/01〜09-*.js`、`facts/02〜09-*.md`（第01章の事実確認表は data の先頭）。他の章と course.json は変更なし
- 修正前の控え：`/tmp/pc-review-1/orig/chapters`、`/tmp/pc-review-1/orig/data`、`/tmp/pc-review-1/orig/facts`（修正の台本は `/tmp/pc-review-1/fix.py`）
- 修正後の検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/pc --check` → `OK (check only) 章 26/26 公開, データ 133 件 … 0 warnings`（第01〜09章のエラー・警告 0）。`grep '要確認'` 0 件。`node /tmp/pc-selfcheck.js` は第01〜09章すべて `NG 0 件`（確認問題は各章 3 問・4 択、正答の添字は §8.5 の式どおり。総合テストは第08章が 2 問、他は 1 問で §3 どおり）。図の撮影は、変更が色の種別と文言だけのため行っていない

## 件数

| 区分 | 件数 | 直した | 残した |
|---|---|---|---|
| 重大 | 0 | 0 | 0 |
| 中 | 8 | 7 | 1 |
| 軽微 | 23 | 17 | 6 |
| 合計 | 31 | 24 | 7 |

PC の構成と三つの流れ、コアとスレッド・クロック・キャッシュ、電力の指標（Processor Base Power・Maximum Turbo Power・Default TDP・PPT）が消費電力そのものではないこと、ソケット・チップセット・フォームファクタの区別、スロットの形とレーンの数の区別、M.2 と SATA の共有、DDR4・DDR5 の切り欠き・電圧・MT/s、デュアルチャネル、SSD と HDD、M.2 は形で接続は別、TBW と保証、10 進の容量、補助電源と寸法、定格出力と W ＝ V × A、効率・負荷率、80 PLUS と Cybenetics の等級、保護回路、熱の伝わる道、TIM、空冷と一体型液冷、正圧・負圧、PWM と電圧制御、サーマルスロットリング、USB の速度の名前と形、HDMI・DisplayPort・IEEE 802.3・Wi-Fi の対応、技適に、本質的な誤りはありませんでした。計算はすべて確かめました（第01章の 100 × 2 ＝ 200 Wh と学習ルートの時間〔585 分・770 分・285 分〕、第07章の 600・100・66・766 W、400 W・40 W・50%・60%、第09章の 10 ÷ 8 ＝ 1.25）。確認問題 27 問・総合テスト 10 問・演習 9 題の正答は、すべて本文・図と合っていました。

## 指摘の一覧

### 重大

なし。

### 中

| # | 章 | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|---|
| M1 | 02 | `c02-hybrid` の 2 行目と 4 行目 | 2 行目が「P コアは 2 つのスレッドを同時に扱える」と一般化していたが、同じ表の 265K は 20 コア・20 スレッドで食い違う（Intel の解説ページは P コアを hyper-threading 対応と書くが、製品ページは 20/20）。4 行目の注記「8 個の P コアが各 2 スレッドなら 16 になるはず」は計算が誤り（8 × 2 ＋ 12 ＝ 28）で、「P コアが 1 スレッドを扱う構成と読める」は一次資料のない推論 | 直した（2 行目を「Intel のページは…と説明する」と帰属を明記し、スレッドの数は製品ごとに仕様ページで確かめる注記に。4 行目の推論の注記を削除。事実確認表 #10 に経緯） |
| M2 | 06・07 | 第06章の補助電源の節、第07章のコネクタの節、`c07-conn` の 12V-2x6 の行と詳細 | 第06章は「12VHPWR（…の略。旧名）に代わる」、第07章は「旧称 12VHPWR を改称」と書き、章の間で説明がずれていた。Intel の設計ガイドの PCI Express のカードの節は、12V-2x6 が CEM 5.0 で導入された 12VHPWR に「信頼性の問題に対処するため」代わる（replaces）、新しい設計は 12V-2x6 だけを載せる、と書く。「12V High Power Connector の略」は出典がない | 直した（両章とも「12VHPWR に代わるコネクタ」に統一。第07章は改版履歴の「記述を改めた」と、新しい電源ユニットは 12V-2x6 だけを載せる旨を足した。事実確認表 #3 に再確認の記録） |
| M3 | 07 | 銘板の節の最後の段落、`c07-label` の「入力の電流」 | 「交流の入力の電流は、電圧をかけても電力になりません」は物理的に誤り（交流でも電力は生じる。V × A がそのまま W にならないだけ） | 直した（「電圧と電流をかけた値が、そのまま電力（W）になるとは限りません。交流の電力には力率が関わる」に） |
| M4 | 06 | `c06-power`・`c06-card` の `kind` | 電源ユニットが `ue`（計算する部品）、GPU とビデオメモリが `core`（記憶）、ディスプレイが `ran`、ヒートシンクとファンが `ran` で、spec §6.2 の意味と違っていた（凡例の色の意味が誤る） | 直した（電源ユニット `db`、GPU とビデオメモリ `ue`、ディスプレイ `ext`、ヒートシンク・ファン `ims`。線の `plane` はもとから正しい） |
| M5 | 09 | 冒頭の単位の段落 | 速さの単位を「Gbps」と定義していた。GLOSSARY §5.1 は本文で Gbps と書かず b/s を使い、USB-IF の名前などだけ原文どおりとする | 直した（単位は Gb/s、団体の名前の表記だけ Gbps と断る。1.25 GB/s に） |
| M6 | 03 | フォームファクタの節 | ATX の寸法・拡張スロットの数を、第三者のサイトの規格の写しだけを出典に書いていた（§8.1 の高リスクの区分 `規格` は ○・△ だけ） | 直した（Intel の購入ガイド〔○。12 in × 9.6 in、一般の基板は拡張スロット 7 本〕を主な出典にし、規格文書の写しは補足として扱いを明記） |
| M7 | 04 | ECC の節、参照資料 | 計算サーバー講義の第05章へのリンクがあった。spec §9.2-5・GLOSSARY §10.3 は相互参照を 3 か所（03→07、05→09、17→20）に限る | 直した（リンクの文と参照資料の行を削除。ECC の説明は残した） |
| M8 | 03・05 | ATX 2.2 の mm 値と「最大 7 本」（`c03-form`）、M.2 規格の版 1.0（`c05-m2`・`c05-iface`） | 規格の事実の根拠が、第三者のサイト（xdevs の写し、design-reuse の再掲）。PCI-SIG・Intel の一次の個別ページは執筆時も検証時も取得できていない | 残した（R1） |

### 軽微（直したもの）

| # | 章 | 箇所 | 内容 |
|---|---|---|---|
| S1 | 01 | CPU の初出 | 「中央演算処理装置」を「中央処理装置」に（計算サーバー講義 REVIEW-part1-2 S1 と同じ。用語集の alias には両方ある） |
| S2 | 02 | 「この章のしてはいけないこと」 | `callout safety` は定義のない種類で、注意の色が付かない。`callout warn` に |
| S3 | 02 | `c02-cpu` の最大の動作温度 | 「105 °C」「95°C」を GLOSSARY §5.1 の「105 ℃」「95 ℃」に（5 か所） |
| S4 | 02・04 | 参照資料 | URL のない Intel の記事 3 件（000089297・000055611・000094616）に、事実確認表の個別ページへのリンクを付けた |
| S5 | 02 | 事実確認表 #5 | Ryzen AI 7 450G の URL がなかった。AMD の日本語の製品ページで値を再確認し、URL を記載 |
| S6 | 03 | `c03-quiz` 問 2 の選択肢 | 「挿した」を GLOSSARY §2.2 の「差した」に |
| S7 | 03 | PCIe の後方互換の出典 | 「2025 年 6 月」を「2025 年 6 月 11 日〔配信の URL の日付〕」に |
| S8 | 04 | 章のメタ | `time: 35` が spec §2.1・course.json の 30 と違っていた。30 に |
| S9 | 04 | DIMM の正式名、用語集 | 「Dual Inline」を JEDEC・GLOSSARY §8 の「Dual In-line」に |
| S10 | 04 | プロファイルの節 | EXPO の説明「AMD のメモリのプロファイルの名前」を、第20章と同じ正式名「Extended Profiles for Overclocking」に |
| S11 | 05 | 冒頭の囲み | 説明前の略語 TBW を出していた（spec §8.8-2）。「書き込める総量の目安」に |
| S12 | 06 | 本文・`c06-gpu`・事実確認表 | 「アダプター」を GLOSSARY §2.1 の「アダプタ」に（8 か所） |
| S13 | 06 | `c06-gpu` の表の説明、本文、総合テストの解説 | 「推奨の電源容量」を第12章の用語「推奨電源容量」に。見積もりの参照先に第12章を足した（総合テストの解説は「第07章」→「第12章」） |
| S14 | 08 | 参照資料・事実確認表の ASRock のマニュアルの URL | 空白を含む URL を `%20` に |
| S15 | 08 | `c08-airflow` の「ラジエータを前面」の説明 | 「細い線も、冷却液や空気を運ぶ太線です」を「線はすべて、冷却液や空気の流れを表す太線です」に |
| S16 | 08・09 | 事実確認表 | §8.1 にない区分（「製品情報」「当局」）を「仕様値」「安全」「制度」に。一般知識の行の「一次」の「—」を「×」に |
| S17 | 09 | 用語集「技術基準適合証明」 | `en` を GLOSSARY §8 の「technical conformity certification」に |

### 残したもの

| # | 区分 | 章 | 内容 | 理由・推奨 |
|---|---|---|---|---|
| R1 | 中 | 03・05 | ATX Specification 2.2 の mm 値・最大 7 本（xdevs の写し）、M.2 規格の版 1.0（design-reuse の再掲）。本文は出どころを断っており、寸法は Intel の購入ガイド（○）でも裏づけたが、版の情報は一次で確かめられていない | PCI-SIG（M.2・PCIe の現行の版）と Intel の一次の個別ページを、公開前に担当が開く。開けないままなら、版の記述を「確認できなかった」に寄せる |
| R2 | 軽微 | 02 | AMD の Default TDP の定義文がない。PPT は Ryzen 1000〜5000 世代向けの資料（2022 年）による | 本文・表は「定義は確認できていない」「AM5 に当てはまるかは未確認」と断っている。AMD の AM5 向けの一次資料が見つかれば足す |
| R3 | 軽微 | 04 | 「ASRock のマニュアル（メモリの節）」が製品を特定せず URL もない | 第03章の B850M-C のマニュアルなど、具体の 1 冊で該当の文を確かめて差し替える |
| R4 | 軽微 | 04・05 | JEDEC の初出が「半導体の標準化団体」だけで正式名（JEDEC Solid State Technology Association）がない。Micron の本社の国が本文にない（GLOSSARY §6.2-2） | 正式名は第26章が持ち主。初出の括弧に正式名を足すか、A が §3 の扱いを決める |
| R5 | 軽微 | 07 | CLEAResult・Cybenetics は企業だが、参照資料の種類が「団体の資料」。CLEAResult の本社の国は未記載（本文で断っている） | §8.3 の 6 区分で「メーカーの資料」も合わないため、A が区分を決める |
| R6 | 軽微 | 09 | Bluetooth Core Specification 6.3 の採択（6.2 の個別ページには 6.3 の記載なし）、USB PD Revision 3.3 の公開日（資料のページの日付「11/05/2026」は月日の順が読めない） | 本文は日付を書いていないので誤りではない。★として公開直前に一覧のページで確かめる |
| R7 | 軽微 | 04 | 用語集で ECC を「メインメモリ」の alias にしている。GLOSSARY §8 の割り当ては「QVL」の alias | ビルドは通る。担当が alias を移すか、A が割り当てを直す |

## Web で再確認した項目（14 件）

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | NVM Express Base Specification 2.4：2026-07-31 承認、2026-08-04 公開 | 一致 | https://nvmexpress.org/specification/nvm-express-base-specification/ |
| 2 | Core Ultra 7 265K：20 コア（P 8・E 12）・20 スレッド、Processor Base Power 125 W、Maximum Turbo Power 250 W、105 ℃、FCLGA1851、NPU 13 TOPS（Int8）、DDR5 6400 MT/s、Q4'24 | 一致 | https://www.intel.com/content/www/us/en/products/sku/241063/intel-core-ultra-7-processor-265k-30m-cache-up-to-5-50-ghz/specifications.html |
| 3 | Intel『How Intel Core Processors Work』：P コアは hyper-threading で 2 スレッド、E コアは 1 スレッド。一部の製品で P コアが 1 スレッドになるという記述はない | 確認（M1 の根拠） | https://www.intel.com/content/www/us/en/gaming/resources/how-hybrid-design-works.html |
| 4 | AMD Ryzen AI 7 450G：8/16、Default TDP 65W、Tjmax 95°C、Radeon 860M、Up to 50 TOPS、ECC は基板の対応が要る、AM5、Launch 3/2/2026 | 一致（S5 で URL を記載。AMD の英語ページは取得が許可されず、WebSearch で日本語ページを探した） | https://www.amd.com/ja/products/processors/desktops/ryzen/ai-400-series/amd-ryzen-ai-7-450g.html |
| 5 | Intel の購入ガイド：ATX 12″ × 9.6″（一般に 7 本の拡張スロット、DIMM 4 本）、Micro ATX 9.6″ × 9.6″、Mini-ITX 6.7″ × 6.7″、eATX 12″ × 13″、ソケット名はピンの配列に由来（LGA 1151 は 1,151 ピン）、M.2 は 16〜110 mm | 一致（M6 で ATX の主な出典にした） | https://www.intel.com/content/www/us/en/gaming/resources/how-to-choose-a-motherboard.html |
| 6 | Intel 800 シリーズのチップセット：PCIe 4.0 のレーン 8／最大 14／最大 24、SATA 4／4／最大 8、USB 2.0 10／12／14 | 一致 | https://cdrdv2-public.intel.com/842318/intel-800-series-chipset-brief-public.pdf |
| 7 | JEDEC の DDR5（JESD79-5）：2020-07-14、開始 4.8 Gbps、DDR4 の終わり 3.2 Gbps、Vdd 1.2 V → 1.1 V、40 ビットの副チャネル 2 つ、モジュール上の電圧調整 | 一致 | https://www.jedec.org/news/pressreleases/jedec-publishes-new-ddr5-standard-advancing-next-generation-high-performance |
| 8 | Intel の ATX 3 の設計ガイド（PCI Express のカードの節）：12V-2x6 は CEM 5.1 で導入、CEM 5.0 の 12VHPWR に信頼性の問題に対処するため代わる、12 V で 600 W、CEM 5.1 はカードに連続 675 W | 確認（M2 で両章を直した） | https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.1a/2.1a/pci-express-add-in-card-considerations/ |
| 9 | 80 PLUS の 115 V 内部・非冗長の効率（Standard〜Titanium の 20/50/100%、Titanium の 10%）。力率の値がページ内で食い違う | 一致（本文が力率を書かない判断も妥当） | https://www.clearesult.com/80plus/80plus-psu-ratings-explained |
| 10 | Cybenetics の ETA：等級 6 つ（Diamond〜Bronze）、1450 を超える負荷の組合せ、所在地 Nicosia, Cyprus | 一致 | https://www.cybenetics.com/index.php?option=eta |
| 11 | HDMI 2.2：2025-06-25、96Gbps、Ultra96 HDMI Cable | 一致 | https://hdmiforum.org/hdmi-forum-releases-version-2-2-of-the-hdmi-specification/ |
| 12 | USB Power Delivery：Revision 3.3 Version 1.0 が資料の一覧にある（日付の表示は月日の順が読めない） | 一致（版のみ。R6） | https://www.usb.org/document-library/usb-power-delivery |
| 13 | Bluetooth Core Specification 6.2：公開 2025-11-04（ページのメタ情報）。6.3 の記載はこのページにない | 6.2 は一致。6.3 は再確認できず（R6） | https://www.bluetooth.com/specifications/specs/core-specification-6-2/ |
| 14 | 総務省の技適の Q&A：技適マークのない無線機の使用は電波法違反になる場合がある、1 年以下の拘禁刑又は 100 万円以下の罰金、改造で効力がなくなる | 一致 | https://www.tele.soumu.go.jp/j/adm/monitoring/summary/qa/giteki_mark/ |

**検索**：WebSearch は 1 回（AMD の製品ページの所在を探すため）。上限には当たっていない。

**再確認できず**：AMD の Ryzen 5 9500F の製品ページ（取得が許可されなかった）、JEDEC の JESD318B のページ（サイト側のエラー）、Intel の記事 000097596（型番の命名規則。取得が許可されなかった）。件数の上限のため開いていないもの：ATX Specification 2.2 の写し、PCI-SIG の PCIe 7.0 の配信と M.2 1.0 の再掲、AMD の AM5 チップセットのページ・COMPUTEX 2022 の発表・Processor Handling Guidance・Ryzen Master のガイド、ASRock・ASUS のマニュアル、Kingston・Micron・Samsung の資料、SATA-IO の名前の指針、NVIDIA の RTX 5070 の製品ページとクイックスタートガイド、AMD の RX 9070 XT、Intel の Arc B580、CUDA・ROCm の一覧、Cybenetics の文書 P16-F01、Noctua・MSI の仕様ページ、Intel の TIM・スロットリング・温度の記事と 2013 年の熱設計のガイドライン、USB-IF の名前の指針、Intel の Thunderbolt の概要、VESA・IEEE・Wi-Fi Alliance の各ページ、資源エネルギー庁の教材。

**一次でない根拠の項目**：第03章の ATX 2.2（第三者のサイトの写し）と第05章の M.2 1.0（design-reuse の再掲）は、本文が出どころを断っている（R1）。第03章の PCIe 7.0 の後方互換は Business Wire 配信（主体の原文の配信で △）。第06章の 12V-2x6 は Intel の記述（PCI-SIG の原文ではない旨を参照資料に明記済み）。

## 守るべき線

- 製品の推奨：なし。製品の表（`c02-cpu`・`c03-chipset-ex`・`c06-gpu`）は「例であり推奨ではない」「比較・順位は示さない」と注記している。第07・08章は、マニュアル・仕様ページの例を本文で社名を出さずに「1 社」「1 点」と書き、参照資料にだけ名前を置いている。
- 価格：なし（第05・06章の比較表は「価格は書かない」と明記）。
- 危険な手順：電源ユニットの分解・定格を超える設定・保証を外れる改造の手順はない。第02章は定格を超える設定を「扱わない」と書き、第07章は「してはいけないこと」で分解・ケーブルの混用・改造・定格超過を禁じている。第08章は本格的な液冷の組み方を書いていない。
- 定型の注意書き：第06章（電気・けが）、第07章（電気）、第08章（液冷）は spec §9.3 の文と一字一句一致し、種類ごとに別の囲み。定型文の「抜いた後も電気がたまる」は、第07章の事実確認表 #27 が一般知識と明記し、#23〜#26 のマニュアル（内部に高電圧）を根拠にしている。第09章の技適は総務省の文言どおり（「違反するおそれ」）で、断定していない。

## 表現と用語

- 文は短く、です・ます調でそろっている（データの詳細欄は体言止めを含むが、他講座と同じ書き方）。原文の長い引用はない（英語の欄名・短い語句だけ）。
- 表記は GLOSSARY のとおり（機械検索で、挿す・アダプター・°C・本文の Gbps を S3・S6・S12・M5 で直した）。社名は §8.12 のとおりで、本文の初出に本社の国を添えている（Micron は R4）。
- 章の間の食い違い（他の部と関わる点を含む）：

| 点 | 関わる章 | 結果 |
|---|---|---|
| メモリの電圧の例 | 04 と 20 | 一致。第04章は標準の 1.2 V・1.1 V と架空のプロファイルの 1.25V だけ、第20章は「プロファイルに電圧が含まれる」と数値なしで書く。EXPO の正式名は S10 でそろえた |
| 推奨電源容量の書き方 | 06 と 12（11 も） | 用語を「推奨電源容量」にそろえた（S13）。第06章（持ち主）は製品ページの値と条件、第12章は値を書かずシステム全体の値として扱う。食い違いはない |
| 12V-2x6 と 12VHPWR | 06 と 07 | M2 で「代わるコネクタ」に統一 |
| CPU の日本語の名前 | 01・02 と計算サーバー講義 | S1 で「中央処理装置」に |
| ソケット名・Intel の 800 シリーズ | 02・03 | 一致（FCLGA1851・AM5） |
| 映像の差す先 | 01・06・09 と 21 | 第01・06・09章は「カードがあればカードの端子」で一致。第21章側は今回見ていない |
| 相互参照 | 03・04・05 | 第04章の計算サーバー講義へのリンクを削除（M7）。第03章 → 第07章、第05章 → 第09章の 2 か所は spec どおり |

## 公開の判断

小さな修正を入れた現状で、第01〜09章は公開してよい水準です。重大な誤りはなく、章の間の食い違い（M2）、物理の誤った一文（M3）、図の色の意味（M4）、相互参照の決まり（M7）は直しました。公開前の注意は 3 点です。(1) ATX 2.2 と M.2 1.0 の版の根拠が第三者のサイトのまま（R1）なので、PCI-SIG・Intel の一次資料で確かめるか、版の記述を外すこと。(2) ★の項目（現行の製品・NVMe・USB・HDMI・DisplayPort・Wi-Fi・Bluetooth の版、80 PLUS の等級、Intel の設計ガイドの版）を公開の直前にもう一度開くこと（R6 を含む）。(3) 第03・05章のリンク先の計算サーバー講義の第07・09章が公開済みかを、土台担当が確かめること（spec §10）。
