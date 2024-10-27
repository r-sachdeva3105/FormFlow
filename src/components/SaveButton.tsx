import React from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";

const SaveButton = () => {
  return (
    <Button variant="outline" className="flex items-center gap-1">
      <HiSaveAs className="h-4 w-4" /> Save
    </Button>
  );
};

export default SaveButton;
