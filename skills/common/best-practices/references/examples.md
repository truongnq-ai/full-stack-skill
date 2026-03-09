# Examples — Global Best Practices

## Example 1 — Function Size & Guard Clauses

**Input**
```ts
function processOrder(order) {
  if (order) {
    if (order.items && order.items.length > 0) {
      if (order.user && order.user.isActive) {
        // ... 60 lines of nested logic
      }
    }
  }
}
```

**Output**
```ts
function processOrder(order) {
  if (!order?.items?.length) return;
  if (!order?.user?.isActive) return;
  // ... flat, small focused steps
}
```

**Why**
- Guard clauses reduce nesting and improve readability.
- Smaller functions are easier to test and change.

---

## Example 2 — DRY vs Over-Abstraction

**Input**
```ts
const PRICE_TAX = 0.1;
const SHIPPING_TAX = 0.1;
```

**Output**
```ts
const TAX_RATE = 0.1;
const priceTax = TAX_RATE;
const shippingTax = TAX_RATE;
```

**Why**
- Single source of truth prevents inconsistent updates.
- Naming clarifies intent without duplication.
