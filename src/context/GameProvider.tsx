import React, { useRef, useState } from "react";
import { GameContext } from "@/context/GameContext";

type Props = {
  children: React.ReactNode;
};

const letters = Array.from("qwertyuiopasdfghjklzxcvbnm");

const GameProvider = ({ children }: Props) => {
  const wordToGuess = useRef("COMMIT");
  const [words, setWords] = useState([
    "######",
    "######",
    "######",
    "######",
    "######",
    "######",
  ]);

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const replaceAtWith = (string: string, idx: number, char: string) => {
    return string.slice(0, idx) + char + string.slice(idx + 1);
  };

  const handleKeyPress = (key: string, event: KeyboardEvent | null = null) => {
    if (event) key = event.key;

    if (key === "Enter" && currentLetterIdx === 6 && currentWordIdx < 5) {
      setCurrentWordIdx((prev) => prev + 1);
      setCurrentLetterIdx(0);
    }

    if (key === "Backspace" && currentLetterIdx > 0) {
      const word = words[currentWordIdx];
      const newWord = replaceAtWith(word, currentLetterIdx - 1, "#");

      setWords((prev) =>
        prev.map((word, idx) => {
          if (idx === currentWordIdx) return newWord;
          else return word;
        }),
      );

      setCurrentLetterIdx((prev) => prev - 1);
    }

    if (letters.includes(key) && currentLetterIdx < 6) {
      const word = words[currentWordIdx];
      const newWord = replaceAtWith(word, currentLetterIdx, key.toUpperCase());

      setWords((prev) =>
        prev.map((word, idx) => {
          if (idx === currentWordIdx) return newWord;
          else return word;
        }),
      );

      setCurrentLetterIdx((prev) => prev + 1);
    }
  };

  const provide = {
    wordToGuess,
    words,
    setWords,
    currentWordIdx,
    setCurrentWordIdx,
    currentLetterIdx,
    setCurrentLetterIdx,
    handleKeyPress,
  };

  return (
    <GameContext.Provider value={provide}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
