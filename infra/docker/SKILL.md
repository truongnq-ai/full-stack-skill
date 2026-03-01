# Docker Skill

## 1) Overview & Context
Chuẩn hóa đóng gói ứng dụng, môi trường dev/test/prod nhất quán.

## 2) Coding Conventions
- Dockerfile rõ ràng, multi-stage build
- Image tag theo version + commit

## 3) Project Structure (gợi ý)
- Dockerfile
- docker-compose.yml
- .dockerignore

## 4) Common Patterns
- Multi-stage build
- Distroless / slim image
- Build caching

## 5) Testing
- Build image trong CI
- Smoke test container

## 6) Security & Pitfalls
- Không chạy container với root
- Scan image vulnerabilities
- Không bake secret vào image

## 7) CI/CD Checklist
- Build image
- Scan image
- Push registry

## 8) AI Agent Playbook
1) Xác định base image
2) Tối ưu layer
3) Kiểm tra runtime user

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng multi-stage
- ❌ Don’t: lưu secret trong Dockerfile
- ❌ Don’t: image quá nặng
