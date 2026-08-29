'use client';

import { useState } from 'react';
import { toast } from 'sonner';

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

      toast.success(successTitle, { description: successDescription });
      onSuccess?.();
    } catch {
      toast.error(errorTitle, { description: errorDescription });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitLead };
}
