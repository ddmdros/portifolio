import KeywordTag from "./KeywordTag";
import { type ProjectCategory } from "../types/projectType";
import { FaGithub, FaBook } from "react-icons/fa6";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface ProjectItemProps {
  category: ProjectCategory;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  docsUrl: string;
  githubUrl: string;
}

const ProjectItem = ({
  category,
  title,
  description,
  tags,
  imageUrl,
  docsUrl,
  githubUrl,
}: ProjectItemProps) => {
  const intl = useIntl();

  return (
    <div className="group bg-card-bg border border-white/10 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="mb-3">
          <KeywordTag label={category} />
        </div>

        <h2 className="text-xl font-bold mb-2 text-white">
          <FormattedMessage id={title} />
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed grow">
          <FormattedMessage id={description} />
        </p>

        <div className="pt-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <KeywordTag key={tag} label={tag} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
            <Link
              to={docsUrl}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              title={intl.formatMessage({ id: "project.docs" })}
            >
              <FaBook size={16} />
              <span>
                <FormattedMessage id="project.docs" />
              </span>
            </Link>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={intl.formatMessage({ id: "project.github" })}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={16} />
              <span>
                <FormattedMessage id="project.github" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
