# Examples — Handover to QA

## Example 1 — Complete Handover Comment Template

```markdown
## 🏈 QA Handover — JIRA-456: Add Discount Code to Checkout

### Target Environment
- URL: https://staging-v2.example.com
- Build: v2.1.0-rc3 (commit abc123)
- Branch: `feat/JIRA-456-discount-code`

### What Changed (TL;DR)
Added a discount code input field to the checkout page. Supports percentage
and fixed-amount discounts. Invalid codes show an inline error message.

### Where to Focus
1. Cart totals recalculation after applying a discount
2. Error state when entering an expired or invalid code
3. Edge case: applying a discount that makes the total $0.00

### Test Credentials
- User with existing orders: `test-buyer@example.com` / `Test123!`
- Expired discount code: `EXPIRED2025`
- Valid 20% discount code: `SUMMER20`
- Valid $50 fixed discount: `FLAT50`

### Known Blindspots
- ⚠️ Not tested on Firefox — please verify browser compatibility
- ⚠️ Mobile responsive layout not yet styled — desktop only for now
```

**Why**: QA can start testing within 5 minutes instead of spending 2 hours figuring out the environment, test data, and scope.

---

## Example 2 — Staging Verification Before Handover

```bash
# Developer checks staging BEFORE notifying QA
curl -s https://staging-v2.example.com/health | jq .
# Expected: { "status": "ok", "version": "2.1.0-rc3" }

# Verify the new feature endpoint
curl -s -X POST https://staging-v2.example.com/api/cart/discount \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"code": "SUMMER20"}' | jq .
# Expected: { "discount": 20, "type": "percentage" }
```

**Why**: Never hand over a broken staging environment. QA's time is too valuable to waste on deployment issues.
