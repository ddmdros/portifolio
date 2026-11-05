import { FormattedMessage, useIntl } from "react-intl";
import { Download } from "lucide-react";
import MailButton from "./MailButton";
import { IconButton } from "./IconButton";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { PROFILE_CONFIG } from "../config/profile";

const Portfolio = () => {
  const { locale } = useIntl();
  const cvLang = locale === "pt" ? "pt" : "en";

  return (
    <section className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 bg-card-bg/50 border border-white/10 p-6 md:p-10 rounded-3xl overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" aria-hidden="true" />

      <img
        src={`${PROFILE_CONFIG.githubUrl}.png`}
        alt={PROFILE_CONFIG.name}
        width={160}
        height={160}
        className="shrink-0 rounded-full w-24 h-24 md:w-40 md:h-40 object-cover border-4 border-card-bg"
      />

      <div className="flex-1 space-y-4">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-accent-border text-xs font-medium text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          <FormattedMessage id="hero.availability" />
        </p>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-text-h tracking-tight">
            {PROFILE_CONFIG.name}
          </h1>
          <p className="text-text-h font-medium text-lg md:text-xl">
            <FormattedMessage id="portifolio.job-title" />
          </p>
        </div>

        <p className="text-gray-400 leading-relaxed max-w-2xl">
          <FormattedMessage id="portifolio.description" />
        </p>

        <p className="font-mono text-sm text-accent">
          <FormattedMessage id="hero.proof" />
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={PROFILE_CONFIG.handmadeCv[cvLang]}
            download={cvLang === "pt" ? "Curriculo_Diogo_Medeiros.pdf" : "Resume_Diogo_Medeiros.pdf"}
            className="inline-flex items-center gap-2 bg-accent border border-accent text-accent-text hover:bg-accent-hover hover:text-accent-text font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <Download size={18} aria-hidden="true" />
            <FormattedMessage id="resume.download" />
          </a>
          <MailButton />
          <IconButton icon={<FaGithub size={20} />} url={PROFILE_CONFIG.githubUrl} label="GitHub" />
          <IconButton icon={<FaLinkedinIn size={20} />} url={PROFILE_CONFIG.linkedinUrl} label="LinkedIn" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
