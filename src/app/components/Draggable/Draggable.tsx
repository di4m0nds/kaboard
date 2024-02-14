"use client"

import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DraggableProps {
  uniqueId: string
  children: ReactNode
}

function Draggable({ uniqueId, children }: DraggableProps) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: uniqueId,
  });
  
  return (
    <div ref={setNodeRef} className="relative p-2 mt-5 rounded-lg shadow-md hover:shadow-sm duration-300 border-2 border-solid hover:border-solid border-transparent hover:border-gray-200 hover:bg-white bg-white/50">
      { children }
      <a
        className={`
          cursor-grabbing
          focus:cursor-grab
          absolute right-2 top-[35%]
          text-white
          py-2 rounded-lg
          hover:bg-gray-100
        `}
        {...listeners} {...attributes}
      >
          <svg viewBox="0 0 20 20" width="32">
            <path stroke="currentColor" d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
      </a>
    </div>
  );
}

export default Draggable
