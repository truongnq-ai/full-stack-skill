---
name: Python Language Patterns
description: Modern Python 3.12+ standards for type safety, async patterns, and idiomatic code.
metadata:
  labels: [python, language, type-hints, async, pydantic, dataclass]
  triggers:
    files: ["**/*.py", "pyproject.toml", ".python-version"]
    keywords:
      [
        type hint,
        dataclass,
        async,
        await,
        pydantic,
        match,
        generator,
        protocol,
        TypeVar,
      ]
---

# Python Language Patterns

## **Priority: P0 (CRITICAL)**

## Type Annotations

- Annotate all function params and return types. Infer locals.
- Use `str | None` (Python 3.10+), not `Optional[str]`.
- Use `list[T]`, `dict[K, V]`, `tuple[A, B]` — not `List`, `Dict`, `Tuple` from `typing`.
- `TypeVar` for generic functions. `Protocol` for structural typing.
- `TypeAlias` for complex type aliases.
- `Final` for constants. `ClassVar` for class-level attributes.

## Data Modeling

- `@dataclass` for simple data containers (no validation needed).
- `pydantic.BaseModel` for request/response schemas and config validation.
- Use `model_config = ConfigDict(frozen=True)` for immutable Pydantic models.
- Prefer `dataclass(slots=True)` for performance-critical data structures.

## Async Patterns

- `async def` for I/O-bound: DB, HTTP, file, network.
- `def` + `concurrent.futures` for CPU-bound tasks.
- Use `asyncio.gather()` for concurrent coroutines.
- Use `asyncio.TaskGroup` (Python 3.11+) for structured concurrency.
- Use `async with` for async context managers (DB sessions, HTTP clients).
- Never call blocking code inside `async def` — use `asyncio.run_in_executor`.

## Modern Syntax

- Pattern matching: `match/case` for multi-branch dispatch on structure.
- Walrus operator `:=` for assignment in conditions (use sparingly).
- Generators over list comprehensions for large data — memory efficient.
- `@contextmanager` or `__enter__/__exit__` for resource cleanup.
- F-strings for formatting. Avoid `%` and `.format()`.

## Anti-Patterns

- **No `Any`**: Use `object`, `Unknown`, or specific type instead.
- **No bare `except`**: Always specify exception type.
- **No mutable default args**: Use `field(default_factory=list)` in dataclass.
- **No `type: ignore`**: Fix root cause.
- **No `global`**: Use dependency injection or class attributes.
- **No `print` in production**: Use `logging` module.

## Code

```python
# Type alias + Protocol
type UserId = int
from typing import Protocol

class Readable(Protocol):
    def read(self) -> bytes: ...

# Pydantic v2
from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    model_config = ConfigDict(frozen=True)
    name: str
    email: str

# Async gather
async def fetch_all(ids: list[int]) -> list[dict]:
    return await asyncio.gather(*[fetch(id) for id in ids])

# Pattern matching
match command:
    case {"action": "create", "name": str(name)}: ...
    case {"action": "delete", "id": int(id)}: ...
```

## Reference & Examples

Advanced types, generics, Protocol patterns:
See [references/REFERENCE.md](references/REFERENCE.md).

## Related Topics

best-practices | tooling | security
