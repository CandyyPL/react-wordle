import React, { useRef, useState } from "react";
import {
  GAME_LOSE,
  GAME_WIN,
  GameContext,
  type CurrentWordType,
  type GameStateType,
} from "@/context/GameContext";
import wordlist from "@/db/words";

type Props = {
  children: React.ReactNode;
};

const WORD_LENGTH = 6;
const WORDS_COUNT = 6;

const ENTER_KEY = "Enter";
const BACKSPACE_KEY = "Backspace";

const EMPTY_WORD = new Array(WORD_LENGTH).fill("#").join("");
const CHOSEN_WORD = wordlist[Math.floor(Math.random() * wordlist.length)];

const GameProvider = ({ children }: Props) => {
  const correctWord = useRef(CHOSEN_WORD);

  const getInitialCurrentWord = () => ({
    word: "#".repeat(WORD_LENGTH),
    wordArray: new Array(WORD_LENGTH).fill({ letter: "#", new: false }),
    wrong: false,
  });

  const [currentWord, setCurrentWord] = useState<CurrentWordType>(
    getInitialCurrentWord(),
  );

  const [words, setWords] = useState(new Array(WORDS_COUNT).fill(EMPTY_WORD));

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const [exactLetters, setExactLetters] = useState<string[]>([]);
  const [includedLetters, setIncludedLetters] = useState<string[]>([]);
  const [notIncludedLetters, setNotIncludedLetters] = useState<string[]>([]);

  const [gameState, setGameState] = useState<GameStateType | null>(null);

  // useEffect(() => {
  //   console.log(correctWord.current);
  // }, []);

  // useEffect(() => {
  //   console.log(currentWord);
  // }, [currentWord]);

  // useEffect(() => {
  //   console.log(exactLetters);
  //   console.log(includedLetters);
  //   console.log(notIncludedLetters);
  // }, [exactLetters, includedLetters, notIncludedLetters]);

  const handleEndGame = (state: string) => {
    if (state === GAME_WIN) {
      setGameState({ state: GAME_WIN, attempts: currentWordIdx + 1 });
    } else {
      setGameState({ state: GAME_LOSE });
    }
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

    if (key === ENTER_KEY) {
      if (currentLetterIdx !== WORD_LENGTH) return;

      if (
        !wordlist.includes(currentWord.word) ||
        words.includes(currentWord.word)
      ) {
        setCurrentWord((prev) => ({ ...prev, wrong: true }));
        return;
      }

      for (let i = 0; i < 6; i++) {
        const userLetter = currentWord.word[i];
        const correctLetter = correctWord.current[i];

        if (!correctWord.current.includes(userLetter))
          setNotIncludedLetters((prev) => [...prev, userLetter]);
        else {
          if (userLetter === correctLetter)
            setExactLetters((prev) => [...prev, userLetter]);
          else setIncludedLetters((prev) => [...prev, userLetter]);
        }
      }

      setWords((prev) => {
        const newWords = [...prev];
        newWords[currentWordIdx] = currentWord.word;
        return newWords;
      });

      setCurrentWord(getInitialCurrentWord());
      setCurrentWordIdx((prev) => prev + 1);
      setCurrentLetterIdx(0);

      if (currentWord.word === correctWord.current) {
        setTimeout(() => handleEndGame(GAME_WIN), 1000);

        return;
      }

      if (currentWordIdx === 5) {
        setTimeout(() => handleEndGame(GAME_LOSE), 1000);

        return;
      }

      return;
    }

    if (currentWordIdx === WORDS_COUNT) return;

    if (key === BACKSPACE_KEY) {
      if (currentLetterIdx === 0) return;

      const newWord = replaceAtWith(
        currentWord.word,
        currentLetterIdx - 1,
        "#",
      );

      handleSetCurrentWord(newWord);
      setCurrentLetterIdx((prev) => prev - 1);

      return;
    }

    if (/^[a-zA-Z]$/.test(key) && currentLetterIdx < WORD_LENGTH) {
      const newWord = replaceAtWith(
        currentWord.word,
        currentLetterIdx,
        key.toUpperCase(),
      );

      handleSetCurrentWord(newWord);
      setCurrentLetterIdx((prev) => prev + 1);

      return;
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
    exactLetters,
    setExactLetters,
    includedLetters,
    setIncludedLetters,
    notIncludedLetters,
    setNotIncludedLetters,
    handleKeyPress,
    gameState,
    setGameState,
  };

  return (
    <GameContext.Provider value={provide}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
