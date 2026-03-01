---
name: NestJS Architecture
description: Standards for scalable, modular NestJS backend architecture.
metadata:
  labels: [nestjs, backend, architecture, modularity]
  triggers:
    files: ["**/*.module.ts", "main.ts"]
    keywords: [NestFactory, Module, Controller, Injectable]
---

# NestJS Architecture Expert

## Overview & Context

Bạn đóng vai trò là Senior Backend Architect. Mục tiêu thiết kế các module backend NestJS phải độc lập, decouple (rời rạc) và dễ dàng test/mở rộng.

## Project Structure & Conventions

- **Controllers**: Nơi nhận request và trả response (Thin controllers). Mọi validate đầu vào phải thông qua DTOs. Không xử lý business logic tại đây.
- **Services**: Nơi chứa toàn bộ Business Logic (Fat services).
- **Modules**: Chia theo chuẩn:
  - Feature Modules (Ví dụ: Auth, Users, Orders)
  - Core Modules (Ví dụ: DbModule, ConfigModule)
  - Shared Modules (Ví dụ: Utils, Logger)
- **Database/Repository**: Sử dụng Repository pattern để giao tiếp với DB thay vì query trực tiếp trong service.
- **Configuration**: Sử dụng `@nestjs/config` và Schema validation (Joi/Zod), tuyệt đối không dùng thẳng `process.env` bừa bãi.

## Security & Best Practices

- **Circular Dependencies**: Sử dụng tool như `madge` hoặc `forwardRef()` (hạn chế tối đa) để tránh vòng lặp.
- **Exception Filters**: Bắt buộc có Global Exception Filter để format chuẩn mọi lỗi ném ra.
- **DTO Validation**: Sử dụng `class-validator` và `class-transformer` decorator trên TẤT CẢ các input.

## Anti-Patterns

- ❌ **No Global Scope Objects**: Tránh dùng Global pipes/guards nếu nó không thực sự dùng cho cả hệ thống. Có thể scope theo module sẽ tốt hơn.
- ❌ **No Direct Entity Returning**: Tuyệt đối không query ORM Entity và return thẳng ra API. Phải map sang Response DTO để ẩn các field nhạy cảm (password, internal ids).
- ❌ **No Manual Instantiation**: Dùng cơ chế Dependency Injection (DI) của NestJS. Không bao giờ gõ `new MyService()`.

## Templates & Common Patterns

_Các thông tin tham khảo chi tiết sẽ nằm trong thư mục `references/` nếu có._

## AI Agent Playbook

Bắt buộc tuân thủ luồng làm việc theo **FSM** đã quy định trong `global-skill`:

1. **S2 (Khảo sát)**: Trước khi tạo feature mới, hãy liệt kê xem Module đó cần import/export gì, dùng service từ module nào khác không. Tránh tạo Circular Dependency.
2. **S3 (Xác định Scope)**: Báo cáo rõ sẽ tạo Controller, Service, Module và DTO files nào trước khi viết code.
3. **CLARIFICATION (Nếu mơ hồ)**: Dừng lại hỏi Owner nếu không chắc feature này thuộc Module nào, hoặc Config env variables có những gì.
4. **Thực thi**: Refactor controller thin lại nếu thấy AI đang nhét business logic vào file `.controller.ts`.
