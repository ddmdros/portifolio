import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Check, AlertCircle } from "lucide-react";
import { PROJECTS_DATA } from "../content/ProjectsData";
import { CERTIFICATIONS_DATA } from "../content/CertificationsData";
import { EDUCATION_DATA } from "../content/EducationData";
import { EXPERIENCE_DATA } from "../content/ExperienceData";
import { SKILLS_DATA } from "../content/SkillsData";
import enMessagesInit from "../i18n/messages/en.json";
import ptbrMessagesInit from "../i18n/messages/ptbr.json";

export const DevEditor = () => {
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "certs" | "edu" | "exp" | "skills" | "trans">("projects");

  // Local State
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [certs, setCerts] = useState(CERTIFICATIONS_DATA);
  const [edu, setEdu] = useState(EDUCATION_DATA);
  const [exp, setExp] = useState(EXPERIENCE_DATA);
  const [skills, setSkills] = useState(SKILLS_DATA);
  const [enMessages, setEnMessages] = useState<Record<string, string>>(enMessagesInit);
  const [ptbrMessages, setPtbrMessages] = useState<Record<string, string>>(ptbrMessagesInit);

  // Status State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      setIsLocalhost(true);
    }
  }, []);

  if (!isLocalhost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-2">Access Denied</h1>
        <p className="text-gray-400">The Dev Editor is only accessible when running the portfolio locally on localhost.</p>
      </div>
    );
  }

  // Translation helpers
  const getTrans = (key: string, lang: "en" | "pt") => {
    const dict = lang === "en" ? enMessages : ptbrMessages;
    return dict[key] || "";
  };

  const updateTrans = (key: string, lang: "en" | "pt", value: string) => {
    if (lang === "en") {
      setEnMessages(prev => ({ ...prev, [key]: value }));
    } else {
      setPtbrMessages(prev => ({ ...prev, [key]: value }));
    }
  };

  // Save changes handler
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projects,
          certifications: certs,
          education: edu,
          experience: exp,
          skills,
          en: enMessages,
          ptbr: ptbrMessages,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSaveStatus({
          type: "success",
          message: "Changes saved and PDF CVs generated successfully!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: result.error || "Failed to save changes.",
        });
      }
    } catch (err: any) {
      console.error(err);
      setSaveStatus({
        type: "error",
        message: err.message || "An error occurred during saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-accent text-xs tracking-widest uppercase">
            Development Tool
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Local Portfolio & CV Editor
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-accent text-black font-bold py-2.5 px-6 rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? "Saving..." : "Save Changes & Build PDFs"}
        </button>
      </div>

      {/* Save Status Banner */}
      {saveStatus && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${
            saveStatus.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {saveStatus.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-medium">{saveStatus.message}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
        {(
          [
            { id: "projects", label: "Projects" },
            { id: "certs", label: "Certifications" },
            { id: "edu", label: "Education" },
            { id: "exp", label: "Experience" },
            { id: "skills", label: "Skills & Languages" },
            { id: "trans", label: "Global Translations" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-accent border-accent text-black font-bold"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB PANELS */}
      <div className="bg-card-bg/30 border border-white/10 p-6 md:p-8 rounded-3xl min-h-[500px]">
        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Manage Projects</h2>
              <button
                onClick={() => {
                  const newId = `p${projects.length + 1}_${Date.now().toString().slice(-4)}`;
                  const titleKey = `project.title.${newId}`;
                  const descKey = `project.description.${newId}`;
                  updateTrans(titleKey, "en", "New Project Title");
                  updateTrans(titleKey, "pt", "Título do Novo Projeto");
                  updateTrans(descKey, "en", "New Project Description");
                  updateTrans(descKey, "pt", "Descrição do Novo Projeto");

                  setProjects([
                    ...projects,
                    {
                      id: newId,
                      title: titleKey,
                      category: "fullstack",
                      description: descKey,
                      tags: ["React"],
                      imageUrl: "/assets/projects/placeholder.png",
                      isFeatured: false,
                      showInResume: false,
                      descKeys: [],
                    },
                  ]);
                }}
                className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-accent font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>

            <div className="space-y-6">
              {projects.map((proj, pIdx) => (
                <div key={proj.id} className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500">ID: {proj.id}</span>
                    <button
                      onClick={() => setProjects(projects.filter((p) => p.id !== proj.id))}
                      className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={getTrans(proj.title, "en")}
                        onChange={(e) => updateTrans(proj.title, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Title (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(proj.title, "pt")}
                        onChange={(e) => updateTrans(proj.title, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Description (English)</label>
                      <textarea
                        rows={2}
                        value={getTrans(proj.description, "en")}
                        onChange={(e) => updateTrans(proj.description, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Description (Portuguese)</label>
                      <textarea
                        rows={2}
                        value={getTrans(proj.description, "pt")}
                        onChange={(e) => updateTrans(proj.description, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Category (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(proj.category) ? proj.category.join(", ") : proj.category}
                        onChange={(e) => {
                          const updated = { ...proj, category: e.target.value.split(",").map((t) => t.trim()) as any };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={proj.tags.join(", ")}
                        onChange={(e) => {
                          const updated = { ...proj, tags: e.target.value.split(",").map((t) => t.trim()) };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={proj.imageUrl}
                        onChange={(e) => {
                          const updated = { ...proj, imageUrl: e.target.value };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Github URL</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ""}
                        onChange={(e) => {
                          const updated = { ...proj, githubUrl: e.target.value || undefined };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Project Webpage URL</label>
                      <input
                        type="text"
                        value={proj.projectUrl || ""}
                        onChange={(e) => {
                          const updated = { ...proj, projectUrl: e.target.value || undefined };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Documentation Slug (docId)</label>
                      <input
                        type="text"
                        value={proj.docId || ""}
                        onChange={(e) => {
                          const updated = {
                            ...proj,
                            docId: e.target.value || undefined,
                            docsUrl: e.target.value ? `/docs/${e.target.value}` : undefined,
                          };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Toggle controls */}
                  <div className="flex flex-wrap gap-6 items-center pt-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={proj.isFeatured}
                        onChange={(e) => {
                          const updated = { ...proj, isFeatured: e.target.checked };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                      />
                      Is Featured (Portfolio home card)
                    </label>

                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={proj.showInResume || false}
                        onChange={(e) => {
                          const updated = { ...proj, showInResume: e.target.checked };
                          setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                        }}
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                      />
                      Show in CV/Resume
                    </label>
                  </div>

                  {/* Resume bullet points */}
                  {proj.showInResume && (
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-accent">CV Bullet Points</span>
                        <button
                          onClick={() => {
                            const bulletId = proj.descKeys ? proj.descKeys.length + 1 : 1;
                            const bulletKey = `${proj.title}.bullet${bulletId}`;
                            updateTrans(bulletKey, "en", "New bullet text (English)");
                            updateTrans(bulletKey, "pt", "Texto do marcador (Português)");
                            const updated = {
                              ...proj,
                              descKeys: [...(proj.descKeys || []), bulletKey],
                            };
                            setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                          }}
                          className="flex items-center gap-1 text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
                        >
                          <Plus size={10} /> Add Bullet
                        </button>
                      </div>

                      <div className="space-y-3 pl-4 border-l border-white/10">
                        {proj.descKeys?.map((bKey) => (
                          <div key={bKey} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-gray-500">Key: {bKey}</span>
                              <button
                                onClick={() => {
                                  const updated = {
                                    ...proj,
                                    descKeys: proj.descKeys?.filter((k) => k !== bKey) || [],
                                  };
                                  setProjects(projects.map((p, idx) => (idx === pIdx ? updated : p)));
                                }}
                                className="text-red-400 hover:text-red-500 text-[10px] cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={getTrans(bKey, "en")}
                                onChange={(e) => updateTrans(bKey, "en", e.target.value)}
                                className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                                placeholder="English text"
                              />
                              <input
                                type="text"
                                value={getTrans(bKey, "pt")}
                                onChange={(e) => updateTrans(bKey, "pt", e.target.value)}
                                className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                                placeholder="Portuguese text"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === "certs" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Manage Certifications</h2>
              <button
                onClick={() => {
                  const newId = (certs.length + 1).toString();
                  const titleKey = `resume.cert.custom${newId}.title`;
                  const orgKey = `resume.cert.custom${newId}.org`;
                  updateTrans(titleKey, "en", "New Certification Name");
                  updateTrans(titleKey, "pt", "Nome da Nova Certificação");
                  updateTrans(orgKey, "en", "Issuer Org");
                  updateTrans(orgKey, "pt", "Org Emissora");

                  setCerts([
                    ...certs,
                    {
                      id: newId,
                      titleKey,
                      orgKey,
                      year: new Date().getFullYear().toString(),
                      showInResume: false,
                      credentialUrl: "",
                    },
                  ]);
                }}
                className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-accent font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Add Certification
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {certs.map((cert, cIdx) => (
                <div key={cert.id} className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500">ID: {cert.id}</span>
                    <button
                      onClick={() => setCerts(certs.filter((c) => c.id !== cert.id))}
                      className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Name (English)</label>
                      <input
                        type="text"
                        value={getTrans(cert.titleKey, "en")}
                        onChange={(e) => updateTrans(cert.titleKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Name (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(cert.titleKey, "pt")}
                        onChange={(e) => updateTrans(cert.titleKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Org (English)</label>
                      <input
                        type="text"
                        value={getTrans(cert.orgKey, "en")}
                        onChange={(e) => updateTrans(cert.orgKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Org (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(cert.orgKey, "pt")}
                        onChange={(e) => updateTrans(cert.orgKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Year</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => {
                          const updated = { ...cert, year: e.target.value };
                          setCerts(certs.map((c, idx) => (idx === cIdx ? updated : c)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Credential URL</label>
                      <input
                        type="text"
                        value={cert.credentialUrl || ""}
                        onChange={(e) => {
                          const updated = { ...cert, credentialUrl: e.target.value || undefined };
                          setCerts(certs.map((c, idx) => (idx === cIdx ? updated : c)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={cert.showInResume}
                      onChange={(e) => {
                        const updated = { ...cert, showInResume: e.target.checked };
                        setCerts(certs.map((c, idx) => (idx === cIdx ? updated : c)));
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    Show in CV/Resume
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === "edu" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Manage Education</h2>
              <button
                onClick={() => {
                  const newId = (edu.length + 1).toString();
                  const titleKey = `resume.edu.custom${newId}.title`;
                  const instKey = `resume.edu.custom${newId}.inst`;
                  const dateKey = `resume.edu.custom${newId}.date`;
                  updateTrans(titleKey, "en", "Degree Name");
                  updateTrans(titleKey, "pt", "Nome do Curso");
                  updateTrans(instKey, "en", "Institution");
                  updateTrans(instKey, "pt", "Instituição");
                  updateTrans(dateKey, "en", "2026 - Present");
                  updateTrans(dateKey, "pt", "2026 - Presente");

                  setEdu([
                    ...edu,
                    {
                      id: newId,
                      titleKey,
                      instKey,
                      dateKey,
                      showInResume: false,
                    },
                  ]);
                }}
                className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-accent font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Add Education
              </button>
            </div>

            <div className="space-y-6">
              {edu.map((item, eIdx) => (
                <div key={item.id} className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500">ID: {item.id}</span>
                    <button
                      onClick={() => setEdu(edu.filter((ed) => ed.id !== item.id))}
                      className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={getTrans(item.titleKey, "en")}
                        onChange={(e) => updateTrans(item.titleKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Title (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(item.titleKey, "pt")}
                        onChange={(e) => updateTrans(item.titleKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Institution (English)</label>
                      <input
                        type="text"
                        value={getTrans(item.instKey, "en")}
                        onChange={(e) => updateTrans(item.instKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Institution (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(item.instKey, "pt")}
                        onChange={(e) => updateTrans(item.instKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Dates (English)</label>
                      <input
                        type="text"
                        value={getTrans(item.dateKey, "en")}
                        onChange={(e) => updateTrans(item.dateKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Dates (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(item.dateKey, "pt")}
                        onChange={(e) => updateTrans(item.dateKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">GPA/Grade Text (English - optional)</label>
                      <input
                        type="text"
                        value={item.gpaKey ? getTrans(item.gpaKey, "en") : ""}
                        onChange={(e) => {
                          const k = item.gpaKey || `resume.edu.custom${item.id}.gpa`;
                          if (!item.gpaKey) {
                            const updated = { ...item, gpaKey: k };
                            setEdu(edu.map((ed, idx) => (idx === eIdx ? updated : ed)));
                          }
                          updateTrans(k, "en", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">GPA/Grade Text (Portuguese - optional)</label>
                      <input
                        type="text"
                        value={item.gpaKey ? getTrans(item.gpaKey, "pt") : ""}
                        onChange={(e) => {
                          const k = item.gpaKey || `resume.edu.custom${item.id}.gpa`;
                          if (!item.gpaKey) {
                            const updated = { ...item, gpaKey: k };
                            setEdu(edu.map((ed, idx) => (idx === eIdx ? updated : ed)));
                          }
                          updateTrans(k, "pt", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={item.showInResume}
                      onChange={(e) => {
                        const updated = { ...item, showInResume: e.target.checked };
                        setEdu(edu.map((ed, idx) => (idx === eIdx ? updated : ed)));
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    Show in CV/Resume
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === "exp" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Manage Experience</h2>
              <button
                onClick={() => {
                  const newId = (exp.length + 1).toString();
                  const titleKey = `resume.exp.custom${newId}.title`;
                  const companyKey = `resume.exp.custom${newId}.company`;
                  const dateKey = `resume.exp.custom${newId}.date`;
                  updateTrans(titleKey, "en", "Job Title");
                  updateTrans(titleKey, "pt", "Cargo");
                  updateTrans(companyKey, "en", "Company Name");
                  updateTrans(companyKey, "pt", "Nome da Empresa");
                  updateTrans(dateKey, "en", "2026 - Present");
                  updateTrans(dateKey, "pt", "2026 - Presente");

                  setExp([
                    ...exp,
                    {
                      id: newId,
                      titleKey,
                      companyKey,
                      dateKey,
                      descKeys: [],
                      showInResume: false,
                    },
                  ]);
                }}
                className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-accent font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {exp.map((item, eIdx) => (
                <div key={item.id} className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500">ID: {item.id}</span>
                    <button
                      onClick={() => setExp(exp.filter((ex) => ex.id !== item.id))}
                      className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Job Title (English)</label>
                      <input
                        type="text"
                        value={getTrans(item.titleKey, "en")}
                        onChange={(e) => updateTrans(item.titleKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Job Title (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(item.titleKey, "pt")}
                        onChange={(e) => updateTrans(item.titleKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Company (English)</label>
                      <input
                        type="text"
                        value={getTrans(item.companyKey, "en")}
                        onChange={(e) => updateTrans(item.companyKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Company (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(item.companyKey, "pt")}
                        onChange={(e) => updateTrans(item.companyKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Dates (English)</label>
                      <input
                        type="text"
                        value={getTrans(item.dateKey, "en")}
                        onChange={(e) => updateTrans(item.dateKey, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Dates (Portuguese)</label>
                      <input
                        type="text"
                        value={getTrans(item.dateKey, "pt")}
                        onChange={(e) => updateTrans(item.dateKey, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Portfolio Link Text Key (Optional)</label>
                      <input
                        type="text"
                        value={item.portfolioUrlKey ? getTrans(item.portfolioUrlKey, "en") : ""}
                        onChange={(e) => {
                          const k = item.portfolioUrlKey || `resume.exp.custom${item.id}.portfoliolink`;
                          if (!item.portfolioUrlKey) {
                            const updated = { ...item, portfolioUrlKey: k };
                            setExp(exp.map((ex, idx) => (idx === eIdx ? updated : ex)));
                          }
                          updateTrans(k, "en", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Link text in English (e.g. View translation portfolio)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Portfolio Link Text Key (Portuguese - Optional)</label>
                      <input
                        type="text"
                        value={item.portfolioUrlKey ? getTrans(item.portfolioUrlKey, "pt") : ""}
                        onChange={(e) => {
                          const k = item.portfolioUrlKey || `resume.exp.custom${item.id}.portfoliolink`;
                          if (!item.portfolioUrlKey) {
                            const updated = { ...item, portfolioUrlKey: k };
                            setExp(exp.map((ex, idx) => (idx === eIdx ? updated : ex)));
                          }
                          updateTrans(k, "pt", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Link text in Portuguese (e.g. Ver portfólio de tradução)"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={item.showInResume}
                      onChange={(e) => {
                        const updated = { ...item, showInResume: e.target.checked };
                        setExp(exp.map((ex, idx) => (idx === eIdx ? updated : ex)));
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    Show in CV/Resume
                  </label>

                  {/* Bullet points */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-accent">Responsibility Bullet Points</span>
                      <button
                        onClick={() => {
                          const bulletId = item.descKeys.length + 1;
                          const bulletKey = `resume.exp.custom${item.id}.desc${bulletId}`;
                          updateTrans(bulletKey, "en", "Describe task/achievement (English)");
                          updateTrans(bulletKey, "pt", "Descreva tarefa/conquista (Português)");
                          const updated = {
                            ...item,
                            descKeys: [...item.descKeys, bulletKey],
                          };
                          setExp(exp.map((ex, idx) => (idx === eIdx ? updated : ex)));
                        }}
                        className="flex items-center gap-1 text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
                      >
                        <Plus size={10} /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-3 pl-4 border-l border-white/10">
                      {item.descKeys.map((bKey) => (
                        <div key={bKey} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-gray-500">Key: {bKey}</span>
                            <button
                              onClick={() => {
                                const updated = {
                                  ...item,
                                  descKeys: item.descKeys.filter((k) => k !== bKey),
                                };
                                setExp(exp.map((ex, idx) => (idx === eIdx ? updated : ex)));
                              }}
                              className="text-red-400 hover:text-red-500 text-[10px] cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={getTrans(bKey, "en")}
                              onChange={(e) => updateTrans(bKey, "en", e.target.value)}
                              className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={getTrans(bKey, "pt")}
                              onChange={(e) => updateTrans(bKey, "pt", e.target.value)}
                              className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS & LANGUAGES TAB */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">Manage Skills & Languages</h2>
              <button
                onClick={() => {
                  const newId = `s${skills.length + 1}_${Date.now().toString().slice(-4)}`;
                  setSkills([
                    ...skills,
                    {
                      id: newId,
                      categoryKey: "about.stacks.programming.languages",
                      name: "New Skill",
                      showInResume: false,
                    },
                  ]);
                }}
                className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-accent font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Plus size={14} /> Add Skill/Language
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, sIdx) => (
                <div key={skill.id} className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500">ID: {skill.id}</span>
                    <button
                      onClick={() => setSkills(skills.filter((s) => s.id !== skill.id))}
                      className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Display Name (Name)</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = { ...skill, name: e.target.value };
                          setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">Category Key</label>
                      <select
                        value={skill.categoryKey}
                        onChange={(e) => {
                          const updated = { ...skill, categoryKey: e.target.value };
                          setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                      >
                        <option value="about.stacks.programming.languages">Programming Languages</option>
                        <option value="about.stacks.web.game.dev">Web & Game Dev</option>
                        <option value="about.stacks.data.devops">Data & DevOps</option>
                        <option value="resume.skills.languages">Languages</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={skill.showInResume}
                        onChange={(e) => {
                          const updated = { ...skill, showInResume: e.target.checked };
                          setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                        }}
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                      />
                      Show in CV/Resume (PDF)
                    </label>
                  </div>

                  {/* CV details configuration */}
                  {skill.showInResume && (
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <span className="text-xs font-semibold text-accent block">CV Resume Text</span>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-500 mb-1">Resume Details (EN)</label>
                          <input
                            type="text"
                            value={skill.resumeDetailsKey ? getTrans(skill.resumeDetailsKey, "en") : ""}
                            onChange={(e) => {
                              const k = skill.resumeDetailsKey || `resume.skills.custom${skill.id}`;
                              if (!skill.resumeDetailsKey) {
                                const updated = { ...skill, resumeDetailsKey: k };
                                setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                              }
                              updateTrans(k, "en", e.target.value);
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                            placeholder="e.g. Java - Intermediate (EBAC)"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 mb-1">Resume Details (PT)</label>
                          <input
                            type="text"
                            value={skill.resumeDetailsKey ? getTrans(skill.resumeDetailsKey, "pt") : ""}
                            onChange={(e) => {
                              const k = skill.resumeDetailsKey || `resume.skills.custom${skill.id}`;
                              if (!skill.resumeDetailsKey) {
                                const updated = { ...skill, resumeDetailsKey: k };
                                setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                              }
                              updateTrans(k, "pt", e.target.value);
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                            placeholder="e.g. Java - Intermediário (EBAC)"
                          />
                        </div>
                      </div>

                      {/* Credential link for languages */}
                      {skill.categoryKey === "resume.skills.languages" && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] text-gray-500 mb-1">Credential Link (URL)</label>
                            <input
                              type="text"
                              value={skill.credentialUrl || ""}
                              onChange={(e) => {
                                const updated = { ...skill, credentialUrl: e.target.value || undefined };
                                setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                              placeholder="e.g. https://efset.org/..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-gray-500 mb-1">Credential Name (EN)</label>
                              <input
                                type="text"
                                value={skill.certTextKey ? getTrans(skill.certTextKey, "en") : ""}
                                onChange={(e) => {
                                  const k = skill.certTextKey || `resume.skills.custom${skill.id}.cert`;
                                  if (!skill.certTextKey) {
                                    const updated = { ...skill, certTextKey: k };
                                    setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                                  }
                                  updateTrans(k, "en", e.target.value);
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                                placeholder="e.g. EFL certificate"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-gray-500 mb-1">Credential Name (PT)</label>
                              <input
                                type="text"
                                value={skill.certTextKey ? getTrans(skill.certTextKey, "pt") : ""}
                                onChange={(e) => {
                                  const k = skill.certTextKey || `resume.skills.custom${skill.id}.cert`;
                                  if (!skill.certTextKey) {
                                    const updated = { ...skill, certTextKey: k };
                                    setSkills(skills.map((s, idx) => (idx === sIdx ? updated : s)));
                                  }
                                  updateTrans(k, "pt", e.target.value);
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                                placeholder="e.g. EFL certificado"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GLOBAL TRANSLATIONS TAB */}
        {activeTab === "trans" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white pb-4 border-b border-white/5">Global Localization Keys</h2>
            <p className="text-xs text-gray-400">Edit general texts like headers, LGPD compliance text, goal section, etc. below:</p>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {(
                [
                  { key: "resume.goal", label: "CV Professional Goal" },
                  { key: "resume.lgpd", label: "LGPD Compliance Text" },
                  { key: "resume.updated", label: "Updated Date Footer" },
                  { key: "resume.download", label: "Download Button Label" },
                  { key: "resume.title", label: "Resume Page Title" },
                ]
              ).map((item) => (
                <div key={item.key} className="border border-white/5 p-4 rounded-xl bg-white/5/20 space-y-3">
                  <span className="text-sm font-semibold text-accent">{item.label} <code className="text-xs text-gray-500 font-mono">({item.key})</code></span>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">English</label>
                      <textarea
                        rows={2}
                        value={enMessages[item.key] || ""}
                        onChange={(e) => updateTrans(item.key, "en", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
                      <textarea
                        rows={2}
                        value={ptbrMessages[item.key] || ""}
                        onChange={(e) => updateTrans(item.key, "pt", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DevEditor;
