import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { PROJECTS_DATA } from "../content/ProjectsData";

// The case-study pages were retired: each repository README is now the single write-up.
// Old links (/:lang/docs/:slug) still work and land on that README.
export const DocsRedirect = () => {
  const { lang, slug } = useParams();
  const target = PROJECTS_DATA.find((p) => p.docId === slug)?.githubUrl;

  useEffect(() => {
    if (target) window.location.replace(target);
  }, [target]);

  if (!target) return <Navigate to={`/${lang ?? "en"}/projects`} replace />;

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-text-gray">
        <FormattedMessage id="docs.moved" />{" "}
        <a href={target} className="text-accent underline underline-offset-4">
          {target.replace("https://", "")}
        </a>
      </p>
    </main>
  );
};
