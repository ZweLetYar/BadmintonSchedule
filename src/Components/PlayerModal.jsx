import { X, Trophy, School, Users } from "lucide-react";

export default function PlayerModal({ player, onClose }) {
  if (!player) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-md p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mt-14 w-full max-w-xs rounded-[28px] bg-white shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200"
        >
          <X size={16} />
        </button>

        {/* Hero Image */}
        <div className="absolute left-1/2 -top-20 -translate-x-1/2">
          <div className="rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-1 shadow-2xl">
            <img
              src={player.image}
              alt={player.name}
              onError={(e) => {
                e.currentTarget.src = "/shuttlecock.png";
              }}
              className="h-40 w-40 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        <div className="px-5 pb-5 pt-30">
          <h2 className="text-center text-xl font-bold text-slate-900">
            {player.name}
          </h2>

          <div className="mt-1 flex items-center justify-center gap-2">
            <img
              src={`${player.department}.jpg`}
              className="h-5 w-5 rounded-full"
            />
            <span className="text-sm text-slate-500">{player.department}</span>
          </div>

          {/* Events */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {player.events.map((event) => (
              <span
                key={event}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-[11px] font-semibold text-white shadow"
              >
                {event}
              </span>
            ))}
          </div>

          {/* Info Cards */}
          {/* <div className="mt-6 space-y-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <div className="rounded-xl bg-indigo-100 p-2">
                <School size={16} className="text-indigo-600" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                  Department
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {player.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <div className="rounded-xl bg-violet-100 p-2">
                <Users size={16} className="text-violet-600" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                  Participating
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {player.events.join(" • ")}
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
