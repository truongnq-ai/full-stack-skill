---
name: Architecture Audit
description: Protocol for auditing structural debt, logic leakage, and fragmentation across Web, Mobile, and Backend.
metadata:
  labels:
    - architecture
    - tech-debt
    - logic-leakage
    - refactoring
    - code-quality
    - common
    - architecture-audit
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - package.json
      - pubspec.yaml
      - go.mod
      - pom.xml
      - nest-cli.json
    keywords:
      - architecture audit
      - code review
      - tech debt
      - logic leakage
      - refactor
workflow_ref: codebase-review
---

# Architecture Audit

## **Priority: P1 (STANDARD)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

## 📋 Audit Protocol

### 1. Structural Duplication Discovery (Universal)

Identify split sources of truth by searching for redundant directory patterns or naming conventions.

- **Services**: Compare `Service.ts` vs `ServiceNew.ts` vs `ServiceV2.ts`.
- **Versioning**: Check for `/v1`, `/v2` or "Refactor" folders.
- **Action**:
  ```bash
  # Identify potential duplicates or legacy files
  find . -type f -name "*New.*" | sed 's/New//'
  ```

### 2. Logic Leakage Analysis (Ecosystem Specific)

Detect business logic trapped in the wrong layer (e.g., UI layer in apps, Controller layer in APIs).

#### 🌐 Web (React/Next.js/Vue)

- **Action**: `grep -rE "useEffect|useState|useMemo" components --include="*.tsx" | wc -l`
- **Threshold**: If `components/` hook count > 20x `hooks/` folder, architecture is **Monolithic**.

#### 📱 Mobile (Flutter/React Native)

- **Action**: `grep -rE "http\.|dio\.|socket\." lib/widgets --include="*.dart" | wc -l`
- **Threshold**: I/O or state mutation > 5 lines in `build()` is 🟠 High Debt.

#### ⚙️ Backend (NestJS/Go/Spring)

- **Action**: `grep -rE "Repository\.|Query\.|db\." src/controllers --include="*.ts" | wc -l`
- **Threshold**: Controllers must only handle request parsing and response formatting.
## References

- [Examples (Input/Output)](references/examples.md)
