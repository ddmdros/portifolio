import { useState } from "react";
import { type CertificationType } from "../../types/certificationType";
import { type ProjectType } from "../../types/projectType";
import { type EducationType } from "../../content/EducationData";
import { type ExperienceType } from "../../content/ExperienceData";
import { type SkillType } from "../../content/SkillsData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { FileText, Download, GripVertical } from "lucide-react";

import { PROFILE_CONFIG } from "../../config/profile";

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
  profileConfig: typeof PROFILE_CONFIG;
  setProfileConfig: React.Dispatch<React.SetStateAction<typeof PROFILE_CONFIG>>;
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
  profileConfig,
  setProfileConfig,
}: ResumesTabProps) => {
  const [activeProfile, setActiveProfile] = useState<string>("general");
  const [certFilter, setCertFilter] = useState<string>("all");

  // Drag states for columns
  const [draggedProjId, setDraggedProjId] = useState<string | null>(null);
  const [dragOverProjId, setDragOverProjId] = useState<string | null>(null);
  const [canDragProjId, setCanDragProjId] = useState<string | null>(null);

  const [draggedCertId, setDraggedCertId] = useState<string | null>(null);
  const [dragOverCertId, setDragOverCertId] = useState<string | null>(null);
  const [canDragCertId, setCanDragCertId] = useState<string | null>(null);

  const [draggedEduId, setDraggedEduId] = useState<string | null>(null);
  const [dragOverEduId, setDragOverEduId] = useState<string | null>(null);
  const [canDragEduId, setCanDragEduId] = useState<string | null>(null);

  const [draggedExpId, setDraggedExpId] = useState<string | null>(null);
  const [dragOverExpId, setDragOverExpId] = useState<string | null>(null);
  const [canDragExpId, setCanDragExpId] = useState<string | null>(null);

  const [draggedSkillsId, setDraggedSkillsId] = useState<string | null>(null);
  const [dragOverSkillsId, setDragOverSkillsId] = useState<string | null>(null);
  const [canDragSkillsId, setCanDragSkillsId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string, type: "proj" | "cert" | "edu" | "exp" | "skills") => {
    e.dataTransfer.effectAllowed = "move";
    if (type === "proj") setDraggedProjId(id);
    else if (type === "cert") setDraggedCertId(id);
    else if (type === "edu") setDraggedEduId(id);
    else if (type === "exp") setDraggedExpId(id);
    else if (type === "skills") setDraggedSkillsId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string, type: "proj" | "cert" | "edu" | "exp" | "skills", draggedId: string | null) => {
    e.preventDefault();
    if (draggedId !== id) {
      if (type === "proj") setDragOverProjId(id);
      else if (type === "cert") setDragOverCertId(id);
      else if (type === "edu") setDragOverEduId(id);
      else if (type === "exp") setDragOverExpId(id);
      else if (type === "skills") setDragOverSkillsId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string, type: "proj" | "cert" | "edu" | "exp" | "skills", draggedId: string | null) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      if (type === "proj") {
        const fromIdx = projects.findIndex((x) => x.id === draggedId);
        const toIdx = projects.findIndex((x) => x.id === targetId);
        if (fromIdx !== -1 && toIdx !== -1) {
          const next = [...projects];
          const [moved] = next.splice(fromIdx, 1);
          next.splice(toIdx, 0, moved);
          setProjects(next);
        }
      } else if (type === "cert") {
        const fromIdx = certs.findIndex((x) => x.id === draggedId);
        const toIdx = certs.findIndex((x) => x.id === targetId);
        if (fromIdx !== -1 && toIdx !== -1) {
          const next = [...certs];
          const [moved] = next.splice(fromIdx, 1);
          next.splice(toIdx, 0, moved);
          setCerts(next);
        }
      } else if (type === "edu") {
        const fromIdx = edu.findIndex((x) => x.id === draggedId);
        const toIdx = edu.findIndex((x) => x.id === targetId);
        if (fromIdx !== -1 && toIdx !== -1) {
          const next = [...edu];
          const [moved] = next.splice(fromIdx, 1);
          next.splice(toIdx, 0, moved);
          setEdu(next);
        }
      } else if (type === "exp") {
        const fromIdx = exp.findIndex((x) => x.id === draggedId);
        const toIdx = exp.findIndex((x) => x.id === targetId);
        if (fromIdx !== -1 && toIdx !== -1) {
          const next = [...exp];
          const [moved] = next.splice(fromIdx, 1);
          next.splice(toIdx, 0, moved);
          setExp(next);
        }
      } else if (type === "skills") {
        const fromIdx = skills.findIndex((x) => x.id === draggedId);
        const toIdx = skills.findIndex((x) => x.id === targetId);
        if (fromIdx !== -1 && toIdx !== -1) {
          const next = [...skills];
          const [moved] = next.splice(fromIdx, 1);
          next.splice(toIdx, 0, moved);
          setSkills(next);
        }
      }
    }
    handleDragEnd(type);
  };

  const handleDragEnd = (type: "proj" | "cert" | "edu" | "exp" | "skills") => {
    if (type === "proj") {
      setDraggedProjId(null);
      setDragOverProjId(null);
      setCanDragProjId(null);
    } else if (type === "cert") {
      setDraggedCertId(null);
      setDragOverCertId(null);
      setCanDragCertId(null);
    } else if (type === "edu") {
      setDraggedEduId(null);
      setDragOverEduId(null);
      setCanDragEduId(null);
    } else if (type === "exp") {
      setDraggedExpId(null);
      setDragOverExpId(null);
      setCanDragExpId(null);
    } else if (type === "skills") {
      setDraggedSkillsId(null);
      setDragOverSkillsId(null);
      setCanDragSkillsId(null);
    }
  };

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

      {/* Download Profile PDFs (available when running locally and built) */}
      <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-sm font-bold text-accent">Download PDF for this Profile</h3>
          <p className="text-xs text-gray-400 mt-1">
            Access the generated PDFs for the <strong>{PROFILES.find(p => p.id === activeProfile)?.label}</strong> profile.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={`/assets/resume_${activeProfile}_en.pdf`}
            download={`Resume_Diogo_Medeiros_${activeProfile}.pdf`}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 font-semibold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs select-none"
          >
            <Download size={14} /> Download EN
          </a>
          <a
            href={`/assets/resume_${activeProfile}_pt.pdf`}
            download={`Curriculo_Diogo_Medeiros_${activeProfile}.pdf`}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 font-semibold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs select-none"
          >
            <Download size={14} /> Download PT
          </a>
        </div>
      </div>

      {/* Public Download Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex-1 min-w-[200px] text-left">
          <h3 className="text-sm font-bold text-accent">Disponibilizar para Download Público</h3>
          <p className="text-xs text-gray-400 mt-1">
            Se ativado, este currículo estará disponível para download no portfólio publicado (modo público).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={profileConfig.availableCvDownloads?.includes(activeProfile) || false}
            onChange={(e) => {
              const currentDownloads = profileConfig.availableCvDownloads || [];
              const updated = e.target.checked
                ? [...currentDownloads, activeProfile]
                : currentDownloads.filter((x) => x !== activeProfile);
              setProfileConfig(prev => ({ ...prev, availableCvDownloads: updated }));
            }}
            className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-5 h-5 cursor-pointer"
            id="public-download-checkbox"
          />
          <label htmlFor="public-download-checkbox" className="text-xs text-gray-300 cursor-pointer select-none font-semibold">
            Disponibilizar no Portfólio
          </label>
        </div>
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
                  <div
                    key={proj.id}
                    draggable={canDragProjId === proj.id}
                    onDragStart={(e) => handleDragStart(e, proj.id, "proj")}
                    onDragOver={(e) => handleDragOver(e, proj.id, "proj", draggedProjId)}
                    onDrop={(e) => handleDrop(e, proj.id, "proj", draggedProjId)}
                    onDragEnd={() => handleDragEnd("proj")}
                    className={`flex items-start gap-1 p-2 rounded-xl transition-all border ${
                      draggedProjId === proj.id ? "opacity-40 scale-[0.98]" : ""
                    } ${
                      dragOverProjId === proj.id
                        ? "border-accent border-dashed bg-accent/5"
                        : "border-transparent"
                    } ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onMouseDown={() => setCanDragProjId(proj.id)}
                      onMouseUp={() => setCanDragProjId(null)}
                      className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-0.5 bg-white/5 rounded transition-colors mt-0.5"
                      title="Drag to reorder"
                    >
                      <GripVertical size={12} />
                    </button>
                    <label className="flex items-start gap-2 cursor-pointer text-xs w-full">
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
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0 cursor-pointer"
                      />
                      <span className="line-clamp-2 leading-tight select-none">{title}</span>
                    </label>
                  </div>
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
                  <div
                    key={cert.id}
                    draggable={canDragCertId === cert.id}
                    onDragStart={(e) => handleDragStart(e, cert.id, "cert")}
                    onDragOver={(e) => handleDragOver(e, cert.id, "cert", draggedCertId)}
                    onDrop={(e) => handleDrop(e, cert.id, "cert", draggedCertId)}
                    onDragEnd={() => handleDragEnd("cert")}
                    className={`flex items-start gap-1 p-2 rounded-xl transition-all border ${
                      draggedCertId === cert.id ? "opacity-40 scale-[0.98]" : ""
                    } ${
                      dragOverCertId === cert.id
                        ? "border-accent border-dashed bg-accent/5"
                        : "border-transparent"
                    } ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onMouseDown={() => setCanDragCertId(cert.id)}
                      onMouseUp={() => setCanDragCertId(null)}
                      className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-0.5 bg-white/5 rounded transition-colors mt-0.5"
                      title="Drag to reorder"
                    >
                      <GripVertical size={12} />
                    </button>
                    <label className="flex items-start gap-2 cursor-pointer text-xs w-full">
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
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0 cursor-pointer"
                      />
                      <div className="leading-tight select-none">
                        <span className="line-clamp-2 block font-semibold">{title}</span>
                        <span className="text-[10px] text-gray-500">{org}</span>
                      </div>
                    </label>
                  </div>
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
                  <div
                    key={item.id}
                    draggable={canDragExpId === item.id}
                    onDragStart={(e) => handleDragStart(e, item.id, "exp")}
                    onDragOver={(e) => handleDragOver(e, item.id, "exp", draggedExpId)}
                    onDrop={(e) => handleDrop(e, item.id, "exp", draggedExpId)}
                    onDragEnd={() => handleDragEnd("exp")}
                    className={`flex items-start gap-1 p-2 rounded-xl transition-all border ${
                      draggedExpId === item.id ? "opacity-40 scale-[0.98]" : ""
                    } ${
                      dragOverExpId === item.id
                        ? "border-accent border-dashed bg-accent/5"
                        : "border-transparent"
                    } ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onMouseDown={() => setCanDragExpId(item.id)}
                      onMouseUp={() => setCanDragExpId(null)}
                      className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-0.5 bg-white/5 rounded transition-colors mt-0.5"
                      title="Drag to reorder"
                    >
                      <GripVertical size={12} />
                    </button>
                    <label className="flex items-start gap-2 cursor-pointer text-xs w-full">
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
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0 cursor-pointer"
                      />
                      <div className="leading-tight select-none">
                        <span className="line-clamp-2 block font-semibold">{title}</span>
                        <span className="text-[10px] text-gray-500">{company}</span>
                      </div>
                    </label>
                  </div>
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
                  <div
                    key={item.id}
                    draggable={canDragEduId === item.id}
                    onDragStart={(e) => handleDragStart(e, item.id, "edu")}
                    onDragOver={(e) => handleDragOver(e, item.id, "edu", draggedEduId)}
                    onDrop={(e) => handleDrop(e, item.id, "edu", draggedEduId)}
                    onDragEnd={() => handleDragEnd("edu")}
                    className={`flex items-start gap-1 p-2 rounded-xl transition-all border ${
                      draggedEduId === item.id ? "opacity-40 scale-[0.98]" : ""
                    } ${
                      dragOverEduId === item.id
                        ? "border-accent border-dashed bg-accent/5"
                        : "border-transparent"
                    } ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onMouseDown={() => setCanDragEduId(item.id)}
                      onMouseUp={() => setCanDragEduId(null)}
                      className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-0.5 bg-white/5 rounded transition-colors mt-0.5"
                      title="Drag to reorder"
                    >
                      <GripVertical size={12} />
                    </button>
                    <label className="flex items-start gap-2 cursor-pointer text-xs w-full">
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
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0 cursor-pointer"
                      />
                      <div className="leading-tight select-none">
                        <span className="line-clamp-2 block font-semibold">{title}</span>
                        <span className="text-[10px] text-gray-500">{inst}</span>
                      </div>
                    </label>
                  </div>
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
                  <div
                    key={skill.id}
                    draggable={canDragSkillsId === skill.id}
                    onDragStart={(e) => handleDragStart(e, skill.id, "skills")}
                    onDragOver={(e) => handleDragOver(e, skill.id, "skills", draggedSkillsId)}
                    onDrop={(e) => handleDrop(e, skill.id, "skills", draggedSkillsId)}
                    onDragEnd={() => handleDragEnd("skills")}
                    className={`flex items-start gap-1 p-2 rounded-xl transition-all border ${
                      draggedSkillsId === skill.id ? "opacity-40 scale-[0.98]" : ""
                    } ${
                      dragOverSkillsId === skill.id
                        ? "border-accent border-dashed bg-accent/5"
                        : "border-transparent"
                    } ${
                      isChecked
                        ? "bg-accent/5 border-accent/20 text-white"
                        : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <button
                      type="button"
                      onMouseDown={() => setCanDragSkillsId(skill.id)}
                      onMouseUp={() => setCanDragSkillsId(null)}
                      className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-0.5 bg-white/5 rounded transition-colors mt-0.5"
                      title="Drag to reorder"
                    >
                      <GripVertical size={12} />
                    </button>
                    <label className="flex items-start gap-2 cursor-pointer text-xs w-full">
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
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0 cursor-pointer"
                      />
                      <div className="leading-tight select-none">
                        <span className="block font-semibold">{skill.name}</span>
                        <span className="text-[9px] text-gray-500">{category.replace("about.stacks.", "")}</span>
                      </div>
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
