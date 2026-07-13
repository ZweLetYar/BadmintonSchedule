import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-emerald-500/20 shadow-lg">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-xl border border-emerald-400/30 bg-white shadow-md">
            <img
              src="/logo1.jpg"
              alt="UTYCC Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-wide text-white">
              UTYCC Badminton Club
            </h1>
            <p className="text-xs text-emerald-300">Tournament 2026</p>
          </div>
        </div>

        {/* Live Badge */}
        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1">
          <span className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}
