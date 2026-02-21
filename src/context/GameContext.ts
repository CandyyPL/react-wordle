import { createContext, type RefObject, type SetStateAction } from "react";

export type CurrentWordType = {
  word: string;
  wordArray: {
    letter: string;
    new: boolean;
  }[];
  wrong: boolean;
};

export type GameContextType = {
  correctWord: RefObject<string>;
  currentWord: CurrentWordType;
  setCurrentWord: React.Dispatch<SetStateAction<CurrentWordType>>;
  words: string[];
  setWords: React.Dispatch<SetStateAction<string[]>>;
  currentWordIdx: number;
  setCurrentWordIdx: React.Dispatch<SetStateAction<number>>;
  currentLetterIdx: number;
  setCurrentLetterIdx: React.Dispatch<SetStateAction<number>>;
  handleKeyPress: (key: string, event?: KeyboardEvent | null) => void;
};

export const GameContext = createContext<GameContextType | null>(null);
