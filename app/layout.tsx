import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'UpCycle - Buy, Sell & Upcycle',
  description: 'A marketplace platform for buying, selling, and upcycling used products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans", geist.variable)} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
