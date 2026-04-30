/* ═══════════════════════════════════════════════════════════
   STATS — vanilla CountUp on scroll-into-view
   ═══════════════════════════════════════════════════════════ */

(() => {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;
  const cells = Array.from(grid.querySelectorAll('.stat-cell'));

  function animateValue(el, target, durMs = 1200) {
    const numEl = el.querySelector('.num-target');
    if (!numEl) return;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function frame(now) {
      const t = Math.min(1, (now - start) / durMs);
      const v = Math.round(target * easeOut(t));
      numEl.textContent = v.toLocaleString('en-US');
      if (t < 1) requestAnimationFrame(frame);
      else numEl.textContent = target.toLocaleString('en-US');
    }
    requestAnimationFrame(frame);
  }

  function setBar(el) {
    const bar = el.dataset.bar;
    if (bar) el.style.setProperty('--bar', bar + '%');
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.target, 10);
          if (!isNaN(target)) animateValue(e.target, target);
          setBar(e.target);
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });

    cells.forEach(el => io.observe(el));
  } else {
    cells.forEach(el => {
      const t = parseInt(el.dataset.target, 10);
      if (!isNaN(t)) el.querySelector('.num-target').textContent = t.toLocaleString('en-US');
      setBar(el);
      el.classList.add('in-view');
    });
  }
})();
