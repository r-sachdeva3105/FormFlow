import { z } from "zod";

export const formSchema = z.object({
    title: z
      .string()
      .min(4, { message: "Title must be at least 4 characters long" }),
    description: z.string().optional(),
  });
  
export type FormSchema = z.infer<typeof formSchema>;