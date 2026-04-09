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
2. **Ask clarifying questions** — **One at a time. Multiple-choice preferred.** All questions must be shown in the chat/terminal. Focus on: purpose, constraints, success criteria, target users.
3. **Propose 2-3 approaches** — With trade-offs and your recommendation. 
   - **MANDATORY**: Each approach/option MUST include its **Pros (Ưu điểm)** and **Cons (Nhược điểm)**.
   - **MANDATORY**: You MUST explicitly mark your recommended choice with the tag `[⭐ Khuyến nghị]` right next to its title.
4. **Present design sections** — Scale each section to complexity. Get approval after each section.
5. **Write design doc** — Save to `docs/specs/YYYY-MM-DD-<topic>-design.md` and commit to git.
6. **Spec self-review** — Scan for: placeholder text (TBD/TODO), internal contradictions, scope issues, ambiguous requirements. Fix inline.
7. **User reviews written spec** — Ask user to review before proceeding. Wait for approval.
8. **Transition** — Invoke `writing-plans` skill to create implementation plan.

*(See `references/process.md` for full flowchart)*

## Key Principles

- **One question at a time** — Never ask multiple questions in one message.
- **Multiple choice preferred** — Easier to answer than open-ended.
- **YAGNI ruthlessly** — Remove unnecessary features. If it's not in the spec, it doesn't get built.
- **Explore alternatives first** — Always propose 2-3 approaches before settling.
- **Incremental validation** — Present design in sections, get approval before moving on.
- **Working in existing codebases** — Explore structure first, follow existing patterns, don't propose unrelated refactoring.

## Interactive Format Guidelines

- **No Local Server / No HTML**: Do NOT attempt to run external servers or create HTML/web pages to show options. The entire brainstorming process must occur inline within the chat/terminal interface.
- **Multiple Choice**: Present choices using letters (e.g. A, B, C) or numbers. Use clear formatting (bolding, tables, or itemized lists).
- **Pros and Cons**: Always provide realistic advantages and disadvantages for every single option so the user can make an informed decision.
- **Recommendation**: Always boldly suggest the best context-aware solution using the `[⭐ Khuyến nghị]` marker.

## Anti-Patterns

- **No skipping design**: Do NOT skip the design phase even for "simple" projects.
- **No implementation first**: Do NOT write code or scaffold structures before design approval.
- **No multi-question dumps**: Do ask one clarifying question at a time. Never ask 5 questions simultaneously.
- **No premature planning**: Do NOT run `writing-plans` before design spec is fully approved.
- **No YAGNI violations**: Do NOT add features "because we might need them later."
- **No scope creep**: If project is too large for a single spec, decompose into sub-projects first.

## Tools & Context

- `write_to_file` — Save the design document and spec.
- `notify_user` — Interact with user and get explicit approval at each stage.

## Verification

- [ ] I explored the project context (files, docs, recent commits) before asking anything.
- [ ] I asked clarifying questions one at a time.
- [ ] I proposed at least 2 alternative approaches with trade-offs.
- [ ] I wrote a design document and got explicit user approval.
- [ ] Spec self-review passed (no placeholders, no contradictions, focused scope).
- [ ] No code was written before design approval.
- [ ] I invoked `writing-plans` after spec approval, not any other skill.
