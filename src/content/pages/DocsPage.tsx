import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

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

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-4xl py-12 px-6 space-y-8 animate-pulse">
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
        {/* Section 2 Skeleton */}
        <div className="space-y-4 pt-6">
          <div className="h-6 bg-white/10 rounded-lg w-1/4" />
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-11/12" />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl py-12 px-6 animate-fade-in-up">
      <MarkdownRenderer content={content} />
    </main>
  );
};
