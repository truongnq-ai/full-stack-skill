---
name: Subagent Driven Development
description: Master protocol for orchestrating and managing autonomous subagents for parallel task execution and delegation.
category: common
metadata:
  labels: [subagent, ai-orchestration, delegation, multi-agent]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [subagent, parallel, delegate, orchestrate, spawn]
---

# 🤖 Subagent Driven Development (SDD)

> **Use this skill when**: the primary agent needs to spawn, manage, and synthesize outputs from one or more autonomous subagents (e.g., Browser Subagents, Coding Subagents) to execute complex, multi-domain, or highly parallelizable tasks. Trigger: `/core-spawn-subagent`.
>
> **Out of scope**: This skill does NOT define the behavior of the subagent itself (subagents follow their own system prompts). It handles the *orchestration lifecycle*.

---

## 🚫 Anti-Patterns

- **Vague Delegation**: Providing a subagent with "Go fix the frontend." without exact boundaries, breaking the process.
- **Orphaned Agents**: Spawning an agent and forgetting to check its output or command status.
- **Overlapping Scope**: Spawning two subagents to edit the exact same file simultaneously, causing massive Git conflicts.
- **Infinite Loops**: Subagents spawning subagents recursively without strict stop conditions.

---

## 🛠 Prerequisites & Tooling

1. `browser_subagent` tool or generic subagent API must be explicitly available in the MCP context.
2. A clear task definition artifact (e.g., `task.md`) mapped with subagent assignments.
3. Access to `command_status` tool to monitor long-running background terminal commands if spawning CLI agents.

---

## 🔄 Execution Workflow

### Step 1 — Formulate the Subagent Prompt
A subagent needs absolute clarity. The prompt MUST contain:
- **Role Identity**: "You are a specialized Browser QA Agent."
- **Exact Objective**: "Navigate to `http://localhost:3000/login` and verify the Submit button works."
- **Constraints**: "Do not edit source code. Do not click external links."
- **Return Condition**: "Return an array of errors found, or 'PASS'."

### Step 2 — Scope Isolation (CRITICAL)
If spawning multiple coding subagents, enforce boundaries:
- Subagent A handles `src/frontend/**`
- Subagent B handles `src/backend/**`
*Never let two agents concurrently edit files in the same directory without a locking mechanism.*

### Step 3 — Spawn Execution
Trigger the subagent via the designated tool (e.g., `browser_subagent`).
Example payload parameters:
```json
{
  "TaskName": "QA Login Flow",
  "Task": "Navigate to /login, input test/test, verify URL changes to /dashboard. Return success boolean.",
  "TaskSummary": "Testing authentication UI"
}
```

### Step 4 — Monitor & Await
Since subagent execution can be long-running:
- Do not make assumptions about success.
- If synchronous, yield and wait for the precise return artifact.
- If asynchronous (background task), query `command_status` using a retry loop (Wait 5s, check, repeat).

### Step 5 — Synthesize & Merge
When the subagent returns:
- Evaluate the exact output against the expected format.
- If the subagent failed, read the failure reason, refine the prompt (Step 1), and retry ONE time.
- Merge the outputs into the main `implementation_plan.md` or `task.md`.

---

## ⚠️ Error Handling (Fallback)

| Failure Type | Error Message | Orchestration Fallback |
|--------------|---------------|------------------------|
| Missing Element | "Selector not found" | Browser subagents often fail due to dynamic rendering. Wait 5s or instruct agent to use generic XPath text matching (`//*[text()='Login']`). |
| Timeout | Tool execution exceeds 5 mins | Subagent is stuck in a loop. Terminate the process. Retry with a stricter constraint ("You have 5 steps max"). |
| Hallucination | Agent replies "I fixed it" but diff is empty | Verify source control. The subagent failed to write. Switch to direct execution without subagent. |

---

## ✅ Done Criteria / Verification

Orchestration is complete when:

- [ ] All spawned subagents have returned a `DONE`, `PASS`, or explicitly stated synthesized output.
- [ ] No two subagents conflicted on a shared resource.
- [ ] The generated output has been merged back into the primary agent's context and reported to the user.
