---
name: Feature Flags Management
description: Standard protocols for implementing, toggling, and retiring codebase feature flags to decouple deployment from release.
category: roles/devops
metadata:
  labels: [devops, release-management, feature-flags, dark-launch, trunk-based]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [feature flag, toggle, dark launch, decouple release, trunk based]
---

# 🚩 Feature Flags Management

> **Use this skill when**: you need to deploy incomplete code to Production (Dark Launching) safely, or empower Product Managers to turn features on/off without waiting for a DevOps CI/CD run. Trigger: `/devops-feature-flags`.
>
> **Out of scope**: This is NOT for environment variables (`DB_URL`). Environment vars configure the App instance. Feature Flags dynamically route code paths mid-runtime for specific users.

---

## 🚫 Anti-Patterns

- **Forever Flags**: Leaving `flag_new_header_v2` in the codebase for 3 years. It creates unmaintainable branching logic and tech debt.
- **Frontend-Only Security**: Hiding the "Delete" button in the React UI via a Feature Flag, but forgetting to put the Feature Flag check on the Node.js API endpoint.
- **The Flag Collision**: Naming flags `flag_test_1` instead of specific namespaces `flag_auth_oauth_google_beta`, causing teams to overwrite each other.

---

## 🛠 Prerequisites & Tooling

1. A Feature Flag engine (e.g., LaunchDarkly, Unleash, or a Redis-backed DB table).
2. Trunk-Based development branching strategy.

---

## 🔄 Execution Workflow

### Step 1 — Implementation (The Code Wrap)
When a Developer writes a new feature, wrap the entry point in a flag matrix.
```typescript
if (flagService.isEnabled('checkout_stripe_v2', user.id)) {
    return processStripeV2(cart);
} else {
    return processLegacy(cart);
}
```

### Step 2 — Deployment (The Dark Launch)
DevOps merges the PR and deploys the code to Production.
The flag `checkout_stripe_v2` is set to `FALSE` system-wide.
*Code is Deployed, but the Feature is not Released.*

### Step 3 — The Release (The PM Toggle)
When Marketing aligns, the PM logs into the Flag Dashboard and sets `checkout_stripe_v2 = TRUE` for Internal QA users only.
If successful, the PM clicks "Enable for 10% of Global Users".
The feature goes live instantly without a 15-minute Docker rebuild.

### Step 4 — The Emergency Killswitch (Rollback)
If Datadog alerts that `Stripe V2` is returning 500s, the On-Call Engineer clicks `FALSE` on the flag.
Resolution time: 1 second. No Git Reverts required.

### Step 5 — Tech Debt Pruning (Crucial)
Once the flag hits 100% adoption and runs cleanly for 2 weeks:
Create a mandatory Jira ticket for the Developer: "Remove `checkout_stripe_v2` flag logic".
The Developer deletes the `if/else`, leaving only `processStripeV2()`, and removes the flag from the Dashboard.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Flag Server Outage | LaunchDarkly API goes down | The code must be written with a safe default fallback. E.g., `flagService.isEnabled(id, { default: false })`. Never crash the app if the flag network request fails. |
| DB Schema Flags | You want to feature flag a new Postgres Column | Highly dangerous. Flags are meant for Code, not State. Only use Feature flags for routing application logic. Deploy the DB Column weeks in advance independently. |

---

## ✅ Done Criteria / Verification

A Feature Flag lifecycle is complete when:

- [ ] New code is safely deployed to Production totally dormant.
- [ ] Safe-defaults prevent catastrophic failure if the Flag Engine loses connectivity.
- [ ] A tracked deprecation ticket exists to delete the flag after 100% rollout is finalized.
