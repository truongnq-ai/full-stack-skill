---
name: Code Ownership Boundaries
description: Enforces explicit responsibility domains across a monolithic or multifaceted codebase using designated code owners, preventing "Tragedy of the Commons" degradation.
category: roles/dev
metadata:
  labels: [dev, ownership, codeowners, boundary, module]
  triggers:
    priority: medium
    confidence: 0.95
    keywords: [code ownership, codeowners, who owns this, module boundaries]
---

# 🛡️ Code Ownership Boundaries

> **Use this skill when**: a repository grows beyond a single team, and there is confusion over who is allowed to approve PRs for a specific directory, or who gets paged when a module crashes. Trigger: `/dev-setup-codeowners`.
>
> **Out of scope**: This is a purely architectural boundaries and git governance skill. It does not dictate how to write the code itself.

---

## 🚫 Anti-Patterns

- **Tragedy of the Commons**: A shared `src/utils/` folder that everyone throws garbage into because "nobody owns it", turning it into a 5,000-line dumping ground.
- **The Lone Wolf Silo**: One developer secretly owns the entire Payment processing folder and requires their explicit God-approval, blocking updates when they go on vacation.
- **Cross-Domain Leakage**: The Frontend team directly querying the Database via Next.js server components without going through the Backend team's isolated domain logic.

---

## 🛠 Prerequisites & Tooling

1. `CODEOWNERS` GitHub/GitLab mechanism integrated into the repository.
2. Defined Teams mapped in the Version Control system (e.g., `@org/backend-auth`).

---

## 🔄 Execution Workflow

### Step 1 — Define the Abstract Boundaries
Audit the repository structure. Organize by Domain, not by Technology.
- *Bad*: `src/controllers`, `src/views`, `src/models`
- *Good*: `src/domains/billing`, `src/domains/identity`
Explicitly delineate boundaries. Billing CANNOT directly read Identity's database tables. It must call Identity's internal API surface.

### Step 2 — Implement formal `CODEOWNERS`
Create a `.github/CODEOWNERS` file at the root.
Map strict directory paths to formal Teams (never individual people, to avoid the Bus Factor).
```text
# Global fallback
*                   @org/core-engineering

# Domain specific
/src/billing/       @org/finance-team
/src/identity/      @org/auth-team
/infra/terraform/   @org/devops-team
```

### Step 3 — Enforce the Gate
Configure Branch Protection Rules.
Check the box for: `Require review from Code Owners`.
If a Mobile developer submits a PR that touches `#auth-team` logic, it physically cannot merge until a member of `#auth-team` approves the logic shift.

### Step 4 — Define Shared Spaces
Spaces like `src/design-system` or `src/common/types` are inherently shared.
Designate an overarching "Architecture Guild" or "Core Team" to be the strict owner of these directories to violently guard against feature-bloat entering the common utility folders.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Ownership Blockade | Auth Team is entirely offline and a SEV-1 PR needs to merge | Allow Organization Admins to bypass branch protection during active SEV-1 incidents. Document the bypass explicitly in the Incident RCA. |
| The Orphaned Code | A team is dissolved, leaving `src/legacy-domain` with no owner | Code cannot exist without a master. Reassign ownership immediately to the closest sibling team, or schedule the module for absolute deprecation and deletion. |

---

## ✅ Done Criteria / Verification

Code Ownership is structurally sound when:

- [ ] Every directory in the application maps to a declared Team in the `CODEOWNERS` file.
- [ ] PRs modifying external domains automatically ping the required domain-experts for review.
- [ ] Direct database or state-store cross-reads across domains are strictly prohibited in the Architecture code reviews.
