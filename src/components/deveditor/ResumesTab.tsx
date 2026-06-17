import { useState } from "react";
import { type CertificationType } from "../../types/certificationType";
import { type ProjectType } from "../../types/projectType";
import { type EducationType } from "../../content/EducationData";
import { type ExperienceType } from "../../content/ExperienceData";
import { type SkillType } from "../../content/SkillsData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { FileText } from "lucide-react";

interface ResumesTabProps {
  certs: CertificationType[];
  setCerts: React.Dispatch<React.SetStateAction<CertificationType[]>>;
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  edu: EducationType[];
  setEdu: React.Dispatch<React.SetStateAction<EducationType[]>>;
  exp: ExperienceType[];
  setExp: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  getTrans: (key: string, lang: "en" | "pt") => string;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  PROFILES: readonly { readonly id: string; readonly label: string }[];
  toggleProfile: (arr: string[] | undefined, profileId: string) => string[];
}

export const ResumesTab = ({
  certs,
  setCerts,
  projects,
  setProjects,
  edu,
  setEdu,
  exp,
  setExp,
  skills,
  setSkills,
  getTrans,
  updateTrans,
  PROFILES,
  toggleProfile,
}: ResumesTabProps) => {
  const [activeProfile, setActiveProfile] = useState<string>("general");
  const [certFilter, setCertFilter] = useState<string>("all");

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-white/5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="text-accent" size={20} />
          Curriculums & CV Profiles Manager
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Select a profile below to customize which projects, certifications, experiences, educations, and skills are included in it.
        </p>
      </div>

      {/* Profile Selection Pills */}
      <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
        {PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => setActiveProfile(profile.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer select-none ${
              activeProfile === profile.id
                ? "bg-accent/10 border-accent/30 text-accent font-bold shadow-[0_0_12px_rgba(var(--accent-rgb),0.1)]"
                : "bg-transparent border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {profile.label}
          </button>
        ))}
      </div>

      {/* Profile Metadata Editor (Header, Goal, Description) */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-accent">Profile Custom Texts</h3>
        <p className="text-xs text-gray-400">
          Customize the job title, professional goal, and description for this CV profile (used in PDF rendering).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Header/Title Input */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300">Job Title / Header</h4>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">English</label>
              <input
                type="text"
                value={getTrans(`resume.profile.${activeProfile}.header`, "en")}
                onChange={(e) => updateTrans(`resume.profile.${activeProfile}.header`, "en", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="e.g. Backend Engineer"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
              <input
                type="text"
                value={getTrans(`resume.profile.${activeProfile}.header`, "pt")}
                onChange={(e) => updateTrans(`resume.profile.${activeProfile}.header`, "pt", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="Ex: Engenheiro Backend"
              />
            </div>
          </div>

          {/* Goal Input */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300">Professional Goal / Objetivo</h4>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">English</label>
              <textarea
                value={getTrans(`resume.profile.${activeProfile}.goal`, "en")}
                onChange={(e) => updateTrans(`resume.profile.${activeProfile}.goal`, "en", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none"
                placeholder="Enter professional goal..."
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
              <textarea
                value={getTrans(`resume.profile.${activeProfile}.goal`, "pt")}
                onChange={(e) => updateTrans(`resume.profile.${activeProfile}.goal`, "pt", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none"
                placeholder="Escreva o objetivo profissional..."
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300">Profile Description / Resumo</h4>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">English</label>
              <textarea
                value={getTrans(`resume.profile.${activeProfile}.description`, "en")}
                onChange={(e) => updateTrans(`resume.profile.${activeProfile}.description`, "en", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none"
                placeholder={getTrans("portifolio.description", "en") || "Enter profile summary..."}
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
              <textarea
                value={getTrans(`resume.profile.${activeProfile}.description`, "pt")}
                onChange={(e) => updateTrans(`resume.profile.${activeProfile}.description`, "pt", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none"
                placeholder={getTrans("portifolio.description", "pt") || "Escreva o resumo do perfil..."}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Projects Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-[500px]">
          <h3 className="text-xs font-bold text-accent tracking-wider uppercase border-b border-white/5 pb-2 mb-3">
            Projects ({projects.filter((p) => p.showInResume?.includes(activeProfile)).length})
          </h3>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar text-left">
            {projects.length === 0 ? (
              <p className="text-[10px] text-gray-500 italic">No projects found.</p>
            ) : (
              projects.map((proj) => {
                const isChecked = proj.showInResume?.includes(activeProfile) || false;
                const title = getTrans(proj.title, "en") || getTrans(proj.title, "pt") || proj.title;
                return (
                  <label
                    key={proj.id}
                    className={`flex items-start gap-2 p-2 rounded-xl transition-all cursor-pointer text-xs border ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const idx = projects.findIndex((p) => p.id === proj.id);
                        if (idx !== -1) {
                          setProjects(
                            updateItemAtIndex(projects, idx, {
                              showInResume: toggleProfile(proj.showInResume, activeProfile),
                            })
                          );
                        }
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0"
                    />
                    <span className="line-clamp-2 leading-tight">{title}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-[500px]">
          <h3 className="text-xs font-bold text-accent tracking-wider uppercase border-b border-white/5 pb-2 mb-2">
            Certifications ({certs.filter((c) => c.showInResume?.includes(activeProfile)).length})
          </h3>
          <div className="flex flex-wrap gap-1 mb-2 border-b border-white/5 pb-2">
            {[
              { id: "all", label: "All" },
              { id: "ia_ml", label: "IA" },
              { id: "back", label: "Back" },
              { id: "frontend", label: "Front" },
              { id: "cloud", label: "Cloud" },
              { id: "game_dev", label: "Game" },
              { id: "fundamentos", label: "Fund" },
              { id: "idiomas", label: "Lang" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCertFilter(tab.id)}
                className={`px-1.5 py-0.5 text-[9px] font-mono rounded border transition-all cursor-pointer select-none ${
                  certFilter === tab.id
                    ? "bg-accent border-accent text-black font-bold"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar text-left">
            {certs.filter((c) => certFilter === "all" || c.category === certFilter).length === 0 ? (
              <p className="text-[10px] text-gray-500 italic">No matching certifications found.</p>
            ) : (
              certs
                .filter((c) => certFilter === "all" || c.category === certFilter)
                .map((cert) => {
                const isChecked = cert.showInResume?.includes(activeProfile) || false;
                const title = getTrans(cert.titleKey, "en") || getTrans(cert.titleKey, "pt") || cert.titleKey;
                const org = getTrans(cert.orgKey, "en") || getTrans(cert.orgKey, "pt") || cert.orgKey;
                return (
                  <label
                    key={cert.id}
                    className={`flex items-start gap-2 p-2 rounded-xl transition-all cursor-pointer text-xs border ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const idx = certs.findIndex((c) => c.id === cert.id);
                        if (idx !== -1) {
                          setCerts(
                            updateItemAtIndex(certs, idx, {
                              showInResume: toggleProfile(cert.showInResume, activeProfile),
                            })
                          );
                        }
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0"
                    />
                    <div className="leading-tight">
                      <span className="line-clamp-2 block font-semibold">{title}</span>
                      <span className="text-[10px] text-gray-500">{org}</span>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Experience Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-[500px]">
          <h3 className="text-xs font-bold text-accent tracking-wider uppercase border-b border-white/5 pb-2 mb-3">
            Experience ({exp.filter((e) => e.showInResume?.includes(activeProfile)).length})
          </h3>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar text-left">
            {exp.length === 0 ? (
              <p className="text-[10px] text-gray-500 italic">No experience found.</p>
            ) : (
              exp.map((item) => {
                const isChecked = item.showInResume?.includes(activeProfile) || false;
                const title = getTrans(item.titleKey, "en") || getTrans(item.titleKey, "pt") || item.titleKey;
                const company = getTrans(item.companyKey, "en") || getTrans(item.companyKey, "pt") || item.companyKey;
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2 p-2 rounded-xl transition-all cursor-pointer text-xs border ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const idx = exp.findIndex((e) => e.id === item.id);
                        if (idx !== -1) {
                          setExp(
                            updateItemAtIndex(exp, idx, {
                              showInResume: toggleProfile(item.showInResume, activeProfile),
                            })
                          );
                        }
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0"
                    />
                    <div className="leading-tight">
                      <span className="line-clamp-2 block font-semibold">{title}</span>
                      <span className="text-[10px] text-gray-500">{company}</span>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Education Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-[500px]">
          <h3 className="text-xs font-bold text-accent tracking-wider uppercase border-b border-white/5 pb-2 mb-3">
            Education ({edu.filter((e) => e.showInResume?.includes(activeProfile)).length})
          </h3>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar text-left">
            {edu.length === 0 ? (
              <p className="text-[10px] text-gray-500 italic">No education found.</p>
            ) : (
              edu.map((item) => {
                const isChecked = item.showInResume?.includes(activeProfile) || false;
                const title = getTrans(item.titleKey, "en") || getTrans(item.titleKey, "pt") || item.titleKey;
                const inst = getTrans(item.instKey, "en") || getTrans(item.instKey, "pt") || item.instKey;
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2 p-2 rounded-xl transition-all cursor-pointer text-xs border ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const idx = edu.findIndex((e) => e.id === item.id);
                        if (idx !== -1) {
                          setEdu(
                            updateItemAtIndex(edu, idx, {
                              showInResume: toggleProfile(item.showInResume, activeProfile),
                            })
                          );
                        }
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0"
                    />
                    <div className="leading-tight">
                      <span className="line-clamp-2 block font-semibold">{title}</span>
                      <span className="text-[10px] text-gray-500">{inst}</span>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Skills Column */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-[500px]">
          <h3 className="text-xs font-bold text-accent tracking-wider uppercase border-b border-white/5 pb-2 mb-3">
            Skills ({skills.filter((s) => s.showInResume?.includes(activeProfile)).length})
          </h3>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar text-left">
            {skills.length === 0 ? (
              <p className="text-[10px] text-gray-500 italic">No skills found.</p>
            ) : (
              skills.map((skill) => {
                const isChecked = skill.showInResume?.includes(activeProfile) || false;
                const category = getTrans(skill.categoryKey, "en") || skill.categoryKey;
                return (
                  <label
                    key={skill.id}
                    className={`flex items-start gap-2 p-2 rounded-xl transition-all cursor-pointer text-xs border ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const idx = skills.findIndex((s) => s.id === skill.id);
                        if (idx !== -1) {
                          setSkills(
                            updateItemAtIndex(skills, idx, {
                              showInResume: toggleProfile(skill.showInResume, activeProfile),
                            })
                          );
                        }
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0"
                    />
                    <div className="leading-tight">
                      <span className="block font-semibold">{skill.name}</span>
                      <span className="text-[9px] text-gray-500">{category.replace("about.stacks.", "")}</span>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
