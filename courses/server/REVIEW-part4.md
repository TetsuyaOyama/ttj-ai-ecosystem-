# 第4部（第19〜25章）技術検証の記録

- 検証日：2026-11-14
- 対象：`chapters/19〜25-*.html`、`data/19〜25-*.js`、`facts/19〜25-*.md`（ほかの章と course.json は触っていない）
- 修正前の控え：`/tmp/sv-review-4/orig/chapters`、`/tmp/sv-review-4/orig/data`、`/tmp/sv-review-4/orig/facts`
- 修正後の検査：`python3 -I /home/claude/courses/_framework/build.py /home/claude/courses/server --check` → `OK (check only) 章 32/32 公開, データ 153 件 … 0 warnings`。`grep -rn '要確認' chapters data` は 0 件
- 変更したファイル：第20・21・23・24・25章の HTML とデータ、第20・23・24・25章の事実確認表（第19・22章は変更なし）

## 件数

| 区分 | 件数 | 直した | 残した |
|---|---|---|---|
| 重大 | 0 | 0 | 0 |
| 中 | 7 | 6 | 1 |
| 軽微 | 18 | 12 | 6 |
| 合計 | 25 | 18 | 7 |

帯域外管理（データの道と別の経路、待機電力で動く BMC）、IPMI（命令・イベント・記録の形を決めた規格。SEL・SDR・FRU・SOL・RMCP+）と Redfish（HTTP/1.1・TLS・JSON・OData、必須の GET/POST/PATCH/DELETE と任意の PUT/HEAD/OPTIONS、サービスルート、PowerState と ResetType）、UEFI・PI の段階（SEC・PEI・DXE・BDS）、PXE と HTTP ブート、Redfish の UpdateService と更新の順序の扱い、セキュアブートの鍵の階層（PK → KEK → db・dbx。dbx が db に優先）、宣言的・手続き的と冪等性、プロビジョニングと資産の状態、Slurm の役割・状態名・多要素の優先度（9 要素）・フェアシェア・バックフィル・トポロジの配置、Kubernetes のデバイスプラグインと DRA、メトリクス・ログ・トレースの使い分け、切り分けの順序、インシデント対応、BMS・EPMS・DCIM の層、BACnet・Modbus TCP・SNMP（STD 62）の位置と層、制御ループの遅れとハンチング、パワーキャッピング・DVFS・スケジューラとの連携、デマンドレスポンス、RoT・計測ブート・アテステーション（ナンス）・SBOM・TEE の説明に、本質的な誤りはありませんでした。

図（arch 2 本〔ビューは 3・3〕、seq 6、state 3、flow 3、compare 3、ident 1〔3 例〕、table 3、drill 2〔8・6 ケース〕、stack 1〔3 本〕、tree 1〔2 本〕）と、確認問題 21 問・総合テスト 7 問の正答と解説を全件確認しました。正答の添字は §8.5 の式どおり（第19章 3・0・1／総合 1 … 第25章 1・2・3／総合 3）で、正答が 2 つになる問題はありません。演習の答え（第19章の CPU1、第20章の BMC → UEFI → NIC、第22章のバックフィルはジョブ D だけ、第23章 8 ケース、第24章 6 ケース、第25章の (ア)(イ)(ウ)）も、条件から一意に決まります。第21章の演習は答えは正しいが、解説に矛盾がありました（M6）。

**守るべき線**：第25章は守る側の仕組み（層の整理、信頼の連鎖、鍵の役割、分離・認証・更新、SBOM）の説明にとどまり、攻撃の手順・悪用の方法・弱点の具体名はありません。脅威の表も「脅威の種類」と「対策の考え方」だけです。コマンド・設定の例は、第19章の Redfish の GET と架空の JSON 応答（3 件、値は架空）だけで、最小限です。第24章は設定値・調整の手順を示さず、変更は手順と権限に従う旨を書いています。

## 指摘の一覧

### 重大

なし。

### 中

