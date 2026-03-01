# Changelog

All notable changes to this project will be documented in this file.

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
