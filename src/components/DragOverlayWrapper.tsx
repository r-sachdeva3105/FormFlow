import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonDragOverlay } from "./SidebarButton";
import { ElementType, FormElements } from "./FormElements";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (e) => setDraggedItem(e.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  const isSidebarElement = draggedItem?.data?.current?.isDesignerButton;
  let node = <div>No drag overlay</div>;

  if (isSidebarElement) {
    const type = draggedItem?.data?.current?.type as ElementType;
    node = <SidebarButtonDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