| # | 章 | 箇所 | 内容と根拠 | 対応 |
|---|---|---|---|---|
| M1 | 24 | 通信の方式の表、参照資料 | ISO 16484-5 を「2022 年の第7版を確認。現行の版は確認できなかった」としていた。ISO の公開ページでは ISO 16484-5:2026（第 8 版、2026 年 8 月、ISO/TC 205）が公開済み。また「ASHRAE は BACnet が EN ISO 16484-5 でもあると述べる」は、典拠の ASHRAE のページの URL が無く、再確認できなかった | 直した（表を「ISO の規格としては ISO 16484-5（2026 年版が第 8 版）」に。ASHRAE の発言としての記述は外した。イーサネットと MS/TP の規定は「2022 年版で確認」と明記。参照資料に 2026 年版と 2022 年版の ISO のページを付けた） |
| M2 | 24 | 参照資料 | 4 件（ASHRAE 135-2024、ISO 16484-5、Modbus の実装ガイド、Google の記事）に個別ページの URL がなかった（spec §8.3） | 直した（4 件とも URL を付けた。ASHRAE は有料の規格で販売ページの URL を確認できず、ASHRAE の訂正の要約〔2026-06-29、取得して確認〕と BACnet 委員会の告知にリンクし、その旨を注記。Modbus は Modbus Organization の仕様のページ〔「Modbus TCP/IP」の項〕。事実確認表の URL 欄も更新） |
| M3 | 24 | 演習 `c24-drill` のケース 2 の解説 | A 系 92%・B 系 58% の偏りに「負荷を PDU-B 側へ寄せる」としていた。2 系統で受ける構成では、片側が止まるともう片側が全部を受けるので、片側へ寄せるのは冗長の考え方（第05章）と食い違う | 直した（「機器の負荷と台数、つなぎ方を見直す。2 系統で受ける構成では、片側が止まったときに、もう片側が全部を受けられるかも確かめる（第05章、第14章）」に。正答〔1 本のラック・IT の運用者〕は変わらない） |
| M4 | 25 | 本文 | spec §3 の部品「`table`（脅威と対策の早見表）」の `c25-threat` がデータにあるのに、本文に置かれていなかった（ビルドは未使用のデータを警告しない） | 直した（「供給網と SBOM」の節に、「攻撃の手順ではなく、守る側の整理」の 1 文を添えて置いた） |
| M5 | 25 | 章のメタ | 題が「セキュリティの基礎：信頼の起点から供給網まで」、トラックが「運用」。course.json と spec §2・§3 は「セキュリティの基礎：物理・ファームウェア・供給網」「管理」 | 直した（course.json に合わせた） |
| M6 | 21 | 演習の解説 | 「冪等な作りなら 100 台へ適用し直しても 97 台には何も起きない」と書いた直後に、(ア) を「必要のない範囲へ変更を広げる」としていた。本文の冪等性の説明と矛盾する | 直した（「(ア) も結果は同じになりえるが、影響の評価と承認の範囲が 100 台に広がる。原因の分かっている 3 台に絞るほうが、最初の対応として小さく確かめやすい」に。正答〔(イ)〕は変わらない） |
| M7 | 19〜25 | 「この章で分かること」「前提」と本文 | 略語が、章の冒頭の囲みで英語併記より先に出る（BMC・IPMI・PXE・CMDB・SBOM・TPM など。本文の初出では併記がある）。TFTP・DHCP・TLS・JSON・HTTP・SSH・NIC・SSD・GPU は章の中で英語併記がない（GLOSSARY §3.1-1・3） | 残した（R1） |

### 軽微（直したもの）

