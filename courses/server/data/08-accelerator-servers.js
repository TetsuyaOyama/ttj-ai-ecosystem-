/* 第08章のデータ（担当 B）
   事実確認表：facts/08-accelerator-servers.md（確認 2026-11-14）
   演習の 3 案件はすべて架空。c08-gpu-server・c08-train-step・c08-compare は一般論の模式（製品で違う）。 */

CN.add('arch', 'c08-gpu-server', {"title": "8 GPU サーバーの構成（模式。PCIe カード型とベースボード型）", "viewBox": [900, 460], "initial": "g0", "views": [{"key": "card", "label": "PCIe カード型", "hint": "GPU は、PCIe の拡張カードとして差します。GPU 同士も、PCIe スイッチ経由が基本です。製品によっては、専用の GPU 間接続のオプションがあります。", "nodes": [{"id": "cpu0", "label": "CPU 0", "sub": "ソケット 0", "kind": "ue", "x": 150, "y": 20, "desc": "1 つ目の CPU。GPU への命令の発行、データの前処理、ストレージとのやりとりを受け持つ。", "role": "GPU の計算を、CPU が準備して指示する。", "ch": [6]}, {"id": "stor", "label": "ストレージ", "sub": "NVMe SSD", "kind": "core", "x": 388, "y": 20, "desc": "学習のデータやチェックポイントを置く、ローカルの SSD。", "role": "データの読込みと、途中経過の保存先。", "ch": [9]}, {"id": "cpu1", "label": "CPU 1", "sub": "ソケット 1", "kind": "ue", "x": 626, "y": 20, "desc": "2 つ目の CPU。", "role": "GPU の計算を、CPU が準備して指示する。", "ch": [6]}, {"id": "sw0", "label": "PCIe スイッチ A", "sub": "GPU 0〜3 側", "kind": "ran", "x": 150, "y": 144, "desc": "CPU 0 の PCIe を分けて、4 枚の GPU などにつなぐ。", "role": "1 つの上流の接続を、複数の機器に分ける。", "ch": [7]}, {"id": "nic", "label": "NIC", "sub": "計算用ネットワーク", "kind": "ran", "x": 388, "y": 144, "desc": "他のサーバーとの通信の出入口。", "role": "GPU が、他のサーバーの GPU とデータを交換するための経路。", "ch": [10, 11]}, {"id": "sw1", "label": "PCIe スイッチ B", "sub": "GPU 4〜7 側", "kind": "ran", "x": 626, "y": 144, "desc": "CPU 1 の PCIe を分けて、4 枚の GPU などにつなぐ。", "role": "1 つの上流の接続を、複数の機器に分ける。", "ch": [7]}, {"id": "g0", "label": "GPU 0", "kind": "ue", "x": 20, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g1", "label": "GPU 1", "kind": "ue", "x": 128, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g2", "label": "GPU 2", "kind": "ue", "x": 236, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g3", "label": "GPU 3", "kind": "ue", "x": 344, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g4", "label": "GPU 4", "kind": "ue", "x": 452, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g5", "label": "GPU 5", "kind": "ue", "x": 560, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g6", "label": "GPU 6", "kind": "ue", "x": 668, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g7", "label": "GPU 7", "kind": "ue", "x": 776, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}], "links": [{"id": "c0s0", "a": "cpu0", "b": "sw0", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "GPU・NIC とのデータ", "desc": "CPU から出る PCIe を、スイッチへ。"}, {"id": "c1s1", "a": "cpu1", "b": "sw1", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "GPU・NIC とのデータ", "desc": "CPU から出る PCIe を、スイッチへ。"}, {"id": "sc0", "a": "stor", "b": "cpu0", "label": "PCIe（NVMe）", "plane": "cp", "proto": "PCIe 上の NVMe", "carries": "ストレージのデータ", "desc": "SSD は PCIe の NVMe で CPU とつながる。"}, {"id": "sc1", "a": "stor", "b": "cpu1", "label": "PCIe（NVMe）", "plane": "cp", "proto": "PCIe 上の NVMe", "carries": "ストレージのデータ", "desc": "SSD は PCIe の NVMe で CPU とつながる。"}, {"id": "n0", "a": "nic", "b": "sw0", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "ネットワークのデータ", "desc": "NIC も、PCIe スイッチにつながる製品がある。"}, {"id": "n1", "a": "nic", "b": "sw1", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "ネットワークのデータ", "desc": "NIC も、PCIe スイッチにつながる製品がある。"}, {"id": "s0", "a": "sw0", "b": "g0", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s1", "a": "sw0", "b": "g1", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s2", "a": "sw0", "b": "g2", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s3", "a": "sw0", "b": "g3", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s4", "a": "sw1", "b": "g4", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s5", "a": "sw1", "b": "g5", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s6", "a": "sw1", "b": "g6", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s7", "a": "sw1", "b": "g7", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}]}, {"key": "base", "label": "ベースボード型", "hint": "OAM などのモジュールを 1 枚のベースボード（UBB など）に載せます。ホストとの PCIe とは別に、基板上の GPU 間接続があります。方式は製品ごとに違います。", "nodes": [{"id": "cpu0", "label": "CPU 0", "sub": "ソケット 0", "kind": "ue", "x": 150, "y": 20, "desc": "1 つ目の CPU。GPU への命令の発行、データの前処理、ストレージとのやりとりを受け持つ。", "role": "GPU の計算を、CPU が準備して指示する。", "ch": [6]}, {"id": "stor", "label": "ストレージ", "sub": "NVMe SSD", "kind": "core", "x": 388, "y": 20, "desc": "学習のデータやチェックポイントを置く、ローカルの SSD。", "role": "データの読込みと、途中経過の保存先。", "ch": [9]}, {"id": "cpu1", "label": "CPU 1", "sub": "ソケット 1", "kind": "ue", "x": 626, "y": 20, "desc": "2 つ目の CPU。", "role": "GPU の計算を、CPU が準備して指示する。", "ch": [6]}, {"id": "sw0", "label": "PCIe スイッチ A", "sub": "GPU 0〜3 側", "kind": "ran", "x": 150, "y": 144, "desc": "CPU 0 の PCIe を分けて、4 枚の GPU などにつなぐ。", "role": "1 つの上流の接続を、複数の機器に分ける。", "ch": [7]}, {"id": "nic", "label": "NIC", "sub": "計算用ネットワーク", "kind": "ran", "x": 388, "y": 144, "desc": "他のサーバーとの通信の出入口。", "role": "GPU が、他のサーバーの GPU とデータを交換するための経路。", "ch": [10, 11]}, {"id": "sw1", "label": "PCIe スイッチ B", "sub": "GPU 4〜7 側", "kind": "ran", "x": 626, "y": 144, "desc": "CPU 1 の PCIe を分けて、4 枚の GPU などにつなぐ。", "role": "1 つの上流の接続を、複数の機器に分ける。", "ch": [7]}, {"id": "g0", "label": "GPU 0", "kind": "ue", "x": 20, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g1", "label": "GPU 1", "kind": "ue", "x": 128, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g2", "label": "GPU 2", "kind": "ue", "x": 236, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g3", "label": "GPU 3", "kind": "ue", "x": 344, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g4", "label": "GPU 4", "kind": "ue", "x": 452, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g5", "label": "GPU 5", "kind": "ue", "x": 560, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g6", "label": "GPU 6", "kind": "ue", "x": 668, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}, {"id": "g7", "label": "GPU 7", "kind": "ue", "x": 776, "y": 270, "w": 76, "h": 44, "desc": "アクセラレータ。並列の演算を担う。", "role": "計算の主役。専用のメモリ（HBM）を持つ。", "ch": [8]}], "links": [{"id": "c0s0", "a": "cpu0", "b": "sw0", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "GPU・NIC とのデータ", "desc": "CPU から出る PCIe を、スイッチへ。"}, {"id": "c1s1", "a": "cpu1", "b": "sw1", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "GPU・NIC とのデータ", "desc": "CPU から出る PCIe を、スイッチへ。"}, {"id": "sc0", "a": "stor", "b": "cpu0", "label": "PCIe（NVMe）", "plane": "cp", "proto": "PCIe 上の NVMe", "carries": "ストレージのデータ", "desc": "SSD は PCIe の NVMe で CPU とつながる。"}, {"id": "sc1", "a": "stor", "b": "cpu1", "label": "PCIe（NVMe）", "plane": "cp", "proto": "PCIe 上の NVMe", "carries": "ストレージのデータ", "desc": "SSD は PCIe の NVMe で CPU とつながる。"}, {"id": "n0", "a": "nic", "b": "sw0", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "ネットワークのデータ", "desc": "NIC も、PCIe スイッチにつながる製品がある。"}, {"id": "n1", "a": "nic", "b": "sw1", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "ネットワークのデータ", "desc": "NIC も、PCIe スイッチにつながる製品がある。"}, {"id": "s0", "a": "sw0", "b": "g0", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s1", "a": "sw0", "b": "g1", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s2", "a": "sw0", "b": "g2", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s3", "a": "sw0", "b": "g3", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s4", "a": "sw1", "b": "g4", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s5", "a": "sw1", "b": "g5", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s6", "a": "sw1", "b": "g6", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "s7", "a": "sw1", "b": "g7", "label": "PCIe", "plane": "cp", "proto": "PCIe", "carries": "データと命令", "desc": "GPU とホストの間は、PCIe でつなぐ。"}, {"id": "b0", "a": "g0", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b1", "a": "g1", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b2", "a": "g2", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b3", "a": "g3", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b4", "a": "g4", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b5", "a": "g5", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b6", "a": "g6", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}, {"id": "b7", "a": "g7", "b": "bus", "label": "接続", "plane": "cp", "proto": "GPU 間接続（製品ごとの方式）", "carries": "GPU 間のデータ", "desc": "GPU 間の高速な接続（基板上）につながる。"}], "bus": {"x": 20, "y": 384, "w": 832, "h": 36, "label": "GPU 間接続（ベースボード上。方式は製品ごと）"}}]});

