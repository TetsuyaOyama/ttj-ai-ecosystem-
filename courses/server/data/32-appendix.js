/* 第32章 事実確認表（担当 A、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 一般知識 | 団体・機関の名前と担当分野、規格の番号は、第01〜31章の事実確認表と「参照資料」で確かめた内容だけを集めた。この章で新しい数値・版・日付は足していない | — | 各章の確認日 | 各章の参照資料（第01〜31章） | 各章の参照資料に記載 | △（各章で個別に確認） | 2026-11-14 | 地図、一覧、用語集 |
| 2 | 定義 | 用語集は、各章の用語を集めた。団体の用語（19 件）の説明は、各章で確認した範囲の短い言い換え | — | — | 各章の事実確認表 | — | △ | 2026-11-14 | 用語集 |
確認できず書かなかった：
- IBTA・Ultra Ethernet Consortium・TCG・CNCF・IEEE（802.3 以外）の公式ページ：このセッションでは Web 検索の上限に達し、個別ページを開けなかった。用語集では「一般知識」として、団体の役割だけを短く書き、版・日付・規模は書いていない。
- 総務省本体・厚生労働省の資料：第27・28章で個別ページが確認できなかったため、地図に載せていない。
- 担当部署名：組織の改編で変わるため、書いていない。
*/

