#!/usr/bin/env python3
"""講座の共通ビルド。講座ディレクトリ（course.json, chapters/, data/）を 1 ファイルの HTML に組み立てる（冪等）。標準ライブラリと node だけで動く。

使い方:
  python3 -I /home/claude/courses/_framework/build.py <講座ディレクトリ>           # 本番 -> course.json の out
  python3 -I /home/claude/courses/_framework/build.py <講座ディレクトリ> --check   # 出力を書かず、検査だけ
  python3 -I /home/claude/courses/_framework/build.py <講座ディレクトリ> --demo    # 部品見本の章（S1）を足した版 -> <out>.demo.html（見本ビルド）
  python3 -I /home/claude/courses/_framework/build.py <講座ディレクトリ> --publish <公開設定.json>   # 公開する章だけの版（§公開設定）
  python3 -I /home/claude/courses/_framework/build.py <講座ディレクトリ> --publish 01-05 --out <出力パス>   # 範囲の直接指定
公開設定（講座ディレクトリの外に置く JSON。章ファイルと course.json は変えない）:
  {"chapters": "01-05" または ["01","02",…],     公開する章（範囲 "01-05,08" も可）
   "out": "出力先（設定ファイルからの相対も可。--out が優先）",
   "hero_status": "入口に出す一文（公開状況）",
   "pending_text": "準備中の章に出す文（省略可）",
   "appendix": {"num": "A1", "part": "A", "title": "…", "intro": "…", "exam_intro": "…"}   公開章の用語集と総合テストだけの付録（省略可）}
公開しない章は、目次に題と「準備中」だけを出し（リンクにしない）、本文・データ・用語・総合テストの問題は出力に含めない。
終了コード: 0=成功（WARN は出ることがある）、1=エラー
"""
import argparse
import html
import json
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

FW = Path(__file__).resolve().parent
RESERVED_PREFIXES = ['cn.']          # コアネットワーク講義（既存）が使っている保存キーの接頭辞
FORBIDDEN_TEXT = ['\u30d3\u30c3\u30b0\u30de\u30a6\u30f3\u30c6\u30f3', '\u30c6\u30c4\u30e4', '\u3066\u3063\u3061']   # 出力に作者名・ハンドルを入れない（ソースに名前を書かないため、エスケープで書く）
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
KNOWN_WIDGETS = {'arch', 'seq', 'stack', 'ident', 'table', 'qos', 'tree', 'keys', 'state', 'drill', 'quiz', 'compare', 'flow', 'layers', 'xsec', 'route', 'glossary', 'mapping', 'exam'}
NO_SRC = {'glossary', 'mapping', 'exam'}
DEMO_PART = {'id': 'S', 'name': '部品見本（--demo のときだけ）', 'short': '部品見本', 'appendix': True}
errors, warns = [], []


def err(m):
    errors.append(m)
    print('ERROR', m)


def warn(m):
    warns.append(m)
    print('WARN ', m)


def esc(s):
    return html.escape(str(s), quote=True)


def read(p):
    return Path(p).read_text(encoding='utf-8')


def sortkey(num):
    return (0, int(num), '') if num.isdigit() else (1, 0, num)


# ---------------------------------------------------------------- 色（差し色の導出とコントラスト検査）
def rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def hexs(c):
    return '#%02X%02X%02X' % tuple(max(0, min(255, round(v))) for v in c)


