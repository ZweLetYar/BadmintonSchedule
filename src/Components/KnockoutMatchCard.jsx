import {
  Trophy,
  Clock3,
  MapPin,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

export default function KnockoutMatchCard({ match }) {
  const completed = match.status === "completed";

  const p1Winner = completed && match.winner === match.participant1Name;
  const p2Winner = completed && match.winner === match.participant2Name;

  const s1 = match.score1?.[0] ?? "-";
  const s2 = match.score2?.[0] ?? "-";

  return (
    <button className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-200 active:scale-[0.98] active:shadow-md">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">
            Match {match.matchNumber}
          </span>

          <span
            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
              completed
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {completed ? "Completed" : "Upcoming"}
          </span>
        </div>

        <ChevronRight size={18} className="text-slate-400" />
      </div>

      {/* Teams */}

      <div className="space-y-3 px-4 py-4">
        {/* Team 1 */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {p1Winner && <Trophy size={15} className="text-yellow-500" />}

            <span
              className={`font-medium ${
                completed
                  ? p1Winner
                    ? "text-slate-900"
                    : "text-slate-400"
                  : "text-slate-700"
              }`}
            >
              {match.participant1Name}
            </span>
          </div>

          <span
            className={`text-lg font-bold ${
              p1Winner ? "text-green-600" : "text-slate-700"
            }`}
          >
            {s1}
          </span>
        </div>

        {/* Team 2 */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {p2Winner && <Trophy size={15} className="text-yellow-500" />}

            <span
              className={`font-medium ${
                completed
                  ? p2Winner
                    ? "text-slate-900"
                    : "text-slate-400"
                  : "text-slate-700"
              }`}
            >
              {match.participant2Name}
            </span>
          </div>

          <span
            className={`text-lg font-bold ${
              p2Winner ? "text-green-600" : "text-slate-700"
            }`}
          >
            {s2}
          </span>
        </div>
      </div>

      {/* Footer */}

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <CalendarDays size={14} />
          Day {match.day}
        </div>

        <div className="flex items-center gap-1">
          <Clock3 size={14} />
          {match.time}
        </div>

        <div className="flex items-center gap-1">
          <MapPin size={14} />
          Court {match.court}
        </div>
      </div>
    </button>
  );
}
