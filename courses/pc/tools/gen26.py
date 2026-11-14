#!/usr/bin/env python3 -I
# 第26章のデータとHTMLを生成する（各章の参照資料を集め直すため、何度でも実行できる）
import json, re, glob, html, os, sys
ROOT = '/home/claude/courses/pc'
J = lambda o: json.dumps(o, ensure_ascii=False, indent=2)

# ---------- 1. 各章の「参照資料」を集める ----------
TYPE_MAP = {'規格': '規格・仕様', 'OS の提供元の資料': 'メーカーの資料', '規格団体の資料': '団体の資料'}
SIX = ['規格・仕様', '団体の資料', 'メーカーの資料', '当局・公的機関', '教科書・一般知識・他講座', '架空（見本のため）']

# 第26章自身が使った資料（種類, 資料名, 発行者, 時点, 使い方, URL）
OWN = [
 ('団体の資料', 'About USB-IF', 'USB-IF（USB Implementers Forum, Inc.）', '日付の記載なし。2026 年 11 月に確認', '団体の正式名と、非営利の団体であること。', 'https://usb.org/about'),
 ('団体の資料', 'DisplayPort の FAQ（displayport.org）', 'VESA', '日付の記載なし。2026 年 11 月に確認', '団体の正式名と、DisplayPort を管理していること。', 'https://displayport.org/faq/'),
 ('団体の資料', 'HDMI Forum FAQ', 'HDMI Forum, Inc.', '日付の記載なし。2026 年 11 月に確認', 'HDMI Forum と HDMI Licensing Administrator の役割の違い。', 'https://hdmiforum.org/about/faq'),
 ('団体の資料', 'About SATA-IO', 'SATA-IO（Serial ATA International Organization）', '日付の記載なし。2026 年 11 月に確認', '団体の正式名と、仕様を保守する団体であること。', 'https://sata-io.org/node/99'),
 ('団体の資料', 'Wi-Fi Alliance の紹介ページ', 'Wi-Fi Alliance', '日付の記載なし。2026 年 11 月に確認', '非営利の団体で、製品を認証していること。', 'https://www.wi-fi.org/node/32321'),
 ('団体の資料', 'Who we are', 'Bluetooth SIG', '日付の記載なし。2026 年 11 月に確認', '団体の名前と、標準の開発と認定を行うこと。', 'https://www.bluetooth.com/about-us/who-we-are/'),
 ('団体の資料', 'Unified Extensible Firmware Interface Forum のお知らせ（About 欄）', 'UEFI Forum', '日付の記載なし。2026 年 11 月に確認', '団体の正式名と、非営利の標準化団体であること。', 'https://uefi.org/node/4114'),
 ('団体の資料', 'Membership/General Information（NVM Express のよくある質問のアーカイブ）', 'NVM Express', '2020 年 4 月 15 日（ページの日付）。2026 年 11 月に確認', '法人化された非営利の業界団体であること。法人の形を含む正式名は、ページに書かれていない。', 'https://archive.nvmexpress.org/faq_category/membership'),
 ('団体の資料', 'About JEDEC', 'JEDEC', '日付の記載なし。2026 年 11 月に確認', '団体の役割（標準づくり）。ページには長い正式名の記載がない。', 'https://www.jedec.org/about-jedec'),
 ('団体の資料', 'JEDEC Website Terms and Conditions of Use', 'JEDEC', '日付の記載なし。2026 年 11 月に確認', '正式名（JEDEC Solid State Technology Association）。jedec.org のサブドメインのページ。', 'https://secondrise.jedec.org/termsofuse'),
 ('団体の資料', 'About TCG（Trusted Computing Group の紹介ページ）', 'Trusted Computing Group', '日付の記載なし。2026 年 11 月に確認', '団体の正式名と、開かれた世界の業界標準を作る非営利の組織であること。TPM をハードウェアを土台にした安全のモジュールと説明していること。', 'https://trustedcomputinggroup.org/about/'),
 ('団体の資料', 'PCI-SIG Introduces “PCI Express” (Formerly 3GIO) High-Speed Serial Interconnect Specification（Microsoft のニュースサイトに掲載）', 'PCI-SIG と Arapahoe Work Group の共同発表', '2002 年 4 月 17 日', '名前の展開（PCI Special Interest Group）と、PCI の規格を管理する業界団体であること（末尾の団体紹介）。PCI-SIG 自身のページは取得できなかった。', 'https://news.microsoft.com/source/2002/04/17/pci-sig-introduces-pci-express-tm-formerly-3gio-high-speed-serial-interconnect-specification/'),
 ('当局・公的機関', 'SP 800-88 Rev. 2 Guidelines for Media Sanitization（CSRC のページ）', 'NIST（米国）', '2025 年 9 月 26 日（第 24 章で確認）', '発行者の正式名。', 'https://csrc.nist.gov/pubs/sp/800/88/r2/final'),
 ('当局・公的機関', 'Back Up Business Data', 'CISA（米国）', 'ページに公表日の記載なし（第 24 章で確認）', '発行者の正式名。', 'https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data'),
 ('当局・公的機関', '製品安全情報マガジン Vol.442', '製品評価技術基盤機構（NITE）', '2023 年 12 月 12 日（第 23 章で確認）', '機関の正式名（日本語と英語の表記）。', 'https://www.nite.go.jp/jiko/chuikanki/mailmagazin/2023fy/vol442_231212.html'),
 ('当局・公的機関', 'ランサムウェア被害から学ぶ教訓集', '情報処理推進機構（IPA）', '表紙は Ver.1.2、2026 年 9 月 8 日発行。更新履歴の最新は 2026 年 10 月 16 日（誤植修正）', '機関の日本語の正式名。英語名は文書に記載がない。', 'https://www.ipa.go.jp/security/todokede/rcu1hd000001ee1f-att/20260910.pdf'),
 ('教科書・一般知識・他講座', '第01〜25章の「参照資料」と事実確認表', 'この講座', '各章に記載', '団体・当局の名前、版、時点を再利用。③の一覧は、これらの表から集めた。', None),
]

