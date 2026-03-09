---
name: TypeScript Language Patterns
description: Modern TypeScript standards for type safety, performance, and maintainability.
metadata:
  labels: [typescript, language, types, generics]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.ts', '**/*.tsx', 'tsconfig.json']
    keywords:
      [
        type,
        interface,
        generic,
        enum,
        union,
        intersection,
        readonly,
        const,
        namespace,
      ]
workflow_ref: deep-security-audit
---

# TypeScript Language Patterns

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

- **Type Annotations**: Explicit params/returns. Infer locals.
- **Interfaces vs Types**: `interface` for APIs. `type` for unions.
- **Strict Mode**: `strict: true`. Null Safety: `?.` and `??`.
- **Enums**: Literal unions or `as const`. **No runtime `enum`**.
- **Generics**: Reusable, type-safe code.
- **Type Guards**: `typeof`, `instanceof`, predicates.
- **Utility Types**: `Partial`, `Pick`, `Omit`, `Record`.
- **Immutability**: `readonly` arrays/objects. Const Assertions: `as const`, `satisfies`.
- **Template Literals**: `on${Capitalize<string>}`.
- **Discriminated Unions**: Literal `kind` property.
- **Advanced**: Mapped, Conditional, Indexed types.
- **Access**: Default `public`. Use `private`/`protected` or `#private`.
- **Branded Types**: `string & { __brand: 'Id' }`.

## Anti-Patterns

- **No `any`**: NEVER use `any`. Use `unknown` or specific interfaces.
- **No `Function`**: Use signature `() => void`.
- **No `enum`**: Runtime cost.
- **No `!`**: Use narrowing.
- **NO LINT DISABLE**: PROHIBITED. Fix issues properly.

## Testing

- **Mocking**: Use `jest.Mocked<T>` or `as unknown as T`.
- **Checklist**: Check method existence, match error constants, satisfy required properties.
- **References**: See [references/TESTING.md](references/TESTING.md) for common issues/solutions.

## Code

```typescript
## References
- [Examples (Input/Output)](references/examples.md)
- [Notes](references/notes.md)

