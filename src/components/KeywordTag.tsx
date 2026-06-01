interface KeywordTagProps {
  label: string;
}
export const KeywordTag = ({ label }: KeywordTagProps) => {
  return (
    <span className="text-xs font-medium uppercase bg-white/10 rounded-md px-2 py-1 text-gray-300 mr-1">
      {label}
    </span>
  );
};

export default KeywordTag;
