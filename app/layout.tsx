/**
 * layout.tsx — Layout gốc của toàn bộ app (App Router).
 *
 * Vì sao cần file này?
 * - Mọi trang đều bọc trong layout này: thẻ <html>, <body>, font, CSS chung.
 * - Metadata (title/description) giúp tab trình duyệt và SEO có tên MiniNextGPU.
 *
 * Milestone: M1 Landing → M2 Auth (thêm ClerkProvider).
 */
import type { Metadata } from "next";
// ClerkProvider: cung cấp session/auth context cho mọi component con (client + server).
import { ClerkProvider } from "@clerk/nextjs";
// next/font/google: tải font từ Google, tối ưu (self-host) — tránh layout shift.
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

/**
 * Syne = font display (chữ to, brand).
 * `variable` tạo CSS variable --font-syne để dùng trong className / globals.css.
 */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

/** DM Sans = font chữ đọc thường (đoạn văn, nút, nav). */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Metadata mặc định cho trang — hiện trên tab browser. */
export const metadata: Metadata = {
  title: "MiniNextGPU — Thuê GPU cloud",
  description:
    "Mini clone học tập của NextGPU: thuê GPU cloud giả lập để học web full-stack.",
};

/**
 * RootLayout nhận `children` = nội dung từng trang (vd. page.tsx).
 * lang="vi" vì landing đang viết tiếng Việt (M9 sẽ thêm i18n).
 *
 * ClerkProvider đặt *trong* <body> (rule Clerk hiện tại):
 * không wrap ngoài <html>/<body> để tránh lỗi hydration / HTML invalid.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      // Gắn CSS variables của 2 font lên <html> để toàn app dùng được.
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      {/* flex-col + min-h-full: footer có thể nằm cuối trang khi nội dung ngắn */}
      <body className="min-h-full flex flex-col font-sans">
        {/*
          afterSignOutUrl: sau Logout về landing.
          (API mới: prop này nằm trên ClerkProvider, không còn trên UserButton.)
        */}
        <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
      </body>
    </html>
  );
}
