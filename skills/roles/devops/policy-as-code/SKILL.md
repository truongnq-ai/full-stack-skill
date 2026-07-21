---
name: DevOps Policy as Code
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/policy-as-code
description: Enforce policies using OPA/Conftest.
category: roles
metadata:
  labels: [devops, policy, compliance]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [policy as code, opa, conftest]
workflow_ref: deep-security-audit
---

## **Priority: P1 (OPERATIONAL)**

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

## Core Rules
- Block non‑compliant configs.
- Version policies.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Enforcing policies only at runtime instead of in the CI/CD pipeline.
- Writing policies that are too restrictive, hindering developer productivity.
- Lack of a centralized policy repository.

## Tools
- Open Policy Agent (OPA)
- Kyverno
- Checkov
- HashiCorp Sentinel

## Verification
- Run policy checks against configuration files.
- Attempt to deploy a non-compliant resource and verify it is blocked.
- Audit policy execution logs.
