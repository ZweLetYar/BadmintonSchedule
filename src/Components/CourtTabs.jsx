import { Landmark } from "lucide-react";

export default function CourtTabs({ activeCourt, setActiveCourt }) {
  const courts = [
    { id: "court1", label: "Court 1" },
    { id: "court2", label: "Court 2" },
  ];

  return (
    <div className="sticky top-[124px] z-20 px-4 py-3">
      <div className="mx-auto flex w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-1 backdrop-blur-xl shadow-xl">
        {courts.map((court) => {
          const active = activeCourt === court.id;

          return (
            <button
              key={court.id}
              onClick={() => setActiveCourt(court.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-white/20 hover:text-slate-900"
                }`}
            >
              <Landmark
                size={16}
                className={`transition ${
                  active ? "text-white" : "text-indigo-500"
                }`}
              />

              {court.label}

              {active && (
                <span className="absolute inset-0 rounded-xl border border-white/30" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
