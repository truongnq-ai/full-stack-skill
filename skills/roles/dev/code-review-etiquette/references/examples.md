# Examples — Code Review Etiquette

## Example 1 — Categorized PR Comments

**Bad** (Ambiguous, no prefix):
```
"Why did you do this? This is terribly inefficient."
```

**Good** (Categorized, constructive):
```
[BLOCKER] This database connection is never closed after the query completes.
The `finally` block should call `connection.release()` to prevent connection pool
exhaustion under load. See: https://node-postgres.com/features/pooling

[NIT] Consider renaming `data` to `orderItems` for clarity — current name is ambiguous.

[PRAISE] Beautiful use of the Strategy pattern here to handle the different
payment providers. This is exactly the extensibility we needed. 🎉

[Q] I see this uses `setTimeout(5000)` as a retry delay. Is this intentional,
or should we use exponential backoff to avoid thundering herd on the payment service?
```

**Why**: The PR author instantly knows which comments block merge and which are optional suggestions.

---

## Example 2 — Escalation: When to Stop Typing

**Scenario**: PR comment thread reaches 15 back-and-forth messages about state management approach.

**Action**: Stop async text communication. Post:
```
This is a fundamental architecture disagreement that won't resolve in comments.
Let's do a 15-minute live sync with @tech-lead to decide.
I'll create an ADR for whatever we choose. Available at 2pm today?
```

**Why**: Text ping-pong burns days. A 15-minute call resolves architectural debates that would take 50 comments.
