/* BuildWithMaha v6.2 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const curtain = document.querySelector('.curtain');
  if (curtain) {
    window.addEventListener('load', () => {
      setTimeout(() => { curtain.classList.add('done'); setTimeout(() => curtain.remove(), 800); }, 800);
    });
    setTimeout(() => { if (document.body.contains(curtain)) { curtain.classList.add('done'); setTimeout(() => curtain.remove(), 800); } }, 2400);
  }

  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, [data-stagger], .chart, .hand-u').forEach(el => io.observe(el));

  const sio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('struck'); sio.unobserve(e.target); } });
  }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.struck-on-view').forEach((el, idx) => {
    if (reduced) { el.classList.add('struck'); return; }
    sio.observe(el);
    const r = el.getBoundingClientRect();
    if (idx === 0 || r.top < window.innerHeight * 1.5) setTimeout(() => el.classList.add('struck'), 700);
  });

  const lio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('lit'); });
  }, { threshold: 0.5 });
  document.querySelectorAll('.leak-row').forEach(el => lio.observe(el));

  /* funnel calculator */
  const calc = document.getElementById('calc');
  if (calc) {
    const range = document.getElementById('cRange');
    const elEnq = document.getElementById('cEnq');
    const elCalls = document.getElementById('cCalls');
    const elClients = document.getElementById('cClients');
    const elRate = document.getElementById('cRate');
    const CLICKS = 1000, CALL_RATE = 0.5, CLOSE_RATE = 0.42;
    function paint() {
      const rate = parseFloat(range.value);
      const enq = Math.round(CLICKS * rate / 100);
      const calls = Math.round(enq * CALL_RATE);
      const clients = Math.round(calls * CLOSE_RATE);
      elRate.textContent = rate.toFixed(1) + '%';
      [[elEnq, enq], [elCalls, calls], [elClients, clients]].forEach(([el, v]) => {
        const t = v.toLocaleString('en-GB');
        if (el.textContent !== t) {
          el.textContent = t;
          el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
        }
      });
      const pct = ((rate - range.min) / (range.max - range.min)) * 100;
      range.style.backgroundSize = pct + '% 100%';
    }
    range.addEventListener('input', paint);
    paint();
  }

  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.textContent = open ? '✕' : '☰';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); burger.textContent = '☰';
    }));
  }

  const sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    window.addEventListener('scroll', () => {
      sticky.classList.toggle('show', window.scrollY > window.innerHeight * 0.85);
    }, { passive: true });
  }


  /* reading progress hairline */
  const prog = document.createElement('div');
  prog.className = 'progress';
  document.body.appendChild(prog);
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });

  /* heading wipe: wrap h1/h2.reveal contents in a masked span */
  document.querySelectorAll('h1.reveal, h2.reveal').forEach(h => {
    if (h.querySelector('.wipe')) return;
    const w = document.createElement('span');
    w.className = 'wipe';
    while (h.firstChild) w.appendChild(h.firstChild);
    h.appendChild(w);
  });

  /* FAQ: wrap answers so the grid-rows open animation works */
  document.querySelectorAll('.faq .a').forEach(a => {
    if (!a.querySelector('.aw')) {
      const w = document.createElement('div');
      w.className = 'aw';
      while (a.firstChild) w.appendChild(a.firstChild);
      a.appendChild(w);
    }
  });

  /* stat numbers: ensure inner span exists for the mask rise */
  document.querySelectorAll('.stat .n').forEach(n => {
    if (!n.children.length) {
      const s = document.createElement('span');
      s.textContent = n.textContent;
      n.textContent = '';
      n.appendChild(s);
    }
  });

  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
})();
