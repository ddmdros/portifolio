import { type ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  url: string;
  label: string;
}

export const IconButton = ({ icon, url, label }: IconButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center p-3 rounded-full bg-accent-bg text-accent hover:bg-accent hover:text-black transition-colors duration-300 border border-accent-border"
    >
      {icon}
    </a>
  );
};
