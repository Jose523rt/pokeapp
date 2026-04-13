import React, { createContext, useState } from "react";

export const TeamContext = createContext();

export function Team({ children }) {
  const [slot1, setSlot1] = useState([]);
  const [slot2, setSlot2] = useState([]);
  const [slot3, setSlot3] = useState([]);
  const [slot4, setSlot4] = useState([]);
  const [slot5, setSlot5] = useState([]);
  const [slot6, setSlot6] = useState([]);
  const [isTeam, setIsTeam] = useState(false);

  function AddToTeam(k) {
    slot1.length === 0
      ? (setSlot1(k), setIsTeam(true))
      : slot2.length === 0
        ? (setSlot2(k), setIsTeam(true))
        : slot3.length === 0
          ? (setSlot3(k), setIsTeam(true))
          : slot4.length === 0
            ? (setSlot4(k), setIsTeam(true))
            : slot5.length === 0
              ? (setSlot5(k), setIsTeam(true))
              : slot6.length === 0
                ? (setSlot6(k), setIsTeam(true))  
                : console.log("El equipo está lleno");
  }

  return (
    <TeamContext.Provider
      value={{ slot1, slot2, slot3, slot4, slot5, slot6, AddToTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}
