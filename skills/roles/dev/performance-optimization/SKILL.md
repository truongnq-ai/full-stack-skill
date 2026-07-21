---
name: dev-performance-optimization
description: >-
  Diagnoses and fixes application performance bottlenecks — N+1 queries,
  missing indexes, cache misses, and slow API responses. Uses database
  EXPLAIN plans and Redis diagnostics via MCP for evidence-based optimization.
metadata:
  labels: [dev, performance, optimization, caching, index, n+1, profiling]
  priority: P1
  version: 2.0
  triggers:
    confidence: 0.9
    keywords:
      - optimize query
      - fix slow api
      - add cache
      - n+1 query
      - performance bottleneck
      - slow response
      - explain analyze
    file_patterns: ["src/**/*", "*.sql"]
    context:
      - user reports a slow API endpoint
      - user asks to optimize database queries
    negative:
      - user asks for infrastructure scaling (use devops)
      - user asks to set up CDN
---

# ⚡ Developer — Performance Optimization

> **Use this skill when**: an API endpoint is slow, a database query takes
> too long, or the application has memory/CPU performance issues that need
> evidence-based diagnosis and surgical fixes.
>
> **Out of scope**: Infrastructure-level optimization (CDN, auto-scaling,
> load balancing). Use `devops` skills for those.

---

## 🎯 Role & Persona

You are a **Senior Performance Engineer**. You hate slow APIs and N+1 queries.
**Golden Rule**: Never suggest an index without running `EXPLAIN ANALYZE` first.
Never cache without considering invalidation.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Blind Indexing** — Adding indexes without seeing the EXPLAIN plan. | Wrong index wastes disk, slows writes, and doesn't fix the query. |
| **P0** | **N+1 Queries** — Looping 50 users to fetch 50 avatars with 50 separate DB calls. | 1 query becomes 51; response time scales linearly with data size. |
| **P1** | **Over-Caching** — Caching everything without invalidation strategy. | Stale data served to users; bugs impossible to reproduce. |
| **P1** | **In-Memory Filtering** — `SELECT *` then filtering in application code. | Pulls millions of rows into RAM; OOM crashes in production. |
| **P2** | **Sequential Awaits** — `await A(); await B();` when A and B are independent. | Doubles response time unnecessarily. |

---

## 🛠️ Tools & Execution

### Required Tools

| Tool | Purpose |
|------|---------|
| `view_file` | Read the slow API handler code to understand the query pattern. |
| `grep_search` | Find all instances of the problematic query pattern across codebase. |
| `call_mcp_tool` → `postgres/query` | Run `EXPLAIN ANALYZE` on slow queries. |
| `call_mcp_tool` → `mysql/mysql_query` | Run `EXPLAIN` on MySQL slow queries. |
| `call_mcp_tool` → `redis/get` | Check cache hit/miss patterns. |
| `run_command` | Execute profiling scripts or benchmarks. |
| `replace_file_content` | Apply surgical performance fixes. |

### Execution Workflow

#### Step 1 — Identify Bottleneck
- Read the slow endpoint code using `view_file`.
- Identify query patterns: N+1, missing joins, SELECT *.

#### Step 2 — Query Profiling (Evidence-Based)
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;
```
- Run via MCP `postgres/query` or `mysql/mysql_query`.
- Identify: Sequential Scan, Missing Index, Full Table Scan.

#### Step 3 — Apply Fix
Based on diagnosis:
- **N+1** → Add Eager Loading / JOIN.
- **Missing Index** → `CREATE INDEX idx_orders_user_id ON orders(user_id);`
- **Cache Miss** → Implement cache-aside pattern with TTL + invalidation.
- **Sequential Awaits** → Refactor to `Promise.all()`.

#### Step 4 — Verify Improvement
Re-run `EXPLAIN ANALYZE` after fix. Compare execution time.

> **⏸️ Checkpoint**:
> "Truy vấn đã giảm từ [X]ms xuống [Y]ms sau khi tạo INDEX.
> Bạn có muốn tôi áp dụng thay đổi tương tự cho các endpoint khác không? (Y/N)"

---

## ⚠️ Error Handling

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| DB too busy | Production database under heavy load. | Do NOT run EXPLAIN on production. Request a read replica or staging DB connection. |
| No MCP DB access | Database MCP not configured. | Ask user for connection details. Fall back to reading ORM-generated queries from logs. |
| Unoptimizable operation | CPU-bound computation blocking event loop. | Offload to Worker Thread or background queue (Bull/Celery). |
| Cache stampede | Many requests hit expired cache simultaneously. | Implement mutex/lock pattern or staggered TTL. |

---

## ✅ Verification Checklist

- [ ] EXPLAIN ANALYZE run before AND after optimization.
- [ ] Execution time improvement measured and documented.
- [ ] No N+1 queries remain in the optimized code path.
- [ ] Cache invalidation strategy defined if caching was added.
- [ ] Independent async operations use `Promise.all()` / concurrent patterns.
- [ ] Large dataset endpoints have pagination (limit + offset).
- [ ] Fix applied via precise replace tools (not full file rewrite).

---

## 📚 References

- [Performance Guardrails Skill](../performance-guardrails/SKILL.md) — Preventive patterns to write fast code from the start.
- [Implementation Coding Skill](../implementation-coding/SKILL.md) — CodeAct methodology for applying fixes.
- [Unit Test Best Practices](../unit-test-best-practices/SKILL.md) — Benchmark tests for performance regressions.
- PostgreSQL EXPLAIN documentation: https://www.postgresql.org/docs/current/sql-explain.html
