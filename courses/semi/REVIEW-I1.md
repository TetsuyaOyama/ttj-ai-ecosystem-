# 序章1「髪の毛からトランジスタまで：小ささと数の多さをつかむ」の検証の記録

- 検証日：2026-11-18
- 対象：`chapters/I1-scale.html`、`data/I1-scale.js`、`facts/I1-scale.md`（ADD-scale.md・spec.md・FRAMEWORK.md §4.6〜4.12、第04・05・06・08・13・18章の該当箇所は読むだけ）
- 修正前の控え：`/tmp/semi-i1-review/orig-semi/`（作業用。消してよい）
- 画面の確認：講座の写し（`/tmp/semi-i1-review/c/semi`）をビルドし、Playwright で幅 1280・390 の全部品・全状態を撮影・操作（xsec は全手、lab は全実験タブ・全プリセット・全つまみの最小・最大。294 状態、`/tmp/semi-i1-review/shots/final/`）。SVG の文字の重なり・はみ出し・8.5 px 未満の文字を自動で検出。console エラー 0。執筆者の写真（`/home/claude/site-out-shots/semi-scale/`）も見た。
- 修正後の検査：`python3 -I _framework/build.py semi --check` → OK、警告 0。`node semi/tools/selfcheck.js semi I1 --calc` → NG 0 件（検算の行を 2 行追加）。`test.py`（写し、`--port 8897`）の結果は末尾。
- `semi/out/`、semi-publish.json、_framework は触っていない。

## 件数

| 区分 | 件数 | 直した | 残した |
|---|---|---|---|
| 重大 | 0 | 0 | 0 |
| 中 | 7 | 7 | 0 |
| 軽微 | 17 | 15 | 2 |
| 合計 | 24 | 22 | 2 |

（ほかに、部品の側の問題 3 件を末尾に記録。）

## 事実の照合（WebFetch で値を名指しして取り、聞き方を変えてもう一度取った）

