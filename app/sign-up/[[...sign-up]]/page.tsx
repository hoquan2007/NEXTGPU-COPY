/**
 * /sign-up — Trang đăng ký Clerk.
 *
 * Tương tự /sign-in: catch-all để Clerk xử lý bước phụ (verify email…).
 *
 * Milestone: M2 Auth Clerk.
 */
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-gradient-to-br from-hero-from via-hero-via to-hero-to px-5 py-16">
      <SignUp
        forceRedirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </main>
  );
}
