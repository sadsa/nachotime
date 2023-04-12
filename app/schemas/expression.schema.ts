import { z } from "zod";

export const expressionSchema = z.object({
  id: z.string().min(1),
  value: z.string().min(1),
  known: z.boolean().optional(),
  translation: z.string().min(1).optional(),
  definition: z.string().min(1).optional(),
});
