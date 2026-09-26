# Changelog

All notable changes to this project will be documented in this file.

## 2026.09.27 — Feature: Incremental Sync & GitHub API Rate Limit Protection

### Added
- **Incremental Sync Engine (`cli/src/services/SyncCacheService.ts`)**:
  - SHA-based change detection via disk cache (`~/.cache/fss/sync-manifest.json`) using atomic write (`.tmp` + rename).
  - Skips redundant file downloads if category tree SHA matches previous successful sync.
  - Granular diffing: only downloads added/modified files when a branch or tag is updated, dramatically reducing API and bandwidth usage.
  - Workspace-scoped cache keys preventing cross-project state leakage.
- **GitHub API Rate Limit Protection & In-Memory Tree Cache**:
  - `GithubService` now caches tree metadata in-memory per session, deduplicating calls across skill categories.
  - Structured `RateLimitError` detection reading `403`/`429` status codes and `x-ratelimit-reset` headers, providing friendly guidance on using `GITHUB_TOKEN`.
- **CLI Flags**:
  - Added `--force-refresh` flag to `sync` command to allow bypassing local cache and forcing a complete re-download.

### Changed
- **Sync Command**:
  - Intercepts `RateLimitError` with actionable troubleshooting steps.
  - Warm sync performance improved by ~90% when skills are already up to date.

---

## 2026.09.26 — Feature: Prompt Compiler (/gen-prompt) & Ops Workflows

### Added
- **Prompt Compiler (`common/gen-prompt`)**: Standardizes raw prompts into canonical 6-part execution contracts bound to specific skills.
  - Added 6-block template (`skills/common/gen-prompt/references/prompt-template.md`).
  - Added 2-level task taxonomy (`skills/common/gen-prompt/references/task-taxonomy.md`) covering 6 Domains and 42 Capability Clusters + GEN-00 Fallback.
  - Added primary workflow `/gen-prompt` (`workflows/gen-prompt.md`) with 7-step SOP.
- **DevOps Backup & Migration Strategy (`roles/devops/backup-migration-strategy`)**:
  - Skill and examples for DB dumps (Postgres, MySQL, Mongo), data integrity checksums, and cloud sync (`skills/roles/devops/backup-migration-strategy/`).
  - Workflow `/software-devops-backup-and-migrate` (`workflows/software-devops-backup-and-migrate.md`).
- **Git Workflow & Branching (`/software-dev-git-workflow`)**: Conventional Commits, PR lifecycle, conflict resolution, worktrees, and release tagging (`workflows/software-dev-git-workflow.md`).
- **DevOps OS Administration (`/software-devops-os-admin`)**: Windows PowerShell/WSL2 and Linux systemd/cron/resource operations (`workflows/software-devops-os-admin.md`).

### Changed
- **Hardened Prompt Compiler (`common/gen-prompt` v1.6.1)**:
  - Added `<HARD-GATE>` to enforce OUTPUT-ONLY contract, preventing premature task execution.
  - Added Mutation Gate in prompt template, requiring explicit implementation plan before mutations.
  - Bumped `common` skill category to `v1.6.1`.
- **Overhaul 4 Core Workflows**: Upgraded from shell stubs to complete production SOPs:
  - `/software-qa-advanced-testing`: Load/stress testing (k6, autocannon) & security probing (OWASP ZAP).
  - `/software-writer-api-docs`: OpenAPI 3.0 / Swagger spec generation and contract verification.
  - `/software-writer-infra-docs`: ADR templates, deployment runbooks, and C4 Mermaid diagrams.
  - `/software-writer-user-manuals`: End-user guides, tutorials, and FAQ standards.
- **CLI Engine**:
  - `cli/src/index.ts`: Dynamically imports version from `package.json` instead of hardcoded string.
  - `cli/src/services/validation/rules.ts`: Normalizes CRLF line endings (`\r\n` -> `\n`) for Windows compatibility in frontmatter validation.

