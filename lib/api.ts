import { supabase } from './supabase';
import { APIError } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class APIRequestError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIRequestError';
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    // Get Supabase session token
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if session exists
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'API request failed';
      let errorDetails: unknown;

      try {
        const errorData: APIError = await response.json();
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          // Validation errors
          errorMessage = errorData.detail
            .map((err) => `${err.loc.join('.')}: ${err.msg}`)
            .join(', ');
          errorDetails = errorData.detail;
        }
      } catch {
        // If error response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new APIRequestError(errorMessage, response.status, errorDetails);
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIRequestError) {
      throw error;
    }

    // Network error or other exception
    throw new APIRequestError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}
