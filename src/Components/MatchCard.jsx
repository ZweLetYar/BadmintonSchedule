import { CheckCircle2, Clock3, Radio } from "lucide-react";

export default function MatchCard({ match }) {
  const {
    event,
    stage,
    group,

    participant1Name,
    participant2Name,

    score1 = [],
    score2 = [],

    bestOf,

    status,

    time,
  } = match;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* Header */}

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={badge(event)}>{event}</span>

          <span className="text-xs text-slate-500 capitalize">
            {stage.replaceAll("_", " ")}
          </span>

          {group && (
            <span className="text-xs text-slate-500">Group {group}</span>
          )}
        </div>

        <Status status={status} />
      </div>

      {/* Player 1 */}

      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <img
            src="/logo1.jpg"
            alt={participant1Name}
            className="h-5 w-5 rounded-full"
          />

          <h3 className="truncate text-sm font-semibold text-slate-800">
            {participant1Name}
          </h3>
        </div>

        <div className="flex gap-2 font-semibold text-blue-600">
          {score1.length ? (
            score1.map((s, i) => <span key={i}>{s}</span>)
          ) : (
            <span>-</span>
          )}
        </div>
      </div>

      <div className="my-1 border-t border-dashed border-slate-200" />

      {/* Player 2 */}

      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <img
            src="/logo1.jpg"
            alt={participant2Name}
            className="h-5 w-5 rounded-full"
          />

          <h3 className="truncate text-sm font-semibold text-slate-800">
            {participant2Name}
          </h3>
        </div>

        <div className="flex gap-2 font-semibold text-green-600">
          {score2.length ? (
            score2.map((s, i) => <span key={i}>{s}</span>)
          ) : (
            <span>-</span>
          )}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-1 flex items-center justify-between border-t border-slate-200 pt-1 text-[11px] text-slate-500">
        <span>BO{bestOf}</span>

        <span>{time}</span>
      </div>
    </div>
  );
}

function Status({ status }) {
  switch (status?.toLowerCase()) {
    case "completed":
      return <CheckCircle2 size={16} className="text-green-600" />;

    case "upcoming":
      return <Clock3 size={16} className="text-blue-600" />;

    case "live":
      return <Radio size={16} className="animate-pulse text-red-600" />;

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
