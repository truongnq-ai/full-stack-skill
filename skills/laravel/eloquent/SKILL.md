---
name: Laravel Eloquent
description: Advanced Eloquent ORM patterns for performance and query reuse.
metadata:
  labels: [laravel, eloquent, orm, database]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['app/Models/**/*.php']
    keywords: [scope, with, eager, chunk, model]
workflow_ref: performance
---

# Laravel Eloquent

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

## Structure

```text
app/
└── Models/
    ├── {Model}.php
    └── Scopes/         # Advanced global scopes
```

## Implementation Guidelines

- **N+1 Prevention**: Always use `with()` or `$with` for relationships.
- **Eager Loading**: Set strict loading via `Eloquent::preventLazyLoading()`.
- **Reusable Scopes**: Define `scopeName` methods for common query filters.
- **Mass Assignment**: Define `$fillable` and use `$request->validated()`.
- **Performance**: Use `chunk()`, `lazy()`, or `cursor()` for large tasks.
- **Casting**: Use `$casts` for dates, JSON, and custom types.

## Anti-Patterns

- **N+1 Queries**: **No lazy loading**: Never query relationships in loops.
- **Fat Models**: **No business logic**: Models are for data access only.
- **Magic Queries**: **No raw SQL**: Use Query Builder or Eloquent.
- **Select \***: **No excessive data**: Select only required columns.

## References

- [Eloquent Performance Guide](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
