import { useContext } from "react";
import { GameContext, type GameContextType } from "../context/GameContext";

const useGame = () => {
  const context = useContext<GameContextType | null>(GameContext);

  if (context) {
    return context;
  } else {
    throw new Error("useGame hook must be used inside of GameProvider");
  }
};

export default useGame;
