---
name: TypeScript Language Patterns
description: Modern TypeScript type system patterns for type safety, performance, and maintainability. Activates on TS/TSX files and tsconfig when working with types, generics, or advanced patterns.
metadata:
  labels: [typescript, language, types, generics, type-system]
  triggers:
    files: ['**/*.ts', '**/*.tsx', 'tsconfig.json']
    keywords: [type, interface, generic, enum, union, intersection, readonly, const, namespace, branded, utility type, discriminated union, mapped type, conditional type]
    negative: ["user asks for naming and code conventions — use typescript/best-practices", "user asks for tooling config — use typescript/tooling"]
---

# TypeScript Language Patterns

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: enforce naming conventions — use `typescript/best-practices`. Build and lint config belongs to `typescript/tooling`.

**Compatible skills**: `typescript/best-practices` (conventions), `typescript/security` (validation), `typescript/tooling` (compiler config).

## Implementation Guidelines

- **Annotations**: Explicit params/returns on public APIs. Infer locals from assignment.
- **Interface vs Type**: `interface` for object shapes / APIs (mergeable). `type` for unions, intersections, aliases.
- **Strict Mode**: `"strict": true` in tsconfig. Always. Use `?.` and `??` for null safety.
- **Enums**: Prefer `const` object + `as const` over runtime `enum` (no runtime cost).
- **Generics**: Constrain with `extends`. Use descriptive names (`TData`, `TError`, not `T`, `U`).
- **Utility Types**: `Partial`, `Pick`, `Omit`, `Record`, `Readonly` — use before writing custom.
- **Immutability**: `readonly` arrays/objects. `satisfies` for validation without widening.

> **Fallback**: If strict mode creates too many errors in existing codebase, enable incrementally per file with `// @ts-strict` directive.

## Code Reference

```typescript
// Branded Type
type UserId = string & { __brand: 'UserId' };

// Discriminated Union
type Result<T> = { kind: 'ok'; data: T } | { kind: 'err'; error: Error };

// Const Enum Alternative
const Direction = { Up: 'up', Down: 'down' } as const;
type Direction = typeof Direction[keyof typeof Direction];
```

> For advanced mapped/conditional type patterns: `view_file .agent/skills/typescript/language/references/REFERENCE.md`

## 🚫 Anti-Patterns

**`No any`**: Use `unknown`. Narrow with `typeof`/`instanceof`/type guards.

**`No runtime enum`**: Adds bundle weight and complicates tree-shaking. Use `as const` objects.

**`No Function type`**: Use explicit signatures `() => void` instead of the `Function` type.

**`No Non-null assertion !`**: Use proper null narrowing. `!` suppresses instead of fixing.

**`No Implicit any`**: Enable `noImplicitAny`. If needed temporarily, comment with ticket reference.

## ✅ Verification Checklist

- [ ] `"strict": true` in tsconfig.json
- [ ] No `enum` — using `as const` objects instead
- [ ] No `any` types in production code
- [ ] Generic type parameters are descriptively named
- [ ] `Readonly<>` or `readonly` used for data that should not be mutated

## 📚 References

- [Advanced Type Patterns & Utility Types](references/REFERENCE.md)
