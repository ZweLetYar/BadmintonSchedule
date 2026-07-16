import { useState } from "react";
import Header from "../../Components/Header";
import SchedulePage from "../../Components/SchedulePage";
import { getTodayTournamentDay } from "../../tournamentDays";

function Home() {
  const [activeDay, setActiveDay] = useState(getTodayTournamentDay());

  return <></>;
}

export default Home;
