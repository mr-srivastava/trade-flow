'use client';

import React, { useEffect, useImperativeHandle } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DynamicKeyValueFields, DynamicFAQFields } from './DynamicFields';

// Updated schema with proper array types
export const editProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug_name: z.string().min(1, 'Slug is required'),
  hsn_no: z.string().min(1, 'HSN number is required'),
  cas_number: z.string().min(1, 'CAS number is required'),
  iupac_name: z.string().min(1, 'IUPAC name is required'),
  molecular_formula: z.string().min(1, 'Molecular formula is required'),
  description: z.string().min(1, 'Description is required'),
  industries: z.string().min(1, 'At least one industry is required'),
  properties: z
    .array(
      z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
      }),
    )
    .optional(),
  safety_and_hazard: z
    .array(
      z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
      }),
    )
    .optional(),
  applications: z
    .array(
      z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
      }),
    )
    .optional(),
  faq: z
    .array(
      z.object({
        question: z.string().min(1, 'Question is required'),
        answer: z.string().min(1, 'Answer is required'),
      }),
    )
    .optional(),
});

export type EditProductFormValues = z.infer<typeof editProductSchema>;

interface ProductFormProps {
  product: Product | null;
  mode: 'view' | 'edit' | 'new';
  onSubmit: (values: EditProductFormValues) => void;
  onCancel: () => void;
}

const ProductForm = React.forwardRef<{ submitForm: () => void }, ProductFormProps>(
  ({ product, mode, onSubmit }, ref) => {
    const isNewMode = mode === 'new';

    const form = useForm<EditProductFormValues>({
      resolver: zodResolver(editProductSchema),
      defaultValues: {
        name: '',
        slug_name: '',
        hsn_no: '',
        cas_number: '',
        iupac_name: '',
        molecular_formula: '',
        description: '',
        industries: '',
        properties: [],
        safety_and_hazard: [],
        applications: [],
        faq: [],
      },
    });

    // Field arrays for dynamic fields
    const {
      fields: propertiesFields,
      append: appendProperty,
      remove: removeProperty,
    } = useFieldArray({
      control: form.control,
      name: 'properties',
    });

    const {
      fields: safetyFields,
      append: appendSafety,
      remove: removeSafety,
    } = useFieldArray({
      control: form.control,
      name: 'safety_and_hazard',
    });

    const {
      fields: applicationsFields,
      append: appendApplication,
      remove: removeApplication,
    } = useFieldArray({
      control: form.control,
      name: 'applications',
    });

    const {
      fields: faqFields,
      append: appendFAQ,
      remove: removeFAQ,
    } = useFieldArray({
      control: form.control,
      name: 'faq',
    });

    // Update form values when product changes or mode changes
    useEffect(() => {
      if (isNewMode) {
        // For new mode, start with blank form
        form.reset({
          name: '',
          slug_name: '',
          hsn_no: '',
          cas_number: '',
          iupac_name: '',
          molecular_formula: '',
          description: '',
          industries: '',
          properties: [],
          safety_and_hazard: [],
          applications: [],
          faq: [],
        });
      } else if (product) {
        // For edit mode, populate with existing data
        form.reset({
          name: product.name,
          slug_name: product.slug_name,
          hsn_no: product.hsn_no,
          cas_number: product.cas_number,
          iupac_name: product.iupac_name,
          molecular_formula: product.molecular_formula,
          description: product.description,
          industries: product.industries.join(', '),
          properties: product.properties || [],
          safety_and_hazard: product.safety_and_hazard || [],
          applications: product.applications || [],
          faq: product.faq || [],
        });
      }
    }, [product, form, isNewMode]);

    const handleSubmit = (values: EditProductFormValues) => {
      onSubmit(values);
    };

    // Expose form submit method to parent
    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(handleSubmit)(),
    }));

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Basic Information Form */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hsn_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HSN Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter HSN number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cas_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CAS Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter CAS number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="iupac_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IUPAC Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter IUPAC name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="molecular_formula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Molecular Formula*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter molecular formula" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Industries Form */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Industries</h3>
              <FormField
                control={form.control}
                name="industries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industries (comma-separated)*</FormLabel>
                    <FormControl>
                      <Input placeholder="Industry 1, Industry 2, Industry 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Description Form */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Description</h3>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Properties Form - Now using dynamic fields */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Properties</h3>
              <DynamicKeyValueFields
                fields={propertiesFields}
                append={appendProperty}
                remove={removeProperty}
                register={form.register}
                errors={form.formState.errors}
                name="properties"
                keyLabel="Property"
                keyPlaceholder="e.g. Molecular Weight"
                valuePlaceholder="e.g. 180.16 g/mol"
                emptyMessage="No properties added yet"
              />
            </CardContent>
          </Card>

          {/* Safety and Hazard Form - Now using dynamic fields */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Safety & Hazard</h3>
              <DynamicKeyValueFields
                fields={safetyFields}
                append={appendSafety}
                remove={removeSafety}
                register={form.register}
                errors={form.formState.errors}
                name="safety_and_hazard"
                keyLabel="Safety Item"
                keyPlaceholder="e.g. Flash Point"
                valuePlaceholder="e.g. 101°C"
                emptyMessage="No safety information added yet"
              />
            </CardContent>
          </Card>

          {/* Applications Form - Now using dynamic fields */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Applications</h3>
              <DynamicKeyValueFields
                fields={applicationsFields}
                append={appendApplication}
                remove={removeApplication}
                register={form.register}
                errors={form.formState.errors}
                name="applications"
                keyLabel="Application"
                keyPlaceholder="e.g. Pharmaceutical"
                valuePlaceholder="e.g. Used in drug synthesis"
                emptyMessage="No applications added yet"
              />
            </CardContent>
          </Card>

          {/* FAQ Form - Now using dynamic fields */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">FAQ</h3>
              <DynamicFAQFields
                fields={faqFields}
                append={appendFAQ}
                remove={removeFAQ}
                register={form.register}
                errors={form.formState.errors}
                name="faq"
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  },
);

ProductForm.displayName = 'ProductForm';

export default ProductForm;
