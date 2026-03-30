---
name: Release Notes Writing
description: Developer guidelines for drafting clear, customer-centric (or stakeholder-centric) summaries of technical changes.
category: roles/dev
metadata:
  labels: [dev, release-notes, changelog, documentation, communication]
  triggers:
    priority: low
    confidence: 0.9
    keywords: [release notes, write changelog, document release, what changed]
---

# 📝 Release Notes & Changelogs

> **Use this skill when**: you have finished a feature or fixed a bug and must explicitly describe the delta to non-technical stakeholders (PO, CS, Marketing) or end users. Trigger: `/dev-release-notes`.
>
> **Out of scope**: Creating the technical deployment architecture document (`devops/release-strategy/SKILL.md`). This is purely about the *human-readable text* explaining the software changes.

---

## 🚫 Anti-Patterns

- **The Git Log Dump**: Copy/pasting raw git commit messages into the release notes (`fix: off-by-one error in util`, `chore: bump webpack`). The user has no idea what that means.
- **The Undersell**: Fixing a massive 5-year-old architectural bottleneck that speeds up the app by 400%, and writing: "Backend improvements."
- **Over-promising**: Documenting a feature as "Released" when it is currently hidden behind a 1% Feature Flag dark-launch.

---

## 🛠 Prerequisites & Tooling

1. The project's merged PRs or Jira ticket scope.
2. Standard `KeepAChangelog` format.

---

## 🔄 Execution Workflow

### Step 1 — Audience Alignment
Determine who is reading this:
- *Internal Notes (For QA/Support)*: Must include Jira IDs, affected microservices, and known "quirks" to look out for.
- *External Notes (For App Store / Users)*: Must focus exclusively on *value delivered*. 

### Step 2 — Categorization (Keep a Changelog Format)
Group the changes logically. Do not present a random bulleted list.
- **🚀 New Features** (User-facing additions)
- **✨ Enhancements** (Improvements to existing UI/UX)
- **🐛 Bug Fixes** (Pest control)
- **🛡️ Security** (Patches)
- **⚠️ Breaking Changes** (Crucial: Changes to API payloads or removed features).

### Step 3 — The "Value" Translation
Translate Developer-speak into User-speak.
- *Dev-speak*: "Migrated `carts` table from Postgres to DynamoDB to reduce locking."
- *User-speak*: "Shopping Cart checkouts are now blazingly fast during high-traffic flash sales."
- *Dev-speak*: "Fixed NullPointerException in `ReportGenerator.java`."
- *User-speak*: "Fixed a crash that occurred when generating PDF reports with empty date fields."

### Step 4 — Visuals Win
If it is a major UI enhancement, the Release Note should include a GIF, a before/after screenshot, or a link to a 60-second Loom video demonstrating the new behavior.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Missing Context | A developer merges a PR titled "Fix bug" with zero description, and you are assigned to write the Release Notes | Enforce Code Review Etiquette. Reject the PR. Every PR must have a Human-readable Summary attached to it automatically feeding the Release Note generator. |

---

## ✅ Done Criteria / Verification

Release notes are complete when:

- [ ] They are segmented into standard categories (Features, Fixes, Breaking).
- [ ] Technical jargon is translated into explicit user or business value.
- [ ] Breaking changes (especially for APIs) contain explicit migration instructions for the consumer.
