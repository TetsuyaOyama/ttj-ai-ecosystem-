/* 第07章のデータ。事実の出どころ：facts/07-params-errors.md（確認 2026-11-18）。制限の数字は第05章 */
function Q(q, ok, bad, a, why, ch) { var c = bad.slice(); c.splice(a, 0, ok); return { q: q, c: c, a: a, why: why, ch: ch || [] }; }
function E(part, q, ok, bad, a, why, ch) { var o = Q(q, ok, bad, a, why, ch); o.part = part; return o; }

CN.add('table', 'c07-params', {
  title: '主なパラメータ（出典：Messages API reference ほか）',
  caption: '行を押すと補足が出ます。「注意」の列は、公式の記載と、この講座の整理を含みます',
  cols: ['パラメータ', '必須か', '役目', '注意'],
  rows: [
    ['max_tokens', '必須', '作る答えの長さの上限（トークン）', '上限で止まると stop_reason が max_tokens'],
    ['stop_sequences', '任意', '出たら生成を止める文字列の一覧', '止まると stop_reason が stop_sequence'],
    ['stream', '任意', 'true で、答えをイベントの列で受け取る', '受け取るコードも変わる'],
    ['output_config.effort', '任意', '賢さと、速さ・費用のつり合いを調整する（low・medium・high・xhigh・max）', '既定はモデルで違う。モデルによって、使える段階が違う'],
    ['system', '任意', '役割・決まり・文脈', '第 04 章'],
    ['tools / tool_choice', '任意', 'モデルが呼べるツールと、使い方の指定', '第 09 章'],
    ['temperature・top_p・top_k', '—', '（以前は）答えのばらつきの調整', '4.7 以降のモデルで使えない。2026-10-21 からは全モデルで 400']
  ],
  detail: [
    '公式の説明：「止まる前に作るトークンの最大数。モデルは、この上限より前に止まることもある」。値が足りないと、答えが途中で切れます。',
    '公式の説明：独自の文字列が出たら止まる。止まった文字列は、レスポンスの stop_sequence に入ります。',
    'SDK の stream を使うと、イベントを自分で読まずに、text_stream で文字を受け取れます。',
    'effort は、同じモデルの中で、答えのための努力量（使うトークン）を調整します。Opus 5.5 と Haiku 5.5 の既定は medium、そのほかは high です。既定と同じ値は、省略と同じ動きです（出典：Effort）。',
    'system は、本文のトップレベルのキーです。',
    'tools はツールの定義、tool_choice は「自動・使わない・必ず使う」などの指定です。「必ず使う」の指定（any・tool）は、この講座で扱うモデルの多くで 400 エラーになります（第 09 章）。',
    '公式は、使うと 400 エラーになるので、リクエストから外し、プロンプトで導くよう案内しています。'
  ],
  note: 'ほかにも thinking、metadata、cache_control など、任意のパラメータがあります。一覧は公式の API リファレンスで確かめてください。'
});

