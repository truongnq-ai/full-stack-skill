---
name: Python Tooling
description: Modern Python toolchain standards — uv, ruff, mypy, pytest, and pyproject.toml configuration.
metadata:
  labels: [python, tooling, uv, ruff, mypy, pytest, packaging]
  triggers:
    priority: medium
    confidence: 0.7
    files:
      [
        "pyproject.toml",
        "uv.lock",
        ".python-version",
        "ruff.toml",
        "setup.py",
        "requirements.txt",
      ]
    keywords:
      [uv, ruff, mypy, pytest, pyproject, pre-commit, packaging, virtualenv]
workflow_ref: deep-security-audit
---

# Python Tooling

## **Priority: P1 (STANDARD)**

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

## Package Manager — uv

- Use `uv` as default. Replaces pip, poetry, pipenv.
- `uv init` — create new project.
- `uv add <pkg>` — add dependency (updates `pyproject.toml` + `uv.lock`).
- `uv add --dev <pkg>` — dev dependency.
- `uv sync` — install from lock file (CI/CD).
- `uv run <cmd>` — run in venv without activation.
- Commit `uv.lock` to version control.

## Linting & Formatting — ruff

- Replaces: **black + isort + flake8 + pylint**.
- `ruff check --fix` — lint and auto-fix.
- `ruff format` — format code (black-compatible).

## Type Checking — mypy

Run: `uv run mypy src/`

## Testing — pytest

- File: `tests/test_*.py` or `tests/*_test.py`.
- Use fixtures for DB sessions, HTTP clients, auth tokens.
- `pytest-asyncio` for async test support.
- `pytest-cov` for coverage: `uv run pytest --cov=src --cov-report=term`.
- Target: ≥ 80% coverage for business logic.

## pyproject.toml — Single Config

## Pre-commit Hooks

## Anti-Patterns

- **No pip install**: Use `uv add` to keep lock file updated.
- **No requirements.txt for new projects**: Use `pyproject.toml`.
- **No black + isort separately**: Use ruff.
- **No `# noqa` without reason**: Fix lint errors properly.
- **No loose versions**: Pin with `uv.lock`, not `>=` only ranges.

## Reference & Examples

Full pyproject.toml template, CI/CD config:
See [references/REFERENCE.md](references/REFERENCE.md).
See [references/examples.md](references/examples.md).

## Related Topics

language | best-practices | security
