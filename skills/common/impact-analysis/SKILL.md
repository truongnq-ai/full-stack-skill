---
name: impact-analysis
description: Technical impact analysis standard to assess cross-system risks, breaking changes, and operational hazards before implementation.
---

# 🔍 Technical Impact Analysis Skill

> **Role:** Technical Lead / Senior Engineer
> **Purpose:** To systematically evaluate the blast radius of a proposed technical change *before* it is implemented. This prevents production outages, breaking changes, and subtle regressions.
> **Triggers:** technical design, impact analysis, breaking changes, database migration, architecture review, system design.
> **Priority:** P0 - Mandatory before any structural changes.

## 🚫 Anti-Patterns
When conducting an impact analysis, actively watch out for and avoid these anti-patterns:
- ❌ **Blindly adding columns/indexes to massive tables** without checking for table locks or concurrent index builds.
- ❌ **Ignoring N+1 queries** during code review, assuming "it's fast enough on dev".
- ❌ **Modifying public API endpoints** without considering older mobile app versions that users haven't updated yet.
- ❌ **Assuming a rollback is easy** when a database schema change is involved (without writing a down-migration).


## The 5-Dimension Impact Matrix

Whenever analyzing the impact of a feature or technical task, you **MUST** evaluate all 5 dimensions below:

### 1. API & Contract Impact
Will this change affect upstream clients or downstream services?
- [ ] **Breaking Changes:** Are we changing existing payload structures, removing fields, or altering expected response types?
- [ ] **Versioning:** Do we need to version the API (e.g., `v2`) to preserve backward compatibility?
- [ ] **Events/Webhooks:** Will consumers of our message queues or webhooks receive unexpected payloads?

### 2. Database & State Impact
Will this change introduce data integrity or operational risks?
- [ ] **Schema Migrations:** Does adding/modifying columns require a table lock? Will it cause downtime on large tables?
- [ ] **Data Loss:** Are we dropping columns or changing types in a way that truncates data?
- [ ] **State Corruption:** Can concurrent transactions lead to race conditions with the new logic?

### 3. Security & Privacy Impact
Will this change increase the attack surface?
- [ ] **Authorization (AuthZ):** Does the new endpoint/feature correctly verify user permissions? (e.g., RBAC, tenant isolation).
- [ ] **Data Exposure:** Are we accidentally returning sensitive fields (e.g., passwords, PII) in the API response?
- [ ] **Input Validation:** Is all new external input strictly validated and sanitized against Injection/XSS?

### 4. Performance & Scalability Impact
Will this change degrade system performance under load?
- [ ] **N+1 Queries:** Does the new feature loop through a collection and execute a query per item?
- [ ] **Latency:** Are we adding synchronous blocking calls to external third-party services?
- [ ] **Bundle Size/Client Memory:** (For Frontend/Mobile) Are we importing massive libraries that bloat the app size or cause memory leaks?

### 5. Dependency & Operations Impact
Will this change complicate deployments or environment setups?
- [ ] **Environment Variables:** Does this feature require new `.env` variables? (Must document them for DevOps).
- [ ] **Dependency Conflicts:** Are we introducing a library that conflicts with existing packages?
- [ ] **Rollback Strategy:** If this deployment fails, can we safely revert the code without leaving the database in a broken state?

---

## 🛠️ Output Format: Impact Report

When asked to generate an impact analysis, output a structured report using the format below:

```markdown
## Technical Impact Analysis Report

**1. API & Contract:**
- [Safe / Warning / Blocker]: <Details>

**2. Database & State:**
- [Safe / Warning / Blocker]: <Details>

**3. Security & Privacy:**
- [Safe / Warning / Blocker]: <Details>

**4. Performance & Scalability:**
- [Safe / Warning / Blocker]: <Details>

**5. Dependencies & Operations:**
- [Safe / Warning / Blocker]: <Details>

### 🚨 Critical Risks & Mitigation
- **Risk 1:** <Description>
- **Mitigation:** <How to prevent/resolve>

### 🚦 Conclusion
- **Status:** [GO / NO-GO / NEEDS REVISION]
```

## Rules for Execution
1. **Never Assume Safe:** If you don't know the impact on a specific dimension, flag it as a Warning and ask the user (using `questioning` skill).
2. **Focus on the "Hidden":** Don't just list what the code does; explain what *else* breaks when the code runs.
