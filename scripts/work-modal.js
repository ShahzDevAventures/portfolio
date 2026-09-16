/* ═══════════════════════════════════════════════════════════
   WORK MODAL — case study content
   ═══════════════════════════════════════════════════════════ */

(() => {
  const cases = {
    /* Cases 01–03: interim bodies. Only verified figures; full seven-beat
       write-ups land when the drafts are ported. */
    pipeline: {
      title: 'Sirge Delivery Pipeline',
      body: `
        <h4>Context</h4>
        <p>A Sirge conversion engagement was a manual, four-person job — audit, copy, wireframe, design, build — and took about six weeks end to end. The constraint on how many clients we could serve was people, not demand.</p>

        <h4>The approach</h4>
        <p>Treat each stage as its own bottleneck. Automate one, measure what share of the work it actually removed, keep it or kill it, then move to the next.</p>

        <h4>What happened</h4>
        <div class="case-chart">
<svg viewBox="0 0 600 260" role="img" aria-label="Share of build automated by version: v1 35%, v2 55%, v3 35%, v4 80%">
<g stroke="#D9D7CF" stroke-width="1"><line x1="70" y1="30" x2="570" y2="30"/><line x1="70" y1="125" x2="570" y2="125"/><line x1="70" y1="220" x2="570" y2="220"/></g>
<g font-size="16" fill="#6B6960"><text x="60" y="34" text-anchor="end">100%</text><text x="60" y="129" text-anchor="end">50%</text><text x="60" y="224" text-anchor="end">0%</text></g>
<g fill="#111112"><rect x="100" y="153.5" width="80" height="66.5"/><rect x="220" y="115.5" width="80" height="104.5"/><rect x="340" y="153.5" width="80" height="66.5"/><rect x="460" y="68" width="80" height="152"/></g>
<g font-size="19" font-weight="700" fill="#111112"><text x="140" y="145" text-anchor="middle">35%</text><text x="260" y="107" text-anchor="middle">55%</text><text x="380" y="145" text-anchor="middle">35%</text><text x="500" y="60" text-anchor="middle">80%</text></g>
<g font-size="16" fill="#6B6960"><text x="140" y="246" text-anchor="middle">v1</text><text x="260" y="246" text-anchor="middle">v2</text><text x="380" y="246" text-anchor="middle">v3</text><text x="500" y="246" text-anchor="middle">v4</text></g>
</svg>
<div class="cap">Share of the theme build automated, by pipeline version. v3 went backwards; that regression is the point.</div>
</div>
        <p>Audit, copy and wireframe automated cleanly; those three stages are now public skills (<a href="#skills">below</a>). Design automation failed twice before a constrained, design-system-bound version held. Delivery time went from roughly six weeks to two and a half.</p>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Delivery</div><div class="v">6 wks → 2.5 wks</div></div>
          <div class="modal-stat"><div class="label">Bottlenecks</div><div class="v">4, one at a time</div></div>
          <div class="modal-stat"><div class="label">Skills shipped</div><div class="v">3 public</div></div>
        </div>
      `,
    },

    retention: {
      title: 'Sirge Retention',
      body: `
        <h4>Context</h4>
        <p>Sirge ran a 21-day free trial. Week-over-week retention in a trial cohort fell from 75% to 40% to 17%. The obvious read was onboarding.</p>

        <h4>What we tried first</h4>
        <p>We fixed onboarding. Completion rose from 45% to 75%. Retention did not move.</p>

        <h4>What the data said</h4>
        <div class="case-chart">
<svg viewBox="0 0 600 300" role="img" aria-label="Retention fell 75% to 40% to 17% over three weeks while onboarding completion rose 45% to 75%">
<g stroke="#D9D7CF" stroke-width="1"><line x1="70" y1="40" x2="570" y2="40"/><line x1="70" y1="150" x2="570" y2="150"/><line x1="70" y1="260" x2="570" y2="260"/></g>
<g font-size="16" fill="#6B6960"><text x="60" y="44" text-anchor="end">100%</text><text x="60" y="154" text-anchor="end">50%</text><text x="60" y="264" text-anchor="end">0%</text><text x="120" y="288" text-anchor="middle">Week 1</text><text x="320" y="288" text-anchor="middle">Week 2</text><text x="520" y="288" text-anchor="middle">Week 3</text></g>
<polyline points="120,161 320,128 520,95" fill="none" stroke="#6B6960" stroke-width="2" stroke-dasharray="6 5"/>
<polyline points="120,95 320,172 520,222.6" fill="none" stroke="#111112" stroke-width="3"/>
<g fill="#111112"><circle cx="120" cy="95" r="5"/><circle cx="320" cy="172" r="5"/><circle cx="520" cy="222.6" r="5"/></g>
<g fill="#6B6960"><circle cx="120" cy="161" r="4"/><circle cx="320" cy="128" r="4"/><circle cx="520" cy="95" r="4"/></g>
<g font-size="19" font-weight="700" fill="#111112"><text x="120" y="80" text-anchor="middle">75%</text><text x="320" y="196" text-anchor="middle">40%</text><text x="520" y="246" text-anchor="middle">17%</text></g>
<g font-size="16" fill="#6B6960"><text x="120" y="182" text-anchor="middle">45%</text><text x="520" y="82" text-anchor="middle">75%</text></g>
<g font-size="16"><text x="76" y="24" fill="#111112" font-weight="700">━ Retention</text><text x="200" y="24" fill="#6B6960">┄ Onboarding completed</text></g>
</svg>
<div class="cap">Weekly retention vs onboarding completion, 21-day trial cohort. Onboarding went up; retention kept falling.</div>
</div>
        <p>When the two lines diverge like that, onboarding is not the constraint. The 21-day trial was: the product's value arrives on a longer cycle than the trial allowed, so users churned before the payoff regardless of how well they were onboarded.</p>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Retention, wk 1→3</div><div class="v">75 → 40 → 17%</div></div>
          <div class="modal-stat"><div class="label">Onboarding</div><div class="v">45% → 75%</div></div>
          <div class="modal-stat"><div class="label">Constraint</div><div class="v">Trial length</div></div>
        </div>
      `,
    },

    agency: {
      title: 'Agency Segment',
      body: `
        <h4>Context</h4>
        <p>Sirge sold a $99 audit product to Shopify merchants. In usage data, one kind of account behaved differently: agencies were running 21 reports where a merchant ran one. That looked like a second product.</p>

        <h4>The decision</h4>
        <p>We evaluated building for agencies as a distinct product and decided not to. The behaviour was real but the segment was small and the tooling they wanted was workflow, not analysis. The better move was to sell the work, not a second tool: service-enabled engagements on top of the existing product.</p>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Usage signal</div><div class="v">21 reports vs 1</div></div>
          <div class="modal-stat"><div class="label">Customer LTV</div><div class="v">$99 → $7,500 → $22,500</div></div>
          <div class="modal-stat"><div class="label">Built</div><div class="v">No second product</div></div>
        </div>
      `,
    },

    'shop-manager': {
      title: 'Shop Manager',
      body: `
        <h4>Context</h4>
        <p>Four years at Sirge meant four years of watching real customers inside real Shopify stores. Most of what we fixed for clients was not visible in analytics: a shopper scrolling up twice looking for shipping info, a size guide that stalled a purchase, reviews sitting below the fold on a best-seller. Session recordings show these. Almost nobody watches them.</p>

        <h4>How I found the problem</h4>
        <p>Every Sirge client got this analysis because a person on our team did it by hand. The stores that needed it most — too small to A/B test, no analyst, no agency — could not get it at any price we could offer. Free recording tools exist; the missing piece is someone to watch hundreds of replays and say what matters.</p>

        <h4>Problem statement</h4>
        <p>A small Shopify merchant cannot tell which of the invisible moments in their store is costing them the most, so every change they make is a bet.</p>

        <h4>What I considered</h4>
        <p>Another dashboard was the obvious product and the wrong one; merchants already have dashboards they do not read. A DIY recordings tool moves the work to the merchant, who has no time. What was left was the thing that had actually worked at Sirge: a person watches, ranks the findings in dollars, and sends a short list.</p>

        <h4>Why this</h4>
        <p>Shop Manager is that service, productised. Every session watched and mapped, a weekly Floor Report with the three moments costing the most, each with replay evidence and a plain-English fix. Three tiers, split by who does the fixing. Flat pricing, never a percentage of revenue. I wrote the rules for what it will never do — fake timers, phantom stock counts — on the pricing page, because the audience has been sold to badly for years.</p>
        <p>I built it solo: the landing page, the form backend, the tracking, and a $49 audit as the entry offer. The landing page demos the product on the visitor — a walker follows your scroll through the store screens, dead clicks and hesitations get flagged in real time, and the page ends with the same debrief a merchant would get.</p>

        <h4>What happened</h4>
        <p>The page is live and collecting. The first hundred stores lock a founding price. The offer that converts warm traffic is the free walk-through: a merchant drops a store URL and gets a human-written note on where they are likely losing sales. The first desktop version did not land on phones — most of the audience is mobile — so the scroll-driven journey was rebuilt to run at every width before any money went to traffic.</p>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Status</div><div class="v">Live · pre-launch</div></div>
          <div class="modal-stat"><div class="label">Team</div><div class="v">1</div></div>
          <div class="modal-stat"><div class="label">Try it</div><div class="v"><a href="https://shahzsiddiqui.github.io/shop-manager-landing/" target="_blank" rel="noopener">Landing page →</a></div></div>
        </div>

        <h4>What I'd do differently</h4>
        <p>Build mobile first. I knew the traffic mix and still shipped the desktop moment first because it was the more interesting build. And the thing that changed in me: I watch recordings now, before any other data, on every store I touch.</p>
      `,
    },
  };

  const modal     = document.getElementById('caseModal');
  const titleEl   = document.getElementById('caseTitle');
  const bodyEl    = document.getElementById('caseBody');
  const closeBtn  = document.getElementById('caseClose');
  if (!modal || !titleEl || !bodyEl) return;

  const open = id => {
    const c = cases[id];
    if (!c) return;
    titleEl.textContent = c.title;
    bodyEl.innerHTML = c.body;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => open(card.dataset.case));
  });
  document.querySelectorAll('[data-case-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      open(link.dataset.caseLink);
    });
  });

  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();
