/**
 * /dashboard/billing — Stub trang thanh toán / giao dịch.
 *
 * M5 chỉ cần route + sidebar link; lịch sử giao dịch thật = Milestone 7.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
export default function BillingPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        Billing
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground">
        Thanh toán
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Trang stub — lịch sử giao dịch (transactions) sẽ làm ở Milestone 7.
        Hiện chỉ cần biết tab này nằm trong shell dashboard.
      </p>
    </div>
  );
}
