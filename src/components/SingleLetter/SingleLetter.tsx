import style from "./SingleLetter.module.css";

type Props = {
  letter: string;
};

const SingleLetter = ({ letter }: Props) => {
  return (
    <div className={style.letterBox}>{letter === "#" ? null : letter}</div>
  );
};

export default SingleLetter;
