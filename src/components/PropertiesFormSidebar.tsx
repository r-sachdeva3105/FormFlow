import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].formComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <h2 className="text-md text-foreground/80 font-bold">Properties</h2>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <IoClose size={18} className="text-foreground/80" />
        </Button>
      </div>
      <PropertiesForm />
    </div>
  );
};

export default PropertiesFormSidebar;
