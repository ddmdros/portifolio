import { useState } from "react";
import { IntlProvider } from "react-intl";
import { Header } from "./components/Header";
import ptbrMessages from "./i18n/messages/ptbr.json";
import enMessages from "./i18n/messages/en.json";
import Portifolio from "./components/Portifolio";
import Projects from "./components/Projects";
import About from "./components/About";

const messagesMap: Record<string, Record<string, string>> = {
  pt: ptbrMessages,
  en: enMessages,
};

function App() {
  const [locale, setLocale] = useState("en");

  return (
    <IntlProvider locale={locale} messages={messagesMap[locale]}>
      <div className="min-h-screen text-white-900 bg-(--text-h)">
        <Header currentLocale={locale} setLocale={setLocale} />
        <main className="block max-w-5xl mx-auto p-6 mt-10">
          <Portifolio />
          <About />
          <Projects />
        </main>
      </div>
    </IntlProvider>
  );
}

export default App;
