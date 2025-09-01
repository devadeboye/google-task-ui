/**
 * Authentication Service
 * Clean, simple API for auth operations
 */

import { HttpClient } from '../core/http-client';
import {
  AuthResponse,
  LoginCredentials,
  RefreshTokenResponse,
  RegisterCredentials,
  User,
} from '../types/auth.types';

export interface AuthServiceConfig {
  endpoints: {
    login: string;
    register: string;
    refresh: string;
    logout: string;
    me: string;
  };
}

export class AuthService {
  private httpClient: HttpClient;
  private config: AuthServiceConfig;

  constructor(httpClient: HttpClient, config: AuthServiceConfig) {
    this.httpClient = httpClient;
    this.config = config;
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {


      const response = await this.httpClient.post<AuthResponse>(
        this.config.endpoints.login,
        credentials
      );


      return response.data;
    } catch (error: any) {
      console.error(
        'AuthService: Login failed:',
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  /**
   * Register user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {


      const response = await this.httpClient.post<AuthResponse>(
        this.config.endpoints.register,
        credentials
      );


      return response.data;
    } catch (error: any) {
      console.error(
        'AuthService: Registration failed:',
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {


      const response = await this.httpClient.post<RefreshTokenResponse>(
        this.config.endpoints.refresh,
        { refreshToken }
      );


      return response.data;
    } catch (error: any) {
      console.error(
        'AuthService: Token refresh failed:',
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {


      await this.httpClient.post(this.config.endpoints.logout);


    } catch (error: any) {
      console.error(
        'AuthService: Logout failed:',
        error.response?.data?.message || error.message
      );
      // Don't throw error for logout - we want to clear tokens anyway
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    try {


      const response = await this.httpClient.get<User>(
        this.config.endpoints.me
      );


      return response.data;
    } catch (error: any) {
      console.error(
        'AuthService: Failed to fetch user:',
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  }
}
