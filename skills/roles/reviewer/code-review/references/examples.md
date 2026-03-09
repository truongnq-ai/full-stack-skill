# Examples — Reviewer Code Review

## Example 1 — SQL injection

**Input**
"SELECT * FROM users WHERE id = ${id}"

**Output**
"[BLOCKER] Use parameterized query."

**Why**
- Prevents injection.
