"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { LuCheck } from "react-icons/lu";
import { useToast } from "@/hooks/use-toast";
import { CgSpinner } from "react-icons/cg";
import { SubmitForm } from "@/actions/form";

const FormContent = ({
  id,
  content,
}: {
  id: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const { toast } = useToast();

  const validateForm: () => boolean = useCallback(() => {
    for (const element of content) {
      const value = formValues.current[element.id] || "";
      const valid = FormElements[element.type].validate(element, value);
      if (!valid) {
        formErrors.current[element.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const isValid = validateForm();
    if (!isValid) {
      console.log("Form has errors");
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    try {
      const data = JSON.stringify(formValues.current);
      await SubmitForm(id, data);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the form" + error,
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center items-center h-full w-full p-8">
        <div
          key={renderKey}
          className="flex flex-col flex-grow items-center justify-center w-full max-w-lg gap-4 p-8 overflow-y-auto border rounded-xl transition-all duration-100 shadow-lg hover:shadow-xl shadow-blue-500 hover:shadow-blue-600"
        >
          <h1 className="text-2xl font-bold h-5">Form submitted</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for submitting the form
          </p>
          <Button className="mt-2" onClick={() => {}}>
            Submit Another Response
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full w-full p-8">
      <div
        key={renderKey}
        className="flex flex-col flex-grow items-start justify-center w-full max-w-lg gap-4 p-8 overflow-y-auto border rounded-xl transition-all duration-100 shadow-lg hover:shadow-xl shadow-blue-500 hover:shadow-blue-600"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isValid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="w-full gap-1 items-center"
          onClick={() => startTransition(submitForm)}
          disabled={pending}
        >
          {!pending && (
            <>
              {" "}
              <LuCheck />
              Submit
            </>
          )}
          {pending && <CgSpinner className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormContent;
