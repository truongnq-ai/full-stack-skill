---
name: Cloud Infrastructure Provisioning
description: Core checklist for securely spinning up foundational infrastructure (Compute, Networking, Storage) specifically mapping to security and cost-efficiency paradigms.
category: roles/devops
metadata:
  labels: [devops, provisioning, cloud, vm, network, security-groups]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [provision server, spin up vm, create vpc, configure infrastructure]
---

# ☁️ Infrastructure Provisioning Protocols

> **Use this skill when**: translating a software architecture diagram (e.g., C4 model) into actual Cloud Provider primitives (AWS VPCs, Subnets, EC2s). Trigger: `/devops-provision`.
>
> **Out of scope**: This focuses on *what* to provision safely. To execute the *how*, use `ias-terraform/SKILL.md`.

---

## 🚫 Anti-Patterns

- **The Open Port 22**: Spinning up a Database/VM and leaving SSH (`port 22`) or Postgres (`port 5432`) open to `0.0.0.0/0` (The entire internet).
- **Public Subnet Everything**: Placing the Database in a Public Subnet with a public IP address just because it's "easier to connect DBeaver".
- **Over-provisioning**: Defaulting to an `m5.2xlarge` ($300/mo) instance because you didn't calculate memory requirements.

---

## 🛠 Prerequisites & Tooling

1. Cloud Provider Access (AWS/GCP).
2. Approved Network Architecture Diagram.

---

## 🔄 Execution Workflow

### Step 1 — Network Baseline (VPC/Subnets)
Always isolate resources.
1. Create Custom VPC (Do NOT use Default VPC for Production).
2. Create **Public Subnets**: Only for Load Balancers (ALBs) or NAT Gateways.
3. Create **Private Subnets**: For Web Servers/Application code.
4. Create **Restricted Subnets**: Isolated layer for Databases. Only Private Web Servers can talk to these.

### Step 2 — Security Groups (The Firewalls)
Use the principle of Least Privilege.
1. **Load Balancer SG**: Allow Ingress `0.0.0.0/0` on Port 443.
2. **App Node SG**: Allow Ingress ONLY from the **Load Balancer SG** on Node Port (e.g., 8080).
3. **Database SG**: Allow Ingress ONLY from the **App Node SG** on DB Port (e.g., 5432).

*Never* use IP addresses for internal traffic routing; always reference Security Group IDs.

### Step 3 — Identity & Access (IAM Roles)
Servers should not use permanent `.env` API keys.
If EC2 needs to read S3:
1. Create an IAM Role (`App-S3-ReaderRole`).
2. Attach it to the EC2 Instance Profile.
The server will silently and securely rotate its own temporary credentials.

### Step 4 — Tagging Strategy
Every resource MUST be tagged for Cost Accountability.
- `Environment: Production | Staging | QA`
- `Project: Fintech_V2`
- `Owner: Team_Alpha`
Without tags, the CFO cannot parse the AWS Billing breakdown.

### Step 5 — Immutable Compute (Optional but desired)
When provisioning the actual VMs (EC2), inject a Startup Script (`user_data`) or point to an AMI pipeline. The goal is to never manually SSH into the box to install software.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Can't Connect to DB | Application deployed to Private Subnet cannot reach RDS | 99% of the time, this is a Security Group misconfiguration, not a code issue. Audit the Ingress/Egress rules linking the Subnets. |
| Budget Scream | Auto-scaling group spins up 50 nodes over the weekend due to a memory leak | Ensure "Cost Anomaly Detection" / AWS Billing Alarms are provisioned in parallel with compute resources to cap financial blast constraints. |

---

## ✅ Done Criteria / Verification

A secure provisioning event is verified when:

- [ ] Databases and core app servers have zero public IPv4 addresses attached.
- [ ] Internal traffic is gated strictly by Security Group references, not wide open CIDR blocks.
- [ ] IAM Instance profiles are attached, eliminating hardcoded Cloud API keys.
- [ ] Billing Tags are applied uniformly to all spawned resources.
