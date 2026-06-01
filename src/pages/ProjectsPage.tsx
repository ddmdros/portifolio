import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { PROJECTS_DATA } from "../content/ProjectsData";
import ProjectItem from "../components/ProjectItem";
import ProjectFilter from "../components/ProjectsFilter";
import { type ProjectCategory } from "../types/projectType";

export const ProjectsPage = () => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filteredProjects =
    filter === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        <FormattedMessage
          id="projects.page.title"
          defaultMessage="My Projects"
        />
      </h1>

      <div className="bg-card-bg border border-white/10 rounded-2xl p-6 md:p-8">
        <ProjectFilter activeCategory={filter} onFilterChange={setFilter} />

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectItem key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <FormattedMessage
              id="projects.no.projects"
              defaultMessage="No projects found in this category."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
