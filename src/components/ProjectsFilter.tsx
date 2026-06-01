import { FormattedMessage } from "react-intl";
import { type ProjectCategory } from "../types/projectType";

interface FilterProps {
  activeCategory: ProjectCategory;
  onFilterChange: (category: ProjectCategory) => void;
}

const ProjectFilter = ({ activeCategory, onFilterChange }: FilterProps) => {
  const categories: { id: string; value: ProjectCategory }[] = [
    { id: "projects.filter.all", value: "all" },
    { id: "projects.filter.frontend", value: "frontend" },
    { id: "projects.filter.fullstack", value: "fullstack" },
    { id: "projects.filter.backend", value: "backend" },
    { id: "projects.filter.ai-ml", value: "AI & ML" },
    { id: "projects.filter.game-development", value: "game development" },
  ];

  return (
    <div className="mb-8 border-b border-white/10 pb-2">
      <div className="flex gap-2 overflow-x-auto pb-2 flex-nowrap [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onFilterChange(cat.value)}
            className={`uppercase text-xs px-5 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap border ${
              activeCategory === cat.value
                ? "bg-accent text-black border-accent shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-transparent text-gray-400 border-white/10 hover:border-accent/50 hover:text-white"
            }`}
          >
            <FormattedMessage id={cat.id} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;
