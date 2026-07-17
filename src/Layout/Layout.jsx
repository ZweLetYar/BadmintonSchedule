import React, { useContext, useEffect, useState } from "react";
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
import Result from "../pages/MainApp/Result";

export default function Layout({ children }) {
  let location = useLocation();
  const isHomePage = location.pathname === "/";
  const isResultPage = location.pathname === "/results";
  const isPlayersPage = location.pathname === "/players";
  const isAdmin = location.pathname.startsWith("/admin/view-matches");

  const [activeDay, setActiveDay] = useState(getTodayTournamentDay());
  const [activeEvent, setActiveEvent] = useState("All");

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <Header activeDay={activeDay} setActiveDay={setActiveDay} />

        {!isPlayersPage && (
          <div className="py-2">
            <EventFilter
              activeEvent={activeEvent}
              setActiveEvent={setActiveEvent}
            />
          </div>
        )}
      </div>
      {isHomePage || isAdmin ? (
        <SchedulePage
          activeDay={activeDay}
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
        />
      ) : null}

      {isResultPage && (
        <Result activeEvent={activeEvent} setActiveEvent={setActiveEvent} />
      )}

      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <main>{children}</main>
        </CSSTransition>
      </SwitchTransition>
      <div>
        <div className="fixed flex flex-col items-center bottom-16 right-0 z-40 rounded-2xl bg-white/10 px-1 py-1 shadow-xl backdrop-blur-md">
          <p className=" text-center text-[7px] font-bold uppercase tracking-[0.25em] text-slate-500">
            Sponsored by
          </p>

          <img
            src="/royalD2.png"
            alt="Royal-D Sponsor"
            className="h-11 w-[90%] drop-shadow-md"
          />
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
}
