import React, { createContext, useState } from "react";

export const TeamContext = createContext();

export default function Team({ children }) {

  const [slot1, setSlot1] = useState("");
  const [slot2, setSlot2] = useState("");
  const [slot3, setSlot3] = useState("");
  const [slot4, setSlot4] = useState("");
  const [slot5, setSlot5] = useState("");
  const [slot6, setSlot6] = useState("");

  function AddToTeam(k) {
    slot1 === ""
      ? setSlot1(k)
      : slot2 === ""
        ? setSlot2(k)
        : slot3 === ""
          ? setSlot3(k)
          : slot4 === ""
            ? setSlot4(k)
            : slot5 === ""
              ? setSlot5(k)
              : slot6 === ""
                ? setSlot6(k)
                : console.log("El equipo está lleno");
  }

  return (
    <TeamContext.Provider value={{ slot1, slot2, slot3, slot4, slot5, slot6, AddToTeam }}>
      {children}
    </TeamContext.Provider>
  );
}
