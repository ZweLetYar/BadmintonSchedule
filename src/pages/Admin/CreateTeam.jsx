import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { addCollection, useGetCollection } from "../../hooks/useFireStore";

export default function CreateTeam() {
  const { data: players, loading } = useGetCollection("players");

  const [form, setForm] = useState({
    event: "MD",
    player1: "",
    player2: "",
  });

  const availablePlayers = useMemo(() => {
    return players.filter((player) => player.events?.includes(form.event));
  }, [players, form.event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.player1 || !form.player2) {
      alert("Please select two players.");
      return;
    }

    if (form.player1 === form.player2) {
      alert("Player 1 and Player 2 cannot be the same.");
      return;
    }

    const p1 = players.find((p) => p.id === form.player1);
    const p2 = players.find((p) => p.id === form.player2);

    if (!p1 || !p2) return;

    try {
      await addCollection("teams", {
        event: form.event,

        player1: p1.id,
        player2: p2.id,

        player1Name: p1.name,
        player2Name: p2.name,

        name: `${p1.name} / ${p2.name}`,
      });

      alert("Team created successfully.");

      setForm({
        event: "MD",
        player1: "",
        player2: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const selectedPlayer1 = players.find((p) => p.id === form.player1);

  const selectedPlayer2 = players.find((p) => p.id === form.player2);

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Team</h1>

        <p className="text-sm text-slate-500">
          Create Men's or Women's doubles teams.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-5 shadow"
      >
        {/* Event */}

        <div>
          <label className="mb-2 block text-sm font-semibold">Event</label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setForm({
                  event: "MD",
                  player1: "",
                  player2: "",
                })
              }
              className={`rounded-xl py-3 font-semibold transition ${
                form.event === "MD"
                  ? "bg-cyan-600 text-white"
                  : "border border-slate-300"
              }`}
            >
              Men's Doubles
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  event: "WD",
                  player1: "",
                  player2: "",
                })
              }
              className={`rounded-xl py-3 font-semibold transition ${
                form.event === "WD"
                  ? "bg-violet-600 text-white"
                  : "border border-slate-300"
              }`}
            >
              Women's Doubles
            </button>
          </div>
        </div>

        {/* Player 1 */}

        <div>
          <label className="mb-2 block text-sm font-semibold">Player 1</label>

          <select
            value={form.player1}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                player1: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select Player</option>

            {availablePlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        {/* Player 2 */}

        <div>
          <label className="mb-2 block text-sm font-semibold">Player 2</label>

          <select
            value={form.player2}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                player2: e.target.value,
              }))
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select Player</option>

            {availablePlayers
              .filter((player) => player.id !== form.player1)
              .map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
          </select>
        </div>

        {/* Preview */}

        {selectedPlayer1 && selectedPlayer2 && (
          <div className="rounded-xl bg-slate-50 p-4 border">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Team Preview
            </p>

            <h3 className="mt-2 text-lg font-bold">
              {selectedPlayer1.name} / {selectedPlayer2.name}
            </h3>
          </div>
        )}

        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Users size={18} />
          Create Team
        </button>
      </form>
    </div>
  );
}
