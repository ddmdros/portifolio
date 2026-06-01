import { useState, useRef, useEffect } from "react";

interface LanguageSwitcherProps {
  currentLocale: string;
  setLocale: (lang: string) => void;
  variant?: "icon" | "text";
}

export const LanguageSwitcher = ({
  currentLocale,
  setLocale,
  variant = "icon",
}: LanguageSwitcherProps) => {
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
      {variant === "icon" ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-left gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors text-white"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </button>
      ) : (
        <div className="flex items-center gap-3 text-white">
          <span
            className={`text-sm transition-colors ${currentLocale === "en" ? "font-bold text-white" : "text-gray-500"}`}
          >
            English
          </span>

          <button
            type="button"
            onClick={() => setLocale(currentLocale === "en" ? "pt" : "en")}
            className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none hover:cursor-pointer'}
               ${currentLocale === "pt" ? "bg-gray-600 hover:bg-accent-hover" : "bg-gray-600 hover:bg-accent-hover"}
            `}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                currentLocale === "pt" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`text-sm transition-colors ${currentLocale === "pt" ? "font-bold text-white" : "text-gray-500"}`}
          >
            Português
          </span>
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 bg-accent-hover rounded-lg shadow-xl text-black z-50">
          <button
            onClick={() => {
              setLocale("en");
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${currentLocale === "en" ? "font-bold bg-gray-100" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => {
              setLocale("pt");
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${currentLocale === "pt" ? "font-bold bg-gray-100" : ""}`}
          >
            Português
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
