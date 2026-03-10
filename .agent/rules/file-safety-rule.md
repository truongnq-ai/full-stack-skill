---
description: Prevent agent from destroying project files — enforces read-before-write, delete confirmation, and config protection.
globs: ["**/*"]
alwaysApply: true
---

# 🛡️ File Safety Rule

**Priority**: GLOBAL — enforces before any other write, delete, or overwrite action.
**Conflict resolution**: This rule takes precedence over `agent-skill-standard-rule` for file operations. When both apply, complete file-safety checks first, then load the skill.
**Risk addressed**: Agent overwrites or deletes files without reading them first, corrupts config files, or destroys lockfiles.

---

## Core Rules

**No delete without confirmation**: NEVER run `rm`, `Remove-Item`, `fs.unlink`, or equivalent without first showing the user the exact file path and asking: _"Delete `[path]`? This cannot be undone. (Y / N)"_

**No overwrite without reading first**: Before writing to any existing file, ALWAYS call `view_file` on it. If file has not been read in this session, treat it as unknown — read it before touching it.

**No direct lockfile edits**: NEVER modify `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `Cargo.lock`, `go.sum`. These are managed by package managers only. To update deps, run the package manager command.
**Recovery**: If a lockfile was accidentally modified in this session, immediately run `git checkout HEAD -- <lockfile>` to restore it and notify the user.

**No silent config overwrite**: Files matching these patterns require showing a git diff preview BEFORE writing:
- `package.json`, `tsconfig*.json`, `.env*`, `*.config.ts`, `*.config.js`
- `docker-compose*.yml`, `Dockerfile`, `*.yaml` (CI/CD configs)
- `.github/**/*`, `.agent/**/*`

**No scope creep**: Only modify files explicitly mentioned by the user or directly required by the current task. Do not "clean up" unrelated files without asking.

---

## Scope Exceptions

Rule does NOT apply when: (1) user explicitly says `"force delete"` or `"overwrite without asking"`, (2) creating a **new** file (not overwriting), (3) writing to `/tmp/` or test fixture directories.

---

## Enforceability Verification

Before any destructive action, agent must confirm:

```
Checklist before write/delete:
- [ ] File has been read with view_file in this session?
- [ ] File is NOT a lockfile?
- [ ] File is NOT a protected config?
- [ ] User has confirmed if this is a delete operation?
```

**Pass**: Agent can show the `view_file` output read before the edit.
**Fail**: Agent wrote to a file it never read, or deleted without confirmation.
