/**
 * /dashboard/machines — Danh sách GPU thuê được (từ Mongo qua API).
 *
 * UI chỉ render MachineList; fetch nằm trong hook (pattern M4).
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
import { MachineList } from "@/src/components/dashboard/MachineList";

export default function MachinesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        Machines
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground">
        Danh sách máy GPU
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Dữ liệu từ MongoDB qua{" "}
        <code className="text-foreground">GET /api/listMachine</code>. Nút Thuê
        sẽ hoạt động ở Milestone 6.
      </p>

      <MachineList mode="all" />
    </div>
  );
}
