/* 第19章のデータ
   事実確認表：facts/19-bmc-redfish.md
   図・問題・用語の事実は、すべて上の表の行に対応する。演習の値は架空（出典：架空、見本のため）。 */

(function () {
  var G = [
    { label: 'サーバー（1 台の筐体）', x: 10, y: 135, w: 880, h: 250 }
  ];
  var N = [
    { id: 'op', label: '運用者の端末', sub: '管理ツール', kind: 'pol', x: 20, y: 25, w: 150, h: 56, desc: '運用者が使う端末と管理ツール。Redfish の API を HTTP で呼び出す。', role: '管理の操作を始める側。', ch: [19, 21] },
    { id: 'net', label: '管理ネットワーク', sub: '帯域外の道', kind: 'ran', x: 260, y: 25, w: 150, h: 56, desc: 'BMC の操作に使う専用のネットワーク。データのネットワークとは分けて作るのが基本。', role: '運用者と BMC をつなぐ。', ch: [19, 25] },
    { id: 'mnic', label: '管理用 NIC', sub: 'BMC 用のネットワーク口', kind: 'ran', x: 260, y: 165, w: 150, h: 56, desc: 'BMC 専用のネットワーク口。製品によっては、データ用の NIC と口を共有する構成もある。', role: '管理ネットワークの受け口。', ch: [19] },
    { id: 'bmc', label: 'BMC', sub: '基板管理コントローラ', kind: 'pol', x: 500, y: 165, w: 150, h: 56, desc: '温度や電圧を見張り、ログを残し、電源の操作などに応える小さなコントローラ。', role: 'ホストが止まっていても応じる。', ch: [19] },
    { id: 'cpu', label: 'ホスト CPU', sub: 'OS が動く側', kind: 'ue', x: 30, y: 295, w: 130, h: 56, desc: 'OS とアプリケーションを動かす、サーバー本来の計算の部分。', role: 'BMC から見ると、管理される対象。', ch: [6, 19] },
    { id: 'sens', label: 'センサー', sub: '温度・電圧など', kind: 'pol', x: 235, y: 295, w: 130, h: 56, desc: '温度、電圧、電流などを測る部品。BMC が値を読む。', role: '状態を BMC へ渡す。', ch: [19, 23] },
    { id: 'psu', label: '電源ユニット', sub: 'PSU', kind: 'db', x: 440, y: 295, w: 130, h: 56, desc: '機器に電力を供給するユニット。BMC は、状態の読み取りと電源の操作に関わる。', role: '電力の供給元。', ch: [6, 14, 19] },
    { id: 'fan', label: 'ファン', sub: '冷却', kind: 'ims', x: 645, y: 295, w: 130, h: 56, desc: '機器の中の空気を流す部品。回転数を BMC が見る。', role: '熱を運び出す。', ch: [6, 15, 19] }
  ];
  CN.add('arch', 'c19-bmc', {
    title: 'BMC の位置：ホスト CPU・センサー・電源・ファン・管理ネットワーク',
    viewBox: [900, 395],
    initial: 'bmc',
    groups: G,
    nodes: N,
    kinds: { ue: '計算する機器・部品', ran: '伝送・接続', core: '記憶', db: '電力の供給', pol: '制御・管理・監視', ext: '外部の主体', ims: '熱・冷却' },
    views: [
      { key: 'mg', label: '管理', hint: '管理の見方：運用者の操作は、管理ネットワークと管理用 NIC を通って BMC へ届きます。BMC は、センサーを読み、電源とファンを見ます。点線は管理のつながりです。',
        links: [
          { id: 'g1', a: 'op', b: 'net', label: '操作', plane: 'lg', proto: 'HTTPS（Redfish）など', carries: '電源の操作、状態の取得' },
          { id: 'g2', a: 'net', b: 'mnic', label: '接続', plane: 'lg', proto: 'イーサネット', carries: '管理の通信' },
          { id: 'g3', a: 'mnic', b: 'bmc', label: '受信', plane: 'lg', proto: '基板上の接続', carries: '管理の通信' },
          { id: 'g4', a: 'bmc', b: 'sens', label: '読取', plane: 'lg', proto: '基板上の接続', carries: '温度・電圧などの値' },
          { id: 'g5', a: 'bmc', b: 'psu', label: '制御', plane: 'lg', proto: '基板上の接続', carries: '電源の状態と操作' },
          { id: 'g6', a: 'bmc', b: 'fan', label: '監視', plane: 'lg', proto: '基板上の接続', carries: '回転数' }
        ] },
      { key: 'dt', label: 'データ・信号', hint: 'データ・信号の見方：BMC とホスト CPU は、サーバーの中の接続でやり取りします。ホストの OS が使うデータのネットワークは、この図に含めていません。',
        links: [
          { id: 'd1', a: 'bmc', b: 'cpu', label: 'ホスト向け', plane: 'cp', proto: 'サーバー内の接続（製品による）', carries: 'ホストの状態の取得、コンソールの入出力' },
          { id: 'd2', a: 'bmc', b: 'sens', label: '値', plane: 'cp', proto: '基板上の接続', carries: 'センサーの値' }
        ] },
      { key: 'pw', label: '電力', hint: '電力の見方：電源ユニットは、ホストとファンへ電力を送ります。電源が切れた状態でも、補助の電力が一部の部品に残ります。BMC もこの電力で動くのが一般的です（製品による）。',
        links: [
          { id: 'w1', a: 'psu', b: 'bmc', label: '待機電力', plane: 'up', proto: '基板上の給電', carries: '補助の電力' },
          { id: 'w2', a: 'psu', b: 'cpu', label: '給電', plane: 'up', proto: '基板上の給電', carries: 'ホストの電力', via: [[505, 372], [95, 372]], lo: [0, 16] },
          { id: 'w3', a: 'psu', b: 'fan', label: '給電', plane: 'up', proto: '基板上の給電', carries: 'ファンの電力', via: [[505, 372], [710, 372]], lo: [0, 16] }
        ] }
    ]
  });
})();

