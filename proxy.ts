/**
 * proxy.ts — Chạy trước mỗi request (Next.js 16+).
 *
 * Vì sao tên `proxy` không phải `middleware`?
 * - Next.js 16 đổi convention: middleware.ts → proxy.ts (cùng vai trò mạng/edge routing).
 * - Clerk vẫn export `clerkMiddleware` — chỉ đổi tên file theo version Next.
 *
 * Việc làm ở đây (M2):
 * - Landing `/` + `/sign-in` + `/sign-up` = công khai (chưa login vẫn vào được).
 * - `/dashboard` = bắt buộc đăng nhập (`auth.protect()` → redirect sign-in nếu chưa login).
 *
 * Milestone: M2 Auth Clerk.
 */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** Các route khách được vào không cần session. */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Chưa public → bắt buộc có session Clerk; không có thì redirect /sign-in.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

/**
 * matcher: chỉ chạy proxy trên trang/API thật.
 * Bỏ qua file tĩnh (_next, ảnh, css…) để không chặn asset vô tình.
 * `/__clerk/:path*` — path auto-proxy của Clerk (bắt buộc theo CLI/docs).
 */
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
