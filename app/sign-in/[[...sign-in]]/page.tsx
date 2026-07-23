/**
 * /sign-in — Trang đăng nhập Clerk.
 *
 * Vì sao folder `[[...sign-in]]` (catch-all tùy chọn)?
 * - Clerk cần nested path (vd. /sign-in/factor-one, SSO callback).
 * - `[[...]]` = optional catch-all: /sign-in và /sign-in/* đều khớp.
 *
 * Milestone: M2 Auth Clerk.
 */
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-gradient-to-br from-hero-from via-hero-via to-hero-to px-5 py-16">
      {/*
        SignIn = UI sẵn của Clerk (form email/password, OAuth…).
        forceRedirectUrl: sau login thành công → dashboard (M2 done condition).
      */}
      <SignIn
        forceRedirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </main>
  );
}
