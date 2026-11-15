/* 第32章（付録）のデータ。生成：tools/gen32.py（再実行で再集計できる）。事実確認表：facts/32-appendix.md（担当 A、確認 2026-11-15）
   c32-refs は各章の「参照資料」の表から集めた。c32-map と団体の用語は、各章の確認表で確かめた名前と版だけを使う。
   付録は確認問題を置かない。横断の総合テスト 2 問を part "5" で登録する（正答の添字は 0・1）。 */


CN.add('arch', 'c32-map', {
 "title": "規格・団体と公的資料の地図：分野 → 団体・機関 → 規格・資料",
 "kinds": {
  "core": "分野",
  "ext": "団体・機関",
  "pol": "規格・資料の例"
 },
 "initial": "v1-f-系統と市場",
 "views": [
  {
   "key": "v1",
   "label": "系統と市場・燃料",
   "hint": "分野 → 団体・機関 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。線はすべて参照の関係で、点線です。版や窓口は、発行者の公式ページで確かめます。",
   "viewBox": [
    700,
    834
   ],
   "nodes": [
    {
     "id": "v1-f-系統と市場",
     "label": "系統と市場",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 316,
     "w": 175,
     "h": 56,
     "desc": "電力系統の運用、卸電力・容量・需給調整の市場、系統連系、統計。関連章：第01〜04章・第22章・第30章。",
     "role": "分野",
     "ch": [
      1,
      2,
      3,
      4,
      22,
      30
     ]
    },
    {
     "id": "v1-f-燃料",
     "label": "燃料",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 723,
     "w": 175,
     "h": 56,
     "desc": "天然ガスと LNG の供給網、契約の用語、取引量の統計。関連章：第05章。",
     "role": "分野",
     "ch": [
      5
     ]
    },
    {
     "id": "v1-o-anre",
     "label": "資源エネルギー庁",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "経済産業省の外局で、エネルギー政策を所管する官庁。この講座では、電力システム改革の資料、電源投資の資料、環境影響評価の手引などの発行者として出てくる。",
     "role": "団体・機関",
     "ch": [
      1,
      3,
      4,
      28
     ]
    },
    {
     "id": "v1-r-anre",
     "label": "電力システム改革",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "エネルギー白書の電力システム改革の節。電力の自由化と各事業者の役割の説明に使った。",
     "role": "規格・資料の例",
     "ch": [
      1
     ]
    },
    {
     "id": "v1-o-occto",
     "label": "OCCTO",
     "sub": "電力広域的運営推進機関",
     "kind": "ext",
     "x": 250,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "電力広域的運営推進機関（Organization for Cross-regional Coordination of Transmission Operators）。この講座では、系統連系の手続きの段階。容量市場・長期脱炭素電源オークションの約定結果（第04章）も発行する。",
     "role": "団体・機関",
     "ch": [
      2,
      4,
      22,
      31
     ]
    },
    {
     "id": "v1-r-occto",
     "label": "系統アクセスの流れ",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "系統連系の手続きの段階。容量市場・長期脱炭素電源オークションの約定結果（第04章）も発行する。",
     "role": "規格・資料の例",
     "ch": [
      22,
      31
     ]
    },
    {
     "id": "v1-o-jepx",
     "label": "日本卸電力取引所",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "日本卸電力取引所（Japan Electric Power Exchange）。この講座では、卸電力市場の種類と約定方式、開始の年月日。",
     "role": "団体・機関",
     "ch": [
      4
     ]
    },
    {
     "id": "v1-r-jepx",
     "label": "取引概要・沿革",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "卸電力市場の種類と約定方式、開始の年月日。",
     "role": "規格・資料の例",
     "ch": [
      4
     ]
    },
    {
     "id": "v1-o-tdgc",
     "label": "送配電網協議会",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "一般送配電事業者などが会員となる一般社団法人。この講座では、需給調整市場の取引規程や、会員の一覧の資料の発行者として出てくる。",
     "role": "団体・機関",
     "ch": [
      1,
      2,
      4
     ]
    },
    {
     "id": "v1-r-tdgc",
     "label": "取引規程・組織概要",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "需給調整市場の運営者と、一般送配電事業者の会員の確認。",
     "role": "規格・資料の例",
     "ch": [
      1,
      4
     ]
    },
    {
     "id": "v1-o-egc",
     "label": "EGC",
     "sub": "電力・ガス取引監視等委員会",
     "kind": "ext",
     "x": 250,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "経済産業省に置かれた、電力・ガス・熱供給の市場を監視する委員会。この講座の本文では、この委員会の資料を使っていない。",
     "role": "団体・機関",
     "ch": [
      32
     ]
    },
    {
     "id": "v1-o-ferc",
     "label": "FERC",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 390,
     "w": 190,
     "h": 56,
     "desc": "米国の連邦エネルギー規制委員会。この講座では、米国の卸電力市場を運営する地域送電機関と独立系統運用者の説明の出典として出てくる。",
     "role": "団体・機関",
     "ch": [
      1
     ]
    },
    {
     "id": "v1-r-ferc",
     "label": "卸電力市場の概要",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 390,
     "w": 190,
     "h": 56,
     "desc": "米国の卸電力市場の概要。名前と役割だけを使った。",
     "role": "規格・資料の例",
     "ch": [
      1
     ]
    },
    {
     "id": "v1-o-entsoe",
     "label": "ENTSO-E",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 464,
     "w": 190,
     "h": 56,
     "desc": "欧州の送電系統運用者が加盟する団体。この講座では、欧州の系統運用の枠組みの説明の出典として出てくる。",
     "role": "団体・機関",
     "ch": [
      1,
      22
     ]
    },
    {
     "id": "v1-r-entsoe",
     "label": "About ENTSO-E",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 464,
     "w": 190,
     "h": 56,
     "desc": "欧州の送電系統運用者の団体の概要。名前と役割だけを使った。",
     "role": "規格・資料の例",
     "ch": [
      1,
      22
     ]
    },
    {
     "id": "v1-o-eia",
     "label": "EIA",
     "sub": "米国エネルギー情報局",
     "kind": "ext",
     "x": 250,
     "y": 538,
     "w": 190,
     "h": 56,
     "desc": "米国のエネルギーの統計と分析を公表する政府機関（略称 EIA）。この講座では、米国の発電の割合などの統計の出典として出てくる。",
     "role": "団体・機関",
     "ch": [
      3,
      21
     ]
    },
    {
     "id": "v1-r-eia",
     "label": "電力の統計（米国）",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 538,
     "w": 190,
     "h": 56,
     "desc": "米国の電力の説明と統計。条件つきで使った。",
     "role": "規格・資料の例",
     "ch": [
      3
     ]
    },
    {
     "id": "v1-o-iea",
     "label": "IEA",
     "sub": "国際エネルギー機関",
     "kind": "ext",
     "x": 250,
     "y": 612,
     "w": 190,
     "h": 56,
     "desc": "エネルギー政策に関わる国際機関（略称 IEA）。この講座では、世界の発電の割合などの統計の出典として出てくる。国際機関なので、参照資料の種類は「当局・公的機関」に入れる。",
     "role": "団体・機関",
     "ch": [
      3,
      27,
      29,
      30
     ]
    },
    {
     "id": "v1-r-iea",
     "label": "Global Energy Review",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 612,
     "w": 190,
     "h": 56,
     "desc": "世界の発電電力量の割合。数字は第03章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      3
     ]
    },
    {
     "id": "v1-o-jogmec",
     "label": "JOGMEC",
     "sub": "エネルギー・金属鉱物資源機構",
     "kind": "ext",
     "x": 250,
     "y": 686,
     "w": 190,
     "h": 56,
     "desc": "エネルギーと金属鉱物の資源の確保を担う独立行政法人（略称 JOGMEC）。旧称は石油天然ガス・金属鉱物資源機構で、法改正に伴い名称を変更した。この講座では、LNG の契約の用語の確認先として挙げる。",
     "role": "団体・機関",
     "ch": [
      5
     ]
    },
    {
     "id": "v1-o-igu",
     "label": "IGU",
     "sub": "国際ガス連盟",
     "kind": "ext",
     "x": 250,
     "y": 760,
     "w": 190,
     "h": 56,
     "desc": "天然ガスに関わる国際団体（略称 IGU）。この講座では、世界の LNG の貿易量の年次報告の発行者として出てくる。",
     "role": "団体・機関",
     "ch": [
      5
     ]
    },
    {
     "id": "v1-r-igu",
     "label": "World LNG Report",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 760,
     "w": 190,
     "h": 56,
     "desc": "世界の LNG の貿易量の年次報告。数字は第05章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      5
     ]
    }
   ],
   "links": [
    {
     "id": "v1-l-anre",
     "a": "v1-f-系統と市場",
     "b": "v1-o-anre",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-anre",
     "a": "v1-o-anre",
     "b": "v1-r-anre",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-occto",
     "a": "v1-f-系統と市場",
     "b": "v1-o-occto",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-occto",
     "a": "v1-o-occto",
     "b": "v1-r-occto",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-jepx",
     "a": "v1-f-系統と市場",
     "b": "v1-o-jepx",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-jepx",
     "a": "v1-o-jepx",
     "b": "v1-r-jepx",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-tdgc",
     "a": "v1-f-系統と市場",
     "b": "v1-o-tdgc",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-tdgc",
     "a": "v1-o-tdgc",
     "b": "v1-r-tdgc",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-egc",
     "a": "v1-f-系統と市場",
     "b": "v1-o-egc",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-l-ferc",
     "a": "v1-f-系統と市場",
     "b": "v1-o-ferc",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-ferc",
     "a": "v1-o-ferc",
     "b": "v1-r-ferc",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-entsoe",
     "a": "v1-f-系統と市場",
     "b": "v1-o-entsoe",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-entsoe",
     "a": "v1-o-entsoe",
     "b": "v1-r-entsoe",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-eia",
     "a": "v1-f-系統と市場",
     "b": "v1-o-eia",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-eia",
     "a": "v1-o-eia",
     "b": "v1-r-eia",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-iea",
     "a": "v1-f-系統と市場",
     "b": "v1-o-iea",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-iea",
     "a": "v1-o-iea",
     "b": "v1-r-iea",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v1-l-jogmec",
     "a": "v1-f-燃料",
     "b": "v1-o-jogmec",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-l-igu",
     "a": "v1-f-燃料",
     "b": "v1-o-igu",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v1-m-igu",
     "a": "v1-o-igu",
     "b": "v1-r-igu",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    }
   ]
  },
  {
   "key": "v2",
   "label": "熱・ガスタービン・蒸気と水",
   "hint": "分野 → 団体・機関 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。線はすべて参照の関係で、点線です。版や窓口は、発行者の公式ページで確かめます。",
   "viewBox": [
    700,
    464
   ],
   "nodes": [
    {
     "id": "v2-f-熱とサイクル",
     "label": "熱とサイクル",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 57,
     "w": 175,
     "h": 56,
     "desc": "燃焼・熱効率・サイクルの用語と、発熱量の規格。関連章：第06〜10章。",
     "role": "分野",
     "ch": [
      6,
      7,
      8,
      9,
      10
     ]
    },
    {
     "id": "v2-f-ガスタービン",
     "label": "ガスタービン",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 205,
     "w": 175,
     "h": 56,
     "desc": "ガスタービンの構成と性能試験。関連章：第11〜17章。",
     "role": "分野",
     "ch": [
      11,
      12,
      13,
      14,
      15,
      16,
      17
     ]
    },
    {
     "id": "v2-f-蒸気と水",
     "label": "蒸気と水",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 353,
     "w": 175,
     "h": 56,
     "desc": "蒸気の状態の値と、水と蒸気の式。関連章：第08章・第19〜21章。",
     "role": "分野",
     "ch": [
      8,
      19,
      20,
      21
     ]
    },
    {
     "id": "v2-o-iso",
     "label": "ISO",
     "sub": "国際標準化機構",
     "kind": "ext",
     "x": 250,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "国際規格を作る団体（略称 ISO）。この講座では、天然ガスの発熱量の規格や、ガスタービンの性能の規格の発行者として出てくる。規格の本文は有料で、この講座は名前・版・公表日までを書く。",
     "role": "団体・機関",
     "ch": [
      5,
      9,
      12,
      13,
      16,
      17
     ]
    },
    {
     "id": "v2-r-iso",
     "label": "ISO 6976 ほか",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "規格の名前・版・公表日を発行団体のページで確認した。本文は読んでいない。",
     "role": "規格・資料の例",
     "ch": [
      5,
      16
     ]
    },
    {
     "id": "v2-o-jisc",
     "label": "JISC",
     "sub": "日本産業標準調査会",
     "kind": "ext",
     "x": 250,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "日本の産業標準（JIS）の制定や改正を審議する調査会。この講座では、火力発電用語の規格の確認先として出てくる。規格の閲覧と販売は、日本規格協会のページで行う。",
     "role": "団体・機関",
     "ch": [
      6,
      25
     ]
    },
    {
     "id": "v2-r-jisc",
     "label": "JIS B 0130",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "火力発電の一般用語の規格。版は第06章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      6
     ]
    },
    {
     "id": "v2-o-gtsj",
     "label": "日本ガスタービン学会",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "ガスタービンに関する学術と技術の学会。この講座では、ガスタービンの説明のページの発行者として出てくる。",
     "role": "団体・機関",
     "ch": [
      7,
      11,
      12,
      13
     ]
    },
    {
     "id": "v2-r-gtsj",
     "label": "ガスタービンとは？",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "ガスタービンの 3 つの要素が同時に作動する説明。",
     "role": "規格・資料の例",
     "ch": [
      11
     ]
    },
    {
     "id": "v2-o-asme",
     "label": "ASME",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "米国の機械学会。この講座では、ガスタービンの性能試験の規格の発行団体と、ガスタービンの技術部会（IGTI）として出てくる。規格の本文は有料で、この講座は名前と版までを書く。",
     "role": "団体・機関",
     "ch": [
      11,
      16
     ]
    },
    {
     "id": "v2-r-asme",
     "label": "PTC 22",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "ガスタービンの性能試験の規格。確認した最新の版は第16章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      16
     ]
    },
    {
     "id": "v2-o-jsme",
     "label": "日本機械学会",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "機械工学の学会。この講座では、蒸気表の編者として出てくる。",
     "role": "団体・機関",
     "ch": [
      8,
      19
     ]
    },
    {
     "id": "v2-r-jsme",
     "label": "蒸気表",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "蒸気の状態の値の出典。確認できた版は第08章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      8
     ]
    },
    {
     "id": "v2-o-iapws",
     "label": "IAPWS",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 390,
     "w": 190,
     "h": 56,
     "desc": "水と蒸気の性質を扱う国際団体。この講座では、水と蒸気の熱力学の工業用の式の発行者として出てくる。",
     "role": "団体・機関",
     "ch": [
      8
     ]
    },
    {
     "id": "v2-r-iapws",
     "label": "IAPWS-IF97",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 390,
     "w": 190,
     "h": 56,
     "desc": "水と蒸気の熱力学的な性質の工業用の式。版は第08章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      8
     ]
    }
   ],
   "links": [
    {
     "id": "v2-l-iso",
     "a": "v2-f-熱とサイクル",
     "b": "v2-o-iso",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v2-m-iso",
     "a": "v2-o-iso",
     "b": "v2-r-iso",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v2-l-jisc",
     "a": "v2-f-熱とサイクル",
     "b": "v2-o-jisc",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v2-m-jisc",
     "a": "v2-o-jisc",
     "b": "v2-r-jisc",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v2-l-gtsj",
     "a": "v2-f-ガスタービン",
     "b": "v2-o-gtsj",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v2-m-gtsj",
     "a": "v2-o-gtsj",
     "b": "v2-r-gtsj",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v2-l-asme",
     "a": "v2-f-ガスタービン",
     "b": "v2-o-asme",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v2-m-asme",
     "a": "v2-o-asme",
     "b": "v2-r-asme",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v2-l-jsme",
     "a": "v2-f-蒸気と水",
     "b": "v2-o-jsme",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v2-m-jsme",
     "a": "v2-o-jsme",
     "b": "v2-r-jsme",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v2-l-iapws",
     "a": "v2-f-蒸気と水",
     "b": "v2-o-iapws",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v2-m-iapws",
     "a": "v2-o-iapws",
     "b": "v2-r-iapws",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    }
   ]
  },
  {
   "key": "v3",
   "label": "電気・制御と保守",
   "hint": "分野 → 団体・機関 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。線はすべて参照の関係で、点線です。版や窓口は、発行者の公式ページで確かめます。",
   "viewBox": [
    700,
    464
   ],
   "nodes": [
    {
     "id": "v3-f-電気",
     "label": "電気",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 94,
     "w": 175,
     "h": 56,
     "desc": "発電機・変圧器・系統連系の規格と規程。関連章：第22章。",
     "role": "分野",
     "ch": [
      22
     ]
    },
    {
     "id": "v3-f-制御と保守",
     "label": "制御と保守",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 316,
     "w": 175,
     "h": 56,
     "desc": "制御・保護・運転の指標・保守。関連章：第23〜25章。",
     "role": "分野",
     "ch": [
      23,
      24,
      25
     ]
    },
    {
     "id": "v3-o-iec",
     "label": "IEC",
     "sub": "国際電気標準会議",
     "kind": "ext",
     "x": 250,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "電気と電子の分野の国際規格を作る団体（略称 IEC）。この講座では、回転電気機械の規格の発行団体として出てくる。規格の本文は有料で、この講座は名前・版・発行日までを書く。",
     "role": "団体・機関",
     "ch": [
      22,
      23
     ]
    },
    {
     "id": "v3-r-iec",
     "label": "IEC 60034-1",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "発電機の定格と性能の規格。確認した版は第22章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      22
     ]
    },
    {
     "id": "v3-o-jea",
     "label": "日本電気協会",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "電気事業に関わる規程を作る団体。この講座では、系統連系規程の発行者として出てくる。規程の本文は有料で、この講座は名前・版・日付までを書く。",
     "role": "団体・機関",
     "ch": [
      22,
      23
     ]
    },
    {
     "id": "v3-r-jea",
     "label": "系統連系規程",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "発電設備などを系統につなぐときの規程。確認した版は第22章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      22,
      23
     ]
    },
    {
     "id": "v3-o-ieej",
     "label": "電気学会",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "電気工学の学会（略称 IEEJ）。この講座の本文では、この学会の資料を使っていない。",
     "role": "団体・機関",
     "ch": [
      32
     ]
    },
    {
     "id": "v3-o-ieee",
     "label": "IEEE",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "電気・電子・情報の分野の学会・標準化団体。この講座では、発電設備の信頼性と可用性の報告に使う用語と指標の標準の発行団体として出てくる。",
     "role": "団体・機関",
     "ch": [
      24
     ]
    },
    {
     "id": "v3-r-ieee",
     "label": "IEEE 762",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "発電設備の信頼性・可用性・生産性の報告の標準。",
     "role": "規格・資料の例",
     "ch": [
      24
     ]
    },
    {
     "id": "v3-o-nerc",
     "label": "NERC",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "北米の電力系統の信頼性を扱う団体。この講座では、設備の稼働の統計の報告の手引（運転の指標の式）の発行者として出てくる。",
     "role": "団体・機関",
     "ch": [
      24
     ]
    },
    {
     "id": "v3-r-nerc",
     "label": "GADS 報告の手引",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "設備の稼働の統計の報告の手引。指標の式の根拠。",
     "role": "規格・資料の例",
     "ch": [
      24
     ]
    },
    {
     "id": "v3-o-tenpes",
     "label": "TENPES",
     "sub": "火力原子力発電技術協会",
     "kind": "ext",
     "x": 250,
     "y": 390,
     "w": 190,
     "h": 56,
     "desc": "火力発電と原子力発電の技術の調査研究などを行う一般社団法人。この講座の本文では、この協会の資料を使っていない。",
     "role": "団体・機関",
     "ch": [
      32
     ]
    }
   ],
   "links": [
    {
     "id": "v3-l-iec",
     "a": "v3-f-電気",
     "b": "v3-o-iec",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v3-m-iec",
     "a": "v3-o-iec",
     "b": "v3-r-iec",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v3-l-jea",
     "a": "v3-f-電気",
     "b": "v3-o-jea",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v3-m-jea",
     "a": "v3-o-jea",
     "b": "v3-r-jea",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v3-l-ieej",
     "a": "v3-f-電気",
     "b": "v3-o-ieej",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v3-l-ieee",
     "a": "v3-f-制御と保守",
     "b": "v3-o-ieee",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v3-m-ieee",
     "a": "v3-o-ieee",
     "b": "v3-r-ieee",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v3-l-nerc",
     "a": "v3-f-制御と保守",
     "b": "v3-o-nerc",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v3-m-nerc",
     "a": "v3-o-nerc",
     "b": "v3-r-nerc",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v3-l-tenpes",
     "a": "v3-f-制御と保守",
     "b": "v3-o-tenpes",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    }
   ]
  },
  {
   "key": "v4",
   "label": "環境と制度",
   "hint": "分野 → 団体・機関 → 規格・資料の順に見ます。箱を押すと、何が載っているかと関連する章が出ます。線はすべて参照の関係で、点線です。版や窓口は、発行者の公式ページで確かめます。",
   "viewBox": [
    700,
    390
   ],
   "nodes": [
    {
     "id": "v4-f-環境と制度",
     "label": "環境と制度",
     "sub": "分野",
     "kind": "core",
     "x": 10,
     "y": 168,
     "w": 175,
     "h": 56,
     "desc": "法令・許認可・環境・輸出管理。関連章：第26〜29章。",
     "role": "分野",
     "ch": [
      26,
      27,
      28,
      29
     ]
    },
    {
     "id": "v4-o-meti",
     "label": "経済産業省",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "経済産業省（Ministry of Economy, Trade and Industry）。この講座では、輸出管理の仕組みと、環境影響評価の手続の段階。",
     "role": "団体・機関",
     "ch": [
      4,
      26,
      27,
      28
     ]
    },
    {
     "id": "v4-r-meti",
     "label": "貿易管理ガイダンス",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 20,
     "w": 190,
     "h": 56,
     "desc": "輸出管理の仕組みと、環境影響評価の手続の段階。",
     "role": "規格・資料の例",
     "ch": [
      27,
      28
     ]
    },
    {
     "id": "v4-o-moe",
     "label": "環境省",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "環境省（名称は各章の表記）。この講座では、二酸化炭素の排出係数の公的な値。数字は第10章が持ち主。",
     "role": "団体・機関",
     "ch": [
      10,
      28,
      29
     ]
    },
    {
     "id": "v4-r-moe",
     "label": "排出係数一覧",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 94,
     "w": 190,
     "h": 56,
     "desc": "二酸化炭素の排出係数の公的な値。数字は第10章が持ち主。",
     "role": "規格・資料の例",
     "ch": [
      10
     ]
    },
    {
     "id": "v4-o-egov",
     "label": "e-Gov 法令検索",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "e-Gov 法令検索（名称は各章の表記）。この講座では、日本の法令の現行の条文の確認先。",
     "role": "団体・機関",
     "ch": [
      1,
      4,
      26,
      28
     ]
    },
    {
     "id": "v4-r-egov",
     "label": "電気事業法",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 168,
     "w": 190,
     "h": 56,
     "desc": "日本の法令の現行の条文の確認先。",
     "role": "規格・資料の例",
     "ch": [
      4,
      26,
      28
     ]
    },
    {
     "id": "v4-o-eurlex",
     "label": "EUR-Lex",
     "sub": "団体・機関",
     "kind": "ext",
     "x": 250,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "EUR-Lex（名称は各章の表記）。この講座では、EU の法令の確認先。国・地域と確認日つきで使った。",
     "role": "団体・機関",
     "ch": [
      22,
      28
     ]
    },
    {
     "id": "v4-r-eurlex",
     "label": "指令 2024/1785",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 242,
     "w": 190,
     "h": 56,
     "desc": "EU の法令の確認先。国・地域と確認日つきで使った。",
     "role": "規格・資料の例",
     "ch": [
      28
     ]
    },
    {
     "id": "v4-o-wa",
     "label": "Wassenaar",
     "sub": "ワッセナー・アレンジメント",
     "kind": "ext",
     "x": 250,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "ワッセナー・アレンジメント（Wassenaar Arrangement）。この講座では、軍民両用の品目の区分の名前。品目の本文は読んでいない。",
     "role": "団体・機関",
     "ch": [
      27
     ]
    },
    {
     "id": "v4-r-wa",
     "label": "Dual-Use List",
     "sub": "規格・資料の例",
     "kind": "pol",
     "x": 500,
     "y": 316,
     "w": 190,
     "h": 56,
     "desc": "軍民両用の品目の区分の名前。品目の本文は読んでいない。",
     "role": "規格・資料の例",
     "ch": [
      27
     ]
    }
   ],
   "links": [
    {
     "id": "v4-l-meti",
     "a": "v4-f-環境と制度",
     "b": "v4-o-meti",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v4-m-meti",
     "a": "v4-o-meti",
     "b": "v4-r-meti",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v4-l-moe",
     "a": "v4-f-環境と制度",
     "b": "v4-o-moe",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v4-m-moe",
     "a": "v4-o-moe",
     "b": "v4-r-moe",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v4-l-egov",
     "a": "v4-f-環境と制度",
     "b": "v4-o-egov",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v4-m-egov",
     "a": "v4-o-egov",
     "b": "v4-r-egov",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v4-l-eurlex",
     "a": "v4-f-環境と制度",
     "b": "v4-o-eurlex",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v4-m-eurlex",
     "a": "v4-o-eurlex",
     "b": "v4-r-eurlex",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    },
    {
     "id": "v4-l-wa",
     "a": "v4-f-環境と制度",
     "b": "v4-o-wa",
     "label": "",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "分野と団体・機関の対応"
    },
    {
     "id": "v4-m-wa",
     "a": "v4-o-wa",
     "b": "v4-r-wa",
     "label": "発行",
     "plane": "lg",
     "proto": "参照の関係",
     "carries": "資料の発行"
    }
   ]
  }
 ]
});