CN.add('flow', 'c08-train-step', {
  title: 'AI の学習の 1 ステップ（データ並列の例。模式）',
  direction: 'auto',
  steps: [
    { id: 'load', name: 'データ読込み', sub: 'ストレージ → GPU', kind: 'core', desc: '学習のデータの一部（ミニバッチ）を、ストレージから読み、CPU のメモリを経て、GPU のメモリへ置く。データ並列では、各 GPU が別のデータを受け取る。', inputs: ['学習データ'], outputs: ['ミニバッチ'], caution: 'ストレージや前処理が遅いと、GPU が待つ。', ch: [9] },
    { id: 'fwd', name: '順伝播', sub: 'GPU の計算', kind: 'ue', desc: 'モデルに、ミニバッチを入力し、出力を計算する。行列の積を大量に行う、GPU の得意な計算。', inputs: ['ミニバッチ', '重み'], outputs: ['出力'] },
    { id: 'loss', name: '損失の計算', sub: '答えとのずれ', kind: 'ue', desc: 'モデルの出力と、正しい答えとの「ずれ」を、損失として計算する。', inputs: ['出力', '正解'], outputs: ['損失'] },
    { id: 'bwd', name: '逆伝播', sub: '勾配を求める', kind: 'ue', desc: '損失を小さくするには、各重みをどちらへ動かすかを、出力側から入力側へさかのぼって計算する（勾配）。', inputs: ['損失'], outputs: ['勾配（GPU ごと）'] },
    { id: 'sync', name: '勾配の集約', sub: '集団通信', kind: 'ran', desc: '各 GPU が求めた勾配を、全 GPU で集め、平均などでそろえる。GPU 間接続とネットワークに、大量の通信が起きる工程。集団通信は第11章で扱う。', inputs: ['勾配（GPU ごと）'], outputs: ['そろえた勾配'], caution: 'ここが遅いと、全 GPU が待つ。通信の速さが、全体の速さを左右する。', ch: [11, 10] },
    { id: 'upd', name: '重みの更新', sub: 'GPU の計算', kind: 'ue', desc: 'そろえた勾配で、重みを更新する。全 GPU が同じ重みになる。', inputs: ['そろえた勾配'], outputs: ['更新した重み'], repeat: '学習が終わるまで繰り返す',
      next: [{ to: 'load', kind: 'loop', label: '次のステップ', cond: '学習がまだ終わっていない。次のミニバッチを読み込む。' }] }
  ]
});

