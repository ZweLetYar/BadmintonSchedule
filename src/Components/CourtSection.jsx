import CourtHeader from "./CourtHeader";
import MatchCard from "./MatchCard";

export default function CourtSection({ court, startTime, matches }) {
  return (
    <section className="mb-6 mx-3 mt-3">
      <CourtHeader court={court} startTime={startTime} />

      <div className="mt-3 space-y-3">
        {matches.map((match) => (
          <MatchCard key={match.id} {...match} />
        ))}
      </div>
    </section>
  );
}
