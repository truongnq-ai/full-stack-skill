# full-stack-skill

[![NPM Version](https://img.shields.io/npm/v/@truongnq-ai/full-stack-skill.svg?style=flat-square)](https://www.npmjs.com/package/@truongnq-ai/full-stack-skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/truongnq-ai/full-stack-skill/blob/master/LICENSE)

> **Full-stack AI agent skills** — high-density coding instructions distributed to Cursor, Claude Code, Copilot, Antigravity, Windsurf, Gemini, Roo Code, OpenCode, Kiro, and more.

## 🚀 Quick Start

```bash
# One-line setup (no install required)
npx @truongnq-ai/full-stack-skill@latest init
npx @truongnq-ai/full-stack-skill@latest sync
```

## 📦 What Is This?

A **CLI + Skill Registry** that automatically distributes high-density coding standards to AI agents in your project. After running `sync`, your AI assistant knows:

- Your framework's architecture patterns
- Language-specific best practices
- Security standards, testing conventions
- Performance engineering guidelines

## 🛠 Installation

```bash
# Global install
npm install -g @truongnq-ai/full-stack-skill

# Or via npx (recommended)
npx @truongnq-ai/full-stack-skill@latest sync
```

## 📋 Commands

| Command                        | Description                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `full-stack-skill init`        | Interactive wizard — detects framework, selects AI agents, creates `.skillsrc` |
| `full-stack-skill sync`        | Fetches skills from registry → writes to agent dirs → generates `AGENTS.md`    |
| `full-stack-skill list-skills` | Lists available skills with detection status                                   |
| `full-stack-skill validate`    | Validates skill format and token efficiency                                    |
| `full-stack-skill feedback`    | Report skill improvements or AI mistakes                                       |
| `full-stack-skill upgrade`     | Self-upgrade CLI to latest version                                             |

Shorthand: `fss` works for all commands.

## 🏗 How It Works

```
Registry (GitHub)  ──→  CLI (sync)  ──→  Your Project
                                          ├── .agent/skills/
                                          ├── .cursor/skills/
                                          ├── .github/skills/
                                          └── AGENTS.md (auto-generated index)
```

1. **`init`** — detects your framework (NestJS, React, Flutter...) and creates `.skillsrc`
2. **`sync`** — downloads matching skills and writes to your AI agent directories
3. **AI agents** read skills from their paths and follow the instructions

## 📂 Skill Categories

| Category      | Skills                                                     | Frameworks |
| ------------- | ---------------------------------------------------------- | ---------- |
| **Frontend**  | React, Next.js, Angular, React Native                      | 54+ skills |
| **Backend**   | NestJS, Spring Boot, Golang, Laravel                       | 84+ skills |
| **Mobile**    | Flutter, Android, iOS (Swift)                              | 90+ skills |
| **Languages** | TypeScript, JavaScript, Dart, Java, Kotlin, PHP, Swift, Go | 50+ skills |
| **Common**    | Best practices, security, debugging, TDD, code review      | 18+ skills |
| **Database**  | PostgreSQL, query optimization                             | 3+ skills  |
| **QE**        | Jira/Zephyr automation, test generation                    | 4+ skills  |

## 🤖 Supported AI Agents

Cursor · Claude Code · GitHub Copilot · Antigravity · Windsurf · Gemini · Roo Code · OpenCode · OpenAI Codex · Trae · Kiro

## 📁 Repository Structure

```
full-stack-skill/
├── cli/               # TypeScript CLI source (published to npm)
│   ├── src/
│   │   ├── commands/  # init, sync, validate, upgrade, feedback
│   │   ├── services/  # SyncService, DetectionService, ConfigService
│   │   └── constants/ # Agent/Framework definitions
│   └── dist/          # Built CLI binary
├── skills/            # Skill registry (source of truth)
│   ├── common/        # Universal skills (security, debugging, TDD...)
│   ├── react/         # React-specific skills
│   ├── nestjs/        # NestJS-specific skills
│   ├── flutter/       # Flutter-specific skills
│   └── ...            # 21 framework/language categories
├── .agent/            # Antigravity agent configuration
├── .github/           # GitHub workflows & Copilot instructions
├── AGENTS.md          # Auto-generated skill index for AI agents
├── ARCHITECTURE.md    # System design & data flow
└── CHANGELOG.md       # Release history
```

## 🧬 Philosophy

- **High Density** — Skills are concise and imperative. < 500 tokens each.
- **Search-on-Demand** — Core skills are light; heavy examples in `references/` subfolders.
- **Token Economy** — Every instruction is optimized for the AI's context window.

## 📄 License

MIT © Truong Nguyen
