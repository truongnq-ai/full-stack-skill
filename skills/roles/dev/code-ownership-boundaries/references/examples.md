# Examples — Code Ownership Boundaries

## Example 1 — CODEOWNERS File

```text
# .github/CODEOWNERS

# Global fallback — Core Engineering reviews anything unassigned
*                       @org/core-engineering

# Domain-specific ownership
/src/domains/billing/   @org/finance-team
/src/domains/identity/  @org/auth-team
/src/domains/catalog/   @org/product-team

# Infrastructure
/infra/terraform/       @org/devops-team
/docker/                @org/devops-team

# Shared spaces — Architecture Guild guards these
/src/shared/            @org/architecture-guild
/src/design-system/     @org/architecture-guild
```

**Why**: No code exists without an owner. GitHub automatically requests reviews from the correct team when PRs touch their domain.

---

## Example 2 — Domain Boundary Enforcement

**Bad** (Cross-domain leakage):
```typescript
// In the Catalog service — directly reading Billing's database table
const revenue = await db.query('SELECT SUM(amount) FROM billing.invoices WHERE product_id = ?', [productId]);
```

**Good** (API boundary):
```typescript
// In the Catalog service — calling Billing's API
const revenue = await billingService.getRevenueByProduct(productId);
```

**Why**: The Billing team can change their schema without breaking the Catalog service. Domains communicate through contracts, not database tables.
