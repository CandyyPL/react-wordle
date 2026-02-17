import style from "./WordWall.module.css";
import useGame from "@/hooks/useGame";
import SingleWord from "@/components/SingleWord/SingleWord";

const WordWall = () => {
  const { words } = useGame();

  return (
    <section className={style.wordWallWrapper}>
      {words.map((word, index) => (
        <SingleWord key={index} word={word} wordIdx={index} />
      ))}
    </section>
  );
};

export default WordWall;
