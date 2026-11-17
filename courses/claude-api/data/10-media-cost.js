/* 第10章のデータ。事実の出どころ：facts/10-media-cost.md（確認 2026-11-18）。数字の上限・単価は第05章と公式に任せ、ここには書かない */
function Q(q, ok, bad, a, why, ch) { var c = bad.slice(); c.splice(a, 0, ok); return { q: q, c: c, a: a, why: why, ch: ch || [] }; }
function E(part, q, ok, bad, a, why, ch) { var o = Q(q, ok, bad, a, why, ch); o.part = part; return o; }

CN.add('table', 'c10-blocks', {
  title: '画像・文書を渡すときの、ブロックと渡し方（出典：Vision、PDF support）',
  caption: '行を押すと補足が出ます',
  cols: ['渡すもの', 'ブロックの type', '渡し方', '補足'],
  rows: [
    ['画像', 'image', 'base64 / URL / Files API の file_id', '対応形式は JPEG、PNG、GIF、WebP'],
    ['PDF', 'document', 'base64 / URL / Files API の file_id', '各ページを、画像と文字の両方で読む'],
    ['テキストの文書', 'document', 'Files API（text/plain）など', 'xlsx、docx は直接は渡せず、PDF か文字に変換'],
    ['質問や指示', 'text', '文字列', '画像・PDF のあとに置く']
  ],
  detail: [
    '公式の記載：アニメーション GIF は、最初の 1 コマだけが使われます。画像は、文章より先に置くのがうまくいくとされます。',
    '公式の記載：パスワードや暗号化のない、標準の PDF が対象です。ページ数や大きさの上限は、公式のページで確かめます。',
    '公式の記載：バイナリ形式（xlsx、docx）は、document ブロックに直接は使えません。',
    '資料が長いときの置き方は、第 08 章を参照します。'
  ],
  note: 'クラウド事業者経由で使う場合は、渡し方に制限がある場合があります。使う場所の公式の説明で確かめてください。'
});

CN.add('compare', 'c10-tools', {
  title: 'プロンプトキャッシュと、バッチ処理：何を節約し、何を手放すか',
  caption: '仕組みは公式の説明に沿っています。使い分けの見方は、この講座の整理です',
  colA: 'プロンプトキャッシュ', colB: 'バッチ処理', colNote: '見方',
  cats: [{ key: 'what', label: '何を安くするか' }, { key: 'time', label: '待ち時間' }, { key: 'when', label: '向く場面' }],
  rows: [
    { cat: 'what', a: '同じ前置きの、読み取り分の入力。書き込みは割増になる。', b: 'リクエスト全体（入力も出力も）が割引になる。', note: '単価の数字は第 05 章の表を見る。' },
    { cat: 'time', a: '変わらない。普通のリクエストと同じ速さで返る。', b: '結果はすぐには返らない。ほとんどは 1 時間以内だが、保証ではなく、24 時間で打ち切られる。', note: '急ぐ仕事には向かない。' },
    { cat: 'when', a: '長い system や資料を、何度も使う（対話、同じ資料への質問）。', b: '件数が多く、急がない（評価、分類、一括の要約）。', note: '2 つは組み合わせられる（効き方は保証されない）。' },
    { cat: 'when', a: '前置きが、毎回まったく同じである。', b: '結果を、custom_id で突き合わせて読める。', note: '前提が満たせるかを先に見る。' }
  ],
  note: '2 つとも、費用の工夫です。まず、正しく動くものを作り、そのあとで、効果を測って入れます。'
});

