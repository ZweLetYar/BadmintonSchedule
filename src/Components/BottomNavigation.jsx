import { CalendarDays, Trophy, Users, GitBranch } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menus = [
  {
    id: "schedule",
    label: "Schedule",
    icon: CalendarDays,
    path: "/",
  },
  {
    id: "results",
    label: "Results",
    icon: Trophy,
    path: "/results",
  },
  {
    id: "draw",
    label: "Draw",
    icon: GitBranch,
    path: "/draw",
  },
  {
    id: "players",
    label: "Players",
    icon: Users,
    path: "/players",
  },
];

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 ">
      <div className="flex items-center justify-around rounded-t-lg border border-slate-200 bg-white/90 px-2 py-1 shadow-xl backdrop-blur-xl">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = location.pathname === menu.path;

          return (
            <button
              key={menu.id}
              onClick={() => navigate(menu.path)}
              className="relative flex flex-1 flex-col items-center justify-center "
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute top-0 h-1 w-8 rounded-full bg-blue-600 transition-all duration-300" />
              )}

              <div
                className={`
      
      flex h-11 w-11 items-center justify-center
      rounded-xl transition-all duration-300
      ${isActive ? " text-blue-600  " : "text-slate-500"}
    `}
              >
                <Icon size={20} />
              </div>

              <span
                className={` text-[11px] font-medium transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                {menu.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