CN.add('table', 'c32-refs', {
 "title": "参照資料の一覧：各章の「参照資料」を 1 つにまとめたもの",
 "caption": "種類で絞って探せます。資料へのリンクと版・時点の確認は、各章の「参照資料」と発行者の公式ページで行います（一覧は 2026 年 11 月 15 日時点。同じ資料を使った章は「関連章」にまとめています）",
 "cols": [
  "種類",
  "資料名",
  "発行者",
  "版・時点",
  "関連章"
 ],
 "filter": 0,
 "rows": [
  [
   "規格・仕様",
   "ASME PTC 22-2014 Gas Turbines Performance Test Codes（目次ページ）",
   "ASME",
   "2014 年 12 月 31 日発行（2005 年版を改訂）",
   "第16章"
  ],
  [
   "規格・仕様",
   "ASME PTC 22-2023 Gas Turbines",
   "ASME（ANSI の販売ページ）",
   "2023 年版",
   "第16章"
  ],
  [
   "規格・仕様",
   "Revised Release on the IAPWS Industrial Formulation 1997 for the Thermodynamic Properties of Water and Steam",
   "IAPWS",
   "2007 年 8 月（2009・2010・2012 年に編集上の小改訂）",
   "第08章"
  ],
  [
   "規格・仕様",
   "IEC 61508 & Functional Safety",
   "IEC（国際電気標準会議）",
   "資料に日付の記載なし",
   "第23章"
  ],
  [
   "規格・仕様",
   "IEC 62443 Background",
   "IEC（国際電気標準会議）",
   "ページの最終更新 2020 年 3 月 2 日と表示",
   "第23章"
  ],
  [
   "規格・仕様",
   "IEEE 762（ページは 1987 年版。現行は 2023 年と表示）",
   "IEEE",
   "762-2023 が現行と表示",
   "第24章"
  ],
  [
   "規格・仕様",
   "ISO 2314:2009 Gas turbines — Acceptance tests",
   "ISO",
   "第 3 版、2009 年 12 月（2018 年に確認、改訂の予定の表示あり）",
   "第16章"
  ],
  [
   "規格・仕様",
   "ISO 3977-2:2023 Gas turbines — Procurement — Part 2: Standard reference conditions and ratings",
   "ISO",
   "第 2 版、2023 年 3 月",
   "第16章"
  ],
  [
   "規格・仕様",
   "ISO 3977-2:1997（サンプルページ）",
   "ISO（サンプルの写しを置く配信サイト）",
   "第 1 版、1997 年 6 月 15 日",
   "第16章"
  ],
  [
   "規格・仕様",
   "ISO 20816-2:2017 Mechanical vibration — Part 2",
   "国際標準化機構（ISO）",
   "第 1 版、2017 年 7 月（2023 年に確認。追補 Amd 1:2024 あり）",
   "第15章"
  ],
  [
   "規格・仕様",
   "ISO 2314:2009 Gas turbines — Acceptance tests（公開された写し）",
   "国際標準化機構（ISO）",
   "2009 年版。写しは購入した正式版ではない",
   "第14章"
  ],
  [
   "規格・仕様",
   "ISO 6976:2016 Natural gas — Calculation of calorific values, density, relative density and Wobbe indices from composition",
   "国際標準化機構（ISO）",
   "第3版、2016 年 8 月",
   "第05章"
  ],
  [
   "規格・仕様",
   "IEC 60034-1:2022 Rotating electrical machines — Part 1: Rating and performance",
   "国際電気標準会議（IEC）",
   "第14版、2022 年 2 月 14 日発行",
   "第22章"
  ],
  [
   "規格・仕様",
   "STB1-2016 火力設備配管減肉管理技術規格 2016年版",
   "日本機械学会",
   "2016 年版（発行 2017 年 3 月）",
   "第19章"
  ],
  [
   "規格・仕様",
   "日本機械学会蒸気表（書誌）",
   "日本機械学会編（国立国会図書館サーチの書誌）",
   "第 5 版、1999 年",
   "第08章"
  ],
  [
   "規格・仕様",
   "JIS B 0127:2022 火力発電用語－蒸気タービン及び附属装置（概要ページ）",
   "日本産業標準調査会・日本規格協会",
   "1970 年 9 月 1 日制定、2022 年 11 月 21 日改正",
   "第06章"
  ],
  [
   "規格・仕様",
   "JIS B 0130:2019 火力発電用語－一般（概要ページ）",
   "日本産業標準調査会・日本規格協会",
   "1974 年 8 月 1 日制定、2019 年 9 月 20 日改正",
   "第06章"
  ],
  [
   "規格・仕様",
   "JIS B 8040:2018 ガスタービン及び附属装置－用語（公開プレビュー）",
   "日本規格協会（日本）",
   "制定 2005 年 3 月 20 日、改正 2018 年 5 月 21 日",
   "第11章"
  ],
  [
   "団体の資料",
   "International Gas Turbine Institute (IGTI)",
   "ASME（米国）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第11章"
  ],
  [
   "団体の資料",
   "About ENTSO-E",
   "ENTSO-E",
   "日付の記載なし",
   "第01章"
  ],
  [
   "団体の資料",
   "Requirements for Generators",
   "ENTSO-E（欧州送電系統運用者ネットワーク）",
   "更新日の記載なし",
   "第22章"
  ],
  [
   "団体の資料",
   "Global Electricity Review 2026（Electricity demand and supply trends）",
   "Ember",
   "ページの最終更新 2026 年 6 月 22 日",
   "序章1"
  ],
  [
   "団体の資料",
   "Leading three manufacturers providing two-thirds of turbines for gas-fired power plants under construction",
   "Global Energy Monitor",
   "2024 年 8 月",
   "第27章"
  ],
  [
   "団体の資料",
   "2023 GADS Data Reporting Instructions, Appendix F: Performance Indexes and Equations",
   "NERC",
   "2023 年 1 月の版",
   "第24章"
  ],
  [
   "団体の資料",
   "超耐熱合金のジェットエンジンへの応用（企画特集）",
   "NanotechJapan Bulletin（nano tech との企画連載）",
   "Vol.7 No.6、2014 年",
   "第14章"
  ],
  [
   "団体の資料",
   "About Us",
   "Wassenaar Arrangement",
   "確認 2026 年 11 月",
   "第27章"
  ],
  [
   "団体の資料",
   "List of Dual-Use Goods and Technologies and Munitions List（2025 Corr.）",
   "Wassenaar Arrangement",
   "WA-LIST (25) 1 Corr.、2026 年 1 月 15 日",
   "第27章"
  ],
  [
   "団体の資料",
   "組織概要",
   "一般社団法人送配電網協議会",
   "日付の記載なし（本文中の最新の日付は 2026 年 10 月 14 日現在）",
   "第01章"
  ],
  [
   "団体の資料",
   "World LNG Report 2026（プレスリリース）",
   "国際ガス連盟（IGU）",
   "2026 年 7 月 7 日",
   "第05章"
  ],
  [
   "団体の資料",
   "Incoterms rules 2010",
   "国際商業会議所（ICC）",
   "2010 年版",
   "第05章"
  ],
  [
   "団体の資料",
   "日本ガスタービン学会誌 Vol.45 No.4（2017 年 7 月）の論文",
   "日本ガスタービン学会",
   "2017 年 7 月",
   "第11章"
  ],
  [
   "団体の資料",
   "日本ガスタービン学会誌 Vol.46 No.2 の論文（淀み点保炎噴霧燃焼器の排気性能…）",
   "日本ガスタービン学会",
   "2018 年 3 月",
   "第13章"
  ],
  [
   "団体の資料",
   "軸流圧縮機の旋回失速初生における非定常流動現象ほか（日本ガスタービン学会誌 Vol.39 No.2）",
   "日本ガスタービン学会",
   "2011 年 3 月",
   "第12章"
  ],
  [
   "団体の資料",
   "ガスタービンとは？",
   "日本ガスタービン学会（日本）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第11章・第12章・第13章"
  ],
  [
   "団体の資料",
   "取引概要",
   "日本卸電力取引所",
   "日付の記載なし",
   "第04章"
  ],
  [
   "団体の資料",
   "沿革",
   "日本卸電力取引所",
   "日付の記載なし",
   "第04章"
  ],
  [
   "団体の資料",
   "セラミック遮熱コーティングの内部応力に対する界面粗さの影響",
   "日本材料学会『材料』",
   "Vol.53 No.9、2004 年 9 月",
   "第14章"
  ],
  [
   "団体の資料",
   "系統連系規程（JEAC 9701-2024）",
   "日本電気協会",
   "2024 年版、発刊 2024 年 9 月 30 日、第 29 回改定",
   "第22章"
  ],
  [
   "団体の資料",
   "Special Report on Carbon dioxide Capture and Storage, Chapter 3: Capture of CO2",
   "気候変動に関する政府間パネル（IPCC）",
   "2005 年",
   "第29章"
  ],
  [
   "団体の資料",
   "取引規程（需給調整市場）",
   "送配電網協議会",
   "2021 年 4 月 1 日改定・実施",
   "第04章"
  ],
  [
   "団体の資料",
   "系統特性定数について",
   "送配電網協議会（OCCTO 第2回将来の運用容量等の在り方に関する作業会 資料3-1）",
   "2024 年 8 月 29 日",
   "第02章"
  ],
  [
   "団体の資料",
   "需給調整市場の運用開始について",
   "送配電網協議会（第 22 回需給調整市場検討小委員会 資料 4）",
   "2021 年 3 月 30 日",
   "第04章"
  ],
  [
   "企業の資料",
   "Ansaldo Energia Group Fit for Transition（Company Profile）",
   "Ansaldo Energia",
   "年の記載なし",
   "第27章"
  ],
  [
   "企業の資料",
   "Ansaldo Energia presents the new GT36 Gas turbine",
   "Ansaldo Energia",
   "2020 年 11 月 17 日",
   "第17章"
  ],
  [
   "企業の資料",
   "Contacts",
   "Ansaldo Energia",
   "確認 2026 年 11 月",
   "第27章"
  ],
  [
   "企業の資料",
   "THE GAS TURBINE: GT36",
   "Ansaldo Energia",
   "ブローシャ末尾の表示「202403」",
   "第17章"
  ],
  [
   "企業の資料",
   "Energy（Chromalloy）",
   "Chromalloy",
   "確認 2026 年 11 月",
   "第27章"
  ],
  [
   "企業の資料",
   "History",
   "Doosan Enerbility",
   "確認 2026 年 11 月",
   "第27章"
  ],
  [
   "企業の資料",
   "GE Board of Directors Approves Spin-Off of GE Vernova",
   "GE",
   "2024 年 2 月 29 日",
   "第17章"
  ],
  [
   "企業の資料",
   "GEのHAガスタービン、発電効率で２度目の世界記録をサポート",
   "GE Power（発表の時点の名称）",
   "2018 年 3 月 27 日",
   "第09章"
  ],
  [
   "企業の資料",
   "HA Technology Now Available at Industry-First 64 Percent Efficiency",
   "GE Power（米国。発表の時点の名称）",
   "2017 年 12 月 4 日",
   "第09章"
  ],
  [
   "企業の資料",
   "7HA gas turbine",
   "GE Vernova",
   "ページに日付なし（確認 2026 年 11 月）",
   "序章1・第16章・第17章"
  ],
  [
   "企業の資料",
   "Aeroderivative gas turbine repair and maintenance",
   "GE Vernova",
   "日付なし",
   "第17章"
  ],
  [
   "企業の資料",
   "GE Vernova Q2 2026 webcast transcript",
   "GE Vernova",
   "2026 年 7 月 22 日の説明会",
   "第27章"
  ],
  [
   "企業の資料",
   "GE Vernova completes spin-off and begins trading on the New York Stock Exchange",
   "GE Vernova",
   "2024 年 4 月 2 日",
   "第27章"
  ],
  [
   "企業の資料",
   "GE Vernova reports strong third quarter 2026 financial performance",
   "GE Vernova",
   "2026 年 10 月 28 日",
   "第27章"
  ],
  [
   "企業の資料",
   "GE Vernova to invest almost $600 million in U.S. factories and facilities over next two years",
   "GE Vernova",
   "2025 年 1 月 29 日",
   "第27章"
  ],
  [
   "企業の資料",
   "LM6000",
   "GE Vernova",
   "日付なし",
   "第17章"
  ],
  [
   "企業の資料",
   "Q2 2026 webcast transcript",
   "GE Vernova",
   "2026 年 7 月 22 日の説明会",
   "第31章"
  ],
  [
   "企業の資料",
   "Steam turbines：600 series",
   "GE Vernova",
   "日付の表示なし（© 2026）",
   "第20章"
  ],
  [
   "企業の資料",
   "The evolution of the HA gas turbines",
   "GE Vernova",
   "2025 年 4 月 2 日",
   "第17章"
  ],
  [
   "企業の資料",
   "7HA ガスタービン（製品ページ）",
   "GE Vernova（米国）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第11章・第13章"
  ],
  [
   "企業の資料",
   "GE Vernova Hydrogen Overview",
   "GE Vernova（米国）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第29章"
  ],
  [
   "企業の資料",
   "GE Vernova completes spin-off and begins trading on the New York Stock Exchange",
   "GE Vernova（米国）",
   "2024 年 4 月 2 日",
   "第09章"
  ],
  [
   "企業の資料",
   "Heavy-Duty Gas Turbine Operating and Maintenance Considerations（GER-3620P）",
   "GE Vernova（米国）",
   "2021 年 3 月（Rev P）",
   "第12章・第15章"
  ],
  [
   "企業の資料",
   "Mark VIe Static Starter（LS2100e）",
   "GE Vernova（米国）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第15章"
  ],
  [
   "企業の資料",
   "OpFlex AutoTune for F-class（製品ページ）",
   "GE Vernova（米国）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第13章"
  ],
  [
   "企業の資料",
   "Commercial Operation Begins at Anegasaki Thermal Power Station New Unit 3",
   "JERA",
   "2023 年 8 月 1 日",
   "第18章"
  ],
  [
   "企業の資料",
   "NEXT ACC brochure",
   "NEXT（CIC Group Inc. のサイトで公開）",
   "日付の表示なし",
   "第21章"
  ],
  [
   "企業の資料",
   "Heat Recovery Steam Generators – HRSG's",
   "NOOTER/ERIKSEN（CIC Group Inc.）",
   "ページの最終更新 2025 年 2 月 10 日",
   "第19章"
  ],
  [
   "企業の資料",
   "About",
   "SSS Gears Limited",
   "確認 2026 年 11 月",
   "第18章"
  ],
  [
   "企業の資料",
   "Joetsu Thermal Power Station Unit 1",
   "SSS Gears Limited",
   "確認 2026 年 11 月",
   "第18章"
  ],
  [
   "企業の資料",
   "Aeroderivative, Industrial and Heavy-Duty Gas Turbines",
   "Siemens Energy",
   "日付なし",
   "第17章"
  ],
  [
   "企業の資料",
   "Benson heat recovery steam generators（flyer）",
   "Siemens Energy",
   "著作権表示 2021 年",
   "第19章"
  ],
  [
   "企業の資料",
   "Earnings Release Q4 FY 2026",
   "Siemens Energy",
   "2026 年 11 月 11 日",
   "第27章"
  ],
  [
   "企業の資料",
   "Gas turbines at combined-cycle power plants（technical data）",
   "Siemens Energy",
   "ファイル名に 250121。確認 2026 年 11 月",
   "第18章"
  ],
  [
   "企業の資料",
   "Initial Listing of Siemens Energy",
   "Siemens Energy",
   "2020 年 9 月 28 日",
   "第27章"
  ],
  [
   "企業の資料",
   "SGT-A35 aeroderivative gas turbine",
   "Siemens Energy",
   "ページ表示の日付 2026 年 9 月 21 日",
   "第17章"
  ],
  [
   "企業の資料",
   "SGT5-9000HL",
   "Siemens Energy",
   "ページ表示の日付 2026 年 8 月 5 日",
   "第17章"
  ],
  [
   "企業の資料",
   "Siemens Energy is investing $1 billion and creating highly skilled jobs in the United States",
   "Siemens Energy",
   "2026 年 2 月 3 日",
   "第27章"
  ],
  [
   "企業の資料",
   "Siemens Energy is starting preparations for business area Transformation of Industry to become a standalone company",
   "Siemens Energy",
   "2026 年 8 月 25 日",
   "第27章"
  ],
  [
   "企業の資料",
   "Siemens Energy's debut on the stock market",
   "Siemens Energy",
   "2020 年 9 月 28 日",
   "第17章"
  ],
  [
   "企業の資料",
   "Utility steam turbines",
   "Siemens Energy",
   "ページ表示の日付 2026 年 8 月 5 日",
   "第18章・第20章"
  ],
  [
   "企業の資料",
   "SGT5-8000H、SGT6-5000F（製品ページ）",
   "Siemens Energy（ドイツ）",
   "ページの日付 2026 年 8 月（メタデータ）",
   "第13章"
  ],
  [
   "企業の資料",
   "SGT5-8000H（製品ページ）",
   "Siemens Energy（ドイツ）",
   "ページの日付 2026 年 8 月（メタデータ）",
   "第11章"
  ],
  [
   "企業の資料",
   "SGT6-5000F（製品ページ）",
   "Siemens Energy（ドイツ）",
   "ページの日付 2026 年 8 月（メタデータ）",
   "第11章・第12章・第15章"
  ],
  [
   "企業の資料",
   "Turbine Bypass System",
   "ValvTechnologies, Inc.",
   "2018 年 6 月",
   "第20章"
  ],
  [
   "企業の資料",
   "ひびき発電所の営業運転開始に関する発表",
   "ひびき発電合同会社・九州電力株式会社・西部ガス株式会社",
   "2026 年 3 月 31 日",
   "第26章"
  ],
  [
   "企業の資料",
   "柱上変圧器（用語解説）",
   "パナソニック",
   "日付の記載なし",
   "序章1"
  ],
  [
   "企業の資料",
   "三菱パワーを三菱重工に統合",
   "三菱パワー",
   "2021 年 5 月 10 日",
   "第27章"
  ],
  [
   "企業の資料",
   "三菱日立パワーシステムズ株式会社が「三菱パワー株式会社」に社名を変更",
   "三菱パワー",
   "2020 年 9 月 1 日",
   "第27章"
  ],
  [
   "企業の資料",
   "2026年度第1四半期決算説明資料",
   "三菱重工業",
   "2026 年 8 月 4 日",
   "第27章"
  ],
  [
   "企業の資料",
   "Corporate Profile",
   "三菱重工業",
   "確認 2026 年 11 月",
   "第17章・第27章"
  ],
  [
   "企業の資料",
   "M501J Series",
   "三菱重工業",
   "日付なし。確認 2026 年 11 月",
   "第18章"
  ],
  [
   "企業の資料",
   "ガスタービン・コンバインドサイクル発電プラント",
   "三菱重工業",
   "資料番号 METP-11GT01J1-E-0（版 1.0）、ページ上の表記 26-01",
   "第30章"
  ],
  [
   "企業の資料",
   "水素・アンモニアのバリューチェーン",
   "三菱重工業",
   "日付の記載なし（2026 年 11 月に確認）",
   "第29章"
  ],
  [
   "企業の資料",
   "高砂水素パークの発表",
   "三菱重工業",
   "2023 年 9 月 20 日",
   "第29章"
  ],
  [
   "企業の資料",
   "1600℃級Ｊ形技術を適用した発電用高効率ガスタービンの開発",
   "三菱重工業（日本）",
   "三菱重工技報 Vol.50 No.3、2013 年",
   "第12章・第13章・第14章・第15章"
  ],
  [
   "企業の資料",
   "2023年にガスタービン世界市場でシェア1位を獲得 市場調査レポート（米国マッコイ・パワー・レポート）により明らかに",
   "三菱重工業（日本）",
   "2024 年 3 月 15 日",
   "第09章"
  ],
  [
   "企業の資料",
   "J形ガスタービンの運転実績をふまえた 1650℃級 JAC形ガスタービンの開発",
   "三菱重工業（日本）",
   "三菱重工技報 Vol.56 No.3、2019 年",
   "第11章"
  ],
  [
   "企業の資料",
   "会社概要",
   "三菱重工業（日本）",
   "2026 年 11 月に確認",
   "第09章"
  ],
  [
   "企業の資料",
   "高砂水素パークでの水素混焼の実証（発表）",
   "三菱重工業（日本）",
   "2023 年 11 月 30 日",
   "第29章"
  ],
  [
   "企業の資料",
   "M501J Series",
   "三菱重工業（製品ページの表記は Mitsubishi Power）",
   "ページに日付なし（確認 2026 年 11 月）",
   "第16章・第17章"
  ],
  [
   "企業の資料",
   "発電システム：タービン発電機",
   "三菱電機",
   "日付の記載なし（確認 2026 年 11 月）",
   "第22章"
  ],
  [
   "企業の資料",
   "五井火力発電所と合同会社の概要",
   "九州電力のサイトで公開された資料（発行者・日付の記載なし）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第09章"
  ],
  [
   "企業の資料",
   "需給運用ルール",
   "九州電力送配電（文書に発行者名の明記なし。掲載先の九州電力のサイトと、本文の「中国電力ネットワーク供給区域と関門連系線で連系」の記述から判断）",
   "実施日の記載なし（確認 2026 年 11 月）",
   "第02章"
  ],
  [
   "企業の資料",
   "ガスタービン",
   "川崎重工業",
   "確認 2026 年 11 月",
   "第27章"
  ],
  [
   "企業の資料",
   "会社概要",
   "川崎重工業",
   "確認 2026 年 11 月",
   "第27章"
  ],
  [
   "企業の資料",
   "お問い合わせ",
   "東京電力パワーグリッド",
   "日付の記載なし",
   "第01章"
  ],
  [
   "企業の資料",
   "受給契約(FIT)高圧・特別高圧 新増設に関するお申込みの流れ",
   "東京電力パワーグリッド",
   "申込書の更新 2026 年 3 月 25 日",
   "第01章"
  ],
  [
   "企業の資料",
   "周波数調整・需給運用ルール",
   "東京電力パワーグリッド",
   "2016 年 4 月 1 日施行、2026 年 4 月 1 日改定",
   "第02章"
  ],
  [
   "企業の資料",
   "流通設備計画ルール",
   "東京電力パワーグリッド",
   "2026 年 7 月 1 日改定",
   "序章1・第01章"
  ],
  [
   "企業の資料",
   "系統連系に係る設備設計について ＜発電設備（特別高圧）＞",
   "東京電力パワーグリッド",
   "2024 年 6 月 14 日実施",
   "第22章"
  ],
  [
   "企業の資料",
   "配電線",
   "東京電力パワーグリッド",
   "日付の記載なし",
   "序章1・第01章"
  ],
  [
   "企業の資料",
   "電力流通設備の概要について",
   "東京電力パワーグリッド",
   "2026 年 10 月",
   "序章1"
  ],
  [
   "企業の資料",
   "需要と供給のバランスについて",
   "東京電力パワーグリッド",
   "日付の記載なし（確認 2026 年 11 月）",
   "第02章"
  ],
  [
   "企業の資料",
   "柏崎刈羽原子力発電所 発電所の概要",
   "東京電力ホールディングス",
   "日付の記載なし（確認 2026 年 11 月）",
   "序章1"
  ],
  [
   "企業の資料",
   "上越火力発電所１号機の営業運転開始について",
   "東北電力",
   "2022 年 12 月 1 日",
   "序章1・第18章"
  ],
  [
   "企業の資料",
   "姫路第二発電所",
   "関西電力",
   "日付なし。確認 2026 年 11 月",
   "序章1・第18章"
  ],
  [
   "企業の資料",
   "姫路第二発電所のコンバインドサイクル発電方式への設備更新について",
   "関西電力",
   "2009 年 2 月 26 日",
   "第18章"
  ],
  [
   "企業の資料",
   "電気のコントロールセンター「中央給電指令所」",
   "関西電力送配電",
   "日付の記載なし",
   "第01章"
  ],
  [
   "当局・公的機関",
   "Combustion Turbine NOx Control Technologies Memo",
   "EPA の委託調査（ERG・Sargent & Lundy 作成、米国）",
   "2022 年 1 月（Rev. 1）",
   "第13章"
  ],
  [
   "当局・公的機関",
   "Directive (EU) 2023/959",
   "EUR-Lex",
   "2023 年 5 月 10 日付、官報 2023 年 5 月 16 日",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Directive (EU) 2024/1785",
   "EUR-Lex",
   "2024 年 4 月 24 日付、官報 2024 年 7 月 15 日",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Wholesale Electricity Markets: Overview and Guide",
   "FERC（米国）",
   "日付の記載なし",
   "第01章"
  ],
  [
   "当局・公的機関",
   "Electricity supply（Global Energy Review 2026）",
   "IEA",
   "2026 年版（公表月の記載なし）",
   "第03章"
  ],
  [
   "当局・公的機関",
   "Turbine Engine Thermodynamic Cycle - Brayton Cycle",
   "NASA Glenn Research Center",
   "最終更新 2021 年 5 月 13 日",
   "第07章"
  ],
  [
   "当局・公的機関",
   "アンモニア専焼ガスタービンの実証（NEDO の資料）",
   "NEDO",
   "日付の記載なし（2026 年 11 月に確認）",
   "第29章"
  ],
  [
   "当局・公的機関",
   "アンモニア混焼の実証試験の開始",
   "NEDO・JERA・IHI（日本）",
   "2024 年 4 月 1 日",
   "第29章"
  ],
  [
   "当局・公的機関",
   "Annual Report on the Operation of the Capacity Market in 2025-26",
   "Ofgem（英国）",
   "2026 年 9 月 10 日公表",
   "第04章"
  ],
  [
   "当局・公的機関",
   "Capacity Market (RPM)",
   "PJM",
   "日付の記載なし",
   "第04章"
  ],
  [
   "当局・公的機関",
   "大気汚染防止法施行令",
   "e-Gov 法令検索",
   "現行（取得した条文の改正の記載の最後は令和3年政令第275号）",
   "第28章"
  ],
  [
   "当局・公的機関",
   "大気汚染防止法施行規則（昭和四十六年厚生省・通商産業省令第一号）",
   "e-Gov 法令検索",
   "現行",
   "第28章"
  ],
  [
   "当局・公的機関",
   "電気事業法（昭和三十九年法律第百七十号）",
   "e-Gov 法令検索",
   "現行（最終改正は取得した範囲に表示なし）",
   "第25章・第26章・第28章"
  ],
  [
   "当局・公的機関",
   "電気事業法（昭和三十九年法律第百七十号）",
   "e-Gov 法令検索（デジタル庁）",
   "確認日の現行の条文。最終改正の施行日は取得したデータで確かめられなかった（附則に令和8年法律第68号）",
   "第01章・第04章・第31章"
  ],
  [
   "当局・公的機関",
   "職場のあんぜんサイト：アンモニア",
   "厚生労働省",
   "改訂日 2025 年 3 月 14 日",
   "第19章"
  ],
  [
   "当局・公的機関",
   "ボイラー及び圧力容器安全規則",
   "厚生労働省（昭和 47 年労働省令第 33 号）",
   "令和 8 年の改正の注記がある版（確認 2026 年 11 月）",
   "第19章"
  ],
  [
   "当局・公的機関",
   "議案の情報：脱炭素成長型経済構造への円滑な移行のための低炭素水素等の供給及び利用の促進に関する法律案",
   "参議院",
   "第213回国会",
   "第29章"
  ],
  [
   "当局・公的機関",
   "Key Questions on Energy and AI（The AI and energy nexus continues to evolve rapidly）",
   "国際エネルギー機関（IEA）",
   "公表日の記載なし（2026 年のデータを含む）",
   "第30章"
  ],
  [
   "当局・公的機関",
   "4 規制・指導基準【窒素酸化物】",
   "東京都環境局のサイトのページ（ページに発行者の明記なし）",
   "日付の記載なし（2026 年 11 月に確認）",
   "第10章"
  ],
  [
   "当局・公的機関",
   "About the EU ETS",
   "欧州委員会",
   "執筆時に確認（ページの更新日は再確認できず）",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Questions and answers on the EU Emissions Trading System (EU ETS) review",
   "欧州委員会",
   "2026 年 7 月 17 日（Brussels）",
   "第28章"
  ],
  [
   "当局・公的機関",
   "ばいじんと NOx の排出基準値一覧",
   "環境省",
   "更新日の表示なし",
   "第28章"
  ],
  [
   "当局・公的機関",
   "令和5年度 家庭部門のCO2排出実態統計調査 結果について（確報値）",
   "環境省",
   "令和 7 年 6 月（確報値、2023 年度）",
   "序章1"
  ],
  [
   "当局・公的機関",
   "制度概要（温室効果ガス排出量 算定・報告・公表制度）",
   "環境省",
   "更新日の表示なし",
   "第28章"
  ],
  [
   "当局・公的機関",
   "工場及び事業場から排出される大気汚染物質に対する規制方式とその概要",
   "環境省",
   "更新日の表示なし",
   "第28章"
  ],
  [
   "当局・公的機関",
   "算定・報告・公表制度 排出係数一覧",
   "環境省",
   "版・年度は確認できず（ファイル名は ichiran_2025）",
   "第10章"
  ],
  [
   "当局・公的機関",
   "CCS 技術の動向調査（環境省のウェブサイトの資料）",
   "環境省ウェブサイト掲載（作成者・日付の記載なし）",
   "表の出典は高木（2012 年）",
   "第29章"
  ],
  [
   "当局・公的機関",
   "二酸化炭素の貯留事業に関する法律の施行に関する発表",
   "環境省（日本）",
   "2026 年 4 月 24 日",
   "第29章"
  ],
  [
   "当局・公的機関",
   "発電コスト検証に関するとりまとめ",
   "発電コスト検証ワーキンググループ（資源エネルギー庁）",
   "令和 7 年 2 月 6 日",
   "第04章"
  ],
  [
   "当局・公的機関",
   "洋上風力発電の導入状況",
   "秋田県",
   "2025 年 10 月 3 日現在",
   "序章1"
  ],
  [
   "当局・公的機関",
   "Electricity in the United States",
   "米国エネルギー情報局（EIA）",
   "更新日の記載なし（2025 年の値）",
   "第03章"
  ],
  [
   "当局・公的機関",
   "Many newer power plants have cooling systems that reuse water",
   "米国エネルギー情報局（EIA）",
   "2014 年 2 月 11 日",
   "第21章"
  ],
  [
   "当局・公的機関",
   "Some U.S. electricity generating plants use dry cooling",
   "米国エネルギー情報局（EIA）",
   "2018 年 8 月 29 日",
   "第21章"
  ],
  [
   "当局・公的機関",
   "NIST Guide to the SI, Chapter 5: Units Outside the SI",
   "米国国立標準技術研究所（NIST）",
   "公表 2016 年 1 月 28 日、更新 2025 年 12 月 8 日",
   "第06章"
  ],
  [
   "当局・公的機関",
   "AP-42 Section 3.1 Stationary Gas Turbines",
   "米国環境保護庁（EPA、米国）",
   "2000 年 4 月（Fifth Edition, Supplement F）",
   "第13章"
  ],
  [
   "当局・公的機関",
   "Air Pollution Control Technology Fact Sheet：Selective Catalytic Reduction (SCR)",
   "米国環境保護庁（EPA）",
   "資料番号 EPA-452/F-03-032（日付の表示なし）",
   "第19章"
  ],
  [
   "当局・公的機関",
   "Combustion Turbine NOx Control Technologies",
   "米国環境保護庁（EPA）のサイトで公開された覚書",
   "2022 年 1 月",
   "第10章"
  ],
  [
   "当局・公的機関",
   "Partial Repeal of the Carbon Pollution Standards for Fossil Fuel-Fired Electric Generating Units",
   "米国環境保護庁（Federal Register）",
   "2026 年 9 月 17 日、効力発生 2026 年 11 月 16 日（再確認 2026 年 11 月 15 日）",
   "第28章"
  ],
  [
   "当局・公的機関",
   "Rescission of the Greenhouse Gas Findings for Fossil Fuel-Fired Power Plants and Repeal of Regulations …",
   "米国環境保護庁（Federal Register）",
   "2026 年 9 月 17 日（提案）",
   "第28章"
  ],
  [
   "当局・公的機関",
   "「電気事業法の一部を改正する法律案」が成立しました",
   "経済産業省",
   "2026 年 7 月 21 日の発表",
   "第04章"
  ],
  [
   "当局・公的機関",
   "「電気事業法の一部を改正する法律案」が閣議決定されました",
   "経済産業省",
   "2026 年 3 月 24 日の発表",
   "第04章"
  ],
  [
   "当局・公的機関",
   "安全保障貿易管理ガイダンス［入門編］",
   "経済産業省",
   "第 3.0 版、令和 8 年 3 月",
   "第27章"
  ],
  [
   "当局・公的機関",
   "排出量取引制度",
   "経済産業省",
   "最終更新 2026 年 11 月 4 日",
   "第28章"
  ],
  [
   "当局・公的機関",
   "発電所に係る環境影響評価の手引 参考資料（Ⅰ．水温への影響評価について）",
   "経済産業省",
   "発行日の表示なし",
   "第21章"
  ],
  [
   "当局・公的機関",
   "発電所に係る環境影響評価の手引 第1章",
   "経済産業省",
   "確認 2026 年 11 月",
   "第31章"
  ],
  [
   "当局・公的機関",
   "発電所に係る環境影響評価の手引 第1章 環境影響評価の手続",
   "経済産業省",
   "日付は取得した範囲に記載なし",
   "第28章"
  ],
  [
   "当局・公的機関",
   "電気工事士",
   "経済産業省",
   "最終更新 2026 年 4 月 24 日",
   "序章2"
  ],
  [
   "当局・公的機関",
   "発電所に係る環境影響評価の手引",
   "経済産業省 産業保安グループ 電力安全課",
   "令和6年2月",
   "第28章"
  ],
  [
   "当局・公的機関",
   "発電所に係る環境影響評価の手引（目次）",
   "経済産業省 産業保安グループ 電力安全課",
   "令和 2 年 11 月",
   "第21章"
  ],
  [
   "当局・公的機関",
   "自家用電気工作物におけるサイバーセキュリティ対策について",
   "経済産業省 産業保安グループ 電力安全課（関東東北産業保安監督部のサイトに掲載）",
   "令和 4 年 9 月",
   "第23章"
  ],
  [
   "当局・公的機関",
   "広報（ガス保安）",
   "経済産業省 産業保安・安全グループ ガス安全室",
   "更新日の記載なし（確認 2026 年 11 月）",
   "第05章"
  ],
  [
   "当局・公的機関",
   "感電死傷事故を防ぐのは「あなた」です！（自家用電気工作物設置者・管理者向け）",
   "経済産業省 関東東北産業保安監督部、電気安全関東委員会",
   "2022 年 3 月",
   "第22章"
  ],
  [
   "当局・公的機関",
   "エネルギーと技術（技術分野）p.48-51",
   "経済産業省のエネルギー教育のサイトに掲載（発行者名は掲載ページから特定できない）",
   "日付の記載なし",
   "序章2・第01章"
  ],
  [
   "当局・公的機関",
   "エネルギー動向（2025年6月版）第13-1-10「LNGの輸入先（2023年度）」",
   "経済産業省・資源エネルギー庁",
   "2025 年 6 月版",
   "第05章"
  ],
  [
   "当局・公的機関",
   "エネルギー基本計画（平成26年4月）",
   "経済産業省・資源エネルギー庁",
   "平成 26 年 4 月",
   "第03章"
  ],
  [
   "当局・公的機関",
   "第1章 第4節 二次エネルギーの動向（エネルギー動向 2026年版）",
   "経済産業省・資源エネルギー庁",
   "2026 年版（公表日の記載なし）",
   "第03章"
  ],
  [
   "当局・公的機関",
   "エネルギー動向（2026年版）第1部 第13-1-10「LNGの輸入先（2024年度）」ほか",
   "経済産業省・資源エネルギー庁（図の出典は財務省『日本貿易統計』）",
   "2026 年 6 月版",
   "第05章"
  ],
  [
   "当局・公的機関",
   "政令案の要綱（低炭素水素等の法律）",
   "経済産業省（日本）",
   "2024 年 10 月",
   "第29章"
  ],
  [
   "当局・公的機関",
   "脱炭素成長型経済構造への円滑な移行の推進に関する法律及び資源の有効な利用の促進に関する法律の一部を改正する法律",
   "衆議院",
   "令和7年法律第52号、令和7年6月4日公布",
   "第28章"
  ],
  [
   "当局・公的機関",
   "GX-ETS における発電ベンチマークについて",
   "資源エネルギー庁",
   "2025 年 12 月 17 日",
   "第28章"
  ],
  [
   "当局・公的機関",
   "エネルギー源別標準発熱量・炭素排出係数（2018年度改訂）の解説",
   "資源エネルギー庁",
   "2020 年 1 月（2022 年 11 月更新）",
   "第09章"
  ],
  [
   "当局・公的機関",
   "ディマンド・リスポンス（DR）について",
   "資源エネルギー庁",
   "最終更新 2022 年 6 月 29 日",
   "第03章"
  ],
  [
   "当局・公的機関",
   "ベースロード市場ガイドライン（案）",
   "資源エネルギー庁",
   "策定 2019 年 3 月 19 日、改定を重ねる（案）",
   "第03章"
  ],
  [
   "当局・公的機関",
   "令和6年度（2024年度）におけるエネルギー需給実績（確報）",
   "資源エネルギー庁",
   "令和 8 年 4 月",
   "序章1・第03章"
  ],
  [
   "当局・公的機関",
   "再生可能エネルギー出力制御の長期見通し等について",
   "資源エネルギー庁",
   "2026 年 3 月 16 日",
   "第30章"
  ],
  [
   "当局・公的機関",
   "火力政策をめぐる議論の動向について",
   "資源エネルギー庁",
   "2021 年 12 月 14 日（資料4）",
   "第03章"
  ],
  [
   "当局・公的機関",
   "発電事業に係る届出義務についてQ&A",
   "資源エネルギー庁",
   "日付の記載なし",
   "第04章"
  ],
  [
   "当局・公的機関",
   "発電事業届出書等の記載要領",
   "資源エネルギー庁",
   "平成 28 年 3 月制定、令和 8 年 2 月改正",
   "第04章"
  ],
  [
   "当局・公的機関",
   "省エネ法に関する措置について（工場等判断基準 WG 資料3）",
   "資源エネルギー庁",
   "2025 年 9 月 2 日",
   "第28章"
  ],
  [
   "当局・公的機関",
   "第2節 エネルギーコスト低減のための資源調達条件の改善等（エネルギー白書2022）",
   "資源エネルギー庁",
   "令和 3 年度版",
   "第05章"
  ],
  [
   "当局・公的機関",
   "第3部 第6章 第1節 電力システム改革の推進（エネルギー白書2023）",
   "資源エネルギー庁",
   "令和 4 年度エネルギーに関する年次報告",
   "第01章"
  ],
  [
   "当局・公的機関",
   "調査の概要（総合エネルギー統計補足調査〔電気事業者の発電量内訳等調査〕）",
   "資源エネルギー庁",
   "最終更新 2026 年 10 月 15 日",
   "第06章"
  ],
  [
   "当局・公的機関",
   "非効率石炭火力発電をどうする？フェードアウトへ向けた取り組み",
   "資源エネルギー庁",
   "2020 年 11 月 6 日",
   "第08章"
  ],
  [
   "当局・公的機関",
   "2020年、送配電部門の分社化で電気がさらに変わる",
   "資源エネルギー庁（エネこれ）",
   "2017 年 11 月 30 日公開",
   "第01章"
  ],
  [
   "当局・公的機関",
   "知っているようで知らない「蓄電池」",
   "資源エネルギー庁（エネこれ）",
   "2026 年 10 月 8 日",
   "第03章・第30章"
  ],
  [
   "当局・公的機関",
   "電力のピンチを救え！大活躍する「揚水発電」の役割とは？",
   "資源エネルギー庁（エネこれ）",
   "2023 年 11 月 7 日",
   "第03章"
  ],
  [
   "当局・公的機関",
   "電気の安定供給のキーワード「電力需給バランス」とは？ゲームで体験してみよう",
   "資源エネルギー庁（エネこれ）",
   "2019 年 8 月 6 日公開",
   "第02章"
  ],
  [
   "当局・公的機関",
   "2020年度冬期の電力需給ひっ迫・市場価格高騰に係る検証 中間取りまとめ（案）",
   "資源エネルギー庁（第34回電力・ガス基本政策小委員会 資料）",
   "2021 年 4 月 28 日（案の段階）",
   "第05章"
  ],
  [
   "当局・公的機関",
   "電源投資の確保",
   "資源エネルギー庁（総合資源エネルギー調査会 基本政策分科会 資料 3）",
   "2020 年 10 月 16 日",
   "第04章"
  ],
  [
   "当局・公的機関",
   "電源投資の確保",
   "資源エネルギー庁（総合資源エネルギー調査会 基本政策分科会 資料）",
   "2020 年 10 月 16 日",
   "第31章"
  ],
  [
   "当局・公的機関",
   "2024年度向け調整力必要量について",
   "電力広域的運営推進機関",
   "2023 年 12 月 21 日",
   "第03章"
  ],
  [
   "当局・公的機関",
   "2026年度供給計画の取りまとめに関する経済産業大臣への意見について",
   "電力広域的運営推進機関",
   "2026 年 3 月 30 日",
   "第30章"
  ],
  [
   "当局・公的機関",
   "全国及び供給区域ごとの需要想定（2026年度）",
   "電力広域的運営推進機関",
   "2026 年 1 月 21 日公表",
   "序章1・第30章"
  ],
  [
   "当局・公的機関",
   "容量市場 新着情報",
   "電力広域的運営推進機関",
   "最新の項目 2026 年 8 月 6 日",
   "第04章"
  ],
  [
   "当局・公的機関",
   "容量市場メインオークション約定結果（対象実需給年度：2024年度）",
   "電力広域的運営推進機関",
   "2020 年 9 月 14 日",
   "第04章"
  ],
  [
   "当局・公的機関",
   "平成30年北海道胆振東部地震に伴う大規模停電に関する検証委員会の設置及び委員の選定について",
   "電力広域的運営推進機関",
   "2018 年 9 月 19 日",
   "第02章"
  ],
  [
   "当局・公的機関",
   "広域機関とは",
   "電力広域的運営推進機関",
   "日付の記載なし（パンフレット制作 2026 年 6 月）",
   "第01章"
  ],
  [
   "当局・公的機関",
   "広域系統長期方針において定義する用語集（案）",
   "電力広域的運営推進機関",
   "第 22 回広域系統整備委員会 資料 2 別紙 3（日付の記載なし）",
   "第01章"
  ],
  [
   "当局・公的機関",
   "本日の内容（第6回広域系統整備委員会 計画評価及び検証小委員会 資料1）",
   "電力広域的運営推進機関",
   "2025 年 9 月 26 日",
   "第02章"
  ],
  [
   "当局・公的機関",
   "第12回 グリッドコード検討会 資料3-1",
   "電力広域的運営推進機関",
   "2023 年 2 月 27 日",
   "第22章"
  ],
  [
   "当局・公的機関",
   "第4号議案 2025年度 事業報告書（案）",
   "電力広域的運営推進機関",
   "会員の情報は 2026 年 3 月 31 日現在",
   "第01章"
  ],
  [
   "当局・公的機関",
   "系統運用に関する基本用語の解説",
   "電力広域的運営推進機関",
   "2018 年 9 月",
   "第01章"
  ],
  [
   "当局・公的機関",
   "調整力及び需給バランス評価等に関する委員会 定義集",
   "電力広域的運営推進機関",
   "日付の記載なし",
   "第03章"
  ],
  [
   "当局・公的機関",
   "長期脱炭素電源オークション約定結果（応札年度：2023年度）",
   "電力広域的運営推進機関",
   "2024 年 4 月 26 日",
   "第04章"
  ],
  [
   "当局・公的機関",
   "長期脱炭素電源オークション約定結果（応札年度：2025年度）",
   "電力広域的運営推進機関",
   "2026 年 5 月 13 日",
   "第04章"
  ],
  [
   "当局・公的機関",
   "長期脱炭素電源オークション 募集要綱の意見募集 補足説明資料",
   "電力広域的運営推進機関（OCCTO、日本）",
   "2026 年 7 月",
   "第29章"
  ],
  [
   "当局・公的機関",
   "最終報告（資料編）",
   "電力広域的運営推進機関（北海道胆振東部地震に伴う大規模停電に関する検証委員会）",
   "2018 年 12 月 19 日",
   "第02章"
  ],
  [
   "当局・公的機関",
   "中西エリアの周波数品質状況について",
   "電力広域的運営推進機関（第101回調整力及び需給バランス評価等に関する委員会 資料5）",
   "2024 年 9 月 30 日",
   "第02章"
  ],
  [
   "当局・公的機関",
   "2025年度以降の要件化候補 〜フェーズ分類の考え方〜",
   "電力広域的運営推進機関（第18回グリッドコード検討会 資料4）",
   "2024 年 11 月 7 日",
   "第02章"
  ],
  [
   "当局・公的機関",
   "2024年度向け調整力必要量について（一次～三次①）",
   "電力広域的運営推進機関（第44回需給調整市場検討小委員会 資料2）",
   "2023 年 12 月 21 日",
   "第02章"
  ],
  [
   "当局・公的機関",
   "最終報告（概要）（案）",
   "電力広域的運営推進機関（第4回検証委員会 資料3-1）",
   "2018 年 12 月 12 日（案の段階）",
   "第02章"
  ],
  [
   "当局・公的機関",
   "発電設備等に関する系統アクセスの流れ",
   "電力広域的運営推進機関（系統計画部）",
   "2026 年 7 月",
   "第22章・第31章"
  ],
  [
   "当局・公的機関",
   "長期脱炭素電源オークションの制度詳細について（応札年度：2023年度）",
   "電力広域的運営推進機関（説明会資料）",
   "2023 年 9 月公表、2025 年 2 月更新",
   "第04章"
  ],
  [
   "当局・公的機関",
   "需給調整市場検討小委員会における検討状況について（2025年度報告）",
   "電力広域的運営推進機関（調整力及び需給バランス評価等に関する委員会事務局）",
   "2026 年 3 月 16 日",
   "第04章"
  ],
  [
   "教科書・一般知識・他講座",
   "エンクロージャとパッケージ、ケーシングとロータの一般的な説明",
   "—",
   "—",
   "第11章"
  ],
  [
   "教科書・一般知識・他講座",
   "ガスタービンの保守の教科書の一般知識",
   "—",
   "—",
   "第25章"
  ],
  [
   "教科書・一般知識・他講座",
   "ガスタービンの教科書（吸気と排気の系統、外気の条件と出力、劣化の分類）",
   "—",
   "—",
   "第16章"
  ],
  [
   "教科書・一般知識・他講座",
   "ガスタービン・電気機械の教科書（大型の特徴、一軸と二軸、回転数と周波数、減速機）",
   "—",
   "—",
   "第17章"
  ],
  [
   "教科書・一般知識・他講座",
   "タービンの段、冷却の方式（対流・インピンジメント・フィルム）、損傷の形（高温腐食・熱疲労）",
   "—",
   "—",
   "第14章"
  ],
  [
   "教科書・一般知識・他講座",
   "伝熱・ボイラ・水処理の教科書（伝熱面の並び、圧力の段、ピンチとアプローチ、ダクトバーナ、流れ加速型腐食、ブロー）",
   "—",
   "—",
   "第19章"
  ],
  [
   "教科書・一般知識・他講座",
   "出力の制御の意味、蓄電池とガス火力の続けられる時間の性質／計算サーバー講義 第27章",
   "—",
   "—",
   "第30章"
  ],
  [
   "教科書・一般知識・他講座",
   "制御・保護の教科書の一般知識",
   "—",
   "—",
   "第23章"
  ],
  [
   "教科書・一般知識・他講座",
   "天然ガスの成分、液化による体積の減少、ボイルオフガス、ウォッベ指数の定義、FOB と DES の一般的な意味",
   "—",
   "—",
   "第05章"
  ],
  [
   "教科書・一般知識・他講座",
   "復水器・冷却塔の教科書（復水器の構成、冷却水の温度と出力、冷却塔の補給水とブロー、湿球温度、生物の付着）",
   "—",
   "—",
   "第21章"
  ],
  [
   "教科書・一般知識・他講座",
   "水素とアンモニアの燃え方、割合の式（式 19）、化学吸収の説明",
   "—",
   "—",
   "第29章"
  ],
  [
   "教科書・一般知識・他講座",
   "熱力学の教科書（第一法則・第二法則、カルノー効率、熱効率、ヒートレート）",
   "—",
   "—",
   "第06章"
  ],
  [
   "教科書・一般知識・他講座",
   "熱力学・ガスタービンの教科書（断熱効率、比出力、再生・中間冷却・再熱）",
   "—",
   "—",
   "第07章"
  ],
  [
   "教科書・一般知識・他講座",
   "熱力学・蒸気タービンの教科書（ランキンサイクル、飽和・過熱・湿り、再熱、再生）",
   "—",
   "—",
   "第08章"
  ],
  [
   "教科書・一般知識・他講座",
   "熱力学・複合サイクルの教科書（トッピングとボトミング、低位発熱量と高位発熱量）",
   "—",
   "—",
   "第09章"
  ],
  [
   "教科書・一般知識・他講座",
   "燃焼器の形と部分、拡散燃焼と予混合燃焼、燃焼振動・逆火・吹き消えの説明、燃焼調整の考え方",
   "—",
   "—",
   "第13章"
  ],
  [
   "教科書・一般知識・他講座",
   "燃焼工学・化学の教科書（メタンの燃焼、理論空気量、空気比、プロンプト NOx、一酸化炭素）",
   "—",
   "—",
   "第10章"
  ],
  [
   "教科書・一般知識・他講座",
   "発電所の建設と試運転の一般知識",
   "—",
   "—",
   "第26章"
  ],
  [
   "教科書・一般知識・他講座",
   "発電設備の運転の教科書の一般知識",
   "—",
   "—",
   "第24章"
  ],
  [
   "教科書・一般知識・他講座",
   "蒸気タービンの教科書（衝動段と反動段、再熱と湿り、最終段の翼と排気損失、熱応力、グランド蒸気）",
   "—",
   "—",
   "第20章"
  ],
  [
   "教科書・一般知識・他講座",
   "複合サイクル発電の教科書（6 つの流れ、一軸式と多軸式の違い、軸の構成の選び方の観点）",
   "—",
   "—",
   "第18章"
  ],
  [
   "教科書・一般知識・他講座",
   "軸受の種類、潤滑油の系統、非常用ポンプの理由、補機の役割、ターニングの理由の補足",
   "—",
   "—",
   "第15章"
  ],
  [
   "教科書・一般知識・他講座",
   "軸流圧縮機の段の働き、サージの説明、入口案内翼を絞る理由",
   "—",
   "—",
   "第12章"
  ],
  [
   "教科書・一般知識・他講座",
   "電力工学の教科書（一般知識）",
   "—",
   "—",
   "第02章・第22章"
  ],
  [
   "教科書・一般知識・他講座",
   "電力工学の教科書／計算サーバー講義 第24章",
   "—",
   "—",
   "第03章"
  ],
  [
   "教科書・一般知識・他講座",
   "ガスタービン工学の教科書（一般知識）",
   "この講座",
   "—",
   "第27章"
  ],
  [
   "教科書・一般知識・他講座",
   "プロジェクトマネジメントと事業金融の教科書（一般知識）",
   "この講座",
   "—",
   "第31章"
  ],
  [
   "教科書・一般知識・他講座",
   "第22章・第26章・第27章・第28章",
   "この講座",
   "—",
   "第31章"
  ],
  [
   "教科書・一般知識・他講座",
   "電力工学・エネルギー経済の教科書（一般知識）",
   "この講座",
   "—",
   "第04章"
  ],
  [
   "教科書・一般知識・他講座",
   "電力工学の教科書（一般知識）／計算サーバー講義 第12章",
   "この講座の相互参照",
   "—",
   "第01章"
  ],
  [
   "教科書・一般知識・他講座",
   "電力工学の教科書（一般知識）",
   "この講座の説明",
   "—",
   "序章1"
  ],
  [
   "教科書・一般知識・他講座",
   "電気回路・電力工学の教科書（一般知識）",
   "この講座の説明",
   "—",
   "序章2"
  ],
  [
   "教科書・一般知識・他講座",
   "6.4 Brayton Cycle in T-s Coordinates（Thermodynamics and Propulsion）",
   "マサチューセッツ工科大学の講義ノート",
   "日付の記載なし。確認 2026-11-14",
   "第07章"
  ],
  [
   "教科書・一般知識・他講座",
   "Unified Propulsion Lecture #1（Section VIII, Ideal Cycle Analysis of Aircraft Gas Turbine Engines）",
   "マサチューセッツ工科大学の講義ノート",
   "日付の記載なし。確認 2026-11-14",
   "第07章"
  ],
  [
   "架空（見本のため）",
   "c12-map の値と、演習の値",
   "この講座",
   "—",
   "第12章"
  ],
  [
   "架空（見本のため）",
   "実験台のつまみの値、演習のヒーター・送電線・電気の単価",
   "この講座",
   "—",
   "序章2"
  ],
  [
   "架空（見本のため）",
   "演習の 3 つの困りごと",
   "この講座",
   "—",
   "第01章"
  ],
  [
   "架空（見本のため）",
   "演習の 3 社と受注の数字",
   "この講座",
   "—",
   "第27章"
  ],
  [
   "架空（見本のため）",
   "演習の LNG 船の積荷と消費",
   "この講座",
   "—",
   "第05章"
  ],
  [
   "架空（見本のため）",
   "演習の回転数と周波数の低下",
   "この講座",
   "—",
   "第02章"
  ],
  [
   "架空（見本のため）",
   "演習の残余需要の増加と 1 台の変化率",
   "この講座",
   "—",
   "第30章"
  ],
  [
   "架空（見本のため）",
   "演習の残余需要の表",
   "この講座",
   "—",
   "第03章"
  ],
  [
   "架空（見本のため）",
   "演習の燃料費・5 電源の限界費用と出力",
   "この講座",
   "—",
   "第04章"
  ],
  [
   "架空（見本のため）",
   "演習の発電所「見本火力」と架空の町の家庭、実験台のつまみの値",
   "この講座",
   "—",
   "序章1"
  ],
  [
   "架空（見本のため）",
   "演習の銘板と出力",
   "この講座",
   "—",
   "第22章"
  ],
  [
   "架空（見本のため）",
   "空気比と当量比の演習の値",
   "この講座",
   "—",
   "第13章"
  ],
  [
   "架空（見本のため）",
   "絶対温度と冷却の空気の演習の値、c14-tbc の寸法",
   "この講座",
   "—",
   "第14章"
  ],
  [
   "架空（見本のため）",
   "総合演習の案件・会社・状況",
   "この講座",
   "—",
   "第31章"
  ],
  [
   "架空（見本のため）",
   "警報を系統に割り当てる演習の 4 つの警報",
   "この講座",
   "—",
   "第15章"
  ],
  [
   "架空（見本のため）",
   "外気の温度と補正係数の表の値、演習の出力",
   "本講座",
   "架空",
   "第16章"
  ],
  [
   "架空（見本のため）",
   "本章の例（条件、段階、事象、センサーの状態、記録の値）",
   "本講座",
   "—",
   "第23章"
  ],
  [
   "架空（見本のため）",
   "本章の演習の値（400 MW、5%/min、2,102,400 MWh、7,000 時間、記録の値）",
   "本講座",
   "—",
   "第24章"
  ],
  [
   "架空（見本のため）",
   "本章の演習・例の値（換算係数 10 時間/回、6,000 時間、300 回、24,000 時間、部品の循環の担当）",
   "本講座",
   "—",
   "第25章"
  ],
  [
   "架空（見本のため）",
   "本章の輸送の行程・契約の担当の例",
   "本講座",
   "—",
   "第26章"
  ],
  [
   "架空（見本のため）",
   "機種名の読み方の図の機種名と、演習の公表値",
   "本講座",
   "架空",
   "第17章"
  ],
  [
   "架空（見本のため）",
   "演習の値と、図・表の割合",
   "本講座",
   "—",
   "第06章"
  ],
  [
   "架空（見本のため）",
   "演習の値（NOx 12 ppm、燃料 10 kg/s、電気出力 300 MW など）",
   "本講座",
   "—",
   "第10章"
  ],
  [
   "架空（見本のため）",
   "演習の値（酸素 14%・16%、30 ppm、基準 25 ppm）",
   "本講座",
   "—",
   "第28章"
  ],
  [
   "架空（見本のため）",
   "演習の流量と比エンタルピーの差",
   "本講座",
   "架空",
   "第20章"
  ],
  [
   "架空（見本のため）",
   "演習の熱量・温度の差・比熱",
   "本講座",
   "架空",
   "第21章"
  ],
  [
   "架空（見本のため）",
   "状態点の表 c07-pts と演習の値",
   "本講座",
   "—",
   "第07章"
  ],
  [
   "架空（見本のため）",
   "状態点の表 c08-pts と演習の値",
   "本講座",
   "—",
   "第08章"
  ],
  [
   "架空（見本のため）",
   "状態点の表 c09-pts と演習の値",
   "本講座",
   "—",
   "第09章"
  ],
  [
   "架空（見本のため）",
   "状態点の表と温度と熱量の図の値、演習の値",
   "本講座",
   "架空",
   "第19章"
  ],
  [
   "架空（見本のため）",
   "行程帯図の契約の例と、演習の出力",
   "本講座",
   "架空",
   "第18章"
  ]
 ]
});

