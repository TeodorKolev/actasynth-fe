'use client';

import { useState } from 'react';
import { RawInput, WorkflowResult, Provider } from '@/types/workflow';
import { InputStep } from './steps/input-step';
import { ConfigStep } from './steps/config-step';
import { ProcessingStep } from './steps/processing-step';
import { ResultsStep } from './steps/results-step';
import { Progress } from '@/components/ui/progress';

export type WorkflowStep = 'input' | 'config' | 'processing' | 'results';

export interface WorkflowFormData {
  input: RawInput;
  provider: Provider;
  model?: string;
  temperature: number;
}

export function WorkflowWizard() {
  const [step, setStep] = useState<WorkflowStep>('input');
  const [formData, setFormData] = useState<WorkflowFormData>({
    input: {
      content: '',
      source: 'manual',
    },
    provider: 'google',
    temperature: 0.7,
  });
  const [result, setResult] = useState<WorkflowResult | null>(null);

  const steps: Record<WorkflowStep, number> = {
    input: 0,
    config: 1,
    processing: 2,
    results: 3,
  };

  const progress = ((steps[step] + 1) / 4) * 100;

  const stepTitles: Record<WorkflowStep, string> = {
    input: 'Step 1: Input Customer Feedback',
    config: 'Step 2: Configure AI Settings',
    processing: 'Step 3: Processing Workflow',
    results: 'Step 4: View Results',
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{stepTitles[step]}</span>
          <span>
            Step {steps[step] + 1} of 4
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {step === 'input' && (
          <InputStep
            data={formData.input}
            onNext={(input) => {
              setFormData({ ...formData, input });
              setStep('config');
            }}
          />
        )}

        {step === 'config' && (
          <ConfigStep
            data={{
              provider: formData.provider,
              model: formData.model,
              temperature: formData.temperature,
            }}
            onBack={() => setStep('input')}
            onNext={(config) => {
              setFormData({ ...formData, ...config });
              setStep('processing');
            }}
          />
        )}

        {step === 'processing' && (
          <ProcessingStep
            formData={formData}
            onComplete={(workflowResult) => {
              setResult(workflowResult);
              setStep('results');
            }}
            onCancel={() => setStep('config')}
          />
        )}

        {step === 'results' && result && (
          <ResultsStep
            result={result}
            onCreateNew={() => {
              setFormData({
                input: { content: '', source: 'manual' },
                provider: 'google',
                temperature: 0.7,
              });
              setResult(null);
              setStep('input');
            }}
          />
        )}
      </div>
    </div>
  );
}
