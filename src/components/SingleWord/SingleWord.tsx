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

        const isCurrent = wordIdx === currentWordIdx;

        const active = currentWord.word[index] !== "#" && isCurrent;

        const pop = active && currentWord.wordArray[index].new;
        const invalid = isCurrent && currentWord.wrong;

        const color = fail
          ? "#858585"
          : included
            ? exact
              ? "#50d676"
              : "#dfa253"
            : "#ddd";

        return (
          <div
            className={`${style.letterBox} ${active && style.active} ${included && style.included} ${exact && style.exact} ${fail && style.fail} ${pop && style.pop} ${invalid && style.shake}`}
            style={
              {
                "--index": index,
                "--target-bg": color,
              } as React.CSSProperties
            }
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
