import MatchCard from "./MatchCard";

export default function MatchPreview({ form, participants }) {
  const participant1 = participants.find(
    (item) => item.id === form.participant1,
  );

  const participant2 = participants.find(
    (item) => item.id === form.participant2,
  );

  if (!participant1 || !participant2) return null;

  const match = {
    event: form.event,
    stage: form.stage,
    group: form.group,
    bestOf: form.bestOf,
    status: form.status,
    time: form.time,

    participant1Name: participant1.name,
    participant2Name: participant2.name,

    score1: [],
    score2: [],
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-bold text-slate-700">Match Preview</h3>

        <p className="text-xs text-slate-500">
          This is how the match will appear in the schedule.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <MatchCard match={match} />
      </div>
    </div>
  );
}
