---
name: brainstorming
description: Use before any creative work or feature implementation to explore user intent, requirements, and design.
triggers: brainstorm, design, feature, plan component
priority: P0
---

# Brainstorming Ideas Into Designs

> **Goal**: Help turn ideas into fully formed designs and specs through natural collaborative dialogue _before_ writing any code.

## The Rule
<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

## Process Flow

1. **Explore context** — Check files, docs, recent commits.
2. **Setup Visual Companion** — Ask if the user wants the Visual Companion to visualize mockups (see `references/visual-companion.md`). Do this in its own separate message.
3. **Ask clarifying questions** — One at a time.
4. **Propose 2-3 approaches** — With trade-offs and recommendations.
5. **Present design sections** — Get approval after each section.
6. **Write design doc** — Save to `docs/specs/YYYY-MM-DD-<topic>-design.md`.
7. **Spec review loop** — Dispatch `references/spec-document-reviewer-prompt.md` to verify the doc.
8. **User reviews written spec** — Wait for approval.
9. **Transition** — Invoke `writing-plans` skill.

*(See `references/process.md` for full flowchart and details)*

## Anti-Patterns

- **No skipping design**: Do NOT skip the design phase even for "simple" lists or utilities. Everything needs a design.
- **No implementation first**: Do NOT write code or scaffold structures before user approval of the design.
- **No overwhelming questions**: Do ask one clarifying question at a time. Do NOT ask 5 questions simultaneously.
- **No premature planning**: Do NOT run the `writing-plans` workflow before the design spec is fully approved.

## Tools & Context
- `write_to_file` to save the design document and create the spec.
- Local server scripts (in `scripts/`) to run the Visual Companion for browser-based brainstorming.
- `notify_user` to interact with the user and get explicit approval at each stage.

## Verification

- [ ] I have explored the context and asked clarifying questions (one by one).
- [ ] I proposed at least 2 alternative approaches.
- [ ] I wrote a design document and got explicit user approval.
- [ ] Spec review has passed.
- [ ] No code was written yet.
