import { Plus, Trash2 } from "lucide-react";
import { type ProjectType, type ProjectCategory } from "../../types/projectType";
import { updateItemAtIndex } from "../../utils/arrayUtils";

interface ProjectsTabProps {
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  PROFILES: readonly { readonly id: string; readonly label: string }[];
  toggleProfile: (arr: string[] | undefined, profileId: string) => string[];
}

export const ProjectsTab = ({
  projects,
  setProjects,
  updateTrans,
  getTrans,
  PROFILES,
  toggleProfile,
}: ProjectsTabProps) => {
  return (
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
                showInResume: [],
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
          <div
            key={proj.id}
            className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-gray-500">
                ID: {proj.id}
              </span>
              <button
                onClick={() =>
                  setProjects(projects.filter((p) => p.id !== proj.id))
                }
                className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={getTrans(proj.title, "en")}
                  onChange={(e) =>
                    updateTrans(proj.title, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Title (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(proj.title, "pt")}
                  onChange={(e) =>
                    updateTrans(proj.title, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Description (English)
                </label>
                <textarea
                  rows={2}
                  value={getTrans(proj.description, "en")}
                  onChange={(e) =>
                    updateTrans(proj.description, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Description (Portuguese)
                </label>
                <textarea
                  rows={2}
                  value={getTrans(proj.description, "pt")}
                  onChange={(e) =>
                    updateTrans(proj.description, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category (comma separated)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(proj.category)
                      ? proj.category.join(", ")
                      : proj.category
                  }
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        category: e.target.value
                          .split(",")
                          .map((t) => t.trim()) as ProjectCategory[],
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={proj.tags.join(", ")}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={proj.imageUrl}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        imageUrl: e.target.value,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={proj.githubUrl || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        githubUrl: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Live Project URL
                </label>
                <input
                  type="text"
                  value={proj.projectUrl || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        projectUrl: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Docs ID (optional)
                </label>
                <input
                  type="text"
                  value={proj.docId || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        docId: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 border-t border-white/5 pt-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={proj.isWip || false}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        isWip: e.target.checked,
                      }),
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                />
                Work In Progress
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={proj.isFeatured}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        isFeatured: e.target.checked,
                      }),
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                />
                Is Featured (Portfolio home card)
              </label>

              <div className="border-t border-white/5 pt-2 w-full">
                <span className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Include in CV Profiles:
                </span>
                <div className="flex flex-wrap gap-4">
                  {PROFILES.map((profile) => (
                    <label
                      key={profile.id}
                      className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          proj.showInResume?.includes(profile.id) || false
                        }
                        onChange={() => {
                          setProjects(
                            updateItemAtIndex(projects, pIdx, {
                              showInResume: toggleProfile(
                                proj.showInResume,
                                profile.id,
                              ),
                            }),
                          );
                        }}
                        className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                      />
                      {profile.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume bullet points */}
            {proj.showInResume && proj.showInResume.length > 0 && (
              <div className="border-t border-white/5 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-accent">
                    CV Bullet Points
                  </span>
                  <button
                    onClick={() => {
                      const bulletId = proj.descKeys
                        ? proj.descKeys.length + 1
                        : 1;
                      const bulletKey = `${proj.title}.bullet${bulletId}`;
                      updateTrans(
                        bulletKey,
                        "en",
                        "New bullet text (English)",
                      );
                      updateTrans(
                        bulletKey,
                        "pt",
                        "Texto do marcador (Português)",
                      );
                      setProjects(
                        updateItemAtIndex(projects, pIdx, {
                          descKeys: [...(proj.descKeys || []), bulletKey],
                        }),
                      );
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
                        <span className="text-[10px] font-mono text-gray-500">
                          Key: {bKey}
                        </span>
                        <button
                          onClick={() => {
                            setProjects(
                              updateItemAtIndex(projects, pIdx, {
                                descKeys:
                                  proj.descKeys?.filter(
                                    (k) => k !== bKey,
                                  ) || [],
                              }),
                            );
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
                          onChange={(e) =>
                            updateTrans(bKey, "en", e.target.value)
                          }
                          className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                          placeholder="English text"
                        />
                        <input
                          type="text"
                          value={getTrans(bKey, "pt")}
                          onChange={(e) =>
                            updateTrans(bKey, "pt", e.target.value)
                          }
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
  );
};
