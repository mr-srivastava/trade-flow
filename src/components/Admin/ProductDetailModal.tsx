'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';
import ProductBaseModal from './ProductBaseModal';
import ProductForm, { EditProductFormValues } from './ProductForm';
import ProductView from './ProductView';

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
  const [currentMode, setCurrentMode] = React.useState<'view' | 'edit' | 'new'>(mode);

  // Use external edit mode if provided, otherwise use internal state
  const isEditMode = onEditModeChange ? externalEditMode : internalEditMode;
  const setEditMode = onEditModeChange || setInternalEditMode;

  // Determine current mode
  React.useEffect(() => {
    if (mode === 'new') {
      setCurrentMode('new');
    } else if (mode === 'edit' || isEditMode) {
      setCurrentMode('edit');
    } else {
      setCurrentMode('view');
    }
  }, [mode, isEditMode]);

  const handleSave = async (values: EditProductFormValues) => {
    setIsSaving(true);

    try {
      if (currentMode === 'new') {
        // Creating new product
        const newProductData = {
          name: values.name,
          slug_name: values.slug_name,
          hsn_no: values.hsn_no,
          cas_number: values.cas_number,
          iupac_name: values.iupac_name,
          molecular_formula: values.molecular_formula,
          description: values.description,
          industries: values.industries.split(',').map((s) => s.trim()),
          properties: values.properties || [],
          safety_and_hazard: values.safety_and_hazard || [],
          applications: values.applications || [],
          certificates: [], // Default empty array
          faq: values.faq || [],
        };

        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(newProductData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create product');
        }

        const createdProduct = await response.json();
        toast.success('Product Created', {
          description: 'New product has been successfully created.',
        });

        onProductCreated?.(createdProduct);
        setEditMode(false);
        onClose();
      } else if (product) {
        // Updating existing product
        const updateData = {
          name: values.name,
          slug_name: values.slug_name,
          hsn_no: values.hsn_no,
          cas_number: values.cas_number,
          iupac_name: values.iupac_name,
          molecular_formula: values.molecular_formula,
          description: values.description,
          industries: values.industries.split(',').map((s) => s.trim()),
          properties: values.properties || [],
          safety_and_hazard: values.safety_and_hazard || [],
          applications: values.applications || [],
          faq: values.faq || [],
        };

        const response = await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update product');
        }

        const updatedProduct = await response.json();
        toast.success('Product Updated', {
          description: 'Product has been successfully updated.',
        });

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

  const handleEdit = () => {
    setCurrentMode('edit');
    setEditMode(true);
  };

  const formRef = React.useRef<{ submitForm: () => void }>(null);

  const handleFormSave = () => {
    // Trigger form submission from the child component
    formRef.current?.submitForm();
  };

  const renderContent = () => {
    if (currentMode === 'view' && product) {
      return <ProductView product={product} />;
    } else if (currentMode === 'edit' || currentMode === 'new') {
      return (
        <ProductForm
          ref={formRef}
          product={product}
          mode={currentMode}
          onSubmit={handleSave}
          onCancel={() => {
            setCurrentMode('view');
            setEditMode(false);
          }}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">No product data available</p>
        </div>
      );
    }
  };

  return (
    <ProductBaseModal
      isOpen={isOpen}
      onClose={onClose}
      mode={currentMode}
      isLoading={isLoading}
      onSave={handleFormSave}
      onEdit={handleEdit}
      isSaving={isSaving}
    >
      {renderContent()}
    </ProductBaseModal>
  );
}
