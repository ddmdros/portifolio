import { useState } from "react";
import { KeywordTag } from "./KeywordTag";
import { type ProjectCategory } from "../types/projectType";
import { FaGithub, FaBook } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface ProjectItemProps {
  category: ProjectCategory | ProjectCategory[];
  title: string;
  resultKey?: string;
  summaryKey?: string;
  description: string;
  tags: string[];
  imageUrl: string;
  docsUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
  isWip?: boolean;
}

const secondaryLink =
  "relative z-20 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors";

const ProjectItem = ({
  category,
  title,
  resultKey,
  summaryKey,
  description,
  tags,
  imageUrl,
  docsUrl,
  githubUrl,
  projectUrl,
  isWip = false,
}: ProjectItemProps) => {
  const intl = useIntl();
  const [imageLoaded, setImageLoaded] = useState(false);
  const titleText = intl.formatMessage({ id: title });

  return (
    // The title link is stretched over the whole card (after:inset-0), so the card is
    // clickable with a single focusable element; the other links sit above it (z-20).
    <article className="group relative bg-card-bg border border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 hover:border-accent/40 focus-within:border-accent/60 transition-all duration-300 flex flex-col h-full motion-reduce:transform-none">
      <div className="relative overflow-hidden bg-white/5 w-full aspect-video flex items-center justify-center">
        {!imageLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" />}

        <img
          src={imageUrl}
          className={`absolute inset-0 w-full h-full object-cover blur-xl scale-110 select-none pointer-events-none transition-opacity duration-700 ${
            imageLoaded ? "opacity-35" : "opacity-0"
          }`}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <img
          src={imageUrl}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          className={`relative z-10 h-full max-w-full object-contain transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          alt={titleText}
        />

        {isWip && (
          <span className="absolute top-3 right-3 z-20 bg-amber-500/25 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold rounded-full">
            <FormattedMessage id="project.badge.wip" />
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {(Array.isArray(category) ? category : [category]).map((cat) => (
            <KeywordTag key={cat} label={cat} />
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">
          {docsUrl ? (
            <Link
              to={`/${intl.locale}${docsUrl}`}
              className="after:absolute after:inset-0 after:z-10 focus:outline-none group-hover:text-accent transition-colors"
            >
              {titleText}
            </Link>
          ) : (
            titleText
          )}
        </h3>

        {resultKey && (
          <p className="font-mono text-xs text-accent mb-3 leading-relaxed">
            <FormattedMessage id={resultKey} />
          </p>
        )}

        <p className="text-gray-400 text-sm mb-4 leading-relaxed grow">
          <FormattedMessage id={summaryKey ?? description} />
        </p>

        <div className="pt-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <KeywordTag key={tag} label={tag} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
            {docsUrl && (
              <span className="flex items-center gap-2 text-sm text-accent">
                <FaBook size={16} aria-hidden="true" />
                <FormattedMessage id="project.card.open" />
              </span>
            )}

            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
                <FaGithub size={16} aria-hidden="true" />
                <FormattedMessage id="project.github" />
              </a>
            )}

            {projectUrl && (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
                <ExternalLink size={16} aria-hidden="true" />
                <FormattedMessage id="projects.external.link" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
