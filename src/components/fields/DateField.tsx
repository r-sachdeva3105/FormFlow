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
import { BsCalendar3 } from "react-icons/bs";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { IoCalendarNumberOutline } from "react-icons/io5";

const type: ElementType = "DateField";

const extraAttributes = {
  label: "Date Field",
  helperText: "This is a date field",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const DateFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    label: "Date Field",
    icon: IoCalendarNumberOutline,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
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
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-primary font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Button
        disabled
        variant={"outline"}
        className="w-full flex gap-2 justify-start"
      >
        <BsCalendar3 />
        <span>Pick a date</span>
      </Button>
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

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label
        className={cn("text-primary font-semibold", error && "text-red-500")}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full flex gap-2 justify-start",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <BsCalendar3 />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (!submitValue) return;
              const value = date?.toUTCString() || "";
              const valid = DateFieldFormComponent.validate(element, value);
              setError(!valid);
              submitValue(element.id, value);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
