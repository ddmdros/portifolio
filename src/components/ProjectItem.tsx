import KeywordTag from "./KeywordTag";
import { FaGithub, FaBook } from "react-icons/fa6";
import { FormattedMessage, useIntl } from "react-intl";

interface ProjectItemProps {
  category: string;
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

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <KeywordTag key={tag} label={tag} />
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={docsUrl}
              title={intl.formatMessage({ id: "project.docs" })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaBook size={20} />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={intl.formatMessage({ id: "project.github" })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