---

## 2026.09.12 — Feature: Parallel Agents & Planning Hardening

### Added
- **Bulk Bug Fixing Workflow (`/software-dev-fix-bulk`)**: Orchestrates parallel subagents for independent bugfixes without state collision.
- **Parallel Agent Dispatching (`common/dispatching-parallel-agents`)**: Standards for spawning and supervising isolated subagents.
- **Technical Implementation Planning (`/software-dev-plan-implementation`)**: Structured impact analysis and pre-coding TDD task planning.
- **Impact Analysis (`common/impact-analysis`)**: Risk assessment and blast radius evaluation.
- **Interactive Questioning & Plan Review**: Added `/question` (`common/questioning`) and `/review-plan` (`common/review-plan`) workflows and skills.

### Changed
- `common/coding-discipline`: Hardened 7-step discipline FSM with mandatory pre-execution checkpoints.
- `workflows/software-ba-gather-requirements`: Integrated structured interview and scenario decomposition.

---

## 2026.04.07 — Feature: Superpowers Skill Integration

### Added
- **Visual Companion** (`common/brainstorming`): Local Node.js server for visual mockups and side-by-side design comparisons in browser.
- **Workflow: `/visual-brainstorming`**: 8-step visual design session using Visual Companion.
- **Iron Law of Debugging** (`common/systematic-debugging`): Strict mandate for root cause investigation before any fix.
- **3-Fix Limit Escalation**: Automatic stop and architectural review requirement after 3 failed fix attempts.
- **No Placeholders Law** (`common/writing-plans`): Prohibited `TBD`/`TODO` in implementation plans; enforced bite-sized TDD task format.
- **Improved Brainstorming**: "One-question-at-a-time" rule with multiple-choice preference.

### Changed
- `common` skills upgraded to v1.6.0.
- `software-dev-fix-bug` workflow: Integrated Iron Law and 3-fix limit.
- `software-po-plan-feature` workflow: Mandated `writing-plans` and TDD bite-sized tasks.


## 2026.03.10.1 — Hotfix: Workflow Sync Strategy

### Fixed

- **Workflow sync now initializes ALL available workflows on first `init`** (previously only 4 hardcoded defaults)
- **Subsequent `sync` runs auto-add ALL newly added workflows** from the registry (previously filtered by `DEFAULT_WORKFLOWS` whitelist)
- Removed `DEFAULT_WORKFLOWS` constant — no longer needed with the all-inclusive strategy

### Changed

- `SyncService.reconcileWorkflows`: First-time init sets `config.workflows` to full list of available workflows from registry
- `SyncService.reconcileWorkflows`: Reconcile mode now auto-adds every new workflow discovered in registry, not just whitelisted ones

---

## 2026.03.01 — Initial Release


### Added

- Full TypeScript CLI adopted from agent-skills-standard architecture
- Commands: `init`, `sync`, `list-skills`, `validate`, `feedback`, `upgrade`
- 21 skill categories: Flutter, React, NestJS, Next.js, Angular, Golang, Spring Boot, Android, iOS, Laravel, TypeScript, JavaScript, Dart, Java, Kotlin, PHP, Swift, Common, Database, Quality Engineering, React Native
- 300+ individual skills across all categories
- Auto-detection of frameworks via `package.json`, `pubspec.yaml`, `go.mod`, etc.
- Support for 11 AI agents: Cursor, Claude Code, Copilot, Antigravity, Windsurf, Gemini, Roo Code, OpenCode, OpenAI Codex, Trae, Kiro
- `AGENTS.md` auto-generation for AI agent context bridging
- `.skillsrc` configuration with YAML format
- Token economy validation (< 500 tokens per skill)

### Identity

- Package: `@truongnq-ai/full-stack-skill`
- Registry: `https://github.com/truongnq-ai/full-stack-skill`
- CLI binaries: `full-stack-skill`, `fss`
