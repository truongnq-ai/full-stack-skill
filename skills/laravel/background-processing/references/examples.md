# Examples — Laravel Background Processing (Refined)

## Example 1 — Job Dispatch

**Input**
```php
processOrder($id);
```

**Output**
```php
ProcessOrder::dispatch($id);
```

**Why**
- Offloads heavy work.

---

## Example 2 — Idempotency

**Input**
```php
ProcessInvoice::dispatch($id);
```

**Output**
```php
ProcessInvoice::dispatch($id)->onQueue('billing')->delay(5);
```

**Why**
- Controls execution and retry behavior.
