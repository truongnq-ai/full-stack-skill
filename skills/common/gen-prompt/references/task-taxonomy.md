<!-- v3.0 | Last updated: 2026-09-26 | 6 Domains / 42 Clusters + GEN-00 Fallback -->

# Generalized 2-Level Task Taxonomy & Workflow Mapping

Ma trận phân loại nhiệm vụ 2 Cấp (6 Domains & 42 Cụm năng lực nghiệp vụ + GEN-00 Fallback) kết nối trực tiếp với các Workflow và Skill trong hệ sinh thái `@truongnq-ai/full-stack-skill`.

---

## 🏛️ Domain 1: Project Management & Governance (PM / PO / BA)
*Áp dụng chuẩn hóa cho mọi loại hình dự án phần mềm và doanh nghiệp.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **PM-01** | **Feature Planning & Roadmapping**<br>Lập kế hoạch lộ trình, chiến lược phát hành, phân kỳ tính năng | `/software-po-plan-feature` | `common/product-manager`<br>`roles/ba/requirements-elicitation` |
| **PM-02** | **Story Splitting & Backlog Grooming**<br>Phân rã User Story chuẩn INVEST/BDD, quản lý backlog | `/software-ba-split-stories` | `roles/ba/story-splitting`<br>`roles/qa/quality-assurance` |
| **PM-03** | **Requirements Elicitation & Specs**<br>Khai phá yêu cầu nghiệp vụ, soạn thảo đặc tả SRS/BRD/FSD | `/software-ba-gather-requirements` | `common/product-requirements`<br>`common/questioning` |
| **PM-04** | **Stakeholder Reporting & Standup**<br>Báo cáo tiến độ dự án, điều phối họp, đồng bộ nhóm đa tác tử | `/software-pm-report-standup` | `common/weekly-sync`<br>`common/communication-contract` |
| **PM-05** | **Risk Management & Mitigation**<br>Nhận diện rủi ro kỹ thuật, phân tích tác động, kế hoạch dự phòng | `/review-plan` | `common/risk-register`<br>`common/guardrails` |
| **PM-06** | **SOP & Process Standardization**<br>Soạn thảo quy trình vận hành tiêu chuẩn, biên bản bàn giao | `/software-writer-user-manuals` | `roles/writer/docs`<br>`common/documentation` |
| **PM-07** | **UAT & Success Metrics Tracking**<br>Kế hoạch nghiệm thu UAT, đo đạc KPI/SLA và chỉ số sau phát hành | `/software-po-uat-acceptance` | `software-po-measure-success`<br>`roles/qa/business-analysis` |
| **PM-08** | **Vendor & Dependency Evaluation**<br>Đánh giá thư viện, so sánh vendor, kiểm tra license, dependency audit | `/software-dev-audit-codebase` | `common/research`<br>`common/risk-register` |
| **PM-09** | **Decision Log & Change Management**<br>Ghi nhận quyết định scope/kỹ thuật, quản lý thay đổi, thông báo stakeholder | `/software-po-review-progress` | `common/communication-contract`<br>`common/risk-register` |

---

