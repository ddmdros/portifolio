import { Plus, Trash2 } from "lucide-react";
import { type SkillType } from "../../content/SkillsData";

interface SkillsTabProps {
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  PROFILES: readonly { readonly id: string; readonly label: string }[];
  toggleProfile: (arr: string[] | undefined, profileId: string) => string[];
}

export const SkillsTab = ({
  skills,
  setSkills,
  updateTrans,
  getTrans,
  PROFILES,
  toggleProfile,
}: SkillsTabProps) => {
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
            className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-gray-500">
                ID: {skill.id}
              </span>
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
                    const updated = { ...skill, name: e.target.value };
                    setSkills(
                      skills.map((s, idx) => (idx === sIdx ? updated : s)),
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
                    const updated = { ...skill, categoryKey: e.target.value };
                    setSkills(
                      skills.map((s, idx) => (idx === sIdx ? updated : s)),
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

            <div className="border-t border-white/5 pt-2">
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
                        skill.showInResume?.includes(profile.id) || false
                      }
                      onChange={() => {
                        const updated = {
                          ...skill,
                          showInResume: toggleProfile(
                            skill.showInResume,
                            profile.id,
                          ),
                        };
                        setSkills(
                          skills.map((s, idx) => (idx === sIdx ? updated : s)),
                        );
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    {profile.label}
                  </label>
                ))}
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
                        const updated = {
                          ...skill,
                          resumeDetailsKey: k,
                        };
                        setSkills(
                          skills.map((s, idx) => (idx === sIdx ? updated : s)),
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
                        const updated = {
                          ...skill,
                          credentialUrl: e.target.value || undefined,
                        };
                        setSkills(
                          skills.map((s, idx) => (idx === sIdx ? updated : s)),
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
                        const updated = {
                          ...skill,
                          certTextKey: k,
                        };
                        setSkills(
                          skills.map((s, idx) => (idx === sIdx ? updated : s)),
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
