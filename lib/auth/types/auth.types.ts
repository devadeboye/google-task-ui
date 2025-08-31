/**
 * Core Authentication Types
 * Reusable across projects
 */

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpires: number;
}

export interface AuthError {
  code: string;
  message: string;
  statusCode?: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

// Request queue for handling concurrent requests during token refresh
export interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: any;
}
