import { Mars, Venus, Users, Trophy } from "lucide-react";

const eventConfig = {
  MS: {
    icon: <Mars size={12} />,
  },
  MD: {
    icon: <Users size={12} />,
  },
  WS: {
    icon: <Venus size={12} />,
  },
  WD: {
    icon: <Users size={12} />,
  },
};

export default function PlayerCard({ player, onClick }) {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-violet-50 px-3 py-2.5 shadow-sm transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Background Glow */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-400/10 blur-xl" />
      <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full bg-violet-500/10 blur-xl" />

      <div className="relative flex items-center gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 blur-sm opacity-40" />

          <img
            src={player.image}
            alt={player.name}
            onError={(e) => {
              e.currentTarget.src = "/shuttlecock.png";
            }}
            className="relative h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {player.name}
            </h3>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow">
              <Trophy size={13} className="text-white" />
            </div>
          </div>

          {/* Department */}
          <div className="mt-1 flex items-center gap-1.5">
            <img
              src={`${player.department}.jpg`}
              alt={player.department}
              className="h-4 w-4 rounded-full object-cover"
            />

            <span className="truncate text-xs text-slate-500">
              {player.department}
            </span>
          </div>

          {/* Events */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {player.events.map((event) => (
              <span
                key={event}
                className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 backdrop-blur"
              >
                {eventConfig[event].icon}
                {event}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