## 💻 Domain 2: Software Engineering & Architecture (Dev / Tech Lead)
*Bao quát toàn diện vòng đời kỹ thuật phần mềm đa ngăn xếp.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **DEV-01** | **System & Data Architecture Design**<br>Thiết kế hệ thống, sơ đồ C4/UML, mô hình ERD & hợp đồng API | `/software-ba-system-design` | `common/system-design`<br>`common/architecture-diagramming`<br>`workflows/api-design.md` |
| **DEV-02** | **Core Logic & Business Implementation**<br>Xây dựng logic nghiệp vụ backend/frontend, service layer, CRUD | `/software-dev-implement-feature` | `common/coding-discipline`<br>`common/tdd`<br>`common/best-practices` |
| **DEV-03** | **UI/UX & Frontend Components**<br>Phát triển component, hệ thống thiết kế giao diện, form & state | `/ui-ux-pro-max` | `react/component-patterns`<br>`nextjs/app-router`<br>`common/mobile-ux-core` |
| **DEV-04** | **Database Operations & Migrations**<br>Thiết kế bảng, viết migration an toàn, tối ưu query & indexing | `/software-dev-manage-database` | `database/postgresql`<br>`common/cloud-storage` |
| **DEV-05** | **Security, Identity & Access Control**<br>Xác thực người dùng, phân quyền RBAC, mã hóa & bảo vệ secret | `/software-dev-design-api` | `common/security-standards`<br>`nextjs/authentication`<br>`typescript/security` |
| **DEV-06** | **External Integration & Webhooks**<br>Tích hợp cổng thanh toán, bot thông báo, 3rd API & webhook | `/software-dev-design-api` | `common/telegram-interactive-messages`<br>`common/cloud-storage` |
| **DEV-07** | **Bug Fixing & Incident Diagnostics**<br>Điều tra runtime error, đọc log/trace, phân tích nguyên nhân gốc rễ | `/software-dev-fix-bug` | `common/systematic-debugging`<br>`common/impact-analysis`<br>`common/file-safety` |
| **DEV-08** | **Refactoring & Tech Debt Reduction**<br>Tái cấu trúc code, tách god class, chuẩn hóa SOLID & tối ưu hiệu năng | `/software-dev-refactor-techdebt` | `common/architecture-audit`<br>`common/best-practices`<br>`common/review-plan` |
| **DEV-09** | **Technical Planning & Impact Analysis**<br>Phân tích tác động trước khi code, lập kế hoạch triển khai, đánh giá blast radius | `/software-dev-plan-implementation` | `common/impact-analysis`<br>`common/writing-plans`<br>`common/review-plan` |
| **DEV-10** | **Version Control & Git Collaboration**<br>Quản lý branch, commit chuẩn, tạo/review PR, resolve conflict, git worktree, tag release | `/software-dev-git-workflow` | `common/git-collaboration`<br>`common/using-git-worktrees`<br>`common/finishing-a-development-branch` |

---

## 🤖 Domain 3: AI Orchestration & Workflow Automation
*Tự động hóa luồng làm việc, MCP Servers & Đánh giá Mô hình AI.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **AI-01** | **Workflow Automation Pipelines**<br>Xây dựng kịch bản tự động hóa luồng dữ liệu n8n, webhook triggers | `/software-dev-implement-feature` | `common/coding-discipline`<br>`common/subagent-driven-development` |
| **AI-02** | **MCP Server & Tool Engineering**<br>Xây dựng Model Context Protocol (MCP) cấp context & tools cho AI | `/software-dev-design-api` | `common/system-design`<br>`common/security-standards` |
| **AI-03** | **Prompt Engineering & Evals**<br>Phát triển prompt, đo đạc độ chính xác, đánh giá hallucination LLM | `/software-dev-prompt-engineering` | `common/context-optimization`<br>`software-bda-evaluate-ai-model` |
| **AI-04** | **Skill & Workflow Authoring**<br>Viết SKILL.md, workflow file, thiết kế chuẩn skill cho hệ sinh thái Agent | `/software-dev-create-skillset` | `common/writing-skills`<br>`common/workflow-writing` |
| **AI-05** | **Multi-Agent Orchestration**<br>Điều phối multi-agent, delegate subagent task song song, quản lý mailbox | `/software-team-orchestrate-agents` | `common/subagent-driven-development`<br>`common/dispatching-parallel-agents` |
| **AI-06** | **Business Data Analytics & Metrics**<br>Phân tích metrics sản phẩm, định nghĩa KPI, đo đạc hiệu quả sau release | `/software-bda-analyze-metrics` | `software-bda-define-metrics`<br>`software-bda-setup-tracking` |

---

## ☁️ Domain 4: DevOps, Infrastructure & Cloud Operations
*Hạ tầng đám mây, Docker, CI/CD và SRE.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **OPS-01** | **Infra Provisioning & Dev Setup**<br>Cấu hình máy dev, Docker Compose, phân vùng mạng & VPS setup | `/software-devops-setup-infra` | `common/docker`<br>`common/ssh`<br>`common/guardrails` |
| **OPS-02** | **CI/CD Pipelines & Build Automation**<br>Thiết kế GitHub Actions, tự động hóa build/lint/test & quét bảo mật | `/software-devops-setup-cicd` | `roles/devops/ci-cd`<br>`common/quality-assurance` |
| **OPS-03** | **Release Management & Deployment**<br>Đóng gói release, bump version, triển khai container & rollback | `/software-devops-deploy-release` | `roles/devops/plan-architecture`<br>`smart-release` |
| **OPS-04** | **Observability, SRE & Recovery**<br>Thiết lập logging, giám sát hệ thống, xử lý sự cố hạ tầng sản xuất | `/software-devops-handle-incident` | `roles/devops/monitoring`<br>`common/ops` |
| **OPS-05** | **Data Backup & Cloud Migration**<br>Backup database, migrate data giữa environments, tích hợp cloud storage | `/software-devops-backup-and-migrate` | `common/cloud-storage`<br>`common/docker`<br>`common/guardrails` |
| **OPS-06** | **Environment & Secret Management**<br>Quản lý .env, secret rotation, vault, cấu hình đa môi trường dev/staging/prod | `/software-devops-setup-infra` | `common/security-standards`<br>`common/guardrails`<br>`common/docker` |
| **OPS-07** | **OS & Server Administration**<br>Quản trị Windows (PowerShell, WSL2, service) và Linux (systemd, cron, disk, network, user) | `/software-devops-os-admin` | `common/ssh`<br>`common/ops`<br>`common/docker` |

