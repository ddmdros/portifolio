import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiUnity,
  SiGooglecloud,
  SiSupabase,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

import SectionDiv from "./SectionDiv";
import { FormattedMessage } from "react-intl";

const techStackGroups = [
  {
    category: "about.stacks.programming.languages",
    technologies: [
      { name: "Python", icon: <SiPython /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C#", icon: <TbBrandCSharp /> },
    ],
  },
  {
    category: "about.stacks.web.game.dev",
    technologies: [
      { name: "React", icon: <SiReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Unity", icon: <SiUnity /> },
    ],
  },
  {
    category: "about.stacks.data.devops",
    technologies: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Git & CI/CD", icon: <SiGit /> },
      { name: "Google Cloud", icon: <SiGooglecloud /> },
      { name: "Supabase", icon: <SiSupabase /> },
    ],
  },
];

const AboutGroupedStacks = () => {
  return (
    <section className="py-20">
      <SectionDiv sectionNumber="01" sectionTitleId="section.title.1" />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-text-h leading-tight">
            <FormattedMessage id={"about.title"} />
          </h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            <FormattedMessage id={"about.description"} />
          </p>
        </div>

        <div className="space-y-8">
          {techStackGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-semibold text-white mb-4 border-l-4 border-accent pl-3">
                <FormattedMessage id={group.category} />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {group.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-4 bg-card-bg border border-white/10 rounded-xl hover:border-accent/50 transition-all hover:scale-105"
                  >
                    <div className="text-2xl mb-2 text-gray-300">
                      {tech.icon}
                    </div>
                    <span className="text-xs text-gray-400 font-medium text-center">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutGroupedStacks;
