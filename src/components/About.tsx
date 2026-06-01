import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import SectionDiv from "./SectionDiv";
import { FormattedMessage } from "react-intl";

const techStack = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Git & CI/CD", icon: <SiGit /> },
];

const About = () => {
  return (
    <section className="py-20">
      <SectionDiv sectionNumber="01" sectionTitleId="section.title.1" />

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-text-h leading-tight">
            <FormattedMessage id={"about.title"} />
          </h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            <FormattedMessage id={"about.description"} />
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center p-6 bg-card-bg border border-white/10 rounded-xl hover:border-accent/50 transition-colors"
            >
              <div className="text-2xl mb-3 text-gray-300">{tech.icon}</div>
              <span className="text-sm text-gray-400 font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
