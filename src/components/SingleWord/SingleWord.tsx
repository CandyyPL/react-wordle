import SingleLetter from "../SingleLetter/SingleLetter";
import style from "./SingleWord.module.css";

type Props = {
  word: string;
  wordIdx: number;
};

const SingleWord = ({ word, wordIdx }: Props) => {
  return (
    <div className={style.wordWrapper}>
      {Array.from(word).map((letter, index) => (
        <SingleLetter key={`${wordIdx}${index}`} letter={letter} />
      ))}
    </div>
  );
};

export default SingleWord;
