第25章 事実確認表（担当 E、確認 2026-11-14）

| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | Microsoft（米国。本社は Redmond, Washington と公式ページに記載）の Windows 11 の仕様ページの「Copilot+ PC の最小のシステム要件」：NPU は 40+ TOPS を実行できる CPU または SoC。メモリ（RAM）は 16 GB の DDR5／LPDDR5。ストレージは 256 GB の SSD／UFS（値はページの表記。値の名前：最小のシステム要件） | NPU 40+ TOPS／16 GB／256 GB | ページに更新日の記載なし（確認 2026-11-14） | Microsoft『Windows 11 Specs and System Requirements』 | https://www.microsoft.com/en-us/windows/windows-11-specifications | ○ | 2026-11-14 | 本文「NPU と AI PC」、c25-patterns、mapping、用語集 |
| 2 | 定義 | Microsoft Learn の開発者向け案内：Copilot+ PC は、40 TOPS を超える（原文：more than 40 trillion operations per second）高性能な NPU を持つ Windows 11 のハードウェア。NPU は、AI の負荷の高い処理のための専用のチップで、並列にデータを処理し、CPU・GPU と協調する。NPU を使うには、NPU 向けに作られたソフトが要る。多くの NPU は INT8 などの整数の形式に対応するので、モデルを量子化する必要がある。NPU で AI の処理を動かす推奨の方法は Windows ML | 40 TOPS を超える | ms.date 2025-11-17、更新 2025-11-17（メタデータの更新は 2026-08-19） | Microsoft『Copilot+ PCs developer guide』 | https://learn.microsoft.com/en-us/windows/ai/npu-devices/ | ○ | 2026-11-14 | 本文「NPU と AI PC」、c25-ai、用語集 |
| 3 | 定義 | Microsoft の学習センターの記事：「すべての Copilot+ PC は Windows 11 の PC だが、すべての Windows 11 の PC が Copilot+ PC ではない」。Copilot+ PC は専用の NPU（40 TOPS 以上）を持ち、オンデバイスの AI を可能にする | 40 TOPS 以上 | 2025-12-19 | Microsoft『Copilot+ PCs & Windows PCs: Differences?』 | https://www.microsoft.com/en-us/windows/learning-center/copilot-plus-pcs-windows-pcs-differences | ○ | 2026-11-14 | 本文「NPU と AI PC」 |
| 4 | 定義 | Hugging Face の Transformers のドキュメント『Quantization concepts』：量子化は、重みや活性化を、float32 ではなく int8 などの低い精度のデータ型で保存することで、モデルのメモリの使用量と計算の負担を減らす。効率と精度のトレードオフがあり、小さな丸め誤差（量子化ノイズ）が出る。ドキュメントの版は表示上 v5.20.2（ページに日付なし） | — | ページに日付の記載なし（確認 2026-11-14） | Hugging Face『Transformers ドキュメント：Quantization concepts』 | https://huggingface.co/docs/transformers/quantization/concept_guide | ○ | 2026-11-14 | 本文「ローカルで AI を動かす PC」、c25-ai、用語集 |
| 5 | 仕様値 | あるローカル AI のソフト（Ollama）のドキュメントの GPU のページは、対応する GPU の企業ごとに、GPU の世代とドライバの版などの条件を書いている（NVIDIA・AMD・Vulkan・Apple の項目がある）。条件の数値は変わりやすいので本文に書かない。例であり推奨ではない | — | ページに日付の記載なし（確認 2026-11-14） | Ollama『docs.ollama.com の GPU のページ』 | https://docs.ollama.com/gpu | ○ | 2026-11-14 | 本文「ローカルで AI を動かす PC」、c25-ai |
| 6 | 仕様値 | Corsair の電源ユニットの FAQ『What are zero-RPM PSUs』：ゼロ回転の電源ユニットは、冷却が要らないとき、ファンが完全に止まる。設定した温度になると自動で回り始め、低い回転から始めて、温度とともに上がる。各製品の既定の動作は、製品のマニュアルに書かれている。iCUE で設定できる製品と、できない製品がある。本文は「各社の呼称」として、動作の名前を断定しない | — | ページに日付の記載なし（確認 2026-11-14） | Corsair『PSU: What are zero-RPM PSUs?』 | https://help.corsair.com/hc/en-us/articles/4415184478477-PSU-What-are-zero-RPM-PSUs | ○ | 2026-11-14 | 本文「静音機」、c25-quiet |
| 7 | 仕様値 | ASUS のグラフィックスカードの FAQ：ファンが止まる条件と、回り始める条件は、GPU の温度と消費電力、ファンを止める設定（0dB のファンモード）で決まる。条件は製品で違い、資料は参考で、シリーズのすべての製品に当てはまるとは限らない（数値は本文に書かない） | — | 更新 2025-04-02 | ASUS『[Graphic Card] Condition of Fan Start and Fan Stop on RTX30 & RTX40 & RTX50 series』 | https://www.asus.com/support/faq/1044879/ | ○ | 2026-11-14 | 本文「静音機」、c25-quiet |
| 8 | 一般知識 | 推論＝学習済みのモデルで、入力に対する出力を計算すること。モデルの重みは、動かす間、メモリに置く（ビデオメモリか主記憶）。載り切らないときの動作（動かない、または大きく遅くなる）はソフトで違う。小型機は、ケースの空間が小さいので、クーラーの高さ・カードの寸法・電源ユニットの形・空気の通り道が制約になる。静音は、同じ風量を遅い回転で得やすい大きなファンと、空気の通りの確保との釣り合い。常時稼働は、時間が長いので電力量（第12章）とストレージの冗長とバックアップ（第24章）が問題になる（数値を伴わない） | — | — | 一般知識。計算機システムの一般的な教科書。熱とファンは第08章、電力は第12章の事実確認表を参照 | —（数値を伴わない） | × | 2026-11-14 | 本文、c25-flow、c25-patterns、c25-quiet、c25-judge |
| 9 | 企業 | Microsoft の本社：公式ページの『Office Locations』に「Microsoft's global headquarters are located on 500 acres in Redmond, Washington.」とある（国名の明記はなく、米国のワシントン州として「米国」と書く）。第20・22・24・25章で同じ書き方 | — | ページに日付の記載なし | Microsoft『Microsoft Office Locations』 | https://www.microsoft.com/en-us/about/office-locations | ○ | 2026-11-14 | 本文「NPU と AI PC」 |
| 10 | 一般知識 | 演習の依頼 3 つ（A〜C さん）は、すべて架空 | — | — | 架空（見本のため） | — | × | 2026-11-14 | c25-judge |
| 11 | 企業 | ASUS（ASUSTeK Computer）の本社は台湾（Taipei City） | — | 2026-11-14 に確認 | ASUS『Company Profile』 | https://www.asus.com/EVENT/Investor/about_profile | ○ | 2026-11-14 | 本文の初出「（台湾）」 |

確認できず書かなかった：
- 「AI PC」の、企業・OS 提供者の間で共通の定義：確かめられたのは、Microsoft の Copilot+ PC の要件だけ。本文は「呼び方の定義は、企業ごとに公式ページで確かめる」と書き、AI PC を定義しなかった。
- Intel・AMD の現行製品の NPU の公開仕様：第02章が持ち主。この章は値を書かず、リンクした。
- Windows 以外の OS（Linux など）の、AI の要件の公式ページ：確かめていない。
- ローカル AI に必要なビデオメモリ・メモリの容量の数値：モデルとソフトで違い、一般的な値の一次資料がなく、書かなかった（c25-ai は数値なし）。
- 計算用ソフトの対応 GPU の公式の一覧（第06章が持ち主）：第06章の事実確認表が揃っていないため、この章は一覧の中身を書かず、「各社の公式の一覧で確かめる」とだけ書いた。
- Mini-ITX・SFX の寸法：第03・07章が持ち主。この章は寸法を書かず、リンクした。
- 無停電電源装置の扱い：第12・13章の範囲外で、この章は書かなかった。
