# Audit & Improvement Plan — Dev + Reviewer Skills/Workflows

> **Date**: 2026-08-01
> **Scope**: `skills/roles/dev/`, `skills/roles/reviewer/`, `workflows/software-dev-*`, `workflows/software-reviewer-*`
> **Version audited**: `295b381` (tag: `cli-v2026.07.23`)

---

## P0 — Cần sửa ngay

### 1. Corrupted tool names trong workflows

Nhiều workflow bị mất ký tự, agent không biết tool đúng.

| File | Lỗi | Đúng |
|------|-----|------|
| `workflows/software-dev-implement-feature.md` | `un_command`, `pm test` | `run_command`, `npm test` |
| `workflows/software-dev-refactor-techdebt.md` | `un_command` | `run_command` |
| `workflows/software-dev-test-and-debug.md` | `un_command` | `run_command` |
| `workflows/software-dev-code-review.md` | ` iew_file` | `view_file` |
| `workflows/software-devops-deploy-and-release.md` | `un_command` | `run_command` |
| `workflows/software-devops-provision-infrastructure.md` | `un_command` | `run_command` |
| `workflows/software-devops-setup-cicd.md` | `un_command` | `run_command` |
| `workflows/software-devops-sre-operations.md` | `un_command` | `run_command` |
| `workflows/software-qa-advanced-testing.md` | `un_command` | `run_command` |
| `workflows/software-qa-test-execution.md` | `un_command` | `run_command` |
| `workflows/software-support-handle-production-incident.md` | `un_command` | `run_command` |

**Fix**: regex replace toàn repo:
```
un_command -> run_command
pm test -> npm test
 iew_file -> view_file
```

---

### 2. Broken skill references

| File | Reference sai | Ghi chú |
|------|--------------|---------|
| `skills/roles/dev/code-review-etiquette/SKILL.md` | `roles/common/communication-contract/SKILL.md` | Không tồn tại `skills/roles/common/` |
| `skills/roles/dev/unit-test-best-practices/SKILL.md` | `test-case-design/boundary-value/SKILL.md` | Không có trong `skills/roles/qa/` |
| `skills/roles/dev/implementation-workflow/SKILL.md` | `roles/pm/product-requirements/SKILL.md` | Đúng: `skills/common/product-requirements/SKILL.md` |
| `skills/roles/dev/implementation-workflow/SKILL.md` | trigger `/dev-debugging-workflow` | Workflow không tồn tại |
| `skills/roles/dev/production-debugging/SKILL.md` | `performance-guardrails/SKILL.md` | Không có trong `skills/roles/dev/` |
| `skills/roles/dev/ai-integration/SKILL.md` | `roles/dev/performance-guardrails/SKILL.md` | Không tồn tại |
| `workflows/software-support-handle-production-incident.md` | `skills/roles/l3-support/customer-one-call-investigation/SKILL.md` | Tồn tại nhưng path prefix thiếu `skills/` |

