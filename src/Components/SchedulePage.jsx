import { GiShuttlecock } from "react-icons/gi";
import { useMemo, useEffect, useState } from "react";
import CourtSection from "./CourtSection";
import { useGetCollection } from "../hooks/useFireStore";
import Loading from "./Loading";

export default function SchedulePage({
  activeDay,
  activeEvent,
  setActiveEvent,
}) {
  const [activeCourt, setActiveCourt] = useState("1");

  useEffect(() => {
    setActiveEvent("All");
  }, []);

  const {
    data: matches,
    loading: matchesLoading,
    error: matchesError,
  } = useGetCollection("matches");

  const {
    data: players,
    loading: playersLoading,
    error: playersError,
  } = useGetCollection("players");

  // Create player lookup
  const playerMap = useMemo(() => {
    if (!Array.isArray(players)) return {};

    return players.reduce((map, player) => {
      if (player?.name) {
        map[player.name.trim().toLowerCase()] = player;
      }
      return map;
    }, {});
  }, [players]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const dayMatch = Number(match.day) === Number(activeDay);

      const eventMatch =
        activeEvent === "All" ? true : match.event === activeEvent;

      return dayMatch && eventMatch;
    });
  }, [matches, activeDay, activeEvent]);

  // Group by court
  const courts = useMemo(() => {
    const grouped = {};

    filteredMatches.forEach((match) => {
      if (!grouped[match.court]) {
        grouped[match.court] = [];
      }

      grouped[match.court].push(match);
    });

    Object.values(grouped).forEach((list) => {
      list.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
    });

    return grouped;
  }, [filteredMatches]);

  useEffect(() => {
    const availableCourts = Object.keys(courts).sort(
      (a, b) => Number(a) - Number(b),
    );

    if (availableCourts.length && !availableCourts.includes(activeCourt)) {
      setActiveCourt(availableCourts[0]);
    }
  }, [courts]);

  if (matchesLoading || playersLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (matchesError || playersError) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-red-500">{matchesError || playersError}</p>
      </div>
    );
  }

  if (filteredMatches.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-5">
        <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-8 text-center shadow-xl">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-100/40 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-cyan-100/40 blur-2xl" />

          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg">
            <GiShuttlecock className="h-8 w-8 text-white" />
          </div>

          <h3 className="relative mt-5 text-lg font-bold text-slate-900">
            No Matches Scheduled
          </h3>

          <p className="relative mt-2 text-sm leading-6 text-slate-500">
            This court is taking a break. Check another day, event, or court to
            view upcoming matches.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-5 pb-24 mx-3">
      <div className="sticky top-[118px] z-20 mb-5 px-2">
        <div className="mx-auto flex max-w-xs rounded-2xl border border-white/20 bg-white/60 py-1 px-3 shadow-lg backdrop-blur-xl">
          {Object.keys(courts)
            .sort((a, b) => Number(a) - Number(b))
            .map((court) => {
              const active = activeCourt === court;

              return (
                <button
                  key={court}
                  onClick={() => setActiveCourt(court)}
                  className={`group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl py-1.5 text-sm font-semibold transition-all duration-300 ease-out ${
                    active
                      ? "scale-[1.02] text-sky-700"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {/* Active Glass Pill */}
                  <span
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ease-out ${
                      active
                        ? "bg-white shadow-md ring-1 ring-sky-100"
                        : "bg-transparent"
                    }`}
                  />

                  {/* Bottom Accent */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-sky-500 transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span className="relative z-10">Court {court}</span>
                </button>
              );
            })}
        </div>
      </div>
      {courts[activeCourt] && (
        <CourtSection
          court={`COURT ${activeCourt}`}
          startTime={courts[activeCourt][0]?.time}
          matches={courts[activeCourt]}
          playerMap={playerMap}
        />
      )}
    </div>
  );
}
