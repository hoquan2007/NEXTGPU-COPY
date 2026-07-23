/**
 * /dashboard — Redirect về overview.
 *
 * Vì sao không giữ nội dung ở đây?
 * - M5 tách tab: overview / machines / mymachines / billing.
 * - `/dashboard` chỉ là “cửa vào”; overview mới là trang chào + số dư.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
import { redirect } from "next/navigation";

export default function DashboardIndexPage() {
  redirect("/dashboard/overview");
}
