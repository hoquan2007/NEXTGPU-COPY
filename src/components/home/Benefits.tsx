/**
 * Benefits.tsx — Section 3 lợi ích (text-first) + reveal khi scroll.
 *
 * M4.5: Reveal wrapper + số thứ tự nhẹ + scroll-mt lớn hơn (header fixed).
 * Vẫn không dùng card shadow nặng kiểu marketing cyber.
 *
 * Milestone: M1 → M4.5 Visual Refresh.
 */
import { Reveal } from "@/src/components/home/Reveal";

const benefits = [
  {
    title: "Giá theo giờ",
    description:
      "Chọn máy GPU, trả theo thời gian thuê — số dư cập nhật rõ ràng trên dashboard.",
  },
  {
    title: "Máy sẵn sàng nhanh",
    description:
      "Danh sách máy giả lập sẵn trong hệ thống: xem status, thuê và dừng trong vài bước.",
  },
  {
    title: "Dashboard đơn giản",
    description:
      "Overview, máy của tôi, billing — cùng pattern UI → Hook → Service → API như project thật.",
  },
] as const;

export function Benefits() {
  return (
    // scroll-mt-24: chừa chỗ header fixed khi nhảy #benefits
    <section id="benefits" className="scroll-mt-24 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Lợi ích
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vì sao dùng MiniNextGPU
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Ba điểm cốt lõi của bản clone học tập — đủ để hiểu luồng thuê GPU
            cloud.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-10">
          {benefits.map((item, index) => (
            <li key={item.title}>
              <Reveal delayMs={index * 100}>
                <p className="font-[family-name:var(--font-syne)] text-sm font-semibold tabular-nums text-accent/80">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-syne)] text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
