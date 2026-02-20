import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header/Header";
import WordWall from "@/components/WordWall/WordWall";
import Keyboard from "@/components/Keyboard/Keyboard";
import Footer from "@/components/Footer/Footer";
import "@/assets/index.css";

const WORD_LENGTH = 6;
const WORDS_COUNT = 6;

const EMPTY_WORD = new Array(WORD_LENGTH).fill("#").join("");

const App = () => {
  const wordToGuess = useRef("COMMIT");

  const [currentWord, setCurrentWord] = useState(EMPTY_WORD);
  const [words, setWords] = useState(new Array(WORDS_COUNT).fill(EMPTY_WORD));

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const replaceAtWith = (string: string, idx: number, char: string) => {
    return string.slice(0, idx) + char + string.slice(idx + 1);
  };

  const handleKeyPress = (key: string, event: KeyboardEvent | null = null) => {
    if (event) key = event.key;

    if (key === "Enter" && currentLetterIdx === 6 && currentWordIdx < 5) {
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

  useEffect(() => {
    window.onkeydown = (e) => handleKeyPress(e.key);

    return () => {
      window.onkeydown = null;
    };
  });

  return (
    <main>
      <Header />
      <WordWall
        words={words}
        currentWord={currentWord}
        currentWordIdx={currentWordIdx}
      />
      <Keyboard handleKeyPress={handleKeyPress} />
      <Footer />
    </main>
  );
};

export default App;
