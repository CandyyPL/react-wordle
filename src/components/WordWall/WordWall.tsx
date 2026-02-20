import useGame from "@/hooks/useGame";
import style from "./WordWall.module.css";
import SingleWord from "@/components/SingleWord/SingleWord";

const WordWall = () => {
  const { words, currentWord, currentWordIdx } = useGame();

  return (
    <section className={style.wordWallWrapper}>
      {words.map((word, index) => {
        const wordToDisplay = index === currentWordIdx ? currentWord : word;

        return <SingleWord key={index} word={wordToDisplay} wordIdx={index} />;
      })}
    </section>
  );
};

export default WordWall;
