import React from "react";
import { FormElements } from "./FormElements";
import SidebarButton from "./SidebarButton";

const DesignerSidebar = () => {
  return (
    <aside className="h-full bg-background flex flex-col flex-grow gap-2 overflow-y-auto p-4 border-muted broder-l-2">
      Form Elements
      <SidebarButton formElement={FormElements.TextField} />
    </aside>
  );
};

export default DesignerSidebar;
