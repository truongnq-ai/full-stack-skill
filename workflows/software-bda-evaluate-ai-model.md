---
name: software-bda-evaluate-ai-model
description: Workflow for evaluating LLM/AI model performance, hallucination rates, and precision/recall metrics in AI-integrated features.
metadata:
  labels: [bda, ai, evaluate-model, llm-metrics, ai-analytics]
  triggers:
    keywords: [evaluate ai, evaluate model, llm hallucination, ai metrics]
    file_patterns: ["ai-evaluation.md"]
---

# Workflow: software-bda-evaluate-ai-model

> **Persona Focus**: crewAI Data Analyst (AI Analytics Specialty).

## 🎯 1. Objective (Mục tiêu)
Đánh giá chất lượng của mô hình AI/LLM sau khi tích hợp vào sản phẩm (đo lường độ chính xác, tỷ lệ ảo giác - hallucination rate).

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Dataset Collection**
- Thu thập tập dữ liệu log (Prompts + Completions) từ môi trường staging/production.

**Step 2: Define Evaluation Criteria**
- Lập bảng tiêu chí (Rubric): Độ chính xác (Accuracy), Định dạng (Format matching), Thời gian phản hồi (Latency).

**Step 3: Evaluation Execution**
- Phân tích log (hoặc dùng LLM-as-a-Judge) để chấm điểm tập dữ liệu theo Rubric.

> **⏸️ Checkpoint**: 
> "Quá trình đánh giá đã xong. Phát hiện X% hallucination rate. Bạn có muốn tôi xuất báo cáo và đề xuất cập nhật System Prompt cho team Dev không? (Y/N)"

## 📤 3. Outputs (Đầu ra)
- File `ai-evaluation.md`.
- Báo cáo đề xuất tinh chỉnh Prompt (Prompt refinement suggestions).
