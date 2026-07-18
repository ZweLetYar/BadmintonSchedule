import { ChevronRight } from "lucide-react";
import KnockoutMatchCard from "./KnockoutMatchCard";

export default function KnockoutStage({ title, matches = [] }) {
  if (matches.length === 0) return null;

  return (
    <section className="space-y-3">
      {/* Stage Header */}
      <div className="sticky top-28 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-500">
            {matches.length} Match{matches.length > 1 ? "es" : ""}
          </p>
        </div>

        <ChevronRight className="text-slate-400" size={18} />
      </div>

      {/* Match Cards */}
      <div className="space-y-3 px-3">
        {matches
          .sort((a, b) => a.matchNumber - b.matchNumber)
          .map((match) => (
            <KnockoutMatchCard key={match.id} match={match} />
          ))}
      </div>
    </section>
  );
}
