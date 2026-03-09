# Examples — File Safety (Refined)

## Example 1 — Undeclared File

**Input**
"Need to change config.yaml discovered mid-task"

**Output**
"Stop and request approval to add config.yaml to scope."

**Why**
- Prevents silent expansion of changes.

---

## Example 2 — Destructive Command

**Input**
"Run git reset --hard"

**Output**
"Ask for explicit confirmation; explain data loss risk."

**Why**
- Avoids losing uncommitted work.
