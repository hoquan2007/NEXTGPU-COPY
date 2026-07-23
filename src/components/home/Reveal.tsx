/**
 * src/components/home/Reveal.tsx — Hiện dần khi section vào viewport.
 *
 * Vì sao dùng IntersectionObserver?
 * - Chỉ animate khi user cuộn tới → nhẹ hơn animate mọi thứ lúc load.
 * - unobserve sau lần đầu → không chạy lại mỗi lần scroll lên xuống.
 *
 * Milestone: M4.5 Landing Visual Refresh.
 */
"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay stagger (ms) khi nhiều khối cạnh nhau. */
  delayMs?: number;
  className?: string;
};

export function Reveal({ children, delayMs = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // prefers-reduced-motion: không ép animation với người nhạy cảm chuyển động.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      node.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
