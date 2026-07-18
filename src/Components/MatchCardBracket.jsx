export default function MatchCardBracket({ p1, p2 }) {
  return (
    <div className="w-28 rounded-2xl border bg-white p-3 shadow">
      <div className="text-center font-semibold">{p1}</div>

      <div className="my-2 text-center text-xs text-slate-400">VS</div>

      <div className="text-center font-semibold">{p2}</div>
    </div>
  );
}
