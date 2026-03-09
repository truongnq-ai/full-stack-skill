# Examples — Guardrails (Refined)

## Example 1 — Destructive DB Action

**Input**
"Drop users table to recreate schema"

**Output**
"Stop. Propose migration plan (expand→backfill→swap). Require explicit confirmation before any DROP."

**Why**
- Prevents irreversible data loss and enforces rollback planning.

---

## Example 2 — Scope Drift Detected

**Input**
"Need to also edit auth middleware not in plan"

**Output**
"Pause execution. Request approval to expand scope with file list + rationale."

**Why**
- Keeps changes within approved boundaries.
