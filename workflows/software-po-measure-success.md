---
name: software-po-measure-success
description: Workflow for tracking product metrics post-release to evaluate if the feature met its original goals.
metadata:
  labels: [po, metrics, success-evaluation, post-release]
  triggers:
    keywords: [measure success, product metrics, evaluate feature, post-mortem]
    file_patterns: ["PRD.md", "metrics.md"]
---

# Workflow: software-po-measure-success

> **Persona Focus**: MetaGPT Product Manager (Data-driven evaluation, Goal tracking).

## 🎯 1. Objective (Mục tiêu)
Đánh giá mức độ thành công của một tính năng sau khi Release dựa trên các chỉ số (Metrics) đã định nghĩa trong PRD.

## 📥 2. Inputs (Đầu vào)
- `PRD.md` (Đặc tả phần Product Goals và Success Metrics).
- Số liệu thực tế (Analytics data, user feedback) do BDA cung cấp.

## ⚙️ 3. Steps (Các bước thực thi)

**Step 1: Xác định lại Chỉ số Mục tiêu (Goal Realignment)**
- Trích xuất 3 Product Goals và các Metrics đo lường tương ứng từ PRD.

**Step 2: Thu thập Dữ liệu (Data Collection)**
- Yêu cầu hoặc đọc dữ liệu từ các báo cáo phân tích (VD: `metrics.md` do BDA tạo ra).

**Step 3: So sánh & Phân tích (Gap Analysis)**
- So sánh số liệu thực tế với Target Metrics.
- Nhận định: 
  - Tính năng có đạt mục tiêu không?
  - Người dùng có dùng tính năng đúng như thiết kế không?

> **⏸️ Checkpoint**: 
> "Đã phân tích xong dữ liệu thực tế. Tính năng đạt x% mục tiêu. Bạn có muốn sinh báo cáo Post-Release (Post-mortem) với các đề xuất cải tiến không? (Y/N)"

**Step 4: Đề xuất Cải tiến (Next Iteration)**
- Dựa trên sự chênh lệch (Gap), tạo danh sách các Feature Enhancements cho PRD v2.

## 📤 4. Outputs (Đầu ra)
- Báo cáo Post-Release (đánh giá thành công).
- Các User Stories mới (Feature Enhancements) đưa vào Backlog.
