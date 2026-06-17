import { useState } from "react";
import ProjectItem from "./ProjectItem";
import { PROJECTS_DATA } from "../content/ProjectsData";
import SectionDiv from "./SectionDiv";
import { FormattedMessage } from "react-intl";
import { type ProjectCategory } from "../types/projectType";
import ProjectFilter from "./ProjectsFilter";

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = (
    filter === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === filter)
  ).sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });

  return (
    <>
      <SectionDiv sectionNumber="02" sectionTitleId="section.title.2" />

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-h mb-10">
        <FormattedMessage id={"projects.title"} />
      </h2>

      <div className="bg-card-bg border border-white/10 rounded-2xl p-6 md:p-8">
        <ProjectFilter activeCategory={filter} onFilterChange={setFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
