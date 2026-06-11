import { useState } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  const [locale, setLocale] = useState("en");

  return (
    <IntlProvider locale={locale} messages={messagesMap[locale]}>
      <BrowserRouter>
        <div className="min-h-screen text-white-900 bg-(--text-h)">
          <Header currentLocale={locale} setLocale={setLocale} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/docs/:slug" element={<DocsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
