'use client';

import { QueryProvider } from '@/contexts/QueryProvider';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
}
