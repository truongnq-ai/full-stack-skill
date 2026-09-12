---
description: Dev systematically fixes multiple independent bugs or test failures concurrently using parallel subagents.
---

# 🐛 Dev Bulk Fix (Parallel Tasks)

> **Use this workflow when**: Dev needs to fix 2+ independent test failures, isolated bugs, or separate components simultaneously. Trigger: `/software-dev-fix-bulk` or `/software-dev-parallel-tasks`.
>
> **Out of scope**: Does not orchestrate cross-domain specialists (UI/DB/QA) — use `software-team-orchestrate-agents`. Does not fix a single, complex bug — use `software-dev-fix-bug`.
>
> **Activates skills**: `skills/common/dispatching-parallel-agents/SKILL.md`, `skills/common/systematic-debugging/SKILL.md`

---

## Step 1 — Triage & Context Gather

Analyze the multiple failures from logs, CI reports, or user input. 

**Critical Dependency Check:**
- Do these failures share state (e.g. same database table, same global variables)?
- Are they in the same exact file/function?
- Is one failure a cascading result of another?

> **Rule:** If the failures are related or share state, STOP. Fall back to `/software-dev-fix-bug` and fix them sequentially. Parallel agents will conflict and cause Git/State collisions.

---

## Step 2 — Isolate Task Domains

Group the failures by independent domain.

Example:
- Domain 1: `auth/login.test.ts` (Timing issue)
- Domain 2: `cart/checkout.test.ts` (Null reference)
- Domain 3: `profile/avatar.test.ts` (Mock failure)

Load the parallel dispatching skill:
```
view_file skills/common/dispatching-parallel-agents/SKILL.md
```

---

## Step 3 — Formulate Parallel Dispatch

Craft precise instructions for each subagent. Each prompt MUST contain:
1. **Specific Scope**: Exact file paths to investigate.
2. **Context**: Error logs or test failures specific only to this domain.
3. **Constraints**: "Do not edit files outside this domain."
4. **Output Request**: "Return a summary of root cause and what you fixed."

---

## ⏸️ Checkpoint: Await Parallel Execution

```
"Independent domains identified: [List domains]
Dispatching [N] parallel subagents to investigate and fix.
[Insert Agent 1 Dispatch Command/Prompt]
[Insert Agent 2 Dispatch Command/Prompt]
[Insert Agent N Dispatch Command/Prompt]"
```
*(Proceed to spawn the agents using your subagent capabilities in the same turn/response to ensure they run concurrently).*

---

## Step 4 — Merge & Verify

Once all subagents return:
1. Review each subagent's summary for conflicts.
2. Ensure no two agents unexpectedly modified the same file.
3. Run the full test suite to verify fixes work together.

```bash
pnpm test || npm test || go test ./...
```

> **Fallback**: If an agent failed or introduced a regression, revert that specific agent's changes and either re-dispatch it with stricter constraints or fix it manually.

---

## Step 5 — Bulk Fix Report

Save to `docs/debug/bulk-fix-[YYYY-MM-DD].md`:

```
## Bulk Fix Report — [Date]
### Domains Processed: [N]
### Results:
1. [Domain 1]: ✅ Fixed - [Root cause summary]
2. [Domain 2]: ✅ Fixed - [Root cause summary]
### Verification: Tests [PASS/FAIL]
```

---

## Done Criteria

- [ ] Dependency check confirmed no shared state.
- [ ] Subagents dispatched in parallel.
- [ ] Fixes merged without Git conflicts.
- [ ] Full test suite verified green.
- [ ] Bulk Fix Report generated.
