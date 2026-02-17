import { createContext, type RefObject, type SetStateAction } from "react";

export type GameContextType = {
  wordToGuess: RefObject<string>;
  words: string[];
  setWords: React.Dispatch<SetStateAction<string[]>>;
  currentWordIdx: number;
  setCurrentWordIdx: React.Dispatch<SetStateAction<number>>;
  currentLetterIdx: number;
  setCurrentLetterIdx: React.Dispatch<SetStateAction<number>>;
  handleKeyPress: (key: string, event?: KeyboardEvent | null) => void;
};

export const GameContext = createContext<GameContextType | null>(null);
