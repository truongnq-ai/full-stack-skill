# secure-secrets-manager

## 1) Overview & Context
Skill quản lý thông tin nhạy cảm (keys, tokens, IP, DB, VPS, webhooks) theo chuẩn an toàn.
Mục tiêu: dễ lưu – dễ tìm – không lộ.

## 2) Scope thông tin được phép lưu (khi có consent rõ ràng)
- API keys / Access tokens (OpenAI, GitHub, NPM...)
- IP/VPS/hostnames
- SSH info (user/port/key path)
- DB connection info (host, port, db, user, ssl mode)
- CI/CD secrets (token, webhook)

## 3) Scope KHÔNG lưu (trừ khi yêu cầu đặc biệt)
- Mật khẩu cá nhân
- OTP/MFA
- Session cookies ngắn hạn
- Dữ liệu khách hàng nhạy cảm

## 4) Quy tắc lưu
- Chỉ lưu khi user nói rõ: “Cho phép lưu thông tin này”.
- Mỗi entry có:
  - name
  - type
  - scope (global/project)
  - owner
  - last_update
  - notes

## 5) Vị trí lưu
- /home/jason/.openclaw/workspace/secure/
  - README.md
  - secrets.index.md
  - tokens.md
  - infra.md
  - db.md
  - networks.md

## 6) Cách truy xuất
- Chỉ đọc/nhắc lại khi user yêu cầu trực tiếp.
- Mặc định mask một phần khi trả lời (ví dụ npm_**********j6xD).

## 7) Safety Guardrails
- Không tự động chèn secrets vào trả lời.
- Không gửi secrets ra group chat nếu chưa được phép.
- Không lưu nếu thiếu consent.

## 8) AI Agent Playbook
1) Xác nhận consent
2) Chuẩn hóa entry
3) Lưu đúng file
4) Khi trả lời: mask + hỏi lại nếu cần full

## 9) Do/Don’t
- ✅ Do: ghi rõ scope + last_update
- ❌ Don’t: lưu OTP/password cá nhân
- ❌ Don’t: trả về raw secrets trong group chat
