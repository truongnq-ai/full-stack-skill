# Next.js Do / Don’t

## ✅ Do
- Dùng TypeScript strict
- Tách layer API/service
- Kiểm soát env exposure

## ❌ Don’t
- Không dùng `process.env` trực tiếp ở client nếu không prefix
- Không fetch dữ liệu trực tiếp trong component mà thiếu cache
- Không bỏ qua lint/typecheck
