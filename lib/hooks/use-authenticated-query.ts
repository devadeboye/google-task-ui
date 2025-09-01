import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { authManager } from '../auth/nextauth/providers';

/**
 * Authenticated query hook that automatically syncs NextAuth tokens with AuthManager
 * Use this instead of useQuery for authenticated requests
 */
export function useAuthenticatedQuery<TData = unknown, TError = Error>(
  options: UseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const { data: session } = useSession();

  // Sync tokens whenever session changes
  useEffect(() => {
    if ((session as any)?.accessToken) {
      const accessToken = (session as any).accessToken;
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const actualExpiry = payload.exp * 1000;

      authManager().setTokens({
        accessToken: accessToken,
        refreshToken: (session as any).refreshToken,
        accessTokenExpires: actualExpiry,
      });
    }
  }, [session]);

  return useQuery({
    ...options,
    enabled: options.enabled !== false && !!session?.user, // Auto-disable if not authenticated
  });
}
