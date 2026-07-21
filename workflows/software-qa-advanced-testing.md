---
description: "In-depth testing before release: Load test, Stress test, and Security test."
---
# QA: Advanced Testing

> **Trigger**: Use before a major release to certify performance and security gates.
> **Tools**: 
un_command (k6, JMeter), security scanners (ZAP).

## Step 1 - Performance and Load Testing
Run predefined load test scripts against the staging environment.
- **Skills**: skills/roles/tester/performance-testing/load-testing/SKILL.md, skills/roles/tester/performance-testing/stress-testing/SKILL.md
- **Fallback**: If environment lacks capacity, scale down the test profile and note it in the report.

## Step 2 - Security Testing
Execute basic dynamic application security testing (DAST).
- **Skills**: skills/roles/tester/security-testing/SKILL.md

## Step 3 - Quality Assurance Checkpoint
Evaluate results against acceptable thresholds (Quality Gates).
- **Skills**: skills/roles/tester/quality-assurance/SKILL.md
- **Checkpoint**: Present the metrics. Require manual user approval if any metric is borderline.

## Step 4 - Certification
- **Exit Criteria**: Load profile succeeded, no critical vulnerabilities found, and release is certified.

> **Required Skill**: [advanced-testing](file:///D:/GitHub/skill/full-stack-skill/skills/roles/qa/advanced-testing/SKILL.md)
