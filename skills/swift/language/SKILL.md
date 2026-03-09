---
name: Swift Language
description: Standards for Optionals, Protocols, Extensions, and Type Safety
metadata:
  labels: [swift, language, optionals, protocols]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.swift']
    keywords: ['protocol', 'extension', 'optional', 'guard', 'enum']
workflow_ref: smart-release
---

# Swift Language Standards

## **Priority: P0**

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

## Implementation Guidelines

### Optionals & Safety

- **Never Force Unwrap**: Use `guard let`, `if let`, or nil coalescing (`??`).
- **Nil Comparison**: Use `value != nil` instead of `if let _ = value`.
- **Implicitly Unwrapped**: Avoid `Type!`. Use proper `Type?`.

### Protocols & Extensions

- **Protocol Composition**: Prefer `struct` + protocols over class inheritance.
- **Extensions**: Use for conformance (`extension MyType: Codable`), not storage.
- **Protocol Witnesses**: Explicitly implement all required members.

### Type Safety

- **Avoid `Any`**: Use generics or associated types instead.
- **Enums**: Prefer enums with associated values over multiple Optionals.
- **Value Types**: Default to `struct` unless reference semantics needed.

## Anti-Patterns

- **Force Unwrapping**: `**No ! operator**: Use safe unwrapping.`
- **Sentinel Values**: `**No -1 for failure**: Use Optional.`
- **as! Casting**: `**No Force Cast**: Use conditional cast (as?).`

## References

- [Optionals & Protocols](references/implementation.md)
- [Examples (Input/Output)](references/examples.md)
