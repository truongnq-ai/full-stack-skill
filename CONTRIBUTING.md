# Contributing to full-stack-skill

Thank you for your interest in contributing! This document provides guidelines for setup and standards.

## 1. Development Setup

### Prerequisites

- Node.js v20+
- pnpm (v10+)

### Installation

```bash
# Clone and install
git clone https://github.com/truongnq-ai/full-stack-skill.git
cd full-stack-skill
pnpm install

# Build the CLI
pnpm build
```

## 2. Testing

```bash
# Run unit tests
pnpm test

# Validate skill format
pnpm validate
```

## 3. Creating Skills

Skills are the core value of this project. Each skill must follow the **High-Density** standard:

1. **Create** a category folder in `skills/<category>/<skill-name>/`
2. **Write** `SKILL.md` — imperative, concise, < 500 tokens
3. **References**: Heavy examples → `references/` subfolder (loaded on demand)
4. **Validate**: Run `pnpm calculate-tokens` to verify token budget

### SKILL.md Structure

```markdown
---
description: One-line trigger description with glob patterns
globs: **/*.ts, **/*.tsx
---

# Skill Title

## Context

Brief context (1-2 lines)

## Rules

- Imperative rule 1
- Imperative rule 2

## Examples

<example>
Brief inline example
</example>
```

## 4. Release Process

- **CLI**: Date-based versioning `YYYY.MM.DD`. Run `pnpm build` then `npm publish --access public`.
- **Skills**: Each category versioned independently in `skills/metadata.json`. Tag format: `<category>-v<version>`.

## 5. Code Standards

- **TypeScript Strict** — no `any` types
- **fs-extra** mandatory for file operations
- Run `pnpm lint` and `pnpm format` before committing
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`