| # | 章 | 箇所 | 内容 |
|---|---|---|---|
| S1 | 20 | ファームウェアの種類、用語集の UEFI | 「UEFI ファームウェア：従来は BIOS と呼ばれた」は、UEFI と BIOS を同じものと読める（同じ章の「つまずきやすい点」と食い違う）。「従来の BIOS に代わるもの（製品の画面では『BIOS』の名前が残ることがある）」に |
| S2 | 25 | TPM の説明、`c25-seq`、用語集の TPM | 「測定値は書き換えられず、足せるだけ」は言い過ぎ（記録は電源を入れ直すと初期化される）。「電源を入れ直すまでの間」「起動の間」を補った |
| S3 | 25 | `c25-chain` の BMC の段 | 「確かめる対象」が「自分の次に動かすコード」で、図の辺（BMC → UEFI）と食い違っていた。「UEFI ファームウェア（製品による。BMC や別の起点が確かめる設計がある）」に |
| S4 | 20・21・23・25 | 図の `kind` | spec §6.2 の意味から外れた色を使っていた（工程の「更新」「復旧」に `ims`〔熱・冷却〕、「試験」「影響の把握」に `core`〔記憶〕、`c23-seq` の運用者に `ext`・BMC に `ue`・保守業者に `core`・メーカーに `db`、`c25-seq` の TPM に `core`・運用者に `ext`）。管理の工程・主体は `pol`、外部の主体は `ext` に（計 18 か所） |
| S5 | 21・23・24 | 表記 | 「受け入れ」→「受入」（4 か所、GLOSSARY §2.2）、「帯域の使用率」→「帯域幅の使用率」（§2.3）、「ブランクパネル」→「ブランキングパネル」（2 か所、§2.1）、「ブレーカ」→「遮断器」（第12章の用語）、架空のログの「（AC lost）」を削除（§3.3 の AC）、「92 %」「90 %」「58 %」→「92%」など（§5.1）、「バッテリー運転」→「蓄電池運転」（3 か所、第13章の用語） |
| S6 | 24 | 用語集 | `d` に数字（Modbus の「TCP のポートは 502」、SNMP の「RFC 3411〜3418（STD 62）」、BACnet の「規格 135」）が入っていた（GLOSSARY §7）。数字を外し、規格番号は `alias` に。BMS の `alias` に割り当て表の「中央監視」を足した |
| S7 | 24 | 施設の監視制御の層 | UPS・PDU・CRAH・CDU に章の中で英語併記がなかった。本文の初出に併記（PDU は §3.3 に合わせ「ラック PDU」）。図 `c24-layers` の PDU のラベルも「ラック PDU」に |
| S8 | 24 | 出典の書式 | 本文の 2 か所（DSP8010、Modbus の実装ガイド）に「出典：」が無かった。参照資料の見出しの「アクセス日」を他章と同じ「確認日」に |
| S9 | 24 | デマンドレスポンスの節 | 「米国の複数の電力事業者」を記事どおり「2 つ」に。「まだ初期の段階」に「使えるのは一部の場所だけ」を補い、出典の資料名を本文に書いた |
| S10 | 25 | ファームウェアの回復力（検証項目 4） | 「保護・検知・回復」の代表的な指針の名称が無かった。NIST の公開ページで確認できた範囲で 1 文補った（SP 800-193『Platform Firmware Resiliency Guidelines』、2018 年 5 月、Final）。用語集の `en` を割り当て表どおり `platform firmware resiliency` にし、`alias` に「NIST SP 800-193」。参照資料と事実確認表（#6）に追加 |
| S11 | 23 | メトリクス・ログ・トレース（検証項目 4） | 可観測性の標準の位置づけが無く、割り当て表の用語「OpenTelemetry」が未登録だった。公式文書で確認できた範囲で 1 段落補った（テレメトリを作り・送り・集める、製品に依存しない枠組み、バックエンドではない、CNCF のプロジェクト、OpenTracing と OpenCensus の統合）。用語集に登録、参照資料と事実確認表（#4）に追加。育成段階は書いていない |
| S12 | 20・23・24・25 | 事実確認表 | 上の修正に合わせて、URL・確認結果・「確認できず書かなかった」の記述を更新（第20章は SP 800-193 を第25章で補った旨を追記） |

### 残したもの

