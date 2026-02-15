import SingleLetter from "../SingleLetter/SingleLetter";
import style from "./SingleWord.module.css";

type Props = {
  word: string;
};

const SingleWord = ({ word }: Props) => {
  return (
    <div className={style.wordWrapper}>
      {Array.from(word).map((letter) => (
        <SingleLetter />
      ))}
    </div>
  );
};

export default SingleWord;