def collect():
    rows = []
    for f in sorted(glob.glob(ROOT + '/chapters/*.html')):
        n = int(os.path.basename(f)[:2])
        if n == 26: continue
        t = open(f, encoding='utf8').read()
        m = re.search(r'<section class="refs">(.*?)</section>', t, re.S)
        if not m: continue
        body = re.search(r'<tbody>(.*?)</tbody>', m.group(1), re.S).group(1)
        for tr in re.findall(r'<tr>(.*?)</tr>', body, re.S):
            c = [html.unescape(re.sub(r'<[^>]+>', '', x)).strip() for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.S)]
            if len(c) < 4: continue
            typ = TYPE_MAP.get(c[0], c[0])
            rows.append((n, typ, c[1], c[2], c[3]))
    return rows

def chlabel(chs):
    chs = sorted(set(chs))
    return '第' + '・'.join('%02d' % c for c in chs) + '章'

def build_refs(rows):
    merged = {}
    order = []
    fict = []
    for n, typ, title, pub, when in rows:
        if typ not in SIX:
            print('未知の種類', n, typ, file=sys.stderr); continue
        if title.startswith('他の章') or title.startswith('第0') or '姉妹講座' in pub:
            continue
        if typ.startswith('架空'):
            fict.append(n); continue
        key = (re.sub(r'\s+', ' ', title), pub.split('（')[0].strip())
        if key not in merged:
            merged[key] = [typ, title, pub, when, []]
            order.append(key)
        merged[key][4].append(n)
    out = []
    for k in order:
        typ, title, pub, when, chs = merged[k]
        out.append([typ, title, pub, when, chlabel(chs)])
    for typ, title, pub, when, use, url in OWN:
        out.append([typ, title, pub, when, '第26章'])
    if fict:
        out.append(['架空（見本のため）', '演習の人物・型番・数値・購入の形・ケース（各章の「架空」の行）', 'この講座', '—', chlabel(fict)])
    rank = {t: i for i, t in enumerate(SIX)}
    out.sort(key=lambda r: rank[r[0]])
    return out, sorted(set(fict))

