import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

const markdownFiles = import.meta.glob("../docs/*.md", {
  query: "?raw",
  import: "default",
});

export const DocsPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadMarkdown = async () => {
      const path = `../docs/${slug}.md`;

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
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <MarkdownRenderer content={content} />
    </div>
  );
};
