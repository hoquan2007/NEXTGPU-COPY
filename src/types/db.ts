/**
 * src/types/db.ts — Kiểu dữ liệu MongoDB cho Mini NextGPU.
 *
 * Vì sao tách types riêng?
 * - API, service, seed dùng chung 1 “hợp đồng” dữ liệu → tránh lệch field.
 * - Học pattern project thật: types nằm ở `src/types/`, không nhét vào UI.
 *
 * Milestone: M3 MongoDB Atlas + API profile.
 */

/** Trạng thái máy GPU giả lập (M5–M6 sẽ dùng nhiều hơn). */
export type MachineStatus = "available" | "rented";

/** Loại giao dịch ví (M6–M7). */
export type TransactionType = "topup" | "rent" | "refund";

/**
 * users — 1 document / 1 tài khoản Clerk.
 * clerkId = id từ Clerk (user_xxx), không dùng _id Mongo làm auth id.
 */
export type UserDoc = {
  clerkId: string;
  email: string;
  /** Số dư ví học tập (VND giả). Lần đầu tạo = 100_000. */
  balance: number;
  createdAt: Date;
};

/**
 * machines — danh sách GPU cho thuê (seed sẵn vài máy mẫu).
 */
export type MachineDoc = {
  name: string;
  gpu: string;
  /** Giá thuê / giờ (VND giả). */
  pricePerHour: number;
  status: MachineStatus;
  /** clerkId người đang thuê — chỉ có khi status === "rented". */
  rentedBy?: string;
};

/**
 * rentals — lịch sử thuê máy (M6).
 * Khai báo sớm ở M3 để biết schema tổng thể.
 */
export type RentalDoc = {
  userId: string;
  machineId: string;
  startedAt: Date;
  endedAt?: Date;
  cost?: number;
};

/**
 * transactions — lịch sử cộng/trừ tiền (M6–M7).
 */
export type TransactionDoc = {
  userId: string;
  type: TransactionType;
  amount: number;
  createdAt: Date;
  note?: string;
};
