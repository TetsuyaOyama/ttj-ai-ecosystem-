/* 第17章 事実確認表（担当 D、確認 2026-11-14）
| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 仕様値 | ASUS の Q-LED は、CPU・DRAM・VGA・BOOT の表示灯が点いたままのとき、差し直しと別部品での試験などを案内する | — | 2026-04-07 | ASUS『Q-LED』 | https://www.asus.com/support/faq/1042678/ | ○ | 2026-11-14 | c17-post 1〜4 行目 |
| 2 | 仕様値 | ASUS の Q-Code は 2 桁のコードを示し、CPU の対応リストと UEFI の版が推奨以上かを確かめるよう書く | 2 桁 | 2026 年 11 月 10 日更新と表示 | ASUS『Q-Code』 | https://www.asus.com/global/support/faq/1043948/ | ○ | 2026-11-14 | c17-post 5 行目、c17-settings 1 行目 |
| 3 | 仕様値 | ASUS の Q-LED Core は点滅のパターンで知らせる | — | 2026-06-11 | ASUS『Q-LED Core』 | https://www.asus.com/support/faq/1047023/ | ○ | 2026-11-14 | c17-post 6 行目 |
| 4 | 安全 | ASUS の USB BIOS FlashBack は、更新中は終了した状態で電源につないだままにし、中断しないよう書く（中断すると起動できなくなるおそれ） | — | 2026-04-09 | ASUS『USB BIOS FlashBack』 | https://www.asus.com/support/faq/1038568/ | ○ | 2026-11-14 | 本文の警告、「UEFI の版と更新」 |
| 5 | 仕様値 | MSI のガイドは、デバッグの表示灯を、赤＝CPU、黄＝DRAM、白＝GPU、緑＝起動デバイスと書く（第 37 ページ） | 4 色 | v2.0（2025/05） | MSI『PRO H610M-A DDR4 User Guide』 | https://download-2.msi.com/archive/mnu_exe/mb/PROH610M-ADDR4_English.pdf | ○ | 2026-11-14 | c17-post |
| 6 | 安全 | MSI のガイドは、組み立てが終わる前に起動しないよう書く（第 4 ページ）。JBAT1 のジャンパーで CMOS をクリアする（第 34 ページ）。JFP2 はブザーとスピーカー。設定画面は Delete キー | — | v2.0（2025/05） | 同上 | 同上 | ○ | 2026-11-14 | 「CMOS クリア」、c17-seq、c17-post 注 |
| 7 | 安全 | MSI の更新の記事は、電源を入れたままにし、USB メモリを抜かないよう書く。M-FLASH を使い、更新後に版を確かめる | — | 2025-10-22 | MSI『BIOS の更新』 | https://www.msi.com/support/technical_details/MB_BIOS_Update | ○ | 2026-11-14 | 警告、「UEFI の版と更新」 |
| 8 | 仕様値 | MSI の FAQ は、起動時のメモリの確認が長い製品があり、設定で省ける製品があると書く。掲載された X670 の一部の製品のみ | — | 2024-10-14 | MSI『FAQ 10883』 | https://us.msi.com/faq/10883 | ○ | 2026-11-14 | 「初めての起動で、時間がかかる」 |
| 9 | 規格 | UEFI 仕様の最新は 2.11（2024 年 12 月）、PI 1.10（2026 年 7 月）。Boot Manager は BootOrder の順に起動を試す | 2.11 | 2024-12 | UEFI Forum『UEFI Specification』 | https://uefi.org/specifications | ○ | 2026-11-14 | c17-settings、mapping |
| 10 | 規格 | セキュアブートは、起動用のプログラムとドライバを署名で確かめる仕組み | — | 2.11 | UEFI Forum 同上 第 32 章 | https://uefi.org/specs/UEFI/2.11/32_Secure_Boot_and_Driver_Signing.html | ○ | 2026-11-14 | 「セキュアブートと TPM」 |
| 11 | 規格 | PI 仕様の概要は、メモリの初期化の段階、多くの初期化の段階、起動を管理する段階があると説明する | — | PI 1.8（最新は 1.10、2026-07。本文に併記） | UEFI Forum『PI Specification』 | https://uefi.org/specs/PI/1.8/V2_Overview.html | ○ | 2026-11-14 | c17-seq の後の段落 |
| 12 | 規格 | TPM は、ハードウェアを基にした信頼の起点で、鍵を安全に作って保管する。中心の成果物は TPM 2.0 Library Specification。版の細部は書かない（旧 URL ?p=41996 はトップページに転送されるため、2026-11-14 の検証で個別ページに差し替え） | — | 2026-11-14 に確認 | TCG『Trusted Platform Module (TPM)』 | https://www.trustedcomputinggroup.org/work-groups/tpm | ○ | 2026-11-14 | 「セキュアブートと TPM」 |
| 13 | 安全 | Microsoft の案内は、自作向けの小売のマザーボードの多くで TPM が初期で無効の製品が多いこと、設定名の例（Security Device、TPM State、AMD fTPM switch、Intel PTT）、確認は Windows セキュリティか tpm.msc と書く | — | 2026-02-20 | Microsoft『Enable TPM 2.0 on your PC』 | https://support.microsoft.com/en-us/windows/security/devicesecurity/enable-tpm-2-0-on-your-pc | ○ | 2026-11-14 | 「セキュアブートと TPM」 |
| 14 | 企業 | ASUS：台湾。MSI：台湾。Microsoft：米国。Intel・AMD：米国（第02章の確認表 #14） | — | — | 各社の会社情報 | 各社の公式ページ | ○ | 2026-11-14 | 「公開情報で確認できた範囲」、refs |
確認できず書かなかった：
- CSM の公式の定義、ビープ音の一覧、メモリトレーニングの公式の一般説明（本文は別名の扱いか書かない）
*/
