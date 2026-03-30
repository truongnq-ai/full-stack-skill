---
description: Team orchestrates multiple specialized agents to solve complex multi-domain tasks — planning, parallel execution, verification, and synthesis.
---

# 🎼 Team Orchestrate Agents

> **Use this workflow when**: task spans multiple domains (UI + API + DB + Security) requiring ≥3 specialized agents. Trigger: `/software-team-orchestrate-agents`.
>
> **Out of scope**: Single-domain tasks — use relevant role workflow. Simple fixes — use normal agent. Reviews — use `software-reviewer-audit-*`.

> [!IMPORTANT]
> **Minimum 3 different agents required.** Never proceed to Phase 2 without explicit user approval.

---

## Step 1 — Analyze Task Domains

| Domain | Agent |
|--------|-------|
| Planning | `project-planner` |
| Frontend | `frontend-specialist` |
| Backend | `backend-specialist` |
| Database | `database-architect` |
| Security | `security-auditor` |
| Testing | `test-engineer` |
| DevOps | `devops-engineer` |
| Mobile | `mobile-developer` |
| Performance | `performance-optimizer` |
| Documentation | `documentation-writer` |

Select ≥3 agents matching detected domains.

---

## 🔴 Phase 1 — Planning (Sequential)

Invoke `project-planner` only: create `docs/PLAN.md` with task breakdown and agent assignments.

Context to pass every agent: original request, user decisions, current plan state.

---

## ⏸️ Checkpoint: User Approval (MANDATORY)

```
"Plan created: docs/PLAN.md
- Y → Start implementation with [N] agents
- N → Revise plan"
```

> 🔴 DO NOT proceed without explicit Y.

---

## 🟢 Phase 2 — Implementation (Parallel)

| Group | Agents | Runs after |
|-------|--------|-----------|
| Foundation | `database-architect`, `security-auditor` | Approval |
| Core | `backend-specialist`, `frontend-specialist` | Foundation |
| Polish | `test-engineer`, `devops-engineer` | Core |

---

## Step 2 — Verification

```bash
pnpm test 2>/dev/null || npm test || go test ./... || flutter test
```

> **Fallback**: If no test framework, instruct `test-engineer` to create and run basic tests.

---

## Step 3 — Synthesis Report

```
## 🎼 Orchestration Report
| # | Agent | Focus | Status |
### Verification: [pass/fail]
### Deliverables: [list]
### Summary: [one paragraph]
```

---

## 🔴 Exit Gate

1. ✅ `invoked_agents >= 3`
2. ✅ Verification ran
3. ✅ Report generated

> If any fails → invoke more agents or run verification.

---

## Done Criteria

- [ ] ≥3 agents invoked
- [ ] Verification passed
- [ ] Orchestration report generated
