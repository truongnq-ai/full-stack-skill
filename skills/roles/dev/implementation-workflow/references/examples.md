# Examples — Implementation Workflow

## Example 1 — Semantic Commit History

**Bad** (One atomic bomb commit):
```
git log --oneline
abc1234 added feature
```

**Good** (Granular, semantic, reversible):
```
git log --oneline
def7890 feat(checkout): add discount code validation UI
abc6789 feat(api): implement POST /api/cart/discount endpoint
9876543 feat(db): add discount_codes table with migration
8765432 test(checkout): add unit tests for discount calculation
```

**Why**: If the API endpoint introduces a bug, `git revert abc6789` removes only that change without touching the DB migration or UI code.

---

## Example 2 — Safe Staging with git add -p

```bash
# Instead of blindly staging everything:
git add -p

# Git shows each change hunk. You review and selectively stage:
# @@ -10,6 +10,7 @@ export function calculateTotal(items) {
# +  console.log('DEBUG:', items);  ← REJECT this hunk (leftover debug)
#    return items.reduce((sum, i) => sum + i.price, 0);
```

**Why**: `git add .` stages everything including debug logs, IDE config files, and unrelated formatting changes. `git add -p` forces you to review every change.
