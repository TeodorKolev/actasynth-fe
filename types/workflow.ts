// Provider types
export type Provider = "openai" | "anthropic" | "google";

// Language types
export type Language = "en" | "es" | "fr" | "de" | "other";

// PII types
export type PIIType = "email" | "phone" | "ssn" | "credit_card" | "name" | "address";

// Persona types
export type Persona = "executive" | "technical" | "business_user" | "procurement";

// Input model
export interface RawInput {
  content: string; // Min 10 characters, required
  source?: string; // Default: "manual"
  customer_id?: string; // Optional customer identifier
  metadata?: Record<string, string>; // Optional additional context
}

// Value Proposition
export interface ValueProposition {
  headline: string; // Max 200 chars
  problem: string;
  solution: string;
  differentiation: string;
  quantified_value: string | null;
  call_to_action: string;
  persona: Persona;
  key_talking_points: string[]; // 3-5 items
  generated_at: string; // ISO datetime
}

// PII Detection
export interface PIIDetection {
  pii_type: PIIType;
  value: string;
  confidence: number; // 0.0-1.0
  location: [number, number]; // [start, end] character positions
}

// Normalized Input
export interface NormalizedInput {
  content: string;
  language: Language;
  detected_pii: PIIDetection[];
  has_pii: boolean;
  cleaned_content: string;
  word_count: number;
  processed_at: string; // ISO datetime
}

// Extracted Data
export interface ExtractedData {
  problem_statement: string;
  current_solution: string | null;
  desired_outcome: string;
  pain_points: string[]; // Min 1 item
  value_drivers: string[]; // Min 1 item
  stakeholders: string[];
  timeline: string | null;
  budget_signals: string | null;
  confidence_score: number; // 0.0-1.0
}

// Claim Verification
export interface ClaimVerification {
  claim: string;
  supported_by_input: boolean;
  evidence: string | null;
  confidence: number; // 0.0-1.0
}

// Self-Check Result
export interface SelfCheckResult {
  verifications: ClaimVerification[];
  overall_accuracy: number; // 0.0-1.0
  hallucination_risk: number; // 0.0-1.0
  approved: boolean;
  rejection_reason: string | null;
}

// Complete Workflow Result
export interface WorkflowResult {
  run_id: string; // UUID
  value_proposition: ValueProposition;
  normalized_input: NormalizedInput;
  extracted_data: ExtractedData;
  self_check: SelfCheckResult;
  total_latency_ms: number;
  total_cost_usd: number;
  provider_used: string;
  model_used: string;
  success: boolean;
  error: string | null;
}

// Parallel execution result
export type ParallelWorkflowResult = Record<Provider, WorkflowResult>;

// Source options for dropdown
export const SOURCE_OPTIONS = [
  "manual",
  "crm",
  "email",
  "call",
  "survey",
  "chat",
  "support_ticket",
  "other"
] as const;

export type Source = (typeof SOURCE_OPTIONS)[number];
