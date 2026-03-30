---
name: Secret Management
description: Standards for injecting, rotating, and auditing cryptographic keys, API tokens, and database credentials safely into applications.
category: roles/devops
metadata:
  labels: [devops, security, secrets, vault, environment-variables]
  triggers:
    priority: critical
    confidence: 0.95
    keywords: [secret management, handle api keys, store passwords, .env]
---

# 🔐 Secret Management

> **Use this skill when**: an application requires a password, API key, or TLS certificate to boot up, and you need to supply it securely. Trigger: `/devops-manage-secrets`.
>
> **Out of scope**: This does not cover user authentication passwords (e.g., Argon2 hashing user passwords in the DB). This covers Infrastructure/Application secrets.

---

## 🚫 Anti-Patterns

- **Git Hardcoding**: Committing `STRIPE_KEY=sk_live_12345` into version control. (Bots will scrape and exploit this in seconds).
- **The "Dev" Exemption**: Using production keys in the local development environment just because it's "easier than setting up a sandbox DB".
- **Infinite Lifespan**: Creating an IAM token with no expiration date. If it leaks 4 years from now, it still grants full admin access.

---

## 🛠 Prerequisites & Tooling

1. A Centralized Secret Store (AWS Secrets Manager, HashiCorp Vault, GitHub Secrets, or Azure KeyVault).
2. The application's expected runtime environment variables.

---

## 🔄 Execution Workflow

### Step 1 — Secret Generation & Centralization
Generate the key (e.g., a 64-char random hex for a JWT Secret).
Immediately store it in the Centralized Vault physically separated by environment:
- `/prod/api/JWT_SECRET`
- `/staging/api/JWT_SECRET`
*Never send the raw secret to a developer via Slack.*

### Step 2 — Injection (Fetch at Runtime)
The application should never read an `.env` file containing real passwords in Production.
The deployment manifest (e.g., K8s Pod, ECS Task) should dynamically fetch the secret from the Vault at boot time and inject it into the container's memory space.
```yaml
# Example ECS Container Definition
secrets:
  - name: DB_PASSWORD
    valueFrom: "arn:aws:ssm:us-east-1:123:parameter/prod/db_password"
```

### Step 3 — CI/CD Pipeline Escaping
When GitHub Actions needs a secret (e.g., to login to DockerHub):
Use GitHub Environments. Require manual approval for the Production environment so a malicious PR cannot silently execute `echo $PROD_KEY`.

### Step 4 — Dynamic / Ephemeral Secrets (Advanced)
If using Vault, configure the DB to issue a unique username/password for *every single app instance*, valid for exactly 1 hour. When the app drops, the password is destroyed. This prevents leaked credentials from being reused.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Git Leak | A developer accidentally commits a Production API key | Assume the key is completely compromised. **Revoke it at the provider immediately.** Generate a new key, inject it into the Vault, and restart the pods. (A force-push to Git does not save you). |
| Outdated Vault | The app crashes saying "Invalid Credentials" | The secret was manually rotated in the Vault, but the App container was never restarted. Secrets injected at boot require a container restart to pick up the new value. |

---

## ✅ Done Criteria / Verification

Secret Management is successful when:

- [ ] `grep -r "sk_live" src/` returns absolutely zero hardcoded results.
- [ ] Developers do not know the actual strings comprising the Production credentials.
- [ ] CI/CD logs automatically mask/asterisk any secrets printed to standard output.
