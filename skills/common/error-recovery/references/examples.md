# Examples — Error Recovery (Refined)

## Example 1 — Recoverable Error

**Input**
"TypeScript build fails: missing import"

**Output**
"Fix import, retry build once. If fails again, escalate."

**Why**
- Limits retries and keeps control flow safe.

---

## Example 2 — Critical Error

**Input**
"Detected unintended file deletion"

**Output**
"Stop all actions. Report damage scope and rollback steps."

**Why**
- Prevents compounding damage.