CN.add('compare', 'c08-train-infer', {
  title: '学習と推論：機器への要求の違い（一般論）',
  caption: '一般的な傾向の整理です。実際の要求は、モデルの大きさと使い方で変わります（出典：一般知識）',
  colA: '学習（training）', colB: '推論（inference）', colNote: '機器に効くところ',
  rows: [
    { a: '大量のデータで、モデルの重みを、繰り返し更新する長い計算', b: '学習済みのモデルで、入力に対する出力を、要求ごとに計算する', note: '学習は計算量が大きく、推論は要求の数と待ち時間が問題になる。' },
    { a: '重視する指標は、学習が終わるまでの時間、1 ステップの時間、計算資源の利用率', b: '重視する指標は、1 件の応答の待ち時間、単位時間に処理できる要求数、費用あたりの処理量', note: '何を速くしたいかが違う。' },
    { a: '多数の GPU を、高速な GPU 間接続とネットワークで結ぶ構成になりやすい', b: 'モデルが 1 台に収まれば、1 台から数台の GPU で足りる場合が多い', note: '学習は規模を大きくしやすく、推論は段階的に増やしやすい。', ch: [11] },
    { a: '勾配の集約（集団通信）で、GPU 間・ノード間の通信が大量に起きる', b: 'モデルが 1 台に収まれば通信は少ない。大きなモデルは複数の GPU に分け、通信が要る', note: '通信の設計が、学習では特に効く。', ch: [10, 11] },
    { a: '長時間の連続した計算。途中の状態を保存して、障害から戻れるようにする（第22章のチェックポイント）', b: '利用者の要求に応じて常時待ち受ける。負荷は時間で変わる', note: '稼働の形が違うので、冗長や運用の考え方も違う。', ch: [22] }
  ]
});

