# 第04章 事実確認表（04-messages）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | API はステートレス、履歴を毎回送る | https://platform.claude.com/docs/en/build-with-claude/working-with-messages | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 2 | 公式 | プレフィル（assistant の書き出し）は 4.6 以降で使えず 400 | https://platform.claude.com/docs/en/build-with-claude/working-with-messages | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 3 | 公式 | model・max_tokens・messages が必須。system・tools・stream・output_config は任意 | https://platform.claude.com/docs/en/api/messages/create | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | この講座の整理 | 実験台の文字数・会話の例文は架空の値 | - | - | 2026-11-18 |
| 5 | 公式 | 同じ役の発言が続くと 1 つにまとめられる（エラーではない）。会話の途中の role: system の発言は user の直後のみ・先頭不可。message threads（ベータ）で API が会話を保持できる | https://platform.claude.com/docs/en/api/messages/create ; https://platform.claude.com/docs/en/build-with-claude/working-with-messages | 確認担当が追加 | 2026-11-18 |
