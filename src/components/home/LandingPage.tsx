/**
 * LandingPage.tsx — Landing full-effect (video, particle, typewriter, terminal, reveal).
 *
 * Mượn cấu trúc mẫu “CORE // ENTER” nhưng brand = MiniNextGPU + CTA Clerk.
 * Video: public/video.mp4 — nếu thiếu thì hiện mesh fallback.
 *
 * Milestone: M4.5 Landing Visual Refresh (full effects theo yêu cầu).
 */
"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HeaderAuth } from "@/src/components/layout/HeaderAuth";
import "./landing.css";

type RevealId =
  | "architecture"
  | "console"
  | "modules"
  | "hardware"
  | "subscribe";

export function LandingPage() {
  const [revealed, setRevealed] = useState<Set<RevealId>>(new Set());
  const [videoOk, setVideoOk] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const typewriterRef = useRef<HTMLSpanElement | null>(null);

  const particles = useMemo(
    () => [
      { left: "14%", size: 3, duration: "4.5s", delay: "0s" },
      { left: "39%", size: 2, duration: "3.8s", delay: "1.2s" },
      { left: "67%", size: 4, duration: "5.2s", delay: "2.4s" },
      { left: "83%", size: 2.5, duration: "4.2s", delay: "0.7s" },
      { left: "58%", size: 2, duration: "4.9s", delay: "3.1s" },
    ],
    [],
  );

  /* Nav thu nhỏ + parallax video khi cuộn */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `translateY(${y * 0.3}px)`;
      }
      const nav = document.getElementById("landing-top-nav");
      if (!nav) return;
      if (y > 60) {
        nav.classList.remove("h-20", "border-transparent");
        nav.classList.add(
          "h-16",
          "bg-[#080b0e]/90",
          "backdrop-blur-md",
          "border-[#222c37]",
        );
      } else {
        nav.classList.remove(
          "h-16",
          "bg-[#080b0e]/90",
          "backdrop-blur-md",
          "border-[#222c37]",
        );
        nav.classList.add("h-20", "border-transparent");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal section khi vào viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute(
                "data-reveal-id",
              ) as RevealId | null;
              if (id) next.add(id);
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    document
      .querySelectorAll("[data-reveal-id]")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  /* Typewriter trong terminal giả */
  useEffect(() => {
    const sequences = [
      "rent gpu --name=RTX-4090",
      "list machines --status=available",
      "balance --refresh",
    ];
    let sequenceIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeout: number | undefined;

    const tick = () => {
      const el = typewriterRef.current;
      if (!el) return;
      const current = sequences[sequenceIndex];

      if (!deleting) {
        characterIndex += 1;
        el.textContent = current.slice(0, characterIndex);
        if (characterIndex >= current.length) {
          deleting = true;
          timeout = window.setTimeout(tick, 1600);
          return;
        }
        timeout = window.setTimeout(tick, 90);
      } else {
        characterIndex -= 1;
        el.textContent = current.slice(0, Math.max(characterIndex, 0));
        if (characterIndex <= 0) {
          deleting = false;
          sequenceIndex = (sequenceIndex + 1) % sequences.length;
        }
        timeout = window.setTimeout(tick, 40);
      }
    };

    timeout = window.setTimeout(tick, 900);
    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  const revealClass = (id: RevealId) =>
    revealed.has(id)
      ? "landing-code-reveal active"
      : "landing-code-reveal";

  return (
    <div className="landing-root min-h-screen overflow-x-hidden antialiased">
      {/* Lớp nền cố định: lưới + lamp + particles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 landing-terminal-grid" />
        <div className="absolute left-[10%] top-[20%] h-[50vw] w-[50vw] rounded-full blur-3xl landing-ambient-lamp" />
        <div className="absolute bottom-[10%] right-[-5%] h-[40vw] w-[40vw] rounded-full bg-[#38bdf8]/5 blur-[120px]" />
        {particles.map((p, i) => (
          <div
            key={i}
            className="landing-particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <nav
        id="landing-top-nav"
        className="fixed left-0 top-0 z-50 flex h-20 w-full items-center border-b border-transparent transition-all duration-300"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-base font-bold tracking-wider text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f0ff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00f0ff]" />
            </span>
            MiniNextGPU
          </Link>

          <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-slate-400 md:flex">
            <a
              href="#architecture"
              className="transition-colors hover:text-[#00f0ff]"
            >
              Architecture
            </a>
            <a href="#console" className="transition-colors hover:text-[#00f0ff]">
              Console
            </a>
            <a href="#modules" className="transition-colors hover:text-[#00f0ff]">
              Modules
            </a>
            <a
              href="#hardware"
              className="transition-colors hover:text-[#00f0ff]"
            >
              Hardware
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden border border-[#222c37] bg-[#11161b] px-3 py-1 font-mono text-[10px] text-[#ffb03a] sm:inline-block">
              LEARN // CLONE
            </span>
            {/* Clerk: Login / Dashboard — variant hero (chữ sáng) */}
            <HeaderAuth variant="hero" />
          </div>
        </div>
      </nav>

      <header className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {/* Fallback luôn nằm dưới; video đè lên nếu load OK */}
          <div
            className="landing-video-fallback absolute inset-0 opacity-80"
            aria-hidden
          />
          {videoOk ? (
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-40 mix-blend-screen"
              style={{ willChange: "transform" }}
              onError={() => setVideoOk(false)}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b0e] via-[#080b0e]/5 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 py-12 lg:grid-cols-12">
          <div className="space-y-8 text-left lg:col-span-7">
            <div className="inline-flex items-center gap-3 border border-[#222c37] bg-[#11161b]/80 px-4 py-1.5">
              <Icon
                icon="radix-icons:dot-filled"
                className="animate-spin text-[#ffb03a]"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
                Mini clone · NextGPU learning lab
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
              Thuê GPU cloud
              <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#ffb03a] to-[#f59e0b] bg-clip-text font-mono text-transparent">
                MiniNextGPU.
              </span>
            </h1>

            <p className="max-w-xl text-base font-light leading-relaxed text-slate-400 sm:text-lg">
              Học full-stack giống project thật: Clerk login, Mongo số dư, React
              Query, thuê / dừng máy giả lập — deploy trên Vercel.
            </p>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="landing-keycap-glow rounded-none bg-[#38bdf8] px-8 py-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-[#080b0e] transition-all hover:bg-[#00f0ff]"
              >
                Bắt đầu ngay
              </Link>
              <a
                href="#architecture"
                className="rounded-none border border-[#222c37] bg-[#11161b]/40 px-8 py-4 text-center font-mono text-xs font-light uppercase tracking-widest text-slate-300 transition-all hover:border-slate-400"
              >
                Xem kiến trúc
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <section
          id="architecture"
          data-reveal-id="architecture"
          className={`${revealClass("architecture")} mx-auto max-w-7xl px-6 py-32`}
        >
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <span className="block font-mono text-xs uppercase tracking-widest text-[#ffb03a]">
                Stack học tập
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Kiến trúc Mini Clone
              </h2>
              <p className="font-light leading-relaxed text-slate-400">
                Browser → Next.js (pages + API routes) → Clerk Auth → MongoDB
                Atlas → (sau này) Supabase Storage. Đúng pipeline project công
                ty, thu gọn để học.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border-l-2 border-[#38bdf8] pl-4">
                  <div className="font-mono text-xl font-bold text-white">
                    M0–M10
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">
                    Roadmap rõ
                  </div>
                </div>
                <div className="border-l-2 border-[#ffb03a] pl-4">
                  <div className="font-mono text-xl font-bold text-white">
                    Free tier
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">
                    Vercel · Atlas · Clerk
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              <div className="landing-isometric-card space-y-4 border border-[#222c37] bg-[#161d24] p-8">
                <Icon
                  icon="ph:terminal-window-light"
                  className="text-3xl text-[#38bdf8]"
                />
                <h3 className="text-xl font-semibold text-white">API Routes</h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  Tự viết endpoint trong Next — hiểu request/response trước khi
                  đọc AWS Gateway của bản thật.
                </p>
              </div>
              <div className="landing-isometric-card space-y-4 border border-[#222c37] bg-[#161d24] p-8">
                <Icon
                  icon="ph:lock-simple-light"
                  className="text-3xl text-[#ffb03a]"
                />
                <h3 className="text-xl font-semibold text-white">Clerk Auth</h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  Login / Sign up / session — giống NextGPU production nhất trong
                  free tier.
                </p>
              </div>
              <div className="landing-isometric-card space-y-4 border border-[#222c37] bg-[#161d24] p-8">
                <Icon
                  icon="ph:database-light"
                  className="text-3xl text-slate-400"
                />
                <h3 className="text-xl font-semibold text-white">Mongo Atlas</h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  users, machines, rentals, transactions — seed giả lập đủ để
                  thuê / dừng.
                </p>
              </div>
              <div className="landing-isometric-card space-y-4 border border-[#222c37] bg-[#161d24] p-8">
                <Icon
                  icon="ph:arrows-clockwise-light"
                  className="text-3xl text-[#00f0ff]"
                />
                <h3 className="text-xl font-semibold text-white">
                  Hook → Service
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  React Query + Axios + api-endpoints — UI không fetch lung tung.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="console"
          data-reveal-id="console"
          className={`${revealClass("console")} border-y border-[#222c37] bg-[#11161b]/50 py-32`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
                Live demo UI
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Terminal giả lập
              </h2>
            </div>

            <div className="mx-auto w-full max-w-4xl overflow-hidden border border-[#222c37] bg-[#080b0e] shadow-2xl">
              <div className="flex select-none items-center justify-between border-b border-[#222c37] bg-[#11161b] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
                  <span className="ml-2 font-mono text-xs text-slate-500">
                    mini_nextgpu.sh
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-600">
                  TTY // 1
                </span>
              </div>

              <div className="min-h-[320px] space-y-4 bg-gradient-to-b from-[#080b0e] to-[#11161b]/20 p-6 font-mono text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[#38bdf8]">intern@mininextgpu:~$</span>
                  <span className="text-slate-300">auth login --provider=clerk</span>
                </div>
                <div className="space-y-1 text-slate-500">
                  <div>[ OK ] Session cookie verified…</div>
                  <div>[ OK ] Mongo profile balance=100000…</div>
                  <div>[ OK ] React Query cache warm (staleTime=30s)…</div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#38bdf8]">intern@mininextgpu:~$</span>
                  <span className="text-slate-300">cat philosophy.txt</span>
                </div>
                <div className="border border-[#222c37]/60 bg-[#161d24]/50 p-4 leading-relaxed text-[#ffb03a]">
                  &quot;Hiểu UI → Hook → Service → API → DB trước khi đụng Vast.ai
                  hay S3 multipart. Clone đủ nhỏ để học, đủ thật để map code công
                  ty.&quot;
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[#38bdf8]">intern@mininextgpu:~$</span>
                  <span
                    ref={typewriterRef}
                    className="landing-cursor-blink text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="modules"
          data-reveal-id="modules"
          className={`${revealClass("modules")} mx-auto max-w-7xl px-6 py-32`}
        >
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-[#ffb03a]">
                Lợi ích
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Ba node cốt lõi
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light text-slate-400">
              Đủ để hiểu thuê GPU cloud — không cần instance thật ở giai này.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group flex h-80 flex-col justify-between border border-[#222c37] bg-[#161d24] p-8 transition-colors hover:border-[#38bdf8]/40">
              <div>
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#38bdf8]/20 bg-[#38bdf8]/10 text-xl text-[#38bdf8]">
                    <Icon icon="ph:currency-circle-dollar-light" />
                  </div>
                  <span className="font-mono text-xs text-slate-600">
                    01 / NODE
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#38bdf8]">
                  Giá theo giờ
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  Chọn máy GPU, trừ số dư khi thuê — xem rõ trên Dashboard +
                  Refresh React Query.
                </p>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Status: Balance live
              </div>
            </div>

            <div className="group flex h-80 flex-col justify-between border border-[#222c37] bg-[#161d24] p-8 transition-colors hover:border-[#ffb03a]/40">
              <div>
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#ffb03a]/20 bg-[#ffb03a]/10 text-xl text-[#ffb03a]">
                    <Icon icon="ph:cpu-light" />
                  </div>
                  <span className="font-mono text-xs text-slate-600">
                    02 / NODE
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#ffb03a]">
                  Máy sẵn sàng
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  List máy giả lập (RTX…) trong Mongo — available / rented, chuẩn
                  bị cho M5–M6.
                </p>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Status: Seeded Atlas
              </div>
            </div>

            <div className="group flex h-80 flex-col justify-between border border-[#222c37] bg-[#161d24] p-8 transition-colors hover:border-[#00f0ff]/40">
              <div>
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#00f0ff]/20 bg-[#00f0ff]/10 text-xl text-[#00f0ff]">
                    <Icon icon="ph:layout-light" />
                  </div>
                  <span className="font-mono text-xs text-slate-600">
                    03 / NODE
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#00f0ff]">
                  Dashboard pattern
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">
                  Overview → machines → my machines → billing — map sang folder
                  features của bản thật.
                </p>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                Status: M5 next
              </div>
            </div>
          </div>
        </section>

        <section
          id="hardware"
          data-reveal-id="hardware"
          className={`${revealClass("hardware")} border-t border-[#222c37] bg-[#161d24]/30 py-32`}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12">
            <div className="relative order-2 lg:order-1 lg:col-span-6">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#38bdf8]/5 blur-[100px]" />
              <div className="relative z-10 space-y-4 border border-[#222c37] bg-[#080b0e] p-8 font-mono text-xs">
                <div className="flex justify-between border-b border-[#222c37]/40 pb-3 text-slate-500">
                  <span>GPU MATRIX</span>
                  <span>SEED SAMPLE</span>
                </div>
                <div className="flex justify-between border-b border-[#222c37]/40 pb-2">
                  <span className="text-slate-400">RTX 3060</span>
                  <span className="text-white">available · / giờ</span>
                </div>
                <div className="flex justify-between border-b border-[#222c37]/40 pb-2">
                  <span className="text-slate-400">RTX 4070</span>
                  <span className="text-white">available · / giờ</span>
                </div>
                <div className="flex justify-between border-b border-[#222c37]/40 pb-2">
                  <span className="text-slate-400">RTX 4090</span>
                  <span className="text-[#ffb03a]">flagship demo</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">Remote desktop</span>
                  <span className="text-slate-500">stub — không OTP thật</span>
                </div>
              </div>
            </div>

            <div className="order-1 space-y-6 lg:order-2 lg:col-span-6">
              <span className="block font-mono text-xs uppercase tracking-widest text-[#38bdf8]">
                Hardware layer
              </span>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Máy GPU giả lập, luồng thuê thật.
              </h2>
              <p className="font-light leading-relaxed text-slate-400">
                Clone không gắn Vast.ai — chỉ trạng thái + số dư. Đủ để học
                mutation, invalidate cache, và đọc MyMachines của project thật
                sau này.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-block bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#080b0e] transition-colors hover:bg-[#f59e0b]"
                >
                  Vào Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="subscribe"
          data-reveal-id="subscribe"
          className={`${revealClass("subscribe")} relative mx-auto max-w-4xl overflow-hidden px-6 py-32 text-center`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[#ffb03a]/5 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <Icon
              icon="ph:fingerprint-light"
              className="mx-auto animate-pulse text-4xl text-[#38bdf8]"
            />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Sẵn sàng học tiếp?
            </h2>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-slate-400 sm:text-base">
              Tạo tài khoản Clerk → nhận số dư giả 100.000 VND → chuẩn bị M5 list
              máy.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="w-full bg-[#38bdf8] px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#080b0e] transition-colors hover:bg-[#00f0ff] sm:w-auto"
              >
                Sign up
              </Link>
              <Link
                href="/sign-in"
                className="w-full border border-[#222c37] px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:border-[#38bdf8] sm:w-auto"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden border-t border-[#222c37]/40 bg-[#11161b] px-6 pb-12 pt-20">
          <div className="mx-auto mb-16 grid max-w-7xl items-start gap-16 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <Link
                href="/"
                className="font-mono text-lg font-bold tracking-wider text-white"
              >
                MiniNextGPU
              </Link>
              <p className="max-w-sm text-sm font-light leading-relaxed text-slate-500">
                Bản sao học tập của NextGPU — không phải production. Mục tiêu:
                hiểu kiến trúc trước khi onboard task thật.
              </p>
            </div>

            <div className="grid w-full gap-12 md:grid-cols-3 lg:col-span-7">
              <div>
                <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-[#ffb03a]">
                  Learn
                </h4>
                <ul className="space-y-4 font-mono text-xs text-slate-400">
                  <li>
                    <a href="#architecture" className="hover:text-white">
                      Architecture
                    </a>
                  </li>
                  <li>
                    <a href="#console" className="hover:text-white">
                      Console
                    </a>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-[#ffb03a]">
                  Auth
                </h4>
                <ul className="space-y-4 font-mono text-xs text-slate-400">
                  <li>
                    <Link href="/sign-in" className="hover:text-white">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/sign-up" className="hover:text-white">
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-[#ffb03a]">
                  Repo
                </h4>
                <div className="flex gap-4 text-xl text-slate-500">
                  <a
                    href="https://github.com/hoquan2007/NEXTGPU-COPY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                    aria-label="GitHub"
                  >
                    <Icon icon="ph:github-logo-light" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#222c37]/40 pt-8 font-mono text-[10px] uppercase tracking-widest text-slate-600 sm:flex-row">
            <p>© 2026 MiniNextGPU · Learning clone</p>
            <p>Not affiliated with production NextGPU</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