CN.add('flow', 'c10-cache', {
  title: 'キャッシュの 1 周：印を付ける → 書き込み → 読み取り → usage で確かめる',
  direction: 'auto',
  steps: [
    { id: 'mark', name: '印を付ける', sub: 'cache_control', kind: 'ue', desc: '変わらない前置き（tools、system、長い資料）の最後のブロックに、cache_control を付けます。', inputs: ['変わらない前置き'], outputs: ['印つきのリクエスト'], caution: '時刻など、毎回変わる値を、印より前に入れない。', next: 'first' },
    { id: 'first', name: '1 回目：書き込み', sub: 'usage に記録', kind: 'ran', desc: '前置きが保存されます。usage の cache_creation_input_tokens に、書き込んだ量が出ます。', inputs: ['印つきのリクエスト'], outputs: ['保存された前置き'], next: 'second' },
    { id: 'second', name: '2 回目以降：読み取り', sub: 'usage に記録', kind: 'ran', desc: '前置きが完全に同じなら、保存分が再利用され、cache_read_input_tokens に出ます。使うたびに、保存時間が延びます。', inputs: ['同じ前置き＋新しい質問'], outputs: ['答え', 'usage'], next: 'check' },
    { id: 'check', name: 'usage で確かめる', sub: '両方 0 なら未使用', kind: 'pol', desc: 'cache_creation_input_tokens と cache_read_input_tokens がどちらも 0 なら、キャッシュは使われていません。最小の長さに届いたか、前置きが変わっていないかを見ます。', inputs: ['usage'], outputs: ['効いたかどうか'], end: true }
  ]
});

CN.add('quiz', 'c10-quiz', { items: [
  Q('プロンプトキャッシュが使われたかどうかを確かめる方法として、正しいものはどれですか。',
    'レスポンスの usage にある、cache_creation_input_tokens と cache_read_input_tokens を見る。両方が 0 なら使われていない。',
    ['画面の見た目が変わるので、見れば分かる。', 'エラーが出ないので、必ず使われている。', 'stop_reason が cache になる。'],
    2, '正答は「usage の 2 つの項目を見る」です。短すぎる入力は、エラーにならず、キャッシュされません。', [10]),
  Q('バッチ処理（Message Batches API）の結果の扱いとして、正しいものはどれですか。',
    '結果は順番どおりとは限らないので、custom_id で、リクエストと突き合わせる。',
    ['結果は、必ず送った順に並ぶ。', '結果は、いつまでも保存されるので、取り出さなくてよい。', '急ぎの質問は、バッチで頼むのが最も速い。'],
    3, '正答は「custom_id で突き合わせる」です。結果は順番どおりとは限らず、保存期限があり、時間の保証もありません。', [10]),
  Q('画像や PDF を渡すときの、公式の勧めに合うものはどれですか。',
    '画像や PDF のブロックを先に置き、質問の文章をそのあとに置く。',
    ['質問を先に書き、画像は最後に置く。', 'xlsx や docx を、そのまま document ブロックで渡す。', '画像の中の人物の名前を、モデルに必ず当てさせる。'],
    0, '正答は「画像や PDF を先に置き、質問をあとに置く」です。xlsx や docx は PDF か文字に変換します。人の名前は、特定しません。', [10])
]});

CN.glossary([
  { t: 'ブロック（image / document）', en: 'content blocks', alias: '', d: 'user の content に並べる、画像や文書や文章の部品です。image、document、text などがあります。', ch: [10] },
  { t: 'Files API', en: 'Files API', alias: 'ファイルのアップロード', d: 'ファイルを先にアップロードし、file_id で指して、何度も使える仕組みです。', ch: [10] },
  { t: 'プロンプトキャッシュ', en: 'prompt caching', alias: 'キャッシュ', d: '変わらない前置きを保存して再利用し、読み取りの費用を下げる仕組みです。前置きが完全に同じである必要があります。', ch: [10] },
  { t: 'バッチ処理', en: 'Message Batches API', alias: '一括処理', d: 'たくさんのリクエストを、非同期でまとめて処理する仕組みです。費用が下がる代わりに、結果はすぐには返りません。', ch: [10] },
  { t: 'custom_id', en: 'custom_id', alias: '', d: 'バッチの各リクエストにつける、自分で決める識別の文字列です。結果の突き合わせに使います。', ch: [10] }
]);

CN.exam([
  E(3, '毎晩、数千件の問い合わせを分類します。朝までに終わればよく、費用は抑えたいとします。最初に検討する方法として適切なものはどれですか。',
    'バッチ処理で頼み、custom_id で結果を突き合わせる。共通の前置きには、キャッシュの印も検討する。',
    ['1 件ずつ、毎回、同期で送り続ける。', 'ストリーミングをつけて、バッチで頼む。', '結果が順番どおりに返ると仮定して、並びで対応づける。'],
    0, '正答は「バッチ処理で頼み、custom_id で突き合わせる」です。バッチはストリーミングが使えず、結果の順序も保証されません。', [10])
]);