**Fix**: Sửa từng link + thêm CI check (xem P0 #3).

---

### 3. Thêm link-checker test

Chưa có script validate internal links. Đề xuất thêm vào `scripts/`:

```typescript
// scripts/validate-links.ts
// - Scan tất cả *.md trong skills/ + workflows/
// - Extract paths dạng `skills/...`, `roles/...`, `workflows/...`
// - Verify file tồn tại trên disk
// - Verify trigger `/xxx` có workflow tương ứng
// - Exit code 1 nếu có broken link
```

---

### 4. Reviewer audit skills là placeholder

| File | Vấn đề |
|------|--------|
| `skills/roles/reviewer/audit-skills/SKILL.md` | Chỉ 5 section trống, không có rubric |
| `skills/roles/reviewer/audit-workflows/SKILL.md` | Tương tự |

Trong khi workflow tương ứng có rubric tốt (10-dim, 8-dim).

**Fix**:
- Di chuyển rubric 10-dimension vào `skills/roles/reviewer/audit-skills/references/rubric.md`
- Di chuyển rubric 8-dimension vào `skills/roles/reviewer/audit-workflows/references/rubric.md`
- SKILL.md giữ checklist ngắn + link references
- Thêm frontmatter chuẩn (triggers, labels, priority)

---

### 5. Index/metadata thiếu role mới

`skills/index.json` mục `roles` chỉ có: ba, qa, devops, writer, reviewer.

**Thiếu**: dev, pm, po, support, tester, l3-support, bda.

`skills/workflow-map.json` chưa map workflow/skill dev mới.

**Fix**: Chạy lại `scripts/generate-indices.ts` hoặc bổ sung thủ công.

---

## P1 — Nên sửa sớm

### 6. Trùng lặp workflow code review

| Workflow | Mục đích |
|----------|----------|
| `software-dev-code-review.md` | PR review trên GitHub, submit comment |
| `software-dev-review-code.md` | AI-assisted review, tạo report file |

**Fix**: Giữ cả 2 nhưng phân biệt rõ trong frontmatter + description:
- `software-dev-code-review`: "Submit review comments lên GitHub PR"
- `software-dev-review-code`: "Generate local report, không submit"

Hoặc merge thành 1 với mode flag.

---

### 7. Trùng lặp workflow implement/coding

| Workflow | Khi nào dùng |
|----------|-------------|
| `software-dev-implement-feature.md` | Có ticket, bắt đầu từ đầu |
| `software-dev-execute-coding.md` | Đã có `docs/implementation_plan.md` approved |

**Fix**: Ghi rõ precondition trong frontmatter + Step 1. Cross-reference nhau.

---

### 8. `software-dev-technical-planning.md` kích hoạt skill sai

Hiện tại activate:
- `error-handling-architecture` (chỉ optional)
- `handover-to-qa` (không thuộc pha planning)
- `architecture-decision-records` (OK)

**Nên activate**:
- Core: `design-review-checklist`, `architecture-decision-records`
- Optional theo context: `api-contract`, `database-migration-strategy`, `performance-engineering`, `security-basics`, `error-handling-architecture`

---

### 9. `software-dev-execute-coding.md` thiếu Build-Run-Fix loop

Skill `implementation-coding` có loop tốt nhưng workflow không phản ánh.

**Thêm step**:
```markdown
## Step 3.5 — Build & Self-Correct
1. Run build/typecheck (`npm run build` / `tsc --noEmit`)
2. If fail → read log → fix → retry (max 3)
3. If still fail after 3 → STOP, present error to user
```

---

### 10. Severity code review không nhất quán

| Skill | Mức severity |
|-------|-------------|
| `common/code-review` | BLOCKER / MAJOR / NIT |
| `roles/reviewer/code-review` | BLOCKER / WARNING / NITPICK |

**Fix**: Chuẩn hóa toàn repo:
```
BLOCKER / MAJOR / NIT
```
Verdict: `APPROVE` / `REQUEST_CHANGES` / `REJECT`

---

### 11. Frontmatter workflow không nhất quán

Một số có `name` + `metadata.triggers`, đa số chỉ có `description`.

**Chuẩn đề xuất**:
```yaml
---
name: software-dev-xxx
description: One-line purpose
metadata:
  role: dev
  triggers:
    keywords: []
  skills:
    required: []
    optional: []
---
```

---

## P2 — Cải thiện chất lượng/token

### 12. Skill dev vượt giới hạn line

`common/workflow-writing` đặt SKILL.md ≤100 lines. Nhiều skill dài hơn.

**Fix**: Tách bảng tool, ví dụ, fallback dài sang `references/`. SKILL.md giữ checklist + anti-patterns + done criteria.

---

### 13. Lỗi chính tả tiếng Việt

`hoàn tàt` → `hoàn tất`

Xuất hiện trong:
- `code-review-etiquette/SKILL.md`
- `implementation-workflow/SKILL.md`
- `design-review-checklist/SKILL.md`
- `pr-checklist/SKILL.md`
- `refactor-techdebt/SKILL.md`
- `security-basics/SKILL.md`

**Fix**: `sed -i 's/hoàn tàt/hoàn tất/g'` trên các file.

---

### 14. Footer `Required Skill` chưa khớp

| Workflow | Activate | Footer Required |
|----------|----------|----------------|
| `software-dev-review-code.md` | `common/code-review` | `code-review-etiquette` |
| `software-dev-technical-planning.md` | 3 skills | chỉ `architecture-decision-records` |

**Fix**: Footer phản ánh skill bắt buộc thật sự.

---

## Thứ tự thực hiện đề xuất

| # | Việc | Ước lượng |
|---|------|-----------|
| 1 | Fix corrupted tool names (P0 #1) | 15 min |
| 2 | Fix broken skill references (P0 #2) | 30 min |
| 3 | Thêm `scripts/validate-links.ts` (P0 #3) | 1-2h |
| 4 | Điền nội dung reviewer audit skills (P0 #4) | 1h |
| 5 | Generate lại index/metadata/workflow-map (P0 #5) | 30 min |
| 6 | Dedup/clarify review workflows (P1 #6) | 30 min |
| 7 | Clarify implement vs execute-coding (P1 #7) | 15 min |
| 8 | Fix technical-planning skill activation (P1 #8) | 15 min |
| 9 | Thêm Build-Run-Fix vào execute-coding (P1 #9) | 15 min |
| 10 | Chuẩn hóa severity + verdict (P1 #10) | 30 min |
| 11 | Chuẩn hóa frontmatter workflow (P1 #11) | 1h |
| 12 | Tách skill dài sang references (P2 #12) | 2h |
| 13 | Fix chính tả (P2 #13) | 5 min |
| 14 | Fix footer Required Skill (P2 #14) | 15 min |

**Tổng ước lượng**: ~8-9h

---

## Điểm tốt hiện có (không cần sửa)

- `implementation-coding/SKILL.md`: Build-Run-Fix loop, surgical edit, read-before-write
- `production-debugging/SKILL.md`: Scientific method, RCA, fallback rõ
- `code-review-etiquette/SKILL.md`: prefix BLOCKER/NIT/QUESTION/PRAISE
- `software-reviewer-audit-workflows.md`: rubric 8-dim + structural check
- `software-reviewer-audit-skills.md`: rubric 10-dim + scoring + grade
