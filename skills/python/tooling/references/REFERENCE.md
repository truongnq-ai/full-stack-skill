# Python Tooling — Reference

## Full pyproject.toml Template

```toml
[project]
name = "myapp"
version = "0.1.0"
description = "My Python application"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115",
    "pydantic>=2.0",
    "pydantic-settings>=2.0",
    "sqlalchemy[asyncio]>=2.0",
    "asyncpg>=0.29",
    "uvicorn[standard]>=0.30",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "pytest-asyncio>=0.23",
    "pytest-cov>=5.0",
    "httpx>=0.27",
    "ruff>=0.6",
    "mypy>=1.10",
    "pre-commit>=3.8",
]

[tool.uv]
dev-dependencies = [
    "pytest>=8.0",
    "pytest-asyncio>=0.23",
    "pytest-cov>=5.0",
]

[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "F",   # pyflakes
    "I",   # isort
    "UP",  # pyupgrade
    "B",   # flake8-bugbear
    "SIM", # flake8-simplify
    "ANN", # flake8-annotations
]
ignore = ["ANN101", "ANN102"]

[tool.ruff.lint.per-file-ignores]
"tests/**" = ["ANN", "S101"]

[tool.mypy]
python_version = "3.12"
strict = true
ignore_missing_imports = true
plugins = ["pydantic.mypy"]

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
addopts = "--cov=src --cov-report=term-missing --cov-fail-under=80"
```

## uv Workflow Commands

```bash
# New project
uv init myapp && cd myapp

# Add dependencies
uv add fastapi pydantic sqlalchemy
uv add --dev pytest pytest-asyncio ruff mypy

# Sync (CI/CD)
uv sync --frozen

# Run tests
uv run pytest

# Run app
uv run uvicorn app.main:app --reload

# Update all deps
uv lock --upgrade
uv sync
```

## GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
        with: { python-version: "3.12" }
      - run: uv sync --frozen
      - run: uv run ruff check .
      - run: uv run ruff format --check .
      - run: uv run mypy src/
      - run: uv run pytest
```

## Pre-commit Configuration

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.6.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.10.0
    hooks:
      - id: mypy
        additional_dependencies: [pydantic, types-requests]
```

## Pytest Fixtures Pattern

```python
# tests/conftest.py
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from app.main import app
from app.core.database import Base

@pytest.fixture(scope="session")
async def engine():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    await engine.dispose()

@pytest.fixture
async def session(engine) -> AsyncSession:
    async with AsyncSession(engine) as s:
        yield s
        await s.rollback()

@pytest.fixture
async def client() -> AsyncClient:
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as c:
        yield c
```
