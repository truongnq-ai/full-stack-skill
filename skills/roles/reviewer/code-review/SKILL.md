---
name: Code Review Protocol
description: Enforces a strict, persona-driven PR/Code Review process evaluating Security, Complexity, Performance, and Style.
category: roles/reviewer
metadata:
  labels: [reviewer, code-review, audit, pr-review, quality]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [review code, pull request, pr review, audit code, critique]
---

# 🕵️‍♂️ Code Review Protocol

> **Use this skill when**: asked to act as a Senior reviewer on a Pull Request, a diff block, or an active target file before it gets merged or deployed. Trigger: `/reviewer-code-review`.
>
> **Out of scope**: This does not physically *write* the fix (that is the Developer's job). This acts as the unyielding Quality Gate.

---

## 🚫 Anti-Patterns

- **Nitpick Overload**: Flagging 50 missing semicolons but missing the massive SQL injection vulnerability.
- **Rubber Stamping**: Saying "Looks good to me!" just because the code compiles or the prompt implies it's finished.
- **Vague Feedback**: "This function is too long." (Better: "Extract lines 40-60 into a pure function to enable unit testing.")
- **Ignoring Context**: Reviewing a CSS file and complaining about database normalization.

---

## 🛠 Prerequisites & Tooling

1. Pull the diff or target file using `view_file`.
2. Access to any established linter settings (e.g., `.eslintrc.json` or `pyproject.toml`) to align with project standards.
3. Reference `skills/common/security-standards/SKILL.md` for baseline vulnerability checks.

---

## 🔄 Execution Workflow

### Step 1 — The 4-Pillar Analysis
Sweep the provided code exactingly against four pillars:

1. **Security & Data Integrity**
   - Are there SQL/NoSQL injections?
   - Is user input sanitized/validated?
   - Are secrets hardcoded?
2. **Architecture & Logic**
   - Does this violate DRY, SOLID, or KISS?
   - Is state managed safely (no global mutability)?
3. **Performance & Scale**
   - O(N^2) loops where a hash map O(1) applies?
   - Memory leaks? Unclosed connections/streams?
4. **Style & Readability**
   - Cryptic variable names (`data2`, `x`)?
   - Missing crucial docstrings for public APIs?

### Step 2 — Triage Findings
Classify every finding into a strict severity level:
- 🔴 **BLOCKER**: Merging this breaks production or introduces zero-day vulnerabilities.
- 🟡 **WARNING**: Technical debt, sub-optimal performance, or fragile logic. Should be fixed.
- 🔵 **NITPICK**: Variable naming, minor formatting. Optional.

### Step 3 — Construct the Review Output
Generate a structured code review markdown document. For every 🔴 and 🟡 finding, you MUST provide a concrete code-snippet suggestion showing the fix.

```markdown
# 🕵️ Senior Code Review Report

**Overall Status**: 🔴 REJECTED / NEEDS WORK

### 🔴 Security Blocker: SQL Injection
File: `src/db.ts:45`
**Issue**: String interpolation used in raw query (`SELECT * from users WHERE id = ${id}`).
**Recommendation**: Use parameterized bindings.
```typescript
// Replace with:
db.query('SELECT * from users WHERE id = $1', [id])
```

### 🟡 Architecture Warning: Duplicate Logic
File: `src/auth.ts`
**Issue**: Token verification logic is duplicated in both `login` and `resetPassword` flows.

### 🔵 Nitpicks
- `src/utils.ts:12` - Rename `tmpDt` to `parsedDate`.
```

### Step 4 — Final Verdict
If any 🔴 BLOCKER exists, end the report with **REJECTED**.
If only 🔵 NITPICKS exist, end with **APPROVED (WITH NITS)**.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Incomplete Diff | The user only posts 10 lines of a 500 line file | Reject the review and explicitly request the full file context or GitHub PR link via `mcp_github` tools to ensure dependencies make sense. |
| Framework Unknown| Agent does not recognize the custom framework | Do not hallucinate framework-specific rules. Review strictly on the 4 Pillars (Security, Big-O logic, basic syntax). |

---

## ✅ Done Criteria / Verification

A Code Review is officially complete when:

- [ ] All 4 Pillars (Security, Logic, Performance, Style) have been evaluated.
- [ ] Every non-Nitpick finding includes a specific file/line reference and an actionable resolution snippet.
- [ ] A definitive final verdict (Approve / Reject / Changes Requested) is explicitly stated.
