# CI/CD Conventions (Detail)

## Pipeline
- stages: lint → test → build → deploy
- dùng artifacts giữa stage

## Secrets
- store qua vault/secret manager
- rotate định kỳ

## Deploy
- canary hoặc blue-green
- rollback nhanh
