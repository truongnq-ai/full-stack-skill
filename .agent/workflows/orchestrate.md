---
description: Orchestrate multiple specialized agents to solve complex, multi-domain tasks. Use when a single agent is insufficient.
---

# 🎼 Multi-Agent Orchestration Workflow

> **Use this workflow when**: task spans multiple domains (UI + API + DB + Security), user says "this is complex", or runs `/orchestrate`. Trigger phrases: "build full app", "orchestrate this", "coordinate agents for X".
>
> **Out of scope**: Single-domain tasks (use the relevant skill directly). Simple one-file fixes (use normal agent). Reviews (use `code-review` or `codebase-review`).

> [!IMPORTANT]
> **Minimum 3 different agents required.** Using fewer = delegating, not orchestrating.
> **Never proceed to Phase 2 without explicit user approval of the plan.**

---

## Step 1 — Analyze Task Domains

Identify ALL domains this task touches:

| Domain | Agent |
|--------|-------|
| Planning / Breakdown | `project-planner` |
| Frontend / UI | `frontend-specialist` |
| Backend / API | `backend-specialist` |
| Database / Schema | `database-architect` |
| Security | `security-auditor` |
| Testing | `test-engineer` |
| DevOps / CI-CD | `devops-engineer` |
| Mobile | `mobile-developer` |
| Performance | `performance-optimizer` |
| Documentation | `documentation-writer` |
| Debugging | `debugger` |

Select minimum 3 agents matching the detected domains.

---

## Step 2 — Mode Pre-Check

| Mode | Action |
|------|--------|
| **plan** | ✅ Proceed — planning-first approach |
| **edit** (simple) | ✅ Proceed directly |
| **edit** (complex/multi-file) | ⚠️ Ask: "This needs planning. Switch to plan mode?" |
| **ask** | ⚠️ Ask: "Ready to orchestrate. Switch to edit or plan mode?" |

---

## 🔴 PHASE 1: Planning (Sequential — NO parallel agents)

Invoke **only** `project-planner` (+ `explorer-agent` if codebase discovery needed):

1. `project-planner`: Create `docs/PLAN.md` with task breakdown, component list, and agent assignments.
2. `explorer-agent` *(optional)*: Map existing codebase if repo exists.

> Context to pass to every agent:
> - Original user request (full text)
> - All user decisions made so far
> - Current plan state if `docs/PLAN.md` exists

---

## ⏸️ Checkpoint: User Approval (MANDATORY)

```
"✅ Plan created: docs/PLAN.md

Review and approve?
- Y → Start implementation with [N] agents
- N → I'll revise the plan"
```

> 🔴 DO NOT proceed to Phase 2 without explicit Y response.

---

## 🟢 PHASE 2: Implementation (Parallel agents after approval)

Invoke agents in parallel groups:

| Group | Agents | Runs after |
|-------|--------|-----------|
| Foundation | `database-architect`, `security-auditor` | Approval |
| Core | `backend-specialist`, `frontend-specialist` | Foundation done |
| Polish | `test-engineer`, `devops-engineer` | Core done |

> Pass full context to each agent: user request + PLAN.md + previous agent outputs.

---

## Step 3 — Verification

The last agent runs verification:

```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
python .agent/skills/lint-and-validate/scripts/lint_runner.py .
```

> **Fallback**: If scripts not found, instruct `test-engineer` agent to run native test suite (`npm test`, `go test ./...`, `flutter test`) and report results.

---

## Step 4 — Synthesize & Report

Combine all agent outputs into:

```
## 🎼 Orchestration Report

### Agents Invoked (minimum 3)
| # | Agent | Focus | Status |
|---|-------|-------|--------|
| 1 | project-planner | Task breakdown | ✅ |
| 2 | [agent] | [focus] | ✅ |
| 3 | [agent] | [focus] | ✅ |

### Verification
- [ ] security_scan.py → Pass/Fail
- [ ] lint_runner.py → Pass/Fail

### Deliverables
- [ ] PLAN.md created
- [ ] Code implemented
- [ ] Tests passing

### Summary
[One paragraph synthesis]
```

---

## 🔴 Exit Gate

Before marking orchestration complete, verify ALL:

1. ✅ `invoked_agents >= 3`
2. ✅ Verification step ran (scripts or native tests)
3. ✅ Orchestration Report generated with all agents listed

> If any check fails → invoke more agents or run verification before closing.
