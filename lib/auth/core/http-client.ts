/**
 * HTTP Client with automatic token handling
 * This client automatically adds tokens to requests and handles token refresh
 * when receiving 401 responses from the server
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { TokenManager } from './token-manager';

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  withCredentials?: boolean;
}

export class HttpClient {
  private client: AxiosInstance;
  private tokenManager: TokenManager;

  constructor(config: HttpClientConfig, tokenManager: TokenManager) {
    this.tokenManager = tokenManager;

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      withCredentials: config.withCredentials ?? true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Get the axios instance
   */
  get instance(): AxiosInstance {
    return this.client;
  }

  /**
   * Setup request and response interceptors
   * Request interceptor adds the access token to outgoing requests
   * Response interceptor handles 401 errors and triggers token refresh
   */
  private setupInterceptors(): void {
    // Request interceptor - add access token
    this.client.interceptors.request.use(
      async config => {
        const accessToken = this.tokenManager.getAccessToken();
        const isExpired = this.tokenManager.isAccessTokenExpired();

        console.log('HTTP Client Interceptor - accessToken:', !!accessToken);
        console.log('HTTP Client Interceptor - isExpired:', isExpired);
        console.log(
          'HTTP Client Interceptor - will add header:',
          !!(accessToken && !isExpired)
        );

        if (accessToken && !isExpired) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log('HTTP Client Interceptor - Added Authorization header');
        } else {
          console.log(
            'HTTP Client Interceptor - No Authorization header added'
          );
        }

        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor - handle 401 errors and token refresh
    this.client.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // If already refreshing, queue this request
          if (this.tokenManager.refreshing) {
            return new Promise((resolve, reject) => {
              this.tokenManager.queueRequest(
                config => resolve(this.client.request(config)),
                reject,
                originalRequest
              );
            });
          }

          // Try to refresh token
          const newTokens = await this.tokenManager.refreshTokens();

          if (newTokens) {
            // Retry original request with new token
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            return this.client.request(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  /**
   * Make a POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
