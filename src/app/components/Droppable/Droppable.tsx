"use client"

import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DroppableProps {
  uniqueId: string
  children: ReactNode
}

function Droppable({ uniqueId, children }: DroppableProps) {
  const {setNodeRef} = useDroppable({
    id: uniqueId,
  });

  return (
    <div ref={setNodeRef}>
      { children }
    </div>
  );
}

export default Droppable
