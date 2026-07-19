import { useEffect, useState } from "react";

export default function Draw({ activeEvent, setActiveEvent }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (activeEvent === "All") {
      setActiveEvent("MS");
    }
  }, [activeEvent, setActiveEvent]);

  // Reset error when event changes
  useEffect(() => {
    setImageError(false);
  }, [activeEvent]);

  return (
    <div className="mt-3 pb-28">
      {imageError ? (
        <div className="mx-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <div className="text-lg font-semibold text-slate-700">
            Draw Not Available
          </div>
          <p className="mt-2 text-sm text-slate-500">
            The {activeEvent} knockout bracket hasn't been published yet.
          </p>
        </div>
      ) : (
        <img
          src={`${activeEvent}.jpg`}
          alt={`${activeEvent} Bracket`}
          className="w-full"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}

// import React from "react";
// import MatchCardBracket from "../../Components/MatchCardBracket";

// export default function Draw() {
//   return (
//     <div className="flex flex-col items-center">
//       {/* FINAL */}
//       <MatchCardBracket p1="Winner SF1" p2="Winner SF2" />

//       {/* TOP */}
//       <div className="mt-10 flex justify-center gap-16">
//         <div className="flex flex-col gap-8">
//           <MatchCardBracket p1="Winner QF1" p2="Winner QF2" />

//           <div className="flex gap-6">
//             <MatchCardBracket p1="Winner R16-1" p2="Winner R16-2" />

//             <MatchCardBracket p1="Winner R16-3" p2="Winner R16-4" />
//           </div>

//           <div className="grid grid-cols-4 gap-3">
//             <MatchCardBracket p1="A1" p2="D4" />
//             <MatchCardBracket p1="B2" p2="C3" />
//             <MatchCardBracket p1="B1" p2="C4" />
//             <MatchCardBracket p1="A2" p2="D3" />
//           </div>
//         </div>
//       </div>

//       {/* mirror bottom */}
//     </div>
//   );
// }
