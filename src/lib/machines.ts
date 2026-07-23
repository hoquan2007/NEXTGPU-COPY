/**
 * src/lib/machines.ts — Đọc danh sách máy + seed GPU mẫu nếu thiếu.
 *
 * Vì sao seed theo `name` (idempotent) thay vì chỉ khi collection rỗng?
 * - DB đã seed 3 máy ở M3 → `count === 0` không chạy lại.
 * - Insert thiếu theo name → thêm máy mới M5 mà không xóa Compass thủ công.
 *
 * Milestone: M3 (API) → M5 (UI list + seed 6–7 máy).
 */
import type { WithId } from "mongodb";
import { getDb } from "@/src/lib/mongodb";
import type { MachineDoc } from "@/src/types/db";

/** 7 máy mẫu — đủ list/filter; thuê/dừng ở M6. Text only, không ảnh. */
const SEED_MACHINES: MachineDoc[] = [
  {
    name: "Starter RTX 3060",
    gpu: "RTX 3060 12GB",
    pricePerHour: 8_000,
    status: "available",
  },
  {
    name: "Budget RTX 4060",
    gpu: "RTX 4060 8GB",
    pricePerHour: 10_000,
    status: "available",
  },
  {
    name: "Pro RTX 4070",
    gpu: "RTX 4070 12GB",
    pricePerHour: 15_000,
    status: "available",
  },
  {
    name: "Studio RTX 4080",
    gpu: "RTX 4080 16GB",
    pricePerHour: 25_000,
    status: "available",
  },
  {
    name: "Ultra RTX 4090",
    gpu: "RTX 4090 24GB",
    pricePerHour: 35_000,
    status: "available",
  },
  {
    name: "Twin RTX 4090",
    gpu: "2x RTX 4090 24GB",
    pricePerHour: 60_000,
    status: "available",
  },
  {
    name: "H100 Lab",
    gpu: "NVIDIA H100 80GB",
    pricePerHour: 120_000,
    status: "available",
  },
];

/**
 * Trả về toàn bộ machines; bổ sung máy seed chưa có (theo name) rồi trả lại.
 * WithId<> = document Mongo có thêm `_id` (ObjectId) — cần khi trả JSON cho frontend.
 */
export async function listMachines(): Promise<WithId<MachineDoc>[]> {
  const db = await getDb();
  const machines = db.collection<MachineDoc>("machines");

  // Lấy tên đã có → chỉ insert những máy seed còn thiếu.
  const existing = await machines.find({}, { projection: { name: 1 } }).toArray();
  const existingNames = new Set(existing.map((m) => m.name));
  const missing = SEED_MACHINES.filter((m) => !existingNames.has(m.name));

  if (missing.length > 0) {
    await machines.insertMany(missing);
  }

  // toArray() = lấy hết document (học: chưa cần pagination).
  return machines.find({}).toArray();
}
