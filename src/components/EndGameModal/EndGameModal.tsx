import useGame from "@/hooks/useGame";
import style from "./EndGameModal.module.css";
import { GAME_WIN } from "@/context/GameContext";

const EndGameModal = () => {
  const { gameState, correctWord } = useGame();

  const win = gameState?.state === GAME_WIN;

  return (
    <div className={style.back}>
      <div className={style.modal}>
        <h1>{win ? "WYGRANA" : "PORAŻKA"}</h1>
        {win ? (
          <p>Poprawnie udało Ci się odgadnąć hasło:</p>
        ) : (
          <p>Nie udało ci się odgadnąć hasła:</p>
        )}
        <p className={style.correct}>{correctWord.current}</p>
        <button className={style.resetButton} onClick={() => location.reload()}>
          ZAGRAJ JESZCZE RAZ
        </button>
      </div>
    </div>
  );
};

export default EndGameModal;
