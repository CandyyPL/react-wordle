import style from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1 className={style.heading}>Word Guessing Game</h1>
    </header>
  );
};

export default Header;
