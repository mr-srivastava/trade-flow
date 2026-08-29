'use client';

import { useState } from 'react';
import { toast } from '@/components/ui/toast';

interface UseLeadSubmitOptions {
  successTitle: string;
  successDescription: string;
  errorTitle?: string;
  errorDescription: string;
  /** Called after a successful submission (e.g. reset the form, close a dialog). */
  onSuccess?: () => void;
}

/** Shared POST-to-/api/leads flow for the contact, product inquiry, and quote forms. */
export function useLeadSubmit({
  successTitle,
  successDescription,
  errorTitle = 'Something went wrong',
  errorDescription,
  onSuccess,
}: UseLeadSubmitOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = async (payload: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');

      toast.add({ title: successTitle, description: successDescription, type: 'success' });
      onSuccess?.();
    } catch {
      toast.add({ title: errorTitle, description: errorDescription, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitLead };
}
