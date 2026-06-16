/* BuildWithMaha v4 "Ridge" — shared interactions */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- intro ---- */
  const curtain = document.querySelector('.curtain');
  if (curtain) {
    window.addEventListener('load', () => {
      setTimeout(() => { curtain.classList.add('done'); setTimeout(() => curtain.remove(), 1000); }, 900);
    });
    setTimeout(() => { if (document.body.contains(curtain)) { curtain.classList.add('done'); setTimeout(() => curtain.remove(), 1000); } }, 2800);
  }

  /* ---- kinetic type: word mask reveal ---- */
  document.querySelectorAll('.kinetic').forEach(el => {
    if (reduced) { el.classList.add('in'); return; }
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (/^\s+$/.test(part) || part === '') { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    el.querySelectorAll('.w > span').forEach((s, i) => s.style.transitionDelay = (1.1 + i * 0.06) + 's');
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
  });

  /* ---- scroll reveals ---- */
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .reveal-l, [data-stagger]').forEach(el => io.observe(el));

  /* ---- counters ---- */
  const cio = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
      const dec = (el.dataset.count.split('.')[1] || '').length;
      if (reduced) { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
      const dur = 1600, t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  /* ---- leaks light up ---- */
  const lio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('lit'); });
  }, { threshold: 0.55 });
  document.querySelectorAll('.leak-row').forEach(el => lio.observe(el));

  /* ---- anatomy highlight ---- */
  const notes = document.querySelectorAll('.anatomy-notes .note');
  if (notes.length) {
    const nio = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.dataset.block;
        document.querySelectorAll('.ph-block').forEach(b => b.classList.toggle('hot', b.dataset.block === id));
      });
    }, { threshold: 0.6 });
    notes.forEach(n => nio.observe(n));
  }

  /* ---- THE RIDGE: line draws itself with scroll, dot travels it ---- */
  const ridge = document.querySelector('.ridge');
  if (ridge && !reduced) {
    const path = ridge.querySelector('.path');
    const traveler = ridge.querySelector('.traveler');
    const dots = [...ridge.querySelectorAll('.leakdot')];
    const lbls = [...ridge.querySelectorAll('.leaklbl')];
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
    // progress thresholds (fraction of path) where the three leaks sit
    const marks = dots.map(d => parseFloat(d.dataset.at));

    let target = 0, current = 0, raf = null;
    function progress() {
      const r = ridge.getBoundingClientRect();
      const vh = window.innerHeight;
      // start drawing when ridge enters, finish when its bottom passes ~35% of viewport
      const total = r.height + vh * 0.6;
      const done = Math.min(Math.max((vh * 0.9 - r.top) / total, 0), 1);
      target = done;
      if (!raf) raf = requestAnimationFrame(tween);
    }
    function tween() {
      current += (target - current) * 0.085;
      if (Math.abs(target - current) < 0.0008) current = target;
      const drawn = L * current;
      path.style.strokeDashoffset = L - drawn;
      if (traveler) {
        const pt = path.getPointAtLength(drawn);
        traveler.setAttribute('cx', pt.x);
        traveler.setAttribute('cy', pt.y);
        traveler.setAttribute('r', current > 0.005 && current < 0.995 ? 5 : 0);
      }
      marks.forEach((m, i) => {
        const on = current >= m;
        dots[i].classList.toggle('on', on);
        lbls[i] && lbls[i].classList.toggle('on', on);
      });
      if (current !== target) raf = requestAnimationFrame(tween);
      else raf = null;
    }
    window.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress);
    progress();
  } else if (ridge && reduced) {
    ridge.querySelectorAll('.leakdot,.leaklbl').forEach(el => el.classList.add('on'));
  }

  /* ---- gentle parallax ---- */
  const prlx = [...document.querySelectorAll('[data-prlx]')];
  if (prlx.length && !reduced) {
    let ticking = false;
    function move() {
      ticking = false;
      const vh = window.innerHeight;
      prlx.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const center = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        const amt = parseFloat(el.dataset.prlx) || 30;
        el.style.transform = 'translateY(' + (center * amt) + 'px)';
      });
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }

  /* ---- nav ---- */
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('x', open);
      burger.textContent = open ? '✕' : '☰';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close the menu after tapping a link
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); burger.classList.remove('x'); burger.textContent = '☰';
    }));
  }

  /* ---- sticky mobile CTA ---- */
  const sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    window.addEventListener('scroll', () => {
      sticky.classList.toggle('show', window.scrollY > window.innerHeight * 0.85);
    }, { passive: true });
  }


  /* ---- v5: teardown strikes + margin notes ---- */
  const sio = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('struck'); sio.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  const strikeDelay = document.querySelector('.curtain') ? 1300 : 0;
  setTimeout(() => {
    document.querySelectorAll('.struck-on-view').forEach(el => {
      if (reduced) { el.classList.add('struck'); return; }
      sio.observe(el);
    });
  }, strikeDelay);

  const mio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); mio.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.mnote').forEach(el => mio.observe(el));

  /* ---- year ----
 */
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
})();
