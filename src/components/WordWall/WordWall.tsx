import style from "./WordWall.module.css";
import useGame from "../../hooks/useGame";
import SingleWord from "../SingleWord/SingleWord";
import "./WordWall.module.css";

const WordWall = () => {
  const { currentWords } = useGame();

  return (
    <section className={style.wordWallWrapper}>
      {currentWords.map((word) => (
        <SingleWord word={word} />
      ))}
    </section>
  );
};

export default WordWall;