CN.add('compare', 'c19-cmp', {
  title: 'IPMI と Redfish：何を決めた規格か',
  caption: '優劣を示す表ではありません。時点は 2026 年 11 月に確認した範囲です。機器が対応する版は、各社の資料で確認してください。',
  colA: 'IPMI', colB: 'Redfish', colNote: '違いの見方',
  rows: [
    { a: '4 社の共同の仕様書。v2.0 は 2004 年 2 月 18 日に発表（出典：Intel の発表資料）', b: 'DMTF の規格。DSP0266 の 1.0.0 は 2015 年 8 月 4 日の公開（出典：DMTF の版の一覧）', note: '作った主体と時期が違う。', ch: [19] },
    { a: '共通の命令、イベントの形式、データの記録を決める（出典：IPMI v2.0 仕様書、第 1 章）', b: 'HTTP 上のリソースと、JSON のスキーマを決める（出典：DSP0266 1.23.0）', note: '「命令と記録の形」か、「Web の作りの上のリソース」か。', ch: [19] },
    { a: 'LAN、シリアル、PCI Management Bus などで管理する（出典：IPMI v2.0 仕様書、第 1 章）', b: 'HTTP/1.1 の上で動き、暗号化は TLS（出典：DSP0266 1.23.0）', note: '通信の土台が違う。', ch: [19, 25] },
    { a: 'SEL・SDR・FRU などの記録形式を、仕様書の中で決める（出典：IPMI v2.0 仕様書、目次）', b: 'すべてのリソースが JSON で取れ、項目は DSP8010 のスキーマで決まる（出典：DSP0266 1.23.0、DSP8010）', note: '機器の状態を読む側の作りやすさに関わる。', ch: [19, 23] },
    { a: '公開されている版は v2.0 Rev 1.1（2013 年 10 月）と補遺（出典：Intel の公開資料）', b: 'スキーマ束の 2026.1 版が 2026 年 4 月 2 日に公開（出典：DMTF DSP8010）。2025 年に 3 回、2026 年 1 月に 2025.4 が公開された（出典：DMTF の発表）', note: '版の更新の続き方が違う。使う機器の対応版は、仕様書で確認する。', ch: [19] }
  ],
  note: '機器が IPMI と Redfish のどちらに、どの版で対応するかは製品で違います。選定のときは、各社の仕様書で確認してください。'
});

