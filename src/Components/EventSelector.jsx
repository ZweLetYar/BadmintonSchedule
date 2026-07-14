export default function EventSelector({ event, setEvent, group, setGroup }) {
  const events = [
    { id: "MS", label: "Men's Singles" },
    { id: "MD", label: "Men's Doubles" },
    { id: "WS", label: "Women's Singles" },
    { id: "WD", label: "Women's Doubles" },
  ];

  const groups = event === "MS" ? ["A", "B", "C", "D"] : ["A", "B"];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-3 font-semibold">Event</h3>

        <div className="grid grid-cols-2 gap-3">
          {events.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => {
                setEvent(e.id);
                setGroup("A");
              }}
              className={`rounded-xl py-3 font-semibold transition
                ${
                  event === e.id
                    ? "bg-blue-600 text-white"
                    : "border border-slate-300"
                }`}
            >
              {e.id}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Group</h3>

        <div className="grid grid-cols-4 gap-2">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`rounded-lg py-2
                ${group === g ? "bg-blue-600 text-white" : "border"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
