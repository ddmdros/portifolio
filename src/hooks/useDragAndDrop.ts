import { useState } from "react";

export function useDragAndDrop<T extends { id: string }>(
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>
) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [canDragId, setCanDragId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      const fromIdx = items.findIndex((x) => x.id === draggedId);
      const toIdx = items.findIndex((x) => x.id === targetId);
      if (fromIdx !== -1 && toIdx !== -1) {
        const next = [...items];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        setItems(next);
      }
    }
    setDraggedId(null);
    setDragOverId(null);
    setCanDragId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
    setCanDragId(null);
  };

  return {
    draggedId,
    dragOverId,
    canDragId,
    setCanDragId,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
