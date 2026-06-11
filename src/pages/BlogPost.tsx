import { useParams, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const POST_DETAILS = {
  "1": {
    date: "2026-06-01",
    readTime: "5 min",
    titleKey: "blog.post.1.title",
    contentKey: "blog.post.1.content",
  },
};

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? POST_DETAILS[id as keyof typeof POST_DETAILS] : null;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          <FormattedMessage id="blog.notfound" defaultMessage="Post not found" />
        </h1>
        <Link to="/blog" className="text-accent hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} />
          <FormattedMessage id="blog.back" defaultMessage="Back to Blog" />
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        <FormattedMessage id="blog.back" defaultMessage="Back to Blog" />
      </Link>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {post.date}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readTime}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
        <FormattedMessage id={post.titleKey} />
      </h1>

      <div className="prose prose-invert prose-emerald max-w-none text-gray-300 leading-relaxed space-y-6">
        <p className="text-lg text-gray-200 font-medium">
          <FormattedMessage id="blog.post.1.intro" defaultMessage="Introduction" />
        </p>
        <p>
          <FormattedMessage id="blog.post.1.p1" defaultMessage="Paragraph 1" />
        </p>
        <p>
          <FormattedMessage id="blog.post.1.p2" defaultMessage="Paragraph 2" />
        </p>
        <p>
          <FormattedMessage id="blog.post.1.p3" defaultMessage="Paragraph 3" />
        </p>
      </div>
    </article>
  );
};

export default BlogPost;
