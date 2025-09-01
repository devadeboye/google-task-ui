/**
 * Token Manager - Handles token storage and refresh with race condition prevention
 * This is the core component that prevents multiple simultaneous refresh attempts
 * and ensures tokens are managed safely across the application
 */

import {
  AuthTokens,
  QueuedRequest,
  RefreshTokenResponse,
} from '../types/auth.types';

export class TokenManager {
  private tokens: AuthTokens | null = null;
  private isRefreshing = false;
  private refreshPromise: Promise<AuthTokens | null> | null = null;
  private requestQueue: QueuedRequest[] = [];
  private refreshCallback?: (
    refreshToken: string
  ) => Promise<RefreshTokenResponse>;

  constructor(
    refreshCallback?: (refreshToken: string) => Promise<RefreshTokenResponse>
  ) {
    this.refreshCallback = refreshCallback;
  }

  /**
   * Set refresh callback after construction
   */
  setRefreshCallback(
    refreshCallback: (refreshToken: string) => Promise<RefreshTokenResponse>
  ): void {
    this.refreshCallback = refreshCallback;
  }

  /**
   * Set tokens
   */
  setTokens(tokens: AuthTokens): void {
    this.tokens = tokens;
  }

  /**
   * Get current tokens
   */
  getTokens(): AuthTokens | null {
    return this.tokens;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }

  /**
   * Check if access token is expired
   */
  isAccessTokenExpired(): boolean {
    if (!this.tokens) return true;
    return Date.now() >= this.tokens.accessTokenExpires;
  }

  /**
   * Check if access token will expire soon (within 1 minute)
   * This helps us refresh tokens proactively before they expire
   */
  isAccessTokenExpiringSoon(): boolean {
    if (!this.tokens) return true;
    const oneMinute = 60 * 1000;
    return Date.now() >= this.tokens.accessTokenExpires - oneMinute;
  }

  /**
   * Clear tokens
   */
  clearTokens(): void {
    this.tokens = null;
    this.isRefreshing = false;
    this.refreshPromise = null;
    this.processQueue(new Error('Tokens cleared'), null);
  }

  /**
   * Refresh tokens with race condition prevention
   * If a refresh is already in progress, this will wait for it instead of starting a new one
   */
  async refreshTokens(): Promise<AuthTokens | null> {
    // If already refreshing, return the existing promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // If no refresh callback or no refresh token, return null
    if (!this.refreshCallback || !this.tokens?.refreshToken) {
      return null;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Add request to queue during token refresh
   */
  queueRequest(
    resolve: (value: any) => void,
    reject: (error: any) => void,
    config: any
  ): void {
    this.requestQueue.push({ resolve, reject, config });
  }

  /**
   * Check if currently refreshing
   */
  get refreshing(): boolean {
    return this.isRefreshing;
  }

  /**
   * Perform the actual token refresh
   */
  private async performRefresh(): Promise<AuthTokens | null> {
    try {
      if (!this.refreshCallback || !this.tokens?.refreshToken) {
        throw new Error('No refresh callback or refresh token available');
      }



      const response = await this.refreshCallback(this.tokens.refreshToken);

      const newTokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken || this.tokens.refreshToken,
        accessTokenExpires: response.accessTokenExpires,
      };

      this.setTokens(newTokens);
      this.processQueue(null, newTokens.accessToken);


      return newTokens;
    } catch (error) {
      console.error('TokenManager: Token refresh failed:', error);
      this.processQueue(error, null);
      this.clearTokens();
      return null;
    }
  }

  /**
   * Process queued requests after token refresh
   * This ensures all pending requests get the new token or proper error handling
   */
  private processQueue(error: any, accessToken: string | null): void {
    this.requestQueue.forEach(({ resolve, reject, config }) => {
      if (error) {
        reject(error);
      } else if (accessToken) {
        // Update the request config with new token
        if (config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        resolve(config);
      } else {
        reject(new Error('No access token available'));
      }
    });

    this.requestQueue = [];
  }
}
