---
name: Security Standards
description: Universal security protocols for safe and resilient software. Activates when working with auth, secrets, external input, infrastructure configs, or dependency management.
metadata:
  labels: [security, encryption, authentication, authorization, owasp]
  triggers:
    files: ['.env*', 'Dockerfile', 'docker-compose*.yml', '.github/workflows/*.yml', '**/*.env', '**/auth/**', '**/middleware/**']
    keywords: [security, encrypt, authenticate, authorize, vulnerability, CVE, secret, token, code-review, injection, XSS, CSRF, RBAC, bcrypt, jwt, oauth]
    composite: [feedback-reporter]
    negative: ["user asks to write business logic unrelated to security — use relevant framework skill"]
---

# Security Standards

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: replace framework-specific security implementations — use `typescript/security` for TS-specific patterns. Does not handle secrets management infrastructure — use `deploy` workflow.

**Compatible skills**: `typescript/security` (TS-specific), `code-review` (security review layer), `feedback-reporter` (violation reporting), `guardrails` (safe operations).

## 🛡 Data Safeguarding

- **Zero Trust**: Sanitize and validate every data boundary (API, UI, CSV, env).
- **Least Privilege**: Minimum necessary permissions for users, services, containers.
- **No Hardcoded Secrets**: Use env vars or secret managers. Never commit keys or passwords.
- **Encryption**: AES-256 data-at-rest. TLS 1.3 data-in-transit. Never MD5/SHA1 for passwords.

> **Fallback**: If secret manager unavailable, use `.env` + `.gitignore` + documented rotation schedule.

## 🧱 Secure Coding

- **Injection**: Parameterized queries or ORM for all DB access. No string concatenation in queries.
- **Dependencies**: Run `npm audit` / `pip audit` in CI. Block PRs with critical CVEs.
- **Auth**: bcrypt (cost ≥12) for passwords. JWT with short expiry. RBAC enforced server-side.
- **Error Privacy**: Return generic error codes to clients. Never leak stack traces.

> To load injection testing protocols: `view_file .agent/skills/common/security-standards/references/INJECTION_TESTING.md`

## 🔍 Continuous Security

- **Shift Left**: SAST/DAST scanners in CI pipeline (not only at release).
- **Data Minimization**: Collect and store only what's required by business logic.
- **Audit Logs**: Log auth events, deletions, admin changes with timestamp and actor ID.

## 🚫 Anti-Patterns

**`No Secrets in Git`**: Use Secret Managers or env vars. Purge history with `git filter-repo` if exposed.

**`No String Concat Queries`**: Always use parameterized queries or ORM — prevents SQL injection.

**`No Stacktraces in Prod`**: Return `{ error: "Something went wrong" }`. Log full trace server-side only.

**`No Default Passwords`**: Force rotation on first use. Enforce strong entropy requirements.

**`No Unaudited CVEs`**: Block deployment if `npm audit` reports high/critical severity.

## ✅ Verification Checklist

- [ ] No secrets committed (verified with `git log --all -- '*.env'`)
- [ ] All user inputs validated before use
- [ ] `npm audit` / `pip audit` passes with no critical CVEs
- [ ] Auth endpoints have rate limiting
- [ ] Audit logs implemented for sensitive operations

## 📚 References

- [Injection Testing Protocols](references/INJECTION_TESTING.md)
- [Vulnerability Remediation & Secure Patterns](references/VULNERABILITY_REMEDIATION.md)
