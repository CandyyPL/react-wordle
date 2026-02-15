import SingleLetter from "../SingleLetter/SingleLetter";
import style from "./SingleWord.module.css";

const SingleWord = () => {
  return (
    <div className={style.wordWrapper}>
      <SingleLetter />
    </div>
  );
};

export default SingleWord;
