import { FormattedMessage } from "react-intl";
import { GraduationCap } from "lucide-react";
import { EDUCATION_DATA } from "../../content/EducationData";

export const EducationSection = () => {
  return (
    <div id="education" className="space-y-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
        <GraduationCap className="text-accent" size={24} />
        <FormattedMessage
          id="resume.section.education"
          defaultMessage="Education"
        />
      </h2>

      <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
        {EDUCATION_DATA.map((edu) => (
          <div key={edu.id} className="relative">
            <div className="absolute -left-7.5 top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
              {(edu.id === "1" ||
                edu.dateKey.toLowerCase().includes("present")) && (
                <span className="absolute w-full h-full rounded-full bg-accent/30 animate-pulse-ring pointer-events-none" />
              )}
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-accent font-semibold">
                <FormattedMessage id={edu.dateKey} />
              </span>
              <h3 className="text-xl font-bold text-white">
                <FormattedMessage id={edu.titleKey} />
              </h3>
              <p className="text-sm text-gray-400">
                <FormattedMessage id={edu.instKey} />
              </p>
              {edu.gpaKey && (
                <p className="text-xs font-medium text-gray-500 font-mono pt-1">
                  <FormattedMessage id={edu.gpaKey} />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
