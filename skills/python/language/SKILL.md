---
name: Python Language Patterns
description: Modern Python 3.12+ standards for type safety, async patterns, and idiomatic code.
metadata:
  labels: [python, language, type-hints, async, pydantic, dataclass]
  triggers:
    priority: medium
    confidence: 0.7
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
workflow_ref: deep-security-audit
---

# Python Language Patterns

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

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