# ---------- 2. 地図（arch） ----------
def mkview(key, label, hint, rows, wf=170, wo=250, ws=330):
    nodes, links = [], []
    y = 14
    for i, (fld, org, spec, chs) in enumerate(rows):
        pre = '%s%d' % (key, i)
        nodes.append({'id': pre + 'f', 'label': fld[0], 'sub': fld[1], 'kind': 'core', 'x': 10, 'y': y, 'w': wf, 'h': 56, 'desc': fld[2], 'role': '分野', 'ch': chs})
        nodes.append({'id': pre + 'o', 'label': org[0], 'sub': org[1], 'kind': 'ext', 'x': 10 + wf + 40, 'y': y, 'w': wo, 'h': 56, 'desc': org[2], 'role': '規格・資料を出す団体・機関', 'ch': chs})
        nodes.append({'id': pre + 's', 'label': spec[0], 'sub': spec[1], 'kind': 'pol', 'x': 10 + wf + 40 + wo + 40, 'y': y, 'w': ws, 'h': 56, 'desc': spec[2], 'role': '載っている規格・資料', 'ch': chs})
        links.append({'id': pre + 'a', 'a': pre + 'f', 'b': pre + 'o', 'label': '担う', 'plane': 'lg', 'desc': '分野と、規格・資料を出す団体・機関の対応。', 'ch': chs})
        links.append({'id': pre + 'b', 'a': pre + 'o', 'b': pre + 's', 'label': '載る', 'plane': 'lg', 'desc': '団体・機関が公開している規格・資料の例。', 'ch': chs})
        y += 70
    W = 10 + wf + 40 + wo + 40 + ws + 10
    return {'key': key, 'label': label, 'hint': hint, 'viewBox': [W, y + 4], 'nodes': nodes, 'links': links}

HINT = '分野 → 団体・機関 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。線はすべて参照の関係で、点線です。版や窓口は、発行者の公式ページで確かめます。'

