# 第3部（第16〜20章）技術検証の記録

- 検証日：2026-11-14
- 対象：`chapters/16〜20-*.html`、`data/16〜20-*.js`（ほかの章と course.json は触っていない）
- 修正前の控え：`/tmp/review-p3/orig/chapters`、`/tmp/review-p3/orig/data`（置換用の一時スクリプトは `/tmp/review-p3/scripts`）
- 修正後の検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/semi --check` → `OK (check only) 章 32/32 公開, データ 171 件 … 0 warnings`
- 変更したファイル：第16〜20章の HTML とデータのすべて（第20章の HTML は変更なし）

## 件数

| 区分 | 件数 | 直した | 残した |
|---|---|---|---|
| 重大 | 0 | 0 | 0 |
| 中 | 8 | 6 | 2 |
| 軽微 | 17 | 13 | 4 |
| 合計 | 25 | 19 | 6 |

装置の共通の形（ロードポート → EFEM → ロードロック → 搬送室 → プロセスチャンバ）、枚葉式とバッチ式の使い分け、露光装置のエアロックとインライン接続、CVD・エッチング・縦型炉の断面の構成、SEMI E10 の 6 状態とアップタイム・ダウンタイムの区分、TMP とドライポンプの直列の理由、MFC が質量流量を制御する理由、整合器と反射電力、静電チャックと裏面ヘリウム、ISO 14644-1 のクラス表、一方向流、AMHS、用役と除害の整理に、本質的な誤りはありませんでした。ISO 14644-1:2015 の表 1 は、式 Cn = 10^N × (0.1/D)^2.08 を有効数字 3 桁に丸めた値（例：ISO 5・0.5 μm＝3,518 → 3,520、ISO 8・5 μm＝29,260 → 29,300）と全セル一致し、ISO 2 の 0.5 μm・ISO 5 の 5 μm を空欄にしているのも 2015 年版どおりです（1999 年版の値〔ISO 2 の 0.5 μm＝4 など〕を混ぜていない）。

第19・20章の数字（SEMI の装置売上・地域別・予測、SEAJ の日本製装置販売高と予測、ASML・Applied Materials・Lam Research・KLA の通期売上、SEMI の材料市場、経済産業省の定性的な記述）は、一次資料と**すべて一致**しました。第2部で見つかった種類の誤り（発表の年・主体、企業の国の取り違え）はありませんでした。優劣の評価・投資の推奨・銘柄の評価と読める記述もありません（第19章に定型の注意書きあり、表に「順位・優劣ではない」の断りあり、株価・目標株価・業績予想なし）。

図（arch 5 本〔ビューは 4・2・2・2・2〕、seq 2、tree 2、compare 2、ident 1、drill 3）と、確認問題 27 問・総合テスト 5 問の正答と解説は全件確認しました。下の M2 のほかに正答の誤りはなく、誤答も「もっともらしい誤解」になっています。

## 指摘の一覧

### 重大

なし。

### 中

| # | 章 | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|---|
| M1 | 16〜18 | 本文・表・図・参照資料の社名 | TEL、Kokusai Electric、Canon、EBARA、Hitachi High-Tech、Advantest、Yaskawa、Fujikin、Ferrotec、Muratec と英語で書いていた。GLOSSARY §6.2-1（日本語で名乗る表記）と、第2部の M9 で直した第08〜14章の表記・第19章の「東京エレクトロン」「アドバンテスト」と食い違う | 直した（東京エレクトロン、KOKUSAI ELECTRIC、キヤノン、荏原製作所、日立ハイテク、アドバンテスト、安川電機〔ブログの発行者は「Yaskawa Europe Technology（安川電機のグループ会社）」〕、フジキン、フェローテック、村田機械〔ブランド名 Muratec〕。製品名・リンクの文字・資料の原題はそのまま。HORIBA は同社が日本語でも使う表記なので残した） |
| M2 | 17 | 演習 `c17-drill` のケース 1 の解説 | 「排気を止めて圧力が上がるのは、漏れか、ポンプの能力の低下の典型」としていた。ポンプから切り離した状態の圧力上昇（ビルドアップ）は、漏れか、壁・部品からのガス放出によるもので、ポンプの能力とは関係しない。因果の取り違え | 直した（「漏れかガス放出。ポンプの能力とは別」。リーク率が正常なら減圧の遅さはポンプ・配管を疑う、と切り分けの順を書いた。記録の文も「排気の弁を閉じると」に） |
| M3 | 17 | プラズマ系の節 | 「エッチングや CVD では…プラズマをつくります（第08章・第10章）」。第08章は露光。プラズマ CVD は第07章 | 直した（「エッチングやプラズマを使う CVD では…（第07章・第10章）」。章リンクにした） |
| M4 | 17 | 参照資料 | 16 件すべてにリンクがなかった（資料名だけ） | 直した（13 件に個別ページのリンクを付けた。荏原製作所、Leybold、MKS 2 件、HORIBA、フジキン、Advanced Energy〔製品ページとカタログ〕、US 5,777,838、LAUDA、Brooks、Yaskawa Europe Technology、フェローテック 2 件、CoorsTek、Merck、SEMI〔E30 の解説・E187 の規格ページ〕。リンクを特定できなかった 3 件〔MKS『Creating a Vacuum』、Semicorex、SEMI『Top 10 Standards』〕は「リンクを特定できず」と注記。R4） |
| M5 | 18 | 清浄度の状態の説明、`c18-iso` | 状態の区分を、個人・小規模の解説サイト（cky-4pt）だけに頼り、「ISO 14644-3:2019 の検証の説明」としていた。状態（占有状態）の定義は ISO 14644-1:2015 の 3.3 にある。また竣工時を「建物ができて、装置も人もいない」とし、定義の要点（用役がつながって動いている）が抜けていた | 直した（ISO 14644-1:2015 の 3.3 の定義を、規格の販売サイト〔iTeh Standards〕が公開する見本ページで確認し、竣工時・非稼働時・運転時の説明をその定義に合わせた。参照資料に見本ページを追加し、cky-4pt は「式の形だけ。状態の説明には使っていない」に） |
| M6 | 19 | WFE の説明、確認問題 2 の解説 | 確認問題 2 の解説で「クリーンルームの設備は装置ではなく用役の設備」と言い切っていた。SEMI の 2026 年 7 月の発表では、WFE はウェーハ処理装置・マスク／レチクル装置・工場設備（fab facilities）の区分を含む | 直した（本文に WFE の内訳を 1 文追加。解説を「工場設備の区分も含まれるが、中心はウェーハ処理装置で、空調設備だけを指す言葉ではない」に。正答は変わらない） |
| M7 | 16〜20 | 確認問題の数 | 第16・17章は 6 問、第18〜20章は 5 問（CHAPTER-BRIEF は 3 問）。正答の添字は各章とも同じ値が 2 回まで（spec §7.2-6 は満たす） | 残した（R1） |
| M8 | 19 | 日本企業の事業内容の出典 | 東京エレクトロンの有価証券報告書が 2023 年 3 月期で古い。日本企業 4 社の有価証券報告書のリンクが、テキストの転載サイト（edinetdb.jp）。東京エレクトロンの通期売上は載っていない | 残した（R2） |

### 軽微（直したもの）

| # | 章 | 箇所 | 内容 |
|---|---|---|---|
| S1 | 16 | 参照資料 | 東京エレクトロンの製品一覧（上位ページ）を、Episode 1・Episode UL・TELINDY PLUS・NT333・Triase+・LITHIUS・CELLESTA-i・EXPEDIUS-i・Prexa・Synapse の個別ページに差し替え |
| S2 | 16 | 参照資料 | アドバンテストの製品一覧（上位ページ）を、SoC テスト（V93000）・メモリテスト・テストハンドラー・プローバー・CD-SEM の個別ページに差し替え |
| S3 | 19 | 参照資料 | KLA の決算発表が転載（placera.se）だった。SEC の Form 8-K 付属書に差し替え（値 13,579,476 千米ドル、2026-06-30 終了を確認） |
| S4 | 17 | 整合器の節、`c17-parts` | NavX の用途に「チャンバのクリーン」とあったが、製品ページの用途はエッチング・PECVD・PVD・PEALD・ALE。製品ページの記載に合わせた |
| S5 | 17 | ドライポンプの説明 | 荏原製作所の「大気圧から高真空まで」をそのまま書き、続く TMP の「高い真空を作る」と並ぶと、ドライポンプだけで TMP の領域まで下げられると読める。「さらに低い圧力まで下げる仕事は TMP が受け持つ」を補った |
| S6 | 18 | 超純水の節 | 「理論上の最大は 18.25 MΩ·cm」を外した（MKS の解説に温度の記載がなく、25 °C の値として扱うと不正確）。ITRS の値が 2015 年版であることを補った |
| S7 | 18 | 全体 | μ が U+00B5（µ）だった。GLOSSARY §5.1 の U+03BC（μ）に統一（HTML・データ計 19 か所） |
| S8 | 18 | 気流の節・超純水の節 | 「99.97 %」「99.997 %」を「99.97%」「99.997%」に、「25 ℃」を「25 °C」に（GLOSSARY §5.1） |
| S9 | 18 | クラス表の注記・`c18-isotab` の見出し | 値の根拠を「転載された表」だけにしていた。見本ページの表 1 で確認したことを書き、式は「本講座で表の値と照合」と書き分けた |
| S10 | 18 | 本文の企業の初出 | Kuehne+Nagel（スイス）、村田機械（日本）、Tata Consulting Engineers（インド）、ABM（米国）、JE Dunn Construction（米国）に国を添えた（GLOSSARY §6.2-2） |
| S11 | 19 | 企業の表・図・確認問題 | 「ウェーハプローバ」「レーザソー」「グラインダ」「ポリッシャ」「テストハンドラ」「ハンドラ」「ボンダ」を、GLOSSARY §2.1（語末の長音）に合わせた |
| S12 | 20 | `c20-semi-materials` の補足 | 「前工程材料は、全体の約 6 割」は出典の数字から計算した割合（GLOSSARY §5.2 の「独自の数字」に近い）。「後工程材料より規模が大きい」に |
| S13 | 20 | 確認問題 4 | 正答の括弧書き「ティア 2 以降の供給元」は、装置メーカーから見た層と、ファブから見た層を混ぜていた。正答を「装置メーカーに部品を納める供給元」にし、解説で「ファブから見るとティア 2 以降」と分けた |

### 残したもの

| # | 区分 | 章 | 内容 | 理由・推奨 |
|---|---|---|---|---|
| R1 | 中 | 16〜20 | 確認問題が各章 5〜6 問（CHAPTER-BRIEF は 3 問） | 第1部・第2部の R1 と同じ。表示時にシャッフルされ、添字の偏りもないので読者への影響はない。土台担当が方針を決める |
| R2 | 中 | 19 | 日本企業 4 社の事業内容の出典が転載サイト。東京エレクトロンは 2023 年 3 月期 | EDINET の原本、または各社の IR ページ（最新の有価証券報告書・統合報告書）に差し替え、東京エレクトロンは最新期（2026 年 3 月期）で事業区分を確かめ直す。通期売上を足すなら決算短信で確認する |
| R3 | 軽微 | 07・10〜13 | 工程⇔装置対応表の重複（下の「対応表の重複確認」） | 第16〜20章以外は直していない。各章の担当が直す |
| R4 | 軽微 | 17 | リンクのない参照資料が 3 件（MKS『Creating a Vacuum』、Semicorex、SEMI『Top 10 Standards』）。フジキンのリンクは製品情報サイト（イプロス）上の同社ページ。真空の圧力の桁（ドライポンプ・TMP の到達圧力、真空計の方式ごとの範囲）は本文に数値がない | 3 件は個別ページを特定するか、本文の根拠が他の資料で足りるなら外す。圧力の桁を書くなら、真空機器メーカーの技術解説（MKS・Leybold）で範囲を確かめ、出典つきで書く（spec の「数字には出典」を守る） |
| R5 | 軽微 | 16・17 | 米国特許 US 11,521,869・US 5,777,838 の付与日が「未確認」のまま | USPTO の書誌（Patent Center）で付与日を確かめて書くのが望ましい。本文の論旨には影響しない |
| R6 | 軽微 | 18 | ULPA の捕集効率 99.997% は ASHRAE Journal の記事の値で、粒径の記載がない（IEST の推奨基準などでは別の値・粒径で定義される） | 「記事の値」とは書いてあるので誤りではない。必要なら IEST の推奨基準など、定義を持つ団体の資料で粒径つきに書き直す |

## 工程⇔装置対応表の重複確認（第16章が持ち主）

第16章は行を足していない（spec §7.2-8 の割り当てどおりで、重複確認だけを持つ）。第06章は各種別 1 行の代表で、問題なし。第07章・第11章・第16章の間、および関連する章の間で、同じ工程・装置が二度出ている行は次のとおり。ビルドの重複検査は `a`・`b` の文字列の完全一致だけを見るので、検出されていない。

| 重複・食い違い | 行 | 残すべき行（推奨） |
|---|---|---|
| 酸化の炉が 2 行 | 07「熱酸化 → 酸化炉（縦型炉などのバッチ式）」、11「酸化・拡散・アニール（多数枚をまとめて） → 縦型炉（バッチ式）」 | 酸化は第07章の行を残す。第11章の行は `a` を「拡散・アニール（多数枚をまとめて）」にして酸化を外す |
| LPCVD 炉と縦型炉 | 07「CVD → CVD 装置（LPCVD 炉、PECVD 装置など）」、11「縦型炉（バッチ式）」 | 重複ではないが、LPCVD 炉も縦型炉の一種。第07章の行の `note` に「LPCVD 炉は縦型炉の形（第16章）」と添えると、第11章の行と食い違って見えない |
| ウェット処理の装置 | 10「ウェットエッチング → ウェット処理装置（枚葉式・バッチ式）」、13「枚葉式洗浄装置」「ウェットステーション（バッチ式洗浄装置）」 | 洗浄の装置は第13章の行を残す。第10章の行は「ウェットエッチング装置（洗浄装置と同じ枚葉式・バッチ式の形。第13章）」として、装置の種類名を分ける |
| PECVD・PVD が配線でも出る | 07「PECVD 装置」「スパッタ装置（PVD 装置）」、12「PECVD 装置（Low-k 膜用）」「PVD 装置（バリア・シード用）」 | 用途が違うので両方残してよい（12 は `ch: [12, 7]` で第07章を参照済み）。第12章の `b` は「PVD 装置（スパッタ装置。バリア・シード用）」と、第07章の呼び名を併記するとそろう |
| RTP | 11「RTP 装置」のみ | 重複なし。第16章の本文・早見表の説明（枚葉式、秒の桁）と一致 |

## Web で再確認した項目（25 件）

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | SEMI 2026-04-07：2025 年の装置売上 1,351 億米ドル（前年 1,171 億、15% 増）、地域別 7 区分の値と前年比、中国・台湾・韓国で 79%、WWSEMS | 一致 | https://www.semi.org/en/SEMI-Reports-Global-Semiconductor-Equipment-Billings-Reached-135-Billion-in-2025 |
| 2 | SEMI 2026-07-14：2026 年予測 1,659 億米ドル（23.2% 増）、WFE 1,439・テスト 153・組立とパッケージ 67、韓国は HBM を含む先端メモリが支える | 一致。WFE がウェーハ処理・マスク／レチクル・工場設備を含むことを確認（M6） | https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-sales-forecast-to-reach-a-record-229-billion-dollars-in-2028-semi-reports |
| 3 | SEAJ 2026-07-02：2025 年度実績 51,986 億円（9.0%）、2026〜2028 年度予測 65,502・74,017・77,718 億円、定義の文言 | 一致 | https://www.seaj.or.jp/file/july2026seajforecastforpress_j.pdf |
| 4 | SEAJ 2026-01-15：2025 年度見通し 49,111、2026・2027 年度予測 55,004・56,104 億円 | 一致 | https://www.seaj.or.jp/file/jan2026seajforecastforpress_j.pdf |
| 5 | ASML 6-K（2026-01-28）：2025 年の total net sales 32,667 百万ユーロ、受注・受注残の定義 | 一致 | https://www.sec.gov/Archives/edgar/data/937966/000162828026003701/pressreleasefinancialresul.htm |
| 6 | Applied Materials（2026-11-12）：2026 会計年度の売上 34,446 百万米ドル、2026-10-25 終了、「materials engineering solutions」 | 一致 | https://www.sec.gov/Archives/edgar/data/0000006951/000162828026073360/exhibit991q42026earningsre.htm |
| 7 | Lam Research（2026-07-29）：2026 会計年度の売上 23,232,690 千米ドル、2026-06-28 終了 | 一致 | https://www.sec.gov/Archives/edgar/data/0000707549/000070754926000033/lrcx_exhibitx991xq4x2026.htm |
| 8 | KLA（2026-07-28）：2026 会計年度の売上 13,579,476 千米ドル、2026-06-30 終了 | 一致（転載から SEC の 8-K 付属書に差し替え。S3） | https://www.sec.gov/Archives/edgar/data/0000319201/000031920126000024/exhibit991earningsrelease7.htm |
| 9 | SEMI 2026-05-12：材料 732 億米ドル（6.8%）、前工程 458（5.4%）、後工程 274（9.3%）、台湾 217（16 年連続）・中国 156・韓国 112、伸びた材料 | 一致 | https://www.semi.org/en/semi-press-release/global-semiconductor-materials-market-revenue-reaches-record-73.2-billion-dollars-in-2025-semi-reports |
| 10 | 経済産業省 令和 7 年 12 月 23 日：素材は日本企業が引き続き高いシェア、競争環境が変わる分野は注視、装置は 2021〜2023 年に縮小（露光・薄膜形成・エッチングで顕著）、元データは富士経済とグローバルネット | 一致 | https://www.meti.go.jp/policy/mono_info_service/joho/conference/semicon_digital/0014/handeji14-3.pdf |
| 11 | ISO 14644-1：第 2 版、2015-12、2021 年に見直して現行、0.1〜5 μm、光散乱式の粒子計数器 | 一致 | https://www.iso.org/standard/53394.html |
| 12 | ISO 14644-1:2015 の 3.3（as-built・at-rest・operational）と表 1・脚注 | 表 1 は本文の表と一致。状態の定義に合わせて説明を直した（M5） | https://cdn.standards.iteh.ai/samples/53394/b5d9892aab0b4683bfb17888f661d555/ISO-14644-1-2015.pdf |
| 13 | ASHRAE Journal 2021-09：HEPA 99.97%・ULPA 99.997%、ISO 1〜5 の一方向流で 250〜600 回/時、天井給気・床還気、ISO 3〜5 がウェーハ・チップの環境でよく指定、粒子の発生源 | 一致（効率に粒径の記載なし。R6） | https://www.ashrae.org/file%20library/technical%20resources/ashrae%20journal/2021journaldocuments/sep2021_46-51_ieq_sun.pdf |
| 14 | MKS 超純水：用途、RO・イオン交換・UF・UV・脱気、2015 年 ITRS の 18.0 MΩ·cm 超（25 °C）、TOC 1.0 ppb 未満 | 一致（理論上の上限 18.25 は温度の記載なし。S6） | https://www.mks.com/n/semiconductor-ultrapure-water |
| 15 | Applied Materials Endura：最大 9 室、うち 2 室が自然酸化膜を除く前洗浄 | 一致 | https://www.appliedmaterials.com/us/en/product-library/endura-pvd.html |
| 16 | Lam Research 2024-07-31：Lam Cryo 3.0 は Vantex に統合でき、Flex は HAR 誘電体エッチング装置、NAND の製造で使われる HAR 誘電体エッチングの処理室は 7,500 超 | 一致（Nasdaq 掲載の配信） | https://www.nasdaq.com/press-release/lam-research-introduces-lam-cryotm-30-cryogenic-etch-technology-accelerate-scaling-3d |
| 17 | SEMI E10：E10-0422 が Current、重ならない 6 つの基本状態、計画外停止が故障の状態 | 一致 | https://store-us.semi.org/products/e01000-semi-e10-specification-for-definition-and-measurement-of-equipment-reliability-availability-and-maintainability-ram-and-utilization |
| 18 | INFICON：利用率＝生産時間 ÷（生産＋待機）、可用性＝1 − 停止の割合 | 一致 | https://www.inficon.com/ko/소식/tracking-the-right-equipment-reliability-metrics |
| 19 | 荏原製作所：ドライ真空ポンプは無給油、大気圧から高真空まで、反応生成物向けの機種 | 一致（到達圧力の数値の記載なし。S5・R4） | https://ebara.com/global-en/precision/dry-vacuum-pump/ |
| 20 | Advanced Energy NavX：1〜60 MHz、反射電力の低減、パルス運転、eVerest との同期 | 一致。用途にチャンバクリーンの記載なし（S4） | https://www.advancedenergy.com/en-us/products/plasma-power-products/rf-match-networks/navx/ |
| 21 | LAUDA Semistat：−20〜90 °C、安定性 ±0.1 K、プラズマエッチング用 | 一致 | https://www.lauda.de/en/constant-temperature-equipment/thermostats/umwaelz-prozessthermostate/semistat |
| 22 | Leybold：TMP の背圧用ポンプは 5〜10 mbar から大気圧まで圧縮する（TMP は大気圧へ直接は排気しない） | 一致（「排気できない」は明言ではなく、背圧用ポンプの役割として説明） | https://www.leybold.com/en/knowledge/vacuum-fundamentals/vacuum-generation/how-does-a-turbomolecular-pump-work |
| 23 | SCREEN SU-3100：300 mm の枚葉式洗浄装置、最大 8 室、最大 300 枚/時 | 一致 | https://www.screen.co.jp/spe/en/products/su-3100 |
| 24 | ASML：EUV の光路は光源からウェーハまで高真空、空気にも吸収される、ウェーハはエアロック経由 | 一致 | https://www.asml.com/products/euv-lithography-systems |
| 25 | 東京エレクトロンの製品一覧：Episode 1（最大 8 モジュール）、Episode UL、TELINDY PLUS、NT333（セミバッチ ALD）、Triase+、LITHIUS Pro Z・DICE（High-NA を含む EUV）、CELLESTA-i、EXPEDIUS-i、Prexa（KGD）、Synapse Si（融着・Cu ハイブリッド）・V・Z Plus | 一致（個別ページに差し替え。S1） | https://www.tel.com/product/ |

リンクの差し替えのために確認したもの：アドバンテストの製品区分（SoC・メモリ・パワーのテスト、テストハンドラー、プローバー、CD-SEM。S2）、第17章の参照資料 13 件の個別ページ（M4。検索結果で URL を確認し、本文の記述との照合は上の 19〜22 の 4 件だけ）。

**再確認できず**：なし（取得に失敗した資料はない）。

**件数の上限のため開いていないもの**：NVIDIA・Amkor の Form 10-K、TSMC の専業ファウンドリのページ、Lam Research の 10-K の収益認識の記述、東京エレクトロン・SCREEN・ディスコ・アドバンテストの有価証券報告書（R2）、SEMI E15.1・S2（S2-0724E）の規格ページ、KOKUSAI ELECTRIC・キヤノン・日立ハイテク・ASM International の製品ページ、Applied Materials の VIISta 900XP（500 枚/時）・Vantage Radiance Plus、Yaskawa Europe Technology、Brooks Automation、US 11,521,869・US 5,777,838、OPC Foundation・Critical Manufacturing・Kontron AIS、SEMI の E30 解説、MKS の真空計・MFC・用役の解説、HORIBA、フジキン、フェローテック、CoorsTek、Merck、Semicorex、Kuehne+Nagel、村田機械、荏原製作所の除害装置、Tata Consulting Engineers、ABM、JE Dunn、cleanroom.net。

**報道・転載だけが根拠の項目**：Lam Cryo 3.0（Nasdaq 掲載の PR Newswire 配信。本文に明記済み）。日本企業 4 社の事業内容（転載サイトのテキスト。R2）。KLA は SEC の原本に差し替えたので外れた。

## 表現と用語

- 文は短く、です・ます調でそろっている。原文をなぞった長い引用はない（引用は製品名・資料の語句の短い引用だけ）。
- 優劣の評価・投資の推奨・銘柄の評価と読める記述はない。第19章の冒頭に §7.4 の定型文、企業の表と売上の表に「順位・優劣・比較ではない」の断り、SEMI・SEAJ の予測に「予測で、将来を保証しない」がある。「予測が大きく上に見直された」は事実の記述で、評価ではない。
- 用語集は §8 の割り当てどおり（ビルド検査も 0 件）。第19章は `IDM`・`OSAT` などを登録している（§8 の第19章の行）。
- 章の間の食い違いは M1（社名の表記）と M3（章の参照）で、どちらも直した。第08章（EUV の波長・NA は書かない）、第10章（エッチングの最小構成）、第11章（RTP・縦型炉）、第13章（CD-SEM・ウェットステーション）、第14章（プローバー・ハンドラー）と、第16章の説明に食い違いはない。第18章のクリーン度の数値は、spec §7.3 の持ち主の章として第18章だけが書いている。
- 第16章の早見表・本文は「企業名は公開資料にある例で、シェアは書かない」を守っている。

## 公開の判断

小さな修正を入れた現状で、第3部は公開してよい水準です。数字と企業の記述は一次資料とすべて一致し、重大な誤りはありませんでした。公開前の注意は 3 点です。(1) 第19章の日本企業の事業内容を、EDINET の原本か各社の IR ページの最新版で確かめ直すこと（R2）。(2) 工程⇔装置対応表の重複を、第07・10・11・12章の担当が上の推奨どおりに整理すること（R3）。(3) 第17章のリンクのない参照資料 3 件を、個別ページにするか外すこと（R4）。
