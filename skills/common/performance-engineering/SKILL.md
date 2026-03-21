---
name: Performance Engineering Standards
description: Universal standards for high-performance software development. Activates when profiling, optimizing, or reviewing performance-critical code paths.
metadata:
  labels: [performance, optimization, scalability, profiling, benchmarking]
  triggers:
    files: ['lighthouse.json', 'webpack.config.*', 'vite.config.*', '**/*.perf.*']
    keywords: [performance, optimize, profile, scalability, benchmark, latency, throughput, memory leak, N+1, bundle size]
    negative: ["user asks to debug a functional bug — use debug workflow", "user asks to design schema — use db-workflow"]
---

# Performance Engineering Standards

## **Priority: P1 (OPERATIONAL)**

**This skill does NOT**: fix functional bugs or redesign architecture — use `debug` or `codebase-review` workflows. DB query optimization beyond indexing belongs to `db-workflow`.

**Compatible skills**: `debugging` (root cause), `quality-assurance` (regression baseline), `system-design` (scalability planning).

## 🚀 Measure Before Optimizing

1. Capture baseline: run profiler/Lighthouse BEFORE any change. Save result.
2. Identify bottleneck type (CPU / Memory / Network / Render).
3. Apply single fix. Measure delta. Only proceed if improvement ≥10%.

> **Fallback**: If no profiling tool available, use manual timing: `console.time(label)` / `console.timeEnd(label)`.

## 💾 Resource Management

- **Memory**: Explicit cleanup — remove listeners, close streams, dispose subscriptions.
- **CPU**: Target O(1)/O(n). Avoid O(n²) in hot paths. Move heavy work to workers/background threads.
- **Memoization**: Cache results of pure, expensive functions. Invalidate on input change.

## 🌐 Network & I/O

- **Payload**: Minify JSON, use compression (gzip/brotli), prefer Protobuf for internal APIs.
- **Batching**: Replace N individual requests with one bulk request.
- **Caching**: Memory → Storage → Network. Set TTL. Define invalidation strategy upfront.
- **Non-blocking**: All I/O must be async. Never block the event loop / main thread.

## ⚡ UI Performance

- **Virtualize**: Lists >50 items use virtualization (react-window, ListView.builder).
- **Tree shake**: Verify dead code eliminated in `npm run build` output.
- **Lazy load**: Code-split routes. Load non-critical assets after interaction.

> **Fallback**: If bundle analyzer not installed, run `npx bundlesize` as quick alternative.

## 🚫 Anti-Patterns

**`No Premature Optimization`**: Profile first. Optimize only proven bottlenecks with data.

**`No Main Thread Blocking`**: Move sync heavy computation to web workers or background isolates.

**`No Uncleared Listeners`**: Every `addEventListener` / `subscribe` must have matching cleanup.

**`No Synchronous I/O`**: Replace `fs.readFileSync` and blocking calls with async equivalents.

**`No Infinite Cache`**: Always set TTL. Cache without expiry = memory leak over time.

## ✅ Verification Checklist

- [ ] Baseline metric captured before optimization
- [ ] Post-fix metric captured — delta documented
- [ ] No memory leaks: heap snapshot before/after shows stable usage
- [ ] Bundle size within budget (set threshold in `bundlesize` or Lighthouse CI)
- [ ] No O(n²) loops in hot paths

## 📚 References

- [Profiling Tool Commands](references/profiling-tools.md)
- [Caching Patterns](references/caching-patterns.md)
