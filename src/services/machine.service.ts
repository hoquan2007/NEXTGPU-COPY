/**
 * src/services/machine.service.ts — Gọi API machines (không đụng React).
 *
 * Vai trò trong pipeline: Hook → **Service** → Axios → API.
 * Service chỉ lo HTTP + map response; UI/hook lo loading/cache.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
import { API_ENDPOINTS } from "@/src/common/api-endpoints";
import { axiosInstance } from "@/src/lib/axios";
import type { MachineStatus } from "@/src/types/db";

/**
 * Một máy trong JSON từ GET /api/listMachine.
 * Tách type khỏi Mongo `MachineDoc` (có `_id` ObjectId) — frontend dùng `id` string.
 */
export type MachineListItem = {
  id: string;
  name: string;
  gpu: string;
  pricePerHour: number;
  status: MachineStatus;
  /** clerkId người đang thuê — null nếu available. */
  rentedBy: string | null;
};

/** Shape JSON từ GET /api/listMachine (khớp route sau khi thêm `success`). */
export type MachineListResponse = {
  success: boolean;
  machines: MachineListItem[];
};

/**
 * Lấy danh sách máy GPU từ Mongo qua API.
 *
 * @param token — JWT session từ Clerk (`useAuth().getToken()`).
 */
export async function getMachines(token: string): Promise<MachineListResponse> {
  const { data } = await axiosInstance.get<MachineListResponse>(
    API_ENDPOINTS.LIST_MACHINE,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}
