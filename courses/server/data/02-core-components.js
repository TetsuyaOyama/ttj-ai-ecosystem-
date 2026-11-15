/* 第02章 事実確認表（担当 A、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | Intel は x86 の 64 ビット版の仕様を「Intel 64」の名前で公開している（マニュアルの名称は Intel 64 and IA-32 Architectures） | — | ページの表示：Last Reviewed 2021-10-18 | Intel『Software Developer Manuals for Intel 64 and IA-32 Architectures』 | https://intel.com/content/www/us/en/support/articles/000006715/processors.html | ○ | 2026-11-14 | 本文「CPU」、refs |
| 2 | 規格 | AMD は AMD64 を、従来の x86 を 64 ビットに拡張し、下位互換をもつもの（backward-compatible extension）と説明している | — | Rev. 3.25、2026-05 | AMD『AMD64 Architecture Programmer's Manual, Volume 1: Application Programming』（Publication No. 24592） | https://docs.amd.com/api/khub/documents/OdDzCKsU4uf~KbI1htdPvA/content | ○ | 2026-11-14 | 本文「CPU」、refs |
| 3 | 発表 | Arm は、命令セットなどの仕様をパートナーにライセンスし、パートナーが準拠するチップを作る | — | 2026-11-14 に確認 | Arm『Arm Architecture』 | https://www.arm.com/architecture | ○ | 2026-11-14 | 本文「CPU」 |
| 4 | 企業 | Intel の本社は米国（カリフォルニア州サンタクララ。Intel 自身のページが「Santa Clara is home to Intel's headquarters」と記す） | — | 2026-11-14 に確認 | Intel『Intel in California』 | https://www.intel.com/content/www/us/en/corporate-responsibility/intel-in-california.html | ○ | 2026-11-14 | 本文「CPU」（初出の括弧） |
| 5 | 企業 | AMD（Advanced Micro Devices, Inc.）の主たる事務所は米国カリフォルニア州サンタクララ | — | 2026-02-04 の Form 10-K/A | AMD『Form 10-K/A（FY2025、2025-12-27 期末）』表紙 | https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000021/amd-20251227.htm | ○ | 2026-11-14 | 本文「CPU」（初出の括弧） |
| 6 | 企業 | Arm の Global Headquarters は英国ケンブリッジ（北米本部は米国サンノゼ） | — | 2026-11-14 に確認 | Arm『Contact Us』 | https://www.arm.com/company/contact-us | ○ | 2026-11-14 | 本文「CPU」（初出の括弧） |
| 7 | 規格 | DDR5 SDRAM の規格番号は JESD79-5（JEDEC が 2020-07-14 に新規格として公表） | JESD79-5 | 2020-07-14 | JEDEC『JEDEC Publishes New DDR5 Standard for Advancing Next-Generation High Performance Computing Systems』 | https://www.jedec.org/news/pressreleases/jedec-publishes-new-ddr5-standard-advancing-next-generation-high-performance | ○ | 2026-11-14 | 本文「メインメモリ」、c02-hier |
| 8 | 規格 | イーサネットの標準規格は IEEE 802.3（IEEE Standard for Ethernet、802.3-2022 は 2022-07-29 発行、Active Standard の表示） | IEEE 802.3-2022 | 2022-07-29 | IEEE SA『IEEE Standard for Ethernet』 | https://standards.ieee.org/ieee/802.3/10422/ | ○ | 2026-11-14 | 本文「ネットワーク」 |
| 9 | 発表 | NVMe は、1 つの PCIe SSD 仕様から、複数の仕様の群に成長した（NVM Express, Inc. の 2024-08-06 の発表） | — | 2024-08-06 | NVM Express, Inc.『NVM Express Releases NVM Express Specifications to Unify AI, Cloud, Client, and Enterprise Storage』 | https://nvmexpress.org/?p=19725 | ○ | 2026-11-14 | 本文「ストレージ」 |
| 10 | 一般知識 | キャッシュは、同じデータや近くのデータを続けて使う傾向に効く。メモリ階層は、速いほど小さい。コア・スレッド・クロック・IOPS・スループットの定義。1 byte = 8 bit | 8 bit | — | Patterson・Hennessy『Computer Organization and Design』 | —（教科書。数値を伴わない） | × | 2026-11-14 | 本文全体、c02-hier、c02-terms、c02-quiz |
確認できず書かなかった：
- JEDEC の JESD79-5 系の個別ページ（jedec.org の規格ページ）：取得できなかったため、現行の版（JESD79-5D など）は書かなかった。規格番号は 2020-07-14 の公表ページで確認できた範囲だけ。
- NVMe の現行の版：複数の版が発表されており、一次資料（NVM Express の仕様ページ）で最新を確認できなかったため、書かなかった（第09章の持ち主）。
- メモリ階層の速さ・容量の数値：書かない（一般論の言葉だけ）。
*/

