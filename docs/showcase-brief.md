# ショーケース共通ルール

公開リポジトリに置く「見栄えのよい作品」。GitHub Pages（/showcase/）で表示する。

- 1作品 = 1つの index.html（CSS・JS は中に書く。外部ライブラリ・CDN・画像ファイルなし。Webフォントも読み込まず、`"Noto Sans JP", "Hiragino Sans", "Yu Gothic UI", system-ui, sans-serif` を指定）
- デザイン：design-system/tokens.css の変数を :root にコピーして使う（紺×金）。ヘッダーは紺地に金のアクセント、本文は白〜navy-50。上質で落ち着いた印象。角丸・影は控えめ
- 日本語。専門用語は英語表記を併記（例：「加入者識別モジュール（eUICC）」）
- スマホ（幅375px）でも崩れない。キーボード操作可能、`prefers-reduced-motion` ではアニメを止める
- 内容は公開規格（3GPP TS、GSMA SGP）と一般知識だけ。勤め先・顧客・実在の事業者名・個人情報は書かない。規格番号は正確に
- フッター：`© TTJ — TED TRADING JAPAN G.K.` と「ポートフォリオへ戻る」リンク（`../index.html`）。作者表記は「ビッグマウンテンテツヤ / TTJ」
- console エラーなし。`python3 -I` の html.parser でタグの閉じ忘れがないことを確認

ファイルの場所：
- showcase/index.html — ポートフォリオ（トップ）
- showcase/esim-rsp/index.html — eSIM/RSP 解説ツール
- showcase/telecom-flows/index.html — 通信フロー可視化
- showcase/ai-ecosystem/index.html — AIエコシステム図
