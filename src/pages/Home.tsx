import Portfolio from "../components/Portfolio";
import Projects from "../components/Projects";
import AboutGroupedStacks from "../components/AboutGroupedStacks";
import ResumePreview from "../components/ResumePreview";
import ContactPreview from "../components/ContactPreview";

// Every section is visible as soon as the page loads: no entrance or scroll-reveal animation.
export const Home = () => {
  return (
    <main className="block max-w-5xl mx-auto p-6 mt-10">
      <Portfolio />
      <AboutGroupedStacks />
      <Projects />
      <ResumePreview />
      <ContactPreview />
    </main>
  );
};
