---
name: TypeScript Best Practices
description: Idiomatic TypeScript patterns for clean, maintainable code. Activates on TS/TSX files to enforce naming conventions, module structure, access modifiers, and async patterns.
metadata:
  labels: [typescript, best-practices, idioms, conventions]
  triggers:
    files: ['**/*.ts', '**/*.tsx']
    keywords: [class, function, module, import, export, async, promise, naming, convention, access modifier]
    negative: ["user asks for type system syntax — use typescript/language", "user asks for tooling config — use typescript/tooling", "user asks for security — use typescript/security"]
---

# TypeScript Best Practices

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: cover type system syntax (generics, mapped types) — use `typescript/language`. Tooling (ESLint, tsconfig) belongs to `typescript/tooling`. Security patterns belong to `typescript/security`.

**Compatible skills**: `typescript/language` (types), `typescript/tooling` (config), `typescript/security` (security patterns), `best-practices` (global principles).

## Implementation Guidelines

- **Naming**: Classes/Types = `PascalCase`, vars/funcs = `camelCase`, consts = `UPPER_SNAKE`. Prefix `I` for interfaces only if a naming collision exists.
- **Functions**: Arrows for callbacks; named declarations for exports. Always type public API return values.
- **Modules**: Named exports only. Import order: external → internal → relative. Use `import type` for type-only imports.
- **Async**: `async/await` exclusively. `Promise.all()` for parallel. Never raw `.then()` chains.
- **Classes**: Explicit `public`/`private`/`protected`. Favor composition. `readonly` for immutable fields.
- **Optional**: Use `?:` notation over `| undefined`.

> **Fallback**: If return type inference is complex, explicitly annotate and add a comment explaining type choice.

## 🚫 Anti-Patterns

**`No Default Exports`**: Named exports only. Default exports disable rename refactoring.

**`No Implicit Returns`**: Always specify return types on public functions. Enable `noImplicitReturns`.

**`No any`**: Use `unknown` and narrow with type guards. `any` disables all type safety.

**`No require()`**: Use ES6 `import`. No CommonJS in TypeScript source.

**`No Empty Interfaces`**: Use `type` aliases or add at least one member.

## ✅ Verification Checklist

- [ ] All public function return types explicitly annotated
- [ ] `import type` used for type-only imports
- [ ] No `any` types — `unknown` used where dynamic type needed
- [ ] Named exports only (no default exports)
- [ ] All class members have explicit access modifiers

## 📚 References

- [TypeScript Code Examples](references/examples.md)