| # | 区分 | 章 | 内容 | 理由・推奨 |
|---|---|---|---|---|
| R1 | 中 | 19〜25 | M7（冒頭の囲みの略語、一般的な通信の略語の英語併記なし） | 7 章にまたがる書き換えで、小さな修正の範囲を超える。冒頭の囲みを日本語の言い換え中心にするか、§3.1 の「章ごとの初出」を本文の初出と読むかを土台担当が決め、一般的な略語（HTTP・TLS・JSON・DHCP・TFTP・SSH）を GLOSSARY §3 の対象にするかも決める |
| R2 | 軽微 | 24 | 冒頭の §9.3「電気」の定型文の囲みの中に、2 段落目（制御の設定値の変更は手順と権限に従う）を足している。§9.3 は「文言を変えずに使う」 | 内容は spec §3 第24章の注意書きの指示（制御の変更は手順と権限に従う）に沿う。定型の囲みと別の囲みに分けるかを土台担当が判断する |
| R3 | 軽微 | 23 | ポストモーテム（個人を責めない）の公開出典（Google の SRE 書籍）を再確認できず（取得の許可がない URL）。本文は考え方として一般化し、出典名を挙げていない | 公開前に SRE 書籍の該当章を確認できれば、参照資料に 1 行足す |
| R4 | 軽微 | 22 | GPU の分割の企業固有の呼称（GLOSSARY の割り当てでは `alias` に「MIG（NVIDIA の呼称）」）を、未確認のため書いていない | NVIDIA の公式文書で確認できれば、`c22` の用語集の `alias` と本文に「NVIDIA の呼称」として足す |
| R5 | 軽微 | 21 | ITIL 4 の change enablement の出典が PeopleCert の研修案内ページ（一次 △） | ITIL の本体は有料。現状の書き方（研修ページの公開説明、本体は読んでいない）で誤りはない |
| R6 | 軽微 | 19 | DMTF の DSP0266 の版の一覧ページは、取得時に 1.22.0（2025-03-21）までしか表示しなかった。1.23.0（2025-09-05、Published）は PDF の表紙で確認。執筆記録には 1.25.0 の PDF へのリンクがあったとある | 本文は「執筆時に確認できた版は 1.23.0」「新しい版が出ていることがある」と書いており誤りではない。公開直前に最新版を確かめ、必要なら版を更新する |
| R7 | 軽微 | 24 | Modbus の実装ガイドの PDF 本体（modbus.org）は取得できず、内容（MBAP 7 バイト、ポート 502、2006-10-24）は執筆時の公開の写しの確認のまま | 仕様のページで掲載は確認した。PDF を開けるときに 1 回照合する |

## 他の部と食い違う恐れのある略語

| 略語 | 第4部での意味（章） | 注意 |
|---|---|---|
| POST | HTTP のメソッド（第19章）と、電源投入時の自己診断 Power-On Self-Test（第20章） | 同じ部の中で 2 つの意味。第20章は用語集に登録し、第19章は「HTTP の POST」と書いているので読み分けられるが、総合テストや索引で並ぶときは注意 |
| PI | UEFI の Platform Initialization 仕様（第20章） | 他の部での使用はない。一般語の「PI」と紛れないよう「PI 仕様」と書いている |
| FRU | IPMI の在庫情報（第19章） | 持ち主は第06章。GLOSSARY §3.3 は IPMI の文脈で「FRU 情報」。第19章は「FRU の在庫情報」で、意味は合う |
| SEL・SDR・SOL・RMCP+ | IPMI の記録・通信（第19章） | 第02章の「SDRAM」と見た目が近いが別。SDR は初出で「Sensor Data Record」を併記済み |
| SSE | Server-Sent Events（第19・23章） | 他の部での使用はない |
| QOS | Slurm のサービス品質の区分（第22章。Slurm の文書の表記） | 一般の「QoS」と大文字小文字が違う。ネットワークの章で QoS を使うときは揃え方を決める（現時点で他章の使用はない） |
| PDU | 配電のラック PDU（第23・24章） | GLOSSARY §3.3 どおり配電の意味だけ。第24章の図は「ラック PDU」に揃えた（S7） |
| RMA | 部品の返却・交換の手続き（第23章） | 用語集の `ch` に第29章が入っている。第29章で保守契約の語として使うとき、定義を書き直さない |
| CMDB | 構成管理データベース（第21章） | 第28章の受入・立上げで使う場合、第21章へのリンクで |
| 統合試験（IST） | 第4部では使っていない | 第28章が持ち主。第21章の「試験」、第20章の「版の確認」は一般語で、IST と混ぜていない |
| BMS | 建物の Building Management System（第24章） | 電池の意味では使っていない（§3.3 どおり） |
| DR | 使っていない（「デマンドレスポンス」と書く） | 第30章で略すなら、災害復旧（Disaster Recovery）と衝突する |

