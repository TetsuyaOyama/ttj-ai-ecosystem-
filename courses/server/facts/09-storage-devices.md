第09章 事実確認表（担当 B、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 規格 | SFF-TA-1006 は E1.S（1U の短い形）の規格。SNIA の資料は最新版を 1.5（2021 年 8 月）と記す。E1.S は、ホットプラグ（hot plug）をもつ形として挙げられる | 版 1.5 | 2021-08 | SNIA『The Latest on Form Factors』（CMSS24） | https://www.snia.org/sites/default/files/SSSI/CMSS24/CMSS24-Hands-The-Latest-on-Form-Factors.pdf | ○ | 2026-11-14 | 本文「EDSFF」、c09-edsff |
| 2 | 規格 | SFF-TA-1008 は E3.S、E3.S 2T、E3.L、E3.L 2T を定める。最新版は 2.1（2023 年 10 月）。E3.S は SSD と同じ x4（1C）のコネクタ。E3.S 2T と E1.S は、CXL のメモリモジュールに x8（2C）のコネクタを使う。寸法・「2T」の意味は資料に記載なし | 版 2.1／x4・x8 | 2023-10 | 同上 | 同上 | ○ | 2026-11-14 | c09-edsff、本文「EDSFF」 |
| 3 | 制度 | NIST SP 800-88 Rev. 2『Guidelines for Media Sanitization』。公表は 2025-09-26（Final。Rev. 1〔2014-12-17〕を置き換え。2026-11-14 の検証で日付を確認）。機微さに合わせて、データの消去と廃棄の方法と管理を選ぶ、消去（サニタイズ）の計画づくりを助ける | — | 2025-09-26 | NIST CSRC『SP 800-88 Rev. 2』 | https://csrc.nist.gov/pubs/sp/800/88/r2/final | ○ | 2026-11-14 | 本文「廃棄とデータ消去」 |
| 4 | 一般知識 | ブロック・ファイル・オブジェクトの違い、NAS・SAN、RAID、イレイジャーコーディング、NVMe と NVMe-oF、並列ファイルシステムの考え方。数値は使わない | — | — | 教科書的な一般知識（Silberschatz ほか『Operating System Concepts』など） | —（数値を伴わない） | × | 2026-11-14 | 本文、c09-types、c09-conn、c09-write |
| 5 | 一般知識 | 演習の案件はすべて架空 | — | — | 架空（見本のため） | — | × | 2026-11-14 | c09-choose |
| 6 | 規格 | SNIA の資料は、E1.S を「M.2 より容量が大きく、U.2 と同じ性能」と比べ、M.2 は Gen 5 の大容量ドライブに向かない、E3.S は U.2 より多くのドライブを載せられる、と記す（U.3 は図の凡例だけ） | — | 2024 | SNIA『The Latest on Form Factors』（CMSS24） | https://www.snia.org/sites/default/files/SSSI/CMSS24/CMSS24-Hands-The-Latest-on-Form-Factors.pdf | ○ | 2026-11-14（検証時に追加） | 本文「SSD の形と NVMe」 |

確認できず書かなかった：
- NVMe 仕様の現行の版と公開日、NVMe-oF の転送方式（RDMA・TCP・Fibre Channel）の一次資料：NVM Express の個別ページを取得できなかった。NVMe と NVMe-oF は、概念だけを一般知識として書き、版の番号は書かない。
- E1.S・E3.S の寸法、厚さ、電力の上限：SNIA の資料に数値がなく、SFF-TA の原本も取得できなかった。
- SSD の容量・速度・耐久性の数値、RAID のレベルごとの数値：数値を使わない方針で、書かない。
