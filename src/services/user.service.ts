/**
 * src/services/user.service.ts — Gọi API user (không đụng React).
 *
 * Vai trò trong pipeline: Hook → **Service** → Axios → API.
 * Service chỉ lo HTTP + map response; UI/hook lo loading/cache.
 *
 * Milestone: M4 Axios + Service + Hook + React Query.
 */
import { API_ENDPOINTS } from "@/src/common/api-endpoints";
import { axiosInstance } from "@/src/lib/axios";

/**
 * Shape JSON từ GET /api/listUserProfile (khớp route M3).
 * Tách type ở đây để hook/UI import mà không phụ thuộc Mongo types.
 */
export type UserProfileResponse = {
  clerkId: string;
  email: string;
  /** Số dư ví học tập (VND giả). */
  balance: number;
  createdAt: string;
};

/**
 * Lấy profile + số dư của user đang đăng nhập.
 *
 * @param token — JWT session từ Clerk (`useAuth().getToken()`).
 *   API đọc `Authorization: Bearer …` (cũng chấp nhận cookie, nhưng Bearer rõ hơn khi học).
 */
export async function getUserProfile(
  token: string,
): Promise<UserProfileResponse> {
  const { data } = await axiosInstance.get<UserProfileResponse>(
    API_ENDPOINTS.LIST_USER_PROFILE,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
}
