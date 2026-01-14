'use client';

import { useEffect } from 'react';
import { WorkflowFormData } from '../workflow-wizard';
import { WorkflowResult } from '@/types/workflow';
import { useExecuteWorkflow } from '@/lib/queries/workflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Check, Circle } from 'lucide-react';
import { toast } from 'sonner';

interface ProcessingStepProps {
  formData: WorkflowFormData;
  onComplete: (result: WorkflowResult) => void;
  onCancel: () => void;
}

export function ProcessingStep({ formData, onComplete, onCancel }: ProcessingStepProps) {
  const executeMutation = useExecuteWorkflow();

  useEffect(() => {
    // Start workflow execution
    executeMutation.mutate(
      {
        input: formData.input,
        provider: formData.provider,
        model: formData.model,
        temperature: formData.temperature,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success('Workflow completed successfully!');
            onComplete(data);
          } else {
            toast.error(data.error || 'Workflow failed');
          }
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to execute workflow');
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = [
    {
      label: 'Ingest & Normalize',
      description: 'Processing input and detecting language',
    },
    {
      label: 'Extract Insights',
      description: 'Analyzing pain points and value drivers',
    },
    {
      label: 'Self-Check Quality',
      description: 'Verifying accuracy and hallucination risk',
    },
    {
      label: 'Generate Value Proposition',
      description: 'Creating final output',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Generating Value Proposition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Processing Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = executeMutation.isPending;
            const isCompleted = executeMutation.isSuccess;

            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check className="h-5 w-5" />
                    </div>
                  ) : isActive && index === 0 ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted">
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {executeMutation.isPending && (
          <div className="rounded-lg border p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Processing your workflow... This typically takes 2-8 seconds depending on the provider.
            </p>
          </div>
        )}

        {executeMutation.isError && (
          <div className="rounded-lg border border-destructive p-4 bg-destructive/10">
            <p className="text-sm text-destructive font-medium">
              Error: {executeMutation.error.message}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={onCancel}
            >
              Go Back
            </Button>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onCancel} disabled={executeMutation.isPending}>
            Cancel Workflow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
