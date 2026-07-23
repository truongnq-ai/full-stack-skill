# Examples — Dependency Update Policy

## Example 1 — SemVer Triage Decision Tree

```
npm outdated output:
┌──────────────┬─────────┬────────┬────────┐
│ Package      │ Current │ Wanted │ Latest │
├──────────────┼─────────┼────────┼────────┤
│ lodash       │ 4.17.20 │ 4.17.21│ 4.17.21│  → PATCH (auto-merge if tests pass)
│ express      │ 4.18.0  │ 4.19.0 │ 4.19.0 │  → MINOR (run full E2E, then merge)
│ react        │ 17.0.2  │ 17.0.2 │ 18.3.1 │  → MAJOR (manual migration required)
└──────────────┴─────────┴────────┴────────┘
```

**Action**: Create 3 separate PRs, one per library. Never bundle unrelated updates.

---

## Example 2 — Pinning a Broken Transitive Dependency

**Scenario**: `axios@1.6.0` depends on `follow-redirects@1.15.4` which has a memory leak.

```json
// package.json — Force a safe version of the transitive dependency
{
  "overrides": {
    "follow-redirects": "1.15.3"
  }
}
```

**Why**: You can't wait for the `axios` maintainer to update their dependency. Pin the transitive fix immediately, and create a reminder ticket to remove the override when `axios` releases a patched version.

---

## Example 3 — Major Version Migration Checklist

For `react@17` → `react@18`:
1. Read the official [React 18 Migration Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
2. `grep -r "ReactDOM.render" src/` — Find deprecated API usages
3. Replace with `createRoot` API
4. Run full E2E suite
5. Test in staging for 48 hours before production
