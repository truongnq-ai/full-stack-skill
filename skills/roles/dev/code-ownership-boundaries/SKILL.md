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

| ID | Anti-Pattern | Why It's Dangerous |
|----|---|---|
| **P0** | **Cross-Domain Leakage** — Frontend directly querying the Database bypassing Backend domain logic. | Breaks encapsulation; changes cascade unpredictably. |
| **P1** | **Tragedy of the Commons** — Shared `src/utils/` with no owner becomes a 5,000-line dump. | Quality degrades; no one takes responsibility. |
| **P1** | **The Lone Wolf Silo** — One developer requires God-approval for all changes in their domain. | Bus factor = 1; team blocked during vacations. |

---

## 🛠 Prerequisites & Tooling

1. `CODEOWNERS` GitHub/GitLab mechanism integrated into the repository.
2. Defined Teams mapped in the Version Control system (e.g., `@org/backend-auth`).

### Required Tools

| Tool | Purpose |
|------|--------|
| `write_to_file` | Create/update `.github/CODEOWNERS` file. |
| `view_file` | Read existing CODEOWNERS and repository structure. |
| `list_dir` | Audit repository directories for boundary mapping. |
| `grep_search` | Find cross-domain imports that violate boundaries. |
| `call_mcp_tool` → `github/get_file_contents` | Read CODEOWNERS from remote repository. |

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
- [ ] Shared spaces (`utils/`, `common/`) have designated Architecture Guild ownership.
- [ ] No orphaned directories without owners.

---

## 📚 References

- [Architecture Decision Records](../architecture-decision-records/SKILL.md) — Documenting boundary decisions.
- [Design Review Checklist Skill](../design-review-checklist/SKILL.md) — Reviewing domain boundaries.
- [API Contract Skill](../api-contract/SKILL.md) — Cross-domain communication contracts.
- GitHub CODEOWNERS docs: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- "Team Topologies" by Skelton & Pais — Team interaction modes.
