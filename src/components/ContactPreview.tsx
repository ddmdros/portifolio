import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import SectionDiv from "./SectionDiv";
import { Mail, ArrowRight } from "lucide-react";

const ContactPreview = () => {
  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      <SectionDiv sectionNumber="04" sectionTitleId="section.title.4" />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto bg-card-bg/40 backdrop-blur-sm border border-white/10 p-10 md:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden hover:border-white/20 hover:animate-glow-pulse transition-all duration-300 shadow-xl">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 blur-[30px] rounded-full" />

        <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
          <Mail size={24} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          <FormattedMessage id="home.contact.preview.title" />
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          <FormattedMessage id="home.contact.preview.description" />
        </p>

        <div className="pt-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-black font-bold py-3 px-6 rounded-xl transition-all cursor-pointer btn-shimmer"
          >
            <FormattedMessage id="home.contact.preview.button" defaultMessage="Get In Touch" />
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;
