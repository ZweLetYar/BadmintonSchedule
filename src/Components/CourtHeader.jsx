import { Clock3, Columns4 } from "lucide-react";

export default function CourtHeader({ court, startTime }) {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600">
          <Columns4 size={15} className="text-white" />
        </div>

        <div>
          <h2 className="text-small font-semibold text-slate-800">{court}</h2>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
        <Clock3 size={15} />
        {startTime}
      </div>
    </div>
  );
}
