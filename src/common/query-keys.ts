/**
 * src/common/query-keys.ts — Factory tạo queryKey cho React Query.
 *
 * Vì sao cần file này?
 * - React Query cache theo `queryKey` (mảng). Cùng key = cùng cache.
 * - Invalidation sau mutation (M6): `invalidateQueries({ queryKey: userKeys.all })`
 *   sẽ xóa hết cache user mà không phải nhớ từng string.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */

/** Keys liên quan user / số dư — mở rộng sau (profile, transactions…). */
export const userKeys = {
  /** Prefix chung: invalidate tất cả query bắt đầu bằng ["user"]. */
  all: ["user"] as const,
  /** Key cụ thể cho số dư / profile từ listUserProfile. */
  balance: () => [...userKeys.all, "balance"] as const,
};

/**
 * Keys máy GPU — M6 sẽ invalidate sau thuê/dừng:
 * `invalidateQueries({ queryKey: machineKeys.all })`.
 */
export const machineKeys = {
  all: ["machine"] as const,
  /** Danh sách từ GET /api/listMachine. */
  list: () => [...machineKeys.all, "list"] as const,
};
