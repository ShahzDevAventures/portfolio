# Portfolio — Product Requirements Document

**Owner:** Shahzaib Siddiqui
**Audience for this doc:** me (and any collaborator/agent running on the project)
**Status:** Draft v0.1
**Created:** 2026-04-28
**Working dir:** `/Users/shahzaibsiddiqui/portfolio/`

---

## 1. Problem

I'm hunting senior PM roles. My current portfolio (`/Users/shahzaibsiddiqui/Downloads/Portoflio website.html`) is a single 1,500-line HTML file with strong design bones but four problems that block it from doing its job:

1. **Encoding is broken.** Every em-dash, arrow, and bullet renders as `Ã¢ÂÂ` mojibake.
2. **The proof surface is empty.** GitHub `ShahzDevAventures` has 0 public repos. Case studies are text-only modals — claims, not artifacts. CTAs point inward, not at live work. Simulator numbers are explicitly disclaimed as illustrative, which is worse than absent.
3. **Theming overshoots.** F1 cosplay (lap charts, sectors, "Pit Wall", McLaren callout, "F1 enjoyer" stroke text) reads as costume rather than character. Risks the message I actually want: *competent but fun PM*.
4. **One missing signature interaction.** The reveal-on-hover mechanic is implemented but unfinished — photo CSS variables are never set, so it shows a placeholder. This was supposed to be the hero moment.

## 2. Goal

A single-page portfolio that, in under 60 seconds of a recruiter or hiring manager's attention, lands three things:

1. **Operator-builder identity** — ex-CEO who ran the system, read the metrics, shipped the product
2. **AI fluency that's earned, not claimed** — visible artifacts (skills, methodology, workspace) over buzzwords
3. **Taste** — one signature interaction + clean editorial polish, no creative-dev showreel

### Success criteria

| Metric | Target |
|---|---|
| First-impression clarity (recruiter test, 5-sec read) | "Senior PM, ex-founder, AI/Shopify" without scrolling |
| Time-to-proof | ≤ 30 seconds to a real artifact (Loom, repo, live store) |
| Inbound replies via contact section | ≥ 1 / week during active hunt |
| Mobile usability | All sections functional on iPhone SE viewport (375×667) |
| Lighthouse performance (mobile) | ≥ 85 |
| Accessibility | No WCAG-AA failures on automated audit |

### Non-goals

- A blog
- A CMS
- Per-case-study sub-pages (case studies live in modals + Loom)
- Multi-language
- Dark/light toggle for users (theme stays dark hero / light body / dark footer)
- A real LLM-backed assistant (the copilot is intentionally a spoof — see §6.5)

## 2.5 User stories

The site exists to serve five users in this priority order. Each story has acceptance criteria — a binary list. The site is "done" for that user when every criterion passes.

---

**US-1 · Founder/CEO hiring senior PM (PRIMARY)**
*As a founder hiring a senior PM, I want to know in 30 seconds whether this person has shipped product at a scale and with a vibe that fits my company, so I can decide to schedule a call.*

Acceptance:
- [ ] First viewport tells me: name, role being sought, current status, location — without scroll
- [ ] I can see a real photo of the person within first viewport
- [ ] Within 1 scroll, I can read 3 paragraphs that establish operator credibility (not founder-flex)
- [ ] Within 2 scrolls, I see a career timeline with companies, dates, 3 outcomes per role
- [ ] At least one "outcome" has a real number tied to it (team size, throughput, scope)
- [ ] Contact CTA is reachable from any viewport in ≤ 1 click (sticky nav)

---

**US-2 · Director of Product evaluating craft (PRIMARY)**
*As a Director of Product, I want to see specific artifacts (Loom, code, live work) tied to claimed outcomes, so I can evaluate craft beyond resume bullets.*

Acceptance:
- [ ] At least one case study contains a real Loom walkthrough (≤ 3 min)
- [ ] At least one case study contains a public link (live store, repo, or GitHub artifact)
- [ ] Each case study includes problem → process → outcome with stat row
- [ ] Approach section ("how I think") has 3 principles, each with a "Receipts:" link to a relevant case study
- [ ] No claim is unfalsifiable — every "I built X" has X visible

---

**US-3 · Recruiter routing the candidate (SECONDARY)**
*As a recruiter, I want a clear status, easy contact, and a forwardable artifact, so I can route quickly to a hiring manager.*

