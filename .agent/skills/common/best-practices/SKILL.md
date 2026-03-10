---
name: Global Best Practices
description: Universal principles for clean, maintainable, and robust code across all environments. Activates on any code file when SOLID, DRY, KISS violations are detected.
metadata:
  labels: [best-practices, solid, clean-code, architecture]
  triggers:
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.py', '**/*.java', '**/*.go']
    keywords: [solid, kiss, dry, yagni, naming, conventions, refactor, clean code, god class, magic number]
    negative: ["user asks for framework-specific patterns — use framework skill instead"]
---

# Global Best Practices

## **Priority: P0 (FOUNDATIONAL)**

**This skill does NOT**: replace framework-specific skills — use `typescript/best-practices`, `javascript/best-practices`, or specific framework skills for language-level conventions.

**Compatible skills**: `quality-assurance` (enforcement), `code-review` (application), `system-design` (architecture level), `tdd` (test-first).

## 🏗 SOLID Principles

- **SRP**: One class/function = one reason to change. Separate business logic from delivery layer.
- **OCP**: Extend via composition/interfaces. Never modify closed source.
- **LSP**: Subtypes transparent replacements for base types. No behavior surprises.
- **ISP**: Granular interfaces over fat general-purpose ones.
- **DIP**: Depend on abstractions. Inject dependencies via constructor.

## 🧹 KISS/DRY/YAGNI

- **KISS**: Readable simple logic over clever one-liners.
- **DRY**: Abstract repeated logic to utilities. No magic strings/numbers — use named constants.
- **YAGNI**: Implement only current requirements. No "just in case" abstractions.
- **Naming**: Intent-revealing names. `isUserAuthenticated` > `checkUser`. Language conventions apply.

## 🛡 Security & Performance Foundations

- **Sanitize**: Validate all external input (API, User, Env). Prevent injection/XSS.
- **Early Return**: Guard clauses first. Minimize nesting depth.
- **Lazy Loading**: Defer heavy initialization until needed.
- **Resource Cleanup**: Close streams, file handles, DB connections. Always.

## 🧱 Error Handling

- **Custom Exceptions**: Typed errors over generic `Error`. Name them semantically.
- **Graceful Degradation**: Fallback values for non-critical failures.
- **Log Context**: Log with ID, state, and actionable metadata. No silent failures.

> **Fallback**: If no structured logger available, `console.error({ context, error })` as minimum.

## 🚫 Anti-Patterns

**`No Magic Numbers`**: Extract to named constants. `const MAX_RETRIES = 3`, not `if (count > 3)`.

**`No Deep Nesting`**: Use guard clauses and early returns. Max 3 levels.

**`No Global State`**: Use dependency injection or state management patterns.

**`No Empty Catch`**: Always handle, log, or rethrow. Never silent `catch {}`.

**`No God Class`**: >3 responsibilities → split into focused modules.

## ✅ Verification Checklist

- [ ] No magic numbers or strings — all extracted to named constants
- [ ] No nesting deeper than 3 levels
- [ ] All errors caught are handled (log or rethrow)
- [ ] No class with >3 distinct responsibilities
- [ ] Dependencies injected, not hardcoded

## 📚 References

- [Code Structure & Modular Design Examples](references/CODE_STRUCTURE.md)
- [Skill Token Economy & Effectiveness](references/EFFECTIVENESS.md)
