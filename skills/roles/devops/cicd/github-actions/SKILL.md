---
name: GitHub Actions Workflows
description: Standardization for defining, building, and securing CI/CD pipelines using GitHub Actions.
category: roles/devops
metadata:
  labels: [devops, ci-cd, automation, github-actions, pipeline]
  triggers:
    priority: high
    confidence: 0.9
    keywords: [github actions, gh actions, setup ci, workflow yaml]
---

# 🤖 GitHub Actions Standardization

> **Use this skill when**: you need to create or refactor a `.github/workflows/*.yml` file for continuous integration, deployment, or chronological chron jobs. Trigger: `/devops-github-actions`.
>
> **Out of scope**: This does not cover the overarching theory of CI/CD (use `roles/devops/cicd/pipeline-design/SKILL.md`). This is strictly for the GitHub Actions implementation.

---

## 🚫 Anti-Patterns

- **Secrets in Plain Text**: Hardcoding an API key into the `env:` block instead of referencing `${{ secrets.API_KEY }}`.
- **`ubuntu-latest` Roulette**: Pinning to `ubuntu-latest` without recognizing it forces unannounced major OS version upgrades. Always pin to a specific runner version (e.g., `ubuntu-22.04`) for production pipelines.
- **Duplicate Checkout**: Running `actions/checkout@v4` in every single job instead of utilizing caching or workflow composition.
- **Action Pinning by Branch**: Using `actions/checkout@master` instead of pinning the immutable SHA hash `actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11`.

---

## 🛠 Prerequisites & Tooling

1. Repository Admin access to generate/inject GitHub Environment Secrets.
2. A clear specification of what the workflow should achieve (Build, Test, Deploy).

---

## 🔄 Execution Workflow

### Step 1 — Define the `on:` Trigger
Be hyper-specific about when the workflow runs to save compute minutes.
```yaml
on:
  push:
    branches: [ "main" ]
    paths:
      - 'src/**'            # Only run if source code changes
      - 'package.json'
  pull_request:
    types: [opened, synchronize]
```

### Step 2 — Permission Scoping
Never use the default full-access `GITHUB_TOKEN`. Restrict the workflow tokens at the top level.
```yaml
permissions:
  contents: read
  id-token: write # Required for secure OIDC cloud deployments
```

### Step 3 — Concurrency Control
If pushing 5 commits rapidly, cancel the 4 older, obsolete runs.
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Step 4 — Caching Dependencies
Installations take the longest time. Always utilize official caching.
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'npm' # Automatically caches ~/.npm
  - run: npm ci    # Use CI, not install, for deterministic builds
```

### Step 5 — Secret Injection
Pass necessary secrets to the specific steps that need them, avoiding global `env` exposure where possible.
```yaml
  - name: Deploy to Cloud
    env:
      AWS_ACCESS_KEY: ${{ secrets.AWS_ACCESS_KEY }}
    run: ./deploy.sh
```

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| Pipeline Timeout | An E2E test hangs, consuming 6 hours of CI budget | Hardcode `timeout-minutes: 15` at the `job` level. The pipeline will securely kill itself if frozen. |
| Third-Party Action Hack | A popular action you use is compromised | Always pin actions by SHA hash, never by `@v1`. Set up Dependabot to update action hashes automatically. |

---

## ✅ Done Criteria / Verification

A GitHub Action configuration is complete when:

- [ ] It resides in the correct `.github/workflows/` directory and parses cleanly via YAML linters.
- [ ] Concurrency cancels redundant runs to save CI money.
- [ ] Dependencies are explicitly cached.
- [ ] Third-party Actions are scoped with minimum permissions and safely version-pinned.
