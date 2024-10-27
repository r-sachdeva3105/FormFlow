import React from "react";
import { Button } from "./ui/button";
import { MdPublish } from "react-icons/md";

const PublishButton = () => {
  return (
    <Button className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white">
      <MdPublish className="h-4 w-4" /> Publish
    </Button>
  );
};

export default PublishButton;
