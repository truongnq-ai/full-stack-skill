# Examples — Unit Test Best Practices

## Example 1 — Arrange-Act-Assert Pattern

```typescript
describe('calculateTax', () => {
  it('should return 5% tax for Virginia residents', () => {
    // Arrange
    const order = { subtotal: 100.00, state: 'VA' };
    
    // Act
    const result = calculateTax(order);
    
    // Assert
    expect(result.tax).toBe(5.00);
    expect(result.total).toBe(105.00);
  });
});
```

---

## Example 2 — Mocking External Dependencies

```typescript
describe('OrderService.create', () => {
  it('should create order even when Stripe returns a delayed response', () => {
    // Arrange — Mock the payment gateway
    const mockStripe = jest.spyOn(paymentService, 'charge')
      .mockResolvedValue({ transactionId: 'txn_123', status: 'success' });
    
    // Act
    const order = await orderService.create({ items: [{ id: 'p1', qty: 2 }] });
    
    // Assert
    expect(order.status).toBe('confirmed');
    expect(mockStripe).toHaveBeenCalledWith(expect.objectContaining({ amount: 49.98 }));
  });
});
```

**Why**: The test verifies YOUR business logic, not whether Stripe's API is online.

---

## Example 3 — Edge Case Testing (BVA)

```typescript
describe('applyDiscount', () => {
  it('should apply 0% discount for orders below $50', () => {
    expect(applyDiscount(49.99)).toBe(49.99);
  });
  
  it('should apply 10% discount for orders at exactly $50', () => {
    expect(applyDiscount(50.00)).toBe(45.00);
  });
  
  it('should handle zero gracefully', () => {
    expect(applyDiscount(0)).toBe(0);
  });
  
  it('should reject negative amounts', () => {
    expect(() => applyDiscount(-10)).toThrow('Amount must be positive');
  });
  
  it('should handle null input without crashing', () => {
    expect(() => applyDiscount(null as any)).toThrow();
  });
});
```

**Why**: Testing boundaries (0, 50, negative, null) catches 80% of production bugs that happy-path-only tests miss.
