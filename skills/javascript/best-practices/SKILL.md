---
name: JavaScript Best Practices
description: Idiomatic JavaScript patterns and conventions for maintainable code.
metadata:
  labels: [javascript, best-practices, conventions, code-quality]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.js', '**/*.mjs']
    keywords: [module, import, export, error, validation]
workflow_ref: ui-ux-pro-max
---

# JavaScript Best Practices

## **Priority: P1 (OPERATIONAL)**

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

Conventions and patterns for writing maintainable JavaScript.

## Implementation Guidelines

- **Naming**: `camelCase` (vars/funcs), `PascalCase` (classes), `UPPER_SNAKE` (constants).
- **Errors**: Throw `Error` objects only. Handle all async errors.
- **Comments**: JSDoc for APIs. Explain "why" not "what".
- **Files**: One entity per file. `index.js` for exports.
- **Modules**: Named exports only. Order: Ext -> Int -> Rel.

## Anti-Patterns

- **No Globals**: Encapsulate state.
- **No Magic Numbers**: Use `const`.
- **No Nesting**: Guard clauses/early returns.
- **No Defaults**: Use named exports.
- **No Side Effects**: Keep functions pure.

## Code

```javascript
// Constants
const STATUS = { OK: 200, ERROR: 500 };

// Errors
class APIError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}

// Async + JDoc
/** @throws {APIError} */
export async function getData(id) {
  if (!id) throw new APIError('Missing ID', 400);
  const res = await fetch(`/api/${id}`);
  if (!res.ok) throw new APIError('Failed', res.status);
  return res.json();
}
```

## Reference & Examples

For module patterns and project structure:
See [references/REFERENCE.md](references/REFERENCE.md).

## Related Topics

language | tooling


## References

- [Examples (Input/Output)](references/examples.md)
