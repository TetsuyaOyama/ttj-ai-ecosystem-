#!/usr/bin/env bash
# TTJ AIエコシステム インストーラ（WSL / Linux / macOS）
# claude/ 以下を ~/.claude/ にコピーする。
#  - 既存ファイルは ~/.claude/backup-<日時>/ に退避してから上書きする
#  - settings.json は上書き前に差分を表示して確認する
#  - memory/MEMORY.md と skills/.env は、すでにあれば上書きしない（あなたの記憶・キーを守るため）
#  - hooks/*.py に実行権限を付ける
#  - skills/.env が無ければ .env.example をコピーする
#
# 使い方：  bash install.sh        （-y / --yes で settings.json の確認を省略）

set -u

ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    -y|--yes) ASSUME_YES=1 ;;
    -h|--help)
      sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) echo "不明なオプション: $arg" >&2; exit 1 ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$SCRIPT_DIR/claude"
DEST="${CLAUDE_HOME:-$HOME/.claude}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$DEST/backup-$STAMP"

if [ ! -d "$SRC" ]; then
  echo "エラー: $SRC が見つかりません。リポジトリのルートで実行してください。" >&2
  exit 1
fi
if ! command -v python3 >/dev/null 2>&1; then
  echo "警告: python3 が見つかりません。フックは python3 が必要です（sudo apt install python3）。" >&2
fi

mkdir -p "$DEST"
backed_up=0
copied=0
skipped=0

backup_file() {
  # $1 = 相対パス
  local rel="$1"
  mkdir -p "$BACKUP/$(dirname "$rel")"
  cp -p "$DEST/$rel" "$BACKUP/$rel"
  backed_up=$((backed_up + 1))
}

confirm() {
  # $1 = メッセージ。--yes なら常に Yes。端末が無ければ No。
  [ "$ASSUME_YES" -eq 1 ] && return 0
  local ans=""
  if [ -r /dev/tty ]; then
    printf '%s [y/N]: ' "$1" > /dev/tty
    read -r ans < /dev/tty || ans=""
  else
    echo "$1 -> 端末が無いため No 扱い（-y で自動承認）" >&2
  fi
  case "$ans" in y|Y|yes|YES) return 0 ;; *) return 1 ;; esac
}

echo "インストール元: $SRC"
echo "インストール先: $DEST"
echo

while IFS= read -r -d '' file; do
  rel="${file#"$SRC"/}"
  target="$DEST/$rel"
  mkdir -p "$(dirname "$target")"

  # 新規ファイル
  if [ ! -e "$target" ]; then
    cp -p "$file" "$target"
    copied=$((copied + 1))
    echo "  新規: $rel"
    continue
  fi

  # 同一内容は何もしない
  if cmp -s "$file" "$target"; then
    skipped=$((skipped + 1))
    continue
  fi

  case "$rel" in
    memory/MEMORY.md)
      echo "  維持: $rel （既存の記憶メモを残します）"
      skipped=$((skipped + 1))
      continue ;;
    skills/.env)
      skipped=$((skipped + 1))
      continue ;;
    settings.json)
      echo
      echo "===== settings.json の差分（- 現在 / + 新規）====="
      diff -u "$target" "$file" || true
      echo "================================================="
      if confirm "settings.json を上書きしますか？（現在のものはバックアップします）"; then
        backup_file "$rel"
        cp -p "$file" "$target"
        copied=$((copied + 1))
        echo "  更新: $rel"
      else
        echo "  維持: $rel （上書きしませんでした）"
        skipped=$((skipped + 1))
      fi
      continue ;;
  esac

  backup_file "$rel"
  cp -p "$file" "$target"
  copied=$((copied + 1))
  echo "  更新: $rel （旧版は backup-$STAMP に退避）"
done < <(find "$SRC" -type f ! -name '.env' ! -name '*.pyc' -print0 | sort -z)

# hooks に実行権限
if [ -d "$DEST/hooks" ]; then
  chmod +x "$DEST"/hooks/*.py 2>/dev/null || true
fi

# ログ置き場
mkdir -p "$DEST/logs"

# skills/.env が無ければ .env.example をコピー
if [ ! -f "$DEST/skills/.env" ] && [ -f "$DEST/skills/.env.example" ]; then
  cp "$DEST/skills/.env.example" "$DEST/skills/.env"
  chmod 600 "$DEST/skills/.env"
  echo
  echo "  作成: skills/.env （.env.example のコピー。APIキーを入れてください）"
fi
[ -f "$DEST/skills/.env" ] && chmod 600 "$DEST/skills/.env" 2>/dev/null || true

echo
echo "完了: 新規/更新 ${copied} 件、変更なし/維持 ${skipped} 件、バックアップ ${backed_up} 件"
[ "$backed_up" -gt 0 ] && echo "バックアップ先: $BACKUP"
echo
echo "次にやること:"
echo "  1. $DEST/skills/.env を編集して APIキーを入れる（Claude は読まない決まりなので、あなたが編集）"
echo "  2. Claude Code を再起動して、フックと権限が効いているか確認する"
exit 0
