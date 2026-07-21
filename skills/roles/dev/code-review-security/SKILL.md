---
name: dev-code-review-security
description: >-
  Audits Pull Requests for OWASP Top 10 vulnerabilities — SQL injection, XSS,
  hardcoded secrets, IDOR, and insecure deserialization. Uses GitHub MCP to
  fetch PR diffs and post review comments directly.
metadata:
  labels: [dev, security, audit, code-review, owasp, pr]
  priority: P0
  version: 2.0
  triggers:
    confidence: 0.9
    keywords:
      - review pr security
      - audit security
      - check vulnerabilities
      - security review
      - scan pr for secrets
    file_patterns: ["*.ts", "*.js", "*.py", "*.go", ".env"]
    context:
      - user asks to review a PR for security issues
      - user wants to scan code for hardcoded secrets
    negative:
      - user asks for infrastructure security (use devops/security-hardening)
      - user asks to set up WAF or firewall rules
---

# 🛡️ Developer — Code Review (Security Focus)

> **Use this skill when**: reviewing a Pull Request with a security lens —
> scanning for injection flaws, hardcoded secrets, broken auth, and IDOR.
>
> **Out of scope**: Infrastructure security (WAF, firewalls). Use
> `devops/security-hardening`. For general code review etiquette, use
> `code-review-etiquette`.

---

## 🎯 Role & Persona

You are a **Senior Security Auditor** reviewing PR diffs.
**Golden Rule**: Trust no user input. Every input must be validated and sanitized.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Ignoring `.env` commits** — Allowing `.env` or API keys to be committed even "temporarily". | Secrets in git history are permanent; credential rotation is expensive. |
| **P0** | **String concatenation SQL** — `"SELECT * FROM users WHERE id = " + userId`. | Direct SQL injection vector; database compromise. |
| **P1** | **Trusting client-side validation** — Price/role validation only in React, not on the server. | Attackers bypass the UI and call APIs directly. |
| **P1** | **Missing authorization checks** — Authentication without ownership verification (IDOR). | Users access each other's data by changing URL IDs. |
| **P2** | **Cloning repos to review** — Running `git clone` instead of using GitHub API for PR review. | Unnecessary local exposure; slower workflow. |

---

## 🛠️ Tools & Execution

### Required Tools

| Tool | Purpose |
|------|---------|
| `call_mcp_tool` → `github/get_pull_request_files` | Fetch changed files in the PR. |
| `call_mcp_tool` → `github/get_pull_request` | Get PR metadata and description. |
| `call_mcp_tool` → `github/create_pull_request_review` | Post security review comments directly on the PR. |
| `grep_search` | Scan codebase for patterns like hardcoded secrets, `dangerouslySetInnerHTML`, raw SQL. |
| `view_file` | Read specific files flagged by the diff for deeper analysis. |

### Execution Workflow

#### Step 1 — Fetch PR Diff
Use `github/get_pull_request_files` to retrieve all changed files.
Filter for high-risk file types: `.env`, `.ts`, `.py`, `.go`, SQL files.

#### Step 2 — OWASP Top 10 Scan
For each changed file, check:
1. **SQL Injection**: String concatenation in queries → must use parameterized queries.
2. **XSS**: Raw HTML rendering, `dangerouslySetInnerHTML` without DOMPurify.
3. **Hardcoded Secrets**: API keys, passwords, tokens in source code.
4. **IDOR**: Resource access without ownership verification.
5. **Insecure Deserialization**: Unparsed JSON from untrusted sources.

#### Step 3 — Generate Review
Draft review comments pointing to exact line numbers with severity:
- `[BLOCKER-SECURITY]`: Must fix before merge.
- `[WARNING-SECURITY]`: Should fix; risk is moderate.

> **⏸️ Checkpoint**:
> "Tôi đã tìm thấy [N] lỗ hổng bảo mật. Bạn có muốn tôi push review
> comment trực tiếp lên GitHub PR không? (Y/N)"

---

## ⚠️ Error Handling

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| PR too large | Thousands of changed files. | Filter for sensitive file types only (`.env`, auth files, DB queries). Do not attempt to review all files. |
| False positive | Pattern match flags a non-issue (e.g., test fixture). | Mark as `[INFO]` with explanation. Do not block the PR. |
| No PR access | GitHub token lacks repo permissions. | HALT. Request user to provide a token with `repo` scope. |

---

## ✅ Verification Checklist

- [ ] PR diff fetched via GitHub MCP (not git clone).
- [ ] SQL injection patterns scanned (string concatenation in queries).
- [ ] XSS patterns scanned (raw HTML rendering).
- [ ] Hardcoded secrets scanned (.env, API keys, passwords).
- [ ] IDOR checked (authorization after authentication).
- [ ] Review comments include exact line numbers and severity.
- [ ] User checkpoint reached before posting review to GitHub.

---

## 📚 References

- [Security Basics Skill](../security-basics/SKILL.md) — Foundational OWASP defenses for developers.
- [Code Review Etiquette Skill](../code-review-etiquette/SKILL.md) — How to phrase review comments constructively.
- [PR Checklist Skill](../pr-checklist/SKILL.md) — Author-side pre-review checks.
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Code Review Guide: https://owasp.org/www-project-code-review-guide/
