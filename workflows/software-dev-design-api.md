---
description: Dev designs REST/gRPC API endpoints, reviews existing contracts, or integrates 3rd-party APIs with safety checklists.
---

# 🔌 Dev API Design

> **Use this workflow when**: dev needs to design new API endpoints, review existing contracts, or integrate external APIs. Trigger: `/software-dev-design-api`.
>
> **Out of scope**: Does not implement database layer — use `software-dev-manage-database`. Does not test performance — use `software-dev-optimize-performance`.
>
> **Activates skills**: `skills/roles/dev/api-contract/SKILL.md`, `skills/common/system-design/SKILL.md`

---

## Step 1 — Identify Design Mode

| Mode | Trigger | Go to |
|------|---------|-------|
| **New Internal API** | Designing own endpoints | Step 2 |
| **API Review** | Reviewing existing endpoints | Step 3 |
| **3rd-Party Integration** | Calling external API | Step 4 |

---

## Step 2 — New API Design

Gather: Resource name, CRUD operations needed, consumers (frontend/mobile/service), auth method.

Apply REST conventions: `GET /resources`, `POST /resources`, `PUT /resources/:id`, `DELETE /resources/:id`.

Generate contract per endpoint:

```yaml
Endpoint: POST /orders
Auth: Bearer token (required)
Request Body: [fields with types, required/optional]
Response 201: [success shape]
Response 400/401/422: [error shapes with string error codes]
```

> **Rule**: Define ALL error codes before implementation. Use string constants, not HTTP status alone.

---

## Step 3 — API Contract Review

Assess: REST compliance, response consistency, error codes, input validation, auth coverage, pagination, versioning.

Generate Contract Review Report with per-endpoint checklist.

---

## Step 4 — 3rd-Party Integration

Safety checklist:
- [ ] Read official API docs
- [ ] Identify auth method (OAuth2 / API Key / HMAC)
- [ ] Check rate limits and plan retry strategy
- [ ] Verify webhook signature requirements
- [ ] Add timeout on all HTTP calls (≥30s)
- [ ] Log request IDs for traceability

> **Fallback**: If no official SDK, use native `fetch`/`axios`. Never use unofficial SDK without checking maintenance status.

---

## ⏸️ Checkpoint: Approve Contract

```
"API contract draft ready: [endpoint list]
Approve to proceed with implementation? (Y / N)"
```

---

## Step 5 — Generate Skeleton & Test

Generate: Controller/Handler, DTO/Schema, Service stub, Error constants.

Save contract to `docs/api/api-[resource]-contract.yaml`.

Test with curl:
```bash
curl -X POST http://localhost:<port>/<endpoint> -H "Authorization: Bearer <token>" -d '{"field":"value"}'
```

---

## Done Criteria

- [ ] API contract documented in `docs/api/`
- [ ] Error codes defined as string constants
- [ ] Integration tests saved as curl scripts