V1 = [
 (('基板の形と寸法', 'ATX など', 'マザーボードの大きさ・穴の位置・拡張スロットの数などを決める分野。', ),
  ('Intel', '米国', 'ATX の規格文書の発行者として、第03章で使った。', ),
  ('ATX Specification', '基板の形と寸法', '第03章で、基板の寸法と拡張スロットの数を、Intel の購入ガイドの値で確かめた。規格文書の版は確認できていないので、発行者のページで確かめる。'), [3]),
 (('拡張スロット', 'PCIe', '拡張カードやストレージをつなぐ高速の接続の分野。'),
  ('PCI-SIG', 'PCI の規格を管理', 'PCIe の規格を作り、管理する業界団体。'),
  ('PCIe の規格', '後方互換の考え方', '第03章で、PCI-SIG の発表に書かれた後方互換の考え方を使った。'), [3]),
 (('メモリ', 'DDR5 など', 'メモリの世代・形・標準の速度の分野。'),
  ('JEDEC', '半導体の標準', 'メモリなどの標準を、企業が集まって作る団体。'),
  ('DDR5 の標準・CAMM2 の標準', 'メモリと、その形', '第04章で、JEDEC の DDR5 と CAMM2 の標準のページを使った。'), [4, 20]),
 (('ストレージの接続', 'SATA', 'ストレージを SATA でつなぐ分野。'),
  ('SATA-IO', 'Serial ATA International Organization', 'SATA の仕様を保守し、次の機能を開発する非営利の団体。'),
  ('SATA の仕様', '接続の規格', '第05章で扱う。団体の公式ページに、仕様を保守すると書かれている。'), [5]),
 (('ストレージの接続', 'NVMe', 'ストレージを NVMe でつなぐ分野。'),
  ('NVM Express', '法人化された非営利の団体', 'NVMe の仕様を作る業界団体。'),
  ('NVMe の仕様と健康情報', '警告・使用の割合など', '第21章で、NVM Express の資料にある健康情報の項目を使った。'), [5, 21]),
 (('電源ユニットの設計', 'ATX 電源', '電源ユニットの電気と寸法の設計の分野。'),
  ('Intel', '米国', '電源の設計ガイドの発行者。'),
  ('ATX 電源の設計ガイド', 'Multi Rail の版', '第07章で、公開ページの版と日付を確かめた。'), [7]),
 (('電源の効率の認証', '80 PLUS', '電源ユニットの変換効率を、決めた条件で試験して等級を付ける制度の分野。'),
  ('CLEAResult', '80 PLUS の運営元', '80 PLUS の運営元（団体の FAQ の記述）。本社の国は確認できていない。'),
  ('80 PLUS の等級と試験', '7 つの等級', '第07章で、プログラムの詳細ページを使った。'), [7]),
 (('電源の効率と騒音の認証', 'ETA と LAMBDA', '効率に加えて、力率や騒音も評価する制度の分野。'),
  ('Cybenetics', 'キプロス', '電源と冷却製品の性能の認証を運営する企業（会社の表示）。'),
  ('ETA 認証と LAMBDA 認証', '効率と騒音', '第07章で、認証の文書の版と日付を確かめた。'), [7]),
 (('騒音の測定', '騒音の測り方', 'PC の音の大きさを、同じ条件で比べるための分野。'),
  ('ISO', '国際標準化機構', '国際規格の発行団体（International Organization for Standardization）。'),
  ('ISO 7779', '機器の騒音の測定', '第19章で、音の指標の考え方に使った。'), [19]),
 (('静電気の管理', '作業の場所', '電子部品を扱う場所の静電気を管理する分野。'),
  ('IEC', '国際電気標準会議', '国際規格の発行団体（International Electrotechnical Commission）。'),
  ('IEC 61340-5-1', '静電気の管理', '第14章で、規格の位置づけだけを確かめた。本文は有料で、家庭の作業の手順書ではない。'), [14]),
]
V2 = [
 (('USB', 'USB-C など', 'USB の規格・コネクタ・給電の分野。'),
  ('USB-IF', 'USB Implementers Forum, Inc.', 'USB の規格を作った企業が作った非営利の団体。互換性のある製品の普及を進める。'),
  ('USB の仕様', '名前の付け方の指針も', '第09章で扱う。版は、第09章と団体のページで確かめる。'), [9]),
 (('映像出力', 'DisplayPort', 'PC とディスプレイをつなぐ映像の規格の分野。'),
  ('VESA', 'Video Electronics Standards Association', 'DisplayPort を管理する業界団体。'),
  ('DisplayPort の規格', '映像の接続', '第09章で扱う。'), [9]),
 (('映像出力', 'HDMI', 'PC とテレビなどをつなぐ映像の規格の分野。'),
  ('HDMI Forum と HDMI LA', '仕様と使用許諾', 'HDMI Forum は仕様の次の版づくりに業界の参加を広げる団体。HDMI Licensing Administrator は、使用許諾と商標を扱う。'),
  ('HDMI の仕様', '映像の接続', '第09章で扱う。HDMI の版は、団体の公式ページで確かめる。'), [9]),
 (('無線 LAN', 'Wi-Fi', '無線でネットワークにつなぐ分野。'),
  ('Wi-Fi Alliance', '非営利の団体', 'Wi-Fi 製品を認証する国際的な団体。'),
  ('Wi-Fi の世代名と認証', '製品の認証', '第09章で、IEEE の規格番号と組で扱う。'), [9]),
 (('近距離の無線', 'Bluetooth', 'ヘッドセットなどを無線でつなぐ分野。'),
  ('Bluetooth SIG', 'Bluetooth Special Interest Group', 'Bluetooth の標準を作り、認定のしくみを運営する団体。'),
  ('Bluetooth の標準と認定', '製品の認定', '第09章で扱う。'), [9]),
 (('通信の規格の番号', 'IEEE', '有線・無線の規格の番号の分野。'),
  ('IEEE', 'Institute of Electrical and Electronics Engineers', '電気・電子の技術者の団体。規格の発行者の 1 つ。'),
  ('IEEE の規格の番号', '発行者と組で覚える', '番号の体系は発行者ごとに別。第09章で、Wi-Fi の世代名と組で扱う。'), [9]),
 (('起動の仕様', 'UEFI', 'マザーボードのファームウェアと OS の間の約束の分野。'),
  ('UEFI Forum', '非営利の標準化団体', 'UEFI の仕様を作る団体。'),
  ('UEFI 仕様・PI 仕様', 'ブート・パーティションなど', '第17・18章で、UEFI の版と、GPT の位置づけを確かめた。'), [17, 18]),
 (('鍵の保管', 'TPM', '暗号の鍵を安全に保管する、ハードウェアを土台にした仕組みの分野。'),
  ('TCG', 'Trusted Computing Group', 'ハードウェアを土台にした安全の仕様を作る、非営利の団体。開かれた世界の業界標準を作る。'),
  ('Trusted Platform Module', '仕様の位置づけ', '第17章で、TPM の位置づけだけを使った。版の番号は書いていない。'), [17]),
]
V3 = [
 (('中古品の売買', '制度の入口', '中古品の売買に関わる法令の分野。'),
  ('警察庁', '古物営業の制度', '古物営業の許可・届出の制度の概要を示す資料の発行者。'),
  ('古物営業の現状と課題', '古物商の許可など', '第13章で、制度の概要だけを確かめた。個別の取引は判断していない。'), [13]),
 (('法令の本文', '条文の入手先', '法令の条文を確かめる分野。'),
  ('e-Gov 法令検索', 'デジタル庁', '法令の本文を公開するサイト。'),
  ('古物営業法', '第一条・第二条', '第13章で、目的と定義の条文を確かめた。'), [13]),
 (('個人間の売買の相談', '消費者ホットライン', '個人間の売買や契約のトラブルを相談する分野。'),
  ('国民生活センター', '消費生活の相談', 'フリマサービスのトラブルの注意と、相談の窓口を公開している。'),
  ('フリマサービスの注意', '消費者ホットライン 188', '第13章で使った。第23章では、ボタン電池の誤飲の注意にも使った。'), [13, 23]),
 (('手放すとき', 'リサイクル', 'PC を手放すときの制度の分野。'),
  ('経済産業省', 'パソコンのリサイクル', '使用済みパソコンの回収と再資源化の制度を説明している。'),
  ('パソコンのリサイクル', '資源有効利用促進法', '第13章で、自作 PC の扱いも含めて確かめた。'), [13]),
 (('製品の事故の注意', 'スプレー缶', 'スプレー缶などの事故を防ぐ分野。'),
  ('消費者庁', 'スプレー缶の注意', 'スプレー缶の使い方の注意喚起を公開している。'),
  ('スプレー缶の注意喚起', 'エアダスターの前提', '第23章で、スプレー缶一般の注意として使った。エアダスターそのものの資料は確認できていない。'), [23]),
 (('製品の事故の注意', '可燃性ガス', '製品の事故の情報を扱う分野。'),
  ('NITE', '製品評価技術基盤機構', '製品の事故の情報や注意喚起を公開している機関。'),
  ('製品安全情報マガジン', '可燃性ガスのスプレー', '第23章で、可燃性ガスを含むスプレーの注意に使った。'), [23]),
 (('情報セキュリティ', 'ランサムウェア', '身代金要求型の攻撃への備えの分野。'),
  ('情報処理推進機構', 'IPA', '情報セキュリティの資料を公開している日本の機関。'),
  ('ランサムウェア被害から学ぶ教訓集', 'バックアップの考え方', '第24章で、バックアップを切り離す考え方などに使った。経営者向けの文書。'), [24]),
 (('バックアップ', '3-2-1', '複製の持ち方の分野。'),
  ('CISA', '米国', '米国の政府機関。小規模事業者向けの案内を公開している。'),
  ('Back Up Business Data', '3-2-1 の考え方', '第24章で使った。ページに公表日の記載はない。'), [24]),
 (('データの消去', '媒体の処分', '手放すときのデータの消去の分野。'),
  ('NIST', '米国', '米国の政府機関。'),
  ('SP 800-88 Rev. 2', 'Media Sanitization', '第24章で、消去の考え方を確かめた。公開直前に再確認する資料。'), [24]),
 (('部品・OS の資料', '種類', '部品メーカーと OS の提供元が出す資料の分野。'),
  ('部品メーカー・OS の提供元', '各社', '仕様・手順・対応・保証を、それぞれの資料に書いている。'),
  ('仕様ページ・マニュアル・サポート記事・保証規定', '資料の種類', '第03・11・13・18章などで使った。CPU サポートリストの意味は第03章、保証規定は第13章。'), [3, 11, 13, 18]),
]

