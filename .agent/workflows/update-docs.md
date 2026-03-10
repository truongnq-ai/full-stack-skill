---
description: Automated workflow to detect and fix missing documentation in the codebase
---

# 📚 Documentation Update Workflow

> **Use this workflow when**: user wants to find and fill missing JSDoc/documentation, or runs `/update-docs`. Trigger phrases: "update docs", "find missing documentation", "add JSDoc", "document the code".
>
> **Out of scope**: Does not write README or external documentation — use `orchestrate` with `documentation-writer` agent for that. Does not document workflow or skill files.

---

## Step 1 — Scan for Missing Documentation

Run the documentation scanner to identify undocumented exports:

```bash
cd cli
npx ts-node scripts/scan-docs.ts
```

> **Fallback**: If `scan-docs.ts` not found, use grep to identify undocumented exports manually:
> ```bash
> # Find exported functions/classes missing JSDoc (/** pattern above export)
> grep -rn "^export " src/ | grep -v "^.*\/\/" | head -30
> ```
> Manually inspect each result for a `/** ... */` comment immediately above it.

Capture the output list of undocumented members. If output is empty — all exports are documented. End workflow.

---

## Step 2 — Prioritize Items

Sort undocumented members by impact:

| Priority | Item Type | Reason |
|----------|-----------|--------|
| P0 | Public API methods | Directly consumed by users/devs |
| P0 | Exported classes | Core structural elements |
| P1 | Public functions | Core logic, frequently referenced |
| P2 | Type aliases / interfaces | Helpful but lower impact |

Only document P0 items in this session unless user confirms to continue.

---

## ⏸️ Checkpoint: Confirm Scope

```
"Found [N] undocumented items ([P0: N], [P1: N], [P2: N]).
Document all P0 items now? (Y / N — select specific items)"
```

---

## Step 3 — Generate Documentation

For each undocumented item:

1. Use `view_file` to read the full function/class implementation.
2. Add JSDoc comment (`/** ... */`) immediately above the export. Include:
   - `@description` — what it does (one sentence)
   - `@param {type} name` — for each argument
   - `@returns {type}` — return value description
   - `@throws` — if the function can throw errors
   - `@example` — brief usage example for P0 items

**Format:**
```typescript
/**
 * @description Brief description of what this does.
 * @param {string} id - The unique identifier.
 * @returns {Promise<User>} The resolved user object.
 * @throws {NotFoundError} If user with given id does not exist.
 */
export async function findUser(id: string): Promise<User> { ... }
```

---

## Step 4 — Verify

Re-run scanner to confirm zero undocumented P0 items remain:

```bash
npx ts-node scripts/scan-docs.ts
```

> **Fallback**: If script unavailable, manually re-grep for the items documented in Step 3 and confirm JSDoc is present directly above each export.

**Done criteria:**

- [ ] Scanner output shows 0 P0 undocumented items
- [ ] All `@param` and `@returns` tags are present for documented items
- [ ] No function has an empty `/** */` placeholder
