import { FormattedMessage } from "react-intl";

interface SectionDivProps {
  sectionTitleId: string;
}

// Section label above each home heading. No numbers: the sections are not a sequence.
export const SectionDiv = ({ sectionTitleId }: SectionDivProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-8 h-0.5 bg-text-h"></div>
      <span className="font-mono text-text-h text-xs tracking-widest uppercase">
        <FormattedMessage id={sectionTitleId} />
      </span>
    </div>
  );
};