CN.add('arch', 'c32-map', {
  "title": "規格・団体と公的資料の地図：分野 → 団体 → 規格・資料",
  "kinds": {
    "core": "分野",
    "ext": "団体・機関",
    "pol": "規格・資料の例"
  },
  "labels": {
    "arch.plane.lg": "つながり（点線）",
    "arch.f.role": "位置づけ"
  },
  "views": [
    {
      "key": "d",
      "label": "機器・ネットワーク",
      "hint": "分野 → 団体 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。実際の版は、各章の参照資料と発行者の公式ページで確認します。",
      "viewBox": [
        760,
        580
      ],
      "nodes": [
        {
          "id": "df0",
          "label": "形状・ラック",
          "sub": "サーバーの形",
          "kind": "core",
          "x": 10,
          "y": 14,
          "w": 150,
          "h": 62,
          "desc": "サーバーの形、ラックの高さの単位、カードの形。",
          "role": "分野",
          "ch": [
            3,
            8,
            13,
            14,
            16
          ]
        },
        {
          "id": "do0",
          "label": "OCP",
          "sub": "Open Compute Project",
          "kind": "ext",
          "x": 205,
          "y": 14,
          "w": 240,
          "h": 62,
          "desc": "データセンターと IT 機器のオープンな技術を作る世界的なコミュニティ（OCP の自己紹介）。",
          "role": "規格・資料を出す団体",
          "ch": [
            3,
            8,
            13,
            14,
            16
          ]
        },
        {
          "id": "ds0",
          "label": "Open Rack・OCP NIC・OAI",
          "sub": "ラック・カード・アクセラレータの形",
          "kind": "pol",
          "x": 490,
          "y": 14,
          "w": 260,
          "h": 62,
          "desc": "Open Rack V3、OCP NIC 3.0、OAI（OAM・UBB）の仕様を公開している（第03・08章で確認した範囲）。　この講座で使った資料の例：Open Rack Base Frame V3 Specification／About - Open Compute Project／Open Rack V3 48V BBU",
          "role": "載っている規格・資料",
          "ch": [
            3,
            8,
            13,
            14,
            16
          ]
        },
        {
          "id": "df1",
          "label": "19 インチラック",
          "sub": "U の単位",
          "kind": "core",
          "x": 10,
          "y": 94,
          "w": 150,
          "h": 62,
          "desc": "19 インチラックの寸法（U）。",
          "role": "分野",
          "ch": [
            3
          ]
        },
        {
          "id": "do1",
          "label": "EIA／ECIA",
          "sub": "EIA の規格の案内先",
          "kind": "ext",
          "x": 205,
          "y": 94,
          "w": 240,
          "h": 62,
          "desc": "EIA の規格の入手先は ECIA のページが案内している（第03章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            3
          ]
        },
        {
          "id": "ds1",
          "label": "EIA-310 の系列",
          "sub": "ラックの寸法",
          "kind": "pol",
          "x": 490,
          "y": 94,
          "w": 260,
          "h": 62,
          "desc": "EIA-310 の系列がラックの寸法を決めてきた。現行の版は第03章で確認できていない。　この講座で使った資料の例：List of EIA Standards",
          "role": "載っている規格・資料",
          "ch": [
            3
          ]
        },
        {
          "id": "df2",
          "label": "メモリ",
          "sub": "DIMM・DDR",
          "kind": "core",
          "x": 10,
          "y": 174,
          "w": 150,
          "h": 62,
          "desc": "メインメモリ（DRAM）の世代と形。",
          "role": "分野",
          "ch": [
            2,
            7
          ]
        },
        {
          "id": "do2",
          "label": "JEDEC",
          "sub": "JEDEC Solid State Technology Association",
          "kind": "ext",
          "x": 205,
          "y": 174,
          "w": 240,
          "h": 62,
          "desc": "マイクロエレクトロニクスの標準化団体（JEDEC の自己紹介）。",
          "role": "規格・資料を出す団体",
          "ch": [
            2,
            7
          ]
        },
        {
          "id": "ds2",
          "label": "DDR5（JESD79-5）",
          "sub": "メモリの規格",
          "kind": "pol",
          "x": 490,
          "y": 174,
          "w": 260,
          "h": 62,
          "desc": "DDR5 SDRAM の規格番号は JESD79-5（第02・07章）。　この講座で使った資料の例：JEDEC Publishes New DDR5 Standard for Advancing Next-Generat／JEDEC Unveils Plans for DDR5 MRDIMM and LPDDR6 CAMM Standard",
          "role": "載っている規格・資料",
          "ch": [
            2,
            7
          ]
        },
        {
          "id": "df3",
          "label": "相互接続",
          "sub": "PCIe・CXL",
          "kind": "core",
          "x": 10,
          "y": 254,
          "w": 150,
          "h": 62,
          "desc": "CPU・GPU・NIC・SSD・メモリをつなぐ規格。",
          "role": "分野",
          "ch": [
            7
          ]
        },
        {
          "id": "do3",
          "label": "PCI-SIG",
          "sub": "CXL Consortium",
          "kind": "ext",
          "x": 205,
          "y": 254,
          "w": 240,
          "h": 62,
          "desc": "PCIe は PCI-SIG、CXL は CXL Consortium が仕様を公開している（第07章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            7
          ]
        },
        {
          "id": "ds3",
          "label": "PCIe・CXL",
          "sub": "部品をつなぐ規格",
          "kind": "pol",
          "x": 490,
          "y": 254,
          "w": 260,
          "h": 62,
          "desc": "PCIe と CXL の世代・速度・デバイスの型は、第07章が持ち主。　この講座で使った資料の例：PCI-SIG Releases PCIe 6.0 Specification Delivering Record Pe／PCI-SIG Releases PCIe 7.0 Specification（Business Wire 配信）／PCI-SIG Announces PCI Express 8.0 Specification to Reach 256",
          "role": "載っている規格・資料",
          "ch": [
            7
          ]
        },
        {
          "id": "df4",
          "label": "ストレージ",
          "sub": "SSD の形・接続",
          "kind": "core",
          "x": 10,
          "y": 334,
          "w": 150,
          "h": 62,
          "desc": "SSD の形状と接続。",
          "role": "分野",
          "ch": [
            2,
            7,
            9
          ]
        },
        {
          "id": "do4",
          "label": "SNIA",
          "sub": "NVM Express",
          "kind": "ext",
          "x": 205,
          "y": 334,
          "w": 240,
          "h": 62,
          "desc": "SSD の形は SNIA の SFF-TA 規格、接続は NVM Express の NVMe 仕様（第09章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            2,
            7,
            9
          ]
        },
        {
          "id": "ds4",
          "label": "EDSFF（SFF-TA）・NVMe",
          "sub": "SSD の形と接続",
          "kind": "pol",
          "x": 490,
          "y": 334,
          "w": 260,
          "h": 62,
          "desc": "E1.S・E3.S などの形状の規格と NVMe の仕様。詳細は第09章。　この講座で使った資料の例：The Latest on Form Factors（CMSS24）",
          "role": "載っている規格・資料",
          "ch": [
            2,
            7,
            9
          ]
        },
        {
          "id": "df5",
          "label": "ネットワーク",
          "sub": "イーサネット・InfiniBand",
          "kind": "core",
          "x": 10,
          "y": 414,
          "w": 150,
          "h": 62,
          "desc": "スイッチ・NIC・光トランシーバの規格。",
          "role": "分野",
          "ch": [
            2,
            10
          ]
        },
        {
          "id": "do5",
          "label": "IEEE",
          "sub": "IBTA・Ultra Ethernet Consortium",
          "kind": "ext",
          "x": 205,
          "y": 414,
          "w": 240,
          "h": 62,
          "desc": "イーサネットは IEEE 802.3、InfiniBand は IBTA（第10章）。Ultra Ethernet Consortium は AI 向けのイーサネットの取り組み。",
          "role": "規格・資料を出す団体",
          "ch": [
            2,
            10
          ]
        },
        {
          "id": "ds5",
          "label": "IEEE 802.3・InfiniBand ほか",
          "sub": "速度の世代と転送の方式（Ultra Ethernet も）",
          "kind": "pol",
          "x": 490,
          "y": 414,
          "w": 260,
          "h": 62,
          "desc": "各規格の速度の世代とトランシーバの形状は、第10章が持ち主。　この講座で使った資料の例：IEEE Standard for Ethernet（IEEE 802.3-2022）",
          "role": "載っている規格・資料",
          "ch": [
            2,
            10
          ]
        },
        {
          "id": "df6",
          "label": "GPU 間接続",
          "sub": "アクセラレータ同士",
          "kind": "core",
          "x": 10,
          "y": 494,
          "w": 150,
          "h": 62,
          "desc": "アクセラレータ同士をつなぐ規格。",
          "role": "分野",
          "ch": [
            8
          ]
        },
        {
          "id": "do6",
          "label": "UALink Consortium",
          "sub": "UALink の仕様",
          "kind": "ext",
          "x": 205,
          "y": 494,
          "w": 240,
          "h": 62,
          "desc": "UALink Consortium が UALink の仕様を公開している（第08章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            8
          ]
        },
        {
          "id": "ds6",
          "label": "UALink",
          "sub": "GPU 間の接続の仕様",
          "kind": "pol",
          "x": 490,
          "y": 494,
          "w": 260,
          "h": 62,
          "desc": "公開の時期と版は第08章で確認した範囲。　この講座で使った資料の例：UALink Consortium Releases the Ultra Accelerator Link 200G 1",
          "role": "載っている規格・資料",
          "ch": [
            8
          ]
        }
      ],
      "links": [
        {
          "id": "da0",
          "a": "df0",
          "b": "do0",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db0",
          "a": "do0",
          "b": "ds0",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "da1",
          "a": "df1",
          "b": "do1",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db1",
          "a": "do1",
          "b": "ds1",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "da2",
          "a": "df2",
          "b": "do2",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db2",
          "a": "do2",
          "b": "ds2",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "da3",
          "a": "df3",
          "b": "do3",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db3",
          "a": "do3",
          "b": "ds3",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "da4",
          "a": "df4",
          "b": "do4",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db4",
          "a": "do4",
          "b": "ds4",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "da5",
          "a": "df5",
          "b": "do5",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db5",
          "a": "do5",
          "b": "ds5",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "da6",
          "a": "df6",
          "b": "do6",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "db6",
          "a": "do6",
          "b": "ds6",
          "label": "載る",
          "plane": "lg"
        }
      ]
    },
    {
      "key": "p",
      "label": "電源・冷却・施設",
      "hint": "電源・冷却・施設の規格は、機器の規格とは別の団体の系統です。体系の間で段階を等号で比べません。",
      "viewBox": [
        760,
        420
      ],
      "nodes": [
        {
          "id": "pf0",
          "label": "電源",
          "sub": "UPS・電源ユニット",
          "kind": "core",
          "x": 10,
          "y": 14,
          "w": 150,
          "h": 62,
          "desc": "無停電電源と電源ユニット、直流給電。",
          "role": "分野",
          "ch": [
            1,
            13,
            14,
            17
          ]
        },
        {
          "id": "po0",
          "label": "IEC・ITU-T",
          "sub": "80 PLUS の運営元",
          "kind": "ext",
          "x": 205,
          "y": 14,
          "w": 240,
          "h": 62,
          "desc": "UPS の規格は IEC、直流給電の勧告は ITU-T（直流のプラグ・ソケットは IEC の技術仕様）、電源ユニットの効率等級は 80 PLUS の運営元（第13・14章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            1,
            13,
            14,
            17
          ]
        },
        {
          "id": "ps0",
          "label": "IEC 62040-3・80 PLUS",
          "sub": "UPS と電源ユニットの規格・等級",
          "kind": "pol",
          "x": 490,
          "y": 14,
          "w": 260,
          "h": 62,
          "desc": "IEC 62040-3、80 PLUS の等級、ITU-T L.1200。詳細は第13・14章。　この講座で使った資料の例：What is 80 PLUS® certification program?／80 PLUS® Certification Program FAQs",
          "role": "載っている規格・資料",
          "ch": [
            1,
            13,
            14,
            17
          ]
        },
        {
          "id": "pf1",
          "label": "熱・冷却",
          "sub": "温湿度・液冷",
          "kind": "core",
          "x": 10,
          "y": 94,
          "w": 150,
          "h": 62,
          "desc": "空気側の温湿度クラス、液冷のクラス、試運転の指針。",
          "role": "分野",
          "ch": [
            15,
            16,
            17,
            24,
            28
          ]
        },
        {
          "id": "po1",
          "label": "ASHRAE",
          "sub": "TC 9.9",
          "kind": "ext",
          "x": 205,
          "y": 94,
          "w": 240,
          "h": 62,
          "desc": "ASHRAE の技術委員会 TC 9.9 が、データセンターの熱の指針を公開している（第15・16章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            15,
            16,
            17,
            24,
            28
          ]
        },
        {
          "id": "ps1",
          "label": "Thermal Guidelines・液冷クラス",
          "sub": "空気側と液冷の指針",
          "kind": "pol",
          "x": 490,
          "y": 94,
          "w": 260,
          "h": 62,
          "desc": "空気側のクラス（A1 など）と、液冷クラス（W17 など）は第15・16章が持ち主。　この講座で使った資料の例：2021 Equipment Thermal Guidelines for Data Processing Enviro／Emergence and Expansion of Liquid Cooling in Mainstream Data／ANSI/ASHRAE Standard 135-2024（BACnet）",
          "role": "載っている規格・資料",
          "ch": [
            15,
            16,
            17,
            24,
            28
          ]
        },
        {
          "id": "pf2",
          "label": "効率の指標",
          "sub": "PUE・WUE など",
          "kind": "core",
          "x": 10,
          "y": 174,
          "w": 150,
          "h": 62,
          "desc": "PUE などの効率の指標。",
          "role": "分野",
          "ch": [
            1,
            17,
            24
          ]
        },
        {
          "id": "po2",
          "label": "ISO/IEC",
          "sub": "The Green Grid",
          "kind": "ext",
          "x": 205,
          "y": 174,
          "w": 240,
          "h": 62,
          "desc": "指標の規格は ISO/IEC 30134 シリーズ、考え方の白書は The Green Grid（第17章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            1,
            17,
            24
          ]
        },
        {
          "id": "ps2",
          "label": "ISO/IEC 30134 シリーズ",
          "sub": "PUE などの定義",
          "kind": "pol",
          "x": 490,
          "y": 174,
          "w": 260,
          "h": 62,
          "desc": "PUE・WUE・CUE・ERF の定義と版は第17章が持ち主。　この講座で使った資料の例：ISO/IEC 22237-1:2021 Information technology — Data centre fa",
          "role": "載っている規格・資料",
          "ch": [
            1,
            17,
            24
          ]
        },
        {
          "id": "pf3",
          "label": "施設の格付け",
          "sub": "Tier・Rated",
          "kind": "core",
          "x": 10,
          "y": 254,
          "w": 150,
          "h": 62,
          "desc": "施設の格付け。",
          "role": "分野",
          "ch": [
            17,
            18,
            28
          ]
        },
        {
          "id": "po3",
          "label": "Uptime Institute",
          "sub": "TIA・日本データセンター協会",
          "kind": "ext",
          "x": 205,
          "y": 254,
          "w": 240,
          "h": 62,
          "desc": "格付けの体系は、Uptime Institute、TIA、日本データセンター協会がそれぞれ持つ（第18章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            17,
            18,
            28
          ]
        },
        {
          "id": "ps3",
          "label": "Tier・TIA-942・ファシリティスタンダード",
          "sub": "施設の冗長と保守の考え方",
          "kind": "pol",
          "x": 490,
          "y": 254,
          "w": 260,
          "h": 62,
          "desc": "体系の間で段階を等号で比べない（第18章）。　この講座で使った資料の例：The growing PUE advantage of larger data centers／Mapping PUE trends by data center region, age and size／Uptime Institute Tier Classification System",
          "role": "載っている規格・資料",
          "ch": [
            17,
            18,
            28
          ]
        },
        {
          "id": "pf4",
          "label": "施設の通信",
          "sub": "BACnet・Modbus・SNMP",
          "kind": "core",
          "x": 10,
          "y": 334,
          "w": 150,
          "h": 62,
          "desc": "施設の機器と BMS・DCIM をつなぐ通信方式。",
          "role": "分野",
          "ch": [
            15,
            16,
            17,
            24,
            28
          ]
        },
        {
          "id": "po4",
          "label": "ASHRAE・ISO",
          "sub": "Modbus Organization・IETF",
          "kind": "ext",
          "x": 205,
          "y": 334,
          "w": 240,
          "h": 62,
          "desc": "BACnet は ASHRAE と ISO、Modbus は Modbus Organization、SNMP は IETF の標準（第24章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            15,
            16,
            17,
            24,
            28
          ]
        },
        {
          "id": "ps4",
          "label": "BACnet・Modbus・SNMP",
          "sub": "施設の監視制御の通信方式",
          "kind": "pol",
          "x": 490,
          "y": 334,
          "w": 260,
          "h": 62,
          "desc": "通信方式と規格番号は第24章が持ち主。　この講座で使った資料の例：Modbus Messaging on TCP/IP Implementation Guide V1.0b",
          "role": "載っている規格・資料",
          "ch": [
            15,
            16,
            17,
            24,
            28
          ]
        }
      ],
      "links": [
        {
          "id": "pa0",
          "a": "pf0",
          "b": "po0",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "pb0",
          "a": "po0",
          "b": "ps0",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "pa1",
          "a": "pf1",
          "b": "po1",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "pb1",
          "a": "po1",
          "b": "ps1",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "pa2",
          "a": "pf2",
          "b": "po2",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "pb2",
          "a": "po2",
          "b": "ps2",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "pa3",
          "a": "pf3",
          "b": "po3",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "pb3",
          "a": "po3",
          "b": "ps3",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "pa4",
          "a": "pf4",
          "b": "po4",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "pb4",
          "a": "po4",
          "b": "ps4",
          "label": "載る",
          "plane": "lg"
        }
      ]
    },
    {
      "key": "m",
      "label": "管理・運用",
      "hint": "管理・起動・運用基盤・構成管理の規格と公式文書です。ファームウェアの安全の文書（セキュリティ）は第25章で扱います。",
      "viewBox": [
        760,
        340
      ],
      "nodes": [
        {
          "id": "mf0",
          "label": "管理",
          "sub": "BMC・Redfish",
          "kind": "core",
          "x": 10,
          "y": 14,
          "w": 150,
          "h": 62,
          "desc": "サーバーの遠隔管理。",
          "role": "分野",
          "ch": [
            16,
            19,
            20,
            23,
            24,
            25
          ]
        },
        {
          "id": "mo0",
          "label": "DMTF",
          "sub": "Redfish Forum",
          "kind": "ext",
          "x": 205,
          "y": 14,
          "w": 240,
          "h": 62,
          "desc": "Redfish は DMTF の規格（第19章）。IPMI は Intel ほか 4 社が著者の仕様。",
          "role": "規格・資料を出す団体",
          "ch": [
            16,
            19,
            20,
            23,
            24,
            25
          ]
        },
        {
          "id": "ms0",
          "label": "Redfish",
          "sub": "帯域外管理の標準インターフェース",
          "kind": "pol",
          "x": 490,
          "y": 14,
          "w": 260,
          "h": 62,
          "desc": "Redfish の版とスキーマ、IPMI の位置づけは第19章が持ち主。　この講座で使った資料の例：Redfish for Liquid Cooling Equipment／Redfish Specification（DSP0266）1.23.0／All Published Versions of DSP0266",
          "role": "載っている規格・資料",
          "ch": [
            16,
            19,
            20,
            23,
            24,
            25
          ]
        },
        {
          "id": "mf1",
          "label": "起動",
          "sub": "UEFI・ACPI",
          "kind": "core",
          "x": 10,
          "y": 94,
          "w": 150,
          "h": 62,
          "desc": "ファームウェアと起動。",
          "role": "分野",
          "ch": [
            20,
            25
          ]
        },
        {
          "id": "mo1",
          "label": "UEFI Forum",
          "sub": "仕様の管理団体",
          "kind": "ext",
          "x": 205,
          "y": 94,
          "w": 240,
          "h": 62,
          "desc": "UEFI と ACPI の仕様は UEFI Forum が管理している（第20章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            20,
            25
          ]
        },
        {
          "id": "ms1",
          "label": "UEFI・ACPI",
          "sub": "電源投入から OS までの仕様",
          "kind": "pol",
          "x": 490,
          "y": 94,
          "w": 260,
          "h": 62,
          "desc": "仕様の版と PXE・HTTP ブートの規定箇所は第20章。　この講座で使った資料の例：UEFI Specification 2.11（第 1 章 Introduction）／UEFI Specification 2.11（第 24 章 Network Protocols）／UEFI Forum Releases UEFI 2.11 and PI 1.9 Specifications",
          "role": "載っている規格・資料",
          "ch": [
            20,
            25
          ]
        },
        {
          "id": "mf2",
          "label": "運用基盤",
          "sub": "Slurm・Kubernetes",
          "kind": "core",
          "x": 10,
          "y": 174,
          "w": 150,
          "h": 62,
          "desc": "ジョブスケジューラとコンテナの資源管理。",
          "role": "分野",
          "ch": [
            22
          ]
        },
        {
          "id": "mo2",
          "label": "Slurm 公式",
          "sub": "Kubernetes プロジェクト",
          "kind": "ext",
          "x": 205,
          "y": 174,
          "w": 240,
          "h": 62,
          "desc": "Slurm と Kubernetes は、それぞれ公式のドキュメントを公開している（第22章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            22
          ]
        },
        {
          "id": "ms2",
          "label": "Slurm・Kubernetes",
          "sub": "ジョブとコンテナの資源管理",
          "kind": "pol",
          "x": 490,
          "y": 174,
          "w": 260,
          "h": 62,
          "desc": "ジョブの状態と GPU の割り当ては第22章が持ち主。　この講座で使った資料の例：Slurm Workload Manager — Overview／Job State Codes／Scheduling Configuration Guide",
          "role": "載っている規格・資料",
          "ch": [
            22
          ]
        },
        {
          "id": "mf3",
          "label": "構成管理",
          "sub": "ITIL・NIST SP 800-128",
          "kind": "core",
          "x": 10,
          "y": 254,
          "w": 150,
          "h": 62,
          "desc": "構成管理と変更管理。",
          "role": "分野",
          "ch": [
            1,
            9,
            21,
            25
          ]
        },
        {
          "id": "mo3",
          "label": "NIST",
          "sub": "PeopleCert",
          "kind": "ext",
          "x": 205,
          "y": 254,
          "w": 240,
          "h": 62,
          "desc": "構成管理の指針は NIST の文書、変更の枠組みは ITIL（PeopleCert の説明ページ）（第21章）。",
          "role": "規格・資料を出す団体",
          "ch": [
            1,
            9,
            21,
            25
          ]
        },
        {
          "id": "ms3",
          "label": "NIST SP 800-128・ITIL 4",
          "sub": "構成管理と変更管理の枠組み",
          "kind": "pol",
          "x": 490,
          "y": 254,
          "w": 260,
          "h": 62,
          "desc": "NIST の用語集と SP 800-128（第21章）。　この講座で使った資料の例：NIST CSRC Glossary：server／SP 800-88 Rev. 2 Guidelines for Media Sanitization／configuration management — CSRC Glossary",
          "role": "載っている規格・資料",
          "ch": [
            1,
            9,
            21,
            25
          ]
        }
      ],
      "links": [
        {
          "id": "ma0",
          "a": "mf0",
          "b": "mo0",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "mb0",
          "a": "mo0",
          "b": "ms0",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ma1",
          "a": "mf1",
          "b": "mo1",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "mb1",
          "a": "mo1",
          "b": "ms1",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ma2",
          "a": "mf2",
          "b": "mo2",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "mb2",
          "a": "mo2",
          "b": "ms2",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ma3",
          "a": "mf3",
          "b": "mo3",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "mb3",
          "a": "mo3",
          "b": "ms3",
          "label": "載る",
          "plane": "lg"
        }
      ]
    },
    {
      "key": "g",
      "label": "公的資料",
      "hint": "当局・公的機関の資料です。担当部署名は組織の改編で変わるため、書いていません。総務省本体と厚生労働省の資料は、確認できた個別ページがなく、載せていません。",
      "viewBox": [
        760,
        740
      ],
      "nodes": [
        {
          "id": "gf0",
          "label": "電気・産業・安全保障",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 14,
          "w": 150,
          "h": 62,
          "desc": "電気設備の技術基準、電気保安、安全保障貿易管理、産業支援。",
          "role": "分野",
          "ch": [
            12,
            30
          ]
        },
        {
          "id": "go0",
          "label": "経済産業省",
          "sub": "電気設備・安全保障貿易管理",
          "kind": "ext",
          "x": 205,
          "y": 14,
          "w": 240,
          "h": 62,
          "desc": "省令の解説、電気設備の届出の手引き、リスト規制、基幹インフラ・クラウドの制度、AI・半導体産業基盤強化フレームなど（第12・30章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            12,
            30
          ]
        },
        {
          "id": "gs0",
          "label": "電気の保安、省エネ、補助",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 14,
          "w": 260,
          "h": 62,
          "desc": "省令の解説、電気設備の届出の手引き、リスト規制、基幹インフラ・クラウドの制度、AI・半導体産業基盤強化フレームなど（第12・30章）。　資料の例：電気設備に関する技術基準を定める省令の解説／電気設備の申請・届出等の手引き／2026年度における変更点について",
          "role": "載っている資料の種類",
          "ch": [
            12,
            30
          ]
        },
        {
          "id": "gf1",
          "label": "エネルギー・系統",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 94,
          "w": 150,
          "h": 62,
          "desc": "電力系統の議論、省エネ法のベンチマーク制度。",
          "role": "分野",
          "ch": [
            27,
            30
          ]
        },
        {
          "id": "go1",
          "label": "資源エネルギー庁",
          "sub": "系統・省エネ法",
          "kind": "ext",
          "x": 205,
          "y": 94,
          "w": 240,
          "h": 62,
          "desc": "次世代電力系統ワーキンググループの資料、省エネ法の資料、解説記事（第27・30章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            27,
            30
          ]
        },
        {
          "id": "gs1",
          "label": "系統の議論と省エネ",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 94,
          "w": 260,
          "h": 62,
          "desc": "次世代電力系統ワーキンググループの資料、省エネ法の資料、解説記事（第27・30章）。　資料の例：局地的な大規模需要に対する規律確保について（資料1-2）／局地的な大規模需要に対する規律確保について（資料3）／局地的な大規模需要の実態と論点について（資料3）",
          "role": "載っている資料の種類",
          "ch": [
            27,
            30
          ]
        },
        {
          "id": "gf2",
          "label": "系統接続",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 174,
          "w": 150,
          "h": 62,
          "desc": "系統アクセスの手続き。",
          "role": "分野",
          "ch": [
            27
          ]
        },
        {
          "id": "go2",
          "label": "電力広域的運営推進機関",
          "sub": "系統アクセスの流れ",
          "kind": "ext",
          "x": 205,
          "y": 174,
          "w": 240,
          "h": 62,
          "desc": "発電設備等の系統アクセスの流れの資料（第27章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            27
          ]
        },
        {
          "id": "gs2",
          "label": "系統接続の手続き",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 174,
          "w": 260,
          "h": 62,
          "desc": "発電設備等の系統アクセスの流れの資料（第27章）。　資料の例：発電設備等に関する系統アクセスの流れ",
          "role": "載っている資料の種類",
          "ch": [
            27
          ]
        },
        {
          "id": "gf3",
          "label": "消防・防災",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 254,
          "w": 150,
          "h": 62,
          "desc": "リチウムイオン蓄電池、消火設備の法令と通知。",
          "role": "分野",
          "ch": [
            13,
            18
          ]
        },
        {
          "id": "go3",
          "label": "総務省消防庁",
          "sub": "消防法令・通知",
          "kind": "ext",
          "x": 205,
          "y": 254,
          "w": 240,
          "h": 62,
          "desc": "消防法令の改正の結果の資料、二酸化炭素消火設備の通知（第13・18章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            13,
            18
          ]
        },
        {
          "id": "gs3",
          "label": "蓄電池と消火設備",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 254,
          "w": 260,
          "h": 62,
          "desc": "消防法令の改正の結果の資料、二酸化炭素消火設備の通知（第13・18章）。　資料の例：消防法施行規則及び対象火気設備等の位置、構造及び管理並びに対象火気器具等の取扱いに関する条例の制定に関する基準を定める省／消防法令抜粋（消防法上の危険物の定義、試験方法など）／二酸化炭素消火設備の安全対策について（通知）",
          "role": "載っている資料の種類",
          "ch": [
            13,
            18
          ]
        },
        {
          "id": "gf4",
          "label": "税・会計",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 334,
          "w": 150,
          "h": 62,
          "desc": "減価償却の耐用年数、リース会計。",
          "role": "分野",
          "ch": [
            29
          ]
        },
        {
          "id": "go4",
          "label": "国税庁・金融庁",
          "sub": "耐用年数表・会計基準",
          "kind": "ext",
          "x": 205,
          "y": 334,
          "w": 240,
          "h": 62,
          "desc": "耐用年数表（国税庁）、リース会計基準の公表（金融庁）（第29章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            29
          ]
        },
        {
          "id": "gs4",
          "label": "償却とリース",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 334,
          "w": 260,
          "h": 62,
          "desc": "耐用年数表（国税庁）、リース会計基準の公表（金融庁）（第29章）。　資料の例：主な減価償却資産の耐用年数表／「財務諸表等の用語、様式及び作成方法に関する規則等の一部を改正する内閣府令（案）」等の公表について",
          "role": "載っている資料の種類",
          "ch": [
            29
          ]
        },
        {
          "id": "gf5",
          "label": "データの保護",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 414,
          "w": 150,
          "h": 62,
          "desc": "個人データの越境移転、基幹インフラ制度（第30章）。",
          "role": "分野",
          "ch": [
            30
          ]
        },
        {
          "id": "go5",
          "label": "個人情報保護委員会",
          "sub": "FAQ",
          "kind": "ext",
          "x": 205,
          "y": 414,
          "w": 240,
          "h": 62,
          "desc": "FAQ（個人情報保護委員会）、基幹インフラ制度の資料（内閣府）（第30章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            29,
            30
          ]
        },
        {
          "id": "gs5",
          "label": "越境移転",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 414,
          "w": 260,
          "h": 62,
          "desc": "FAQ（個人情報保護委員会）、基幹インフラ制度の資料（内閣府）（第30章）。　資料の例：基幹インフラ制度に関する法令等の改正（概要）／FAQ Q12-1（外国にある第三者への個人データの提供）",
          "role": "載っている資料の種類",
          "ch": [
            29,
            30
          ]
        },
        {
          "id": "gf6",
          "label": "米国の輸出管理",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 494,
          "w": 150,
          "h": 62,
          "desc": "先進的な計算機・AI 向けチップの輸出管理規則。",
          "role": "分野",
          "ch": [
            30
          ]
        },
        {
          "id": "go6",
          "label": "米国商務省 BIS",
          "sub": "EAR・連邦官報",
          "kind": "ext",
          "x": 205,
          "y": 494,
          "w": 240,
          "h": 62,
          "desc": "連邦官報の規則と BIS の発表（第30章）。個別の判断は専門家へ。",
          "role": "資料を出す当局・機関",
          "ch": [
            30
          ]
        },
        {
          "id": "gs6",
          "label": "先進計算の規則",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 494,
          "w": 260,
          "h": 62,
          "desc": "連邦官報の規則と BIS の発表（第30章）。個別の判断は専門家へ。　資料の例：Implementation of Additional Export Controls: Certain Advanc／Department of Commerce Announces Rescission of Biden-Era Art／Revision to License Review Policy for Advanced Computing Com",
          "role": "載っている資料の種類",
          "ch": [
            30
          ]
        },
        {
          "id": "gf7",
          "label": "EU・ドイツ",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 574,
          "w": 150,
          "h": 62,
          "desc": "エネルギー効率指令、データ保護規則、ドイツのエネルギー効率法。",
          "role": "分野",
          "ch": [
            16,
            30
          ]
        },
        {
          "id": "go7",
          "label": "欧州委員会ほか",
          "sub": "EUR-Lex・ドイツ政府",
          "kind": "ext",
          "x": 205,
          "y": 574,
          "w": 240,
          "h": 62,
          "desc": "EUR-Lex の法令、欧州委員会のページ、ドイツ連邦政府の資料（第30章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            16,
            30
          ]
        },
        {
          "id": "gs7",
          "label": "効率・データ保護",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 574,
          "w": 260,
          "h": 62,
          "desc": "EUR-Lex の法令、欧州委員会のページ、ドイツ連邦政府の資料（第30章）。　資料の例：ECHA publishes PFAS restriction proposal／Directive (EU) 2023/1791 on energy efficiency／Commission Delegated Regulation (EU) 2024/1364",
          "role": "載っている資料の種類",
          "ch": [
            16,
            30
          ]
        },
        {
          "id": "gf8",
          "label": "国際機関・技術",
          "sub": "分野",
          "kind": "core",
          "x": 10,
          "y": 654,
          "w": 150,
          "h": 62,
          "desc": "電力需要の報告、技術文書、化学物質規制。",
          "role": "分野",
          "ch": [
            1,
            9,
            16,
            21,
            25,
            26,
            27
          ]
        },
        {
          "id": "go8",
          "label": "IEA・NIST",
          "sub": "NIST・ECHA",
          "kind": "ext",
          "x": 205,
          "y": 654,
          "w": 240,
          "h": 62,
          "desc": "IEA のデータセンター電力の報告、NIST の用語集・指針、ECHA の PFAS の提案（第16・21・25・27章）。",
          "role": "資料を出す当局・機関",
          "ch": [
            1,
            9,
            16,
            21,
            25,
            26,
            27
          ]
        },
        {
          "id": "gs8",
          "label": "電力需要・用語集・化学物質",
          "sub": "この講座で使った",
          "kind": "pol",
          "x": 490,
          "y": 654,
          "w": 260,
          "h": 62,
          "desc": "IEA のデータセンター電力の報告、NIST の用語集・指針、ECHA の PFAS の提案（第16・21・25・27章）。　資料の例：NIST CSRC Glossary：server／SP 800-88 Rev. 2 Guidelines for Media Sanitization／ECHA publishes PFAS restriction proposal",
          "role": "載っている資料の種類",
          "ch": [
            1,
            9,
            16,
            21,
            25,
            26,
            27
          ]
        }
      ],
      "links": [
        {
          "id": "ga0",
          "a": "gf0",
          "b": "go0",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb0",
          "a": "go0",
          "b": "gs0",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga1",
          "a": "gf1",
          "b": "go1",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb1",
          "a": "go1",
          "b": "gs1",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga2",
          "a": "gf2",
          "b": "go2",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb2",
          "a": "go2",
          "b": "gs2",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga3",
          "a": "gf3",
          "b": "go3",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb3",
          "a": "go3",
          "b": "gs3",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga4",
          "a": "gf4",
          "b": "go4",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb4",
          "a": "go4",
          "b": "gs4",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga5",
          "a": "gf5",
          "b": "go5",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb5",
          "a": "go5",
          "b": "gs5",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga6",
          "a": "gf6",
          "b": "go6",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb6",
          "a": "go6",
          "b": "gs6",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga7",
          "a": "gf7",
          "b": "go7",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb7",
          "a": "go7",
          "b": "gs7",
          "label": "載る",
          "plane": "lg"
        },
        {
          "id": "ga8",
          "a": "gf8",
          "b": "go8",
          "label": "担う",
          "plane": "lg"
        },
        {
          "id": "gb8",
          "a": "go8",
          "b": "gs8",
          "label": "載る",
          "plane": "lg"
        }
      ]
    }
  ],
  "viewBox": [
    760,
    420
  ],
  "initial": "df0"
});

