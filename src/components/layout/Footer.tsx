/**
 * Footer.tsx — Chân trang đơn giản.
 *
 * Nhắc người xem đây là bản học tập (không phải production NextGPU).
 * Link GitHub giúp mở repo học; Login giữ cùng URL tạm như Header (/sign-in).
 *
 * Milestone: M1.
 */
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      {/* Mobile: xếp dọc; sm+: một hàng (flex-row) giữa chữ và link */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          <span className="font-[family-name:var(--font-syne)] font-semibold text-foreground">
            MiniNextGPU
          </span>
          {" — "}
          bản sao học tập, không phải production.
        </p>
        <div className="flex gap-5">
          {/* target=_blank: mở tab mới; rel noopener: bảo mật khi mở link ngoài */}
          <a
            href="https://github.com/hoquan2007/NEXTGPU-COPY"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link
            href="/sign-in"
            className="transition-colors hover:text-foreground"
          >
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
