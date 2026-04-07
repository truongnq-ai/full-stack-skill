# Changelog

All notable changes to this project will be documented in this file.

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
