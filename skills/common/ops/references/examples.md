# Examples — Ops (Refined)

## Example 1 — Incident First Step

**Input**
"Restart service immediately"

**Output**
"Collect logs + metrics first; form hypothesis before restart."

**Why**
- Avoids masking root cause.

---

## Example 2 — Risky Action

**Input**
"Run DB migration on prod"

**Output**
"Request confirmation + rollback plan + maintenance window."

**Why**
- Prevents uncontrolled outages.
