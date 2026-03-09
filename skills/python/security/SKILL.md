---
name: Python Security
description: Production security standards for Python — input validation, injection prevention, secrets, and auth.
metadata:
  labels: [python, security, owasp, injection, auth, secrets, pydantic]
  triggers:
    priority: medium
    confidence: 0.7
    files: ["**/*.py", ".env", "pyproject.toml", "requirements.txt"]
    keywords:
      [
        injection,
        validation,
        secrets,
        auth,
        JWT,
        password,
        sanitize,
        SQL,
        OWASP,
      ]
workflow_ref: deep-security-audit
---

# Python Security

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Input Validation — Pydantic First

- Validate ALL external input with Pydantic before processing.
- Constrain fields: `str` with `max_length`, `int` with `ge`/`le`, `EmailStr`.
- Use `model_validator` for cross-field validation.
- Reject unexpected fields: `model_config = ConfigDict(extra="forbid")`.

## SQL Injection Prevention

- Use ORM (SQLAlchemy, Tortoise, Django ORM) — never string-concatenated SQL.
- Raw SQL: **parameterized queries only**. Never f-string SQL.

## Secrets Management

- Load secrets from environment: `os.environ["SECRET_KEY"]` or `pydantic-settings`.
- Never hardcode secrets. Never commit `.env` files.
- Use `python-dotenv` locally. Use system env / secrets manager in prod.
- Rotate secrets periodically. Log access, not values.

## Authentication & Passwords
