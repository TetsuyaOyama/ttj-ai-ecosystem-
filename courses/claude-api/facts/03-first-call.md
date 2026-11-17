# 第03章 事実確認表（03-first-call）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | POST /v1/messages、必須ヘッダー（x-api-key、anthropic-version、content-type） | https://platform.claude.com/docs/en/get-started ; https://platform.claude.com/docs/en/api/overview | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 2 | 公式 | anthropic-version の最新は 2026-10-21 | https://platform.claude.com/docs/en/api/versioning | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 3 | 公式 | Python 3.10 以降、pip install anthropic | https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/python | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | 公式 | モデル ID claude-haiku-5-5 | https://platform.claude.com/docs/en/about-claude/models/overview | 2 回の取得で突き合わせ（別の表現の質問） | 2026-11-18 |
| 5 | 公式 | レスポンスの形（id、content、stop_reason、usage） | https://platform.claude.com/docs/en/get-started | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
