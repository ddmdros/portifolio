import Portifolio from "../components/Portifolio";
import Projects from "../components/Projects";
import About from "../components/About";

export const Home = () => {
  return (
    <main className="block max-w-5xl mx-auto p-6 mt-10">
      <Portifolio />
      <About />
      <Projects />
    </main>
  );
};

export default Home;
