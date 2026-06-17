import { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Routes, Route, useParams, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { ProjectsPage } from "./pages/ProjectsPage";
import { Contact } from "./pages/Contact";
import { Resume } from "./pages/Resume";

import ptbrMessages from "./i18n/messages/ptbr.json";
import enMessages from "./i18n/messages/en.json";
import { DocsPage } from "./content/pages/DocsPage";

const messagesMap: Record<string, Record<string, string>> = {
  pt: ptbrMessages,
  en: enMessages,
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

  return (
    <BrowserRouter>
      <IntlProvider locale={locale} messages={messagesMap[locale]}>
        <div className="min-h-screen text-white-900 bg-(--text-h)">
          <Header currentLocale={locale} setLocale={setLocale} />

          <Routes>
            {/* Multi-language parent route */}
            <Route path="/:lang" element={<LanguageLayout setLocale={setLocale} />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="resume" element={<Resume />} />
              <Route path="docs/:slug" element={<DocsPage />} />
            </Route>

            {/* Fallback for paths without language prefix */}
            <Route path="*" element={<LanguageRedirect />} />
          </Routes>
        </div>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
