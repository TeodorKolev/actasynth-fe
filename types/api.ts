// API response wrapper types

// Standard API error response
export interface APIError {
  detail: string | ValidationError[];
}

// Validation error structure
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  ctx?: Record<string, unknown>;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

// Health check response
export interface HealthResponse {
  status: string;
  service: string;
}

// Config check response
export interface ConfigCheckResponse {
  openai_key_configured: boolean;
  anthropic_key_configured: boolean;
  google_key_configured: boolean;
  environment: string;
  langsmith_enabled: boolean;
}

// Analytics summary response (for future backend implementation)
export interface AnalyticsSummary {
  total_runs: number;
  total_cost: number;
  avg_latency_ms: number;
  success_rate: number;
  cache_hit_rate: number;
  cost_by_provider: Record<string, number>;
  runs_by_day: Record<string, number>;
}
