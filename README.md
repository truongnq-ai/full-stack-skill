# full-stack-skill

[![NPM Version](https://img.shields.io/npm/v/@truongnq-ai/full-stack-skill.svg?style=flat-square)](https://www.npmjs.com/package/@truongnq-ai/full-stack-skill)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/truongnq-ai/full-stack-skill/blob/master/LICENSE)

> **Full-stack AI agent skills** — high-density coding instructions distributed to Cursor, Claude Code, Copilot, Antigravity, Windsurf, Gemini, Roo Code, OpenCode, Kiro, and more.

## 🚀 Quick Start (3 commands)

```bash
# 1. Initialize — auto-detects your tech stack and AI agents
npx @truongnq-ai/full-stack-skill@latest init

# 2. Done! Skills are synced automatically after init.
#    To re-sync later:
npx @truongnq-ai/full-stack-skill@latest sync
```

That's it. Your AI agent now has framework-aware, production-grade coding standards.

---

## 📦 What Is This?

A **CLI + Skill Registry** that automatically distributes high-density coding standards to AI agents in your project. After running `sync`, your AI assistant knows:

- Your framework's architecture patterns (Next.js App Router, NestJS modules, Flutter BLoC...)
- Language-specific best practices (TypeScript strict mode, Go idioms, Swift concurrency...)
- Security standards, testing conventions, performance engineering guidelines
- Common workflows (code review, architecture audit, feature planning...)

---

## 🛠 Installation

```bash
# Recommended — no install needed, always latest
npx @truongnq-ai/full-stack-skill@latest init

# Or install globally for shorthand `fss` command
npm install -g @truongnq-ai/full-stack-skill
```

---

## 📋 Setup Guide

### Step 1: Initialize (Interactive Wizard)

```bash
npx @truongnq-ai/full-stack-skill@latest init
```

The wizard guides you through **3 simple steps**:

```
Step 1 → Select Languages       (auto-detected from your project)
Step 2 → Select Frameworks      (filtered by language, auto-detected)
Step 3 → Select AI Agents       (grouped by popularity)
       → Review Summary         (confirm before saving)
       → Auto-sync              (download skills immediately)
```

Example output:

```
? Select your programming languages: TypeScript / JavaScript
? Select frameworks: Next.js, React
? Select AI Agents you use:
  ── Popular ──────────────────
  (*) Cursor
  ( ) GitHub Copilot
  ( ) Claude Code
  ── Other Editors ────────────
  ( ) Windsurf
  ( ) Trae
  ...

📋 Configuration Summary:
─────────────────────────────────────────
   Languages:  TypeScript / JavaScript
   Frameworks: Next.js, React
   Agents:     Cursor
   Registry:   github.com/truongnq-ai/full-stack-skill
─────────────────────────────────────────
? Save and continue? Yes

✅ Initialized .skillsrc with your preferences!
? Run sync now to download skills? Yes
```

### Step 2: Sync Skills

If you skipped auto-sync, or need to re-sync later:

```bash
npx @truongnq-ai/full-stack-skill@latest sync
```

This downloads skill files from the registry and writes them to your AI agent directories:

```
🚀 Syncing skills from https://github.com/truongnq-ai/full-stack-skill...
  - Discovering nextjs (nextjs-v1.1.3)...
    + Fetched nextjs/app-router (2 files)
    + Fetched nextjs/architecture (6 files)
    ...
  - Updated .cursor/skills/ (Cursor)
  ✅ Workflows synced to .cursor/workflows/
  ✅ AGENTS.md index updated.
✅ All skills synced successfully!
```

### Step 3 (Optional): Add Role Presets

Want your AI agent to also know about **QA**, **BA**, **DevOps**, or other roles? Add them separately:

```bash
# Add a specific role
npx @truongnq-ai/full-stack-skill@latest add-role qa

# Or pick from a list interactively
npx @truongnq-ai/full-stack-skill@latest add-role
```

Available roles:

| Role       | Description                              |
| ---------- | ---------------------------------------- |
| `ba`       | Requirements elicitation, story splitting, system modeling |
| `qa`       | Test strategy, automation, reporting     |
| `devops`   | CI/CD, infrastructure, monitoring        |
| `writer`   | Technical writing, documentation         |
| `reviewer` | Code review, PR conventions              |

---

## 📋 All Commands

| Command                   | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| `fss init`                | Interactive wizard — detects framework, selects AI agents, creates `.skillsrc` |
| `fss init --non-interactive` | CI/CD mode — auto-detect everything, no prompts                             |
| `fss init --advanced`     | Show advanced options (custom registry URL)                                    |
| `fss sync`                | Fetches skills from registry → writes to agent dirs → generates `AGENTS.md`    |
| `fss sync --dry-run`      | Preview changes without writing any files                                      |
| `fss add-role [role]`     | Add a role preset to your `.skillsrc` (e.g. `fss add-role qa`)                |
| `fss doctor`              | Diagnose your setup — 8-point health check                                     |
| `fss list-skills`         | Lists available skills with detection status                                   |
| `fss validate`            | Validates skill format and token efficiency                                    |
| `fss feedback`            | Report skill improvements or AI mistakes                                       |
| `fss upgrade`             | Self-upgrade CLI to latest version                                             |

> **Tip:** `fss` is a shorthand for `full-stack-skill`. Both work identically.

---

## 🏗 How It Works

```
Registry (GitHub)  ──→  CLI (init/sync)  ──→  Your Project
                                                ├── .cursor/skills/     (Cursor)
                                                ├── .agent/skills/      (Antigravity)
                                                ├── .claude/skills/     (Claude Code)
                                                ├── .github/skills/     (Copilot)
                                                ├── .agent/workflows/   (Reusable workflows)
                                                ├── .skillsrc           (Config — source of truth)
                                                └── AGENTS.md           (Auto-generated skill index)
```

1. **`init`** — detects your tech stack and AI agents, creates `.skillsrc`
2. **`sync`** — downloads matching skills and writes to your AI agent directories
3. **AI agents** read skills from their paths and follow the instructions automatically

---

## 📂 Skill Categories

| Category      | Skills                                                     | Count      |
| ------------- | ---------------------------------------------------------- | ---------- |
| **Frontend**  | React, Next.js, Angular, React Native                      | 54+ skills |
| **Backend**   | NestJS, Spring Boot, Golang, Laravel                       | 84+ skills |
| **Mobile**    | Flutter, Android, iOS (Swift)                              | 90+ skills |
| **Languages** | TypeScript, JavaScript, Dart, Java, Kotlin, PHP, Swift, Go | 50+ skills |
| **Common**    | Best practices, security, debugging, TDD, code review      | 26+ skills |
| **Database**  | PostgreSQL, MongoDB, Redis                                 | 3+ skills  |
| **Roles**     | BA, QA, DevOps, Writer, Reviewer                           | 6 roles    |

---

## 🤖 Supported AI Agents

| Group             | Agents                                          |
| ----------------- | ----------------------------------------------- |
| **Popular**       | Cursor · GitHub Copilot · Claude Code           |
| **Other Editors** | Windsurf · Trae · Kiro · Roo Code · OpenCode    |
| **Platform**      | Antigravity · OpenAI Codex · Gemini              |

---

## ⚡ CI/CD Integration

For automated pipelines, use non-interactive mode:

```bash
npx @truongnq-ai/full-stack-skill@latest init --non-interactive
```

This auto-detects everything (languages, frameworks, agents) and syncs immediately without any prompts.

Preview changes before applying:

```bash
npx @truongnq-ai/full-stack-skill@latest sync --dry-run
```

---

## 📁 Repository Structure

```
full-stack-skill/
├── cli/               # TypeScript CLI source (published to npm)
│   ├── src/
│   │   ├── commands/  # init, sync, add-role, doctor, validate, upgrade, feedback
│   │   ├── services/  # SyncService, DetectionService, ConfigService
│   │   └── constants/ # Agent/Framework definitions
│   └── dist/          # Built CLI binary
├── skills/            # Skill registry (source of truth)
│   ├── common/        # Universal skills (security, debugging, TDD...)
│   ├── react/         # React-specific skills
│   ├── nestjs/        # NestJS-specific skills
│   ├── flutter/       # Flutter-specific skills
│   ├── roles/         # Role-based skills (BA, QA, DevOps...)
│   └── ...            # 22 framework/language/role categories
├── AGENTS.md          # Auto-generated skill index for AI agents
├── ARCHITECTURE.md    # System design & data flow
└── CHANGELOG.md       # Release history
```

---

## 🧬 Philosophy

- **High Density** — Skills are concise and imperative. < 500 tokens each.
- **Search-on-Demand** — Core skills are light; heavy examples in `references/` subfolders.
- **Token Economy** — Every instruction is optimized for the AI's context window.
- **Zero Config** — Auto-detects your tech stack. Just run `init` and go.

---

## 📄 License

MIT © Truong Nguyen
