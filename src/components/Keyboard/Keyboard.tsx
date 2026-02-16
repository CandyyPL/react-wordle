import style from "./Keyboard.module.css";

type KeyData = {
  style: string;
  value: string;
};

const Keyboard = () => {
  const rows = ["qwertyuiop", "asdfghjkl", "@zxcvbnm#"];

  const getKeyData = (char: string): KeyData => {
    const baseStyle = [style.keyboardKey];

    if (char === "@")
      return {
        style: baseStyle.concat([style.wideKey, style.enterKey]).join(" "),
        value: "↵",
      };
    if (char === "#")
      return { style: baseStyle.concat([style.wideKey]).join(" "), value: "⌫" };

    return { style: baseStyle.join(" "), value: char.toUpperCase() };
  };

  return (
    <section className={style.keyboardWrapper}>
      {rows.map((row) => (
        <div key={row} className={style.keyboardRow}>
          {Array.from(row).map((letter) => {
            const { style, value } = getKeyData(letter);

            return (
              <div key={letter}>
                <span className={style}>{value}</span>
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
