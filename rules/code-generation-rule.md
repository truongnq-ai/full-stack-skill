---
description: Enforce production-grade code quality standards when generating or modifying source code. Prevents hardcoded secrets, unsafe types, missing error handling, and debug artifacts.
globs: ["src/**/*", "lib/**/*", "app/**/*", "packages/**/*"]
alwaysApply: false
---

# 🧱 Code Generation Rule

**Priority**: HIGH — applies when generating or modifying any source code file.
**Activation**: `alwaysApply: false` — auto-triggered by `globs` match on `src/`, `lib/`, `app/`, `packages/` files. Can also be manually activated by user request.
**Conflict resolution**: This rule is subordinate to `file-safety-rule` (file-safety checks run first). Both can apply simultaneously.
**Risk addressed**: Agent generates code with hardcoded secrets, `any` types, unhandled promises, magic numbers, or debug artifacts that slip into production.

---

## Core Rules

**No hardcoded secrets**: NEVER write API keys, passwords, tokens, or connection strings directly in code. Always use `process.env.VAR_NAME` (Node.js), environment config, or a secrets manager. If value is needed for a demo, use `process.env.VAR_NAME || "YOUR_VALUE_HERE"`.

**No untyped code (TypeScript)**: NEVER use `any` as a type unless unavoidable. If `any` is necessary, add an inline comment: `// eslint-disable-next-line @typescript-eslint/no-explicit-any — reason: [...]`. Prefer `unknown` + type guard over `any`.

**No unhandled async**: Every `async/await` call MUST be wrapped in `try/catch` or use `.catch()`. NEVER fire-and-forget a Promise without error handling. Floating promises are silent runtime failures.

**No magic numbers**: Numeric literals (except `0`, `1`, `-1`) used in logic MUST be extracted to a named constant or config value. Example: `const MAX_RETRY = 3` not `if (retry > 3)`.

**No console.log in production code**: Use the project's logger service (`logger.info()`, `this.logger.debug()`, etc.).
- **To identify logger**: run `grep -r "logger" src/ | head -5` to find the established pattern.
- **Fallback**: If no logger exists in the project, use `console.error()` for errors only and ADD a `// TODO: replace with logger` comment.
- Remove all debug `console.log` before committing.

**No empty catch blocks**: `catch (e) {}` silently swallows errors. ALWAYS at minimum: `catch (e) { logger.error(e); throw e; }` or rethrow with context.

---

## Positive Patterns

| Concern | Forbidden | Required |
|---------|-----------|---------|
| Secrets | `const key = "sk-abc123"` | `process.env.OPENAI_KEY` |
| Types | `function foo(x: any)` | `function foo(x: InputDto)` |
| Async | `fetchData()` (no await, no catch) | `await fetchData().catch(handleError)` |
| Numbers | `if (score > 75)` | `if (score > PASS_THRESHOLD)` |
| Logging | `console.log("result:", data)` | `logger.debug("result", { data })` |
| Errors | `catch (e) {}` | `catch (e) { logger.error(e); throw e; }` |

---

## Scope Exceptions

Rule does NOT apply when: (1) writing to `*.spec.ts` / `*.test.ts` test files (console.log acceptable in tests), (2) writing to `scripts/` or `tools/` one-off utilities with explicit user approval, (3) user explicitly says `"skip code quality check for this"`.

---

## Enforceability Verification

After generating code, self-check before completing:

```bash
# Detect secrets in generated files
grep -rn "password\|apiKey\|token\s*=" <generated_file>

# Detect any type usage
grep -n ": any" <generated_file>

# Detect unhandled async
grep -n "await " <generated_file> | grep -v "try\|catch\|\.catch"

# Detect console.log
grep -n "console\.log" <generated_file>
```

**Pass**: All checks return 0 results.
**Fail**: Any pattern found → fix before completing the task.
