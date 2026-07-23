/**
 * src/lib/user-profile.ts — Tìm / tạo user trong Mongo theo clerkId.
 *
 * Vì sao tách khỏi route.ts?
 * - API `/api/listUserProfile` và trang `/dashboard` đều cần cùng logic.
 * - Seed lần đầu (balance: 100000) viết 1 chỗ → không lệch giữa UI và API.
 *
 * Milestone: M3 MongoDB Atlas + API profile.
 */
import { getDb } from "@/src/lib/mongodb";
import type { UserDoc } from "@/src/types/db";

/** Số dư tặng khi user login lần đầu (học tập, không phải tiền thật). */
export const INITIAL_BALANCE = 100_000;

/**
 * Tìm user theo clerkId; nếu chưa có document thì tạo mới với balance khởi tạo.
 * Trả về document đã có (hoặc vừa seed).
 */
export async function getOrCreateUserProfile(
  clerkId: string,
  email: string,
): Promise<UserDoc> {
  const db = await getDb();
  const users = db.collection<UserDoc>("users");

  // findOne = đọc 1 document khớp filter (REST “GET resource”).
  const existing = await users.findOne({ clerkId });

  if (existing) {
    // Có thể email Clerk đổi — cập nhật nhẹ để DB khớp session hiện tại.
    if (existing.email !== email) {
      await users.updateOne({ clerkId }, { $set: { email } });
      return { ...existing, email };
    }
    return existing;
  }

  // Lần đầu login → seed user (Done criteria M3).
  const created: UserDoc = {
    clerkId,
    email,
    balance: INITIAL_BALANCE,
    createdAt: new Date(),
  };

  await users.insertOne(created);
  return created;
}
