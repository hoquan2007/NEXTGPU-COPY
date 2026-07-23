import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-hero-from via-hero-via to-hero-to">
      {/* Full-bleed atmosphere — subtle grid + soft light, not a card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 70% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-[40%] bg-[#2a9d8f]/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-[40%] bg-[#e9c46a]/15 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
        <p className="animate-fade-up font-[family-name:var(--font-syne)] text-5xl font-extrabold leading-[1.05] tracking-tight text-hero-text sm:text-7xl md:text-8xl">
          MiniNextGPU
        </p>
        <h1 className="animate-fade-up animate-delay-1 mt-5 max-w-xl text-xl font-medium text-hero-text sm:text-2xl md:text-3xl">
          Thuê GPU cloud
        </h1>
        <p className="animate-fade-up animate-delay-2 mt-4 max-w-md text-base leading-relaxed text-hero-muted sm:text-lg">
          Học làm web bằng mini clone NextGPU — đăng nhập, xem máy, thuê và dừng
          giả lập.
        </p>
        <div className="animate-fade-up animate-delay-3 mt-10 flex flex-wrap gap-3">
          <Link
            href="/sign-in"
            className="inline-flex h-11 items-center justify-center bg-hero-text px-6 text-sm font-semibold text-hero-from transition-colors hover:bg-white"
          >
            Bắt đầu
          </Link>
          <a
            href="#benefits"
            className="inline-flex h-11 items-center justify-center border border-hero-muted/50 px-6 text-sm font-semibold text-hero-text transition-colors hover:border-hero-text hover:bg-white/5"
          >
            Xem lợi ích
          </a>
        </div>
      </div>
    </section>
  );
}
