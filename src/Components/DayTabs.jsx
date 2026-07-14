// import { CalendarDays } from "lucide-react";
// import "../App.css";

// const days = [
//   { id: 1, label: "Day 1", date: "Jul 20" },
//   { id: 2, label: "Day 2", date: "Jul 21" },
//   { id: 3, label: "Day 3", date: "Jul 22" },
//   { id: 4, label: "Day 4", date: "Jul 23" },
//   { id: 5, label: "Day 5", date: "Jul 24" },
//   { id: 6, label: "Day 6", date: "Jul 25" },
//   { id: 7, label: "Final", date: "Jul 26" },
// ];

// export default function DayTabs({ activeDay, setActiveDay }) {
//   return (
//     <div className="sticky top-0 z-30 backdrop-blur-xl ">
//       <div className="flex gap-1 overflow-x-auto px-1 py-1 scrollbar-hide snap-x snap-mandatory">
//         {days.map((day) => (
//           <button
//             key={day.id}
//             onClick={() => setActiveDay(day.id)}
//             className={`
//     snap-center shrink-0
//     w-15 h-12
//     rounded-xl
//     flex flex-col items-center justify-center
//     transition-all duration-200
//     text-white
//     ${
//       activeDay === day.id
//         ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-md shadow-blue-500/30"
//         : " border border-slate-200"
//     }
//   `}
//           >
//             <span className="text-xs font-bold">{day.label}</span>

//             <span
//               className={`text-[10px] mt-0.5 ${
//                 activeDay === day.id ? "text-blue-100" : "text-slate-500"
//               }`}
//             >
//               {day.date}
//             </span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef } from "react";
import "../App.css";

const tournamentStart = new Date("2026-07-20");

const days = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(tournamentStart);
  date.setDate(tournamentStart.getDate() + index);

  return {
    id: index + 1,
    label: index === 6 ? "Final" : `Day ${index + 1}`,
    date: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    fullDate: date,
    isoDate: date.toISOString().split("T")[0],
    dayOfWeek: date.toLocaleDateString("en-US", {
      weekday: "short",
    }),
  };
});

export default function DayTabs({ activeDay, setActiveDay }) {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRefs.current[activeDay - 1];

    if (!container || !button) return;

    const left =
      button.offsetLeft - container.clientWidth / 2 + button.clientWidth / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });
  }, [activeDay]);

  return (
    <div className="sticky top-0 z-30 backdrop-blur-xl">
      <div ref={containerRef} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 px-1 py-1 w-max">
          {days.map((day, index) => (
            <button
              key={day.id}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => setActiveDay(day.id)}
              className={`
                shrink-0
                w-15 h-12
                rounded-xl
                flex flex-col items-center justify-center
                transition-all duration-300
                ${
                  activeDay === day.id
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30"
                    : "border border-slate-200 bg-white"
                }
              `}
            >
              <span
                className={`text-xs font-bold ${
                  activeDay === day.id ? "text-white" : "text-slate-700"
                }`}
              >
                {day.label}
              </span>

              <span
                className={`text-[10px] mt-0.5 ${
                  activeDay === day.id ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {day.date}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// import "../App.css";

// const tournamentStart = new Date("2026-07-10");

// export const days = Array.from({ length: 7 }, (_, index) => {
//   const date = new Date(tournamentStart);
//   date.setDate(tournamentStart.getDate() + index);

//   return {
//     id: index + 1,
//     label: index === 6 ? "Final" : `Day ${index + 1}`,
//     date: date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     }),
//     fullDate: date,
//   };
// });

// export default function DayTabs({ activeDay, setActiveDay }) {
//   return (
//     <div className="sticky top-0 z-30 backdrop-blur-xl">
//       <div className="overflow-x-auto scrollbar-hide">
//         <div className="flex gap-1 w-max px-1 py-1">
//           {days.map((day) => (
//             <button
//               key={day.id}
//               onClick={() => setActiveDay(day.id)}
//               className={`
//                 shrink-0
//                 w-15 h-12
//                 rounded-xl
//                 flex flex-col items-center justify-center
//                 transition-all duration-200
//                 ${
//                   activeDay === day.id
//                     ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30"
//                     : "bg-white border border-slate-200"
//                 }
//               `}
//             >
//               <span
//                 className={`text-xs font-bold ${
//                   activeDay === day.id ? "text-white" : "text-slate-700"
//                 }`}
//               >
//                 {day.label}
//               </span>

//               <span
//                 className={`text-[10px] mt-0.5 ${
//                   activeDay === day.id
//                     ? "text-blue-100"
//                     : "text-slate-500"
//                 }`}
//               >
//                 {day.date}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
