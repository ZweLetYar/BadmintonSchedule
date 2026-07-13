import { useState } from "react";
import DayTabs from "./DayTabs";

export default function Header() {
  const [activeDay, setActiveDay] = useState(1);
  return (
    <header className="relative  rounded-b-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-5 pt-8 pb-2 ">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.25),transparent_45%)]" />

      {/* Shuttlecock */}
      <div className="absolute -right-6 top-3 text-[150px] opacity-5 rotate-[-20deg] select-none">
        🏸
      </div>

      <div className="relative z-10">
        <span className="inline-flex rounded-full border border-white/10 text-white bg-white/10 px-4 py-1 text-xs font-semibold tracking-widest backdrop-blur">
          BADMINTON TOURNAMENT
        </span>

        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-white">
          UTYCC Badminton
        </h1>

        <p className=" text-sm text-blue-500 mb-1">Tournament 2026</p>
        <DayTabs activeDay={activeDay} setActiveDay={setActiveDay} />
      </div>
    </header>
  );
}
