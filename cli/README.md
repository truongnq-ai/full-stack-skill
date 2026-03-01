# @truongnq-ai/full-stack-skill

[![NPM Version](https://img.shields.io/npm/v/@truongnq-ai/full-stack-skill.svg?style=flat-square)](https://www.npmjs.com/package/@truongnq-ai/full-stack-skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/truongnq-ai/full-stack-skill/blob/master/LICENSE)

> A CLI to manage and sync full-stack AI agent skills for **Cursor, Claude Code, GitHub Copilot, Gemini, Antigravity, Windsurf, Roo Code, OpenCode, Kiro**, and more.

## Quick Start

```bash
# One-line setup (no install required)
npx @truongnq-ai/full-stack-skill@latest init
npx @truongnq-ai/full-stack-skill@latest sync
```

## Installation

```bash
# Global install
npm install -g @truongnq-ai/full-stack-skill

# Or use via npx (recommended)
npx @truongnq-ai/full-stack-skill@latest sync
```

## Commands

| Command                        | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `full-stack-skill init`        | Interactive wizard — detects your framework, selects AI agents, creates `.skillsrc` |
| `full-stack-skill sync`        | Fetches skills from registry, writes to agent directories, generates `AGENTS.md`    |
| `full-stack-skill list-skills` | Lists available skills by framework with detection status                           |
| `full-stack-skill validate`    | Validates skill format and token efficiency standards                               |
| `full-stack-skill feedback`    | Report skill improvements or AI agent mistakes                                      |
| `full-stack-skill upgrade`     | Self-upgrade to the latest CLI version                                              |

**Shorthand**: Use `fss` instead of `full-stack-skill` for all commands.

## How It Works

```
Registry (GitHub) → CLI (sync) → Your Project (.agent/skills/)
                                → AGENTS.md (auto-generated index for AI agents)
```

1. **`init`** detects your framework (NestJS, React, Flutter, etc.) and creates `.skillsrc`
2. **`sync`** downloads matching skills from the [registry](https://github.com/truongnq-ai/full-stack-skill) and writes them to your AI agent directories
3. AI agents read skills from their respective paths (`.cursor/skills/`, `.agent/skills/`, `.github/skills/`, etc.)

## Supported Frameworks

Flutter, NestJS, Next.js, React, React Native, Angular, Golang, Spring Boot, Android, iOS, Laravel, and more.

## Supported AI Agents

Cursor, Claude Code, GitHub Copilot, Antigravity, Windsurf, Gemini, Roo Code, OpenCode, OpenAI Codex, Trae, Kiro.

## Links

- **Registry**: [GitHub Repository](https://github.com/truongnq-ai/full-stack-skill)
- **CLI Architecture**: [ARCHITECTURE.md](./cli/ARCHITECTURE.md)
- **Issues**: [Report a bug](https://github.com/truongnq-ai/full-stack-skill/issues)

## License

MIT © Truong Nguyen
