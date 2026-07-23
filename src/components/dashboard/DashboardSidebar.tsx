/**
 * DashboardSidebar — Menu trái trong shell dashboard.
 *
 * Vì sao tách Client Component?
 * - Cần `usePathname()` để highlight tab đang mở.
 * - Layout cha vẫn có thể là Server Component (top bar + UserButton server-side).
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Các tab dashboard — path khớp nested routes dưới `app/dashboard/`. */
const NAV_ITEMS = [
  { href: "/dashboard/overview", label: "Overview" },
  { href: "/dashboard/machines", label: "Machines" },
  { href: "/dashboard/mymachines", label: "My Machines" },
  { href: "/dashboard/billing", label: "Billing" },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-border bg-surface md:w-56 md:border-b-0 md:border-r">
      <nav className="flex gap-1 overflow-x-auto px-3 py-3 md:flex-col md:px-4 md:py-6" aria-label="Dashboard">
        {NAV_ITEMS.map((item) => {
          // Active = đúng path hiện tại (không dùng startsWith để tránh /machines khớp /mymachines).
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
