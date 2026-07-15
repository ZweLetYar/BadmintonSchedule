import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import InnerNavbar from "../Components/InnerNavbar";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "./style.css";
import "../App.css";
import BottomNavigation from "../Components/BottomNavigation";
import EventFilter from "../Components/EventFilter";
import { getTodayTournamentDay } from "../tournamentDays";
import SchedulePage from "../Components/SchedulePage";

export default function Layout({ children }) {
  let location = useLocation();
  const isHomePage = location.pathname === "/";
  const path = window.location.pathname;
  const isAdmin = path.startsWith("/admin");
  const [activeDay, setActiveDay] = useState(getTodayTournamentDay());
  const [activeEvent, setActiveEvent] = useState("all");

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <Header activeDay={activeDay} setActiveDay={setActiveDay} />

        <EventFilter
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
        />
      </div>

      {isHomePage || isAdmin ? (
        <SchedulePage activeDay={activeDay} activeEvent={activeEvent} />
      ) : null}

      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <main>{children}</main>
        </CSSTransition>
      </SwitchTransition>

      <div className="mt-10">
        <BottomNavigation />
      </div>
    </div>
  );
}
