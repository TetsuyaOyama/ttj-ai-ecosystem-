# 第08章 事実確認表（08-prompts-structured）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | Claude を「文脈を知らない優秀な新人」と考える。文脈の少ない同僚に見せて迷うなら Claude も迷う | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 2 | 公式 | 例は 3〜5 個、<example> タグで区切る、XML タグを一貫して使う | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 3 | 公式 | 長い資料（2 万トークン以上の目安）は上、質問は最後。最大 30% 向上のテスト結果 | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | 公式 | output_config.format に type: json_schema と schema。messages.parse の推奨。additionalProperties false。refusal / max_tokens では schema に合わないことがある。citations との併用は 400 | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 5 | 除外 | Structured outputs ページの「厳密なツールの数の上限の数字」は取得しておらず、書かない | - | - | 2026-11-18 |
