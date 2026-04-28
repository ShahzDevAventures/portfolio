/* ═══════════════════════════════════════════════════════════
   WORK MODAL — case study content
   ═══════════════════════════════════════════════════════════ */

(() => {
  const cases = {
    sirge: {
      title: 'Sirge Operating System',
      body: `
        <h4>Problem</h4>
        <p>I had become the single point of failure inside our agency. Every escalation, decision, and client question routed through me — capping team throughput at my personal bandwidth.</p>

        <h4>Walkthrough</h4>
        <div class="modal-loom">
          <div class="modal-loom-placeholder">[ Loom walkthrough — recording soon ]</div>
        </div>

        <h4>Process</h4>
        <ul>
          <li>Mapped the full agency workflow and identified six decision-types I was bottlenecking.</li>
          <li>Designed a 23-file Claude Code workspace with agent definitions, ClickUp MCP sync, and shortcut commands (qsync, qplan, qbuild).</li>
          <li>Wrote per-repo CLAUDE.md files so any team member could ramp fast.</li>
          <li>Elevated Nolan into the agency-operator role; transferred decision rights with clear playbooks.</li>
        </ul>

        <h4>Screenshots</h4>
        <div class="modal-shots">
          <div class="shot-placeholder">workspace UI</div>
          <div class="shot-placeholder">agent definitions</div>
        </div>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Decisions</div><div class="v">4h → 15m</div></div>
          <div class="modal-stat"><div class="label">Files</div><div class="v">23</div></div>
          <div class="modal-stat"><div class="label">Owner</div><div class="v">Nolan</div></div>
        </div>
      `,
    },

    tcp: {
      title: 'The Christmas Palace',
      body: `
        <h4>Problem</h4>
        <p>A Shopify Plus client with a major-revenue catalog had a dead landing page for their top product, leaky cart and checkout, and poor conversion from social traffic. Stakes were high — flagship redesign with a dev team of one.</p>

        <h4>Walkthrough</h4>
        <div class="modal-loom">
          <div class="modal-loom-placeholder">[ Loom walkthrough — recording soon ]</div>
        </div>

        <h4>Process</h4>
        <ul>
          <li>Full CRO audit identifying funnel leaks across PDP, cart, and checkout.</li>
          <li>Master development plan: 92+ collection pages, metaobject architecture, eight-phase build sequence.</li>
          <li>Watercolor icon brief for Nanobanana to keep visual identity consistent at scale.</li>
          <li>Sequenced the dev work behind two earlier client builds to avoid context-switching.</li>
        </ul>

        <h4>Screenshots</h4>
        <div class="modal-shots">
          <div class="shot-placeholder">PDP redesign</div>
          <div class="shot-placeholder">cart flow</div>
        </div>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Pages</div><div class="v">92+</div></div>
          <div class="modal-stat"><div class="label">Phases</div><div class="v">8</div></div>
          <div class="modal-stat"><div class="label">Devs</div><div class="v">1</div></div>
        </div>
      `,
    },

    cro: {
      title: 'CRO Methodology',
      body: `
        <h4>Problem</h4>
        <p>Most CRO work is opinion-driven. I needed a repeatable process that any team member could run, with consistent quality, that didn't depend on me.</p>

        <h4>Walkthrough</h4>
        <div class="modal-loom">
          <div class="modal-loom-placeholder">[ Loom walkthrough — recording soon ]</div>
        </div>

        <h4>Process</h4>
        <ul>
          <li>Built a 10-step framework: audit → metrics → voice → copy → wireframes → design → guidelines → generation → dev fixes → publish.</li>
          <li>Codified each stage as a skill file: CRO audit skill, ecommerce copywriter skill, Shopify wireframe skill.</li>
          <li>Built a 9-stage buyer-journey framework on top.</li>
          <li>High-Priority Issue Checklist for the audit stage covers six recurring failure modes (page speed, hero, feature-first copy, missing buyer journey, choice paralysis, buried social proof).</li>
        </ul>

        <h4>Screenshots</h4>
        <div class="modal-shots">
          <div class="shot-placeholder">framework diagram</div>
          <div class="shot-placeholder">audit checklist</div>
        </div>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Stages</div><div class="v">10</div></div>
          <div class="modal-stat"><div class="label">Skills</div><div class="v">3</div></div>
          <div class="modal-stat"><div class="label">Used on</div><div class="v">10+</div></div>
        </div>
      `,
    },

    'ai-pipeline': {
      title: 'Anti-Slop AI Pipeline',
      body: `
        <h4>Problem</h4>
        <p>After three months of AI-assisted design, I had a clear conclusion: generic models produce visually generic output. Compositional taste is the ceiling that AI alone won't cross.</p>

        <h4>Walkthrough</h4>
        <div class="modal-loom">
          <div class="modal-loom-placeholder">[ Loom walkthrough — recording soon ]</div>
        </div>

        <h4>Process</h4>
        <ul>
          <li>Replaced "ask AI to design a page" with a constrained pipeline.</li>
          <li>Firecrawl extracts brand tokens from a real reference site.</li>
          <li>The CRO audit skill, copywriter skill, and wireframe skill produce the brief.</li>
          <li>A taste-skill generates HTML/CSS within hard aesthetic constraints.</li>
          <li>html.to.design pushes to Figma; Mike refines; Claude Code converts to Liquid.</li>
        </ul>

        <h4>Screenshots</h4>
        <div class="modal-shots">
          <div class="shot-placeholder">pipeline diagram</div>
          <div class="shot-placeholder">before/after output</div>
        </div>

        <h4>Outcome</h4>
        <div class="modal-stats">
          <div class="modal-stat"><div class="label">Floor</div><div class="v">AI</div></div>
          <div class="modal-stat"><div class="label">Ceiling</div><div class="v">Human</div></div>
          <div class="modal-stat"><div class="label">Throughput</div><div class="v">+3x</div></div>
        </div>
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
