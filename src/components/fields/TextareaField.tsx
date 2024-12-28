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
import { BsTextareaResize } from "react-icons/bs";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

const type: ElementType = "TextareaField";

const extraAttributes = {
  label: "Textarea Field",
  placeholder: "Enter text here",
  helperText: "This is a textarea field",
  required: false,
  rows: 5,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  placeholder: z.string().max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  rows: z.number().min(1).max(10),
});

export const TextareaFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    label: "Textarea Field",
    icon: BsTextareaResize,
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
      return false;
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
  const { label, placeholder, helperText, required, rows } =
    element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Textarea readOnly disabled placeholder={placeholder} />
      <p className="text-muted-foreground text-sm">{helperText}</p>
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

  const [value, setValue] = useState(!!defaultValue ? defaultValue : "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, placeholder, helperText, required, rows } =
    element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label
        className={cn("text-primary font-semibold", error && "text-red-500")}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Textarea
        rows={rows}
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          const validate = TextareaFieldFormComponent.validate(
            element,
            e.target.value
          );
          setError(!validate);

          if (!validate || !submitValue) return;
          if (submitValue) submitValue(element.id, e.target.value);
        }}
      />
      <p
        className={cn("text-muted-foreground text-sm", error && "text-red-500")}
      >
        {helperText}
      </p>
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
      rows: element.extraAttributes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchema) {
    const { label, placeholder, helperText, required, rows } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        placeholder,
        helperText,
        required,
        rows,
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
          name="rows"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <FormLabel>Rows: {form.watch("rows")}</FormLabel>
              <FormControl className="py-2">
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                The number of rows in the textarea.
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
                Whether the field is required or not.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
