import { useMemo, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useGetCollection } from "../../hooks/useFireStore";

import EventSelector from "../../Components/EventSelector";
import MemberSelector from "../../Components/MemberSelector";
import GroupPreview from "../../Components/GroupPreview";

export default function CreateGroup() {
  const { data: players } = useGetCollection("players");
  const { data: teams } = useGetCollection("teams");

  const [event, setEvent] = useState("MS");
  const [group, setGroup] = useState("A");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const members = useMemo(() => {
    switch (event) {
      case "MS":
        return players.filter((player) => player.events?.includes("MS"));

      case "WS":
        return players.filter((player) => player.events?.includes("WS"));

      case "MD":
        return teams.filter((team) => team.event === "MD");

      case "WD":
        return teams.filter((team) => team.event === "WD");

      default:
        return [];
    }
  }, [event, players, teams]);

  const toggleMember = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }

    if (selected.length >= 5) {
      alert("A group can only contain 5 members.");
      return;
    }

    setSelected([...selected, id]);
  };

  const selectedMembers = members.filter((member) =>
    selected.includes(member.id),
  );

  async function handleSubmit() {
    if (selected.length !== 4 && selected.length !== 5) {
      alert("Please select exactly 4 or 5 members.");
      return;
    }

    try {
      setLoading(true);

      const documentId = `${event}_${group}`;

      const data = {
        event,
        group,
      };

      if (event === "MS" || event === "WS") {
        data.players = selected;
      } else {
        data.teams = selected;
      }

      await setDoc(doc(db, "groups", documentId), data);

      alert("Group created successfully.");

      setSelected([]);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-5 p-4">
      <div>
        <h1 className="text-2xl font-bold">Create Group</h1>

        <p className="text-sm text-slate-500">
          Assign players or teams to tournament groups.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow">
        <EventSelector
          event={event}
          setEvent={(value) => {
            setEvent(value);
            setSelected([]);
            setGroup("A");
          }}
          group={group}
          setGroup={(value) => {
            setGroup(value);
            setSelected([]);
          }}
        />
      </div>

      <div className="rounded-2xl bg-white p-5 shadow">
        <MemberSelector
          members={members}
          selected={selected}
          toggleMember={toggleMember}
        />
      </div>

      <GroupPreview
        selectedMembers={selectedMembers}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
