/* ═══════════════════════════════════════════════════════════
   HERO PHOTO — 2-layer cursor reveal
     base    = stylized art (always visible)
     reveal  = real portrait (visible only within cursor radius)
   No GSAP. Vanilla rAF lerp.
   ═══════════════════════════════════════════════════════════ */

(() => {
  const stage    = document.getElementById('heroPhoto');
  if (!stage) return;
  const baseEl   = document.getElementById('heroBase');
  const revealEl = document.getElementById('heroReveal');
  const fallEl   = document.getElementById('heroFallback');
  const coordEl  = document.getElementById('heroCoord');

  /* candidates: base (stylized art) and reveal (real photo).
     The first that loads in each list wins. */
  const baseCandidates = [
    '/assets/photos/portrait-art.png',
    '/assets/photos/portrait-art.jpg',
    '/assets/photos/portrait-art.webp',
  ];
  const revealCandidates = [
    '/assets/photos/portrait.jpg',
    '/assets/photos/portrait.png',
    '/assets/photos/portrait.webp',
  ];

  let baseLoaded = false;
  let revealLoaded = false;

  function setLayer(varName, el, candidates, idx, onSuccess) {
    if (idx >= candidates.length) return;
    const test = new Image();
    test.onload = () => {
      stage.style.setProperty(varName, `url("${candidates[idx]}")`);
      onSuccess?.();
    };
    test.onerror = () => setLayer(varName, el, candidates, idx + 1, onSuccess);
    test.src = candidates[idx];
  }

  setLayer('--photo-base', baseEl, baseCandidates, 0, () => {
    baseLoaded = true;
    if (fallEl) fallEl.style.opacity = '0';
  });
  setLayer('--photo-reveal', revealEl, revealCandidates, 0, () => {
    revealLoaded = true;
    if (fallEl) fallEl.style.opacity = '0';
  });

  /* cursor lerp */
  let engaged = false;
  let rafId = null;
  let targetX = 50, targetY = 40;
  let currentX = 50, currentY = 40;

  function update(e) {
    const rect = stage.getBoundingClientRect();
    const t = e.touches?.[0] || e;
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    targetX = (x / rect.width) * 100;
    targetY = (y / rect.height) * 100;
    if (!engaged) {
      engaged = true;
      stage.classList.add('engaged');
    }
    if (coordEl) {
      coordEl.textContent = `x: ${x.toFixed(0).padStart(3, ' ')} · y: ${y.toFixed(0).padStart(3, ' ')}`;
    }
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick() {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    stage.style.setProperty('--px', currentX + '%');
    stage.style.setProperty('--py', currentY + '%');
    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  stage.addEventListener('mousemove', update);
  stage.addEventListener('touchstart', update, { passive: true });
  stage.addEventListener('touchmove',  update, { passive: true });

  /* mobile: auto-engage to show the real photo without requiring hover */
  if (window.matchMedia('(hover: none)').matches) {
    setTimeout(() => stage.classList.add('engaged'), 600);
  }
})();
