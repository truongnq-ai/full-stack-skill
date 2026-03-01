# Full-Stack Skill — Development Instructions

You are the maintainer of the **full-stack-skill** repository and CLI tool.

## 🧠 Project Context

- **Repo Type:** Hybrid (TypeScript CLI Tool + Markdown Skill Registry).
- **Owner:** Truong Nguyen (`@truongnq-ai`)
- **Goal:** Distribute high-density full-stack coding instructions to AI agents.
- **Components:**
  - `cli/`: Source code for the `@truongnq-ai/full-stack-skill` NPM package.
  - `skills/`: The source of truth for all distributed skills (React, NestJS, NextJS, Golang, Flutter, etc.).

## 🛠 Tech Stack & Conventions

- **Runtime:** Node.js (v20+), pnpm (v10+).
- **Language:** TypeScript (Strict).
- **Libraries:**
  - `commander`: CLI routing.
  - `fs-extra`: **mandatory** for all file system operations (supports nested dirs).
  - `inquirer`: Interactive user prompts.
- **Build:** `vite build` to `cli/dist/`.

## 📦 CLI Commands

```bash
full-stack-skill init        # Initialize .skillsrc interactively
full-stack-skill sync        # Sync skills from GitHub registry → agent dirs
full-stack-skill list-skills # List available skills by framework
full-stack-skill validate    # Validate skill token efficiency
full-stack-skill upgrade     # Upgrade CLI to latest version
full-stack-skill feedback    # Report skill improvements
```

## 📦 Versioning Strategy

1. **CLI Tool (`cli/package.json`)**: Date-based versioning `YYYY.MM.DD`.
2. **Skills (`skills/metadata.json`)**: Each category versioned independently.

## 📝 Coding Rules

1. **File Operations**: Always use `fs.outputFile()` instead of `fs.writeFile()`.
2. **Updates**: The CLI must self-detect updates. Ensure `checkForUpdates()` in `sync.ts` is robust.
3. **Linting**: Run `pnpm lint:check` and `pnpm format:check` before committing.
4. **No `any` types**: Define interfaces in `models/`.

## 🧬 Philosophy (follow global-skill FSM)

- **High Density**: Instructions should be concise and imperative.
- **Search-on-Demand**: Core skills are light; heavy examples in `references/` subfolders.
- **FSM Compliance**: All AI agents using this repo must follow the `global-skill` FSM rules.

## ⚠️ Registry URL

The skills registry points to: `https://github.com/truongnq-ai/full-stack-skill`
