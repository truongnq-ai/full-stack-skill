# Examples — Refactor & Tech Debt

## Example 1 — Characterization Tests Before Refactoring

**Scenario**: Legacy `calculateShipping()` function is 300 lines with 15 nested if-else branches. You need to refactor it to a Strategy pattern.

**Step 1**: Write characterization tests capturing current behavior:
```typescript
describe('calculateShipping (characterization)', () => {
  it('domestic standard: 5kg package to CA', () => {
    expect(calculateShipping({ weight: 5, destination: 'CA', type: 'standard' })).toBe(12.50);
  });
  it('international express: 2kg to UK', () => {
    expect(calculateShipping({ weight: 2, destination: 'UK', type: 'express' })).toBe(45.00);
  });
  it('free shipping: order over $100 domestic', () => {
    expect(calculateShipping({ weight: 1, destination: 'NY', type: 'standard', orderTotal: 150 })).toBe(0);
  });
  // ... 10+ cases covering all branches
});
```

**Step 2**: Refactor to Strategy pattern. Run the SAME tests. They must ALL pass.

**Why**: If any test fails after refactoring, you've changed external behavior — that's a bug, not a refactor.

---

## Example 2 — The Boy Scout Rule

**Before** (touching this file for a bug fix):
```typescript
function processOrder(o: any) {
  var x = o.items;
  var t = 0;
  for (var i = 0; i < x.length; i++) {
    t = t + x[i].p * x[i].q;
  }
  return t;
}
```

**After** (fix the bug AND clean the campground):
```typescript
function calculateOrderTotal(order: Order): number {
  return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
}
```

**Why**: Small, iterative cleanups during normal tickets prevent the need for massive "stop the world" refactoring sprints.
