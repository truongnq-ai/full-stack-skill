---
name: Feature Flag Practice
description: Best practices for implementing, managing, and retiring feature toggles to decouple deployment from release and enable dark launching.
category: roles/dev
metadata:
  labels: [dev, feature-flags, dark-launch, trunk-based, toggles]
  triggers:
    priority: high
    confidence: 0.95
    keywords: [feature flag, toggle, dark launch, feature split, split testing]
---

# ⛳ Feature Flag Practice

> **Use this skill when**: you are building a new feature that will take 3 weeks to finish, but you want to merge your code into `main` every single day to avoid merge conflicts. Trigger: `/dev-feature-flag`.
>
> **Out of scope**: The DevOps infrastructure of hosting a flag evaluation engine (e.g., LaunchDarkly, Unleash). This skill is regarding the developer's integration logic within the application code.

---

## 🚫 Anti-Patterns

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Flag Hoarding** — Leaving a flag in production 2 years after 100% rollout. | Dead code masking as tech debt; state space explodes. |
| **P1** | **Nested Flags** — `if (flagA && flagB && !flagC)`. | State space explodes; impossible to QA all combinations. |
| **P1** | **The Long-Lived Branch** — Keeping `feature/new-checkout` alive for 3 weeks. | 500 merge conflicts when you finally merge. |

---

## 🛠 Prerequisites & Tooling

1. A Feature Flag evaluation SDK (LaunchDarkly, Split.io, or even a simple `process.env`).
2. Trunk-Based Development mindset.

### Required Tools

| Tool | Purpose |
|------|--------|
| `write_to_file` | Create FeatureService abstraction wrapper. |
| `view_file` | Read existing flag usage patterns. |
| `grep_search` | Find all instances of a specific flag to plan cleanup. |
| `run_command` | Verify builds work with flag toggled ON and OFF. |
| `replace_file_content` | Inject flag checks into existing code paths. |

---

## 🔄 Execution Workflow

### Step 1 — Define the Flag Scope
Decide the purpose of the Flag:
- **Release Toggle**: (Short-lived) Used to merge unfinished code into `main` without showing it to the user.
- **Ops Toggle**: (Short-lived) A highly visible killswitch to disable a heavy DB query if the site goes down under load.
- **Experiment Toggle**: (Medium-lived) A/B testing two different UI checkout flows.

### Step 2 — The Abstraction Layer
Never import the third-party Flag SDK directly into every React component or Backend Controller.
Create a local wrapper (`FeatureService.ts`):
```typescript
// Good: Domain-specific phrasing
if (FeatureService.isNewCheckoutEnabled(userContext)) {
  renderNewCheckout();
}
```
*Why?* If you switch from LaunchDarkly to Split.io next year, you only change 1 file.

### Step 3 — Default to False (Safe Fallback)
If the feature flag server goes down or the network times out, what happens?
The SDK MUST fallback to `false` (the legacy stable state). The site should not crash because it cannot reach LaunchDarkly.

### Step 4 — The Tidy-Up Ticket (CRITICAL)
The moment you create a Pull Request introducing a new Feature Flag `enable-v2-api`:
1. Go to Jira.
2. Create a ticket titled: `TECH DEBT: Remove flag enable-v2-api`.
3. Put it in the sprint backlog for exactly 2 weeks after the planned 100% rollout date.
*If you skip this step, the codebase will rot.*

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Boolean Explosion | The new feature requires modifying the DB schema, not just UI toggles | Feature flags cannot easily roll back destructive DB changes. You must use the `Expand and Contract` pattern for DB migrations so both the V1 and V2 code paths can safely read the database simultaneously. |

---

## ✅ Done Criteria / Verification

A Feature Flag implementation is considered mature when:

- [ ] Code is merged to `main` daily without breaking production.
- [ ] A dedicated cleanup ticket is already scheduled in the project management tracker.
- [ ] The flag SDK is abstracted behind a domain-specific interface, not littered as raw strings.
- [ ] Default fallback is `false` (safe/legacy state).
- [ ] No nested flags (max 1 flag per code path).

---

## 📚 References

- [Release Notes Skill](../release-notes/SKILL.md) — Clarifying dark-launched vs released features.
- [Implementation Workflow Skill](../implementation-workflow/SKILL.md) — Trunk-based development with flags.
- [Refactor & Tech Debt Skill](../refactor-techdebt/SKILL.md) — Flag cleanup as tech debt.
- Martin Fowler on Feature Toggles: https://martinfowler.com/articles/feature-toggles.html
- LaunchDarkly best practices: https://launchdarkly.com/blog/best-practices-for-feature-flags/