## Web で再確認した項目（15 件＋補助 1 件）

| # | 項目 | 結果 | URL |
|---|---|---|---|
| 1 | NVIDIA が SchedMD を買収（2025-12-15）、Slurm をオープンソース・ベンダー中立で開発・配布し続ける | 一致 | https://blogs.nvidia.com/blog/nvidia-acquires-schedmd |
| 2 | Kubernetes の DRA が v1.35 で stable（既定で有効）、Pod の間で資源を要求・共有、装置に届くノードへ配置 | 一致 | https://v1-36.docs.kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/ |
| 3 | Linux Foundation が OpenTofu を発表（2023-09-20）、MPLv2 版の Terraform を引き継ぐ | 一致 | https://www.linuxfoundation.org/press/announcing-opentofu |
| 4 | OpenBMC：Linux Foundation の発表（2018-03-19）、IBM がコードを提供、BMC は状態を監視する専用のコントローラ | 一致 | https://www.linuxfoundation.org/blog/blog/openbmc-project-community-comes-together-at-the-linux-foundation-to-define-open-source-implementation-of-bmc-firmware-stack |
| 5 | IPMI v2.0 の発表（2004-02-18、IDF）：Dell・HP・Intel・NEC の 4 社、認証と暗号化の強化、Serial over LAN | 一致 | https://intel.com/pressroom/archive/releases/2004/20040218corp_a.htm |
| 6 | Redfish Release 2025.4 は 2026-01-20 公開 | 一致 | https://www.dmtf.org/node/4745 |
| 7 | DSP0266 の 1.0.0 は 2015-08-04 | 一致（一覧は 1.22.0 までの表示。R6） | https://dmtf.org/dsp/DSP0266 |
| 8 | DSP0266 1.23.0：2025-09-05、Published。必須は POST・GET・PATCH・DELETE、任意は PUT・HEAD・OPTIONS | 一致 | https://www.dmtf.org/sites/default/files/standards/documents/DSP0266_1.23.0.pdf |
| 9 | UEFI Forum の仕様一覧：UEFI 2.11（2024 年 12 月）、PI 1.10（2026 年 7 月）、ACPI 6.6（2025 年 5 月） | 一致 | https://uefi.org/specifications |
| 10 | NIST SP 800-193『Platform Firmware Resiliency Guidelines』、2018 年 5 月、Final、保護・検知・回復 | 確認（本文に補った。S10） | https://csrc.nist.gov/publications/detail/sp/800-193/final |
| 11 | Google の記事（2025-08-04）：I&M と TVA との機械学習の需要応答の合意、柔軟性は初期の段階で一部の場所だけ | 一致（URL を付け、「2 つ」と条件を補った。S9） | https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/how-were-making-data-centers-more-flexible-to-benefit-power-grids/ |
| 12 | Modbus Organization の仕様のページに、Messaging Implementation Guide 1.0b が「Modbus TCP/IP」の項で掲載 | 掲載を確認（PDF 本体は未取得。R7） | https://modbus.org/modbus-specifications |
| 13 | ANSI/ASHRAE 135-2024 の公開（BACnet 委員会の告知、2024-12-31、135-2020 への 17 の追補） | 一致 | https://bacnet.org/news/ansi-ashrae-135-2024-now-published/ |
| 14 | ASHRAE の「BACnet Errata」（2026-06-29）が ANSI/ASHRAE 135-2024 の訂正をまとめる | 一致（執筆時の記録「訂正の要約は 2026-06-29 付」と一致） | https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20errata/standards/135-2024-errata-summary-2026-06-29.pdf |
| 15 | ISO 16484-5:2026、第 8 版、2026 年 8 月、ISO/TC 205 | **本文が古かった**（直した。M1） | https://www.iso.org/standard/92057.html |
| 補 | ISO 16484-5:2022、第 7 版、2022 年 9 月、「改訂予定」の表示 | 執筆時の記録と一致 | https://www.iso.org/standard/84964.html |
| 16 | OpenTelemetry：テレメトリの枠組み、製品に依存しない、バックエンドではない、CNCF のプロジェクト、OpenTracing と OpenCensus の統合 | 確認（本文に補った。S11） | https://opentelemetry.io/docs/what-is-opentelemetry/ |