Acceptance:
- [ ] Hero status chip says explicitly "Open to senior PM roles" (or current state)
- [ ] Email + LinkedIn + GitHub links work and open in new tab
- [ ] One-pager PDF is downloadable in 1 click
- [ ] Site loads in < 3s on mid-tier connection (recruiter on shared wifi at coffee shop)
- [ ] Mobile experience is functional — no horizontal scroll, no broken interactions

---

**US-4 · Owner (me) maintaining the site (OWNER)**
*As the owner, I want to update copy and add cases without redeploying tooling, so iteration cost is near zero.*

Acceptance:
- [ ] Editing a case study = editing one HTML/JS object, not modifying multiple files
- [ ] Adding a new screenshot = drop file in `/assets/cases/{slug}/` + reference path
- [ ] Site builds and deploys via `git push` to Vercel
- [ ] No build step required for content changes (vanilla HTML/CSS/JS)

---

**US-5 · FAANG-style hiring manager (TOLERATE)**
*As a corporate PM hiring manager, I need this site to not read as "creative-dev showreel" so I can take the candidate seriously.*

Acceptance:
- [ ] No more than ONE signature interaction in the entire site (the hero photo reveal)
- [ ] No autoplay video, no parallax, no 3D card tilt
- [ ] Copy is operator-toned, not founder-toned (no "passionate", "love", "excited")
- [ ] Theme references (F1) are subtle — readable without knowing the metaphor

## 2.6 Definition of Done — Site overall

The site ships when ALL of the following pass. This is the contract.

**Functional**
- [ ] Live at a real URL (Vercel-hosted, custom domain or `*.vercel.app`)
- [ ] Every link in nav scrolls to a real section that exists
- [ ] Every external link returns HTTP 200
- [ ] Email link triggers user's mail client OR form endpoint accepts a test message
- [ ] One-pager PDF downloads cleanly OR is explicitly marked "request via email"
- [ ] Mobile (iPhone SE, 375px) shows no horizontal scroll, no broken layout, no inaccessible content

**Content**
- [ ] Zero mojibake / encoding artifacts anywhere on the page
- [ ] Real photo of owner present (not placeholder)
- [ ] At least 1 case study has Loom + ≥1 screenshot
- [ ] All metric values are real (zero "illustrative" disclaimers)
- [ ] All copy reviewed and approved by owner

**Quality bars**
- [ ] Lighthouse Mobile: Performance ≥ 80, Accessibility ≥ 90, Best Practices ≥ 90
- [ ] axe DevTools: 0 critical violations
- [ ] `prefers-reduced-motion: reduce` removes all non-essential motion
- [ ] No console errors on load
- [ ] Tested on Chrome desktop, Safari desktop, Mobile Safari, Mobile Chrome

**Proof surface**
- [ ] `ShahzDevAventures` GitHub has at least 1 public repo (this site)
- [ ] GitHub profile has a README pinned

**Owner sign-off**
- [ ] Owner sends URL to 5 trusted reviewers and incorporates 1 round of feedback before broader sharing

## 3. Audience

Three concentric tiers. Order matters.

**Tier 1 — Primary (optimize for):**
Founders/CEOs of growth-stage startups (10–150 people), Heads of Product at Shopify-ecosystem or AI-native companies, ex-founders now hiring PMs. They value craft, taste, and proof of execution; they're skeptical of resume theater.

**Tier 2 — Secondary:**
Recruiters and engineering leaders at growth-stage companies. Skim for keywords (Shopify, AI, ecommerce, B2B), click one case study, decide.

