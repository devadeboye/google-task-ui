'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

export default function AuthErrorHandler() {
  const { data: session, status } = useSession();
  const hasRedirected = useRef(false);

  useEffect(() => {
    console.log('AuthErrorHandler - Session status:', status);
    console.log('AuthErrorHandler - Session data:', session);
    
    // Prevent multiple redirects
    if (hasRedirected.current) return;
    
    // If session has refresh error, sign out and redirect to login
    if ((session as any)?.error === 'RefreshAccessTokenError') {
      console.log('Refresh token error detected, signing out...');
      hasRedirected.current = true;
      signOut({ callbackUrl: '/auth/login' });
      return;
    }
    
    // Only redirect if we're on a protected route and unauthenticated
    if (status === 'unauthenticated' && window.location.pathname.startsWith('/tasks/')) {
      console.log('User is unauthenticated on protected route, redirecting to login...');
      hasRedirected.current = true;
      signOut({ callbackUrl: '/auth/login' });
    }
  }, [session, status]);

  // Reset redirect flag when status changes to loading
  useEffect(() => {
    if (status === 'loading') {
      hasRedirected.current = false;
    }
  }, [status]);

  // Don't render anything, this is just for handling auth errors
  return null;
}
