import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { type SkillType } from "../../content/SkillsData";
import { updateItemAtIndex } from "../../utils/arrayUtils";

interface SkillsTabProps {
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const SkillsTab = ({
  skills,
  setSkills,
  updateTrans,
  getTrans,
}: SkillsTabProps) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [canDragId, setCanDragId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      const fromIdx = skills.findIndex((s) => s.id === draggedId);
      const toIdx = skills.findIndex((s) => s.id === targetId);
      if (fromIdx !== -1 && toIdx !== -1) {
        const newSkills = [...skills];
        const [moved] = newSkills.splice(fromIdx, 1);
        newSkills.splice(toIdx, 0, moved);
        setSkills(newSkills);
      }
    }
    setDraggedId(null);
    setDragOverId(null);
    setCanDragId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
    setCanDragId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <h2 className="text-xl font-bold text-white">
          Manage Skills & Languages
        </h2>
        <button
          onClick={() => {
            const newId = `s${skills.length + 1}_${Date.now().toString().slice(-4)}`;
            setSkills([
              ...skills,
              {
                id: newId,
                categoryKey: "about.stacks.programming.languages",
                name: "New Skill",
                showInResume: [],
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
          <div
            key={skill.id}
            draggable={canDragId === skill.id}
            onDragStart={(e) => handleDragStart(e, skill.id)}
            onDragOver={(e) => handleDragOver(e, skill.id)}
            onDrop={(e) => handleDrop(e, skill.id)}
            onDragEnd={handleDragEnd}
            className={`border p-5 rounded-2xl bg-white/5/20 space-y-4 transition-all duration-200 ${
              draggedId === skill.id ? "opacity-40 scale-[0.98]" : ""
            } ${
              dragOverId === skill.id
                ? "border-accent border-dashed bg-accent/5 scale-[1.01]"
                : "border-white/5"
            }`}
          >
            <div className="flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onMouseDown={() => setCanDragId(skill.id)}
                  onMouseUp={() => setCanDragId(null)}
                  className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-1 bg-white/5 rounded-lg transition-colors"
                  title="Drag to reorder"
                >
                  <GripVertical size={14} />
                </button>
                <span className="text-xs font-mono text-gray-500">
                  ID: {skill.id}
                </span>
              </div>
              <button
                onClick={() => setSkills(skills.filter((x) => x.id !== skill.id))}
                className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Name / Tech Tag
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => {
                    setSkills(
                      updateItemAtIndex(skills, sIdx, { name: e.target.value }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={skill.categoryKey}
                  onChange={(e) => {
                    setSkills(
                      updateItemAtIndex(skills, sIdx, {
                        categoryKey: e.target.value,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="about.stacks.programming.languages">
                    Programming Languages
                  </option>
                  <option value="about.stacks.web.game.dev">
                    Web & Game Dev
                  </option>
                  <option value="about.stacks.data.devops">
                    Data & DevOps
                  </option>
                  <option value="resume.skills.languages">
                    Languages (Resume profile)
                  </option>
                </select>
              </div>
            </div>



            {/* Language profile details */}
            {skill.categoryKey === "resume.skills.languages" && (
              <div className="border-t border-white/5 pt-3 space-y-3 animate-fade-in">
                <span className="block text-xs font-semibold text-accent">
                  Language details
                </span>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Translation Key for Resume details
                    </label>
                    <input
                      type="text"
                      value={skill.resumeDetailsKey || ""}
                      onChange={(e) => {
                        const k =
                          e.target.value ||
                          `resume.skills.languages.${skill.name.toLowerCase()}`;
                        updateTrans(k, "en", "English C2 (example)");
                        updateTrans(k, "pt", "Inglês C2 (exemplo)");
                        setSkills(
                          updateItemAtIndex(skills, sIdx, {
                            resumeDetailsKey: k,
                          }),
                        );
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                      placeholder="e.g. resume.skills.languages.english"
                    />
                  </div>
                  {skill.resumeDetailsKey && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={getTrans(skill.resumeDetailsKey, "en")}
                        onChange={(e) =>
                          updateTrans(
                            skill.resumeDetailsKey!,
                            "en",
                            e.target.value,
                          )
                        }
                        className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                        placeholder="EN text"
                      />
                      <input
                        type="text"
                        value={getTrans(skill.resumeDetailsKey, "pt")}
                        onChange={(e) =>
                          updateTrans(
                            skill.resumeDetailsKey!,
                            "pt",
                            e.target.value,
                          )
                        }
                        className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                        placeholder="PT text"
                      />
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Certificate Url (optional)
                    </label>
                    <input
                      type="text"
                      value={skill.credentialUrl || ""}
                      onChange={(e) => {
                        setSkills(
                          updateItemAtIndex(skills, sIdx, {
                            credentialUrl: e.target.value || undefined,
                          }),
                        );
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                      placeholder="e.g. https://www.efset.org/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Certificate Text Key (optional)
                    </label>
                    <input
                      type="text"
                      value={skill.certTextKey || ""}
                      onChange={(e) => {
                        const k =
                          e.target.value ||
                          `resume.skills.languages.${skill.name.toLowerCase()}.cert`;
                        updateTrans(k, "en", "EFL certificate");
                        updateTrans(k, "pt", "EFL certificado");
                        setSkills(
                          updateItemAtIndex(skills, sIdx, {
                            certTextKey: k,
                          }),
                        );
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                      placeholder="e.g. resume.skills.languages.english.cert"
                    />
                  </div>
                </div>

                {skill.certTextKey && (
                  <div className="grid md:grid-cols-2 gap-3 pl-4 border-l border-white/10">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                        Certificate Text (English)
                      </label>
                      <input
                        type="text"
                        value={getTrans(skill.certTextKey, "en")}
                        onChange={(e) => {
                          const k = skill.certTextKey!;
                          if (!getTrans(k, "en")) {
                            updateTrans(k, "en", "EFL certificate");
                          }
                          updateTrans(k, "en", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                        placeholder="e.g. EFL certificate"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                        Certificate Text (Portuguese)
                      </label>
                      <input
                        type="text"
                        value={getTrans(skill.certTextKey, "pt")}
                        onChange={(e) => {
                          const k = skill.certTextKey!;
                          if (!getTrans(k, "pt")) {
                            updateTrans(
                              k,
                              "pt",
                              "EFL certificado",
                            );
                          }
                          updateTrans(k, "pt", e.target.value);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                        placeholder="e.g. EFL certificado"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
