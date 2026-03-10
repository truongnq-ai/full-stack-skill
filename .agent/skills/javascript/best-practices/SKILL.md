---
name: JavaScript Best Practices
description: Idiomatic JavaScript patterns and conventions for maintainable code. Activates on JS files to enforce naming, error handling, module patterns, and code structure.
metadata:
  labels: [javascript, best-practices, conventions, code-quality]
  triggers:
    files: ['**/*.js', '**/*.mjs']
    keywords: [module, import, export, error, validation, naming, async, callback, promise]
    negative: ["user asks for TypeScript-specific patterns — use typescript/best-practices", "user asks for test config — use javascript/tooling"]
---

# JavaScript Best Practices

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: cover TypeScript-specific patterns — use `typescript/best-practices` for typed code. Test tooling configuration belongs to `javascript/tooling`.

**Compatible skills**: `javascript/language` (syntax patterns), `javascript/tooling` (tooling config), `best-practices` (global principles), `debugging` (error investigation).

## Implementation Guidelines

- **Naming**: `camelCase` (vars/funcs), `PascalCase` (classes/constructors), `UPPER_SNAKE` (constants).
- **Errors**: Throw `Error` objects only — never throw strings. Handle all async errors with `try/catch`.
- **Comments**: JSDoc for public APIs. Explain "why", not "what".
- **Files**: One entity per file. `index.js` for barrel exports.
- **Modules**: Named exports only. Import order: external → internal → relative.

> **Fallback**: If ESLint not configured, manually apply the naming conventions and error handling patterns from `references/REFERENCE.md`.

## 🚫 Anti-Patterns

**`No Globals`**: Encapsulate all state. Never mutate `window` or global scope.

**`No Magic Numbers`**: Extract to named `const`. `const MAX_RETRIES = 3`, never `if (count > 3)`.

**`No Deep Nesting`**: Use guard clauses and early returns. Max 3 levels of nesting.

**`No Default Exports`**: Use named exports for tree-shaking and discoverability.

**`No Side Effects in Modules`**: Keep module-level code pure. No immediate execution on import.

## ✅ Verification Checklist

- [ ] All public APIs have JSDoc comments
- [ ] No `var` declarations (only `const`/`let`)
- [ ] All async functions have `try/catch` error handling
- [ ] Named exports used (no default exports)
- [ ] No magic numbers — all extracted to named constants

## 📚 References

- [Module Patterns & Project Structure](references/REFERENCE.md)