CN.add('table', 'c32-refs', {
  "title": "参照資料の一覧：各章の「参照資料」を 1 つにまとめたもの",
  "caption": "種類で絞って探せます。資料へのリンクと版・時点の確認は、各章の「参照資料」と発行者の公式ページで行います（資料の一覧は 2026-11-14 時点）",
  "cols": [
    "種類",
    "資料名",
    "発行者",
    "時点",
    "関連章"
  ],
  "rows": [
    [
      "規格・仕様",
      "ISO/IEC 30134-2:2026（見本ページ）",
      "ANSI（規格の販売サイト）",
      "2026 年版",
      "第17章"
    ],
    [
      "規格・仕様",
      "ANSI/ASHRAE Standard 135-2024（BACnet）",
      "ASHRAE",
      "2024 年版",
      "第24章"
    ],
    [
      "規格・仕様",
      "2021 Equipment Thermal Guidelines for Data Processing Environments（参照カード）",
      "ASHRAE TC 9.9",
      "第5版（改訂増補版）。著作権表示は 2021 年と 2024 年",
      "第15章・第16章・第17章"
    ],
    [
      "規格・仕様",
      "All Published Versions of DSP0266",
      "DMTF",
      "確認時の一覧",
      "第19章"
    ],
    [
      "規格・仕様",
      "DSP0266 Redfish Specification 1.23.0",
      "DMTF",
      "1.23.0",
      "第25章"
    ],
    [
      "規格・仕様",
      "DSP2046 Redfish Resource and Schema Guide 2022.3",
      "DMTF",
      "2022.3",
      "第23章"
    ],
    [
      "規格・仕様",
      "Redfish Resource and Schema Guide（DSP2046）2022.3",
      "DMTF",
      "2022.3 版",
      "第19章"
    ],
    [
      "規格・仕様",
      "Redfish Schema Bundle Readme（DSP8010）2026.1",
      "DMTF",
      "2026 年 4 月 2 日",
      "第19章"
    ],
    [
      "規格・仕様",
      "Redfish Specification（DSP0266）1.23.0",
      "DMTF",
      "2025 年 9 月 5 日",
      "第19章"
    ],
    [
      "規格・仕様",
      "IEC 62040-3:2021 Uninterruptible power systems (UPS) — Part 3: Method of specifying the performance and test requirements",
      "IEC",
      "第3版、2021 年 4 月 21 日",
      "第13章"
    ],
    [
      "規格・仕様",
      "ISO/IEC 22237-1:2021 Information technology — Data centre facilities and infrastructures — Part 1: General concepts",
      "IEC（ISO/IEC の共同規格）",
      "第1版、2021 年 10 月 5 日",
      "第01章"
    ],
    [
      "規格・仕様",
      "STD 62（RFC 3411〜3418）",
      "IETF（RFC Editor のページ）",
      "2002 年 12 月",
      "第24章"
    ],
    [
      "規格・仕様",
      "ISO 16484-5（Building automation and control systems — Data communication protocol）",
      "ISO",
      "2022 年の第7版を確認。現行の版は確認できませんでした",
      "第24章"
    ],
    [
      "規格・仕様",
      "ISO/IEC 30134-2:2026 Information technology — Data centres key performance indicators — Part 2: Power usage effectiveness (PUE)",
      "ISO／IEC",
      "第2版、2026 年 1 月",
      "第17章"
    ],
    [
      "規格・仕様",
      "ISO/IEC 30134-6:2021 Part 6: Energy Reuse Factor (ERF)",
      "ISO／IEC",
      "第1版、2021 年 8 月。ページは改訂の作業中と表示",
      "第17章"
    ],
    [
      "規格・仕様",
      "ISO/IEC 30134-8:2022 Part 8: Carbon usage effectiveness (CUE)",
      "ISO／IEC",
      "第1版、2022 年 3 月",
      "第17章"
    ],
    [
      "規格・仕様",
      "ISO/IEC 30134-9:2022 Part 9: Water usage effectiveness (WUE)",
      "ISO／IEC",
      "第1版、2022 年 3 月。ページは改訂の作業中と表示",
      "第17章"
    ],
    [
      "規格・仕様",
      "ISO/IEC 30134-1:2016 Part 1: Overview and general requirements",
      "ISO／IEC（VDE Verlag の販売ページ）",
      "第1版、2016 年 3 月",
      "第17章"
    ],
    [
      "規格・仕様",
      "IPMI Specification, Second Generation, v2.0（Document Revision 1.1）",
      "Intel ほか",
      "2013 年 10 月 1 日",
      "第23章"
    ],
    [
      "規格・仕様",
      "IPMI Specification, Second Generation, v2.0（Rev 1.1）",
      "Intel ほか 4 社（仕様書の記載）",
      "2013 年 10 月 1 日（E7 の更新記載は 2015 年 4 月 21 日）",
      "第19章"
    ],
    [
      "規格・仕様",
      "IPMI Addenda, Errata, and Clarifications E6",
      "Intel（公開）",
      "2014 年 2 月 11 日",
      "第19章"
    ],
    [
      "規格・仕様",
      "Intel Xeon 6980P Processor (504M Cache, 2.00 GHz) Product Specifications",
      "Intel（米国）",
      "発売 Q3'24（確認 2026 年 11 月）",
      "第06章"
    ],
    [
      "規格・仕様",
      "Intel Xeon 6980P Processor Product Specifications",
      "Intel（米国）",
      "発売 Q3'24（確認 2026 年 11 月）",
      "第07章"
    ],
    [
      "規格・仕様",
      "Modbus Messaging on TCP/IP Implementation Guide V1.0b",
      "Modbus Organization",
      "2006 年 10 月 24 日付",
      "第24章"
    ],
    [
      "規格・仕様",
      "大阪第7データセンターの標準仕様（別紙）",
      "NTT コミュニケーションズ（現 NTT ドコモビジネス）",
      "2019 年 11 月 27 日の発表の別紙",
      "第18章"
    ],
    [
      "規格・仕様",
      "ACS Door Heat Exchanger Requirements for Open Rack",
      "OCP",
      "Rev 1.0、2021 年 6 月 15 日",
      "第16章"
    ],
    [
      "規格・仕様",
      "Project Deschutes: Data Center Facilities",
      "OCP（Google が提供）",
      "V1.0.0、2026 年 2 月 26 日",
      "第16章"
    ],
    [
      "規格・仕様",
      "ORV3 HVDC-LVDC 100kW Power Shelf Design Specification",
      "Open Compute Project",
      "v1.0.0、2026 年 2 月 20 日",
      "第14章"
    ],
    [
      "規格・仕様",
      "Open Rack V3 48V BBU",
      "Open Compute Project",
      "Rev 1.4、2023 年 9 月 12 日",
      "第13章"
    ],
    [
      "規格・仕様",
      "Open Rack V3 Base Specification",
      "Open Compute Project",
      "Rev 1.0、2022 年 9 月 22 日公開の表示",
      "第14章"
    ],
    [
      "規格・仕様",
      "Open Rack ±400V to 50V 18kW PSU Design Specification",
      "Open Compute Project",
      "v1.0.0、2026 年 2 月 20 日",
      "第14章"
    ],
    [
      "規格・仕様",
      "Cooling Environments",
      "Open Compute Project（OCP）",
      "2026 年 11 月に確認（文書ごとの日付は不ぞろい）",
      "第16章"
    ],
    [
      "規格・仕様",
      "ACPI Specification 6.6（第 1 章）",
      "UEFI Forum",
      "6.6 版（2025 年 5 月）",
      "第20章"
    ],
    [
      "規格・仕様",
      "Specifications",
      "UEFI Forum",
      "確認時のページ",
      "第20章"
    ],
    [
      "規格・仕様",
      "UEFI Platform Initialization Specification 1.8（Volume 2 Overview）",
      "UEFI Forum",
      "1.8 版",
      "第20章"
    ],
    [
      "規格・仕様",
      "UEFI Specification 2.11, 32 Secure Boot and Driver Signing",
      "UEFI Forum",
      "2.11 版",
      "第25章"
    ],
    [
      "規格・仕様",
      "UEFI Specification 2.11（第 1 章 Introduction）",
      "UEFI Forum",
      "2.11 版（2024 年）",
      "第20章"
    ],
    [
      "規格・仕様",
      "UEFI Specification 2.11（第 24 章 Network Protocols）",
      "UEFI Forum",
      "2.11 版",
      "第20章"
    ],
    [
      "団体の資料",
      "Commissioning（ASHRAE ブックストア）",
      "ASHRAE",
      "2026 年 11 月に確認",
      "第28章"
    ],
    [
      "団体の資料",
      "CXL Consortium Announces Compute Express Link 3.2 Specification Release（Business Wire 配信）",
      "CXL Consortium",
      "2024 年 12 月 3 日（URL の日付）",
      "第07章"
    ],
    [
      "団体の資料",
      "CXL Consortium Releases Compute Express Link 3.0 Specification to Expand Fabric Capabilities and Management（Business Wire 配信）",
      "CXL Consortium",
      "2022 年 8 月 2 日",
      "第07章"
    ],
    [
      "団体の資料",
      "CXL Consortium Releases the Compute Express Link 4.0 Specification Increasing Speed and Bandwidth（Business Wire 配信）",
      "CXL Consortium",
      "2025 年 11 月 18 日（URL の日付）",
      "第07章"
    ],
    [
      "団体の資料",
      "Compute Express Link (CXL) Device Ecosystem and Usage Models",
      "CXL Consortium",
      "2023 年（資料の掲載は 2023 年 12 月）",
      "第07章"
    ],
    [
      "団体の資料",
      "Redfish Schema Bundle（DSP8010）",
      "DMTF",
      "2026.1、2026 年 4 月 2 日",
      "第24章"
    ],
    [
      "団体の資料",
      "Redfish for Liquid Cooling Equipment",
      "DMTF Redfish Forum",
      "2023 年 11 月（検討中のモデルの説明）",
      "第16章"
    ],
    [
      "団体の資料",
      "List of EIA Standards",
      "ECIA（Electronic Components Industry Association）",
      "ページの表示：2025 年 5 月 8 日時点の一覧（2026 年 11 月に確認）",
      "第03章"
    ],
    [
      "団体の資料",
      "IEEE Standard for Ethernet（IEEE 802.3-2022）",
      "IEEE SA",
      "2022 年 7 月 29 日発行、Active Standard の表示",
      "第02章"
    ],
    [
      "団体の資料",
      "JEDEC Publishes New DDR5 Standard for Advancing Next-Generation High Performance Computing Systems",
      "JEDEC",
      "2020 年 7 月 14 日",
      "第02章・第07章"
    ],
    [
      "団体の資料",
      "JEDEC Unveils Plans for DDR5 MRDIMM and LPDDR6 CAMM Standards to Propel High-Performance Computing and AI（Business Wire 配信）",
      "JEDEC",
      "2024 年 7 月 22 日（URL の日付）",
      "第07章"
    ],
    [
      "団体の資料",
      "NVM Express Releases NVM Express Specifications to Unify AI, Cloud, Client, and Enterprise Storage",
      "NVM Express, Inc.",
      "2024 年 8 月 6 日",
      "第02章"
    ],
    [
      "団体の資料",
      "OCP Accelerator Module (OAM)",
      "OCP",
      "2026 年 11 月に確認",
      "第08章"
    ],
    [
      "団体の資料",
      "Open Accelerator Infrastructure (OAI)",
      "OCP",
      "2026 年 11 月に確認",
      "第08章"
    ],
    [
      "団体の資料",
      "OCP NIC 3.0 Design Specification",
      "OCP Server ワークグループ（NIC サブグループ）",
      "1.5.0（2024 年 9 月 20 日）",
      "第03章"
    ],
    [
      "団体の資料",
      "About - Open Compute Project",
      "OCP（Open Compute Project）",
      "2026 年 11 月に確認",
      "第03章"
    ],
    [
      "団体の資料",
      "Open Rack Base Frame V3 Specification（Open Rack V3 Base Specification）",
      "OCP（Open Compute Project）",
      "Revision 1.0（2022 年 8 月 24 日付、2022 年 9 月 22 日にコミュニティへ公開）",
      "第03章"
    ],
    [
      "団体の資料",
      "PCI-SIG Announces PCI Express 8.0 Specification to Reach 256.0 GT/s（Business Wire 配信）",
      "PCI-SIG",
      "2025 年 8 月 5 日（URL の日付）",
      "第07章"
    ],
    [
      "団体の資料",
      "PCI-SIG Releases PCIe 6.0 Specification Delivering Record Performance to Power Big Data Applications（Business Wire 配信）",
      "PCI-SIG",
      "2022 年 1 月 11 日（URL の日付）",
      "第07章"
    ],
    [
      "団体の資料",
      "PCI-SIG Releases PCIe 7.0 Specification（Business Wire 配信）",
      "PCI-SIG",
      "2025 年 6 月 11 日（URL の日付）",
      "第07章"
    ],
    [
      "団体の資料",
      "The Latest on Form Factors（CMSS24）",
      "SNIA",
      "2024 年",
      "第07章"
    ],
    [
      "団体の資料",
      "The Latest on Form Factors（CMSS24）",
      "SNIA（米国）",
      "2024 年",
      "第09章"
    ],
    [
      "団体の資料",
      "Certifications and Ratings",
      "TIA",
      "日付の記載なし。2026 年 11 月に確認",
      "第18章"
    ],
    [
      "団体の資料",
      "TIA Unveils Revision C of the Global Data Center Infrastructure Standard",
      "TIA",
      "2024 年 5 月 9 日",
      "第18章"
    ],
    [
      "団体の資料",
      "PUE: A Comprehensive Examination of the Metric（White Paper #49）",
      "The Green Grid",
      "2012 年 10 月 2 日",
      "第17章"
    ],
    [
      "団体の資料",
      "UALink Consortium Releases the Ultra Accelerator Link 200G 1.0 Specification（Business Wire 配信）",
      "UALink Consortium",
      "2025 年 4 月 8 日（URL の日付）",
      "第08章"
    ],
    [
      "団体の資料",
      "Mapping PUE trends by data center region, age and size（UII Update 420）",
      "Uptime Institute",
      "2025 年 10 月",
      "第17章"
    ],
    [
      "団体の資料",
      "The growing PUE advantage of larger data centers（UII Update 518）",
      "Uptime Institute",
      "2026 年 8 月（Global Data Center Survey 2026 の値）",
      "第17章"
    ],
    [
      "団体の資料",
      "Uptime Institute Tier Classification System",
      "Uptime Institute",
      "日付の記載なし。2026 年 11 月に確認",
      "第18章"
    ],
    [
      "団体の資料",
      "Avoiding Data Center Construction Problems",
      "Uptime Institute（Keith Klesner）",
      "2015 年 5 月 13 日",
      "第28章"
    ],
    [
      "団体の資料",
      "Lessons Learned from Tier Certification of Constructed Facilities",
      "Uptime Institute（Kevin Heslin）",
      "2016 年 5 月 11 日",
      "第28章"
    ],
    [
      "団体の資料",
      "Improve Project Success Through Mission Critical Commissioning",
      "Uptime Institute（著者：Ryan Orr、Chris Brown、Ed Rafter）",
      "2015 年 5 月 4 日",
      "第28章"
    ],
    [
      "団体の資料",
      "データセンター ファシリティ スタンダードの概要",
      "日本データセンター協会",
      "2010 年 10 月 18 日付",
      "第18章"
    ],
    [
      "団体の資料",
      "データセンターファシリティスタンダード Ver.2.3（改訂・バージョンアップ）のご案内",
      "日本データセンター協会",
      "ページの日付 2017 年 1 月 27 日",
      "第18章"
    ],
    [
      "団体の資料",
      "発電設備等に関する系統アクセスの流れ",
      "電力広域的運営推進機関",
      "2026 年 7 月",
      "第27章"
    ],
    [
      "当局・公的機関",
      "Yan『Introduction to Engineering Thermodynamics』付録 G、NASA Glenn『Properties of Air』",
      "BCcampus／NASA",
      "第15章の参照資料を参照",
      "第16章"
    ],
    [
      "当局・公的機関",
      "SI Brochure 9th edition, Appendix 1",
      "BIPM（国際度量衡局）",
      "第9版（2019）、版 V2.01。2026 年 11 月に確認",
      "第01章"
    ],
    [
      "当局・公的機関",
      "Properties of Air（文字版）",
      "NASA Glenn Research Center",
      "2026 年 11 月に確認（日付の記載なし）",
      "第15章"
    ],
    [
      "当局・公的機関",
      "NIST SP 800-128：Guide for Security-Focused Configuration Management of Information Systems",
      "NIST",
      "2011 年 8 月（2019 年 10 月 10 日の更新を含む）。Final",
      "第21章・第25章"
    ],
    [
      "当局・公的機関",
      "NIST CSRC Glossary：server",
      "NIST（米国国立標準技術研究所）",
      "2026 年 11 月に確認",
      "第01章"
    ],
    [
      "当局・公的機関",
      "SP 800-88 Rev. 2 Guidelines for Media Sanitization",
      "NIST（米国）",
      "2025 年 9 月",
      "第09章"
    ],
    [
      "当局・公的機関",
      "減価償却資産の耐用年数等に関する省令",
      "e-Gov 法令（昭和40年大蔵省令第15号）",
      "2026 年 11 月に確認",
      "第29章"
    ],
    [
      "当局・公的機関",
      "デジタル庁調達手続マニュアル",
      "デジタル庁",
      "令和8年9月改訂",
      "第29章"
    ],
    [
      "当局・公的機関",
      "Energieeffizienzgesetz (EnEfG)、§ 11 Klimaneutrale Rechenzentren",
      "ドイツ連邦司法省・連邦司法庁",
      "署名 2023 年 11 月 13 日、施行 2023 年 11 月 18 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Bundeskabinett beschließt Energieeffizienzgesetz、hib 613/2026",
      "ドイツ連邦政府の経済担当省、ドイツ連邦議会",
      "2026 年 6 月 24 日、2026 年 7 月 28 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "FAQ Q12-1（外国にある第三者への個人データの提供）",
      "個人情報保護委員会",
      "2026 年 11 月に確認（更新日の表示なし）",
      "第30章"
    ],
    [
      "当局・公的機関",
      "基幹インフラ制度に関する法令等の改正（概要）",
      "内閣府（基幹インフラ担当）",
      "2026 年 7 月（一部は令和8年10月に加筆・訂正）",
      "第30章"
    ],
    [
      "当局・公的機関",
      "主な減価償却資産の耐用年数表",
      "国税庁",
      "2026 年 11 月に確認（表に時点の表示なし）",
      "第29章"
    ],
    [
      "当局・公的機関",
      "ECHA publishes PFAS restriction proposal",
      "欧州化学機関（ECHA）",
      "2023 年 2 月 7 日",
      "第16章"
    ],
    [
      "当局・公的機関",
      "EU launches InvestAI initiative to mobilise €200 billion of investment in artificial intelligence",
      "欧州委員会",
      "2025 年 2 月 11 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Energy performance of data centres",
      "欧州委員会",
      "2026 年 11 月に確認（更新日の表示なし）",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Commission Delegated Regulation (EU) 2024/1364",
      "欧州委員会（EUR-Lex）",
      "2024 年 3 月 14 日採択、2024 年 6 月 6 日発効",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Directive (EU) 2023/1791 on energy efficiency",
      "欧州議会・理事会（EUR-Lex）",
      "2023 年 9 月 13 日付、EU 官報 2023 年 9 月 20 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Regulation (EU) 2016/679（GDPR）",
      "欧州議会・理事会（EUR-Lex）",
      "2016 年 4 月 27 日付、EU 官報 2016 年 5 月 4 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "二酸化炭素消火設備の安全対策について（通知）",
      "消防庁（予防課長・危険物規制課長）",
      "平成8年9月20日、消防予第193号・消防危第117号",
      "第18章"
    ],
    [
      "当局・公的機関",
      "Department of Commerce Announces Rescission of Biden-Era Artificial Intelligence Diffusion Rule, Strengthens Chip-Related Export Controls",
      "米国商務省 BIS",
      "2025 年 5 月 13 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Enhanced Favorable Treatment for the United Arab Emirates Under the Export Administration Regulations",
      "米国商務省 BIS（連邦官報）",
      "2026 年 7 月 14 日、発効 2026 年 7 月 10 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Implementation of Additional Export Controls: Certain Advanced Computing Items; Supercomputer and Semiconductor End Use; Updates and Corrections",
      "米国商務省 BIS（連邦官報）",
      "2023 年 10 月 25 日、発効 2023 年 11 月 17 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "Revision to License Review Policy for Advanced Computing Commodities",
      "米国商務省 BIS（連邦官報）",
      "2026 年 1 月 15 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "AI・半導体産業基盤強化フレーム",
      "経済産業省",
      "2024 年 11 月の経済対策で策定。ページ更新 2026 年 5 月 14 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "安全保障貿易管理：リスト規制",
      "経済産業省",
      "2026 年 11 月に確認（更新日の表示なし）",
      "第30章"
    ],
    [
      "当局・公的機関",
      "経済安全保障推進法に基づくクラウドプログラムの供給確保計画について、新たな認定を行いました",
      "経済産業省",
      "2024 年 2 月 20 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "電気設備の申請・届出等の手引き",
      "経済産業省",
      "日付の記載なし。2026 年 11 月に確認",
      "第12章"
    ],
    [
      "当局・公的機関",
      "2026年度における変更点について",
      "経済産業省 中部経済産業局",
      "2026 年 5 月",
      "第30章"
    ],
    [
      "当局・公的機関",
      "電気設備に関する技術基準を定める省令の解説",
      "経済産業省 産業保安・安全グループ 電力安全課",
      "令和7年11月",
      "第12章"
    ],
    [
      "当局・公的機関",
      "消防法令抜粋（消防法上の危険物の定義、試験方法など）",
      "総務省消防庁の検討会資料",
      "日付の記載なし。2026 年 11 月に確認",
      "第13章"
    ],
    [
      "当局・公的機関",
      "消防法施行規則及び対象火気設備等の位置、構造及び管理並びに対象火気器具等の取扱いに関する条例の制定に関する基準を定める省令の一部を改正する省令（案）等に対する意見公募の結果及び改正省令等の公布",
      "総務省消防庁（予防課）",
      "2023 年 5 月 31 日",
      "第13章"
    ],
    [
      "当局・公的機関",
      "安定的なエネルギー需給構造の確立を図るためのエネルギーの使用の合理化等に関する法律等の一部を改正する法律、エネルギーの使用の合理化及び非化石エネルギーへの転換等に関する法律",
      "衆議院、日本法令外国語訳データベース",
      "令和4年5月20日公布、令和5年4月1日施行",
      "第30章"
    ],
    [
      "当局・公的機関",
      "ベンチマーク指標の実績について（令和５年度定期報告分）",
      "資源エネルギー庁",
      "2024 年 6 月 25 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "改正省エネ法の具体論等について",
      "資源エネルギー庁",
      "2022 年 6 月 8 日",
      "第30章"
    ],
    [
      "当局・公的機関",
      "増加が見込まれるデータセンターの電力需要をどうする？さらなる省エネを進める新たな制度に注目！",
      "資源エネルギー庁（エネこれ）",
      "2026 年 5 月 20 日",
      "第27章・第30章"
    ],
    [
      "当局・公的機関",
      "局地的な大規模需要に対する規律確保について（資料1-2）",
      "資源エネルギー庁（次世代電力系統ワーキンググループ）",
      "2026 年 4 月 16 日",
      "第27章"
    ],
    [
      "当局・公的機関",
      "局地的な大規模需要に対する規律確保について（資料3）",
      "資源エネルギー庁（次世代電力系統ワーキンググループ）",
      "2025 年 11 月 14 日",
      "第27章"
    ],
    [
      "当局・公的機関",
      "局地的な大規模需要の実態と論点について（資料3）",
      "資源エネルギー庁（次世代電力系統ワーキンググループ）",
      "2025 年 3 月 17 日",
      "第27章"
    ],
    [
      "当局・公的機関",
      "局地的な大規模需要立地への対応について（資料5）",
      "資源エネルギー庁（次世代電力系統ワーキンググループ）",
      "2025 年 1 月 23 日",
      "第27章"
    ],
    [
      "当局・公的機関",
      "「財務諸表等の用語、様式及び作成方法に関する規則等の一部を改正する内閣府令（案）」等の公表について",
      "金融庁",
      "2024 年 12 月 24 日",
      "第29章"
    ],
    [
      "企業・プロジェクトの資料",
      "3M to Exit PFAS Manufacturing by the End of 2025",
      "3M",
      "2022 年 12 月 20 日",
      "第16章"
    ],
    [
      "企業・プロジェクトの資料",
      "AMD Form 10-K/A（会計年度 2025）",
      "AMD",
      "会計年度 2025（2025 年 12 月 27 日終了）",
      "第26章"
    ],
    [
      "企業・プロジェクトの資料",
      "AMD64 Architecture Programmer's Manual, Volume 1: Application Programming（Publication No. 24592）",
      "AMD",
      "Rev. 3.25、2026 年 5 月",
      "第02章"
    ],
    [
      "企業・プロジェクトの資料",
      "AMD Instinct MI300X Accelerator Data Sheet",
      "AMD（米国）",
      "版・日付の記載なし（© 2025）",
      "第08章"
    ],
    [
      "企業・プロジェクトの資料",
      "AMD Instinct MI300X Platform Data Sheet",
      "AMD（米国）",
      "版・日付の記載なし（© 2023）",
      "第08章"
    ],
    [
      "企業・プロジェクトの資料",
      "AMD Launches 5th Gen AMD EPYC CPUs, Maintaining Leadership Performance and Features for the Modern Data Center",
      "AMD（米国）",
      "2024 年 10 月 10 日",
      "第06章"
    ],
    [
      "企業・プロジェクトの資料",
      "Form 8-K（報告日 2026 年 8 月 4 日）",
      "AMD（米国）",
      "2026 年 8 月 4 日",
      "第06章"
    ],
    [
      "団体の資料",
      "Emergence and Expansion of Liquid Cooling in Mainstream Data Centers",
      "ASHRAE TC 9.9",
      "2021 年",
      "第15章・第16章"
    ],
    [
      "企業・プロジェクトの資料",
      "Glossary — Ansible Community Documentation",
      "Ansible コミュニティ",
      "確認時のページ",
      "第21章"
    ],
    [
      "企業・プロジェクトの資料",
      "ansible/ansible",
      "Ansible プロジェクト",
      "確認時のページ",
      "第21章"
    ],
    [
      "企業・プロジェクトの資料",
      "Arm Architecture",
      "Arm",
      "2026 年 11 月に確認",
      "第02章"
    ],
    [
      "企業・プロジェクトの資料",
      "Contact us",
      "Arm",
      "2026 年 11 月に確認",
      "第26章"
    ],
    [
      "企業・プロジェクトの資料",
      "80 PLUS® Certification Program FAQs",
      "CLEAResult",
      "日付の記載なし。2026 年 11 月に確認",
      "第14章"
    ],
    [
      "企業・プロジェクトの資料",
      "What is 80 PLUS® certification program?",
      "CLEAResult（80 PLUS の運営元）",
      "日付の記載なし。2026 年 11 月に確認",
      "第14章"
    ],
    [
      "団体の資料",
      "Redfish Firmware Update White Paper（DSP2062）1.2.0",
      "DMTF",
      "2026 年 4 月 3 日",
      "第19章・第20章"
    ],
    [
      "企業・プロジェクトの資料",
      "iDRAC: Redfish API with Dell integrated Remote Access Controller",
      "Dell Technologies",
      "確認時のページ",
      "第19章"
    ],
    [
      "企業・プロジェクトの資料",
      "FAQ（Dell Technologies）、Contact Us（HPE）",
      "Dell Technologies、HPE",
      "確認時のページ",
      "第19章"
    ],
    [
      "企業・プロジェクトの資料",
      "Google の機械学習の需要応答の記事（Google のブログ）",
      "Google",
      "2025 年 8 月 4 日",
      "第24章"
    ],
    [
      "企業・プロジェクトの資料",
      "Enabling 1 MW IT racks and liquid cooling at OCP EMEA Summit",
      "Google（Google Cloud のブログ）",
      "2025 年 4 月 29 日",
      "第16章"
    ],
    [
      "企業・プロジェクトの資料",
      "Enabling 1 MW IT racks and liquid cooling at OCP EMEA Summit",
      "Google（米国）",
      "2025 年 4 月 29 日",
      "第14章"
    ],
    [
      "企業・プロジェクトの資料",
      "HPE iLO 6 Redfish service",
      "Hewlett Packard Enterprise",
      "確認時のページ",
      "第19章"
    ],
    [
      "当局・公的機関",
      "Artificial Intelligence, AI and Energy",
      "IEA",
      "2026 年 11 月に確認",
      "第27章"
    ],
    [
      "当局・公的機関",
      "Data centre electricity use surged in 2025, even with tightening bottlenecks driving a scramble for solutions",
      "IEA",
      "2026 年公表（ページに公表日の表示なし）",
      "第26章・第27章"
    ],
    [
      "当局・公的機関",
      "Key Questions on Energy and AI — Executive summary",
      "IEA",
      "2026 年公表（ページに公表日の表示なし）",
      "第26章・第27章"
    ],
    [
      "規格・仕様",
      "ITU-T L.1200 Direct current power feeding interface up to 400 V at the input to telecommunication and ICT equipment",
      "ITU-T",
      "2012 年 5 月 29 日承認",
      "第14章"
    ],
    [
      "企業・プロジェクトの資料",
      "IPMI v2.0 の発表（Intel Developer Forum）",
      "Intel",
      "2004 年 2 月 18 日",
      "第19章"
    ],
    [
      "企業・プロジェクトの資料",
      "Intel in California",
      "Intel",
      "ページの最終更新 2026 年 6 月 26 日",
      "第26章"
    ],
    [
      "企業・プロジェクトの資料",
      "Software Developer Manuals for Intel 64 and IA-32 Architectures",
      "Intel",
      "ページの表示：Last Reviewed 2021 年 10 月 18 日",
      "第02章"
    ],
    [
      "企業・プロジェクトの資料",
      "Intel Unveils Next-Generation AI Solutions with the Launch of Xeon 6 and Gaudi 3",
      "Intel（米国）",
      "2024 年 9 月 24 日",
      "第08章"
    ],
    [
      "企業・プロジェクトの資料",
      "Intel in California",
      "Intel（米国）",
      "2026 年 11 月に確認",
      "第06章"
    ],
    [
      "企業・プロジェクトの資料",
      "Press Kit: Intel Xeon 6 with P-cores and Gaudi 3 AI Accelerators",
      "Intel（米国）",
      "2026 年 11 月に確認",
      "第08章"
    ],
    [
      "企業・プロジェクトの資料",
      "Thermal Design Power (TDP) in Intel Processors",
      "Intel（米国）",
      "ページ表示の最終確認日 2023 年 4 月 4 日",
      "第06章"
    ],
    [
      "企業・プロジェクトの資料",
      "Device Plugins",
      "Kubernetes プロジェクト",
      "確認時のページ（変更日 2026-07-27）",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "Dynamic Resource Allocation（v1.36 版の文書）",
      "Kubernetes プロジェクト",
      "v1.36 版の文書",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "Linux Foundation Launches OpenTofu: A New Open Source Alternative to Terraform",
      "Linux Foundation",
      "2023 年 9 月 20 日",
      "第21章"
    ],
    [
      "企業・プロジェクトの資料",
      "OpenBMC Project Community Comes Together at The Linux Foundation",
      "Linux Foundation",
      "2018 年 3 月 19 日",
      "第19章"
    ],
    [
      "企業・プロジェクトの資料",
      "京阪神エリアからアクセスしやすい関西最大級の「大阪第7データセンター」を提供開始",
      "NTT コミュニケーションズ（日本。現 NTT ドコモビジネス）",
      "2019 年 11 月 27 日",
      "第14章・第18章"
    ],
    [
      "企業・プロジェクトの資料",
      "Contact the Board（NVIDIA）",
      "NVIDIA",
      "確認時のページ",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "GB200 NVL72",
      "NVIDIA",
      "2026 年 11 月に確認（日付の記載なし）",
      "第16章"
    ],
    [
      "企業・プロジェクトの資料",
      "NVIDIA Acquires Open-Source Workload Management Provider SchedMD",
      "NVIDIA",
      "2025 年 12 月 15 日",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "NVIDIA Form 10-K（会計年度 2026）",
      "NVIDIA",
      "会計年度 2026（2026 年 1 月 25 日終了）",
      "第26章"
    ],
    [
      "企業・プロジェクトの資料",
      "Contact Us: Americas Locations & Regional Offices",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第06章"
    ],
    [
      "企業・プロジェクトの資料",
      "DGX SuperPOD",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第11章"
    ],
    [
      "企業・プロジェクトの資料",
      "Ethernet Networking",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第10章"
    ],
    [
      "企業・プロジェクトの資料",
      "GB200 NVL72",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第11章"
    ],
    [
      "企業・プロジェクトの資料",
      "H100 GPU",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第08章"
    ],
    [
      "企業・プロジェクトの資料",
      "Introducing the NVIDIA Grace CPU Superchip",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第06章"
    ],
    [
      "企業・プロジェクトの資料",
      "Quantum-X800",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第10章"
    ],
    [
      "企業・プロジェクトの資料",
      "Spectrum-X",
      "NVIDIA（米国）",
      "2026 年 11 月に確認",
      "第10章"
    ],
    [
      "企業・プロジェクトの資料",
      "NVIDIA 800 V HVDC Architecture Will Power the Next Generation of AI Factories",
      "NVIDIA（米国）技術ブログ",
      "2025 年 5 月 20 日",
      "第14章"
    ],
    [
      "団体の資料",
      "Data Center Liquid Distribution: Guidance & Reference Designs",
      "OCP（Advanced Cooling Facilities サブプロジェクト）",
      "Rev 1.0、2024 年 1 月 8 日",
      "第16章"
    ],
    [
      "企業・プロジェクトの資料",
      "Getting started — OpenTofu",
      "OpenTofu プロジェクト",
      "確認時のページ",
      "第21章"
    ],
    [
      "企業・プロジェクトの資料",
      "ITIL 4 Practitioner: Change Enablement",
      "PeopleCert",
      "確認時のページ",
      "第21章"
    ],
    [
      "企業・プロジェクトの資料",
      "Office locations",
      "Red Hat",
      "確認時のページ",
      "第21章"
    ],
    [
      "企業・プロジェクトの資料",
      "Job State Codes",
      "Slurm 公式",
      "確認時のページ",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "Multifactor Priority Plugin",
      "Slurm 公式",
      "確認時のページ",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "Scheduling Configuration Guide",
      "Slurm 公式",
      "確認時のページ",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "Slurm Workload Manager — Overview",
      "Slurm 公式",
      "確認時のページ",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "Topology Guide",
      "Slurm 公式",
      "確認時のページ",
      "第22章"
    ],
    [
      "企業・プロジェクトの資料",
      "DigiPlex data center to heat 10,000 Stockholm households",
      "Stockholm Data Parks",
      "2018 年 3 月 12 日",
      "第17章"
    ],
    [
      "企業・プロジェクトの資料",
      "About Stockholm Exergi",
      "Stockholm Exergi",
      "2026 年 11 月に確認（日付の記載なし）",
      "第17章"
    ],
    [
      "教科書・一般知識・他講座",
      "半導体講義 第19章、第20章（半導体講義 3 部の産業構造と供給網の章）",
      "TTJ",
      "—",
      "第26章"
    ],
    [
      "団体の資料",
      "UEFI Advanced Configuration and Power Interface (ACPI) 6.6 Specification Available",
      "UEFI Forum",
      "2025 年 5 月ごろ（ページに日付の記載なし）",
      "第20章"
    ],
    [
      "団体の資料",
      "UEFI Forum Releases UEFI 2.11 and PI 1.9 Specifications",
      "UEFI Forum",
      "2024 年 12 月",
      "第20章"
    ],
    [
      "団体の資料",
      "Goodbye PXE, Hello HTTP Boot",
      "UEFI Forum（公開の講演資料）",
      "2015 年 10 月 7 日",
      "第25章"
    ],
    [
      "企業・プロジェクトの資料",
      "Goodbye PXE, Hello HTTP Boot",
      "UEFI Forum（講演者の所属企業の資料）",
      "2015 年 10 月 7 日",
      "第20章"
    ],
    [
      "企業・プロジェクトの資料",
      "本社の所在の確認（NVIDIA・AMD・Intel）",
      "—",
      "—",
      "第08章"
    ],
    [
      "当局・公的機関",
      "経済施策を一体的に講ずることによる安全保障の確保の推進に関する法律案",
      "参議院",
      "2022 年 5 月 11 日成立、2022 年 5 月 18 日公布",
      "第30章"
    ],
    [
      "教科書・一般知識・他講座",
      "第27章 データセンターの立地と電力・水",
      "本講座",
      "—",
      "第31章"
    ],
    [
      "教科書・一般知識・他講座",
      "第28章 機器の搬入・設置・立上げ",
      "本講座",
      "—",
      "第31章"
    ],
    [
      "教科書・一般知識・他講座",
      "第29章 調達と総保有コストの考え方",
      "本講座",
      "—",
      "第31章"
    ],
    [
      "教科書・一般知識・他講座",
      "第30章 各国の政策と規制の枠組み",
      "本講座",
      "—",
      "第31章"
    ],
    [
      "企業・プロジェクトの資料",
      "系統連系に係る設備設計について〈受電設備（特別高圧）〉",
      "東京電力パワーグリッド",
      "2020 年 4 月 1 日実施",
      "第12章"
    ],
    [
      "教科書・一般知識・他講座",
      "Introduction to Engineering Thermodynamics（付録 G）",
      "Claire Yu Yan（University of British Columbia, Okanagan。BCcampus 経由。Engineering LibreTexts に掲載）",
      "2026 年 11 月に確認（版の日付の記載なし）",
      "第15章"
    ],
    [
      "教科書・一般知識・他講座",
      "Exploring static UPS systems",
      "Data Center Dynamics",
      "日付の記載なし。2026 年 11 月に確認",
      "第13章"
    ],
    [
      "教科書・一般知識・他講座",
      "Computer Architecture: A Quantitative Approach（Hennessy・Patterson 著）",
      "Morgan Kaufmann",
      "—",
      "第05章"
    ],
    [
      "教科書・一般知識・他講座",
      "Computer Organization and Design（Patterson・Hennessy 著）",
      "Morgan Kaufmann",
      "—",
      "第01章・第02章"
    ],
    [
      "教科書・一般知識・他講座",
      "configuration management — CSRC Glossary",
      "NIST",
      "確認時のページ",
      "第21章"
    ],
    [
      "教科書・一般知識・他講座",
      "Water Properties（OpenStax Chemistry の付録）",
      "OpenStax（LibreTexts 掲載）",
      "2026 年 11 月に確認（版の日付の記載なし）",
      "第16章"
    ],
    [
      "教科書・一般知識・他講座",
      "Choosing the Right UPS Topology for IIOT and Critical Power Applications",
      "Schneider Electric のブログ（URL の日付：2016 年 12 月 14 日）",
      "ページに執筆者・発行日の記載なし",
      "第13章"
    ],
    [
      "教科書・一般知識・他講座",
      "半導体講義 第15章",
      "—",
      "—",
      "第08章"
    ],
    [
      "教科書・一般知識・他講座",
      "引込線（保安責任・財産の分界点）",
      "東京電力パワーグリッド",
      "日付の記載なし。2026 年 11 月に確認",
      "第12章"
    ]
  ],
  "filter": 0
});