CN.add('ident', 'c19-uri', {
  title: 'Redfish の URI を分けて読む（規格の例）',
  items: [
    { name: '/redfish/v1/Systems/{ComputerSystemId}', full: 'サーバー 1 台のリソース', summary: '**システム**（計算機としてのサーバー）を表す URI。電源状態と電源の操作がここにある。', where: '`{ComputerSystemId}` の部分には、機器ごとの識別子が入る。値は機器の応答で確かめる（出典：DMTF DSP2046 2022.3）。', parts: [
      { label: 'サービスルート', val: '/redfish/v1/', bits: '入口', d: 'Redfish の入口。`v1` は、プロトコルのメジャーバージョンを表す。ここから、リンクをたどって他のリソースへ進む（出典：DSP0266 1.23.0）。' },
      { label: 'コレクション', val: 'Systems', bits: '同じ種類の集まり', d: 'システムの集まり。数は増減する。1 台なら、中身は 1 つだけ。' },
      { label: 'リソース', val: '{ComputerSystemId}', bits: '1 台分', d: '1 台のシステム。`PowerState`（電源状態）や、`Reset`（電源の操作）の入口を持つ。', c: 3 }
    ] },
    { name: '/redfish/v1/Chassis/1U/Sensors/CPU1', full: 'センサー 1 つのリソース（架空の識別子）', summary: '筐体の下にある**センサー**。読み値と状態を持つ。', where: 'URI の形は `/redfish/v1/Chassis/{ChassisId}/Sensors/{SensorId}`（出典：DSP2046 2022.3）。`1U` と `CPU1` は、この章の説明用の例。', parts: [
      { label: 'サービスルート', val: '/redfish/v1/', bits: '入口', d: 'どの URI もここから始まる。' },
      { label: 'コレクション', val: 'Chassis', bits: '筐体の集まり', d: '筐体（物としての入れ物）の集まり。' },
      { label: '筐体', val: '1U', bits: '1 つの筐体', d: '筐体を表す識別子。DSP2046 の例にある値。' },
      { label: 'コレクション', val: 'Sensors', bits: 'センサーの集まり', d: 'この筐体のセンサーの集まり。' },
      { label: 'センサー', val: 'CPU1', bits: '1 つのセンサー', d: '`Reading`、`ReadingType`、`Status`、`Thresholds` などを持つ。', c: 3 }
    ] },
    { name: '/redfish/v1/EventService/Subscriptions/{EventDestinationId}', full: '出来事の通知の申込み 1 件', summary: '通知を受け取る相手（宛先）の申込みを表す。', where: '通知の入口は `/redfish/v1/EventService`。宛先の申込みは、その下の `Subscriptions` に作る（出典：DSP2046 2022.3、DSP0266 1.23.0）。', parts: [
      { label: 'サービスルート', val: '/redfish/v1/', bits: '入口', d: '共通の入口。' },
      { label: 'サービス', val: 'EventService', bits: '通知のサービス', d: '通知を管理するサービス。SSE の受け口（`ServerSentEventUri`）も、ここにつながる。' },
      { label: 'コレクション', val: 'Subscriptions', bits: '申込みの集まり', d: '通知の宛先の申込みの集まり。クライアントが HTTP の POST（操作の名前）で作る。' },
      { label: '申込み', val: '{EventDestinationId}', bits: '1 件', d: '1 件の申込み。種類と宛先の情報を持つ。', c: 3 }
    ] }
  ]
});

CN.add('state', 'c19-power', {
  machines: [{ key: 'ps', label: 'サーバーの電源状態（Redfish の PowerState）', w: 800, h: 330, note: '値は DMTF の『Redfish Resource and Schema Guide』2022.3 版の ComputerSystem の説明にある 5 つです。後の版で `Sleeping` と `Hibernating` が足されました（DSP8010 2026.1 の変更履歴）。遷移の条件は操作（`ResetType`）の説明から整理したものです。',
    states: [
      { id: 'off', name: 'Off', sub: '切れている', x: 10, y: 60, w: 130, kind: 'off', d: '電源が切れた状態。ただし、一部の部品には補助の電力が残ることがある（DSP2046 2022.3）。BMC が応じるのは、この状態でも。' },
      { id: 'pon', name: 'PoweringOn', sub: '入れる途中', x: 220, y: 60, w: 130, kind: 'off', d: '切れた状態から、入った状態へ移る間の一時的な状態。部品が電源投入の処理を終えるまで続く（DSP2046 2022.3）。' },
      { id: 'on', name: 'On', sub: '入っている', x: 430, y: 60, w: 130, kind: 'on', d: '電源が入っている状態。OS が動き始めているとは限らない。ファームウェアの起動は第20章。' },
      { id: 'pause', name: 'Paused', sub: '一時停止', x: 640, y: 60, w: 130, kind: 'on', d: '電力は切らずに、実行を止めた状態。ハイパーバイザなどが使う機能（DSP2046 2022.3 の `Pause` の説明）。' },
      { id: 'poff', name: 'PoweringOff', sub: '切る途中', x: 325, y: 230, w: 130, kind: 'off', d: '入った状態から、切れた状態へ移る間の一時的な状態。部品が電源を切る処理を終えるまで続く（DSP2046 2022.3）。' }
    ],
    trans: [
      { from: 'off', to: 'pon', label: '電源を入れる', cond: '`Reset` の `ResetType` に `On` などを渡す。または電源ボタンの操作（`PushPowerButton`）。', lw: 90 },
      { from: 'pon', to: 'on', label: '完了', cond: '部品が電源投入の処理を終える。', lw: 60 },
      { from: 'on', to: 'poff', label: '電源を切る', cond: '`GracefulShutdown`（OS に終了を頼んでから切る）や `ForceOff`（すぐ切る）を渡す。', lw: 90 },
      { from: 'poff', to: 'off', label: '完了', cond: '部品が電源を切る処理を終える。', lw: 60 },
      { from: 'on', to: 'pause', label: 'Pause', cond: '`ResetType` に `Pause` を渡す。実行を止めるが、電力は切らない。', curve: 22, lw: 70 },
      { from: 'pause', to: 'on', label: 'Resume', cond: '`ResetType` に `Resume` を渡す。止まっていた実行を再開する。', curve: 22, lw: 70 }
    ] }]
});