CN.add('table', 'c08-accel', {
  title: 'アクセラレータ製品の公開仕様の例（比較・順位は示さない）',
  caption: '各社の公開資料の値を、そのまま並べた表です。電力の値は、資料ごとに言葉と意味が違います。企業間の優劣は示しません（確認 2026 年 11 月 14 日）',
  cols: ['企業', '製品', '形状・接続', 'メモリ', '公開された電力の値（出典の言葉）', '出典・時点'],
  rows: [
    ['NVIDIA（米国）', 'H100 SXM', 'SXM。NVLink 900 GB/s、PCIe Gen5 128 GB/s', '80 GB', '最大 TDP は 700 W まで（設定可能）', 'NVIDIA 製品ページ（確認 2026 年 11 月）'],
    ['NVIDIA（米国）', 'H100 NVL', 'PCIe（デュアルスロット・空冷）。NVLink 600 GB/s、PCIe Gen5 128 GB/s', '94 GB', '最大 TDP は 350〜400 W（設定可能）', 'NVIDIA 製品ページ（確認 2026 年 11 月）'],
    ['NVIDIA（米国）', 'HGX B200／HGX B300（GPU 8 個のベースボード）', 'SXM の GPU を 8 個。GPU 間 1.8 TB/s、合計 14.4 TB/s（NVLink）', '合計 1.4 TB（B200）／2.1 TB（B300）', 'ページに電力の記載なし', 'NVIDIA 製品ページ（更新 2026-09-30、確認 2026 年 11 月）'],
    ['AMD（米国）', 'Instinct MI300X', 'OAM。PCIe Gen5 x16。Infinity Fabric のリンク 7 本（各 128 GB/s）', 'HBM3、最大 192 GB', 'ピークの TBP が 750 W', 'AMD データシート（版・日付の記載なし。© 2025）'],
    ['AMD（米国）', 'Instinct MI355X', 'OAM（8 GPU のプラットフォームは UBB 2.0）。PCIe Gen5 x16。Infinity Fabric のリンク 7 本（各 144 GB/s）', 'HBM3E、288 GB', '最大 TBP が 1400 W（資料の言葉。TDP ではない）', 'AMD データシート（© 2026、資料番号の表示 9/26）'],
    ['Intel（米国）', 'Gaudi 3', 'OAM（UBB に 8 個）と PCIe CEM の版がある。200 Gb のイーサネットポートが 24 本', 'HBM2e、128 GB', '同資料に記載なし', 'Intel の発表、2024 年 9 月 24 日']
  ],
  filter: 0,
  detail: [
    'NVIDIA の H100 のページは、SXM の版を、80 GB のメモリ、最大 TDP は 700 W まで（設定可能）、NVLink 900 GB/s と記しています。NVLink は NVIDIA の GPU 間接続の呼称です。',
    'H100 NVL は、PCIe のデュアルスロット・空冷の版です。最大 TDP は 350〜400 W（設定可能）で、NVLink は 600 GB/s と記されています。SXM の版との違いは、形状と、電力・接続の値です。',
    'NVIDIA の HGX のページは、HGX B200 と HGX B300 を、SXM の GPU 8 個のベースボードとして載せています。GPU 間は 1.8 TB/s、合計は 14.4 TB/s で、メモリの合計は B200 が 1.4 TB、B300 が 2.1 TB と記されています（ページの更新は 2026-09-30）。ページに電力の値は書かれていません。同じページは、次の世代の HGX Rubin NVL8 も載せています。',
    'AMD のデータシートは、MI300X を OAM モジュールとし、ピークの TBP を 750 W、HBM3 を最大 192 GB と記しています。7 本の Infinity Fabric のリンクで、GPU 同士をつなぎます。同社の MI300X Platform のデータシートは、OAM を 8 個、UBB に載せた構成を説明しています。',
    'AMD のデータシートは、MI355X を OAM モジュールとし、HBM3E を 288 GB、最大 TBP を 1400 W（資料は TDP とは書かず「最大 TBP」と表記）、スケールアップの Infinity Fabric のリンクを 7 本（各 144 GB/s）と記しています。8 GPU のプラットフォームは UBB 2.0 を使うと記されています。',
    'Intel の発表は、Gaudi 3 を、128 GB の HBM2e と、200 Gb のイーサネットポート 24 本をもつ AI アクセラレータと説明しています。OAM を UBB に 8 個載せた版と、PCIe CEM の版があります。TDP は、この発表には書かれていません。GPU ではないアクセラレータの例です。'
  ],
  note: '「TDP」「TBP」は、資料ごとに定義が違います（第06章）。製品の世代は、他にも多くあります。例は、執筆時（2026 年 11 月）に各社の公式ページで確認できたものに限ります。最新の値は、各社のデータシートで確認してください。'
});

