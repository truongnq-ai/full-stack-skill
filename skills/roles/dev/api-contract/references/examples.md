# Examples — API Contract

## Example 1 — OpenAPI 3.0 Contract for Order Endpoint

**Scenario**: Backend and Frontend teams need to agree on the `POST /api/v2/orders` endpoint before coding.

```yaml
openapi: 3.0.3
info:
  title: E-Commerce API
  version: 2.0.0
paths:
  /api/v2/orders:
    post:
      summary: Create a new order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [items, shippingAddressId]
              properties:
                items:
                  type: array
                  items:
                    type: object
                    required: [productId, quantity]
                    properties:
                      productId: { type: string, format: uuid }
                      quantity: { type: integer, minimum: 1 }
                shippingAddressId: { type: string, format: uuid }
                discountCode: { type: string, maxLength: 20 }
      responses:
        '201':
          description: Order created
          content:
            application/json:
              schema:
                type: object
                properties:
                  orderId: { type: string, format: uuid }
                  total: { type: number, format: float }
                  status: { type: string, enum: [pending, confirmed] }
        '400':
          description: Validation error
        '409':
          description: Insufficient stock
```

**Why**: Both Frontend and Backend can work in parallel — FE uses a mock server with this spec, BE implements the logic to match the contract.

---

## Example 2 — Anti-Corruption Layer for Vendor API

**Scenario**: A payment vendor changes their XML response format. Your contract remains stable.

```typescript
// adapters/PaymentAdapter.ts — shields your app from vendor changes
class PaymentAdapter {
  async processPayment(amount: number): Promise<PaymentResult> {
    const vendorResponse = await vendorApi.charge(amount); // Messy XML
    return {
      transactionId: vendorResponse.txn_ref ?? vendorResponse.transaction_id,
      status: this.mapStatus(vendorResponse.result_code),
      amount: Number(vendorResponse.charged_amount),
    };
  }
}
```

**Why**: When the vendor changes their API (and they will), only the adapter changes. Your internal contract stays pristine.
