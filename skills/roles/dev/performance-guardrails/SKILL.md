---
name: Performance Guardrails
description: Developer-level principles for preventing unintentional performance degradation, memory leaks, and N+1 query disasters BEFORE code reaches QA.
category: roles/dev
metadata:
  labels: [dev, performance, n+1, memory-leak, optimization, big-o]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [performance, optimize code, slow query, memory leak, n+1]
---

# 🚀 Performance Guardrails

> **Use this skill when**: writing new loops, making database calls, or handling large arrays. It is much cheaper to write it fast the first time than to debug a timeout in production. Trigger: `/dev-perf-guard`.
>
> **Out of scope**: Infrastructure-scale performance (e.g., CDN caching, Auto-Scaling). This is strictly application-level Code execution and Big-O efficiency.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **N+1 Queries** — Fetching 50 Users, then looping to trigger another DB query per user. | 1 query becomes 51; response time scales linearly. |
| **P0** | **In-Memory Filtering** — `SELECT * FROM Orders` then `.filter()` in JS. | Pulls millions of rows into RAM; OOM crashes. |
| **P1** | **Frivolous Re-rendering** — Inline arrow functions causing React DOM tree re-evaluation on every keystroke. | UI becomes sluggish; user experience degrades. |

---

## 🛠 Prerequisites & Tooling

1. APM / Profiler tools (e.g., Chrome DevTools Performance tab, Django Debug Toolbar).
2. Basic understanding of Big-O Time Complexity.

### Required Tools

| Tool | Purpose |
|------|--------|
| `grep_search` | Find N+1 patterns, `SELECT *`, sequential awaits. |
| `view_file` | Read API handlers and database query code. |
| `run_command` | Execute profiling tools and benchmarks. |
| `call_mcp_tool` → `postgres/query` | Run EXPLAIN ANALYZE on slow queries. |
| `replace_file_content` | Apply performance fixes surgically. |

---

## 🔄 Execution Workflow

### Step 1 — Database Egress Optimization
Push computation to the Database whenever possible. The Database is written in highly optimized C/C++; your Node.js app is not.
- **Rule 1**: Always use `JOIN` or Eager Loading instead of looping queries (solves N+1).
- **Rule 2**: Select ONLY the columns you need. `SELECT id, name` is 10x faster over the wire than `SELECT *` if the table has a giant BLOB column.
- **Rule 3**: Pagination is mandatory. Every API returning a list MUST have `limit` and `offset`.

### Step 2 — Memory Leak Prevention
Identify where memory is allocated but never released:
- Unsubscribed Event Listeners (e.g., `window.addEventListener` in a React component that unmounts but never calls `removeEventListener`).
- Global variables/Maps accumulating cache data infinitely without an LRU eviction policy.

### Step 3 — Algorithmic Efficiency (Big-O)
Be hyper-aware of loops inside loops `O(N^2)`.
If you have Array A (10,000 items) and Array B (10,000 items) and you need to find mutual matches:
- *Bad*: `ArrayA.map(a => ArrayB.find(b => b.id === a.id))` (100,000,000 operations).
- *Good*: Convert Array B into a `Set` or `Hash Map` first. Then loop Array A once. (20,000 operations).

### Step 4 — Asynchronous Bottlenecks
Do not `await` sequentially if the operations are independent.
- *Bad*: `await getUser(); await getItems();` (Takes 2 seconds).
- *Good*: `await Promise.all([getUser(), getItems()])` (Takes 1 second).

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Unoptimizable Loop | A complex cryptographic hash operation inherently blocks the main Node.js thread for 2 seconds | Offload it. Move the synchronous blocking logic to a distinct Worker Thread or a background queue (e.g., Celery/Bull) so the main API thread can continue serving other users. |

---

## ✅ Done Criteria / Verification

A feature is considered performant when:

- [ ] It executes 0 loops invoking network or database calls (No N+1).
- [ ] Large dataset endpoints default to explicit pagination limits.
- [ ] Complex independent I/O tasks utilize concurrent/parallel fetching (`Promise.all`).
- [ ] SELECT queries specify exact columns needed (no `SELECT *`).
- [ ] Memory-allocating operations have cleanup/disposal logic.

---

## 📚 References

- [Performance Optimization Skill](../performance-optimization/SKILL.md) — Reactive optimization after bottleneck is found.
- [Unit Test Best Practices](../unit-test-best-practices/SKILL.md) — Write benchmark tests.
- [Implementation Coding Skill](../implementation-coding/SKILL.md) — CodeAct loop for applying fixes.
- Big-O Cheat Sheet: https://www.bigocheatsheet.com/
