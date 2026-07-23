/**
 * src/lib/machines.ts — Đọc danh sách máy + seed vài GPU mẫu nếu collection trống.
 *
 * Vì sao seed trong code (không bắt buộc Compass thủ công)?
 * - Người mới mở Atlas lần đầu chưa biết insert document.
 * - Lần gọi API đầu tiên tự có data → dễ test Postman / UI M5.
 *
 * Milestone: M3 (API listMachine) — UI đầy đủ ở M5.
 */
import type { WithId } from "mongodb";
import { getDb } from "@/src/lib/mongodb";
import type { MachineDoc } from "@/src/types/db";

/** 3 máy mẫu — đủ để học list / thuê / dừng ở milestone sau. */
const SEED_MACHINES: MachineDoc[] = [
  {
    name: "Starter RTX 3060",
    gpu: "RTX 3060 12GB",
    pricePerHour: 8_000,
    status: "available",
  },
  {
    name: "Pro RTX 4070",
    gpu: "RTX 4070 12GB",
    pricePerHour: 15_000,
    status: "available",
  },
  {
    name: "Ultra RTX 4090",
    gpu: "RTX 4090 24GB",
    pricePerHour: 35_000,
    status: "available",
  },
];

/**
 * Trả về toàn bộ machines; nếu collection rỗng thì insert seed rồi trả lại.
 * WithId<> = document Mongo có thêm `_id` (ObjectId) — cần khi trả JSON cho frontend.
 */
export async function listMachines(): Promise<WithId<MachineDoc>[]> {
  const db = await getDb();
  const machines = db.collection<MachineDoc>("machines");

  const count = await machines.countDocuments();
  if (count === 0) {
    await machines.insertMany(SEED_MACHINES);
  }

  // toArray() = lấy hết document khớp (học: chưa cần pagination).
  return machines.find({}).toArray();
}
