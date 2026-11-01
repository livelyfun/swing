import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const connectionUrl = process.env.DATABASE_URL;

  if (!connectionUrl || connectionUrl.includes("user:password@ep-sample")) {
    // If no real database URL is configured, use proxy/in-memory fallback to avoid crashing at runtime
    const handler: ProxyHandler<Record<string, unknown>> = {
      get: (_target, prop) => {
        if (typeof prop === "string" && ["$connect", "$disconnect", "$on", "$transaction"].includes(prop)) {
          return async () => {};
        }
        return new Proxy(
          {},
          {
            get: () => async () => {
              return null;
            },
          }
        );
      },
    };
    return new Proxy({}, handler) as unknown as PrismaClient;
  }

  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  } catch (error) {
    console.warn("[Swing DB] Prisma initialization fallback:", error);
    return new Proxy({}, { get: () => async () => null }) as unknown as PrismaClient;
  }
}

export const db: PrismaClient = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = db;
}
