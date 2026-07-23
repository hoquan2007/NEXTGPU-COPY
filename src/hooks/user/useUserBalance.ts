/**
 * src/hooks/user/useUserBalance.ts — Hook React Query cho số dư ví.
 *
 * Pipeline: UI → **Hook** → Service → Axios → API.
 * UI chỉ cần: balance, isLoading, isError, refetch — không biết URL/axios.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */
"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/src/common/query-keys";
import { getUserProfile } from "@/src/services/user.service";

/**
 * Đọc số dư từ API (có cache).
 *
 * - `staleTime: 30_000` = trong 30s coi data còn “tươi”, không tự gọi lại API.
 * - Nút Refresh gọi `refetch()` → bỏ qua staleTime, lấy số mới từ Mongo.
 */
export function useUserBalance() {
  // getToken: lấy JWT Clerk phía client để gắn Bearer cho service.
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const query = useQuery({
    queryKey: userKeys.balance(),
    // Chỉ fetch khi Clerk đã load và user đã login (tránh 401 sớm).
    enabled: isLoaded && !!isSignedIn,
    staleTime: 30_000,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Chưa có token Clerk — hãy đăng nhập lại.");
      }
      return getUserProfile(token);
    },
  });

  return {
    /** Số dư (undefined khi đang load / lỗi). */
    balance: query.data?.balance,
    /** Email từ API (tiện debug; UI chào vẫn lấy từ Server Component). */
    email: query.data?.email,
    isLoading: query.isLoading || !isLoaded,
    isError: query.isError,
    error: query.error,
    /**
     * Gọi lại API ngay — bỏ qua staleTime.
     * Dùng invalidate + refetch để chắc chắn luôn hit network (học M4).
     */
    refetch: query.refetch,
    /** true khi đang refetch (sau Refresh), khác lần load đầu. */
    isFetching: query.isFetching,
    /** isRefetching = đang fetch lại khi đã có data (nút Refresh). */
    isRefetching: query.isRefetching,
    /**
     * Timestamp lần data cập nhật thành công (ms).
     * UI hiện giờ này để thấy Refresh “có chạy” dù số dư không đổi.
     */
    dataUpdatedAt: query.dataUpdatedAt,
  };
}
