import { useState } from "react";
import { FormattedMessage } from "react-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
    { id: "header.home", to: "/" },
    { id: "header.projects", to: "/projects" },
    { id: "header.blog", to: "/blog" },
    { id: "header.contact", to: "/contact" },
    { id: "header.resume", to: "/resume" },
  ];

  return (
    <header className="sticky top-0 w-full text-white z-50 border-b border-white/10 bg-bg">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-lg font-bold z-50">
          <Link to="/" onClick={closeMenu}>
            <FormattedMessage id="header.logo" defaultMessage="diogo.dev" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                `cursor-pointer text-sm font-medium transition-colors ${
                  isActive ? "text-accent" : "text-gray-300 hover:text-white"
                }`
              }
            >
              <FormattedMessage id={link.id} />
            </NavLink>
          ))}
          <LanguageSwitcher
            currentLocale={currentLocale}
            setLocale={setLocale}
            variant="icon"
          />
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 z-50 relative hover:bg-white/10 rounded-lg transition-colors"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-bg/95 backdrop-blur-lg flex flex-col animate-in fade-in slide-in-from-top-6 duration-300 ease-out">
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
            <div className="text-lg font-bold">
              <Link to="/" onClick={closeMenu}>
                <FormattedMessage id="header.logo" defaultMessage="diogo.dev" />
              </Link>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <MenuIcon isOpen={isOpen} />
            </button>
          </div>

          {/* Links and content */}
          <div className="flex flex-col pt-8 px-6 pb-8 flex-1">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-lg font-semibold px-5 py-3.5 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-accent/5 text-accent"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <FormattedMessage id={link.id} />
                </NavLink>
              ))}
            </div>

            {/* Menu footer */}
            <div className="mt-auto border-t border-white/5 pt-8 text-center space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
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
