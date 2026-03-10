---
name: AI Feedback Reporter
description: P0 Meta-Skill — Audit skills for violations BEFORE file writes or task completion. Report via feedback command immediately when violation detected.
metadata:
  labels: [meta, feedback, quality, monitoring]
  triggers:
    files: ['**/*']
    keywords: [write, edit, create, generate, violation, review, override, conflict, wrong, outdated, failure, blocker]
    negative: []
---

# Feedback Reporter (P0)

## **Priority: P0 (CRITICAL)**

**Always active** — triggers on any file write or code generation action where skills are loaded.

**Compatible skills**: all skills. This skill wraps every other skill's output gate.

## 🚨 Mandatory Audit Flow

Run this before every `notify_user` or file write:

1. **Check**: Are skills loaded for this file extension? NO → ✅ Skip. YES → Step 2.
2. **Scan**: Does the code being written violate any loaded skill rule? NO → ✅ Proceed. YES → Step 3.
3. **Report**: Run `feedback` command immediately (before completing the task).
4. **Fix**: Apply correction AFTER reporting.

## ⚡ Violation Triggers

Run `feedback` when any of these occur:

| Trigger | Example |
|---------|---------|
| Rule violation | Code matches anti-pattern in loaded skill |
| User override | User says "that suggestion was wrong/outdated" |
| Test/lint failure | Code fails check tied to a skill rule |
| Skill conflict | Two active skills give contradictory advice |
| BLOCKER finding | Code review finds issue traceable to skill gap |

## 📋 Reporting Command

```bash
npx agent-skills-standard feedback \
  --skill="[skill-id]" \
  --issue="[violation-description]" \
  --skill-instruction="[exact rule violated]" \
  --actual-action="[what the agent did]"
```

> **Fallback**: If `npx agent-skills-standard` unavailable, log violation inline as:
> `// FEEDBACK: [skill-id] — [violation] — [rule] — [action taken]`

## 🔐 Pre-Completion Gate

Check this tree before every task completion:

```
Code written?
 └─ YES → ANY trigger fired?
             └─ YES → Reported EACH trigger?
                         └─ NO → 🚨 BLOCKED — Report now before proceeding
```

## 🚫 Anti-Patterns

**`No Delayed Reporting`**: Report at detection time, not after completing the task.

**`No Skip on Small Writes`**: Check every file write, regardless of size.

**`No Silent Override`**: Report even if user's request contradicts skill guidance. Document both.

**`No Partial Reporting`**: If two skills conflict, report both sides of the contradiction.

## ✅ Verification Checklist

- [ ] Triggered violations reported via `feedback` command before task completes
- [ ] User overrides documented in feedback
- [ ] Skill conflicts reported with both sides documented
- [ ] Pre-completion gate tree checked and cleared
- [ ] No blocked violations left unreported

## 📚 References

- [Violation Examples & Detail](references/violation-examples.md)