CN.add('table', 'c08-choose', {
  title: '演習：PCIe カード型とベースボード型のどちらから考えるか（案件はすべて架空）',
  caption: '3 つの案件（すべて架空）で、先に自分で選んでから、行を押してください。答えと理由が出ます（出典：架空・見本のため）',
  cols: ['案件（架空）', '条件（架空）'],
  rows: [
    ['大規模学習', '数百台規模の GPU で、長期間の学習を行う。GPU 間の通信が多い。専用のデータセンターで液冷も検討できる'],
    ['推論サービス', '1 つのモデルが GPU 1 枚に収まる。要求の数は日によって増減し、台数を段階的に増やしたい。空冷の既存のデータセンターを使う'],
    ['研究室の小規模学習', '学生数名が使い、GPU は数枚。既存の空冷のサーバー室を使う。予算が限られる']
  ],
  detail: [
    '答え：ベースボード型から考えます。GPU 間の通信が多く、規模も大きいので、基板上に高速な GPU 間接続をもつ構成が合います。そのぶん、電力と発熱が大きくなるので、液冷の可否と、ラックの電力（第11章、第15・16章）も一緒に決めます。',
    '答え：PCIe カード型から考えます。1 枚で収まるので、GPU 間の高速な接続が要りません。台数を段階的に増やしやすく、空冷の既存の設備にも収めやすい形です。ただし、カードごとの電力と冷却の条件は、製品の仕様で確認します。',
    '答え：PCIe カード型から考えます。GPU が数枚で、設備も既存の空冷だからです。ただし、GPU 間の通信が多い手法を使う場合は、GPU 間の接続が付く製品や、ベースボード型の 1 台を検討します。どれを選ぶかは、使う手法と予算で決まります。'
  ],
  note: '選び方の考え方の例です。実際の案件では、消費電力・冷却・ネットワーク・予算を合わせて決めます。'
});

CN.add('quiz', 'c08-quiz', { items: [
  { q: '学習用のサーバーに、GPU 間接続が必要になるのは、なぜですか。', c: ['複数の GPU が、計算の途中で大量のデータ（勾配など）を交換するので、GPU 間を結ぶ高速な経路があると、待ちが減るから', 'GPU が、CPU なしで起動するため', 'GPU 間接続が、ECC の代わりに、メモリの誤りを訂正するため', 'GPU の電力を、GPU どうしで分け合うため'], a: 0, why: '学習では、各 GPU が求めた勾配をそろえる集約の工程で、GPU 間の通信が大量に起きます。経路が遅いと、全 GPU が待ちます。GPU の起動や電力、誤り訂正とは関係がありません。', ch: 8 },
  { q: 'データ並列で学習するとき、1 ステップの中で、GPU 間の通信が主に起きる工程はどれですか。', c: ['データ読込みだけで、以降は GPU の中で完結する', '勾配の集約（集団通信）。各 GPU が求めた勾配をそろえる', '損失の計算。GPU が毎回、CPU に結果を送り返す', '重みの更新のあと、GPU が OS を再起動する'], a: 1, why: '各 GPU が別のデータで勾配を求めたあと、全 GPU で勾配をそろえる集約の工程で、通信が大量に起きます。読込み・順伝播・損失の計算は、主に GPU の中や、ストレージとの間の処理です。', ch: 8 },
  { q: 'OAM（OCP Accelerator Module）の目的として、正しいものはどれですか。', c: ['GPU の演算を速くする、独自の命令の仕様', '水冷専用の配管の規格', '種類の違うアクセラレータを、共通の形・電気・管理の約束で、同じ系に載せられるようにする', 'HBM の積層数を決める規格'], a: 2, why: 'OCP の OAI は、さまざまなアクセラレータの共通のインフラ仕様（電気・機械・熱・管理・セキュリティ・保守）を定め、OAM はそのモジュールの仕様です。演算の命令や配管、HBM の積層とは別の話です。', ch: 8 }
]});

