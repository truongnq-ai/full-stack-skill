---
description: Writer detects and fills missing JSDoc/documentation in the codebase — scans exports, prioritizes by impact, generates documentation, and verifies coverage.
---

# 📚 Writer Update Docs

> **Use this workflow when**: writer needs to find and fill missing documentation, add JSDoc, or update code comments. Trigger: `/software-writer-update-docs`.
>
> **Out of scope**: Does not write README or external docs — use `software-team-orchestrate-agents` with documentation-writer agent. Does not document workflow/skill files.
>
> **Activates skill**: `skills/common/documentation/SKILL.md`

---

## Step 1 — Scan for Missing Documentation

```bash
npx ts-node scripts/scan-docs.ts 2>/dev/null
```

> **Fallback**: If script missing:
> ```bash
> grep -rn "^export " src/ | grep -v "^.*//" | head -30
> ```
> Manually inspect each for `/** ... */` above the export.

If output empty → all documented. End workflow.

---

## Step 2 — Prioritize Items

| Priority | Item Type |
|----------|-----------|
| P0 | Public API methods, exported classes |
| P1 | Public functions |
| P2 | Type aliases, interfaces |

Only document P0 items unless user confirms to continue.

---

## ⏸️ Checkpoint: Confirm Scope

```
"Found [N] undocumented items (P0: [N], P1: [N], P2: [N]).
Document all P0 items now? (Y / N — select specific)"
```

---

## Step 3 — Generate Documentation

For each item: `view_file` the implementation, then add JSDoc:

```typescript
/**
 * @description Brief description.
 * @param {string} id - The identifier.
 * @returns {Promise<User>} Resolved user.
 * @throws {NotFoundError} If not found.
 */
```

> **Rule**: Every P0 item gets `@description`, `@param`, `@returns`, `@throws` (if applicable), `@example` (for P0).

---

## Step 4 — Verify

```bash
npx ts-node scripts/scan-docs.ts 2>/dev/null
```

> **Fallback**: Re-grep documented items and confirm JSDoc present.

---

## Done Criteria

- [ ] Scanner shows 0 undocumented P0 items
- [ ] All `@param` and `@returns` tags present
- [ ] No empty `/** */` placeholders
