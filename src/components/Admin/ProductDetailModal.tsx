'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X, Loader2 } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast, Toaster } from 'sonner';

const editProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug_name: z.string().min(1, 'Slug is required'),
  hsn_no: z.string().min(1, 'HSN number is required'),
  cas_number: z.string().min(1, 'CAS number is required'),
  iupac_name: z.string().min(1, 'IUPAC name is required'),
  molecular_formula: z.string().min(1, 'Molecular formula is required'),
  description: z.string().min(1, 'Description is required'),
  industries: z.string().min(1, 'At least one industry is required'),
  properties: z.string().optional(),
  safety_and_hazard: z.string().optional(),
  applications: z.string().optional(),
  faq: z.string().optional(),
});

type EditProductFormValues = z.infer<typeof editProductSchema>;

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
  isLoading?: boolean;
  mode?: 'view' | 'edit' | 'new';
  onProductCreated?: (product: Product) => void;
  onProductUpdated?: (product: Product) => void;
  adminToken?: string;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isEditMode: externalEditMode = false,
  onEditModeChange,
  isLoading = false,
  mode = 'view',
  onProductCreated,
  onProductUpdated,
  adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'your-admin-token-here',
}: ProductDetailModalProps) {
  const [internalEditMode, setInternalEditMode] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Use external edit mode if provided, otherwise use internal state
  const isEditMode = onEditModeChange ? externalEditMode : internalEditMode;
  const setEditMode = onEditModeChange || setInternalEditMode;

  // Determine if we're in edit mode based on mode prop or isEditMode
  const isInEditMode = mode === 'edit' || mode === 'new' || isEditMode;
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
      properties: '',
      safety_and_hazard: '',
      applications: '',
      faq: '',
    },
  });

  // Update form values when product changes or mode changes
  React.useEffect(() => {
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
        properties: '',
        safety_and_hazard: '',
        applications: '',
        faq: '',
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
        properties: product.properties ? JSON.stringify(product.properties, null, 2) : '',
        safety_and_hazard: product.safety_and_hazard
          ? JSON.stringify(product.safety_and_hazard, null, 2)
          : '',
        applications: product.applications ? JSON.stringify(product.applications, null, 2) : '',
        faq: product.faq ? JSON.stringify(product.faq, null, 2) : '',
      });
    }
  }, [product, form, isNewMode]);

  const onSubmit = async (values: EditProductFormValues) => {
    setIsSaving(true);

    try {
      // Helper function to parse JSON string fields
      const parseStringToArray = (str: string | undefined, fallback: unknown[] = []) => {
        if (!str || str.trim() === '') return fallback;
        try {
          return JSON.parse(str);
        } catch {
          return fallback;
        }
      };

      if (isNewMode) {
        // Creating new product - matches POST /api/products contract
        const newProductData = {
          name: values.name,
          slug_name: values.slug_name,
          hsn_no: values.hsn_no,
          cas_number: values.cas_number,
          iupac_name: values.iupac_name,
          molecular_formula: values.molecular_formula,
          description: values.description,
          industries: values.industries.split(',').map((s) => s.trim()),
          properties: parseStringToArray(values.properties, []),
          safety_and_hazard: parseStringToArray(values.safety_and_hazard, []),
          applications: parseStringToArray(values.applications, []),
          certificates: [], // Default empty array
          faq: parseStringToArray(values.faq, []),
        };

        console.log('Creating new product:', newProductData);

        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`,
          },
          body: JSON.stringify(newProductData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create product');
        }

        const createdProduct = await response.json();
        console.log('Product created successfully:', createdProduct);

        toast.success('Product Created', {
          description: 'New product has been successfully created.',
        });

        // Notify parent component of the new product
        onProductCreated?.(createdProduct);

        // Close modal after successful creation
        setEditMode(false);
        onClose();
      } else if (product) {
        // Updating existing product - matches PUT /api/products/[id] contract
        const updateData = {
          name: values.name,
          slug_name: values.slug_name,
          hsn_no: values.hsn_no,
          cas_number: values.cas_number,
          iupac_name: values.iupac_name,
          molecular_formula: values.molecular_formula,
          description: values.description,
          industries: values.industries.split(',').map((s) => s.trim()),
          properties: parseStringToArray(values.properties, product.properties),
          safety_and_hazard: parseStringToArray(
            values.safety_and_hazard,
            product.safety_and_hazard,
          ),
          applications: parseStringToArray(values.applications, product.applications),
          faq: parseStringToArray(values.faq, product.faq),
        };

        console.log('Updating product:', updateData);

        const response = await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`,
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update product');
        }

        const updatedProduct = await response.json();
        console.log('Product updated successfully:', updatedProduct);

        toast.success('Product Updated', {
          description: 'Product has been successfully updated.',
        });

        // Notify parent component of the updated product
        onProductUpdated?.(updatedProduct);

        setEditMode(false);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Error', {
        description: error instanceof Error ? error.message : 'Failed to save product',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (product) {
      form.reset({
        name: product.name,
        slug_name: product.slug_name,
        hsn_no: product.hsn_no,
        cas_number: product.cas_number,
        iupac_name: product.iupac_name,
        molecular_formula: product.molecular_formula,
        description: product.description,
        industries: product.industries.join(', '),
        properties: product.properties ? JSON.stringify(product.properties, null, 2) : '',
        safety_and_hazard: product.safety_and_hazard
          ? JSON.stringify(product.safety_and_hazard, null, 2)
          : '',
        applications: product.applications ? JSON.stringify(product.applications, null, 2) : '',
        faq: product.faq ? JSON.stringify(product.faq, null, 2) : '',
      });
    }
    setEditMode(false);
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <SheetTitle className="text-2xl font-bold text-blue-600">
                {isNewMode ? 'New Product' : isInEditMode ? 'Edit Product' : 'Product Details'}
              </SheetTitle>
              {!isLoading && (
                <div className="flex gap-2">
                  {isInEditMode ? (
                    <>
                      <Button onClick={form.handleSubmit(onSubmit)} size="sm" disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
          </SheetHeader>

          {isLoading ? (
            <div className="mt-6 flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Loading product details...</p>
            </div>
          ) : product || isNewMode ? (
            <div className="mt-6 space-y-6">
              {isInEditMode ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Information Form */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                          Basic Information
                        </h3>
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
                                <Input
                                  placeholder="Industry 1, Industry 2, Industry 3"
                                  {...field}
                                />
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

                    {/* Properties Form */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Properties</h3>
                        <FormField
                          control={form.control}
                          name="properties"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Properties (JSON format)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='[{"key": "Molecular Weight", "value": "180.16 g/mol"}]'
                                  className="min-h-[120px] font-mono text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Safety and Hazard Form */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                          Safety & Hazard
                        </h3>
                        <FormField
                          control={form.control}
                          name="safety_and_hazard"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Safety & Hazard (JSON format)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='[{"key": "Flash Point", "value": "101°C"}]'
                                  className="min-h-[120px] font-mono text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Applications Form */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">Applications</h3>
                        <FormField
                          control={form.control}
                          name="applications"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Applications (JSON format)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='[{"key": "Pharmaceutical", "value": "Used in drug synthesis"}]'
                                  className="min-h-[120px] font-mono text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* FAQ Form */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">FAQ</h3>
                        <FormField
                          control={form.control}
                          name="faq"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>FAQ (JSON format)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder='[{"question": "What is the purity?", "answer": "99.5% minimum"}]'
                                  className="min-h-[120px] font-mono text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </form>
                </Form>
              ) : (
                product && (
                  <div className="space-y-6">
                    {/* Basic Information & Industries Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Basic Information */}
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold border-b pb-2 mb-3">
                            Basic Information
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Name:</span> {product.name}
                            </p>
                            <p>
                              <span className="font-medium">Slug:</span> {product.slug_name}
                            </p>
                            <p>
                              <span className="font-medium">HSN No:</span> {product.hsn_no}
                            </p>
                            <p>
                              <span className="font-medium">CAS Number:</span> {product.cas_number}
                            </p>
                            <p>
                              <span className="font-medium">IUPAC Name:</span> {product.iupac_name}
                            </p>
                            <p>
                              <span className="font-medium">Molecular Formula:</span>{' '}
                              {product.molecular_formula}
                            </p>
                            <p>
                              <span className="font-medium">Created:</span>{' '}
                              {new Date(product.created_at).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-medium">Updated:</span>{' '}
                              {new Date(product.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Industries */}
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Industries</h3>
                          <div className="flex flex-wrap gap-2">
                            {product.industries.map((industry, index) => (
                              <Badge key={index} variant="secondary">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Description */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-3">Description</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {product.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Properties */}
                    {product.properties && product.properties.length > 0 && (
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Properties</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {product.properties.map((prop, index) => (
                              <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                                <span className="font-medium text-foreground">{prop.key}:</span>{' '}
                                <span className="text-muted-foreground">{prop.value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Safety and Hazard */}
                    {product.safety_and_hazard && product.safety_and_hazard.length > 0 && (
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold border-b pb-2 mb-3">
                            Safety & Hazard
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {product.safety_and_hazard.map((safety, index) => (
                              <div
                                key={index}
                                className="text-sm p-2 bg-destructive/5 border border-destructive/20 rounded"
                              >
                                <span className="font-medium text-foreground">{safety.key}:</span>{' '}
                                <span className="text-muted-foreground">{safety.value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Applications */}
                    {product.applications && product.applications.length > 0 && (
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Applications</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {product.applications.map((app, index) => (
                              <div
                                key={index}
                                className="text-sm p-2 bg-primary/5 border border-primary/20 rounded"
                              >
                                <span className="font-medium text-foreground">{app.key}:</span>{' '}
                                <span className="text-muted-foreground">{app.value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* FAQ */}
                    {product.faq && product.faq.length > 0 && (
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold border-b pb-2 mb-3">FAQ</h3>
                          <div className="space-y-4">
                            {product.faq.map((faq, index) => (
                              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                                <p className="font-medium text-foreground mb-2">{faq.question}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">No product data available</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
