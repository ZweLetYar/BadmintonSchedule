import React from "react";
import SchedulePage from "../../Components/SchedulePage";

function Home() {
  return (
    <div>
      <SchedulePage activeDay={1} activeEvent={"all"} />
    </div>
  );
}

export default Home;
