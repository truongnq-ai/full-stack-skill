---
name: Performance Engineering
description: Comprehensive developer protocol for preventing and diagnosing performance issues — from code-level Big-O guardrails through database query tuning to production profiling.
category: roles/dev
metadata:
  labels: [dev, performance, n+1, memory-leak, optimization, big-o, caching, profiling]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [performance, optimize code, slow query, memory leak, n+1, add cache, fix slow api, profiling]
    file_patterns: ["**/queries/**", "**/repository/**", "**/service/**", "**/cache/**"]
    context: ["user reports a slow API", "user asks to optimize a query", "user asks about caching strategy"]
    negative: ["user asks about CDN or infrastructure scaling", "user asks about auto-scaling policies"]
---

# 🚀 Performance Engineering

> **Use this skill when**: writing new code that involves loops, database calls, or large data sets (prevention), OR diagnosing an existing slow API/query bottleneck (diagnosis). Trigger: `/dev-perf`.
>
> **Out of scope**: Infrastructure-scale performance (CDN caching, Auto-Scaling, Load Balancing) — that belongs to `roles/devops/`. This is strictly *application-level* code efficiency, query optimization, and caching strategy.

---

## 🚫 Anti-Patterns

- **N+1 Queries**: Fetching 50 Users from the DB, then looping through those 50 users to trigger *another* DB query to fetch each user's Avatar. (1 query becomes 51 queries, turning a 20ms page load into a 3-second disaster).
- **In-Memory Filtering (DB Abuse)**: Running `SELECT * FROM Orders` (pulling 2 million rows into Node.js RAM), just to run `.filter(status === 'active')` in JavaScript. The database engine, written in optimized C/C++, can do this 1000x faster with a `WHERE` clause.
- **Blind Indexing**: Suggesting a database index without first running `EXPLAIN ANALYZE` to prove the query is actually doing a sequential scan. Unnecessary indexes slow down writes and waste storage.
- **Over-Caching Without Invalidation**: Adding Redis caching to "make it faster" without defining a TTL or invalidation strategy. Users see stale data for hours, and the team spends 2 days debugging "why changes aren't showing up."
- **Frivolous Re-rendering**: In React, passing a brand new inline arrow function `<Button onClick={() => doThing()} />` causing the entire component subtree to re-evaluate on every parent render.
- **Sequential Awaits for Independent Operations**: Writing `await getUser(); await getItems();` when the two operations are completely independent, doubling the response time for no reason.

---

## 🛠 Prerequisites & Tooling

1. APM / Profiler tools (Chrome DevTools Performance tab, Django Debug Toolbar, Node.js `--inspect`).
2. Database EXPLAIN access (Postgres `EXPLAIN ANALYZE`, MySQL `EXPLAIN`).
3. Basic understanding of Big-O Time Complexity.
4. Caching infrastructure awareness (Redis, Memcached, in-memory LRU).

---

## 🔄 Execution Workflow

### Part A — Prevention (Write-Time Guardrails)

Apply these rules while writing new code:

#### Guardrail 1 — Database Egress Optimization
Push computation to the database whenever possible:
- **Rule 1**: Always use `JOIN` or Eager Loading instead of looping queries (solves N+1).
- **Rule 2**: Select ONLY the columns you need. `SELECT id, name` is 10x faster over the wire than `SELECT *` if the table has a giant BLOB column.
- **Rule 3**: Pagination is mandatory. Every API returning a list MUST have `limit` and `offset` (or cursor-based pagination).

#### Guardrail 2 — Memory Leak Prevention
Identify where memory is allocated but never released:
- Unsubscribed Event Listeners (e.g., `window.addEventListener` in a React component that unmounts but never calls `removeEventListener`).
- Global variables/Maps accumulating cache data infinitely without an LRU eviction policy.
- Unclosed database connections, file handles, or streams.

#### Guardrail 3 — Algorithmic Efficiency (Big-O)
Be hyper-aware of loops inside loops `O(N²)`:
- *Bad*: `ArrayA.map(a => ArrayB.find(b => b.id === a.id))` → 100,000,000 operations for 10K × 10K.
- *Good*: Convert Array B into a `Map` first, then loop Array A once → 20,000 operations.

