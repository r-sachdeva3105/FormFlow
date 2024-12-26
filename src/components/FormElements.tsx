import { TextFieldFormComponent } from "./fields/TextField";
import { TitleFieldFormComponent } from "./fields/TitleField";
import { SubTitleFieldFormComponent } from "./fields/SubTitleField";
import { ParagraphFieldFormComponent } from "./fields/ParagraphField";
import { SeparatorFieldFormComponent } from "./fields/SeparatorField";
import { SpacerFieldFormComponent } from "./fields/SpacerField";

export type ElementType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    label: string;
    icon: React.ElementType;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isValid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormComponent,
  TitleField: TitleFieldFormComponent,
  SubTitleField: SubTitleFieldFormComponent,
  ParagraphField: ParagraphFieldFormComponent,
  SeparatorField: SeparatorFieldFormComponent,
  SpacerField: SpacerFieldFormComponent,
};
