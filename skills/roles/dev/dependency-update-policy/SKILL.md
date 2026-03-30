---
name: Dependency Update Policy
description: Protocols for managing, isolating, and validating updates to external third-party libraries without breaking production systems.
category: roles/dev
metadata:
  labels: [dev, dependencies, updates, maintenance, tech-debt]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [update dependencies, bump versions, npm install, upgrade libraries]
---

# 📦 Dependency Update Policy

> **Use this skill when**: performing maintenance on `package.json`, `go.mod`, `pom.xml`, or `requirements.txt`. Trigger: `/dev-update-deps`.
>
> **Out of scope**: Reacting instantly to a Critical Zero-Day CVE trigger. (For emergency security patches, use `roles/devops/security/vulnerability-scanning/SKILL.md`). This skill governs routine maintenance.

---

## 🚫 Anti-Patterns

- **The Yolo Bump**: Running `npm update` locally, throwing all 45 updated libraries into a single massive PR, and clicking merge hoping the E2E tests catch everything.
- **Stagnation Fear**: Never updating dependencies because "it works right now." Three years later, you need to upgrade Node.js, and the resulting leap across 15 major versions breaks the entire application irreparably.
- **Ignoring the Changelog**: Upgrading a Major version (e.g., `v2` to `v3`) without reading the library's release notes, completely oblivious to renamed functions or deprecated APIs.

---

## 🛠 Prerequisites & Tooling

1. Heavy reliance on `roles/qa/regression-testing/SKILL.md`. (You cannot safely update dependencies without a high-coverage test suite).
2. Automated dependency trackers (e.g., GitHub Dependabot, Renovate).

---

## 🔄 Execution Workflow

### Step 1 — Automated Isolation (The Bot Rule)
Never group unrelated dependency updates into the same PR.
If `lodash` and `react` both have updates, they must be two distinct branches. If the master branch later breaks, you need to know exactly *which* library caused the issue to `git revert` cleanly. 
*Configure Dependabot to manage this automatically.*

### Step 2 — Triage by Semantic Versioning (SemVer)
Evaluate the scope of the update before approving:
- **Patch (`1.0.1 -> 1.0.2`)**: Bug fixes. Very low risk. Auto-merge if Unit Tests pass.
- **Minor (`1.0.0 -> 1.1.0`)**: New features, backwards compatible. Medium risk. Run full E2E Regression.
- **Major (`1.0.0 -> 2.0.0`)**: Breaking API changes. High risk. Mandates developer intervention.

### Step 3 — Handling Major Bumps
For Major version leaps:
1. Halt. Locate the library's official `CHANGELOG.md` or Migration Guide.
2. Formally search (`grep`) your entire codebase for the deprecated bindings.
3. Apply the necessary code refactors in the *same PR* as the version bump.
4. Manually trigger a QA sanity check.

### Step 4 — Lockfiles are Sacred
Never delete `package-lock.json` or `yarn.lock` to "fix an installation issue".
The lockfile guarantees deterministic builds across the entire team and the CI environment. Commit the updated lockfile generated strictly by the specific tracked update.

---

## ⚠️ Errorয়াল Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Abandoned Library | A core library hasn't been updated by its author in 4 years and stops compiling on new OS versions | Initiate a formal tech-debt extraction sprint. Rip out the library and replace it with a modernized, maintained alternative. |
| The Transitive Break | Library A relies on Library B. B releases a broken patch that crashes your app | Pin the transitive dependency manually in `package.json` utilizing the `resolutions` or `overrides` block to force Library A to use an older, stable version of Library B until the upstream author fixes it. |

---

## ✅ Done Criteria / Verification

A Dependency Update operation is successful when:

- [ ] Major, Minor, and Patch bumps are treated with mathematically distinct risk profiles.
- [ ] Updates are deployed via isolated atomic PRs (One library per PR).
- [ ] The application successfully compiles and passes 100% of the regression test suite.
