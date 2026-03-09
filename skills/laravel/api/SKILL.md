---
name: Laravel API
description: REST and JSON API standards for modern Laravel backends.
metadata:
  labels: [laravel, api, rest, json, sanctum]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['routes/api.php', 'app/Http/Resources/**/*.php']
    keywords: [resource, collection, sanctum, passport, cors]
workflow_ref: smart-release
---

# Laravel API

## **Priority: P1 (HIGH)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Structure

```text
app/
└── Http/
    ├── Resources/      # Data transformation
    └── Controllers/
        └── Api/        # API specific logic
```

## Implementation Guidelines

- **API Resources**: Always use Resources/Collections for JSON formatting.
- **RESTful Actions**: Follow standard naming (`index`, `store`, `update`).
- **Auth**: Use **Sanctum** for SPAs/Mobile or **Passport** for OAuth2.
- **Status Codes**: Return appropriate HTTP codes (201 Created, 422 Unprocessable).
- **Versioning**: Prefix routes with version tags (e.g., `api/v1/...`).
- **Rate Limiting**: Configure `RateLimiter` to protect public endpoints.

## Anti-Patterns

- **Raw Models**: **No raw model returns**: Information leakage risk.
- **Manual JSON**: **No response()->create()**: Use API Resources.
- **Session Auth**: **No sessions for APIs**: Use Tokens (Sanctum).
- **Hardcoded URLs**: **No static links in JSON**: Use HATEOAS or route names.

## References

- [API Resource Patterns](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
