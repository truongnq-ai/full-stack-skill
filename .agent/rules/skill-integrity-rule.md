---
description: Prevent agent from hallucinating skills, inventing rules not present in SKILL.md, or applying skills to wrong file types.
globs: ["**/*"]
alwaysApply: true
---

# 🔒 Skill Integrity Rule

**Priority**: MEDIUM-HIGH — applies whenever agent loads, cites, or acts on a skill.
**Conflict resolution**: Subordinate to `file-safety-rule` and `agent-skill-standard-rule`. If all three apply, order is: file-safety → skill-standard → skill-integrity.
**Risk addressed**: Agent invents skill rules that don't exist, applies skills to wrong contexts, or paraphrases rules inaccurately — leading to incorrect behavior presented with false confidence.

---

## Core Rules

**No invented skills**: Only use skills explicitly listed in `AGENTS.md` or `.skillsrc`. NEVER reference a skill path or file that you have not verified exists with `view_file`. If unsure, run `find .agent/skills -name "SKILL.md" | head -20` first.

**No paraphrased rules**: When citing a skill rule in reasoning or output, quote the **exact text** from `SKILL.md`. Do not interpret, summarize, or paraphrase — LLM paraphrasing introduces rule drift. Format: _"Per [skill]: [exact quote]"_.

**No cross-context skill application**: Skills scoped to specific file globs (e.g., `src/**/*.ts`) MUST NOT be applied to files outside that scope. Before applying a skill, verify the target file matches the skill's `globs` pattern.

**No stale skill assumptions**: If a skill was read more than 1 session ago (i.e., not read in the current conversation), re-read it. Skills evolve — cached knowledge of skill rules is unreliable.

**No silent skill failure**: If a required skill is listed in `AGENTS.md` but its `SKILL.md` file does not exist on disk, STOP and notify user: _"Skill `[path]` listed in AGENTS.md but not found on disk. Run `npx @truongnq-ai/full-stack-skill sync` or check `.skillsrc`."_

**Corrupt config fallback**: If `.skillsrc` is unreadable or malformed, fall back to reading `AGENTS.md` directly. If both fail, notify user and pause task: _"Cannot load skill config — `.skillsrc` and `AGENTS.md` both unavailable. Please restore one of these files to continue."_

---

## Scope Exceptions

Rule does NOT apply when: (1) user explicitly says `"ignore skills for this task"`, (2) no `AGENTS.md` or `.skillsrc` exists in the project (first-time setup), (3) agent is creating new skill files (meta-task exempt from its own governance).

---

## Skill Citation Format

When explaining a decision based on a skill, use this format:

```
Applied: skills/[category]/SKILL.md
Rule: "[exact rule text]"
File: [which file was affected]
Result: [what was done]
```

Example:
```
Applied: skills/nestjs/SKILL.md
Rule: "Never inject Repository directly into Controllers — use Service layer"
File: src/users/users.controller.ts
Result: Moved DB query logic to UsersService
```

---

## Enforceability Verification

To verify skill integrity is being maintained:

```bash
# Confirm SKILL.md exists before applying
find .agent/skills -name "SKILL.md" | sort

# Verify skill file was actually read (agent must cite view_file output)
# Agent must be able to show: "I read SKILL.md at line X which says [...]"
```

**Pass**: Agent cites exact skill rule text with file and line reference.
**Fail**: Agent says "the skill says..." without being able to quote the exact text.
