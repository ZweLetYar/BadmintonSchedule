import { CheckCircle2, Clock3, Radio } from "lucide-react";

export default function MatchCard({
  event,
  group,
  player1,
  player2,
  score1 = [],
  score2 = [],
  status,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm ">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={badge(event)}>{event}</span>

          <span className="text-xs text-slate-500">Group {group}</span>
        </div>

        <Status status={status} />
      </div>

      {/* Player 1 */}
      <div className="flex items-center justify-between py-1">
        <h3 className="truncate text-sm font-semibold text-slate-800">
          {player1}
        </h3>

        <div className="flex gap-2 font-semibold text-blue-600 ">
          {score1.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      {/* Divider */}

      <div className="my-1 border-t border-dashed border-slate-200"></div>

      {/* Player 2 */}

      <div className="flex items-center justify-between py-1">
        <h3 className="truncate text-sm font-semibold text-slate-800">
          {player2}
        </h3>

        <div className="flex gap-2 font-semibold text-green-600">
          {score2.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Status({ status }) {
  switch (status) {
    case "Completed":
      return <CheckCircle2 size={16} className="text-green-600" />;

    case "Upcoming":
      return <Clock3 size={16} className="text-blue-600" />;

    case "Live":
      return <Radio size={16} className="text-red-600 animate-pulse" />;

    default:
      return null;
  }
}

function badge(event) {
  switch (event) {
    case "MS":
      return "rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600";

    case "MD":
      return "rounded-md bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-600";

    case "WS":
      return "rounded-md bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-600";

    case "WD":
      return "rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-600";

    default:
      return "";
  }
}
