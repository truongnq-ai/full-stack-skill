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

- **Code-First Generation**: Writing the backend Python code first, auto-generating the Swagger spec from it, and giving it to the Frontend team 2 weeks later. (This creates a massive bottleneck).
- **Breaking Changes in V1**: Modifying an existing `GET /users` payload by deleting the `last_name` field, instantly crashing iOS apps currently installed on user phones.
- **The "200 OK" Error**: Returning `HTTP 200 OK` with a JSON body `{"error": "User not found"}`. (Always use proper HTTP Status Codes like `404`).

---

## 🛠 Prerequisites & Tooling

1. OpenAPI Specification (OAS 3.0+) or GraphQL Schema standard.
2. A mocking tool (e.g., Postman Mock Server, Stoplight).

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
