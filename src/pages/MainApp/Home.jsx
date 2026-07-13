import { useState } from "react";
import EventFilter from "../../Components/EventFilter";
import CourtSection from "../../Components/CourtSection";

export default function SchedulePage() {
  const matches1 = [
    {
      id: 1,
      event: "MS",
      group: "A",
      player1: "Aung Kaung",
      player2: "Zaw Min",
      score1: [21, 21],
      score2: [18, 17],
      status: "Completed",
    },
    {
      id: 2,
      event: "WS",
      group: "B",
      player1: "Ei Mon",
      player2: "May Thu",
      score1: [20, 21, 21],
      score2: [21, 11, 19],
      status: "Upcoming",
    },
    {
      id: 3,
      event: "MD",
      group: "C",
      player1: "Team Alpha",
      player2: "Team Beta",
      score1: [17],
      score2: [18],
      status: "Live",
    },
    {
      id: 4,
      event: "MD",
      group: "C",
      player1: "Team Alpha",
      player2: "Team Beta",
      score1: [17],
      score2: [18],
      status: "Live",
    },
  ];
  const matches2 = [
    {
      id: 1,
      event: "MS",
      group: "A",
      player1: "Aung Kaung",
      player2: "Zaw Min",
      score1: [21, 21],
      score2: [18, 17],
      status: "Completed",
    },
    {
      id: 2,
      event: "WS",
      group: "B",
      player1: "Ei Mon",
      player2: "May Thu",
      score1: [20, 21, 21],
      score2: [21, 11, 19],
      status: "Upcoming",
    },
    {
      id: 3,
      event: "MD",
      group: "C",
      player1: "Team Alpha",
      player2: "Team Beta",
      score1: [17],
      score2: [18],
      status: "Live",
    },
    {
      id: 4,
      event: "MD",
      group: "C",
      player1: "Team Alpha",
      player2: "Team Beta",
      score1: [17],
      score2: [18],
      status: "Live",
    },
  ];
  const [activeEvent, setActiveEvent] = useState("all");

  return (
    <>
      <EventFilter activeEvent={activeEvent} setActiveEvent={setActiveEvent} />

      {/* Match List */}
      <CourtSection court="COURT 1" startTime="4:00 PM" matches={matches1} />
      <CourtSection court="COURT 2" startTime="4:00 PM" matches={matches2} />
    </>
  );
}
