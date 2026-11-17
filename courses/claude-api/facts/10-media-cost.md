# 第10章 事実確認表（10-media-cost）

確認日 2026-11-18。区分: 公式 / 一般知識 / この講座の整理 / 除外（書かなかった項目）。

| # | 区分 | 主張・値 | URL（出典） | 照合 | 確認日 |
|---|---|---|---|---|---|
| 1 | 公式 | 画像: JPEG・PNG・GIF・WebP、base64/URL/file_id、画像を文章より先に置く、アニメ GIF は最初のコマ、限界（小さい画像・人物の特定をしない等） | https://platform.claude.com/docs/en/build-with-claude/vision | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md）（ページは 1 回取得） | 2026-11-18 |
| 2 | 公式 | PDF: 各ページを画像と文字で処理、base64/URL/file_id、xlsx・docx は直接不可、PDF を文章より先に | https://platform.claude.com/docs/en/build-with-claude/pdf-support | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 3 | 公式 | キャッシュ: cache_control ephemeral、既定 5 分・1 時間オプション、tools→system→messages の順の接頭辞、usage の cache_creation_input_tokens / cache_read_input_tokens、両方 0 は未使用、最小長はモデルで違う | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 4 | 公式 | バッチ: 非同期、ほとんど 1 時間以内、24 時間で期限切れ、custom_id で突き合わせ、順不同、stream 不可、結果の保存期限あり | https://platform.claude.com/docs/en/build-with-claude/batch-processing | 1 回目の取得＋確認担当が再照合（2026-11-18、REVIEW.md） | 2026-11-18 |
| 5 | 除外 | 画像・PDF のサイズ・枚数・ページの上限、キャッシュの倍率、最小トークン数: この章には書かない（変わりやすい／価格は第 05 章のみ）。取得した値: PDF 128MB・600/100 ページ、画像 100/600 枚・8000px・10MB、キャッシュ書き込み 1.25× など → 参考 | - | - | 2026-11-18 |
