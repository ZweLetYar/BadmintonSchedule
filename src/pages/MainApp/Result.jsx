import { useEffect, useMemo } from "react";
import GroupStanding from "../../Components/GroupStanding";
import { useGetCollection } from "../../hooks/useFireStore";
import { calculateStandings } from "../../utils/standings";

export default function Result({ activeEvent, setActiveEvent }) {
  const { data: matches = [] } = useGetCollection("matches");

  useEffect(() => {
    if (activeEvent === "All") {
      setActiveEvent("MS");
    }
  }, [activeEvent, setActiveEvent]);

  // Filter matches by selected event
  const eventMatches = useMemo(() => {
    return matches.filter((match) => match.event === activeEvent);
  }, [matches, activeEvent]);

  const groups = useMemo(() => {
    // Group matches by group name
    const groupedMatches = {};

    eventMatches.forEach((match) => {
      if (!groupedMatches[match.group]) {
        groupedMatches[match.group] = [];
      }

      groupedMatches[match.group].push(match);
    });

    return Object.entries(groupedMatches)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([group, groupMatches]) => ({
        group,
        standings: calculateStandings(groupMatches),
      }));
  }, [eventMatches]);

  return (
    <div className="mx-3 mt-2 mb-30 space-y-4">
      {groups.map(
        ({ group, standings }) =>
          group != "null" && (
            <GroupStanding
              key={group}
              event={activeEvent}
              group={group}
              standings={standings}
            />
          ),
      )}

      <div className="rounded-xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Legend
        </h3>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-bold text-yellow-700">
              1
            </div>
            <span>
              <span className="font-bold text-green-600">A1</span> Qualifies for
              Knockout Stage
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
              2
            </div>
            <span>
              <span className="font-bold text-green-600">A2</span> Qualifies for
              Knockout Stage
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
              3
            </div>
            <span>
              <span className="font-bold text-green-600">A3</span> Qualifies for
              Knockout Stage
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
              4
            </div>
            <span>
              <span className="font-bold text-green-600">A4</span> Qualifies for
              Knockout Stage
            </span>
          </div>

          {activeEvent === "WS" && (
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
                5
              </div>
              <span>
                <span className="font-bold text-green-600">A5</span> Qualifies
                for Knockout Stage
              </span>
            </div>
          )}

          <div className="mt-3 rounded-lg bg-slate-50 p-2 text-[11px] leading-5 text-slate-500">
            <p>
              • <strong>P</strong> = Played
            </p>
            <p>
              • <strong>W</strong> = Won
            </p>
            <p>
              • <strong>L</strong> = Lost
            </p>
            <p>
              • <strong>Pts</strong> = Match Points (Win = 1, Loss = 0)
            </p>
            <p>
              • <strong>PF</strong> = Points For
            </p>
            <p>
              • <strong>PA</strong> = Points Against
            </p>
            <p>
              • <strong>PD</strong> = Point Difference (PF − PA)
            </p>
          </div>
        </div>
      </div>

      {groups.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No completed matches yet.
        </div>
      )}
    </div>
  );
}
// import { useEffect, useMemo } from "react";
// import GroupStanding from "../../Components/GroupStanding";
// import { useGetCollection } from "../../hooks/useFireStore";

// export default function Result({ activeEvent, setActiveEvent }) {
//   const { data: matches = [] } = useGetCollection("matches");
//   useEffect(() => {
//     if (activeEvent === "All") setActiveEvent("MS");
//   }, [activeEvent, setActiveEvent]);

//   // All matches of selected event
//   const eventMatches = useMemo(() => {
//     return matches.filter((m) => m.event === activeEvent);
//   }, [matches, activeEvent]);

//   const groups = useMemo(() => {
//     const result = {};

//     eventMatches.forEach((match) => {
//       const group = match.group;

//       if (!result[group]) result[group] = {};

//       const table = result[group];

//       const players = [match.participant1Name, match.participant2Name];

//       // Add every player/team with zero stats
//       players.forEach((name) => {
//         if (!table[name]) {
//           table[name] = {
//             name,
//             played: 0,
//             won: 0,
//             lost: 0,
//             points: 0,
//           };
//         }
//       });

//       // Only completed matches affect standings
//       if (match.status !== "completed") return;

//       table[match.participant1Name].played++;
//       table[match.participant2Name].played++;

//       if (match.winner === match.participant1Name) {
//         table[match.participant1Name].won++;
//         table[match.participant1Name].points += 1;
//         table[match.participant2Name].lost++;
//       } else if (match.winner === match.participant2Name) {
//         table[match.participant2Name].won++;
//         table[match.participant2Name].points += 1;
//         table[match.participant1Name].lost++;
//       }
//     });

//     return Object.entries(result)
//       .sort(([groupA], [groupB]) => groupA.localeCompare(groupB))
//       .map(([group, table]) => ({
//         group,
//         standings: Object.values(table).sort((a, b) => {
//           if (b.points !== a.points) return b.points - a.points;
//           if (b.won !== a.won) return b.won - a.won;
//           return a.name.localeCompare(b.name);
//         }),
//       }));
//   }, [eventMatches]);

//   return (
//     <div className="mx-3 mt-2 space-y-4 mb-30 ">
//       {groups.map(({ group, standings }) => (
//         <GroupStanding
//           key={group}
//           event={activeEvent}
//           group={group}
//           standings={standings}
//         />
//       ))}

//       <div className="rounded-xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur">
//         <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
//           Legend
//         </h3>

//         <div className="space-y-2 text-xs text-slate-600">
//           <div className="flex items-center gap-2">
//             <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-[10px] font-bold text-yellow-700">
//               1
//             </div>
//             <span>
//               <span className="font-bold text-green-600">A1</span> Qualifies for
//               Knockout Stage
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
//               2
//             </div>
//             <span>
//               <span className="font-bold text-green-600">A2</span> Qualifies for
//               Knockout Stage
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
//               3
//             </div>
//             <span>
//               <span className="font-bold text-green-600">A3</span> Qualifies for
//               Knockout Stage
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
//               4
//             </div>
//             <span>
//               <span className="font-bold text-green-600">A4</span> Qualifies for
//               Knockout Stage
//             </span>
//           </div>
//           {activeEvent === "WS" && (
//             <div className="flex items-center gap-2">
//               <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700">
//                 5
//               </div>
//               <span>
//                 <span className="font-bold text-green-600">A5</span> Qualifies
//                 for Knockout Stage
//               </span>
//             </div>
//           )}

//           <div className="mt-3 rounded-lg bg-slate-50 p-2 text-[11px] leading-5 text-slate-500">
//             <p>
//               • <strong>P</strong> = Played
//             </p>
//             <p>
//               • <strong>W</strong> = Won
//             </p>
//             <p>
//               • <strong>L</strong> = Lost
//             </p>
//             <p>
//               • <strong>Pts</strong> = Points (Win = 1 pts, Loss = 0 pts)
//             </p>
//           </div>
//         </div>
//       </div>

//       {groups.length === 0 && (
//         <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
//           No completed matches yet.
//         </div>
//       )}
//     </div>
//   );
// }
