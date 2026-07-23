---
name: Production Debugging & Root Cause Analysis
description: Systematic protocol for diagnosing production incidents — from stacktrace triage through log correlation to verified hotfix, using the Scientific Method.
category: roles/dev
metadata:
  labels: [dev, debugging, production, log-analysis, hotfix, rca, incident]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [debug production, fix bug, read stacktrace, root cause analysis, production error, 500 error, crash]
    file_patterns: ["*.log", "logs/**", "**/error/**"]
    context: ["user provides a stacktrace", "system crashed in production", "user reports a production bug"]
    negative: ["user asks to write new feature code", "user asks about performance optimization"]
---

# 🐛 Production Debugging & Root Cause Analysis

> **Use this skill when**: a production system is crashing, returning errors, or behaving incorrectly — and you need to trace the root cause from logs/stacktraces, identify the offending code, and propose a verified fix. Trigger: `/dev-debug-prod`.
>
> **Out of scope**: Preventing bugs before they reach production (`unit-test-best-practices/SKILL.md`, `performance-guardrails/SKILL.md`). DevOps incident response and infrastructure recovery (`roles/devops/incident-runbook/SKILL.md`). This skill covers the *developer's code-level diagnostic process*.

---

## 🚫 Anti-Patterns

- **The Guess-and-Pray Fix**: Proposing a code change without actually tracing the stacktrace to the exact line of failure. "I think it might be a null pointer, let me add a null check everywhere" is not debugging — it's gambling.
- **Ignoring Historical Context**: Spending 4 hours debugging a crash that was reported and fixed 3 months ago but regressed because someone reverted the fix PR. Always check issue history first.
- **The Log Flood**: Adding 50 `console.log` statements to production code, deploying, and hoping one of them reveals the issue. Use structured logging with correlation IDs instead.
- **Fixing Symptoms, Not Causes**: The API returns a 500 error because a database query times out. The developer adds a `try/catch` that returns a 200 with an empty array. The user sees no data. The bug is "fixed" in the error dashboard but the actual problem (missing index) remains.
- **Deploying Untested Hotfixes**: Writing a fix and pushing it directly to production without running the test suite. The fix resolves bug A but introduces bug B.

---

## 🛠 Prerequisites & Tooling

1. Access to production logs (via SSH, CloudWatch, Datadog, or similar).
2. Access to the codebase and git history.
3. A staging environment to reproduce and test the fix before deploying.

---

## 🔄 Execution Workflow

### Step 1 — Observe: Gather Evidence (Do NOT Hypothesize Yet)

Collect all available evidence before forming any theory:
1. **Stacktrace**: Parse the provided stacktrace. Identify the exact file name, function, and line number.
2. **Logs**: Read the surrounding log context (±50 lines around the error).
   - Use `call_mcp_tool` → `ssh/ssh_exec` to run `grep -C 50 "ERROR" /var/log/app.log | tail -200` on the production server.
   - Or use `call_mcp_tool` → `ssh/sftp_read` to read specific log files.
3. **Frequency**: Is this a one-time occurrence or repeating? Check error rates in monitoring.
4. **Timing**: When did it start? Correlate with recent deployments (`call_mcp_tool` → `github/list_commits`).

### Step 2 — Hypothesize: Form a Theory

Based on the evidence, form exactly ONE testable hypothesis:
- "The NullPointerException on line 42 of `OrderService.ts` is caused by a missing null check when the user has no shipping address."

Cross-reference the code:
- Use `view_file` to read the exact function where the error occurred.
- Use `grep_search` to find related usages and potential similar issues.

### Step 3 — Historical Context Check

Before writing any fix, check if this issue was seen before:
- Use `call_mcp_tool` → `github/search_issues` with the error message as query.
- Use `call_mcp_tool` → `github/list_commits` to find the commit that introduced or last modified the failing code.

If the bug was previously fixed and regressed, understand WHY it regressed before re-applying the same fix.

### Step 4 — Experiment: Reproduce & Fix

1. **Reproduce**: Try to reproduce the error in the staging environment with the same input data.
2. **Write the Fix**: Apply the minimal, surgical fix. Do NOT refactor surrounding code — hotfix scope must be laser-focused.
3. **Write/Update Test**: Add a test case that reproduces the exact bug scenario and verifies the fix.
4. **Verify**: Run the full test suite to ensure no regressions.

```
Evidence → Hypothesis → Reproduce → Fix → Test → Verify → Deploy
```

### Step 5 — Document & Prevent

After the fix is deployed:
1. Update the issue/ticket with the Root Cause Analysis (RCA): What failed? Why? How was it fixed?
2. Identify the systemic gap: Was there a missing test? A missing validation? A race condition?
3. Create a follow-up ticket to address the systemic issue (not just the symptom).

> **⏸️ Checkpoint**:
> "Tôi đã tìm ra root cause: [mô tả]. Đã viết hotfix + unit test. Bạn có muốn tôi tạo PR với hotfix này không? (Y/N)"

---

## 🛠️ Tooling & Execution

| Action | Tool | Example |
|--------|------|---------|
| Read production logs | `call_mcp_tool` → `ssh/ssh_exec` | `grep -C 50 "ERROR" /var/log/app.log` |
| Read log files | `call_mcp_tool` → `ssh/sftp_read` | Read specific log file |
| Read source code | `view_file` | Read the failing function |
| Search codebase | `grep_search` | Find related patterns |
| Check git history | `call_mcp_tool` → `github/list_commits` | Find introducing commit |
| Search issues | `call_mcp_tool` → `github/search_issues` | Check if reported before |
| Run tests | `run_command` | `npm test`, `pytest -v` |
| Build verification | `run_command` | `npm run build` |

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Cannot Reproduce | Bug occurs in production but not in staging | Compare environment configurations (env vars, DB data, feature flags). Use production logs to reconstruct the exact input that triggered the bug. If still unreproducible, add targeted structured logging and wait for the next occurrence. |
| Log File Too Large | Production log file exceeds 1GB | Do NOT read the entire file. Use `grep` with context flags (`-C 50`) or `tail -n 1000` via SSH MCP. Filter by timestamp range and error level. |
| Multi-Service Cascade | Error originates in Service A but manifests in Service B | Trace the correlation ID across services. Start from the service that FIRST logged the error, not the one the user reported. |
| Cannot Identify Root Cause | After 90 minutes of investigation, no clear root cause found | Escalate. Bring in a second pair of eyes (senior dev or platform engineer). Document everything you've found so far to avoid duplicate investigation work. |

---

## ✅ Done Criteria / Verification

A production bug is properly resolved when:

- [ ] The exact line of code causing the failure has been traced from the stacktrace.
- [ ] Historical context has been checked (GitHub issues, prior commits).
- [ ] The fix has been tested with a new test case that reproduces the original bug.
- [ ] The full test suite passes with zero regressions.
- [ ] A Root Cause Analysis (RCA) is documented on the ticket.

---

## 📚 Cross-References

- `roles/dev/handover-to-qa/SKILL.md` — After hotfix, hand over to QA for verification.
- `roles/dev/refactor-techdebt/SKILL.md` — If the root cause is systemic, schedule a follow-up refactor.
- `roles/dev/unit-test-best-practices/SKILL.md` — Write the regression test for this bug.
- `roles/devops/incident-runbook/SKILL.md` — If the incident requires infrastructure-level response.