| 項目 | 本文の値 | 資料で確かめた値 | 判定 | 根拠 |
|---|---|---|---|---|
| Intel「10 nm」 | CPP 54・MPP 36・フィン 34 nm、フィン高さ 53、100.8 MTr/mm² | 資料の写し：「54 nm gate pitch」「minimum metal pitch of 36 nm」「Fin Pitch of 34 nm, Fin Height of 53 nm」「above 100MTr/mm2」、図の数値 100.8。IEEE Spectrum（2017-03-30、R. Courtland）「100.8 million, to be exact」 | 一致 | https://faculty-web.msoe.edu/johnsontimoj/EE4980/files4980/Kaizad-Mistry-2017-Manufacturing.pdf ／ https://spectrum.ieee.org/nanoclast/semiconductors/processors/intel-now-packs-100-million-transistors-in-each-square-millimeter |
| Intel「14 nm」 | 70・52・42 nm、密度 約 37.5（図から読み取り） | 写しの比較表 70・52・42。密度 37.5 は図に添えられた数値として本文にあり、IEEE Spectrum も 37.5 | 一致。「読み取り」でなく数値なので「約」と注記を外した（S2）。Intel の 14 nm fact sheet（© 2017 Intel、WikiChip 上の写し）も 70・52 | 同上、https://en.wikichip.org/w/images/f/ff/14-nm-technology-fact-sheet.pdf |
| Intel の公式サイト上の版 | — | newsroom.intel.com の資料（Mistry の PDF、Bohr の論説）は、この環境の取得許可の外で開けなかった。Bohr の論説の転載（TelecomTV、2017-03-29）は 10・14 nm の密度を書いていない | 出典は写しのまま。IEEE Spectrum を照合の出典として参照表に追加（S1） | https://www.telecomtv.com/content/devices/let-s-clear-up-the-node-naming-mess-26300/ |
| IRDS 2021 | 7／5／3／2.1／1.5、G54M36・G48M36・G45M24・G42M20・G40M16、ラベルは最小ハーフピッチと同じでない | 同じ（ラベルは表 LITH-1、G/M は LITH-2 の欄）。第04章の表とも同じ | 一致 | https://Irds.Ieee.Org/images/files/pdf/2021/2021IRDS_Litho.pdf |
| Intel 4004 | 1971 年、2,300 個、線幅 10 μm | 「held 2,300 transistors」「circuit line width was 10 microns」、1971-11-15 の Electronic News | 一致 | https://www.intel.com/content/www/us/en/history/museum-story-of-intel-4004.html |
| NVIDIA H100 | 800 億、814 mm²、TSMC 4N、2022-03-22 | 同じ（更新 2025-07-22） | 一致 | https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/ |
| Apple M2 Ultra | 1,340 億、M1 Ultra より 200 億多い、「1 つのダイの数とは限らない」 | 同じ。加えて「two M2 Max dies connected through UltraFusion」「second-generation 5-nanometer process」 | 一致。2 ダイの合計・製造プロセスの呼び名を追記（S4） | https://www.apple.com/newsroom/2023/06/apple-introduces-m2-ultra/ |
| Cerebras WSE-3 | 4 兆、46,225 mm²、TSMC 5 nm、2024-03-13 | 発表：4 兆・5nm TSMC・90 万コア（日付は 3/11 と 3/13 が混在）。面積は発表になく、製品ページ（2026-11 更新、いまは WSE-3T の説明）と IEEE Spectrum（2024-03-13）が 46,225 mm² | 一致。面積の出典の書き方を直した（S5） | https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine ／ https://cerebras.ai/chip/ ／ https://spectrum.ieee.org/amp/cerebras-chip-cs3-2667497526 |
| ASML の重ね合わせ | NXE:3600D MMO 仕様 1.1 nm、NXE:3800E 目標 ≤0.9 nm | スライド 10「NXE:3600D spec. 1.1nm」、スライド 16 Matched Machine Overlay 0.9 nm、スライド 17（2023 年 6 月）ATP target MMO ≤0.9 nm・DCO ≤0.8 nm。スライド 9 の on-product overlay 1.7 nm（3600D） | 一致。「目標」は受入試験の目標と明記し、MMO の意味と on-product overlay を追記（M6） | https://euvlitho.com/2023/P62.pdf |
| EUV の波長 | 13.5 nm | 第08章 data の ASML 2 資料（13.5 nm） | 一致 | 第08章 |
| 髪の毛 | 17〜181 μm、学生の測定 60〜77 μm、代表 70 μm は取り決め | 同じ（参考文献表の要約は 60〜80 μm） | 一致 | https://hypertextbook.com/facts/1999/BrianLey.shtml |
| 赤血球 | 7.7 μm（別資料 8 μm） | 7.7 μm、Cell Size Database、8 測定の平均 | 一致 | https://bionumbers.hms.harvard.edu/bionumber.aspx?s=n&v=0&id=108239 |
| 大腸菌 | 幅 0.49 ± 0.03、長さ 1.78 ± 0.54 μm | 同じ（SEM、44 細胞、Yamada ら 2017） | 一致 | https://bionumbers.hms.harvard.edu/bionumber.aspx?id=117344&ver=3&trm=&org= |
| コロナウイルス | 60〜140 nm、スパイク込み約 100 nm | 同じ。「組織の固定で縮み 75〜100 nm」の注は、論文では「FFPE の処理で縮み、100 nm より 75 nm に近い」 | 値は一致。注の言い方を直した（S6） | https://wwwnc.cdc.gov/eid/article/27/4/20-4337 |
| 紙の厚さ | 0.09 mm（通販会社のコラム） | 富士フイルムビジネスイノベーション W-Paper「坪量：64g/m2、紙厚：87μm」 | 出典を差し替え、「目安」と明記（M5） | https://www.fujifilm.com/fb/ja/support/supply/paper/w-paper |
| Si の格子定数 | 5.431 020 511 × 10⁻¹⁰ m（真空中、22.5 ℃） | 同じ（相対不確かさ 1.6 × 10⁻⁸） | 一致 | https://pml.nist.gov/cuu/pdf/xray_2018.pdf |
| 65 nm 世代の SiO₂ | 1.2 nm、原子 5 層 | 「as little as 1.2nm thick – equal to five atomic layers」「previous 65nm process」、2007-01-27 | 一致 | https://intel.com/pressroom/archive/releases/2007/20070128comp.htm |
| ISO 14644-1 表 1（0.5 μm） | ISO 3 = 35 … 9 = 35,200,000、0.1 μm は 1〜6 | 同じ（第18章の表と同じ。第18章の出典の一つの cleanroom.net で再照合） | 一致 | https://cleanroom.net/faqs/what-are-the-iso-classes-of-air-cleanliness-by-particle-concentration/ |
| 手術室 | ISO 7〜9（運転中） | 「At operation the cleanliness classes were between ISO 7 and ISO 9.」（Salmela ら 2014） | 一致 | https://cris.vtt.fi/en/publications/cleanroom-classification-studies-and-airborne-bioburden-particles/ |
| ISO 9 ＝ ふつうの部屋 | CASRAI の解説 | CASRAI は研究管理の用語集の団体で、清浄度の権威ではない。第18章にこの記述はない | 削除（M4） | https://casrai.org/guides/cleanroom-classifications |
| JASM の月産 | 5.5 万枚（TrendForce が UDN を引用、社長の目標） | 経済産業省『特定半導体生産施設整備等計画の概要』：JASM・TSMC、熊本県菊陽町、「生産能力：5.5 万枚/月（12 インチ換算）」、認定 2022-06-17、計画の値 | 公式の資料に差し替え。「計画の値で実績ではない」と明記（M3） | https://www.meti.go.jp/policy/mono_info_service/joho/laws/semiconductor/semiconductor_plan/nintei_tokuteihandoutai_keikaku01.pdf |
| 世界人口 | 82 億人（2024 年） | 「up from 8.2 billion in 2024」 | 一致 | https://population.un.org/WPP/Publications/Files/WPP2024_Key-Messages.pdf |
| 取れる数の近似式・ポアソン | π(d/2)²/S − πd/√(2S)、Y = exp(−D0·A) | 取れる数の式は解説サイト（AnySilicon）の式と同じ形（計算機アーキテクチャの教科書で広く使われる形）。同サイトは負の二項モデルも示す。講座の第13章は式を書かず「面積が大きいほど下がる」とだけ書いていて、食い違いはない | 教科書の式のまま（原典は未確認）。別のモデルがあることを本文に 1 文追記（S11） | https://anysilicon.com/die-per-wafer-formula-free-calculators |
| 1 ロット 25 枚 | 仮定 | 本文・部品の注・まとめで「仮定」と明記 | 問題なし | — |

