/* ═══════════════════════════════════════════════════════════
   MAIN — clock, nav, scroll-spy, IntersectionObserver fades
   ═══════════════════════════════════════════════════════════ */

(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ── live clock ── */
  const clock = $('#liveClock');
  if (clock) {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-CA', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });
      clock.textContent = t;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ── mobile nav toggle ── */
  const navToggle = $('#navToggle');
  const navLinks  = $('#navLinks');
  navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks?.classList.remove('open')));

  /* ── nav theme: dark on hero/contact/stats, light otherwise ── */
  const navEl = $('.nav');
  const darkSections = ['.hero', '.contact', '.stats'].map(s => $(s)).filter(Boolean);
  const onScrollTheme = () => {
    const y = window.scrollY + 30;
    let onDark = false;
    darkSections.forEach(s => {
      const top = s.offsetTop, bot = top + s.offsetHeight;
      if (y >= top && y < bot) onDark = true;
    });
    navEl.classList.toggle('light', !onDark);
  };
  window.addEventListener('scroll', onScrollTheme, { passive: true });
  onScrollTheme();

  /* ── scroll-spy ── */
  const spyIds = ['about', 'experience', 'stats', 'skills', 'work', 'approach', 'contact'];
  const spyMap = {};
  spyIds.forEach(id => {
    const sec = document.getElementById(id);
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (sec && link) spyMap[id] = { sec, link };
  });
  const onScrollSpy = () => {
    const y = window.scrollY + 140;
    let active = null;
    Object.entries(spyMap).forEach(([id, { sec }]) => { if (sec.offsetTop <= y) active = id; });
    Object.values(spyMap).forEach(({ link }) => link.classList.remove('active'));
    if (active && spyMap[active]) spyMap[active].link.classList.add('active');
  };
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  /* ── IntersectionObserver fade-in ──
     Pre-mark above-fold elements as .in-view synchronously to avoid the
     flash of empty hero while IO callbacks queue. */
  const fadeEls = $$('.fade-in');
  const vh = window.innerHeight;
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) el.classList.add('in-view');
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    fadeEls.forEach(el => {
      if (!el.classList.contains('in-view')) io.observe(el);
    });
  } else {
    fadeEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── experience spine animator ── */
  const spine = $('#expSpine');
  if (spine && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) spine.classList.add('in-view'); });
    }, { threshold: 0.1 });
    io.observe(spine);
  }

  /* ── one-pager placeholder ── */
  $('#downloadOnePager')?.addEventListener('click', e => {
    e.preventDefault();
    alert('One-pager coming next phase. For now: shahz.siddiqui@outlook.com — happy to send one over.');
  });

  /* ── skill copy buttons ── */
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const text = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // fallback for older browsers / non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch {}
        document.body.removeChild(ta);
      }
      const original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1500);
    });
  });
})();
