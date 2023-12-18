import LeftNav  from '@/components/LeftNav'
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-proivder';
import { CommandBox } from '@/components/command/CommandBox';

export const metadata: Metadata = {
  title: "Immunefiles",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body className="relative flex">
        <ThemeProvider 
          attribute="class"
          defaultTheme="light"
        >
          <CommandBox />
          <LeftNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
