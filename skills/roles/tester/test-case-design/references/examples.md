# Examples — Test Case Design

## Example 1: Boundary Value Analysis (BVA)
**Requirement**: Password must be 8-20 characters long.
**Tests Created**:
1. `length = 7` (Invalid)
2. `length = 8` (Valid - Lower Boundary)
3. `length = 15` (Valid - Nominal)
4. `length = 20` (Valid - Upper Boundary)
5. `length = 21` (Invalid)

## Example 2: Decision Tables
**Rules**: Free shipping IF (Total > $50) AND (Customer = VIP).
**Tests Created**:
- T1: Total = $60, VIP = Yes -> Free Shipping.
- T2: Total = $60, VIP = No -> Standard Shipping.
- T3: Total = $40, VIP = Yes -> Standard Shipping.