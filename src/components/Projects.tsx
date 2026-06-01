import ProjectItem from "./ProjectItem";
import { PROJECTS_DATA } from "../constants/ProjectsData";
import SectionDiv from "./SectionDiv";
import { FormattedMessage } from "react-intl";

const Projects = () => {
  return (
    <>
      <SectionDiv sectionNumber="02" sectionTitleId="section.title.2" />

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-h mb-10">
        <FormattedMessage id={"projects.title"} />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mb-5 gap-6">
        {PROJECTS_DATA.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
