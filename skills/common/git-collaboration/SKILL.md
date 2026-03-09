---
name: Git & Collaboration Standards
description: "🚨 Universal standards for version control, branching, PR workflows, and merge strategies. Never push directly to protected branches."
metadata:
  labels: [git, collaboration, commits, branching]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [commit, branch, merge, pull-request, git]
workflow_ref: deep-security-audit
---

# Git & Collaboration — Enhanced Standards

## **Priority: P1 (OPERATIONAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## Branch Convention (default)

```
main/master     ← production, NEVER push directly
develop         ← integration branch
│
├─ feature/<slug>   e.g. feature/add-export-report
├─ fix/<slug>       e.g. fix/order-null-discount
├─ hotfix/<slug>    e.g. hotfix/payment-timeout
├─ chore/<slug>     e.g. chore/upgrade-dependencies
└─ release/<ver>    e.g. release/2026.03
```

> If project has custom convention → follow project convention, don't invent.

## Commit Messages (Conventional Commits)

- **Format**: `<type>(<scope>): <description>`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- **Atomic**: One commit = One logical change
- **Imperative mood**: "add feature" not "added feature"

## PR Standards

1. Base branch correct: `feature → develop`, `hotfix → main`
2. Title: `<type>(<scope>): <description>`
3. Body required: `Closes #<issue>`, summary, testing steps
4. Don't self-merge in team — wait for reviewer approval
5. Resolve all review comments before merge
6. Keep PRs < 300 lines for effective review

## Merge Strategy (default)

```
feature → develop:  Squash merge
## References

- [Clean Linear History & Rebase Examples](references/CLEAN_HISTORY.md)
- [Examples (Input/Output)](references/examples.md)
