'use client';

import { ThemeProvider } from '@/hooks/use-theme';
import { ToastProvider } from '@/hooks/use-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
