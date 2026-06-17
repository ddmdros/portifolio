interface TranslationsTabProps {
  enMessages: Record<string, string>;
  ptbrMessages: Record<string, string>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
}

export const TranslationsTab = ({
  enMessages,
  ptbrMessages,
  updateTrans,
}: TranslationsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white pb-4 border-b border-white/5">
        Global Localization Keys
      </h2>
      <p className="text-xs text-gray-400">
        Edit general texts like headers, LGPD compliance text, goal section, etc. below:
      </p>

      <div className="space-y-4 max-h-175 overflow-y-auto pr-2">
        {[
          { key: "resume.goal", label: "CV Professional Goal" },
          { key: "resume.lgpd", label: "LGPD Compliance Text" },
          { key: "resume.updated", label: "Updated Date Footer" },
          { key: "resume.download", label: "Download Button Label" },
          { key: "resume.title", label: "Resume Page Title" },
        ].map((item) => (
          <div
            key={item.key}
            className="border border-white/5 p-4 rounded-xl bg-white/5/20 space-y-3"
          >
            <span className="text-sm font-semibold text-accent">
              {item.label}{" "}
              <code className="text-xs text-gray-500 font-mono">
                ({item.key})
              </code>
            </span>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-400 mb-1">
                  English
                </label>
                <textarea
                  rows={2}
                  value={enMessages[item.key] || ""}
                  onChange={(e) =>
                    updateTrans(item.key, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1">
                  Portuguese
                </label>
                <textarea
                  rows={2}
                  value={ptbrMessages[item.key] || ""}
                  onChange={(e) =>
                    updateTrans(item.key, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
