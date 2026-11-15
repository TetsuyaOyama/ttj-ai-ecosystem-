# 第03章 の事実確認表（確認 2026-11-15）

教材の行は tools/gen.py が tools/resources.json から作る。一次：○ 提供元の公式ページ／△ 公式の別ページ・写し・案内のみ／× 二次情報のみ（その場合は「未確認」と書く）／ー 該当なし。

| # | 区分 | 事実 | 出典 | 経路 | 一次 | 確認日 |
|---|---|---|---|---|---|---|
| 1 | 状態 | Generative AI for Beginners：状態の札「現行」。README に、GitHub Models は 2026 年 7 月末に終了するので Microsoft Foundry Models を使う、と書かれています。環境の作り方は最新の README で確認してください。API の利用料の記載なし。 | https://github.com/microsoft/generative-ai-for-beginners | 公式 Pages の README を開いて確認（GitHub 本体は開けず） | △ | 2026-11-15 |
| 2 | 料金 | Generative AI for Beginners：料金の札「記載なし」 | https://github.com/microsoft/generative-ai-for-beginners | 公式 Pages の README を開いて確認（GitHub 本体は開けず） | △ | 2026-11-15 |
| 3 | 前提 | Generative AI for Beginners：前提「Python か TypeScript の基礎があると役立つ。GitHub アカウント。実行には Azure OpenAI Service・Microsoft Foundry Models・OpenAI API・Foundry Local のどれか」。日本語「あり」 | https://github.com/microsoft/generative-ai-for-beginners | 公式 Pages の README を開いて確認（GitHub 本体は開けず） | △ | 2026-11-15 |
| 4 | 状態 | Claude Academy：状態の札「改名・移転」。anthropic.com/learn は academy.claude.com へ移転しました（リダイレクトを確認）。academy.claude.com のページは開けず、講座の一覧・数・登録の要否は確認していません。Skilljar 上の講座一覧（Anthropic Academy の名前で 23 講座）も残っていて、そちらの講座は登録ボタンに「FREE」と表示されます。 | https://academy.claude.com/ | リダイレクトの確認、Claude の公式記事、Claude Code のドキュメント、Skilljar 上の講座一覧 | ○ | 2026-11-15 |
| 5 | 料金 | Claude Academy：料金の札「無料」 | https://academy.claude.com/ | リダイレクトの確認、Claude の公式記事、Claude Code のドキュメント、Skilljar 上の講座一覧 | ○ | 2026-11-15 |
| 6 | 前提 | Claude Academy：前提「講座ごとに違う（例：Bedrock の講座は Python と AWS の基礎）」。日本語「記載なし」 | https://academy.claude.com/ | リダイレクトの確認、Claude の公式記事、Claude Code のドキュメント、Skilljar 上の講座一覧 | ○ | 2026-11-15 |
| 7 | 状態 | Anthropic Courses（GitHub）：状態の札「保守終了」。GitHub のページに「2026-09-15 に所有者がアーカイブし、読み取り専用」と表示されます。README には、受講者の API の費用を抑えるため、多くの講座で安価なモデルを使う、と書かれています。Claude Academy への移転の案内は、README にはありません。ライセンスは LICENSE ファイルがあり、種類はページに記載なし。 | https://github.com/anthropics/courses | GitHub のリポジトリのページを開いて確認 | ○ | 2026-11-15 |
| 8 | 料金 | Anthropic Courses（GitHub）：料金の札「記載なし」 | https://github.com/anthropics/courses | GitHub のリポジトリのページを開いて確認 | ○ | 2026-11-15 |
| 9 | 前提 | Anthropic Courses（GitHub）：前提「Anthropic の API キー（最初の講座で扱う。詳細は各講座の README）」。日本語「記載なし」 | https://github.com/anthropics/courses | GitHub のリポジトリのページを開いて確認 | ○ | 2026-11-15 |
| 10 | 状態 | OpenAI Academy：状態の札「現行」。料金・修了証の条件は、OpenAI のヘルプ記事「OpenAI Academy courses」によります。80% 以上でバッジ、パスウェイを全部終えると修了証（認定資格ではない）、と書かれています。講座の一覧のページには、料金の記載はありません。 | https://academy.openai.com/pages/courses | 講座の一覧のページと、OpenAI のヘルプ記事（公式）を開いて確認 | ○ | 2026-11-15 |
| 11 | 料金 | OpenAI Academy：料金の札「無料（登録が必要）」 | https://academy.openai.com/pages/courses | 講座の一覧のページと、OpenAI のヘルプ記事（公式）を開いて確認 | ○ | 2026-11-15 |
| 12 | 前提 | OpenAI Academy：前提「ChatGPT アカウントでサインインして登録（講座は Gradual でホスト）」。日本語「一部（画面の表示は日本語に切り替えられる。講座の名前と説明は英語）」 | https://academy.openai.com/pages/courses | 講座の一覧のページと、OpenAI のヘルプ記事（公式）を開いて確認 | ○ | 2026-11-15 |
| 13 | 状態 | Claude の公式記事が、Claude Academy（academy.claude.com）を学習の場として紹介している | https://claude.com/resources/articles/anthropics-approach-to-teaching-and-learning-ai | 公式記事を WebFetch | ○ | 2026-11-15 |
| 14 | 状態 | Skilljar 上の講座一覧は「Anthropic Academy」の名前で 23 講座を載せている。一覧のページに料金の記載はない（個々の講座の登録ボタンは FREE） | https://anthropic.skilljar.com/ | 一覧のページを WebFetch | ○ | 2026-11-15 |
