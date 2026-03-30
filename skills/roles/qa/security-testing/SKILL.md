---
name: Web Security Testing Basics
description: Baseline checks for common web vulnerabilities (XSS, SQLi, Auth bypass) during standard feature regression.
category: roles/qa
metadata:
  labels: [qa, security, penetration-testing, owasp]
  triggers:
    priority: medium
    confidence: 0.8
    keywords: [security test, penetration, owasp, xss, sqli]
---

# 🕵️‍♀️ Web Security Testing Basics

> **Use this skill when**: performing exploratory testing or when writing test cases for authentication, file uploads, or data entry forms. Trigger: `/qa-security-test`.
>
> **Out of scope**: This is NOT a substitute for a professional Penetration Test or automated SAST/DAST tooling. This is the manual QA security safety net.

---

## 🚫 Anti-Patterns

- **Trusting the UI Constraint**: Assuming a user can't upload a `.exe` just because the frontend HTML `<input accept="image/*">` says so. (Always test via cURL/Postman).
- **Ignoring Privilege Boundaries**: Testing "Admin can delete user" but forgetting to test "Standard User can delete user (Auth Bypass)".
- **Blind Copy/Paste Vectors**: Copy-pasting massive 10MB payload lists from GitHub into a form, crashing the test browser without knowing *which* payload triggered the vulnerability.

---

## 🛠 Prerequisites & Tooling

1. Application UI and API documentation (e.g., Postman Collection).
2. A basic proxy tool (e.g., Burp Suite Community or Chrome Network Tab) to intercept and manipulate requests.

---

## 🔄 Execution Workflow

### Step 1 — XSS (Cross-Site Scripting) Probe
For any new text input field (Comments, Usernames, Bios):
1. Input standard script payload: `<script>alert('XSS')</script>`
2. Input HTML injection: `<b>Bold</b><img src=x onerror=alert(1)>`
3. Save the form.
*Assertion*: When the page reloads, the literal text must render safely. If an alert box pops up or the text becomes mysteriously bold, log a Critical `BUG-XXX (XSS Vulnerability)`.

### Step 2 — SQLi (SQL Injection) Probe
For any search bar, login form, or URL parameter (`?id=4`):
1. Append a single quote: `?id=4'`
2. Append tautology: `?id=4 OR 1=1`
*Assertion*: If `?id=4'` returns a raw SQL syntax error (e.g., "mysql_fetch_array()"), or if `OR 1=1` bypasses a login, log a Critical `BUG-XXX (SQLi Vulnerability)`.

### Step 3 — IDOR (Insecure Direct Object Reference)
For any dashboard passing an ID in the API (`GET /api/receipts/102`):
1. Log in as `User A`.
2. Fetch User A's receipt (`GET /api/receipts/102`) -> 200 OK.
3. Fetch `User B`'s receipt (`GET /api/receipts/103`).
*Assertion*: Step 3 MUST return `403 Forbidden` or `404 Not Found`. If it returns User B's private data, log a Critical `BUG-XXX (IDOR)`.

### Step 4 — Form Tampering (Client-Side Trust)
1. Fill a checkout form: Item Price is $100.
2. Intercept the HTTP POST request.
3. Change `{"price": 100}` to `{"price": 1}`.
4. Forward the request.
*Assertion*: The Backend MUST recalculate the price from the trusted database ID, completely ignoring the client-supplied price.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Locked Out | Testing XSS triggers the WAF and bans your QA IP | Ask DevOps to whitelist your IP for the staging environment. Never run aggressive payloads against Production without explicit scheduled permission. |
| Complex Vector | You suspect an SSRF vulnerability but lack the tooling | Write up the suspicion as an "Anomaly Observation" and forward it directly to the AppSec/Lead Dev team. |

---

## ✅ Done Criteria / Verification

A basic security sweep is complete when:

- [ ] All new text inputs have been explicitly tested against script injection tags.
- [ ] At least one attempt was made to bypass Authorization (IDOR) on new endpoints.
- [ ] Any successful exploits are immediately escalated as S1/Blocker bugs, halting the deployment gate.
