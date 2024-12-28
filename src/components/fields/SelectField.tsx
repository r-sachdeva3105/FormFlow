"use Client";

import { RxDropdownMenu } from "react-icons/rx";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { MdAdd, MdClose } from "react-icons/md";

const type: ElementType = "SelectField";

const extraAttributes = {
  label: "Select Field",
  placeholder: "Select an option",
  helperText: "This is a select field",
  required: false,
  options: [],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  placeholder: z.string().max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    label: "Select Field",
    icon: RxDropdownMenu,
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
  const { label, placeholder, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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

  const { label, placeholder, helperText, required, options } =
    element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label
        className={cn("text-primary font-semibold", error && "text-red-500")}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormComponent.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn(error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

  const { updateElement, setSelectedElement } = useDesigner();

  const form = useForm<PropertiesFormSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      placeholder: element.extraAttributes.placeholder,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      options: element.extraAttributes.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchema) {
    const { label, placeholder, helperText, required, options } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        placeholder,
        helperText,
        required,
        options,
      },
    });
    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
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
          name="options"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("New Option"));
                  }}
                >
                  <MdAdd /> Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <MdClose />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>
                You can add new options by clicking the &quot;Add&quot; button.
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
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