CN.glossary([
 {
  "t": "資源エネルギー庁",
  "d": "経済産業省の外局で、エネルギー政策を所管する官庁。この講座では、電力システム改革の資料、電源投資の資料、環境影響評価の手引などの発行者として出てくる。",
  "ch": [
   1,
   3,
   4,
   28,
   32
  ],
  "en": "Agency for Natural Resources and Energy"
 },
 {
  "t": "送配電網協議会",
  "d": "一般送配電事業者などが会員となる一般社団法人。この講座では、需給調整市場の取引規程や、会員の一覧の資料の発行者として出てくる。",
  "ch": [
   1,
   2,
   4,
   32
  ]
 },
 {
  "t": "電力・ガス取引監視等委員会",
  "d": "経済産業省に置かれた、電力・ガス・熱供給の市場を監視する委員会。この講座の本文では、この委員会の資料を使っていない。",
  "ch": [
   32
  ],
  "en": "Electricity and Gas Market Surveillance Commission"
 },
 {
  "t": "FERC",
  "d": "米国の連邦エネルギー規制委員会。この講座では、米国の卸電力市場を運営する地域送電機関と独立系統運用者の説明の出典として出てくる。",
  "ch": [
   1,
   32
  ],
  "en": "Federal Energy Regulatory Commission"
 },
 {
  "t": "ENTSO-E",
  "d": "欧州の送電系統運用者が加盟する団体。この講座では、欧州の系統運用の枠組みの説明の出典として出てくる。",
  "ch": [
   1,
   22,
   32
  ],
  "en": "European Network of Transmission System Operators for Electricity"
 },
 {
  "t": "米国エネルギー情報局",
  "d": "米国のエネルギーの統計と分析を公表する政府機関（略称 EIA）。この講座では、米国の発電の割合などの統計の出典として出てくる。",
  "ch": [
   3,
   21,
   32
  ],
  "en": "U.S. Energy Information Administration"
 },
 {
  "t": "エネルギー・金属鉱物資源機構",
  "d": "エネルギーと金属鉱物の資源の確保を担う独立行政法人（略称 JOGMEC）。旧称は石油天然ガス・金属鉱物資源機構で、法改正に伴い名称を変更した。この講座では、LNG の契約の用語の確認先として挙げる。",
  "ch": [
   5,
   32
  ],
  "en": "Japan Organization for Metals and Energy Security",
  "alias": "JOGMEC"
 },
 {
  "t": "国際ガス連盟",
  "d": "天然ガスに関わる国際団体（略称 IGU）。この講座では、世界の LNG の貿易量の年次報告の発行者として出てくる。",
  "ch": [
   5,
   32
  ],
  "en": "International Gas Union",
  "alias": "IGU"
 },
 {
  "t": "国際エネルギー機関",
  "d": "エネルギー政策に関わる国際機関（略称 IEA）。この講座では、世界の発電の割合などの統計の出典として出てくる。国際機関なので、参照資料の種類は「当局・公的機関」に入れる。",
  "ch": [
   3,
   27,
   29,
   30,
   32
  ],
  "en": "International Energy Agency",
  "alias": "IEA"
 },
 {
  "t": "国際標準化機構",
  "d": "国際規格を作る団体（略称 ISO）。この講座では、天然ガスの発熱量の規格や、ガスタービンの性能の規格の発行者として出てくる。規格の本文は有料で、この講座は名前・版・公表日までを書く。",
  "ch": [
   5,
   9,
   12,
   13,
   16,
   17,
   32
  ],
  "en": "International Organization for Standardization",
  "alias": "ISO"
 },
 {
  "t": "日本ガスタービン学会",
  "d": "ガスタービンに関する学術と技術の学会。この講座では、ガスタービンの説明のページの発行者として出てくる。",
  "ch": [
   7,
   11,
   12,
   13,
   32
  ],
  "en": "Gas Turbine Society of Japan"
 },
 {
  "t": "ASME",
  "d": "米国の機械学会。この講座では、ガスタービンの性能試験の規格の発行団体と、ガスタービンの技術部会（IGTI）として出てくる。規格の本文は有料で、この講座は名前と版までを書く。",
  "ch": [
   11,
   16,
   32
  ],
  "en": "The American Society of Mechanical Engineers"
 },
 {
  "t": "日本機械学会",
  "d": "機械工学の学会。この講座では、蒸気表の編者として出てくる。",
  "ch": [
   8,
   19,
   32
  ],
  "en": "The Japan Society of Mechanical Engineers"
 },
 {
  "t": "IAPWS",
  "d": "水と蒸気の性質を扱う国際団体。この講座では、水と蒸気の熱力学の工業用の式の発行者として出てくる。",
  "ch": [
   8,
   32
  ],
  "en": "International Association for the Properties of Water and Steam"
 },
 {
  "t": "日本産業標準調査会",
  "d": "日本の産業標準（JIS）の制定や改正を審議する調査会。この講座では、火力発電用語の規格の確認先として出てくる。規格の閲覧と販売は、日本規格協会のページで行う。",
  "ch": [
   6,
   25,
   32
  ],
  "en": "Japanese Industrial Standards Committee",
  "alias": "JIS"
 },
 {
  "t": "国際電気標準会議",
  "d": "電気と電子の分野の国際規格を作る団体（略称 IEC）。この講座では、回転電気機械の規格の発行団体として出てくる。規格の本文は有料で、この講座は名前・版・発行日までを書く。",
  "ch": [
   22,
   23,
   32
  ],
  "en": "International Electrotechnical Commission",
  "alias": "IEC"
 },
 {
  "t": "IEEE",
  "d": "電気・電子・情報の分野の学会・標準化団体。この講座では、発電設備の信頼性と可用性の報告に使う用語と指標の標準の発行団体として出てくる。",
  "ch": [
   24,
   32
  ],
  "en": "Institute of Electrical and Electronics Engineers"
 },
 {
  "t": "日本電気協会",
  "d": "電気事業に関わる規程を作る団体。この講座では、系統連系規程の発行者として出てくる。規程の本文は有料で、この講座は名前・版・日付までを書く。",
  "ch": [
   22,
   23,
   32
  ],
  "en": "The Japan Electric Association"
 },
 {
  "t": "電気学会",
  "d": "電気工学の学会（略称 IEEJ）。この講座の本文では、この学会の資料を使っていない。",
  "ch": [
   32
  ],
  "en": "The Institute of Electrical Engineers of Japan",
  "alias": "IEEJ"
 },
 {
  "t": "NERC",
  "d": "北米の電力系統の信頼性を扱う団体。この講座では、設備の稼働の統計の報告の手引（運転の指標の式）の発行者として出てくる。",
  "ch": [
   24,
   32
  ],
  "en": "North American Electric Reliability Corporation"
 },
 {
  "t": "火力原子力発電技術協会",
  "d": "火力発電と原子力発電の技術の調査研究などを行う一般社団法人。この講座の本文では、この協会の資料を使っていない。",
  "ch": [
   32
  ],
  "en": "Thermal and Nuclear Power Engineering Society"
 }
]);

