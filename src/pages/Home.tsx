import Portifolio from "../components/Portifolio";
import Projects from "../components/Projects";
import AboutGroupedStacks from "../components/AboutGroupedStacks";

export const Home = () => {
  return (
    <main className="block max-w-5xl mx-auto p-6 mt-10">
      <Portifolio />
      <AboutGroupedStacks />
      <Projects />
    </main>
  );
};

export default Home;
