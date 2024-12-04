import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonDragOverlay } from "./SidebarButton";
import { ElementType, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (e) => setDraggedItem(e.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSidebarElement = draggedItem?.data?.current?.isDesignerButton;

  if (isSidebarElement) {
    const type = draggedItem?.data?.current?.type as ElementType;
    node = <SidebarButtonDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const id = draggedItem?.data?.current?.id;
    const element = elements?.find((el) => el.id === id);
    if (element) {
      const DesignerElement = FormElements[element.type].designerComponent;
      node = (
        <div className="flex w-full h-32 items-center px-4 py-2 bg-accent/60 rounded-md pointer-events-none">
          <DesignerElement elementInstance={element} />
        </div>
      );
    } else {
      node = <div>Dragged element not found</div>;
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
