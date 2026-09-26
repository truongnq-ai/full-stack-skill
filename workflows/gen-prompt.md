---
description: "OUTPUT-ONLY — Transform a raw prompt into a structured 6-block execution contract. Does NOT execute the prompt; user must copy the output to a new session."
---

# 🚀 Generate Prompt Workflow (`/gen-prompt`)

> **Use this workflow when**: User provides a raw, brief, or underspecified prompt and needs it transformed into a deterministic, structured 6-part execution contract before starting development.
>
> **Trigger phrases**: `/gen-prompt`, "gen-prompt", "chuẩn hoá prompt", "viết lại prompt", "tạo prompt cho task này".
>
> **Activates skill**: `skills/common/gen-prompt/SKILL.md`

---

## Step 1 — Ingestion & Ambiguity Gate (Clarification Loop)

Examine the user's raw prompt for core completeness:
1. Is the core objective clear and explicit?
2. Are input resources, reference codebases, or schemas known or identifiable?
3. Are target files, folders, or tech stack specified or inferable from context?
4. Is the operational scope (backend, UI, refactor, config) bounded?

> **Gate**: If any key information is ambiguous or missing:
> - **DO NOT ASSUME OR GUESS.**
> - Immediately invoke the `/question` workflow (`workflows/question.md` / `skills/common/questioning/SKILL.md`).
> - **Rule**: There is NO limit on the number of clarifying questions. Ask sequentially as many questions as needed until every ambiguity, resource, and boundary is 100% resolved.
>
> **Fallback (User refuses to answer)**: If user explicitly says "just proceed" or "make your best guess":
> - Continue with the most reasonable assumptions.
> - Document every assumption in Block 2 with `[ASSUMED]` marker.
> - Example: `- **Tech stack:** [ASSUMED] Node.js + TypeScript (inferred from repo context)`

---

## Step 2 — Catalog Input Resources & Bối cảnh

Identify and list all required input materials:
- **Reference Files**: Existing code files to read before writing code.
- **Data & Specs**: Payload JSON, mock data, DB schemas, Swagger/API documents.
- **Environment & Tools**: Local ports, `.env` keys, required MCP servers, or installed packages.

---

## Step 3 — Task Classification (2-Level Matrix Lookup)

Load the live taxonomy, then classify:

```
view_file skills/common/gen-prompt/references/task-taxonomy.md
```

Map the refined task to its **Domain → Capability Cluster** (e.g., `DEV-02`, `PM-03`, `QA-01`, `DOC-02`).

> **Fallback (GEN-00)**: If the task is exploratory, multidisciplinary, or does not match any cluster → map to `GEN-00` (`/software-team-brainstorm-idea` + `common/research`).

---

## Step 4 — Primary Workflow & Supporting Skills Binding

From the matched Capability Cluster, extract the dual execution binding:
1. **Primary Workflow (SOP)**: The master procedural workflow that dictates the sequential execution flow (e.g., `/software-dev-implement-feature`, `/software-po-plan-feature`, `/db-workflow`).
2. **Supporting Skills (Standards)**: The quality, discipline, and domain standards applied at each step (e.g., `common/coding-discipline`, `common/tdd`, `common/security-standards`).

---

## Step 5 — Step-by-Step Breakdown

Decompose the request into 3–5 sequential, atomic phases:
- Each phase must have a clear action verb.
- Each phase must be explicitly bound to 1–2 designated skills or workflow sub-steps.
- Follow the canonical progression (e.g., Spec/Analysis → Test/Design → Implementation → QA/Lint → Git Commit).

---

## Step 6 — Scope Demarcation & Definition of Done

Define the boundaries and success metrics:
- **CẦN LÀM (In-scope)**: Explicit list of modified files, functions, and logic.
- **KHÔNG LÀM (Out-of-scope)**: Negative constraints (e.g., "Do not touch UI", "Do not modify database schema", "Do not refactor unrelated code").
- **Definition of Done (DoD)**: Exact commands to verify completion (`npm run lint`, `tsc`, `pnpm test`).

---

## Step 7 — Output Execution Prompt & STOP (Output-Only Gate)

Render the refined prompt inside a Markdown code block using the canonical 6-block template:

```markdown
### 🎯 1. Mục tiêu cốt lõi (Core Objective)
...

### 📦 2. Bối cảnh & Tài nguyên đầu vào (Context & Resources)
- **Codebase / File tham chiếu:** ...
- **Dữ liệu & Tài liệu nghiệp vụ:** ...
- **Môi trường & Công cụ có sẵn:** ...

### 🚧 3. Phạm vi & Ràng buộc (Scope & Constraints)
- **CẦN LÀM (In-scope):** ...
- **KHÔNG LÀM (Out-of-scope):** ...

### 🧰 4. Danh sách Skill/Workflow áp dụng
- **Primary Workflow (Quy trình chủ đạo):** `[tên-workflow]` ➔ Định hình toàn bộ các bước thực thi
- **Supporting Skills (Tiêu chuẩn kỹ thuật):**
  - `[skill-1-từ-taxonomy-match]`: [mô tả ngắn]
  - `[skill-2-từ-taxonomy-match]`: [mô tả ngắn]

### 📋 5. Kế hoạch thực thi (Step-by-Step Breakdown)
1. **Bước 1: [Tên bước]** — `[skill/workflow tương ứng]`
2. **Bước 2: [Tên bước]** — `[skill/workflow tương ứng]`
3. **Bước 3: [Tên bước]** — `[skill/workflow tương ứng]`

### ✅ 6. Tiêu chí hoàn thành (Definition of Done)
- [ ] Code không có lỗi lint và typecheck
- [ ] Vượt qua test case liên quan với dữ liệu mẫu ở Khối 2
- [ ] Không gây ảnh hưởng ngoài phạm vi
```

<HARD-GATE>
**⏸️ STOP — Output-Only Gate**: This workflow's job is DONE after rendering the prompt above.
- Do NOT proceed to execute the refined prompt in this same session.
- Do NOT modify any files, write any code, or take any implementation action.
- Present the prompt and ask: *"Prompt đã được chuẩn hóa. Anh hãy copy prompt trên vào session IDE mới để thực thi. Anh có muốn điều chỉnh thêm điểm nào trước khi sử dụng không?"*
</HARD-GATE>
