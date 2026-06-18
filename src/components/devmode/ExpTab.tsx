import React from "react";
import { Plus } from "lucide-react";
import { type ExperienceType } from "../../content/ExperienceData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput, CustomLinkFields } from "./DevModeInputs";

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
  const dragState = useDragAndDrop(exp, setExp);

  const handleAdd = () => {
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
  };

  return (
    <DevModeTabPanel
      title="Manage Experience"
      description="Manage your job history, companies, and roles for the CV."
      items={exp}
      onAdd={handleAdd}
      onDelete={(id) => setExp(exp.filter((x) => x.id !== id))}
      addButtonLabel="Add Experience"
      emptyMessage="No experience items found. Click 'Add Experience' to create one."
      dragState={dragState}
      renderCardHeader={(item) => {
        const title = getTrans(item.titleKey, "en") || "New Experience";
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
        const eIdx = exp.findIndex((x) => x.id === item.id);
        return (
          <>
            <TranslatedTextInput
              labelEn="Job Title (English)"
              labelPt="Job Title (Portuguese)"
              translationKey={item.titleKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Company (English)"
              labelPt="Company (Portuguese)"
              translationKey={item.companyKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Date / Period (English)"
              labelPt="Date / Period (Portuguese)"
              translationKey={item.dateKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

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
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. resume.project.starrCorp.link"
                />
              </div>
              {item.portfolioUrlKey && (
                <div className="pl-4 border-l border-white/10 animate-fade-in">
                  <TranslatedTextInput
                    labelEn="Description Text (English)"
                    labelPt="Description Text (Portuguese)"
                    translationKey={item.portfolioUrlKey}
                    updateTrans={updateTrans}
                    getTrans={getTrans}
                  />
                </div>
              )}
            </div>

            <CustomLinkFields
              item={item}
              items={exp}
              setItems={setExp}
              updateTrans={updateTrans}
              getTrans={getTrans}
              urlLabel="Custom Clickable Link URL (Optional - default: LinkedIn URL)"
              urlPlaceholder="e.g. https://github.com/ddmdros/starr-corp"
              textKeyPlaceholder="e.g. resume.link.starrCorp.text"
            />

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
                          setExp(
                            updateItemAtIndex(exp, eIdx, {
                              descKeys:
                                item.descKeys?.filter((k) => k !== bKey) || [],
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
          </>
        );
      }}
    />
  );
};


