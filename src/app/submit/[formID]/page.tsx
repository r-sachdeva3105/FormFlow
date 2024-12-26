import { GetFormById } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import React from "react";
import FormContent from "@/components/FormContent";

const page = async ({ params }: { params: { formID: string } }) => {
  const form = await GetFormById(params.formID);

  if (!form) {
    throw new Error(`Form with ID ${params.formID} not found`);
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormContent id={params.formID} content={formContent} />;
};

export default page;
