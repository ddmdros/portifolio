import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export const MarkdownRenderer = ({ content }: Props) => (
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="prose prose-invert prose-emerald max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  </div>
);