CN.exam([
 {
  "part": "5",
  "q": "この講座で、数字（効率・出力・市場の値など）を読むときの原則として、合うものはどれですか。",
  "c": [
   "出典・時点・条件（効率なら発熱量の基準と端など）をそろえて読み、条件の違う数字は比べない",
   "数字は、単位が同じなら、出典や時点が違っても比べてよい",
   "数字は、大きい方を、性能が高いものとして読む",
   "数字の条件は、出典に書かれていなくても、推測で補う"
  ],
  "a": 0,
  "why": "正答は、出典・時点・条件をそろえて読み、条件の違う数字を比べないことです。この講座の数字には出典と時点と条件を付け、出典に条件が書かれていないときは、書かれていないと書きます。単位が同じでも条件が違えば別の数字で、推測で条件を補いません。",
  "ch": [
   32
  ]
 },
 {
  "part": "5",
  "q": "規格・団体の資料と、法令・制度の資料の扱いとして、合うものはどれですか。",
  "c": [
   "規格は、すべて法令なので、どの国でも同じ内容が義務になる",
   "規格は、団体が出す文書の名前と版・公表日で確かめ、法令・制度は、当局の資料で国・地域と確認の日を付けて確かめる",
   "法令・制度は、国・地域と確認の日を書かなくても、どの国にも通じる",
   "規格の本文は、有料でも、出典を書けば講座に転載してよい"
  ],
  "a": 1,
  "why": "正答は、規格は団体の文書の名前と版・公表日で確かめ、法令・制度は当局の資料で国・地域と確認の日を付けて確かめる、というものです。団体の規格は法令とは別の文書です。法令と制度は国ごとに違い、改正されるので、国・地域と確認の日が要ります。規格の本文は、この講座では転載しません。",
  "ch": [
   32
  ]
 }
]);
