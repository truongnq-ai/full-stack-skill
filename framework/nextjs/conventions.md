# Next.js Conventions (Detail)

## Routing
- Chọn 1: App Router hoặc Pages Router
- Nếu App Router: ưu tiên Server Components

## Components
- Reusable UI trong `components/`
- Feature-specific UI trong `features/<feature>/components`

## API
- Route handlers (app/api)
- Không để logic nghiệp vụ trong route file quá dày

## Styling
- CSS Modules hoặc Tailwind
- Hạn chế global CSS
