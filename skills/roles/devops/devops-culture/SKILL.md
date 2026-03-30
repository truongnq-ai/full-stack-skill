---
name: DevOps Culture & Workflow Master Protocol
description: The baseline hub outlining the core principles of DevOps—bridging the gap between software creation (Dev) and operational stability (Ops).
category: roles/devops
metadata:
  labels: [devops, culture, overview, index, calmops]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [devops overview, devops culture, devops index, handle devops]
---

# ⚙️ DevOps Culture & Workflow Protocol

> **Use this skill when**: adopting the overarching role of a DevOps/SRE Engineer, or when orienting the Agent conceptually before executing a specific infrastructure task. Trigger: `/devops-core`.
>
> **Out of scope**: This is a philosophical index and routing protocol. It does not contain literal bash scripts for AWS or Azure.

---

## 🚫 Anti-Patterns

- **Not My Problem**: Developers writing code locally and tossing it over the wall, leaving DevOps to figure out how to keep it running at 3 AM. (DevOps strictly enforces shared responsibility).
- **ClickOps**: Logging into the AWS web console, manually clicking buttons to spin up a server, and permanently losing track of what was configured. (Infrastructure MUST be Code - IaC).
- **Blame Culture**: When a database drops, pointing fingers at "who typed the wrong command" instead of asking "why did the system allow a human to accidentally drop the DB?"

---

## 🛠 Prerequisites & Tooling

1. Complete directory access to all `/roles/devops` sub-skills.
2. An understanding of Site Reliability Engineering (SRE) principles.

---

## 🔄 Execution Workflow

### Principle 1 — Infrastructure as Code (IaC)
Every server, IP address, permission policy, and DNS record must be defined in version control.
If the datacenter blows up, DevOps should be able to restore 100% of the architecture in another region simply by typing `terraform apply`.
*Reference: `roles/devops/infrastructure/ias-terraform/SKILL.md`*.

### Principle 2 — Continuous Flow (CI/CD)
Developers should merge small, safe, frequent commits that deploy themselves safely.
*The DevOps responsibility is not to deploy code, it is to build the machine that deploys the code.*
*References: `cicd/pipeline-design/SKILL.md` and `cicd/github-actions/SKILL.md`*.

### Principle 3 — Telemetry & Observability
You cannot fix what you cannot see. The system must emit metrics before going to production.
- **Monitoring**: "Is the system alive?"
- **Observability**: "Why is the system dead?"
*References: `monitoring/log-aggregation/SKILL.md` and `monitoring/alert-setup/SKILL.md`*.

### Principle 4 — Incident Response
When things break, operate as a calm, blameless machine.
Contain the blast radius quickly, restore service, and write a Root Cause Analysis. Fix the systemic failure, do not punish the engineer.
*References: `incident-response/incident-commander/SKILL.md` and `incident-response/blameless-rca/SKILL.md`*.

### Principle 5 — Safe Deployments
Minimize the terror of "Release Friday" by using release architectures that reduce risk.
*References: `release-management/feature-flags/SKILL.md` and `release-management/blue-green/SKILL.md`*.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Complete Cloud Outage | AWS `us-east-1` goes down taking everything offline | Fail over to the Multi-Region DR (Disaster Recovery) plan. Update external status pages immediately to manage customer blast radius. |
| Developer Pushback | Devs complain DevOps pipelines are "too slow" | Audit the CI pipeline. Are caching layers working? DevOps is a service provider; the Developer is your customer. Optimize their DX (Developer Experience). |

---

## ✅ Done Criteria / Verification

Adherence to the DevOps Master Protocol is met when:

- [ ] Zero manual SSH interventions are required to deploy daily business features.
- [ ] Infrastructure changes are reviewed via PRs exactly like Application code.
- [ ] Meaningful SLIs/SLOs are monitored and trigger alerts BEFORE the customers complain on Twitter.
