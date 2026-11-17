/* 第09章のデータ。事実の出どころ：facts/09-tool-use.md（確認 2026-11-18）。例は架空 */
function Q(q, ok, bad, a, why, ch) { var c = bad.slice(); c.splice(a, 0, ok); return { q: q, c: c, a: a, why: why, ch: ch || [] }; }
function E(part, q, ok, bad, a, why, ch) { var o = Q(q, ok, bad, a, why, ch); o.part = part; return o; }

CN.add('seq', 'c09-seq', {
  title: 'ツール利用の 1 往復：在庫を調べる（架空の例）',
  actors: [
    { id: 'user', name: '利用者', sub: '質問する人', kind: 'pol' },
    { id: 'code', name: 'あなたのプログラム', sub: '道具の本体を持つ', kind: 'ue' },
    { id: 'api', name: 'Claude API', sub: '/v1/messages', kind: 'ran' },
    { id: 'model', name: 'モデル', sub: 'Claude', kind: 'core' }
  ],
  steps: [
    { phase: '① 質問と道具の一覧', from: 'user', to: 'code', msg: '「A-100 の在庫は？」', lbl: '質問', if: '画面など', ie: ['質問の文章'], what: '利用者の質問が、あなたのプログラムに届きます。' },
    { from: 'code', to: 'api', msg: 'messages ＋ tools（get_stock の定義）', lbl: '1 回目の送信', if: 'HTTPS', ie: ['messages', 'tools', 'max_tokens'], what: '質問と一緒に、使える道具の名前・説明・引数の形を送ります。' },
    { phase: '② モデルの判断', from: 'api', to: 'model', msg: '質問と道具の定義', lbl: '処理を依頼', if: 'Anthropic の内部', ie: ['質問', '道具の定義'], what: 'モデルは、道具の説明を読み、使うべきかを判断します。' },
    { from: 'model', to: 'api', msg: 'tool_use（name: get_stock, input: {code: "A-100"}）', lbl: '道具の依頼', dash: true, if: 'Anthropic の内部', ie: ['tool_use'], what: 'モデルは、道具を呼ぶ依頼を返します。まだ、道具は動いていません。' },
    { from: 'api', to: 'code', msg: 'stop_reason: "tool_use" ＋ tool_use ブロック（id つき）', lbl: '依頼を受け取る', dash: true, if: 'HTTPS', ie: ['stop_reason', 'tool_use.id', 'tool_use.name', 'tool_use.input'], what: 'stop_reason が tool_use のときは、答えが終わっておらず、道具の実行待ちだという印です。', trap: 'stop_reason を見ずに、content の最初の文章だけを読むと、依頼を見落とします。' },
    { phase: '③ 実行', at: 'code', note: 'get_stock("A-100") を、自分のコードで実行する', msg: '道具の実行', what: '道具を動かすのは、あなたのプログラムです。何を許すか、どんな値は断るかも、ここで決められます。', trap: '入力の値は、そのまま信用せず、検査してから使います。' },
    { phase: '④ 結果を返す', from: 'code', to: 'api', msg: 'assistant の発言をそのまま追加 ＋ user の tool_result（tool_use_id 一致）', lbl: '2 回目の送信', if: 'HTTPS', ie: ['assistant の content', 'tool_result', 'tool_use_id'], what: '直前の assistant の発言を残し、直後に、結果を入れた user メッセージを置きます。tool_use_id で、どの依頼への返事かを結びます。', trap: 'tool_use に対応する tool_result が直後にないと、エラーになります。tool_use_id は、受け取った id をそのまま使います。' },
    { from: 'api', to: 'model', msg: '履歴 ＋ 道具の結果', lbl: '処理を依頼', if: 'Anthropic の内部', ie: ['履歴', 'tool_result'], what: 'モデルは、結果を材料に、最後の答えを作ります。' },
    { from: 'model', to: 'api', msg: '答えの文章', lbl: '答えを返す', dash: true, if: 'Anthropic の内部', ie: ['text'], what: '別の道具が要ると判断したら、もう一度 tool_use を返します（繰り返し）。' },
    { phase: '⑤ 最後の答え', from: 'api', to: 'code', msg: 'stop_reason: "end_turn" ＋ text', lbl: '最後の答え', dash: true, if: 'HTTPS', ie: ['stop_reason', 'text'], what: 'end_turn になったら、繰り返しを終えます。' },
    { from: 'code', to: 'user', msg: '「A-100 の在庫は 12 個です。」（例）', lbl: '表示', dash: true, if: '画面など', ie: ['答えの文章'], what: '利用者に、答えを見せます。重要な用途では、ここで人が確かめる設計にします（第 12 章）。' }
  ]
});

