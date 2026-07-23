/**
 * src/provider/QueryProvider.tsx — Bọc app bằng React Query.
 *
 * Vì sao cần Provider?
 * - `useQuery` / `useMutation` đọc QueryClient từ context.
 * - Không có provider → hook crash: "No QueryClient set".
 *
 * Vì sao tạo QueryClient trong useState (không new ngoài component)?
 * - Tránh chia sẻ 1 client giữa nhiều request SSR (leak data giữa user).
 * - Client chỉ tạo 1 lần trên browser khi mount.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  // useState(() => …) = lazy init: chỉ chạy 1 lần, không tạo client mới mỗi render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Retry 1 lần khi lỗi mạng tạm thời — đủ học, không spam API.
            retry: 1,
            // Không refetch mỗi lần focus tab (dễ gây “nhảy” số dư khi học).
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
