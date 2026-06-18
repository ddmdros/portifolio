

interface ProfileCustomTextsProps {
  activeProfile: string;
  getTrans: (key: string, lang: "en" | "pt") => string;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
}

export const ProfileCustomTexts = ({
  activeProfile,
  getTrans,
  updateTrans,
}: ProfileCustomTextsProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-accent text-left">Profile Custom Texts</h3>
      <p className="text-xs text-gray-400 text-left">
        Customize the job title, professional goal, and description for this CV profile (used in PDF rendering).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Header/Title Input */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-300">Job Title / Header</h4>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">English</label>
            <input
              type="text"
              value={getTrans(`resume.profile.${activeProfile}.header`, "en")}
              onChange={(e) =>
                updateTrans(`resume.profile.${activeProfile}.header`, "en", e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              placeholder="e.g. Backend Engineer"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
            <input
              type="text"
              value={getTrans(`resume.profile.${activeProfile}.header`, "pt")}
              onChange={(e) =>
                updateTrans(`resume.profile.${activeProfile}.header`, "pt", e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              placeholder="Ex: Engenheiro Backend"
            />
          </div>
        </div>

        {/* Goal Input */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-300">Professional Goal / Objetivo</h4>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">English</label>
            <textarea
              value={getTrans(`resume.profile.${activeProfile}.goal`, "en")}
              onChange={(e) =>
                updateTrans(`resume.profile.${activeProfile}.goal`, "en", e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none focus:border-accent focus:outline-none"
              placeholder="Enter professional goal..."
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
            <textarea
              value={getTrans(`resume.profile.${activeProfile}.goal`, "pt")}
              onChange={(e) =>
                updateTrans(`resume.profile.${activeProfile}.goal`, "pt", e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none focus:border-accent focus:outline-none"
              placeholder="Escreva o objetivo profissional..."
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-300">Profile Description / Resumo</h4>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">English</label>
            <textarea
              value={getTrans(`resume.profile.${activeProfile}.description`, "en")}
              onChange={(e) =>
                updateTrans(`resume.profile.${activeProfile}.description`, "en", e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none focus:border-accent focus:outline-none"
              placeholder={
                getTrans("portifolio.description", "en") || "Enter profile summary..."
              }
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
            <textarea
              value={getTrans(`resume.profile.${activeProfile}.description`, "pt")}
              onChange={(e) =>
                updateTrans(`resume.profile.${activeProfile}.description`, "pt", e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white h-20 resize-none focus:border-accent focus:outline-none"
              placeholder={
                getTrans("portifolio.description", "pt") || "Escreva o resumo do perfil..."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
