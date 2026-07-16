import { useState } from "react";
import { CheckCircle2, Clock3, Radio, Pencil, X } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function MatchCard({ match, playerMap = {} }) {
  const [saving, setSaving] = useState(false);
  const path = window.location.pathname;
  const isAdmin = path.startsWith("/admin");
  const {
    event,
    stage,
    group,

    participant1Name,
    participant2Name,

    score1 = [],
    score2 = [],

    bestOf,
    status,
    winner,
    time,
  } = match;

  const [openEdit, setOpenEdit] = useState(false);

  const [editStatus, setEditStatus] = useState(status);
  const [editWinner, setEditWinner] = useState(winner);

  const [editScore1, setEditScore1] = useState(
    score1.length ? [...score1] : Array(bestOf).fill(""),
  );

  const [editScore2, setEditScore2] = useState(
    score2.length ? [...score2] : Array(bestOf).fill(""),
  );

  const renderTeam = (teamName, score, scoreColor) => {
    const players = teamName ? teamName.split("/").map((p) => p.trim()) : [];

    const isWinner = winner === teamName;

    return (
      <div className="flex items-center justify-between py-1">
        <div className="space-y-1">
          {players.map((name, index) => {
            const player = playerMap?.[name.toLowerCase()];

            return (
              <div key={name} className="flex items-center gap-2">
                <img
                  src={
                    player?.department
                      ? `/${player.department}.jpg`
                      : "/logo1.jpg"
                  }
                  alt={name}
                  className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                />

                <span className="text-sm font-semibold text-slate-800">
                  {name}
                </span>

                {/* Show winner badge beside the first player/team */}
                {isWinner && index === 0 && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                    Winner
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className={`flex gap-2 font-semibold ${scoreColor}`}>
          {score.length ? (
            score.map((s, i) => (s !== 0 ? <span key={i}>{s}</span> : null))
          ) : (
            <span>-</span>
          )}
        </div>
      </div>
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateDoc(doc(db, "matches", match.id), {
        status: editStatus,
        score1: editScore1.map((s) => Number(s)),
        score2: editScore2.map((s) => Number(s)),
        winner: editWinner,
      });

      setOpenEdit(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update match.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={badge(event)}>{event}</span>

            <span className="text-xs text-slate-500 capitalize">
              {stage.replaceAll("_", " ")}
            </span>

            {group && <span className="text-xs text-slate-500">{group}</span>}
          </div>

          <Status status={status} />
        </div>

        {/* Team 1 */}
        {renderTeam(participant1Name, score1, "text-blue-600")}

        <div className="relative my-3">
          <div className="border-t border-dashed border-slate-300"></div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
              <span className="text-[10px] font-bold tracking-wider text-slate-500">
                VS
              </span>
            </div>
          </div>
        </div>

        {/* Team 2 */}
        {renderTeam(participant2Name, score2, "text-green-600")}

        {isAdmin && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => setOpenEdit(true)}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              <Pencil size={14} />
              Edit Result
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2 text-[11px] text-slate-500">
          <span>BO{bestOf}</span>

          <span>{time}</span>
        </div>
      </div>
      {openEdit && (
        <div className="fixed bottom-15 inset-x-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full rounded-t-3xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit Match</h2>

              <button onClick={() => setOpenEdit(false)}>
                <X />
              </button>
            </div>

            {/* Status */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold">Status</label>

              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full rounded-xl border p-2"
              >
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Scores */}

            {editScore1.map((_, index) => (
              <div key={index} className="mb-4 rounded-xl border p-3">
                <p className="mb-2 font-semibold">Set {index + 1}</p>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={editScore1[index]}
                    onChange={(e) => {
                      const copy = [...editScore1];
                      copy[index] = e.target.value;
                      setEditScore1(copy);
                    }}
                    placeholder={participant1Name}
                    className="rounded-lg border p-2"
                  />

                  <input
                    type="number"
                    value={editScore2[index]}
                    onChange={(e) => {
                      const copy = [...editScore2];
                      copy[index] = e.target.value;
                      setEditScore2(copy);
                    }}
                    placeholder={participant2Name}
                    className="rounded-lg border p-2"
                  />
                </div>
              </div>
            ))}

            {/* Winner */}
            {/* Winner */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold">
                Winning Team
              </label>

              <select
                value={editWinner}
                onChange={(e) => setEditWinner(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2"
              >
                <option value="">Select winner</option>

                <option value={participant1Name}>{participant1Name}</option>

                <option value={participant2Name}>{participant2Name}</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-3 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Status({ status }) {
  switch (status?.toLowerCase()) {
    case "completed":
      return <CheckCircle2 size={16} className="text-green-600" />;

    case "upcoming":
      return <Clock3 size={16} className="text-blue-600" />;

    case "live":
      return <Radio size={16} className="animate-pulse text-red-600" />;

    default:
      return null;
  }
}

function badge(event) {
  switch (event) {
    case "MS":
      return "rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600";

    case "MD":
      return "rounded-md bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-600";

    case "WS":
      return "rounded-md bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-600";

    case "WD":
      return "rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-600";

    default:
      return "";
  }
}
