import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { Download, GraduationCap, Briefcase, ExternalLink, Code, Award, FolderGit2 } from "lucide-react";
import { CERTIFICATIONS_DATA } from "../content/CertificationsData";
import { EDUCATION_DATA } from "../content/EducationData";
import { EXPERIENCE_DATA } from "../content/ExperienceData";
import { PROJECTS_DATA } from "../content/ProjectsData";
import { SKILLS_DATA } from "../content/SkillsData";

// Tempo de espera (em milissegundos) para garantir que o layout renderizou por completo
// antes de calcular as posições dos elementos e rolar a página até a âncora correspondente.
const SCROLL_DELAY_MS = 100;

export const Resume = () => {
  const { hash } = useLocation();
  const { locale } = useIntl();

  useEffect(() => {
    if (hash) {
      const targetId = hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const scrollTimeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, SCROLL_DELAY_MS);
        return () => clearTimeout(scrollTimeout);
      }
    }
  }, [hash]);

  // Dynamically generate skillsList from SKILLS_DATA (excluding languages category)
  const technicalSkills = SKILLS_DATA.filter(
    (s) => s.categoryKey !== "resume.skills.languages"
  );
  const categories = Array.from(new Set(technicalSkills.map((s) => s.categoryKey)));
  const skillsList = categories.map((cat) => ({
    category: cat,
    items: technicalSkills.filter((s) => s.categoryKey === cat).map((s) => s.name),
  }));

  const resumeExperiences = EXPERIENCE_DATA.filter((exp) => exp.showInResume);
  const resumeEducations = EDUCATION_DATA.filter((edu) => edu.showInResume);
  const resumeCertifications = CERTIFICATIONS_DATA.filter((cert) => cert.showInResume);
  const resumeProjects = PROJECTS_DATA.filter((proj) => proj.showInResume);
  const resumeLanguages = SKILLS_DATA.filter((s) => s.categoryKey === "resume.skills.languages" && s.showInResume);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative animate-fade-in-up">
      {/* Decorações flutuantes de fundo */}
      <div className="absolute top-1/3 right-1/10 w-80 h-80 bg-accent/5 blur-[150px] rounded-full -z-10 animate-drift-slow" />
      <div className="absolute bottom-1/10 left-1/10 w-72 h-72 bg-accent/5 blur-[120px] rounded-full -z-10 animate-drift-reverse" />

      {/* Cabeçalho do Currículo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-0.5 bg-accent"></div>
            <span className="font-mono text-accent text-xs tracking-widest uppercase">
              04. <FormattedMessage id="resume.page.title" defaultMessage="Resume" />
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            <FormattedMessage id="resume.title" defaultMessage="My Journey" />
          </h1>
        </div>

        {/* Botão de Download */}
        <a
          href={locale === "pt" ? "/assets/resume_pt.pdf" : "/assets/resume_en.pdf"}
          download={locale === "pt" ? "Curriculo_Diogo_Medeiros.pdf" : "Resume_Diogo_Medeiros.pdf"}
          className="self-start md:self-center flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-black font-bold py-2.5 px-5 rounded-xl transition-all hover:cursor-pointer btn-shimmer"
        >
          <Download size={18} />
          <FormattedMessage id="resume.download" defaultMessage="Download CV (PDF)" />
        </a>
      </div>

      {/* Grid Principal */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Lado Esquerdo (Timeline): Experiência, Educação, Projetos */}
        <div className="lg:col-span-8 space-y-12">
          {/* Seção Experiência */}
          {resumeExperiences.length > 0 && (
            <div id="experience" className="space-y-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <Briefcase className="text-accent" size={22} />
                <FormattedMessage id="resume.section.experience" defaultMessage="Work Experience" />
              </h2>

              <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
                {resumeExperiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
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
          )}

          {/* Seção Educação */}
          {resumeEducations.length > 0 && (
            <div id="education" className="space-y-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <GraduationCap className="text-accent" size={24} />
                <FormattedMessage id="resume.section.education" defaultMessage="Education" />
              </h2>

              <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
                {resumeEducations.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
                      {(edu.id === "1" || edu.dateKey.toLowerCase().includes("present")) && (
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
          )}

          {/* Seção Projetos */}
          {resumeProjects.length > 0 && (
            <div id="projects" className="space-y-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <FolderGit2 className="text-accent" size={22} />
                <FormattedMessage id="resume.section.projects" defaultMessage="Projects" />
              </h2>

              <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-8 relative">
                {resumeProjects.map((proj) => (
                  <div key={proj.id} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        <FormattedMessage id={proj.title} />
                      </h3>
                      <p className="text-sm text-gray-400">
                        <FormattedMessage id={proj.description} />
                      </p>
                      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-1">
                        {proj.descKeys?.map((key) => (
                          <li key={key}>
                            <FormattedMessage id={key} />
                          </li>
                        ))}
                        {(proj.projectUrl || proj.githubUrl) && (
                          <li className="list-none pt-2">
                            <a
                              href={proj.projectUrl || proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                            >
                              <FormattedMessage id="resume.project.starrCorp.link" defaultMessage="Link here" />
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
          )}
        </div>

        {/* Lado Direito: Habilidades, Certificações, Idiomas */}
        <div className="lg:col-span-4 space-y-8">
          {/* Habilidades */}
          <div className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Code className="text-accent" size={22} />
              <FormattedMessage id="resume.section.skills" defaultMessage="Skills" />
            </h2>

            {skillsList.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  <FormattedMessage id={skillGroup.category} />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-accent/40 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certificações */}
          {resumeCertifications.length > 0 && (
            <div id="certifications" className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <Award className="text-accent" size={22} />
                <FormattedMessage id="resume.section.certifications" defaultMessage="Certifications" />
              </h2>

              <div className="space-y-4">
                {resumeCertifications.map((cert) => (
                  <div key={cert.id} className="flex gap-3">
                    <div className="shrink-0 p-1.5 h-fit rounded bg-accent/10 text-accent">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent inline-flex items-center gap-1 transition-colors"
                          >
                            <FormattedMessage id={cert.titleKey} />
                            <ExternalLink size={12} className="shrink-0 opacity-70" />
                          </a>
                        ) : (
                          <FormattedMessage id={cert.titleKey} />
                        )}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        <FormattedMessage id={cert.orgKey} /> &bull; {cert.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {resumeLanguages.length > 0 && (
            <div id="languages" className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
                <Award className="text-accent" size={22} />
                <FormattedMessage id="resume.skills.languages" defaultMessage="Languages" />
              </h2>

              <div className="space-y-4">
                {resumeLanguages.map((langSkill) => (
                  <div key={langSkill.id} className="flex gap-3">
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
                            <FormattedMessage id="resume.link.here" defaultMessage="here" />
                            <ExternalLink size={12} className="shrink-0 opacity-70" />
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Resume;