## 計算の照合（node で独立に再計算。`/tmp/semi-i1-review/scripts/calc.js`）

- 髪の毛の断面：π × 0.035² ＝ 0.0038485 mm² × 100.8 MTr/mm² ＝ 387,924（約 38.8 万）。17 μm で 22,880、181 μm で 2,593,627。部品の表示（38.8 万個、3,848 μm²、9,921 nm²、99.6 nm、1.26 倍）と一致。
- 300 mm ÷ 70 μm ＝ 4,286、70 μm ÷ 54 nm ＝ 1,296、10 μm ÷ 36 nm ＝ 278。一致。**3 億 nm ÷ 0.5431 nm ＝ 5.52 億（10^8.74）で、本文の「9 桁以上」は誤り**（M1）。
- 面積の比：83.6／246.9／24.0、トランジスタ ÷ ウイルス 1.263（60 nm で 3.51、140 nm で 0.644）。一致。
- 取れる数：28.5 mm → 63.6、12 mm → 435.3、5 mm → 2,694、200 mm・10 mm → 270。H100 級のボタン（28.5 mm・98.3）：1 個 798 億、良品 44.1、3.52 兆、429 個/人、19.4 京/月、747 億/秒、9.11 個/人/秒。本文（3.5 兆、約 430、約 750 億、約 9）と一致。つまみの最小（2 mm・150 mm・5%）で 4,251 個、最大（36 mm・300 mm・100%）で 36 個も式どおり。
- 歩留まり：12 mm・0.1/cm² で 86.6%、28.5 mm で 44.4%、面積比 5.64。一致。
- ISO：3.52 個/L、0.284 L、ISO 9 / ISO 5 ＝ 10,000、ISO 3 で 28.6 L。一致。
- 重ね合わせ：300 km ÷ 300 mm ＝ 10⁶ 倍、1.1 nm → 1.1 mm、0.5431 → 0.543 mm、36 → 36 mm、1.1/36 ＝ 3.06%。10 km・150 mm で 6.67 万倍、0.5 nm → 0.0333 mm（部品の表示と一致）。
- ズーム：1 倍で 300 mm、以下 10 分の 1 ずつ、1 億倍で 3 nm。各段の並ぶ数（ゲート 556 万個分 … 0.06、配線 833 万 … 0.08、格子 5.52 億 … 5.52）を部品の 9 段のボタンで読み、一致。

