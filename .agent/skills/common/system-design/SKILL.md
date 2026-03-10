---
name: System Design & Architecture Standards
description: Universal architectural standards for building robust, scalable, and maintainable systems. Activates during architecture decisions, new service design, or system decomposition.
metadata:
  labels: [system-design, architecture, scalability, reliability, distributed-systems]
  triggers:
    files: ['docs/architecture/**', 'docs/adr/**', 'ARCHITECTURE.md', 'system-design.md']
    keywords: [architecture, design system, scalability, microservice, event-driven, distributed, CAP theorem, design doc, hexagonal, clean architecture]
    negative: ["user asks to write component code — use relevant framework skill", "user asks for DB schema — use db-workflow"]
---

# System Design & Architecture Standards

## **Priority: P0 (FOUNDATIONAL)**

**This skill does NOT**: design individual components or write code — use framework-specific skills for that. Does not cover DB schema design directly — use `db-workflow`.

**Compatible skills**: `documentation` (for ADRs), `security-standards` (threat modeling), `performance-engineering` (scalability review), `db-workflow` (data layer).

## Architectural Principles

- **SoC (Separation of Concerns)**: Each module has one reason to change.
- **SSOT (Single Source of Truth)**: One authoritative source per data domain. Reference, don't duplicate.
- **Fail Fast**: Surface errors immediately, not silently.
- **Graceful Degradation**: Core path functional even when secondary services fail.

## Modularity & Coupling

- **High Cohesion**: Related functionality in one module.
- **Loose Coupling**: Communicate through interfaces, events, or contracts — not concrete implementations.
- **DI (Dependency Injection)**: Inject dependencies. Never hardcode service instantiation.

> **Fallback**: If no DI framework available, use factory pattern as minimum coupling layer.

## Architecture Patterns

| Pattern | Use When | Avoid When |
|---------|----------|------------|
| Layered | CRUD apps, standard web APIs | Real-time, event-heavy systems |
| Event-Driven | Async workflows, decoupled domains | Simple CRUD with synchronous needs |
| Clean/Hexagonal | Domain logic must be framework-independent | Simple scripts or small CLIs |
| Stateless | Horizontal scaling required | Session-heavy, stateful interactions |

## Distributed Systems

- **CAP Trade-off**: Choose Consistency or Availability under Partition (not both).
- **Idempotency**: Design all mutation endpoints to be safe to retry.
- **Circuit Breaker**: Fail fast on downstream failures. Never wait indefinitely.
- **Eventual Consistency**: Design UI and downstream consumers to tolerate async data sync.

> **Fallback**: If circuit breaker library unavailable, use retry with exponential backoff + max attempts.

## Documentation

- Write design doc in `docs/architecture/` BEFORE creating major new services.
- Save architectural decisions as ADRs: `docs/adr/YYYY-MM-DD-decision.md`.
- Use `view_file` on existing ADRs before creating new ones to avoid contradictions.
- Version APIs and schemas for backward compatibility from day 1.

## 🚫 Anti-Patterns

**`No God Classes`**: Split classes with >3 responsibilities into focused modules.

**`No Hardcoded Dependencies`**: Use DI or factory. Never `new ServiceImpl()` inside business logic.

**`No Sync Blocking in Distributed`**: All cross-service calls must be async with timeout.

**`No Code Before Design Doc`**: Write decision doc first for any new service or major refactor.

**`No Breaking Schema Changes`**: Additive changes only. Mark deprecated fields, never delete immediately.

## ✅ Verification Checklist

- [ ] Design doc or ADR written and saved to `docs/adr/`
- [ ] Each module has single responsibility (SRP validated)
- [ ] All service boundaries communicate via interface/contract
- [ ] Idempotency confirmed for mutation endpoints
- [ ] Failure scenario documented (what degrades gracefully vs. fails hard)

## 📚 References

- [Documentation Standards](../documentation/SKILL.md)
- [Security Standards](../security-standards/SKILL.md)