CN.add('seq', 'c19-seq', {
  title: 'Redfish で電源を入れる 1 回（値は説明用の例）',
  actors: [
    { id: 'op', name: '運用者', kind: 'pol' },
    { id: 'tool', name: '管理ツール', sub: '運用者の端末', kind: 'pol' },
    { id: 'bmc', name: 'BMC', sub: 'Redfish のサービス', kind: 'pol' },
    { id: 'pwr', name: '電源の制御', sub: 'PSU など', kind: 'db' },
    { id: 'host', name: 'ホスト', sub: 'CPU とファームウェア', kind: 'ue' }
  ],
  steps: [
    { phase: '① ログインと確認', from: 'op', to: 'tool', msg: '対象のサーバーの電源を入れたい', lbl: '依頼', if: '画面の操作', ie: ['対象の機器'], what: '運用者が、管理ツールで対象を選ぶ。', ch: [19] },
    { from: 'tool', to: 'bmc', msg: 'セッションを作る（認証）', lbl: 'ログイン', if: 'HTTPS で Redfish に POST', ie: ['利用者名とパスワード（または別の認証）'], what: '管理ツールが BMC にログインする。成功すると、以後の要求に付ける認証の印（`X-Auth-Token`）を受け取る（DSP0266 1.23.0）。', trap: '管理ネットワークが分かれていなくても動く。しかし、BMC が守られない。第25章。', ch: [19, 25] },
    { from: 'tool', to: 'bmc', msg: 'GET /redfish/v1/Systems/{id}', lbl: '状態を読む', if: 'HTTP の GET', ie: ['PowerState'], what: '操作の前に、いまの `PowerState` を読む。`Off` なら、電源を入れてよい。', ch: [19] },
    { phase: '② 操作', from: 'tool', to: 'bmc', msg: 'Reset アクションに POST（ResetType は On）', lbl: '電源を入れる', if: 'HTTP の POST', ie: ['ResetType: On'], what: '`Reset` アクションに、`ResetType` として `On` を渡す（DSP2046 2022.3）。', trap: '`ForceOff` や `GracefulShutdown` と間違えない。切る操作は、動いている処理に影響する。', ch: [19] },
    { at: 'bmc', note: '権限を確かめ、PowerState を PoweringOn にする', msg: '受付と状態の更新', what: 'BMC は、操作する権限があるかを確かめる。受け付けたら、電源状態を `PoweringOn` に変える。' },
    { from: 'bmc', to: 'pwr', msg: '電源を入れる指示', lbl: '指示', if: '基板上の制御信号（製品による）', ie: ['電源の入れ方'], what: 'BMC が、電源の制御へ指示を出す。経路は製品で違う。', ch: [14, 19] },
    { from: 'pwr', to: 'host', msg: '電力を供給', lbl: '給電', if: '基板上の給電', ie: ['電力'], what: '電力がホストへ送られ、ファームウェアが起動を始める（第20章）。', ch: [20] },
    { phase: '③ 確認', from: 'host', to: 'bmc', msg: '起動した', lbl: '状態を知らせる', if: 'サーバー内の接続（製品による）', ie: ['起動の状態'], what: 'ホストが動き始めたことを、BMC が知る。', ch: [19, 20] },
    { from: 'tool', to: 'bmc', msg: 'GET /redfish/v1/Systems/{id} → PowerState: On', lbl: '結果を確かめる', if: 'HTTP の GET', ie: ['PowerState: On'], what: '管理ツールが、もう一度状態を読み、`On` になったことを確かめる。操作の「受付」と「完了」は別なので、読み直す。', trap: '`On` は、OS が動いていることを意味しない。OS の状態は、別の方法（OS 内の監視など）で確かめる。', ch: [19, 23] }
  ]
});

