# 第09章 事実確認表（09-tool-use）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | クライアントツールは自分のアプリが実行、サーバーツールは Anthropic が実行 | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） ＋ handle-tool-calls で別の表現で再取得 | 2026-11-18 |
| 2 | 公式 | ループ: stop_reason tool_use → tool_use ブロック（id/name/input）→ tool_result（tool_use_id） | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | 2 回の取得で突き合わせ（別の表現の質問） | 2026-11-18 |
| 3 | 公式 | tool_result は直前の assistant の直後、content の先頭に並べる。失敗は is_error: true | https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | 公式 | tool_choice: auto / any / tool / none、disable_parallel_tool_use | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 5 | 公式 | 道具の定義項目 name / description / input_schema / strict | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 6 | 除外 | 未知のツール名の動作: 公式に決まった記載がなく、書かない。並列呼び出しの詳細は未取得で書かない | - | - | 2026-11-18 |
| 7 | 公式 | tool_choice の any・tool は Fable 5.2・Mythos 5.2・Opus 5.5・Sonnet 5.5・Fable 5.1・Mythos 5.1 で 400。代わりに auto＋strict か構造化した出力。Haiku 5.5 は受け付ける | https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools | 確認担当が追加（逐語の再取得で確認） | 2026-11-18 |
