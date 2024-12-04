"use client";

import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesigner from "./hooks/useDesigner";
import { ElementType, FormElementInstance, FormElements } from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "droppable",
    data: {
      designerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerButton = active.data?.current?.isDesignerButton;
      if (isDesignerButton) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 md:w-2/3 p-3">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "max-w-2/5 lg:max-w-2/5 h-full overflow-scroll m-auto bg-background flex flex-col items-center justify-start flex-1 flex-grow overflow-y-auto rounded-lg",
            droppable.isOver && "ring-2 ring-primary/50"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-2xl text-muted-foreground font-bold flex flex-grow items-center">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement } = useDesigner();
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const top = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      id: element.id,
      isTop: true,
    },
  });

  const bottom = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      id: element.id,
      isBottom: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      id: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-30 flex flex-col text-foreground rounded-md ring-1 ring-accent ring-inset hover:cursor-grab"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        ref={top.setNodeRef}
        className="absolute w-full h-1/2 top-0 rounded-t-md"
      ></div>
      <div
        ref={bottom.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      ></div>
      {isMouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant={"outline"}
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked");
                removeElement(element.id);
              }}
            >
              <BiSolidTrash size={20} />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {top.isOver && (
        <div className="absolute w-full h-1 top-0 rounded-md rounded-b-none bg-primary"></div>
      )}
      <div
        className={cn(
          "flex w-full h-32 items-center px-4 py-2 bg-accent/40 rounded-md pointer-events-none opacity-100",
          isMouseOver && "opacity-10"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottom.isOver && (
        <div className="absolute w-full h-1 bottom-0 rounded-md rounded-t-none bg-primary"></div>
      )}
    </div>
  );
}

export default Designer;
