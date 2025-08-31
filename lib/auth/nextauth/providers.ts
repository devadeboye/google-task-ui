/**
 * NextAuth Providers
 * This file integrates our robust auth system with NextAuth
 * It handles the credential validation and user authentication
 */

import CredentialsProvider from 'next-auth/providers/credentials';
import { AUTH_CONFIG } from '../config/auth.config';
import { AuthManager } from '../core/auth-manager';
import { signInSchema } from '../utils/validation';

// Lazy initialization to avoid circular dependencies during module loading
let authManager: AuthManager | null = null;

function getAuthManager(): AuthManager {
  if (!authManager) {
    authManager = new AuthManager(AUTH_CONFIG);
  }
  return authManager;
}

export const authProviders = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      username: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
      },
      password: {
        label: 'Password',
        type: 'password',
      },
    },
    async authorize(credentials) {
      try {
        // Check if credentials exist
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Validate credentials
        const validatedCredentials = await signInSchema.parseAsync(credentials);

        // Use our auth manager to login
        const authResponse = await getAuthManager().login(validatedCredentials);

        console.log("about to return user in NextAuth v5 format");
        // Return user in NextAuth v5 format
        return {
          id: authResponse.user.id,
          name: authResponse.user.username,
          email: authResponse.user.email,
          // Store tokens for JWT callback
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          accessTokenExpires: authResponse.accessTokenExpires,
        };
      } catch (error: any) {
        console.error('NextAuth: Authorization failed:', error);
        
        // If it's a validation error, we want to pass the details through
        if (error.issues && Array.isArray(error.issues)) {
          // Zod validation error - extract the first error message
          const firstError = error.issues[0];
          throw new Error(firstError.message);
        }
        
        // For other errors, return null to trigger CredentialsSignin
        return null;
      }
    },
  }),
];

// Export auth manager getter for use in other parts of the app
export { getAuthManager as authManager };
