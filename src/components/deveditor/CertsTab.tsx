import { Plus, Trash2 } from "lucide-react";
import { type CertificationType } from "../../types/certificationType";

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
  const homeCertsCount = certs.filter((c) => c.showOnHome).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Certifications</h2>
          <p className="text-xs text-gray-400 mt-1">
            Feature up to 5 certifications on the homepage ({homeCertsCount}/5 selected)
          </p>
        </div>
        <button
          onClick={() => {
            const newId = (certs.length + 1).toString();
            const titleKey = `resume.cert.custom${newId}.title`;
            const orgKey = `resume.cert.custom${newId}.org`;
            updateTrans(titleKey, "en", "New Certification Name");
            updateTrans(titleKey, "pt", "Nome da Nova Certificação");
            updateTrans(orgKey, "en", "Issuer Org");
            updateTrans(orgKey, "pt", "Org Emissora");

            setCerts([
              ...certs,
              {
                id: newId,
                titleKey,
                orgKey,
                year: new Date().getFullYear().toString(),
                showInResume: [],
                category: "cloud",
                credentialUrl: "",
                credentialUrlEn: "",
                credentialUrlPt: "",
                showOnHome: false,
              },
            ]);
          }}
          className="flex items-center gap-1 text-xs bg-white/5 border border-white/10 text-accent font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          <Plus size={14} /> Add Certification
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((cert, cIdx) => (
          <div
            key={cert.id}
            className="border border-white/5 p-5 rounded-2xl bg-white/5/20 space-y-4"
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
                  value={getTrans(cert.orgKey, "en")}
                  onChange={(e) =>
                    updateTrans(cert.orgKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Org (Portuguese)
                </label>
                <input
                  type="text"
                  value={getTrans(cert.orgKey, "pt")}
                  onChange={(e) =>
                    updateTrans(cert.orgKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => {
                    const updated = { ...cert, year: e.target.value };
                    setCerts(
                      certs.map((c, idx) => (idx === cIdx ? updated : c)),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={cert.category}
                  onChange={(e) => {
                    const updated = { ...cert, category: e.target.value };
                    setCerts(
                      certs.map((c, idx) => (idx === cIdx ? updated : c)),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ia_ml">IA & ML</option>
                  <option value="back">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="idiomas">Idiomas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (Default)
                </label>
                <input
                  type="text"
                  value={cert.credentialUrl || ""}
                  onChange={(e) => {
                    const updated = {
                      ...cert,
                      credentialUrl: e.target.value || undefined,
                    };
                    setCerts(
                      certs.map((c, idx) => (idx === cIdx ? updated : c)),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (English)
                </label>
                <input
                  type="text"
                  value={cert.credentialUrlEn || ""}
                  onChange={(e) => {
                    const updated = {
                      ...cert,
                      credentialUrlEn: e.target.value || undefined,
                    };
                    setCerts(
                      certs.map((c, idx) => (idx === cIdx ? updated : c)),
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (Portuguese)
                </label>
                <input
                  type="text"
                  value={cert.credentialUrlPt || ""}
                  onChange={(e) => {
                    const updated = {
                      ...cert,
                      credentialUrlPt: e.target.value || undefined,
                    };
                    setCerts(
                      certs.map((c, idx) => (idx === cIdx ? updated : c)),
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
                        const updated = {
                          ...cert,
                          showInResume: toggleProfile(
                            cert.showInResume,
                            profile.id,
                          ),
                        };
                        setCerts(
                          certs.map((c, idx) => (idx === cIdx ? updated : c)),
                        );
                      }}
                      className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                    />
                    {profile.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Homepage Featured Selection */}
            <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-center">
              <label
                className={`flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none ${
                  !cert.showOnHome && homeCertsCount >= 5
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-accent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={cert.showOnHome || false}
                  disabled={!cert.showOnHome && homeCertsCount >= 5}
                  onChange={(e) => {
                    const updated = {
                      ...cert,
                      showOnHome: e.target.checked,
                    };
                    setCerts(
                      certs.map((c, idx) => (idx === cIdx ? updated : c)),
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent disabled:opacity-50"
                />
                Show on Home Page
              </label>
              {!cert.showOnHome && homeCertsCount >= 5 && (
                <span className="text-[10px] text-red-400/80 font-mono">
                  Limit of 5 reached
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
