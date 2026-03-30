---
name: Infrastructure as Code (Terraform/OpenTofu)
description: Principles and workflows for codifying cloud infrastructure into version-controlled, immutable state using Terraform/OpenTofu.
category: roles/devops
metadata:
  labels: [devops, iac, terraform, aws, opentofu, infrastructure]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [terraform, iac, infrastructure as code, cloud build, opentofu]
---

# 🏗️ Infrastructure as Code (IaC)

> **Use this skill when**: you need to create, modify, or destroy cloud infrastructure (AWS/GCP/Azure) securely and reproducibly. Trigger: `/devops-terraform`.
>
> **Out of scope**: This is NOT for writing application code or configuring the internal Linux OS (Use Ansible/Chef for config management). This handles the raw Cloud APIs (VPCs, EC2, S3, IAM).

---

## 🚫 Anti-Patterns

- **Console ClickOps**: Forgetting a Terraform argument and instead logging into the AWS Console to manually add the S3 bucket tag. (This creates "Configuration Drift" which breaks the next `terraform apply`).
- **Local State Files**: Leaving the `terraform.tfstate` file on your laptop hard drive instead of using remote state (S3, Terraform Cloud). If your laptop dies, the infrastructure memory is lost.
- **Committing State**: Accidentally committing `terraform.tfstate` to Git. (The state file contains plain-text passwords and database credentials).
- **Megamodules**: Putting the entire company's infrastructure in one single `main.tf` file. (A typo on an S3 bucket destroys the core VPC).

---

## 🛠 Prerequisites & Tooling

1. `terraform` or `tofu` CLI installed.
2. Verified remote state backend configuration (e.g., S3 bucket + DynamoDB locking table).
3. Cloud Provider API credentials (via CLI profile or CI environment variable).

---

## 🔄 Execution Workflow

### Step 1 — State and Provider Config
Ensure every module explicitly defines versions and the remote backend.
```hcl
terraform {
  required_version = ">= 1.5.0"
  backend "s3" {
    bucket         = "company-tf-state"
    key            = "prod/networking/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-state-lock"
  }
}
provider "aws" { region = "us-east-1" }
```

### Step 2 — Check the Drift (Plan)
NEVER apply into the void. Always run a plan and read it carefully.
```bash
terraform fmt    # Auto-formats to Hashicorp standard
terraform init   # Downloads providers
terraform plan -out=tfplan
```
*Review*: Look specifically for terrifying words: `X to destroy`. If a DB is marked for destroy when you only wanted to add a tag, STOP.

### Step 3 — Apply (The Immutable Gateway)
Only execute the exact plan file generated.
```bash
terraform apply tfplan
```

### Step 4 — Module Isolation
If the project is large, break it into domains:
1. `modules/networking/` (VPCs, Subnets, NatGateways)
2. `modules/data/` (RDS, Redis, S3)
3. `modules/compute/` (EKS, EC2, Lambda)

### Step 5 — Secret Management
Never put `password = "mypass"` in your `.tf` files.
Read them securely from AWS Secrets Manager or inject via TF_VAR environment variables.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| State Lock Error | Another developer killed their terminal mid-apply | Verify no one else is currently running an apply in CI. If safe, manually release the lock using `terraform force-unlock <LOCK_ID>`. |
| Out of Sync | Someone clicked a button in AWS breaking TF state | Run `terraform refresh` to update the state. Then write HCL to match reality, or destroy the manual resource and let TF recreate it correctly. |

---

## ✅ Done Criteria / Verification

An IaC provision is successful when:

- [ ] All code passes `terraform fmt` and `tflint`.
- [ ] `terraform plan` outputs `0 to add, 0 to change, 0 to destroy` immediately after an apply.
- [ ] Secrets are dynamically imported via secure data blocks, never hardcoded.
