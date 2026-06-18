import React, { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

interface DragState {
  draggedId: string | null;
  dragOverId: string | null;
  canDragId: string | null;
  setCanDragId: (id: string | null) => void;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDrop: (e: React.DragEvent, targetId: string) => void;
  handleDragEnd: () => void;
}

interface DevModeTabPanelProps<T extends { id: string }> {
  title: string;
  description: string;
  items: T[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  addButtonLabel?: string;
  emptyMessage?: string;
  dragState: DragState;
  renderCardHeader: (item: T) => React.ReactNode;
  renderCardDetails: (item: T) => React.ReactNode;
  cardExtraHeaderContent?: (item: T) => React.ReactNode;
  filterElement?: React.ReactNode;
}

export function DevModeTabPanel<T extends { id: string }>({
  title,
  description,
  items,
  onAdd,
  onDelete,
  addButtonLabel = "Add Item",
  emptyMessage = "No items found.",
  dragState,
  renderCardHeader,
  renderCardDetails,
  cardExtraHeaderContent,
  filterElement,
}: DevModeTabPanelProps<T>) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const {
    draggedId,
    dragOverId,
    canDragId,
    setCanDragId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = dragState;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <div className="text-left">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-text font-bold py-2 px-4 rounded-xl transition-all text-xs cursor-pointer select-none"
        >
          <Plus size={14} /> {addButtonLabel}
        </button>
      </div>

      {filterElement}

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-xs text-gray-500 italic text-left">
            {emptyMessage}
          </p>
        ) : (
          items.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                draggable={canDragId === item.id}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDrop={(e) => handleDrop(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`border rounded-2xl bg-white/5/20 transition-all duration-200 ${
                  draggedId === item.id ? "opacity-40 scale-[0.98]" : ""
                } ${
                  dragOverId === item.id
                    ? "border-accent border-dashed bg-accent/5 scale-[1.01]"
                    : isExpanded
                    ? "border-white/20 bg-white/5 shadow-lg shadow-black/10"
                    : "border-white/5 hover:border-white/10 hover:bg-white/5/10"
                }`}
              >
                {/* Card Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setCanDragId(item.id);
                      }}
                      onMouseUp={(e) => {
                        e.stopPropagation();
                        setCanDragId(null);
                      }}
                      className="text-gray-500 hover:text-accent cursor-grab active:cursor-grabbing p-1 bg-white/5 rounded transition-colors"
                      title="Drag to reorder"
                    >
                      <GripVertical size={14} />
                    </button>
                    <div className="text-left font-bold text-white text-sm">
                      {renderCardHeader(item)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {cardExtraHeaderContent && cardExtraHeaderContent(item)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                      className="text-red-400 hover:text-red-500 p-1.5 bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-white/5 text-left space-y-4">
                    {renderCardDetails(item)}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
