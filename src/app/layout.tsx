import { BioRhyme } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import type { Metadata } from 'next';
import './globals.css';

const bioRhyme = BioRhyme({
  variable: '--font-bio-rhyme',
  subsets: ['latin'],
});
/* const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
}); */

export const metadata: Metadata = {
  title: 'Sortarium | Sorting Visualizer',
  description: 'A web application to visualize various sorting algorithms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bioRhyme.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
