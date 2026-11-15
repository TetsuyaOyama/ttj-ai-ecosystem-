# 第07章 の事実確認表（確認 2026-11-15）

教材の行は tools/gen.py が tools/resources.json から作る。一次：○ 提供元の公式ページ／△ 公式の別ページ・写し・案内のみ／× 二次情報のみ（その場合は「未確認」と書く）／ー 該当なし。

| # | 区分 | 事実 | 出典 | 経路 | 一次 | 確認日 |
|---|---|---|---|---|---|---|
| 1 | 状態 | Claude Code ドキュメント（クイックスタート）：状態の札「現行」。契約の料金の額は、このページには書かれていません。英語版は https://code.claude.com/docs/en/quickstart です。ページの最後で、Claude Academy の無料のセルフペースコースを案内しています。 | https://code.claude.com/docs/ja/quickstart | 日本語版と英語版のページを開いて確認 | ○ | 2026-11-15 |
| 2 | 料金 | Claude Code ドキュメント（クイックスタート）：料金の札「登録が必要（有料の契約か API）」 | https://code.claude.com/docs/ja/quickstart | 日本語版と英語版のページを開いて確認 | ○ | 2026-11-15 |
| 3 | 前提 | Claude Code ドキュメント（クイックスタート）：前提「ターミナル、コードのプロジェクト、Claude の契約（Pro・Max・Team・Enterprise）か Claude Console アカウントか対応クラウド経由のアクセス」。日本語「あり」 | https://code.claude.com/docs/ja/quickstart | 日本語版と英語版のページを開いて確認 | ○ | 2026-11-15 |
| 4 | リポジトリ | claude/settings.json に権限ルール（allow・ask・deny）と、8 つの場面（UserPromptSubmit・PreToolUse×2・PostToolUse・SessionStart・PreCompact・Stop・SessionEnd）のフックの設定がある | ttj-ai-ecosystem/claude/settings.json | ファイルを開いて確認 | ○ | 2026-11-15 |
| 5 | リポジトリ | claude/hooks/ に Python のフック 8 本（bash_guard・secret_guard・change_log・prompt_reminder・session_start・session_end・pre_compact・stop_notify） | ttj-ai-ecosystem/claude/hooks/ | ls と docstring を確認 | ○ | 2026-11-15 |
| 6 | リポジトリ | claude/agents/ に 5 体（scout・checker・builder・reviewer・architect）。claude/skills/ に 7 本。claude/CLAUDE.md に共通の決まり | ttj-ai-ecosystem/claude/ | ls とファイルの先頭を確認 | ○ | 2026-11-15 |
| 7 | リポジトリ | install.sh が claude/ 以下を ~/.claude/ にコピーする、との README の説明（install.sh の中身は未読） | ttj-ai-ecosystem/README.md | README を確認 | △ | 2026-11-15 |
