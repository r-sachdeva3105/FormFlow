import { TextFieldFormComponent } from "./fields/TextField";

export type ElementType = "TextField";

export type FormElement = {
  type: ElementType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    label: string;
    icon: React.ElementType;
  };

  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  extraAttributes?: Record<string, unknown>;
};

type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormComponent,
};
