"use client";

import React from "react";
import DesignerSidebar from "./DesignerSidebar";

const Designer = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-full p-4">
        <div className="max-w-3/5 h-full m-auto bg-background flex flex-col items-center justify-center flex-1 flex-grow overflow-y-auto rounder">
          <p className="text-2xl text-muted-foreground font-bold">Drop Here</p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
