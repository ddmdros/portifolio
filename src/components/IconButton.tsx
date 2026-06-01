import { type ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  url: string;
}

export const IconButton = ({ icon, url }: IconButtonProps) => {
  return (
    <div className="flex flex-col justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="justify-center ml-4 p-3 rounded-full bg-accent-bg text-accent hover:bg-accent hover:text-black transition-colors duration-300 border border-accent-border"
      >
        {icon}
      </a>
    </div>
  );
};
