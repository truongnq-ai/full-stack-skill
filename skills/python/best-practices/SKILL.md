---
name: Python Best Practices
description: Framework selection, project structure, and clean architecture patterns for production Python.
metadata:
  labels: [python, best-practices, fastapi, django, architecture, clean-code]
  triggers:
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

- Fat models, thin views. Business logic in model methods or services.
- `select_related()` for FK, `prefetch_related()` for M2M — avoid N+1.
- Use class-based views for CRUD. Function-based for simple endpoints.
- Custom managers for repeated query patterns.
- Use `only()` / `defer()` to limit fields fetched.

## SOLID in Python

- **SRP**: One class = one reason to change. Split large services.
- **OCP**: Extend via subclass/Protocol, not by modifying existing code.
- **DIP**: Depend on `Protocol` (abstract), inject concrete at startup.
- **LSP**: Subclasses must honor parent's contract, not narrow behavior.

## Anti-Patterns

- **No logic in routes**: Routes = thin adapter. Logic in services.
- **No N+1 queries**: Always check query count in tests.
- **No God classes**: Split when a class has 3+ unrelated responsibilities.
- **No Django in async without care**: Sync ORM in async view = deadlock risk.
- **No hardcoded config**: Use `pydantic-settings` or `django-environ`.

## Reference & Examples

Detailed project templates, FastAPI/Django structure examples:
See [references/REFERENCE.md](references/REFERENCE.md).
See [references/examples.md](references/examples.md).

## Related Topics

language | tooling | security