## 指摘の一覧

### 中（すべて直した）

| # | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|
| M1 | 本文「入れた長さを…」の確かめる点 | 「ウェーハの直径とシリコンの格子の間に 9 桁以上の差」は誤り（3 億 ÷ 0.5431 ＝ 5.5 億、8.7 桁） | 「約 5.5 億倍（8 桁あまり）」に。検算の行を追加 |
| M2 | ズームの絵 手 8（1,000 万倍）| FinFET の断面に、65 nm 世代（平面のトランジスタ）の SiO₂ 1.2 nm をそのまま当てていて、模型の仮定と本編（第02章：先端は high-k）が食い違って読める。ゲートがフィンの上にしかなく、フィンを囲む形になっていない | 本文に「65 nm の値を厚さの目安として借りた」、つまずきやすい点に「65 nm 世代は平面。フィンの世代は high-k で厚さは未確認」。ゲートの両側の図形を 2 つ足し、上と両側を囲む形に |
| M3 | 本文 束ねる装置の 4 点目、`cI1-bundle` の月産の hint、参照表、facts #23 | JASM 5.5 万枚が TrendForce（UDN の二次情報）だった | 経済産業省の認定計画の概要（12 インチ換算、計画の値、2022-06-17 認定）に差し替え。「実績ではない」と明記 |
| M4 | 本文 清浄さの確かめる点、`cI1-clean` のプリセット・結果の名前・場所の表、参照表、facts #21 | 「ISO 9 ＝ ふつうの部屋の空気」が解説ページ（CASRAI）だけの根拠で、第18章にない | 記述を外し「表 1 で最も緩い ISO 9」に。場所の表は 2 行に |
| M5 | 長さの階段「紙 1 枚の厚さ」、参照表、facts #16 | 出典が通販会社のコラム。「製品で 0.089〜0.092 mm」は確かめられない | 富士フイルムビジネスイノベーションの製品情報（64 g/m²、87 μm）に差し替え、「約 90 μm は目安」と明記。比も「約 9 分の 1」に |
| M6 | 本文 位置合わせの精度、`cI1-overlay` の hint、参照表、facts #8 | matched machine overlay の意味の説明がなく、0.9 nm は「受入試験の目標」。同じ資料の on-product overlay（1.7 nm）に触れておらず、装置の値が製品のずれと読める | MMO の意味（2 台の装置の層どうしのずれ）、受入試験の目標、on-product overlay 1.7 nm（条件で違う）を追記 |
| M7 | 円の面積の絵 手 4 | 題名は「大きい方の半径を 100 に固定」なのに、手 4 だけ小さい方（ウイルス）が 100 で、トランジスタが 112。色も第 3 の材料で、凡例が 3 つ（その段で使わないものが出る） | 手 4 もトランジスタを 100（大きい方の色）、ウイルスを 89（小さい方の色）に。第 3 の材料を削除して凡例を 2 つに |

### 軽微（直したもの）

