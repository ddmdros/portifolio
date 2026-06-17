import ProjectItem from "./ProjectItem";
import { PROJECTS_DATA } from "../content/ProjectsData";
import SectionDiv from "./SectionDiv";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

const Projects = () => {
  const { locale } = useIntl();
  const featuredProjects = PROJECTS_DATA.filter((project) => project.isFeatured);

  return (
    <>
      <SectionDiv sectionNumber="02" sectionTitleId="section.title.2" />

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-h mb-10">
        <FormattedMessage id={"projects.title"} />
      </h2>

      <div className="bg-card-bg border border-white/10 rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to={`/${locale}/projects`}
            className="inline-flex items-center gap-2 bg-accent-subtle border border-accent text-accent hover:bg-accent hover:text-black font-bold py-3 px-6 rounded-xl transition-all cursor-pointer btn-shimmer select-none"
          >
            <FormattedMessage id="projects.view.more.cta" defaultMessage="View Other Projects →" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Projects;
