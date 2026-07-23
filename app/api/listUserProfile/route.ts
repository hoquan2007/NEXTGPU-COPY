/**
 * GET /api/listUserProfile — Trả profile + số dư của user đang đăng nhập.
 *
 * Luồng học (UI → … → API → DB) phần “API → DB”:
 * 1. Clerk `auth()` đọc session (cookie hoặc Authorization: Bearer …).
 * 2. Nếu chưa login → 401 JSON (đúng REST; không redirect HTML như trang web).
 * 3. `getOrCreateUserProfile` tìm/tạo document trong Mongo → trả balance.
 *
 * Tên path bắt chước endpoint thật NextGPU: `/listUserProfile`.
 *
 * Test Postman/Thunder:
 * - Method GET, URL http://localhost:3000/api/listUserProfile
 * - Header Authorization: Bearer <session_jwt từ Clerk>
 * - Hoặc mở dashboard đã login rồi gọi từ browser (cookie session).
 *
 * Milestone: M3 MongoDB Atlas + API profile.
 */
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getOrCreateUserProfile } from "@/src/lib/user-profile";

export async function GET() {
  // auth() = “ai đang gọi API này?” (userId từ JWT/cookie).
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    // 401 Unauthorized = chưa đăng nhập / token sai — kiến thức REST M3.
    return NextResponse.json(
      { error: "Unauthorized — cần đăng nhập hoặc Bearer token Clerk." },
      { status: 401 },
    );
  }

  // currentUser() lấy email từ Clerk Backend (không lưu email chỉ trong JWT).
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses[0]?.emailAddress ??
    "";

  try {
    const profile = await getOrCreateUserProfile(userId, email);

    // Response JSON gọn — M4 sẽ map sang service/hook.
    return NextResponse.json({
      clerkId: profile.clerkId,
      email: profile.email,
      balance: profile.balance,
      createdAt: profile.createdAt,
    });
  } catch (err) {
    // Thường gặp: thiếu MONGODB_URI hoặc Atlas Network Access chặn IP.
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[listUserProfile]", message);
    return NextResponse.json(
      { error: "Không đọc được profile từ MongoDB.", detail: message },
      { status: 500 },
    );
  }
}
