// import { useMemo, useState } from "react";
// import PlayerCard from "../../Components/PlayerCard";
// import PlayerModal from "../../Components/PlayerModal";
// import EventFilter from "../../Components/EventFilter";
// import { useGetCollection } from "../../hooks/useFireStore";

// export default function Players() {
//   const { data: players = [] } = useGetCollection("players");

//   const [selectedPlayer, setSelectedPlayer] = useState(null);
//   const [activeEvent, setActiveEvent] = useState("All");

//   const filteredPlayers = useMemo(() => {
//     if (activeEvent === "All") return players;

//     return players.filter((player) => player.events?.includes(activeEvent));
//   }, [players, activeEvent]);

//   return (
//     <>
//       <div className="px-4 py-4 pb-24">
//         <EventFilter
//           activeEvent={activeEvent}
//           setActiveEvent={setActiveEvent}
//         />

//         <div className="mt-4 space-y-3">
//           {filteredPlayers.map((player) => (
//             <PlayerCard
//               key={player.id}
//               player={player}
//               onClick={() => setSelectedPlayer(player)}
//             />
//           ))}
//         </div>
//       </div>

//       <PlayerModal
//         player={selectedPlayer}
//         onClose={() => setSelectedPlayer(null)}
//       />
//     </>
//   );
// }

import { useMemo, useState } from "react";
import EventFilter from "../../Components/EventFilter";
import PlayerCard from "../../Components/PlayerCard";
import PlayerModal from "../../Components/PlayerModal";
import DoubleTeamCard from "../../Components/DoubleTeamCard";
//import TeamModal from "../../Components/TeamModal";
import { useGetCollection } from "../../hooks/useFireStore";
import DoubleTeamModal from "../../Components/DoubleTeamModal";

export default function Players() {
  const { data: players = [] } = useGetCollection("players");
  const { data: teams = [] } = useGetCollection("teams");

  const [activeEvent, setActiveEvent] = useState("All");

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const filteredPlayers = useMemo(() => {
    if (activeEvent === "All") return players;

    return players.filter((player) => player.events?.includes(activeEvent));
  }, [players, activeEvent]);

  const filteredTeams = useMemo(() => {
    if (activeEvent === "All") return teams;

    return teams.filter((team) => team.event === activeEvent);
  }, [teams, activeEvent]);

  return (
    <>
      <div className="px-4 py-4 pb-24">
        <EventFilter
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
        />

        <div className="mt-4 space-y-3">
          {/* Singles */}
          {(activeEvent === "MS" ||
            activeEvent === "WS" ||
            activeEvent === "All") &&
            filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}

          {/* Doubles */}
          {(activeEvent === "MD" || activeEvent === "WD") &&
            filteredTeams.map((team) => (
              <DoubleTeamCard
                key={team.id}
                team={team}
                onClick={() => setSelectedTeam(team)}
              />
            ))}
        </div>
      </div>

      <PlayerModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />

      <DoubleTeamModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </>
  );
}
