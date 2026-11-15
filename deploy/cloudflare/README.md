# Cloudflare Pages 導入手順

GitHub Pages（現行の ttj.tokyo）に加えて、Cloudflare Pages へも公開するための手順です。

## 1. プロジェクトを作る

方法A: 手元から（wrangler）

```bash
npx wrangler login
npx wrangler pages project create <プロジェクト名> --production-branch main
npx wrangler pages deploy <公開ディレクトリ> --project-name <プロジェクト名>
```

方法B: ダッシュボードから
Workers & Pages → Create → Pages → 「Direct Upload」でプロジェクト名を決めて作成。
GitHub Actions から配信する場合は、Git連携ではなく Direct Upload のプロジェクトにします。

初回デプロイ後、`https://<プロジェクト名>.pages.dev` で表示を確認します。

## 2. API トークンと Account ID

1. ダッシュボード右上 → My Profile → API Tokens → Create Token → Custom token。
2. 権限: **Account → Cloudflare Pages → Edit**（これだけ）。対象アカウントを限定する。
3. 発行されたトークンを `CLOUDFLARE_API_TOKEN` に、アカウントIDを `CLOUDFLARE_ACCOUNT_ID` に設定する（ダッシュボード右側の Account ID）。
4. ローカルでは `~/.claude/skills/.env` に書く。GitHub Actions では Secrets に登録する。トークンは git に入れない。

## 3. GitHub Actions で自動デプロイ

1. `deploy/github-actions/deploy-cloudflare-pages.yml` を、サイトのリポジトリの `.github/workflows/` にコピーする。
2. リポジトリの Settings → Secrets and variables → Actions に次を登録する。
   - Secrets: `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
   - Variables: `CF_PAGES_PROJECT`（手順1のプロジェクト名）
3. main に push すると、リポジトリ直下（`.`）がデプロイされる。ビルドが必要なサイトは、ymlのコマンドを `pages deploy <出力ディレクトリ>` に変える。

## 4. 独自ドメインの追加

1. プロジェクト → Custom domains → Set up a custom domain でドメインを入力する。
2. ドメインのDNSがCloudflareにある場合は、CNAME が自動で作られる。
3. 他社DNSの場合は、画面の指示どおり `<プロジェクト名>.pages.dev` を指す CNAME を設定する（apexドメインはCloudflareへのネームサーバー移管が必要になることがある）。
4. 証明書の発行が終わるとステータスが Active になる。

## 5. GitHub Pages との併用方針

- 当面は両方で公開する。ttj.tokyo のDNSは今のまま GitHub Pages を向けておく。
- まず `*.pages.dev` で表示・リンク・フォームなどを検証する。
- 問題がなければ、DNSの切り替えは任意で行う（急がない）。切り替えるときは TTL を短くしてから実施し、戻せるよう元の設定を控えておく。
- 同じ内容を二重に更新しないよう、正は GitHub のリポジトリ1つにする。
