# TTJ デザインシステム（紺 × 金）

TTJ のサイト・教材・資料ページで共通に使うデザインの土台です。

| ファイル | 内容 |
|---|---|
| `tokens.css` | 色・余白・角丸・フォント・影の CSS 変数（`--ttj-` 接頭辞） |
| `components.html` | tokens.css を読み込む見本ページ（ボタン・カード・見出し・表・コード） |

## 使い方

1. ページの `<head>` で読み込む。

   ```html
   <link rel="stylesheet" href="tokens.css">
   ```

   1ファイル完結にしたいページ（教材など）では、tokens.css の中身を `<style>` に貼り込む。

2. フォントは Noto Sans JP / Noto Serif JP。Google Fonts などで読み込む（components.html の `<head>` を参照）。未読み込みでも代替フォントで表示される。

3. 色などは**直書きせず変数で指定**する。

   ```css
   .hero { background: var(--ttj-bg-inverse); color: var(--ttj-text-inverse); border-bottom: 4px solid var(--ttj-accent); }
   ```

4. 見本は `components.html` をブラウザで開いて確認する（同じフォルダに tokens.css が必要）。

## 変数の主な一覧

| 種類 | 変数 |
|---|---|
| 紺の階調 | `--ttj-navy-900` 〜 `--ttj-navy-50`（基準は `--ttj-navy-800` = #0B1F3A） |
| 金の階調 | `--ttj-gold-700` 〜 `--ttj-gold-100`（基準は `--ttj-gold-500` = #C9A227） |
| 役割色 | `--ttj-bg` `--ttj-bg-subtle` `--ttj-bg-inverse` `--ttj-text` `--ttj-text-muted` `--ttj-text-inverse` `--ttj-accent` `--ttj-accent-strong` `--ttj-border` `--ttj-success` `--ttj-warning` `--ttj-danger` |
| 余白 | `--ttj-space-1` 〜 `--ttj-space-8` |
| 角丸 | `--ttj-radius-sm` `-md` `-lg` `-pill` |
| フォント | `--ttj-font-sans` `--ttj-font-serif` `--ttj-font-mono` |
| 影 | `--ttj-shadow-sm` `-md` `-lg` `--ttj-shadow-gold` |

## 使い分けの目安

- **金は白背景では文字色に使わない。** 白背景の上で金色の文字が必要なときは `--ttj-accent-strong`（濃い金）を使う。`--ttj-accent` は紺背景の上、または線・面の色として使う。
- 本文は `--ttj-text`、補足は `--ttj-text-muted`。紺背景の上は `--ttj-text-inverse`。
- 四次元手記では、事実=`--ttj-memoir-fact`（生成り）、AI創作=`--ttj-memoir-ai`（琥珀）を使う（memoir-editing スキル参照）。

## 関連

- Claude Code のスキル `ttj-design`（~/.claude/skills/ttj-design/）が、この tokens.css を使ってページを作る手順とチェックリストを持っています。
