'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RawInput, SOURCE_OPTIONS } from '@/types/workflow';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const inputSchema = z.object({
  content: z.string().min(10, 'Content must be at least 10 characters'),
  source: z.string().optional(),
  customer_id: z.string().optional(),
});

type InputFormValues = z.infer<typeof inputSchema>;

interface InputStepProps {
  data: RawInput;
  onNext: (data: RawInput) => void;
}

export function InputStep({ data, onNext }: InputStepProps) {
  const form = useForm<InputFormValues>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      content: data.content || '',
      source: data.source || 'manual',
      customer_id: data.customer_id || '',
    },
  });

  const content = form.watch('content');

  function onSubmit(values: InputFormValues) {
    onNext({
      content: values.content,
      source: values.source || 'manual',
      customer_id: values.customer_id || undefined,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Feedback Input</CardTitle>
        <CardDescription>
          Paste customer feedback, call notes, emails, or product reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Notes *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste customer feedback, call notes, emails, or product reviews here..."
                      className="min-h-[200px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Minimum 10 characters required</span>
                    <span className="text-muted-foreground">
                      {content.length} characters
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SOURCE_OPTIONS.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source.charAt(0).toUpperCase() +
                            source.slice(1).replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Where did this feedback come from?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer ID (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., CUST-12345"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Internal customer identifier for tracking
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Next: Configure
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
