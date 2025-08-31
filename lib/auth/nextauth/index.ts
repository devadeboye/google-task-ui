/**
 * NextAuth Configuration
 * Clean, simple setup for NextAuth v4
 */

import NextAuth from 'next-auth';
import { NEXTAUTH_CONFIG } from '../config/auth.config';
import { authProviders } from './providers';

export default NextAuth({
  providers: authProviders as any, // Temporarily cast to 'any' to bypass type error
  ...NEXTAUTH_CONFIG,
});

// Re-export auth manager for app usage
export { authManager } from './providers';

// Re-export types
export type * from '../types/auth.types';
