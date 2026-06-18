import React from "react";
import { GripVertical } from "lucide-react";

interface ResumeColumnProps<T extends { id: string }> {
  title: string;
  items: T[];
  checkedCount: number;
  emptyMessage?: string;

  // Drag-and-drop state & handlers
  draggedId: string | null;
  dragOverId: string | null;
  canDragId: string | null;
  setCanDragId: (id: string | null) => void;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDrop: (e: React.DragEvent, targetId: string) => void;
  handleDragEnd: () => void;

  // Callbacks
  isChecked: (item: T) => boolean;
  onToggle: (item: T) => void;
  renderItemContent: (item: T) => React.ReactNode;

  // Optional filter bar
  filterElement?: React.ReactNode;
}

export function ResumeColumn<T extends { id: string }>({
  title,
  items,
  checkedCount,
  emptyMessage = "No items found.",
  draggedId,
  dragOverId,
  canDragId,
  setCanDragId,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  isChecked,
  onToggle,
  renderItemContent,
  filterElement,
}: ResumeColumnProps<T>) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-[500px]">
      <h3 className="text-xs font-bold text-accent tracking-wider uppercase border-b border-white/5 pb-2 mb-3 text-left">
        {title} ({checkedCount})
      </h3>

      {filterElement}

      <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar text-left">
        {items.length === 0 ? (
          <p className="text-[10px] text-gray-500 italic">{emptyMessage}</p>
        ) : (
          items.map((item) => {
            const checked = isChecked(item);
            return (
              <div
                key={item.id}
                draggable={canDragId === item.id}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDrop={(e) => handleDrop(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-start gap-1 p-2 rounded-xl transition-all border ${
                  draggedId === item.id ? "opacity-40 scale-[0.98]" : ""
                } ${
                  dragOverId === item.id
                    ? "border-accent border-dashed bg-accent/5"
                    : "border-transparent"
                } ${
                  checked
                    ? "bg-accent/5 border-accent/20 text-white"
                    : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <button
                  type="button"
                  onMouseDown={() => setCanDragId(item.id)}
                  onMouseUp={() => setCanDragId(null)}
                  className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-0.5 bg-white/5 rounded transition-colors mt-0.5"
                  title="Drag to reorder"
                >
                  <GripVertical size={12} />
                </button>
                <label className="flex items-start gap-2 cursor-pointer text-xs w-full">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(item)}
                    className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5 shrink-0 cursor-pointer"
                  />
                  {renderItemContent(item)}
                </label>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
