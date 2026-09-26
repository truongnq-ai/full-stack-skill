# Generalized 2-Level Task Taxonomy & Workflow Mapping

Ma trận phân loại nhiệm vụ 2 Cấp (5 Domains & 27 Cụm năng lực nghiệp vụ) kết nối trực tiếp với các Workflow và Skill trong hệ sinh thái `@truongnq-ai/full-stack-skill`.

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

---

## 💻 Domain 2: Software Engineering & Architecture (Dev / Tech Lead)
*Bao quát toàn diện vòng đời kỹ thuật phần mềm đa ngăn xếp.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **DEV-01** | **System & Data Architecture Design**<br>Thiết kế hệ thống, sơ đồ C4/UML, mô hình ERD & hợp đồng API | `/software-ba-system-design` | `common/system-design`<br>`common/architecture-diagramming`<br>`workflows/api-design.md` |
| **DEV-02** | **Core Logic & Business Implementation**<br>Xây dựng logic nghiệp vụ backend/frontend, service layer, CRUD | `/software-dev-implement-feature` | `common/coding-discipline`<br>`common/tdd`<br>`common/best-practices` |
| **DEV-03** | **UI/UX & Frontend Components**<br>Phát triển component, hệ thống thiết kế giao diện, form & state | `/ui-ux-pro-max` | `react/component-patterns`<br>`nextjs/app-router`<br>`common/mobile-ux-core` |
| **DEV-04** | **Database Operations & Migrations**<br>Thiết kế bảng, viết migration an toàn, tối ưu query & indexing | `/software-dev-manage-database` | `database/postgresql`<br>`common/cloud-storage` |
| **DEV-05** | **Security, Identity & Access Control**<br>Xác thực người dùng, phân quyền RBAC, mã hóa & bảo vệ secret | `/software-dev-execute-coding` | `common/security-standards`<br>`nextjs/authentication`<br>`typescript/security` |
| **DEV-06** | **External Integration & Webhooks**<br>Tích hợp cổng thanh toán, bot thông báo, 3rd API & webhook | `/software-dev-design-api` | `common/telegram-interactive-messages`<br>`common/cloud-storage` |
| **DEV-07** | **Bug Fixing & Incident Diagnostics**<br>Điều tra runtime error, đọc log/trace, phân tích nguyên nhân gốc rễ | `/software-dev-fix-bug` | `common/systematic-debugging`<br>`common/impact-analysis`<br>`common/file-safety` |
| **DEV-08** | **Refactoring & Tech Debt Reduction**<br>Tái cấu trúc code, tách god class, chuẩn hóa SOLID & tối ưu hiệu năng | `/software-dev-refactor-techdebt` | `common/architecture-audit`<br>`common/best-practices`<br>`common/review-plan` |

---

## 🤖 Domain 3: AI Orchestration & Workflow Automation
*Tự động hóa luồng làm việc, MCP Servers & Đánh giá Mô hình AI.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **AI-01** | **Workflow Automation Pipelines**<br>Xây dựng kịch bản tự động hóa luồng dữ liệu n8n, webhook triggers | `/software-dev-implement-feature` | `common/coding-discipline`<br>`common/subagent-driven-development` |
| **AI-02** | **MCP Server & Tool Engineering**<br>Xây dựng Model Context Protocol (MCP) cấp context & tools cho AI | `/software-dev-design-api` | `common/system-design`<br>`common/security-standards` |
| **AI-03** | **Prompt Engineering & Evals**<br>Phát triển prompt, đo đạc độ chính xác, đánh giá hallucination LLM | `/software-dev-prompt-engineering` | `common/context-optimization`<br>`software-bda-evaluate-ai-model` |

---

## ☁️ Domain 4: DevOps, Infrastructure & Cloud Operations
*Hạ tầng đám mây, Docker, CI/CD và SRE.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **OPS-01** | **Infra Provisioning & Dev Setup**<br>Cấu hình máy dev, Docker Compose, phân vùng mạng & VPS setup | `/software-devops-setup-infra` | `common/docker`<br>`common/ssh`<br>`common/guardrails` |
| **OPS-02** | **CI/CD Pipelines & Build Automation**<br>Thiết kế GitHub Actions, tự động hóa build/lint/test & quét bảo mật | `/software-devops-setup-cicd` | `roles/devops/ci-cd`<br>`common/quality-assurance` |
| **OPS-03** | **Release Management & Deployment**<br>Đóng gói release, bump version, triển khai container & rollback | `/software-devops-deploy-release` | `roles/devops/plan-architecture`<br>`smart-release` |
| **OPS-04** | **Observability, SRE & Recovery**<br>Thiết lập logging, giám sát hệ thống, xử lý sự cố hạ tầng sản xuất | `/software-devops-handle-incident` | `roles/devops/monitoring`<br>`common/ops` |

---

## 🛡️ Domain 5: Quality Assurance, Security & Review
*Kiểm thử chất lượng toàn diện, kiểm toán bảo mật và rà soát quy trình.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **QA-01** | **Test Strategy & Test Planning**<br>Lập chiến lược kiểm thử, ma trận bao phủ, thiết kế test case | `/software-qa-test-planning` | `roles/qa/quality-assurance`<br>`roles/qa/jira-integration` |
| **QA-02** | **Automated & Regression Testing**<br>Viết test tự động E2E/API, thiết lập suite kiểm thử hồi quy | `/software-tester-automate-regression` | `common/quality-assurance`<br>`nextjs/testing` |
| **QA-03** | **Bug Triage & Defect Management**<br>Phân loại bug, tái hiện lỗi, chuẩn hóa bug report & đồng bộ Jira | `/software-qa-report-bug` | `roles/qa/bug-management`<br>`common/id-registry` |
| **QA-04** | **Code Review & Security Auditing**<br>Kiểm tra PR, rà soát kiến trúc & quét lỗ hổng bảo mật chuyên sâu | `/software-dev-code-review` | `common/code-review`<br>`common/security-audit`<br>`roles/reviewer/code-review` |

---

## 🌐 Fallback Protocol: Cụm Dự Phòng Đa Năng (GEN-00)
*Áp dụng khi yêu cầu của người dùng là tác vụ lai tạp hoặc nghiên cứu khám phá chưa rõ giải pháp.*

| Mã cụm | Cụm năng lực khái quát | Primary Workflow (SOP) | Supporting Skills (Standards) |
| :--- | :--- | :--- | :--- |
| **GEN-00** | **Unclassified / Exploratory / Research**<br>Nghiên cứu công nghệ mới, khảo sát giải pháp, đánh giá liên ngành | `/software-team-brainstorm-idea` | `common/research`<br>`common/questioning` |
