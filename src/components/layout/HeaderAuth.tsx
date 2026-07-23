/**
 * HeaderAuth.tsx — Login / Dashboard + avatar theo session Clerk.
 *
 * `variant`:
 * - "hero" = chữ sáng trên nền hero tối
 * - "solid" = chữ tối trên header blur (sau khi cuộn) — M4.5
 *
 * Milestone: M2 Auth → M4.5 Visual Refresh.
 */
"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

type HeaderAuthProps = {
  /** Màu link theo nền header (trong suốt vs blur). */
  variant?: "hero" | "solid";
};

export function HeaderAuth({ variant = "hero" }: HeaderAuthProps) {
  const { isSignedIn } = useAuth();

  const linkClass =
    variant === "solid"
      ? "text-muted transition-colors hover:text-foreground"
      : "text-hero-muted transition-colors hover:text-hero-text";

  if (isSignedIn === undefined) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-4 sm:gap-6">
        <Link href="/sign-in" className={linkClass}>
          Login
        </Link>
        <Link href="/sign-up" className={linkClass}>
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <Link href="/dashboard" className={linkClass}>
        Dashboard
      </Link>
      <UserButton />
    </div>
  );
}
