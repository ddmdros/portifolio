import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { type EducationType } from "../../content/EducationData";
import { updateItemAtIndex } from "../../utils/arrayUtils";

interface EduTabProps {
  edu: EducationType[];
  setEdu: React.Dispatch<React.SetStateAction<EducationType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const EduTab = ({
  edu,
  setEdu,
  updateTrans,
  getTrans,
}: EduTabProps) => {
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
      const fromIdx = edu.findIndex((x) => x.id === draggedId);
      const toIdx = edu.findIndex((x) => x.id === targetId);
      if (fromIdx !== -1 && toIdx !== -1) {
        const newEdu = [...edu];
        const [moved] = newEdu.splice(fromIdx, 1);
        newEdu.splice(toIdx, 0, moved);
        setEdu(newEdu);
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
                showInResume: [],
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
          <div
            key={item.id}
            draggable={canDragId === item.id}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragEnd={handleDragEnd}
            className={`border p-5 rounded-2xl bg-white/5/20 space-y-4 transition-all duration-200 ${
              draggedId === item.id ? "opacity-40 scale-[0.98]" : ""
            } ${
              dragOverId === item.id
                ? "border-accent border-dashed bg-accent/5 scale-[1.01]"
                : "border-white/5"
            }`}
          >
            <div className="flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onMouseDown={() => setCanDragId(item.id)}
                  onMouseUp={() => setCanDragId(null)}
                  className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-1 bg-white/5 rounded-lg transition-colors"
                  title="Drag to reorder"
                >
                  <GripVertical size={14} />
                </button>
                <span className="text-xs font-mono text-gray-500">
                  ID: {item.id}
                </span>
              </div>
              <button
                onClick={() => setEdu(edu.filter((x) => x.id !== item.id))}
                className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Degree (English)
                </label>
                <input
                  type="text"
                  value={getTrans(item.titleKey, "en")}
                  onChange={(e) =>
                    updateTrans(item.titleKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Degree (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(item.titleKey, "pt")}
                  onChange={(e) =>
                    updateTrans(item.titleKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Institution (English)
                </label>
                <input
                  type="text"
                  value={getTrans(item.instKey, "en")}
                  onChange={(e) =>
                    updateTrans(item.instKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Institution (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(item.instKey, "pt")}
                  onChange={(e) =>
                    updateTrans(item.instKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Date / Period (English)
                </label>
                <input
                  type="text"
                  value={getTrans(item.dateKey, "en")}
                  onChange={(e) =>
                    updateTrans(item.dateKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Date / Period (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(item.dateKey, "pt")}
                  onChange={(e) =>
                    updateTrans(item.dateKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 space-y-3">
              <span className="block text-xs font-semibold text-gray-400">
                GPA / Additional Info (Optional)
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!item.gpaKey}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const gpaKey = `resume.edu.custom${item.id}.gpa`;
                      updateTrans(gpaKey, "en", "GPA: 9.0/10.0");
                      updateTrans(gpaKey, "pt", "Média: 9,0/10,0");
                      setEdu(updateItemAtIndex(edu, eIdx, { gpaKey }));
                    } else {
                      setEdu(
                        updateItemAtIndex(edu, eIdx, () => {
                          const { gpaKey: _, ...rest } = item;
                          return rest;
                        }),
                      );
                    }
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                  id={`gpa-check-${item.id}`}
                />
                <label
                  htmlFor={`gpa-check-${item.id}`}
                  className="text-xs text-gray-300 cursor-pointer select-none"
                >
                  Enable GPA Info
                </label>
              </div>

              {item.gpaKey && (
                <div className="grid md:grid-cols-2 gap-4 animate-fade-in pl-4 border-l border-white/10">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      GPA Info (English)
                    </label>
                    <input
                      type="text"
                      value={getTrans(item.gpaKey, "en")}
                      onChange={(e) =>
                        updateTrans(item.gpaKey!, "en", e.target.value)
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      GPA Info (Portuguese)
                    </label>
                    <input
                      type="text"
                      value={getTrans(item.gpaKey, "pt")}
                      onChange={(e) =>
                        updateTrans(item.gpaKey!, "pt", e.target.value)
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
              )}
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};
