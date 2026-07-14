import { useState } from "react";
import { UserPlus } from "lucide-react";
import { addCollection } from "../../hooks/useFireStore";

function normalizeName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "");
}

const eventOptions = [
  { id: "MS", label: "Men's Singles" },
  { id: "MD", label: "Men's Doubles" },
  { id: "WS", label: "Women's Singles" },
  { id: "WD", label: "Women's Doubles" },
];

const departmentOptions = ["IST", "CE", "EcE", "PrE", "AME"];

export default function CreatePlayer() {
  const [form, setForm] = useState({
    name: "",
    gender: "Male",
    department: "",
    events: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEventChange = (eventId) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter player name.");
      return;
    }

    if (!form.department) {
      alert("Please select department.");
      return;
    }

    if (form.events.length === 0) {
      alert("Please select at least one event.");
      return;
    }

    try {
      setLoading(true);
      const imgname = normalizeName(form.name);

      await addCollection("players", {
        ...form,
        image: imgname + ".jpg",
      });

      alert("Player added successfully!");

      setForm({
        name: "",
        gender: "Male",
        department: "",
        events: [],
      });
    } catch (err) {
      console.log({
        code: err.code,
        message: err.message,
      });
      alert("Failed to add player.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Create Player</h1>

        <p className="text-sm text-slate-500">
          Register a player for the tournament.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-5 shadow-md"
      >
        {/* Player Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Player Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter player name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Gender</label>

          <div className="grid grid-cols-2 gap-3">
            {["Male", "Female"].map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    gender,
                  }))
                }
                className={`rounded-xl border py-3 text-sm font-semibold transition ${
                  form.gender === gender
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Events</label>

          <div className="grid grid-cols-2 gap-3">
            {eventOptions.map((event) => {
              const selected = form.events.includes(event.id);

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => handleEventChange(event.id)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {event.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Department</label>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option value="">Select Department</option>

            {departmentOptions.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlus size={18} />

          {loading ? "Saving..." : "Add Player"}
        </button>
      </form>
    </div>
  );
}
