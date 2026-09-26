---
description: "In-depth testing before release: Load test, Stress test, and Security test with explicit thresholds and tool commands."
---

# 🧪 QA: Advanced Testing (Performance & Security)

> **Use this workflow when**: QA needs to certify a release with performance load tests and security scans before going to production. Trigger: `/software-qa-advanced-testing`.
>
> **Out of scope**: Does not write unit/integration tests — use `/software-tester-automate-regression`. Does not triage bugs — use `/software-qa-report-bug`. Does not deploy — use `/software-devops-deploy-release`.
>
> **Activates skills**: `skills/roles/qa/advanced-testing/SKILL.md`, `skills/common/performance-engineering/SKILL.md`, `skills/common/security-audit/SKILL.md`

---

## Step 1 — Load Skills & Define Quality Gates

```
view_file skills/roles/qa/advanced-testing/SKILL.md
view_file skills/common/performance-engineering/SKILL.md
```

Define acceptance thresholds before running any test:

| Metric | Threshold | Tool |
|---|---|---|
| p95 response time | < 2000ms | k6 / JMeter |
| p99 response time | < 5000ms | k6 / JMeter |
| Error rate under load | < 1% | k6 |
| Lighthouse Performance | ≥ 80 | Lighthouse CI |
| Critical vulnerabilities | 0 | OWASP ZAP |
| High vulnerabilities | ≤ 2 (must have mitigation) | OWASP ZAP |

> **Fallback**: If staging environment is unavailable → spin up docker-compose local env and note deviation in report.

---

## Step 2 — Performance & Load Testing

```bash
# k6 load test (30s ramp-up, 100 VUs)
k6 run --vus 100 --duration 60s tests/load/main.js

# Lighthouse CI (web performance)
lhci autorun --config=lighthouserc.js

# JMeter (if k6 unavailable)
jmeter -n -t tests/load/plan.jmx -l results/load-result.jtl -e -o results/load-report/
```

> **Fallback**: If k6 not installed → `npm install -g k6` or use Docker: `docker run -i grafana/k6 run - < tests/load/main.js`

---

## ⏸️ Checkpoint: Performance Gate

```
"Performance results:
- p95: [X]ms (threshold: <2000ms) → [PASS/FAIL]
- Error rate: [X]% (threshold: <1%) → [PASS/FAIL]
- Lighthouse score: [X] (threshold: ≥80) → [PASS/FAIL]

Continue to security testing? (Y / N)"
```

---

## Step 3 — Security Testing (DAST)

```
view_file skills/common/security-audit/SKILL.md
```

```bash
# OWASP ZAP baseline scan
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://staging.yourdomain.com \
  -r reports/zap-report.html

# If ZAP unavailable: use npm audit for dependency scan
npm audit --audit-level=high
```

> **Fallback**: If ZAP cannot reach staging → run `npm audit` + `trivy image <your-docker-image>` as minimum security check.

---

## Step 4 — Analyze & Report

Aggregate all results into `docs/qa/advanced-testing-$(date +%Y%m%d).md`:

```markdown
## Advanced Testing Report — [Date] — [Release Version]

### Performance
- p95: [X]ms → [PASS/FAIL]
- Error rate: [X]% → [PASS/FAIL]
- Lighthouse: [X] → [PASS/FAIL]

### Security
- Critical: [N] | High: [N] | Medium: [N]
- ZAP scan: [PASS/FAIL]

### Verdict
- [ ] All performance gates passed
- [ ] 0 critical vulnerabilities
- [ ] Release CERTIFIED / BLOCKED (reason: ...)
```

---

## ⏸️ Checkpoint: Final Certification

```
"Advanced testing complete.
Verdict: [CERTIFIED / BLOCKED]
Blockers: [list or 'none']

Proceed to release sign-off? (Y / N)"
```

---

## Step 5 — Handoff

- **CERTIFIED** → Trigger `/software-tester-verify-release`
- **BLOCKED** → File bug via `/software-qa-report-bug`, notify team

---

## Done Criteria

- [ ] Quality gates defined before tests run
- [ ] k6/JMeter load test executed with results saved
- [ ] Lighthouse score captured
- [ ] OWASP ZAP or equivalent security scan completed
- [ ] Report saved to `docs/qa/advanced-testing-[date].md`
- [ ] Release verdict: CERTIFIED or BLOCKED with reasons

> **Required Skill**: `skills/roles/qa/advanced-testing/SKILL.md`
