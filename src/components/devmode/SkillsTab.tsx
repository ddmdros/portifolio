import React from "react";
import { type SkillType } from "../../content/SkillsData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput } from "./DevModeInputs";

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
  const dragState = useDragAndDrop(skills, setSkills);

  const handleAdd = () => {
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
  };

  return (
    <DevModeTabPanel
      title="Manage Skills & Languages"
      description="Manage your tech stack categories and language proficiencies."
      items={skills}
      onAdd={handleAdd}
      onDelete={(id) => setSkills(skills.filter((x) => x.id !== id))}
      addButtonLabel="Add Skill/Language"
      emptyMessage="No skills found. Click 'Add Skill/Language' to create one."
      dragState={dragState}
      renderCardHeader={(item) => (
        <div className="flex items-center gap-2">
          <span>{item.name || "New Skill"}</span>
          <span className="text-xs font-mono text-gray-500 font-normal">
            (ID: {item.id})
          </span>
        </div>
      )}
      renderCardDetails={(item) => {
        const sIdx = skills.findIndex((x) => x.id === item.id);
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Name / Tech Tag
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    setSkills(
                      updateItemAtIndex(skills, sIdx, { name: e.target.value })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={item.categoryKey}
                  onChange={(e) => {
                    setSkills(
                      updateItemAtIndex(skills, sIdx, {
                        categoryKey: e.target.value,
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
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
            {item.categoryKey === "resume.skills.languages" && (
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
                      value={item.resumeDetailsKey || ""}
                      onChange={(e) => {
                        const k =
                          e.target.value ||
                          `resume.skills.languages.${item.name.toLowerCase()}`;
                        updateTrans(k, "en", "English C2 (example)");
                        updateTrans(k, "pt", "Inglês C2 (exemplo)");
                        setSkills(
                          updateItemAtIndex(skills, sIdx, {
                            resumeDetailsKey: k,
                          })
                        );
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:border-accent focus:outline-none"
                      placeholder="e.g. resume.skills.languages.english"
                    />
                  </div>
                  {item.resumeDetailsKey && (
                    <div className="pl-4 border-l border-white/10 animate-fade-in flex-1">
                      <TranslatedTextInput
                        labelEn="Resume Details (English)"
                        labelPt="Resume Details (Portuguese)"
                        translationKey={item.resumeDetailsKey}
                        updateTrans={updateTrans}
                        getTrans={getTrans}
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
                      value={item.credentialUrl || ""}
                      onChange={(e) => {
                        setSkills(
                          updateItemAtIndex(skills, sIdx, {
                            credentialUrl: e.target.value || undefined,
                          })
                        );
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:border-accent focus:outline-none"
                      placeholder="e.g. https://www.efset.org/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Certificate Text Key (optional)
                    </label>
                    <input
                      type="text"
                      value={item.certTextKey || ""}
                      onChange={(e) => {
                        const k =
                          e.target.value ||
                          `resume.skills.languages.${item.name.toLowerCase()}.cert`;
                        updateTrans(k, "en", "EFL certificate");
                        updateTrans(k, "pt", "EFL certificado");
                        setSkills(
                          updateItemAtIndex(skills, sIdx, {
                            certTextKey: k,
                          })
                        );
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:border-accent focus:outline-none"
                      placeholder="e.g. resume.skills.languages.english.cert"
                    />
                  </div>
                </div>

                {item.certTextKey && (
                  <div className="pl-4 border-l border-white/10 animate-fade-in">
                    <TranslatedTextInput
                      labelEn="Certificate Text (English)"
                      labelPt="Certificate Text (Portuguese)"
                      translationKey={item.certTextKey}
                      updateTrans={updateTrans}
                      getTrans={getTrans}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        );
      }}
    />
  );
};

