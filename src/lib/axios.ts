/**
 * src/lib/axios.ts — Instance Axios dùng chung cho mọi service.
 *
 * Vì sao baseURL = "" (rỗng)?
 * - App và API cùng origin (localhost:3000 hoặc Vercel).
 * - Path "/api/..." đã đủ; hardcode "http://localhost:3000" sẽ vỡ khi deploy.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */
import axios from "axios";

/**
 * axiosInstance — gọi API nội bộ Next.js.
 * Header Authorization Bearer gắn ở từng service (nhận token từ Clerk).
 */
export const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});
