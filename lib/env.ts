import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  DATABASE_URL_UNPOOLED: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().default("swing-bakery-badalona-secret-key-2026"),
  BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  CRON_SECRET: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(process.env);
