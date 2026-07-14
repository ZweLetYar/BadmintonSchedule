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

export default function Layout({ children }) {
  let location = useLocation();

  const [activeEvent, setActiveEvent] = useState("all");
  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <Header />
        <EventFilter
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
        />
      </div>

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
