import { z } from "zod";
import { expressionSchema } from "./expression.schema";

export const cardSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  phrase: z.string().min(1),
  translation: z.string().min(1),
  playbackAudioUrl: z.string().min(1),
  workflowStatus: z.enum(["0", "1", "-1"]),
  expressions: z.array(expressionSchema),
  createdDate: z.object({}).optional(),
});
