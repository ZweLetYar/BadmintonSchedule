export default function ParticipantSelector({
  participants = [],
  participant1,
  participant2,
  setParticipant1,
  setParticipant2,
  event,
}) {
  const isDouble = event === "MD" || event === "WD";

  const getDisplayName = (item) => {
    if (isDouble) {
      return item.name;
    }

    return item.name;
  };

  return (
    <div className="space-y-4">
      {/* Participant 1 */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {isDouble ? "Team 1" : "Player 1"}
        </label>

        <select
          value={participant1}
          onChange={(e) => setParticipant1(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select {isDouble ? "Team" : "Player"}</option>

          {participants.map((item) => (
            <option key={item.id} value={item.id}>
              {getDisplayName(item)}
            </option>
          ))}
        </select>
      </div>

      {/* Participant 2 */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {isDouble ? "Team 2" : "Player 2"}
        </label>

        <select
          value={participant2}
          onChange={(e) => setParticipant2(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select {isDouble ? "Team" : "Player"}</option>

          {participants
            .filter((item) => item.id !== participant1)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {getDisplayName(item)}
              </option>
            ))}
        </select>
      </div>

      {/* Preview */}

      {participant1 && participant2 && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
            Match Preview
          </p>

          <div className="space-y-2">
            <div className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm">
              {getDisplayName(participants.find((p) => p.id === participant1))}
            </div>

            <div className="text-center text-xs font-bold text-slate-500">
              VS
            </div>

            <div className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm">
              {getDisplayName(participants.find((p) => p.id === participant2))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
