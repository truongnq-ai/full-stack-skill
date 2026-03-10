---
description: Rule for Agent Skills Standard - Always consult AGENTS.md for consolidated project context and technical triggers before acting on any task.
globs: ["**/*"]
alwaysApply: true
---

# 🛠 Agent Skills Standard Rule

**Priority**: GLOBAL — overrides all other skill and workflow instructions.
**Risk addressed**: Agent acts on wrong assumptions about project structure, uses wrong skill, or misses active skill triggers.

---

## Core Rules

**No acting without context**: Before modifying any file, run `view_file AGENTS.md` to identify which skills apply to the current task.

**No skill bypass**: Never skip loading a relevant skill found in `AGENTS.md`. If a skill exists for the current task domain, it MUST be loaded and applied.

**No assumption about project structure**: If `AGENTS.md` does not exist, stop and notify user: _"AGENTS.md not found — cannot determine active skills. Please run `npx @truongnq-ai/full-stack-skill init` to initialize."_

**No modification without skill check**: For any file in `src/`, `lib/`, `app/`, or infra config — verify in AGENTS.md which skill governs that file type before editing.

---

## AGENTS.md Usage

`AGENTS.md` maps `skills/<category>/SKILL.md` → file glob patterns.
When editing a file matching a pattern: (1) `view_file` the skill → (2) apply rules → (3) use verification checklist.

---

## Scope Exceptions

Rule does NOT apply when: (1) user says `"skip skills for this"`, (2) editing inside `.agent/` directory itself, (3) task only touches `*.md`/`*.txt` docs outside `src/`.

---

## Enforceability Verification

To verify compliance with this rule:

```bash
# Confirm AGENTS.md exists and is readable
cat AGENTS.md | head -20

# Confirm correct skill was loaded for current file type
# (Agent must be able to cite which SKILL.md was read before any edit)
```

**Pass**: Agent can cite which SKILL.md was read and which rule was applied.
**Fail**: Agent modified files without reading AGENTS.md first.
