const tournamentStart = new Date("2026-07-16");

export const days = Array.from({ length: 11 }, (_, index) => {
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

export function getTodayTournamentDay() {
  const today = new Date();

  // Compare only the date portion
  today.setHours(0, 0, 0, 0);

  const found = days.find((day) => {
    const d = new Date(day.fullDate);
    d.setHours(0, 0, 0, 0);

    return d.getTime() === today.getTime();
  });

  // If today isn't one of the tournament days, default to Day 1
  return found ? found.id : 1;
}
