#!/usr/bin/env python3
"""Stop フック：応答が終わったら WSL 上で Windows にビープ＋通知を出す。

WSL 以外・powershell.exe が無い・失敗した場合も何もせず exit 0 で終わる。
"""
import shutil
import subprocess
import sys
from pathlib import Path

PS_SCRIPT = r"""
[console]::beep(880,200); [console]::beep(1175,250)
try {
  Add-Type -AssemblyName System.Windows.Forms
  Add-Type -AssemblyName System.Drawing
  $n = New-Object System.Windows.Forms.NotifyIcon
  $n.Icon = [System.Drawing.SystemIcons]::Information
  $n.BalloonTipTitle = 'Claude Code'
  $n.BalloonTipText = '作業が終わりました。確認してください。'
  $n.Visible = $true
  $n.ShowBalloonTip(5000)
  Start-Sleep -Seconds 6
  $n.Dispose()
} catch {}
"""


def is_wsl():
    try:
        return "microsoft" in Path("/proc/version").read_text().lower()
    except Exception:
        return False


def main():
    try:
        sys.stdin.read()
    except Exception:
        pass
    if not is_wsl():
        return
    ps = shutil.which("powershell.exe")
    if not ps:
        return
    # 通知の表示を待たずに切り離して起動する
    subprocess.Popen(
        [ps, "-NoProfile", "-NonInteractive", "-Command", PS_SCRIPT],
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
    )


if __name__ == "__main__":
    try:
        main()
    except SystemExit:
        raise
    except Exception:
        sys.exit(0)
