import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import {
  RawInput,
  WorkflowResult,
  ParallelWorkflowResult,
  Provider,
} from '@/types/workflow';

// Execute single workflow
export function useExecuteWorkflow() {
  return useMutation({
    mutationFn: async ({
      input,
      provider = 'google',
      model,
      temperature = 0.7,
    }: {
      input: RawInput;
      provider?: Provider;
      model?: string;
      temperature?: number;
    }) => {
      const params = new URLSearchParams({
        provider,
        temperature: temperature.toString(),
      });

      if (model) {
        params.append('model', model);
      }

      return apiRequest<WorkflowResult>(
        `/api/v1/workflow/execute?${params.toString()}`,
        {
          method: 'POST',
          body: JSON.stringify(input),
        }
      );
    },
  });
}

// Execute parallel comparison across multiple providers
export function useCompareProviders() {
  return useMutation({
    mutationFn: async ({
      input,
      providers = ['openai', 'anthropic'],
    }: {
      input: RawInput;
      providers?: Provider[];
    }) => {
      const params = new URLSearchParams();
      providers.forEach((provider) => params.append('providers', provider));

      return apiRequest<ParallelWorkflowResult>(
        `/api/v1/workflow/execute-parallel?${params.toString()}`,
        {
          method: 'POST',
          body: JSON.stringify(input),
        }
      );
    },
  });
}

// Get workflow history (future backend endpoint)
export function useWorkflowHistory(
  page = 1,
  limit = 20,
  filters?: {
    provider?: Provider;
    status?: 'success' | 'error';
    source?: string;
  }
) {
  return useQuery({
    queryKey: ['workflow-history', page, limit, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (filters?.provider) params.append('provider', filters.provider);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.source) params.append('source', filters.source);

      return apiRequest<{
        items: WorkflowResult[];
        total: number;
        page: number;
        pages: number;
      }>(`/api/v1/workflows?${params.toString()}`);
    },
    staleTime: 30000, // 30 seconds
    enabled: false, // Disable until backend implements this endpoint
  });
}

// Get single workflow by ID (future backend endpoint)
export function useWorkflowById(runId: string) {
  return useQuery({
    queryKey: ['workflow', runId],
    queryFn: () => apiRequest<WorkflowResult>(`/api/v1/workflow/${runId}`),
    enabled: !!runId && false, // Disable until backend implements this endpoint
  });
}
