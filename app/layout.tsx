/**
 * layout.tsx — Layout gốc của toàn bộ app (App Router).
 *
 * Milestone: M1 Landing → M2 Auth → M4 Query → M4.5 fonts landing (Space Grotesk / JetBrains).
 */
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans, JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import { QueryProvider } from "@/src/provider/QueryProvider";
import "./globals.css";

/** Syne — display (dashboard / legacy). */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

/** DM Sans — body dashboard. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Space Grotesk — landing full-effect (M4.5). */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/** JetBrains Mono — terminal / nav mono trên landing. */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MiniNextGPU — Thuê GPU cloud",
  description:
    "Mini clone học tập của NextGPU: thuê GPU cloud giả lập để học web full-stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${syne.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ClerkProvider afterSignOutUrl="/">
          <QueryProvider>{children}</QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
