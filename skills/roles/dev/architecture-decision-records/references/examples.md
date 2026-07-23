# Examples — Architecture Decision Records

## Example 1 — ADR: Adopt GraphQL for Mobile APIs

```markdown
# ADR-0015: Adopt GraphQL for Mobile API Layer

## Status: Accepted (2026-03-15)

## Context
Mobile app payload sizes average 5MB per screen load over REST endpoints.
70% of the JSON payload is unused fields. Users on 3G networks experience 8-second load times.

## Considered Options
1. **REST + Field Filtering** — Add `?fields=id,name,price` query params. Low effort.
2. **GraphQL** — Client specifies exact data shape. Medium effort.
3. **gRPC** — Binary protocol, very fast. High effort, poor browser support.

## Decision
Adopt **GraphQL** for mobile-facing APIs.

## Rationale
- REST field filtering is fragile and doesn't handle nested relationships well.
- gRPC lacks browser support, blocking our web SPA roadmap.
- GraphQL naturally solves both over-fetching and under-fetching.

## Consequences
- ✅ Payload drops from 5MB to ~800KB per screen.
- ✅ Mobile team controls their data shape without backend changes.
- ❌ Backend team must learn resolver patterns (2-week ramp-up).
- ❌ N+1 query risk without DataLoader — requires performance guardrails.
```

**Why**: Future developers can understand WHY GraphQL was chosen without tribal knowledge or guessing.
