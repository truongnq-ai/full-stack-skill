# Angular Conventions (Detail)

## Structure
- core/: singleton services, interceptors, guards
- shared/: components, pipes, directives dùng chung
- features/: domain-specific modules

## RxJS
- Ưu tiên async pipe
- Clean up subscription khi cần (takeUntil)

## Naming
- component: `feature-x.component.ts`
- service: `feature-x.service.ts`

## State
- NgRx hoặc service-local state tùy 규모