CN.add('table', 'c09-parts', {
  title: 'ツール利用に出てくる部品（出典：Tool use overview、Handle tool calls）',
  caption: '行を押すと補足が出ます',
  cols: ['部品', '誰が作る', '中身'],
  rows: [
    ['tools（道具の定義）', 'あなた', 'name、description、input_schema（strict も可）'],
    ['tool_use ブロック', 'モデル', 'id、name、input（引数）'],
    ['stop_reason: "tool_use"', 'API', '道具の実行待ちという印'],
    ['tool_result ブロック', 'あなた', 'tool_use_id、content、必要なら is_error'],
    ['is_error: true', 'あなた', '道具の実行が失敗したときの印']
  ],
  detail: [
    'description は、モデルが「いつ使うか」を決める手がかりです。何をする道具か、何をしない道具かを書きます。',
    'id は、この依頼を区別する値です。結果を返すときに、そのまま使います。',
    '道具の依頼が複数あることもあります。すべてに、結果を返します。',
    'tool_result は、直前の assistant の発言の直後の user メッセージに置き、content の先頭に並べます。文章は、その後です。',
    '公式の記載：失敗の内容と、次に試すとよいことを content に書くと、モデルが立て直しやすくなります。'
  ],
  note: '部品の名前と置き方は、公式の Tool use のページで、最新の形を確かめてください。'
});

CN.add('compare', 'c09-kinds', {
  title: '自分で動かす道具と、Anthropic 側で動く道具（出典：Tool use overview）',
  caption: '分類は公式の表に沿っています。使い分けの見方は、この講座の整理です',
  colA: 'クライアントツール', colB: 'サーバーツール', colNote: '見方',
  cats: [{ key: 'run', label: '誰が動かすか' }, { key: 'ex', label: '例' }, { key: 'cost', label: '気をつける点' }],
  rows: [
    { cat: 'run', a: 'あなたのプログラムが実行する。モデルは依頼を返すだけ。', b: 'Anthropic の側で実行される。結果は、同じ応答に入って返る。', note: '実行コードを書くかどうかが違う。' },
    { cat: 'ex', a: '自分で定義した道具。Anthropic が書き方を決めた bash、テキスト編集、コンピューター操作、メモリなど。', b: 'ウェブ検索、ウェブ取得、コード実行など。', note: '公式の表に、一覧がある。' },
    { cat: 'cost', a: '権限と入力の検査を、自分で作る。', b: '使った分の追加の料金がかかる場合がある（例：検索の回数）。', note: '料金の数字は、公式の料金表で確かめる。' },
    { cat: 'cost', a: '社内のデータや、自分のシステムにつなげる。', b: '書くコードが少ない代わりに、中身は自分で細かく決められない。', note: 'つなげたい先で選ぶ。' }
  ],
  note: '外部の道具を、共通の決まりでつなぐ MCP コネクタも、公式は別の種類として挙げています（第 11 章）。'
});

CN.add('table', 'c09-choice', {
  title: 'tool_choice：道具を使うかどうかの指定（出典：Tool use overview、Define tools）',
  caption: '行を押すと補足が出ます',
  cols: ['指定', '意味'],
  rows: [
    ['auto（既定）', 'モデルが、毎回、使うかどうかを決める'],
    ['any', '何かの道具を、必ず呼ぶ（Fable 5.2・Opus 5.5・Sonnet 5.5 では 400 エラー）'],
    ['tool', '指定した名前の道具を、必ず呼ぶ（同上。Haiku 5.5 では使える）'],
    ['none', '道具を呼ばない'],
    ['disable_parallel_tool_use: true', '1 回に呼ぶ道具を 1 つに制限する（auto と組み合わせる）']
  ],
  detail: [
    '多くの場合は、既定のままで十分です。',
    '公式の記載：any と tool に対応するモデルでは、プロンプトで頼むより確実です。ただし、Fable 5.2・Opus 5.5・Sonnet 5.5 などは、any と tool を受け付けず 400 を返します。その場合は、auto と strict: true（入力の形を保証）か、構造化した出力を使うよう、公式は案内しています。',
    '決まった形の抜き出しを、道具の入力として受けたいときなどに使います。使えるモデルは限られます（前の行と同じ）。',
    '道具の定義は渡したまま、今回は使わせたくないときに使います。',
    '呼ぶ順に意味があり、同時に呼ばれると困るときに使います。'
  ],
  note: '指定の書き方は、公式のページで最新の形を確かめます。'
});

