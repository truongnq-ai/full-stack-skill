---
name: software-ba-system-design
description: Workflow for translating business requirements into technical system designs, ER schemas, and Sequence diagrams.
metadata:
  labels: [ba, system-design, workflow, architecture, uml]
  triggers:
    keywords: [create system design, design architecture, generate uml from requirements]
    file_patterns: ["system-design.md", "architecture.md"]
---

# Workflow: software-ba-system-design

> **Persona Focus**: crewAI System Architect / BA (Visual translation, Structural integrity, Error path modeling).

## 🎯 1. Objective (Mục tiêu)
Chuyển đổi các yêu cầu nghiệp vụ (Business Requirements / PRD) thành bản thiết kế hệ thống kỹ thuật (System Design) trực quan bằng UML (Mermaid), làm tài liệu gốc cho Dev.

## 📥 2. Inputs (Đầu vào)
- `PRD.md` hoặc `requirements.md`.
- Hướng dẫn công nghệ cốt lõi (Core Tech Stack).

## ⚙️ 3. Steps (Các bước thực thi)

**Step 1: Phân tích Thực thể (Entity Analysis)**
- Đọc `requirements.md`.
- Trích xuất danh sách các đối tượng dữ liệu cốt lõi (VD: User, Order, Payment).

**Step 2: Thiết kế Database (ER Diagram)**
- Sinh ra sơ đồ `erDiagram` bằng Mermaid.
- Đảm bảo định nghĩa rõ PK, FK, và kiểu dữ liệu.

**Step 3: Thiết kế Luồng (Sequence Diagram)**
- Chọn 1-2 luồng phức tạp nhất (Core flows).
- Vẽ `sequenceDiagram` bao gồm cả `alt/else` cho luồng lỗi (Error handling).

> **⏸️ Checkpoint**: 
> "Tôi đã phác thảo xong ER Diagram và Sequence Diagram cho Core Flows. Bạn có muốn review lại cấu trúc trước khi lưu thành `system-design.md` không? (Y/N)"

**Step 4: Hoàn thiện Tài liệu (Documentation)**
- Tổng hợp lại vào file `docs/specs/system-design.md`.
- Bổ sung phần giải thích text cho các quyết định kiến trúc (Trade-offs).

## 📤 4. Outputs (Đầu ra)
- File `system-design.md` chứa đầy đủ UML diagrams.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: [system-design](file:///D:/GitHub/skill/full-stack-skill/skills/roles/ba/system-design/SKILL.md)
