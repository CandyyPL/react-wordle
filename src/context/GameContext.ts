import { createContext, type RefObject, type SetStateAction } from "react";

export type GameContextType = {
  wordToGuess: RefObject<string>;
  currentWords: string[];
  setCurrentWords: React.Dispatch<SetStateAction<string[]>>;
};

export const GameContext = createContext<GameContextType | null>(null);
