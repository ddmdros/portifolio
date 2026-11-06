import { FormattedMessage } from "react-intl";
import { SectionDiv } from "./SectionDiv";

// Each layer says what I do and which project proves it.
// Proof links point to the repositories, whose READMEs are the full write-ups.
const stackLayers: {
  titleKey: string;
  itemsKey: string;
  proof: { label: string; href: string }[];
}[] = [
  {
    titleKey: "stack.agents",
    itemsKey: "stack.agents.items",
    proof: [{ label: "agent-harness", href: "https://github.com/ddmdros/agent-harness" }],
  },
  {
    titleKey: "stack.retrieval",
    itemsKey: "stack.retrieval.items",
    proof: [
      { label: "rag-gta", href: "https://github.com/ddmdros/rag-gta" },
      { label: "NetPlay", href: "https://github.com/ddmdros/Netplay" },
    ],
  },
  {
    titleKey: "stack.backend",
    itemsKey: "stack.backend.items",
    proof: [{ label: "NetPlay", href: "https://github.com/ddmdros/Netplay" }],
  },
  {
    titleKey: "stack.shipping",
    itemsKey: "stack.shipping.items",
    proof: [
      { label: "agent-harness CI", href: "https://github.com/ddmdros/agent-harness/actions" },
      { label: "rag-gta evals", href: "https://github.com/ddmdros/rag-gta/actions" },
    ],
  },
];

const AboutGroupedStacks = () => {
  return (
    <section className="py-20">
      <SectionDiv sectionTitleId="section.title.1" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-text-h leading-tight">
            <FormattedMessage id="about.title" />
          </h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            <FormattedMessage id="about.description" />
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            <FormattedMessage id="stack.title" />
          </h3>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {stackLayers.map((layer) => (
              <div key={layer.titleKey} className="py-4 grid sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-text-dim pt-0.5">
                  <FormattedMessage id={layer.titleKey} />
                </dt>
                <dd className="space-y-2">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <FormattedMessage id={layer.itemsKey} />
                  </p>
                  <p className="text-xs text-gray-400">
                    <FormattedMessage id="stack.proof" />:{" "}
                    {layer.proof.map((p, i) => (
                      <span key={p.label}>
                        {i > 0 && " · "}
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 hover:text-accent">
                          {p.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default AboutGroupedStacks;