---

## 🛡️ Domain 5: Quality Assurance, Security & Review
*Kiểm thử chất lượng toàn diện, kiểm toán bảo mật và rà soát quy trình.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **QA-01** | **Test Strategy & Test Planning**<br>Lập chiến lược kiểm thử, ma trận bao phủ, thiết kế test case | `/software-qa-test-planning` | `roles/qa/quality-assurance`<br>`roles/qa/jira-integration` |
| **QA-02** | **Automated & Regression Testing**<br>Viết test tự động E2E/API, thiết lập suite kiểm thử hồi quy | `/software-tester-automate-regression` | `common/quality-assurance`<br>`nextjs/testing` |
| **QA-03** | **Bug Triage & Defect Management**<br>Phân loại bug, tái hiện lỗi, chuẩn hóa bug report & đồng bộ Jira | `/software-qa-report-bug` | `roles/qa/bug-management`<br>`common/id-registry` |
| **QA-04** | **Code Review & Security Auditing**<br>Kiểm tra PR, rà soát kiến trúc & quét lỗ hổng bảo mật chuyên sâu | `/software-dev-code-review` | `common/code-review`<br>`common/security-audit`<br>`roles/reviewer/code-review` |
| **QA-05** | **Performance & Load Testing**<br>Profiling hiệu năng, load/stress test, Lighthouse audit, kiểm tra bundle size | `/software-qa-advanced-testing` | `roles/qa/advanced-testing`<br>`common/performance-engineering` |
| **QA-06** | **Release Verification & Sign-off**<br>Xác nhận release sẵn sàng, smoke test post-deploy, bàn giao sang DevOps | `/software-tester-verify-release` | `roles/qa/handover-to-devops`<br>`common/verification-before-completion` |

---

## 📝 Domain 6: Technical Writing & Knowledge Management (Writer)
*Tạo lập, duy trì và chuẩn hóa tài liệu kỹ thuật, API docs, hướng dẫn vận hành và cẩm nang người dùng.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **DOC-01** | **Code Documentation & JSDoc**<br>Viết comment inline, JSDoc/docstring, tự động phát hiện export thiếu doc | `/software-writer-update-docs` | `roles/writer/docs`<br>`common/documentation` |
| **DOC-02** | **API Docs (OpenAPI/Swagger)**<br>Tạo spec OpenAPI, Swagger UI, tài liệu contract request/response endpoint | `/software-writer-api-docs` | `roles/writer/api-docs`<br>`common/documentation` |
| **DOC-03** | **Architecture & ADR Writing**<br>Viết ADR, sơ đồ C4/UML, tài liệu infrastructure và runbook vận hành | `/software-writer-infra-docs` | `roles/dev/architecture-decision-records`<br>`common/architecture-diagramming` |
| **DOC-04** | **User Manuals & Knowledge Base**<br>Viết hướng dẫn người dùng, tutorial, FAQ, bài đăng knowledge base | `/software-writer-user-manuals` | `roles/writer/user-manuals`<br>`common/documentation` |

---

## 🌐 Fallback Protocol: Cụm Dự Phòng Đa Năng (GEN-00)
*Áp dụng khi yêu cầu của người dùng là tác vụ lai tạp hoặc nghiên cứu khám phá chưa rõ giải pháp.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **GEN-00** | **Unclassified / Exploratory / Research**<br>Nghiên cứu công nghệ mới, khảo sát giải pháp, đánh giá liên ngành | `/software-team-brainstorm-idea` | `common/research`<br>`common/questioning` |
