import style from "./WordWall.module.css";
import useGame from "../../hooks/useGame";
import SingleWord from "../SingleWord/SingleWord";
import "./WordWall.module.css";

const WordWall = () => {
  const { currentWords } = useGame();

  return (
    <section className={style.wordWallWrapper}>
      {currentWords.map((word, index) => (
        <SingleWord key={index} word={word} wordIdx={index} />
      ))}
    </section>
  );
};

export default WordWall;
