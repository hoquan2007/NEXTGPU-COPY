/**
 * HeaderAuth.tsx — Phần bên phải Header: Login hoặc Dashboard + avatar.
 *
 * Vì sao Client Component + `useAuth()`?
 * - Session Clerk đổi trên browser → cần hook client để re-render khi login/logout.
 * - `Show` từ `@clerk/nextjs` là Server Component → không dùng trong `"use client"`.
 * - Chỉ khối auth cần client; Header cha vẫn Server Component được.
 *
 * Milestone: M2 Auth Clerk.
 */
"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export function HeaderAuth() {
  // isSignedIn: true khi có session; undefined lúc đang hydrate.
  const { isSignedIn } = useAuth();

  // Chưa biết session (lần đầu load) → không hiện gì để tránh nháy Login rồi đổi.
  if (isSignedIn === undefined) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/sign-in"
          className="text-hero-muted transition-colors hover:text-hero-text"
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          className="text-hero-muted transition-colors hover:text-hero-text"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <Link
        href="/dashboard"
        className="text-hero-muted transition-colors hover:text-hero-text"
      >
        Dashboard
      </Link>
      <UserButton />
    </div>
  );
}
