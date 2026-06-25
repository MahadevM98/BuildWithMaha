/* BuildWithMaha v6 "Ledger" — shared interactions */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* intro curtain */
  const curtain = document.querySelector('.curtain');
  if (curtain) {
    window.addEventListener('load', () => {
      setTimeout(() => { curtain.classList.add('done'); setTimeout(() => curtain.remove(), 800); }, 850);
    });
    setTimeout(() => { if (document.body.contains(curtain)) { curtain.classList.add('done'); setTimeout(() => curtain.remove(), 800); } }, 2600);
  }

  /* generic reveals */
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, [data-stagger], .chart').forEach(el => io.observe(el));

  /* strike-on-view (cut lines) */
  const sio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('struck'); sio.unobserve(e.target); } });
  }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.struck-on-view').forEach((el, idx) => {
    if (reduced) { el.classList.add('struck'); return; }
    sio.observe(el);
    const r = el.getBoundingClientRect();
    if (idx === 0 || r.top < window.innerHeight * 1.5) setTimeout(() => el.classList.add('struck'), 700);
  });

  /* counters */
  const cio = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
      const dec = (el.dataset.count.split('.')[1] || '').length;
      if (reduced) { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
      const dur = 1500, t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  /* leak rows light up */
  const lio = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('lit'); });
  }, { threshold: 0.5 });
  document.querySelectorAll('.leak-row').forEach(el => lio.observe(el));

  /* mobile nav */
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
      sticky.classList.toggle('show', window.scrollY > window.innerHeight * 0.85);
    }, { passive: true });
  }

  /* year */
  document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
})();