**Tier 3 — Tolerable (don't actively repel):**
Traditional FAANG/enterprise PM hiring managers. The F1 dial-down is partly for them. We don't need to win this audience — we need not to lose them on aesthetics in the first 5 seconds.

## 4. Voice & tone

- **Operator, not founder.** First-person, terse, declarative. "I built the system, read the metrics, shipped the product."
- **Receipts, not adjectives.** Every claim has a number, an artifact, or a name attached.
- **Self-aware fun.** One joke (the copilot), one signature interaction (the hero reveal). Not five. The fun comes from confidence, not props.
- **No emojis** (unless inside the copilot spoof copy where it's the joke).
- **No "passionate about", "love to", "excited to".** Verbs, not vibes.

## 5. Information architecture

Single page, six sections, in this order:

| # | Section | Purpose | Length |
|---|---------|---------|--------|
| 01 | Hero | Identity + signature interaction | 1 viewport |
| 02 | About | Operator's note in 3 paragraphs | 0.6 viewport |
| 03 | Experience | Career timeline (vertical, scroll-pinned) | 1.2 viewports |
| 04 | Stats | Real operator metrics dashboard (replaces simulator) | 0.5 viewport |
| 05 | Work | Featured case studies (4) → modal w/ Loom + screenshots | 1 viewport |
| 06 | Approach | 3 operating principles | 0.7 viewport |
| 07 | Contact | Email, X, LinkedIn, GitHub, PDF | 0.6 viewport |

Constellation skill-map section from v0 is **cut**. It was decorative, not load-bearing.

## 6. Section specs

### 6.1 Hero (signature surface)

**Goal:** name + role in ≤ 5 sec. Signature interaction earns "fun".

**Layout (desktop):**
- Full-bleed dark stage (`--void`)
- Left rail (72px): vertical label, micro nav-position indicator
- Main column: kinetic name treatment as 3-line display type, lede paragraph below, tag chips, two CTAs (`See work`, `Get in touch`)
- Background layer: photo of me, masked by a soft-edged radial mask that follows the cursor
- No checkered stripe at top (cut from v0)

**Layout (mobile):**
- Photo fades in on scroll past 30% of hero (replaces cursor mechanic — `cursor-none` is hostile on touch)
- Name stacks; CTAs full-width
- Live clock + location moves to bottom of hero, not nav meta

**Copy:**

> Senior PM. AI-first builder.
> Ex-founder, Shopify ecosystem.
>
> I'm Shahz. I co-founded Sirge (Shopify-AI) and ran it from operations to CEO. I build the system, read the metrics, and ship the product — in roughly that order.
>
> Hover the photo. The site is part of the interview.
>
> [chips] Open to senior PM roles · Toronto · Shopify · AI · Ops
>
> [ See the work → ]   [ Get in touch ]

**Cuts from v0:**
- "F1 enjoyer." stroked line
- "Race Trim" rail label
- "Sector 1/2", "Driver SS · #04" hero meta (replaced with: Status / Based / Currently / Available)
- "watching MIA GP" line
- McLaren chip
- "Read the lap chart" CTA → "See the work"
- "Get in the box" CTA → "Get in touch"

**Hero meta strip (replaces racing meta):**

| Status | Based | Stack | Available |
|---|---|---|---|
| Open to senior PM roles | Toronto / GMT-4 | AI · Shopify · Ops | From Q3 2026 |

### 6.2 Signature interaction — Hero photo reveal

This is the one "fun" beat. Spec'd in detail because it's the riskiest piece.

**Reference vibe:** Lando Norris-style cursor reveal (full-bleed, soft mask, inertia). Not a hard clip-path circle.

**Mechanics:**
- Two layers stacked behind the hero text:
  - **Base layer**: dark gradient + faint giant "SS" letterform, low contrast (so the hero isn't visually empty before interaction)
  - **Reveal layer**: photo of me (color, slight contrast bump)
- A radial mask on the reveal layer; mask center follows a GSAP `quickTo`-driven cursor position (smoothing factor ~0.18, gives ~150ms inertia)
- Mask radius: 280px desktop, animated from 0 → target on first mouse-enter, breathes ±8px on a slow sin wave (subtle "alive" feel)
- Mask edge: soft (radial gradient `transparent 0%, black 70%, black 100%` — not a hard circle)
- Custom cursor: small acid-yellow ring + crosshair, mix-blend-mode difference, only visible on the stage
- Touch fallback: mask radius animates to full on first touch, then fades after 1.2s — gives mobile users one "wow" before settling

**Performance:**
- Use CSS `mask-image` with a radial-gradient `mask-position` updated via `transform: translate3d()` on a wrapper, OR clip-path on a soft-edged SVG circle. Test both; pick whichever holds 60fps on mid-range Android.
- Hero photo: WebP, ≤ 250KB, served at 1600px wide. AVIF fallback if simple.

**Copy/labels on stage:**
- Bottom-left: `LIVE / move to reveal` (mono, 10.5px)
- Top-right: `x: 412 · y: 287` cursor coordinates (mono, 10px) — keep this; it's the "this is engineered" beat
- Center hint (fades on first move): `Move anywhere`

**Acid-yellow GO! placard — cut.** Replaced by subtle live-coords tag.

### 6.3 About

3 paragraphs, max 60ch column. No changes to substance from v0; light edit:

- Tighten "founder-grade execution" to "operator-grade execution" (less hagiographic)
- "F1 enjoyer" / McLaren references — out
- Keep the Deloitte → Trading Central → SHOEBOX → Sirge throughline

**Facts row** stays (Based / Mode / Stack), values updated to non-cosplay copy.

### 6.4 Experience timeline

**Critical change: vertical, scroll-pinned. Not horizontal scroll.**

The horizontal-scroll card track in v0 is hostile on touch and hides cards behind a scrollbar that recruiters won't engage with.

**New design:**
- Section is `100vh` tall, `position: sticky` pinned via GSAP ScrollTrigger
- A vertical lap-time-style track on the left (acid-yellow, animated stroke as user scrolls)
- Cards reveal one at a time as ScrollTrigger advances; previous card grays/scales down slightly
- Each card: company logo/wordmark, dates, role, 3 bullets (kept from v0), tag chips
- Sirge card stays "flagship" (inverted, ink background)

**Lap badges (`LAP 04 · LEADING`) — cut.** Replaced with neutral year ranges.

**Copy edits:** same substance, drop the racing language ("the team's de-facto translator" stays — that's good).

### 6.5 Stats — Real operator metrics dashboard

**This replaces the simulator.** Sliders + illustrative numbers were the weakest beat. New version is a static, honest dashboard of *real* operating outcomes.

**Constraints from owner:** no revenue numbers. Can share team, ops, throughput, artifact counts.

**Proposed stat cells (8, 4×2 grid on desktop, 2×4 on mobile):**

| Stat | Value | Source |
|------|-------|--------|
| Team scaled | 4 → 22 | Sirge |
| Decisions, escalation→resolution | 4h → 15m | Sirge OS rollout |
| Pages shipped, single dev | 92+ | TCP redesign |
| Phases, structured build | 8 | TCP redesign |
| CRO methodology stages | 10 | Internal framework |
| Buyer-journey stages | 9 | Internal framework |
| Skills authored (Claude Code) | 23+ | Sirge workspace |
| Years operating | 7+ | 2019 → present |

**Visual treatment:**
- Same dark "telemetry" aesthetic (carries one F1-flavored beat without the cosplay)
- Each cell: mono-numeric value, label, tiny unit, thin progress bar
- GSAP CountUp animation on values when section enters viewport (numbers tick up from 0)
- Sub-label under section: `Real operating metrics. No revenue figures shown.` — preempts the "where are the $$ numbers" question

**Cuts:**
- Sliders (Team / AI / Revenue Focus)
- "Pit Wall" sim header
- "Calibrated / Pushing limits" status flash
- "Conviction %" cell (vibey, not real)

### 6.6 Work — Case studies (4)

**Cards stay (Sirge OS, TCP, CRO Methodology, Anti-Slop AI Pipeline). Modal contents change.**

Each modal must include, in this order:
1. **One-line problem** (what was broken)
2. **Loom embed** (3 min max — owner records these)
3. **2–3 screenshots** (`/assets/cases/{case-slug}/{n}.{webp|png}`)
4. **Process bullets** (kept from v0)
5. **Outcome stats** (3-stat row, kept from v0)
6. **Live link** if available (sirge.io, store URL, repo)

**If Loom + screenshots aren't ready for a case, the card is hidden, not shown empty.** Better 2 strong cases than 4 weak ones.

### 6.7 Approach

3 principles, kept from v0. Light edit:

- "AI is the floor, not the ceiling." — keep
- "Proof of work over proof of role." — keep
- "Build the system, not the heroics." — keep

Each principle gets a "Receipts:" line linking to the relevant case-study modal/anchor. Wire the links — they're dead in v0.

### 6.8 Contact

**Cut**: dead `hello@shahzaib.dev` if domain isn't live (see §11 open).
**Replace**: with whichever email is real.

Rows:
- Email
- X / Twitter (`@shahzaibsid`)
- LinkedIn (`in/shahzaibsiddiqui`)
- **GitHub** (`@ShahzDevAventures`) — new row, depends on §9 GitHub population
- One-pager PDF (real link, not alert)
- Location

### 6.8.5 Status & fit panel (NEW — V1)

A 4-cell mono panel that answers the questions every recruiter / HM opens with. Sits inside or directly under the hero meta strip.

| Status | Location | Mode | Available |
|---|---|---|---|
| Open to senior PM roles | Toronto, GMT-4 | Remote / hybrid | Q3 2026 |

**Status paragraph** (1 short paragraph, top of About):

> Still co-running Sirge in a reduced operator role — Nolan owns day-to-day. Looking for a senior product seat where I can go deep on one product instead of running the whole org.

(Owner edits this to whatever's true.)

**Why it matters:** without these, every email reply starts with the candidate re-explaining their situation. With them, recruiters route in 30 seconds.

### 6.X Skills / Open-source AI tooling (NEW — V1, primary differentiator)

Section number TBD on render — sits between Approach and Contact, or between Work and Approach. Dedicated section with its own number in the editorial system.

**Why it exists:** almost no PM candidate can show downloadable, forkable, currently-useful AI tooling they've built. This is the strongest possible "AI-first builder" proof — better than any case study because it's verifiable in a single click.

**Layout:**
- Section header: `XX / SKILLS / Open-source AI tooling`
- Sub-header: one-liner explaining what these are + the install command pattern
- Grid of 4–6 skill cards (2-column desktop, 1-column mobile)
- Footer link: `More on github.com/ShahzDevAventures →`

**Per skill card:**
- Skill name (mono, 18px)
- One-line description (Fraunces, 14px, max 2 lines)
- Tag chips (1–3 tags: e.g. "Frontend", "CRO", "Design system")
- Install command in mono, copy-on-click: `npx skills add ShahzDevAventures/<slug>`
- Two CTAs: `View on GitHub →` + `Copy install ⌘`

**Initial skill set (owner approves / edits):**

| Slug | Display name | One-liner |
|---|---|---|
| design-taste-frontend | Design Taste (Frontend) | Senior UI/UX engineer rules. Overrides default LLM design biases — strict typography, calibrated color, asymmetric layouts. |
| redesign-existing-projects | Redesign Existing Projects | Audits existing sites for generic AI patterns and applies high-end design standards without breaking functionality. |
| industrial-brutalist-ui | Industrial Brutalist UI | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. |
| stitch-design-taste | Stitch Design Taste | Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards. |
| cro-audit | CRO Audit | A 10-step conversion-rate-optimization methodology, codified. Used on 10+ Shopify Plus stores. |
| high-end-visual-design | High-End Visual Design | Designs websites at high-end agency quality. Defines fonts, spacing, shadows, animations that make a site feel expensive. |

**Owner blockers:**
1. Confirm which 4–6 skills are publicly shareable
2. Approve the one-liner for each
3. Approve repo names + I'll create the public mirrors under `ShahzDevAventures/<slug>` (V1 ships with at minimum `cro-audit` published; others are placeholder cards linking to "coming soon" until repos exist)

## 6.9 Spoof copilot (kept)

**The joke:** button labeled `[ Ask Shahz-AI ]` — user types — typing indicator — bot replies in plain English: *"sike, I'm not actually AI. message sent to Shahz, he'll get back to you fast."*

**Implementation:**
- Form posts to a Formspree / Resend / mailto endpoint with the user's message in the body
- After post, bot reply animates in (acid-yellow message bubble)
- Quick suggestions stay: "I have a role for you", "Let's talk Shopify", "Want to chat AI tooling"
- No more "McLaren or Ferrari?" suggestion — racing dial-down

**Why keep:** it's the one place the site breaks the fourth wall. Owner explicitly wants it. Lands as confident self-awareness rather than fake-AI cliché *because* it admits the bit.

## 7. Visual system

| Token | Value | Notes |
|---|---|---|
| `--paper` | `#F2EFE8` | body bg |
| `--ink` | `#111112` | primary text + dark sections |
| `--signal` | `#D2FF00` | acid yellow — accent only |
| `--ledger` | `#FF8000` | papaya — used sparingly (stat units, hover only) |
| Display | Anton | display-0 / display-1 only — never below 22px |
| Body | Fraunces (variable, opsz + SOFT axes) | 17px base |
| Mono | JetBrains Mono | labels, code, stats |

Type-scale tightening (V2 task): currently Anton fights Fraunces at mid-sizes. Anton should only appear at 32px+ and at section heads; mid-size headings switch to Fraunces (italic optical-size 72) or JetBrains Mono caps.

## 8. Motion system

GSAP via CDN. Plugins: `ScrollTrigger`, `CountUp` (or roll our own).

| Where | Mechanic | Trigger |
|---|---|---|
| Hero name | 3-line stagger rise | On load |
| Hero photo reveal | `quickTo` cursor follower → CSS mask | On mouse-move |
| Stats dashboard | CountUp on each value | Section 50% in viewport |
| Experience timeline | ScrollTrigger pin + step-through cards | On scroll |
| Approach principles | Opacity/translate fade-in, staggered | Section 50% in viewport |
| Global cursor (optional) | Subtle yellow dot follower, `quickTo` | On move |
| Button hover | Existing CSS underline grow | CSS only |

**Hard rules:**
- All motion respects `prefers-reduced-motion: reduce`
- No motion > 0.6s in duration unless it's the hero photo reveal
- No autoplay parallax, no mouse-tracking 3D tilt on cards (creative-dev clichés we're avoiding)
- ScrollTrigger pin must release cleanly on mobile breakpoints (`< 720px` falls back to vertical scroll)

## 9. Tech stack & file structure

**Stack:** vanilla HTML + CSS + JS. GSAP via CDN. Hosted on **Vercel** (default; Netlify equivalent).

**Why not Astro/Next/etc:** invisible to audience, adds tooling burden, slows the parts that matter (proof, copy). Re-evaluate if scope grows to 5+ sub-pages.

```
/Users/shahzaibsiddiqui/portfolio/
├── PRD.md                    ← this file
├── index.html                ← extracted from current single file
├── styles/
│   ├── tokens.css            ← :root vars, fonts
│   ├── base.css              ← reset, type primitives, layout
│   ├── nav.css
│   ├── hero.css              ← signature reveal
│   ├── about.css
│   ├── experience.css        ← scroll-pinned timeline
│   ├── stats.css             ← replaces simulator
│   ├── work.css
│   ├── approach.css
│   ├── contact.css
│   └── copilot.css
├── scripts/
│   ├── main.js               ← bootstraps everything
│   ├── nav.js                ← scroll-spy, theme switch
│   ├── hero-reveal.js        ← GSAP quickTo + mask
│   ├── timeline.js           ← ScrollTrigger
│   ├── stats.js              ← CountUp
│   ├── work-modal.js
│   └── copilot.js            ← spoof + form post
├── assets/
│   ├── photos/               ← portrait + working shot
│   ├── cases/
│   │   ├── sirge-os/         ← screenshots + (later) loom thumbnail
│   │   ├── tcp/
│   │   ├── cro/
│   │   └── ai-pipeline/
│   ├── looms/                ← thumbnails only; Looms hosted on loom.com
│   ├── pdf/
│   │   └── shahzaib-siddiqui-onepager.pdf
│   └── logo/
│       └── ss-favicon.svg
├── vercel.json               ← cache headers
└── README.md                 ← deploy notes
```

## 10. Asset inventory

Tracked status: ☐ owner action · ◐ partial · ☑ ready · ✕ killed

### 10.1 Photos
| ID | Asset | Spec | Status |
|---|---|---|---|
| P1 | Portrait headshot, color | ≥2000px long edge, JPG/PNG, neutral or contextual bg | ☐ owner |
| P2 | Working/in-context shot (optional) | Same spec | ☐ owner |
| P3 | Favicon mark "SS" | SVG, monochrome | I'll generate from existing monogram |

### 10.2 Copy
| ID | Asset | Status |
|---|---|---|
| C1 | Revised hero copy (per §6.1) | ☐ I'll draft, owner approves |
| C2 | Revised About paragraphs (light edit of v0) | ☐ I'll draft |
| C3 | Section sub-labels (Stats disclaimer, etc.) | ☐ I'll draft |
| C4 | Updated experience bullets (lap-language stripped) | ☐ I'll edit |
| C5 | Copilot spoof copy (final wording) | ☐ I'll draft |

### 10.3 Real metrics (for Stats section)
| ID | Stat | Status |
|---|---|---|
| M1 | Team scaled 4→22 | ☑ confirmed |
| M2 | Decisions 4h→15m | ☑ confirmed (owner stated) |
| M3 | TCP pages shipped (92+) | ☑ confirmed |
| M4 | TCP phases (8) | ☑ confirmed |
| M5 | CRO stages (10) | ☑ confirmed |
| M6 | Buyer-journey stages (9) | ☑ confirmed |
| M7 | Skills authored (23+) | ☐ owner verify exact count |
| M8 | Years operating (7+) | ☑ confirmed |

### 10.4 Case study artifacts
For each: 1 Loom (3 min) + 2–3 screenshots + outcome stats + (if avail) live link.

| Case | Loom | Screenshots | Live link |
|---|---|---|---|
| Sirge OS | ☐ owner records | ☐ owner provides (workspace UI, agent definitions, ClickUp MCP) | ◐ sanitized GitHub repo (§10.6) |
| The Christmas Palace | ☐ owner records | ☐ owner provides (PDP, cart flow, before/after) | ☐ owner confirm public URL |
| CRO Methodology | ☐ owner records | ☐ owner provides (skill files, framework diagram) | ☐ owner — public Notion or repo? |
| Anti-Slop AI Pipeline | ☐ owner records | ☐ owner provides (Firecrawl → tokens → HTML → Figma) | ☐ owner |

### 10.5 PDF one-pager
| ID | Asset | Status |
|---|---|---|
| PDF1 | Resume one-pager, branded to match site | ☐ owner provides existing OR I generate from PRD content |

### 10.6 GitHub population
| ID | Repo | Status |
|---|---|---|
| GH1 | `ShahzDevAventures/portfolio` (this site) | I'll create + push when site is live |
| GH2 | `ShahzDevAventures/sirge-os-public` (sanitized workspace skeleton) | ☐ owner approves what's safe to expose; I'll sanitize and push |
| GH3 | `ShahzDevAventures` profile README (pinned bio) | ☐ I'll draft, owner approves |

### 10.7 Hosting / domain / endpoints
| ID | Item | Status |
|---|---|---|
| H1 | Vercel project | ☐ I'll set up; owner connects domain |
| H2 | Domain | ☐ owner — confirm `shahzaib.dev` or alternative |
| H3 | Email forwarder (`hello@…`) | ☐ owner — once domain confirmed |
| H4 | Copilot form endpoint (Formspree free tier OR Resend) | ☐ owner picks provider |
| H5 | Loom account (already have or create) | ☐ owner |
| H6 | Plausible/Vercel Analytics | ☐ owner — opt-in |

## 11. Open decisions

Owner needs to call:

1. **Domain.** Is `shahzaib.dev` registered/DNS-ready? If no, what's the live email + intended domain?
2. **Photos** (§10.1) — drop in `/Users/shahzaibsiddiqui/portfolio/assets/photos/` or attach to chat.
3. **Skills count exact** (M7) — the README in `sirge-workspace/marketing/skills/` and the `.agents/skills/` dirs together total ~23. Confirm or correct.
4. **TCP / Sirge live links** (§10.4) — which client URLs are publicly browsable?
5. **GH2 sanitization scope** — full Claude Code workspace structure with redacted client names, or a "highlights" subset? I'll propose a redaction plan once approved in principle.
6. **Form endpoint** (H4) — Formspree (zero-config, free tier 50/mo) is the easiest. OK?
7. **Onepager PDF** — do you have one to share, or should I draft from the content above?
8. **F1 kill-list — any saves?** Listed in §6.1 cuts. Speak now or it goes.

## 12. Scope — V1 / V2 / V3

The original 5-phase plan was over-built. Reframing as three release cuts. Each cut is independently shippable; we don't start the next until the previous is live.

The sole question we asked of V1: **does it satisfy US-1, US-2, US-3 acceptance criteria with the minimum possible work?** Everything that doesn't is V2+.

### V1 — "Functional and credible" (TARGET: 1 owner session + 1 dev day)

**Goal:** A site I can send to a hiring manager today without embarrassment. Replaces the broken v0 file. Hits all DoD §2.6 boxes.

**Owner work required (must complete first):**
1. Send 1 portrait photo (drop in `/assets/photos/`)
2. Confirm F1 kill-list per §6.1
3. Confirm domain (or accept `*.vercel.app` for V1)
4. Record 1 Loom: Sirge OS walkthrough (3 min) — this is the V1 proof-floor
5. Drop 1–2 screenshots for Sirge OS case
6. Pick form endpoint (default: Formspree)
7. Approve revised copy (I draft, you approve)

**Code work (mine):**
- Extract single HTML into §9 file structure
- UTF-8 re-save → mojibake gone
- Strip F1 cosplay copy per §6.1; strip dead constellation refs
- Replace simulator with **static stats grid** (no CountUp yet — just rendered numbers from §6.5 table)
- Replace **horizontal-scroll timeline with vertical card stack** (no ScrollTrigger pin yet — plain scroll)
- Hero photo: just an image with CSS scroll-fade. **No cursor reveal in V1.**
- Wire copilot to real form endpoint with sharpened spoof copy
- Sirge OS modal: Loom embed + screenshots. Other 3 modals: text-only with "Full walkthrough coming" placeholder
- One-pager link → mailto if PDF not ready
- Vercel deploy
- `ShahzDevAventures` GitHub: push portfolio repo + add a profile README

**V1 explicitly defers:**
- Cursor reveal mechanic on hero (V2)
- GSAP + ScrollTrigger (V2)
- CountUp animations (V2)
- Pinned timeline (V2)
- Sanitized Sirge OS public repo (V2)
- 3 of 4 Looms (V2 — Sirge OS only in V1)
- Type-scale refinement pass (V2)
- Custom domain DNS if not ready (V2)
- Analytics (V2)

**V1 done = US-1, US-2, US-3, US-4 acceptance lists all green** (US-5 partial — single signature interaction not present yet, but no "creative-dev showreel" elements either).

---

### V2 — "Signature + polish" (TARGET: ½ owner session + 1 dev day, after V1 has been live ≥ 1 week)

**Goal:** add the moments that make the site feel intentional, not just functional. Hits US-5 fully.

- Hero photo reveal mechanic per §6.2 (GSAP `quickTo` + soft mask, mobile scroll-fallback)
- GSAP introduced via CDN
- ScrollTrigger pin on Experience timeline
- CountUp on stats grid
- Approach principles fade-in stagger
- Type-scale tightening pass (§7)
- Looms #2, #3, #4 (TCP, CRO, AI Pipeline)
- Screenshots for cases #2–4
- Sanitized `sirge-os-public` GitHub repo
- One-pager PDF (if not in V1)
- Custom domain (if not in V1)
- Plausible analytics

**V2 done:** all 4 case studies have Loom + screenshots; signature interaction works on desktop + mobile fallback; Lighthouse ≥ 90 on all metrics.

---

### V3 — "Optional depth" (only if data from V1+V2 says it's needed)

Don't build any of this until inbound replies tell us we need to.

- Per-case-study sub-pages with deeper write-ups
- Real Claude API-backed copilot (only if multiple users actually engage the spoof)
- Newsletter signup (only if we have something to send)
- Light-mode toggle (only if accessibility feedback demands)
- A blog (very low priority)

**V3 is gated:** we only build pieces of it if V1+V2 metrics (inbound replies, time-on-site, bounce) reveal a specific gap. Otherwise out of scope indefinitely.

---

### Build order (single owner-blocking path)

```
[V1 owner: 1 photo + 1 Loom + copy approval]   ← 1 evening
       ↓
[V1 dev: extract, detune, deploy]                ← 1 day (mine)
       ↓
[V1 LIVE — send to first 5 reviewers, gather feedback]
       ↓
[V2 owner: 3 more Looms + screenshots]           ← 1 evening
       ↓
[V2 dev: signature reveal + GSAP + sanitized repo] ← 1 day (mine)
       ↓
[V2 LIVE — broaden distribution]
```

## 13. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Owner doesn't record Looms; modals stay text-only | Medium | Phase 3 hides cards without Looms rather than shipping weak ones |
| Photos arrive low-quality or single-angle | Medium | Mechanic gracefully degrades to text-only hero with kinetic name |
| Hero reveal drops below 60fps on mid-Android | Low | Test early; CSS-mask vs SVG-clip A/B; degrade radius dynamically |
| F1 dial-down still reads "themed" to FAANG audience | Low | Stats section (§6.5) is the only F1-flavored beat; copy is neutral elsewhere |
| Recruiter clicks GitHub before profile is populated | High before V1 ships | V1 includes pushing portfolio repo + profile README; don't share URL until that's done |
| Form endpoint spam | Medium | Formspree has built-in honeypot + reCAPTCHA |

## 14. Out of scope (v1)

- Per-case-study sub-pages (`/work/sirge-os`)
- Blog
- Newsletter signup
- Video background in hero
- Localization
- Light-mode toggle for users
- A real LLM-backed assistant
- Constellation skill-map (cut)
- Operator simulator with sliders (cut, replaced by static dashboard)
- Hero "GO!" placard / checker stripe (cut)
- Lap badges on timeline (cut)

---

## Appendix A — Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-28 | Stay single-file HTML, not Astro | Audience invisible; tooling overhead slows real work |
| 2026-04-28 | Replace simulator with static stats | Disclaimed numbers worse than no numbers; owner can share ops metrics, not revenue |
| 2026-04-28 | Cut constellation skill-map | Decorative, not load-bearing; absent in HTML anyway |
| 2026-04-28 | Vertical scroll-pinned timeline, not horizontal | Touch-hostile; recruiters skim |
| 2026-04-28 | Keep spoof copilot, sharpen the joke | Owner explicit; lands as self-aware not cliché |
| 2026-04-28 | Dial F1 to 1 signature beat (stats dashboard) | Owner: "too much currently" |
| 2026-04-28 | Hero reveal as Lando-style cursor mask | Owner reference; one signature interaction earns the "fun" |

## Appendix B — Reference

- v0 source: `/Users/shahzaibsiddiqui/Downloads/Portoflio website.html`
- Sirge skills referenced: `~/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/{design-taste-frontend,redesign-existing-projects,industrial-brutalist-ui}`
- Marketing skills: `~/sirge-workspace/marketing/skills/`
- Lando reference vibe: full-bleed, soft-mask cursor reveal, kinetic type, scroll-pinned editorial sections