#### Guardrail 4 — Async Concurrency
Do not `await` sequentially if the operations are independent:
- *Bad*: `await getUser(); await getItems();` (Takes 2 seconds)
- *Good*: `await Promise.all([getUser(), getItems()])` (Takes 1 second)

---

### Part B — Diagnosis (Debug-Time Profiling)

When a performance problem is reported in an existing system:

#### Step 1 — Identify the Bottleneck

Analyze the slow endpoint code:
- Use `view_file` to read the API handler and service layer.
- Use `grep_search` to find N+1 patterns (loops containing DB calls).

#### Step 2 — Query Profiling (MCP-First)

Run `EXPLAIN ANALYZE` on the suspected slow query:
- Use `call_mcp_tool` → `postgres/query` or `mysql/mysql_query`:
  ```sql
  EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123 AND status = 'active';
  ```
- Look for: `Seq Scan` (missing index), `Nested Loop` (N+1 pattern), `Sort` (missing index for ORDER BY).

#### Step 3 — Caching Assessment

Check if caching is properly utilized:
- Use `call_mcp_tool` → `redis/get` to verify cache hit/miss rates.
- Evaluate: Is the cached data stale? Is there a cache stampede risk (many clients requesting the same expired key simultaneously)?

#### Step 4 — Apply Fix & Measure

1. Apply the fix (add index, optimize query, add caching layer).
2. Re-run `EXPLAIN ANALYZE` to prove the improvement.
3. Compare before/after metrics (query time, API response time).

> **⏸️ Checkpoint**:
> "Phân tích xong: truy vấn đang bị Sequential Scan trên bảng `orders` (2M rows). Dưới đây là câu lệnh tạo INDEX. Bạn có muốn tôi thực thi trên DB (staging) không? (Y/N)"

---

## 🛠️ Tooling & Execution

| Action | Tool | Example |
|--------|------|---------|
| Read API code | `view_file` | Inspect handler and service files |
| Find N+1 patterns | `grep_search` | Search for DB calls inside loops |
| Query profiling | `call_mcp_tool` → `postgres/query` | `EXPLAIN ANALYZE <query>` |
| Cache inspection | `call_mcp_tool` → `redis/get` | Check cache keys |
| Cache management | `call_mcp_tool` → `redis/set` / `redis/delete` | Set/invalidate cache |
| Run benchmarks | `run_command` | `npm run benchmark`, `ab -n 1000` |
| Build verification | `run_command` | `npm run build` after changes |

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Unoptimizable Blocking Operation | A complex cryptographic hash or PDF generation inherently blocks the main thread for 2+ seconds | Offload it. Move the blocking logic to a Worker Thread (Node.js), background queue (Bull/Celery), or separate microservice. Keep the main API thread responsive. |
| Database Server Too Busy | Running `EXPLAIN ANALYZE` on production could worsen an active performance incident | NEVER profile on production during an incident. Use a staging replica, or analyze the query plan on a read-replica with `EXPLAIN` (without `ANALYZE`) to avoid actual execution. |
| Cache Stampede | Thousands of requests hit the same expired cache key simultaneously, overwhelming the database | Implement a cache lock (mutex) pattern: only the first request regenerates the cache, others wait for the fresh value. Or use stale-while-revalidate. |
| Premature Optimization | Developer wants to optimize code that runs once a day for 3 users | Push back. Quote Knuth: "Premature optimization is the root of all evil." Focus optimization efforts on hot paths — the top 5 slowest endpoints by P95 latency. |

---

## ✅ Done Criteria / Verification

A feature is considered performant when:

- [ ] It executes zero loops containing network or database calls (No N+1).
- [ ] Large dataset endpoints default to explicit pagination limits.
- [ ] Complex independent I/O tasks utilize concurrent/parallel fetching (`Promise.all`).
- [ ] Database queries have been verified with `EXPLAIN ANALYZE` — no unintended sequential scans.
- [ ] Caching (if applied) has explicit TTL and invalidation strategy documented.

---

## 📚 Cross-References

- `roles/dev/unit-test-best-practices/SKILL.md` — Performance regression tests.
- `roles/dev/production-debugging/SKILL.md` — When performance issues manifest as production incidents.
- `roles/dev/design-review-checklist/SKILL.md` — Step 2 covers data architecture and schema scalability.
