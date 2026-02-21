import { createContext, type RefObject, type SetStateAction } from "react";

export type CurrentWordType = {
  word: string;
  wordArray: {
    letter: string;
    new: boolean;
  }[];
  wrong: boolean;
};

export type GameStateType = {
  state: "win" | "lose";
  attempts?: number;
};

export const GAME_WIN = "win";
export const GAME_LOSE = "lose";

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
  exactLetters: string[];
  setExactLetters: React.Dispatch<SetStateAction<string[]>>;
  includedLetters: string[];
  setIncludedLetters: React.Dispatch<SetStateAction<string[]>>;
  notIncludedLetters: string[];
  setNotIncludedLetters: React.Dispatch<SetStateAction<string[]>>;
  handleKeyPress: (key: string, event?: KeyboardEvent | null) => void;
  gameState: GameStateType | null;
  setGameState: React.Dispatch<SetStateAction<GameStateType | null>>;
};

export const GameContext = createContext<GameContextType | null>(null);
