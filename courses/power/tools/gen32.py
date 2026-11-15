#!/usr/bin/env python3
"""第32章（付録）のデータと事実確認表を生成する。後から章が増えた・直ったときは、もう一度実行して再集計する。
  python3 -I /home/claude/courses/power/tools/gen32.py
出力: data/32-appendix.js（c32-map・c32-refs・団体の用語・横断の総合テスト 2 問）、facts/32-appendix.md、/tmp/power-tally32.txt（集計の報告）
入力: chapters/*.html の「参照資料」の表、data/*.js（tools/tally.js で集計）
"""
import glob, json, os, re, subprocess, sys
from pathlib import Path

ROOT = Path('/home/claude/courses/power')
TODAY = '2026-11-15'

# ---------------------------------------------------------------- 団体・機関（正式名は各章の確認表か公式ページで確認したもの）
# key: 内部名 / t: 用語集の見出し / en: 英語名 / view: v1..v4 / field: 分野 / d: 用語集の説明（数字なし） / ch: 関連章
# res: (資料名, 関連章, 説明)。src: (出典名, URL, 確認の書き方) / rn: 社名変更の欄
ORGS = [
 dict(k='anre', t='資源エネルギー庁', en='Agency for Natural Resources and Energy', view='v1', field='系統と市場', ch=[1, 3, 4, 28],
      d='経済産業省の外局で、エネルギー政策を所管する官庁。この講座では、電力システム改革の資料、電源投資の資料、環境影響評価の手引などの発行者として出てくる。',
      res=('電力システム改革の推進（エネルギー白書）', [1], 'エネルギー白書の電力システム改革の節。電力の自由化と各事業者の役割の説明に使った。'),
      src=('資源エネルギー庁『第3部 第6章 第1節 電力システム改革の推進』', 'https://www.enecho.meti.go.jp/about/whitepaper/2023/html/3-6-1.html', '第01章の事実確認表 #2'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='occto', t='電力広域的運営推進機関', en='Organization for Cross-regional Coordination of Transmission Operators', view='v1', field='系統と市場', ch=[2, 4, 22, 31], skipgl=True,
      d='', res=('発電設備等に関する系統アクセスの流れ', [22, 31], '系統連系の手続きの段階。容量市場・長期脱炭素電源オークションの約定結果（第04章）も発行する。'),
      src=('OCCTO『発電設備等に関する系統アクセスの流れ』', 'https://www.occto.or.jp/assets/access_nagare_20260724.pdf', '第22章の事実確認表 #1'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='jepx', t='日本卸電力取引所', en='Japan Electric Power Exchange', view='v1', field='系統と市場', ch=[4], skipgl=True,
      d='', res=('取引概要・沿革', [4], '卸電力市場の種類と約定方式、開始の年月日。'),
      src=('日本卸電力取引所『沿革』', 'https://www.jepx.jp/company/history/', '第04章の事実確認表 #5'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='tdgc', t='送配電網協議会', en='', view='v1', field='系統と市場', ch=[1, 2, 4],
      d='一般送配電事業者などが会員となる一般社団法人。この講座では、需給調整市場の取引規程や、会員の一覧の資料の発行者として出てくる。',
      res=('取引規程（需給調整市場）・組織概要', [1, 4], '需給調整市場の運営者と、一般送配電事業者の会員の確認。'),
      src=('送配電網協議会『組織概要』', 'https://www.tdgc.jp/about/organization.html', '第01章の事実確認表 #4'), rn='なし（確認した資料に変更の記載なし。英語名は確かめていない）'),
 dict(k='egc', t='電力・ガス取引監視等委員会', en='Electricity and Gas Market Surveillance Commission', view='v1', field='系統と市場', ch=[32],
      d='経済産業省に置かれた、電力・ガス・熱供給の市場を監視する委員会。この講座の本文では、この委員会の資料を使っていない。',
      res=None,
      src=('電力・ガス取引監視等委員会『About EGC』', 'https://www.emsc.meti.go.jp/english/committee/', '公式ページで確認（2026-11-15）'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='ferc', t='FERC', en='Federal Energy Regulatory Commission', view='v1', field='系統と市場', ch=[1],
      d='米国の連邦エネルギー規制委員会。この講座では、米国の卸電力市場を運営する地域送電機関と独立系統運用者の説明の出典として出てくる。',
      res=('Wholesale Electricity Markets: Overview and Guide', [1], '米国の卸電力市場の概要。名前と役割だけを使った。'),
      src=('FERC『Wholesale Electricity Markets: Overview and Guide』', 'https://www.ferc.gov/wholesale-electricity-markets-overview-and-guide', '第01章の事実確認表 #11'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='entsoe', t='ENTSO-E', en='European Network of Transmission System Operators for Electricity', view='v1', field='系統と市場', ch=[1, 22],
      d='欧州の送電系統運用者が加盟する団体。この講座では、欧州の系統運用の枠組みの説明の出典として出てくる。',
      res=('About ENTSO-E', [1, 22], '欧州の送電系統運用者の団体の概要。名前と役割だけを使った。'),
      src=('ENTSO-E『About ENTSO-E』', 'https://www.entsoe.eu/about/', '第01章の事実確認表 #12'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='eia', t='米国エネルギー情報局', en='U.S. Energy Information Administration', view='v1', field='系統と市場', ch=[3, 21],
      d='米国のエネルギーの統計と分析を公表する政府機関（略称 EIA）。この講座では、米国の発電の割合などの統計の出典として出てくる。',
      res=('Electricity in the United States', [3], '米国の電力の説明と統計。条件つきで使った。'),
      src=('米国エネルギー情報局（EIA）『Electricity in the United States』', 'https://eia.gov/energyexplained/electricity/electricity-in-the-us.php', '第03章の事実確認表 #3'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='jogmec', t='エネルギー・金属鉱物資源機構', en='Japan Organization for Metals and Energy Security', alias='JOGMEC', view='v1', field='燃料', ch=[5],
      d='エネルギーと金属鉱物の資源の確保を担う独立行政法人（略称 JOGMEC）。旧称は石油天然ガス・金属鉱物資源機構で、法改正に伴い名称を変更した。この講座では、LNG の契約の用語の確認先として挙げる。',
      res=None,
      src=('JOGMEC『Act on Japan Organization for Metals and Energy Security』（検索結果の見出し）', 'https://www.jogmec.go.jp/content/300798877.pdf', '個別ページは自動取得が拒否され、検索結果の見出しで確認'), rn='あり（法改正に伴い、石油天然ガス・金属鉱物資源機構から変更。2022 年の発表。変更の日は確かめられず）'),
 dict(k='igu', t='国際ガス連盟', en='International Gas Union', alias='IGU', view='v1', field='燃料', ch=[5],
      d='天然ガスに関わる国際団体（略称 IGU）。この講座では、世界の LNG の貿易量の年次報告の発行者として出てくる。',
      res=('World LNG Report 2026', [5], '世界の LNG の貿易量の年次報告。数字は第05章が持ち主。'),
      src=('国際ガス連盟（IGU）『World LNG Report 2026』（プレスリリース）', 'https://igu.org/press-releases/world-lng-report-2026', '第05章の事実確認表 #4'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='iea', t='国際エネルギー機関', en='International Energy Agency', alias='IEA', view='v1', field='系統と市場', ch=[3, 27, 29, 30],
      d='エネルギー政策に関わる国際機関（略称 IEA）。この講座では、世界の発電の割合などの統計の出典として出てくる。国際機関なので、参照資料の種類は「当局・公的機関」に入れる。',
      res=('Global Energy Review 2026', [3], '世界の発電電力量の割合。数字は第03章が持ち主。'),
      src=('IEA『Global Energy Review 2026』Electricity supply', 'https://www.iea.org/reports/global-energy-review-2026/electricity-supply', '第03章の事実確認表 #12'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='iso', t='国際標準化機構', en='International Organization for Standardization', alias='ISO', view='v2', field='熱とサイクル', ch=[5, 9, 12, 13, 16, 17],
      d='国際規格を作る団体（略称 ISO）。この講座では、天然ガスの発熱量の規格や、ガスタービンの性能の規格の発行者として出てくる。規格の本文は有料で、この講座は名前・版・公表日までを書く。',
      res=('ISO の規格（天然ガスの発熱量など）', [5, 16], '規格の名前・版・公表日を発行団体のページで確認した。本文は読んでいない。'),
      src=('国際標準化機構（ISO）『ISO 6976:2016』', 'https://committee.iso.org/standard/55842.html', '第05章の事実確認表 #8'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='gtsj', t='日本ガスタービン学会', en='Gas Turbine Society of Japan', view='v2', field='ガスタービン', ch=[7, 11, 12, 13],
      d='ガスタービンに関する学術と技術の学会。この講座では、ガスタービンの説明のページの発行者として出てくる。',
      res=('ガスタービンとは？', [11], 'ガスタービンの 3 つの要素が同時に作動する説明。'),
      src=('日本ガスタービン学会『ガスタービンとは？』', 'https://www.gtsj.or.jp/gasturbin/index.html', '第11章の事実確認表 #3'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='asme', t='ASME', en='The American Society of Mechanical Engineers', view='v2', field='ガスタービン', ch=[11, 16],
      d='米国の機械学会。この講座では、ガスタービンの性能試験の規格の発行団体と、ガスタービンの技術部会（IGTI）として出てくる。規格の本文は有料で、この講座は名前と版までを書く。',
      res=('PTC 22 Gas Turbines', [16], 'ガスタービンの性能試験の規格。確認した最新の版は第16章が持ち主。'),
      src=('ASME『PTC 22-2023 Gas Turbines』（ANSI の販売ページ）', 'https://webstore.ansi.org/standards/asme/asmeptc222023', '第16章の事実確認表 #4'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='jsme', t='日本機械学会', en='The Japan Society of Mechanical Engineers', view='v2', field='蒸気と水', ch=[8, 19],
      d='機械工学の学会。この講座では、蒸気表の編者として出てくる。',
      res=('日本機械学会蒸気表', [8], '蒸気の状態の値の出典。確認できた版は第08章が持ち主。'),
      src=('国立国会図書館サーチ『日本機械学会蒸気表』の書誌', 'https://ndlsearch.ndl.go.jp/en/books/R100000046-I1000141745', '第08章の事実確認表 #3'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='iapws', t='IAPWS', en='International Association for the Properties of Water and Steam', view='v2', field='蒸気と水', ch=[8],
      d='水と蒸気の性質を扱う国際団体。この講座では、水と蒸気の熱力学の工業用の式の発行者として出てくる。',
      res=('IAPWS-IF97', [8], '水と蒸気の熱力学的な性質の工業用の式。版は第08章が持ち主。'),
      src=('IAPWS『Revised Release on the IAPWS Industrial Formulation 1997』', 'https://iapws.org/documents/release/IF97-Rev.download', '第08章の事実確認表 #1'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='jisc', t='日本産業標準調査会', en='Japanese Industrial Standards Committee', alias='JIS', view='v2', field='熱とサイクル', ch=[6, 25],
      d='日本の産業標準（JIS）の制定や改正を審議する調査会。この講座では、火力発電用語の規格の確認先として出てくる。規格の閲覧と販売は、日本規格協会のページで行う。',
      res=('JIS B 0130 火力発電用語－一般', [6], '火力発電の一般用語の規格。版は第06章が持ち主。'),
      src=('日本産業標準調査会・日本規格協会『JIS B 0130 火力発電用語－一般』', 'https://webdesk.jsa.or.jp/preview/pre_jis_b_00130_000_000_2019_j_ed10_ch.pdf', '第06章の事実確認表 #3'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='iec', t='国際電気標準会議', en='International Electrotechnical Commission', alias='IEC', view='v3', field='電気', ch=[22, 23],
      d='電気と電子の分野の国際規格を作る団体（略称 IEC）。この講座では、回転電気機械の規格の発行団体として出てくる。規格の本文は有料で、この講座は名前・版・発行日までを書く。',
      res=('IEC 60034-1 回転電気機械', [22], '発電機の定格と性能の規格。確認した版は第22章が持ち主。'),
      src=('国際電気標準会議（IEC）『IEC 60034-1:2022』', 'https://webstore.iec.ch/publication/65446', '第22章の事実確認表 #7'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='ieee', t='IEEE', en='Institute of Electrical and Electronics Engineers', view='v3', field='制御と保守', ch=[24],
      d='電気・電子・情報の分野の学会・標準化団体。この講座では、発電設備の信頼性と可用性の報告に使う用語と指標の標準の発行団体として出てくる。',
      res=('IEEE 762', [24], '発電設備の信頼性・可用性・生産性の報告の標準。'),
      src=('IEEE『IEEE 762』', 'https://standards.ieee.org/ieee/762/997', '第24章の事実確認表 #1'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='jea', t='日本電気協会', en='The Japan Electric Association', view='v3', field='電気', ch=[22, 23],
      d='電気事業に関わる規程を作る団体。この講座では、系統連系規程の発行者として出てくる。規程の本文は有料で、この講座は名前・版・日付までを書く。',
      res=('系統連系規程（JEAC 9701）', [22, 23], '発電設備などを系統につなぐときの規程。確認した版は第22章が持ち主。'),
      src=('日本電気協会『系統連系規程（JEAC 9701-2024）』（販売ページ）', 'https://store.denki.or.jp/products/系統連系規程', '第22章の事実確認表 #4'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='ieej', t='電気学会', en='The Institute of Electrical Engineers of Japan', alias='IEEJ', view='v3', field='電気', ch=[32],
      d='電気工学の学会（略称 IEEJ）。この講座の本文では、この学会の資料を使っていない。',
      res=None,
      src=('電気学会『法人・会議体・役職・英語名称』', 'https://www.iee.jp/about/english_name/', '公式ページで確認（2026-11-15）'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='nerc', t='NERC', en='North American Electric Reliability Corporation', view='v3', field='制御と保守', ch=[24],
      d='北米の電力系統の信頼性を扱う団体。この講座では、設備の稼働の統計の報告の手引（運転の指標の式）の発行者として出てくる。',
      res=('GADS Data Reporting Instructions', [24], '設備の稼働の統計の報告の手引。指標の式の根拠。'),
      src=('NERC『Appendix F Equations 2023 DRI』', 'https://www.nerc.com/pa/RAPA/gads/DataReportingInstructions/Appendix_F_Equations_2023_DRI.pdf', '第24章の事実確認表 #2'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='tenpes', t='火力原子力発電技術協会', en='Thermal and Nuclear Power Engineering Society', view='v3', field='制御と保守', ch=[32],
      d='火力発電と原子力発電の技術の調査研究などを行う一般社団法人。この講座の本文では、この協会の資料を使っていない。',
      res=None,
      src=('火力原子力発電技術協会『Thermal and Nuclear Power Engineering Society』（検索結果の見出し）', 'https://www.tenpes.or.jp/en/', 'ページ本文は自動取得できず、公式ドメインの検索結果の見出しと日本語ページの題で確認'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='meti', t='経済産業省', en='Ministry of Economy, Trade and Industry', view='v4', field='環境と制度', ch=[4, 26, 27, 28], skipgl=True,
      d='', res=('安全保障貿易管理ガイダンス［入門編］・発電所に係る環境影響評価の手引', [27, 28], '輸出管理の仕組みと、環境影響評価の手続の段階。'),
      src=('経済産業省『安全保障貿易管理ガイダンス［入門編］』', 'https://www.meti.go.jp/policy/anpo/guidance/guidance.pdf', '第27章の事実確認表 #17'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='moe', t='環境省', en='', view='v4', field='環境と制度', ch=[10, 28, 29], skipgl=True,
      d='', res=('算定・報告・公表制度 排出係数一覧', [10], '二酸化炭素の排出係数の公的な値。数字は第10章が持ち主。'),
      src=('環境省『算定・報告・公表制度 排出係数一覧』', 'https://policies.env.go.jp/earth/ghg-santeikohyo/files/calc/ichiran_2025.pdf', '第10章の事実確認表 #6'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='egov', t='e-Gov 法令検索', en='', view='v4', field='環境と制度', ch=[1, 4, 26, 28], skipgl=True,
      d='', res=('電気事業法（昭和三十九年法律第百七十号）', [4, 26, 28], '日本の法令の現行の条文の確認先。'),
      src=('e-Gov 法令検索（デジタル庁）『電気事業法』', 'https://laws.e-gov.go.jp/law/339AC0000000170', '第04章の事実確認表 #1'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='eurlex', t='EUR-Lex', en='', view='v4', field='環境と制度', ch=[22, 28], skipgl=True,
      d='', res=('Directive (EU) 2024/1785（産業排出指令の改正）', [28], 'EU の法令の確認先。国・地域と確認日つきで使った。'),
      src=('EUR-Lex『Directive (EU) 2024/1785』', 'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AL_202401785', '第28章の事実確認表 #13'), rn='なし（確認した資料に変更の記載なし）'),
 dict(k='wa', t='ワッセナー・アレンジメント', en='Wassenaar Arrangement', view='v4', field='環境と制度', ch=[27], skipgl=True,
      d='', res=('List of Dual-Use Goods and Technologies and Munitions List', [27], '軍民両用の品目の区分の名前。品目の本文は読んでいない。'),
      src=('Wassenaar Arrangement『About Us』', 'https://www.wassenaar.org/about-us/', '第27章の事実確認表 #18'), rn='なし（確認した資料に変更の記載なし）'),
]
FIELDS = {
 'v1': ('系統と市場・燃料', [('系統と市場', '電力系統の運用、卸電力・容量・需給調整の市場、系統連系、統計。関連章：第01〜04章・第22章・第30章。', [1, 2, 3, 4, 22, 30]),
                       ('燃料', '天然ガスと LNG の供給網、契約の用語、取引量の統計。関連章：第05章。', [5])]),
 'v2': ('熱・ガスタービン・蒸気と水', [('熱とサイクル', '燃焼・熱効率・サイクルの用語と、発熱量の規格。関連章：第06〜10章。', [6, 7, 8, 9, 10]),
                                ('ガスタービン', 'ガスタービンの構成と性能試験。関連章：第11〜17章。', [11, 12, 13, 14, 15, 16, 17]),
                                ('蒸気と水', '蒸気の状態の値と、水と蒸気の式。関連章：第08章・第19〜21章。', [8, 19, 20, 21])]),
 'v3': ('電気・制御と保守', [('電気', '発電機・変圧器・系統連系の規格と規程。関連章：第22章。', [22]),
                       ('制御と保守', '制御・保護・運転の指標・保守。関連章：第23〜25章。', [23, 24, 25])]),
 'v4': ('環境と制度', [('環境と制度', '法令・許認可・環境・輸出管理。関連章：第26〜29章。', [26, 27, 28, 29])]),
}
SHORT = dict(occto='OCCTO', egc='EGC', jogmec='JOGMEC', iea='IEA', eia='EIA', igu='IGU', iso='ISO', iec='IEC', jisc='JISC', tenpes='TENPES', ferc='FERC', entsoe='ENTSO-E', iapws='IAPWS', asme='ASME', ieee='IEEE', nerc='NERC', wa='Wassenaar')
RES_SHORT = dict(anre='電力システム改革', occto='系統アクセスの流れ', jepx='取引概要・沿革', tdgc='取引規程・組織概要', ferc='卸電力市場の概要', entsoe='About ENTSO-E', eia='電力の統計（米国）', igu='World LNG Report', iea='Global Energy Review', iso='ISO 6976 ほか', gtsj='ガスタービンとは？', asme='PTC 22', jsme='蒸気表', iapws='IAPWS-IF97', jisc='JIS B 0130', iec='IEC 60034-1', ieee='IEEE 762', jea='系統連系規程', nerc='GADS 報告の手引', meti='貿易管理ガイダンス', moe='排出係数一覧', egov='電気事業法', eurlex='指令 2024/1785', wa='Dual-Use List')
KIND = {'field': 'core', 'org': 'ext', 'res': 'pol'}

CAT6 = ['規格・仕様', '団体の資料', '企業の資料', '当局・公的機関', '教科書・一般知識・他講座', '架空（見本のため）']
NORM = {'公的資料': '当局・公的機関', '公的機関の発表': '当局・公的機関', '公的機関の資料': '当局・公的機関', '当局の資料': '当局・公的機関', '当局の発表': '当局・公的機関', '法令': '当局・公的機関',
        '規格': '規格・仕様', '架空': '架空（見本のため）', '企業の発表': '企業の資料', '学術論文': '団体の資料'}


def chs(lst):
    # 数字の章は「第NN章」、序章（I1・I2 などの文字列の章番号）は「序章1」の形。序章を先に並べる（FRAMEWORK の parts[].front）
    key = lambda n: (0, str(n)) if isinstance(n, str) else (1, '%03d' % n)
    return '・'.join(('序章%s' % n[1:]) if isinstance(n, str) else ('第%02d章' % n) for n in sorted(set(lst), key=key))


def build_map():
    views = []
    for vk in ('v1', 'v2', 'v3', 'v4'):
        title, fields = FIELDS[vk]
        orgs = [o for o in ORGS if o['view'] == vk]
        nodes, links = [], []
        # 列: 分野 x=10、団体 x=255、資料 x=510
        n_rows = max(len(orgs), len(fields) * 2)
        H = 20 + n_rows * 74
        fy = {}
        # 分野は、その分野に属する団体の行の中央に置く
        row = 0
        order = []
        for fname, _, _ in fields:
            for o in orgs:
                if o['field'] == fname:
                    order.append(o)
        for o in orgs:
            if o not in order:
                order.append(o)
        pos = {o['k']: i for i, o in enumerate(order)}
        for fname, fdesc, fch in fields:
            idx = [pos[o['k']] for o in order if o['field'] == fname]
            cy = (sum(idx) / len(idx)) * 74 + 20 if idx else 20
            fid = '%s-f-%s' % (vk, fname)
            fy[fname] = fid
            nodes.append(dict(id=fid, label=fname, sub='分野', kind='core', x=10, y=int(cy), w=175, h=56, desc=fdesc, role='分野', ch=fch))
        for o in order:
            i = pos[o['k']]
            y = 20 + i * 74
            oid = '%s-o-%s' % (vk, o['k'])
            label = SHORT.get(o['k'], o['t'])
            sub = o['t'] if label != o['t'] and len(o['t']) <= 14 else ('団体・機関' if label == o['t'] else o['t'][:13] + '…')
            nodes.append(dict(id=oid, label=label, sub=sub, kind='ext', x=250, y=y, w=190, h=56,
                              desc=(o['d'] or '').strip() or o['t'] + '（%s）。' % (o['en'] or '名称は各章の表記') + 'この講座では、' + (o['res'][2] if o['res'] else '資料を使っていない'),
                              role='団体・機関', ch=sorted(set(o['ch']))))
            links.append(dict(id='%s-l-%s' % (vk, o['k']), a=fy[o['field']], b=oid, label='', plane='lg', proto='参照の関係', carries='分野と団体・機関の対応'))
            if o['res']:
                rid = '%s-r-%s' % (vk, o['k'])
                rl = RES_SHORT.get(o['k'], o['res'][0])
                nodes.append(dict(id=rid, label=rl, sub='規格・資料の例', kind='pol', x=500, y=y, w=190, h=56, desc=o['res'][2], role='規格・資料の例', ch=sorted(set(o['res'][1]))))
                links.append(dict(id='%s-m-%s' % (vk, o['k']), a=oid, b=rid, label='発行', plane='lg', proto='参照の関係', carries='資料の発行'))
        views.append(dict(key=vk, label=title, hint='分野 → 団体・機関 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。線はすべて参照の関係で、点線です。版や窓口は、発行者の公式ページで確かめます。', viewBox=[700, H], nodes=nodes, links=links))
    return dict(title='規格・団体と公的資料の地図：分野 → 団体・機関 → 規格・資料', kinds={'core': '分野', 'ext': '団体・機関', 'pol': '規格・資料の例'}, initial='v1-f-系統と市場', views=views)


def collect_refs():
    rows = {}
    bad = []
    for f in sorted(glob.glob(str(ROOT / 'chapters' / '*.html'))):
        m0 = re.search(r'/(\d\d|I\d)-', f)
        if not m0:
            continue
        n = int(m0.group(1)) if m0.group(1).isdigit() else m0.group(1)
        if n == 32:
            continue
        s = open(f, encoding='utf-8').read()
        m = re.search(r'<section class="refs">(.*?)</section>', s, re.S)
        if not m:
            bad.append('%sに参照資料の節がない' % chs([n]))
            continue
        body = re.sub(r'<thead>.*?</thead>', '', m.group(1), flags=re.S)
        for tr in re.findall(r'<tr>(.*?)</tr>', body, re.S):
            cells = [re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', c)).replace('&amp;', '&').strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.S)]
            if len(cells) != 5:
                continue
            cat, title, issuer, ver, use = cells
            c2 = NORM.get(cat, cat)
            if c2 not in CAT6:
                bad.append('%sの参照資料の種類「%s」が 6 区分にない（%s）' % (chs([n]), cat, title[:30]))
                continue
            if cat != c2:
                bad.append('%sの参照資料の種類「%s」を「%s」に読み替えた（%s）' % (chs([n]), cat, c2, title[:30]))
            key = (c2, title, issuer)
            if key in rows:
                rows[key]['ch'].add(n)
            else:
                rows[key] = dict(ver=ver, ch={n})
    out = []
    for (cat, title, issuer), v in rows.items():
        out.append([cat, title, issuer, v['ver'], chs(v['ch'])])
    out.sort(key=lambda r: (CAT6.index(r[0]), r[2], r[1]))
    return out, bad


def tally():
    r = subprocess.run(['node', str(ROOT / 'tools' / 'tally.js'), str(ROOT)], capture_output=True, text=True)
    return json.loads(r.stdout)


def main():
    refs, bad = collect_refs()
    t = tally()
    # ---- 事実確認表
    lines = ['/* 第32章 事実確認表（担当 A、確認 %s〜%s）' % (TODAY, TODAY),
             '団体・機関の正式名称と、地図・用語集に書いた関係。各章の確認表で確かめた名前は、その章の行を指す。この章は新しい数字・版を足さない。',
             '| # | 区分 | 事実（本文での書き方） | 数値・単位 | 時点・版 | 出典（発行者『資料名』） | URL（個別ページ） | 一次 | 確認日 | 使った箇所 |',
             '|---|---|---|---|---|---|---|---|---|---|']
    for i, o in enumerate(ORGS, 1):
        en = o['en'] or '英語名は確かめていない'
        lines.append('| %d | 企業 | %s（%s）。社名変更：%s。%s | — | 確認 2026-11 | %s | %s | ○ | %s | c32-map、用語集 |' % (i, o['t'], en, o['rn'], o['src'][2], o['src'][0], o['src'][1] or '—', TODAY))
    lines += ['確認できず書かなかった：',
              '- 火力原子力発電技術協会の英語名の公式ページの本文：自動取得が失敗し、検索結果の見出し（公式ドメイン）と日本語ページの題で確認した。',
              '- JOGMEC の名称変更の日と英語名の公式の発表の本文：発表ページの自動取得が拒否され、検索結果の見出しで確認した。変更の日は書かなかった。',
              '- 送配電網協議会の英語名、環境省・e-Gov・EUR-Lex の英語名の公式の表記：確かめていないので書かなかった。',
              '- 団体・機関のうち、規格の発行団体の「会員数」「設立年」：必要がないので書かなかった。',
              '- 参照資料の一覧の「版・時点」の確認：各章の表の値を写した。この章では確かめ直していない。',
              '*/']
    (ROOT / 'facts' / '32-appendix.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    # ---- データ
    head = ('/* 第32章（付録）のデータ。生成：tools/gen32.py（再実行で再集計できる）。事実確認表：facts/32-appendix.md（担当 A、確認 %s）\n'
            '   c32-refs は各章の「参照資料」の表から集めた。c32-map と団体の用語は、各章の確認表で確かめた名前と版だけを使う。\n'
            '   付録は確認問題を置かない。横断の総合テスト 2 問を part "5" で登録する（正答の添字は 0・1）。 */\n\n') % TODAY
    js = [head]
    js.append('CN.add(\'arch\', \'c32-map\', %s);\n' % json.dumps(build_map(), ensure_ascii=False, indent=1))
    js.append('CN.add(\'table\', \'c32-refs\', %s);\n' % json.dumps(dict(
        title='参照資料の一覧：各章の「参照資料」を 1 つにまとめたもの',
        caption='種類で絞って探せます。資料へのリンクと版・時点の確認は、各章の「参照資料」と発行者の公式ページで行います（一覧は 2026 年 11 月 15 日時点。同じ資料を使った章は「関連章」にまとめています）',
        cols=['種類', '資料名', '発行者', '版・時点', '関連章'], filter=0, rows=refs), ensure_ascii=False, indent=1))
    gl = []
    for o in ORGS:
        if o.get('skipgl') or not o['d']:
            continue
        g = dict(t=o['t'], d=o['d'], ch=sorted(set(o['ch'] + [32])))
        if o['en']:
            g['en'] = o['en']
        if o.get('alias'):
            g['alias'] = o['alias']
        gl.append(g)
    js.append('CN.glossary(%s);\n' % json.dumps(gl, ensure_ascii=False, indent=1))
    exam = [
        dict(part='5', q='この講座で、数字（効率・出力・市場の値など）を読むときの原則として、合うものはどれですか。', c=['出典・時点・条件（効率なら発熱量の基準と端など）をそろえて読み、条件の違う数字は比べない', '数字は、単位が同じなら、出典や時点が違っても比べてよい', '数字は、大きい方を、性能が高いものとして読む', '数字の条件は、出典に書かれていなくても、推測で補う'], a=0,
             why='正答は、出典・時点・条件をそろえて読み、条件の違う数字を比べないことです。この講座の数字には出典と時点と条件を付け、出典に条件が書かれていないときは、書かれていないと書きます。単位が同じでも条件が違えば別の数字で、推測で条件を補いません。', ch=[32]),
        dict(part='5', q='規格・団体の資料と、法令・制度の資料の扱いとして、合うものはどれですか。', c=['規格は、すべて法令なので、どの国でも同じ内容が義務になる', '規格は、団体が出す文書の名前と版・公表日で確かめ、法令・制度は、当局の資料で国・地域と確認の日を付けて確かめる', '法令・制度は、国・地域と確認の日を書かなくても、どの国にも通じる', '規格の本文は、有料でも、出典を書けば講座に転載してよい'], a=1,
             why='正答は、規格は団体の文書の名前と版・公表日で確かめ、法令・制度は当局の資料で国・地域と確認の日を付けて確かめる、というものです。団体の規格は法令とは別の文書です。法令と制度は国ごとに違い、改正されるので、国・地域と確認の日が要ります。規格の本文は、この講座では転載しません。', ch=[32]),
    ]
    js.append('CN.exam(%s);\n' % json.dumps(exam, ensure_ascii=False, indent=1))
    (ROOT / 'data' / '32-appendix.js').write_text('\n'.join(js), encoding='utf-8')
    # ---- 集計の報告
    rep = ['集計（%s）' % TODAY, json.dumps(t, ensure_ascii=False)]
    rep += ['参照資料の一覧：%d 行' % len(refs)] + bad
    Path('/tmp/power-tally32.txt').write_text('\n'.join(rep), encoding='utf-8')
    print('c32-refs %d 行、団体 %d、用語集（団体）%d、注意 %d 件' % (len(refs), len(ORGS), len(gl), len(bad)))
    print('不足の章:', t['missing'])


if __name__ == '__main__':
    main()
