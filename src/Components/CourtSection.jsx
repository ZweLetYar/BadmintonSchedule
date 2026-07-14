import CourtHeader from "./CourtHeader";
import MatchCard from "./MatchCard";

export default function CourtSection({ court, startTime, matches }) {
  return (
    <section className="mx-3 mt-3 mb-6">
      <CourtHeader court={court} startTime={startTime} />

      <div className="mt-3 space-y-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}
