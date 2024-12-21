"use Client";

import { MdTextFields } from "react-icons/md";
import { ElementType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";

const type: ElementType = "TextField";

const extraAttributes = {
  label: "Text Field",
  placeholder: "Enter text here",
  helperText: "This is a text field",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  placeholder: z.string().max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

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
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type PropertiesFormSchema = z.infer<typeof propertiesSchema>;

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, placeholder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      <p className="text-muted-foreground text-sm">{helperText}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, placeholder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Input placeholder={placeholder} />
      <p className="text-muted-foreground text-sm">{helperText}</p>
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useDesigner();

  const form = useForm<PropertiesFormSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      placeholder: element.extraAttributes.placeholder,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchema) {
    const { label, placeholder, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        placeholder,
        helperText,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          name="label"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The label that will be displayed on the form element.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="placeholder"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The placeholder text that will be displayed in the input field.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="helperText"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <FormLabel>Helpertext</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The helpertext that will be displayed below the input field.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="required"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <div className="flex justify-between items-center">
                <FormLabel>Required</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                The helpertext that will be displayed below the input field.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
