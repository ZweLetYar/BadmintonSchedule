// import EventFilter from "../../Components/EventFilter";
// import CourtSection from "../../Components/CourtSection";

// export default function SchedulePage() {
//   const matches1 = [
//     {
//       id: 1,
//       event: "MS",
//       group: "A",
//       player1: "Aung Kaung",
//       player2: "Zaw Min",
//       score1: [21, 21],
//       score2: [18, 17],
//       status: "Completed",
//     },
//     {
//       id: 2,
//       event: "WS",
//       group: "B",
//       player1: "Ei Mon",
//       player2: "May Thu",
//       score1: [20, 21, 21],
//       score2: [21, 11, 19],
//       status: "Upcoming",
//     },
//     {
//       id: 3,
//       event: "MD",
//       group: "C",
//       player1: "Team Alpha",
//       player2: "Team Beta",
//       score1: [17],
//       score2: [18],
//       status: "Live",
//     },
//     {
//       id: 4,
//       event: "MD",
//       group: "C",
//       player1: "Team Alpha",
//       player2: "Team Beta",
//       score1: [17],
//       score2: [18],
//       status: "Live",
//     },
//   ];
//   const matches2 = [
//     {
//       id: 1,
//       event: "MS",
//       group: "A",
//       player1: "Aung Kaung",
//       player2: "Zaw Min",
//       score1: [21, 21],
//       score2: [18, 17],
//       status: "Completed",
//     },
//     {
//       id: 2,
//       event: "WS",
//       group: "B",
//       player1: "Ei Mon",
//       player2: "May Thu",
//       score1: [20, 21, 21],
//       score2: [21, 11, 19],
//       status: "Upcoming",
//     },
//     {
//       id: 3,
//       event: "MD",
//       group: "C",
//       player1: "Team Alpha",
//       player2: "Team Beta",
//       score1: [17],
//       score2: [18],
//       status: "Live",
//     },
//     {
//       id: 4,
//       event: "MD",
//       group: "C",
//       player1: "Team Alpha",
//       player2: "Team Beta",
//       score1: [17],
//       score2: [18],
//       status: "Live",
//     },
//   ];

//   return (
//     <div className="pb-13">
//       {/* Match List */}
//       <CourtSection court="COURT 1" startTime="4:00 PM" matches={matches1} />
//       <CourtSection court="COURT 2" startTime="4:00 PM" matches={matches2} />
//       <CourtSection court="COURT 3" startTime="4:00 PM" matches={matches2} />
//     </div>
//   );
// }

import { useMemo } from "react";
import CourtSection from "./CourtSection";
import { useGetCollection } from "../hooks/useFireStore";

export default function SchedulePage({ activeDay, activeEvent }) {
  const { data: matches, loading, error } = useGetCollection("matches");

  // Filter by day & event
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const dayMatch = Number(match.day) === Number(activeDay);

      const eventMatch =
        activeEvent === "all"
          ? true
          : match.event.toLowerCase() === activeEvent;

      return dayMatch && eventMatch;
    });
  }, [matches, activeDay, activeEvent]);

  // Group matches by court
  const courts = useMemo(() => {
    const grouped = {};

    filteredMatches.forEach((match) => {
      const court = match.court;

      if (!grouped[court]) {
        grouped[court] = [];
      }

      grouped[court].push(match);
    });

    // Sort by time
    Object.values(grouped).forEach((list) => {
      list.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
    });

    return grouped;
  }, [filteredMatches]);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-slate-500">Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-red-500">{error}</p>
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
    <div className="space-y-5 pb-24">
      {Object.keys(courts)
        .sort((a, b) => Number(a) - Number(b))
        .map((court) => (
          <CourtSection
            key={court}
            court={`COURT ${court}`}
            startTime={courts[court][0]?.time}
            matches={courts[court]}
          />
        ))}
    </div>
  );
}
