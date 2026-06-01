import { FormattedMessage } from "react-intl";

interface SectionDivProps {
  sectionTitleId: string;
  sectionNumber: string;
}

export const SectionDiv = ({
  sectionNumber,
  sectionTitleId,
}: SectionDivProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-8 h-0.5 bg-text-h"></div>
      <span className="font-mono text-text-h text-xs tracking-widest uppercase">
        {sectionNumber}. <FormattedMessage id={sectionTitleId} />
      </span>
    </div>
  );
};

export default SectionDiv;
