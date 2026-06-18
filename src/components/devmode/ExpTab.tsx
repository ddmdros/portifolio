import React from "react";
import { type ExperienceType } from "../../content/ExperienceData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput, CustomLinkFields, BulletPointsEditor } from "./DevModeInputs";

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

            <BulletPointsEditor
              item={item}
              items={exp}
              setItems={setExp}
              updateTrans={updateTrans}
              getTrans={getTrans}
              bulletKeyPrefix={`resume.exp.custom${item.id}.bullet`}
              label="CV Description Bullets"
            />
          </>
        );
      }}
    />
  );
};


