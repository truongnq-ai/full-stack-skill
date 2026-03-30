---
name: CI/CD Pipeline Design
description: Architectural guidelines for structuring fast, deterministic, and secure Continuous Integration and Continuous Deployment pipelines.
category: roles/devops
metadata:
  labels: [devops, ci-cd, architecture, pipeline-design]
  triggers:
    priority: medium
    confidence: 0.9
    keywords: [pipeline design, ci architecture, continuous integration, deployment flow]
---

# 🏗️ CI/CD Pipeline Design Architecture

> **Use this skill when**: designing a brand new CI/CD strategy from scratch, or refactoring a slow, monolithic pipeline into parallel stages. Trigger: `/devops-design-pipeline`.
>
> **Out of scope**: Syntax for a specific tool (e.g., GitLab CI or Jenkins). This is the tool-agnostic architecture.

---

## 🚫 Anti-Patterns

- **The Monolith Pipeline**: A single massive job that runs Lint -> Build -> Test -> Deploy linearly. If the deployment fails, you have to wait 20 minutes for linting and build to re-run.
- **Testing Against Dev DBs**: Running CI E2E tests against a shared development database, causing random test failures when a developer alters a row manually.
- **Manual Promotion**: Forcing a human to manually click "Deploy to Staging" after every single merged PR instead of automating continuous delivery to lower environments.

---

## 🛠 Prerequisites & Tooling

1. Branching strategy documentation (e.g., GitFlow or Trunk-Based Development).
2. The `roles/qa/test-strategy/SKILL.md` (to know what tests execute when).

---

## 🔄 Execution Workflow

### Step 1 — Formulate the CI (Continuous Integration) Pipeline
This runs on *every PR*. The goal is fast feedback (< 5 mins).
1. **Parallel Lint & Type Check**: Fail fast on syntax errors.
2. **Unit Tests**: Execute the isolated logic tests.
3. **Build Target**: Compile the artifact (e.g., Docker Image) to ensure the code actually builds.
*(Do NOT run full UI E2E tests here unless absolutely necessary, as it slows down Developer velocity).*

### Step 2 — Formulate the CD (Continuous Delivery) Pipeline
This runs when code merges to `main`.
1. **Immutable Artifact Generation**: Build the Docker container. Tag it with the Git SHA (`app:a1b2c3d`). **Never** build the artifact twice.
2. **Push to Registry**: Upload to ECR/DockerHub.
3. **Deploy to Staging**: Pull the exact image `app:a1b2c3d` and deploy to the Staging Environment.
4. **Execution of QA Gates**: Trigger the heavy automated E2E test suite against Staging.

### Step 3 — Formulate the Deployment (Production) Pipeline
This promotes an already-tested artifact.
1. **Approval Gate**: (Optional) Require manual sign-off for Production depending on compliance rules.
2. **Image Promotion**: Pull the `app:a1b2c3d` from Staging and deploy it directly to Prod. Do NOT rebuild from source.
3. **Smoke Test**: Run a quick `/health` sanity check post-deployment.

### Step 4 — Establish the Feedback Loop
Inject Slack/Discord notifications at critical junctures:
- PR Checks Failed -> Ping Developer.
- Deploy to Staging Failed -> Ping DevOps & QA.
- Deploy to Prod Succeeded -> Ping Entire Engineering Team.

---

## ⚠️ Error Handling (Fallback)

| Scenario | Condition | Fallback Action |
|----------|-----------|-----------------|
| The Flaky Pipeline | E2E tests occasionally fail on CI but pass locally | Isolate E2E tests into a nightly cron job so they don't block PRs, while the QA team stabilizes them (`roles/qa/flake-control/SKILL.md`). |
| Massive Build Times | Node/Rust compile takes 15 minutes | Implement aggressive layer caching in Docker files and dependency caching in the Pipeline runner. |

---

## ✅ Done Criteria / Verification

A Pipeline Architecture is functionally complete when:

- [ ] It enforces "Build Once, Deploy Anywhere" (Artifacts are promoted, not rebuilt).
- [ ] Feedback on PR validity is generated in under 10 minutes.
- [ ] Production deployments do not require manual SSH interventions.
