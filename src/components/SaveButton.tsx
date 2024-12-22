import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { SaveForm } from "@/actions/form";
import { useToast } from "@/hooks/use-toast";
import { CgSpinner } from "react-icons/cg";

const SaveButton = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      console.log(jsonElements);

      await SaveForm(id, jsonElements);
      toast({
        title: "Success",
        description: "Form saved successfully",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to save form: " + error,
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant="outline"
      className="flex items-center gap-1"
      disabled={loading}
      onClick={() => startTransition(handleSave)}
    >
      <HiSaveAs className="h-4 w-4" /> Save{" "}
      {loading && <CgSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveButton;
