'use client';
import React from 'react';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className='lg:col-span-3'>
      <div className='glass-card p-6'>
        <h3 className='text-xl font-medium mb-6 text-white'>Send us a Message</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-syntara-light mb-2'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Your name…'
                        autoComplete='name'
                        {...field}
                        className='w-full bg-syntara-darker border border-border rounded-md text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-syntara-primary focus-visible:border-syntara-primary'
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
                    <FormLabel className='block text-sm font-medium text-syntara-light mb-2'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='your.email@company.com'
                        autoComplete='email'
                        {...field}
                        className='w-full bg-syntara-darker border border-border rounded-md text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-syntara-primary focus-visible:border-syntara-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='block text-sm font-medium text-syntara-light mb-2'>
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='How can we help you?…'
                      {...field}
                      className='w-full bg-syntara-darker border border-border rounded-md text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-syntara-primary focus-visible:border-syntara-primary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='block text-sm font-medium text-syntara-light mb-2'>
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Please provide details about your inquiry…'
                      className='w-full bg-syntara-darker border border-border rounded-md text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-syntara-primary focus-visible:border-syntara-primary resize-none'
                      rows={3}
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
            <Button
              type='submit'
              className='btn-primary flex items-center gap-2 w-full justify-center'
            >
              Send Message <Send className='h-4 w-4' />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
