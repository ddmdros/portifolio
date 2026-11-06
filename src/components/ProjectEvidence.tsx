import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

// One real artifact per featured project, drawn as a small terminal-like panel:
// the work itself is the image, instead of a summary of the README.
// The panel stays dark in both themes, so it uses fixed colors instead of the
// theme utilities (the light theme remaps .text-white and the gray scale).
// Hierarchy is carried by gray levels; color marks only the decision in each panel.
const dim = "text-[#80858f]";
const strong = "text-[#e6e8ec]";
const ok = "text-[#4cc79a]";
const bad = "text-[#e0857c]";
const rule = "border-[#262a31]";

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="min-w-0 rounded-xl border border-[#262a31] bg-[#0f1115] p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#a1a6af]">
    {children}
  </div>
);

// Data: agent-harness demo job, projects/sample-rpg/jobs/2026-11-patch (source/strings.json and wip/merged.json),
// and the zones in .agents/tree.toml.
const HarnessEvidence = () => (
  <Panel>
    <p className={dim}>
      ui_002 · "Not enough Stamina" · <FormattedMessage id="evidence.harness.limit" />
    </p>
    <dl className="mt-1 grid grid-cols-[6rem_minmax(0,1fr)] sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] gap-x-3">
      <dt className={dim}>drafter</dt>
      <dd className={`${dim} line-through sm:col-span-2`}>Estamina insuficiente</dd>
      <dt className={dim}>style</dt>
      <dd className={`${dim} line-through sm:col-span-2`}>Sem estamina</dd>
      <dt className={dim}>mechanics</dt>
      <dd className={strong}>Vigor insuficiente</dd>
      <dd className={`${ok} col-start-2 sm:col-start-auto`}>
        <FormattedMessage id="evidence.harness.wins" />
      </dd>
    </dl>
    <p className={`mt-3 ${dim}`}>
      dlg_001 · <FormattedMessage id="evidence.harness.gender" values={{ player: "{player}" }} />
    </p>
    <p>
      <FormattedMessage id="evidence.harness.human" />
    </p>
    <dl className={`mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 border-t ${rule} pt-3`}>
      <dt className="break-all">Edit references/glossary.csv</dt>
      <dd>ask</dd>
      <dt className="break-all">sed -i … source/strings.json</dt>
      <dd className={bad}>deny</dd>
      <dt className="break-all">git commit --no-verify</dt>
      <dd className={bad}>deny</dd>
    </dl>
  </Panel>
);

// Data: rag-gta README, "Results (lore)".
const loreResults = [
  { mode: "similarity", retrieval: "10/10", answer: "9/10", refusal: "3/3", seconds: 149, kept: false },
  { mode: "mmr", retrieval: "10/10", answer: "9/10", refusal: "3/3", seconds: 124, kept: true },
  { mode: "multiquery", retrieval: "10/10", answer: "10/10", refusal: "0/3", seconds: 203, kept: false },
];

const RagEvidence = () => (
  <Panel>
    <p className={dim}>
      <FormattedMessage id="evidence.rag.caption" />
    </p>
    <div className="mt-2 overflow-x-auto">
      <table className="w-full min-w-[21rem] border-collapse text-left tabular-nums">
        <thead>
          <tr className={dim}>
            <th className="py-1 pr-3 font-normal"><FormattedMessage id="evidence.rag.mode" /></th>
            <th className="py-1 pr-3 font-normal"><FormattedMessage id="evidence.rag.retrieval" /></th>
            <th className="py-1 pr-3 font-normal"><FormattedMessage id="evidence.rag.answer" /></th>
            <th className="py-1 pr-3 font-normal"><FormattedMessage id="evidence.rag.refusal" /></th>
            <th className="py-1 text-right font-normal"><FormattedMessage id="evidence.rag.seconds" /></th>
          </tr>
        </thead>
        <tbody>
          {loreResults.map((r) => (
            <tr key={r.mode} className={`border-t ${rule}`}>
              <td className={`py-1.5 pr-3 ${r.kept ? strong : ""}`}>{r.mode}</td>
              <td className="py-1.5 pr-3">{r.retrieval}</td>
              <td className="py-1.5 pr-3">{r.answer}</td>
              <td className={`py-1.5 pr-3 ${r.refusal === "0/3" ? `${bad} font-semibold` : ""}`}>{r.refusal}</td>
              <td className="py-1.5 text-right">{r.seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-3">
      <FormattedMessage id="evidence.rag.verdict" />
    </p>
  </Panel>
);

// Data: the tool and its RAWG fields from the NetPlay repository; the question is an example.
const NetplayEvidence = () => (
  <Panel>
    <p className={dim}>
      <FormattedMessage id="evidence.netplay.example" />
    </p>
    <dl className="mt-1 grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3">
      <dt className={dim}>user</dt>
      <dd><FormattedMessage id="evidence.netplay.question" /></dd>
      <dt className={dim}>agent</dt>
      <dd className="break-all">→ <span className={strong}>buscar_informacoes_de_jogos("Hades")</span></dd>
      <dt className={dim}>RAWG</dt>
      <dd>← <FormattedMessage id="evidence.netplay.fields" /></dd>
      <dt className={dim}>agent</dt>
      <dd><FormattedMessage id="evidence.netplay.answer" /></dd>
    </dl>
    <p className={`mt-3 border-t ${rule} pt-3 ${dim}`}>
      <FormattedMessage id="evidence.netplay.ci" />
    </p>
  </Panel>
);

// Keyed by project id in ProjectsData.ts.
const EVIDENCE: Record<string, () => ReactNode> = {
  "7": HarnessEvidence,
  "8": RagEvidence,
  "6": NetplayEvidence,
};

export const ProjectEvidence = ({ projectId }: { projectId: string }) => {
  const Evidence = EVIDENCE[projectId];
  return Evidence ? <Evidence /> : null;
};
