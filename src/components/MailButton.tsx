import { Mail } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { PROFILE_CONFIG } from "../config/profile";

const MailButton = () => {
  return (
    <a
      href={`mailto:${PROFILE_CONFIG.emailContact}`}
      className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-black font-bold py-2 px-4 rounded-lg transition-colors"
    >
      <Mail size={20} aria-hidden="true" />
      <FormattedMessage id="mail.button.click" defaultMessage="Contact" />
    </a>
  );
};

export default MailButton;
