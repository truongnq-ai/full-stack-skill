---
description: Prevent agent from installing new dependencies without explicit user confirmation. Protects bundle size, security posture, and lockfile integrity.
globs: ["package.json", "**/package.json", "pubspec.yaml", "go.mod", "Cargo.toml", "requirements*.txt"]
alwaysApply: true
---

# 📦 Dependency Rule

**Priority**: HIGH — applies before any package installation or manifest modification.
**Conflict resolution**: Works alongside `file-safety-rule` (which protects lockfiles). Both apply when modifying `package.json`. file-safety checks run first.
**Risk addressed**: Agent silently installs new packages, increasing bundle size, introducing security vulnerabilities, or breaking peer dependency constraints — without user awareness.

---

## Core Rules

**No silent installs**: NEVER run `npm install <pkg>`, `pnpm add <pkg>`, `yarn add <pkg>`, `go get <pkg>`, or `pip install <pkg>` without first asking the user.

**Required pre-install confirmation**:
```
"I need to add [package-name] v[version] to implement [feature].
- Purpose: [one-line justification]
- Bundle impact: ~[size] (check via bundlephobia.com)
- License: [MIT/Apache/etc]
- Weekly downloads: [signal of community health]

Approve? (Y / N — use alternative approach)"
```

**Always prefer existing dependencies**: Before proposing a new package, check what's already installed:
```bash
cat package.json | grep -E '"dependencies"|"devDependencies"' -A 50 | head -60
```
If existing library can solve the problem (even partially), use it.

**No major version bumps without confirmation**: Upgrading a dependency by a major version (e.g., `v4 → v5`) is a breaking change. Treat it the same as adding a new dependency — ask first.

**No dev-as-production confusion**: Packages only needed at build time or for testing MUST be installed as `devDependencies` (`--save-dev` / `-D`). Never add ESLint, Jest, or TypeScript types to `dependencies`.

**No lockfile regeneration without approval**: After updating `package.json`, do NOT auto-run `pnpm install` / `npm install` to regenerate the lockfile without telling the user. This overwrites the lockfile and can silently upgrade other packages.

---

## Alternatives to New Dependencies

Before adding a package, suggest these alternatives:

| Situation | Alternative |
|-----------|-------------|
| Date formatting | Use `Intl.DateTimeFormat` (native) |
| HTTP requests | Use native `fetch` (Node 18+) |
| UUID generation | Use `crypto.randomUUID()` (native) |
| Deep clone | Use `structuredClone()` (native) |
| Validation | Check if `zod`, `class-validator` already installed |

---

## Scope Exceptions

Rule does NOT apply when: (1) user explicitly says `"install X"` or `"add X as a dependency"` — this is direct instruction, no confirmation needed, (2) running `pnpm install` with NO new packages (just restoring from lockfile), (3) installing in a fresh project that has no `package.json` yet.

---

## Enforceability

Before any install command, confirm:
- [ ] Checked existing `package.json` for alternatives
- [ ] User confirmed the new package is needed
- [ ] Correct target (`dependencies` vs `devDependencies`) identified
- [ ] No major version bump without explicit approval

**Pass**: `git diff package.json` shows only the approved package added at correct section.
**Fail**: Unapproved package appears in diff → revert with `git checkout HEAD -- package.json && pnpm install`.