def build_map():
    return {
        'title': '規格・団体と公的資料の地図：分野 → 団体・機関 → 規格・資料',
        'kinds': {'core': '分野', 'ext': '団体・機関', 'pol': '規格・資料の例'},
        'initial': 's0f',
        'views': [
            mkview('s', '部品の規格と認証', HINT, V1),
            mkview('t', '接続・無線・起動', HINT, V2),
            mkview('p', '公的資料と制度', HINT, V3),
        ],
    }

def unwrap(rows):
    out = []
    for r in rows:
        f, o, s, chs = r
        out.append((f, o, s, chs))
    return out

# ---------- 3. 用語集・総合テスト ----------
GLOSS = [
 {'t': 'PCI-SIG', 'en': 'PCI Special Interest Group', 'd': 'PCI の規格を作り、管理する業界団体。この講座では、PCIe（拡張スロットの規格）の発行者として出てくる。', 'ch': [26, 3]},
 {'t': 'USB-IF', 'en': 'USB Implementers Forum, Inc.', 'd': 'USB の規格を作った企業のグループが設立した、非営利の団体。USB の普及を進め、適合試験を通った製品を広める。', 'ch': [26, 9]},
 {'t': 'VESA', 'en': 'Video Electronics Standards Association', 'd': '映像の規格を扱う業界団体。DisplayPort を管理している。', 'ch': [26, 9]},
 {'t': 'JEDEC', 'en': 'JEDEC Solid State Technology Association', 'd': 'メモリなどの半導体の標準を、メーカーや供給企業が集まって作る団体。DDR5 などの標準を公表している。', 'ch': [26, 4, 20]},
 {'t': 'UEFI Forum', 'en': 'Unified Extensible Firmware Interface Forum', 'd': 'UEFI の仕様を作る、非営利の標準化団体。起動のしくみを標準にして、起動を単純で安全にすることを目指す。', 'ch': [26, 17, 18]},
 {'t': 'SATA-IO', 'en': 'Serial ATA International Organization', 'd': '独立した非営利の団体。SATA の仕様を保守し、次の機能を開発する。', 'ch': [26, 5]},
 {'t': 'NVM Express', 'd': 'NVMe の仕様を作る、法人化された非営利の業界団体。企業が理事を務め、技術の作業を分担する。「NVM Express」は団体の名前で、仕様の名前の NVMe とは別。', 'ch': [26, 5, 21]},
 {'t': 'TCG', 'en': 'Trusted Computing Group', 'd': 'TPM など、ハードウェアを土台にした安全の仕様を作る、非営利の団体。開かれた世界の業界標準を作る。', 'ch': [26, 17]},
 {'t': 'Wi-Fi Alliance', 'd': 'Wi-Fi 製品を認証する、非営利の国際的な団体。世代の名前と認証の制度を持つ。', 'ch': [26, 9]},
 {'t': 'Bluetooth SIG', 'en': 'Bluetooth Special Interest Group', 'd': 'Bluetooth の標準を作る国際的な団体。製品が標準に合うかを確かめる、認定のしくみも運営する。', 'ch': [26, 9]},
 {'t': 'IEEE', 'en': 'Institute of Electrical and Electronics Engineers', 'd': '電気・電子の技術者の団体。規格の発行者の 1 つで、規格の番号は発行者ごとに別の体系になっている。番号は、発行者と組で覚える。', 'ch': [26, 9]},
 {'t': 'HDMI の管理団体', 'en': 'HDMI Forum, Inc. / HDMI Licensing Administrator, Inc.', 'alias': 'HDMI Forum, HDMI LA', 'd': 'HDMI に関わる 2 つの団体。HDMI Forum は、仕様の次の版づくりに、業界の参加を広げる非営利の団体。HDMI Licensing Administrator は、使用許諾と商標を扱う。', 'ch': [26, 9]},
 {'t': '製品評価技術基盤機構', 'en': 'National Institute of Technology and Evaluation', 'alias': 'NITE', 'd': '日本の独立行政法人。製品の事故の情報や注意喚起を公開している。この講座では、可燃性ガスを含むスプレーの注意（第23章）で使う。', 'ch': [26, 23]},
 {'t': '情報処理推進機構', 'alias': 'IPA', 'd': '日本の独立行政法人。情報セキュリティの資料を公開している。この講座では、ランサムウェア対策の資料（第24章）で使う。', 'ch': [26, 24]},
 {'t': 'NIST', 'en': 'National Institute of Standards and Technology', 'd': '米国の政府機関。この講座では、媒体のデータの消去の指針（SP 800-88）の発行者として出てくる。', 'ch': [26, 24]},
 {'t': 'CISA', 'en': 'Cybersecurity & Infrastructure Security Agency', 'd': '米国の政府機関で、国土安全保障省の下にある。この講座では、バックアップの 3-2-1 の考え方を示す資料の発行者として出てくる。', 'ch': [26, 24]},
]

