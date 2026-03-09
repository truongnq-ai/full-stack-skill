---
name: PHP Best Practices
description: PHP best practices, PSR standards, and code quality guidelines.
metadata:
  labels: [php, psr, best-practices]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.php']
    keywords: [psr-12, camelCase, PascalCase, dry, solid]
workflow_ref: smart-release
---

# PHP Best Practices

## **Priority: P1 (HIGH)**

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
src/
├── {Domain}/             # e.g., Services, Repositories
└── Helpers/              # Pure functions/Traits
```

## Implementation Guidelines

- **PSR-12**: Follow PSR-12 for coding style (indent, braces, space).
- **Autoloading**: Use PSR-4 via Composer.
- **Namespacing**: Map namespaces to directory structure.
- **PascalCase**: Use for all class names.
- **camelCase**: Use for methods and variables.
- **SNAKE_CASE**: Use for class constants.
- **DRY Logic**: Extract repetitive logic into traits/methods.
- **SOLID**: Use interfaces for decoupling and SRP adherence.

## Anti-Patterns

- **God Classes**: **No Monoliths**: Avoid classes with multiple responsibilities.
- **Magic Numbers**: **No Hardcoding**: Use class constants for config values.
- **Deep Nesting**: **No Nesting**: Guard clauses over nested if/else.
- **Direct Output**: **No Echo**: Return data; let controller handle response.

## References

- [Clean Code Patterns](references/implementation.md)


## References

- [Examples (Input/Output)](references/examples.md)
