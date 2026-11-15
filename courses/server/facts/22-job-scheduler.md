/* 第22章 事実確認表（担当 E、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 定義 | Slurm：クラスタの資源割当て、ジョブの開始と監視、待ち行列の調停の 3 役。常駐プログラムは slurmctld（管理）、slurmd（各ノード）、slurmdbd（記録、任意）。パーティションはノードの論理的な集まり | 3 役 | 確認時のページ | SchedMD『Slurm Workload Manager Overview』 | https://slurm.schedmd.com/overview.html | ○ | 2026-11-14 | 本文「Slurm」、c22-seq、用語集 |
| 2 | 企業 | NVIDIA が SchedMD を買収（発表 2025-12-15）。Slurm はオープンソースのまま、との趣旨。NVIDIA の本社は米国カリフォルニア州（NVIDIA の公開ページで確認） | 2025-12-15 | 2025-12-15 | NVIDIA『NVIDIA Acquires SchedMD』 | https://blogs.nvidia.com/blog/nvidia-acquires-schedmd | ○ | 2026-11-14 | 本文「買収」 |
| 3 | 企業 | NVIDIA の所在（初出の国の記載用） | — | 確認時のページ | NVIDIA『Contact the Board』 | https://investor.nvidia.com/governance/contact-the-board/default.aspx | ○ | 2026-11-14 | 本文（初出の国） |
| 4 | 定義 | ジョブの状態名：PENDING、RUNNING、SUSPENDED、COMPLETED、FAILED、CANCELLED、TIMEOUT、NODE_FAIL、PREEMPTED、REQUEUED など | — | 確認時のページ | SchedMD『Job State Codes』 | https://slurm.schedmd.com/job_state_codes.html | ○ | 2026-11-14 | 本文「状態」、c22-state、c22-policy |
| 5 | 定義 | 多要素の優先度（9 要素）、フェアシェアの考え方（割当てと実消費の比較） | 9 要素 | 確認時のページ | SchedMD『Multifactor Priority Plugin』 | https://slurm.schedmd.com/priority_multifactor.html | ○ | 2026-11-14 | 本文「優先度」、c22-policy、クイズ、試験 |
| 6 | 定義 | バックフィル：優先度の高いジョブの開始を遅らせない範囲で先に動かす。時間の上限が妥当であることが前提 | — | 確認時のページ | SchedMD『Scheduling Configuration Guide』 | https://slurm.schedmd.com/sched_config.html | ○ | 2026-11-14 | 本文「バックフィル」、演習、クイズ 1 |
| 7 | 定義 | トポロジを考えた配置（tree、block）。通信の競合を減らす狙い。block は断片化を減らす代償あり | — | 確認時のページ | SchedMD『Topology Guide』 | https://slurm.schedmd.com/topology.html | ○ | 2026-11-14 | 本文「トポロジ」、クイズ 2 |
| 8 | 定義 | Kubernetes のデバイスプラグイン：GPU などの資源をノードから広告し、Pod が要求する | — | 確認時のページ | Kubernetes『Device Plugins』 | https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/ | ○ | 2026-11-14 | 本文「Kubernetes」 |
| 9 | 定義 | DRA（動的資源割当て）：v1.35 で安定（stable） | v1.35 | 確認時のページ | Kubernetes『Dynamic Resource Allocation』（v1.36 文書） | https://v1-36.docs.kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/ | ○ | 2026-11-14 | 本文「Kubernetes」 |
| 10 | 一般知識 | GPU の分割の 3 方式（全体・分割・時間共有）の整理、チェックポイント、予約、先取りの一般的な説明、演習の待ち行列（架空） | — | — | 一般的な運用の説明。メーカー固有の機能名は書かない | —（教科書的な説明） | × | 2026-11-14 | 本文、c22-policy、演習 |
確認できず書かなかった：
- NVIDIA の GPU 分割機能の個別名と仕様：一次の個別ページを取得できず、機能名は書かなかった（「メーカーごとに違う」と一般化）。
- Slurm のバージョン、他のスケジューラ（PBS、LSF など）の所管と機能：確認していない。
*/
