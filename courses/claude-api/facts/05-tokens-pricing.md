# 第05章 事実確認表（05-tokens-pricing）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | 4 モデルの単価・キャッシュ・バッチ（表の値。Fable 5.2: 8/40、Opus 5.5: 4/20、Sonnet 5.5: 2/10、Haiku 5.5: 0.1/0.5、Haiku 5.5 は 100,000 トークン超で 0.5/2.5） | https://platform.claude.com/docs/en/about-claude/pricing | 2 回の取得で突き合わせ（別の表現の質問）（/tmp の保存コピーとも再照合済み 2026-11-18） | 2026-11-18 |
| 2 | 公式 | バッチは入力も出力も 50% 引き | https://platform.claude.com/docs/en/about-claude/pricing ; https://platform.claude.com/docs/en/build-with-claude/batch-processing | 2 回の取得で突き合わせ（別の表現の質問） | 2026-11-18 |
| 3 | 公式 | 月の上限 Start 500 / Build 1,000 / Scale 200,000 / Custom なし、到達で 429 | https://platform.claude.com/docs/en/api/rate-limits | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | 公式 | Sonnet 5.5 の RPM・ITPM・OTPM | https://platform.claude.com/docs/en/api/rate-limits | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 5 | 公式 | コンテキストウィンドウの上限、超えると 400 | https://platform.claude.com/docs/en/build-with-claude/context-windows | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 6 | 公式 | count_tokens は無料、推定値 | https://platform.claude.com/docs/en/build-with-claude/token-counting（ja） | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 7 | 公式 | 英語で 1 トークンおよそ 3.5 文字（以前のモデル） | https://platform.claude.com/docs/en/about-claude/glossary | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 8 | 除外 | 日本語の文字あたりトークン比率: 公式に値がないため、仮定の係数を明示して使用（プリセット 0.29 / 0.37 は仮定） | - | - | 2026-11-18 |
| 9 | この講座の整理 | 為替 150 円は仮定、実験台の式 | - | - | 2026-11-18 |
