/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Universal Insights Tools - All AI Tools in One Place',
  description: 'Use top AI tools inside one site. Sign in with Google once — no extra accounts needed.',
  keywords: 'AI tools, ChatGPT, Midjourney, AI video, AI image, text to speech, prompt writer',
  authors: [{ name: 'Universal Insights' }],
  openGraph: {
    title: 'Universal Insights Tools',
    description: 'Use top AI tools inside one site. Sign in with Google once — no extra accounts needed.',
    type: 'website',
    url: 'https://universalinsights.tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Insights Tools',
    description: 'Use top AI tools inside one site. Sign in with Google once — no extra accounts needed.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
