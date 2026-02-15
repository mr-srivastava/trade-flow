'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/lib/types';
import { toast, Toaster } from 'sonner';
import { cn } from '@/lib/utils/cn';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  product: Product;
  buttonClassName?: string;
}

export function ContactForm({ product, buttonClassName }: ContactFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: `I'm interested in ${product.name} (CAS: ${product.cas_number}) and would like more information.`,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);

      toast.success('Inquiry Submitted', {
        description:
          "We've received your inquiry and will get back to you soon.",
      });

      form.reset();
    }, 1500);
  }

  return (
    <>
      <Toaster position='bottom-left' richColors />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className={cn('w-full rounded-md', buttonClassName)}
          >
            GET IN TOUCH
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Product Inquiry</DialogTitle>
            <DialogDescription>
              Submit your inquiry about {product.name}. Our team will get back
              to you shortly.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Your name…'
                        autoComplete='name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='your.email@company.com'
                        autoComplete='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='company'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Your company…'
                          autoComplete='organization'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Your phone number…'
                          autoComplete='tel'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Please provide details about your inquiry…'
                        className='min-h-[120px]'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include any specific requirements or questions you have.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='rounded-md'
                >
                  {isSubmitting && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Submit Inquiry
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
