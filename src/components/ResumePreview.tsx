import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import type { ReactNode } from "react";
import { SectionDiv } from "./SectionDiv";
import { GraduationCap, Briefcase, ArrowRight, Award, ExternalLink } from "lucide-react";
import { VISIBLE_CERTIFICATIONS } from "../content/visibleCertifications";
import { EDUCATION_DATA } from "../content/EducationData";
import { EXPERIENCE_DATA } from "../content/ExperienceData";

// One card per résumé area. The card title links to that part of the full résumé.
const PreviewCard = ({ icon, titleId, to, children }: { icon: ReactNode; titleId: string; to: string; children: ReactNode }) => (
  <div className="bg-card-bg border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-colors h-full">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2.5 rounded-lg bg-accent/10 text-accent">{icon}</div>
      <h3 className="font-bold text-white text-lg">
        <Link to={to} className="hover:text-accent">
          <FormattedMessage id={titleId} />
        </Link>
      </h3>
    </div>
    <ul className="space-y-4">{children}</ul>
  </div>
);

const Entry = ({ title, place, date }: { title: ReactNode; place: ReactNode; date: ReactNode }) => (
  <li className="space-y-0.5">
    <p className="text-sm text-gray-300 font-semibold leading-snug">{title}</p>
    <p className="text-xs text-gray-400 leading-relaxed">{place}</p>
    <p className="text-xs font-mono text-accent">{date}</p>
  </li>
);

const ResumePreview = () => {
  const { locale } = useIntl();
  const experience = EXPERIENCE_DATA.filter((e) => e.showInResume.includes("general"));
  const degree = EDUCATION_DATA[0];
  const getCertUrl = (cert: typeof VISIBLE_CERTIFICATIONS[0]) => {
    if (locale === "pt" && cert.credentialUrlPt) return cert.credentialUrlPt;
    return cert.credentialUrl;
  };
  const homeCerts = VISIBLE_CERTIFICATIONS.filter((c) => c.showOnHome)
    .sort((a, b) => (b.sectionHighlight ? 1 : 0) - (a.sectionHighlight ? 1 : 0))
    .slice(0, 3);

  return (
    <section className="py-20 border-t border-border">
      <SectionDiv sectionTitleId="section.title.3" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-h tracking-tight max-w-xl">
          <FormattedMessage id="home.resume.preview.title" />
        </h2>
        <Link
          to={`/${locale}/resume`}
          className="self-start md:self-center inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-accent-text font-bold py-2.5 px-5 rounded-xl transition-colors whitespace-nowrap"
        >
          <FormattedMessage id="home.resume.preview.button" />
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <PreviewCard icon={<Briefcase size={20} aria-hidden="true" />} titleId="resume.section.experience" to={`/${locale}/resume#experience`}>
          {experience.map((exp) => (
            <Entry
              key={exp.id}
              title={<FormattedMessage id={exp.titleKey} />}
              place={<FormattedMessage id={exp.companyKey} />}
              date={<FormattedMessage id={exp.dateKey} />}
            />
          ))}
        </PreviewCard>

        <PreviewCard icon={<GraduationCap size={20} aria-hidden="true" />} titleId="resume.section.education" to={`/${locale}/resume#education`}>
          <Entry
            title={<FormattedMessage id={degree.titleKey} />}
            place={<FormattedMessage id={degree.instKey} />}
            date={<FormattedMessage id="resume.edu.se.expected" />}
          />
          <Entry
            title={<FormattedMessage id="resume.edu.journalism.title" />}
            place={
              <>
                <FormattedMessage id="resume.edu.journalism.inst" /> · <FormattedMessage id="resume.edu.journalism.gpa" />
              </>
            }
            date={<FormattedMessage id="resume.edu.journalism.date" />}
          />
        </PreviewCard>

        <PreviewCard icon={<Award size={20} aria-hidden="true" />} titleId="resume.section.certifications" to={`/${locale}/resume#certifications`}>
          {homeCerts.map((cert) => {
            const url = getCertUrl(cert);
            const title = <FormattedMessage id={cert.titleKey} />;
            return (
              <Entry
                key={cert.id}
                title={
                  url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                      {title}
                      <ExternalLink size={11} className="shrink-0 opacity-70" aria-hidden="true" />
                    </a>
                  ) : (
                    title
                  )
                }
                place={<FormattedMessage id={cert.orgKey} />}
                date={<>{cert.year}{cert.hours ? ` · ${cert.hours}h` : ""}</>}
              />
            );
          })}
          <li>
            <Link to={`/${locale}/resume#certifications`} className="text-xs font-mono text-accent hover:underline">
              <FormattedMessage id="home.certs.all" /> ({VISIBLE_CERTIFICATIONS.length})
            </Link>
          </li>
        </PreviewCard>
      </div>
    </section>
  );
};

export default ResumePreview;
