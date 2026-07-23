# Examples — Release Notes

## Example 1 — Internal vs External Release Notes

**Internal (For QA/Support)**:
```markdown
## v2.4.0 — Internal Release Notes (2026-07-23)

### Changes
- [JIRA-456] Added discount code field to checkout (affects `CartService`, `OrderController`)
- [JIRA-789] Fixed NullPointerException in `ReportGenerator.java` when date range is empty
- [JIRA-101] Migrated `carts` table from Postgres to DynamoDB

### Known Quirks
- ⚠️ DynamoDB migration may cause ~500ms latency spike for first 10 minutes after deploy
- ⚠️ Discount codes are NOT retroactive — existing orders are unaffected
```

**External (For Users/App Store)**:
```markdown
## What's New in v2.4.0 🎉

### 🚀 New Features
- **Discount Codes**: Save money at checkout! Enter a promo code to get exclusive discounts.

### ✨ Improvements
- **Faster Checkout**: Cart loading is now 3x faster during flash sales.

### 🐛 Bug Fixes
- Fixed a crash when generating PDF reports with empty date fields.
```

**Why**: Internal notes include Jira IDs, affected services, and quirks. External notes translate technical changes into user value.

---

## Example 2 — Breaking Change Documentation

```markdown
## ⚠️ Breaking Changes

### `GET /api/v1/users` — Response format change

**Before (v1)**:
```json
{ "first_name": "John", "last_name": "Doe" }
```

**After (v2)**:
```json
{ "name": { "first": "John", "last": "Doe" } }
```

**Migration**: Update your client code to read `response.name.first` instead of `response.first_name`. The v1 endpoint will be deprecated on 2027-01-01.
```

**Why**: API consumers need explicit migration instructions, not just "we changed the response format."