CN.add('stack', 'c02-hier', {
  title: 'メモリ階層：上ほど速く小さく、下ほど遅く大きい（数値は書かない）',
  labels: { 'stack.role.app': 'CPU の中', 'stack.role.payload': 'メインメモリ', 'stack.role.transport': 'フラッシュメモリ', 'stack.role.net': '磁気ディスク' },
  stacks: [
    { name: 'メモリ階層', between: ['CPU（上）', '大容量の記憶（下）'], plane: 'cp', carries: 'データと命令', note: '上の層ほど、CPU に近く、速く、容量は小さく、1 ビットあたりの費用は高くなります。下の層ほど、その逆です。層の間で、使うデータが入れ替わります。数値は、製品と世代で大きく違うので、ここには書きません。',
      layers: [
        { n: 'レジスタ', sub: 'CPU の中・最速', role: 'app', d: 'CPU が、いま計算に使っているデータを置く、最も小さく最も速い記憶。電源を切ると消える。', spec: '一般知識（Patterson・Hennessy）' },
        { n: 'キャッシュ', sub: 'CPU の中や近く', role: 'app', d: 'よく使うデータの写しを置く、小さくて速い記憶。CPU はまずここを見て、なければメモリへ取りに行く。電源を切ると消える。', spec: '一般知識（Patterson・Hennessy）' },
        { n: 'メインメモリ', sub: 'DRAM', role: 'payload', d: '処理中のプログラムとデータを置く作業台。キャッシュより遅いが、容量は大きい。**電源を切ると消える**（揮発性）。', spec: '一般知識。DDR5 の規格番号は JESD79-5（JEDEC、2020 年 7 月 14 日）' },
        { n: 'SSD', sub: 'フラッシュメモリ', role: 'transport', d: '電源を切っても残る記憶。機械の動きがないので、HDD より待ちが短い。書き換えの回数に限りがある。', spec: '一般知識' },
        { n: 'HDD', sub: '磁気ディスク', role: 'net', d: '回転する円盤に磁気で書く記憶。容量あたりの費用を抑えやすいが、読み書きは機械の動きを待つ。電源を切っても残る。', spec: '一般知識' }
      ] }
  ]
});

CN.add('table', 'c02-terms', {
  title: '性能の言葉の早見表',
  caption: '単位は一般的な書き方です。数値は書いていません（出典：一般知識。Patterson・Hennessy 著『Computer Organization and Design』ほか）',
  cols: ['言葉', '単位', '何を表すか', '混同しやすい言葉', '主な部品'],
  rows: [
    ['コア数', '個', '命令を同時に実行できる単位の数', 'スレッド数（コアが受け持つ命令の流れ。1 コアで複数を同時に扱う方式もある）', 'CPU'],
    ['クロック', 'Hz（GHz など）', '命令を進める拍の速さ', '性能そのもの（同じクロックでも設計で変わる）', 'CPU'],
    ['容量', 'GB、TB', 'ためられるデータの量', '帯域幅（運べる速さ）', 'メモリ・ストレージ'],
    ['帯域幅', 'GB/s（メモリ・ストレージ）、Gb/s（通信）', '単位時間に運べるデータ量', '遅延、容量。byte と bit', 'メモリ・ストレージ・ネットワーク'],
    ['遅延', 's、ms、μs など', '1 回の操作を始めてから結果が返るまでの時間', '帯域幅', 'メモリ・ストレージ・ネットワーク'],
    ['IOPS', '回/秒', '1 秒にこなせる読み書きの回数', 'スループット（運ぶデータ量）', 'ストレージ'],
    ['スループット', 'MB/s、GB/s', '1 秒に運べるデータ量（実際の処理で）', 'IOPS、帯域幅（規格や部品の上限）', 'ストレージ・ネットワーク'],
    ['書き換え耐久性', '指標は製品ごと', 'SSD が書き換えに耐えられる量の目安', '容量', 'ストレージ（SSD）'],
    ['揮発性', '—', '電源を切ると中身が消えるかどうか', '耐久性（書き換えの限度）', 'メモリ・ストレージ']
  ],
  filter: 4,
  detail: [
    'コアが多くても、仕事を並列に分けられなければ、効果は出ません。',
    '命令の拍の速さです。1 拍にこなせる仕事は、CPU の設計で違います。',
    '容量は、置ける量です。大きくても、速いとは限りません。',
    'bit と byte を区別します。1 byte は 8 bit。通信は Gb/s、メモリ・ストレージは GB/s が多いです。',
    '帯域幅が大きくても、1 回の応答が速いとは限りません。',
    '小さな読み書きが多い仕事（データベースなど）で効く指標です。',
    '大きなファイルを順に読む仕事で効く指標です。',
    '使い方で寿命が変わります。機器の選定では、製品の仕様の指標を確認します（第09章）。',
    'DRAM は揮発性、SSD と HDD は不揮発性です。'
  ]
});

