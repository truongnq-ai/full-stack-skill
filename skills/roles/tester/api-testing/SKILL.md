---
name: API & Backend Testing Strategy
description: QA Engineer skill for designing and executing API tests. Focuses on boundary conditions, security, and logical flaws rather than just the happy path.
category: roles/tester
metadata:
  labels: [qa, tester, api-testing, postman, backend]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [test api, write api tests, verify backend, postman collection, endpoint]
    file_patterns: ["tests/api/**/*.ts", "tests/api/**/*.js"]
    context: ["user asks to test an endpoint", "user asks to verify the backend logic"]
---

# 🔌 API & Backend Testing Strategy

> **Use this skill when**: you need to validate a backend REST, GraphQL, or gRPC endpoint directly, bypassing the UI. Trigger: `/qa-test-api`.
>
> **Out of scope**: This does not test the UI representation of the data (use `roles/tester/automation-e2e/SKILL.md` for UI Playwright tests).

---

## 🚫 Anti-Patterns

- **Only Happy Path**: Never just test the scenario where everything goes right (e.g. valid payload returns 200).
- **Ignoring Setup/Teardown**: Do not write tests that corrupt the database. Always use a test DB or mock data, and clean up after.
- **Silent Failures**: If a test fails, you must output a structured bug report, not just say "It failed".
- **Shallow Assertions**: Checking if response is `200 OK` but failing to verify the JSON structure or schema constraints.

---

## 🛠 Prerequisites & Tooling

1. Read the `system-design.md` or API contract (Swagger/OpenAPI).
2. Familiarity with standard HTTP status codes and security injection vectors.

**Required Tools**: Use `run_command` to execute `curl`, Postman CLI, or API test scripts (Jest/Supertest/PyTest).

---

## 🔄 Execution Workflow

### Step 1 — Spec Review (Traceability)
Read the API contract. Identify the HTTP Method, Route, Headers (Auth), Query params, Body payload, and expected Status Codes.

### Step 2 — Test Scenario Design (The Matrix)
For every endpoint, design tests across 4 dimensions.
**Golden Rule**: For every 1 valid input test, write 3 invalid/edge tests.
1. **Happy Path**: Correct payload -> `200 OK` or `201 Created`.
2. **Boundary/Type Tests**: What if a string is empty? What if an integer is negative or 0? What if an array is passed instead of a string? -> `400 Bad Request`.
3. **Security Tests**: SQL Injection payload, XSS payload, missing Auth headers, expired token -> `401 Unauthorized` or `403 Forbidden`.
4. **Logical Limits**: Try to fetch an ID that doesn't exist -> `404 Not Found`. Try to exceed a rate limit -> `429 Too Many Requests`.

### Step 3 — Execution
Write the test cases using `curl` commands, Postman JSON, or Jest/Supertest code. Use `run_command` to execute them locally if possible.

```bash
# Example Security Test
curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@app.com' OR 1=1--", "password":"foo"}'
```

### Step 4 — Validation & Bug Reporting
Analyze the output. If the API returns `500 Internal Server Error` instead of a graceful `400 Bad Request`, that is a Bug. Log it via `bug-reporting-standard/SKILL.md`.

> **⏸️ Checkpoint**: 
> "Tôi đã thiết kế xong 15 test cases (gồm 3 Happy Paths và 12 Edge Cases) cho Endpoint này. Bạn có muốn tôi tiến hành code chúng vào file `api.test.ts` và chạy thử không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| No Docs | There is no Swagger or documentation | Abort. You cannot test an API if you do not know the contract. Send it back to the developer to document. |
| Test DB Pollution | You create 50 users via API and the DB is clogged | Implement `beforeAll` / `afterAll` teardown hooks in the script to delete created records automatically. |

---

## ✅ Done Criteria / Verification

API testing is complete when:

- [ ] Boundary, Type, and Negative tests greatly outnumber the Happy Path tests.
- [ ] Authentication and Authorization (roles) are explicitly verified.
- [ ] There is a clear pass/fail assertion for every HTTP status code and response schema.

---

## 📚 Cross-References

- **Bug Reporting Standard**: `roles/tester/bug-reporting-standard/SKILL.md` (To report any 500 errors found)
- **Test Case Design**: `roles/tester/test-case-design/SKILL.md` (Applying BVA/EP principles to the API payload)
