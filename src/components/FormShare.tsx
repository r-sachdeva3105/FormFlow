"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { BiCopy } from "react-icons/bi";

const FormShare = ({ shareURL }: { shareURL: string }) => {
  const { toast } = useToast();
  const visitLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/submit/${shareURL}`
      : "";

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input readOnly value={visitLink} />
      <Button
        className="w-40"
        onClick={() => {
          navigator.clipboard.writeText(visitLink);
          toast({
            title: "Copied",
            description: "Link copied to clipboard",
          });
        }}
      >
        <BiCopy className="mr-1" />
        Copy Link
      </Button>
    </div>
  );
};

export default FormShare;
