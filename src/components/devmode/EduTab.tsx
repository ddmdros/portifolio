import React from "react";
import { type EducationType } from "../../content/EducationData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput } from "./DevModeInputs";

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
  const dragState = useDragAndDrop(edu, setEdu);

  const handleAdd = () => {
    const newId = `custom-edu-${Date.now()}`;
    const titleKey = `resume.edu.custom${newId}.title`;
    const instKey = `resume.edu.custom${newId}.inst`;
    const dateKey = `resume.edu.custom${newId}.date`;

    updateTrans(titleKey, "en", "New Degree Name");
    updateTrans(titleKey, "pt", "Novo Nome do Diploma/Curso");
    updateTrans(instKey, "en", "Institution Name");
    updateTrans(instKey, "pt", "Nome da Instituição");
    updateTrans(dateKey, "en", "Period (e.g. 2023 - 2026)");
    updateTrans(dateKey, "pt", "Período (Ex: 2023 - 2026)");

    setEdu([
      ...edu,
      {
        id: newId,
        titleKey,
        instKey,
        dateKey,
        showInResume: [],
        showInPortfolio: true,
      },
    ]);
  };

  return (
    <DevModeTabPanel
      title="Education History"
      description="Manage your schools, degrees, and study dates for the CV."
      items={edu}
      onAdd={handleAdd}
      onDelete={(id) => setEdu(edu.filter((x) => x.id !== id))}
      addButtonLabel="Add Education"
      emptyMessage="No education items found. Click 'Add Education' to create one."
      dragState={dragState}
      renderCardHeader={(item) => {
        const title = getTrans(item.titleKey, "en") || "New Education";
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
        const eIdx = edu.findIndex((x) => x.id === item.id);
        return (
          <>
            <TranslatedTextInput
              labelEn="Degree (English)"
              labelPt="Degree (Portuguese)"
              translationKey={item.titleKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Institution (English)"
              labelPt="Institution (Portuguese)"
              translationKey={item.instKey}
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
                          const rest = { ...item };
                          delete rest.gpaKey;
                          return rest;
                        })
                      );
                    }
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                  id={`gpa-check-${item.id}`}
                />
                <label
                  htmlFor={`gpa-check-${item.id}`}
                  className="text-xs text-gray-300 cursor-pointer select-none font-semibold"
                >
                  Enable GPA Info
                </label>
              </div>

              {item.gpaKey && (
                <div className="pl-4 border-l border-white/10 animate-fade-in">
                  <TranslatedTextInput
                    labelEn="GPA Info (English)"
                    labelPt="GPA Info (Portuguese)"
                    translationKey={item.gpaKey}
                    updateTrans={updateTrans}
                    getTrans={getTrans}
                  />
                </div>
              )}

              <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                <input
                  type="checkbox"
                  checked={item.showInPortfolio !== false}
                  onChange={(e) => {
                    setEdu(
                      updateItemAtIndex(edu, eIdx, {
                        showInPortfolio: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                  id={`portfolio-check-${item.id}`}
                />
                <label
                  htmlFor={`portfolio-check-${item.id}`}
                  className="text-xs text-gray-300 cursor-pointer select-none font-semibold"
                >
                  Exibir no Portfólio (Linha do tempo)
                </label>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

