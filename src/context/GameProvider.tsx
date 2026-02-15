import React, { useRef, useState } from "react";
import { GameContext } from "./GameContext";

type Props = {
  children: React.ReactNode;
};

const GameProvider = ({ children }: Props) => {
  const wordToGuess = useRef("");
  const [currentWords, setCurrentWords] = useState(["", "", "", "", "", ""]);

  const provide = {
    wordToGuess,
    currentWords,
    setCurrentWords,
  };

  return (
    <GameContext.Provider value={provide}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
