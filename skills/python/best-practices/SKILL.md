---
name: Python Best Practices
description: Framework selection, project structure, and clean architecture patterns for production Python.
metadata:
  labels: [python, best-practices, fastapi, django, architecture, clean-code]
  triggers:
    priority: medium
    confidence: 0.7
    files: ["**/*.py", "main.py", "app.py", "manage.py", "pyproject.toml"]
    keywords:
      [
        FastAPI,
        Django,
        Flask,
        project structure,
        clean architecture,
        SOLID,
        dependency injection,
      ]
workflow_ref: deep-security-audit
---

# Python Best Practices

## **Priority: P0 (CRITICAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Framework Selection

| Context                             | Framework                  |
| ----------------------------------- | -------------------------- |
| API-only, async, microservices      | **FastAPI**                |
| Full-stack, CMS, admin panel        | **Django**                 |
| AI/ML serving, high-performance API | **FastAPI + Pydantic**     |
| Simple scripts, learning            | **Flask**                  |
| Background workers                  | **Celery** (any framework) |

> Ask user for existing stack before assuming. Never default without context.

## Project Structure

## FastAPI Patterns

- Group routes in `APIRouter`, mount in `main.py`.
- Business logic in `services/` — never in route handlers.
- Database sessions via `Depends()` — use `yield` for cleanup.
- Return typed Pydantic response schemas, not raw dicts.
- Use `lifespan` context manager for startup/shutdown resources.

## Django Patterns
