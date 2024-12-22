import React from "react";
import { LuLoader2 } from "react-icons/lu";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <LuLoader2 className="animate-spin text-2xl" />
    </div>
  );
};

export default loading;