CN.add('quiz', 'c19-quiz', { items: [
  { q: 'サーバーに、帯域外管理の仕組みが要るのは、主にどんな理由からですか。', c: ['データ通信の帯域幅を増やすため', 'OS の処理を速くするため', '運用者の画面を、サーバーに映すため', '本体の OS や電源が止まっていても、遠くから状態を見て操作するため'], a: 3,
    why: '帯域外管理は、**データの道や OS とは別の経路**で管理する。OS が止まっても、電源の操作や状態の確認ができる。帯域幅や処理の速さを上げる仕組みではない。', ch: 19 },
  { q: 'Redfish が IPMI と違う点として、適切なものはどれですか。', c: ['HTTP の上で、JSON のリソースとスキーマとして管理の対象を決めている', '管理ネットワークが要らず、OS の中だけで動く', '電源の操作ができるのは Redfish だけである', 'BMC を使わず、ホストの CPU が直接管理する'], a: 0,
    why: 'Redfish は **HTTP と JSON の上のリソース**として決めている（IPMI は命令と記録の形を決めた規格）。電源の操作は IPMI にもあるし、Redfish も BMC が応える。', ch: 19 },
  { q: 'BMC のネットワークを、データのネットワークと分ける主な理由はどれですか。', c: ['BMC の通信を速くするため', '電源の操作などの強い権限が届く経路を、限られた人と機器だけに絞るため', 'IP アドレスの数を節約するため', 'ファームウェアの更新を不要にするため'], a: 1,
    why: 'BMC は**電源の操作や更新ができる強い権限**を持つ。届く経路を絞り、データのネットワークから切り離して守る。速度や IP アドレスの節約が目的ではない。第25章。', ch: 19 }
]});

CN.glossary([
  { t: '基板管理コントローラ', en: 'Baseboard Management Controller', alias: 'BMC', d: 'サーバーの基板に載る小さなコントローラ。センサーの監視、ログの記録、電源の操作などを、ホストの OS とは別に行う。', ch: [19] },
  { t: '帯域外管理', en: 'out-of-band management', alias: '管理ネットワーク', d: 'データの通信や OS を通らない、別の経路でサーバーを管理すること。管理用の経路を管理ネットワークと呼ぶ。', ch: [19] },
  { t: 'IPMI', en: 'Intelligent Platform Management Interface', d: 'サーバーの管理の共通の命令・イベント・記録の形を決めた規格。v2.0 の仕様書が公開されている。', ch: [19] },
  { t: 'Redfish', d: 'DMTF が策定した管理の規格。HTTP の上で、機器の状態を JSON のリソースとして表す。', ch: [19] },
  { t: 'DMTF', en: 'Distributed Management Task Force', d: 'Redfish などの管理の規格を策定する団体。', ch: [19] },
  { t: 'SEL', en: 'System Event Log', alias: 'システムイベントログ', d: 'IPMI で、機器の出来事を、不揮発の領域に残すログ。BMC が管理する。', ch: [19, 23] },
  { t: 'リモートコンソール', en: 'remote console', alias: '仮想 KVM', d: '離れた場所から、機器の画面・キーボード・マウスの代わりに操作する機能。画面を扱うものを仮想 KVM と呼ぶことがある。', ch: [19] },
  { t: 'OpenBMC', d: 'BMC のファームウェアの、オープンソースの共通基盤。Linux Foundation が 2018 年に発足を発表した。', ch: [19] }
]);

CN.exam([
  { part: 4, q: 'Redfish のサービスルートの URI は /redfish/v1/ です。この「v1」が表すものはどれですか。', c: ['サーバーのラック内の位置', 'プロトコルのメジャーバージョン', 'スキーマの更新回数', 'ファームウェアの版'], a: 1,
    why: 'URI の `v1` は、**プロトコルのメジャーバージョン**を表す（DSP0266）。機器の位置、スキーマの更新、ファームウェアの版とは別。', ch: 19 }
]);

CN.mapping('mg', [
  { a: '機器の遠隔管理（リソースと JSON スキーマ）', b: 'Redfish（DMTF。仕様 DSP0266、スキーマ束 DSP8010）', note: '第19章。HTTP の上で、電源・センサー・更新などを表す。', ch: [19] },
  { a: '機器の遠隔管理（命令と記録の形式）', b: 'IPMI（v2.0。Intel などが公開した仕様書）', note: '第19章。SEL・SDR・FRU などの記録形式を決める。', ch: [19] }
]);
