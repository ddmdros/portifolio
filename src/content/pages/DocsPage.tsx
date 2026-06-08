import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

const markdownFiles = import.meta.glob("../docs/**/*.md", {
  query: "?raw",
  import: "default",
});

export const DocsPage = () => {
  const { slug } = useParams();
  const { locale } = useIntl();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadMarkdown = async () => {
      const langFolder = locale === "ptbr" ? "pt" : "en";

      const path = `../docs/${slug}/${langFolder}/${slug}.md`;

      console.log("Caminho gerado:", path);
      console.log(
        "Arquivos encontrados pelo Vite:",
        Object.keys(markdownFiles),
      );

      if (markdownFiles[path]) {
        try {
          const text = (await markdownFiles[path]()) as string;
          setContent(text);
        } catch (error) {
          console.error("Erro ao ler o arquivo:", error);
          setContent("# Erro ao processar a documentação.");
        }
      } else {
        setContent("# Documentação não encontrada.");
      }
    };

    loadMarkdown();
  }, [slug, locale]);

  return (
    <main className="container mx-auto max-w-4xl py-12">
      <MarkdownRenderer content={content} />
    </main>
  );
};