CN.add('seq', 'c07-stream', {
  title: 'ストリーミングのイベントの順序（公式の説明に沿った簡略版）',
  actors: [{ id: 'app', name: 'あなたのプログラム', sub: 'stream を有効にして送信', kind: 'ue' }, { id: 'api', name: 'Claude API', sub: 'サーバー送信イベント（SSE）', kind: 'ran' }],
  steps: [
    { phase: '開始', from: 'app', to: 'api', msg: 'POST /v1/messages（stream: true）', lbl: 'stream: true', what: 'リクエストに stream を true と書いて送ります。' },
    { from: 'api', to: 'app', msg: 'message_start', lbl: 'message_start', dash: true, what: '空の content を持つ Message オブジェクトが届きます。' },
    { phase: 'ブロックごと', from: 'api', to: 'app', msg: 'content_block_start', lbl: 'ブロックの開始', dash: true, what: '答えのブロックが始まります。index は、最終的な content の配列の位置です。' },
    { from: 'api', to: 'app', msg: 'content_block_delta（何回も）', lbl: '差分が続く', dash: true, what: '文字が、少しずつ届きます。画面には、ここで届く文字を足していきます。' },
    { from: 'api', to: 'app', msg: 'content_block_stop', lbl: 'ブロックの終了', dash: true, what: 'そのブロックが終わります。ブロックが複数あれば、開始から終了までを繰り返します。' },
    { phase: '終了', from: 'api', to: 'app', msg: 'message_delta（1 回以上）', lbl: 'message_delta', dash: true, what: '最上位の変化（stop_reason、使ったトークン数など）が届きます。usage の数は累計です。' },
    { from: 'api', to: 'app', msg: 'message_stop', lbl: 'message_stop', dash: true, what: '最後のイベントです。' },
    { at: 'app', note: '途中の error イベントにも備える', msg: '途中のエラー', what: '200 を返したあとでも、混雑時に overloaded_error などが、イベントとして届くことがあります。知らない種類のイベントは、無視できるようにします。', trap: 'HTTP の状態が 200 でも、ストリームの途中で失敗することがある。' }
  ]
});

CN.add('table', 'c07-stop', {
  title: 'stop_reason の値と、扱い方（出典：Handling stop reasons）',
  caption: '行を押すと補足が出ます。成功（HTTP 200）の本文の中の値で、エラーではありません',
  cols: ['値', '意味（公式の説明）', '扱い方'],
  rows: [
    ['end_turn', 'モデルが、自然に答え終わった', 'そのまま使う'],
    ['max_tokens', 'max_tokens の上限に達した', '上限を上げるか、続きを頼む'],
    ['stop_sequence', '指定した stop_sequences のどれかが出た', 'stop_sequence を読み、どれかを確かめる'],
    ['tool_use', 'モデルがツールを呼ぼうとしている', 'ツールを実行し、結果を返す（第 09 章）'],
    ['pause_turn', 'サーバー側のツールの繰り返しが、上限に達した', '答えをそのまま付けて、続きを送る'],
    ['refusal', 'モデルが、応じなかった', 'stop_details を読み、別のモデルで再試行を考える'],
    ['model_context_window_exceeded', '答えが、コンテキストウィンドウをいっぱいにした', '途中で切れた答えとして扱う']
  ],
  detail: [
    'end_turn でも、まれに、中身の空の答えが返ることがあります。ツールの結果の直後に文章を足すと起きやすい、と公式は書いています。',
    'max_tokens で、tool_use のブロックが途中で切れたときは、上限を上げて、やり直します。',
    'stop_sequence は、止まった文字列を、そのまま入れます。',
    '公式は、多くのツール利用では、ツールランナー（SDK の機能）を使うよう勧めています。',
    'pause_turn は、サーバー側のツールの繰り返しが上限（既定 10 回）に達したときです。',
    'refusal は、エラーではなく、HTTP 200 で返ります。構造化した出力の公式ページには、refusal でも、作られたトークンは課金されると書かれています。',
    'この値は、SDK の型では、現在、ベータの名前空間にあります。'
  ],
  note: 'stop_reason は、成功の本文の中にあります。失敗したリクエストは、HTTP 4xx・5xx のエラーで返ります。'
});

