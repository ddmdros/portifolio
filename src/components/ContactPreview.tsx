import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { SectionDiv } from "./SectionDiv";
import { ArrowRight } from "lucide-react";
import { PROFILE_CONFIG } from "../config/profile";

// The address is plain text so it can be read and copied; mail and LinkedIn links are conveniences.
const ContactPreview = () => {
  const { locale } = useIntl();
  const linkedinLabel = PROFILE_CONFIG.linkedinUrl.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <section className="py-20 border-t border-border">
      <SectionDiv sectionTitleId="section.title.4" />

      <div className="space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold text-text-h tracking-tight">
          <FormattedMessage id="home.contact.preview.title" />
        </h2>

        <p className="text-text-gray leading-relaxed max-w-xl">
          <FormattedMessage id="home.contact.preview.description" />
        </p>

        <ul className="font-mono text-sm space-y-1.5">
          <li>
            <a href={`mailto:${PROFILE_CONFIG.emailContact}`} className="text-text-h break-all hover:text-accent">
              {PROFILE_CONFIG.emailContact}
            </a>
          </li>
          <li>
            <a href={PROFILE_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-text-h hover:text-accent">
              {linkedinLabel}
            </a>
          </li>
        </ul>

        <Link
          to={`/${locale}/contact`}
          className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-accent-text font-bold py-2.5 px-5 rounded-xl transition-colors"
        >
          <FormattedMessage id="home.contact.preview.button" />
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default ContactPreview;