CN.add('quiz', 'c09-quiz', { items: [
  Q('ツールの利用で、道具を実際に実行するのは、クライアントツールの場合、誰ですか。',
    'あなたのプログラム。モデルは、呼んでほしい道具と引数を返すだけ。',
    ['モデルが、自分で道具を実行する。', 'Claude API のサーバーが、すべての道具を実行する。', '利用者の画面のブラウザが、実行する。'],
    1, '正答は「あなたのプログラム」です。モデルは tool_use で依頼を返し、実行して結果を返すのは、あなたのコードです。', [9]),
  Q('stop_reason が "tool_use" で返ってきたとき、次にすることとして正しいものはどれですか。',
    '依頼された道具を実行し、直前の assistant の発言の直後に、tool_use_id を合わせた tool_result を入れた user メッセージを送る。',
    ['そのまま、利用者に最後の答えとして表示する。', '同じリクエストを、何も変えずに送り直す。', 'tool_use_id は、毎回、新しく作って入れる。'],
    2, '正答は「道具を実行し、tool_use_id を合わせた tool_result を、直後の user メッセージで送る」です。tool_use のときは、答えがまだ終わっていません。', [9]),
  Q('道具の実行が失敗したとき、公式が示す返し方はどれですか。',
    'tool_result に is_error: true を付け、何が起きたかと、次に試すとよいことを content に書く。',
    ['何も返さず、次の質問へ進む。', '失敗を隠すため、成功したように、作り話の結果を返す。', 'API キーを作り直す。'],
    3, '正答は「is_error: true を付け、状況と次の手を content に書く」です。作り話の結果を返すと、モデルは誤った前提で答えます。', [9])
]});

CN.glossary([
  { t: 'ツールの利用', en: 'tool use', alias: '関数呼び出し・function calling', d: 'モデルが、道具の呼び出しを依頼し、あなたのプログラムが実行して結果を返す仕組みです。', ch: [9] },
  { t: 'tool_use / tool_result', en: 'tool_use, tool_result', alias: '依頼と結果', d: 'tool_use は、モデルが返す道具の依頼です。tool_result は、実行結果を、tool_use_id を合わせて返すブロックです。', ch: [9] },
  { t: 'クライアントツール', en: 'client tools', alias: '自分で動かす道具', d: 'あなたのプログラムが実行する道具です。自分で定義したものと、書き方を Anthropic が決めたものがあります。', ch: [9] },
  { t: 'サーバーツール', en: 'server tools', alias: '', d: 'Anthropic の側で実行される道具です。ウェブ検索など。使った分の追加の料金がかかる場合があります。', ch: [9] },
  { t: 'tool_choice', en: 'tool_choice', alias: '', d: '道具を使うかどうかを指定する項目です。auto、any、tool、none があります。any と tool は、使えないモデルがあります。', ch: [9] }
]);

CN.exam([
  E(3, '社内の在庫を調べて答える仕組みを作ります。設計として適切なものはどれですか。',
    '在庫を調べる道具を定義し、モデルの依頼を受けて、自分のコードが検査したうえで実行し、結果を返す。回数の上限も置く。',
    ['モデルに在庫表の場所を教え、モデルが直接データベースを書き換えられるようにする。', '道具の依頼を無視して、モデルの最初の文章だけを表示する。', '失敗したときは、成功したように見せた結果を返す。'],
    3, '正答は「道具を定義し、自分のコードが検査して実行し、結果を返す。回数の上限も置く」です。実行の権限は、あなたのコードの側にあります。', [9])
]);