CN.add('table', 'c07-err', {
  title: '主な HTTP エラー（出典：Errors）',
  caption: '行を押すと補足が出ます。「再試行」の列は、この講座の整理です',
  cols: ['状態コード', 'error.type', '意味（公式の説明）', '再試行'],
  rows: [
    ['400', 'invalid_request_error', 'リクエストの形や内容に問題がある。自分で決めた上限に達したときも返る', '直してから'],
    ['401', 'authentication_error', 'API キーに問題がある（不正な形・取り消し・期限切れ）', '直してから'],
    ['402', 'billing_error', '請求や支払いの情報に問題がある', '直してから'],
    ['403', 'permission_error', 'キーに、その資源を使う権限がない', '直してから'],
    ['404', 'not_found_error', '求めた資源が見つからない', '直してから'],
    ['413', 'request_too_large', 'リクエストの大きさが上限を超えた', '小さくしてから'],
    ['429', 'rate_limit_error', 'レート制限か、月の上限に達した', 'retry-after があれば待つ。月の上限は待っても失敗'],
    ['500', 'api_error', 'Anthropic の内部の予期しない問題', '倍々の間隔で'],
    ['529', 'overloaded_error', 'API が一時的に混雑している', '倍々の間隔で']
  ],
  detail: [
    '自分で決めた月の上限に達したときも、400 が返ります（第 02 章）。メッセージの書き出しで、見分けられます。',
    'キーの期限切れは、401 になります。期限の切れたキーは、復活できず、新しく作ります。',
    '支払いの情報を、Console で確かめます。',
    '組織の権限と、ワークスペースの設定を、Console で確かめます。',
    '宛先の経路と、リソースの ID を確かめます。',
    'Messages API とトークンカウントの上限は、公式の API の概要に書かれています。ファイルは、Files API を使う方法もあります（第 10 章）。',
    '429 は、レート制限、月の上限、ランプ制限のいずれかです。error.details.error_code で見分けられます（enforced_spend_limit_reached、ramp_limit_exceeded）。',
    '公式は、倍々に間隔を空けて再試行し、続くときは request ID を添えて問い合わせるよう書いています。',
    '529 は、利用者の全体が多いときに起きることがあります。この講座の見方として、間隔を空けて再試行します。'
  ],
  note: '504 の timeout_error など、ほかの種類もあります。長い処理は、ストリーミングかバッチを使うよう、公式は勧めています。'
});

CN.add('flow', 'c07-retry', {
  title: '失敗したら：状態コードを見る → 直す／待つ／間隔を空けて再試行',
  direction: 'auto',
  steps: [
    { id: 'call', name: '呼び出す', sub: 'リクエスト送信', kind: 'ue', desc: 'リクエストを送り、結果を受け取ります。', inputs: ['リクエスト'], outputs: ['成功 または エラー'], next: [{ to: 'ok', label: '成功', cond: 'HTTP 200' }, { to: 'kind', label: '失敗', cond: '4xx・5xx・接続の失敗' }] },
    { id: 'kind', name: 'エラーを見る', sub: '状態コードと type', kind: 'pol', desc: '状態コードと error.type を読みます。request_id を、ログに残します。', inputs: ['エラーの本文'], outputs: ['種類の判断'], next: [{ to: 'fix', label: '400 系', cond: '400・401・402・403・404・413' }, { to: 'limit', label: '429', cond: 'rate_limit_error' }, { to: 'wait', label: '5xx', cond: '500・529・接続の失敗' }] },
    { id: 'ok', name: '成功', sub: 'stop_reason 確認', kind: 'ran', desc: '成功でも、stop_reason が max_tokens や refusal でないかを確かめます。', inputs: ['レスポンス'], outputs: ['使える答え'], end: true },
    { id: 'fix', name: '直してから送る', sub: '再試行しない', kind: 'ims', desc: 'リクエスト・キー・支払い・権限・大きさを直します。同じものを送り続けても、失敗します。', inputs: ['エラーの原因'], outputs: ['直したリクエスト'], caution: '同じ内容の再試行は、費用と時間のむだ。', end: true, row: 1, col: 1 },
    { id: 'limit', name: '429 の種類を見る', sub: 'retry-after', kind: 'ims', desc: 'retry-after があれば、その秒数待ちます。月の上限（enforced_spend_limit_reached）なら、待っても失敗するので、上限を確かめます。', inputs: ['ヘッダーと本文'], outputs: ['待つか、上限を直すか'], next: [{ to: 'call', label: '待って再試行', kind: 'loop' }], repeat: '上限回数まで', row: 1, col: 2 },
    { id: 'wait', name: '間隔を空けて再試行', sub: '倍々に待つ', kind: 'core', desc: '待つ間隔を、倍々に増やして、回数の上限まで再試行します。SDK は、既定で 2 回、自動で行います。', inputs: ['エラー'], outputs: ['再試行'], next: [{ to: 'call', label: '再試行', kind: 'loop' }], repeat: '最大 2〜3 回など', row: 1, col: 3 }
  ]
});

