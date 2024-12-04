"use Client";

import { MdTextFields } from "react-icons/md";
import { ElementType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementType = "TextField";

const extraAttributes = {
  label: "Text Field",
  placeholder: "Enter text here",
  helperText: "This is a text field",
  required: false,
};

export const TextFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    label: "Text Field",
    icon: MdTextFields,
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, placeholder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      <p className="text-muted-foreground text-sm">{helperText}</p>
    </div>
  );
}
