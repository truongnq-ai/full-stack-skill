# Java Do / Don’t

## ✅ Do
- Tách layer rõ ràng (controller/service/repository)
- Dùng DTO cho request/response
- Viết unit test cho logic quan trọng

## ❌ Don’t
- Không để SQL query trong controller
- Không bắt Exception chung chung rồi bỏ qua
- Không để domain model phụ thuộc vào framework
