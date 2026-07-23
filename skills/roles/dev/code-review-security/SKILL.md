---
name: Code Review — Security Focus
description: Protocol for auditing Pull Requests specifically for OWASP Top 10 vulnerabilities, hardcoded secrets, and unsafe data handling patterns.
category: roles/dev
metadata:
  labels: [dev, security, audit, code-review, owasp, vulnerability]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [review pr security, audit security, check vulnerabilities, security scan pr, owasp review]
    file_patterns: ["*.env", "*.env.*", "**/auth/**", "**/middleware/**"]
    context: ["user asks to review a PR for security", "user wants a security audit of code changes"]
    negative: ["user asks about infrastructure security", "user asks about WAF or firewall rules"]
---

# 🛡️ Code Review — Security Focus

> **Use this skill when**: a developer or reviewer needs to audit a Pull Request specifically for security vulnerabilities — injection flaws, hardcoded secrets, broken authentication, and unsafe data handling. Trigger: `/dev-review-security`.
>
> **Out of scope**: Human communication etiquette during code reviews (`code-review-etiquette/SKILL.md`). Infrastructure-level security (WAFs, network ACLs) belongs to `roles/devops/`. This is strictly *application source code* security scanning.

---

## 🚫 Anti-Patterns

- **The Rubber Stamp Security Review**: Glancing at a 500-line auth PR for 2 minutes, seeing "looks fine", and approving without checking for IDOR, session fixation, or missing rate-limiting.
- **Cloning Repositories to Review**: Running `git clone` just to review a PR. Use the GitHub API/MCP tools to fetch only the diff — it's faster, safer, and avoids accidentally running malicious code locally.
- **Ignoring Dependency Vulnerabilities**: Reviewing only the application code changes while ignoring a `package-lock.json` diff that introduces a known CVE in a transitive dependency.
- **The "It's Internal" Excuse**: Skipping XSS/SQLi checks because "this is an internal admin tool." Internal tools get compromised via phishing and lateral movement attacks constantly.

---

## 🛠 Prerequisites & Tooling

1. Access to the PR diff via GitHub API or MCP GitHub tools.
2. Familiarity with the OWASP Top 10 (2021 edition).
3. The team's `roles/dev/security-basics/SKILL.md` as the baseline security standard.

---

## 🔄 Execution Workflow

### Step 1 — Fetch the PR Diff (MCP-First)

Use MCP GitHub tools to retrieve the changed files without cloning:
- Use `call_mcp_tool` → `github/get_pull_request_files` to list all changed files.
- Use `call_mcp_tool` → `github/get_file_contents` to read specific file diffs.

Prioritize scanning these file types first (highest risk):
1. Auth/middleware files (`auth.ts`, `middleware.ts`, `guards/`)
2. Environment/config files (`.env`, `config.ts`, `secrets/`)
3. Database query files (ORMs, raw SQL, migration files)
4. API route handlers (controllers, resolvers)

### Step 2 — OWASP Top 10 Scan Checklist

For each changed file, systematically check:

| # | OWASP Category | What to grep/look for |
|---|----------------|----------------------|
| A01 | Broken Access Control | Missing auth guards, IDOR (fetching by ID without ownership check) |
| A02 | Cryptographic Failures | Hardcoded secrets, weak hashing (MD5, SHA1 for passwords), HTTP instead of HTTPS |
| A03 | Injection | String concatenation in SQL/NoSQL queries, unsanitized user input in shell commands |
| A04 | Insecure Design | Business logic flaws (e.g., negative quantities, bypassing payment) |
| A05 | Security Misconfiguration | CORS `*`, debug mode enabled, default credentials |
| A06 | Vulnerable Components | Known CVEs in added/updated dependencies |
| A07 | Auth Failures | Missing rate-limiting on login, session tokens in localStorage |
| A08 | Data Integrity | Unsigned JWTs, accepting untrusted serialized objects |
| A09 | Logging Failures | Logging PII/passwords, missing audit trail for sensitive actions |
| A10 | SSRF | User-supplied URLs fetched server-side without allowlist validation |

### Step 3 — Secrets Detection

Scan the diff for patterns that indicate leaked credentials:
```
grep -iE "(api[_-]?key|secret|password|token|private[_-]?key)\s*[:=]" <changed_files>
grep -E "(sk-[a-zA-Z0-9]{48}|ghp_[a-zA-Z0-9]{36}|AKIA[0-9A-Z]{16})" <changed_files>
```

If secrets are found: **BLOCKER**. The PR cannot merge. The secret must be rotated immediately (not just removed from the diff — it's already in git history).

### Step 4 — Draft the Security Review

Structure findings using severity prefixes:
- **[BLOCKER-SEC]**: Active vulnerability. Must fix before merge. (e.g., SQL injection, hardcoded API key)
- **[WARN-SEC]**: Potential risk that needs investigation. (e.g., CORS configuration change, new auth bypass path)
- **[INFO-SEC]**: Informational security observation. (e.g., "Consider adding CSP headers here")

> **⏸️ Checkpoint**:
> "Tôi đã scan xong PR diff. Tìm thấy [N] findings ([X] BLOCKER, [Y] WARN). Bạn có muốn tôi push review comments trực tiếp lên GitHub PR không? (Y/N)"

---

## 🛠️ Tooling & Execution

- **PR Fetch**: Use `call_mcp_tool` for `github/get_pull_request_files` and `github/get_pull_request`.
- **Code Read**: Use `view_file` or `call_mcp_tool` → `github/get_file_contents` for specific files.
- **Pattern Search**: Use `grep_search` to find vulnerability patterns across changed files.
- **Review Post**: Use `call_mcp_tool` → `github/create_pull_request_review` to submit findings.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Mega-PR (Too Large) | PR contains >100 changed files, making manual security review infeasible | Focus ONLY on high-risk files (auth, config, SQL, API handlers). Flag the PR with `[WARN-SEC]: This PR is too large for thorough security review. Consider splitting.` |
| Private Repo Access Denied | MCP GitHub tools cannot access the repository due to permission issues | Ask the user to provide the diff as text, or request temporary read access to the repo. |
| Unknown Framework | The codebase uses an unfamiliar ORM or auth library | Do NOT assume it's secure by default. Research the framework's security documentation before approving. Flag with `[INFO-SEC]: I am not familiar with [framework]'s security model. Recommend a domain expert review.` |

---

## ✅ Done Criteria / Verification

A security-focused code review is complete when:

- [ ] All changed files have been scanned against the OWASP Top 10 checklist.
- [ ] Zero hardcoded secrets exist in the diff (verified via pattern grep).
- [ ] All findings are categorized with severity prefixes (`[BLOCKER-SEC]`, `[WARN-SEC]`, `[INFO-SEC]`).
- [ ] BLOCKER findings have been communicated to the PR author before the review is approved.

---

## 📚 Cross-References

- `roles/dev/security-basics/SKILL.md` — The baseline security defenses this review enforces.
- `roles/dev/code-review-etiquette/SKILL.md` — How to communicate security findings constructively.
- [OWASP Top 10 (2021)](https://owasp.org/www-project-top-ten/) — The authoritative vulnerability taxonomy.
