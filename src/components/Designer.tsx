"use client";

import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesigner from "./hooks/useDesigner";
import { ElementType, FormElementInstance, FormElements } from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "droppable",
    data: {
      designerDropArea: true,
    },
  });

  console.log(elements);

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
            "max-w-2/5 lg:max-w-2/5 h-full m-auto bg-background flex flex-col items-center justify-start flex-1 flex-grow overflow-y-auto rounded-lg",
            droppable.isOver && "ring-2 ring-primary/50"
          )}
        >
          {!droppable.isOver && (
            <p className="text-2xl text-muted-foreground font-bold flex flex-grow items-center">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full text-background gap-2 p-4">
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
  const DesignerElement = FormElements[element.type].designerComponent;
  return <DesignerElement />;
}

export default Designer;
