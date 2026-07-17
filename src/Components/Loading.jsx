import { Trophy } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 shadow-2xl">
          <Trophy
            size={34}
            className="animate-[bounce_1.8s_infinite] text-white"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="mt-8 text-xl font-bold text-slate-800">
        Loading Tournament
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Preparing matches, players and standings...
      </p>

      {/* Progress */}
      <div className="mt-8 h-2 w-56 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
      </div>

      <style>
        {`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(220%);
            }
          }
        `}
      </style>
    </div>
  );
}
