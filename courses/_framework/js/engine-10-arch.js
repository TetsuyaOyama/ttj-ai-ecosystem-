/* 部品1：構成図 arch（SVG）— ノードとリンク（線）を押すと詳細。views で表示切替。装置の構成・工程のつながり・輸送の経路などに使える */
(function () {
  'use strict';
  var h = CN.h, s = CN.s;

  CN.widgets.arch = function (el, d, ctx) {
    var T = function (k) { return CN.t(k, d); };
    var views = d.views && d.views.length ? d.views : [{ key: 'main', label: '' }];
    var cur = views[0].key, selId = null;
    var tabs = views.length > 1 ? CN.tabs(views.map(function (v) { return { key: v.key, label: v.label }; }), cur, function (k) { cur = k; selId = null; draw(); showHint(); }, '表示の切替') : null;
    CN.frame(el, T('arch.kind'), d.title, tabs);
    var body = h('div', { 'class': 'wg-body' });
    var scroll = h('div', { 'class': 'scroll-x' });
    var info = h('div', { 'class': 'wg-info', 'aria-live': 'polite' });
    body.appendChild(h('div', { 'class': 'scroll-hint' }, '図は左右にスクロールできます'));
    body.appendChild(scroll);
    var legend = h('div', { 'class': 'legend' });
    body.appendChild(legend);
    el.appendChild(body); el.appendChild(info);
    function drawLegend() {   // 使っている線の種類と、名前をつけた色の枠だけを凡例に出す
      CN.clear(legend);
      var used = {}, ks = {};
      links.forEach(function (l) { used[l.plane || 'cp'] = 1; });
      ['cp', 'up', 'lg'].forEach(function (p) { if (used[p]) legend.appendChild(h('span', null, h('i', { 'class': p }), T('arch.plane.' + p))); });
      nodes.forEach(function (n) { var k = CN.kind(n.kind), nm = CN.kindName(n.kind, d); if (nm && !ks[k]) { ks[k] = 1; legend.appendChild(h('span', null, h('i', { 'class': 'kd kind-' + k }), nm)); } });
      legend.appendChild(h('span', null, T('arch.legendTail')));
    }

    var svg, view, nodes, links, nmap, lkEls, ndEls, placing = [];

    function showHint() {
      CN.clear(info);
      info.appendChild(h('p', { 'class': 'hint' }, (view && view.hint) || d.hint || T('arch.hint')));
    }
    function pick(id) { selId = id; apply(); show(id); }

    function draw() {
      view = null;
      for (var i = 0; i < views.length; i++) if (views[i].key === cur) view = views[i];
      nodes = view.nodes || d.nodes || []; links = view.links || d.links || [];
      var groups = view.groups || d.groups || [], bus = view.bus || d.bus;
      var vb = view.viewBox || d.viewBox || [900, 420];
      nmap = {};
      nodes.forEach(function (n) { n.w = n.w || 124; n.h = n.h || 54; n.cx = n.x + n.w / 2; n.cy = n.y + n.h / 2; nmap[n.id] = n; });
      if (bus) { bus.id = 'bus'; bus.cx = bus.x + bus.w / 2; bus.cy = bus.y + bus.h / 2; nmap.bus = bus; }
      CN.clear(scroll);
      svg = s('svg', { 'class': 'arch-svg', id: ctx.id, viewBox: '0 0 ' + vb[0] + ' ' + vb[1], role: 'group', 'aria-label': d.title + (view.label ? '（' + view.label + '）' : ''), style: 'min-width:' + (d.minW || Math.min(vb[0], 760)) + 'px' });
      groups.forEach(function (g) {
        svg.appendChild(s('rect', { 'class': 'grp', x: g.x, y: g.y, width: g.w, height: g.h, rx: 12 }));
        svg.appendChild(s('text', { 'class': 'grp-l', x: g.x + 10, y: g.y + 17 }, g.label));
      });
      if (bus) {
        svg.appendChild(s('rect', { 'class': 'bus', x: bus.x, y: bus.y, width: bus.w, height: bus.h, rx: 10 }));
        svg.appendChild(s('text', { 'class': 'bus-l', x: bus.cx, y: bus.cy + 4 }, bus.label || ''));
      }
      lkEls = {}; ndEls = {}; placing = [];
      links.forEach(function (l) { svg.appendChild(drawLink(l)); });
      nodes.forEach(function (n) { svg.appendChild(drawNode(n)); });
      placeLabels(groups, bus, vb);
      scroll.appendChild(svg);
      drawLegend();
      apply();
    }


    /* 線のラベルの自動配置：ノード・他のラベル・他の線・囲みの見出しと重ならない位置を、線の上の複数の候補から選ぶ。
       l.lo（手動のずらし）がある線は、その位置を尊重する。既定の位置が重ならなければ動かさない。 */
    function tw(str, fs) { var w = 0; for (var i = 0; i < str.length; i++) w += str.charCodeAt(i) > 255 ? fs : fs * 0.62; return w; }
    function placeLabels(groups, bus, vb) {
      var FS = 11.5, boxes = [], rects = [];
      nodes.forEach(function (n) { rects.push([n.x - 2, n.y - 2, n.x + n.w + 2, n.y + n.h + 2, 1000]); });
      if (bus) rects.push([bus.x, bus.y, bus.x + bus.w, bus.y + bus.h, 1000]);
      groups.forEach(function (g) { rects.push([g.x + 8, g.y + 4, g.x + 14 + tw(g.label, 12) * 1.1, g.y + 22, 1000]); });
      function box(x, y, w) { return [x - w / 2 - 1, y - FS, x + w / 2 + 1, y + 3]; }
      function hitRect(b, r) { return b[0] < r[2] && b[2] > r[0] && b[1] < r[3] && b[3] > r[1]; }
      function segHits(b, pts) {   // 線分が長方形を通る数（4px ごとに標本）
        var n = 0, i, k, m, a, c, len, x, y;
        for (i = 0; i < pts.length - 1; i++) {
          a = pts[i]; c = pts[i + 1]; len = Math.sqrt(Math.pow(c[0] - a[0], 2) + Math.pow(c[1] - a[1], 2)); m = Math.max(1, Math.ceil(len / 4));
          for (k = 0; k <= m; k++) { x = a[0] + (c[0] - a[0]) * k / m; y = a[1] + (c[1] - a[1]) * k / m; if (x > b[0] && x < b[2] && y > b[1] && y < b[3]) { n++; break; } }
        }
        return n;
      }
      var order = placing.slice().sort(function (p, q) { return (q.l.lo ? 1 : 0) - (p.l.lo ? 1 : 0); });   // 手動指定を先に確定
      order.forEach(function (it) {
        var w = tw(it.l.label, FS), cands = [[it.x, it.y]], best, bestScore = Infinity;
        if (!it.l.lo) {
          var nseg = it.pts.length - 1, segs = [], i, j;
          for (i = 0; i < nseg; i++) segs.push(i);
          segs.sort(function (a, b) { return Math.abs(a - (nseg - 1) / 2) - Math.abs(b - (nseg - 1) / 2); });
          segs.forEach(function (si) {
            var p = it.pts[si], q = it.pts[si + 1];
            [0.5, 0.3, 0.7, 0.15, 0.85].forEach(function (t) {
              var mx = p[0] + (q[0] - p[0]) * t, my = p[1] + (q[1] - p[1]) * t;
              cands.push([mx, my - 5], [mx, my + 15], [mx + w / 2 + 8, my + 4], [mx - w / 2 - 8, my + 4]);
            });
          });
        }
        cands.forEach(function (c, ci) {
          var b = box(c[0], c[1], w), sc = ci * 0.05;
          if (b[0] < 0 || b[2] > vb[0] || b[1] < 0 || b[3] > vb[1]) sc += 500;
          rects.forEach(function (r) { if (hitRect(b, r)) sc += r[4]; });
          boxes.forEach(function (r) { if (hitRect(b, r)) sc += 800; });
          placing.forEach(function (o) { sc += (o === it ? 3 : 200) * segHits(b, o.pts); });
          if (sc < bestScore) { bestScore = sc; best = c; }
        });
        it.t.setAttribute('x', best[0].toFixed(1)); it.t.setAttribute('y', best[1].toFixed(1));
        boxes.push(box(best[0], best[1], w));
      });
    }

    function drawNode(n) {
      var g = s('g', { 'class': 'nd kind-' + CN.kind(n.kind), tabindex: 0, role: 'button', 'aria-label': n.label + (n.sub ? '（' + n.sub + '）' : '') + (CN.kindName(n.kind, d) ? '、' + CN.kindName(n.kind, d) : '') + ' の詳細', 'data-id': n.id });
      g.appendChild(s('rect', { x: n.x, y: n.y, width: n.w, height: n.h, rx: 9 }));
      if (n.sub) {
        g.appendChild(s('text', { 'class': 'l1', x: n.cx, y: n.cy - 4 }, n.label));
        g.appendChild(s('text', { 'class': 'l2', x: n.cx, y: n.cy + 14 }, n.sub));
      } else g.appendChild(s('text', { 'class': 'l1', x: n.cx, y: n.cy + 5 }, n.label));
      g.addEventListener('click', function () { pick(n.id); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(n.id); } });
      ndEls[n.id] = g; return g;
    }

    function edgePoint(node, id, from, toward) {
      if (id === 'bus') return [from[0], toward[1] < node.cy ? node.y : node.y + node.h];
      return CN.clip(from[0], from[1], node.w / 2, node.h / 2, toward[0], toward[1]);
    }
    function linkPts(l) {
      var a = nmap[l.a], b = nmap[l.b];
      if (!a || !b) throw new Error('arch: ノード ' + (!a ? l.a : l.b) + ' が見つかりません（リンク ' + l.id + '）');
      var A = [a.cx, a.cy], B = [b.cx, b.cy];
      if (l.a === 'bus') A = [b.cx, a.cy];
      if (l.b === 'bus') B = [a.cx, b.cy];
      var pts = [A].concat((l.via || []).map(function (p) { return p.slice(); }), [B]);
      if (l.off) {
        var dx = B[0] - A[0], dy = B[1] - A[1], L = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / L * l.off, ny = dx / L * l.off;
        pts = pts.map(function (p) { return [p[0] + nx, p[1] + ny]; });
      }
      var n = pts.length, s0 = pts[0], e0 = pts[n - 1];
      pts[0] = edgePoint(a, l.a, s0, pts[1]);
      pts[n - 1] = edgePoint(b, l.b, e0, pts[n - 2]);
      return pts;
    }

    function drawLink(l) {
      var pts = linkPts(l), dstr = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
      var seg = Math.floor((pts.length - 1) / 2), p = pts[seg], q = pts[seg + 1];
      var lx = (p[0] + q[0]) / 2 + (l.lo ? l.lo[0] : 0), ly = (p[1] + q[1]) / 2 + (l.lo ? l.lo[1] : 0) - 5;
      var plane = l.plane || 'cp';
      var g = s('g', { 'class': 'lk ' + (plane === 'up' ? 'up ' : '') + (l.dash || plane === 'lg' ? 'dash' : ''), tabindex: 0, role: 'button', 'aria-label': T('arch.link') + ' ' + l.label + ' の詳細', 'data-id': l.id });
      g.appendChild(s('path', { 'class': 'hit', d: dstr }));
      g.appendChild(s('path', { 'class': 'ln', d: dstr }));
      var lt = s('text', { 'class': 'lb halo', x: lx, y: ly }, l.label);
      g.appendChild(lt);
      g.addEventListener('click', function () { pick(l.id); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(l.id); } });
      lkEls[l.id] = g; placing.push({ l: l, pts: pts, t: lt, x: lx, y: ly });
      return g;
    }

    function related(id) {
      var set = {}; set[id] = 1;
      links.forEach(function (l) { if (l.id === id) { set[l.a] = 1; set[l.b] = 1; } else if (l.a === id || l.b === id) { set[l.id] = 1; set[l.a] = 1; set[l.b] = 1; } });
      return set;
    }
    function apply() {
      var rel = selId ? related(selId) : null;
      Object.keys(ndEls).forEach(function (k) {
        ndEls[k].setAttribute('class', ndEls[k].getAttribute('class').replace(/ ?(dim|sel)/g, '') + (rel && !rel[k] ? ' dim' : '') + (k === selId ? ' sel' : ''));
        ndEls[k].setAttribute('aria-pressed', String(k === selId));
      });
      Object.keys(lkEls).forEach(function (k) {
        lkEls[k].setAttribute('class', lkEls[k].getAttribute('class').replace(/ ?(dim|sel)/g, '') + (rel && !rel[k] ? ' dim' : '') + (k === selId ? ' sel' : ''));
        lkEls[k].setAttribute('aria-pressed', String(k === selId));
      });
    }

    function show(id) {
      CN.clear(info);
      var n = nmap[id] && id !== 'bus' ? nmap[id] : null;
      if (n && ndEls[id]) {
        info.appendChild(h('p', { 'class': 'kick' }, T('arch.node') + (CN.kindName(n.kind, d) ? ' ・ ' + CN.kindName(n.kind, d) : '')));
        info.appendChild(h('h5', null, n.label + (n.sub ? '（' + n.sub + '）' : '')));
        if (n.desc) info.appendChild(CN.richEl('p', '', n.desc));
        if (n.role) { var dl = h('dl', null, h('dt', null, T('arch.f.role')), (function () { var dd = h('dd'); dd.innerHTML = CN.rich(n.role); return dd; })()); info.appendChild(dl); }
        var mine = links.filter(function (l) { return l.a === id || l.b === id; });
        if (mine.length) {
          info.appendChild(h('p', { 'class': 'kick' }, T('arch.linksOf')));
          var c = h('div', { 'class': 'chips' });
          mine.forEach(function (l) {
            var o = l.a === id ? l.b : l.a, on = nmap[o];
            c.appendChild(h('button', { 'class': 'chip', type: 'button', on: { click: function () { pick(l.id); } } }, l.label + ' → ' + (on ? on.label : o)));
          });
          info.appendChild(c);
        }
        if (n.ch && n.ch.length) { info.appendChild(h('p', { 'class': 'kick' }, T('arch.related'))); info.appendChild(CN.chLinks(n.ch)); }
        return;
      }
      var l = links.filter(function (x) { return x.id === id; })[0];
      if (!l) { showHint(); return; }
      var A = nmap[l.a] || {}, B = nmap[l.b] || {};
      info.appendChild(h('p', { 'class': 'kick' }, T('arch.link') + ' ・ ' + T('arch.plane.' + (l.plane || 'cp'))));
      info.appendChild(h('h5', null, l.label + '：' + (A.label || l.a) + T('arch.linkArrow') + (B.label || l.b)));
      var dl2 = h('dl');
      [[T('arch.f.proto'), l.proto], [T('arch.f.carries'), l.carries]].forEach(function (r) {
        if (r[1]) { dl2.appendChild(h('dt', null, r[0])); var dd = h('dd'); dd.innerHTML = CN.rich(r[1]); dl2.appendChild(dd); }
      });
      info.appendChild(dl2);
      if (l.desc) info.appendChild(CN.richEl('p', '', l.desc));
      var c2 = h('div', { 'class': 'chips' });
      [l.a, l.b].forEach(function (o) { if (nmap[o] && o !== 'bus') c2.appendChild(h('button', { 'class': 'chip', type: 'button', on: { click: function () { pick(o); } } }, T('arch.ends') + nmap[o].label)); });
      info.appendChild(c2);
      if (l.ch && l.ch.length) { info.appendChild(h('p', { 'class': 'kick' }, T('arch.related'))); info.appendChild(CN.chLinks(l.ch)); }
    }

    draw();
    if (d.initial) pick(d.initial); else showHint();
  };

  CN.searchText.arch = function (d) {
    var out = [];
    (d.nodes || []).forEach(function (n) { out.push(n.label, n.sub, n.desc, n.role); });
    (d.views || []).forEach(function (v) { (v.nodes || []).forEach(function (n) { out.push(n.label, n.sub, n.desc, n.role); }); (v.links || []).forEach(function (l) { out.push(l.label, l.proto, l.carries, l.desc); }); });
    (d.links || []).forEach(function (l) { out.push(l.label, l.proto, l.carries, l.desc); });
    return out.filter(Boolean).join(' ');
  };
})();
