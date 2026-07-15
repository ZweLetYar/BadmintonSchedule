import { useState } from "react";
import Header from "../../Components/Header";
import SchedulePage from "../../Components/SchedulePage";
import { getTodayTournamentDay } from "../../tournamentDays";

function Home() {
  const [activeDay, setActiveDay] = useState(getTodayTournamentDay());
  const [activeEvent, setActiveEvent] = useState("all");

  return <></>;
}

export default Home;
