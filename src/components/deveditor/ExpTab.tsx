import { Plus, Trash2 } from "lucide-react";
import { type ExperienceType } from "../../content/ExperienceData";

interface ExpTabProps {
  exp: ExperienceType[];
  setExp: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  PROFILES: readonly { readonly id: string; readonly label: string }[];
  toggleProfile: (arr: string[] | undefined, profileId: string) => string[];
}

export const ExpTab = ({
  exp,
  setExp,
  updateTrans,
  getTrans,
  PROFILES,
  toggleProfile,
}: ExpTabProps) => {
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
            className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-gray-500">
                ID: {item.id}
              </span>
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
                    const updated = {
                      ...item,
                      portfolioUrlKey: e.target.value || undefined,
                    };
                    setExp(
                      exp.map((x, idx) => (idx === eIdx ? updated : x)),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  placeholder="e.g. resume.project.starrCorp.link"
                />
              </div>
              {item.portfolioUrlKey && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Link Text (English)
                    </label>
                    <input
                      type="text"
                      value={getTrans(item.portfolioUrlKey, "en")}
                      onChange={(e) =>
                        updateTrans(item.portfolioUrlKey!, "en", e.target.value)
                      }
                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                      Link Text (Portuguese)
                    </label>
                    <input
                      type="text"
                      value={getTrans(item.portfolioUrlKey, "pt")}
                      onChange={(e) =>
                        updateTrans(item.portfolioUrlKey!, "pt", e.target.value)
                      }
                      className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              )}
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
                      checked={item.showInResume?.includes(profile.id) || false}
                      onChange={() => {
                        const updated = {
                          ...item,
                          showInResume: toggleProfile(
                            item.showInResume,
                            profile.id,
                          ),
                        };
                        setExp(
                          exp.map((ex, idx) =>
                            idx === eIdx ? updated : ex,
                          ),
                        );
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    {profile.label}
                  </label>
                ))}
              </div>
            </div>

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

                    const updated = {
                      ...item,
                      descKeys: [...(item.descKeys || []), bulletKey],
                    };
                    setExp(
                      exp.map((x, idx) => (idx === eIdx ? updated : x)),
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
                          const updated = {
                            ...item,
                            descKeys:
                              item.descKeys?.filter((k) => k !== bKey) || [],
                          };
                          setExp(
                            exp.map((x, idx) => (idx === eIdx ? updated : x)),
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
