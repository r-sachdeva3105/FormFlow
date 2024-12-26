import React from "react";
import { FormElements } from "./FormElements";
import SidebarButton from "./SidebarButton";
import { Separator } from "./ui/separator";

const FormElementsSidebar = () => {
  return (
    <div className="flex flex-col p-2">
      <h2 className="text-md text-foreground/80 font-bold py-2">
        Drag & Drop Elements
      </h2>
      <Separator className="" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <p className="text-sm text-muted-foreground col-span-full mt-3">
          Layout Elements
        </p>
        <SidebarButton formElement={FormElements.TitleField} />
        <SidebarButton formElement={FormElements.SubTitleField} />
        <SidebarButton formElement={FormElements.ParagraphField} />
        <SidebarButton formElement={FormElements.SeparatorField} />
        <SidebarButton formElement={FormElements.SpacerField} />
        <p className="text-sm text-muted-foreground col-span-full mt-3">
          Form Elements
        </p>
        <SidebarButton formElement={FormElements.TextField} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
