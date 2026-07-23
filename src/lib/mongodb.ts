/**
 * src/lib/mongodb.ts — Kết nối MongoDB Atlas (singleton).
 *
 * Vì sao “singleton”?
 * - Next.js (dev) hot-reload tạo lại module → nếu `new MongoClient()` mỗi lần
 *   sẽ mở quá nhiều connection → Atlas báo lỗi / chậm.
 * - Cách học chuẩn: lưu client trên `globalThis` để tái dùng giữa các request.
 *
 * Quan trọng:
 * - `MONGODB_URI` KHÔNG có prefix `NEXT_PUBLIC_` → chỉ chạy trên server.
 * - Browser không được thấy connection string (có user/password DB).
 *
 * Milestone: M3 MongoDB Atlas + API profile.
 */
import { MongoClient, type Db } from "mongodb";

/** Tên database trong Atlas (tạo tự động khi insert document đầu tiên). */
const DB_NAME = "mini_nextgpu";

/**
 * Mở rộng kiểu global để TypeScript biết field cache của chúng ta.
 * (globalThis không mất khi hot-reload trong `next dev`.)
 */
declare global {
  // eslint-disable-next-line no-var -- pattern cache Mongo trên globalThis
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Tạo (hoặc lấy lại) Promise kết nối MongoClient.
 * Gọi hàm này mỗi request đều OK — Promise được cache.
 */
function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // Fail sớm với message rõ — dễ hơn lỗi “connect ECONNREFUSED” khó hiểu.
    throw new Error(
      "Thiếu MONGODB_URI trong .env.local. Lấy connection string từ MongoDB Atlas → Connect → Drivers.",
    );
  }

  if (!global._mongoClientPromise) {
    // MongoClient chưa connect ngay; `.connect()` trả Promise — ta cache Promise đó.
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

/**
 * Lấy Db handle để `.collection("users")` v.v.
 * Đây là hàm duy nhất các API/route nên gọi.
 */
export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(DB_NAME);
}
