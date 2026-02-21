import useGame from "@/hooks/useGame";
import style from "./Keyboard.module.css";
import { useCallback } from "react";

type KeyData = {
  style: string;
  value: string;
  key: string;
};

const Keyboard = () => {
  const {
    handleKeyPress,
    exactLetters: exact,
    includedLetters: included,
    notIncludedLetters: notIncluded,
  } = useGame();

  const rows = ["qwertyuiop", "asdfghjkl", "@zxcvbnm#"];

  const getKeyData = useCallback(
    (char: string): KeyData => {
      const baseStyle = [style.keyboardKey];

      if (char === "@")
        return {
          style: [...baseStyle, style.wideKey, style.enterKey].join(" "),
          value: "↵",
          key: "Enter",
        };
      if (char === "#")
        return {
          style: [...baseStyle, style.wideKey].join(" "),
          value: "⌫",
          key: "Backspace",
        };

      let letterStateStyle: string[] = [];

      if (notIncluded.includes(char.toUpperCase()))
        letterStateStyle = [style.notIncluded];
      if (included.includes(char.toUpperCase()))
        letterStateStyle = [style.included];
      if (exact.includes(char.toUpperCase())) letterStateStyle = [style.exact];

      return {
        style: [...baseStyle, ...letterStateStyle].join(" "),
        value: char.toUpperCase(),
        key: char,
      };
    },
    [exact, included, notIncluded],
  );

  return (
    <section className={style.keyboardWrapper}>
      {rows.map((row) => (
        <div key={row} className={style.keyboardRow}>
          {Array.from(row).map((letter) => {
            const { style, value, key } = getKeyData(letter);

            return (
              <button
                key={letter}
                className={style}
                style={{ "--target-bg": "" } as React.CSSProperties}
                onClick={() => handleKeyPress(key)}
              >
                <span>{value}</span>
              </button>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
