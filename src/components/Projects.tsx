import { PROJECTS_DATA } from "../content/ProjectsData";
import { type ProjectType } from "../types/projectType";
import { SectionDiv } from "./SectionDiv";
import { ProjectEvidence } from "./ProjectEvidence";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";

// A featured project is one row: a panel with real output on one side, one line about it on the other.
// The full story lives in the repository README, so the row links there instead of repeating it.
const FeaturedProject = ({ project }: { project: ProjectType }) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: project.title });

  return (
    <article
      id={project.docId ? `project-${project.docId}` : undefined}
      className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6 md:gap-10 items-center py-10 border-t border-border scroll-mt-24"
    >
      <ProjectEvidence projectId={project.id} />

      <div className="flex flex-col gap-3 min-w-0">
        <h3 className="text-2xl font-bold tracking-tight text-text-h">
          {title}
          {project.isWip && (
            <span className="ml-3 align-middle font-mono text-xs font-medium text-text-dim">
              <FormattedMessage id="project.badge.wip" />
            </span>
          )}
        </h3>
        <p className="text-text-gray leading-relaxed">
          <FormattedMessage id={project.summaryKey ?? project.description} />
        </p>
        {project.resultKey && (
          <p className="font-mono text-xs text-text-gray leading-relaxed">
            <FormattedMessage id={project.resultKey} />
          </p>
        )}
        <p className="font-mono text-xs text-text-dim">{project.tags.join(" · ")}</p>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            <FaGithub size={16} aria-hidden="true" />
            <FormattedMessage id="project.github.readme" />
            <span className="sr-only">: {title}</span>
          </a>
        )}
      </div>
    </article>
  );
};

const Projects = () => {
  const { locale } = useIntl();
  const featuredProjects = PROJECTS_DATA.filter((project) => project.isFeatured);

  return (
    <section className="py-20">
      <SectionDiv sectionTitleId="section.title.2" />

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-h mb-6">
        <FormattedMessage id="projects.title" />
      </h2>

      <div className="border-b border-border">
        {featuredProjects.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </div>

      <p className="mt-6 font-mono text-sm text-text-dim">
        <FormattedMessage id="projects.next.java" />
      </p>

      <Link
        to={`/${locale}/projects`}
        className="mt-8 inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-accent-text font-bold py-2.5 px-5 rounded-xl transition-colors"
      >
        <FormattedMessage id="projects.view.more.cta" />
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
};

export default Projects;
