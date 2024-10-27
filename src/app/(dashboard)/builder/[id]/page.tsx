import React from "react";
import prisma from "@/lib/prisma";
import FormBuilder from "@/components/FormBuilder";
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const form = await prisma.form.findUnique({
    where: {
      id,
    },
  });
  if (!form) {
    throw new Error("Form not found");
  }
  return <FormBuilder form={form} />;
};

export default page;
