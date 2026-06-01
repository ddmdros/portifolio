import { Mail } from "lucide-react";
import { FormattedMessage } from "react-intl";

const MailButton = () => {
  return (
    <a href="mailto:diogomedeirostranslation@gmail.com">
      <button className="flex items-center border border-accent text-accent hover:bg-accent hover:text-black font-bold hover:cursor-pointer py-2 px-4 rounded-lg transition-all">
        <Mail size={20} className="mr-2" />
        <FormattedMessage id="mail.button.click" defaultMessage="Contact" />
      </button>
    </a>
  );
};

export default MailButton;
