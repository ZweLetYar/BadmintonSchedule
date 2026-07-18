import { useMemo, useState } from "react";
import { Swords } from "lucide-react";

import { addCollection, useGetCollection } from "../../hooks/useFireStore";

import MatchForm from "../../Components/MatchForm";
import ParticipantSelector from "../../Components/ParticipantSelector";
import MatchPreview from "../../Components/MatchPreview";

export default function CreateMatch() {
  const { data: players } = useGetCollection("players");
  const { data: teams } = useGetCollection("teams");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    day: 1,
    court: 1,
    matchNumber: 1,

    event: "MS",
    stage: "group",
    group: "A",

    participant1: "",
    participant2: "",

    time: "",

    bestOf: 1,

    status: "upcoming",
  });

  // -------------------------------------
  // Load available participants
  // -------------------------------------

  const participants = useMemo(() => {
    switch (form.event) {
      case "MS":
        return players.filter((p) => p.events?.includes("MS"));

      case "WS":
        return players.filter((p) => p.events?.includes("WS"));

      case "MD":
        return teams.filter((team) => team.event === "MD");

      case "WD":
        return teams.filter((team) => team.event === "WD");

      default:
        return [];
    }
  }, [form.event, players, teams]);

  // -------------------------------------
  // Handle Input
  // -------------------------------------

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        name === "day" || name === "court" || name === "bestOf"
          ? Number(value)
          : value,
    }));
  }

  // -------------------------------------
  // Save Match
  // -------------------------------------

  async function handleSubmit() {
    if (!form.participant1 || !form.participant2) {
      alert("Please select both participants.");
      return;
    }

    if (form.participant1 === form.participant2) {
      alert("Participants cannot be the same.");
      return;
    }

    const p1 = participants.find((item) => item.id === form.participant1);

    const p2 = participants.find((item) => item.id === form.participant2);

    try {
      setLoading(true);

      await addCollection("matches", {
        day: form.day,

        court: form.court,

        matchNumber: form.matchNumber,

        time: form.time,

        event: form.event,

        stage: form.stage,

        group: form.stage === "group" ? form.group : null,

        participant1: p1.id,
        participant2: p2.id,

        participant1Name: p1.name,
        participant2Name: p2.name,

        bestOf: form.bestOf,

        status: form.status,

        score1: [],

        score2: [],

        winner: null,
      });

      alert("Match created successfully.");

      setForm((prev) => ({
        ...prev,

        participant1: "",

        participant2: "",

        time: "",

        status: "upcoming",
      }));
    } catch (err) {
      console.log(err);

      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-5 p-4 mb-30">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">Create Match</h1>

        <p className="text-sm text-slate-500">Create tournament matches.</p>
      </div>

      {/* Match Form */}

      <MatchForm form={form} handleChange={handleChange} />

      {/* Participant Selector */}

      <ParticipantSelector
        participants={participants}
        event={form.event}
        participant1={form.participant1}
        participant2={form.participant2}
        setParticipant1={(id) =>
          setForm((prev) => ({
            ...prev,
            participant1: id,
          }))
        }
        setParticipant2={(id) =>
          setForm((prev) => ({
            ...prev,
            participant2: id,
          }))
        }
      />
      {/* Match Preview */}

      <MatchPreview form={form} participants={participants} />

      {/* Create Button */}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`
          flex w-full items-center justify-center gap-2
          rounded-2xl py-3
          font-semibold text-white
          transition-all duration-300

          ${
            loading
              ? "cursor-not-allowed bg-slate-400"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }
        `}
      >
        <Swords size={18} />

        {loading ? "Creating Match..." : "Create Match"}
      </button>

      {/* Live Preview */}

      {form.participant1 && form.participant2 && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="mb-3 text-sm font-bold text-blue-700">
            Schedule Preview
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-500">Day</span>

              <p className="font-semibold">Day {form.day}</p>
            </div>

            <div>
              <span className="text-slate-500">Court</span>

              <p className="font-semibold">Court {form.court}</p>
            </div>

            <div>
              <span className="text-slate-500">Stage</span>

              <p className="font-semibold capitalize">
                {form.stage.replaceAll("_", " ")}
              </p>
            </div>

            <div>
              <span className="text-slate-500">Time</span>

              <p className="font-semibold">{form.time || "--:--"}</p>
            </div>

            <div>
              <span className="text-slate-500">Best Of</span>

              <p className="font-semibold">BO{form.bestOf}</p>
            </div>

            <div>
              <span className="text-slate-500">Status</span>

              <p className="font-semibold capitalize">{form.status}</p>
            </div>

            {form.stage === "group" && (
              <div className="col-span-2">
                <span className="text-slate-500">Group</span>

                <p className="font-semibold">Group {form.group}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
