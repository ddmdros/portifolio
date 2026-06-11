import Portifolio from "../components/Portifolio";
import Projects from "../components/Projects";
import AboutGroupedStacks from "../components/AboutGroupedStacks";
import ResumePreview from "../components/ResumePreview";
import ContactPreview from "../components/ContactPreview";
import ScrollReveal from "../components/ScrollReveal";

export const Home = () => {
  return (
    <main className="block max-w-5xl mx-auto p-6 mt-10 animate-fade-in-up">
      <Portifolio />
      
      <ScrollReveal className="py-6">
        <AboutGroupedStacks />
      </ScrollReveal>
      
      <ScrollReveal className="py-6">
        <Projects />
      </ScrollReveal>
      
      <ScrollReveal className="py-6">
        <ResumePreview />
      </ScrollReveal>
      
      <ScrollReveal className="py-6">
        <ContactPreview />
      </ScrollReveal>
    </main>
  );
};

export default Home;
