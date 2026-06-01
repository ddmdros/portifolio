import { useState } from "react";
import { FormattedMessage } from "react-intl";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  currentLocale: string;
  setLocale: (lang: string) => void;
}

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
    />
  </svg>
);

export const Header = ({ currentLocale, setLocale }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { id: "header.blog", href: "#blog" },
    { id: "header.projects", href: "#projetos" },
    { id: "header.contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 w-full text-white z-50 border-b border-white/10 bg-bg">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-lg font-bold ">
          <FormattedMessage id="header.logo" defaultMessage="diogo.dev" />
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <FormattedMessage id={link.id} />
            </a>
          ))}
          <LanguageSwitcher
            currentLocale={currentLocale}
            setLocale={setLocale}
            variant="icon"
          />
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-accent-hover hover:cursor-pointer hover:rounded-2xl hover:translate-y-1"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex w-full overflow-hidden ">
          <div className="md:hidden flex flex-col flex-1 absolute w-full h-screen bg-bg border-t border-gray-800 p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMenu}
                className="text-lg font-medium p-6 text-white w-full hover:rounded-md hover:bg-gray-500"
              >
                <FormattedMessage id={link.id} />
              </a>
            ))}
            <div
              className="mt-auto p-3
              text-center
              border-t border-gray-800
              pb-18"
            >
              <div className="pb-4 pt-1 font-medium text-xl">
                <FormattedMessage id="header.language" />
              </div>

              <div className="flex justify-center">
                <LanguageSwitcher
                  currentLocale={currentLocale}
                  setLocale={setLocale}
                  variant="text"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
