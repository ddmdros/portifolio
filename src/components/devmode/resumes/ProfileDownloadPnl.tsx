import { Download } from "lucide-react";

interface ProfileDownloadPnlProps {
  activeProfile: string;
  profiles: readonly { readonly id: string; readonly label: string }[];
}

export const ProfileDownloadPnl = ({
  activeProfile,
  profiles,
}: ProfileDownloadPnlProps) => {
  const profileLabel = profiles.find((p) => p.id === activeProfile)?.label || activeProfile;

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex-1 min-w-[200px] text-left">
        <h3 className="text-sm font-bold text-accent">Download PDF for this Profile</h3>
        <p className="text-xs text-gray-400 mt-1">
          Access the generated PDFs for the <strong>{profileLabel}</strong> profile.
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href={`/assets/resume_${activeProfile}_en.pdf`}
          download={`Resume_Diogo_Medeiros_${activeProfile}.pdf`}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 font-semibold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs select-none cursor-pointer"
        >
          <Download size={14} /> Download EN
        </a>
        <a
          href={`/assets/resume_${activeProfile}_pt.pdf`}
          download={`Curriculo_Diogo_Medeiros_${activeProfile}.pdf`}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 font-semibold py-2 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs select-none cursor-pointer"
        >
          <Download size={14} /> Download PT
        </a>
      </div>
    </div>
  );
};
