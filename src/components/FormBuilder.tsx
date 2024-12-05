"use client";

import { Form } from "@prisma/client";
import React from "react";
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

const FormBuilder = ({ form }: { form: Form }) => {
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
                <SaveButton />
                <PublishButton />
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
