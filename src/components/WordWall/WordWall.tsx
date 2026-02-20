import style from "./WordWall.module.css";
import SingleWord from "@/components/SingleWord/SingleWord";

type Props = {
  words: string[];
  currentWord: string;
  currentWordIdx: number;
};

const WordWall = ({ words, currentWord, currentWordIdx }: Props) => {
  return (
    <section className={style.wordWallWrapper}>
      {words.map((word, index) => {
        if (index === currentWordIdx) {
          return <SingleWord key={index} word={currentWord} wordIdx={index} />;
        }
        return <SingleWord key={index} word={word} wordIdx={index} />;
      })}
    </section>
  );
};

export default WordWall;
