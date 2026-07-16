import { useMemo, useEffect } from "react";
import CourtSection from "./CourtSection";
import { useGetCollection } from "../hooks/useFireStore";

export default function SchedulePage({
  activeDay,
  activeEvent,
  setActiveEvent,
}) {
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

  if (matchesLoading || playersLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-slate-500">Loading matches...</p>
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
      <div className="flex h-60 items-center justify-center">
        <p className="text-slate-500">No matches scheduled.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-24 mx-3">
      {Object.keys(courts)
        .sort((a, b) => Number(a) - Number(b))
        .map((court) => (
          <CourtSection
            key={court}
            court={`COURT ${court}`}
            startTime={courts[court][0]?.time}
            matches={courts[court]}
            playerMap={playerMap}
          />
        ))}
    </div>
  );
}
