/**
 * Hero.tsx — Viewport đầu landing (full-bleed).
 *
 * Ngân sách: brand lớn → headline → 1 câu phụ → CTA → atmosphere.
 * M4.5: tinh chỉnh lưới/blob/gradient; vẫn không video / card / badge nổi.
 *
 * Milestone: M1 → M4.5 Visual Refresh.
 */
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-hero-from via-hero-via to-hero-to">
      {/* Atmosphere: lưới + soft glow — không phải nội dung */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 65% 35%, black 15%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-[12%] h-[32rem] w-[32rem] rounded-[45%] bg-[#2a9d8f]/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-[-10%] h-72 w-72 rounded-[40%] bg-[#e9c46a]/18 blur-3xl"
      />
      {/* Vệt sáng nhẹ góc phải — chiều sâu, không glow neon */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[28%] h-40 w-40 rounded-full bg-hero-text/[0.07] blur-2xl"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
        <p className="animate-fade-up font-[family-name:var(--font-syne)] text-5xl font-extrabold leading-[1.05] tracking-tight text-hero-text sm:text-7xl md:text-8xl">
          MiniNextGPU
        </p>
        <h1 className="animate-fade-up animate-delay-1 mt-6 max-w-xl text-xl font-medium tracking-tight text-hero-text sm:text-2xl md:text-3xl">
          Thuê GPU cloud
        </h1>
        <p className="animate-fade-up animate-delay-2 mt-4 max-w-lg text-base leading-relaxed text-hero-muted sm:text-lg">
          Học làm web bằng mini clone NextGPU — đăng nhập, xem máy, thuê và dừng
          giả lập.
        </p>
        <div className="animate-fade-up animate-delay-3 mt-11 flex flex-wrap gap-3">
          <Link
            href="/sign-in"
            className="inline-flex h-12 items-center justify-center bg-hero-text px-7 text-sm font-semibold text-hero-from transition-colors hover:bg-white"
          >
            Bắt đầu
          </Link>
          <a
            href="#benefits"
            className="inline-flex h-12 items-center justify-center border border-hero-muted/45 px-7 text-sm font-semibold text-hero-text transition-colors hover:border-hero-text hover:bg-white/5"
          >
            Xem lợi ích
          </a>
        </div>
      </div>

      {/* Đáy hero → nền sáng Benefits mượt hơn */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent"
      />
    </section>
  );
}
