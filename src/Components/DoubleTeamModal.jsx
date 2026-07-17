import { X, Handshake } from "lucide-react";

const eventStyle = {
  MD: "from-cyan-500 via-sky-500 to-blue-600",
  WD: "from-fuchsia-500 via-pink-500 to-rose-500",
};
function normalizeName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "");
}

export default function DoubleTeamModal({ team, onClose }) {
  if (!team) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-md p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[340px] overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(15,23,42,.35)] animate-in zoom-in-95 duration-200"
      >
        {/* Gradient Header */}
        <div
          className={`relative h-24 bg-gradient-to-r ${eventStyle[team.event]}`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur transition hover:bg-white/30"
          >
            <X size={16} className="text-white" />
          </button>

          <div className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur">
            {team.event}
          </div>
        </div>

        {/* Hero Images */}
        <div className="-mt-12 flex justify-center">
          <div className="relative flex items-center">
            <img
              src={normalizeName(team.player1Name) + ".jpg"}
              alt={team.player1Name}
              onError={(e) => {
                e.currentTarget.src = "/shuttlecock.png";
              }}
              className="z-20 h-32 w-32 rounded-full border-[5px] border-white object-cover shadow-2xl"
            />

            <div className="z-30 -mx-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl">
              <Handshake
                size={24}
                className={`bg-gradient-to-r ${eventStyle[team.event]} bg-clip-text text-black `}
              />
            </div>

            <img
              src={normalizeName(team.player2Name) + ".jpg"}
              alt={team.player2Name}
              onError={(e) => {
                e.currentTarget.src = "/shuttlecock.png";
              }}
              className="z-20 h-32 w-32 rounded-full border-[5px] border-white object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-5">
          <h2 className="text-center text-xl font-extrabold text-slate-900">
            {team.name}
          </h2>

          <p className="mt-1 text-center text-xs text-slate-500">
            Official Doubles Team
          </p>

          {/* Players */}
          {/* <div className="mt-6 space-y-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-center font-semibold text-slate-800">
                {team.player1Name}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-center font-semibold text-slate-800">
                {team.player2Name}
              </p>
            </div>
          </div> */}

          {/* Bottom Badge */}
          {/* <div
            className={`mt-6 rounded-2xl bg-gradient-to-r ${eventStyle[team.event]} py-3 text-center shadow-lg`}
          >
            <span className="text-sm font-bold tracking-wide text-white">
              🏸 {team.event === "MD" ? "Men's Doubles" : "Women's Doubles"}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
