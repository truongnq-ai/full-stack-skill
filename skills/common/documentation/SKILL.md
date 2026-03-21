---
name: Documentation Standards
description: Essential rules for code comments, READMEs, and technical documentation. Activates when writing or reviewing inline docs, docstrings, README, ADRs, or API docs.
metadata:
  labels: [documentation, comments, docstrings, readme, adr, openapi]
  triggers:
    files: ['**/*.md', '**/README*', '**/docs/**', 'openapi.yaml', 'swagger.json']
    keywords: [comment, docstring, readme, documentation, jsdoc, adr, swagger, openapi]
    negative: ["user asks to write code logic", "user asks to debug — documentation is out of scope there"]
---

# Documentation Standards

## **Priority: P2 (MAINTENANCE)**

**This skill does NOT**: write feature code, design APIs, or generate test files — use `code-review` or `api-design` workflow for that.

**Compatible skills**: `code-review` (enforce doc quality in PRs), `update-docs` workflow, `system-design` (ADR context).

## 📝 Inline Comments

- **Why over What**: Comment non-obvious intent, not what the code does.
- **JSDoc/TSDoc**: Triple-slash all public functions: `@param`, `@returns`, `@throws`, `@example`.
- **No Stale**: Delete commented-out code. Retrieve from Git history if needed.
- **TODOs**: Format `TODO(username): description` with ownership. Never anonymous.

> `view_file` the target file before writing any JSDoc — avoid duplicating existing comments.

## 📖 README Essentials

Every README must have in order:
1. One-sentence mission statement
2. Prerequisites (exact runtime versions)
3. Install + Usage commands (copy-paste ready)
4. Known quirks and troubleshooting

> **Fallback**: If README exists but is outdated, run `update-docs` workflow before adding content.

## 🏛 Architectural Docs

- **ADRs**: Save to `docs/adr/YYYY-MM-DD-decision-title.md`. Document: Context, Decision, Consequences.
- **Diagrams**: Mermaid.js inside Markdown. Never binary image files for architecture.
- **API Docs**: Swagger/OpenAPI for REST. Contract-first: define interface before implementation.

> **Fallback**: If `docs/adr/` doesn't exist, create it. If Mermaid not supported, use ASCII art table.

## 🚫 Anti-Patterns

**`No What-Comments`**: Delete `// increment i` next to `i++`. Write only the "why".

**`No Stale Docs`**: Update docs in the same PR as the code change. Never separate tickets.

**`No Anonymous TODOs`**: Always format `TODO(username): description`. Unowned TODOs get deleted.

**`No Binary Diagrams`**: Avoid PNG/JPEG for architecture — use Mermaid for maintainability.

**`No Swagger-Last`**: Define OpenAPI contract before writing the endpoint handler.

## ✅ Verification Checklist

- [ ] All public functions have JSDoc with `@param`, `@returns`
- [ ] README has mission, prerequisites, install, usage, troubleshooting
- [ ] Every ADR saved to `docs/adr/` with date prefix
- [ ] No commented-out code remains
- [ ] No anonymous `TODO` without owner

## 📚 References

- [JSDoc/TSDoc Examples](references/docstring-examples.md)
