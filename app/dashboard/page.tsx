/**
 * /dashboard — Sau login: chào user + số dư qua React Query (M4).
 *
 * Vì sao không còn đọc Mongo trực tiếp ở Server Component?
 * - M3 đã chứng minh Server → Mongo hoạt động.
 * - M4 học pipeline client: Hook → Service → Axios → API (có cache + Refresh).
 * - Lần đầu user vẫn được tạo khi API `listUserProfile` gọi `getOrCreateUserProfile`.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserBalanceCard } from "@/src/components/dashboard/UserBalanceCard";

export default async function DashboardPage() {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "bạn";

  return (
    <main className="min-h-[100svh] bg-background">
      {/* Thanh trên: brand + UserButton (avatar → menu Logout) */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            MiniNextGPU
          </Link>
          <UserButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Dashboard
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Xin chào, {email}
        </h1>

        {/* Client: số dư + Refresh — không fetch lung tung trong UI */}
        <UserBalanceCard />
      </div>
    </main>
  );
}
