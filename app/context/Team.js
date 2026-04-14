import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export const TeamContext = createContext();

export function Team({ children }) {
  const [slot1, setSlot1] = useState([]);
  const [slot2, setSlot2] = useState([]);
  const [slot3, setSlot3] = useState([]);
  const [slot4, setSlot4] = useState([]);
  const [slot5, setSlot5] = useState([]);
  const [slot6, setSlot6] = useState([]);
  const [isTeam, setIsTeam] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function AddToTeam(k) {
    slot1.length === 0
      ? (setSlot1(k), setIsTeam(true), showModal())
      : slot2.length === 0
        ? (setSlot2(k), setIsTeam(true), showModal())
        : slot3.length === 0
          ? (setSlot3(k), setIsTeam(true), showModal())
          : slot4.length === 0
            ? (setSlot4(k), setIsTeam(true), showModal())
            : slot5.length === 0
              ? (setSlot5(k), setIsTeam(true), showModal())
              : slot6.length === 0
                ? (setSlot6(k), setIsTeam(true), showModal())  
                : Alert.alert("El equipo está lleno");
  }
  

  return (
    <TeamContext.Provider
      value={{ slot1, slot2, slot3, slot4, slot5, slot6, visible,AddToTeam, setVisible, showModal, hideModal }}
    >
      {children}
    </TeamContext.Provider>
  );
}
