/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      primaryColor?: string;
    };
  }

  interface User {
    role?: string;
    primaryColor?: string;
  }
}
