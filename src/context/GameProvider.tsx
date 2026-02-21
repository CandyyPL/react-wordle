import React, { useEffect, useRef, useState } from "react";
import { GameContext, type CurrentWordType } from "@/context/GameContext";
import wordlist from "@/db/words";

type Props = {
  children: React.ReactNode;
};

const WORD_LENGTH = 6;
const WORDS_COUNT = 6;

const EMPTY_WORD = new Array(WORD_LENGTH).fill("#").join("");
const CHOSEN_WORD = wordlist[Math.floor(Math.random() * wordlist.length)];

const CURRENT_WORD_DEFAULT_VALUE: CurrentWordType = {
  word: new Array(WORD_LENGTH).fill("#").join(""),
  wordArray: new Array(WORD_LENGTH).fill({ letter: "#", new: false }),
  wrong: false,
};

const GameProvider = ({ children }: Props) => {
  const correctWord = useRef(CHOSEN_WORD);

  const [currentWord, setCurrentWord] = useState<CurrentWordType>(
    CURRENT_WORD_DEFAULT_VALUE,
  );

  const [words, setWords] = useState(new Array(WORDS_COUNT).fill(EMPTY_WORD));

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  useEffect(() => {
    console.log(correctWord.current);
  }, []);

  useEffect(() => {
    console.log(currentWord);
  }, [currentWord]);

  const clearCurrentWord = () => {
    setCurrentWord(CURRENT_WORD_DEFAULT_VALUE);
  };

  const handleSetCurrentWord = (word: string) => {
    setCurrentWord((prev) => {
      const wordArray = Array.from(word).map((letter, index) => {
        return {
          letter: letter,
          new: letter !== "#" && prev.wordArray[index].letter === "#",
        };
      });

      return { word, wordArray, wrong: false };
    });
  };

  const replaceAtWith = (string: string, idx: number, char: string) => {
    return string.slice(0, idx) + char + string.slice(idx + 1);
  };

  const handleKeyPress = (key: string, event: KeyboardEvent | null = null) => {
    if (event) key = event.key;

    if (key === "Enter" && currentLetterIdx === 6) {
      if (!wordlist.includes(currentWord.word)) {
        setCurrentWord((prev) => ({ ...prev, wrong: true }));
        return;
      }

      setWords((prev) =>
        prev.map((word, index) => {
          if (index === currentWordIdx) {
            return currentWord.word;
          } else return word;
        }),
      );

      clearCurrentWord();

      setCurrentWordIdx((prev) => prev + 1);
      setCurrentLetterIdx(0);
    }

    if (currentWordIdx === 6) return;

    if (key === "Backspace" && currentLetterIdx > 0) {
      const newWord = replaceAtWith(
        currentWord.word,
        currentLetterIdx - 1,
        "#",
      );

      handleSetCurrentWord(newWord);
      setCurrentLetterIdx((prev) => prev - 1);
    }

    if (/^[a-zA-Z]$/.test(key) && currentLetterIdx < 6) {
      const newWord = replaceAtWith(
        currentWord.word,
        currentLetterIdx,
        key.toUpperCase(),
      );

      handleSetCurrentWord(newWord);
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
