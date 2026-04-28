#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════
# publish-skills.sh — push 15 authored Claude skills to GitHub
# Each skill becomes its own public repo at github.com/$OWNER/<slug>
# Usage:
#   ./publish-skills.sh dry-run     # show what would happen, no pushes
#   ./publish-skills.sh push        # actually create + push 15 repos
# Pass GitHub owner via OWNER env var (default: Shahzsiddiqui).
# ═══════════════════════════════════════════════════════════

set -euo pipefail

OWNER="${OWNER:-Shahzsiddiqui}"
MODE="${1:-dry-run}"
WORKDIR="$(mktemp -d -t skills-publish.XXXXXX)"
LOG="$WORKDIR/run.log"

# skill slug | source path | one-line description
read -r -d '' SKILLS <<'EOF' || true
design-taste-frontend|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/design-taste-frontend|Senior UI/UX engineer rules. Overrides default LLM design biases — strict typography, calibrated color, asymmetric layouts.
redesign-existing-projects|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/redesign-existing-projects|Audits existing sites for generic AI patterns; applies high-end design standards without breaking functionality.
industrial-brutalist-ui|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/industrial-brutalist-ui|Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics.
minimalist-ui|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/minimalist-ui|Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids.
high-end-visual-design|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/high-end-visual-design|Designs websites at high-end agency quality. Defines fonts, spacing, shadows, and animations that make a site feel expensive.
stitch-design-taste|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/stitch-design-taste|Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards.
full-output-enforcement|/Users/shahzaibsiddiqui/Documents/GitHub/sirge-cro-editor-fe/.agents/skills/full-output-enforcement|Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns.
cold-email|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/cold-email|End-to-end cold-email skill — research, structure, voice, sequencing — tuned for founder-led B2B outbound.
content-humanizer|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/content-humanizer|Strips the AI smell out of generated copy — tightens cadence, removes corporate hedging, restores voice.
content-production|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/content-production|Production pipeline for content programs — briefs, drafts, refinement, distribution.
content-strategy|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/content-strategy|Content strategy framework — positioning, pillars, distribution, measurement.
email-sequence|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/email-sequence|Designs and writes multi-touch email sequences for nurture, re-engagement, and conversion.
free-tool-strategy|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/free-tool-strategy|Frames free tools as a top-of-funnel acquisition strategy. From idea to launch to ROI.
site-architecture|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/site-architecture|Information architecture for marketing sites — IA, page-types, internal linking, conversion paths.
video-content-strategist|/Users/shahzaibsiddiqui/sirge-workspace/marketing/skills/video-content-strategist|Video-first content strategy — formats, hooks, distribution across YouTube/TikTok/Reels.
EOF

mkdir -p "$WORKDIR"
echo "WORKDIR: $WORKDIR" | tee "$LOG"
echo "OWNER:   $OWNER"     | tee -a "$LOG"
echo "MODE:    $MODE"      | tee -a "$LOG"
echo ""

count=0
echo "$SKILLS" | while IFS='|' read -r slug src desc; do
  [ -z "$slug" ] && continue
  count=$((count + 1))
  echo "[$count/15] $slug" | tee -a "$LOG"

  if [ ! -d "$src" ]; then
    echo "  ✗ source missing: $src" | tee -a "$LOG"
    continue
  fi

  staging="$WORKDIR/$slug"
  mkdir -p "$staging"

  # copy SKILL.md and DESIGN.md if present
  cp "$src/SKILL.md" "$staging/SKILL.md"
  if [ -f "$src/DESIGN.md" ]; then
    cp "$src/DESIGN.md" "$staging/DESIGN.md"
  fi

  # README
  cat > "$staging/README.md" <<RDM
# $slug

$desc

## Install

\`\`\`bash
npx skills add $OWNER/$slug
\`\`\`

## Usage

This is a Claude Code Skill. Once installed, Claude will surface it automatically when relevant context appears in your conversation. See \`SKILL.md\` for the full prompt + rules.

## Author

Built and maintained by [Shahzaib Siddiqui](https://github.com/$OWNER) — senior PM, AI-first builder.

## License

MIT — see \`LICENSE\`.
RDM

  # MIT license
  cat > "$staging/LICENSE" <<'LIC'
MIT License

Copyright (c) 2026 Shahzaib Siddiqui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
LIC

  if [ "$MODE" = "dry-run" ]; then
    echo "  staged at: $staging"
    echo "  files: $(ls "$staging" | tr '\n' ' ')"
  else
    cd "$staging"
    git init -q -b main
    git add .
    git -c commit.gpgsign=false commit -q -m "Initial commit: $slug"
    if gh repo view "$OWNER/$slug" >/dev/null 2>&1; then
      echo "  ↻ repo exists, pushing to existing" | tee -a "$LOG"
      git remote add origin "https://github.com/$OWNER/$slug.git" 2>/dev/null || true
      git push -u origin main --force-with-lease 2>&1 | tail -3 | tee -a "$LOG"
    else
      gh repo create "$OWNER/$slug" --public --source=. --push --description "$desc" 2>&1 | tail -3 | tee -a "$LOG"
    fi
    cd - >/dev/null
  fi
  echo ""
done

echo ""
echo "Done. Log: $LOG"
echo "Workdir: $WORKDIR"
