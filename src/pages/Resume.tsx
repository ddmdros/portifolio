import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Download, GraduationCap, Briefcase, ExternalLink, Code, Award } from "lucide-react";
import { CERTIFICATIONS_DATA } from "../content/CertificationsData";

// Tempo de espera (em milissegundos) para garantir que o layout renderizou por completo
// antes de calcular as posições dos elementos e rolar a página até a âncora correspondente.
const SCROLL_DELAY_MS = 100;

export const Resume = () => {
  const { hash } = useLocation();

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
  const skillsList = [
    {
      category: "about.stacks.programming.languages",
      items: ["Python", "JavaScript", "Java", "C#"],
    },
    {
      category: "about.stacks.web.game.dev",
      items: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
        "Node.js",
        "HTML5",
        "CSS3",
        "Unity",
      ],
    },
    {
      category: "about.stacks.data.devops",
      items: ["PostgreSQL", "Git & CI/CD", "Google Cloud", "Supabase"],
    },
  ];

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
        <button className="self-start md:self-center flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-black font-bold py-2.5 px-5 rounded-xl transition-all hover:cursor-pointer btn-shimmer">
          <Download size={18} />
          <FormattedMessage id="resume.download" defaultMessage="Download CV (PDF)" />
        </button>
      </div>

      {/* Grid Principal */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Lado Esquerdo (Timeline): Experiência e Educação */}
        <div className="lg:col-span-8 space-y-12">
          {/* Seção Experiência */}
          <div id="experience" className="space-y-8 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Briefcase className="text-accent" size={22} />
              <FormattedMessage id="resume.section.experience" defaultMessage="Work Experience" />
            </h2>

            <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
              {/* Keywords Studios */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
                  <span className="absolute w-full h-full rounded-full bg-accent/30 animate-pulse-ring pointer-events-none" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent font-semibold">
                    <FormattedMessage id="resume.exp.keywords.date" defaultMessage="2017 - 2026" />
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    <FormattedMessage id="resume.exp.keywords.title" defaultMessage="Brazilian Portuguese Linguist" />
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    <FormattedMessage id="resume.exp.keywords.company" defaultMessage="Keywords Studios" />
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-1">
                    <li>
                      <FormattedMessage id="resume.exp.keywords.desc1" />
                    </li>
                    <li>
                      <FormattedMessage id="resume.exp.keywords.desc2" />
                    </li>
                    <li>
                      <FormattedMessage id="resume.exp.keywords.desc3" />
                    </li>
                  </ul>
                </div>
              </div>

              {/* Independent */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full" />
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent font-semibold">
                    <FormattedMessage id="resume.exp.independent.date" defaultMessage="2020 - present" />
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    <FormattedMessage id="resume.exp.independent.title" defaultMessage="Brazilian Portuguese Linguist" />
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    <FormattedMessage id="resume.exp.independent.company" defaultMessage="Independent" />
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-1">
                    <li>
                      <FormattedMessage id="resume.exp.independent.desc1" />
                    </li>
                    <li className="list-none pt-2">
                      <a
                        href="https://diogomedeiros.carrd.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                      >
                        <FormattedMessage id="resume.link.portfolio" defaultMessage="Translation Portfolio" />
                        <ExternalLink size={12} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Educação */}
          <div id="education" className="space-y-8 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <GraduationCap className="text-accent" size={24} />
              <FormattedMessage id="resume.section.education" defaultMessage="Education" />
            </h2>

            <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
              {/* Software Engineering */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
                  <span className="absolute w-full h-full rounded-full bg-accent/30 animate-pulse-ring pointer-events-none" />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-xs text-accent font-semibold">
                    <FormattedMessage id="resume.edu.se.date" defaultMessage="2025 - 2029" />
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    <FormattedMessage id="resume.edu.se.title" defaultMessage="B.S. in Software Engineering" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    <FormattedMessage id="resume.edu.se.inst" defaultMessage="INFNET Institute" />
                  </p>
                </div>
              </div>

              {/* Java Back-End Specialization */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full" />
                <div className="space-y-1">
                  <span className="font-mono text-xs text-accent font-semibold">
                    <FormattedMessage id="resume.edu.java.date" defaultMessage="2025 - 2026" />
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    <FormattedMessage id="resume.edu.java.title" defaultMessage="Java Back-End Specialization" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    <FormattedMessage id="resume.edu.java.inst" defaultMessage="EBAC" />
                  </p>
                </div>
              </div>

              {/* Bachelor of Journalism */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full" />
                <div className="space-y-1">
                  <span className="font-mono text-xs text-accent font-semibold">
                    <FormattedMessage id="resume.edu.journalism.date" defaultMessage="2017 - 2026" />
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    <FormattedMessage id="resume.edu.journalism.title" defaultMessage="Bachelor of Journalism" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    <FormattedMessage id="resume.edu.journalism.inst" defaultMessage="UFSC" />
                  </p>
                  <p className="text-xs font-medium text-gray-500 font-mono pt-1">
                    <FormattedMessage id="resume.edu.journalism.gpa" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Habilidades & Certificações */}
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
          <div id="certifications" className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Award className="text-accent" size={22} />
              <FormattedMessage id="resume.section.certifications" defaultMessage="Certifications" />
            </h2>

            <div className="space-y-4">
              {CERTIFICATIONS_DATA.map((cert) => (
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
        </div>
      </div>
    </main>
  );
};

export default Resume;
