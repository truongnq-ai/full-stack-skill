---
name: JavaScript Language Patterns
description: Modern JavaScript (ES2022+) syntax and language features for clean, maintainable code. Activates on JS files to enforce modern syntax usage.
metadata:
  labels: [javascript, language, es6, modern-js, es2022]
  triggers:
    files: ['**/*.js', '**/*.mjs', '**/*.cjs']
    keywords: [const, let, arrow, async, await, promise, destructuring, spread, class, optional chaining, nullish, template literal]
    negative: ["user asks for best practices conventions — use javascript/best-practices", "user asks for TypeScript — use typescript/ skills"]
---

# JavaScript Language Patterns

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: enforce project conventions and naming — use `javascript/best-practices` for that. TypeScript syntax patterns belong to `typescript/language`.

**Compatible skills**: `javascript/best-practices` (conventions), `javascript/tooling` (build/lint), `debugging` (runtime errors).

## Implementation Guidelines

- **Variables**: `const` by default. `let` only if reassigned. Never `var`.
- **Functions**: Arrow functions for callbacks. Named declarations for top-level exports.
- **Async**: `async/await` + `try/catch`. Never raw `.then()` chains.
- **Objects**: Destructuring, spread `...`, optional chain `?.`, nullish `??`.
- **Arrays**: `map`, `filter`, `reduce` over mutation. No `for` loops for transformation.
- **Strings**: Template literals `` `${}` `` over concatenation.
- **Modules**: ESM `import`/`export`. Export only what's necessary.
- **Classes**: Use `#private` fields for true encapsulation.

> **Fallback**: If ESM not supported in target env, use CommonJS `require`/`module.exports` with documented reason.

## Code Reference

```javascript
// Null-safe chaining
const name = user?.profile?.name ?? 'Guest';

// Async pattern
async function getUser(id) {
  try {
    const res = await fetch(`/api/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('getUser failed:', err);
    throw err;
  }
}
```

> For advanced patterns: `view_file .agent/skills/javascript/language/references/REFERENCE.md`

## 🚫 Anti-Patterns

**`No var`**: Block scope only. Use `const`/`let` exclusively.

**`No ==`**: Always strict equality `===`. No type coercion.

**`No .then() chains`**: Use `async/await`. Chains are harder to debug and error-handle.

**`No Mutation`**: Prefer immutable operations (`map`/`filter`/spread) over in-place mutation.

**`No new Object()`**: Use object literal `{}`. Same for `new Array()` → `[]`.

## ✅ Verification Checklist

- [ ] No `var` declarations in any file
- [ ] All Promises handled with `async/await` + `try/catch`
- [ ] Optional chaining used for nullable property access
- [ ] No `==` comparisons (only `===`)
- [ ] Array transformations use `map`/`filter`/`reduce`

## 📚 References

- [Advanced Patterns & Functional Programming](references/REFERENCE.md)
