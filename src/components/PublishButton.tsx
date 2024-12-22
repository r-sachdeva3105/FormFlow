import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { MdPublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { CgSpinner } from "react-icons/cg";
import { useToast } from "@/hooks/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishButton = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Form published successfully",
      });
      router.refresh();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to publish form: " + error,
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white">
          <MdPublish className="h-4 w-4" /> Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to publish this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Please review your form carefully. By
            publishing this form, you will make it available to the public and
            you will be able to collect responses.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(handlePublish);
            }}
          >
            Publish {loading && <CgSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishButton;
