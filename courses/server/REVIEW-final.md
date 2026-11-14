# 公開前の最終仕上げの記録（全32章）

- 作業日：2026-11-14（確認日はすべて同日）
- 対象：`chapters/`、`data/`、`facts/`、`course.json`、`spec.md`、`GLOSSARY-RULES.md`、公開設定 `server-publish.json`
- 検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/server --check` → エラー 0、警告 0（章 32/32）。`grep -rn '要確認' chapters data facts` は 0 件
- 公開版の検査：`test.py --publish server-publish.json`（1366px・375px、ダーク・ライト）→ 最終行は下の「5. 検査の結果」
- 件数の上限があったため、WebSearch は必要な所だけ使い、事実確認表や公式サイトの個別ページを WebFetch で直接開いた。個別ページを開けなかったものは書いていない

## 1. 直した項目

| # | 章 | 内容 | 結果と根拠（URL） |
|---|---|---|---|
| 1 | 11・15・16・18 | ラック電力密度の調査値 | 第11章に「ラック電力密度の調査値」の節を追加。Uptime Institute『Data Center Capacity Growth Trends: Findings from the 2026 Global Data Center Survey』（調査 2026-03-17〜05-01、報告書は 2026 年 8 月、所有者・運営者 801 件の回答、本問は n=679）。最も多い（最頻の）ラック密度は 10 kW 未満 69%、10〜19 kW 20%、20〜49 kW 8%、50 kW 以上 3%。平均値と「ラック全体の割合」ではないことを本文に明記。「調査値を載せていません」の文を直し、表 `c11-budget` の注記も更新。第15・16・18章の「第11章が持つ」という参照は、実態と合ったので文言は変更なし。https://datacenter.uptimeinstitute.com/rs/711-RIA-145/images/2026%20Annual%20Survey%20Data%20Center%20Growth%20v6.pdf?version=0 |
| 2a | 08 | 現行世代の例 | 表 `c08-accel` に NVIDIA HGX B200／B300（GPU 8 個のベースボード、GPU 間 1.8 TB/s・合計 14.4 TB/s、メモリ合計 1.4 TB／2.1 TB、電力の記載なし、ページ更新 2026-09-30）と AMD Instinct MI355X（OAM、HBM3E 288 GB、最大 TBP 1400 W〔資料は TDP とは書かず MAXIMUM TBP〕、Infinity Fabric 7 本×144 GB/s、© 2026）を追加。優劣の評価はしない。「例は、執筆時に各社の公式ページで確認できたものに限る」を表の注記と本文に明記。https://www.nvidia.com/en-us/data-center/hgx/ ／ https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/product-briefs/amd-instinct-mi355x-gpu-brochure.pdf |
| 2b | 10 | 他社の例 | 表 `c10-eth` に Broadcom Tomahawk 6（BCM78910、スイッチ用チップ、102.4 Tb/s、構成の例 64×1.6 TbE ほか、SerDes 106.25G/212.5G PAM4）を追加（スイッチの箱ではなくチップと明記）。Broadcom の本社が米国であることは発表（2025-06-03、Palo Alto）で確認。https://www.broadcom.com/products/ethernet-connectivity/switching/strataxgs/bcm78910-series |
| 2c | 11 | 他社の例 | 表 `c11-budget` と本文に AMD Helios（72 GPU、HBM4 最大 31 TB、スケールアップ帯域 最大 260 TB/s〔AMD の計算、2026-06〕、Open Rack Wide、液冷、ラック電力の記載なし、ページ更新 2026-11-12）を追加。「同じ条件の比較ではない」と明記。https://www.amd.com/en/products/rackscale-solutions/helios.html |
| 3a | 26 | 本社の「未確認」6 行 | すべて埋めた。Foxconn：台湾（新北市。公式ページ下部の住所表示。ページは「本社」の語を使わないと注記）／Wistron：台湾（公式ページ「Headquarters in Taiwan」、都市の記載なし）／TSMC：台湾（新竹。Form 20-F 2025 の表紙）／Samsung Electronics：韓国（京畿道水原市。Business Report 2025）／SK hynix：韓国（京畿道利川市。公式ページの本社の住所）／Micron：米国（アイダホ州ボイシ。Form 10-K 2025 の表紙）。SK hynix と Micron は 1 行を 2 行に分けた。本文と注記の「未確認」の言い方も直した。https://www.foxconn.com/en-us/about/group-profile ／ https://www.wistron.com/en/AboutWistron/CompanyProfile ／ https://investor.tsmc.com/sites/ir/sec-filings/2025_20F%20Report.pdf ／ https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2025_4Q_Interim_Report.pdf ／ https://www.skhynix.com/company/UI-FR-CP02/ ／ https://www.sec.gov/Archives/edgar/data/723125/000072312525000040/202510karscopy.pdf |
| 3b | 30 | 各国の産業支援 | 米国：大統領令 14318（2025-07-23 署名、2025-07-28 掲載、90 FR 35385。AI 目的で 100 MW を超える新規負荷の施設の許認可と資金面の支援）を追加。改正の有無・現在の状況は未確認と明記。韓国：科学技術情報通信部の発表（国家 AI 委員会 2025-02-20、先端 GPU を 2026 年上半期までに 1 万 8,000 個）を計画の段階として追加。中国と台湾は当局の個別ページを確認できず、「本章では扱っていない」と明記（半導体の支援は半導体講義 第30章へリンク）。https://www.federalregister.gov/documents/2025/07/28/2025-14212/accelerating-federal-permitting-of-data-center-infrastructure ／ https://www.msit.go.kr/eng/bbs/view.do?sCode=eng&mId=4&mPid=2&bbsSeqNo=42&nttSeqNo=1092 |
| 3c | 30 | 変わりやすい記述の再確認（確認日 2026-11-14） | ドイツ：連邦議会のページ（印刷 2026-11-14）は、政府案 21/8027 の第一読会 2026-09-24、公聴会 2026-10-05 まで。委員会報告・採決の記載なし → 「成立は確認できていない」のまま、確認日を本文に追記（https://www.bundestag.de/dokumente/textarchiv/2026/kw41-pa-wirtschaft-energieeffizienzrichtlinie-1218082 、https://www.bundestag.de/presse/hib/kurzmeldungen-1222572）。EU：欧州委員会のページに変更なし（格付け制度の提案 2026-09-21、最低性能基準の意見募集 2026-09-21〜12-14、提案の公表は 2027 年第 2 四半期の予定、採択の記載なし。https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive/energy-performance-data-centres_en ）。米国 BIS：Federal Register の検索で 2026-07-14 の UAE の規則より新しい EAR の先端計算の最終規則は見つからなかった（検索 1 回の範囲。2026-10-26 掲載の財務省の対外投資規則案は輸出管理ではないので載せない） |
| 4a | 18・32 | 旧社名の表記 | 第18章の初出を「NTT コミュニケーションズ（日本。2025 年 7 月 1 日に NTT ドコモビジネスへ社名変更）」に、第32章の参照資料の一覧 3 行を「（日本。現 NTT ドコモビジネス）」「（現 NTT ドコモビジネス）」に直し、第14・18章と同じ書き方にした。`spec.md` §8.7 に NTT コミュニケーションズの行を追加 |
| 4b | 02・10・17・18・01・05 | 参照資料のリンクの欠け・上位ページ | リンクの機械的な数え上げを再実行し、残っていた分を処理。`?p=` 形式の固定リンク 4 件：UEC（第10章）と Stockholm Data Parks（第17章）は個別ページの URL に差し替え（ultraethernet.org/ultra-ethernet-consortium-uec-launches-specification-1-0-transforming-ethernet-for-ai-and-hpc-at-scale/ 、stockholmdataparks.com/2018/03/12/digiplex-data-center-heat-10000-stockholm-households/）。NVM Express（第02章）と TIA（第18章）は正規の URL を取得できなかったので、「?p=形式の固定リンクで、発表の個別ページ」と注記。リンクのない教科書の行 3 件（第01・02・05章）は「書籍（版・刊行年は確認していません。個別ページへのリンクはありません）」と注記 |
| 5a | 19〜25 | 「この章で分かること」の略語 | 囲み・前提・「確認できた範囲」の囲みで、略語が正式名より先に出る箇所を直した（BMC、IPMI、URI、NIC、DMTF、UEFI、PXE、CMDB、ITIL、RMA、SBOM、RoT、BACnet・Modbus・SNMP、BMS・EPMS・DCIM、DVFS、CDU、UPS など。初出で正式名と日本語の説明）。前提の行の「BMC と Redfish」は「基板管理コントローラ〔BMC〕と Redfish」に（章の題名そのものは変更していない） |
| 5b | 19〜25 | 一般的な略語 | 付録の用語集ではなく、章の初出で短く説明する形に統一：HTTP・TLS・JSON（第19章）、DHCP・TFTP・DNS・HTTPS・TCP（第20章）、SSH・API（第21章）、HPC・QOS・SSD・GPU（第22章）、SSE・CMDB（第23章）、HTTP・TLS・TFTP・SSD（第25章） |
| 5c | 19・20 | 同じ略語の 2 つの意味 | POST：第19章は「HTTP の操作の名前」、第20章は「電源投入時の自己診断（Power-On Self-Test）」と、初出で互いに書き分けた。第20章の用語集 `POST` と第19章のデータの説明も合わせた |
| 5d | 24 | 注意書きの囲み | §9.3「電気」の定型文の囲みを、定型の段落だけにし、追加の段落（制御の変更は手順と権限に従う）は別の囲み「この章の扱い（制御の変更）」に分けた |
| 6a | 11・GLOSSARY-RULES | 用語集の割り当て | 第11章が登録している「ファブリック」（本文で説明している）を割り当て表に追加。割り当てにあって本文で扱わない「バックエンドネットワーク」「参照アーキテクチャ」は登録しないことにし、表から外して理由を注記（参照アーキテクチャは個別ページを確認できず書いていない） |
| 6b | course.json | 学習ルート A・C に第10章がない | 第11章の前提に第10章があるのに、入口の一文だけでは足りないと判断し、ルート A・C に第10章を加えた（A：16 章、約 10 時間。C：20 章、約 12 時間）。「ルート A・C には第10章が入っていません」の一文は削除 |
| 7a | 14・32 | 直流給電の IEC 規格 | IEC webstore で、直流のプラグ・ソケットの技術仕様を確認して追記：IEC TS 62735-1:2015（2015-08-28、2.6 kW、294〜400 V DC）、IEC TS 62735-2:2016（2016-12-14、5.2 kW）、IEC TS 63236-1:2021（2021-06-25、アプライアンスカプラ 2.6 kW）。いずれも接続口の仕様で、給電のインタフェース全体の規格ではないと明記。https://webstore.iec.ch/en/publication/23188 ／ https://webstore.iec.ch/en/publication/27246 ／ https://webstore.iec.ch/en/publication/63765 |
| 7b | 19 | 管理インターフェースの規格の最新版 | DMTF の版の一覧（https://www.dmtf.org/dsp/DSP0266）：DSP0266 の最新は 1.24.0（一覧の日付 2026-05-17。PDF の表紙は 2026-04-02）。本文は 1.23.0 に基づく記述のまま、最新が 1.24.0 であること、1.24.0 での変更点は未確認であることを明記し、参照資料に版の一覧を追加 |
| 8a | 16 | PFAS の和名 | 環境省の FAQ（https://www.env.go.jp/water/pfas/faq.html）の表記「ペルフルオロアルキル化合物及びポリフルオロアルキル化合物」に直し、参照資料に追加（旧：…物質） |
| 8b | 32 | 地図「データの保護」の箱 | 関連章から第29章を外し、第30章だけにした（REVIEW-part5 R5） |

## 2. 確認したが、書き換えなかった項目

| 章 | 内容 | 理由 |
|---|---|---|
| 12 | 電気設備に関する技術基準を定める省令 第2条の条文本文 | e-Gov 法令検索は、この環境の許可の範囲で取得できなかった。経済産業省の解説（令和7年11月）を再度開いたが、第2条の解説のみで条文本文は載っていない。数値（低圧は直流 750 V・交流 600 V、高圧は直流・交流とも 7,000 V）は解説から読み取れ、現在の記述と一致。本文の書き方（確認できた範囲と時点を明記）のまま |
| 13・18 | 消火設備の法令の最新の状況 | 今回は個別ページを開いていない（REVIEW-part3 の確認結果〔2023-05-31 の蓄電池設備の見直し、2022-09-14 の二酸化炭素消火設備の改正、平成8年の通知〕のまま）。本文は時点つきで書かれている |
| 30 | ドイツ EnEfG の改正、EU の格付け、米国 BIS の規則 | 3c のとおり再確認し、変化なし |
| 27 | GX 戦略地域の選定の流れ（REVIEW-part5 R4） | 今回は再確認していない。本文は 2025-11 の「案」として書かれている |

## 3. 直さずに残した点

| 章 | 内容 | 理由・推奨 |
|---|---|---|
| 12 | 電技省令 第2条の条文本文（上の 2） | e-Gov を開ける環境で一度確かめると確実 |
| 13・18 | 消火設備の法令の最新の状況 | 公開後に定期的に消防庁のページで確認する |
| 27 | GX 戦略地域の選定の流れ | 同上 |
| 30 | 中国・台湾の産業支援。米国・韓国は 1 件ずつだけ | 当局の個別ページを確認できなかった。本文に「扱っていない」と明記済み。米国 BIS の AI 拡散規則の正式な撤回の規則（R2）も未確認 |
| 30 | 米国の大統領令 14318 の改正の有無、韓国の GPU 確保の目標の達成状況 | 計画・発出時点の記述として書いている |
| 19 | DSP0266 1.24.0 での変更点 | 本文は 1.23.0 の確認内容。1.24.0 の全文は読んでいない |
| 29 | 企業会計基準第34号の適用時期（R3）、第22章の GPU 分割の企業固有の呼称（R4）、第23章のポストモーテムの公開出典（R3）、第24章の Modbus の PDF 本体（R7） | 個別ページを確認できないまま。本文は「確認していない」と明記している |
| 01・03・04・05・09 | 執筆時に確認できなかった規格の版（ISO/IEC 2382、EIA-310 の現行版、OCI の仕様、IEC 60050-192、NVMe の現行版、E3.S の「2T」ほか） | 本文は確認していないと断っている（REVIEW-part1-2 R6） |
| 07・10 | PCIe 5.0 の仕様公開の時期（R3）、LPO・QSFP-DD・OSFP の MSA の版（R5） | 同上 |
| 32 | 参照資料の一覧の重複（同じ資料が章ごとに別の行。R7） | 各章の表から機械的に作った結果で、誤りではない |
| 24 | 章の題名（front matter とナビ）に BMS・DCIM の略語が残る | 見出しの略語の規則（§3.1-4）に照らすと直すべきだが、題名の変更は course.json と目次の全体に及ぶので残した。本文の初出は正式名つき |
| 全般 | 参照資料の「一般知識」の行（リンクなし）が多数 | 教科書的な一般知識の行で、数値を使わない。リンクの欠けではなく、種類を明示している |
| 全般 | 公開後に章ごとの検証日が古くなる | 製品・制度は変わりやすい。公開から時間が経ったら、第08・10・11・19・30章を優先して再確認する |

## 4. 公開設定

- `server-publish.json` を `"chapters": "01-32"`、`"hero_status": "全32章を公開中です。"` に変更。仮の付録（A1）の設定は外した（第32章が本物の付録）
- フッターは「© TTJ」のみ。半導体講義への相互参照は `../semi/#ch15`（第08章）、`../semi/#ch19`・`../semi/#ch20`（第26章）、`../semi/#ch30`（第30章）で、ショーケースの `semi/index.html` の章（`id="ch15"` など）が開く。作者名は出力に 0 件

## 5. 検査の結果

- `python3 -I /home/claude/courses/_framework/test.py /home/claude/courses/server --publish /home/claude/courses/server-publish.json`（1366px・375px、ダーク・ライト、全 32 章）→ 最終行 `結果: PASS 4604 / FAIL 0`
- 途中で見つけて直した不具合（検査が 2 回、FAIL 1 で中断）：確認問題の `ch`（関連章）が、数値 1 つを想定する所に配列で書かれていた。2 つ以上の配列だと、章へのリンクが「#ch,7」「#ch,5」のような壊れた形になり、検査が止まった。第06・08・15・16・17・24章の確認問題の `ch: [n]` と、第19・21・22・25章の複数の章を持つ `ch: [a, b]` を、章の番号 1 つ（その章の番号。第06章は 6、第08章は 8）に直した。表示される章チップは、その章への 1 つになる（複数の関連章の表示は減る）
- 出力とリポジトリの作者名検査：作者名の指定語の検索（出力 `showcase/server/index.html`、`showcase/index.html`、`README.md`、`courses/`）→ 該当なし
