---
name: TypeScript Tooling
description: Development tools, linting, and build configuration for TypeScript projects.
metadata:
  labels: [tooling, typescript, eslint, prettier, testing]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['tsconfig.json', '.eslintrc.*', 'jest.config.*', 'package.json']
    keywords: [eslint, prettier, jest, vitest, build, compile, lint]
workflow_ref: battle-test
---

# TypeScript Tooling

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

Essential tooling for TypeScript development and maintenance.

## Implementation Guidelines

- **Compiler**: `tsc` for CI. `ts-node`/`esbuild` for dev.
- **Lint**: ESLint + `@typescript-eslint`. Strict type checking.
- **Format**: Prettier (on save + commit).
- **Test**: Jest/Vitest > 80% coverage.
- **Build**: `tsup` (libs), Vite/Webpack (apps).
- **Check**: `tsc --noEmit` in CI.

## Anti-Patterns

- **No Disable**: Avoid `// eslint-disable`.
- **No Skip**: Avoid `skipLibCheck: true` if possible.
- **No Ignore**: Use `@ts-expect-error` > `@ts-ignore`.

## ESLint Configuration

### Strict Mode Requirement

**CRITICAL**: Every file in the project, including tests (`.spec.ts`), must adhere to strict type-checked rules. NEVER turn off `@typescript-eslint/no-explicit-any` or `no-unsafe-*` rules.

### Common Linting Issues & Solutions

#### Request Object Typing

**Problem**: Using `any` for Express request objects or creating duplicate inline interfaces.
**Solution**: Use the centralized interfaces in `src/common/interfaces/request.interface.ts`.

```typescript
import { RequestWithUser } from 'src/common/interfaces/request.interface';
```

## References

- [Examples (Input/Output)](references/examples.md)
