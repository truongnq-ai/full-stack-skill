# Examples — PR Checklist

## Example 1 — Good vs Bad PR Titles

| ❌ Bad | ✅ Good |
|--------|---------|
| "updates" | `feat(auth): enable Google OAuth login` |
| "fixed stuff" | `fix(cart): prevent negative quantity on checkout` |
| "WIP" | `refactor(api): migrate orders endpoint to v2 contract` |

---

## Example 2 — PR Description Template

```markdown
## Summary
Adds Google OAuth login flow. Users can now sign in with their Google account
in addition to email/password.

## Ticket
Resolves #AUTH-123

## Changes
- Added `GoogleAuthService` with token verification
- Added `POST /api/auth/google` endpoint
- Updated login UI with "Sign in with Google" button
- Added unit tests for token validation edge cases

## Screenshots
![Google OAuth Login Button](screenshot-google-login.png)

## Testing Notes
- Test with a real Google account on staging
- Verify that existing email/password login still works
- Check: what happens if the Google API is unreachable?
```

**Why**: The reviewer instantly understands the scope, purpose, and risk areas without reading every line of code first.

---

## Example 3 — Proactive Inline Comments

On your OWN PR, add clarifying comments:
```
// I chose a `for` loop here instead of `.reduce()` because
// profiling showed reduce is 10x slower for arrays over 50k items.
// See benchmark: https://jsben.ch/...
```

**Why**: This prevents the reviewer from leaving a [NIT] comment asking "Why not use reduce?" — saving one round-trip.
