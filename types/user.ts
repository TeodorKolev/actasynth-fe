// User settings types (for future backend implementation)

import { Provider } from "./workflow";

export interface UserSettings {
  default_provider: Provider;
  default_model: string;
  default_temperature: number;
  cache_enabled: boolean;
  email_notifications: boolean;
  cost_threshold_alerts: boolean;
  error_notifications: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}
