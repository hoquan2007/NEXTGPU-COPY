/**
 * page.tsx — Trang Home `/` (Landing).
 *
 * Vì sao tách Header / Hero / Benefits / Footer thành component riêng?
 * - Giống cấu trúc NextGPU thật: `src/components/layout/*` + `src/components/home/*`.
 * - Mỗi file một trách nhiệm → dễ đọc, dễ sửa khi làm M2+.
 *
 * Milestone: M1 Landing (tĩnh, chưa Auth/Clerk).
 */
import { Benefits } from "@/src/components/home/Benefits";
import { Hero } from "@/src/components/home/Hero";
import { Footer } from "@/src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";

export default function Home() {
  return (
    <>
      {/* Header absolute đè lên Hero — không đẩy nội dung xuống */}
      <Header />
      <main className="flex-1">
        {/* Hero = nửa trên (viewport đầu); Benefits = section cuộn xuống */}
        <Hero />
        <Benefits />
      </main>
      <Footer />
    </>
  );
}
