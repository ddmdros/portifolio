import { FormattedMessage } from "react-intl";
import { Award, ExternalLink } from "lucide-react";
import { VISIBLE_CERTIFICATIONS } from "../../content/visibleCertifications";

interface ResumeCertificationsSectionProps {
  locale: string;
}

// A short list of the certifications that matter for AI and back-end roles.
// Entries marked showInPortfolio: false stay in the data (Dev Mode, syllabus links) but are not listed.
export const ResumeCertificationsSection = ({
  locale,
}: ResumeCertificationsSectionProps) => {
  const sortedCertifications = [...VISIBLE_CERTIFICATIONS].sort(
    (a, b) => (b.sectionHighlight ? 1 : 0) - (a.sectionHighlight ? 1 : 0),
  );

  const getCertUrl = (cert: (typeof VISIBLE_CERTIFICATIONS)[0]) => {
    if (locale === "pt" && cert.credentialUrlPt) return cert.credentialUrlPt;
    return cert.credentialUrl;
  };

  return (
    <div
      id="certifications"
      className="bg-card-bg/50 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-2">
        <Award className="text-accent" size={22} aria-hidden="true" />
        <FormattedMessage id="resume.section.certifications" defaultMessage="Certifications" />
      </h2>

      <ul className="space-y-4">
        {sortedCertifications.map((cert) => {
          const url = getCertUrl(cert);
          return (
            <li key={cert.id} className="flex gap-3">
              <div className="shrink-0 p-1.5 h-fit rounded bg-accent/10 text-accent">
                <Award size={16} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                    >
                      <FormattedMessage id={cert.titleKey} />
                      <ExternalLink size={12} className="shrink-0 opacity-70" aria-hidden="true" />
                    </a>
                  ) : (
                    <FormattedMessage id={cert.titleKey} />
                  )}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  <FormattedMessage id={cert.orgKey} /> &bull; {cert.year}
                  {cert.hours && ` • ${cert.hours}h`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
