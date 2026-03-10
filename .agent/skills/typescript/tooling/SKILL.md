---
name: TypeScript Tooling
description: Development tools, linting, testing, and build configuration for TypeScript projects. Activates on tsconfig, ESLint, Jest, and package.json files.
metadata:
  labels: [tooling, typescript, eslint, prettier, testing, build, tsconfig]
  triggers:
    files: ['tsconfig.json', 'tsconfig.*.json', '.eslintrc.*', 'jest.config.*', 'package.json', 'tsup.config.*']
    keywords: [eslint, prettier, jest, vitest, build, compile, lint, tsc, tsup, esbuild, coverage, ts-node]
    negative: ["user asks for TypeScript language syntax — use typescript/language", "user asks for JavaScript tooling — use javascript/tooling"]
---

# TypeScript Tooling

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: cover TypeScript type syntax — use `typescript/language` for that. JavaScript-specific tooling belongs to `javascript/tooling`.

**Compatible skills**: `typescript/language` (type system), `typescript/best-practices` (conventions enforced by tools), `quality-assurance` (coverage gates).

## Implementation Guidelines

- **Compiler**: `tsc --noEmit` in CI for type checking. `ts-node` / `esbuild` for dev server.
- **Lint**: `@typescript-eslint/recommended` + Prettier plugin. Fail CI on any lint error.
- **Format**: Prettier on save + pre-commit hook. Rules match `.prettierrc`.
- **Test**: Jest/Vitest ≥80% coverage. Run `tsc --noEmit` before test suite in CI.
- **Build**: `tsup` for libraries. Vite for web apps. Always verify bundle output.
- **Type Check**: `tsc --noEmit` is separate from `jest`. Both must pass.

> **Fallback**: If `@typescript-eslint` not installed, run `npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser` first.

## Configuration Reference

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

> For testing configuration and CI/CD setup: `view_file .agent/skills/typescript/tooling/references/REFERENCE.md`

## 🚫 Anti-Patterns

**`No eslint-disable`**: Document reason if suppression is unavoidable. Never blanket disable.

**`No skipLibCheck: true`**: Investigate instead. If necessary, scope to specific packages.

**`No @ts-ignore`**: Use `@ts-expect-error` (fails if type error disappears). Documents intent.

**`No Coverage Drop`**: Coverage threshold in config is a floor. PRs reducing coverage are rejected.

**`No Separate Type/Lint Checks`**: Both `tsc --noEmit` and `eslint` must run in CI. Never skip either.

## ✅ Verification Checklist

- [ ] `tsc --noEmit` passes with zero errors
- [ ] ESLint passes with `@typescript-eslint` rules
- [ ] Test coverage ≥80% (or configured threshold)
- [ ] `noUnusedLocals` + `noUnusedParameters` enabled in tsconfig
- [ ] Pre-commit hook runs type-check + lint + test

## 📚 References

- [Testing Configuration & CI/CD Setup](references/REFERENCE.md)
