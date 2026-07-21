---
name: software-devops-plan-architecture
description: DevOps workflow for planning infrastructure, containerization, and CI/CD pipelines.
metadata:
  labels: [devops, architecture, infrastructure, docker, ci-cd]
  triggers:
    keywords: [plan infrastructure, deploy architecture, dockerize, setup ci cd]
    file_patterns: ["docker-compose.yml", "Dockerfile", ".github/workflows/*.yml"]
---

# Workflow: software-devops-plan-architecture

> **Persona Focus**: OpenHands DevOps Agent (Environment-aware, Bash execution, Containerization).

## 🎯 1. Objective (Mục tiêu)
Thiết kế và triển khai cơ sở hạ tầng (Infrastructure as Code), thiết lập Docker, và CI/CD pipelines dựa trên `system-design.md`.

## ⚙️ 2. Steps (Các bước thực thi)

**Step 1: Infrastructure Assessment**
- Đọc `system-design.md`.
- Xác định các service cần thiết (VD: Node App, Postgres, Redis).

**Step 2: Containerization (Docker)**
- Tạo `Dockerfile` cho từng service.
- Tạo `docker-compose.yml` để nối các service. Mọi service phải có `healthcheck`.

> **⏸️ Checkpoint**: 
> "Các file cấu hình Docker đã hoàn tất. Bạn có muốn tôi chạy thử `docker-compose config` hoặc `up -d` để test local không? (Y/N)"

**Step 3: CI/CD Setup**
- Dựa trên nền tảng (GitHub Actions, GitLab CI), tạo file workflow `.yml`.
- Bao gồm các bước: Lint -> Test -> Build Docker Image.

## 📤 3. Outputs (Đầu ra)
- Bộ file IaC (Docker, CI/CD yml) hoàn chỉnh.

> **🔄 Fallback**: Nếu gặp lỗi, log lại chi tiết và hỏi ý kiến user.

> **Required Skill**: [plan-architecture](file:///D:/GitHub/skill/full-stack-skill/skills/roles/devops/plan-architecture/SKILL.md)
