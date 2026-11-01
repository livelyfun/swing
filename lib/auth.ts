import { betterAuth } from "better-auth";

// Temporary in-memory / placeholder configuration until DB connection is provided in Phase 1
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "development-secret-swing-bakery-badalona-2026",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
});
