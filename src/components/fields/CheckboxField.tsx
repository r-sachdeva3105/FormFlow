"use Client";

import {
  ElementType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { IoIosCheckboxOutline } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";

const type: ElementType = "CheckboxField";

const extraAttributes = {
  label: "Checkbox Field",
  helperText: "This is a checkbox field",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckboxFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    label: "Checkbox Field",
    icon: IoIosCheckboxOutline,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required && !currentValue) {
      return currentValue === "true";
    }
    return true;
  },
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
  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} disabled />
      <div className="grid gap-1 leading-none">
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none text-muted-foreground"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
        <p className="text-sm text-muted-foreground">{helperText}</p>
      </div>
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex gap-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? "true" : "false";
          const valid = CheckboxFieldFormComponent.validate(
            element,
            stringValue
          );
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1 leading-none">
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none",
            error && "text-red-500"
          )}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
        <p
          className={cn(
            "text-sm text-muted-foreground",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      </div>
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
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchema) {
    const { label, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
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
                Whether the input field is required or not.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
