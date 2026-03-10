---
description: API design, contract definition, and 3rd-party integration workflow. Covers REST/gRPC endpoint design, request/response schema, error codes, and integration testing.
---

# 🔌 API Design & Integration Workflow

> **Use this workflow when**: user wants to design new API endpoints, review existing API contracts, or integrate a 3rd-party API. Trigger phrases: "design this API", "integrate with X", "review API contract", "add endpoint for Y", `/api-design`.
>
> **Out of scope**: Does not implement database layer — use `db-workflow` for schema. Does not cover GraphQL schema design (different patterns apply). Does not test load/performance — use `performance` workflow.
>
> **Applicable rules**: `agent-skill-standard-rule` • `file-safety-rule` • `skill-integrity-rule` • `code-generation-rule` • `testing-rule` • `dependency-rule` • `commit-message-rule`

---

## Step 1 — Identify Design Mode

| Mode | Trigger | Go to |
|------|---------|-------|
| **New Internal API** | Designing endpoints for own service | Step 2A |
| **API Review** | Reviewing existing endpoints for quality | Step 2B |
| **3rd-Party Integration** | Calling external API (payment, bank, exchange) | Step 2C |

---

## Step 2A — New Internal API Design

Gather requirements before writing any code:

- **Resource**: What entity does this endpoint manage? (e.g., `Order`, `User`, `Position`)
- **Operations**: Which CRUD operations are needed?
- **Consumers**: Who calls this? (frontend, mobile, another service, cron job?)
- **Auth**: Public / Bearer token / API key / Internal-only?

Apply REST conventions:

| Operation | Method | Path |
|-----------|--------|------|
| List | GET | `/resources` |
| Get one | GET | `/resources/:id` |
| Create | POST | `/resources` |
| Update (full) | PUT | `/resources/:id` |
| Update (partial) | PATCH | `/resources/:id` |
| Delete | DELETE | `/resources/:id` |

**Contract template (generate for each endpoint)**:

```yaml
Endpoint: POST /orders
Auth: Bearer token (required)
Request Body:
  - symbol: string (required) — trading pair, e.g. "BTCUSDT"
  - side: enum ["BUY", "SELL"] (required)
  - quantity: number (required, >0)
  - price: number (optional — market order if omitted)
Response 201:
  - id: string
  - status: "PENDING"
  - createdAt: ISO8601 string
Response 400: { code: "INVALID_QUANTITY", message: "..." }
Response 401: { code: "UNAUTHORIZED" }
Response 422: { code: "INSUFFICIENT_BALANCE", available: number }
```

> **Rule**: Define ALL error response codes before implementation. Error codes must be string constants (not HTTP status alone).

---

## Step 2B — API Contract Review

Load `view_file` on relevant controller/handler files. Assess:

| Check | Question |
|-------|----------|
| REST compliance | Are methods and paths semantically correct? |
| Response consistency | Do all endpoints use same envelope structure? |
| Error codes | Are error codes string constants or just HTTP status? |
| Input validation | Is request body validated before business logic? |
| Auth coverage | Is every non-public endpoint behind auth middleware? |
| Pagination | Do list endpoints support pagination? (limit/offset or cursor) |
| Versioning | Is API versioned? (`/v1/...`) |

Generate a **Contract Review Report**:

```
### API Contract Review — [Date]

| Endpoint | REST ✓ | Validation ✓ | Auth ✓ | Errors ✓ | Issues |
|----------|--------|-------------|--------|----------|--------|
| GET /users | ✅ | ✅ | ✅ | ⚠️ | Error code is numeric, not string |
```

---

## Step 2C — 3rd-Party Integration

```bash
# Check if SDK/client library exists
npm search <provider-name>-sdk 2>/dev/null | head -5
# OR check official docs for recommended client
```

> **Fallback**: If no official SDK exists, use native `fetch` or `axios` with the provider's REST API directly. Never use an unofficial/community SDK without verifying maintenance status (check last release date on npm).

**Integration safety checklist**:
- [ ] Read official API docs (not just examples)
- [ ] Check authentication method: OAuth2 / API Key / HMAC signature
- [ ] Identify rate limits and plan retry strategy
- [ ] Check webhook signature verification requirements
- [ ] Identify idempotency key requirement (payment APIs)
- [ ] Add timeout on all HTTP calls (`timeout: 30_000` at minimum)

**Integration template**:

```typescript
// Always wrap 3rd-party calls in try/catch
// Always log request ID for traceability
// Always handle both success and error response shapes
try {
  const response = await client.createOrder(payload);
  logger.info("3rd-party order created", { requestId: response.id });
  return response;
} catch (err) {
  logger.error("3rd-party order failed", { payload, error: err });
  throw new IntegrationException(err.code, err.message);
}
```

---

## ⏸️ Checkpoint: Review Contract Before Implementation

```
"API contract draft ready:
[Endpoint list with methods, auth, request/response shapes]

Approve to proceed with implementation? (Y / N — revise)"
```

---

## Step 3 — Generate Implementation Skeleton

Once contract approved, generate:

1. **Controller/Handler** — route definition, input parsing, auth middleware
2. **DTO/Schema** — request/response types with validation decorators
3. **Service stub** — method signatures only (no implementation yet)
4. **Error constants** — string enum of all error codes defined in contract

Save to `docs/api/api-[resource]-contract.yaml` (create `docs/api/` if missing) before proceeding to implementation.

---

## Step 4 — Integration Test

```bash
# Test with real or mock server
curl -X POST http://localhost:<port>/<endpoint> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"field":"value"}'

# Test error cases
curl -X POST ... -d '{}' # missing required fields → expect 400
curl -X POST ... -H "Authorization: Bearer bad-token" → expect 401
```

Save passing curl commands to `docs/api/api-[endpoint]-test.sh` for CI/CD integration and future regression testing.
