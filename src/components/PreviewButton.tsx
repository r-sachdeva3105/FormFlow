import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";

const PreviewButton = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <MdPreview className="h-4 w-4" /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <h2 className="text-lg font-bold">Preview</h2>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url('/graph-paper.svg')] dark:bg-[url('/graph-paper-dark.svg')] overflow-y-auto">
          <div className="max-w-md mx-auto p-8 bg-background rounded-lg shadow-md flex flex-col flex-grow gap-4 h-full w-full overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewButton;
