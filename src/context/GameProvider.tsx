import React, { useRef, useState } from "react";
import { GameContext } from "@/context/GameContext";

type Props = {
  children: React.ReactNode;
};

const WORD_LENGTH = 6;
const WORDS_COUNT = 6;

const EMPTY_WORD = new Array(WORD_LENGTH).fill("#").join("");

const GameProvider = ({ children }: Props) => {
  const correctWord = useRef("COMMIT");

  const [currentWord, setCurrentWord] = useState(EMPTY_WORD);
  const [words, setWords] = useState(new Array(WORDS_COUNT).fill(EMPTY_WORD));

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const replaceAtWith = (string: string, idx: number, char: string) => {
    return string.slice(0, idx) + char + string.slice(idx + 1);
  };

  const handleKeyPress = (key: string, event: KeyboardEvent | null = null) => {
    if (event) key = event.key;

    if (key === "Enter" && currentLetterIdx === 6) {
      setWords((prev) =>
        prev.map((word, index) => {
          if (index === currentWordIdx) {
            return currentWord;
          } else return word;
        }),
      );

      setCurrentWord(EMPTY_WORD);

      setCurrentWordIdx((prev) => prev + 1);
      setCurrentLetterIdx(0);
    }

    if (currentWordIdx === 6) return;

    if (key === "Backspace" && currentLetterIdx > 0) {
      const newWord = replaceAtWith(currentWord, currentLetterIdx - 1, "#");

      setCurrentWord(newWord);
      setCurrentLetterIdx((prev) => prev - 1);
    }

    if (/^[a-zA-Z]$/.test(key) && currentLetterIdx < 6) {
      const newWord = replaceAtWith(
        currentWord,
        currentLetterIdx,
        key.toUpperCase(),
      );

      setCurrentWord(newWord);
      setCurrentLetterIdx((prev) => prev + 1);
    }
  };

  const provide = {
    correctWord,
    currentWord,
    setCurrentWord,
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
