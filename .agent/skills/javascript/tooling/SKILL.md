---
name: JavaScript Tooling
description: Development tools, linting, testing, and build configuration for JavaScript projects. Activates on config files for ESLint, Jest, Prettier, Vite, and package.json.
metadata:
  labels: [tooling, javascript, eslint, prettier, testing, build]
  triggers:
    files: ['.eslintrc.*', 'jest.config.*', 'package.json', 'vite.config.*', 'rollup.config.*', '.prettierrc*']
    keywords: [eslint, prettier, jest, vitest, test, lint, build, coverage, bundle, tree-shake]
    negative: ["user asks for JavaScript language syntax — use javascript/language", "user asks for TypeScript tooling — use typescript/tooling"]
---

# JavaScript Tooling

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: cover language syntax — use `javascript/language` for that. TypeScript tooling configuration belongs to `typescript/tooling`.

**Compatible skills**: `javascript/language` (syntax), `javascript/best-practices` (conventions enforced by tools), `quality-assurance` (CI coverage gates).

## Implementation Guidelines

- **Linting**: ESLint with `eslint:recommended` + Prettier plugin. Fix violations on save.
- **Formatting**: Prettier. Run on save via editor + on commit via hook.
- **Testing**: Jest/Vitest. Co-locate test files. Minimum 80% line coverage.
- **Build**: Vite for apps. Rollup for libraries. Tree-shaking enabled by default.
- **Package Manager**: Lock versions with `package-lock.json` / `pnpm-lock.yaml`. Commit lock file.

> **Fallback**: If Prettier conflicts with ESLint rules, add `eslint-config-prettier` to disable formatting rules in ESLint.

## Configuration Reference

```javascript
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  rules: { 'no-console': 'warn', 'prefer-const': 'error' },
};
```

```json
// .prettierrc
{ "semi": true, "singleQuote": true, "printWidth": 80 }
```

> For Jest/Vitest config and CI/CD setup: `view_file .agent/skills/javascript/tooling/references/REFERENCE.md`

## 🚫 Anti-Patterns

**`No Formatting Disputes`**: Prettier settings are config — enforce via `.prettierrc`. Never debate formatting manually.

**`No Untested Code`**: Every new function needs a test (TDD or post-code). No exceptions for "simple" functions.

**`No Dirty Commits`**: Lint + format must pass before push. Use pre-commit hook (husky/lefthook).

**`No Unlocked Versions`**: Always commit lock file. Never `npm install` without updating lock file.

**`No Coverage Regression`**: Coverage threshold defined in config. PRs that lower coverage are rejected.

## ✅ Verification Checklist

- [ ] ESLint config present and passing with no errors
- [ ] Prettier config present and formatting enforced on save
- [ ] Jest/Vitest config has coverage threshold ≥80%
- [ ] Lock file committed and up-to-date
- [ ] Pre-commit hook runs lint + test

## 📚 References

- [Testing Patterns & CI/CD Setup](references/REFERENCE.md)
