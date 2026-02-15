import style from "./Keyboard.module.css";

const Keyboard = () => {
  const rows = [
    Array.from("qwertyuiop"),
    Array.from("asdfghjkl"),
    Array.from("@zxcvbnm#"),
  ];

  return (
    <section className={style.keyboardWrapper}>
      {rows.map((row, rId) => (
        <div key={rId} className={style.keyboardRow}>
          {row.map((letter, lId) => (
            <>
              {letter === "@" && (
                <div
                  key={`${rId}${lId}`}
                  className={`${style.keyboardKey} ${style.wideKey} ${style.enterKey}`}
                >
                  ↵
                </div>
              )}
              {letter === "#" && (
                <div
                  key={`${rId}${lId}`}
                  className={`${style.keyboardKey} ${style.wideKey}`}
                >
                  ⌫
                </div>
              )}
              {letter !== "@" && letter !== "#" && (
                <div key={`${rId}${lId}`} className={style.keyboardKey}>
                  {letter.toUpperCase()}
                </div>
              )}
            </>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
