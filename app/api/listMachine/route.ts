/**
 * GET /api/listMachine — Danh sách GPU giả lập từ MongoDB.
 *
 * Vì sao cần auth?
 * - Giống dashboard thật: chỉ user đã login mới xem máy để thuê.
 * - Postman vẫn test được bằng Bearer token (cùng cách listUserProfile).
 *
 * Tên path bắt chước endpoint thật: `/listMachine`.
 * UI list đầy đủ = Milestone 5; M3 chỉ cần API + seed chạy được.
 *
 * Milestone: M3 MongoDB Atlas + API.
 */
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { listMachines } from "@/src/lib/machines";

export async function GET() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized — cần đăng nhập hoặc Bearer token Clerk." },
      { status: 401 },
    );
  }

  try {
    const machines = await listMachines();

    // Map _id ObjectId → string để JSON sạch (frontend dễ dùng).
    const payload = machines.map((m) => ({
      id: String(m._id),
      name: m.name,
      gpu: m.gpu,
      pricePerHour: m.pricePerHour,
      status: m.status,
      rentedBy: m.rentedBy ?? null,
    }));

    return NextResponse.json({ machines: payload });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[listMachine]", message);
    return NextResponse.json(
      { error: "Không đọc được machines từ MongoDB.", detail: message },
      { status: 500 },
    );
  }
}
