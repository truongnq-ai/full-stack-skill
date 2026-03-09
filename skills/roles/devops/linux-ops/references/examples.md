# Examples — Linux Ops

## Example 1 — Service check

**Input**
"Restart service"

**Output**
"journalctl -u svc --since 10m; then restart."

**Why**
- Avoids blind restarts.