CN.glossary([
  { t: 'アクセラレータ', en: 'accelerator', d: 'CPU の代わりに、特定の計算（行列の積など）を並列に高速に行う部品。GPU のほか、各社の AI 向けチップがある。', ch: [8] },
  { t: 'GPU', en: 'Graphics Processing Unit', d: '多数の演算器で、同じ種類の計算を並列に行う部品。もともとは画像の処理用で、AI の計算にも使われる。', ch: [8] },
  { t: 'HBM', en: 'High Bandwidth Memory', d: 'DRAM を縦に積み、アクセラレータのすぐ隣に置く、広い帯域幅のメモリ。チップの作り方は半導体講義で扱う。', ch: [8] },
  { t: '学習・推論', en: 'training / inference', d: '学習は、データでモデルの重みを作る計算。推論は、学習済みのモデルで出力を計算する計算。機器への要求が違う。', ch: [8] },
  { t: 'OAM', en: 'OCP Accelerator Module', alias: 'UBB', d: 'OCP のアクセラレータモジュールの仕様。複数の OAM を載せるベースボードの仕様が、UBB（Universal Baseboard）。', ch: [8] },
  { t: 'GPU 間接続', en: 'GPU interconnect', alias: 'NVLink（NVIDIA の呼称）', d: '複数の GPU を、PCIe とは別に、直接つなぐ高速な接続。方式は製品ごとに違い、NVIDIA の呼称は NVLink。', ch: [8] },
  { t: 'UALink', en: 'Ultra Accelerator Link', d: 'アクセラレータ同士を結ぶ、スケールアップ向けの接続の規格。UALink Consortium が仕様を公開している。', ch: [8] }
]);

CN.mapping('form', [
  { a: 'アクセラレータのモジュール（OAM）', b: 'OAI-OAM Base Specification r2.0 v1.0（OCP）', note: '異なるアクセラレータを、共通の形で載せる。', ch: [8] },
  { a: 'アクセラレータのベースボード（UBB）', b: 'OAI-UBB Base Specification r2.0 v1.0（OCP）', note: 'OAM を複数載せる基板。8 個の構成が例にある。', ch: [8] }
]);
CN.mapping('io', [
  { a: 'GPU 間のスケールアップ接続（UALink）', b: 'UALink 200G 1.0 Specification（UALink Consortium）', note: 'アクセラレータ同士を結ぶ。NVLink は NVIDIA の呼称で、規格は別。', ch: [8] }
]);

CN.exam([
  { part: 2, q: 'OAM の GPU を 1 枚の基板（UBB）に集めたサーバーで、GPU 同士の通信の経路について、正しいものはどれですか。', c: ['GPU 間のデータは、必ず CPU のメモリを経由する', 'GPU 間は、ネットワークの ToR スイッチだけでつながる', 'ホストとの PCIe とは別に、基板上に GPU 間の高速な接続をもつ。方式は製品で違う', 'GPU 間の接続は、OAM の規格で、1 つの方式に固定されている'], a: 2, why: 'ベースボード型は、ホストとの PCIe とは別に、基板上の GPU 間接続をもちます。AMD は Infinity Fabric、NVIDIA は NVLink と、方式は製品ごとに違います。CPU のメモリ経由が必須でも、規格で固定でもありません。', ch: 8 },
  { part: 2, q: '推論サービスの機器を選ぶとき、大規模な学習のクラスタより、重視されやすい指標はどれですか。', c: ['学習が終わるまでの、合計の時間', '集団通信の帯域幅の、最大値', 'GPU の台数の、最大値', '1 件の応答の待ち時間と、単位時間に処理できる要求数'], a: 3, why: '推論は、要求ごとに結果を返すので、応答の待ち時間と、単位時間の処理数が効きます。学習は、完了までの時間や、集団通信の帯域幅が効きやすくなります（一般論）。', ch: 8 }
]);
