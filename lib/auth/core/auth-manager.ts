/**
 * Auth Manager - Orchestrates all auth operations
 * This is the main class you'll interact with for authentication
 * It coordinates between the token manager, HTTP client, and auth service
 */

import { AuthService } from '../services/auth.service';
import {
  AuthResponse,
  AuthState,
  AuthTokens,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../types/auth.types';
import { HttpClient, HttpClientConfig } from './http-client';
import { TokenManager } from './token-manager';

export interface AuthManagerConfig {
  http: HttpClientConfig;
}

export class AuthManager {
  private tokenManager: TokenManager;
  private httpClient: HttpClient;
  private authService: AuthService;
  private state: AuthState;
  private listeners: ((state: AuthState) => void)[] = [];

  constructor(config: AuthManagerConfig) {
    // Initialize state first
    this.state = {
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };

    // Initialize token manager without refresh callback initially
    this.tokenManager = new TokenManager();

    // Initialize HTTP client with the token manager
    this.httpClient = new HttpClient(config.http, this.tokenManager);

    // Initialize auth service with the HTTP client
    this.authService = new AuthService(this.httpClient);

    // Now set up the refresh callback on the SAME token manager instance
    // This prevents circular dependency issues during construction
    this.tokenManager.setRefreshCallback(refreshToken =>
      this.authService.refreshToken(refreshToken)
    );
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    this.updateState({ isLoading: true, error: null });

    try {
      const authResponse = await this.authService.login(credentials);

      // Store tokens
      this.tokenManager.setTokens({
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        accessTokenExpires: authResponse.accessTokenExpires,
      });

      // Update state
      this.updateState({
        user: authResponse.user,
        tokens: {
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          accessTokenExpires: authResponse.accessTokenExpires,
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return authResponse;
    } catch (error: any) {
      this.updateState({
        isLoading: false,
        error: {
          code: 'LOGIN_FAILED',
          message: error.message,
        },
      });
      throw error;
    }
  }

  /**
   * Register user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    this.updateState({ isLoading: true, error: null });

    try {
      const authResponse = await this.authService.register(credentials);

      // Store tokens
      this.tokenManager.setTokens({
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
        accessTokenExpires: authResponse.accessTokenExpires,
      });

      // Update state
      this.updateState({
        user: authResponse.user,
        tokens: {
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          accessTokenExpires: authResponse.accessTokenExpires,
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return authResponse;
    } catch (error: any) {
      this.updateState({
        isLoading: false,
        error: {
          code: 'REGISTER_FAILED',
          message: error.message,
        },
      });
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    this.updateState({ isLoading: true });

    try {
      await this.authService.logout();
    } catch {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed, but continuing with local logout');
    }

    // Clear tokens and state
    this.tokenManager.clearTokens();
    this.updateState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    return this.authService.getCurrentUser();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return (
      this.state.isAuthenticated && !this.tokenManager.isAccessTokenExpired()
    );
  }

  /**
   * Get current auth state
   */
  getState(): AuthState {
    return { ...this.state };
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return this.tokenManager.getAccessToken();
  }

  /**
   * Get tokens
   */
  getTokens(): AuthTokens | null {
    return this.tokenManager.getTokens();
  }

  /**
   * Set tokens (for external token storage like NextAuth)
   * This is useful when you get tokens from NextAuth and want to use them with our HTTP client
   */
  setTokens(tokens: AuthTokens): void {
    this.tokenManager.setTokens(tokens);
    this.updateState({
      tokens,
      isAuthenticated: true,
    });
  }

  /**
   * Subscribe to auth state changes
   * This lets you listen for authentication state changes throughout your app
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get HTTP client for making authenticated requests
   */
  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  /**
   * Update auth state and notify listeners
   */
  private updateState(updates: Partial<AuthState>): void {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }
}
