import { Trophy } from "lucide-react";

export default function GroupStanding({ event, group, standings = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-700 to-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={badge(event)}>{event}</span>

          <h2 className="font-semibold text-white">Group {group} </h2>
        </div>

        <Trophy size={18} className="text-yellow-400" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-2 py-1.5 text-left">#</th>
              <th className="px-2 py-1.5 text-left">Player / Team</th>
              <th className="px-1 py-1.5 text-center">P</th>
              <th className="px-1 py-1.5 text-center">W</th>
              <th className="px-1 py-1.5 text-center">L</th>
              <th className="px-1 py-1.5 text-center">Pts</th>
              <th className="px-1 py-1.5 text-center">PD</th>
            </tr>
          </thead>

          <tbody>
            {standings.map((player, index) => (
              <tr key={player.name} className="border-t border-slate-100">
                {/* Rank */}
                <td className="px-2 py-2">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${rankColor(
                      index + 1,
                    )}`}
                  >
                    {index + 1}
                  </div>
                </td>

                {/* Name */}
                <td className="px-2 py-2">
                  {player.name.includes("/") ? (
                    <div className="space-y-0">
                      {player.name.split("/").map((member) => (
                        <div
                          key={member}
                          className="leading-4 font-medium text-slate-700"
                        >
                          {member.trim()}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-medium text-slate-700">
                      {player.name}
                    </span>
                  )}
                </td>

                <td className="px-1 text-center">{player.played}</td>
                <td className="px-1 text-center font-semibold text-green-600">
                  {player.won}
                </td>
                <td className="px-1 text-center font-semibold text-red-500">
                  {player.lost}
                </td>
                <td className="px-1 text-center font-bold text-blue-600">
                  {player.points}
                </td>
                <td
                  className={`px-1 text-center font-semibold ${
                    player.pd > 0
                      ? "text-green-600"
                      : player.pd < 0
                        ? "text-red-500"
                        : "text-slate-500"
                  }`}
                >
                  {player.pd > 0 ? `+${player.pd}` : player.pd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function badge(event) {
  switch (event) {
    case "MS":
      return "rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600";

    case "MD":
      return "rounded-full bg-cyan-100 px-2 py-1 text-xs font-bold text-cyan-600";

    case "WS":
      return "rounded-full bg-pink-100 px-2 py-1 text-xs font-bold text-pink-600";

    case "WD":
      return "rounded-full bg-violet-100 px-2 py-1 text-xs font-bold text-violet-600";

    default:
      return "";
  }
}

function rankColor(rank) {
  switch (rank) {
    case 1:
      return "bg-yellow-100 text-yellow-700";

    case 2:
      return "bg-slate-200 text-slate-700";

    case 3:
      return "bg-orange-100 text-orange-700";

    default:
      return "bg-slate-100 text-slate-500";
  }
}
