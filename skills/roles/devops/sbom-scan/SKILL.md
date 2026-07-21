---
name: DevOps SBOM Scan
url: https://github.com/truongnq-ai/full-stack-skill/tree/master/skills/roles/devops/sbom-scan
description: Supply chain scanning and SBOM checks.
category: roles
metadata:
  labels: [devops, security, sbom]
  triggers:
    priority: medium
    confidence: 0.7
    keywords: [sbom, scan, supply chain]
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
- Scan images before deploy.
- Block critical vulnerabilities.

## References
- [Examples (Input/Output)](references/examples.md)

## Anti-Patterns
- Generating SBOMs but never analyzing them for vulnerabilities.
- Not integrating SBOM generation into the build pipeline.
- Ignoring transitive dependencies in the SBOM.

## Tools
- Syft, Grype
- Trivy
- Dependency-Track

## Verification
- Generate an SBOM for an image and verify its contents.
- Run a vulnerability scan against the SBOM.
- Check that the SBOM is signed and stored securely.