| # | 箇所 | 内容 | 対応 |
|---|---|---|---|
| S1 | 参照表 | Intel の値の照合先が写しだけ | IEEE Spectrum（2017-03-30）の行を追加。公式サイトの版は開けなかったと注記 |
| S2 | `cI1-nodes` の 14 nm | 「37.5（図から読み取り）」。実際は図に添えた数値 | 37.5 と数値で、IEEE Spectrum と一致する旨を出典欄に。facts #1 も |
| S3 | `cI1-nodes` | 1 行目だけ「（2018 年の予測）」 | 「（2018 年）」に（見通しであることは caption にある） |
| S4 | `cI1-chips` の M2 Ultra | 「1 つのダイの数とは限らない」。製造プロセスの呼び名がない | 2 つの M2 Max のダイの合計、第 2 世代の 5 nm（Apple の呼び方）を記載 |
| S5 | `cI1-chips` の WSE-3、参照表 | 面積の出典が製品ページだけ。製品ページは 2026-11 時点で WSE-3T の説明 | IEEE Spectrum で照合と記載。製品ページの現状を注記 |
| S6 | 長さの階段「コロナウイルス」の注 | 「組織の固定で縮むため 75〜100 nm」は論文の言い方と違う | 「標本の処理（FFPE）で縮み、100 nm より 75 nm に近く見えることがある」に |
| S7 | 本文 長さの階段の 3 つ目 | 「いまの配線の間隔（36 nm）」は 2017 年の値で言い切り。線幅とピッチの比較の断りがない | 「Intel「10 nm」（2017 年）の配線の間隔」、線幅と間隔は別の量で桁の目安と追記 |
| S8 | `cI1-zoom` の disclaimer | ズームの装置の近くに「世代の名前は実寸でない」の断りがない | disclaimer に追記 |
| S9 | `cI1-zoom` の intro | 「右の表」。幅 390 では下に来る | 「下の結果」に |
| S10 | `cI1-hair` | プリセット名「Intel の最高密度」が優劣の評価に読める。disclaimer が「チップ全体の平均ではない」と言い切るが、H100・WSE-3 のボタンは平均 | 「Intel「10 nm」の論理の密度 100.8」に。disclaimer を初期値と各ボタンに分けて書いた |
| S11 | 本文 歩留まりの限界の注意 | ポアソン以外のモデルがあることに触れていない | 「欠陥が固まって入ることを考えた別の式もあり、式の選び方でも値が変わる」を追記 |
| S12 | 本文 つまずきやすい点 | 「1 個の大きさが 100 nm 角」はトランジスタの形の大きさと読める | 「1 個あたり平均 100 nm 角の面積（形の大きさではない）」に |
| S13 | 確認問題 問3 の解説 | 「面積を 100 倍・10,000 倍にずらすと、ほかの選択肢」は選択肢（1/1000、1/10、×100）と合わない | 「半径を 1 桁取り違えると面積が 100 倍で約 3,900 万個。ほかも桁の取り違え」に |
| S14 | `cI1-clean` の ISO 3 のプリセット | 「最も厳しい露光工程などで挙がるクラス（第18章）」は第18章にない | 「表で 0.5 μm の欄に値がある、最もきれいなクラス」に |
| S15 | ズームの絵（全手）・円の絵（表示） | 幅 390 でラベルが 7 px（読めない）。1 万倍の「横の配線」と「縦の配線」、10 万倍の「銅の配線」と「配線の間の絶縁膜」、100 万倍の「絶縁膜」と「ゲート」が重なる。凡例が 10 種で、名前（「ブロック・ゲート・配線（金属）」など）が段によって意味が変わり分かりにくい | data の側で、xsec の座標と viewBox を 2/3 に縮める補助 `shrinkX` を足した（ラベルの文字は viewBox 単位で決まるため、390 で約 9〜10 px、1280 で約 15 px に。8.5 px 未満の文字は自動検出で 0 件）。重なる背景のラベルを外して本文で説明。凡例はセルの列の 2 色を 1 つにまとめて 9 種にし、名前を段ごとの意味が分かる書き方に（例：「メモリのブロック／ゲートの電極」）。絵の説明から px の数を外し、「画面の幅の 18%」などの比に |

また、H100 級のボタンの文「公表値 80 B と数 % の差」は実際は 0.2%（798 億）なので「1% 未満」に直した（S15 に含めず、数えない小さな直し）。

### 軽微（残したもの）

| # | 箇所 | 内容 | 理由 |
|---|---|---|---|
| R1 | 取れる数の式・ポアソンの式 | 教科書の原典のページは未確認 | 解説サイトで同じ形を確認。本文で「近似」「簡単なモデル」「仮定」と明記済み |
| R2 | 円の絵 手 3 | 「ウイルス」のラベルが小さい円からはみ出す | 縁取りで読める。小さい方の円の大きさ自体が内容 |

## 説明の正しさと断り