（補助の 1 件を除く 16 件のうち、第4部の既存の記述の再確認は #1〜9・11〜15 の 14 件、検証項目 4 の補足のための確認が #10・16 の 2 件。）

**第24章の URL のない参照資料 4 件**：4 件とも URL を付けた（#11〜15。ASHRAE は販売ページの URL を確認できず、訂正の要約と委員会の告知で代えた旨を注記）。「URL 未確認」と注記したものはない。

**再確認できず**：ASHRAE の BACnet のページ（「BACnet は ISO の規格でもある」の記述。取得の許可がない URL。本文から外した）、CNCF の OpenTelemetry のプロジェクトページ（育成段階）、Google の SRE 書籍のポストモーテムの章（R3）、Modbus の実装ガイドの PDF 本体（R7）。

**検索の回数**：WebSearch は 6 回（SP 800-193、Google の記事、ASHRAE 135、Modbus の実装ガイド、ISO 16484-5、OpenTelemetry の URL 探し）で、上限には当たっていない。ほかは事実確認表の URL を WebFetch で直接開いた。

**件数の上限のため開いていないもの**：DMTF の DSP2046 2022.3（PowerState の 5 値、ResetType、Sensor の項目）、DSP8010 2026.1（Sleeping・Hibernating の追加、施設向けスキーマ）、DSP2062 1.2.0、IPMI v2.0 の仕様書と補遺 E6、UEFI 2.11 の第 1・24・32 章と PI 1.8、ACPI 6.6、UEFI 2.11 の発表（Business Wire）、HTTP ブートの講演資料、Ansible の用語集と GitHub、NIST の構成管理の用語集・SP 800-128、PeopleCert、Slurm の 5 つの文書、Kubernetes の Device Plugins、STD 62、各社の本社所在地のページ。いずれも定義・規格の区分の行で、高リスクの区分（発表・企業）は #1・3〜6・11 で再確認した。

**報道・転載だけが根拠の項目**：なし（UEFI 2.11 の発表は Business Wire に UEFI Forum の名で配信されたもので △、仕様一覧〔#9〕で月を確認済み）。

## 表現と用語

- 文は短く、です・ます調でそろっている。長い引用はない（規格の語句・リソース名の短い引用だけ）。
- 優劣の評価はない。IPMI と Redfish、PXE と HTTP ブート、宣言的と手続き的の比較表には「優劣を示す表ではない」の断りがあり、Ansible と OpenTofu、iDRAC と iLO は「例として挙げるだけで比べない」と書いている。
- 企業の初出の国（Dell Technologies・HPE・Red Hat・NVIDIA・Google、いずれも米国）は事実確認表に根拠がある。社名の表記は spec §8.7 どおり。
- 用語集は §8 の割り当てどおり。第23章の「OpenTelemetry」を足した（S11）。第19章の「DMTF」、第24章の「パワーキャッピング」は持ち主の章だけが登録している。
- 事実の持ち主：管理インターフェース（第19章）と施設の通信方式（第24章）の数字・定義は持ち主の章だけが書き、第20・23・25章は第19章の確認結果をリンクで参照している。第24章の熱の式は第15章を参照するだけで、新しい数値はない。
- 第22章の「割り当て（動詞）／割当て（名詞）」は公用文の書き分けで、混在ではない。

## 公開の判断

小さな修正を入れた現状で、第4部は公開してよい水準です。出典つきの発表・企業・規格の事実は一次資料と一致し、古かったのは ISO 16484-5 の版だけでした（直した）。公開前の注意は 3 点です。(1) 冒頭の囲みと一般的な通信の略語の英語併記の扱いを、土台担当が決めて全章で揃えること（R1）。(2) 第24章の電気の定型文に足した段落を、別の囲みに分けるか判断すること（R2）。(3) 公開の直前に Redfish の仕様の最新版を確かめること（R6）。
