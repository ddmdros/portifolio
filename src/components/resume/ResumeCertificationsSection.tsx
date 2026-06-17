import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Award, ExternalLink, Pin, Star } from "lucide-react";
import { CERTIFICATIONS_DATA } from "../../content/CertificationsData";
import { SKILLS_DATA } from "../../content/SkillsData";

interface ResumeCertificationsSectionProps {
  locale: string;
}

export const ResumeCertificationsSection = ({
  locale,
}: ResumeCertificationsSectionProps) => {
  const [certFilter, setCertFilter] = useState<string>("featured");

  const displayedCertifications =
    certFilter === "all"
      ? CERTIFICATIONS_DATA
      : certFilter === "featured"
        ? CERTIFICATIONS_DATA.filter((cert) => cert.showOnHome)
        : CERTIFICATIONS_DATA.filter((cert) => cert.category === certFilter);

  const sortedCertifications = [...displayedCertifications].sort((a, b) => {
    const aHighlight = a.sectionHighlight ? 1 : 0;
    const bHighlight = b.sectionHighlight ? 1 : 0;
    return bHighlight - aHighlight;
  });

  const getCertUrl = (cert: typeof CERTIFICATIONS_DATA[0]) => {
    if (locale === "pt" && cert.credentialUrlPt) return cert.credentialUrlPt;
    return cert.credentialUrl;
  };

  const allLanguages = SKILLS_DATA.filter(
    (s) => s.categoryKey === "resume.skills.languages",
  );

  return (
    <div
      id="certifications"
      className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-2">
        <Award className="text-accent" size={22} />
        <FormattedMessage
          id="resume.section.certifications"
          defaultMessage="Certifications"
        />
      </h2>

      {/* Certifications Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-3">
        {(
          [
            { id: "featured", labelId: "resume.cert.filter.featured" },
            { id: "ia_ml", labelId: "resume.cert.filter.ia_ml" },
            { id: "back", labelId: "resume.cert.filter.back" },
            { id: "frontend", labelId: "resume.cert.filter.frontend" },
            { id: "cloud", labelId: "resume.cert.filter.cloud" },
            { id: "game_dev", labelId: "resume.cert.filter.game_dev" },
            { id: "fundamentos", labelId: "resume.cert.filter.fundamentos" },
            { id: "idiomas", labelId: "resume.cert.filter.idiomas" },
            { id: "all", labelId: "resume.cert.filter.all" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCertFilter(tab.id)}
            className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-all cursor-pointer ${
              certFilter === tab.id
                ? "bg-accent border-accent text-black font-bold"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <FormattedMessage id={tab.labelId} />
          </button>
        ))}
      </div>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {certFilter === "idiomas" ? (
          allLanguages.map((langSkill) => (
            <div key={langSkill.id} className="flex gap-3 animate-fade-in">
              <div className="shrink-0 p-1.5 h-fit rounded bg-accent/10 text-accent">
                <Award size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  <FormattedMessage id={langSkill.resumeDetailsKey} />
                </h4>
                {langSkill.credentialUrl && langSkill.certTextKey && (
                  <p className="text-xs text-gray-500 font-medium">
                    <FormattedMessage id={langSkill.certTextKey} />{" "}
                    <a
                      href={langSkill.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent inline-flex items-center gap-1 transition-colors"
                    >
                      <FormattedMessage
                        id="resume.link.here"
                        defaultMessage="here"
                      />
                      <ExternalLink
                        size={12}
                        className="shrink-0 opacity-70"
                      />
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          sortedCertifications.map((cert) => (
            <div
              key={cert.id}
              className={`flex gap-3 animate-fade-in p-2.5 rounded-xl transition-all ${
                cert.sectionHighlight
                  ? "bg-amber-500/5 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.04)]"
                  : "border border-transparent"
              }`}
            >
              <div
                className={`shrink-0 p-1.5 h-fit rounded ${
                  cert.sectionHighlight ? "bg-amber-500/20 text-amber-400" : "bg-accent/10 text-accent"
                }`}
              >
                <Award size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white">
                    {getCertUrl(cert) ? (
                      <a
                        href={getCertUrl(cert)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 transition-colors ${
                          cert.sectionHighlight ? "hover:text-amber-400 text-amber-100" : "hover:text-accent"
                        }`}
                      >
                        <FormattedMessage id={cert.titleKey} />
                        <ExternalLink
                          size={12}
                          className="shrink-0 opacity-70"
                        />
                      </a>
                    ) : (
                      <FormattedMessage id={cert.titleKey} />
                    )}
                  </h4>
                  <div className="flex gap-1.5 mt-0.5 shrink-0">
                    {cert.sectionHighlight && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <Pin size={10} className="shrink-0" />
                        <FormattedMessage id="resume.cert.badge.pinned" defaultMessage="Pinned" />
                      </span>
                    )}
                    {cert.showOnHome && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent/10 border border-accent/30 text-accent">
                        <Star size={10} className="shrink-0" />
                        <FormattedMessage id="resume.cert.badge.featured" defaultMessage="Featured" />
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  <FormattedMessage id={cert.orgKey} /> &bull; {cert.year}
                  {cert.hours && ` \u2022 ${cert.hours}h`}
                </p>
              </div>
            </div>
          ))
        )}
        {((certFilter === "idiomas" && allLanguages.length === 0) ||
          (certFilter !== "idiomas" && displayedCertifications.length === 0)) && (
          <p className="text-xs text-gray-500 text-center py-4">
            No certifications found.
          </p>
        )}
      </div>
    </div>
  );
};