CN.glossary([
  {
    "t": "ASHRAE",
    "en": "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
    "d": "米国の暖房・冷凍・空調の学会。データセンターの温湿度や液冷の指針を、技術委員会 TC 9.9 が公開している。",
    "ch": [
      15,
      16,
      24
    ]
  },
  {
    "t": "The Green Grid",
    "en": "The Green Grid",
    "d": "データセンターの効率を考える業界の団体。PUE の考え方の白書を公開している。",
    "ch": [
      17
    ]
  },
  {
    "t": "Uptime Institute",
    "en": "Uptime Institute",
    "d": "データセンターの格付け（Tier）の体系を持つ団体。",
    "ch": [
      18
    ]
  },
  {
    "t": "PCI-SIG",
    "en": "Peripheral Component Interconnect Special Interest Group",
    "d": "PCI Express（PCIe）の仕様を作り、公開している団体。",
    "ch": [
      7
    ]
  },
  {
    "t": "CXL Consortium",
    "en": "Compute Express Link Consortium",
    "d": "CXL の仕様を作る団体。CXL は、メモリなどを PCIe の上でつなぐ規格。",
    "ch": [
      7
    ]
  },
  {
    "t": "JEDEC",
    "en": "JEDEC Solid State Technology Association",
    "d": "メモリなどの半導体の規格を作る標準化団体。DDR5 の規格番号は JESD79-5。",
    "ch": [
      2,
      7
    ]
  },
  {
    "t": "SNIA",
    "en": "Storage Networking Industry Association",
    "d": "ストレージの業界団体。SSD の形状の規格（SFF-TA）などを公開している。",
    "ch": [
      9
    ]
  },
  {
    "t": "NVM Express",
    "en": "NVM Express, Inc.",
    "d": "NVMe の仕様を管理している団体。",
    "ch": [
      2,
      9
    ]
  },
  {
    "t": "IEEE",
    "en": "Institute of Electrical and Electronics Engineers",
    "d": "電気・電子の学会で、規格も作る。イーサネットは IEEE 802.3。",
    "ch": [
      2,
      10
    ]
  },
  {
    "t": "IBTA",
    "en": "InfiniBand Trade Association",
    "d": "InfiniBand の仕様を管理する業界団体（一般知識）。",
    "ch": [
      10
    ]
  },
  {
    "t": "UEC",
    "en": "Ultra Ethernet Consortium",
    "d": "AI や HPC 向けのイーサネットの改良を進める団体（一般知識）。",
    "ch": [
      10
    ]
  },
  {
    "t": "UALink Consortium",
    "en": "Ultra Accelerator Link Consortium",
    "d": "アクセラレータ同士をつなぐ規格 UALink の仕様を公開している団体。",
    "ch": [
      8
    ]
  },
  {
    "t": "TCG",
    "en": "Trusted Computing Group",
    "d": "TPM など、機器の信頼性の基盤の仕様を作る団体（一般知識）。",
    "ch": [
      25
    ]
  },
  {
    "t": "UEFI Forum",
    "en": "Unified Extensible Firmware Interface Forum",
    "d": "UEFI と ACPI の仕様を管理している団体。",
    "ch": [
      20
    ]
  },
  {
    "t": "CNCF",
    "en": "Cloud Native Computing Foundation",
    "d": "Kubernetes などのクラウド向けソフトウェアを支える団体（一般知識）。",
    "ch": [
      4,
      22
    ]
  },
  {
    "t": "日本データセンター協会",
    "en": "Japan Data Center Council",
    "d": "JDCC。日本のデータセンターのファシリティスタンダードを公開している団体。",
    "ch": [
      18
    ]
  },
  {
    "t": "IEA",
    "en": "International Energy Agency",
    "d": "国際エネルギー機関。データセンターの電力需要の報告を公開している。",
    "ch": [
      26,
      27
    ]
  },
  {
    "t": "NIST",
    "en": "National Institute of Standards and Technology",
    "d": "米国国立標準技術研究所。用語集や情報システムの指針を公開している。",
    "ch": [
      1,
      21,
      25
    ]
  },
  {
    "t": "BIS",
    "en": "Bureau of Industry and Security",
    "d": "米国商務省の産業安全保障局。先進計算機・AI 向けチップの輸出管理の規則を担当する。",
    "ch": [
      30
    ]
  }
]);

