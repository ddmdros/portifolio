import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const POSTS = [
  {
    id: "1",
    title: "blog.post.1.title",
    date: "2026-06-01",
    readTime: "5 min",
    excerpt: "blog.post.1.excerpt",
  },
];

export const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        <FormattedMessage id="blog.page.title" defaultMessage="Blog" />
      </h1>

      <div className="space-y-8">
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="group p-6 rounded-xl border border-white/10 bg-card-bg hover:border-accent/50 transition-all"
          >
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
              <FormattedMessage id={post.title} />
            </h2>

            <p className="text-gray-400 mb-4">
              <FormattedMessage id={post.excerpt} />
            </p>

            <Link
              to={`/blog/${post.id}`}
              className="text-accent font-medium hover:underline"
            >
              <FormattedMessage
                id="blog.read.more"
                defaultMessage="Read more →"
              />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
