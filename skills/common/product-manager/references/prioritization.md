# Prioritization Guide

## RICE Framework

```
RICE Score = (Reach × Impact × Confidence) / Effort
```

### Factor Definitions

**Reach** — How many users will be affected in one quarter?
- Use data: DAU, MAU, tickets, survey responses
- Raw number, not percentage

**Impact** — How much does it move the needle per user?
| Score | Level | Criteria |
|-------|-------|----------|
| 3 | Massive | Core flow improvement. Will dramatically increase retention/revenue |
| 2 | High | Significant improvement. Clearly moves target metric |
| 1 | Medium | Noticeable improvement. One of several contributing factors |
| 0.5 | Low | Minor improvement. Small percentage of users affected |
| 0.25 | Minimal | Edge case or nice-to-have. Hard to measure |

**Confidence** — How sure are we about Reach and Impact estimates?
| % | Meaning |
|---|---------|
| 100% | Have data, user research, or A/B test results |
| 80% | Strong signal from user interviews or analytics |
| 50% | Gut feeling or anecdotal evidence only |

**Effort** — Total person-weeks across all roles (Design + FE + BE + QA)

### RICE Calculator Example

| Feature | Reach | Impact | Confidence | Effort | RICE Score | Priority |
|---------|-------|--------|-----------|--------|-----------|----------|
| Feature A | 5,000 | 2 | 80% | 3 | **2,667** | 🔴 P0 |
| Feature B | 1,000 | 3 | 50% | 1 | **1,500** | 🟠 P1 |
| Feature C | 10,000 | 0.5 | 100% | 8 | **625** | 🟡 P2 |

Higher RICE = higher priority. Simple rule: sort descending and work top-down.

---

## MoSCoW Framework

Use when RICE data is unavailable or for quick backlog triage:

| Category | Meaning | Criteria |
|----------|---------|---------|
| **Must Have** | Non-negotiable for launch | Without it, the product doesn't work / compliance fails |
| **Should Have** | Important but not critical | High value, product is incomplete without but can ship |
| **Could Have** | Nice-to-have | Positive impact but won't affect success significantly |
| **Won't Have** | Explicitly excluded | Not in scope for this release cycle |

### Rules
- Must Haves should be ≤60% of sprint capacity
- If everything is "Must Have" — you haven't prioritized
- Won't Have = documented scope boundary, not "rejected forever"

---

## Stakeholder Disagreement Protocol

When stakeholders disagree on priorities:

1. **Align on metrics first**: "What metric are we optimizing for this quarter?"
2. **Run RICE together**: Use the same data source for all options
3. **Document trade-offs**: "Choosing A over B means [consequence]"
4. **Escalate if unresolved**: PM + Engineering Lead + Product Head in one meeting, 30 min, decision required
