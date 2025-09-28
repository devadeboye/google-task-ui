'use client';

import AuthErrorHandler from '@/components/auth/AuthErrorHandler';
import { QueryProvider } from '@/contexts/QueryProvider';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryProvider>
        <AuthErrorHandler />
        {children}
      </QueryProvider>
    </SessionProvider>
  );
}
