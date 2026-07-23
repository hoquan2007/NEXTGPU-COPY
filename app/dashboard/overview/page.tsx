/**
 * /dashboard/overview — Trang chào + số dư ví (React Query).
 *
 * Nội dung chuyển từ `/dashboard` cũ (M4) vào đây để shell có tab rõ ràng.
 * Pipeline số dư không đổi: UserBalanceCard → useUserBalance → API.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
import { currentUser } from "@clerk/nextjs/server";
import { UserBalanceCard } from "@/src/components/dashboard/UserBalanceCard";

export default async function OverviewPage() {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "bạn";

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        Overview
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Xin chào, {email}
      </h1>

      {/* Client: số dư + Refresh — không fetch lung tung trong Server Component */}
      <UserBalanceCard />
    </div>
  );
}
