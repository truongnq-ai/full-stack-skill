---
name: software-bda-define-metrics
description: Workflow for defining North Star metrics and KPIs based on the PRD.
metadata:
  labels: [bda, workflow, define-metrics, kpi]
  triggers:
    keywords: [define metrics, set kpi, measure feature]
    file_patterns: ["metrics.md"]
---

# Workflow: software-bda-define-metrics

> **Persona Focus**: crewAI Data Analyst (Actionable insights, Goal alignment).

## 🎯 1. Objective (Mục tiêu)
Phối hợp với PO để dịch các mục tiêu kinh doanh (Product Goals) thành các chỉ số đo lường cụ thể (Metrics).

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: PRD Analysis**
- Đọc `PRD.md` để hiểu mục tiêu của tính năng.

**Step 2: Metric Generation**
- Định nghĩa: North Star Metric, Primary KPIs, và Secondary (Counter) Metrics.

**Step 3: Actionability Check**
- Trả lời câu hỏi: "Nếu chỉ số này giảm, chúng ta sẽ làm gì?". (Nếu không trả lời được -> Bỏ chỉ số đó).

> **⏸️ Checkpoint**: 
> "Bản nháp Metrics đã xong. Bạn có muốn lưu vào `docs/analytics/metrics.md` không? (Y/N)"

## 📤 3. Outputs (Đầu ra)
- File `metrics.md`.
