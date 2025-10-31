/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
