import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '../core/http-client';
import {
  AuthResponse,
  LoginCredentials,
  RefreshTokenResponse,
  RegisterCredentials,
  User,
} from '../types/auth.types';

export class AuthService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.httpClient.post<AuthResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
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

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await this.httpClient.post<AuthResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`,
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

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await this.httpClient.post<RefreshTokenResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
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

  async logout(): Promise<void> {
    try {
      await this.httpClient.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`
      );
    } catch (error: any) {
      console.error(
        'AuthService: Logout failed:',
        error.response?.data?.message || error.message
      );
      // Don't throw error for logout - we want to clear tokens anyway
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.httpClient.get<User>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.ME}`
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
