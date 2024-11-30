"use Client";

import { MdTextFields } from "react-icons/md";
import { ElementType, FormElement } from "../FormElements";

const type: ElementType = "TextField";

export const TextFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      placeholder: "Enter text here",
      helperText: "This is a text field",
      required: false,
    },
  }),
  designerButtonElement: {
    label: "Text Field",
    icon: MdTextFields,
  },
  designerComponent: () => <div>Designer</div>,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
};
