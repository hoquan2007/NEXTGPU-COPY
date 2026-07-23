/**
 * src/hooks/machine/useMachines.ts — Hook React Query cho danh sách máy.
 *
 * Pipeline: UI → **Hook** → Service → Axios → API.
 * UI chỉ cần: machines, isLoading, isError, refetch — không biết URL/axios.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { machineKeys } from "@/src/common/query-keys";
import { getMachines } from "@/src/services/machine.service";

/**
 * Đọc danh sách máy từ API (có cache).
 *
 * - `staleTime: 30_000` = trong 30s coi data còn “tươi”.
 * - Nút Refresh gọi `refetch()` → lấy list mới từ Mongo.
 */
export function useMachines() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const query = useQuery({
    queryKey: machineKeys.list(),
    // Chỉ fetch khi Clerk đã load và user đã login (tránh 401 sớm).
    enabled: isLoaded && !!isSignedIn,
    staleTime: 30_000,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Chưa có token Clerk — hãy đăng nhập lại.");
      }
      return getMachines(token);
    },
  });

  return {
    /** Mảng máy (undefined khi đang load / lỗi). */
    machines: query.data?.machines,
    success: query.data?.success,
    isLoading: query.isLoading || !isLoaded,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    dataUpdatedAt: query.dataUpdatedAt,
  };
}
