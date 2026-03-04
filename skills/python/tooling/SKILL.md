---
name: Python Tooling
description: Modern Python toolchain standards — uv, ruff, mypy, pytest, and pyproject.toml configuration.
metadata:
  labels: [python, tooling, uv, ruff, mypy, pytest, packaging]
  triggers:
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
---

# Python Tooling

## **Priority: P1 (STANDARD)**

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

```toml
# pyproject.toml
[tool.ruff]
line-length = 88
[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]
```

## Type Checking — mypy

```toml
[tool.mypy]
python_version = "3.12"
strict = true
ignore_missing_imports = true
```

Run: `uv run mypy src/`

## Testing — pytest

- File: `tests/test_*.py` or `tests/*_test.py`.
- Use fixtures for DB sessions, HTTP clients, auth tokens.
- `pytest-asyncio` for async test support.
- `pytest-cov` for coverage: `uv run pytest --cov=src --cov-report=term`.
- Target: ≥ 80% coverage for business logic.

```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
```

## pyproject.toml — Single Config

```toml
[project]
name = "myapp"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["fastapi>=0.115", "pydantic>=2.0"]

[project.optional-dependencies]
dev = ["pytest", "pytest-asyncio", "ruff", "mypy"]
```

## Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    hooks: [{ id: ruff, args: [--fix] }, { id: ruff-format }]
  - repo: https://github.com/pre-commit/mirrors-mypy
    hooks: [{ id: mypy }]
```

## Anti-Patterns

- **No pip install**: Use `uv add` to keep lock file updated.
- **No requirements.txt for new projects**: Use `pyproject.toml`.
- **No black + isort separately**: Use ruff.
- **No `# noqa` without reason**: Fix lint errors properly.
- **No loose versions**: Pin with `uv.lock`, not `>=` only ranges.

## Reference & Examples

Full pyproject.toml template, CI/CD config:
See [references/REFERENCE.md](references/REFERENCE.md).

## Related Topics

language | best-practices | security