def lum(c):
    def f(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = lum(rgb(a)), lum(rgb(b))
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def mix(a, b, t):
    ca, cb = rgb(a), rgb(b)
    return hexs(tuple(ca[i] + (cb[i] - ca[i]) * t for i in range(3)))


DARK_BG = ['#0B1F3A', '#102949', '#14305A']     # 基調（ダーク）の面
LIGHT_BG = ['#FFFFFF', '#F1F4F9', '#E4EAF3']    # 基調（ライト）の面
INK_CHOICES = ['#0B1F3A', '#FFFFFF']


def derive_accent(spec):
    """差し色 1 色（塗り）から、ダークの文字色・ライトの文字色・塗りの上の文字色・淡い面を導く。検査も行う。"""
    if spec is None:
        spec = {'fill': '#C9A227', 'dark': '#D9B84A'}
    if isinstance(spec, str):
        spec = {'fill': spec}
    fill = spec['fill'].upper()
    if not re.fullmatch(r'#[0-9A-Fa-f]{6}', fill):
        err('course.json: accent は #RRGGBB（または {"fill":…}）')
        return None
    ink = max(INK_CHOICES, key=lambda k: contrast(fill, k))
    soft_l = mix(fill, '#FFFFFF', 0.86)
    dark = spec.get('dark')
    if not dark:
        dark, t = fill, 0.0
        while min(contrast(dark, b) for b in DARK_BG) < 4.5 and t < 1:
            t += 0.05
            dark = mix(fill, '#FFFFFF', t)
    light = spec.get('light')
    if not light:
        light, t = fill, 0.0
        while min([contrast(light, soft_l)] + [contrast(light, b) for b in LIGHT_BG]) < 4.5 and t < 1:
            t += 0.05
            light = mix(fill, '#000000', t)
    r, g, b = rgb(fill)
    res = dict(fill=fill, ink=ink, dark=dark.upper(), light=light.upper(), soft_d='rgba(%d,%d,%d,.14)' % (r, g, b), soft_l=soft_l)
    if contrast(fill, ink) < 4.5:
        err('accent %s: 塗りの上の文字（%s）のコントラスト比 %.1f が 4.5 未満。もっと明るいか暗い色にする' % (fill, ink, contrast(fill, ink)))
    for b in DARK_BG:
        if contrast(res['dark'], b) < 4.5:
            err('accent: ダークの文字色 %s が面 %s の上で 4.5:1 に届きません（%.1f）' % (res['dark'], b, contrast(res['dark'], b)))
    for b in LIGHT_BG + [soft_l]:
        if contrast(res['light'], b) < 4.5:
            err('accent: ライトの文字色 %s が面 %s の上で 4.5:1 に届きません（%.1f）' % (res['light'], b, contrast(res['light'], b)))
    return res


def accent_css(a):
    return ('\n/* ==== 講座の差し色（course.json の accent から生成） ==== */\n'
            ':root, :root[data-theme="dark"] { --accent: %(dark)s; --accent-fill: %(fill)s; --accent-ink: %(ink)s; --accent-soft: %(soft_d)s; --up: %(dark)s; }\n'
            ':root[data-theme="light"] { --accent: %(light)s; --accent-fill: %(fill)s; --accent-ink: %(ink)s; --accent-soft: %(soft_l)s; --up: %(light)s; }\n'
            '@media print { :root, :root[data-theme="dark"], :root[data-theme="light"] { --accent: %(light)s; --accent-soft: %(soft_l)s; --up: %(light)s; } }\n') % a


# ---------------------------------------------------------------- 設定
def load_course(cdir):
    f = cdir / 'course.json'
    if not f.exists():
        err('%s がありません' % f)
        return None
    try:
        c = json.loads(read(f))
    except ValueError as e:
        err('course.json: JSON として読めません: %s' % e)
        return None
    for k in ('slug', 'title', 'subtitle', 'prefix', 'out', 'parts', 'footer'):
        if k not in c:
            err('course.json: 必須の項目 "%s" がありません' % k)
    if errors:
        return None
    if not re.fullmatch(r'[a-z][a-z0-9-]{1,30}', c['slug']):
        err('course.json: slug は英小文字・数字・ハイフン（2〜31 字）')
    p = c['prefix']
    if not re.fullmatch(r'[a-z][a-z0-9-]{1,14}\.', p):
        err('course.json: prefix は「英小文字・数字・ハイフン + ドット」（例 "semi."）')
    if p in RESERVED_PREFIXES:
        err('course.json: prefix "%s" は既存の講義（コアネットワーク）が使っています' % p)
    for sib in sorted(cdir.parent.glob('*/course.json')):
        if sib.parent.resolve() == cdir.resolve():
            continue
        try:
            o = json.loads(read(sib))
        except ValueError:
            continue
        op = o.get('prefix', '')
        if op and (op.startswith(p) or p.startswith(op)):
            err('course.json: prefix "%s" が %s の "%s" と衝突します（保存キーが混ざる）' % (p, sib.parent.name, op))
    if not (c.get('footer') or {}).get('home') or not c['footer']['home'].get('href') or not c['footer']['home'].get('label'):
        err('course.json: footer.home に label と href（ポートフォリオへ戻るリンク）が必要です')
    if 'org' in c['footer'] or 'copyright' in c['footer']:
        err('course.json: フッターの表記は「TTJ」固定です（footer.org / copyright は指定しない）')
    keys = [x.get('id') for x in c['parts']]
    if len(set(keys)) != len(keys):
        err('course.json: parts の id が重複しています')
    for x in c['parts']:
        for k in ('id', 'name', 'short'):
            if k not in x:
                err('course.json: parts の %s に "%s" がありません' % (x, k))
    return c


# ---------------------------------------------------------------- 章ファイル
META_RE = re.compile(r'\A\s*<!--(.*?)-->', re.S)


def parse_chapter(path):
    src = read(path)
    m = META_RE.match(src)
    if not m:
        err('%s: 先頭に <!-- num/part/title/time（track は任意） --> のメタコメントがありません' % path.name)
        return None
    meta = {}
    for line in m.group(1).strip().splitlines():
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
    for k in ('num', 'part', 'title', 'time'):
        if k not in meta:
            err('%s: メタに %s がありません' % (path.name, k))
            return None
    fn = re.match(r'([0-9A-Za-z]+)-', path.name)
    if not fn or fn.group(1) != meta['num']:
        err('%s: ファイル名の番号とメタ num(%s) が一致しません' % (path.name, meta['num']))
    meta['body'] = src[m.end():].strip()
    meta['file'] = path.name
    meta.setdefault('track', '')
    try:
        meta['time'] = int(meta['time'])
    except ValueError:
        err('%s: time は整数（分）' % path.name)
    return meta


class Checker(HTMLParser):
    """タグの閉じ忘れ・id・部品・リンク・禁止要素の収集"""

    def __init__(self, name):
        super().__init__(convert_charrefs=True)
        self.name, self.stack, self.ids, self.widgets, self.hrefs, self.bad = name, [], [], [], [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if 'data-widget' in a:
            self.widgets.append((a['data-widget'], a.get('data-src')))
        if tag == 'a' and a.get('href', '').startswith('#'):
            self.hrefs.append(a['href'])
        if tag in ('script', 'style', 'img', 'link', 'iframe', 'object', 'embed') or any(k.startswith('on') and k[2:3].isalpha() and k in ('onclick', 'onload', 'onerror') for k in a):
            self.bad.append(tag)
        for k in ('style', 'fill', 'stroke', 'color'):
            if k in a and re.search(r'#[0-9a-fA-F]{3,8}\b', a[k] or ''):
                self.bad.append('色の直書き(%s=%s)' % (k, a[k][:30]))
        if tag not in VOID:
            self.stack.append((tag, self.getpos()))

    def handle_startendtag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack:
            err('%s: 余分な </%s> (行 %d)' % (self.name, tag, self.getpos()[0]))
            return
        if self.stack[-1][0] == tag:
            self.stack.pop()
            return
        err('%s: </%s> が <%s>(行 %d) と対応しません (行 %d)' % (self.name, tag, self.stack[-1][0], self.stack[-1][1][0], self.getpos()[0]))
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def finish(self):
        for tag, pos in self.stack:
            err('%s: <%s>(行 %d) が閉じられていません' % (self.name, tag, pos[0]))


def check_fragment(name, text):
    c = Checker(name)
    c.feed(text)
    c.close()
    c.finish()
    return c


def node_check(label, code):
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as t:
        t.write(code)
        name = t.name
    r = subprocess.run(['node', '--check', name], capture_output=True, text=True)
    Path(name).unlink(missing_ok=True)
    if r.returncode != 0:
        err('%s: JS 構文エラー\n%s' % (label, r.stderr.strip()[:600]))


def js_safe(label, code):
    if re.search(r'</script', code, re.I):
        err('%s: JS 中に </script があります（<\\/script と書く）' % label)
    return code


def norm(s):
    s = re.sub(r'\s+', '', str(s or '')).lower()
    return s.translate(str.maketrans('／＋（）', '/+()'))


def run_collect(dfiles, part_keys):
    import os
    env = dict(os.environ, CN_PARTS=json.dumps(part_keys))
    r = subprocess.run(['node', str(FW / 'check-data.js')] + [str(f) for f in dfiles], capture_output=True, text=True, env=env)
    if r.returncode != 0:
        err('データ検査: 実行に失敗\n%s' % r.stderr.strip()[:400])
        return None
    d = json.loads(r.stdout)
    if d.get('error'):
        err('データ検査: %s' % d['error'])
        return None
    return d


# ---------------------------------------------------------------- 組み立て
def parse_range(spec):
    """"01-05,08" または ["01","02"] -> {"01","02",…}（2 桁の文字列）"""
    items = spec if isinstance(spec, list) else str(spec).split(',')
    res = set()
    for it in items:
        it = str(it).strip()
        if not it:
            continue
        m = re.fullmatch(r'(\d+)\s*-\s*(\d+)', it)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            if a > b:
                err('公開設定: 範囲 "%s" の始まりが終わりより後です' % it)
                continue
            res.update('%02d' % k for k in range(a, b + 1))
        elif it.isdigit():
            res.add('%02d' % int(it))
        else:
            err('公開設定: 章の指定 "%s" が読めません（例 "01-05,08"）' % it)
    return res


def load_publish(arg, out_arg):
    """--publish の値（設定ファイルのパス、または範囲の文字列）と --out から、公開設定の dict を作る。"""
    pub = {}
    base = Path.cwd()
    f = Path(arg)
    if f.is_file():
        try:
            pub = json.loads(read(f))
        except ValueError as e:
            err('公開設定 %s: JSON として読めません: %s' % (f, e))
            return None
        base = f.resolve().parent
        if 'chapters' not in pub:
            err('公開設定 %s: "chapters"（公開する章）がありません' % f)
            return None
    else:
        pub = {'chapters': arg}
    pub['nums'] = parse_range(pub['chapters'])
    if not pub['nums']:
        err('公開設定: 公開する章が 1 つもありません')
        return None
    out = out_arg or pub.get('out')
    if not out:
        err('公開設定: 出力先がありません（--out か設定の "out"）')
        return None
    o = Path(out)
    pub['out_path'] = o if o.is_absolute() else ((Path.cwd() if out_arg else base) / o)
    ap = pub.get('appendix')
    if ap:
        for k in ('num', 'part', 'title'):
            if not ap.get(k):
                err('公開設定: appendix に "%s" がありません' % k)
        if ap.get('num', '').isdigit():
            err('公開設定: appendix.num は数字以外（例 "A1"）。数字の章番号は本物の章のものです')
    return pub


def annotate_route(text, unready, total_ready):
    """学習ルートの文中の章番号の並び（第03章 → 04 → …）で、未公開の章に「（準備中）」を付ける。"""
    state = {'found': False, 'n': 0, 'ready': 0}

    def chain(m):
        state['found'] = True

        def one(mm):
            n = mm.group(2)
            state['n'] += 1
            if n in unready:
                return '%s%s%s（準備中）' % (mm.group(1) or '', n, mm.group(3) or '')
            state['ready'] += 1
            return mm.group(0)
        return re.sub(r'(第)?(?<!\d)(\d\d)(?!\d)(章)?', one, m.group(0))
    out = re.sub(r'第\d\d章(?: → \d\d)+', chain, text, count=1)
    if state['found'] and state['ready'] < state['n']:
        out += ' 公開中は %d 章分です。' % state['ready']
    return out


def linkify_route(text_escaped):
    """エスケープ済みの文の、学習ルートの章番号の並び（第03章 → 04 → …）と「第NN章」を、章へのリンクにする。"""
    def chain(m):
        return re.sub(r'(第)?(?<!\d)(\d\d)(?!\d)(章)?',
                      lambda mm: '%s<a href="#ch%s">%s%s%s</a>' % ('', mm.group(2), mm.group(1) or '', mm.group(2), mm.group(3) or ''), m.group(0))
    out = re.sub(r'第\d\d章(?: → \d\d)+', chain, text_escaped)
    # 並びに含まれない単独の「第NN章」（すでにリンクの中にあるものは除く）
    return re.sub(r'(?<![">\d])第(\d\d)章(?!</a>)', lambda mm: '<a href="#ch%s">%s</a>' % (mm.group(1), mm.group(0)), out)


def build(cdir, demo=False, check_only=False, publish=None, out_arg=None):
    errors.clear()
    warns.clear()
    course = load_course(cdir)
    if not course:
        return 1
    pub = None
    if publish is not None:
        if demo:
            err('--publish と --demo は同時に使えません')
            return 1
        pub = load_publish(publish, out_arg)
        if not pub:
            return 1
    accent = derive_accent(course.get('accent'))
    parts = list(course['parts']) + ([DEMO_PART] if demo else [])
    pdef = {p['id']: p for p in parts}
    appendix = {p['id'] for p in parts if p.get('appendix')}
    # tracks: 文字列、または {"label":…, "tone":0〜5}（バッジの色。省略時は並び順）。何個でも設定できる
    tracks, tones = [], {}
    for i, t in enumerate(course.get('tracks') or []):
        lab = t['label'] if isinstance(t, dict) else t
        tracks.append(lab)
        tones[lab] = (t.get('tone', i) if isinstance(t, dict) else i) % 6

    # 章ファイル
    files = sorted((cdir / 'chapters').glob('*.html'))
    if pub:      # 公開する章のファイルだけを読む（ほかの章は、執筆中でも読まない・検査しない）
        def fnum(f):
            mm = re.match(r'([0-9A-Za-z]+)-', f.name)
            return mm.group(1) if mm else None
        have = {fnum(f) for f in files}
        for n in sorted(pub['nums'] - have):
            err('公開設定: 公開する第%s章のファイルが chapters/ にありません' % n)
        files = [f for f in files if fnum(f) in pub['nums']]
    if demo:
        files += sorted((FW / 'demo' / 'chapters').glob('*.html'))
    chapters = {}
    for f in files:
        m = parse_chapter(f)
        if not m:
            continue
        if m['num'] in chapters:
            err('章番号 %s が重複: %s と %s' % (m['num'], chapters[m['num']]['file'], f.name))
            continue
        if m['part'] not in pdef:
            err('%s: part=%s は course.json の parts にありません（%s）' % (f.name, m['part'], ','.join(pdef)))
            continue
        if tracks and m['track'] and m['track'] not in tracks:
            err('%s: track "%s" は course.json の tracks にありません（%s）' % (f.name, m['track'], '・'.join(tracks)))
        chapters[m['num']] = m
    allc = {}
    for pl in course.get('chapters', []):      # 章立ての計画（任意）。未執筆の章は「準備中」で出る
        n = pl['num']
        if pl['part'] not in pdef:
            err('course.json: chapters の %s の part "%s" がありません' % (n, pl['part']))
            continue
        allc[n] = dict(num=n, part=pl['part'], title=pl['title'], track=pl.get('track', ''), time=pl.get('time', 0), ready=False, body=None)
    for num, m in chapters.items():
        allc[num] = dict(num=num, part=m['part'], title=m['title'], track=m['track'], time=m['time'], ready=True, body=m['body'], file=m['file'])
    if pub:
        for n in sorted(pub['nums']):
            if n in chapters and n not in {x['num'] for x in course.get('chapters', [])}:
                warn('公開設定: 第%s章は course.json の chapters（章立て）にありません' % n)
        ap = pub.get('appendix')
        if ap:
            if ap['part'] not in pdef:
                err('公開設定: appendix.part "%s" が course.json の parts にありません' % ap['part'])
            elif ap['num'] in allc:
                err('公開設定: appendix.num "%s" が既存の章と重複しています' % ap['num'])
            else:
                intro = ap.get('intro') or '公開中の章に出てきた用語と、確認の問題を集めています。'
                body = ('<p>%s</p>\n<h3>用語集</h3>\n<div data-widget="glossary"></div>\n<h3>総合テスト</h3>\n<div data-widget="exam"></div>' % esc(intro))
                allc[ap['num']] = dict(num=ap['num'], part=ap['part'], title=ap['title'], track='', time=ap.get('time', 0), ready=True, body=body, file='(公開設定)', stub=True)
                chapters[ap['num']] = dict(num=ap['num'], part=ap['part'], title=ap['title'], body=body, file='(公開設定)', track='', time=0)
    if not any(c['ready'] for c in allc.values()):
        err('章が 1 つもありません（chapters/NN-*.html）')
        return 1
    order = sorted(allc, key=sortkey)
    nums = sorted(int(n) for n in allc if n.isdigit())
    for a, b in zip(nums, nums[1:]):
        if b != a + 1:
            err('章番号の欠番: %02d の次が %02d です（%s）' % (a, b, ', '.join('%02d' % x for x in range(a + 1, b))))
    if nums and nums[0] != 1:
        err('章番号の欠番: 第01章がありません（最初が %02d）' % nums[0])
    for k in allc:
        if k.isdigit() and len(k) != 2:
            err('章番号 %s は 2 桁（01, 02, …）で書く' % k)

    # データ
    dfiles = sorted((cdir / 'data').glob('*.js')) if (cdir / 'data').exists() else []
    if pub:
        dfiles = [f for f in dfiles if (re.match(r'([0-9A-Za-z]+)-', f.name) or [None, None])[1] in pub['nums']]
    if demo:
        dfiles += sorted((FW / 'demo' / 'data').glob('*.js'))
    dscripts = []
    for f in dfiles:
        code = read(f)
        mm = re.match(r'([0-9A-Za-z]+)-', f.name)
        dnum = mm.group(1) if mm else None
        if dnum is None or dnum not in allc:
            warn('%s: 先頭の番号が章に対応しません' % f.name)
        wrapped = "(function(){'use strict';\n" + js_safe(f.name, code) + "\n})();"
        node_check(f.name, wrapped)
        dscripts.append('<script>\n/* data: %s */\n%s\n</script>' % (f.name, wrapped))
    registered = {}
    col = run_collect(dfiles, [p['id'] for p in parts if p['id'] not in appendix]) if dfiles else {'added': [], 'glossary': [], 'mapping': [], 'compare': [], 'exam': [], 'quiz': [], 'chRefs': [], 'problems': []}
    if col:
        for a in col['added']:
            mm = re.match(r'([0-9A-Za-z]+)-', a['f'])
            dnum = mm.group(1) if mm else None
            k = (a['kind'], a['id'])
            if k in registered:
                err('データ重複: %s/%s (%s と %s)' % (a['kind'], a['id'], registered[k], a['f']))
            registered[k] = a['f']
            if dnum and not a['id'].startswith('c%s-' % dnum):
                err('%s: データ id "%s" は c%s- で始める決まりです' % (a['f'], a['id'], dnum))
        for p in col['problems']:
            err('%s: %s' % (p['f'], p['msg']))

        def scan(items, keys, label, name):
            seen = {}
            for it in items:
                for kname, k in keys(it):
                    if not k:
                        continue
                    kk = (kname, k)
                    if kk in seen:
                        err('%s が重複: 「%s」 %s と %s（定義は初出の章に 1 つ。他の章からは ch で参照）' % (label, name(it), seen[kk], it['f']))
                    else:
                        seen[kk] = it['f']
        scan(col['glossary'], lambda g: [('t', norm(g['t'])), ('en', norm(g['en']))], '用語集の語', lambda g: g['t'])
        scan(col['mapping'], lambda r: [(r['cat'] + ':a', norm(r['a'])), (r['cat'] + ':b', norm(r['b']))], '対応表の行', lambda r: r['a'])
        scan(col['compare'], lambda r: [(r['id'] + r['cat'] + ':a', norm(r['a'])), (r['id'] + r['cat'] + ':b', norm(r['b']))], '対比表の行', lambda r: r['a'])
        scan(col['exam'], lambda q: [('q', norm(q['q']))], '総合テストの問題', lambda q: q['q'][:20])
        scan(col['quiz'], lambda q: [('q', norm(q['q']))], '確認問題', lambda q: q['q'][:20])
        for r in col['chRefs']:
            if r['n'] not in allc and ('%02d' % int(r['n']) if r['n'].isdigit() else r['n']) not in allc:
                err('%s: %s の ch が存在しない章 %s を指しています' % (r['f'], r['where'], r['n']))

    # エンジン・CSS
    eng = []
    for f in sorted((FW / 'js').glob('engine-*.js')):
        code = read(f)
        node_check(f.name, code)
        eng.append('/* ==== %s ==== */\n%s' % (f.name, js_safe(f.name, code)))
    boot = read(FW / 'js' / 'boot.js')
    css = '\n'.join('/* ==== %s ==== */\n%s' % (f.name, read(f)) for f in sorted((FW / 'css').glob('*.css')))
    if accent:
        css += accent_css(accent)

    # ナビ・入口・章
    nav = ['<a class="nav-home" href="#home">入口（はじめに）</a>']
    cards = []
    tclass = lambda t: 'tk%d' % tones.get(t, 0)
    nparts = 0
    for p in parts:
        members = [n for n in order if allc[n]['part'] == p['id']]
        if not members:
            continue
        if p['id'] not in appendix:
            nparts += 1
        nav.append('<h2>%s</h2><ol>' % esc(p['name']))
        cards.append('    <div class="part-card"><h3><small>%s</small>%s</h3><ol>' % (esc(p['name'].split(' ')[0]), esc(p['short'])))
        for n in members:
            c = allc[n]
            cls = '' if c['ready'] else ' class="pend"'
            lab = '<em>準備中</em>' if not c['ready'] else ''
            tr = '<span class="tr">%s</span>' % esc(c['track']) if c['track'] else '<span class="tr" hidden></span>'
            if pub and not c['ready']:      # 公開しない章：題だけ。リンクにしない
                nav.append('<li class="pend np"><span class="row"><span class="n">%s</span><span class="t">%s</span><em>準備中</em></span></li>' % (n, esc(c['title'])))
                cards.append('      <li class="pend np"><span class="n">%s</span><span class="t">%s</span>%s</li>' % (n, esc(c['title']), lab))
                continue
            nav.append('<li%s><a href="#ch%s" data-ch="%s"><span class="n">%s</span><span class="t">%s</span>%s</a></li>' % (cls, n, n, n, esc(c['title']), tr))
            cards.append('      <li%s><span class="n">%s</span><a href="#ch%s" data-ch="%s">%s</a>%s</li>' % (cls, n, n, n, esc(c['title']), lab))
        nav.append('</ol>')
        cards.append('    </ol></div>')

    seq = [n for n in order if allc[n]['part'] in pdef]
    first_ready = next(n for n in seq if allc[n]['ready'])
    chs = []
    for idx, n in enumerate(seq):
        c = allc[n]
        pname = pdef[c['part']]['name']
        kicker = ('%s ・ 第%s章' % (pname, n)) if n.isdigit() or not pub else pname
        meta = ''
        if c['track']:
            meta += '<span class="chip %s">%s</span>' % (tclass(c['track']), esc(c['track']))
        if c['time']:
            meta += '<span class="chip">所要 約%d分</span>' % c['time']
        head = ('<header class="ch-head"><p class="ch-kicker">%s</p><h2 class="ch-title" id="ch%s-title">%s</h2><p class="ch-meta">%s</p></header>' % (esc(kicker), n, esc(c['title']), meta))
        prev = seq[idx - 1] if idx > 0 else None
        nxt = seq[idx + 1] if idx + 1 < len(seq) else None
        pn = []
        lab_of = lambda k: esc(('第%s章 %s' % (k, allc[k]['title'])) if k.isdigit() else allc[k]['title'])
        def nearest_ready(step):
            """公開版で、準備中の章が続くとき、その先の公開済みの章と、飛ばす章の番号を返す（なければ None）。"""
            j, skipped = idx + step, []
            while 0 <= j < len(seq) and not allc[seq[j]]['ready']:
                skipped.append(seq[j])
                j += step
            if 0 <= j < len(seq) and skipped:
                return seq[j], sorted(skipped)
            return None

        def skip_note(skipped):
            if all(k.isdigit() for k in skipped):
                nums = [int(k) for k in skipped]
                if nums == list(range(nums[0], nums[-1] + 1)) and len(nums) > 1:
                    return '第%02d〜%02d章は準備中' % (nums[0], nums[-1])
                return '第%s章は準備中' % '・'.join(skipped)
            return '間の章は準備中'
        pv = nr = None
        if pub and c['ready']:
            if prev and not allc[prev]['ready']:
                pv = nearest_ready(-1)
            if nxt and not allc[nxt]['ready']:
                nr = nearest_ready(1)
        if pv:
            pn.append('<a class="prev" href="#ch%s"><small>← 前の公開済みの章（%s）</small>%s</a>' % (pv[0], skip_note(pv[1]), lab_of(pv[0])))
        elif prev and pub and not allc[prev]['ready']:
            pn.append('<span class="prev pend" aria-disabled="true"><small>← 前の章（準備中）</small>%s</span>' % lab_of(prev))
        else:
            pn.append('<a class="prev" href="#ch%s"><small>← 前の章</small>%s</a>' % (prev, lab_of(prev)) if prev else '<a class="prev" href="#home"><small>← 入口</small>はじめに</a>')
        if nr:
            pn.append('<a class="next" href="#ch%s"><small>次の公開済みの章（%s） →</small>%s</a>' % (nr[0], skip_note(nr[1]), lab_of(nr[0])))
        elif nxt and pub and not allc[nxt]['ready']:
            pn.append('<span class="next pend" aria-disabled="true"><small>次の章（準備中）</small>%s</span>' % lab_of(nxt))
        elif nxt:
            pn.append('<a class="next" href="#ch%s"><small>次の章 →</small>%s</a>' % (nxt, lab_of(nxt)))
        foot = '<footer class="ch-foot">%s<nav class="pn" aria-label="前後の章">%s</nav></footer>' % (
            '<div class="readrow"><button class="btn read" type="button" data-read="%s" aria-pressed="false">☐ この章を読了にする</button></div>' % n if c['ready'] else '', ''.join(pn))
        if c['ready']:
            cnt = [0]

            def addid(m, n=n, cnt=cnt):
                if 'id=' in m.group(1):
                    return m.group(0)
                cnt[0] += 1
                return '<h3%s id="ch%s-s%d">' % (m.group(1), n, cnt[0])
            body = re.sub(r'<h3([^>]*)>', addid, c['body'])
            if pub:      # 未公開の章へのリンクは、リンクにせず「準備中」と分かる表示にする
                body = re.sub(r'<a\s+href="#ch(\d+)"[^>]*>(.*?)</a>', lambda m: m.group(0) if allc.get(m.group(1), {}).get('ready') else '<span class="pend-link">%s<em>（準備中）</em></span>' % m.group(2), body, flags=re.S)
            chs.append('<article id="ch%s" class="view chapter" data-ch="%s" aria-labelledby="ch%s-title">\n%s\n%s\n%s\n</article>' % (n, n, n, head, body, foot))
        else:
            chs.append('<article id="ch%s" class="view chapter pending" data-ch="%s" aria-labelledby="ch%s-title">\n%s\n<div class="pending-box"><p><b>準備中</b></p><p>%s</p></div>\n%s\n</article>' % (n, n, n, head, esc((pub or {}).get('pending_text') or ('この章は検証が済み次第、公開します。' if pub else 'この章は執筆中です。公開までお待ちください。')), foot))

    glossary_ch = None
    for n, m in chapters.items():
        if 'data-widget="glossary"' in m['body']:
            glossary_ch = n

    # 入口
    hero = course.get('hero') or {}
    how = hero.get('how') or [
        {'t': '順番に読む。', 'd': '各章冒頭の「この章で分かること」で全体をつかんでから、本文へ進みます。'},
        {'t': '図を自分で動かす。', 'd': '図は押す・矢印キーで動かせます。工程は「次へ」で一つずつ、断面は部位を押して確かめます。'},
        {'t': '確認問題で締める。', 'd': '章末の問題を解き、間違えた点は章へ戻ります。成績は端末に保存されます。'},
        {'t': '用語と総合テストで復習。', 'd': '用語集で言葉を引き、総合テストで抜けを探します。'},
    ]
    if pub:
        unready = {n for n in allc if not allc[n]['ready']}
        how = [dict(x, d=annotate_route(x['d'], unready, 0)) for x in how]
    status = ('    <p class="pub-status"><b>公開状況</b>%s</p>\n' % esc(pub['hero_status'])) if pub and pub.get('hero_status') else ''
    links = ''.join('<a class="btn" href="%s">%s</a>' % (esc(x['href']), esc(x['label'])) for x in hero.get('links', []))
    notice = hero.get('notice') or '出典と時点は各章の「参照資料」に書いてあります。内容は変わることがあるため、実務に使う前に最新の一次資料を確認してください。'
    home = ('<section id="home" class="view home" aria-labelledby="home-title">\n'
            '  <div class="hero">\n    <p class="eyebrow">%s</p>\n    <h1 id="home-title" class="ch-title">%s</h1>\n    <p class="sub">%s</p>\n    <p class="lead">%s</p>\n%s%s'
            '    <div class="hero-prog">\n'
            '      <svg id="hero-ring" class="ring" viewBox="0 0 76 76" role="img" aria-label="読了率"><circle class="bg" cx="38" cy="38" r="32"></circle><circle class="fg" cx="38" cy="38" r="32" transform="rotate(-90 38 38)" stroke-dasharray="201" stroke-dashoffset="201"></circle><text x="38" y="38">0%%</text></svg>\n'
            '      <div class="stat"><div id="hero-stat">読了 0 章</div><ul id="hero-scores" class="score-list"></ul></div>\n'
            '      <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-left:auto">\n        <a class="btn pri" href="#ch%s">%s</a>\n        <a class="btn" id="resume" href="#home" hidden>続きから読む</a>\n        <button class="btn sm" id="reset-progress" type="button">記録をリセット</button>\n      </div>\n    </div>\n  </div>\n\n'
            '  <h2 class="home-h">この資料の構成（%d部%s）</h2>\n  <div class="part-grid">\n%s\n  </div>\n\n'
            '  <h2 class="home-h">学習の進め方</h2>\n  <ol class="how">\n%s\n  </ol>\n\n'
            '  <h2 class="home-h">使い方</h2>\n  <ul class="kbd-list">\n    <li><kbd>/</kbd> 全文検索</li><li><kbd>[</kbd> <kbd>]</kbd> 前後の章</li>\n    <li>図：<kbd>Tab</kbd> で選び <kbd>Enter</kbd> で開く、矢印キーで移動</li>\n    <li>工程フロー・シーケンス：<kbd>←</kbd> <kbd>→</kbd> で進む</li><li>☀／☾：ダークとライトの切替</li><li>印刷：表示中の章がそのまま白地で印刷できます</li>\n  </ul>\n'
            '  <p style="color:var(--muted);font-size:.88rem;margin-top:1rem">%s</p>\n</section>') % (
        esc(hero.get('eyebrow', 'TTJ 教育資料')), esc(course['title']), esc(course['subtitle']), esc(hero.get('lead', course.get('description', ''))), status,
        ('    <p style="display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 1.2rem">%s</p>\n' % links) if links else '',
        first_ready, esc(hero.get('start', '第%d章から始める' % int(first_ready) if first_ready.isdigit() else '最初から始める')),
        nparts, '＋付録' if appendix & {allc[n]['part'] for n in seq} - ({'S'} if demo else set()) else '', '\n'.join(cards),
        '\n'.join('    <li><b>%s</b>%s</li>' % (esc(x['t']), linkify_route(esc(x['d']))) for x in how), esc(notice))

    home_link = course['footer']['home']
    doc_title = '%s | TTJ' % course['title'] if not course.get('docTitle') else course['docTitle']
    ogp = course.get('ogp') or {}
    og_title = ogp.get('title', course['title'])
    og_desc = ogp.get('description', course.get('description', course['subtitle']))
    metas = ['<meta name="description" content="%s">' % esc(course.get('description', course['subtitle'])),
             '<meta name="author" content="TTJ">',
             '<meta name="theme-color" content="#0B1F3A">',
             '<meta property="og:type" content="%s">' % esc(ogp.get('type', 'website')),
             '<meta property="og:site_name" content="TTJ">',
             '<meta property="og:locale" content="%s">' % esc(ogp.get('locale', 'ja_JP')),
             '<meta property="og:title" content="%s">' % esc(og_title),
             '<meta property="og:description" content="%s">' % esc(og_desc)]
    if ogp.get('url'):
        metas.append('<meta property="og:url" content="%s">' % esc(ogp['url']))
    if ogp.get('image'):
        metas.append('<meta property="og:image" content="%s">' % esc(ogp['image']))
    metas.append('<meta name="twitter:card" content="%s">' % ('summary_large_image' if ogp.get('image') else 'summary'))
    exam_cfg = dict(course.get('exam', {}))
    if pub:      # 公開版：問題数は実数に合わせる
        nq = len(col['exam']) if col else 0
        exam_cfg.pop('target', None)
        exam_cfg['intro'] = (pub.get('appendix') or {}).get('exam_intro') or ('公開中の章から %d 問。部ごとの成績が出ます。' % nq)
    cfg = {'slug': course['slug'], 'prefix': course['prefix'], 'title': course['title'], 'subtitle': course['subtitle'], 'docTitle': doc_title,
           'glossaryCh': glossary_ch, 'kinds': course.get('kinds', {}), 'labels': course.get('labels', {}), 'mapping': course.get('mapping', {}), 'exam': exam_cfg, 'publish': bool(pub),
           'themeColor': {'dark': '#0B1F3A', 'light': '#FFFFFF'}}
    meta_json = json.dumps([dict(num=n, part=allc[n]['part'], title=allc[n]['title'], track=allc[n]['track'], time=allc[n]['time'], ready=allc[n]['ready']) for n in seq], ensure_ascii=False)
    part_json = json.dumps([dict(key=p['id'], name=p['name'], short=p['short'], appendix=bool(p.get('appendix'))) for p in parts], ensure_ascii=False)

    shell = read(FW / 'shell.html')
    rep = {
        '{{SLUG}}': esc(course['slug']), '{{DOC_TITLE}}': esc(doc_title), '{{META}}': '\n'.join(metas), '{{PREFIX_JS}}': json.dumps(course['prefix']),
        '{{BRAND_TITLE}}': esc(course['title']), '{{BRAND_SUB}}': esc(course['subtitle']),
        '{{CSS}}': css, '{{NAV}}': '\n'.join(nav), '{{HOME}}': home, '{{CHAPTERS}}': '\n\n'.join(chs),
        '{{FOOT_LEFT}}': '© TTJ', '{{FOOT_RIGHT}}': '<a href="%s">%s</a>' % (esc(home_link['href']), esc(home_link['label'])),
        '{{CFG}}': json.dumps(cfg, ensure_ascii=False).replace('</', '<\\/'),
        '{{CHAPTER_META}}': meta_json.replace('</', '<\\/'), '{{PART_META}}': part_json.replace('</', '<\\/'),
        '{{ENGINE}}': '\n'.join(eng), '{{DATA}}': '\n'.join(dscripts), '{{BOOT}}': boot,
    }
    out = re.sub(r'\{\{[A-Z_]+\}\}', lambda m: rep.get(m.group(0), m.group(0)), shell)
    left = sorted(set(re.findall(r'\{\{[A-Z_]+\}\}', shell)) - set(rep))
    if left:
        warn('shell.html に未知のプレースホルダ: %s' % left)
    for bad in FORBIDDEN_TEXT:
        if bad in out:
            err('出力に「%s」が含まれています（作者名・ハンドルは入れない）' % bad)

    # 章 HTML の検査
    all_ids = {'home'}
    for n, m in chapters.items():
        c = check_fragment('chapter ' + m['file'], m['body'])
        all_ids.update(c.ids)
        for i in c.ids:
            if not i.startswith('ch%s-' % n):
                err('%s: id "%s" は ch%s- で始める決まりです' % (m['file'], i, n))
        for b in c.bad:
            err('%s: 章に使えないもの: %s（<script>・<style>・画像・インラインの色の直書きは不可）' % (m['file'], b))
        for kind, src in c.widgets:
            if kind not in KNOWN_WIDGETS:
                err('%s: 未知の部品 data-widget="%s"（%s）' % (m['file'], kind, '/'.join(sorted(KNOWN_WIDGETS))))
                continue
            if kind in NO_SRC:
                continue
            kk = {'qos': 'table', 'keys': 'tree'}.get(kind, kind)
            if src is None:
                err('%s: data-widget="%s" に data-src がありません' % (m['file'], kind))
            elif (kk, src) not in registered and col is not None:
                err('%s: データ未登録 %s/%s（data/*.js に CN.add(\'%s\',\'%s\',…) が必要）' % (m['file'], kind, src, kind, src))
            elif not src.startswith('c%s-' % n) and n != 'S1':
                warn('%s: 他章のデータ %s/%s を参照しています' % (m['file'], kind, src))
        b = m['body']
        if n.isdigit() and m['part'] not in appendix:
            if 'class="learn"' not in b:
                warn('%s: 「この章で分かること」(class="learn") がありません' % m['file'])
            if not any(k == 'quiz' for k, _ in c.widgets):
                warn('%s: 確認問題（data-widget="quiz"）がありません' % m['file'])
            if 'class="refs"' not in b:
                warn('%s: 参照資料（class="refs"）がありません' % m['file'])
        for h in c.hrefs:
            t = h[1:]
            mm = re.fullmatch(r'ch(\d+|[A-Z]\d+)', t)
            if mm and t[2:] not in allc:
                err('%s: リンク切れ %s（その章がありません）' % (m['file'], h))
    final = check_fragment('assembled', out)
    cnt = {}
    for i in final.ids:
        cnt[i] = cnt.get(i, 0) + 1
    for i, k in cnt.items():
        if k > 1:
            err('重複 id: %s ×%d' % (i, k))
    ids_final = set(final.ids)
    for h in final.hrefs:
        t = h[1:]
        if t and t not in ids_final:
            err('リンク切れ: %s（その id がありません）' % h)

    dg = [c for c in allc.values() if c['num'].isdigit()]
    summary = '章 %d/%d 公開, データ %d 件, HTML %.0f KB' % (sum(1 for c in dg if c['ready']), len(dg), len(registered), len(out.encode('utf-8')) / 1024)
    if errors:
        print('FAILED:', len(errors), 'errors,', len(warns), 'warnings')
        return 1
    if not check_only:
        dst = pub['out_path'] if pub else cdir / course['out']
        if demo:
            dst = dst.with_name(dst.stem + '.demo' + dst.suffix)
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(out, encoding='utf-8')
        print('OK ->', dst, '(' + summary + ')', len(warns), 'warnings')
    else:
        print('OK (check only)', summary, len(warns), 'warnings')
    return 0


def main(argv=None):
    ap = argparse.ArgumentParser(description='講座ディレクトリ（course.json, chapters/, data/）から単一 HTML を組み立てる。')
    ap.add_argument('course_dir', help='講座ディレクトリ（例 /home/claude/courses/_demo）')
    ap.add_argument('--check', action='store_true', help='出力を書かず、検査だけ行う（重複・未定義の参照・欠番・リンク切れ）')
    ap.add_argument('--demo', action='store_true', help='部品見本の章（S1）を足した版を <out>.demo.html に出す')
    ap.add_argument('--publish', metavar='設定.json|範囲', help='公開する章だけの版を作る。公開設定の JSON（講座ディレクトリの外に置く）か、章の範囲（例 01-05）')
    ap.add_argument('--out', metavar='パス', help='--publish の出力先（設定の "out" より優先）')
    a = ap.parse_args(argv)
    cdir = Path(a.course_dir).resolve()
    if not cdir.is_dir():
        print('ERROR 講座ディレクトリがありません: %s' % cdir)
        return 1
    if a.out and not a.publish:
        print('ERROR --out は --publish と一緒に使います')
        return 1
    return build(cdir, demo=a.demo, check_only=a.check, publish=a.publish, out_arg=a.out)


if __name__ == '__main__':
    sys.exit(main())
