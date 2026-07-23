/**
 * /dashboard — Sau login: chào user + hiện số dư từ Mongo (M3).
 *
 * Vì sao đọc Mongo trực tiếp ở Server Component (chưa dùng React Query)?
 * - M3 tập trung API + DB; M4 mới học pipeline `Hook → Service → Axios`.
 * - Server Component gọi `getOrCreateUserProfile` = cùng logic với API,
 *   không cần Bearer token (đã có session cookie trên server).
 *
 * Milestone: M3 MongoDB + profile / số dư.
 */
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getOrCreateUserProfile } from "@/src/lib/user-profile";

/** Format số dư VND giả cho dễ đọc (vd. 100000 → "100.000"). */
function formatBalance(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

export default async function DashboardPage() {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress ??
    "bạn";

  // proxy đã protect /dashboard → user chắc chắn có id khi vào đây.
  const clerkId = user!.id;

  /**
   * Lần đầu: tạo document users với balance 100000.
   * Lần sau: đọc balance hiện có từ Mongo.
   * Nếu thiếu MONGODB_URI / Atlas chặn IP → hiện lỗi thân thiện.
   */
  let balance: number | null = null;
  let mongoError: string | null = null;

  try {
    const profile = await getOrCreateUserProfile(clerkId, email);
    balance = profile.balance;
  } catch (err) {
    mongoError = err instanceof Error ? err.message : "Lỗi MongoDB không rõ.";
  }

  return (
    <main className="min-h-[100svh] bg-background">
      {/* Thanh trên: brand + UserButton (avatar → menu Logout) */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            MiniNextGPU
          </Link>
          <UserButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          Dashboard
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Xin chào, {email}
        </h1>

        {/* Khối số dư — dữ liệu từ Mongo, không hardcode */}
        <section className="mt-10 max-w-lg">
          <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-foreground">
            Số dư ví
          </h2>
          {balance !== null ? (
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {formatBalance(balance)}{" "}
              <span className="text-base font-medium text-muted">VND</span>
            </p>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Chưa đọc được số dư. Kiểm tra <code className="text-foreground">MONGODB_URI</code>{" "}
              trong <code className="text-foreground">.env.local</code> và Network Access trên
              Atlas.
              {mongoError ? (
                <>
                  <br />
                  <span className="text-foreground/80">Chi tiết: {mongoError}</span>
                </>
              ) : null}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-muted">
            API tương ứng:{" "}
            <code className="text-foreground">GET /api/listUserProfile</code> — M4 sẽ nối
            bằng React Query thay vì đọc trực tiếp ở đây.
          </p>
        </section>
      </div>
    </main>
  );
}
