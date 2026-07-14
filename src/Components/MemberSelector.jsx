export default function MemberSelector({ members, selected, toggleMember }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">Members ({selected.length}/5)</h3>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {members.map((member) => {
          const active = selected.includes(member.id);

          return (
            <button
              key={member.id}
              type="button"
              onClick={() => toggleMember(member.id)}
              className={`w-full rounded-xl border p-3 flex justify-between items-center transition
                ${active ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
            >
              <div>
                <p className="font-medium">{member.name}</p>

                {member.department && (
                  <p className="text-xs text-slate-500">{member.department}</p>
                )}
              </div>

              {active && <span className="text-blue-600 font-bold">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
