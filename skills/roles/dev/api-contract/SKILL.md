---
name: API Contract Definition
description: Standards for designing, documenting, and versioning robust REST/GraphQL APIs before writing the backend implementation.
category: roles/dev
metadata:
  labels: [dev, api, contract-first, openapi, swagger, design]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [api contract, openapi, swagger, new endpoint, design api]
---

# 📜 API Contract First Protocol

> **Use this skill when**: a developer is assigned to build a new feature that requires frontend-to-backend or service-to-service communication. Trigger: `/dev-api-contract`.
>
> **Out of scope**: This does not cover the literal node.js or go code to *build* the endpoint. This exclusively governs the *design* of the JSON shape before coding begins.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **The "200 OK" Error** — `HTTP 200 OK` with body `{"error": "User not found"}`. | Clients can't distinguish success from failure programmatically. |
| **P0** | **Breaking Changes in V1** — Deleting a field from an existing endpoint. | Crashes deployed mobile apps instantly. |
| **P1** | **Code-First Generation** — Writing backend first, auto-generating Swagger later. | Frontend team blocked for weeks; bottleneck in delivery. |

---

## 🛠 Prerequisites & Tooling

1. OpenAPI Specification (OAS 3.0+) or GraphQL Schema standard.
2. A mocking tool (e.g., Postman Mock Server, Stoplight).

### Required Tools

| Tool | Purpose |
|------|--------|
| `write_to_file` | Create OpenAPI YAML/JSON spec files. |
| `view_file` | Read existing API contracts and schemas. |
| `grep_search` | Find existing endpoints and route definitions. |
| `call_mcp_tool` → `github/create_pull_request` | Submit the API spec for cross-team review. |
| `run_command` | Run contract testing tools (Pact, Dredd). |

---

## 🔄 Execution Workflow

### Step 1 — Draft the Contract (Design Phase)
Before writing application logic, the Backend developer drafts a YAML/JSON OpenAPI definition.
It must include:
- Exact Endpoint Route (`POST /api/v2/orders`).
- Explicit HTTP Status Returns (`201 Created`, `400 Bad Request`).
- Literal JSON body shapes with data types (`amount: integer, required`).

### Step 2 — Cross-Team Review (The Handshake)
The Backend developer submits the raw YAML spec to the Frontend and QA teams via a Pull Request.
The Frontend team verifies: "Does this payload contain everything I need to render the UI?"
QA verifies: "Are the validation boundaries clear for equivalence testing?"

### Step 3 — Mocking (Parallel Execution)
Once the YAML is approved, load it into a Mocking engine.
The Frontend team immediately starts building the UI against the mock API.
The Backend team immediately starts coding the business logic to fulfill the contract.
*This eliminates linear blocking.*

### Step 4 — Contract Testing
Integrate tools like Pact or Dredd into the CI pipeline.
If the Backend developer accidentally changes the response from `userId` to `user_id`, the CI pipeline must fail instantly because it violated the explicitly agreed-upon contract.

### Step 5 — Versioning Policy
If a field MUST be deleted or drastically changed:
1. Do not touch `v1`.
2. Create `POST /api/v2/...`
3. Mark `v1` as `@deprecated` in the OpenAPI spec, giving clients 6 months to migrate.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Third-Party API Changes | An external vendor changes their XML response breaking your contract | Implement the "Anti-Corruption Layer" pattern. Write an adapter that transforms their new messy XML into your pristine internal JSON contract, hiding the vendor's break from your Frontend. |

---

## ✅ Done Criteria / Verification

API Contract generation is successful when:

- [ ] A formal OpenAPI/Swagger or GraphQL definition is written and peer-reviewed.
- [ ] Proper HTTP semantics (Status Codes, Verbs) are strictly enforced.
- [ ] Frontend developers can begin working immediately against a Mock server without waiting for Backend code.
- [ ] Contract tests (Pact/Dredd) integrated into CI pipeline.
- [ ] Versioning policy defined for breaking changes.

---

## 📚 References

- [Design Review Checklist Skill](../design-review-checklist/SKILL.md) — Reviewing API design at the architectural level.
- [Security Basics Skill](../security-basics/SKILL.md) — Ensuring API inputs are validated.
- [Implementation Workflow Skill](../implementation-workflow/SKILL.md) — Coding the API after contract approval.
- OpenAPI Specification: https://spec.openapis.org/oas/v3.1.0
- Pact contract testing: https://docs.pact.io/
