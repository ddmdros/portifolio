import { FormattedMessage } from "react-intl";
import { Briefcase, ExternalLink } from "lucide-react";
import { EXPERIENCE_DATA } from "../../content/ExperienceData";

export const ExperienceSection = () => {
  return (
    <div id="experience" className="space-y-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
        <Briefcase className="text-accent" size={22} />
        <FormattedMessage
          id="resume.section.experience"
          defaultMessage="Work Experience"
        />
      </h2>

      <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
        {EXPERIENCE_DATA.map((exp) => (
          <div key={exp.id} className="relative">
            <div className="absolute -left-7.75 top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
              {exp.dateKey.toLowerCase().includes("present") && (
                <span className="absolute w-full h-full rounded-full bg-accent/30 animate-pulse-ring pointer-events-none" />
              )}
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-accent font-semibold">
                <FormattedMessage id={exp.dateKey} />
              </span>
              <h3 className="text-xl font-bold text-white">
                <FormattedMessage id={exp.titleKey} />
              </h3>
              <p className="text-sm text-gray-400 font-medium">
                <FormattedMessage id={exp.companyKey} />
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-1">
                {exp.descKeys.map((key) => (
                  <li key={key}>
                    <FormattedMessage id={key} />
                  </li>
                ))}
                {exp.portfolioUrlKey && (
                  <li className="list-none pt-2">
                    <a
                      href="https://diogomedeiros.carrd.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                    >
                      <FormattedMessage id={exp.portfolioUrlKey} />
                      <ExternalLink size={12} />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
