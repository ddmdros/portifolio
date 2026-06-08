import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export const MarkdownRenderer = ({ content }: Props) => (
  <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8">
    <div
      className="prose prose-invert prose-emerald max-w-none 
                    /* Força o container do código a rolar e ter largura máxima */
                    [&>pre]:!overflow-x-auto! [&>pre]:max-w-full [&>pre]:block"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  </div>
);
