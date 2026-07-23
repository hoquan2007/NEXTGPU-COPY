/**
 * Header.tsx — Thanh điều hướng landing (M4.5: đổi style khi cuộn).
 *
 * - Trên hero (y nhỏ): fixed trong suốt, chữ hero-text (đè full-bleed).
 * - Sau khi cuộn qua ~60px: nền surface + blur, chữ foreground (đọc được trên nền sáng).
 *
 * Milestone: M1 → M2 Auth → M4.5 Visual Refresh.
 */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderAuth } from "@/src/components/layout/HeaderAuth";

export function Header() {
  // scrolled = đã rời “vùng hero trong suốt” → chuyển sang bar đặc.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-20 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8",
          scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20",
        ].join(" ")}
      >
        <Link
          href="/"
          className={[
            "font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight transition-colors sm:text-xl",
            scrolled
              ? "text-foreground hover:opacity-80"
              : "text-hero-text hover:opacity-80",
          ].join(" ")}
        >
          MiniNextGPU
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium sm:gap-8">
          <a
            href="#benefits"
            className={[
              "transition-colors",
              scrolled
                ? "text-muted hover:text-foreground"
                : "text-hero-muted hover:text-hero-text",
            ].join(" ")}
          >
            Pricing
          </a>
          {/* variant: đổi màu link Login/Dashboard theo trạng thái header */}
          <HeaderAuth variant={scrolled ? "solid" : "hero"} />
        </nav>
      </div>
    </header>
  );
}
