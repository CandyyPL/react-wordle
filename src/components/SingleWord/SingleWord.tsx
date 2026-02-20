import style from "./SingleWord.module.css";

type Props = {
  word: string;
  wordIdx: number;
};

const SingleWord = ({ word, wordIdx }: Props) => {
  return (
    <div className={style.wordWrapper}>
      {Array.from(word).map((letter, index) => (
        <div className={style.letterBox} key={`${word}-${index}`}>
          {letter === "#" ? null : letter}
        </div>
      ))}
    </div>
  );
};

export default SingleWord;
