"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const VisitButton = ({
  shareURL,
  title,
}: {
  shareURL: string;
  title: string;
}) => {
  const visitLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/submit/${shareURL}`
      : "";

  return (
    <div className="flex flex-grow justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Button
        className="w-40 gap-1"
        onClick={() => window.open(visitLink, "_blank")}
      >
        <ArrowTopRightIcon /> Visit
      </Button>
    </div>
  );
};

export default VisitButton;
