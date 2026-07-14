import { createContext, useState, useContext } from "react";

const DayContext = createContext();

export function useDay() {
  return useContext(DayContext);
}

function DayProvider({ children }) {
  const [data, setData] = useState({
    day: 1,
  });

  return (
    <DayContext.Provider value={{ data, setData }}>
      {children}
    </DayContext.Provider>
  );
}

export { DayContext, DayProvider };
