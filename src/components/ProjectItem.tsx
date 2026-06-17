import { useState } from "react";
import KeywordTag from "./KeywordTag";
import { type ProjectCategory } from "../types/projectType";
import { FaGithub, FaBook } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface ProjectItemProps {
  category: ProjectCategory | ProjectCategory[];
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  docsUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
  isFeatured?: boolean;
  isWip?: boolean;
}

const ProjectItem = ({
  category,
  title,
  description,
  tags,
  imageUrl,
  docsUrl,
  githubUrl,
  projectUrl,
  isFeatured = false,
  isWip = false,
}: ProjectItemProps) => {
  const intl = useIntl();

  const [imageLoaded, setImageLoaded] = useState(false);

  const imageElement = (
    <div className="relative overflow-hidden bg-white/5 w-full h-full aspect-video flex items-center justify-center">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      
      {/* Blurred background copy for ambient glow */}
      <img
        src={imageUrl}
        className={`absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 select-none pointer-events-none transition-all duration-700 ${
          imageLoaded ? "opacity-35" : "opacity-0"
        }`}
        alt=""
      />

      {/* Sharp, centered foreground image */}
      <img
        src={imageUrl}
        onLoad={() => setImageLoaded(true)}
        className={`relative z-10 h-full max-w-full object-contain group-hover:scale-102 transition-all duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt={title}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />
      
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
        {isFeatured && (
          <span className="bg-accent/25 backdrop-blur-md text-accent border border-accent/30 px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg shadow-accent/5 animate-glow-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <FormattedMessage id="project.badge.featured" />
          </span>
        )}
        {isWip && (
          <span className="bg-amber-500/25 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            <FormattedMessage id="project.badge.wip" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className={`group bg-card-bg border rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col h-full ${
      isFeatured 
        ? "border-accent/20 hover:border-accent/40 hover:shadow-emerald" 
        : "border-white/10 hover:border-white/20"
    }`}>
      {docsUrl ? (
        <Link 
          to={`/${intl.locale}${docsUrl}`} 
          className="cursor-pointer block w-full"
        >
          {imageElement}
        </Link>
      ) : (
        <div className="w-full">
          {imageElement}
        </div>
      )}

      <div className="p-5 flex flex-col grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {Array.isArray(category) ? (
            category.map((cat) => <KeywordTag key={cat} label={cat} />)
          ) : (
            <KeywordTag label={category} />
          )}
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
            {docsUrl && (
              <Link
                to={`/${intl.locale}${docsUrl}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                title={intl.formatMessage({ id: "project.docs" })}
              >
                <FaBook size={16} />
                <span>
                  <FormattedMessage id="project.docs" />
                </span>
              </Link>
            )}

            {githubUrl && (
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
            )}

            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                title={intl.formatMessage({ id: "projects.external.link" })}
              >
                <ExternalLink size={16} />
                <span>
                  <FormattedMessage id="projects.external.link" />
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
