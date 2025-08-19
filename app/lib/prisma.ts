/* eslint-disable no-unused-vars */

import { PrismaClient } from "@prisma/client";

interface Global {
  cachedPrisma?: PrismaClient;
}

declare const globalThis: Global;

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.cachedPrisma) {
    globalThis.cachedPrisma = new PrismaClient();
  }
  prisma = globalThis.cachedPrisma;
}

export const db = prisma;
