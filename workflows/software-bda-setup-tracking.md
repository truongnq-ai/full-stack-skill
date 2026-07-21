---
name: software-bda-setup-tracking
description: Workflow for generating technical tracking specifications (e.g., Mixpanel, GA4) for developers.
metadata:
  labels: [bda, workflow, setup-tracking, mixpanel, telemetry]
  triggers:
    keywords: [setup tracking, tracking plan, telemetry, mixpanel spec]
    file_patterns: ["tracking-plan.md"]
---

# Workflow: software-bda-setup-tracking

> **Persona Focus**: crewAI Data Analyst (Technical bridge).

## 🎯 1. Objective (Mục tiêu)
Tạo ra bản đặc tả gắn sự kiện (Tracking Plan) chuẩn kỹ thuật để team Engineering implement.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Metric to Event Mapping**
- Đọc file `metrics.md`.
- Chuyển đổi mỗi KPI thành 1-2 sự kiện user (User Events).

**Step 2: Event JSON Design**
- Với mỗi Event, định nghĩa rõ:
  - Tên (e.g., `user_signed_up`)
  - Vị trí Trigger (e.g., `On Registration Success`)
  - Properties cần gửi kèm (e.g., `{"method": "email", "plan": "free"}`).

> **⏸️ Checkpoint**: 
> "Tracking Plan đã sẵn sàng. Bạn có muốn lưu vào `docs/analytics/tracking-plan.md` để gửi cho Dev không? (Y/N)"

## 📤 3. Outputs (Đầu ra)
- File `tracking-plan.md`.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: [setup-tracking](file:///D:/GitHub/skill/full-stack-skill/skills/roles/bda/setup-tracking/SKILL.md)
