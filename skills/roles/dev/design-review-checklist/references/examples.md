# Examples — Design Review Checklist

## Example 1 — Scalability Challenge

**Proposal**: "Store user activity logs in a single PostgreSQL table."

**Review Question**: "If this table hits 100M rows in 12 months (1000 active users × 100 events/day × 365 days), what's the query plan for `SELECT * FROM activity WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`?"

**Outcome**: Team decides to partition the table by `created_at` month and add a composite index on `(user_id, created_at DESC)`.

---

## Example 2 — Buzzword Pushback

**Proposal**: "We need Kafka, Redis, and Kubernetes for the new internal dashboard."

**Review Challenge**: "This dashboard has 5 daily users. A simple PostgreSQL table with a REST API deployed on a single server will handle this for 3 years. When we hit scaling limits, we add complexity. YAGNI."

**Why**: The reviewer prevented $50K/year in infrastructure costs for a tool that could run on a $20/month VPS.

---

## Example 3 — External Dependency Failure Plan

**Proposal**: "Checkout flow calls Stripe API to process payment."

**Review Questions**:
- "What happens if Stripe returns 503 for 5 minutes during Black Friday?"
- "Do we show users a blank error page, or do we queue the payment for retry?"
- "Is there a fallback payment provider?"

**Why**: Every external dependency is a point of failure. The design review must surface these risks BEFORE coding begins.
