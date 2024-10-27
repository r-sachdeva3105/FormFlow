import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";

const PreviewButton = () => {
  return (
    <Button variant="outline" className="flex items-center gap-1">
      <MdPreview className="h-4 w-4" /> Preview
    </Button>
  );
};

export default PreviewButton;
