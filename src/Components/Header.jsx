// import DayTabs from "./DayTabs";

// export default function Header({ activeDay, setActiveDay }) {
//   return (
//     <header className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-5 pt-8 pb-2">
//       {/* Background Glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.25),transparent_45%)]" />

//       {/* Shuttlecock */}
//       <div className="pointer-events-none absolute -right-6 -top-4 h-36 w-36 rotate-[-20deg] opacity-10">
//         <img
//           src="/shuttlecock.png"
//           alt="Shuttlecock"
//           className="h-full w-full object-contain"
//         />
//       </div>

//       <div className="relative z-10">
//         <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold tracking-widest text-white backdrop-blur">
//           BADMINTON TOURNAMENT
//         </span>

//         <h1 className="mt-5 text-xl font-extrabold tracking-tight text-white">
//           UTYCC Badminton
//         </h1>

//         <p className="mb-1 text-sm text-blue-400">Tournament 2026</p>

//         <DayTabs activeDay={activeDay} setActiveDay={setActiveDay} />
//       </div>
//     </header>
//   );
// }

import DayTabs from "./DayTabs";

export default function Header({ activeDay, setActiveDay }) {
  return (
    <header className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 px-5 pt-8 pb-2">
      <div className="flex gap-2 items-center ">
        <img
          src="/logo1.jpg"
          alt="Sponsor"
          className="h-15  rounded-full object-contain"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-white ">
            UTYCC Badminton
          </h1>
          <p className="mb-1 text-sm text-blue-400">Tournament 2026</p>
        </div>
      </div>
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

      {/* Sponsor */}
      {/* <div className="absolute left-5 top-4 z-20">
        <div className="rounded-xl bg-white/10 p-2 backdrop-blur-md border border-white/10 shadow-lg">
          <img
            src="/royalD.png"
            alt="Sponsor"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div> */}

      <div className="relative z-10 pt-4">
        {/* <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold tracking-widest text-white backdrop-blur">
          BADMINTON TOURNAMENT
        </span> */}
        {/* 
        <h1 className="text-xl font-extrabold tracking-tight text-white ">
          UTYCC Badminton
        </h1> */}

        {/* <p className="mb-1 text-sm text-blue-400">Tournament 2026</p> */}

        <DayTabs activeDay={activeDay} setActiveDay={setActiveDay} />
      </div>
    </header>
  );
}
