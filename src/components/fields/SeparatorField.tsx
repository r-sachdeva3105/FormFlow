"use Client";

import {
  ElementType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { CgSpaceBetweenV } from "react-icons/cg";

const type: ElementType = "SeparatorField";

export const SeparatorFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    label: "Separator Field",
    icon: CgSpaceBetweenV,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
}) {
  return <Separator />;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <p className="text-muted-foreground">No properties for this element.</p>
  );
}
