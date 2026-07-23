---
name: Performance Testing (Load & Stress)
description: Guides the orchestration of stress/load tests using k6/JMeter to assess system behavior under capacity constraints and find breaking points.
category: roles/tester
metadata:
  labels: [qa, performance, load-test, stress, benchmark, tester]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [load test, performance, jmeter, k6, concurrency, stress test, soak test]
    context: ["user asks to load test the app", "user wants to know the breaking point of the server"]
---

# 🏎️ Performance Testing (Load & Stress)

> **Use this skill when**: the application is preparing for a massive traffic surge, to establish a baseline SLA for endpoint response times under concurrent load, or to identify system breaking points via stress testing. Trigger: `/qa-perf-test`.
>
> **Out of scope**: This does NOT optimize the slow code itself (use `roles/dev/optimize-performance`). This only measures and exposes the bottlenecks.

---

## 🚫 Anti-Patterns

- **Testing in Production (Blindly)**: Firing 10,000 Virtual Users (VUs) at the live Production DB without warning alerting teams, causing a self-inflicted DDoS.
- **Client-side Metrics**: Using Chrome DevTools Network tab on one laptop and claiming "The API handles load fine".
- **Spike Only**: Doing a 5-second burst test, but failing to run a "Soak Test" (running moderate load for 2 hours to check for memory leaks).
- **Ignoring Failure Modes**: Running a stress test until the server crashes but failing to document exactly *what* failed (e.g., Out of Memory vs Database Connection Pool Exhausted).

---

## 🛠 Prerequisites & Tooling

1. A dedicated Staging load-test environment that exactly mirrors Prod architecture (or a planned Prod maintenance window).
2. Load testing tool script (e.g., `k6 run load.js` or `Artillery`).
3. Baseline NFRs (Non-Functional Requirements) from the BA (e.g., "Must sustain 500 RPS with p95 < 200ms").

**Required Tools**: Use `run_command` to execute k6 or Artillery scripts. Use `write_to_file` to draft the test scripts and the final performance report.

---

## 🔄 Execution Workflow

### Step 1 — Establish Bounds (The Blueprint)
Determine the type of performance test required:
- **Load Test**: Assess performance under expected peak traffic (e.g., 500 concurrent users).
- **Stress Test**: Increase load gradually until the system breaks to find the absolute capacity limit.
- **Soak Test**: Sustain moderate load over a long period (e.g., 8 hours) to find memory leaks.

Define the test parameters:
- **Target Endpoint(s)**: e.g., `/api/v1/checkout`
- **Concurrency (VUs)**: 50 -> 200 -> 500
- **Duration**: 5m ramp-up, 10m sustained, 2m ramp-down.
- **Success Criteria**: Error rate < 1%, p95 latency < 300ms.

### Step 2 — Environment Baseline Check
Ensure the database is not already locking up from other jobs.
Ensure caching layers (Redis/CDN) are either explicitly enabled or bypassed depending on what you are trying to test.

### Step 3 — Executing the Load Profile
Run the load tool (e.g., k6):
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 }, // Ramp up
    { duration: '5m', target: 50 }, // Sustain
    { duration: '1m', target: 0 },  // Ramp down
  ],
};

export default function () {
  const res = http.get('https://staging-api.example.com/health');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

### Step 4 — Analyze Output Metrics
Parse the terminal output. Look strictly at:
1. `http_req_failed`: Must be ~0.00% (unless doing a Stress test to failure).
2. `http_req_duration`: Look at `p(90)` and `p(95)`. Averages (mean) lie. If p95 is 5000ms, your system is failing 5% of your users terribly.

### Step 5 — Report Generation
Create `docs/performance/LoadReport-[YYYYMMDD].md`.
Compare the output metrics against the SLA. If it fails, escalate the generated report to Backend/DevOps as a `BUG-XXX (SEV-2 Performance Degradation)`.

> **⏸️ Checkpoint**: 
> "Bài kiểm tra hiệu năng đã hoàn tất. Tôi đã ghi nhận kết quả độ trễ (p95 latency) và tỷ lệ lỗi. Bạn có muốn tôi tạo báo cáo chi tiết và (nếu cần) log Bug giảm hiệu năng không? (Y/N)"

---

## ⚠️ Error Handling (Fallback)

| Scenario | Encountered | Fallback Action |
|----------|-------------|-----------------|
| Instant 503s | Run fails immediately at 50 VUs | Rate Limiter or WAF (Cloudflare/AWS) is blocking the test IP. Provide DevOps the testing IP to whitelist, then retry. |
| Test Tool Crash | k6 runs out of memory locally | The local machine cannot generate enough sockets for 10,000 VUs. Distribute the load using a cloud provider (e.g., k6 Cloud). |

---

## ✅ Done Criteria / Verification

A Performance Test is complete when:

- [ ] A specifically bounded run (Ramp/Sustain/Drop) successfully finishes without the tool crashing.
- [ ] Percentile metrics (p90, p95) are explicitly documented, avoiding reliance on mean averages.
- [ ] The exact failure mode is documented if performing a Stress Test.
- [ ] A binary Pass/Fail SLA check has been performed against the BA requirements.

---

## 📚 Cross-References

- **Bug Reporting Standard**: `roles/tester/bug-reporting-standard/SKILL.md` (To report performance bottlenecks)
- **Environment Management**: `roles/tester/environment-management/SKILL.md` (To ensure the test env is clean before the run)