- 「◯ nm は実寸ではない」：この章の読み方、名前と実寸の表、長さの階段の行（ゲートの間隔・1971 年の線幅）、換算の lab の disclaimer、ズームの lab の disclaimer（S8 で追加）、問1、まとめ、つまずきやすい点にある。
- 模式図の明記：本文（「各段階の模式図」）、部品の自動の注記、手 1・8・9 のつまずきやすい点。
- 密度の違い（論理の値とチップ全体の平均）、取れる数・歩留まりが模型の式であること、「1 人あたり」「1 秒あたり」が仮定の工場（全部が同じチップ、30 日）での換算であることは、本文・部品の注・まとめの全部にある。
- チップの表は年の順で、「製品の優劣を示す表ではない」と caption にある。ノードの表も「優劣をつける表ではない」「企業の呼び名を等号で結ばない」とある。投資の勧めに読める文はない。輸出管理には触れていない。
- 確認問題 3 問：正答（問1 世代の呼び名、問2 1.1 mm、問3 約 39 万個）の文は正しい。誤りの選択肢はどれも正しく読めない。問3 の解説は S13 で直した。
- 作者の名前・ハンドル名・メールアドレス：章・データ・事実確認表・ADD に無い（grep）。

## 部品の側の問題（_framework は編集していない。基盤の担当へ）

1. `xsec` の凡例は、全手で使った材料をまとめて出す（engine-36-xsec-route.js の `mats`）。手ごとに、その手で使う材料だけを出す（または使わない材料を薄くする）選択肢がほしい。
2. `xsec` のラベル（`.xs-lb`）は 11 px が viewBox の単位で、幅 390 では 600 幅の図で約 7 px になる。画面の幅に応じた最小の文字の大きさ（または狭い幅でのラベルの拡大）がほしい。この章は data の側で viewBox を縮めて対処した。
3. `lab` の線グラフ（`fig.type:'curve'`）で、`ymax:100` のとき、縦軸の上端の目盛り「100」と縦軸の名前（「縦軸：歩留まり（%）」）が幅 1280 で接する（自動検出で重なり 1 件。読めないほどではない）。

## 基盤の文言の差し替え（home-lab の labels）について

- この章は `layers`・`lab`・`xsec`・`table`・`quiz` だけを使い、家庭の電気の部品（`bucket` ほか、home-lab.js）は使っていない。半導体の文脈で不自然な部品の文言（「出力」「家庭」「利用率」など）は、この章には出ない。公開時に data に指定する文言は、なし。

## 変更したファイル

- `semi/chapters/I1-scale.html`（M1・M3・M4・M5・M6、S1・S4・S5・S7・S11・S12、参照表）
- `semi/data/I1-scale.js`（M2・M3・M4・M5・M6・M7、S2〜S10・S13〜S15、検算 2 行。データの形は不変）
- `semi/facts/I1-scale.md`（#1・#6・#7・#8・#16・#21・#23、弱い資料の節、検算 2 行）
- 新規：この記録 `semi/REVIEW-I1.md`
- ADD-scale.md は執筆者の確認書なので変えていない（§2 の「二次・弱い資料」の記述は、この記録の内容で古くなっている）。

## テスト

- `build.py semi --check`：OK、警告 0（中断後の再開時にも再実行して OK。直しは途中で止まっていなかった）。`selfcheck.js semi I1 --calc`：NG 0 件。
- 撮影・操作（294 状態、1280・390）：console エラー 0、SVG の文字の重なりは上の部品の側 3. の 1 種だけ、8.5 px 未満の文字 0、はみ出し 0（`tbl-wrap` の横スクロールは表の仕様）。
- `test.py`（修正後の写し `/tmp/semi-i1-review/c/semi`、`--port 8898`。序章1を含む全章、main と demo、1366／375 px × ダーク／ライト）：**PASS 11760 / FAIL 0**。1 回目（`--port 8897`）は作業の中断（サーバーの停止）で途中終了したため、走らせ直した。写しを使ったのは、`semi/out/index.html` を書き換えないため。

## 結論

**条件つきで公開可**。重大な誤りはなく、中 7 件・軽微 15 件は直した。条件は (1) 公開の設定（semi-publish.json の `chapters` を `"I1,01-32"`、`hero_status` に序章。ADD-scale.md §3）を別の作業で行うこと、(2) 部品の側の問題 1・2（凡例の絞り込み、狭い幅のラベル）は data の側で軽くしただけで、基盤で直すまで、スマートフォンでは凡例に使わない材料が並ぶこと、を了承すること。Intel の資料は公式サイトの版を開けず、大学サイトの写しと IEEE Spectrum で照合した。
