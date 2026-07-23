/**
 * Header.tsx — Thanh điều hướng trên cùng landing.
 *
 * Vì sao `absolute` thay vì sticky bình thường?
 * - Hero là full-bleed (chiếm cả viewport). Header nằm đè lên Hero
 *   để brand + nav nằm trong “một composition” đầu trang.
 *
 * Nav (M2):
 * - Pricing → #benefits
 * - Login / Dashboard+avatar → HeaderAuth (theo session Clerk)
 *
 * Milestone: M1 → M2 Auth.
 */
import Link from "next/link";
import { HeaderAuth } from "@/src/components/layout/HeaderAuth";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 animate-fade-in">
      {/* max-w-6xl + mx-auto: căn giữa, đồng bộ bề rộng với Hero/Benefits/Footer */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        {/* Logo text = tín hiệu brand; Link nội bộ Next (không reload full page) */}
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-hero-text transition-opacity hover:opacity-80 sm:text-xl"
        >
          MiniNextGPU
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium sm:gap-8">
          {/* <a href="#..."> vì đây là anchor cùng trang, không cần Client Router */}
          <a
            href="#benefits"
            className="text-hero-muted transition-colors hover:text-hero-text"
          >
            Pricing
          </a>
          {/* Client: Login hoặc Dashboard + UserButton tùy đã đăng nhập chưa */}
          <HeaderAuth />
        </nav>
      </div>
    </header>
  );
}
