/* BuildWithMaha v7 "The Letter" */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reading pencil line */
  const prog = document.createElement('div');
  prog.className = 'progress';
  document.body.appendChild(prog);
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });

  /* reveals */
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal, .chart, .scribble, .signoff').forEach(el => io.observe(el));

  /* pencil strikes */
  const sio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('struck'); sio.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.struck-on-view').forEach((el, idx) => {
    if (reduced) { el.classList.add('struck'); return; }
    sio.observe(el);
    const r = el.getBoundingClientRect();
    if (idx === 0 || r.top < window.innerHeight * 1.4) setTimeout(() => el.classList.add('struck'), 800);
  });

  /* funnel calculator */
  const range = document.getElementById('cRange');
  if (range) {
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
      range.style.backgroundSize = (((rate - range.min) / (range.max - range.min)) * 100) + '% 100%';
    }
    range.addEventListener('input', paint);
    paint();
  }

  /* FAQ smooth open */
  document.querySelectorAll('.qa .a').forEach(a => {
    if (!a.querySelector('.aw')) {
      const w = document.createElement('div');
      w.className = 'aw';
      while (a.firstChild) w.appendChild(a.firstChild);
      a.appendChild(w);
    }
  });

  /* nav */
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

  /* sticky mobile CTA */
  const sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    window.addEventListener('scroll', () => {
      sticky.classList.toggle('show', window.scrollY > window.innerHeight * 0.9);
    }, { passive: true });
  }

  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
})();