EXAM = [
 {'part': 3, 'q': '組み立てた PC の電源を入れても、何も起こらず、画面も出ません。最初の動き方として、最も適切なものはどれですか。',
  'c': ['電源を切り、電源ケーブルを抜いてから、電源の配線・フロントパネルの配線・部品の取り付けを、マニュアルと見比べて確かめる',
        '電源ユニットを分解して、中の部品を調べる',
        '通電したまま、ケーブルを抜き差しして、反応を見る',
        'すぐに OS を入れ直す'],
  'a': 0, 'why': '正答は「電源を切り、電源ケーブルを抜いてから、配線と取り付けをマニュアルと見比べて確かめる」です。通電したままの抜き差しは部品を壊すおそれがあり、電源ユニットの分解は危険です。画面が出ない段階では、OS は原因ではありません。', 'ch': 26},
 {'part': 4, 'q': '調整のあとに、PC が不安定になりました。最初の動き方として、最も適切なものはどれですか。',
  'c': ['安定するまで、設定を同時にいくつも変えて試す',
        '必要なデータのバックアップを先に取り、変えた設定を 1 つずつ元に戻して、症状と変更を記録しながら切り分ける',
        '不安定になった原因は、必ず部品の故障なので、すぐに買い替える',
        'メーカーの保証が切れるので、何もせずに使い続ける'],
  'a': 1, 'why': '正答は「バックアップを先に取り、設定を 1 つずつ元に戻して、症状と変更を記録しながら切り分ける」です。同時に複数を変えると、原因が分かりません。故障と決めつけず、保証の扱いは第13・20章で確かめます。', 'ch': 26},
]