CN.exam([
  {
    "part": 5,
    "q": "計算サーバーの消費電力と、冷却の関係として、最も適切な説明はどれですか。",
    "c": [
      "サーバーが使った電力のほとんどは、最後に熱になり、冷却の設備で運び出す必要がある",
      "サーバーの電力は計算に使われて消えるので、冷却の設備は電力に関係しない",
      "冷却が必要なのは CPU だけで、電源ユニットやメモリは熱を出さない",
      "冷却の設備は、サーバーが使う電力が少ないほど、多くの電力が要る"
    ],
    "a": 0,
    "why": "サーバーに入った電力は、計算をしたあと、ほぼ熱になる。この熱を、空気や液体で運び出し、最後に屋外へ捨てる（第12・15〜17章）。",
    "ch": 12
  },
  {
    "part": 5,
    "q": "BMC と、BMS・DCIM の違いとして、正しい説明はどれですか。",
    "c": [
      "BMC も BMS も、サーバーの OS の中で動くソフトウェアである",
      "BMC はサーバー 1 台の遠隔管理用の仕組みで、BMS・DCIM は建物や設備の側を見る仕組みである",
      "BMS と DCIM は、サーバーの電源を入れるためだけの仕組みである",
      "BMC は建物全体の空調を制御し、DCIM はサーバー 1 台の状態だけを見る"
    ],
    "a": 1,
    "why": "BMC は、サーバー 1 台に載った管理用のコントローラ（第19章）。BMS・DCIM は、建物や設備の監視制御と管理の仕組み（第24章）。見る範囲が違う。",
    "ch": 19
  },
  {
    "part": 5,
    "q": "他の施設の PUE や電力密度の数字を比べるとき、最初に確かめることとして、適切なものはどれですか。",
    "c": [
      "数字が小さいほうを、常に良い施設と決める",
      "数字の発表元が有名かどうかだけを見る",
      "どちらも、同じ定義と測る範囲、期間、条件で出された数字かを確かめる",
      "発表された日付だけをそろえればよい"
    ],
    "a": 2,
    "why": "PUE や密度は、測る範囲・期間・条件で値が変わる。定義と条件をそろえずに比べると、判断を誤る（第17・18章）。",
    "ch": 17
  },
  {
    "part": 5,
    "q": "新しいラックを置く前に、IT 側が施設側と確かめる項目として、適切な組み合わせはどれですか。",
    "c": [
      "ラックの色と、ホールの照明の明るさだけ",
      "使える電力の容量だけ",
      "ラックの外装の品名だけ",
      "電力の容量と系統（A 系・B 系）、冷却の方式と能力、床の耐荷重、搬入の経路"
    ],
    "a": 3,
    "why": "ラックには、電力・冷却・重さ・搬入の条件がある。IT 側と施設側で、事前にそろえて確かめる（第03・11・12・18・28章）。",
    "ch": 11
  }
]);
