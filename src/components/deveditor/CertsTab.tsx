import { useState } from "react";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import { type CertificationType } from "../../types/certificationType";
import { updateItemAtIndex } from "../../utils/arrayUtils";

interface CertsTabProps {
  certs: CertificationType[];
  setCerts: React.Dispatch<React.SetStateAction<CertificationType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
  PROFILES: readonly { readonly id: string; readonly label: string }[];
  toggleProfile: (arr: string[] | undefined, profileId: string) => string[];
}

export const CertsTab = ({
  certs,
  setCerts,
  updateTrans,
  getTrans,
  PROFILES,
  toggleProfile,
}: CertsTabProps) => {
  const [certFilter, setCertFilter] = useState<string>("all");
  const homeCertsCount = certs.filter((c) => c.showOnHome).length;

  const existingOrgsEn = Array.from(
    new Set(certs.map((c) => getTrans(c.orgKey, "en")).filter(Boolean))
  ).sort();

  const existingOrgsPt = Array.from(
    new Set(certs.map((c) => getTrans(c.orgKey, "pt")).filter(Boolean))
  ).sort();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Certifications</h2>
          <p className="text-xs text-gray-400 mt-1">
            Feature up to 5 certifications on the homepage ({homeCertsCount}/5 selected)
          </p>
        </div>
      </div>

      {/* Dedicated Featured Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-accent">Homepage Highlights (Featured Certifications)</h3>
        <p className="text-xs text-gray-400">
          Select exactly up to 5 certifications to feature on the homepage.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {certs.map((c) => {
            const isChecked = c.showOnHome || false;
            const isDisabled = !isChecked && homeCertsCount >= 5;
            const certTitle = getTrans(c.titleKey, "en") || getTrans(c.titleKey, "pt") || c.titleKey;
            const certOrg = getTrans(c.orgKey, "en") || getTrans(c.orgKey, "pt") || c.orgKey;

            return (
              <label
                key={c.id}
                className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? "bg-accent/10 border-accent text-white"
                    : isDisabled
                      ? "bg-black/20 border-white/5 text-gray-500 cursor-not-allowed opacity-50"
                      : "bg-black/40 border-white/10 text-gray-300 hover:bg-black/60 hover:text-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) => {
                    const cIdx = certs.findIndex((x) => x.id === c.id);
                    if (cIdx !== -1) {
                      setCerts(
                        updateItemAtIndex(certs, cIdx, {
                          showOnHome: e.target.checked,
                        }),
                      );
                    }
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5"
                />
                <div className="text-xs">
                  <span className="font-semibold block">{certTitle}</span>
                  <span className="text-[10px] text-gray-400">{certOrg} ({c.year})</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Certifications Filter Tabs in Editor */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-3">
        {(
          [
            { id: "all", label: "All" },
            { id: "featured", label: "Featured" },
            { id: "ia_ml", label: "IA & ML" },
            { id: "back", label: "Backend" },
            { id: "frontend", label: "Frontend" },
            { id: "cloud", label: "Cloud & DevOps" },
            { id: "game_dev", label: "Game Dev" },
            { id: "fundamentos", label: "Fundamentos" },
            { id: "idiomas", label: "Idiomas" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCertFilter(tab.id)}
            className={`px-2.5 py-1 text-[10px] font-mono rounded-lg border transition-all cursor-pointer ${
              certFilter === tab.id
                ? "bg-accent border-accent text-black font-bold"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certs
          .filter((cert) => {
            if (certFilter === "all") return true;
            if (certFilter === "featured") return cert.showOnHome;
            return cert.category === certFilter;
          })
          .map((cert) => {
            const cIdx = certs.findIndex((c) => c.id === cert.id);
            const categoryHighlightsCount = certs.filter(
              (c) => c.category === cert.category && c.sectionHighlight
            ).length;
            const isHighlightDisabled = !cert.sectionHighlight && categoryHighlightsCount >= 3;

            const titleEn = getTrans(cert.titleKey, "en").trim();
            const orgEn = getTrans(cert.orgKey, "en").trim();
            const isPlaceholder = (titleEn.toLowerCase() === "new certification name" || titleEn === "") &&
                                  (orgEn.toLowerCase() === "issuer org" || orgEn === "");

            const isDuplicate = !isPlaceholder && certs.some(
              (c) => {
                if (c.id === cert.id) return false;

                // Match credential Url (English)
                if (cert.credentialUrl && c.credentialUrl === cert.credentialUrl) return true;
                // Match credential Url (Portuguese)
                if (cert.credentialUrlPt && c.credentialUrlPt === cert.credentialUrlPt) return true;

                const cTitleEn = getTrans(c.titleKey, "en").trim();
                const cOrgEn = getTrans(c.orgKey, "en").trim();
                const cIsPlaceholder = (cTitleEn.toLowerCase() === "new certification name" || cTitleEn === "") &&
                                       (cOrgEn.toLowerCase() === "issuer org" || cOrgEn === "");
                if (cIsPlaceholder) return false;

                // Match English name + org + year
                if (
                  titleEn.toLowerCase() === cTitleEn.toLowerCase() &&
                  orgEn.toLowerCase() === cOrgEn.toLowerCase() &&
                  cert.year === c.year
                ) {
                  return true;
                }

                // Match Portuguese name + org + year
                const titlePt = getTrans(cert.titleKey, "pt").trim().toLowerCase();
                const cTitlePt = getTrans(c.titleKey, "pt").trim().toLowerCase();
                const orgPt = getTrans(cert.orgKey, "pt").trim().toLowerCase();
                const cOrgPt = getTrans(c.orgKey, "pt").trim().toLowerCase();

                if (
                  titlePt && titlePt === cTitlePt &&
                  orgPt && orgPt === cOrgPt &&
                  cert.year === c.year
                ) {
                  return true;
                }

                return false;
              }
            );
            return (
              <div
                key={cert.id}
                className={`border p-5 rounded-2xl bg-white/5/20 space-y-4 transition-all ${
                  cert.sectionHighlight
                    ? "border-amber-500/30 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                    : "border-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500">
                    ID: {cert.id}
                  </span>
                  <button
                    onClick={() => setCerts(certs.filter((c) => c.id !== cert.id))}
                    className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {isDuplicate && (
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-semibold animate-pulse">
                    <AlertTriangle size={12} className="shrink-0" />
                    Possible duplicate certification detected! (Same URL or same name/org/year)
                  </div>
                )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Name (English)
                </label>
                <input
                  type="text"
                  value={getTrans(cert.titleKey, "en")}
                  onChange={(e) =>
                    updateTrans(cert.titleKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Name (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(cert.titleKey, "pt")}
                  onChange={(e) =>
                    updateTrans(cert.titleKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Org (English)
                </label>
                <input
                  type="text"
                  list={`org-en-list-${cert.id}`}
                  value={getTrans(cert.orgKey, "en")}
                  onChange={(e) =>
                    updateTrans(cert.orgKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  placeholder="Type or select..."
                />
                <datalist id={`org-en-list-${cert.id}`}>
                  {existingOrgsEn.map((org) => (
                    <option key={org} value={org} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Org (Portuguese)
                </label>
                <input
                  type="text"
                  list={`org-pt-list-${cert.id}`}
                  value={getTrans(cert.orgKey, "pt")}
                  onChange={(e) =>
                    updateTrans(cert.orgKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  placeholder="Escreva ou selecione..."
                />
                <datalist id={`org-pt-list-${cert.id}`}>
                  {existingOrgsPt.map((org) => (
                    <option key={org} value={org} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => {
                    setCerts(updateItemAtIndex(certs, cIdx, { year: e.target.value }));
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Hours (Optional)
                </label>
                <input
                  type="text"
                  value={cert.hours || ""}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        hours: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                  placeholder="e.g. 40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={cert.category}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        category: e.target.value as CertificationType["category"],
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ia_ml">IA & ML</option>
                  <option value="back">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="game_dev">Game Development</option>
                  <option value="fundamentos">Fundamentos</option>
                  <option value="idiomas">Idiomas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (English / Default)
                </label>
                <input
                  type="text"
                  value={cert.credentialUrl || ""}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        credentialUrl: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (Portuguese)
                </label>
                <input
                  type="text"
                  value={cert.credentialUrlPt || ""}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        credentialUrlPt: e.target.value || undefined,
                      }),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Profile Selection */}
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
                        cert.showInResume?.includes(profile.id) || false
                      }
                      onChange={() => {
                        setCerts(
                          updateItemAtIndex(certs, cIdx, {
                            showInResume: toggleProfile(
                              cert.showInResume,
                              profile.id,
                            ),
                          }),
                        );
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    {profile.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Section Highlight (Pin to Top) */}
            <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-center">
              <label
                className={`flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer ${
                  isHighlightDisabled ? "text-gray-500 cursor-not-allowed" : "text-amber-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={cert.sectionHighlight || false}
                  disabled={isHighlightDisabled}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        sectionHighlight: e.target.checked,
                      }),
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-amber-500 focus:ring-amber-500 disabled:opacity-50"
                />
                Pin as Section Highlight (Max 3 per category)
              </label>
              {isHighlightDisabled && (
                <span className="text-[10px] text-amber-500/70 font-mono">
                  Limit of 3 reached
                </span>
              )}
            </div>

            {/* Homepage Featured Selection */}
          </div>
        );
      })}
    </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => {
            const newId = (certs.length + 1).toString();
            const titleKey = `resume.cert.custom${newId}.title`;
            const orgKey = `resume.cert.custom${newId}.org`;
            updateTrans(titleKey, "en", "New Certification Name");
            updateTrans(titleKey, "pt", "Nome da Nova Certificação");
            updateTrans(orgKey, "en", "Issuer Org");
            updateTrans(orgKey, "pt", "Org Emissora");

            const defaultCategory = [
              "ia_ml",
              "back",
              "frontend",
              "cloud",
              "game_dev",
              "fundamentos",
              "idiomas",
            ].includes(certFilter)
              ? (certFilter as CertificationType["category"])
              : "cloud";

            const defaultShowOnHome = certFilter === "featured";

            setCerts([
              ...certs,
              {
                id: newId,
                titleKey,
                orgKey,
                year: new Date().getFullYear().toString(),
                showInResume: [],
                category: defaultCategory,
                credentialUrl: "",
                credentialUrlPt: "",
                showOnHome: defaultShowOnHome,
              },
            ]);
          }}
          className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 text-accent font-bold px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          <Plus size={14} /> Add Certification
        </button>
      </div>
    </div>
  );
};
