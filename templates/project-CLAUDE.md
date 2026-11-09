# <プロジェクト名> — プロジェクト用 CLAUDE.md

> このファイルを各リポジトリ（ttj.tokyo など）のルートに `CLAUDE.md` としてコピーし、`<...>` を埋めて使う。
> 全プロジェクト共通の決まり（モデル振り分け・APIキー・応答は日本語など）は ~/.claude/CLAUDE.md にあるので、ここには**このプロジェクト固有のこと**だけを書く。

## 1. 概要

- 目的：<このサイト/ツールは何のためか>
- 公開先：<GitHub Pages / Cloudflare Pages / 両方>　URL：<https://...>
- 読み手：<誰が読むか>

## 2. 構成

```
<ディレクトリ構成を数行で>
```

- 公開するもの：<例：index.html, assets/>
- 公開しないもの：<例：drafts/, notes/>

## 3. 作業の決まり

- デザインは TTJ デザインシステム（紺×金）。`tokens.css` の変数を使う（ttj-design スキル）。
- コメント・README・文章は日本語、識別子は英語。
- <このプロジェクト独自のルール。例：実名は伏せる、章構成は変えない、など>

## 4. 担当の振り分け（目安）

| 作業 | エージェント / モデル |
|---|---|
| ファイル探索・一覧化 | scout（haiku） |
| JSON/HTML/リンクのチェック | checker（haiku） |
| 決まった編集・実装 | builder（sonnet） |
| 成果物レビュー | reviewer（opus） |
| 設計・方針決め | architect（opus / fable） |

## 5. 公開手順

1. checker で機械チェック
2. codex-review で第三者レビュー（大きな変更のみ。小さな修正は省略可）
3. 人が確認 → publish スキルで公開
   - GitHub Pages：`git push origin main`
   - Cloudflare Pages：`npx wrangler pages deploy <dir> --project-name <name>`

## 6. 秘密情報

- APIキーは ~/.claude/skills/.env の1か所だけ。このリポジトリに `.env` を置かない・コミットしない。
- `.env` は Claude が直接読まない。必要な処理はスクリプトに読ませる。

## 7. このプロジェクトの注意点・既知の問題

- <ハマりどころ、触ってはいけないファイル、未解決の課題>
