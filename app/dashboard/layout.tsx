/**
 * app/dashboard/layout.tsx — Shell chung cho mọi trang dashboard.
 *
 * Vì sao dùng layout thay vì copy header ở mỗi page?
 * - App Router: layout bọc children → sidebar + top bar chỉ viết 1 lần.
 * - Đổi tab (overview → machines) không remount shell → UX mượt hơn.
 *
 * Cấu trúc: top bar (logo + UserButton) | sidebar trái + nội dung phải.
 * Theme sáng (token globals) — tách biệt landing tối (M4.5).
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { DashboardSidebar } from "@/src/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh] bg-background">
      {/* Thanh trên: về landing + avatar Clerk (Logout trong menu) */}
      <header className="border-b border-border bg-surface">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            MiniNextGPU
          </Link>
          <UserButton />
        </div>
      </header>

      {/* Sidebar + vùng nội dung — cột trên mobile, hàng trên desktop */}
      <div className="flex min-h-[calc(100svh-3.5rem)] flex-col md:flex-row">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
