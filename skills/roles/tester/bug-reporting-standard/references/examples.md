# Examples — Bug Reporting Standard

## Example 1: High Quality Bug Report
```markdown
# [BUG-104] Checkout button disabled for returning users

**Severity**: S2 (High)
**Environment**: Staging (v1.4.2)

### Steps to Reproduce:
1. Log in with a returning user account (`test_user@example.com`).
2. Add "Mechanical Keyboard" to the cart.
3. Navigate to `/cart`.

**Expected**: The 'Proceed to Checkout' button is blue and clickable.
**Actual**: The button is greyed out (`disabled` attribute is present).

**Logs/Evidence**:
- Screenshot attached: `cart_disabled.png`
- Console Error: `TypeError: Cannot read properties of undefined (reading 'loyaltyPoints')`
```