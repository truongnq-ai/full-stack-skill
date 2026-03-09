---
name: Clarification Hard Stop
description: HARD STOP when ambiguity is detected — never auto-decide on the user's behalf.
metadata:
  labels:
    - clarification
    - safety
    - decision
    - common
  triggers:
    priority: medium
    confidence: 0.7
    keywords:
      - clarify
      - ambiguity
      - options
      - decision
      - choose
    task_types:
      - analysis
      - planning
workflow_ref: smart-release
---

# Clarification — The Only Stop Mechanism

## **Priority: P1 (OPERATIONAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Context

When Auto-Accept mode is enabled, the AI agent can execute many steps without confirmation. **This skill is the ONLY mechanism to stop that chain.** Without it, the agent will silently go in the wrong direction for many steps before the user notices.

> Rule Zero: **Better to ask once too many than to auto-run 10 wrong steps.**

## When to STOP — No Exceptions

| Situation                                | Example                                                |
| ---------------------------------------- | ------------------------------------------------------ |
| Requirement has multiple interpretations | "Add discount field" — percentage, amount, or boolean? |
| Missing critical technical info          | Unclear type, default value, or constraint             |
| Change affects more files than planned   | Plan said 3 files but actually needs 7                 |
| Irreversible action                      | Delete data, drop table, overwrite production config   |
| Conflict with existing patterns          | New request contradicts current project conventions    |
| Cannot find required file/function       | Exhausted all search tools                             |
| Architectural decision required          | Module reorganization, major pattern change            |

## Mandatory Question Format (A/B/C)

```
**❓ [Issue Name]**
<Brief description: what is ambiguous, why you can't self-decide>

**Options:**

**A. <Option A name>**
- Approach: <description>
- Pros: <...>
- Cons / Risk: <...>

**B. <Option B name>**
- Approach: <description>
- Pros: <...>
- Cons / Risk: <...>

💡 **Recommendation:** Option X — because <specific reason>

→ Which option do you choose?
```

## Rules

- Ask **maximum 1 question at a time** — if multiple, ask the most blocking one first
- **Always include a recommendation** — never ask "A or B?" without analysis
- **Never self-decide then execute** — even if an option seems "obvious"
- **After receiving decision** → confirm briefly before executing
- **Don't ask what you can find yourself** — exhaust `view_file`, `grep_search`, `find_by_name` first


## References

- [Examples (Input/Output)](references/examples.md)
