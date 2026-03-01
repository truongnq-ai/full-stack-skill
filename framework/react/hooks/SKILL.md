---
name: React Hooks Expert
description: Standards for efficient React functional components and hooks usage.
metadata:
  labels: [react, hooks, performance, frontend]
  triggers:
    files: ["**/*.tsx", "**/*.jsx"]
    keywords:
      [
        useEffect,
        useCallback,
        useMemo,
        useState,
        useRef,
        useContext,
        useReducer,
        useLayoutEffect,
        custom hook,
      ]
---

# React Hooks Expert

## Overview & Context

Bạn đóng vai trò là Senior Frontend Engineer chuyên sâu về React. Mục tiêu là tối ưu hóa render component và ngăn ngừa memory leaks bằng cách sử dụng Hooks đúng chuẩn.

## Coding Conventions

- **Dependency Arrays**: Bắt buộc sử dụng `exhaustive-deps`. Tuyệt đối không disable linter.
- **Custom Hooks**: Luôn bắt đầu bằng chữ `use...` để extract logic dùng chung.

## Conventions & Rules

- Chỉ gọi Hooks ở **top-level** của functional component hoặc custom hook (không dùng trong loop, condition, nested function).
- **Trạng thái (State)**: Giữ state nội bộ ở mức tối thiểu, chỉ "lift state up" khi bắt buộc cần thiết cho component cha.
- **`useMemo` & `useCallback`**: Đo lường trước khi dùng. Dùng `useMemo` cho heavy calc, `useCallback` cho event handlers truyền xuống component con dưới dạng props.
- **`useEffect`**: CHỈ dùng để đồng bộ hóa với hệ thống bên ngoài (API, DOM, third-party library). Bắt buộc phải return cleanup function.
- **`useRef`**: Dùng để tham chiếu đến DOM hoặc lưu trữ mutable state mà không gây re-render.
- **Initialization**: Dùng lazy state initialization `useState(() => expensive())` cho các hàm khởi tạo nặng.

## Anti-Patterns

- ❌ **No Missing Deps**: Fix logic thay vì disable linter `eslint-disable-next-line react-hooks/exhaustive-deps`.
- ❌ **No Complex Effects**: Đừng nhồi nhét xử lý vào một effect lớn, hãy tách thành các effect nhỏ đảm nhiệm một việc duy nhất.
- ❌ **No Derived State**: Tính toán trực tiếp trong quá trình render, không dùng `useEffect` để set state phụ thuộc vào props hoặc state khác.

## Tham khảo (References)

_Các thông tin tham khảo chi tiết sẽ nằm trong thư mục `references/` nếu có._

## AI Agent Playbook

Bắt buộc tuân thủ luồng làm việc theo **FSM** đã quy định trong `global-skill`:

1. **S2 (Khảo sát)**: Trước khi thêm/sửa hook, phải hiểu rõ context component (Nó nhận props gì? Render lại thường xuyên không?).
2. **CLARIFICATION (Nếu mơ hồ)**: Dừng lại hỏi Owner nếu logic component có nhiều side-effect đan chéo phức tạp hoặc chưa rõ ràng logic cleanup.
3. **Thực thi**: Rà soát lại dependency array cho đúng trước khi hoàn thành sửa đổi.
