import DayTabs from "./DayTabs";

export default function Header({ activeDay, setActiveDay }) {
  return (
    <header className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-5 pt-8 pb-2">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.25),transparent_45%)]" />

      {/* Shuttlecock */}
      <div className="pointer-events-none absolute -right-6 -top-4 h-36 w-36 rotate-[-20deg] opacity-10">
        <img
          src="/shuttlecock.png"
          alt="Shuttlecock"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="relative z-10">
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold tracking-widest text-white backdrop-blur">
          BADMINTON TOURNAMENT
        </span>

        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-white">
          UTYCC Badminton
        </h1>

        <p className="mb-1 text-sm text-blue-400">Tournament 2026</p>

        <DayTabs activeDay={activeDay} setActiveDay={setActiveDay} />
      </div>
    </header>
  );
}
