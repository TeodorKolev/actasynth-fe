import { WorkflowWizard } from '@/components/workflow/workflow-wizard';

export default function NewWorkflowPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Workflow</h1>
        <p className="text-muted-foreground mt-2">
          Generate a value proposition from customer feedback using AI
        </p>
      </div>

      <WorkflowWizard />
    </div>
  );
}
