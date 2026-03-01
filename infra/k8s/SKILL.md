# Kubernetes (K8s) Skill

## 1) Overview & Context
Quản lý triển khai, scale và vận hành hệ thống phân tán.

## 2) Coding Conventions
- YAML chuẩn, tách config theo environment
- Resource naming thống nhất

## 3) Project Structure (gợi ý)
- k8s/
  - base/
  - overlays/

## 4) Common Patterns
- Deployment + Service
- Ingress
- ConfigMap/Secret
- HPA

## 5) Testing
- Validate manifests (kubectl/kubeval)
- Deploy thử staging

## 6) Security & Pitfalls
- RBAC tối thiểu
- Không commit secret plain text

## 7) CI/CD Checklist
- Validate manifests
- Apply changes
- Rollback strategy

## 8) AI Agent Playbook
1) Kiểm tra resources
2) Verify health probes
3) Validate RBAC

## 9) Do/Don’t (Anti-patterns)
- ✅ Do: dùng namespace tách env
- ❌ Don’t: chạy pod privileged
- ❌ Don’t: hardcode secret
