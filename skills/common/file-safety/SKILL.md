---
name: File Safety Guardrails
description: Never create/modify files outside approved scope — protect codebase integrity.
metadata:
  labels: [file-safety, guardrails, scope]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [file scope, modify files, delete, overwrite, destructive]
    task_types: [implementation, refactor]
workflow_ref: update-docs
---

# File Safety — Scope Protection

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

When Auto-Accept is enabled, the agent can execute many steps. Without file scope discipline, it will silently modify dozens of files the user never intended. **File Safety is the mandatory guardrail.**

## Hard Rules (NEVER violate)

### 1. Declare Scope Before Executing

Before modifying any file in a task with ≥2 files or complexity:

```
Files to change:
- [MODIFY] path/to/file_a.py — reason
- [NEW]    path/to/new_file.py — reason
- [DELETE] path/to/old_file.py — reason
```

**If you discover you need to modify files outside declared scope → STOP immediately, declare the addition, wait for confirmation.**

### 2. No Auto-Created Documentation Files

| Action                             | Rule                                 |
| ---------------------------------- | ------------------------------------ |
| Create `.md` documentation files   | ❌ ONLY when explicitly requested    |
| Create `README.md`, `CHANGELOG.md` | ❌ Only when user specifies the path |
| Create task/walkthrough artifacts  | ✅ OK in artifact directory          |

### 3. Read Before Write

- Before using **Overwrite** → `view_file` to read current content
- If file has important content → use precise edit tools instead of overwrite
- If full overwrite is needed → explain why, wait for confirmation

### 4. Destructive Commands — Mandatory Confirmation

```
rm -rf / Remove-Item -Recurse         ← Delete files/dirs
DROP TABLE / TRUNCATE                 ← Delete DB data
DELETE without WHERE clause           ← Mass data deletion
git reset --hard                      ← Lose uncommitted changes
git clean -fd                         ← Delete untracked files
docker volume rm / docker system prune ← Lose container data
```

**Never execute these without explicit confirmation in the current turn.**

### 5. Stay Within Active Workspace

- Only read/write within the current project workspace
- Never touch: system directories, home directory, other projects


## References

- [Examples (Input/Output)](references/examples.md)
