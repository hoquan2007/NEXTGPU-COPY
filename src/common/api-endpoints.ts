/**
 * src/common/api-endpoints.ts — Một chỗ chứa mọi path API.
 *
 * Vì sao không hardcode "/api/..." trong từng service?
 * - Đổi path 1 lần → mọi chỗ dùng đúng (tránh typo, dễ tìm).
 * - Giống project thật NextGPU: UI/hook không biết URL cụ thể.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */

/** Hằng số path — thêm endpoint mới (listMachine, deduct…) ở đây khi tới M5+. */
export const API_ENDPOINTS = {
  /** GET — profile + số dư user đang login (đã làm API ở M3). */
  LIST_USER_PROFILE: "/api/listUserProfile",
} as const;
