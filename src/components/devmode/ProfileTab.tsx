interface ProfileConfigType {
  name: string;
  emailContact: string;
  emailResume: string;
  githubUrl: string;
  githubUser: string;
  linkedinUrl: string;
  linkedinUser: string;
  portfolioUrl: string;
  googleSkillsProfile: string;
  availableCvDownloads: string[];
}

interface ProfileTabProps {
  profileConfig: ProfileConfigType;
  setProfileConfig: React.Dispatch<React.SetStateAction<ProfileConfigType>>;
}

export const ProfileTab = ({
  profileConfig,
  setProfileConfig,
}: ProfileTabProps) => {
  const handleChange = (key: keyof ProfileConfigType, value: string) => {
    setProfileConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h2 className="text-xl font-bold text-white">
          CV & Portfolio Identity Links
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Configure the main URLs, emails, and usernames linked inside the PDF resume headers, contact lists, and social buttons.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Information Section */}
        <div className="space-y-4 border border-white/5 p-5 rounded-2xl bg-white/5/10">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
            Basic Profile Information
          </h3>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              value={profileConfig.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400">
              Portfolio URL
            </label>
            <input
              type="text"
              value={profileConfig.portfolioUrl || ""}
              onChange={(e) => handleChange("portfolioUrl", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
            />
          </div>
        </div>

        {/* Email Addresses Section */}
        <div className="space-y-4 border border-white/5 p-5 rounded-2xl bg-white/5/10">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
            Contact Emails
          </h3>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400">
              Contact Form Email
            </label>
            <input
              type="email"
              value={profileConfig.emailContact || ""}
              onChange={(e) => handleChange("emailContact", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
            />
            <p className="text-[10px] text-gray-500">
              Used when visitors send messages from the online contact form.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-400">
              CV Header Email
            </label>
            <input
              type="email"
              value={profileConfig.emailResume || ""}
              onChange={(e) => handleChange("emailResume", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
            />
            <p className="text-[10px] text-gray-500">
              Printed on the top header of all generated CV profiles.
            </p>
          </div>
        </div>

        {/* Social Accounts Section */}
        <div className="md:col-span-2 space-y-4 border border-white/5 p-5 rounded-2xl bg-white/5/10">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
            Professional Profile Connections & Links
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400">
                GitHub Full URL
              </label>
              <input
                type="text"
                value={profileConfig.githubUrl || ""}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400">
                GitHub Username
              </label>
              <input
                type="text"
                value={profileConfig.githubUser || ""}
                onChange={(e) => handleChange("githubUser", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400">
                LinkedIn Full URL
              </label>
              <input
                type="text"
                value={profileConfig.linkedinUrl || ""}
                onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400">
                LinkedIn Username
              </label>
              <input
                type="text"
                value={profileConfig.linkedinUser || ""}
                onChange={(e) => handleChange("linkedinUser", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-semibold text-gray-400">
                Google Skills Profile URL
              </label>
              <input
                type="text"
                value={profileConfig.googleSkillsProfile || ""}
                onChange={(e) => handleChange("googleSkillsProfile", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent/40 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
