import useGame from "@/hooks/useGame";
import style from "./SingleWord.module.css";

type Props = {
  word: string;
  wordIdx: number;
};

const SingleWord = ({ word, wordIdx }: Props) => {
  const { correctWord, currentWord, currentWordIdx } = useGame();

  return (
    <div className={style.wordWrapper}>
      {Array.from(word).map((letter, index) => {
        let included = false;
        let exact = false;
        let fail = false;

        if (wordIdx < currentWordIdx) {
          included = correctWord.current.includes(letter);
          exact = included && letter === correctWord.current[index];
          fail = !included && !exact;
        }

        const active = currentWord[index] !== "#" && wordIdx === currentWordIdx;

        return (
          <div
            className={`${style.letterBox} ${active && style.active} ${included && style.included} ${exact && style.exact} ${fail && style.fail}`}
            key={`${word}-${index}`}
          >
            {letter === "#" ? null : letter}
          </div>
        );
      })}
    </div>
  );
};

export default SingleWord;
