'use client';

import { WorkflowResult } from '@/types/workflow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, FileDown, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ResultsStepProps {
  result: WorkflowResult;
  onCreateNew: () => void;
}

export function ResultsStep({ result, onCreateNew }: ResultsStepProps) {
  const { value_proposition, self_check, total_cost_usd, total_latency_ms, provider_used } = result;

  async function copyToClipboard() {
    const text = `
${value_proposition.headline}

Problem: ${value_proposition.problem}

Solution: ${value_proposition.solution}

Differentiation: ${value_proposition.differentiation}

${value_proposition.quantified_value ? `Value: ${value_proposition.quantified_value}` : ''}

Call to Action: ${value_proposition.call_to_action}

Key Talking Points:
${value_proposition.key_talking_points.map((point, i) => `${i + 1}. ${point}`).join('\n')}
    `.trim();

    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Value Proposition Generated</CardTitle>
              <CardDescription>
                Workflow completed successfully
              </CardDescription>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">
              Success
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Provider</p>
              <p className="font-medium capitalize">{provider_used}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cost</p>
              <p className="font-medium">${total_cost_usd.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium">{(total_latency_ms / 1000).toFixed(1)}s</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="font-medium">{(self_check.overall_accuracy * 100).toFixed(0)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="value-prop" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="value-prop">Value Prop</TabsTrigger>
          <TabsTrigger value="raw-data">Raw Data</TabsTrigger>
          <TabsTrigger value="self-check">Self-Check</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="value-prop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Headline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{value_proposition.headline}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📝 Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{value_proposition.problem}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{value_proposition.solution}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Differentiation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{value_proposition.differentiation}</p>
            </CardContent>
          </Card>

          {value_proposition.quantified_value && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💰 Quantified Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{value_proposition.quantified_value}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ✅ Call to Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{value_proposition.call_to_action}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗣️ Key Talking Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {value_proposition.key_talking_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raw-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Problem Statement</p>
                <p>{result.extracted_data.problem_statement}</p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Desired Outcome</p>
                <p>{result.extracted_data.desired_outcome}</p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Pain Points</p>
                <ul className="list-disc list-inside">
                  {result.extracted_data.pain_points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Value Drivers</p>
                <ul className="list-disc list-inside">
                  {result.extracted_data.value_drivers.map((driver, i) => (
                    <li key={i}>{driver}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Normalized Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Language</p>
                <p className="uppercase">{result.normalized_input.language}</p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Word Count</p>
                <p>{result.normalized_input.word_count}</p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">PII Detected</p>
                <p>{result.normalized_input.has_pii ? 'Yes' : 'No'}</p>
                {result.normalized_input.has_pii && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.normalized_input.detected_pii.length} PII item(s) found and redacted
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="self-check" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                  <p className="text-2xl font-bold">
                    {(self_check.overall_accuracy * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hallucination Risk</p>
                  <p className="text-2xl font-bold">
                    {(self_check.hallucination_risk * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={self_check.approved ? 'default' : 'destructive'}>
                    {self_check.approved ? 'Approved' : 'Rejected'}
                  </Badge>
                </div>
              </div>

              {!self_check.approved && self_check.rejection_reason && (
                <div className="rounded-lg border border-destructive p-4 bg-destructive/10">
                  <p className="text-sm font-medium">Rejection Reason</p>
                  <p className="text-sm text-muted-foreground mt-1">{self_check.rejection_reason}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Claim Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {self_check.verifications.map((verification, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <p className="text-sm flex-1">{verification.claim}</p>
                      <Badge variant={verification.supported_by_input ? 'default' : 'secondary'}>
                        {verification.supported_by_input ? 'Supported' : 'Unsupported'}
                      </Badge>
                    </div>
                    {verification.evidence && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Evidence: {verification.evidence}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: {(verification.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Run ID</p>
                  <p className="text-sm font-mono">{result.run_id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Provider</p>
                  <p className="capitalize">{result.provider_used}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p>{result.model_used}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Latency</p>
                  <p>{(result.total_latency_ms / 1000).toFixed(2)}s</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p>${result.total_cost_usd.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Generated At</p>
                  <p className="text-sm">
                    {new Date(value_proposition.generated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={copyToClipboard} variant="outline" className="flex-1">
          <Copy className="mr-2 h-4 w-4" />
          Copy to Clipboard
        </Button>
        <Button variant="outline" className="flex-1" disabled>
          <FileDown className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
        <Button onClick={onCreateNew} className="flex-1">
          <Plus className="mr-2 h-4 w-4" />
          Create New Workflow
        </Button>
      </div>
    </div>
  );
}
