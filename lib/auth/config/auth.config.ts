/**
 * Authentication Configuration
 * Centralized config for the auth system
 */

import { API_CONFIG } from '../../config/api.config';
import { AuthManagerConfig } from '../core/auth-manager';

export const AUTH_CONFIG: AuthManagerConfig = {
  http: {
    baseURL: API_CONFIG.BASE_URL!,
    timeout: 10000,
    withCredentials: true,
  },
};

// NextAuth v5 configuration
export const NEXTAUTH_CONFIG = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    error: API_CONFIG.ENDPOINTS.AUTH.ERROR,
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
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
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
