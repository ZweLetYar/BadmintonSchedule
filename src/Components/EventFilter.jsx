import { Trophy, Venus, Users, Mars } from "lucide-react";
import { useLocation } from "react-router-dom";

const events = [
  {
    id: "all",
    label: "All",
    icon: Trophy,
    iconColor: "text-amber-500",
  },
  {
    id: "ms",
    label: "MS",
    icon: Mars,
    iconColor: "text-blue-600",
  },
  {
    id: "md",
    label: "MD",
    icon: Users,
    iconColor: "text-cyan-500",
  },
  {
    id: "ws",
    label: "WS",
    icon: Venus,
    iconColor: "text-pink-500",
  },
  {
    id: "wd",
    label: "WD",
    icon: Users,
    iconColor: "text-violet-500",
  },
];
export default function EventFilter({ activeEvent, setActiveEvent }) {
  return (
    <div className=" flex items-center justify-center gap-2 ">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {events.map((event) => {
          const Icon = event.icon;
          let location = useLocation();
          const isStanding = location.pathname === "/results";
          if (isStanding && event.id === "all") return null;
          return (
            <button
              key={event.id}
              onClick={() => {
                setActiveEvent(event.label);
              }}
              className={`
        whitespace-nowrap
        rounded-full
        px-2
        py-1
        text-xxs
        font-semibold
        transition-all
        duration-200
        flex items-center gap-1.5
        showdown-md

        ${
          activeEvent === event.label
            ? getActiveStyle(event.label)
            : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
        }
      `}
            >
              <Icon
                size={15}
                className={
                  activeEvent === event.label ? "text-white" : event.iconColor
                }
              />
              <span>{event.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getActiveStyle(event) {
  switch (event) {
    case "MS":
      return "bg-blue-600 text-white shadow-md";

    case "MD":
      return "bg-cyan-500 text-white shadow-md";

    case "WS":
      return "bg-pink-500 text-white shadow-md";

    case "WD":
      return "bg-violet-500 text-white shadow-md";

    default:
      return "bg-slate-900 text-white shadow-md";
  }
}
