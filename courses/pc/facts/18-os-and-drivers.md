/* 第18章 事実確認表（担当 D、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | Windows 11：1 GHz 以上で 2 コア以上の 64 ビット CPU、メモリ 4 GB、ストレージ 64 GB、UEFI とセキュアブート、TPM 2.0、DirectX 12 と WDDM 2.0、9 インチ以上 720p 8 ビットの表示、更新にインターネット | 1 GHz／2 コア／4 GB／64 GB／9 インチ | ページ下部 2026-07-14 | Microsoft『Windows 11 のシステム要件』 | https://learn.microsoft.com/windows/whats-new/windows-11-requirements | ○ | 2026-11-14 | 本文の表、mapping |
| 2 | 仕様値 | Home は最初の設定でインターネットと Microsoft アカウントが要る。CPU の一覧がページからリンクされる | — | 同上 | 同上 | 同上 | ○ | 2026-11-14 | 本文、c18-flow |
| 3 | 安全 | 導入用 USB は 8 GB 以上、できれば空で、中身は消える。先にバックアップ。MediaCreationTool.exe。デジタルライセンスならキー不要 | 8 GB | 2026-09-28 | Microsoft『Windows のインストールメディアの作成』 | https://support.microsoft.com/help/15088 | ○ | 2026-11-14 | 「導入用メディアを作る」 |
| 4 | 仕様値 | 認証は権利をハードウェアと結びつける。デジタルライセンスとプロダクトキー。マザーボードの交換などで外れることがある。エディションは権利と合わせる | — | 2026-10-19 | Microsoft『Windows のライセンス認証』 | https://support.microsoft.com/help/12440 | ○ | 2026-11-14 | 「ライセンスと認証」、用語集 |
| 5 | 仕様値 | エラーコード 28 はドライバが入っていない。対処は、ハードウェアの変更のスキャン、またはメーカーのドライバ | 28 | 2026-09-28 | Microsoft『Error codes in Device Manager』 | https://support.microsoft.com/en-us/windows/hardware/drivers/error-codes-in-device-manager-in-windows | ○ | 2026-11-14 | 「ドライバを確かめる」、quiz 3 |
| 6 | 仕様値 | Ubuntu：ISO は ubuntu.com から。ISO をコピーしても起動用にならない。ディスクを消す警告。バックアップ。起動メニューのキー（F12 など）。更新は Software Updater か apt。BitLocker の警告 | — | Ubuntu 24.04 LTS | Canonical『Install Ubuntu desktop』 | https://ubuntu.com/tutorial/tutorial-install-ubuntu-desktop | ○ | 2026-11-14 | 「導入用メディアを作る」、c18-os |
| 7 | 仕様値 | AMD：チップセットのドライバは AMD の公式の入手先から入れる | — | 2025-06-10 | AMD『Chipset driver installation』 | https://www.amd.com/en/resources/support-articles/faqs/CHIPSET-INSTALL.html | ○ | 2026-11-14 | c18-drivers 1 行目 |
| 8 | 規格 | GPT は UEFI 仕様の第 5 章。UEFI 2.11 | 2.11 | 2024-12 | UEFI Forum | https://uefi.org/specs/UEFI/2.11/05_GUID_Partition_Table_Format.html | ○ | 2026-11-14 | 「導入の途中で」、mapping |
| 9 | 企業 | Microsoft：米国。Canonical：英国（ロンドン）。AMD：米国（第02章の確認表 #14。2026-11-14 の検証で本文に国を追記） | — | — | 各社の公式ページ | — | ○ | 2026-11-14 | note、refs |
確認できず書かなかった：
- Fedora の案内、Task Manager の公式説明、ネットワークドライバが OS に標準で含まれる範囲の公式説明（c18-drivers は一般論と明記）
*/
