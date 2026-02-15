import "./index.css";
import Header from "./components/Header/Header";
import WordWall from "./components/WordWall/WordWall";
import Keyboard from "./components/Keyboard/Keyboard";

const App = () => {
  return (
    <main>
      <Header />
      <WordWall />
      <Keyboard />
    </main>
  );
};

export default App;
