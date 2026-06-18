import React from "react";
import { PROFILE_CONFIG } from "../../../config/profile";

interface ProfilePublishToggleProps {
  activeProfile: string;
  profileConfig: typeof PROFILE_CONFIG;
  setProfileConfig: React.Dispatch<React.SetStateAction<typeof PROFILE_CONFIG>>;
}

export const ProfilePublishToggle = ({
  activeProfile,
  profileConfig,
  setProfileConfig,
}: ProfilePublishToggleProps) => {
  const isChecked = profileConfig.availableCvDownloads?.includes(activeProfile) || false;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentDownloads = profileConfig.availableCvDownloads || [];
    const updated = e.target.checked
      ? [...currentDownloads, activeProfile]
      : currentDownloads.filter((x) => x !== activeProfile);
    setProfileConfig((prev) => ({ ...prev, availableCvDownloads: updated }));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex-1 min-w-[200px] text-left">
        <h3 className="text-sm font-bold text-accent">Disponibilizar para Download Público</h3>
        <p className="text-xs text-gray-400 mt-1">
          Se ativado, este currículo estará disponível para download no portfólio publicado (modo público).
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-5 h-5 cursor-pointer"
          id="public-download-checkbox"
        />
        <label
          htmlFor="public-download-checkbox"
          className="text-xs text-gray-300 cursor-pointer select-none font-semibold"
        >
          Disponibilizar no Portfólio
        </label>
      </div>
    </div>
  );
};
