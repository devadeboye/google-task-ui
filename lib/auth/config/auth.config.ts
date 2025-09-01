/**
 * Authentication Configuration
 * Centralized config for the auth system
 */

import { AuthManagerConfig } from '../core/auth-manager';

// Get API URL from environment
const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.warn('NEXT_PUBLIC_API_URL not defined, using localhost:4000');
    return 'http://localhost:4000';
  }
  return apiUrl;
};

export const AUTH_CONFIG: AuthManagerConfig = {
  http: {
    baseURL: getApiUrl(),
    timeout: 10000,
    withCredentials: true,
  },
  service: {
    endpoints: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
      me: '/auth/me',
    },
  },
};

// NextAuth v5 configuration
export const NEXTAUTH_CONFIG = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    // JWT callback - handle token refresh
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (user && account) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires:
            user.accessTokenExpires || Date.now() + 2 * 60 * 1000,
        };
      }

      // Return previous token if not expired
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Token expired, try to refresh
      return await refreshAccessToken(token);
    },

    // Session callback - send properties to client
    async session({ session, token }: any) {
      if (token.error === 'RefreshAccessTokenError') {
        // Force logout on refresh error
        return null;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        error: token.error,
      };
    },
  },
};

/**
 * Refresh access token for NextAuth
 */
async function refreshAccessToken(token: any) {
  try {


    const response = await fetch(
      `${AUTH_CONFIG.http.baseURL}${AUTH_CONFIG.service.endpoints.refresh}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }



    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      accessTokenExpires:
        refreshedTokens.accessTokenExpires || Date.now() + 2 * 60 * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error('NextAuth: Token refresh failed:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
