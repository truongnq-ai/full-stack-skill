# Examples — Logging Standards

## Example 1 — Correlation

**Input**
"log error"

**Output**
"log.error('db_error', { request_id })"

**Why**
- Enables traceability.
