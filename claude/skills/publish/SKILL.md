---
name: publish
description: 作ったサイトやページを GitHub Pages（git push）または Cloudflare Pages（wrangler pages deploy）で公開するときに使う。
---

# publish：公開手順

**公開前は必ず checker → codex-review の順。** push / deploy は取り消しにくいので、実行前に人の確認を取る。

## 手順

1. **対象の確認**：どのリポジトリ/ディレクトリを、どこ（GitHub Pages / Cloudflare Pages / 両方）に出すか。
2. **checker で機械チェック**：JSON/HTML 構文、リンク切れ、`git status`/`git diff` で意図しない変更、秘密情報・実名の混入。NG は直してから進む。
3. **codex-review**：大きな変更は Codex に見せる（codex-review スキル）。小さな修正は省略可だが、省略した旨を報告する。
4. **人の最終確認**：公開する内容と先を要約して見せ、OK をもらう。
5. **公開**：

   - **GitHub Pages**（ttj.tokyo 現行）：
     ```bash
     git add <files> && git commit -m "<日本語の要約>" && git push origin main
     ```
     `git push` は確認が出る。**--force は使わない（ブロックされる）。**
   - **Cloudflare Pages**：
     ```bash
     npx wrangler pages deploy <dir> --project-name <name>
     ```
     CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID は skills/.env の値を環境に渡す（Claude は .env を直接読まない）。push で自動デプロイしている場合は GitHub Actions に任せる（deploy/github-actions/ 参照）。
6. **公開後の確認**：URL を開いて表示・リンク・スマホ幅を確認。キャッシュで古い場合は時間をおく。結果（URL・コミット・確認内容）を報告。

## 決まり

- 当面は GitHub Pages と Cloudflare Pages の併用。DNS の切り替えは人が判断する。
- 失敗したら原因を報告して止まる。force push や設定の勝手な変更で押し切らない。
