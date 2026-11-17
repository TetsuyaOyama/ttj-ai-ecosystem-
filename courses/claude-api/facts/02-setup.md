# 第02章 事実確認表（02-setup）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | Console アカウント、API キー作成、環境変数 ANTHROPIC_API_KEY | https://platform.claude.com/docs/en/get-started ; https://platform.claude.com/docs/en/get-api-key | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 2 | 公式 | キーは 1 回だけ表示、保管の勧め、ブラウザから呼ばない | https://platform.claude.com/docs/en/get-api-key ; https://platform.claude.com/docs/en/manage-claude/authentication | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 3 | 公式 | 自分で決める月の上限と、上限到達時の動き | https://platform.claude.com/docs/en/api/rate-limits | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | 公式 | 前払いのクレジット、自動リロード、期限 | https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 5 | 公式 | 新しいユーザーへの無料クレジットの記載（FAQ） | https://platform.claude.com/docs/en/about-claude/pricing | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 6 | 一般知識 | PowerShell・export の環境変数の書き方、キーのファイルを公開しない注意（公式 API ドキュメントの記載ではない） | - | - | 2026-11-18 |
| 7 | 除外 | 「交互でないとエラー」「上限のリセット時刻」は未確認のため書かない | - | - | 2026-11-18 |
| 8 | 公式 | Create key でワークスペースを選んでキーを限定できる。限定しないキーは各リクエストに anthropic-workspace-id ヘッダーが必要。ローカル開発では CLI でのサインインが推奨 | https://platform.claude.com/docs/en/get-api-key ; https://platform.claude.com/docs/en/manage-claude/authentication ; https://platform.claude.com/docs/en/get-started | 確認担当が追加（2 ページで一致） | 2026-11-18 |
