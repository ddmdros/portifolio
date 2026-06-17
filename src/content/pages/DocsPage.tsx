import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { PROJECTS_DATA } from "../ProjectsData";

const markdownFiles = import.meta.glob("../docs/**/*.md", {
  query: "?raw",
  import: "default",
});

export const DocsPage = () => {
  const { slug, lang } = useParams();
  const { locale } = useIntl();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadMarkdown = async () => {
      setIsLoading(true);
      const currentLang = lang || locale;
      const langFolder = currentLang === "pt" || currentLang === "ptbr" ? "pt" : "en";

      const path = `../docs/${slug}/${langFolder}/${slug}.md`;

      if (markdownFiles[path]) {
        try {
          const text = (await markdownFiles[path]()) as string;
          if (active) {
            setContent(text);
          }
        } catch (error) {
          console.error("Erro ao ler o arquivo:", error);
          if (active) {
            setContent("# Erro ao processar a documentação.");
          }
        }
      } else {
        if (active) {
          setContent("# Documentação não encontrada.");
        }
      }
      if (active) {
        setIsLoading(false);
      }
    };

    loadMarkdown();
    return () => {
      active = false;
    };
  }, [slug, lang, locale]);

  const otherProject = PROJECTS_DATA.find((p) => p.docId && p.docId !== slug);

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-4xl py-12 px-6 space-y-8 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="h-9 bg-white/5 rounded-xl w-32 mb-6" />
        {/* Title Skeleton */}
        <div className="h-10 bg-white/10 rounded-xl w-3/4 mb-10" />
        {/* Meta Info Skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-4 bg-white/5 rounded w-1/4" />
          <div className="h-4 bg-white/5 rounded w-1/6" />
        </div>
        <hr className="border-white/10 my-6" />
        {/* Section 1 Skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-white/10 rounded-lg w-1/3" />
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-5/6" />
          <div className="h-4 bg-white/5 rounded w-4/5" />
        </div>
        {/* Image Placeholder Skeleton */}
        <div className="h-64 bg-white/5 rounded-2xl w-full" />
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl py-12 px-6 animate-fade-in-up">
      {/* Botão de Voltar */}
      <div className="mb-8">
        <Link
          to={`/${locale}/projects`}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-accent/40 hover:bg-white/10 transition-all backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          <FormattedMessage id="docs.back" defaultMessage="Back to Projects" />
        </Link>
      </div>

      <MarkdownRenderer content={content} />

      {/* CTA para Ler Próximo Projeto */}
      {otherProject && (
        <div className="mt-16 border-t border-white/10 pt-10">
          <h3 className="text-lg font-mono text-accent uppercase tracking-wider mb-4">
            <FormattedMessage id="docs.readNext" defaultMessage="Continue Reading" />
          </h3>
          <Link
            to={`/${locale}/docs/${otherProject.docId}`}
            className="group block bg-card-bg/30 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-accent/70 uppercase">
                  <FormattedMessage id="docs.readNext.subtitle" defaultMessage="Next Project Documentation" />
                </span>
                <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors mt-1">
                  <FormattedMessage id={otherProject.title} />
                </h4>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  <FormattedMessage id={otherProject.description} />
                </p>
              </div>
              <div className="self-start md:self-center shrink-0 flex items-center gap-2 text-accent font-semibold group-hover:translate-x-1 transition-transform">
                <FormattedMessage id="docs.readNext.action" defaultMessage="Read Now" />
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      )}
    </main>
  );
};
