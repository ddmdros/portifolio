import React from "react";
import { Plus } from "lucide-react";
import { type ProjectType, type ProjectCategory } from "../../types/projectType";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput, CustomLinkFields } from "./DevModeInputs";

interface ProjectsTabProps {
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const ProjectsTab = ({
  projects,
  setProjects,
  updateTrans,
  getTrans,
}: ProjectsTabProps) => {
  const dragState = useDragAndDrop(projects, setProjects);

  const handleAdd = () => {
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
  };

  return (
    <DevModeTabPanel
      title="Manage Projects"
      description="Manage your portfolio projects and showcase details."
      items={projects}
      onAdd={handleAdd}
      onDelete={(id) => setProjects(projects.filter((p) => p.id !== id))}
      addButtonLabel="Add Project"
      emptyMessage="No projects found. Click 'Add Project' to create one."
      dragState={dragState}
      renderCardHeader={(item) => {
        const title = getTrans(item.title, "en") || "New Project";
        return (
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-mono text-gray-500 font-normal">
              (ID: {item.id})
            </span>
          </div>
        );
      }}
      renderCardDetails={(item) => {
        const pIdx = projects.findIndex((x) => x.id === item.id);
        return (
          <>
            <TranslatedTextInput
              labelEn="Title (English)"
              labelPt="Title (Portuguese)"
              translationKey={item.title}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Description (English)"
              labelPt="Description (Portuguese)"
              translationKey={item.description}
              updateTrans={updateTrans}
              getTrans={getTrans}
              isTextArea={true}
              rows={2}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category (comma separated)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(item.category)
                      ? item.category.join(", ")
                      : item.category
                  }
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        category: e.target.value
                          .split(",")
                          .map((t) => t.trim()) as ProjectCategory[],
                      })
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
                  value={item.tags.join(", ")}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
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
                  value={item.imageUrl}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        imageUrl: e.target.value,
                      })
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
                  value={item.githubUrl || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        githubUrl: e.target.value || undefined,
                      })
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
                  value={item.projectUrl || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        projectUrl: e.target.value || undefined,
                      })
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
                  value={item.docId || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        docId: e.target.value || undefined,
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <CustomLinkFields
              item={item}
              items={projects}
              setItems={setProjects}
              updateTrans={updateTrans}
              getTrans={getTrans}
              urlLabel="Custom Clickable Link URL (Optional - default: Live URL / GitHub URL)"
              urlPlaceholder="e.g. https://github.com/ddmdros/officeMayhem"
              textKeyPlaceholder="resume.project.custom.link"
              defaultTextEn="Link here"
              defaultTextPt="Link aqui"
            />

            <div className="flex flex-wrap gap-6 border-t border-white/5 pt-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={item.isWip || false}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        isWip: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                />
                Work In Progress
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={item.isFeatured}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        isFeatured: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                />
                Is Featured (Portfolio home card)
              </label>
            </div>

            {/* Resume bullet points */}
            {item.showInResume && item.showInResume.length > 0 && (
              <div className="border-t border-white/5 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-accent">
                    CV Bullet Points
                  </span>
                  <button
                    onClick={() => {
                      const bulletId = item.descKeys
                        ? item.descKeys.length + 1
                        : 1;
                      const bulletKey = `${item.title}.bullet${bulletId}`;
                      updateTrans(
                        bulletKey,
                        "en",
                        "New bullet text (English)"
                      );
                      updateTrans(
                        bulletKey,
                        "pt",
                        "Texto do marcador (Português)"
                      );
                      setProjects(
                        updateItemAtIndex(projects, pIdx, {
                          descKeys: [...(item.descKeys || []), bulletKey],
                        })
                      );
                    }}
                    className="flex items-center gap-1 text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded hover:bg-white/10 cursor-pointer"
                  >
                    <Plus size={10} /> Add Bullet
                  </button>
                </div>

                <div className="space-y-3 pl-4 border-l border-white/10">
                  {item.descKeys?.map((bKey) => (
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
                                  item.descKeys?.filter(
                                    (k) => k !== bKey
                                  ) || [],
                              })
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
          </>
        );
      }}
    />
  );
};


