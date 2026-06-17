import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Download,
  Code,
  ChevronDown,
} from "lucide-react";
import { SKILLS_DATA } from "../content/SkillsData";
import { ExperienceSection } from "../components/resume/ExperienceSection";
import { EducationSection } from "../components/resume/EducationSection";
import { ResumeProjectsSection } from "../components/resume/ResumeProjectsSection";
import { ResumeCertificationsSection } from "../components/resume/ResumeCertificationsSection";

const SCROLL_DELAY_MS = 100;

const downloadProfiles = [
  { id: "general", labelId: "resume.profile.general" },
  { id: "cloud", labelId: "resume.profile.cloud" },
  { id: "backend", labelId: "resume.profile.backend" },
  { id: "frontend", labelId: "resume.profile.frontend" },
  { id: "fullstack", labelId: "resume.profile.fullstack" },
  { id: "ia_ml", labelId: "resume.profile.ia_ml" },
] as const;

export const Resume = () => {
  const { hash } = useLocation();
  const { locale } = useIntl();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamically generate skillsList from SKILLS_DATA (excluding languages category)
  const technicalSkills = SKILLS_DATA.filter(
    (s) => s.categoryKey !== "resume.skills.languages",
  );
  const categories = Array.from(
    new Set(technicalSkills.map((s) => s.categoryKey)),
  );
  const skillsList = categories.map((cat) => ({
    category: cat,
    items: technicalSkills
      .filter((s) => s.categoryKey === cat)
      .map((s) => s.name),
  }));

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-accent text-xs tracking-widest uppercase">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            <FormattedMessage id="resume.title" />
          </h1>
        </div>

        {/* Botão de Download com Dropdown de Perfis */}
        <div className="relative w-full md:w-auto md:self-center" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 border border-accent text-accent hover:bg-accent hover:text-black font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer btn-shimmer select-none"
          >
            <Download size={18} />
            <FormattedMessage
              id="resume.download"
              defaultMessage="Download CV (PDF)"
            />
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 md:left-auto md:right-0 mt-2 w-full md:w-64 bg-card-bg/95 backdrop-blur-md border border-white/10 rounded-2xl py-2 shadow-2xl z-50 animate-fade-in">
              <div className="px-4 py-1.5 text-[10px] font-mono text-accent/70 uppercase border-b border-white/5 mb-1">
                Select Tailored Profile:
              </div>
              {downloadProfiles.map((profile) => (
                <a
                  key={profile.id}
                  href={`/assets/resume_${profile.id}_${locale === "pt" ? "pt" : "en"}.pdf`}
                  download={
                    locale === "pt"
                      ? `Curriculo_Diogo_Medeiros_${profile.id}.pdf`
                      : `Resume_Diogo_Medeiros_${profile.id}.pdf`
                  }
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FormattedMessage id={profile.labelId} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Lado Esquerdo (Timeline): Experiência, Educação, Projetos */}
        <div className="lg:col-span-8 space-y-12">
          <ExperienceSection />
          <EducationSection />
          <ResumeProjectsSection locale={locale} />
        </div>

        {/* Lado Direito: Habilidades, Certificações */}
        <div className="lg:col-span-4 space-y-8">
          {/* Habilidades */}
          <div className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Code className="text-accent" size={22} />
              <FormattedMessage
                id="resume.section.skills"
                defaultMessage="Skills"
              />
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

          <ResumeCertificationsSection locale={locale} />
        </div>
      </div>
    </main>
  );
};

export default Resume;
