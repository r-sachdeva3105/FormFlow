"use Client";

import {
  ElementType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
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
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type: ElementType = "ParagraphField";

const extraAttributes = {
  text: "Enter text here",
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export const ParagraphFieldFormComponent: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    label: "Paragraph Field",
    icon: BsTextParagraph,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
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
  const { text } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <p>{text}</p>
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
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return <p>{text}</p>;
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
      text: element.extraAttributes.text,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchema) {
    const { text } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text,
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
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem className="rounded-lg border p-3">
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                The text to display on the element.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
