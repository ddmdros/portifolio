import React from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { type ExperienceType } from "../../content/ExperienceData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

interface ExpTabProps {
  exp: ExperienceType[];
  setExp: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const ExpTab = ({
  exp,
  setExp,
  updateTrans,
  getTrans,
}: ExpTabProps) => {
  const {
    draggedId,
    dragOverId,
    canDragId,
    setCanDragId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(exp, setExp);

  return (
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
                showInResume: [],
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
                onClick={() => setExp(exp.filter((x) => x.id !== item.id))}
                className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Job Title (English)
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
                  Job Title (Portuguese)
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
                  Company (English)
                </label>
                <input
                  type="text"
                  value={getTrans(item.companyKey, "en")}
                  onChange={(e) =>
                    updateTrans(item.companyKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Company (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(item.companyKey, "pt")}
                  onChange={(e) =>
                    updateTrans(item.companyKey, "pt", e.target.value)
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

            <div className="grid md:grid-cols-2 gap-4 border-t border-white/5 pt-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Portfolio Link Description Key (Optional)
                </label>
                <input
                  type="text"
                  value={item.portfolioUrlKey || ""}
                  onChange={(e) => {
                    setExp(
                      updateItemAtIndex(exp, eIdx, {
                        portfolioUrlKey: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. resume.project.starrCorp.link"
                />
              </div>
              {item.portfolioUrlKey && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Description Text (English)
                    </label>
                    <input
                      type="text"
                      value={getTrans(item.portfolioUrlKey, "en")}
                      onChange={(e) =>
                        updateTrans(item.portfolioUrlKey!, "en", e.target.value)
                      }
                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Description Text (Portuguese)
                    </label>
                    <input
                      type="text"
                      value={getTrans(item.portfolioUrlKey, "pt")}
                      onChange={(e) =>
                        updateTrans(item.portfolioUrlKey!, "pt", e.target.value)
                      }
                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Custom URL and Custom Text Key fields */}
            <div className="grid md:grid-cols-2 gap-4 border-t border-white/5 pt-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Custom Clickable Link URL (Optional - default: LinkedIn URL)
                </label>
                <input
                  type="text"
                  value={item.linkUrl || ""}
                  onChange={(e) => {
                    setExp(
                      updateItemAtIndex(exp, eIdx, {
                        linkUrl: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. https://github.com/ddmdros/starr-corp"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Custom Clickable Link Text Key (Optional - default: "here" / "aqui")
                </label>
                <input
                  type="text"
                  value={item.linkTextKey || ""}
                  onChange={(e) => {
                    const nextKey = e.target.value || undefined;
                    // If a text key is set but not defined in translations, initialize it.
                    if (nextKey && !getTrans(nextKey, "en") && !getTrans(nextKey, "pt")) {
                      updateTrans(nextKey, "en", "here");
                      updateTrans(nextKey, "pt", "aqui");
                    }
                    setExp(
                      updateItemAtIndex(exp, eIdx, {
                        linkTextKey: nextKey,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. resume.link.starrCorp.text"
                />
              </div>
            </div>

            {item.linkTextKey && (
              <div className="grid md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Clickable Link Text (English)
                  </label>
                  <input
                    type="text"
                    value={getTrans(item.linkTextKey, "en")}
                    onChange={(e) =>
                      updateTrans(item.linkTextKey!, "en", e.target.value)
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Clickable Link Text (Portuguese)
                  </label>
                  <input
                    type="text"
                    value={getTrans(item.linkTextKey, "pt")}
                    onChange={(e) =>
                      updateTrans(item.linkTextKey!, "pt", e.target.value)
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            )}




            {/* Description/Bullets points */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-accent">
                  CV Description Bullets
                </span>
                <button
                  onClick={() => {
                    const bulletId = item.descKeys
                      ? item.descKeys.length + 1
                      : 1;
                    const bulletKey = `resume.exp.custom${item.id}.bullet${bulletId}`;
                    updateTrans(bulletKey, "en", "New bullet text (English)");
                    updateTrans(bulletKey, "pt", "Texto do marcador (Português)");

                    setExp(
                      updateItemAtIndex(exp, eIdx, {
                        descKeys: [...(item.descKeys || []), bulletKey],
                      }),
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
                          setExp(
                            updateItemAtIndex(exp, eIdx, {
                              descKeys:
                                item.descKeys?.filter((k) => k !== bKey) || [],
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
                      />
                      <input
                        type="text"
                        value={getTrans(bKey, "pt")}
                        onChange={(e) =>
                          updateTrans(bKey, "pt", e.target.value)
                        }
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
  );
};
