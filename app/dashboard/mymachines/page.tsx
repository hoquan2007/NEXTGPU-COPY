/**
 * /dashboard/mymachines — Máy đang thuê của bạn.
 *
 * M5: filter client từ cùng API listMachine (rentedBy === clerkId).
 * Trước M6 thường trống — empty state là bình thường, chưa có API thuê.
 *
 * Milestone: M5 Dashboard shell + danh sách máy.
 */
import { MachineList } from "@/src/components/dashboard/MachineList";

export default function MyMachinesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        My Machines
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-foreground">
        Máy đang thuê
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Chỉ hiện máy có{" "}
        <code className="text-foreground">status = rented</code> và{" "}
        <code className="text-foreground">rentedBy</code> trùng user hiện tại.
        Chưa thuê được cho đến M6 — danh sách trống là đúng.
      </p>

      <MachineList mode="mine" />
    </div>
  );
}
