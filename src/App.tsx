import { useEffect } from "react";
import Header from "@/components/Header/Header";
import WordWall from "@/components/WordWall/WordWall";
import Keyboard from "@/components/Keyboard/Keyboard";
import Footer from "@/components/Footer/Footer";
import useGame from "@/hooks/useGame";
import "@/assets/index.css";

const App = () => {
  const { handleKeyPress } = useGame();

  useEffect(() => {
    window.onkeydown = (e) => handleKeyPress(e.key);

    return () => {
      window.onkeydown = null;
    };
  });

  return (
    <main>
      <Header />
      <WordWall />
      <Keyboard />
      <Footer />
    </main>
  );
};

export default App;
