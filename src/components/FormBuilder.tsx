"use client";

import { Form } from "@prisma/client";
import React, { useEffect } from "react";
import PreviewButton from "./PreviewButton";
import SaveButton from "./SaveButton";
import PublishButton from "./PublishButton";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { BiCopy } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Confetti from "react-confetti";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements } = useDesigner();
  const { toast } = useToast();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      tolerance: 5,
      delay: 300,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
  }, [form, setElements]);

  const shareURL = typeof window !== "undefined" ? `${window.location.origin}/submit/${form.shareUrl}` : '';

  if (form.published) {
    return (
      <>
        <Confetti recycle={false} />
        <div className="flex flex-col items-center justify-center h-full w-full gap-2">
          <div className="max-w-full text-center">
            <h1 className="text-4xl font-semibold border-b mb-6 pb-2">
              🎊 Form Published 🎊
            </h1>
            <h2 className="text-xl">Share this form</h2>
            <h3 className="text-lg text-muted-foreground mb-6">
              Anyone with this link can view and submit the form
            </h3>
            <Input className="mb-2" readOnly value={shareURL} />
            <Button
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareURL);
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
          <div className="flex justify-between">
            <Button variant={"link"} asChild>
              <Link href={"/"} className="gap-2">
                <BsArrowLeft /> Go back home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={`/form/${form.id}`} className="gap-2">
                Form details
                <BsArrowRight className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="h-full w-full flex flex-col">
        <nav className="flex justify-between items-center border-b-2 p-4">
          <h2 className="truncate font-semibold">
            <span className="font-medium text-muted-foreground mr-2">
              Form:
            </span>
            {form.title}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewButton />
            {!form.published && (
              <>
                <SaveButton id={form.id} />
                <PublishButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="bg-accent bg-[url('/graph-paper.svg')] dark:bg-[url('/graph-paper-dark.svg')] flex flex-1 justify-center items-center overflow-y-auto">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
