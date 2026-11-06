import { useState, useEffect, lazy, Suspense } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import { BrowserRouter, Routes, Route, useParams, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";

import ptbrMessages from "./i18n/messages/ptbr.json";
import enMessages from "./i18n/messages/en.json";

// Secondary pages load on demand, so the home page ships less JavaScript.
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const Resume = lazy(() => import("./pages/Resume").then((m) => ({ default: m.Resume })));
const DocsRedirect = lazy(() => import("./pages/DocsRedirect").then((m) => ({ default: m.DocsRedirect })));
// Dev Mode edits content files through the Vite dev server, so it is left out of production builds.
const DevMode = import.meta.env.DEV
  ? lazy(() => import("./pages/DevMode").then((m) => ({ default: m.DevMode })))
  : null;

const messagesMap: Record<string, Record<string, string>> = {
  pt: ptbrMessages,
  en: enMessages,
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

// Component to handle layout and sync language from URL
const LanguageLayout = ({ setLocale }: { setLocale: (lang: string) => void }) => {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isValidLang = lang === "pt" || lang === "en";

  useEffect(() => {
    if (isValidLang && lang) {
      setLocale(lang);
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    }
  }, [lang, isValidLang, setLocale]);

  useEffect(() => {
    if (!isValidLang) {
      const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || "";
      const detectedLang = browserLang.toLowerCase().startsWith("pt") ? "pt" : "en";
      const path = location.pathname;
      navigate(`/${detectedLang}${path}${location.hash}${location.search}`, { replace: true });
    }
  }, [isValidLang, location, navigate]);

  if (!isValidLang) {
    return null;
  }

  return <Outlet />;
};

// Fallback component to redirect non-prefixed root and subroutes
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || "";
    const detectedLang = browserLang.toLowerCase().startsWith("pt") ? "pt" : "en";
    const path = location.pathname === "/" ? "" : location.pathname;
    navigate(`/${detectedLang}${path}${location.hash}${location.search}`, { replace: true });
  }, [navigate, location]);

  return null;
};

function App() {
  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <IntlProvider locale={locale} messages={messagesMap[locale]}>
        <div className="min-h-screen bg-bg text-text transition-colors duration-300 flex flex-col justify-between">
          <div>
            <Header
              currentLocale={locale}
              setLocale={setLocale}
              theme={theme}
              toggleTheme={toggleTheme}
            />

            <Suspense fallback={<div className="min-h-[60vh]" />}>
            <Routes>
              {/* Multi-language parent route */}
              <Route path="/:lang" element={<LanguageLayout setLocale={setLocale} />}>
                <Route index element={<Home />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogPost />} />
                <Route path="contact" element={<Contact />} />
                <Route path="resume" element={<Resume />} />
                <Route path="docs/:slug" element={<DocsRedirect />} />
                {DevMode && <Route path="dev-mode" element={<DevMode />} />}
              </Route>

              {/* Fallback for paths without language prefix */}
              <Route path="*" element={<LanguageRedirect />} />
            </Routes>
            </Suspense>
          </div>

          <footer className="max-w-5xl w-full mx-auto px-6 py-8 flex justify-center border-t border-white/5 mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-accent transition-colors cursor-pointer select-none"
            >
              <ArrowUp size={14} />
              <FormattedMessage id="footer.backToTop" defaultMessage="Back to Top" />
            </button>
          </footer>
        </div>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
