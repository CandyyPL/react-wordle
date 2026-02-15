import style from "./Keyboard.module.css";

const Keyboard = () => {
  const rows = [
    Array.from("qwertyuiop"),
    Array.from("asdfghjkl"),
    Array.from("@zxcvbnm#"),
  ];

  return (
    <section className={style.keyboardWrapper}>
      {rows.map((row) => (
        <div className={style.keyboardRow}>
          {row.map((letter) => (
            <>
              {letter === "@" && (
                <div
                  className={`${style.keyboardKey} ${style.wideKey} ${style.enterKey}`}
                >
                  ↵
                </div>
              )}
              {letter === "#" && (
                <div className={`${style.keyboardKey} ${style.wideKey}`}>⌫</div>
              )}
              {letter !== "@" && letter !== "#" && (
                <div className={style.keyboardKey}>{letter.toUpperCase()}</div>
              )}
            </>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Keyboard;
