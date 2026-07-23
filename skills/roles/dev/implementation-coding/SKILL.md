---
name: Implementation & Coding (CodeAct)
description: The autonomous agent execution model for writing, testing, and self-correcting code — inspired by the CodeAct methodology of iterative Build-Run-Fix loops.
category: roles/dev
metadata:
  labels: [dev, coding, implementation, codeact, execution, build]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [write code, implement feature, fix bug, refactor, execute task, code this, build this]
    file_patterns: ["src/**/*", "task.md", "lib/**/*", "app/**/*"]
    context: ["user asks to build the app", "user assigns a dev task", "user asks to code a feature"]
    negative: ["user asks to write PRD", "user asks for system design diagrams", "user asks for architecture review"]
---

# 💻 Implementation & Coding (CodeAct Agent)

> **Use this skill when**: you are assigned a coding task and must write, execute, and verify code autonomously — iterating through Build-Run-Fix loops until the feature works. Trigger: `/dev-code`.
>
> **Out of scope**: The human developer's daily workflow and git hygiene (`implementation-workflow/SKILL.md`). This skill governs *how the AI agent writes and verifies code*, not the surrounding process (branching, PR creation, handover).

---

## 🚫 Anti-Patterns

- **Fire and Forget**: Writing a block of code and telling the user "Please run this to see if it works." YOU must try to verify it by running the build/test command.
- **Overwriting Files Blindly**: Using `write_to_file` to replace an entire 500-line file just to change 3 lines. Always use `replace_file_content` or `multi_replace_file_content` for surgical edits.
- **Ignoring Logs**: A command fails, and the agent immediately asks the user for help instead of reading the stderr output, diagnosing the root cause, and retrying.
- **Coding Without Context**: Writing a new utility function without first checking if an identical function already exists in `src/utils/` or `src/shared/`. Always read before writing.
- **The Assumption Loop**: Assuming a file exists, a package is installed, or a type is defined without verifying. Use `view_file` or `grep_search` to confirm before coding against it.

---

## 🛠 Prerequisites & Tooling

1. Access to the codebase via `view_file`, `grep_search`, `list_dir`.
2. Ability to run build/test commands via `run_command`.
3. A `task.md` or explicit user instruction defining what to implement.

---

## 🔄 Execution Workflow

### Step 1 — Context Gathering (Read Before Write)

Before writing a single line:
1. Use `view_file` to read surrounding files (the module you're modifying, its imports, its tests).
2. Use `grep_search` to check for existing patterns (e.g., "How does this codebase handle errors? What ORM patterns are used?").
3. Use `list_dir` to understand the project structure.

**Rule**: Spend 30% of effort on reading, 70% on writing. Never code blind.

### Step 2 — Implement with Surgical Precision

- Use `replace_file_content` for single-block edits.
- Use `multi_replace_file_content` for multiple non-contiguous edits in the same file.
- Use `write_to_file` only for brand-new files (ensure the directory exists).
- Follow existing code patterns — naming conventions, import styles, error handling patterns already established in the codebase.

### Step 3 — The Self-Correction Loop (Build-Run-Fix)

After writing code, immediately verify:
1. **Build**: Run `run_command` with the project's build step (`npm run build`, `tsc --noEmit`, `go build ./...`).
2. **Read Output**: If errors appear, read the stderr/stdout carefully.
3. **Fix**: Apply corrections based on the error messages.
4. **Retry**: Repeat up to 3 times. If stuck after 3 attempts, explain the issue to the user with the exact error log.

```
Code → Build → Error? → Read log → Fix → Build → Error? → Read log → Fix → Build → ✅ Pass
                                                                                    ↓
                                                                            (3 failures) → Escalate to user
```

### Step 4 — Run Tests

After the build passes:
1. Run the test suite: `run_command` → `npm test` / `pytest` / `go test ./...`
2. If tests fail, read the assertion errors and fix the code.
3. If a test file doesn't exist for the new code, create one following `unit-test-best-practices/SKILL.md`.

### Step 5 — Update Task Tracker

If working from a `task.md`:
- Mark the current task as `[x]` completed.
- Add any follow-up items discovered during implementation.

> **⏸️ Checkpoint**:
> "Tính năng đã được code xong. Build passed, [N] tests passed. Bạn có muốn tôi tiếp tục với unit tests / integration / PR preparation không? (Y/N)"

---

## 🛠️ Tooling & Execution

| Action | Tool | Example |
|--------|------|---------|
| Read code | `view_file` | `view_file src/services/UserService.ts` |
| Search patterns | `grep_search` | `grep_search "createUser" src/` |
| Edit existing file | `replace_file_content` | Single block replacement |
| Edit multiple sections | `multi_replace_file_content` | Multiple non-contiguous edits |
| Create new file | `write_to_file` | New module or test file |
| Build/compile | `run_command` | `npm run build`, `tsc --noEmit` |
| Run tests | `run_command` | `npm test`, `pytest -v` |
| Check structure | `list_dir` | Understand project layout |

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Build Failure Loop | Code fails to compile after 3 fix attempts | Stop trying. Present the exact error log to the user with your analysis of the root cause. Ask for guidance. Do not keep guessing. |
| Missing Dependencies | `import` fails because a package is not installed | Check `package.json` / `requirements.txt` first. If the dependency is genuinely missing, ask the user before running `npm install` — never silently install packages. |
| Type Errors in Unfamiliar Codebase | TypeScript strict mode produces complex generic errors | Use `grep_search` to find how similar types are used elsewhere in the codebase. Follow the existing pattern rather than inventing a new one. |
| Conflicting Patterns | The codebase has two different patterns for the same thing (e.g., callbacks and promises mixed) | Follow the NEWER pattern. If unclear which is newer, ask the user which pattern to follow. |

---

## ✅ Done Criteria / Verification

A coding task is complete when:

- [ ] Existing code was read and understood before modifications were made.
- [ ] Surgical edit tools were used (not full file overwrites).
- [ ] The build step passes with zero errors.
- [ ] Relevant tests pass (or new tests were created).
- [ ] The task is marked `[x]` in `task.md` if applicable.

---

## 📚 Cross-References

- `roles/dev/implementation-workflow/SKILL.md` — The human developer's daily git/branch workflow surrounding this coding activity.
- `roles/dev/unit-test-best-practices/SKILL.md` — How to write the tests that verify this code.
- `roles/dev/pr-checklist/SKILL.md` — What to do after coding is complete (self-review, PR prep).
