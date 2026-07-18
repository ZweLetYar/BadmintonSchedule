const STAGES = [
  { value: "group", label: "Group Stage" },
  { value: "knockout", label: "Knockout" },
  { value: "R16", label: "R16" },
  { value: "quarter_final", label: "Quarter Final" },
  { value: "semi_final", label: "Semi Final" },
  { value: "upper_final", label: "Upper Final" },
  { value: "lower_final", label: "Lower Final" },
  { value: "grand_final", label: "Grand Final" },
  { value: "final", label: "Final" },
];

const EVENTS = [
  { value: "MS", label: "Men's Singles" },
  { value: "MD", label: "Men's Doubles" },
  { value: "WS", label: "Women's Singles" },
  { value: "WD", label: "Women's Doubles" },
];

export default function MatchForm({ form, handleChange }) {
  const groups = form.event === "MS" ? ["A", "B", "C", "D"] : ["A", "B"];

  return (
    <div className="space-y-5 rounded-2xl bg-white p-5 shadow">
      {/* Day & Court */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-semibold">Day</label>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={1}>Day 1</option>
            <option value={2}>Day 2</option>
            <option value={3}>Day 3</option>
            <option value={4}>Day 4</option>
            <option value={5}>Day 5</option>
            <option value={6}>Day 6</option>
            <option value={7}>Day 7</option>
            <option value={8}>Day 8</option>
            <option value={9}>Day 9</option>
            <option value={10}>Day 10</option>
            <option value={11}>Final</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Court</label>

          <select
            name="court"
            value={form.court}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={1}>Court 1</option>
            <option value={2}>Court 2</option>
          </select>
        </div>
      </div>

      {/* Event */}

      <div>
        <label className="mb-2 block text-sm font-semibold">Event</label>

        <select
          name="event"
          value={form.event}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          {EVENTS.map((event) => (
            <option key={event.value} value={event.value}>
              {event.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stage */}

      <div>
        <label className="mb-2 block text-sm font-semibold">Stage</label>

        <select
          name="stage"
          value={form.stage}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          {STAGES.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </select>
      </div>

      {/* Group */}

      {form.stage === "group" && (
        <div>
          <label className="mb-2 block text-sm font-semibold">Group</label>

          <select
            name="group"
            value={form.group}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            {groups.map((g) => (
              <option key={g} value={g}>
                Group {g}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Time */}

      <div>
        <label className="mb-2 block text-sm font-semibold">Match Time</label>

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      {/* Best Of & Status */}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-semibold">Best Of</label>

          <select
            name="bestOf"
            value={form.bestOf}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={1}>BO1</option>
            <option value={3}>BO3</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
