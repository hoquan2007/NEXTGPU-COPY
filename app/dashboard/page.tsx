/**
 * /dashboard — Trang sau khi đăng nhập (M2: trống, chỉ chào user).
 *
 * Vì sao Server Component + currentUser()?
 * - `currentUser()` chạy trên server, lấy profile Clerk (email, name…) an toàn.
 * - proxy.ts đã `auth.protect()` nên nếu vào được đây = chắc chắn đã login.
 * - M3 sẽ thêm số dư từ Mongo; M5 mới có sidebar đầy đủ.
 *
 * Milestone: M2 Auth Clerk.
 */
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  // Lấy user hiện tại từ session Clerk (server-side).
  const user = await currentUser();
  // Email chính (Clerk có thể có nhiều emailAddresses).
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
          {/* UserButton = avatar + Sign out; redirect sau logout cấu hình ở ClerkProvider. */}
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
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          Bạn đã đăng nhập thành công. Milestone 2 chỉ cần trang trống này —
          số dư, danh sách máy GPU sẽ thêm từ M3–M5.
        </p>
      </div>
    </main>
  );
}
