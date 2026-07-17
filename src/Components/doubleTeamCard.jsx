import { Handshake } from "lucide-react";

const eventStyle = {
  MD: "from-cyan-500 to-sky-500",
  WD: "from-violet-500 to-pink-500",
};

function normalizeName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "");
}

export default function DoubleTeamCard({ team, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${
          eventStyle[team.event]
        } opacity-90`}
      />

      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" />

      {/* Event Badge */}
      {/* <div className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
        {team.event}
      </div> */}

      <div className="relative p-5">
        {/* Players */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center w-2/5">
            <img
              src={normalizeName(team.player1Name) + ".jpg"}
              alt={team.player1Name}
              onError={(e) => {
                e.currentTarget.src = "/shuttlecock.png";
              }}
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-xl"
            />
            {/* 
            <p className="mt-3 text-center text-sm font-semibold text-white">
              {team.player1Name}
            </p> */}
          </div>

          {/* Center */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full  shadow-xl">
              <Handshake
                size={20}
                className={`bg-gradient-to-r ${eventStyle[team.event]} bg-clip-text text-white`}
              />
            </div>
          </div>

          <div className="flex flex-col items-center w-2/5">
            <img
              src={normalizeName(team.player2Name) + ".jpg"}
              alt={team.player2Name}
              onError={(e) => {
                e.currentTarget.src = "/shuttlecock.png";
              }}
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-xl"
            />

            {/* <p className="mt-3 text-center text-sm font-semibold text-white">
              {team.player2Name}
            </p> */}
          </div>
        </div>

        {/* White Content */}
        <div className="-mx-5  rounded-t-3xl bg-white px-5 mt-3 pt-2">
          <h3 className="text-center text-lg font-bold text-slate-900">
            {team.name}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-2">
            <div
              className={`h-2 w-2 rounded-full bg-gradient-to-r ${eventStyle[team.event]}`}
            />
            <span className="text-xs font-medium text-slate-500">
              Official Doubles Team
            </span>
            {/* Event Badge */}
            <div
              className={`rounded-full bg-gradient-to-r ${eventStyle[team.event]} px-3 py-1 text-xs font-bold text-white backdrop-blur`}
            >
              {team.event}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
