import { Save } from "lucide-react";

export default function GroupPreview({ selectedMembers, loading, onSubmit }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <h3 className="font-semibold">Selected Members</h3>

      <div className="mt-3 space-y-2">
        {selectedMembers.length === 0 && (
          <p className="text-sm text-slate-400">No members selected.</p>
        )}

        {selectedMembers.map((member) => (
          <div key={member.id} className="rounded-lg bg-slate-100 px-3 py-2">
            {member.name}
          </div>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white"
      >
        <Save size={18} />

        {loading ? "Saving..." : "Create Group"}
      </button>
    </div>
  );
}
