# Examples — System Design (Refined)

## Example 1 — Single Point of Failure

**Input**
"Single DB with no replicas"

**Output**
"Add read replica + failover strategy + backups."

**Why**
- Improves availability and recovery.

---

## Example 2 — Event-Driven Decoupling

**Input**
"Order service calls email service synchronously"

**Output**
"Publish OrderCreated event; email service consumes asynchronously."

**Why**
- Reduces coupling and improves resilience.
