import useGame from "@/hooks/useGame";
import style from "./Keyboard.module.css";

type KeyData = {
  style: string;
  value: string;
  key: string;
};

const Keyboard = () => {
  const { handleKeyPress } = useGame();

  const rows = ["qwertyuiop", "asdfghjkl", "@zxcvbnm#"];

  const getKeyData = (char: string): KeyData => {
    const baseStyle = [style.keyboardKey];

    if (char === "@")
      return {
        style: baseStyle.concat([style.wideKey, style.enterKey]).join(" "),
        value: "↵",
        key: "Enter",
      };
    if (char === "#")
      return {
        style: baseStyle.concat([style.wideKey]).join(" "),
        value: "⌫",
        key: "Backspace",
      };

    return {
      style: baseStyle.join(" "),
      value: char.toUpperCase(),
      key: char,
    };
  };

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
