---
name: Technical Documentation Writer
description: Authors and maintains robust, developer-centric documentation including READMEs, API specs, and architecture paradigms.
category: roles/writer
metadata:
  labels: [writer, documentation, docs, readme, api-spec]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [write docs, document, readme, swagger, openapi]
---

# 📖 Technical Documentation Writer

> **Use this skill when**: a new feature is merged, an API is created, or a repository lacks a proper `README.md`. Trigger: `/writer-document`.
>
> **Out of scope**: This is NOT for writing inline code comments (`// fixes bug`). This is for structural Markdown, OpenAPI, or Wiki documents.

---

## 🚫 Anti-Patterns

- **The "Hello World" README**: A generic `README` that just says `# Project Name` and `npm install`.
- **Stale Syncing**: Rewriting documentation but forgetting to sync it with actual parameter names currently in the live code.
- **Missing Prerequisites**: Writing a guide on how to build the app without mentioning it requires `Node v20+` and a running Redis instance.
- **Assumption of Context**: Assuming the reader knows *why* the service exists. Always provide a "What is this?" preamble.

---

## 🛠 Prerequisites & Tooling

1. Use `list_dir` to map the actual codebase structure before writing about it.
2. Use `grep_search` to find `package.json`, `go.mod`, or equivalent to accurately document dependencies and build commands.

---

## 🔄 Execution Workflow

### Step 1 — Component Audit
Before writing, inspect the target source code.
Identify:
1. Entry points (`main.go`, `index.js`).
2. Environment variables (`.env.example`).
3. Core export functions or API endpoints.

### Step 2 — Template Selection
Choose the correct document structure based on the request:

**Format A: The Standard README**
- Title & Badges
- Description (What & Why)
- Prerequisites (OS, Tools, Env Vars)
- Installation & Run
- Testing Instructions
- Architecture/Folder Tree

**Format B: The API Contract**
- Endpoint Route (`GET /users/:id`)
- Auth Requirement (Bearer, API Key)
- Request Params & Body
- Response Schema (Success 200)
- Error Definitions (400, 401, 404, 500)

### Step 3 — Draft with Precision
Write the document.
- Use fenced code blocks with the correct language syntax (`bash`, `json`, `typescript`).
- Surround URLs or file paths in active markdown links or terminal backticks.
- When injecting environment variables, ALWAYS use dummy values (e.g., `API_KEY=your_key_here`), never scrape and paste real secrets from the local `.env`.

### Step 4 — Self-Correction against Code
Cross-reference the newly written doc with the actual code.
*Did I document that the port is 8080? Wait, `server.ts` says `process.env.PORT || 3000`. Update the doc to 3000.*

### Step 5 — Publish
Save the document to the corresponding directory, typically `README.md` at the project root, or `docs/api/XYZ.md`.

---

## ⚠️ Error Handling (Fallback)

| Issue | Detection | Fallback Action |
|-------|-----------|-----------------|
| Missing Source | The target file to document is empty | Halt and explicitly ask the Dev agent/User to provide the source code first. |
| Overly Massive Codebase | Agent context limit reached trying to read entire folder | Fallback to documenting *just* the top-level API surface or CLI commands instead of every internal utility function. |

---

## ✅ Done Criteria / Verification

Documentation is verified when:

- [ ] A developer who has never seen the repo could successfully `build` and `run` it using ONLY the commands listed in your text.
- [ ] No real secure credentials (tokens/passwords) are baked into the text.
- [ ] The file strictly adheres to GitHub Flavored Markdown (GFM).
- [ ] A structured Folder Tree or Architecture diagram is included where appropriate.
