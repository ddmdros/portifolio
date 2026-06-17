import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface LanguageSwitcherProps {
  currentLocale: string;
  setLocale: (lang: string) => void;
  variant?: "icon" | "text";
}

// Sub-componente para o Seletor de Idioma em Formato de Ícone com Dropdown (Desktop)
const IconLanguageSwitcher = ({
  currentLocale,
  setLocale,
}: {
  currentLocale: string;
  setLocale: (lang: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 text-gray-300 hover:text-white cursor-pointer font-mono text-xs uppercase"
      >
        <Globe size={14} className="text-accent" />
        <span>{currentLocale}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 text-gray-500 group-hover:text-white ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Glassmorphism */}
      {isOpen && (
        <div className="absolute right-0 mt-2 py-1.5 w-36 bg-card-bg/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl text-gray-300 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => {
              setLocale("en");
              setIsOpen(false);
            }}
            className={`flex items-center justify-between w-full px-4 py-2 text-left text-xs font-semibold hover:bg-white/5 hover:text-white transition-colors hover:cursor-pointer ${
              currentLocale === "en" ? "text-accent bg-accent-subtle" : ""
            }`}
          >
            <span>English</span>
            {currentLocale === "en" && (
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </button>
          <button
            onClick={() => {
              setLocale("pt");
              setIsOpen(false);
            }}
            className={`flex items-center justify-between w-full px-4 py-2 text-left text-xs font-semibold hover:bg-white/5 hover:text-white transition-colors hover:cursor-pointer ${
              currentLocale === "pt" ? "text-accent bg-accent-subtle" : ""
            }`}
          >
            <span>Português</span>
            {currentLocale === "pt" && (
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// Sub-componente para o Seletor de Idioma em Formato de Toggle (Mobile)
const ToggleLanguageSwitcher = ({
  currentLocale,
  setLocale,
}: {
  currentLocale: string;
  setLocale: (lang: string) => void;
}) => {
  const isPt = currentLocale === "pt";
  return (
    <div className="flex items-center gap-3 text-white">
      <span
        className={`text-sm transition-colors ${
          currentLocale === "en" ? "font-bold text-accent" : "text-gray-500"
        }`}
      >
        English
      </span>

      <button
        type="button"
        onClick={() => setLocale(currentLocale === "en" ? "pt" : "en")}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isPt ? "bg-accent" : "bg-white/10"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            isPt ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>

      <span
        className={`text-sm transition-colors ${
          currentLocale === "pt" ? "font-bold text-accent" : "text-gray-500"
        }`}
      >
        Português
      </span>
    </div>
  );
};

export const LanguageSwitcher = ({
  currentLocale,
  setLocale,
  variant = "icon",
}: LanguageSwitcherProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (newLang: string) => {
    setLocale(newLang);
    
    const segments = location.pathname.split("/");
    // If path is like /pt/resume or /en/resume
    if (segments[1] === "pt" || segments[1] === "en") {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    const newPath = segments.join("/");
    navigate(`${newPath}${location.hash}${location.search}`, { replace: true });
  };

  return variant === "icon" ? (
    <IconLanguageSwitcher currentLocale={currentLocale} setLocale={changeLanguage} />
  ) : (
    <ToggleLanguageSwitcher currentLocale={currentLocale} setLocale={changeLanguage} />
  );
};

export default LanguageSwitcher;