CN.add('compare', 'c02-bw-lat', {
  title: '帯域幅と遅延：何を表し、どう効くか',
  colA: '帯域幅（bandwidth）', colB: '遅延（latency）', colNote: '違いの理由',
  rows: [
    { a: '単位時間に運べるデータ量（例：Gb/s、GB/s）', b: '1 回の操作を始めてから結果が返るまでの時間（例：ms、μs）', note: '量の指標と、時間の指標。単位が違う。' },
    { a: '大きなデータを、まとめて運ぶ仕事で効く', b: '小さな要求を、1 件ずつ待つ仕事で効く', note: '仕事の性質で、効く指標が変わる。' },
    { a: '並列に増やせる（経路や車線を増やす）', b: '並列に増やしても縮まらない（1 回分の時間は変わらない）', note: '道路の車線数を増やしても、1 台が着く時間は縮まない。' },
    { a: '「速い回線」と言うとき、多くはこちら', b: '距離や中継の数、処理の待ちで決まる', note: '「速い」が帯域幅か遅延かを、確かめてから比べる。', ch: [10] }
  ],
  note: 'どちらも、規格や部品の上限と、実際の処理での値が違います。比べるときは、条件をそろえます。'
});

CN.add('quiz', 'c02-quiz', { items: [
  { q: 'キャッシュを置くと、多くの場合 CPU が速く動ける理由は、どれですか。', c: ['キャッシュは、メインメモリより容量が大きいから', 'キャッシュは、電源を切ってもデータが残るから', '同じデータや近くのデータを続けて使うので、小さくて速い記憶で多くの読み出しを済ませられるから', 'キャッシュは、CPU のクロックを上げるから'], a: 2, why: 'プログラムは、**同じデータや近くのデータを続けて使う**傾向があるので、よく使う写しを速い記憶に置けば、メモリへ取りに行く回数が減る。キャッシュは、メモリより小さい。', ch: 2 },
  { q: '小さな読み書きを大量に繰り返すデータベースで、まず見る性能の指標は、どれですか。', c: ['容量だけ', 'クロックだけ', 'ネットワークの帯域幅だけ', 'ストレージの IOPS と遅延'], a: 3, why: '小さな読み書きの回数が効くので、**IOPS と遅延**を見る。スループットは、大きなファイルを順に読む仕事で効く指標。', ch: 2 },
  { q: '架空のネットワークの帯域幅が 80 Gb/s のとき、これを GB/s で書くと、どれですか。', c: ['10 GB/s', '80 GB/s', '640 GB/s', '0.1 GB/s'], a: 0, why: '**1 byte は 8 bit** なので、80 Gb/s は 80 ÷ 8 ＝ 10 GB/s。そのまま 80 GB/s とするのは、bit と byte を混ぜた誤り。', ch: 2 }
]});

CN.glossary([
  { t: 'CPU', en: 'Central Processing Unit', alias: 'プロセッサ・中央処理装置・中央演算処理装置', d: 'プログラムの命令を読んで実行する部品。コア、キャッシュなどでできている。', ch: [2] },
  { t: 'コア', en: 'core', alias: 'スレッド', d: 'CPU の中で命令を実行する単位。コアが受け持つ命令の流れを、スレッドと呼ぶ。1 つのコアが複数のスレッドを同時に扱う方式もある。', ch: [2] },
  { t: '命令セット', en: 'Instruction Set Architecture', alias: 'ISA・x86・Arm', d: 'CPU が実行できる命令の約束で、ソフトウェアとハードウェアの間の取り決め。違う命令セットのプログラムは、そのままでは動かない。', ch: [2] },
  { t: 'キャッシュ', en: 'cache', alias: 'メモリ階層', d: 'よく使うデータの写しを置く、小さくて速い記憶。CPU の中や近くにある。', ch: [2] },
  { t: 'メインメモリ', en: 'main memory', alias: 'DRAM', d: '処理中のプログラムとデータを置く記憶。サーバーでは DRAM を使い、電源を切ると中身が消える。', ch: [2, 7] },
  { t: 'SSD', en: 'Solid State Drive', alias: 'HDD', d: 'フラッシュメモリにデータを書く、電源を切っても残る記憶。HDD は、回転する円盤に磁気で書く記憶。', ch: [2, 9] },
  { t: 'NIC', en: 'Network Interface Card', d: 'サーバーをネットワークにつなぐ部品。カードの形でなくても、同じ役割の部品を指す。', ch: [2, 10] },
  { t: '帯域幅', en: 'bandwidth', d: '単位時間に運べるデータ量。通信は bit、メモリやストレージは byte で書くことが多い。', ch: [2] },
  { t: '遅延', en: 'latency', d: '1 回の操作を始めてから結果が返るまでの時間。帯域幅とは別の性能。', ch: [2] },
  { t: 'IOPS', en: 'Input/Output Operations Per Second', d: 'ストレージが 1 秒にこなせる読み書きの回数。小さな読み書きが多い仕事で効く。', ch: [2, 9] }
]);

CN.exam([
  { part: 1, q: 'SSD が、メインメモリ（DRAM）と違う点として、正しいものはどれですか。', c: ['電源を切ってもデータが残る', '電源を切るとデータが消える', 'CPU の中に置かれる', '帯域幅という性能を持たない'], a: 0, why: '**SSD は不揮発性**で、電源を切ってもデータが残る。DRAM は揮発性。どちらにも帯域幅がある。', ch: 2 }
]);
