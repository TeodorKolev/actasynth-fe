'use client';

import { useState } from 'react';
import { Provider } from '@/types/workflow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfigStepProps {
  data: {
    provider: Provider;
    model?: string;
    temperature: number;
  };
  onBack: () => void;
  onNext: (data: { provider: Provider; model?: string; temperature: number }) => void;
}

const providerInfo: Record<Provider, { name: string; cost: string; latency: string }> = {
  openai: {
    name: 'OpenAI',
    cost: '~$0.015',
    latency: '3-5s',
  },
  anthropic: {
    name: 'Anthropic',
    cost: '~$0.008',
    latency: '4-7s',
  },
  google: {
    name: 'Google',
    cost: '~$0.003',
    latency: '2-4s',
  },
};

export function ConfigStep({ data, onBack, onNext }: ConfigStepProps) {
  const [provider, setProvider] = useState<Provider>(data.provider);
  const [temperature, setTemperature] = useState(data.temperature);

  function handleSubmit() {
    onNext({
      provider,
      temperature,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure AI Settings</CardTitle>
        <CardDescription>
          Choose your LLM provider and model parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Provider Selection */}
        <div className="space-y-4">
          <Label>LLM Provider *</Label>
          <RadioGroup value={provider} onValueChange={(value) => setProvider(value as Provider)}>
            <div className="grid gap-4 md:grid-cols-3">
              {(Object.keys(providerInfo) as Provider[]).map((p) => (
                <label
                  key={p}
                  className={cn(
                    'relative flex cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent',
                    provider === p ? 'border-primary bg-accent' : 'border-muted'
                  )}
                >
                  <RadioGroupItem value={p} className="sr-only" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{providerInfo[p].name}</span>
                      {provider === p && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Cost: {providerInfo[p].cost}</div>
                      <div>Latency: {providerInfo[p].latency}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Temperature</Label>
            <span className="text-sm text-muted-foreground">{temperature.toFixed(1)}</span>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={([value]) => setTemperature(value)}
            min={0}
            max={2}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>More Focused (0.0)</span>
            <span>More Creative (2.0)</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Controls randomness in the output. Lower values make responses more deterministic.
          </p>
        </div>

        {/* Cost Estimate */}
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Estimated Cost</p>
              <p className="text-sm text-muted-foreground">Per workflow execution</p>
            </div>
            <div className="text-2xl font-bold">{providerInfo[provider].cost}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="button" onClick={handleSubmit} size="lg">
            Generate Workflow
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
