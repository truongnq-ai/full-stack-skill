---
name: software-support-investigate-ticket
description: Complete workflow for investigating and resolving a customer support ticket using MCP tools.
metadata:
  labels: [workflow, support, ticket, resolution]
  triggers:
    keywords: [investigate ticket, resolve customer issue, support workflow]
---

# Workflow: software-support-investigate-ticket

> **Persona Focus**: L3 Incident Engineer (Safety, DB/Log correlation).

## 🎯 1. Objective (Mục tiêu)
Phân tích nguyên nhân gốc rễ (Root Cause) của một lỗi báo cáo từ khách hàng bằng cách đối chiếu dữ liệu thực tế (Database, Logs) với Source Code, sau đó vá lỗi dữ liệu nếu cần.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Triage & Data Gathering**
- Kích hoạt kỹ năng `l3-support-customer-one-call-investigation`.
- Dùng MCP Server truy vấn thông tin User/Ticket từ DB và đọc Log từ SSH.

**Step 2: Root Cause Analysis**
- Xác định xem luồng code nào đã ghi sai dữ liệu hoặc gây ra Exception.

> **⏸️ Checkpoint 1**: 
> "Đã tìm ra Root Cause. Nguyên nhân là do [X]. Dưới đây là dự thảo Email trả lời khách. Tiếp tục tạo Data Patch để sửa data? (Y/N)"

**Step 3: Data Patching**
- Kích hoạt kỹ năng `l3-support-data-patch-scripting`.
- Chạy Dry-Run (Dùng ROLLBACK) qua MCP Database tool.

> **⏸️ Checkpoint 2**: 
> "Dry-run báo có [N] rows affected. Tiến hành COMMIT thật? (Y/N)"

## 📤 3. Outputs (Đầu ra)
- Email/Phản hồi cho khách hàng (Customer Response).
- Nhật ký xử lý sự cố (Incident Log).
- Data đã được sửa an toàn.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: [investigate-ticket](file:///D:/GitHub/skill/full-stack-skill/skills/roles/support/investigate-ticket/SKILL.md)
