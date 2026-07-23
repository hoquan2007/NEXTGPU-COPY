/**
 * UserBalanceCard — Hiện số dư ví qua React Query + nút Refresh.
 *
 * Vì sao tách Client Component riêng?
 * - Dashboard page vẫn là Server Component (chào email, UserButton).
 * - Hook `useUserBalance` cần "use client" → không gọi trực tiếp trong Server Component.
 *
 * Pipeline học: UI → Hook → Service → Axios → GET /api/listUserProfile.
 *
 * Lưu ý học: nếu không sửa balance trên Mongo, bấm Refresh số vẫn y nguyên —
 * nhưng dòng “Cập nhật lúc …” phải đổi giây → chứng tỏ API đã gọi lại.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */
"use client";

import { useUserBalance } from "@/src/hooks/user/useUserBalance";

/** Format số dư VND giả cho dễ đọc (vd. 100000 → "100.000"). */
function formatBalance(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

/** Hiện giờ:phút:giây lần data cập nhật — để thấy Refresh có chạy. */
function formatUpdatedAt(ms: number): string {
  if (!ms) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ms));
}

export function UserBalanceCard() {
  const {
    balance,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isRefetching,
    dataUpdatedAt,
  } = useUserBalance();

  return (
    <section className="mt-10 max-w-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-foreground">
          Số dư ví
        </h2>
        {/*
          Refresh = refetch() — bỏ qua staleTime, gọi lại API ngay.
          Done M4: sửa balance trên Compass → Refresh → số đổi.
          Nếu không sửa Mongo: số giữ nguyên, nhưng “Cập nhật lúc” vẫn đổi.
        */}
        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          disabled={isFetching}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRefetching || isFetching ? "Đang tải…" : "Refresh"}
        </button>
      </div>

      {isLoading ? (
        <p className="mt-2 text-sm text-muted">Đang tải số dư…</p>
      ) : isError ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Không đọc được số dư từ API. Kiểm tra đăng nhập,{" "}
          <code className="text-foreground">MONGODB_URI</code> và Network Access
          Atlas.
          {error instanceof Error ? (
            <>
              <br />
              <span className="text-foreground/80">Chi tiết: {error.message}</span>
            </>
          ) : null}
        </p>
      ) : balance !== undefined ? (
        <>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {formatBalance(balance)}{" "}
            <span className="text-base font-medium text-muted">VND</span>
          </p>
          <p className="mt-2 text-xs text-muted">
            Cập nhật lúc {formatUpdatedAt(dataUpdatedAt)}
            {isRefetching ? " · đang làm mới…" : null}
          </p>
        </>
      ) : null}

      <p className="mt-4 text-sm leading-relaxed text-muted">
        Pipeline M4:{" "}
        <code className="text-foreground">useUserBalance</code> →{" "}
        <code className="text-foreground">getUserProfile</code> →{" "}
        <code className="text-foreground">GET /api/listUserProfile</code>
        . Cache <code className="text-foreground">staleTime</code> 30s; Refresh
        lấy số mới ngay. Muốn thấy số đổi: sửa{" "}
        <code className="text-foreground">balance</code> trên Compass trước.
      </p>
    </section>
  );
}
