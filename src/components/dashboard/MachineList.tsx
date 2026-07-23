/**
 * MachineList — Bảng/list máy GPU từ React Query.
 *
 * mode:
 * - `"all"` — mọi máy (trang Machines).
 * - `"mine"` — chỉ máy `rented` + `rentedBy` = user hiện tại (My Machines).
 *
 * Nút Thuê: disabled stub — trừ tiền / đổi status = Milestone 6.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
"use client";

import { useAuth } from "@clerk/nextjs";
import { useMachines } from "@/src/hooks/machine/useMachines";
import type { MachineListItem } from "@/src/services/machine.service";

type MachineListProps = {
  /** `"all"` = toàn bộ; `"mine"` = đang thuê bởi user hiện tại. */
  mode: "all" | "mine";
};

/** Format giá VND giả (vd. 8000 → "8.000"). */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

function formatUpdatedAt(ms: number): string {
  if (!ms) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ms));
}

/** Nhãn status dễ đọc + màu nhẹ (không dùng card/glow). */
function StatusBadge({ status }: { status: MachineListItem["status"] }) {
  const isAvailable = status === "available";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
        isAvailable
          ? "bg-accent/10 text-accent"
          : "bg-foreground/10 text-muted"
      }`}
    >
      {isAvailable ? "available" : "rented"}
    </span>
  );
}

export function MachineList({ mode }: MachineListProps) {
  const { userId } = useAuth();
  const {
    machines,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isRefetching,
    dataUpdatedAt,
  } = useMachines();

  // My Machines: filter client — chưa cần API riêng ở M5.
  const rows =
    machines === undefined
      ? undefined
      : mode === "mine"
        ? machines.filter(
            (m) => m.status === "rented" && m.rentedBy === userId,
          )
        : machines;

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Cập nhật lúc {formatUpdatedAt(dataUpdatedAt)}
          {isRefetching ? " · đang làm mới…" : null}
        </p>
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
        <p className="mt-6 text-sm text-muted">Đang tải danh sách máy…</p>
      ) : isError ? (
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Không đọc được máy từ API. Kiểm tra đăng nhập và{" "}
          <code className="text-foreground">MONGODB_URI</code>.
          {error instanceof Error ? (
            <>
              <br />
              <span className="text-foreground/80">Chi tiết: {error.message}</span>
            </>
          ) : null}
        </p>
      ) : rows && rows.length === 0 ? (
        <p className="mt-6 text-sm leading-relaxed text-muted">
          {mode === "mine"
            ? "Bạn chưa thuê máy nào. Thuê được ở Milestone 6."
            : "Chưa có máy trong MongoDB — kiểm tra seed / Compass."}
        </p>
      ) : rows ? (
        <>
          {/* Desktop: bảng; mobile: stacked rows (không dùng card) */}
          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="py-3 pr-4 font-medium">Tên</th>
                  <th className="py-3 pr-4 font-medium">GPU</th>
                  <th className="py-3 pr-4 font-medium">Giá/giờ</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 font-medium">Thuê</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id} className="border-b border-border/70">
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {m.name}
                    </td>
                    <td className="py-3 pr-4 text-muted">{m.gpu}</td>
                    <td className="py-3 pr-4 text-foreground">
                      {formatPrice(m.pricePerHour)} VND
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="py-3">
                      {/* Disabled: nghiệp vụ trừ tiền + đổi status = M6 */}
                      <button
                        type="button"
                        disabled
                        title="Sẽ hoạt động ở Milestone 6"
                        className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Thuê
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 space-y-4 md:hidden">
            {rows.map((m) => (
              <li
                key={m.id}
                className="border-b border-border pb-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{m.name}</p>
                    <p className="mt-0.5 text-sm text-muted">{m.gpu}</p>
                    <p className="mt-1 text-sm text-foreground">
                      {formatPrice(m.pricePerHour)} VND/giờ
                    </p>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
                <button
                  type="button"
                  disabled
                  title="Sẽ hoạt động ở Milestone 6"
                  className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Thuê (M6)
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Pipeline M5:{" "}
            <code className="text-foreground">useMachines</code> →{" "}
            <code className="text-foreground">getMachines</code> →{" "}
            <code className="text-foreground">GET /api/listMachine</code>.
          </p>
        </>
      ) : null}
    </section>
  );
}
