import { z } from "zod";

export const envSchema = z.object({
  /**
   * App environment variables.
   */
  NODE_ENV: z.enum(["production", "development", "test"]).optional(),
  VERSION: z.string().optional(),
  SESSION_SECRET: z.string().min(1, {
    message: "SESSION_SECRET environment variable must be set",
  }),
  DATABASE_URL: z.string().min(1, {
    message: "DATABASE_URL environment variable must be set",
  }),

  /**
   * Firebase environment variables.
   */
  GOOGLE_APPLICATION_CREDENTIALS: z.string().min(1, {
    message: "GOOGLE_APPLICATION_CREDENTIALS environment variable must be set",
  }),
  API_KEY: z.string().min(1, {
    message: "API_KEY environment variable must be set",
  }),
  AUTH_DOMAIN: z.string().min(1, {
    message: "AUTH_DOMAIN environment variable must be set",
  }),
  FB_DATABASE_URL: z.string().min(1, {
    message: "FB_DATABASE_URL environment variable must be set",
  }),
  PROJECT_ID: z.string().min(1, {
    message: "PROJECT_ID environment variable must be set",
  }),
  STORAGE_BUCKET: z.string().min(1, {
    message: "STORAGE_BUCKET environment variable must be set",
  }),
  MESSAGING_SENDER_ID: z.string().min(1, {
    message: "MESSAGING_SENDER_ID environment variable must be set",
  }),
  APP_ID: z.string().min(1, {
    message: "APP_ID environment variable must be set",
  }),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
