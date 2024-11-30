"use client";

import { useContext } from "react";
import { DesignerContext } from "../contexts/DesignerContext";

const useDesigner = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error("useDesigner must be used within a DesignerProvider");
  }
  return context;
};

export default useDesigner;
