---
name: Code Review Expert
description: Standards for high-quality, constructive code reviews. Activates when reviewing PRs, diffs, or specific files for quality, security, and architecture.
metadata:
  labels: [common, review, quality, best-practices]
  triggers:
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.py', '**/*.go', '**/*.java']
    keywords: [review, pr, pull request, critique, analyze code, code review, BLOCKER, MAJOR]
    negative: ["user asks to review SKILL.md — use skill-review workflow", "user asks to review workflow file — use workflow-review", "user asks to review rule — use rule-review"]
---

# Code Review Expert

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: review skill/workflow/rule files — use `skill-review`, `workflow-review`, or `rule-review` for those. Does not auto-run tests or implement fixes.

**Compatible skills**: `quality-assurance` (testing enforcement), `tdd` (test coverage check), `security-standards` (security layer), `best-practices` (code quality).

## Review Principles

- **Substance > Style**: Ignore formatting (leave to linters). Find bugs and design flaws.
- **Questions > Commands**: "Does this handle null?" > "Fix this."
- **Cross-check**: Enforce P0 rules from active framework skills (e.g. `typescript/security`, `react/hooks`).
- **Categorize**: `[BLOCKER]` (must fix) / `[MAJOR]` (should fix) / `[NIT]` (optional).

## Review Checklist

Run in this order. Stop if BLOCKER found:

1. **Security**: SQL injection? Auth bypass? Secrets in code? Unvalidated input?
2. **Performance**: O(n²) in hot path? N+1 queries? Memory leaks? Unclosed resources?
3. **Correctness**: Requirements met? Edge cases covered? Null/undefined handled?
4. **Clean Code**: DRY? SOLID? Names reveal intent? No magic numbers?

> To load detailed inspection checklist: `view_file .agent/skills/common/code-review/references/checklist.md`

> **Fallback**: If referenced files unavailable, apply the 4-point checklist above manually.

## Output Format (Mandatory)

**1. Summary**: One sentence on overall quality/impact.

**2. Categorized Findings**:

```markdown
### 🔴 [BLOCKER]
- **File**: `auth.ts`
- **Issue**: SQL Injection risk in `login`.
- **Suggestion**: Use parameterized query: `db.query('SELECT * FROM users WHERE id = $1', [userId])`

### 🟡 [NIT]
- **File**: `utils.ts`
- **Issue**: Rename `d` to `days` for clarity.
```

> Full output format: `view_file .agent/skills/common/code-review/references/output-format.md`

## 🚫 Anti-Patterns

**`No Style Flood`**: Never fill review with formatting comments. Use linters for that.

**`No Vague Demands`**: "Fix this" is useless. Always include why and how with code example.

**`No Skipping Tests`**: Always check test files alongside feature code.

**`No Approval Without Security Check`**: Never LGTM without running the security checklist.

## ✅ Verification Checklist

- [ ] Security checklist completed (injection, auth, secrets)
- [ ] At least one finding per BLOCKER/MAJOR category confirmed or cleared
- [ ] All BLOCKERs have specific code suggestion
- [ ] Tests reviewed alongside feature files
- [ ] Summary sentence written

## 📚 References

- [Full Inspection Checklist](references/checklist.md)
- [Output Format Templates](references/output-format.md)