CN.add('quiz', 'c07-quiz', { items: [
  Q('API バージョン 2026-10-21 で、リクエストに temperature を付けて送ると、どうなりますか。',
    '400 エラーになる。公式は、リクエストから外し、プロンプトで振る舞いを導くよう案内している。',
    ['答えのばらつきが、そのとおりに調整される。', '値が無視されて、問題なく動く。', '429 が返り、しばらく待つと通る。'],
    3, '正答は「400 エラーになる」です。2026-10-21 のバージョンからは、どのモデルでも、値にかかわらず 400 になります。それより前のバージョンでも、4.7 以降のモデルでは、既定と違う値を付けると 400 です。', [7]),
  Q('HTTP 200 で、stop_reason が max_tokens のレスポンスが返りました。正しい扱いはどれですか。',
    '答えが途中で切れているので、上限を上げるか、続きを頼む。',
    ['成功なので、そのまま完成した答えとして使う。', '認証のエラーなので、キーを作り直す。', '429 なので、retry-after の秒数だけ待って、同じ内容を送り直す。'],
    0, '正答は「答えが途中で切れているので、上限を上げるか、続きを頼む」です。stop_reason は成功の本文の中の値で、エラーではありません。同じ上限で送り直しても、また切れます。', [7]),
  Q('429 で、retry-after ヘッダーがなく、メッセージが「月の利用の上限に達した」という趣旨でした。適切な対応はどれですか。',
    '待っても戻らないので、上限や段階を確かめ、必要なら上限を上げる。',
    ['SDK の自動の再試行に任せれば、すぐに成功する。', '倍々の間隔で、何度も再試行し続ける。', 'リクエストの形が間違っているので、本文を直す。'],
    1, '正答は「待っても戻らないので、上限や段階を確かめ、必要なら上限を上げる」です。月の上限の 429 には retry-after がなく、再試行は、再開まで失敗します。', [7, 5])
]});

CN.glossary([
  { t: 'max_tokens', en: 'max_tokens', alias: '最大トークン数', d: '作る答えの長さの上限（トークン）を指定する、必須のパラメータです。上限で止まると、stop_reason が max_tokens になります。', ch: [7] },
  { t: 'ストリーミング', en: 'streaming', alias: 'stream', d: '答えを、完成を待たずに、イベントの列として少しずつ受け取る方法です。stream を有効にして送ります。', ch: [7] },
  { t: 'レート制限', en: 'rate limit', alias: 'RPM・ITPM・OTPM', d: '1 分あたりに使える、リクエスト数・入力トークン数・出力トークン数の上限です。超えると 429 が返ります。', ch: [7] },
  { t: '指数バックオフ', en: 'exponential backoff', alias: '倍々の再試行', d: '失敗のあと、待つ時間を倍々に増やして、再試行する方法です。混雑を悪化させにくくなります。', ch: [7] },
  { t: 'request-id', en: 'request ID', alias: 'request_id', d: '各リクエストを区別する識別子です。レスポンスのヘッダーとエラーの本文にあり、問い合わせの時に添えます。', ch: [7] }
]);

CN.exam([
  E(2, 'API の呼び出しが 400 で失敗しました。最初にすることとして、適切なものはどれですか。',
    'リクエストの形や内容を見直して直す。同じものを再試行し続けない。',
    ['SDK の再試行回数を、増やす。', '同じリクエストを、間隔を空けて何度も送る。', '混雑が収まるのを、待つ。'],
    1, '正答は「リクエストの形や内容を見直して直す。同じものを再試行し続けない」です。400 は、リクエストの側の問題で、同じものを送っても失敗します。待つのが有効なのは、429 や 5xx です。', [7])
]);
