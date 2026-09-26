---
description: "Write, generate, or update API documentation (OpenAPI/Swagger/REST) from codebase or specs."
---

# ✍️ Writer: API Documentation

> **Use this workflow when**: Writer needs to create or update API docs — OpenAPI specs, Swagger UI, endpoint references, or request/response contracts. Trigger: `/software-writer-api-docs`.
>
> **Out of scope**: Does not write infrastructure docs — use `/software-writer-infra-docs`. Does not write user-facing manuals — use `/software-writer-user-manuals`. Does not design the API — use `/software-dev-design-api`.
>
> **Activates skills**: `skills/roles/writer/api-docs/SKILL.md`, `skills/common/documentation/SKILL.md`

---

## Step 1 — Load Skills & Identify Scope

```
view_file skills/roles/writer/api-docs/SKILL.md
view_file skills/common/documentation/SKILL.md
```

Identify what needs documentation:
- New endpoints added (check git diff or PR description)
- Existing endpoints missing docs (grep for undocumented routes)
- OpenAPI spec out of sync with implementation

---

## Step 2 — Extract API Contract

Read source files to extract:

```bash
grep -rE "@(Get|Post|Put|Delete|Patch)|router\.(get|post|put|delete)" src/ --include="*.ts" -l
```

For each endpoint, capture:
- HTTP Method + Path
- Request params / body schema
- Response schema (success + error codes)
- Auth requirements (public / bearer / API key)

> **Fallback**: If no source files found:
> 1. Check for Postman collection: `find . -name "*.postman_collection.json"`
> 2. If exists → extract endpoints from Postman JSON
> 3. If not → ask user to provide endpoint list (method, path, description)
> Never invent endpoints — only document what is confirmed.

---

## Step 3 — Write / Update OpenAPI Spec

Update or create `docs/api/openapi.yaml` (or inline JSDoc `@swagger` blocks):

```yaml
# Skeleton per endpoint
/resource/{id}:
  get:
    summary: <one-line description>
    tags: [<tag>]
    security: [bearerAuth: []]
    parameters: []
    responses:
      200:
        description: <success description>
        content:
          application/json:
            schema: {}
      400: { description: Bad Request }
      401: { description: Unauthorized }
```

> **Rule**: Every endpoint must have at minimum: summary, 200 response, and at least one error response (4xx/5xx).

---

## ⏸️ Checkpoint: Spec Review

```
"API spec draft complete:
- Endpoints documented: [N]
- Missing auth docs: [N]
- Undocumented error codes: [N]

Proceed to generate Swagger UI / render docs? (Y / N — revise first)"
```

---

## Step 4 — Validate & Generate Output

```bash
# Install swagger-cli if missing
npx swagger-cli --version 2>/dev/null || npm install -g @apidevtools/swagger-cli
npx swagger-cli validate docs/api/openapi.yaml
```

Save final output to:
- `docs/api/openapi.yaml` — machine-readable spec
- `docs/api/README.md` — human-readable summary table (endpoint | method | auth | description)

---

## Done Criteria

- [ ] `docs/api/openapi.yaml` valid (or JSDoc blocks complete)
- [ ] `docs/api/README.md` summary table generated
- [ ] Every endpoint has: summary, auth requirement, success + error responses
- [ ] No undocumented public-facing endpoints

> **Required Skill**: `skills/roles/writer/api-docs/SKILL.md`
