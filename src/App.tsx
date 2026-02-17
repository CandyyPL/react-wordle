import "@/assets/index.css";
import Header from "@/components/Header/Header";
import WordWall from "@/components/WordWall/WordWall";
import Keyboard from "@/components/Keyboard/Keyboard";
import Footer from "@/components/Footer/Footer";

const App = () => {
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