# ---------- 4. 出力 ----------
def write_data():
    rows = collect()
    refs, fict = build_refs(rows)
    mp = build_map()
    head = open('/home/claude/courses/pc/tools/26-facts.txt', encoding='utf8').read()
    s = head + '\n'
    s += "CN.add('arch', 'c26-map', %s);\n\n" % J(mp)
    s += "CN.add('table', 'c26-refs', %s);\n\n" % J({
        'title': '参照資料の一覧：各章の「参照資料」を 1 つにまとめたもの',
        'caption': '種類で絞って探せます。資料へのリンクと版・時点の確認は、各章の「参照資料」と発行者の公式ページで行います（一覧は 2026 年 11 月 14 日時点。第26章の分を含みます）',
        'cols': ['種類', '資料名', '発行者', '版・時点', '関連章'],
        'filter': 0,
        'rows': refs,
    })
    s += 'CN.glossary(%s);\n\n' % J(GLOSS)
    s += 'CN.exam(%s);\n' % J(EXAM)
    open(ROOT + '/data/26-appendix.js', 'w', encoding='utf8').write(s)
    print('refs', len(refs), 'fict chapters', fict)
    return refs

def ownrefs_html():
    out = []
    for typ, title, pub, when, use, url in OWN:
        t = '<a href="%s">%s</a>' % (url, html.escape(title)) if url else html.escape(title)
        out.append('      <tr><td>%s</td><th scope="row">%s</th><td>%s</td><td>%s</td><td>%s</td></tr>' % (typ, t, html.escape(pub), html.escape(when), html.escape(use)))
    return '\n'.join(out)

if __name__ == '__main__':
    write_data()
    open('/tmp/pc-final/pc-26-ownrefs.html', 'w', encoding='utf8').write(ownrefs_html())
