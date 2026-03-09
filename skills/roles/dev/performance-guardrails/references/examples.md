# Examples — Performance Guardrails

## Example 1 — N+1

**Input**
"Query in loop"

**Output**
"Batch query with IN clause."

**Why**
- Reduces DB load.
