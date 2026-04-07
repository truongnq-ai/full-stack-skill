---
name: brainstorming
description: Use before any creative work or feature implementation to explore user intent, requirements, and design. MUST be used before writing any code.
triggers: brainstorm, design, feature, plan, build, implement, create, new component
priority: P0
---

# Brainstorming Ideas Into Designs

> **Goal**: Help turn ideas into fully formed designs and specs through natural collaborative dialogue _before_ writing any code.

## The Rule

<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

**Anti-Pattern: "This Is Too Simple To Need A Design"** — Every project goes through this process. A todo list, a single-function utility, a config change — all of them. The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.

## Process Flow

1. **Explore context** — Check files, docs, recent commits. Understand the current project state.
2. **Offer Visual Companion** *(if visual questions ahead)* — In its **own separate message**, offer the browser-based Visual Companion for mockups/diagrams. Do NOT combine with other questions. Wait for user response. If accepted, follow `references/visual-companion.md`.
3. **Ask clarifying questions** — **One at a time. Multiple-choice preferred.** Focus on: purpose, constraints, success criteria, target users.
4. **Propose 2-3 approaches** — With trade-offs and your recommendation. Lead with the recommended option.
5. **Present design sections** — Scale each section to complexity. Get approval after each section.
6. **Write design doc** — Save to `docs/specs/YYYY-MM-DD-<topic>-design.md` and commit to git.
7. **Spec self-review** — Scan for: placeholder text (TBD/TODO), internal contradictions, scope issues, ambiguous requirements. Fix inline.
8. **User reviews written spec** — Ask user to review before proceeding. Wait for approval.
9. **Transition** — Invoke `writing-plans` skill to create implementation plan.

*(See `references/process.md` for full flowchart)*

## Key Principles

- **One question at a time** — Never ask multiple questions in one message.
- **Multiple choice preferred** — Easier to answer than open-ended.
- **YAGNI ruthlessly** — Remove unnecessary features. If it's not in the spec, it doesn't get built.
- **Explore alternatives first** — Always propose 2-3 approaches before settling.
- **Incremental validation** — Present design in sections, get approval before moving on.
- **Working in existing codebases** — Explore structure first, follow existing patterns, don't propose unrelated refactoring.

## Visual Companion

The Visual Companion is a browser-based tool for showing mockups, diagrams, and visual options during brainstorming. It runs a local Node.js server (no external dependencies).

- **Offer it** when upcoming questions involve visual content (layouts, mockups, architecture diagrams, side-by-side comparisons).
- **The offer must be its own message** — do not combine with clarifying questions.
- **Per-question decision** — Even after accepted, decide EACH question whether to use browser (visual) or terminal (text).
- **Use browser for**: UI mockups, wireframes, architecture diagrams, side-by-side comparisons.
- **Use terminal for**: requirements questions, conceptual choices, tradeoff lists, technical decisions.

If user accepts, read `references/visual-companion.md` before proceeding.

## Anti-Patterns

- **No skipping design**: Do NOT skip the design phase even for "simple" projects.
- **No implementation first**: Do NOT write code or scaffold structures before design approval.
- **No multi-question dumps**: Do ask one clarifying question at a time. Never ask 5 questions simultaneously.
- **No premature planning**: Do NOT run `writing-plans` before design spec is fully approved.
- **No YAGNI violations**: Do NOT add features "because we might need them later."
- **No scope creep**: If project is too large for a single spec, decompose into sub-projects first.

## Tools & Context

- `write_to_file` — Save the design document and spec.
- `scripts/start-server.sh` — Start Visual Companion local server (requires Node.js).
- `scripts/stop-server.sh` — Stop the server after brainstorming session.
- `notify_user` — Interact with user and get explicit approval at each stage.

## Verification

- [ ] I explored the project context (files, docs, recent commits) before asking anything.
- [ ] I offered Visual Companion if visual questions were anticipated (in its own message).
- [ ] I asked clarifying questions one at a time.
- [ ] I proposed at least 2 alternative approaches with trade-offs.
- [ ] I wrote a design document and got explicit user approval.
- [ ] Spec self-review passed (no placeholders, no contradictions, focused scope).
- [ ] No code was written before design approval.
- [ ] I invoked `writing-plans` after spec approval, not any other skill.
