import { useEffect } from "react";
import Header from "@/components/Header/Header";
import WordWall from "@/components/WordWall/WordWall";
import Keyboard from "@/components/Keyboard/Keyboard";
import Footer from "@/components/Footer/Footer";
import useGame from "@/hooks/useGame";
import EndGameModal from "@/components/EndGameModal/EndGameModal";
import "@/assets/index.css";

const App = () => {
  const { handleKeyPress, gameState } = useGame();

  useEffect(() => {
    window.onkeydown = (e) => handleKeyPress(e.key);

    return () => {
      window.onkeydown = null;
    };
  });

  useEffect(() => {
    if (gameState != null) {
      window.onkeydown = null;
    }
  }, [gameState]);

  return (
    <main>
      {gameState != null && <EndGameModal />}
      <Header />
      <WordWall />
      <Keyboard />
      <Footer />
    </main>
  );
};

export default App;
