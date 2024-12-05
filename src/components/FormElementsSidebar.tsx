import React from "react";
import { FormElements } from "./FormElements";
import SidebarButton from "./SidebarButton";

const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col p-2">
      <h2 className="text-md text-foreground/80 font-bold py-2">
        Form Elements
      </h2>
      <SidebarButton formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementsSidebar;
