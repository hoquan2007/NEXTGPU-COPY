/**
 * proxy.ts — Chạy trước mỗi request (Next.js 16+).
 *
 * Vì sao tên `proxy` không phải `middleware`?
 * - Next.js 16 đổi convention: middleware.ts → proxy.ts (cùng vai trò mạng/edge routing).
 * - Clerk vẫn export `clerkMiddleware` — chỉ đổi tên file theo version Next.
 *
 * Việc làm:
 * - Landing `/` + `/sign-in` + `/sign-up` = công khai.
 * - `/api/*` = KHÔNG `auth.protect()` ở đây — để Route Handler tự trả **401 JSON**
 *   (đúng REST; Postman/Thunder không bị redirect HTML sang /sign-in).
 * - Các trang khác (vd. `/dashboard`) = `auth.protect()` → redirect sign-in nếu chưa login.
 *
 * Milestone: M2 Auth → M3 API (401 JSON).
 */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** Các route khách được vào không cần session. */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

/**
 * API routes: vẫn chạy clerkMiddleware (để đọc cookie/Bearer),
 * nhưng không protect/redirect — handler tự quyết 401/200.
 */
const isApiRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req) || isApiRoute(req)) {
    return;
  }

  // Trang app (dashboard…) — chưa login thì redirect /sign-in.
  await auth.protect();
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
