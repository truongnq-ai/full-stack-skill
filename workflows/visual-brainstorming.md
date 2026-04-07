---
description: Visual brainstorming session using browser-based Visual Companion to collaboratively design UI, architecture, and components before writing code.
---

# 🎨 Visual Brainstorming

> **Use this workflow when**: user needs to design UI, components, or architecture using visual mockups and side-by-side comparisons before coding. Trigger: `/visual-brainstorming`.
>
> **Out of scope**: Does not implement code — invoke `writing-plans` skill after design is approved. Does not replace text-only brainstorming for non-visual topics.
>
> **Activates skills**: `skills/common/brainstorming/SKILL.md` (Visual Companion mode)

---

## Step 1 — Explore Project Context

```bash
ls -F
find . -maxdepth 3 -not -path '*/node_modules/*' -not -path '*/.git/*' -name "*.md" | head -10
git log --oneline -5 2>/dev/null
```

Load skill:

```
view_file skills/common/brainstorming/SKILL.md
```

Summarize: current project stack, existing design patterns, any relevant prior specs.

---

## Step 2 — Offer Visual Companion (Own Message)

> ⚠️ **This step MUST be its own message. Do NOT combine with anything else.**

Send exactly this offer to the user:

```
"Some of what we're working on might be easier to explain if I can show it in a browser — mockups, diagrams, layout comparisons. I can put together visuals as we go.

Want to try it? (Requires opening a local URL — runs a lightweight Node.js server)"
```

Wait for user response before proceeding.

- **If accepted**: Start Visual Companion server (see Step 3).
- **If declined**: Proceed to Step 4 in text-only mode.

---

## Step 3 — Start Visual Companion Server

```bash
# Windows (Antigravity): use run_in_background mode
skills/common/brainstorming/scripts/start-server.sh --project-dir .

# Read connection info after start:
# cat .superpowers/brainstorm/<session-id>/state/server-info
```

Tell user: "Visual Companion is ready at `http://localhost:<PORT>`. Open it in your browser and keep it visible — I'll push screens there as we go."

Add `.superpowers/` to `.gitignore` if not already present.

---

## Step 4 — Clarifying Questions (One at a Time)

Ask **one question per message**. **Multiple-choice preferred.**

For each question, decide: **Is this a visual question or a text question?**

- **Visual** (layouts, styles, component arrangement) → push HTML screen to `content/` dir, reference Step 3's `screen_dir`.
- **Text** (scope decisions, conceptual tradeoffs, requirements) → ask in terminal only.

Minimum questions to cover:
1. What are you building? (purpose + target users)
2. What should it look like? (style direction)
3. Key constraints? (tech stack, existing patterns, time)
4. Success criteria? (what does "done" look like)

---

## Step 5 — Propose 2-3 Approaches

Present 2-3 design approaches with visual comparisons using the browser (side-by-side cards or split view).

```html
<!-- Example: push to content/approaches.html -->
<h2>Which approach fits best?</h2>
<div class="cards">
  <div class="card" data-choice="a" onclick="toggleSelect(this)">
    <div class="card-body"><h3>Option A</h3><p>Description + tradeoffs</p></div>
  </div>
  <!-- ... -->
</div>
```

After user selects: confirm in terminal and get verbal confirmation before advancing.

---

## Step 6 — Present Design Sections

For each design section (architecture, components, data flow, error handling):

1. Push visual mockup or diagram to browser.
2. Ask: "Does this section look right? Any changes?"
3. Iterate until approved.
4. Move to next section only after current is approved.

When returning to text-based questions, push a waiting screen:
```html
<div style="display:flex;align-items:center;justify-content:center;min-height:60vh">
  <p class="subtitle">Continuing in terminal...</p>
</div>
```

---

## Step 7 — Write Design Doc & Stop Server

```bash
# Stop Visual Companion
skills/common/brainstorming/scripts/stop-server.sh .superpowers/brainstorm/<session-id>
```

Save approved design to `docs/specs/YYYY-MM-DD-<topic>-design.md`.

Run spec self-review:
1. Placeholder scan (TBD, TODO, vague requirements)
2. Internal consistency check
3. Scope check (can this be built as a single plan?)

Ask user: "Spec written to `docs/specs/<file>`. Please review it before we start planning."

---

## Step 8 — Transition to Implementation

After user approves spec:

```
view_file skills/common/writing-plans/SKILL.md
```

Invoke `writing-plans` skill to create the implementation plan.

---

## Done Criteria

- [ ] Project context explored
- [ ] Visual Companion offered (in own message) and response received
- [ ] At least 4 clarifying questions asked and answered (one at a time)
- [ ] 2-3 approaches proposed with visual comparisons
- [ ] All design sections presented and approved
- [ ] Design doc written to `docs/specs/`
- [ ] Spec self-review passed
- [ ] User approved spec
- [ ] `writing-plans` skill invoked
